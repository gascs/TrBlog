export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'ADMIN' | 'EDITOR' | 'USER';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  _count?: {
    posts: number;
  };
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  _count?: {
    posts: number;
  };
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  published: boolean;
  views: number;
  authorId: string;
  categoryId?: string;
  author: User;
  category?: Category;
  tags: Tag[];
  comments?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  parentId?: string;
  author: User;
  parent?: Comment;
  replies?: Comment[];
  createdAt: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
}
