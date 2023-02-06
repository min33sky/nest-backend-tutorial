import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

/**
 * ValidationPipe 직접 구현하기
 * - 동작 원리만 파악하고 NestJS에서 제공하는 ValidationPipe를 사용하는 것을 권장
 */
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  // transform(value: any, metadata: ArgumentMetadata) {
  //   console.log('metadata: ', metadata);
  //   return value;
  // }

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value); // 순수 자바스크립트 객체를 클래스 객체로 변환
    const errors = await validate(object); // 클래스 객체를 검증

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    return value;
  }

  /**
   * 메타타입이 파이프가 지원하는 타입인지 검사
   * @param metatype
   */
  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
