# Use an official Node.js runtime as a parent image
FROM node:20-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --production --silent

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 8081

# Start the app
CMD ["node", "src/server.js"]