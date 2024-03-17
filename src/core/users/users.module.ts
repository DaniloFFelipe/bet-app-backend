import { Module } from '@nestjs/common';
import { RequestAuthCodeController } from './controllers/request-auth-code.controller';
import { SignInWithCodeController } from './controllers/sign-in-with-code.controller';
import { SignInWithPasswordController } from './controllers/sign-in-with-password.controller';
import { SignUpController } from './controllers/sign-up.controller';
import { UsersService } from './services/users-impl.service';

@Module({
  controllers: [
    SignUpController,
    SignInWithPasswordController,
    RequestAuthCodeController,
    SignInWithCodeController,
  ],
  providers: [UsersService],
})
export class UsersModule {}
