import { Module } from '@nestjs/common';
import { FavoriteMoviesService } from './favorite-movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteMovie } from './entities/favorite-movies.entity';
import { FavoriteMoviesController } from './favorite-movies.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteMovie]), AuthModule, UserModule],
  providers: [FavoriteMoviesService],
  controllers: [FavoriteMoviesController],
})
export class FavoriteMoviesModule {}
