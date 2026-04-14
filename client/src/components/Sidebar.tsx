import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Category, Tag } from '../types';

const Sidebar: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const [categoriesResponse, tagsResponse] = await Promise.all([
          api.get('/categories'),
          api.get('/tags'),
        ]);
        setCategories(categoriesResponse.data);
        setTags(tagsResponse.data);
      } catch (error) {
        console.error('Error fetching categories and tags:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndTags();
  }, []);

  if (loading) {
    return <div className="w-64 p-4">加载中...</div>;
  }

  return (
    <aside className="w-64 border-r border-gray-200 bg-white p-4">
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">分类</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/categories/${category.id}`}
                className="flex items-center justify-between text-gray-700 hover:text-primary"
              >
                <span>{category.name}</span>
                <span className="text-xs text-gray-500">
                  {category._count?.posts || 0}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">标签</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              to={`/tags/${tag.id}`}
              className="badge badge-primary"
            >
              {tag.name} ({tag._count?.posts || 0})
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
