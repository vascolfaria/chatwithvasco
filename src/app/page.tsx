"use client";

import { useState, useEffect, useCallback } from "react";
import { generateAIPersonaResponse } from "@/ai/flows/generate-ai-persona-response";
import { ChatLayout } from "@/components/chat/chat-layout";
import { getMessageCount, incrementMessageCount, hasReachedMessageLimit } from "@/lib/cookies";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const LIMIT_REACHED_MESSAGE = "Unfortunately I am unable to proceed more with this conversation in order to avoid going bankrupt. If you need any more information feel free to reach out at fariavasco96@gmail.com";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  const checkLimit = useCallback(() => {
    const initialCount = getMessageCount();
    const isLimitReached = hasReachedMessageLimit(initialCount);
    setLimitReached(isLimitReached);
    return isLimitReached;
  }, []);

  useEffect(() => {
    checkLimit();
    setMessages([
        {
            id: 'init',
            role: 'assistant',
            content: "Hello! I'm Vasco. I'm a Senior Product Manager with a passion for building user-centric products that solve real-world problems, especially in sustainability and AI. Feel free to ask me anything about my experience."
        }
    ]);
  }, [checkLimit]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormEvent>) => {
    e.preventDefault();
    if (!input.trim() || isLoading || limitReached) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    const newCount = incrementMessageCount();
    const isLimitReached = hasReachedMessageLimit(newCount);

    if (isLimitReached) {
        setLimitReached(true);
        const limitMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: LIMIT_REACHED_MESSAGE
        };
        setMessages((prev) => [...prev, limitMessage]);
        return;
    }

    setIsLoading(true);
    
    try {
      const result = await generateAIPersonaResponse({ question: input });
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: result.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating AI response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex h-full flex-col items-center justify-center bg-background">
      <ChatLayout
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        limitReached={limitReached}
      />
    </main>
  );
}
