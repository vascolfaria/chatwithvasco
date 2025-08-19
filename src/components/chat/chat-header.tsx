import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatHeaderProps {
  questionsLeft: number;
}

export function ChatHeader({ questionsLeft }: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <Avatar className="h-12 w-12">
        <AvatarImage
          src="https://ca.slack-edge.com/T04T04ZC3-U03J15729L5-5127c8a239ef-512"
          alt="Vasco"
        />
        <AvatarFallback>V</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-lg font-bold text-primary">Vasco</h2>
        <p className="text-sm text-muted-foreground">Senior Product Manager</p>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="text-sm text-muted-foreground">
          {questionsLeft} questions left
        </div>
        <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Online</span>
        </div>
      </div>
    </div>
  );
}
