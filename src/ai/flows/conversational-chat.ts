
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { loanOffers, myLoans, myBorrowings } from '@/lib/data';
import { assessTransactionRisk, TransactionRiskAssessmentInput } from './transaction-risk-assessment';
import { generateTrustScore } from './trust-score-generation';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.array(z.object({ text: z.string() })),
});

export type Message = z.infer<typeof MessageSchema>;

const findLoanOrOffer = ai.defineTool(
  {
    name: 'findLoanOrOffer',
    description: 'Get details for a specific loan, borrowing, or offer by its ID.',
    inputSchema: z.object({
      id: z.string().describe('The ID of the loan, borrowing, or offer to retrieve.'),
    }),
    outputSchema: z.any().optional(),
  },
  async ({ id }) => {
    console.log(`Searching for loan or offer with ID: ${id}`);
    const allItems = [...loanOffers, ...myLoans, ...myBorrowings];
    const item = allItems.find((o) => o.id === id);
    return item;
  }
);


const assessLoanRisk = ai.defineTool(
    {
        name: 'assessLoanRisk',
        description: 'Assesses the risk of a given loan or offer ID.',
        inputSchema: z.object({
            id: z.string().describe('The ID of the loan or offer to assess.'),
        }),
        outputSchema: z.any(),
    },
    async ({ id }) => {
        console.log(`Assessing risk for loan/offer ID: ${id}`);
        const allItems = [...loanOffers, ...myLoans, ...myBorrowings];
        const item = allItems.find((o) => o.id === id);

        if (!item) {
            return { error: 'Loan or offer not found.' };
        }

        // We need a trust score to assess risk. If it's a loan offer, use the borrower's score.
        // Otherwise, we'll generate a generic one for the user for this assessment.
        let userTrustScore = 70; // Default
        if ('borrowerTrustScore' in item) {
            userTrustScore = item.borrowerTrustScore;
        } else {
             const score = await generateTrustScore({
                transactionHistory: 'Completed 5 loans, 2 borrowings. All on time.',
                walletAge: 365,
                interactionWithFraudulentAddresses: false,
                onChainBehavior: 'Regular token swaps, provides liquidity.',
             });
             userTrustScore = score.trustScore;
        }
        
        const input: TransactionRiskAssessmentInput = {
            transactionData: JSON.stringify(item),
            userTrustScore: userTrustScore,
        };

        const result = await assessTransactionRisk(input);
        return result;
    }
);


export const conversationFlow = ai.defineFlow(
  {
    name: 'conversationFlow',
    inputSchema: z.array(MessageSchema),
    outputSchema: MessageSchema.optional(),
  },
  async (messages) => {
    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));
    const lastMessage = messages[messages.length - 1];

    const response = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      history,
      prompt: lastMessage.content.map((part) => part.text).join(' '),
      tools: [findLoanOrOffer, assessLoanRisk],
      config: {
        temperature: 0.3,
      },
      system: `You are an expert AI assistant for BlockSecure, a micro-finance platform.
      - Your primary goal is to help users understand their finances, evaluate loan offers, and assess risk.
      - You are helpful, polite, and provide clear, concise answers.
      - Use the 'findLoanOrOffer' tool to look up details about a loan, borrowing, or offer by its ID (e.g., 'OFFER001', 'LOAN002').
      - Use the 'assessLoanRisk' tool when a user asks you to assess the risk of a specific loan or offer ID. This tool provides a detailed risk breakdown.
      - Do not make up information. If you don't know the answer, say so.
      - Your responses should be formatted for a chat interface.`,
    });

    if (response.toolRequest) {
      console.log('Tool call requested:', response.toolRequest);
      
      const toolResponse = await ai.runTool(response.toolRequest);

      const secondResult = await ai.generate({
          model: 'googleai/gemini-2.5-flash',
          history: [
              ...history,
              { role: 'user', content: [{ text: lastMessage.content.map(p => p.text).join(' ') }] },
              response.toHistoryMessage(),
          ],
          prompt: { role: 'tool', content: [{ toolResponse }] },
          tools: [findLoanOrOffer, assessLoanRisk],
      });
      
      return {
          role: 'model',
          content: [{ text: secondResult.text }],
      };
    }

    if (response.text) {
      return {
        role: 'model',
        content: [{ text: response.text }],
      };
    }

    return undefined;
  }
);
