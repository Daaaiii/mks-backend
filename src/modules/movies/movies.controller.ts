import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AuthGuard } from '../../guards/auth/auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MovieEntity } from './entities/movieEntity';

@ApiTags('movies')
@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  @ApiOperation({ summary: 'Search movies by title' })
  @ApiQuery({ name: 'title', required: true, type: String })
  @ApiResponse({
    status: 200,
    description: 'List of movies matching the title',
    type: [MovieEntity],
  })
  async searchMovie(@Query('title') title: string) {
    return await this.moviesService.searchMovie(title);
  }

  @Get('details')
  @ApiOperation({ summary: 'Get movie details by ID' })
  @ApiQuery({ name: 'id', required: true, type: String })
  @ApiResponse({
    status: 200,
    description: 'Details of the movie',
    type: MovieEntity,
  })
  async getMovieDetails(@Query('id') id: string) {
    return await this.moviesService.getMovieDetails(id);
  }
}
