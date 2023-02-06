import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Delete, Query } from '@nestjs/common/decorators';
import { createUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() dto: createUserDto) {
    const { email, name, password } = dto;
    await this.userService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto) {
    const { signupVerifyToken } = dto;

    await this.userService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto) {
    const { email, password } = dto;

    return await this.userService.login(email, password);
  }

  @Get('/:id')
  async getUserInfo(@Param('id') userId: string) {
    return await this.userService.getUserInfo(userId);
  }

  // @Delete('/:id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
