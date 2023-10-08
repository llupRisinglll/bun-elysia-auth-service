import Joi from 'joi';
import { HTTPRequest } from '../../interfaces/http.interface';
import httpStatus from 'http-status';
import User from '../../config/Users.model';


export const signup: any = async function(request: HTTPRequest){
	const {body, set} = request;
	const {username, password } = body;

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

	// See if we can successfull insert data to the db
	try {
		const hashedPassword = await Bun.password.hash(password);
		await User.create({
			username: username,
			password: hashedPassword
		});

		set.status = httpStatus.CREATED;

		return {
			"success": true,
			"message": `Congrats, your account ${username} has been created`
		}
	} catch (error) {
		set.status = httpStatus.INTERNAL_SERVER_ERROR
		return {
			"success": false,
			"message": httpStatus["500_NAME"]
		}
	}
}

/**
 * This middleware make sures that the provided data to the signup controler is fine as fuck
 */
export const _validateSignup : any = async function(request: HTTPRequest) {
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
	const {access_token} = request;

	// TODO: Make sure that there is no missing from HTTP request (e.g. Username, Email, Password)

	// TODO: Fetch the matching credentials from the DB. Send HTTP Unauthorized otherwise

	// TODO: Validate the encrypted password

	// TODO: Provide the access token

	const generatedAccessToken = await access_token.sign({
		userId: "asd" // TODO: Change to the actual id that is provided
	});

	return {
		"success": true,
		"access_token": generatedAccessToken
	};
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

	request.UserData = payloadContent;
	set.status = httpStatus.OK;
}
