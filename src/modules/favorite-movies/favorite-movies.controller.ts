import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { FavoriteMoviesService } from './favorite-movies.service';
import { UserEntity } from '../user/entities/user.entity';
import { AuthGuard } from '../../guards/auth/auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateFavoriteMovieDto } from './dto/create-favorite-movie.dto';
import { FavoriteMovie } from './entities/favorite-movies.entity';

@ApiTags('favorite')
@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
@Controller('favorite')
export class FavoriteMoviesController {
  constructor(private readonly favoriteMoviesService: FavoriteMoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Add a movie to favorites' })
  @ApiBody({ type: CreateFavoriteMovieDto })
  @ApiResponse({
    status: 201,
    description: 'Movie added to favorites',
    type: FavoriteMovie,
  })
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
  @ApiOperation({ summary: 'Get favorite movies by user ID' })
  @ApiParam({ name: 'userId', type: String })
  @ApiResponse({
    status: 200,
    description: 'List of favorite movies',
    type: [FavoriteMovie],
  })
  async getFavorites(@Param('userId') userId: string) {
    return this.favoriteMoviesService.getFavoritesByUser(userId);
  }
}
