import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import api from '../services/api';
import { Post, Comment } from '../types';

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [commentContent, setCommentContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      if (!id) throw new Error('Post ID is required');
      const response = await api.get(`/posts/${id}`);
      return response.data;
    },
  });

  const { data: comments } = useQuery({
    queryKey: ['comments', id],
    queryFn: async () => {
      if (!id) throw new Error('Post ID is required');
      const response = await api.get(`/comments/post/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const createCommentMutation = useMutation({
    mutationFn: async (data: { content: string; postId: string; parentId?: string }) => {
      const response = await api.post('/comments', data);
      return response.data;
    },
    onSuccess: () => {
      setCommentContent('');
      setReplyContent('');
      setReplyingTo(null);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      await api.delete(`/comments/${commentId}`);
    },
  });

  const handleSubmitComment = () => {
    if (!commentContent.trim()) return;
    if (!id) return;

    createCommentMutation.mutate({
      content: commentContent,
      postId: id,
    });
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return;
    if (!id) return;

    createCommentMutation.mutate({
      content: replyContent,
      postId: id,
      parentId,
    });
  };

  const handleDeleteComment = (commentId: string) => {
    if (window.confirm('确定要删除这条评论吗？')) {
      deleteCommentMutation.mutate(commentId);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto py-8">加载中...</div>;
  }

  if (isError || !post) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-red-500">加载失败: {error instanceof Error ? error.message : '未知错误'}</p>
        <button onClick={() => navigate(-1)} className="btn btn-primary mt-4">
          返回
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        {post.category && (
          <Link
            to={`/categories/${post.category.id}`}
            className="badge badge-primary mb-4 inline-block"
          >
            {post.category.name}
          </Link>
        )}
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <span>作者: {post.author.username}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        {post.coverImage && (
          <div className="mb-8 rounded-md overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-64 object-cover"
            />
          </div>
        )}
        <div className="prose prose-lg max-w-none mb-8">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">标签</h2>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag.id}
                to={`/tags/${tag.id}`}
                className="badge badge-primary"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">评论 ({comments?.length || 0})</h2>
          {localStorage.getItem('token') ? (
            <div className="mb-6">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="写下你的评论..."
                className="w-full border border-gray-300 rounded-md p-3 mb-2"
                rows={4}
              />
              <button
                onClick={handleSubmitComment}
                className="btn btn-primary px-4 py-2"
              >
                发表评论
              </button>
            </div>
          ) : (
            <p className="mb-6">
              <Link to="/login" className="text-primary">登录</Link> 后才能发表评论
            </p>
          )}
          <div className="space-y-6">
            {comments?.map((comment: Comment) => (
              <div key={comment.id} className="border border-gray-200 rounded-md p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{comment.author.username}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {comment.authorId === JSON.parse(localStorage.getItem('user') || '{}')?.id && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      删除
                    </button>
                  )}
                </div>
                <p className="mb-4">{comment.content}</p>
                <div className="flex items-center">
                  {localStorage.getItem('token') && (
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="text-primary text-sm hover:underline"
                    >
                      回复
                    </button>
                  )}
                </div>
                {replyingTo === comment.id && localStorage.getItem('token') && (
                  <div className="mt-4">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="写下你的回复..."
                      className="w-full border border-gray-300 rounded-md p-3 mb-2"
                      rows={3}
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSubmitReply(comment.id)}
                        className="btn btn-primary px-4 py-1 text-sm"
                      >
                        回复
                      </button>
                      <button
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyContent('');
                        }}
                        className="btn btn-outline px-4 py-1 text-sm"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                )}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-200 space-y-4">
                    {comment.replies.map((reply: Comment) => (
                      <div key={reply.id} className="">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-sm">{reply.author.username}</h4>
                            <p className="text-xs text-gray-500">
                              {new Date(reply.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          {reply.authorId === JSON.parse(localStorage.getItem('user') || '{}')?.id && (
                            <button
                              onClick={() => handleDeleteComment(reply.id)}
                              className="text-red-500 text-xs hover:underline"
                            >
                              删除
                            </button>
                          )}
                        </div>
                        <p className="text-sm">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
