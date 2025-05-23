FROM node:18-alpine
 
WORKDIR /app
 
COPY package*.json ./
COPY pnpm-lock.yaml ./
 
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile
 
COPY . .
 
RUN node -e "require('fs').mkdirSync('dist/proto', { recursive: true })"
RUN pnpm run build
 
EXPOSE 3900
EXPOSE 5900
 
CMD ["pnpm", "run", "start:prod"]