import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
}) => {
  // 生成WebP格式的图片URL
  const webPSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  return (
    <picture className={className}>
      {/* WebP格式 */}
      <source srcSet={webPSrc} type="image/webp" />
      {/* 原始格式作为 fallback */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className="w-full h-auto object-cover"
      />
    </picture>
  );
};

export default OptimizedImage;