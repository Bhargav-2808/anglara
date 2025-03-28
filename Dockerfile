# Use official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for efficient caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build TypeScript files
RUN npm run build

# Expose the port your app runs on (change if needed)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
