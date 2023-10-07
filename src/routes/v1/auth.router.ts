// import { Router } from 'express';
// import validate from '../../middleware/validate';
// import { loginSchema, signupSchema } from '../../validations/auth.validation';
// import * as authController from '../../controller/auth.controller';

import Elysia from "elysia";
import { login, signup, _verifyAccess, _validateSignup} from "./auth.controller";

const authRouter = new Elysia({ prefix: 'auth' });

// TODO: Return an HTTP response 400 BAD REQUEST if a validation error occurs or calls next if no error occurs
authRouter.post('/signup', signup, {
	beforeHandle: _validateSignup
});

// authRouter.post('/signup', validate(signupSchema), authController.handleSignUp);
authRouter.post('/login', login);

authRouter.get("/verify", () => { 
	return "I can see this";
}, {
	beforeHandle: _verifyAccess
});

// authRouter.post('/login', validate(loginSchema), authController.handleLogin);


// authRouter.post('/logout', authController.handleLogout);

// authRouter.post('/refresh', authController.handleRefresh);

export default authRouter;