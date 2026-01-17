import { Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AiLoading({
  className,
  text = 'Generating response...',
}: {
  className?: string;
  text?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-xl border bg-card p-8 text-card-foreground shadow-sm',
        className
      )}
    >
      <div className="relative">
        <Lightbulb className="h-10 w-10 text-primary" />
        <Lightbulb className="absolute inset-0 h-10 w-10 animate-ping text-primary opacity-50" />
      </div>
      <p className="text-center font-medium text-muted-foreground">{text}</p>
    </div>
  );
}
