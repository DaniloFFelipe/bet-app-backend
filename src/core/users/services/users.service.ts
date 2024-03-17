import { Injectable } from '@nestjs/common';
import { AuthCode, Session, User } from '../user.model';
import {
  RequestAuthCodeDto,
  SignInWithCodeDto,
  SignInWithPasswordDto,
  SignUpDto,
} from '../users.dto';

@Injectable()
export abstract class SignUpService {
  abstract signUp(data: SignUpDto): Promise<User>;
}

@Injectable()
export abstract class SignInWithPasswordService {
  abstract signInWithPassword(data: SignInWithPasswordDto): Promise<Session>;
}

@Injectable()
export abstract class RequestAuthCodeService {
  abstract requestAuthCode(data: RequestAuthCodeDto): Promise<AuthCode>;
}

@Injectable()
export abstract class SignInWithCodeService {
  abstract signInWithCode(data: SignInWithCodeDto): Promise<Session>;
}
