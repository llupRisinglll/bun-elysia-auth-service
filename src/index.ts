import app from './init';
import config from './config/config';

/**
 * Starts the server and listens to the specified port.
 * @param {number} port The port to listen on.
 */
function startServer(port: Number) {
	const server = app.listen(port, () => {
		console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
	});


	process.on('SIGTERM', () => {
		console.info('SIGTERM signal received.');
		console.info('Closing server.');

		server.stop();
	});
}

const SERVER_PORT = Number(config.server.port);
startServer(SERVER_PORT);