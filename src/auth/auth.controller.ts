import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dtos/authDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authDTO: AuthDTO): Promise<void> {
    return this.authService.signUp(authDTO);
  }

  @Post('/signin')
  signIn(@Body() authDTO: AuthDTO): Promise<{ accessToken: string }> {
    return this.authService.signIn(authDTO);
  }
}
