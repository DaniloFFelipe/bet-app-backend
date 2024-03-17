import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { env } from '../env';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
