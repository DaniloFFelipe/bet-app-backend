import { SetMetadata } from '@nestjs/common';

export class AuthPayload {
  sub: string;
}

export type WithAuth<D> = D & { userId: string };

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
