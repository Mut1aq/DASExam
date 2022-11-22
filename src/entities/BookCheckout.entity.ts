import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Basic } from './Basic.entity';

@Entity('')
export class BookCheckout extends Basic {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column('bigint')
  bookID: number;

  @Column('bigint')
  userID: number;

  @Column('varchar', { nullable: true })
  checkoutDate?: string;

  @Column('varchar', { nullable: true })
  checkInDate?: string;

  @Column('bigint', { nullable: true })
  fees?: number;
}
