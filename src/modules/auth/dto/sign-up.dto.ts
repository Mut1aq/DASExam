import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Match } from 'src/shared/decorators/validation/match.decorator';
import { UniqueEmail } from 'src/shared/decorators/validation/unique-property.decorator';

export class SignUpDto {
  @IsEmail(undefined, {
    message: i18nValidationMessage('auth.errors.validation.email'),
  })
  @Transform((param) => param.value.toLowerCase().trim())
  email: string;

  @Length(6, 20, {
    message: i18nValidationMessage('auth.errors.validation.length.password'),
  })
  @Match('confirmPassword', {
    message: i18nValidationMessage('auth.errors.validation.matchPassword'),
  })
  password: string;

  @IsNotEmpty({
    message: i18nValidationMessage(
      'auth.errors.validation.notEmpty.confirmPassword',
    ),
  })
  confirmPassword: string;

  @IsString({
    message: i18nValidationMessage('auth.errors.validation.isString.fullName'),
  })
  fullName: string;

  @Transform(({ value }) => new Date(value))
  @IsDate({
    message: i18nValidationMessage('auth.errors.validation.date'),
  })
  dob: string;
}
