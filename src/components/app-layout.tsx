'use client';

import { useSearchParams } from 'next/navigation';
import { SidebarInset } from '@/components/ui/sidebar';
import AppHeader from '@/components/app-header';
import AppSidebar from '@/components/app-sidebar';
import Welcome from '@/components/features/welcome';
import SummarizeFeature from '@/components/features/summarize-feature';
import ExplainFeature from '@/components/features/explain-feature';
import QuizFeature from '@/components/features/quiz-feature';
import FlashcardFeature from '@/components/features/flashcard-feature';

export default function AppLayout() {
  const searchParams = useSearchParams();
  const feature = searchParams.get('feature');

  const renderFeature = () => {
    switch (feature) {
      case 'summary':
        return <SummarizeFeature />;
      case 'explain':
        return <ExplainFeature />;
      case 'quiz':
        return <QuizFeature />;
      case 'flashcards':
        return <FlashcardFeature />;
      default:
        return <Welcome />;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <AppHeader />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {renderFeature()}
        </main>
      </div>
    </div>
  );
}
