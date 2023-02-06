import { BadRequestException } from '@nestjs/common/exceptions';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { NotIn } from 'src/utils/decorators/not-in';

export class CreateUserDto {
  @Transform(({ value, obj }) => {
    // if (obj.password.includes(obj.name.trim())) {
    //   throw new BadRequestException('비밀번호에 이름을 포함할 수 없습니다.');
    // }
    return value.trim();
  })
  @NotIn('password', {
    message: '비밀번호에 이름을 포함할 수 없습니다.',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @IsString()
  @IsEmail()
  @MaxLength(60)
  email: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  password: string;
}
