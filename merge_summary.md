This merge introduces comprehensive optimizations and new features to the TrBlog project, including dark mode support, performance improvements, security enhancements, and monitoring capabilities. Key changes include theme toggle functionality, page lazy loading, skeleton components, health check endpoints, Redis caching, and security protections.

| File | Changes |
|------|---------|
| TrBlog_Comprehensive_Optimization_Plan.md | - Added comprehensive optimization plan document<br>- Outlined completed and planned tasks for performance, security, and other improvements |
| client/.env.example | - Added environment variables configuration file<br>- Included API URL, CDN URL, and environment settings |
| client/package.json | - Added terser for code minification<br>- Added vite-plugin-compression for static resource compression<br>- Added vite-plugin-image-optimizer for image optimization |
| client/src/App.tsx | - Implemented page lazy loading with React.lazy and Suspense<br>- Added loading state component for better user experience |
| client/src/components/Navbar.tsx | - Added theme toggle component<br>- Added dark mode support for navigation elements<br>- Updated styling for better dark mode compatibility |
| client/src/components/Skeleton.tsx | - Added skeleton components for various UI elements<br>- Included SkeletonText, SkeletonCard, SkeletonPostCard, and SkeletonDetail components |
| client/src/components/ThemeToggle.tsx | - Added theme toggle component<br>- Implemented cycle between light, dark, and system themes |
| client/src/contexts/ThemeContext.tsx | - Added theme context implementation<br>- Implemented dark mode support with system preference detection<br>- Added theme persistence in localStorage |
| client/src/utils/cdn.ts | - Added CDN utility function<br>- Implemented CDN URL handling and normalization |
| client/tailwind.config.js | - Added dark mode configuration |
| client/vite.config.ts | - Added Vite plugins for compression and image optimization<br>- Configured build optimizations |
| server/package.json | - Added class-validator-extended for extended validation<br>- Added csurf for CSRF protection<br>- Added helmet for security headers<br>- Added ioredis for Redis integration<br>- Added jsdom for DOM manipulation |
| server/src/health/health.controller.ts | - Added health check endpoint<br>- Implemented database and Redis health checks |
| server/src/health/health.module.ts | - Added health module |
| server/src/redis/redis.module.ts | - Added Redis module |
| server/src/redis/redis.service.ts | - Added Redis service implementation |
| server/src/common/middleware/origin-check.middleware.ts | - Added origin check middleware for security |
| server/src/common/middleware/rate-limit.middleware.ts | - Added rate limit middleware for API protection |
| server/src/common/services/xss-protection.service.ts | - Added XSS protection service |
| server/src/post/post.service.ts | - Added Redis caching for performance<br>- Added XSS protection for content safety<br>- Implemented performance optimizations |
| server/src/auth/dtos/register.dto.ts | - Added new validation rules for user registration |
| server/src/user/dtos/create-user.dto.ts | - Added new validation rules for user creation |
| server/src/user/dtos/update-user.dto.ts | - Added new validation rules for user updates |