
'use server';

import { conversationFlow, Message } from '@/ai/flows/conversational-chat';

export async function doConversation(
  messages: Message[]
): Promise<Message | undefined> {
  const result = await conversationFlow(messages);
  return result;
}
