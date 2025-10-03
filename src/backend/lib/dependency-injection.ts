import { prisma } from "../database/prisma";
import { UserRepository } from "../repositories/user.repository";
import { SessionRepository } from "../repositories/session.repository";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

// Singleton instances
let authServiceInstance: AuthService | null = null;
let userServiceInstance: UserService | null = null;

export function getAuthService(): AuthService {
  if (!authServiceInstance) {
    const userRepository = new UserRepository(prisma);
    const sessionRepository = new SessionRepository(prisma);
    authServiceInstance = new AuthService(userRepository, sessionRepository);
  }
  return authServiceInstance;
}

export function getUserService(): UserService {
  if (!userServiceInstance) {
    const userRepository = new UserRepository(prisma);
    userServiceInstance = new UserService(userRepository);
  }
  return userServiceInstance;
}
