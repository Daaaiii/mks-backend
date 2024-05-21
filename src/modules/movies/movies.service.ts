import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  private readonly apiUrl = 'http://www.omdbapi.com/';
  private readonly apiKey = process.env.OMDB_API_KEY;

  constructor(private readonly httpService: HttpService) {}

  async searchMovie(title: string): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.get(this.apiUrl, {
        params: {
          apikey: this.apiKey,
          s: title,
        },
      }),
    );
    return response.data;
  }

  async getMovieDetails(id: string): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.get(this.apiUrl, {
        params: {
          apikey: this.apiKey,
          i: id,
        },
      }),
    );
    return response.data;
  }
}
