"use client";

import { useState, useEffect } from "react";
import { generateAIPersonaResponse } from "@/ai/flows/generate-ai-persona-response";
import { ChatLayout } from "@/components/chat/chat-layout";
import { getMessageCount, incrementMessageCount, hasReachedMessageLimit } from "@/lib/cookies";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    const initialCount = getMessageCount();
    setMessageCount(initialCount);
    setLimitReached(hasReachedMessageLimit(initialCount));
    
    setMessages([
        {
            id: 'init',
            role: 'assistant',
            content: "Hello! I'm Vasco. I'm a Senior Product Manager with a passion for building user-centric products that solve real-world problems, especially in sustainability and AI. Feel free to ask me anything about my experience."
        }
    ])
  }, []);
  
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
    setIsLoading(true);

    const newCount = incrementMessageCount();
    setMessageCount(newCount);
    if (hasReachedMessageLimit(newCount)) {
        setLimitReached(true);
    }
    
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
