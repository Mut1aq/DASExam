import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BookCheckout } from 'src/entities/BookCheckout.entity';
import { BookModule } from '../book/book.module';
import { Book } from '../book/entities/book.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User, BookCheckout, Book])],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
