import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup() {
    return this.authService.signup();
  }

  // Specifies the http response's status to be 200 because by POST's default one for successful request is 201 (CREATED), that's why no @HttpCode() decorator was used in the signup endpoint. However, when a user signs in, nothing is created so it's not accurate.
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
