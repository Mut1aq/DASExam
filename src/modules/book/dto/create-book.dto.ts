import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateBookDto {
  @IsNotEmpty({
    message: i18nValidationMessage('book.errors.validation.notEmpty.title'),
  })
  @Length(1, 1809, {
    message: i18nValidationMessage('book.errors.validation.length.title'),
  })
  title: string;

  @IsNotEmpty({
    message: i18nValidationMessage('book.errors.validation.notEmpty.isbn'),
  })
  @Length(18, 18, {
    message: i18nValidationMessage('book.errors.validation.length.isbn'),
  })
  ISBN: string;

  @IsNotEmpty({
    message: i18nValidationMessage(
      'book.errors.validation.notEmpty.publishDate',
    ),
  })
  @Transform(({ value }) => new Date(value))
  @IsDate({
    message: i18nValidationMessage('auth.errors.validation.date'),
  })
  publishDate: string;
}
