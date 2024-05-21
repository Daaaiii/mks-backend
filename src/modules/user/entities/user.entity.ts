import { FavoriteMovie } from '../../favorite-movies/entities/favorite-movies.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 'a3d2d1b2-cd89-4e57-8e2a-0f1b8e6a43a7',
  })
  id: string;

  @Column({ length: 100, nullable: false })
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  name: string;

  @Column({ unique: true, nullable: false, length: 127 })
  @ApiProperty({
    description: 'Email of the user',
    example: 'user@example.com',
  })
  email: string;

  @Column({ nullable: false, length: 132 })
  @ApiProperty({
    description: 'Password of the user',
    example: 'Password123!',
  })
  password: string;

  @OneToMany(() => FavoriteMovie, (favoriteMovie) => favoriteMovie.user)
  @ApiProperty({
    description: 'List of favorite movies',
    type: () => [FavoriteMovie],
  })
  favoriteMovies: FavoriteMovie[];

  @CreateDateColumn()
  @ApiProperty({
    description: 'Date when the user was created',
    example: '2024-05-20T14:35:22Z',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'Date when the user was last updated',
    example: '2024-05-20T14:35:22Z',
  })
  updatedAt: Date;
}
