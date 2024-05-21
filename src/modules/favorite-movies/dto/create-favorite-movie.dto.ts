import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteMovieDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  movieId: string;

  @ApiProperty()
  title: string;
}
