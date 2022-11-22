import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { MatchConstraint } from './validation/match.decorator';
import {
  CustomEmailValidation,
  CustomExistEmailValidation,
} from './validation/unique-property.decorator';

@Module({
  controllers: [],
  imports: [UserModule],
  providers: [
    CustomEmailValidation,
    CustomExistEmailValidation,
    MatchConstraint,
  ],
  exports: [CustomEmailValidation, CustomExistEmailValidation, MatchConstraint],
})
export class DecoratorsModule {}
