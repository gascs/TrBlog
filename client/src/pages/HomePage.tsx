import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Post } from '../types';

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['posts', page, limit],
    queryFn: async () => {
      const response = await api.get('/posts', {
        params: { page, limit },
      });
      return response.data;
    },
  });

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading) {
    return <div className="container mx-auto py-8">加载中...</div>;
  }

  if (isError) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-red-500">加载失败: {error instanceof Error ? error.message : '未知错误'}</p>
        <button onClick={() => refetch()} className="btn btn-primary mt-4">
          重试
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">最新文章</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.posts.map((post: Post) => (
          <div key={post.id} className="card hover:shadow-md transition-shadow">
            {post.coverImage && (
              <div className="mb-4 rounded-md overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
            <div className="mb-2">
              {post.category && (
                <Link
                  to={`/categories/${post.category.id}`}
                  className="badge badge-primary mb-2 inline-block"
                >
                  {post.category.name}
                </Link>
              )}
            </div>
            <h2 className="text-xl font-semibold mb-2">
              <Link to={`/posts/${post.id}`} className="hover:text-primary">
                {post.title}
              </Link>
            </h2>
            {post.excerpt && (
              <p className="text-gray-600 mb-4 line-clamp-2">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>作者: {post.author.username}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
      {data?.total > page * limit && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            className="btn btn-primary px-6 py-2"
          >
            加载更多
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
