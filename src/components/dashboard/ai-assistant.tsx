
'use client';

import { doConversation } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InrLoader } from '@/components/icons/inr-loader';
import { Bot, User } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import type { Message } from '@/ai/flows/conversational-chat';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

export function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    const currentInput = input;
    setInput('');

    startTransition(async () => {
        const userMessage: Message = { role: 'user', content: [{ text: currentInput }] };
        const newMessages: Message[] = [...messages, userMessage];
        setMessages(newMessages);

        const result = await doConversation(newMessages);
        
        if (result) {
            setMessages((prev) => [...prev, result]);
        }
    });

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Card className="h-[calc(100vh-8rem)] flex flex-col">
        <CardHeader>
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>Chat with our AI to get help with your finances.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
            <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                {messages.map((msg, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                    {msg.role === 'user' ? <User className="w-5 h-5 mt-1" /> : <Bot className="w-5 h-5 mt-1" />}
                    <div className="flex-1">
                        <p className="font-semibold">{msg.role === 'user' ? 'You' : 'AI Assistant'}</p>
                        <div className="prose prose-sm max-w-full text-foreground">
                            {msg.content.map((part, j) => (
                                <span key={j}>{part.text}</span>
                            ))}
                        </div>
                    </div>
                    </div>
                ))}
                {isPending && (
                    <div className="flex gap-3 text-sm">
                        <Bot className="w-5 h-5 mt-1" />
                        <div className="flex-1">
                            <p className="font-semibold">AI Assistant</p>
                            <InrLoader className="w-6 h-6" />
                        </div>
                    </div>
                )}
                </div>
                <div ref={messagesEndRef} />
            </ScrollArea>
            
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about loan offers, risk assessment, or your account..."
                className="flex-1"
                disabled={isPending}
                />
                <Button type="submit" disabled={isPending || !input}>
                Send
                </Button>
            </form>
        </CardContent>
    </Card>
  );
}

