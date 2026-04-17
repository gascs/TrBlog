export const getCDNUrl = (path: string): string => {
  const cdnUrl = import.meta.env.VITE_CDN_URL;
  if (cdnUrl) {
    // 确保CDN URL以斜杠结尾
    const normalizedCdnUrl = cdnUrl.endsWith('/') ? cdnUrl : `${cdnUrl}/`;
    // 确保路径不以斜杠开头
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    return `${normalizedCdnUrl}${normalizedPath}`;
  }
  return path;
};