import { Controller, Get, UseGuards } from '@nestjs/common';
// import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/decorator';
import { User } from './users.service';
import { AuthGuard } from '@nestjs/passport';

// Setting the Guard here means that anything inside the controller will need authorization
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
  // Alternative
  // getMe(@GetUser() user: User, @GetUser('_id') _id: string) {
  //   console.log('Hi');
  //   console.log({
  //     _id,
  //   });
  //   console.log(user);
  //   return user;
  // }
}
