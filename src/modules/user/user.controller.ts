import {
  Controller,
  Post,
  Request,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserService } from './user.service';

@ApiTags('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({
    status: 201,
    description:
      'The Checkout has been successfully created, and the fees were calculated based on business days',
  })
  @ApiNotFoundResponse({ description: 'If Book ID is incorrect' })
  @ApiParam({
    name: 'bookID',
    description: 'ID of the book you want to checkout',
  })
  @Post('check/:bookID')
  bookCheck(
    @Param('bookID', ParseIntPipe) bookID: number,
    @Request() req: any,
  ) {
    return this.userService.checkBook(bookID, req?.user?.id);
  }
}
