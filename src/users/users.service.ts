import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  find(email: string): Promise<User[]> {
    return this.usersRepository.find({ where: { email } });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException();
    return user;
  }

  async update(id: string, attrs: Partial<User>): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    Object.assign(user, attrs);
    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(dto: CreateUserDto) {
    const user = this.usersRepository.create(dto);
    try {
      return await this.usersRepository.save(user);
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY") {
        throw new HttpException(
          "Email duplicated!",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        throw new HttpException(
          "Unknown Error",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
