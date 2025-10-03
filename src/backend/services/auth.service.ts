import bcrypt from "bcryptjs";
import crypto from "crypto";
import { IUserRepository } from "../repositories/user.repository";
import { ISessionRepository } from "../repositories/session.repository";
import { LoginDto, LoginResultDto, LogoutDto } from "../dto/auth.dto";

export interface IAuthService {
  login(dto: LoginDto): Promise<LoginResultDto | null>;
  logout(dto: LogoutDto): Promise<boolean>;
  validateToken(token: string): Promise<boolean>;
}

export class AuthService implements IAuthService {
  private readonly SESSION_EXPIRY_HOURS = 24;

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly sessionRepository: ISessionRepository
  ) {}

  async login(dto: LoginDto): Promise<LoginResultDto | null> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const token = this.generateToken();
    const expiresAt = this.calculateExpiryDate();

    await this.sessionRepository.create({
      userId: user.id,
      token,
      expiresAt,
    });

    return {
      token,
      userId: user.id,
      email: user.email,
    };
  }

  async logout(dto: LogoutDto): Promise<boolean> {
    try {
      await this.sessionRepository.deleteByToken(dto.token);
      return true;
    } catch {
      return false;
    }
  }

  async validateToken(token: string): Promise<boolean> {
    const session = await this.sessionRepository.findByToken(token);

    if (!session) {
      return false;
    }

    if (session.expiresAt < new Date()) {
      await this.sessionRepository.deleteByToken(token);
      return false;
    }

    return true;
  }

  private generateToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }

  private calculateExpiryDate(): Date {
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + this.SESSION_EXPIRY_HOURS);
    return expiry;
  }
}
