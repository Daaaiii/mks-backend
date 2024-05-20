import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity()
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
