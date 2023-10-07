import { JWTMiddleware } from './jwt.interface';

export interface HTTPRequest {
	access_token: JWTMiddleware;
	refresh_token: JWTMiddleware;
	[key: string]: any; // Any other optional properties of any type
}
