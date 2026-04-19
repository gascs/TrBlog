import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Upload, Database, FileText, Folder, Tag, Users, AlertCircle, Check, Download } from 'lucide-react';
import api from '../../services/api';

const MigrationPage: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<string>('wordpress');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [migrationStatus, setMigrationStatus] = useState<'idle' | 'uploading' | 'processing' | 'completed' | 'error'>('idle');
  const [migrationResult, setMigrationResult] = useState<{
    posts: number;
    categories: number;
    tags: number;
    users: number;
  } | null>(null);

  // 支持的博客系统
  const supportedSystems = [
    { value: 'wordpress', label: 'WordPress', description: '支持WordPress XML导出文件' },
    { value: 'hexo', label: 'Hexo', description: '支持Hexo Markdown文件' },
    { value: 'jekyll', label: 'Jekyll', description: '支持Jekyll Markdown文件' },
    { value: 'medium', label: 'Medium', description: '支持Medium导出文件' },
    { value: 'ghost', label: 'Ghost', description: '支持Ghost JSON导出文件' },
  ];

  // 模拟迁移操作
  const migrateMutation = useMutation({
    mutationFn: async (data: { system: string; file: File }) => {
      // 这里应该是实际的文件上传和处理逻辑
      // 模拟API调用
      const response = await api.post('/migration/import', {
        system: data.system,
        fileName: data.file.name
      });
      return response.data;
    },
    onMutate: () => {
      setMigrationStatus('uploading');
    },
    onSuccess: (data) => {
      setMigrationStatus('completed');
      setMigrationResult(data);
    },
    onError: () => {
      setMigrationStatus('error');
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedFile) {
      migrateMutation.mutate({ system: selectedSystem, file: uploadedFile });
    }
  };

  const handleDownloadTemplate = () => {
    // 模拟下载模板文件
    alert('模板文件下载功能开发中...');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">博客迁移</h1>
          <p className="text-gray-600">从其他博客系统迁移数据到 TrBlog</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600" />
          迁移工具
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 选择博客系统 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">源博客系统 <span className="text-red-500">*</span></label>
            <select
              required
              value={selectedSystem}
              onChange={(e) => setSelectedSystem(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              {supportedSystems.map((system) => (
                <option key={system.value} value={system.value}>
                  {system.label} - {system.description}
                </option>
              ))}
            </select>
          </div>

          {/* 上传文件 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">导出文件 <span className="text-red-500">*</span></label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
              {uploadedFile ? (
                <div className="flex items-center justify-center gap-3">
                  <FileText className="w-8 h-8 text-green-500" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-500">{Math.round(uploadedFile.size / 1024)} KB</p>
                  </div>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">点击或拖拽文件到此处上传</p>
                  <p className="text-sm text-gray-500">支持的文件类型: XML, JSON, ZIP</p>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    选择文件
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* 迁移选项 */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">迁移选项</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="migrate-posts"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="migrate-posts" className="ml-2 text-sm text-gray-700">
                  迁移文章
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="migrate-categories"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="migrate-categories" className="ml-2 text-sm text-gray-700">
                  迁移分类
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="migrate-tags"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="migrate-tags" className="ml-2 text-sm text-gray-700">
                  迁移标签
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="migrate-users"
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="migrate-users" className="ml-2 text-sm text-gray-700">
                  迁移用户
                </label>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={!uploadedFile || migrationStatus === 'uploading' || migrationStatus === 'processing'}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {migrationStatus === 'uploading' && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {migrationStatus === 'uploading' ? '上传中...' : migrationStatus === 'processing' ? '处理中...' : '开始迁移'}
            </button>
            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              下载模板
            </button>
          </div>
        </form>
      </div>

      {/* 迁移结果 */}
      {migrationStatus === 'completed' && migrationResult && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Check className="w-6 h-6 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900">迁移成功</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-gray-900">文章</h4>
              </div>
              <p className="text-2xl font-bold text-green-700">{migrationResult.posts}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Folder className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-gray-900">分类</h4>
              </div>
              <p className="text-2xl font-bold text-blue-700">{migrationResult.categories}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-5 h-5 text-purple-600" />
                <h4 className="font-medium text-gray-900">标签</h4>
              </div>
              <p className="text-2xl font-bold text-purple-700">{migrationResult.tags}</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-amber-600" />
                <h4 className="font-medium text-gray-900">用户</h4>
              </div>
              <p className="text-2xl font-bold text-amber-700">{migrationResult.users}</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">迁移提示</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 迁移完成后，建议检查一下导入的内容是否正确</li>
              <li>• 部分格式可能需要手动调整</li>
              <li>• 图片可能需要重新上传</li>
            </ul>
          </div>
        </div>
      )}

      {/* 迁移错误 */}
      {migrationStatus === 'error' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-900">迁移失败</h3>
          </div>
          <p className="text-gray-600 mb-4">迁移过程中出现错误，请检查文件格式是否正确，或尝试重新上传。</p>
          <button
            onClick={() => setMigrationStatus('idle')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            重试
          </button>
        </div>
      )}

      {/* 迁移指南 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          迁移指南
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">WordPress 迁移步骤</h4>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
              <li>登录 WordPress 后台</li>
              <li>进入 "工具" → "导出"</li>
              <li>选择 "所有内容" 并点击 "下载导出文件"</li>
              <li>在本页面上传下载的 XML 文件</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Hexo/Jekyll 迁移步骤</h4>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
              <li>压缩整个 source/_posts 目录</li>
              <li>在本页面上传压缩文件</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Medium 迁移步骤</h4>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
              <li>登录 Medium 账号</li>
              <li>进入 "设置" → "下载你的信息"</li>
              <li>下载包含文章的 ZIP 文件</li>
              <li>在本页面上传下载的 ZIP 文件</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Ghost 迁移步骤</h4>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
              <li>登录 Ghost 后台</li>
              <li>进入 "设置" → "实验室" → "导出内容"</li>
              <li>下载 JSON 导出文件</li>
              <li>在本页面上传下载的 JSON 文件</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MigrationPage;