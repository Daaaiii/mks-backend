import { Module, forwardRef } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { HttpModule } from '@nestjs/axios';
import { MoviesController } from './movies.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [HttpModule, forwardRef(() => AuthModule), UserModule],
  providers: [MoviesService],
  exports: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
