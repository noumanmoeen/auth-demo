import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from './auth.service';
import { LoggerModule } from 'src/logger/logger.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('config.jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('config.jwt.expiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
    LoggerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
