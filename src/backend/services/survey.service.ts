import { ISurveyRepository } from "../repositories/survey.repository";
import { UpdateSurveyDto, SurveyResponseDto, SurveyAnswerDto } from "../dto/survey.dto";

export interface ISurveyService {
  updateSurvey(userId: string, dto: UpdateSurveyDto): Promise<SurveyResponseDto>;
  getSurveyAnswers(userId: string): Promise<SurveyResponseDto | null>;
}

export class SurveyService implements ISurveyService {
  constructor(private readonly surveyRepository: ISurveyRepository) {}

  async updateSurvey(userId: string, dto: UpdateSurveyDto): Promise<SurveyResponseDto> {
    const answersToStore = dto.answers.map((answer) => ({
      questionId: answer.questionId,
      answer: JSON.stringify(answer.answer),
    }));

    await this.surveyRepository.upsertAnswers(userId, answersToStore);

    const storedAnswers = await this.surveyRepository.getAnswersByUserId(userId);

    const answers: SurveyAnswerDto[] = storedAnswers.map((answer) => ({
      questionId: answer.questionId,
      answer: JSON.parse(answer.answer),
    }));

    return {
      userId,
      answers,
      updatedAt: storedAnswers[0]?.updatedAt || new Date(),
    };
  }

  async getSurveyAnswers(userId: string): Promise<SurveyResponseDto | null> {
    const storedAnswers = await this.surveyRepository.getAnswersByUserId(userId);

    if (storedAnswers.length === 0) {
      return null;
    }

    const answers: SurveyAnswerDto[] = storedAnswers.map((answer) => ({
      questionId: answer.questionId,
      answer: JSON.parse(answer.answer),
    }));

    return {
      userId,
      answers,
      updatedAt: storedAnswers[0]?.updatedAt || new Date(),
    };
  }
}
