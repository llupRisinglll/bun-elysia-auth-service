import jwt, { JWTPayloadSpec } from '@elysiajs/jwt';
import { JWTMiddleware } from '../../interfaces/jwt.interface';
import { Handler, InputSchema, MergeSchema, RouteSchema, UnwrapRoute } from 'elysia';
import { HTTPRequest } from '../../interfaces/http.interface';

export const signup = async function(){
	// TODO: Support Dynamic; Let the user select what details to require from the user 
	
	// TODO: Make sure that there is no missing from HTTP request (e.g. Username, Email, Password)

	// TODO: Make sure that the credentials are not in the database. Othewise, send HTTP Conflict
	
	// TODO: Encrypt the password before storing to the DB

	// TODO: Send an email verification; Let the user indicate whether they need something like this or not

	return "Sign up controller"
}

export const login : any = async function(request: HTTPRequest) 
{
	const {access_token} = request;

	// TODO: Make sure that there is no missing from HTTP request (e.g. Username, Email, Password)

	// TODO: Fetch the matching credentials from the DB. Send HTTP Unauthorized otherwise

	// TODO: Validate the encrypted password

	// TODO: Provide the access token

	const payload = {
		userId: "asd"
	}

	const generatedAccessToken = await access_token.sign(payload);

	return {
		"access_token": generatedAccessToken
	};
}

export const verify = function(){
	// We need to verify 
	return "Verifying the token";
}
