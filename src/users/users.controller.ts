import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { Delete, Query } from '@nestjs/common/decorators';
import { DefaultValuePipe, ParseIntPipe } from '@nestjs/common/pipes';
import { ValidationPipe } from 'src/utils/pipe/validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body(ValidationPipe) dto: CreateUserDto) {
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

  // @Get(':id')
  // async getUserInfo(@Param('id') userId: string) {
  //   return await this.userService.getUserInfo(userId);
  // }

  @Get(':id')
  findOne(
    @Param(
      'id',
      ValidationPipe,
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ) {
    return this.userService.findOne(id);
  }

  @Get()
  findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    console.log(offset, limit);

    return this.userService.findAll();
  }

  // @Delete('/:id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
