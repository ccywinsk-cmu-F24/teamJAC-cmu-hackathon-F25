import bcrypt from "bcryptjs";
import { IUserRepository } from "../repositories/user.repository";
import { RegisterUserDto, UserResponseDto } from "../dto/user.dto";

export interface IUserService {
  register(dto: RegisterUserDto): Promise<UserResponseDto | null>;
}

export class UserService implements IUserService {
  private readonly SALT_ROUNDS = 10;

  constructor(private readonly userRepository: IUserRepository) {}

  async register(dto: RegisterUserDto): Promise<UserResponseDto | null> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      return null;
    }

    const hashedPassword = await this.hashPassword(dto.password);

    const user = await this.userRepository.create({
      email: dto.email,
      password: hashedPassword,
      name: dto.name,
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name ?? undefined,
      createdAt: user.createdAt,
    };
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }
}
