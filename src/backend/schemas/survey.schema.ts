import { z } from "zod";

export const SurveyAnswerSchema = z.object({
  questionId: z.string().min(1, "Question ID is required"),
  answer: z.union([
    z.string().min(1, "Answer is required"),
    z.array(z.string()).min(1, "At least one answer is required"),
  ]),
});

export const UpdateSurveySchema = z.object({
  answers: z.array(SurveyAnswerSchema).min(1, "At least one answer is required"),
});

export type SurveyAnswerInput = z.infer<typeof SurveyAnswerSchema>;
export type UpdateSurveyInput = z.infer<typeof UpdateSurveySchema>;
