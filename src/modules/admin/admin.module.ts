import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), forwardRef(() => AdminModule)],
  controllers: [],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
