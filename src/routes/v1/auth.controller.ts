import Joi from 'joi';
import { HTTPRequest } from '../../interfaces/http.interface';
import httpStatus from 'http-status';
import User, { UserAttributes } from '../../config/Users.model';
import Token from '../../config/Tokens.model';


export const signup: any = async function(request: HTTPRequest){
	const {body, set} = request;
	const {username, password } = body;
	
	try {

		// Make sure that the credentials are not in the database. Othewise, send HTTP Conflict
		const user = await User.findOne({
			where: { username: username }
		});

		if (user){
			set.status = httpStatus.CONFLICT;
			return {
				"success": false,
				"message": httpStatus["409_MESSAGE"]
			}
		}
		const hashedPassword = await Bun.password.hash(password);
	
		// See if we can successfull insert data to the db
		await User.create({
			username: username,
			password: hashedPassword
		});

		set.status = httpStatus.CREATED;

		return {
			"success": true,
			"message": `Congrats, your account ${username} has been created`
		}
	} catch (error:any) {
		set.status = httpStatus.INTERNAL_SERVER_ERROR
		return {
			"success": false,
			"message": error.message ?? httpStatus["500_NAME"]
		}
	}
}

/**
 * This middleware make sures that the provided data to the signup controler is fine as fuck
 */
export const _validateCredentials : any = async function(request: HTTPRequest) {
	const schema = Joi.object({
		username: Joi.string().min(6).max(15).required(),
		password: Joi.string().min(6).max(15).required()
	});

	const {error} = schema.validate(request.body);
	
	if (error){
		request.set.status = httpStatus.BAD_REQUEST;

		return {
			success: false,
			message: error.details[0].message 
		}
	}
}

export const login : any = async function(request: HTTPRequest)
{
	const {access_token, refresh_token, body, set} = request;
	const {username, password } = body;

	try {
		//  Fetch the matching credentials from the DB. Send HTTP Unauthorized otherwise
		const user = await User.findOne({
			where: { username: username },
		}) as UserAttributes | null;

		if (!user) {
			set.status = httpStatus.UNAUTHORIZED;
			return {
				"success": false,
				"message": httpStatus["401_NAME"]
			}
		}

		// Check if the password provided is correct
		const isMatch = await Bun.password.verify(password, user.password);
		if (!isMatch){
			set.status = httpStatus.UNAUTHORIZED;
			return {
				"success": false,
				"message": httpStatus["401_NAME"]
			}
		}

		// Generate the tokens and send them back to the user
		const [generatedAccessToken, generatedRefreshToken] = await Promise.all([
			access_token.sign({ userId: user.id as number }),
			refresh_token.sign({ userId: user.id as number })
		]);

		// Store the refresh token in the RefreshToken model
		await Token.create({
			userId: user.id as number,
			token: generatedRefreshToken,
			type: 'refresh'
		});

		return {
			"success": true,
			"access_token": generatedAccessToken,
			"refresh_token": generatedRefreshToken
		};
	} catch (error: any) {
		set.status = httpStatus.INTERNAL_SERVER_ERROR
		return {
			"success": false,
			"message": error.message ?? httpStatus["500_NAME"]
		}
	}
}

export const logout : any = async function(request: HTTPRequest)
{
	const {set, headers, body} = request;

	const authHeader = headers?.authorization;
	const access_token: string | undefined = authHeader.split(' ')[1];

	try {
		// if access_token is found in the headers, upsert it to the revoked_access in the tokens table, always make sure that type is 'revoked_access'
		if (access_token){
			await Token.upsert({
				userId: request.UserData.userId as number,
				token: access_token,
				type: 'revoked_access'
			});
		}

		// if refresh_token is found in the body, delete it from the database
		if (body.refresh_token){
			await Token.destroy({
				where: {
					token: body.refresh_token,
					type: 'refresh'
				}
			});
		}

		set.status = httpStatus.OK;
		return {
			"success": true,
			"message": "You have been logged out"
		}
	} catch (error:any) {
		set.status = httpStatus.INTERNAL_SERVER_ERROR
		return {
			"success": false,
			"message": error.message ?? httpStatus["500_NAME"]
		}
	}
}

/**
 * A middleware to verify the access token provided in the headers
 * @param request 
 * @returns 
 */
export const _verifyAccess : any = async function(request: HTTPRequest) {
	// token looks like 'Bearer vnjaknvijdaknvikbnvreiudfnvriengviewjkdsbnvierj'

	const {access_token, headers, set} = request;

	const authHeader = headers?.authorization;

	const response = {
		"success": false,
		"message": httpStatus['401_NAME']
	};
	set.status = httpStatus.UNAUTHORIZED; // By default all request will be invalid
	
	if (!authHeader || !authHeader?.startsWith('Bearer ')) {
		return response;
	}

	const token: string | undefined = authHeader.split(' ')[1];

	if (!token) {
		return response;
	}

	const payloadContent = await access_token.verify(token);

	if (!payloadContent){
		set.status = httpStatus.FORBIDDEN;
		response.message = httpStatus["403_NAME"];
		return response;
	}

	try {
		// make sure that the token is not in the revoked_access in Tokens table
		const isRevokedTOken = await Token.findOne({
			where: {
				token: token,
				type: 'revoked_access'
			}
		});

		if (isRevokedTOken){
			set.status = httpStatus.UNAUTHORIZED;
			response.message = "ACCESS_EXPIRED";
			return response;
		}			
	} catch (error: any) {
		set.status = httpStatus.INTERNAL_SERVER_ERROR
		return {
			"success": false,
			"message": error.message ?? httpStatus["500_NAME"]
		}
	}

	request.UserData = payloadContent;
	set.status = httpStatus.OK;
}
