
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { loanOffers } from '@/lib/data';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.array(z.object({ text: z.string() })),
});

export type Message = z.infer<typeof MessageSchema>;

const getLoanOfferDetails = ai.defineTool(
    {
      name: 'getLoanOfferDetails',
      description: 'Get details for a specific loan offer by its ID.',
      inputSchema: z.object({
        offerId: z.string().describe('The ID of the loan offer to retrieve.'),
      }),
      outputSchema: z.object({
        id: z.string(),
        amount: z.number(),
        interestRate: z.number(),
        repaymentPeriod: z.number(),
        borrowerTrustScore: z.number(),
      }).optional(),
    },
    async ({ offerId }) => {
      console.log(`Searching for loan offer: ${offerId}`);
      const offer = loanOffers.find((o) => o.id === offerId);
      return offer;
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
      parts: msg.content.map((part) => ({ text: part.text })),
    }));
    const lastMessage = messages[messages.length - 1];

    const llm = ai.getGenerator('googleai/gemini-2.5-flash');

    const result = await llm.generate({
      history,
      prompt: lastMessage.content.map((part) => ({ text: part.text })).join(' '),
      tools: [getLoanOfferDetails],
      config: {
        // Lower temperature for more factual, less creative responses
        temperature: 0.3,
      },
      system: `You are an expert AI assistant for BlockSecure, a micro-finance platform.
      - Your primary goal is to help users understand their finances, evaluate loan offers, and assess risk.
      - You are helpful, polite, and provide clear, concise answers.
      - If you are asked to look up a loan offer, use the getLoanOfferDetails tool. The offer IDs are like 'OFFER001', 'OFFER002', etc.
      - Do not make up information. If you don't know the answer, say so.
      - Your responses should be formatted for a chat interface.`,
    });

    const choice = result.choices[0];
    if (!choice) {
      return undefined;
    }
    
    // Handle potential tool calls
    if (choice.finishReason === 'toolCode') {
        const toolRequest = choice.output?.content.find(part => 'toolRequest' in part)?.toolRequest;
        if(toolRequest) {
            console.log('Tool call requested:', toolRequest);
            const toolResponse = await ai.runTool(toolRequest);
            console.log('Tool response:', toolResponse);
            return {
                role: 'model',
                content: [{ text: toolResponse }],
            };
        }
    }


    const textResponse = choice.text;
    return {
      role: 'model',
      content: [{ text: textResponse }],
    };
  }
);
