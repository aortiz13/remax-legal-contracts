# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config template to the templates directory
# Nginx image automatically substitutes env vars for files in /etc/nginx/templates/*.template
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 83

CMD ["nginx", "-g", "daemon off;"]
