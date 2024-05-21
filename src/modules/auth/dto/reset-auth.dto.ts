import { IsJWT, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class ResetAuthDTO {
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

  @IsJWT()
  @IsNotEmpty({ message: 'Token is required' })
  token: string;
}
