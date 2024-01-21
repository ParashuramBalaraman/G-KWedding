# Use the official Node.js image for ARM64 architecture
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install
RUN npm install -g nodemon 

# Bundle app source
COPY . .

# Expose the port that your app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]