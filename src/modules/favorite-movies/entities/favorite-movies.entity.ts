import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('favorite_movie')
export class FavoriteMovie {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  movieId: string;

  @Column()
  @ApiProperty()
  title: string;

  @ManyToOne(() => UserEntity, (user) => user.favoriteMovies)
  @ApiProperty({ type: () => UserEntity })
  user: UserEntity;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;
}
