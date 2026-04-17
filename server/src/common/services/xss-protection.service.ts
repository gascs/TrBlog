import { Injectable } from '@nestjs/common';
import { JSDOM } from 'jsdom';

@Injectable()
export class XssProtectionService {
  private readonly allowedTags = [
    'p', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'b', 'i', 'u', 'strong', 'em', 'br', 'hr',
    'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'td', 'th',
    'a', 'img', 'blockquote', 'pre', 'code'
  ];

  private readonly allowedAttributes = [
    'href', 'src', 'alt', 'title', 'class', 'id', 'width', 'height'
  ];

  sanitizeHtml(html: string): string {
    if (!html) return html;

    try {
      const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
      const document = dom.window.document;
      const tempElement = document.createElement('div');
      tempElement.innerHTML = html;

      this.sanitizeElement(tempElement);

      return tempElement.innerHTML;
    } catch (error) {
      console.error('XSS sanitization error:', error);
      return html;
    }
  }

  private sanitizeElement(element: Element): void {
    const children = Array.from(element.children);

    for (const child of children) {
      if (!this.allowedTags.includes(child.tagName.toLowerCase())) {
        const textNode = document.createTextNode(child.textContent || '');
        child.replaceWith(textNode);
      } else {
        this.sanitizeAttributes(child);
        this.sanitizeElement(child);
      }
    }
  }

  private sanitizeAttributes(element: Element): void {
    const attributes = Array.from(element.attributes);

    for (const attr of attributes) {
      if (!this.allowedAttributes.includes(attr.name.toLowerCase())) {
        element.removeAttribute(attr.name);
      } else if (attr.name.toLowerCase() === 'href') {
        const value = attr.value.toLowerCase();
        if (!value.startsWith('http://') && !value.startsWith('https://') && !value.startsWith('/')) {
          element.removeAttribute('href');
        }
      } else if (attr.name.toLowerCase() === 'src') {
        const value = attr.value.toLowerCase();
        if (!value.startsWith('http://') && !value.startsWith('https://') && !value.startsWith('/')) {
          element.removeAttribute('src');
        }
      }
    }
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