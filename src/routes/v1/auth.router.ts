import Elysia from "elysia";
import { login, signup, refresh, _verifyAccess, _validateCredentials, logout} from "./auth.controller";

const authRouter = new Elysia({ prefix: 'auth' });

// Routes that don't require access token but must have a valid request body
authRouter.post('/signup', signup, {
	beforeHandle: _validateCredentials
});

authRouter.post('/login', login, {
	beforeHandle: _validateCredentials
});

// Routes that require access token
authRouter.post('/logout', logout, {
	beforeHandle: _verifyAccess
});

authRouter.get("/verify", () => { 
	return {
		success: true,
		message: "Access token is valid"
	};
}, {
	beforeHandle: _verifyAccess
});

authRouter.post("/refresh", refresh, {
	beforeHandle: _verifyAccess
});

export default authRouter;