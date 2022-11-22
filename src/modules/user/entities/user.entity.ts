import { Basic } from 'src/entities/Basic.entity';
import { Book } from 'src/modules/book/entities/book.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends Basic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  fullName: string;

  @Column()
  password: string;

  @Column()
  dob: string;

  @OneToMany(() => Book, (book) => book.user)
  createdBooks: Book[];
}
