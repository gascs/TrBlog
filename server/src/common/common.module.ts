import { Module } from '@nestjs/common';
import { XssProtectionService } from './services/xss-protection.service';

@Module({
  providers: [XssProtectionService],
  exports: [XssProtectionService],
})
export class CommonModule {}
