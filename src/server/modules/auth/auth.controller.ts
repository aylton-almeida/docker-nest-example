import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  UsersService,
  EmailAndPasswordPayload,
  IdAndEmailPayload,
} from '../users';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() body: EmailAndPasswordPayload): Promise<string> {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    return await this.authService.createToken(user);
  }

  @Post('register')
  async createUser(@Body() user: EmailAndPasswordPayload): Promise<string> {
    const newUser = await this.usersService.create(user);
    return await this.authService.createToken(newUser.id);
  }

  @UseGuards(AuthGuard())
  @Get('me')
  async getLoggedInUser(
    @Request() request: { user: IdAndEmailPayload },
  ): Promise<IdAndEmailPayload> {
    return request.user;
  }
}
