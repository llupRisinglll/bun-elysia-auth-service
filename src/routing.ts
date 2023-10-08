
/**
 * This file will have all of the routes
 * @typedef {import('elysia').Elysia} Elysia
 */
import Elysia from "elysia";
import v1 from "./routes/v1";

const app = new Elysia();

app.get('/health', () => 'OK');

app.use(v1);

app.all("*", (request) => {
	request.set.status = 404;

	return {
		"success": false,
		"message": "404 Not Found"
	}
})

export default app;
