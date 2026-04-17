import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Send, Trash2 } from 'lucide-react';
import api from '../services/api';
import { Comment } from '../types';

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [commentContent, setCommentContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const { data: comments } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const response = await api.get(`/comments/post/${postId}`);
      return response.data;
    },
    enabled: !!postId,
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

    createCommentMutation.mutate({
      content: commentContent,
      postId: postId,
    });
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return;

    createCommentMutation.mutate({
      content: replyContent,
      postId: postId,
      parentId,
    });
  };

  const handleDeleteComment = (commentId: string) => {
    if (window.confirm('确定要删除这条评论吗？')) {
      deleteCommentMutation.mutate(commentId);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        评论 ({comments?.length || 0})
      </h2>
      
      {localStorage.getItem('token') ? (
        <div className="mb-8">
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="写下你的评论..."
            className="w-full border border-gray-200 rounded-xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
            rows={4}
          />
          <button
            onClick={handleSubmitComment}
            disabled={!commentContent.trim()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
            发表评论
          </button>
        </div>
      ) : (
        <p className="mb-8 text-gray-600">
          <a href="/login" className="text-blue-600 font-medium hover:text-blue-700">登录</a> 后才能发表评论
        </p>
      )}
      
      <div className="space-y-6">
        {comments?.map((comment: Comment, index: number) => (
          <motion.div
              key={comment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-4 md:p-6"
            >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {comment.author.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{comment.author.username}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString('zh-CN')}
                  </p>
                </div>
              </div>
              {comment.authorId === JSON.parse(localStorage.getItem('user') || '{}')?.id && (
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-gray-700 mb-4">{comment.content}</p>
            <div className="flex items-center">
              {localStorage.getItem('token') && (
                <button
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
                >
                  回复
                </button>
              )}
            </div>
            {replyingTo === comment.id && localStorage.getItem('token') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4"
              >
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="写下你的回复..."
                  className="w-full border border-gray-200 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                  rows={3}
                />
                <div className="flex space-x-2 sm:space-x-3">
                  <button
                    onClick={() => handleSubmitReply(comment.id)}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium transition-colors"
                  >
                    回复
                  </button>
                  <button
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyContent('');
                    }}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors"
                  >
                    取消
                  </button>
                </div>
              </motion.div>
            )}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-6 pl-4 border-l-2 border-gray-200 space-y-4">
                {comment.replies.map((reply: Comment) => (
                  <div key={reply.id} className="bg-white rounded-lg p-4 border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {reply.author.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900">{reply.author.username}</h4>
                          <p className="text-xs text-gray-500">
                            {new Date(reply.createdAt).toLocaleDateString('zh-CN')}
                          </p>
                        </div>
                      </div>
                      {reply.authorId === JSON.parse(localStorage.getItem('user') || '{}')?.id && (
                        <button
                          onClick={() => handleDeleteComment(reply.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-gray-700">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;