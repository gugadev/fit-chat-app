/**
 * Used to send the payload
 */
interface MessageDTO {
  role: "user" | "system";
  content: string;
}

/**
 * Used to dispaly messages
 */
interface DisplayMessage {
  id: string;
  message: string;
  sentBy: "user" | "system";
  sentTime: number;
}

export type { MessageDTO, DisplayMessage };
