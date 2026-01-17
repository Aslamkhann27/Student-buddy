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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getExplanation } from '@/app/actions';
import type { ExplainLikeImABeginnerOutput } from '@/ai/flows/explain-like-im-a-beginner';
import AiLoading from '@/components/ai-loading';
import { Lightbulb, Sparkles } from 'lucide-react';

const formSchema = z.object({
  topic: z
    .string()
    .min(10, { message: 'Please enter a topic with at least 10 characters.' })
    .max(500, { message: 'Topic must not be longer than 500 characters.' }),
});

export default function ExplainFeature() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ExplainLikeImABeginnerOutput | null>(
    null
  );
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    const { data, error } = await getExplanation(values);
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
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Explain a Topic</CardTitle>
          <CardDescription>
            Enter a complex topic, and the AI will explain it in simple terms, as
            if you were a beginner.
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
                    <FormLabel>Topic to Explain</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., What is blockchain?"
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Explanation
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">AI Response</h2>
        {isLoading ? (
          <AiLoading text="Generating explanation..." />
        ) : result ? (
          <Card>
            <CardHeader className="flex-row items-start gap-4 space-y-0">
               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                  <Lightbulb className="h-6 w-6 text-accent" />
                </div>
              <div className="flex-1">
                <CardTitle>Simplified Explanation</CardTitle>
                <CardDescription>Here it is in simple terms.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap font-body leading-relaxed">{result.simplifiedExplanation}</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="flex h-64 items-center justify-center border-dashed">
            <div className="text-center text-muted-foreground">
              The generated explanation will appear here.
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
