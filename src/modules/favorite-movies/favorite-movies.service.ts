import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteMovie } from './entities/favorite-movies.entity';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class FavoriteMoviesService {
  constructor(
    @InjectRepository(FavoriteMovie)
    private favoriteMovieRepository: Repository<FavoriteMovie>,
  ) {}

  async addFavorite(
    user: UserEntity,
    movieId: string,
    title: string,
  ): Promise<FavoriteMovie> {
    const favoriteMovie = this.favoriteMovieRepository.create({
      user,
      movieId,
      title,
    });
    return this.favoriteMovieRepository.save(favoriteMovie);
  }

  async getFavoritesByUser(userId: string): Promise<FavoriteMovie[]> {
    return this.favoriteMovieRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
