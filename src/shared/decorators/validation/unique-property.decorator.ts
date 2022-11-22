import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';

/**
 * #### Custom Validator to check if the email exists or not
 */
@ValidatorConstraint({ name: 'UniqueEmail', async: true })
@Injectable()
export class CustomEmailValidation implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async validate(
    email: string,
    validationArguments?: ValidationArguments,
  ): Promise<any> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      return true;
    }
    return false;
  }
}

export function UniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CustomEmailValidation,
    });
  };
}
/**
 * ### for student user
 * #### Custom Validator to check if the email exists or not
 */
@ValidatorConstraint({ name: 'ExistEmail', async: true })
@Injectable()
export class CustomExistEmailValidation
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email: value } });
    if (!user) {
      return false;
    }
    return true;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Email does't Exists`;
  }
}

export function ExistEmail(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CustomExistEmailValidation,
    });
  };
}
