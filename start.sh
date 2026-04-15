#!/bin/bash

echo "=== TrBlog 启动脚本 ==="
echo "正在启动 PostgreSQL 数据库..."
docker compose up -d

echo "等待数据库启动完成..."
sleep 5

echo "正在运行数据库迁移..."
cd server
npx prisma migrate dev

echo "正在启动后端服务器..."
npm run start:dev &

echo "等待后端服务器启动完成..."
sleep 5

echo "正在启动前端开发服务器..."
cd ../client
npm run dev
