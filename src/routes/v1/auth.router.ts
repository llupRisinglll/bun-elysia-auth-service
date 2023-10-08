// import { Router } from 'express';
// import validate from '../../middleware/validate';
// import { loginSchema, signupSchema } from '../../validations/auth.validation';
// import * as authController from '../../controller/auth.controller';

import Elysia from "elysia";
import { login, signup, _verifyAccess, _validateCredentials} from "./auth.controller";

const authRouter = new Elysia({ prefix: 'auth' });

authRouter.post('/signup', signup, {
	beforeHandle: _validateCredentials
});

authRouter.post('/login', login, {
	beforeHandle: _validateCredentials
});


authRouter.get("/verify", () => { 
	return "I can see this";
}, {
	beforeHandle: _verifyAccess
});

// authRouter.post('/login', validate(loginSchema), authController.handleLogin);

// authRouter.post('/logout', authController.handleLogout);

// authRouter.post('/refresh', authController.handleRefresh);

export default authRouter;