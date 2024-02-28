import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signUp(data: SignUpDto) {
    const user = await this.usersService.findByEmail(data.email);
    if (user) {
      throw new HttpException('User is already exists', 400);
    }
    data.password = await bcrypt.hash(data.password, 10);
    return await this.usersService.create(data);
  }
}
