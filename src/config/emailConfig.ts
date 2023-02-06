import { registerAs } from '@nestjs/config';

/**
 * 'email'이란 토큰으로 ConfigFactory를 등록하는 함수
 *
 */
export default registerAs('email', () => ({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASSWORD,
  },
  baseUrl: process.env.EMAIL_BASE_URL,
}));
