import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookStatus } from 'src/shared/enums/book-status.enum';
import { ReturnMessage } from 'src/shared/interfaces/return-message.interface';
import { currentDate } from 'src/shared/util/date.util';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createBookDto: CreateBookDto, req: any): Promise<ReturnMessage> {
    const userID = req?.user?.id;
    const book = this.bookRepository.create(createBookDto);
    const user = await this.userRepository.findOneBy({ id: userID });
    book.status = BookStatus.CheckedIn;
    book.updateDate = currentDate;
    book.user = user;

    await this.userRepository.save(user);
    await this.bookRepository.save(book);
    return {
      message: 'book.success.creation',
      statusCode: 201,
    };
  }

  findAll() {
    return this.bookRepository.find({
      relations: {
        user: true,
      },
    });
  }

  findAllAvailableBooks() {
    return this.bookRepository.find({
      where: { status: BookStatus.CheckedIn },
      relations: {
        user: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
