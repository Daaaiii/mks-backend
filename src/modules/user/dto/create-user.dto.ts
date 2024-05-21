import {
  IsNotEmpty,
  IsStrongPassword,
  Length,
  IsEmail,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 100, {
    message: 'Name must have at least 3 characters and at most 100 characters',
  })
  name: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'user@example.com',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @Length(3, 127)
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'Password123!',
  })
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  @MaxLength(132, {
    message: 'Password is too long',
  })
  password: string;
}
