import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold text-primary">
            TrBlog
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary">
              首页
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-primary">
              分类
            </Link>
            <Link to="/tags" className="text-gray-700 hover:text-primary">
              标签
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              {user.role === 'ADMIN' && (
                <Link to="/admin" className="text-gray-700 hover:text-primary">
                  后台管理
                </Link>
              )}
              <span className="text-gray-700">{user.username}</span>
              <button
                onClick={handleLogout}
                className="btn btn-outline px-3 py-1"
              >
                退出
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-primary">
                登录
              </Link>
              <Link to="/register" className="btn btn-primary px-4 py-1">
                注册
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
