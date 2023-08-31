import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get<string>('email_user'),
        pass: this.configService.get<string>('email_password'),
      },
    });
  }

  async sendMail({ to, subject, html }) {
    console.log(to, this.configService.get('email_user'));
    await this.transporter.sendMail({
      from: {
        name: '系统邮件',
        address: this.configService.get('email_user'),
      },
      to,
      subject,
      html,
    });
  }
}
