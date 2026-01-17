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
import { getSummary } from '@/app/actions';
import type { GenerateTopicSummaryOutput } from '@/ai/flows/generate-topic-summary';
import AiLoading from '@/components/ai-loading';
import { FileText, Sparkles } from 'lucide-react';

const formSchema = z.object({
  topic: z
    .string()
    .min(10, { message: 'Please enter a topic with at least 10 characters.' })
    .max(500, { message: 'Topic must not be longer than 500 characters.' }),
});

export default function SummarizeFeature() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateTopicSummaryOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    const { data, error } = await getSummary(values);
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
          <CardTitle>Topic Summarization</CardTitle>
          <CardDescription>
            Enter any topic, and the AI will provide a concise summary.
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
                    <FormLabel>Topic to Summarize</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Explain the theory of relativity in simple terms."
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
                Generate Summary
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">AI Response</h2>
        {isLoading ? (
          <AiLoading text="Generating summary..." />
        ) : result ? (
          <Card>
            <CardHeader className='flex-row items-start gap-4 space-y-0'>
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className='flex-1'>
                <CardTitle>Summary</CardTitle>
                <CardDescription>{result.progress}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="leading-7">{result.summary}</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="flex h-64 items-center justify-center border-dashed">
            <div className="text-center text-muted-foreground">
              The generated summary will appear here.
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
