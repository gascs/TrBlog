import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">后台管理</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">文章管理</h2>
          <p className="text-gray-600 mb-4">创建、编辑和删除文章</p>
          <button className="btn btn-primary">管理文章</button>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">分类管理</h2>
          <p className="text-gray-600 mb-4">创建和管理文章分类</p>
          <button className="btn btn-primary">管理分类</button>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">标签管理</h2>
          <p className="text-gray-600 mb-4">创建和管理文章标签</p>
          <button className="btn btn-primary">管理标签</button>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">用户管理</h2>
          <p className="text-gray-600 mb-4">管理用户账号</p>
          <button className="btn btn-primary">管理用户</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
