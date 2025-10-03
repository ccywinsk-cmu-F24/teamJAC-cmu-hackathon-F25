'use client';

import { useState } from 'react';
import { Hero } from '@/components/sections/Hero';
import { Questionnaire } from '@/components/sections/Questionnaire';
import { Answer } from '@/components/types/questionnaire';

type AppState = 'hero' | 'questionnaire' | 'results';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('hero');
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);

  const handleStartAssessment = () => {
    setAppState('questionnaire');
  };

  const handleAssessmentComplete = (answers: Answer[]) => {
    setUserAnswers(answers);
    setAppState('results');
  };

  const handleRestart = () => {
    setAppState('hero');
    setUserAnswers([]);
  };

  return (
    <main className="min-h-screen">
      {appState === 'hero' && (
        <Hero onStartAssessment={handleStartAssessment} />
      )}
      
      {appState === 'questionnaire' && (
        <Questionnaire onComplete={handleAssessmentComplete} />
      )}
      
      {appState === 'results' && (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                Assessment Complete! 🎉
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                Thank you for completing your financial assessment. Your personalized recommendations are being prepared.
              </p>
              <button
                onClick={handleRestart}
                className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-emerald-600 transition-all duration-200"
              >
                Start New Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
