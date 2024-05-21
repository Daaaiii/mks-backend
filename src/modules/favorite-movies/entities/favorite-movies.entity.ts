import { UserEntity } from '../../user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('favorite_movies')
export class FavoriteMovie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  movieId: string;

  @Column()
  title: string;

  @ManyToOne(() => UserEntity, (user) => user.favoriteMovies)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}
