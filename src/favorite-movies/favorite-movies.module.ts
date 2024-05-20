import { Module } from '@nestjs/common';
import { FavoriteMoviesService } from './favorite-movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteMovie } from './entities/favorite-movies.entity';
import { FavoriteMoviesController } from './favorite-movies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteMovie])],
  providers: [FavoriteMoviesService],
  controllers: [FavoriteMoviesController],
})
export class FavoriteMoviesModule {}
