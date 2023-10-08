import { JWTPayloadSpec } from "@elysiajs/jwt";

export interface expectedPayload{
	userId: string | number
}

export interface JWTMiddleware {
	sign(payload: expectedPayload): Promise<string>; // TOFIX: Change to the actual type, because for know I have no fucking idea what I should type this hahaha
	verify(payload: string): Promise<JWTPayloadSpec | false>;
}