import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * 프로퍼티 값이 다른 프로퍼티 값에 포함되지 않는지 검사합니다.
 * @param property 참조하려는 프로퍼티 이름
 * @param validationOptions
 * @returns
 */
export function NotIn(property: string, validationOptions?: ValidationOptions) {
  // 데커레이터가 선언될 객체와 속성 이름을 받는다
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'NotIn', // Decorator 이름
      target: object.constructor, // 이 데커레이터는 객체가 생성될 때 적용
      propertyName,
      options: validationOptions,
      constraints: [property], // 이 데커레이터는 Property에 적용되도록 제약
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            !relatedValue.includes(value)
          );
        },
      },
    });
  };
}
