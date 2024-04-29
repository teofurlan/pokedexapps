import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { JwtGuard } from './guard';
import { GetUser } from 'src/decorator';
import { User } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() user: AuthDto) {
    return this.authService.signup(user);
  }

  // Specifies the http response's status to be 200 because by POST's default one for successful request is 201 (CREATED), that's why no @HttpCode() decorator was used in the signup endpoint. However, when a user signs in, nothing is created so it's not accurate.
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() user: AuthDto) {
    return this.authService.signin(user);
  }

  @UseGuards(JwtGuard)
  @Get('validate')
  validate(@GetUser() user: User) {
    return user;
  }
}
