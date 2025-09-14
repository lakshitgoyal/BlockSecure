import { config } from 'dotenv';
config();

import '@/ai/flows/real-time-fraud-alerts.ts';
import '@/ai/flows/trust-score-generation.ts';
import '@/ai/flows/transaction-risk-assessment.ts';