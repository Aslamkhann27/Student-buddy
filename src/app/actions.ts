
'use server';

import {
  generateFlashcards,
  GenerateFlashcardsInput,
  GenerateFlashcardsOutput,
} from '@/ai/flows/generate-flashcards';
import {
  generateQuiz,
  GenerateQuizInput,
  GenerateQuizOutput,
} from '@/ai/flows/generate-quiz';
import {
  generateTopicSummary,
  GenerateTopicSummaryInput,
  GenerateTopicSummaryOutput,
} from '@/ai/flows/generate-topic-summary';
import {
  explainLikeImABeginner,
  ExplainLikeImABeginnerInput,
  ExplainLikeImABeginnerOutput,
} from '@/ai/flows/explain-like-im-a-beginner';

type ActionResult<T> = {
  data?: T;
  error?: string;
};

export async function getSummary(
  input: GenerateTopicSummaryInput
): Promise<ActionResult<GenerateTopicSummaryOutput>> {
  try {
    const data = await generateTopicSummary(input);
    return { data };
  } catch (e) {
    console.error(e);
    return {
      error: e instanceof Error ? e.message : 'An unexpected error occurred.',
    };
  }
}

export async function getExplanation(
  input: ExplainLikeImABeginnerInput
): Promise<ActionResult<ExplainLikeImABeginnerOutput>> {
  try {
    const data = await explainLikeImABeginner(input);
    return { data };
  } catch (e) {
    console.error(e);
    return {
      error: e instanceof Error ? e.message : 'An unexpected error occurred.',
    };
  }
}

export async function getQuiz(
  input: GenerateQuizInput
): Promise<ActionResult<GenerateQuizOutput>> {
  try {
    const data = await generateQuiz(input);
    return { data };
  } catch (e) {
    console.error(e);
    return {
      error: e instanceof Error ? e.message : 'An unexpected error occurred.',
    };
  }
}

export async function getFlashcards(
  input: GenerateFlashcardsInput
): Promise<ActionResult<GenerateFlashcardsOutput>> {
  try {
    const data = await generateFlashcards(input);
    return { data };
  } catch (e) {
    console.error(e);
    return {
      error: e instanceof Error ? e.message : 'An unexpected error occurred.',
    };
  }
}
