# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# 先复制package文件，利用Docker缓存
COPY package*.json ./

# 使用npm ci确保一致的依赖安装
RUN npm ci --legacy-peer-deps

# 然后复制其他文件
COPY . .

# 构建
RUN npm run build

# Production stage
FROM nginx:1.25-alpine

# 复制构建产物
COPY --from=build /app/dist /usr/share/nginx/html

# 复制nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
