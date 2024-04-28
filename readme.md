# Grocery Shop APIs

These are the APIs for a grocery shop.

Prioritized security by implementing measures such as JWT, Helmet, BcryptJS, CORS, DotEnv, Express Validator, as well as implemented loggers like Morgan and Pino. Utilized MySQL as the Relational Database and built the application using Express.js with Typescript for strict type checking and the project structure is fully modules based.

Managing Role Based Authentication and API access was also a key focus. Developed Auto admin creation on server start, custom middlewares to handle responses, errors, URL not found, and logging. Additionally, Created schema tables and interfaces, implemented Enums for various codes, and incorporated common functions. Docker was used for containerizing the project and database to facilitate deployment and maintenance.

## Prerequisites

Before running any of the scripts, make sure you have [Node.js](https://nodejs.org/), [TypeScript](https://www.typescriptlang.org/), and [MySQL](https://www.mysql.com/downloads/) installed on your machine.

## Postman Collection

[Please click here](https://documenter.getpostman.com/view/20048469/2sA3BuV8BH) to see the Postman Collection and documentation.

## Docker commands

```
docker-compose build --no-cache
docker-compose --env-file .env up -d
```

## Available Scripts

In the project root directory, you can run:

### `npm start`

Runs the application in production mode. It executes the compiled JavaScript file located at `dist/index.js` using Node.js.

### `npm run build`

Builds the TypeScript files into JavaScript files. It transpile the TypeScript code to JavaScript using the TypeScript compiler (`tsc`) and generates the output in the `dist` directory.

### `npm run watch`

Watches for changes in the TypeScript files and automatically rebuilds them whenever a change is detected. It's useful during development to see immediate changes without manually triggering builds.

### `npm run dev`

Runs the application in development mode. It uses `ts-node-dev` to run the TypeScript files directly without the need for compilation. It also enables hot reloading, allowing you to see changes in real-time during development.

### `ENV Variables`

```
PORT=3030
JWT_SECRET= "8B61CBC6579DDCE9D988DF3FE5EC11EC7556C8951F4C6D91175D711514C7F1458A19F641877475AB99CC677828A57869BDCC2AC7C2ECE7EB73D47779E67562A73FA1587651B65A18DDFC82D91C6688348B864D3DBB6AE4"
ADMIN_NAME="Mukesh Karn"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="1234"
ADMIN_MOBILE=8976543210
ADMIN_NAME2="Krishna Karn"
ADMIN_EMAIL2="admin2@example.com"
ADMIN_PASSWORD2="1111"
ADMIN_MOBILE2=8976543211

MYSQL_ROOT_PASSWORD="root"
MYSQL_HOST="127.0.0.1"
DOCKER_MYSQL_HOST="db"
IS_DOCKER_ENV="true"
```

## Additional Information

- The `prestart` script is configured to run `npm run build` before starting the application in production mode (`npm start`). This ensures that the latest changes are compiled and ready to be executed.
- Make sure to update the scripts or add additional ones as needed for your specific project requirements.

## Routes, Actions and Methods

| Methods | Routes           | Actions     |
| ------- | ---------------- | ----------- |
| POST    | /api/admin/login | Admin Login |