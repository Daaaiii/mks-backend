import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(data: CreateUserDto) {
    const userExists = await this.usersRepository.findOne({
      where: { email: data.email },
    });
    if (userExists) {
      throw new BadRequestException('Email already being used');
    }

    data.password = await this.hashPassword(data.password);
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  async findAll() {
    const cachedUsers = await this.cacheManager.get<UserEntity[]>('users');
    if (cachedUsers) {
      return cachedUsers;
    }

    const users = await this.usersRepository.find();
    await this.cacheManager.set('users', users);
    return users;
  }

  async findOne(id: string) {
    const cachedUser = await this.cacheManager.get<UserEntity>(`user_${id}`);
    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.cacheManager.set(`user_${id}`, user);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.exists(id);
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }
    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.usersRepository.findOneBy({ id });
    await this.cacheManager.set(`user_${id}`, updatedUser);
    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
    await this.cacheManager.del(`user_${id}`);
  }

  private async exists(id: string) {
    const count = await this.usersRepository.count({ where: { id } });
    if (count === 0) {
      throw new NotFoundException('User not found');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
