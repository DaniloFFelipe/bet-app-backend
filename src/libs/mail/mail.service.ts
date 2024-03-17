import { Injectable } from '@nestjs/common';
import { MailClient } from './mail';

@Injectable()
export class MailService {
  constructor(private mailClient: MailClient) {}

  async sendAuthCode(email: string, code: string) {
    try {
      await this.mailClient.client.sendMail({
        from: {
          name: 'Moments',
          address: 'hi@moments.com',
        },
        to: email,
        subject: 'Authenticate to Moments',
        text: `Use the following code to authenticate on Moments: ${code.toUpperCase()}`,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
