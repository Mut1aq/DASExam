import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginDto {
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
    description: "Password must match the password of the given email's user password",
    type: String,
    example: "ahmed@123",
    required: true,
  })
  @Length(6, 20, {
    message: i18nValidationMessage('auth.errors.validation.length.password'),
  })
  password: string;
}
