import Elysia from "elysia";
import authRouter from "./auth.router";

const v1 = new Elysia({ prefix: "/api/v1" })

v1.use(authRouter);

export default v1;