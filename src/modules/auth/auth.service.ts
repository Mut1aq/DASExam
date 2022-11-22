import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReturnMessage } from 'src/shared/interfaces/return-message.interface';
import { currentDate } from 'src/shared/util/date.util';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user: User = await this.userService.findUserByEmail(email);
    if (!user)
      throw new HttpException(
        'auth.errors.validation.wrongInfo',
        HttpStatus.BAD_REQUEST,
      );
    const isMatch = await bcrypt.compare(password, user?.password);

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException(
      'auth.errors.validation.wrongInfo',
      HttpStatus.BAD_REQUEST,
    );
  }

  async signUp(signUpDto: SignUpDto): Promise<ReturnMessage> {
    delete signUpDto['confirmPassword'];
    const user = this.userRepository.create(signUpDto);
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    user.updateDate = currentDate;
    await this.userRepository.save(user);
    return { statusCode: 201, message: 'auth.success.signUp' };
  }

  async login(req: any): Promise<{ token: string }> {
    const { user } = req;
    delete user['password'];
    const payload = user;
    const token = this.jwtService.sign(payload, {
      secret: process.env.TOKEN_SECRET,
      expiresIn: process.env.EXPIRES_IN,
    });
    return { token };
  }

  async issueToken(userID: any): Promise<string> {
    const token = this.jwtService.sign(
      { id: userID },
      {
        secret: process.env.TOKEN_SECRET,
        expiresIn: process.env.PASSWORD_EXPIRES_IN,
      },
    );

    return token;
  }
}
