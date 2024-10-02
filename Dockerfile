# Step 1: Build the React app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Step 2: Set up the Express server
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the built files from the previous step
COPY --from=build /app/build ./build

# Copy the Express server code
COPY server.js ./

# Install express
RUN npm install express

# Expose the port the app runs on
EXPOSE 9000

# Start the server
CMD ["node", "server.js"]
