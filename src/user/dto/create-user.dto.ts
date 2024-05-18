import {
  IsNotEmpty,
  IsStrongPassword,
  Length,
  IsEmail,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 100, {
    message: 'Name must have at least 3 characters and at most 100 characters',
  })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @Length(3, 127)
  @IsEmail()
  email: string;

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
  @MaxLength(32, {
    message: 'Password is too long, must be less than 32 characters',
  })
  password: string;
}
