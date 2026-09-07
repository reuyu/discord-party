FROM node:20-alpine

WORKDIR /app

# Root package files
COPY package.json package-lock.json ./

# Client package files
COPY client/package.json client/package-lock.json ./client/

# Server package files
COPY server/package.json server/package-lock.json ./server/

# Install all dependencies
RUN npm ci --ignore-scripts
RUN cd client && npm ci
RUN cd server && npm ci

# Copy all source code
COPY . .

# Build client and server
RUN npm run build

# Expose port
EXPOSE 4000

# Start server
CMD ["npm", "start"]
