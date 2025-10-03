import { PrismaClient, SurveyAnswer } from "@prisma/client";

export interface ISurveyRepository {
  upsertAnswers(userId: string, answers: { questionId: string; answer: string }[]): Promise<void>;
  getAnswersByUserId(userId: string): Promise<SurveyAnswer[]>;
  deleteAnswersByUserId(userId: string): Promise<void>;
}

export class SurveyRepository implements ISurveyRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async upsertAnswers(userId: string, answers: { questionId: string; answer: string }[]): Promise<void> {
    await this.prisma.$transaction(
      answers.map((answer) =>
        this.prisma.surveyAnswer.upsert({
          where: {
            userId_questionId: {
              userId,
              questionId: answer.questionId,
            },
          },
          create: {
            userId,
            questionId: answer.questionId,
            answer: answer.answer,
          },
          update: {
            answer: answer.answer,
          },
        })
      )
    );
  }

  async getAnswersByUserId(userId: string): Promise<SurveyAnswer[]> {
    return this.prisma.surveyAnswer.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });
  }

  async deleteAnswersByUserId(userId: string): Promise<void> {
    await this.prisma.surveyAnswer.deleteMany({
      where: { userId },
    });
  }
}
