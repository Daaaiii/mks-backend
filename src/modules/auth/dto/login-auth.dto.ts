import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'The password of the user. Must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    example: 'Password123!',
  })
  @IsNotEmpty({ message: 'Password is required' })
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
  password: string;
}
