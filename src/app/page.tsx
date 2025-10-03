'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Hero } from '@/components/sections/Hero';

export default function Home() {
  const router = useRouter();

  const handleStartAssessment = () => {
    router.push('/survey');
  };

  return (
    <main className="min-h-screen">
      <Hero onStartAssessment={handleStartAssessment} />
    </main>
  );
}
