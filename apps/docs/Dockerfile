# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Build the Storybook static files
RUN npm run build-storybook

# Use an official Nginx image to serve the built files
FROM nginx:alpine

# Copy the Storybook static files from the build stage
COPY --from=0 /usr/src/app/storybook-static /usr/share/nginx/html

# Expose the port for the application
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]