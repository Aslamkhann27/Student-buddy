'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Logo from '@/components/logo';
import { BookText, Lightbulb, ListChecks, Layers, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home, feature: null },
  { href: '/?feature=summary', label: 'Summarize Topic', icon: BookText, feature: 'summary' },
  { href: '/?feature=explain', label: 'Explain Topic', icon: Lightbulb, feature: 'explain' },
  { href: '/?feature=quiz', label: 'Generate Quiz', icon: ListChecks, feature: 'quiz' },
  { href: '/?feature=flashcards', label: 'Generate Flashcards', icon: Layers, feature: 'flashcards' },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFeature = searchParams.get('feature');

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Logo className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">StudyAI</span>
        </Link>
        <TooltipProvider>
          {navItems.map((item) => {
            const isActive = item.feature === currentFeature && pathname === '/';
            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                      isActive && 'bg-accent text-accent-foreground'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>
    </aside>
  );
}
