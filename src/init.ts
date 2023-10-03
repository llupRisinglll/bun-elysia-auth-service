/**
 * @typedef {import('elysia').Elysia} Elysia
 */

import { Elysia } from 'elysia';

const app = new Elysia();

// Add the middlewares here
// TODO: Add support for Helmet
// TODO: Add support for JSON Request BODY
// TODO: Parse url encoded request body
// TODO: Add XSS middleware
// TODO: Add cookieparser 


app.get('/', () => 'Hello Elysia');

/** @type {Elysia} */
export default app;


