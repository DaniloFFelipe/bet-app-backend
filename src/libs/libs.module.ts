import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { StorageService } from './storage/storage.service';

@Global()
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MailModule,
    AuthModule,
  ],
  providers: [PrismaService, StorageService],
  exports: [PrismaService, StorageService],
})
export class LibsModule {}
