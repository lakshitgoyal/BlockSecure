'use server';

/**
 * @fileOverview A Trust Score generation AI agent.
 *
 * - generateTrustScore - A function that handles the trust score generation process.
 * - TrustScoreInput - The input type for the generateTrustScore function.
 * - TrustScoreOutput - The return type for the generateTrustScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrustScoreInputSchema = z.object({
  transactionHistory: z
    .string()
    .describe("A user's transaction history on the Yellow Network."),
  walletAge: z.number().describe('The age of the wallet in days.'),
  interactionWithFraudulentAddresses: z
    .boolean()
    .describe(
      'Whether the wallet has interacted with known fraudulent addresses.'
    ),
  onChainBehavior: z.string().describe('Description of the on-chain behavior.'),
});
export type TrustScoreInput = z.infer<typeof TrustScoreInputSchema>;

const TrustScoreOutputSchema = z.object({
  trustScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'A score between 0 and 100 representing the trustworthiness of the user.'
    ),
  riskScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'A score between 0 and 100 representing the risk associated with the user.'
    ),
  rationale: z
    .string()
    .describe(
      'A brief explanation of why the trust score and risk score were assigned.'
    ),
});
export type TrustScoreOutput = z.infer<typeof TrustScoreOutputSchema>;

export async function generateTrustScore(input: TrustScoreInput): Promise<TrustScoreOutput> {
  return generateTrustScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTrustScorePrompt',
  input: {schema: TrustScoreInputSchema},
  output: {schema: TrustScoreOutputSchema},
  prompt: `You are an AI assistant specializing in evaluating the trustworthiness of users on a DeFi micro-lending platform.

  Based on the provided information, generate a trust score and a risk score for the user.

  The trust score should be an integer between 0 and 100 reflecting the user's reputation within the YellowEye ecosystem, considering factors like transaction history, wallet age, interaction with fraudulent addresses, and on-chain behavior.

  The risk score should be an integer between 0 and 100 indicating the potential risk associated with lending to this user.

  Provide a brief rationale for the assigned scores.

  Transaction History: {{{transactionHistory}}}
  Wallet Age: {{{walletAge}}} days
  Interaction with Fraudulent Addresses: {{{interactionWithFraudulentAddresses}}}
  On-Chain Behavior: {{{onChainBehavior}}}`,
});

const generateTrustScoreFlow = ai.defineFlow(
  {
    name: 'generateTrustScoreFlow',
    inputSchema: TrustScoreInputSchema,
    outputSchema: TrustScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
