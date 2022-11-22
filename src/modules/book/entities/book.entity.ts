import { Basic } from 'src/entities/Basic.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { BookStatus } from 'src/shared/enums/book-status.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book extends Basic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  ISBN: string;

  @Column()
  publishDate: string;

  @Column()
  status: BookStatus;

  @ManyToOne(() => User, (user) => user.createdBooks)
  user: User;
}
