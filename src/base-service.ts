import { Inject } from '@nestjs/common';
import { ServiceA } from './service-A';

//! @Injectable이 선언되어 있지 않다. BaseService 클래스를 직접 참조하지 않을것이다.
export class BaseService {
  // 상속 관계일때는 생성자 주입이 아닌 속성 기반 주입을 사용할 수 있다
  @Inject(ServiceA) private readonly serviceA: ServiceA;

  getHello(): string {
    return 'Hello World Base!';
  }

  doSomeFuncFromA(): string {
    return this.serviceA.getHello();
  }
}
