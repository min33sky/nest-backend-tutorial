import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { v1 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly emailService: EmailService) {}

  /**
   * 회원 가입
   * @param name
   * @param email
   * @param password
   */
  async createUser(name: string, email: string, password: string) {
    await this.checkUserExists(email);

    const signupVerifyToken = uuid();

    await this.saveUser(name, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  /**
   * 이메일 인증
   * @param signupVerifyToken
   */
  async verifyEmail(signupVerifyToken: string) {
    // TODO
    // 1. DB에서 signupVerifyToken으로 회원 가입 처리중인 유저가 있는지 조회하고 없다면 에러 처리
    // 2. 바로 로그인 상태가 되도록 JWT를 발급

    console.log('이메일 인증 토큰: ', signupVerifyToken);

    throw new Error('verifyEmail Method not implemented.');
  }

  /**
   * 로그인
   * @param email
   * @param password
   */
  async login(email: string, password: string) {
    // TODO
    // 1. eamil, password를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. JWT를 발급
    throw new Error('Method not implemented.');
  }

  /**
   * 유저 정보 조회
   * @param userId
   */
  async getUserInfo(userId: string) {
    // TODO
    // 1. userId를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. 유저 정보를 반환
    throw new Error('Method not implemented.');
  }

  private checkUserExists(email: string) {
    return false; //TODO: DB 연동 후 구현
  }

  private saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    return; // TODO: DB 연동 후 구현
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }
}
