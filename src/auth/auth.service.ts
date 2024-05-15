import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDto) {
    const user = await this.usersService.findByEmail(data.email);
    if (user) {
      throw new HttpException('User is already exists', 400);
    }
    data.password = await bcrypt.hash(data.password, 10);
    return await this.usersService.create(data);
  }

  async signIn(data: SignInDto) {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) {
      throw new HttpException('user not found', 404);
    }
    const isPasswordMatch = await bcrypt.compare(data.password, user?.password);
    if (!isPasswordMatch) {
      throw new HttpException('wrong password', 400);
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
