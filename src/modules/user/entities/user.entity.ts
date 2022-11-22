import { Basic } from 'src/entities/Basic.entity';
import { Book } from 'src/modules/book/entities/book.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User extends Basic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: '150',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: '150',
  })
  fullName: string;

  @Column({
    type: 'varchar',
    length: '150',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: '150',
  })
  dob: string;

  @OneToMany(() => Book, (book) => book.user)
  createdBooks: Book[];
}
