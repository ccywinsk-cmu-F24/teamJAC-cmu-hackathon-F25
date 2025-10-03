"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";

const LESSONS = {
  "emergency-fund": {
    title: "Why $500 can change your life",
    description: "Learn how a small emergency fund can prevent financial disasters and provide peace of mind.",
    duration: "2 min read",
    scenario: "You receive an unexpected $500. What do you do?",
    options: [
      "Spend it on something you've wanted",
      "Put it in a savings account",
      "Pay off existing debt"
    ],
    correctAnswer: 1,
    explanation: "Building an emergency fund first protects you from high-interest debt when unexpected expenses arise."
  },
  "credit-card-debt": {
    title: "The real cost of minimum payments",
    description: "Discover how minimum credit card payments can trap you in debt for years.",
    duration: "2 min read",
    scenario: "You have $2,000 credit card debt at 18% APR. Minimum payment is $40/month.",
    options: [
      "Pay minimum for 5 years",
      "Pay $100/month for 2 years",
      "Pay $200/month for 1 year"
    ],
    correctAnswer: 2,
    explanation: "Higher payments save thousands in interest and get you debt-free faster."
  },
  "budgeting-basics": {
    title: "50/30/20 rule explained simply",
    description: "Master the simple budgeting framework that works for most people.",
    duration: "2 min read",
    scenario: "You earn $3,000/month. How should you allocate it?",
    options: [
      "Needs: $1,500, Wants: $900, Savings: $600",
      "Needs: $2,000, Wants: $1,000, Savings: $0",
      "Needs: $1,200, Wants: $1,500, Savings: $300"
    ],
    correctAnswer: 0,
    explanation: "50% needs, 30% wants, 20% savings creates a balanced financial foundation."
  }
};

export default function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const lesson = LESSONS[resolvedParams.id as keyof typeof LESSONS];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 dark:from-indigo-900 dark:via-sky-900 dark:to-emerald-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
          <button
            onClick={() => router.back()}
            className="bg-white/20 text-white px-4 py-2 rounded-md hover:bg-white/30 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setShowResult(true);
  };

  const resetScenario = () => {
    setSelectedOption(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 dark:from-indigo-900 dark:via-sky-900 dark:to-emerald-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/20 bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 dark:from-indigo-900 dark:via-sky-900 dark:to-emerald-900 backdrop-blur-xl shadow-xl p-4 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-9 w-9 rounded-md bg-gradient-to-br from-indigo-600 to-emerald-500" />
            <div>
              <div className="text-sm text-white/90">Welcome back</div>
              <div className="text-base font-semibold text-white">
                InvestED
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-2 flex-1">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full text-left rounded-md px-3 py-2 text-sm transition border bg-white/20 text-white border-white/30"
            >
              Overview
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full text-left rounded-md px-3 py-2 text-sm transition border bg-white/10 text-white/90 hover:bg-white/20 border-white/20"
            >
              Mini-Lessons
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full text-left rounded-md px-3 py-2 text-sm transition border bg-white/10 text-white/90 hover:bg-white/20 border-white/20"
            >
              Decision Simulator
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full text-left rounded-md px-3 py-2 text-sm transition border bg-white/10 text-white/90 hover:bg-white/20 border-white/20"
            >
              Progress Tracker
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full text-left rounded-md px-3 py-2 text-sm transition border bg-white/10 text-white/90 hover:bg-white/20 border-white/20"
            >
              Resource Hub
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6 bg-amber-50">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/20 bg-white/95 backdrop-blur-xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => router.push('/dashboard?tab=mini-lessons')}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Mini-Lessons
                  </button>
                </div>
                <span className="text-xs bg-gradient-to-r from-indigo-600 to-emerald-500 text-white px-3 py-1 rounded-full">
                  {lesson.duration}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-emerald-600 dark:from-indigo-300 dark:to-emerald-300 bg-clip-text text-transparent mb-4">
                {lesson.title}
              </h1>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{lesson.description}</p>
              
              {/* Article Content */}
              <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">📖 Quick Read:</h2>
                <div className="text-gray-700 dark:text-gray-300 space-y-4 text-base leading-relaxed">
                  {resolvedParams.id === "emergency-fund" && (
                    <>
                      <p>An emergency fund is your financial safety net. When unexpected expenses hit—car repairs, medical bills, job loss—having even $500 saved can prevent you from going into debt.</p>
                      <p>Without an emergency fund, people often turn to credit cards or payday loans with high interest rates. A $500 emergency can become $1,200+ in debt if you're forced to borrow at 25% APR.</p>
                      <p>Start small: aim for $500, then build to 3-6 months of expenses. This fund should be easily accessible but separate from your checking account to avoid temptation.</p>
                    </>
                  )}
                  {resolvedParams.id === "credit-card-debt" && (
                    <>
                      <p>Credit card companies love minimum payments because they keep you in debt longer, earning them more interest. A $2,000 balance at 18% APR with minimum payments takes 5+ years to pay off.</p>
                      <p>Here's the math: $2,000 debt with $40 minimum payments means you're mostly paying interest, not principal. You'll pay over $1,400 in interest alone.</p>
                      <p>Even paying just $20 more per month ($60 total) cuts your payoff time in half and saves you hundreds in interest. Always pay more than the minimum when possible.</p>
                    </>
                  )}
                  {resolvedParams.id === "budgeting-basics" && (
                    <>
                      <p>The 50/30/20 rule is a simple budgeting framework: 50% for needs, 30% for wants, 20% for savings and debt repayment.</p>
                      <p><strong>Needs (50%):</strong> Rent, groceries, utilities, minimum debt payments, insurance. These are non-negotiable expenses.</p>
                      <p><strong>Wants (30%):</strong> Dining out, entertainment, hobbies, non-essential shopping. These can be reduced if needed.</p>
                      <p><strong>Savings (20%):</strong> Emergency fund, retirement, debt payoff beyond minimums. This builds your financial future.</p>
                    </>
                  )}
                </div>
              </div>
              
              {/* Interactive Scenario */}
              <div className="bg-gray-100/80 dark:bg-gray-800/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🎯 Interactive Scenario:</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{lesson.scenario}</p>
                
                {!showResult ? (
                  <div className="space-y-3">
                    {lesson.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        className="w-full text-left p-4 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition text-base text-gray-800 dark:text-gray-200 font-medium"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-md border ${
                      selectedOption === lesson.correctAnswer 
                        ? "bg-green-50 border-green-200 text-green-800" 
                        : "bg-red-50 border-red-200 text-red-800"
                    }`}>
                      <div className="font-semibold text-lg">
                        {selectedOption === lesson.correctAnswer ? "✓ Correct!" : "✗ Not quite right"}
                      </div>
                      <div className="text-base mt-2">{lesson.explanation}</div>
                    </div>
                    <button
                      onClick={resetScenario}
                      className="w-full bg-gradient-to-r from-indigo-600 to-emerald-500 text-white px-6 py-3 rounded-md text-base font-medium hover:brightness-110 transition"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
