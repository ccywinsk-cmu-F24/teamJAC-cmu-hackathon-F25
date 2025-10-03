import { UserProfile, Answer } from '@/components/types/questionnaire';

const STORAGE_KEY = 'invested_user_profile';

export const saveUserProfile = (profile: UserProfile): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }
};

export const getUserProfile = (): UserProfile | null => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const profile = JSON.parse(stored);
        return {
          ...profile,
          completedAt: new Date(profile.completedAt)
        };
      } catch (error) {
        console.error('Error parsing stored profile:', error);
        return null;
      }
    }
  }
  return null;
};

export const saveAnswer = (questionId: string, answer: string | string[]): void => {
  const profile = getUserProfile() || { answers: [], completedAt: new Date() };
  
  const existingAnswerIndex = profile.answers.findIndex(
    a => a.questionId === questionId
  );
  
  const newAnswer: Answer = { questionId, answer };
  
  if (existingAnswerIndex >= 0) {
    profile.answers[existingAnswerIndex] = newAnswer;
  } else {
    profile.answers.push(newAnswer);
  }
  
  saveUserProfile(profile);
};

export const getAnswer = (questionId: string): string | string[] | null => {
  const profile = getUserProfile();
  if (!profile) return null;
  
  const answer = profile.answers.find(a => a.questionId === questionId);
  return answer ? answer.answer : null;
};

export const clearUserProfile = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
};
