import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowRight, TrendingUp, Shield, Users } from 'lucide-react';

interface HeroProps {
  onStartAssessment: () => void;
}

export function Hero({ onStartAssessment }: HeroProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return 'Please enter a valid email address';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePassword = (password: string): string => {
    if (!password.trim()) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailTouched) {
      setEmailError(validateEmail(value));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordTouched) {
      setPasswordError(validatePassword(value));
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmail(email));
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    setPasswordError(validatePassword(password));
  };

  const handleSubmit = async () => {
    // Validate both fields on submit
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    setEmailTouched(true);
    setPasswordTouched(true);
    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    // Only proceed if both fields are valid
    if (!emailValidationError && !passwordValidationError) {
      try {
        // Step 1: Try to login first
        const loginResponse = await fetch('/api/auth/tokens', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        let userId: string;
        let userEmail: string;

        if (loginResponse.ok) {
          // User exists and credentials match
          const loginData = await loginResponse.json();
          userId = loginData.userId;
          userEmail = loginData.email;
        } else {
          // Step 2: User doesn't exist or password doesn't match, try to register
          const registerResponse = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          if (!registerResponse.ok) {
            const error = await registerResponse.json();
            setEmailError(error.error || 'Registration failed');
            return;
          }

          const user = await registerResponse.json();
          userId = user.id;
          userEmail = user.email;
        }

        // Store user info in localStorage
        localStorage.setItem('userId', userId);
        localStorage.setItem('userEmail', userEmail);

        // Step 3: Check if user has already completed the survey
        const surveyResponse = await fetch(`/api/users/${userId}/survey`);

        if (surveyResponse.ok) {
          // User has completed survey, go directly to dashboard
          window.location.href = '/dashboard';
          return;
        }

        // Step 4: User hasn't completed survey, proceed to survey page
        onStartAssessment();
      } catch (error) {
        console.error('Authentication error:', error);
        setEmailError('An error occurred. Please try again.');
      }
    }
  };

  const isFormValid = !validateEmail(email) && !validatePassword(password);
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-12">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Brand */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-700 to-emerald-600 dark:from-indigo-300 dark:to-emerald-300 bg-clip-text text-transparent mb-4">
            InvestED
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Financial freedom shouldn't require a finance degree. 
            <span className="block mt-2 font-semibold text-slate-800 dark:text-slate-200">
              Learn by doing, not just reading.
            </span>
          </p>
        </div>

        {/* CTA */}
        <div className="mb-12">
          <div className="max-w-md mx-auto mb-6">
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                placeholder="Enter your email"
                className={`w-full text-lg px-4 py-3 rounded-lg border-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                  emailError ? 'border-red-500 dark:border-red-400' : 'border-slate-200 dark:border-slate-600'
                }`}
              />
              {emailTouched && emailError && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{emailError}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                placeholder="Enter your password"
                className={`w-full text-lg px-4 py-3 rounded-lg border-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                  passwordError ? 'border-red-500 dark:border-red-400' : 'border-slate-200 dark:border-slate-600'
                }`}
              />
              {passwordTouched && passwordError && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{passwordError}</p>
              )}
            </div>
          </div>
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`text-lg px-8 py-4 mb-4 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Start Your Financial Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Takes 2 minutes • Completely free • Personalized results
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-6 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20">
            <TrendingUp className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-3" />
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Learn by Doing
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
              Practice real financial decisions in safe simulations
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20">
            <Shield className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mb-3" />
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Personalized Path
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
              Get recommendations tailored to your situation
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20">
            <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-3" />
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Built for Everyone
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
              Accessible financial education for all backgrounds
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}