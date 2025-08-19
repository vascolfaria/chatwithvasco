import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormEvent>) => void;
  isLoading: boolean;
  limitReached: boolean;
}

export function ChatInput({ input, handleInputChange, handleSubmit, isLoading, limitReached }: ChatInputProps) {
  const placeholderText = limitReached
    ? "You have reached the daily message limit."
    : "Ask me anything about my experience...";
  
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t p-4">
      <Input
        type="text"
        placeholder={placeholderText}
        value={input}
        onChange={handleInputChange}
        disabled={isLoading || limitReached}
        className="flex-1"
        autoComplete="off"
        aria-label="Chat input"
      />
      <Button type="submit" size="icon" disabled={isLoading || limitReached || !input.trim()}>
        <SendHorizonal className="h-5 w-5" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
}
