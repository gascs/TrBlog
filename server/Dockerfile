FROM node:18-alpine

WORKDIR /app

# 先复制package文件，利用Docker缓存
COPY package*.json ./

# 使用npm ci确保一致的依赖安装
RUN npm ci --legacy-peer-deps

# 然后复制其他文件
COPY . .

# 生成Prisma客户端
RUN npx prisma generate

# 构建项目
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
