/**
 * This file will have all of the middleware and initializations
 * @typedef {import('elysia').Elysia} Elysia
 */

import { Elysia } from 'elysia';
import Routing from './routing';
import jwt, { JWTPayloadSpec } from '@elysiajs/jwt';
import config from './config/config';

const app = new Elysia();



// Declare the access token
app.use(
	jwt({
		name: 'access_token',
		secret: config.jwt.access_token.secret,
		exp: config.jwt.access_token.expire
	})
)

// Declare the access token
app.use(
	jwt({
		name: 'refresh_token',
		secret: config.jwt.refresh_token.secret,
		exp: config.jwt.refresh_token.expire
	})
)

// Routing.use(app)
app.use(Routing);

/** @type {Elysia} */
export default app;


