import { User as PrismaUser, Role } from '@prisma/client';

export class User implements PrismaUser {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
