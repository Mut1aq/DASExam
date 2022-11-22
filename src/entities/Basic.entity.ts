import { Column } from 'typeorm';
import { currentDate } from '../shared/util/date.util';

export abstract class Basic {
  @Column('varchar', { default: currentDate, select: false })
  readonly createDate?: string;

  @Column('varchar', { select: false })
  updateDate: string;
}
