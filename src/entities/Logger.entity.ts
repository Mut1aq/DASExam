import { Logging } from 'src/shared/enums/logging.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Basic } from './Basic.entity';

@Entity('')
export class Logger extends Basic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userID: number;

  @Column()
  bookID: number;

  @Column()
  activity: Logging;
}
