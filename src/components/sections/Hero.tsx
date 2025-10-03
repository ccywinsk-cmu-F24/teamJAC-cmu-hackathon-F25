import { Button } from '@/components/ui/Button';
import { ArrowRight, TrendingUp, Shield, Users } from 'lucide-react';

interface HeroProps {
  onStartAssessment: () => void;
}

export function Hero({ onStartAssessment }: HeroProps) {
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
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="w-full text-lg px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <Button
            size="lg"
            onClick={onStartAssessment}
            className="text-lg px-8 py-4 mb-4"
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