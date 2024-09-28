import { Request } from 'express';

export type AuthRequest = Request & {
  user: {
    userId: number;
    email: string;
    personId: number;
  };
};
