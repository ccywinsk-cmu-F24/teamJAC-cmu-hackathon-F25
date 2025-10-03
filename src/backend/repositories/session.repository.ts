import { PrismaClient, Session } from "@prisma/client";

export interface ISessionRepository {
  create(data: { userId: string; token: string; expiresAt: Date }): Promise<Session>;
  findByToken(token: string): Promise<Session | null>;
  deleteByToken(token: string): Promise<void>;
  deleteExpiredSessions(): Promise<void>;
}

export class SessionRepository implements ISessionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: { userId: string; token: string; expiresAt: Date }): Promise<Session> {
    return this.prisma.session.create({
      data,
    });
  }

  async findByToken(token: string): Promise<Session | null> {
    return this.prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  async deleteByToken(token: string): Promise<void> {
    await this.prisma.session.delete({
      where: { token },
    });
  }

  async deleteExpiredSessions(): Promise<void> {
    await this.prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}
