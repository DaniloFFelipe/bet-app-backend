import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './auth.type';
import { env } from '../env';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  sign(payload: AuthPayload) {
    return this.jwtService.signAsync(payload, {
      secret: env.JWT_SECRET_KEY,
    });
  }

  verify(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: env.JWT_SECRET_KEY,
    });
  }
}
