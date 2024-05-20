import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  async searchMovie(@Query('title') title: string) {
    return await this.moviesService.searchMovie(title);
  }

  @Get('details')
  async getMovieDetails(@Query('id') id: string) {
    return await this.moviesService.getMovieDetails(id);
  }
}
