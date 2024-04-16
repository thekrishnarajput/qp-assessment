# Grocery Shop APIs

These are the APIs for a grocery shop, with two roles (Admin and User). They have been developed using Node.js in TypeScript.

## Prerequisites

Before running any of the scripts, make sure you have [Node.js](https://nodejs.org/) and [TypeScript](https://www.typescriptlang.org/) installed on your machine.

## Available Scripts

In the project root directory, you can run:

### `npm start`

Runs the application in production mode. It executes the compiled JavaScript file located at `dist/index.js` using Node.js.

### `npm run build`

Builds the TypeScript files into JavaScript files. It transpiles the TypeScript code to JavaScript using the TypeScript compiler (`tsc`) and generates the output in the `dist` directory.

### `npm run watch`

Watches for changes in the TypeScript files and automatically rebuilds them whenever a change is detected. It's useful during development to see immediate changes without manually triggering builds.

### `npm run dev`

Runs the application in development mode. It uses `ts-node-dev` to run the TypeScript files directly without the need for compilation. It also enables hot reloading, allowing you to see changes in real-time during development.

### `npm test`

Currently, this script echoes "Error: no test specified" and exits with code 1. You should replace it with actual test commands as per your project's testing framework and requirements.

## Additional Information

- The `prestart` script is configured to run `npm run build` before starting the application in production mode (`npm start`). This ensures that the latest changes are compiled and ready to be executed.
- Make sure to update the scripts or add additional ones as needed for your specific project requirements.

