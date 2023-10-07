/**
 * Configuration object.
 * @typedef {object} Config
 * @property {string} node_env - The current environment.
 * @property {object} server - Server configuration.
 * @property {string} server.port - The port to run the server on.
 * @property {string} server.url - The URL of the server.
 * @property {object} cors - CORS configuration.
 * @property {string} cors.cors_origin - The CORS origin.
 * @property {object} jwt - JWT configuration.
 * @property {object} jwt.access_token - Access token configuration.
 * @property {string} jwt.access_token.secret - The secret key for access tokens.
 * @property {string} jwt.access_token.expire - The expiration time of access tokens.
 * @property {object} jwt.refresh_token - Refresh token configuration.
 * @property {string} jwt.refresh_token.secret - The secret key for refresh tokens.
 * @property {string} jwt.refresh_token.expire - The expiration time of refresh tokens.
 * @property {string} jwt.refresh_token.cookie_name - The name of the refresh token cookie.
 * @property {object} email - Email configuration.
 * @property {object} email.smtp - SMTP configuration for email.
 * @property {string} email.smtp.host - The SMTP server host.
 * @property {string} email.smtp.port - The SMTP server port.
 * @property {object} email.smtp.auth - SMTP authentication details.
 * @property {string} email.smtp.auth.username - The SMTP username.
 * @property {string} email.smtp.auth.password - The SMTP password.
 * @property {string} email.from - The email sender address.
 */

import Joi from 'joi';

const envSchema = Joi.object().keys({
	NODE_ENV: Joi.string().valid('production', 'development', 'test').default("development"),
	PORT: Joi.string().default('4000'),
	// SERVER_URL: Joi.string().required(),
	// CORS_ORIGIN: Joi.string().required().default('*'),
	ACCESS_TOKEN_SECRET: Joi.string().min(8).required(),
	ACCESS_TOKEN_EXPIRE: Joi.string().required().default('20m'),
	REFRESH_TOKEN_SECRET: Joi.string().min(8).required(),
	REFRESH_TOKEN_EXPIRE: Joi.string().default('1d'),
	MYSQL_DATABASE: Joi.string().required(),
	MYSQL_USER: Joi.string().required(),
	MYSQL_PASSWORD: Joi.string().required(),
	// SMTP_HOST: Joi.string().required(),
	// SMTP_PORT: Joi.string().default('587'),
	// SMTP_USERNAME: Joi.string().required(),
	// SMTP_PASSWORD: Joi.string().required(),
	// EMAIL_FROM: Joi.string().email().required()
});

const { value: validatedEnv, error } = envSchema
	.prefs({ errors: { label: 'key' } })
	.validate(process.env, { abortEarly: false, stripUnknown: true });

if (error) {
	throw new Error(
		`Environment variable validation error: \n${error.details
			.map((detail) => detail.message)
			.join('\n')}`
	);
}

const config = {
	node_env: validatedEnv.NODE_ENV,
	server: {
		port: validatedEnv.PORT,
		url: validatedEnv.SERVER_URL
	},
	cors: {
		cors_origin: validatedEnv.CORS_ORIGIN
	},
	jwt: {
		access_token: {
			secret: validatedEnv.ACCESS_TOKEN_SECRET,
			expire: validatedEnv.ACCESS_TOKEN_EXPIRE
		},
		refresh_token: {
			secret: validatedEnv.REFRESH_TOKEN_SECRET,
			expire: validatedEnv.REFRESH_TOKEN_EXPIRE,
			cookie_name: validatedEnv.REFRESH_TOKEN_COOKIE_NAME
		}
	},
	email: {
		smtp: {
			host: validatedEnv.SMTP_HOST,
			port: validatedEnv.SMTP_PORT,
			auth: {
				username: validatedEnv.SMTP_USERNAME,
				password: validatedEnv.SMTP_PASSWORD
			}
		},
		from: validatedEnv.EMAIL_FROM
	},
	database: {
		mysql: {
			host: 'mysql', // Connect to the docker container's internal network
			database: validatedEnv.MYSQL_DATABASE,
			username: validatedEnv.MYSQL_USER,
			password: validatedEnv.MYSQL_PASSWORD
		}
	}
} as const;

export default config;