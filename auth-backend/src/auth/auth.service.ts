import { Injectable, ConflictException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
 import { ConfigService } from '@nestjs/config';
import { UserDocument, User } from './schemas/user.schema';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private logger: LoggerService,
    private configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { email, name, password } = signUpDto;

    try {
      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        this.logger.warn(`Signup attempt with existing email: ${email}`);
        throw new ConflictException('Email already exists');
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const newUser = new this.userModel({
        email,
        name,
        password: hashedPassword,
      });
      
       const savedUser = await newUser.save();
 
      const token = this.generateToken(savedUser._id.toString());
      this.logger.log(`User signed up successfully: ${email}`);
      return { token };
    } catch (error) {
      this.logger.error(`Error during signup: ${error.message}`, error.stack);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred during signup');
    }
  }

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { email, password } = signInDto;

    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        this.logger.warn(`Signin attempt with non-existent email: ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        this.logger.warn(`Signin attempt with invalid password for email: ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      const token = this.generateToken(user._id.toString());
      this.logger.log(`User signed in successfully: ${email}`);
      return { token };
    } catch (error) {
      this.logger.error(`Error during signin: ${error.message}`, error.stack);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred during signin');
    }
  }

  private generateToken(userId: string): string {
    return this.jwtService.sign(
      { userId },
      {
        secret: this.configService.get<string>('config.jwt.secret'),
expiresIn: this.configService.get<string>('config.jwt.expiresIn'),
      }
    );
  }
}