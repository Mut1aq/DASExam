import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { UserModule } from './modules/user/user.module';
import { ServerLogger } from './services/logger/server-logger';
import {
  I18nOptions,
  GlobalCustomExceptionFilter,
  GlobalCustomExceptionInterceptor,
  config,
} from './shared/config-constants/app.configuration';
import { DecoratorsModule } from './shared/decorators/decorators.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    I18nModule.forRoot(I18nOptions),
    TypeOrmModule.forRoot(config),
    PassportModule,
    UserModule,
    BookModule,
    AuthModule,
    DecoratorsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GlobalCustomExceptionFilter,
    GlobalCustomExceptionInterceptor,
    ServerLogger,
  ],
})
export class AppModule {}
