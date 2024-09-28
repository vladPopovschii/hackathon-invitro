import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { InvitroModule } from './invitro/invitro.module';
import { CoreModule } from './core/core.module';
import { AiModule } from './ai/ai.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentModule } from './document/document.module';
// import { DevtoolsModule } from '@nestjs/devtools-integration';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [
    // DevtoolsModule.register({
    //   http: true,
    // }),
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    DatabaseModule,
    InvitroModule,
    CoreModule,
    AiModule,
    DocumentModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
