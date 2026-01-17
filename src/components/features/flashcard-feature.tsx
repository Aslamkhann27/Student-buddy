'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { getFlashcards } from '@/app/actions';
import type { Flashcard } from '@/lib/types';
import AiLoading from '@/components/ai-loading';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import FlashcardView from './flashcard-view';
import { Layers, Sparkles } from 'lucide-react';

const formSchema = z.object({
  topic: z
    .string()
    .min(3, { message: 'Please enter a topic with at least 3 characters.' })
    .max(100, { message: 'Topic must not be longer than 100 characters.' }),
});

export default function FlashcardFeature() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Flashcard[] | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    const { data, error } = await getFlashcards(values);
    setIsLoading(false);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error,
      });
    } else if (data) {
      setResult(data);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Flashcard Generation</CardTitle>
          <CardDescription>
            Enter a topic, and the AI will create a set of study flashcards.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Key events of the American Revolution" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Flashcards
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <div>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Generated Flashcards</h2>
        {isLoading ? (
          <AiLoading text="Generating flashcards..." />
        ) : result ? (
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full"
          >
            <CarouselContent>
              {result.map((flashcard, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <FlashcardView term={flashcard.term} definition={flashcard.definition} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <Card className="flex min-h-80 items-center justify-center border-dashed">
            <div className="text-center text-muted-foreground">
              <Layers className="mx-auto h-12 w-12" />
              <p className="mt-4">
                Generated flashcards will appear here.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
