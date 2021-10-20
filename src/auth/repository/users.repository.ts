import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthDTO } from '../dtos/authDTO';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async createUser(authDTO: AuthDTO): Promise<void> {
    const { username, password } = authDTO;

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists.');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }
}

export { UserRepository };
