import { FavoriteMovie } from '../../favorite-movies/entities/favorite-movies.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ unique: true, nullable: false, length: 127 })
  email: string;

  @Column({ nullable: false, length: 132 })
  password: string;

  @OneToMany(() => FavoriteMovie, (favoriteMovie) => favoriteMovie.user)
  favoriteMovies: FavoriteMovie[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
