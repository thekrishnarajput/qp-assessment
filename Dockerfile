# # An official node.js run time
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the project directory
COPY . .

# Create the dist directory with the correct permissions
RUN mkdir dist && chmod 777 dist

# Build the TypeScript code
RUN npm run build

# Expose the port your app runs on
EXPOSE 3030

# Start the app
CMD ["node", "dist/index.js"]