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
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('book')
@UseGuards(JwtAuthGuard)
@Controller('book')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

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

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get('available-books')
  findAllAvailableBooks() {
    return this.bookService.findAllAvailableBooks();
  }
}
