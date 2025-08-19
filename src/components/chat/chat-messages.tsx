"use client";

import type { Message } from "@/app/page";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef } from "react";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

const LoadingBubble = () => (
  <div className="flex items-end gap-3 self-start">
    <Avatar className="h-8 w-8">
      <AvatarImage src="https://ca.slack-edge.com/T04T04ZC3-U03J15729L5-5127c8a239ef-512" alt="Vasco" />
      <AvatarFallback>V</AvatarFallback>
    </Avatar>
    <div className="flex items-center justify-center gap-1.5 rounded-lg bg-secondary p-3">
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]"></span>
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]"></span>
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></span>
    </div>
  </div>
);

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);

  return (
    <ScrollArea className="flex-1" viewportRef={scrollAreaRef}>
      <div className="flex flex-col gap-4 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-end gap-3",
              message.role === "user" ? "self-end justify-end" : "self-start"
            )}
          >
            {message.role === "assistant" && (
              <Avatar className="h-8 w-8 self-start">
                <AvatarImage src="https://ca.slack-edge.com/T04T04ZC3-U03J15729L5-5127c8a239ef-512" alt="Vasco" />
                <AvatarFallback>V</AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "max-w-md rounded-lg p-3 text-sm md:max-w-xl lg:max-w-2xl",
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              <ReactMarkdown
                className="prose prose-sm dark:prose-invert prose-p:m-0 prose-ul:m-0 prose-li:m-0"
                components={{
                  ul: ({ node, ...props }) => <ul className="list-disc space-y-1 pl-4" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
            {message.role === 'user' && (
                <Avatar className="h-8 w-8 self-start">
                    <AvatarFallback>TA</AvatarFallback>
                </Avatar>
            )}
          </div>
        ))}
        {isLoading && <LoadingBubble />}
      </div>
    </ScrollArea>
  );
}
