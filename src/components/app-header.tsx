'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  PanelLeft,
  BookText,
  Lightbulb,
  ListChecks,
  Layers,
  Home,
} from 'lucide-react';
import Logo from './logo';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/?feature=summary', label: 'Summarize Topic', icon: BookText },
  { href: '/?feature=explain', label: 'Explain Topic', icon: Lightbulb },
  { href: '/?feature=quiz', label: 'Generate Quiz', icon: ListChecks },
  { href: '/?feature=flashcards', label: 'Generate Flashcards', icon: Layers },
];

export default function AppHeader() {
  const searchParams = useSearchParams();
  const feature = searchParams.get('feature');

  const getPageTitle = () => {
    switch (feature) {
      case 'summary':
        return 'Summarize Topic';
      case 'explain':
        return 'Explain Topic';
      case 'quiz':
        return 'Generate Quiz';
      case 'flashcards':
        return 'Generate Flashcards';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Logo className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">StudyAI</span>
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">StudyAI /</span>
        <span className="font-medium">{getPageTitle()}</span>
      </div>
    </header>
  );
}
