import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserService } from './user.service';

@ApiTags('user')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('check/:bookID')
  bookCheck(
    @Param('bookID', ParseIntPipe) bookID: number,
    @Request() req: any,
  ) {
    return this.userService.checkBook(bookID, req?.user?.id);
  }
}
