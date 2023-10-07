# bun-elysia-auth-service
<h1 align="center">Bun-Elysia-TS-Auth-Service</h1>

<p>
A pre-built stateless authentication server that uses JSON Web Tokens (JWT) for authentication. It is built using Elysia.js, TypeScript(Bun) and SQLite3.
</p>

## Upcoming changes
- [ ] OAUTH way of authenticating instead of username and password
- [ ] Add support for logging
- [ ] Add support for other RDS
- [ ] Add support for other NoSQL DB
- [ ] Add support for SMTP
- [ ] Add a way to easily add a new version of the API

## File Structure and Coding Convention
* Controllers are in the `/routes` folder with `.controller` suffix before `.ts` extension. (e.g. `auth.controller.ts`)
* The middlewares for the routes are located in the `controllers`. They are distinguished from other functions by having a prefix "_" on the function name.