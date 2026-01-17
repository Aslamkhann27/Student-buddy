'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating flashcards from a given topic.
 *
 * The flow takes a topic as input and returns a list of flashcards, each containing a term and its definition.
 *
 * - generateFlashcards - The main function to generate flashcards.
 * - GenerateFlashcardsInput - The input type for the generateFlashcards function.
 * - GenerateFlashcardsOutput - The output type for the generateFlashcards function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFlashcardsInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate flashcards.'),
});
export type GenerateFlashcardsInput = z.infer<typeof GenerateFlashcardsInputSchema>;

const FlashcardSchema = z.object({
  term: z.string().describe('The key term.'),
  definition: z.string().describe('The definition of the term.'),
});

const GenerateFlashcardsOutputSchema = z.array(FlashcardSchema).describe('An array of flashcards.');
export type GenerateFlashcardsOutput = z.infer<typeof GenerateFlashcardsOutputSchema>;

export async function generateFlashcards(input: GenerateFlashcardsInput): Promise<GenerateFlashcardsOutput> {
  return generateFlashcardsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFlashcardsPrompt',
  input: {schema: GenerateFlashcardsInputSchema},
  output: {schema: GenerateFlashcardsOutputSchema},
  prompt: `You are an expert educator skilled at creating effective flashcards.

  Generate a list of flashcards for the following topic. Each flashcard should have a term and a concise definition.

  Topic: {{{topic}}}

  Format the output as a JSON array of objects, where each object has a "term" and "definition" field.
  The array MUST have at least 3 flashcards.
  `,
});

const generateFlashcardsFlow = ai.defineFlow(
  {
    name: 'generateFlashcardsFlow',
    inputSchema: GenerateFlashcardsInputSchema,
    outputSchema: GenerateFlashcardsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
