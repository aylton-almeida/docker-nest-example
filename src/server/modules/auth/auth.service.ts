import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmailAndPassword(
      email,
      password,
    );
    if (!user) {
      throw new UnauthorizedException('Wrong login combination!');
    }
    return user;
  }

  async createToken(id: number): Promise<string> {
    return this.jwtService.sign({ id });
  }
}
