'use server';

/**
 * @fileOverview A transaction risk assessment AI agent.
 *
 * - assessTransactionRisk - A function that handles the transaction risk assessment process.
 * - TransactionRiskAssessmentInput - The input type for the assessTransactionRisk function.
 * - TransactionRiskAssessmentOutput - The return type for the assessTransactionRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TransactionRiskAssessmentInputSchema = z.object({
  transactionData: z
    .string()
    .describe('The transaction data to assess for risk.'),
  userTrustScore: z.number().describe('The user trust score.'),
});
export type TransactionRiskAssessmentInput = z.infer<
  typeof TransactionRiskAssessmentInputSchema
>;

const TransactionRiskAssessmentOutputSchema = z.object({
  riskScore: z.number().describe('The risk score of the transaction.'),
  riskFactors: z.array(z.string()).describe('The risk factors of the transaction.'),
  summary: z.string().describe('A summary of the risk assessment.'),
});
export type TransactionRiskAssessmentOutput = z.infer<
  typeof TransactionRiskAssessmentOutputSchema
>;

export async function assessTransactionRisk(
  input: TransactionRiskAssessmentInput
): Promise<TransactionRiskAssessmentOutput> {
  return assessTransactionRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'transactionRiskAssessmentPrompt',
  input: {schema: TransactionRiskAssessmentInputSchema},
  output: {schema: TransactionRiskAssessmentOutputSchema},
  prompt: `You are an AI agent specializing in assessing the risk of DeFi transactions.

You will analyze the provided transaction data and user trust score to determine the risk associated with the transaction.

Generate a risk score between 0 and 100, where 0 is the lowest risk and 100 is the highest risk.

Identify the risk factors contributing to the overall risk score.

Provide a summary of the risk assessment, highlighting the key risks and mitigations.

Transaction Data: {{{transactionData}}}
User Trust Score: {{{userTrustScore}}}

Output:
Risk Score:
Risk Factors:
Summary:`,
});

const assessTransactionRiskFlow = ai.defineFlow(
  {
    name: 'assessTransactionRiskFlow',
    inputSchema: TransactionRiskAssessmentInputSchema,
    outputSchema: TransactionRiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
