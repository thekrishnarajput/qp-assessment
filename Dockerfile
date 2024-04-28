# # An official node.js run time
# FROM node:18-alpine

# # Make directory with permission to install dependencies
# # RUN /home/node/app
# # RUN mkdir -p /home/node/app/node_modules && chmod -R 777 node:node /home/node/app

# # Working directory
# WORKDIR /usr/src/app
# RUN chmod -R 777 .

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json .

# # RUN npm install -g npm@10.5.2

# # Install dependencies
# RUN npm i

# # Copy the rest of the code to the working directory
# # COPY --chown=node:node . .
# COPY . .

# # USER root
# # Install TS globally
# RUN npm install typescript --save-dev

# # Ensure the user is not a root user for security purposes
# USER node

# # Make a project build
# RUN npm run build

# # Expose Server port
# EXPOSE 3030

# # Command to run the server
# CMD ["node", "dist/index.js"]

FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy the entire project directory
COPY . .

# Install dependencies
RUN npm install

# Create the dist directory with the correct permissions
RUN mkdir dist && chmod 777 dist

# Build the TypeScript code
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["node", "dist/index.js"]