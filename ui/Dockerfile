FROM node:22.17.0-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm i
COPY .env index.html tsconfig.app.json tsconfig.json tsconfig.node.json vite.config.ts ./
COPY public ./public
COPY src ./src
RUN npm run build

FROM nginx:stable-alpine AS production
COPY --from=builder /app/dist /var/www/html
COPY nginx/nginx.conf.template /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]