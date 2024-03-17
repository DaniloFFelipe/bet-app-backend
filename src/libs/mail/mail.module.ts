import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailClient } from './mail';

@Global()
@Module({
  providers: [MailClient, MailService],
  exports: [MailService],
})
export class MailModule {}
