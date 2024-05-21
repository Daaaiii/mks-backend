import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ResetAuthDTO } from './dto/reset-auth.dto';
import { RegisterAuthDTO } from './dto/register-auth.dto';
import { ForgetAuthDto } from './dto/forget-auth.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginAuthDto })
  @ApiResponse({
    status: 200,
    description: 'Successful login',
    type: AuthResponseDto,
  })
  async login(@Body() { email, password }: LoginAuthDto) {
    return this.authService.login(email, password);
  }

  @Post('forget')
  @ApiOperation({ summary: 'Forget password' })
  @ApiBody({ type: ForgetAuthDto })
  @ApiResponse({
    status: 200,
    description: 'Password reset email sent',
    type: AuthResponseDto,
  })
  async forget(@Body() { email }: ForgetAuthDto) {
    return this.authService.forget(email);
  }

  @Post('reset')
  @ApiOperation({ summary: 'Reset password' })
  @ApiBody({ type: ResetAuthDTO })
  @ApiResponse({
    status: 200,
    description: 'Password reset',
    type: AuthResponseDto,
  })
  async reset(@Body() { password, token }: ResetAuthDTO) {
    return this.authService.reset(password, token);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterAuthDTO })
  @ApiResponse({
    status: 201,
    description: 'User registered',
    type: AuthResponseDto,
  })
  async register(@Body() body: RegisterAuthDTO) {
    return this.authService.register(body);
  }
}
