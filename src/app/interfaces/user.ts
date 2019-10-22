export interface User {
  readonly id: string;
  readonly createdAt: Date;

  name: string;
  email: string;
  admin: boolean;
  likeCount?: number;
  likeIds: string[];
}
