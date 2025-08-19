import type { Message } from "@/app/page";
import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { Card } from "@/components/ui/card";

interface ChatLayoutProps {
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormEvent>) => void;
  isLoading: boolean;
  limitReached: boolean;
}

export function ChatLayout({ messages, input, handleInputChange, handleSubmit, isLoading, limitReached }: ChatLayoutProps) {
  return (
    <Card className="w-full max-w-4xl h-[95vh] max-h-[800px] flex flex-col shadow-2xl rounded-2xl">
      <ChatHeader />
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        limitReached={limitReached}
      />
    </Card>
  );
}
