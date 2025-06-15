# Use an official Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Expose port
EXPOSE 5003

# ✅ Generate Prisma client at container startup
CMD ["sh", "-c", "npx prisma generate && node ./src/server.js"]
