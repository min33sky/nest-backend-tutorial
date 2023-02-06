import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  hello() {
    return `Hello from CommonService!`;
  }
}
