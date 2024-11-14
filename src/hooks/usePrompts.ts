import { DisplayMessage, MessageDTO } from "../types/message";

function usePrompts() {
  const createPrompt = (
    messages: DisplayMessage[],
    newMessage: string,
  ): MessageDTO[] => {
    return [
      ...messages.map((message) => {
        return {
          role: message.sentBy as "user" | "system",
          content: message.message,
        } as MessageDTO;
      }),
      { role: "user", content: newMessage },
    ];
  };

  return { createPrompt };
}

export { usePrompts };
