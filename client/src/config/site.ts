export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  logo: string;
  keywords: string[];
  footer: {
    copyright: string;
    icp: string;
    police: string;
    icpLink: string;
    policeLink: string;
  };
  social: {
    github: string;
    twitter: string;
    email: string;
    discord: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
}

export const siteConfig: SiteConfig = {
  title: 'TrBlog',
  description: '一个基于 React + NestJS 的现代化博客系统',
  author: 'TrBlog Team',
  logo: 'T',
  keywords: ['博客', 'React', 'NestJS', 'TypeScript'],
  footer: {
    copyright: `© ${new Date().getFullYear()} TrBlog. All rights reserved.`,
    icp: '京ICP备12345678号-1',
    police: '京公网安备 123456789012345号',
    icpLink: 'https://beian.miit.gov.cn/',
    policeLink: 'https://beian.gov.cn/',
  },
  social: {
    github: 'https://github.com/trblog',
    twitter: 'https://twitter.com/trblog',
    email: 'contact@trblog.com',
    discord: 'https://discord.gg/trblog',
  },
  contact: {
    phone: '123-4567-8910',
    email: 'contact@trblog.com',
    address: '北京市海淀区',
  },
};
