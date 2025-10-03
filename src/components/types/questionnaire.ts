export interface Question {
  id: string;
  question: string;
  type: 'single' | 'multiple';
  options: string[];
  required: boolean;
}

export interface Answer {
  questionId: string;
  answer: string | string[];
}

export interface UserProfile {
  answers: Answer[];
  completedAt: Date;
}

export const QUESTIONS: Question[] = [
  {
    id: 'employment',
    question: "What's your current employment status?",
    type: 'single',
    options: [
      'Full-time employed',
      'Part-time / gig worker',
      'Student',
      'Between jobs',
      'Self-employed',
      'Retired'
    ],
    required: true
  },
  {
    id: 'finances',
    question: 'How would you describe your monthly finances?',
    type: 'single',
    options: [
      'I have money left over after expenses',
      'I break even most months',
      'I struggle to cover basic expenses',
      'I rely on credit cards to get by',
      "I'm not sure / it varies a lot"
    ],
    required: true
  },
  {
    id: 'debt',
    question: 'Do you have any of the following? (Select all that apply)',
    type: 'multiple',
    options: [
      'Credit card debt',
      'Student loans',
      'Car loan',
      'Medical debt',
      'Payday loans',
      'No debt',
      'Prefer not to say'
    ],
    required: true
  },
  {
    id: 'emergency_savings',
    question: 'Do you have emergency savings?',
    type: 'single',
    options: [
      'Yes, 3+ months of expenses',
      'Yes, but less than $1,000',
      "No, but I'm working on it",
      "No, and I don't know where to start"
    ],
    required: true
  },
  {
    id: 'financial_knowledge',
    question: 'How confident are you explaining these terms to a friend? APR, credit score, compound interest',
    type: 'single',
    options: [
      'Very confident',
      'Somewhat confident',
      'Not confident',
      'Never heard of these'
    ],
    required: true
  },
  {
    id: 'budget_experience',
    question: 'Have you ever created a budget?',
    type: 'single',
    options: [
      'Yes, and I stick to it',
      "Yes, but I don't follow it",
      "I've tried but it felt too complicated",
      'No, never'
    ],
    required: true
  },
  {
    id: 'learning_sources',
    question: 'Where do you currently learn about money? (Select all)',
    type: 'multiple',
    options: [
      'Family/friends',
      'Social media (TikTok, YouTube)',
      'School/formal education',
      'Trial and error',
      "I don't—I'm here to start"
    ],
    required: true
  },
  {
    id: 'financial_worry',
    question: "What's your biggest financial worry right now?",
    type: 'single',
    options: [
      'Not having enough for emergencies',
      'Credit card debt piling up',
      "Not understanding where my money goes",
      'Never being able to buy a home / big purchase',
      'Retirement feels impossible',
      "I don't have a specific worry"
    ],
    required: true
  },
  {
    id: 'financial_success',
    question: 'What would financial success look like for you in 6 months?',
    type: 'single',
    options: [
      'Having $500-$1000 saved for emergencies',
      'Paying off a credit card',
      'Sticking to a budget',
      'Understanding my credit score',
      'Feeling less stressed about money',
      'Just learning the basics'
    ],
    required: true
  }
];
