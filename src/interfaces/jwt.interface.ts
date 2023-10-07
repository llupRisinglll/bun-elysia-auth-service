import { JWTPayloadSpec } from "@elysiajs/jwt";

export interface JWTMiddleware {
	sign(morePayload: any): Promise<string>; // TOFIX: Change to the actual type, because for know I have no fucking idea what I should type this hahaha
	verify(payload: string): Promise<JWTPayloadSpec | false>;
}