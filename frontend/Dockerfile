## Build Stage
# Use Node.js 20 Alpine as base image
FROM node:22-alpine AS base

# Set the working directory inside the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install 

#Copy the rest of your application files
COPY . .

# Build the application
RUN npm run build

## Production stage
FROM nginx:stable-alpine AS production
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

