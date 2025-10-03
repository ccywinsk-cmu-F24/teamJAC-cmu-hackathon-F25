'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { QUESTIONS, Question, Answer } from '@/components/types/questionnaire';
import { saveAnswer, getAnswer } from '@/lib/storage';
import { CheckCircle, Circle } from 'lucide-react';

interface QuestionnaireProps {
  onComplete: (answers: Answer[]) => void;
}

export function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  // Load existing answers on mount
  useEffect(() => {
    const existingAnswers: { [key: string]: string | string[] } = {};
    QUESTIONS.forEach(q => {
      const answer = getAnswer(q.id);
      if (answer) {
        existingAnswers[q.id] = answer;
      }
    });
    setSelectedAnswers(existingAnswers);
  }, []);

  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = async () => {
    if (!selectedAnswers[currentQuestion.id]) return;

    setIsSubmitting(true);
    
    // Save answer to localStorage
    saveAnswer(currentQuestion.id, selectedAnswers[currentQuestion.id]);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (isLastQuestion) {
      // Convert to Answer format and complete
      const answers: Answer[] = QUESTIONS.map(q => ({
        questionId: q.id,
        answer: selectedAnswers[q.id] || ''
      }));
      onComplete(answers);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
    
    setIsSubmitting(false);
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleOptionClick = (option: string) => {
    if (currentQuestion.type === 'single') {
      handleAnswerChange(currentQuestion.id, option);
    } else {
      const currentAnswers = (selectedAnswers[currentQuestion.id] as string[]) || [];
      const newAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter(a => a !== option)
        : [...currentAnswers, option];
      handleAnswerChange(currentQuestion.id, newAnswers);
    }
  };

  const isOptionSelected = (option: string) => {
    if (currentQuestion.type === 'single') {
      return selectedAnswers[currentQuestion.id] === option;
    } else {
      const answers = selectedAnswers[currentQuestion.id] as string[] || [];
      return answers.includes(option);
    }
  };

  const canProceed = () => {
    const answer = selectedAnswers[currentQuestion.id];
    if (!answer) return false;
    
    if (currentQuestion.type === 'multiple') {
      return Array.isArray(answer) && answer.length > 0;
    }
    
    return true;
  };

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
                    <div className={`w-5 h-5 rounded border-2 mr-3 flex-shrink-0 flex items-center justify-center ${
                      isOptionSelected(option)
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-slate-300 dark:border-slate-500'
                    }`}>
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
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstQuestion}
            >
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
              isLoading={isSubmitting}
            >
              {isLastQuestion ? 'Complete Assessment' : 'Next'}
            </Button>
          </div>
        </div>

        {/* Help text */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          Your answers are saved automatically and kept private
        </p>
      </div>
    </section>
  );
}
