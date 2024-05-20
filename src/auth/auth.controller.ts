import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ResetAuthDTO } from './dto/reset-auth.dto';
import { RegisterAuthDTO } from './dto/register-auth.dto';
import { ForgetAuthDto } from './dto/forget-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: LoginAuthDto) {
    return this.authService.login(email, password);
  }
  @Post('reset')
  async reset(@Body() { password, token }: ResetAuthDTO) {
    return this.authService.reset(password, token);
  }
  @Post('register')
  async register(@Body() body: RegisterAuthDTO) {
    return this.authService.register(body);
  }
  @Post('forget')
  async forget(@Body() { email }: ForgetAuthDto) {
    return this.authService.forget(email);
  }
}
