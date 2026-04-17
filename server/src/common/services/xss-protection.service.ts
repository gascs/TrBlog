import { Injectable } from '@nestjs/common';

@Injectable()
export class XssProtectionService {
  private readonly allowedTags = new Set([
    'p', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'b', 'i', 'u', 'strong', 'em', 'br', 'hr',
    'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'td', 'th',
    'a', 'img', 'blockquote', 'pre', 'code',
  ]);

  private readonly allowedAttributes = new Set([
    'href', 'src', 'alt', 'title', 'class', 'id', 'width', 'height',
  ]);

  private readonly selfClosingTags = new Set(['br', 'hr', 'img']);

  sanitizeHtml(html: string): string {
    if (!html) return html;

    try {
      return this.processHtml(html);
    } catch (error) {
      console.error('XSS sanitization error:', error);
      return html;
    }
  }

  private processHtml(html: string): string {
    let result = '';
    let i = 0;

    while (i < html.length) {
      if (html[i] === '<') {
        const closingMatch = html.slice(i).match(/^<\/(\w+)\s*>/);
        if (closingMatch) {
          const tag = closingMatch[1].toLowerCase();
          if (this.allowedTags.has(tag)) {
            result += `</${tag}>`;
          }
          i += closingMatch[0].length;
          continue;
        }

        const tagMatch = html.slice(i).match(/^<(\w+)(\s[^>]*)?\/?>/);
        if (tagMatch) {
          const tag = tagMatch[1].toLowerCase();
          if (this.allowedTags.has(tag)) {
            const attrStr = tagMatch[2] || '';
            const sanitizedAttrs = this.sanitizeAttributesString(attrStr, tag);
            if (this.selfClosingTags.has(tag)) {
              result += `<${tag}${sanitizedAttrs} />`;
            } else {
              result += `<${tag}${sanitizedAttrs}>`;
            }
          }
          i += tagMatch[0].length;
          continue;
        }

        result += '&lt;';
        i++;
      } else if (html[i] === '>') {
        result += '&gt;';
        i++;
      } else {
        result += html[i];
        i++;
      }
    }

    return result;
  }

  private sanitizeAttributesString(attrStr: string, tag: string): string {
    if (!attrStr.trim()) return '';

    const attrRegex = /(\w+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+)))?/g;
    let match: RegExpExecArray | null;
    const sanitizedAttrs: string[] = [];

    while ((match = attrRegex.exec(attrStr)) !== null) {
      const name = match[1].toLowerCase();
      const value = match[2] ?? match[3] ?? match[4] ?? '';

      if (!this.allowedAttributes.has(name)) continue;

      if (name === 'href') {
        const lower = value.toLowerCase();
        if (!lower.startsWith('http://') && !lower.startsWith('https://') && !lower.startsWith('/')) {
          continue;
        }
      } else if (name === 'src') {
        const lower = value.toLowerCase();
        if (!lower.startsWith('http://') && !lower.startsWith('https://') && !lower.startsWith('/')) {
          continue;
        }
      }

      sanitizedAttrs.push(`${name}="${value.replace(/"/g, '&quot;')}"`);
    }

    return sanitizedAttrs.length > 0 ? ' ' + sanitizedAttrs.join(' ') : '';
  }

  sanitizeString(value: string): string {
    if (!value) return value;

    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}