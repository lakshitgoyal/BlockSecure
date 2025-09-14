'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating real-time fraud alerts based on transaction risk scores.
 *
 * - generateFraudAlert - A function that triggers the fraud alert generation process.
 * - FraudAlertInput - The input type for the generateFraudAlert function.
 * - FraudAlertOutput - The return type for the generateFraudAlert function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FraudAlertInputSchema = z.object({
  transactionId: z.string().describe('The ID of the transaction being monitored.'),
  trustScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'The trust score associated with the transaction, ranging from 0 (low trust) to 100 (high trust).'
    ),
  riskScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'The risk score associated with the transaction, ranging from 0 (low risk) to 100 (high risk).'
    ),
  userId: z.string().describe('The ID of the user associated with the transaction.'),
});
export type FraudAlertInput = z.infer<typeof FraudAlertInputSchema>;

const FraudAlertOutputSchema = z.object({
  alertMessage: z.string().describe('A message describing the potential fraud.'),
  severity: z.enum(['high', 'medium', 'low']).describe('The severity of the fraud alert.'),
});
export type FraudAlertOutput = z.infer<typeof FraudAlertOutputSchema>;

export async function generateFraudAlert(input: FraudAlertInput): Promise<FraudAlertOutput> {
  return fraudAlertFlow(input);
}

const fraudAlertPrompt = ai.definePrompt({
  name: 'fraudAlertPrompt',
  input: {schema: FraudAlertInputSchema},
  output: {schema: FraudAlertOutputSchema},
  prompt: `You are an AI assistant specializing in detecting fraudulent transactions.

  Based on the transaction's trust score ({{trustScore}}) and risk score ({{riskScore}}), generate an alert message that informs the user ({{userId}}) about potential fraud.

  Consider the following:
  - A low trust score (below 30) and a high risk score (above 70) indicate a high probability of fraud.
  - A medium trust score (30-70) and a medium risk score (30-70) indicate a medium probability of fraud.
  - A high trust score (above 70) and a low risk score (below 30) indicate a low probability of fraud.

  The alert message should be concise and informative, advising the user on the next steps to take to protect their account. Make sure to reference the transactionId ({{transactionId}}) in your alert message.

  Return the severity level of the alert (high, medium, or low) based on the risk and trust scores.`,
});

const fraudAlertFlow = ai.defineFlow(
  {
    name: 'fraudAlertFlow',
    inputSchema: FraudAlertInputSchema,
    outputSchema: FraudAlertOutputSchema,
  },
  async input => {
    const {output} = await fraudAlertPrompt(input);
    return output!;
  }
);
