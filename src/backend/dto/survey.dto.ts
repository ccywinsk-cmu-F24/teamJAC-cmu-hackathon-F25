export interface SurveyAnswerDto {
  questionId: string;
  answer: string | string[];
}

export interface UpdateSurveyDto {
  answers: SurveyAnswerDto[];
}

export interface SurveyResponseDto {
  userId: string;
  answers: SurveyAnswerDto[];
  updatedAt: Date;
}
