'use server';
/**
 * @fileOverview Explains a complex topic in a simplified manner for beginners.
 *
 * - explainLikeImABeginner - A function that simplifies a complex topic for beginners.
 * - ExplainLikeImABeginnerInput - The input type for the explainLikeImABeginner function.
 * - ExplainLikeImABeginnerOutput - The return type for the explainLikeImABeginner function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainLikeImABeginnerInputSchema = z.object({
  topic: z.string().describe('The complex topic to be simplified.'),
});
export type ExplainLikeImABeginnerInput = z.infer<typeof ExplainLikeImABeginnerInputSchema>;

const ExplainLikeImABeginnerOutputSchema = z.object({
  simplifiedExplanation: z.string().describe('The simplified explanation of the topic.'),
});
export type ExplainLikeImABeginnerOutput = z.infer<typeof ExplainLikeImABeginnerOutputSchema>;

export async function explainLikeImABeginner(
  input: ExplainLikeImABeginnerInput
): Promise<ExplainLikeImABeginnerOutput> {
  return explainLikeImABeginnerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainLikeImABeginnerPrompt',
  input: {schema: ExplainLikeImABeginnerInputSchema},
  output: {schema: ExplainLikeImABeginnerOutputSchema},
  prompt: `You are an expert at explaining complex topics in simple terms for beginners.

  Please explain the following topic as if you were explaining it to someone with no prior knowledge of the subject. Use analogies, examples, and avoid jargon.

  Topic: {{{topic}}}`,
});

const explainLikeImABeginnerFlow = ai.defineFlow(
  {
    name: 'explainLikeImABeginnerFlow',
    inputSchema: ExplainLikeImABeginnerInputSchema,
    outputSchema: ExplainLikeImABeginnerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
