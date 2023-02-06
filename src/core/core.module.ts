import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { CoreService } from './core.service';

@Module({
  imports: [CommonModule],
  providers: [CoreService],
  exports: [CommonModule],
})
export class CoreModule {}
