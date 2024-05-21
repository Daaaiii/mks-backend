import { IsJWT, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetAuthDTO {
  @ApiProperty({
    description:
      'The new password. Must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    example: 'NewPassword123!',
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

  @ApiProperty({
    description: 'The reset token',
    example: 'reset-token-example',
  })
  @IsJWT()
  @IsNotEmpty({ message: 'Token is required' })
  token: string;
}
