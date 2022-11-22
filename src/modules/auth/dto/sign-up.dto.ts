import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Match } from 'src/shared/decorators/validation/match.decorator';
import { UniqueEmail } from 'src/shared/decorators/validation/unique-property.decorator';

export class SignUpDto {
  @ApiProperty({
    description: "User Email This will be checked for uniqueness",
    type: String,
    example: "user@example.com",
    required: true,
  })
  @IsEmail(undefined, {
    message: i18nValidationMessage('auth.errors.validation.email'),
  })
  @Transform((param) => param.value.toLowerCase().trim())
  email: string;

  @ApiProperty({
    description: "Password (must match with confirmPassword)",
    type: String,
    example: "ahmed@123",
    required: true,
  })
  @Length(6, 20, {
    message: i18nValidationMessage('auth.errors.validation.length.password'),
  })
  @Match('confirmPassword', {
    message: i18nValidationMessage('auth.errors.validation.matchPassword'),
  })
  password: string;

  @ApiProperty({
    description: "Confirm Password (must match with password)",
    type: String,
    example: "ahmed@123",
    required: true,
  })
  @IsNotEmpty({
    message: i18nValidationMessage(
      'auth.errors.validation.notEmpty.confirmPassword',
    ),
  })
  confirmPassword: string;

  @ApiProperty({
    description: "Full Name ",
    type: String,
    example: "Ahmed Khalid",
    required: true,
  })
  @IsString({
    message: i18nValidationMessage('auth.errors.validation.isString.fullName'),
  })
  fullName: string;

  @ApiProperty({
    description: "Date of Birth Must be in dd/mm/yyyy format",
    type: Date,
    example: "12/12/2000",
    required: true,
  })
  @Transform(({ value }) => new Date(value))
  @IsDate({
    message: i18nValidationMessage('auth.errors.validation.date'),
  })
  dob: string;
}
