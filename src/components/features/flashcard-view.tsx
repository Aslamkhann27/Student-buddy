'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';

interface FlashcardViewProps {
  term: string;
  definition: string;
}

export default function FlashcardView({ term, definition }: FlashcardViewProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group h-80 w-full cursor-pointer [perspective:1000px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <Card
        className={cn(
          'relative h-full w-full shadow-lg transition-transform duration-700 [transform-style:preserve-3d]',
          isFlipped && '[transform:rotateY(180deg)]'
        )}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 [backface-visibility:hidden]">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">
              Term
            </p>
            <p className="mt-2 text-2xl font-bold">{term}</p>
            <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground/80 group-hover:text-primary">
              <RotateCcw className="h-3 w-3" />
              Click to flip
            </div>
          </CardContent>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">
              Definition
            </p>
            <p className="mt-2 text-base leading-relaxed">{definition}</p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
