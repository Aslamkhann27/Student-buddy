import { config } from 'dotenv';
config();

import '@/ai/flows/generate-topic-summary.ts';
import '@/ai/flows/explain-like-im-a-beginner.ts';
import '@/ai/flows/generate-flashcards.ts';
import '@/ai/flows/generate-quiz.ts';