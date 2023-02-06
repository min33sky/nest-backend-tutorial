import { Inject, Injectable } from '@nestjs/common';
import Mail = require('nodemailer/lib/mailer');
import * as nodeMailer from 'nodemailer';
import emailConfig from 'src/config/emailConfig';
import { ConfigType } from '@nestjs/config';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor(
    @Inject(emailConfig.KEY) // key: 'email'
    private readonly config: ConfigType<typeof emailConfig>,
  ) {
    this.transporter = nodeMailer.createTransport({
      service: config.service,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
    });
  }

  /**
   * 회원가입 인증 메일 전송
   *
   * @param emailAddress
   * @param signupVerifyToken
   * @returns
   */
  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string,
  ) {
    const baseUrl = this.config.baseUrl;

    // 이 주소를 클릭하면 회원가입 인증이 완료된다.
    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
        <h1>가입확인 버튼을 누르시면 가입 인증이 완료됩니다.</h1>
        <p>아래 링크를 클릭하여 이메일 인증을 완료해주세요.</p>
        <form action="${url}" method="POST">
            <button>가입확인</button>
        </form>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
