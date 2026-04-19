import React, { useMemo } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  objectFit = 'cover',
}) => {
  // 只在src变化时计算一次
  const imageProps = useMemo(() => {
    // 检查是否为外部API图片
    const isExternalApi = src.includes('trae-api-cn.mchost.guru') || src.includes('api.') || src.includes('cdn.');
    
    // 对于外部API图片，不尝试转换为WebP
    if (isExternalApi) {
      return {
        usePicture: false,
        src,
      };
    }
    
    // 对于本地图片，尝试使用WebP格式
    const webPSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    return {
      usePicture: true,
      src,
      webPSrc,
    };
  }, [src]);

  if (imageProps.usePicture) {
    return (
      <picture className={className}>
        {/* WebP格式 */}
        <source srcSet={imageProps.webPSrc} type="image/webp" />
        {/* 原始格式作为 fallback */}
        <img
          src={imageProps.src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          style={{ objectFit }}
          className="w-full h-auto"
        />
      </picture>
    );
  }

  // 对于外部API图片，直接使用img标签
  return (
    <img
      src={imageProps.src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      style={{ objectFit }}
      className={`w-full h-auto ${className}`}
    />
  );
};

export default OptimizedImage;