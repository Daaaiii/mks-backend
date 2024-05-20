import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { FavoriteMoviesService } from './favorite-movies.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('favorite-movies')
export class FavoriteMoviesController {
  constructor(private readonly favoriteMoviesService: FavoriteMoviesService) {}

  @Post()
  async addFavorite(
    @Body('userId') userId: number,
    @Body('movieId') movieId: string,
  ) {
    const user = new UserEntity();
    user.id = String(userId);
    return this.favoriteMoviesService.addFavorite(user, movieId);
  }

  @Get(':userId')
  async getFavorites(@Param('userId') userId: string) {
    return this.favoriteMoviesService.getFavoritesByUser(userId);
  }
}
