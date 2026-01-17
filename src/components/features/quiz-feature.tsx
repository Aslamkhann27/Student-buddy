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
import { getQuiz } from '@/app/actions';
import type { QuizQuestion } from '@/lib/types';
import AiLoading from '@/components/ai-loading';
import { ListChecks, Sparkles, Check, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  topic: z
    .string()
    .min(3, { message: 'Please enter a topic with at least 3 characters.' })
    .max(100, { message: 'Topic must not be longer than 100 characters.' }),
});

type AnswerState = {
  [questionIndex: string]: {
    selected: string;
    isCorrect?: boolean;
  };
};

export default function QuizFeature() {
  const [isLoading, setIsLoading] = useState(false);
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [answers, setAnswers] = useState<AnswerState>({});
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setQuiz(null);
    setAnswers({});
    const { data, error } = await getQuiz(values);
    setIsLoading(false);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error,
      });
    } else if (data) {
      setQuiz(data.quiz);
    }
  }

  const handleAnswerChange = (questionIndex: number, selectedOption: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: { ...prev[questionIndex], selected: selectedOption, isCorrect: undefined },
    }));
  };
  
  const checkAnswer = (questionIndex: number) => {
    if (quiz && answers[questionIndex]) {
      const isCorrect = quiz[questionIndex].correctAnswer === answers[questionIndex].selected;
      setAnswers(prev => ({
        ...prev,
        [questionIndex]: { ...prev[questionIndex], isCorrect },
      }));
    }
  };

  const getDifficultyBadge = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return <Badge variant="secondary" className="bg-green-100 text-green-800">Easy</Badge>;
      case 'medium': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'hard': return <Badge variant="secondary" className="bg-red-100 text-red-800">Hard</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Quiz Generation</CardTitle>
          <CardDescription>
            Enter a topic to generate a multiple-choice quiz to test your knowledge.
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
                      <Input placeholder="e.g., The Solar System" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Quiz
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Generated Quiz</h2>
        {isLoading ? (
          <AiLoading text="Generating quiz..." />
        ) : quiz ? (
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {quiz.map((q, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger>
                      <div className="flex justify-between items-center w-full pr-4">
                        <span className="text-left">Question {i + 1}</span>
                        {getDifficultyBadge(q.difficulty)}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="font-medium">{q.question}</p>
                      <RadioGroup
                        onValueChange={(value) => handleAnswerChange(i, value)}
                        value={answers[i]?.selected}
                        disabled={answers[i]?.isCorrect !== undefined}
                      >
                        {q.options.map((option, j) => (
                          <div key={j} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`q${i}-o${j}`} />
                            <Label htmlFor={`q${i}-o${j}`}>{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                      <div className="flex items-center gap-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => checkAnswer(i)}
                          disabled={!answers[i]?.selected || answers[i]?.isCorrect !== undefined}
                        >
                          Check Answer
                        </Button>
                        {answers[i]?.isCorrect === true && (
                          <div className="flex items-center text-green-600 font-medium">
                            <Check className="h-4 w-4 mr-1" /> Correct!
                          </div>
                        )}
                        {answers[i]?.isCorrect === false && (
                          <div className="flex items-center text-red-600 font-medium">
                            <X className="h-4 w-4 mr-1" /> Incorrect. The answer is: {q.correctAnswer}
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ) : (
          <Card className="flex h-96 items-center justify-center border-dashed">
            <div className="text-center text-muted-foreground">
              <ListChecks className="mx-auto h-12 w-12" />
              <p className="mt-4">
                The generated quiz will appear here.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
