import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Basic } from './Basic.entity';

@Entity('book_checkout')
export class BookCheckout extends Basic {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'bigint',
  })
  bookID: number;

  @Column({
    type: 'bigint',
  })
  userID: number;

  @Column({ nullable: true, type: 'varchar', length: '150' })
  checkoutDate?: string;

  @Column({ nullable: true, type: 'varchar', length: '150' })
  checkInDate?: string;

  @Column({ nullable: true, type: 'int' })
  fees?: number;
}
