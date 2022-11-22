import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateBookDto {
  @ApiProperty({
    description: 'Book Title, Must be unique',
    type: String,
    example: 'The Great Gatsby',
    required: true,
  })
  @IsNotEmpty({
    message: i18nValidationMessage('book.errors.validation.notEmpty.title'),
  })
  @Length(1, 1809, {
    message: i18nValidationMessage('book.errors.validation.length.title'),
  })
  title: string;

  @ApiProperty({
    description:
      'ISBN, Must be exactly 17 characters; 13 numbers and 4 hyphens',
    type: String,
    example: '978-1-4028-9462-6',
    required: true,
  })
  @IsNotEmpty({
    message: i18nValidationMessage('book.errors.validation.notEmpty.isbn'),
  })
  @Length(17, 17, {
    message: i18nValidationMessage('book.errors.validation.length.isbn'),
  })
  ISBN: string;

  @ApiProperty({
    description: 'Publish Date',
    type: String,
    example: '12/12/2000',
    required: true,
  })
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
