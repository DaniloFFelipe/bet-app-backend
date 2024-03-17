import { BadRequestException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import {
  SignInWithCodeDto,
  SignInWithPasswordDto,
  SignUpDto,
} from '../users.dto';
import { RequestAuthCodeDto } from '../users.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { MailService } from 'src/libs/mail/mail.service';
import { generateCode } from 'src/libs/nanoid/generate-code';
import { AuthService } from 'src/libs/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private mail: MailService,
    private auth: AuthService,
  ) {}

  async signUp({
    email,
    fullName,
    password: planPassword,
    avatarUrl,
  }: SignUpDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExists) throw new BadRequestException('Email already taken');

    const password = await argon2.hash(planPassword);
    const user = await this.prisma.user.create({
      data: {
        email,
        fullName,
        password,
        avatarUrl,
      },
      select: this.userSelect,
    });

    return user;
  }

  async requestAuthCode({ email }: RequestAuthCodeDto) {
    const user = await this.checkUserExistsByEmail(email);
    let authCode = await this.prisma.authLinks.findFirst({
      where: {
        user: {
          email,
        },
      },
    });

    if (authCode) {
      await this.prisma.authLinks.delete({
        where: {
          id: authCode.id,
        },
      });
    }
    const code = generateCode();

    authCode = await this.prisma.authLinks.create({
      data: {
        userId: user.id,
        code,
      },
    });
    await this.mail.sendAuthCode(email, code);

    return {
      token: authCode.token,
    };
  }

  async signInWithCode({ code, token: authCodeToken }: SignInWithCodeDto) {
    const authCode = await this.prisma.authLinks.findUnique({
      where: {
        token: authCodeToken,
      },
    });

    if (!authCode) throw new BadRequestException('Invalid credentials');
    if (authCode.code.toLowerCase() !== code.toLowerCase()) {
      throw new BadRequestException('Invalid credentials');
    }

    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: authCode.userId,
      },
      select: this.userSelect,
    });
    const token = await this.auth.sign({ sub: user.id });
    await this.prisma.authLinks.delete({
      where: { id: authCode.id },
    });
    return {
      token,
      user,
    };
  }

  async signInWithPassword({ email, password }: SignInWithPasswordDto) {
    const user = await this.checkUserExistsByEmail(email);

    if (!(await argon2.verify(user.password, password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = await this.auth.sign({ sub: user.id });
    return {
      token,
      user: {
        ...user,
        password: undefined,
      },
    };
  }

  private async checkUserExistsByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }

  private userSelect = {
    id: true,
    email: true,
    fullName: true,
    avatarUrl: true,
  };
}
