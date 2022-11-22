import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('book')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('book')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  @ApiCreatedResponse({
    status: 201,
    description:
      'The Book has been successfully created, and the logged In user was attached as the author',
  })
  @ApiBadRequestResponse({ status: 400, description: 'If Title Exists.' })
  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Request() req: any) {
    const book = await this.bookRepository.findOneBy({
      title: createBookDto.title,
    });
    if (book)
      throw new HttpException(
        'book.errors.validation.uniqueTitle',
        HttpStatus.BAD_REQUEST,
      );
    return this.bookService.create(createBookDto, req);
  }

  @ApiOkResponse({ description: 'Return all books' })
  @ApiNoContentResponse({ description: 'no books in the database' })
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @ApiOkResponse({ description: 'Return all available books' })
  @ApiNoContentResponse({ description: 'no available books in the database' })
  @Get('available-books')
  findAllAvailableBooks() {
    return this.bookService.findAllAvailableBooks();
  }
}
