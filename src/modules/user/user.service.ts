import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookCheckout } from 'src/entities/BookCheckout.entity';
import { BookStatus } from 'src/shared/enums/book-status.enum';
import { ReturnMessage } from 'src/shared/interfaces/return-message.interface';
import { currentDate } from 'src/shared/util/date.util';
import { Repository } from 'typeorm';
import { Book } from '../book/entities/book.entity';
import { User } from './entities/user.entity';
import * as moment from 'moment';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(BookCheckout)
    private bookCheckoutRepository: Repository<BookCheckout>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user)
      throw new HttpException(
        'auth.errors.validation.wrongInfo',
        HttpStatus.BAD_REQUEST,
      );
    return user;
  }

  findUserByID(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async checkBook(bookID: number, userID: number): Promise<ReturnMessage> {
    const book = await this.bookRepository.findOneBy({ id: bookID });

    if (!book)
      throw new HttpException('book.errors.invalidID', HttpStatus.BAD_REQUEST);

    book.status =
      book.status === BookStatus.CheckedIn
        ? BookStatus.CheckedOut
        : BookStatus.CheckedIn;

    const status =
      +book.status === BookStatus.CheckedIn ? 'checkInDate' : 'checkoutDate';

    const bookCheckRecord: BookCheckout = {
      bookID,
      userID,
      updateDate: currentDate,
    };
    bookCheckRecord[status] = currentDate;

    bookCheckRecord.fees = await this.calculateFees(
      book.status,
      userID,
      bookID,
    );

    await this.bookRepository.save(book);
    await this.bookCheckoutRepository.save(bookCheckRecord);
    return {
      message: `book.success.${status}`,
      statusCode: 200,
    };
  }

  async calculateFees(
    status: BookStatus,
    userID: number,
    bookID: number,
  ): Promise<number> {
    if (status === BookStatus.CheckedOut) return 0;
    else {
      const lastCheckout = await this.bookCheckoutRepository.find({
        order: {
          id: 'DESC',
        },
        where: {
          userID,
          bookID,
        },
      });
      if (lastCheckout.length < 0) return 0;
      const businessDays = this.getBusinessDays(
        currentDate,
        lastCheckout[0]['checkoutDate'],
      );
      if (businessDays > 5) return (businessDays - 5) * 5;
      return 0;
    }
  }

  getBusinessDays(startDate: any, endDate: any): number {
    startDate = new Date(startDate.slice(0, startDate.indexOf(',')));
    endDate = new Date(endDate.slice(0, endDate.indexOf(',')));

    let count = 0;
    const curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }
}
