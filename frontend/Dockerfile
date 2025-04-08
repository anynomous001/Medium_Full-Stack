# Use an official Node.js runtime as a parent image
FROM node:current-alpine3.21


# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./


# Copy the frontend application files
COPY . .

# Install dependencies
RUN npm install

# Build the frontend application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
