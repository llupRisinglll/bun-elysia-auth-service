// import { Router } from 'express';
// import validate from '../../middleware/validate';
// import { loginSchema, signupSchema } from '../../validations/auth.validation';
// import * as authController from '../../controller/auth.controller';

import Elysia from "elysia";
import authRouter from "./auth.router";

const v1 = new Elysia({ prefix: "/api/v1" })

v1.use(authRouter);

export default v1;