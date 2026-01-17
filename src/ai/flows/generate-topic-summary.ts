'use server';

/**
 * @fileOverview Summarizes a given topic into a short, concise summary using AI.
 *
 * - generateTopicSummary - A function that takes a topic as input and returns a summarized text.
 * - GenerateTopicSummaryInput - The input type for the generateTopicSummary function.
 * - GenerateTopicSummaryOutput - The return type for the generateTopicSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTopicSummaryInputSchema = z.object({
  topic: z.string().describe('The topic to be summarized.'),
});

export type GenerateTopicSummaryInput = z.infer<typeof GenerateTopicSummaryInputSchema>;

const GenerateTopicSummaryOutputSchema = z.object({
  summary: z.string().describe('A short, concise summary of the topic.'),
  progress: z.string().describe('Short progress summary'),
});

export type GenerateTopicSummaryOutput = z.infer<typeof GenerateTopicSummaryOutputSchema>;

export async function generateTopicSummary(input: GenerateTopicSummaryInput): Promise<GenerateTopicSummaryOutput> {
  return generateTopicSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTopicSummaryPrompt',
  input: {schema: GenerateTopicSummaryInputSchema},
  output: {schema: GenerateTopicSummaryOutputSchema},
  prompt: `Summarize the following topic in a short, concise manner:\n\nTopic: {{{topic}}}`,
});

const generateTopicSummaryFlow = ai.defineFlow(
  {
    name: 'generateTopicSummaryFlow',
    inputSchema: GenerateTopicSummaryInputSchema,
    outputSchema: GenerateTopicSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      ...output!,
      progress: 'Generated a short summary of the provided topic.',
    };
  }
);
