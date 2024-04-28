import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { User, UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwt: JwtService,
  ) {}

  async signup(dto: AuthDto) {
    try {
      // We check if the user exists in the database first
      const existingUser = await this.userService.findOne(dto.email);
      // If it does not exist, we insert it into the db
      if (!existingUser) {
        // Generates a hash for the user's password
        const hash = await argon.hash(dto.password);
        // Saves the user's email in the database and its respective hash
        const user = await this.userService.create({ email: dto.email, hash });
        return user;
      }
      // If it does exits, then we throw and exception
      throw new ForbiddenException('This email is already in use');
    } catch (error) {
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // First, we check if the email is valid.
    const user: User | null = await this.userService.findOne(dto.email);
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const passwordMatches = await argon.verify(user.hash, dto.password);
    if (!passwordMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }
    console.log({ user });
    return await this.signToken(user._id as string, user.email);
  }

  async signToken(userId: string, email: string) {
    const payload = {
      usb: userId,
      email,
    };
    const secret = 'The North remembers';
    return {
      access_token: await this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret,
      }),
    };
  }
}
