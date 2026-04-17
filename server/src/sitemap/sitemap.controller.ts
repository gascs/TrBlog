import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Controller('sitemap')
export class SitemapController {
  constructor(private prisma: PrismaService) {}

  @Get('xml')
  async getSitemap(@Res() res: Response) {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    
    const posts = await this.prisma.post.findMany({
      where: { published: true },
      select: { id: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    });

    const categories = await this.prisma.category.findMany({
      select: { id: true, updatedAt: true },
    });

    const tags = await this.prisma.tag.findMany({
      select: { id: true, updatedAt: true },
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  ${posts.map(post => `
  <url>
    <loc>${baseUrl}/posts/${post.id}</loc>
    <lastmod>${post.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  `).join('')}
  
  ${categories.map(category => `
  <url>
    <loc>${baseUrl}/categories/${category.id}</loc>
    <lastmod>${category.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  `).join('')}
  
  ${tags.map(tag => `
  <url>
    <loc>${baseUrl}/tags/${tag.id}</loc>
    <lastmod>${tag.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
  `).join('')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  }
}
