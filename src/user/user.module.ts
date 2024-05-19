import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CacheModule.register()],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
