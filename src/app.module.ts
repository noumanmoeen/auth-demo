import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import configuration from './config/configuration';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('config.database.uri'),
        dbName: configService.get<string>('config.database.name'),
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => [{
        ttl: configService.get<number>('config.throttle.ttl'),
        limit: configService.get<number>('config.throttle.limit'),
      }],
      inject: [ConfigService],
    }),
    AuthModule,
    LoggerModule,
  ],
  controllers : [HealthController]
})
export class AppModule {}