import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgetAuthDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;
}
