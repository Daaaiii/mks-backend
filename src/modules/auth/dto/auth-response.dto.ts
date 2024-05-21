import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'Access token for authentication',
    example: 'access-token-example',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token for authentication',
    example: 'refresh-token-example',
    required: false,
  })
  refreshToken?: string;
}
