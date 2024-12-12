# Use the official Node.js Alpine image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy all files from the current directory to /app
COPY . /app

# Install pnpm globally
RUN npm install -g pnpm

# Install all dependencies using pnpm
RUN pnpm install

# Make the script executable (if applicable)
RUN chmod +x /app/easy-resolve.sh

# Expose port 5173 to port 80 (outside world)
EXPOSE 5173
EXPOSE 6006
EXPOSE 80


# Run the build process
RUN pnpm turbo build

# Start the development server
CMD ["pnpm", "run", "builder:dev"]
