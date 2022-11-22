import { Basic } from 'src/entities/Basic.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { BookStatus } from 'src/shared/enums/book-status.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('book')
export class Book extends Basic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: '150',
    unique: true,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: '150',
  })
  ISBN: string;

  @Column({
    type: 'varchar',
    length: '150',
  })
  publishDate: string;

  @Column({
    type: 'int',
    enum: BookStatus,
    width: 1,
    default: 2,
  })
  status: BookStatus;

  @ManyToOne(() => User, (user) => user.createdBooks)
  user: User;
}
