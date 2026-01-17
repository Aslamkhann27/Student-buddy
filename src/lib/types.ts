import type { GenerateFlashcardsOutput } from '@/ai/flows/generate-flashcards';
import type { GenerateQuizOutput } from '@/ai/flows/generate-quiz';

export type Flashcard = GenerateFlashcardsOutput[number];
export type QuizQuestion = GenerateQuizOutput['quiz'][number];
