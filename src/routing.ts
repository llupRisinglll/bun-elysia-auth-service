
/**
 * This file will have all of the routes
 * @typedef {import('elysia').Elysia} Elysia
 */
import Elysia from "elysia";
import authRouter from "./routes/v1/auth.router";
import v1 from "./routes/v1";

const app = new Elysia();
app.get('/', () => 'Hello Elysia 123');


// if (config.node_env === 'production') {
// 	app.use('/api/v1/auth', authLimiter);
// }

app.use(v1);

// app.use('/api/v1', passwordRouter);

// app.use('/api/v1', verifyEmailRouter);

// app.get('/secret', isAuth, (_req, res) => {
// 	res.json({
// 		message: 'You can see me'
// 	});
// });

// app.all('*', (req, res) => {
// 	res.status(404);
// 	if (req.accepts('html')) {
// 		res.sendFile(path.join(__dirname, 'views', '404.html'));
// 	} else if (req.accepts('json')) {
// 		res.json({ error: '404 Not Found' });
// 	} else {
// 		res.type('txt').send('404 Not Found');
// 	}
// });

export default app;
