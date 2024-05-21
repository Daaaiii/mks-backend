import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { FavoriteMoviesService } from './favorite-movies.service';
import { UserEntity } from '../user/entities/user.entity';
import { AuthGuard } from '../../guards/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('favorite')
export class FavoriteMoviesController {
  constructor(private readonly favoriteMoviesService: FavoriteMoviesService) {}

  @Post()
  async addFavorite(
    @Body('userId') userId: number,
    @Body('movieId') movieId: string,
    @Body('title') title: string,
  ) {
    const user = new UserEntity();
    user.id = String(userId);
    return this.favoriteMoviesService.addFavorite(user, movieId, title);
  }

  @Get(':userId')
  async getFavorites(@Param('userId') userId: string) {
    return this.favoriteMoviesService.getFavoritesByUser(userId);
  }
}
