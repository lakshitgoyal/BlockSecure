
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { loanOffers } from '@/lib/data';
import { generate } from 'genkit/generate';

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
      content: msg.content,
    }));
    const lastMessage = messages[messages.length - 1];

    const response = await generate({
      model: 'googleai/gemini-2.5-flash',
      history,
      prompt: lastMessage.content.map((part) => part.text).join(' '),
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

    const choice = response.candidates[0];
    if (!choice) {
      return undefined;
    }

    // Handle potential tool calls
    if (choice.finishReason === 'toolCode' && choice.message.content) {
        const toolRequestPart = choice.message.content.find(part => 'toolRequest' in part);
        if(toolRequestPart && 'toolRequest' in toolRequestPart) {
            console.log('Tool call requested:', toolRequestPart.toolRequest);
            
            const toolResponse = await ai.runTool(toolRequestPart.toolRequest);

            // Re-run the generation with the tool's output
            const secondResult = await generate({
                model: 'googleai/gemini-2.5-flash',
                history: [
                    ...history,
                    { role: 'user', content: [{ text: lastMessage.content.map(p => p.text).join(' ') }] },
                    { role: 'model', content: [toolRequestPart] },
                ],
                prompt: { role: 'tool', content: [{ toolResponse }] },
                tools: [getLoanOfferDetails],
            });

            const secondChoice = secondResult.candidates[0];
            if (secondChoice) {
                return {
                    role: 'model',
                    content: [{ text: secondChoice.text() }],
                };
            }
        }
    }


    const textResponse = choice.text();
    return {
      role: 'model',
      content: [{ text: textResponse }],
    };
  }
);
