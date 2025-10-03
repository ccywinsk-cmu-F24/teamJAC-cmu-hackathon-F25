import { prisma } from "../database/prisma";
import { UserRepository } from "../repositories/user.repository";
import { SessionRepository } from "../repositories/session.repository";
import { SurveyRepository } from "../repositories/survey.repository";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { SurveyService } from "../services/survey.service";

// Singleton instances
let authServiceInstance: AuthService | null = null;
let userServiceInstance: UserService | null = null;
let surveyServiceInstance: SurveyService | null = null;

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

export function getSurveyService(): SurveyService {
  if (!surveyServiceInstance) {
    const surveyRepository = new SurveyRepository(prisma);
    surveyServiceInstance = new SurveyService(surveyRepository);
  }
  return surveyServiceInstance;
}
