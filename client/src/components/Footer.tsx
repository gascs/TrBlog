import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p className="mb-2">© {new Date().getFullYear()} TrBlog. All rights reserved.</p>
        <p className="text-sm">
          一个现代化的个人博客系统，使用 React + NestJS + PostgreSQL 构建
        </p>
      </div>
    </footer>
  );
};

export default Footer;
