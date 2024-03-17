import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailClient {
  client = nodemailer.createTransport({
    host: 'mailhog.nhost.orb.local',
    port: 1025,
    secure: false,
    debug: true,
  });
}
