'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { QUESTIONS, Answer } from '@/components/types/questionnaire';
import { CheckCircle, Circle } from 'lucide-react';

const STORAGE_KEY = 'survey_state';

interface SurveyState {
  currentQuestionIndex: number;
  answers: Record<string, string | string[]>;
}

export default function SurveyPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string | string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  // Load userId and survey state on mount
  useEffect(() => {
    const initializeSurvey = async () => {
      const storedUserId = localStorage.getItem('userId');

      if (!storedUserId) {
        router.push('/');
        return;
      }

      setUserId(storedUserId);

      // Check if user has already completed the survey in backend
      try {
        const response = await fetch(`/api/users/${storedUserId}/survey`);

        if (response.ok) {
          // User has already completed the survey, redirect to dashboard
          router.push('/dashboard');
          return;
        }
      } catch (error) {
        console.error('Error checking survey status:', error);
      }

      // Load survey state from localStorage
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        try {
          const state: SurveyState = JSON.parse(savedState);

          // Validate that the saved state is valid
          const isValidState =
            typeof state.currentQuestionIndex === 'number' &&
            state.currentQuestionIndex >= 0 &&
            state.currentQuestionIndex < QUESTIONS.length &&
            typeof state.answers === 'object';

          if (isValidState) {
            setCurrentQuestionIndex(state.currentQuestionIndex);
            setSelectedAnswers(state.answers);
          } else {
            // Invalid state, reset to beginning
            localStorage.removeItem(STORAGE_KEY);
          }
        } catch (error) {
          // Failed to parse state, reset to beginning
          console.error('Failed to parse survey state:', error);
          localStorage.removeItem(STORAGE_KEY);
        }
      }

      // Mark as initialized after loading state
      setIsInitialized(true);
    };

    initializeSurvey();
  }, [router]);

  // Save state to localStorage whenever it changes (but not on initial load)
  useEffect(() => {
    if (!userId || !isInitialized) return;

    const state: SurveyState = {
      currentQuestionIndex,
      answers: selectedAnswers,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [currentQuestionIndex, selectedAnswers, userId, isInitialized]);

  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = async () => {
    if (!selectedAnswers[currentQuestion.id]) return;

    if (isLastQuestion) {
      await handleSubmitSurvey();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitSurvey = async () => {
    if (!userId) return;

    setIsSubmitting(true);

    try {
      const answers: Answer[] = QUESTIONS.map((q) => ({
        questionId: q.id,
        answer: selectedAnswers[q.id] || '',
      }));

      const response = await fetch(`/api/users/${userId}/survey`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit survey');
      }

      // Clear survey state from localStorage
      localStorage.removeItem(STORAGE_KEY);

      router.push('/dashboard');
    } catch (error) {
      console.error('Survey submission error:', error);
      alert('Failed to submit survey. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOptionClick = (option: string) => {
    if (currentQuestion.type === 'single') {
      handleAnswerChange(currentQuestion.id, option);
    } else {
      const currentAnswers = (selectedAnswers[currentQuestion.id] as string[]) || [];
      const newAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter((a) => a !== option)
        : [...currentAnswers, option];
      handleAnswerChange(currentQuestion.id, newAnswers);
    }
  };

  const isOptionSelected = (option: string) => {
    if (currentQuestion.type === 'single') {
      return selectedAnswers[currentQuestion.id] === option;
    }
    const answers = (selectedAnswers[currentQuestion.id] as string[]) || [];
    return answers.includes(option);
  };

  const canProceed = () => {
    const answer = selectedAnswers[currentQuestion.id];
    if (!answer) return false;

    if (currentQuestion.type === 'multiple') {
      return Array.isArray(answer) && answer.length > 0;
    }

    return true;
  };

  if (!userId) {
    return null;
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <ProgressBar
            current={currentQuestionIndex + 1}
            total={QUESTIONS.length}
            className="mb-6"
          />
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6 leading-tight">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  isOptionSelected(option)
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-100'
                    : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center">
                  {currentQuestion.type === 'single' ? (
                    isOptionSelected(option) ? (
                      <CheckCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3 flex-shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-400 dark:text-slate-500 mr-3 flex-shrink-0" />
                    )
                  ) : (
                    <div
                      className={`w-5 h-5 rounded border-2 mr-3 flex-shrink-0 flex items-center justify-center ${
                        isOptionSelected(option)
                          ? 'border-indigo-500 bg-indigo-500'
                          : 'border-slate-300 dark:border-slate-500'
                      }`}
                    >
                      {isOptionSelected(option) && (
                        <CheckCircle className="h-3 w-3 text-white" />
                      )}
                    </div>
                  )}
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={handlePrevious} disabled={isFirstQuestion}>
              Previous
            </Button>

            <Button onClick={handleNext} disabled={!canProceed() || isSubmitting} isLoading={isSubmitting}>
              {isLastQuestion ? 'Complete Assessment' : 'Next'}
            </Button>
          </div>
        </div>

        {/* Help text */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          Your progress is saved automatically
        </p>
      </div>
    </section>
  );
}
