import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { AuthDTO } from './dtos/authDTO';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './repository/users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authDTO: AuthDTO): Promise<void> {
    return this.usersRepository.createUser(authDTO);
  }

  async signIn(authDTO: AuthDTO): Promise<{ accessToken: string }> {
    const { username, password } = authDTO;

    const user = await this.usersRepository.findOne({ username });

    if (user && (await compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Erro ao logar, verifica seus dados e tente novamente.',
      );
    }
  }
}
