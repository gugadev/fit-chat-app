import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./App.css";
import {
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";
import { sendPrompt } from "./services/chatgpt";
import { DisplayMessage, MessageDTO } from "./types/message";
import { formatRelative } from "./utils/date";
import { usePrompts } from "./hooks/usePrompts";

function App() {
  const [chatHistory, setChatHistory] = useState<DisplayMessage[]>([]);
  const [thinking, setThinking] = useState(false);
  const [message, setMessage] = useState("");
  const { createPrompt } = usePrompts();

  const handleChange = (
    _innerHTML: string,
    textContent: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _innerText: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _nodes: NodeList,
  ) => {
    setMessage(textContent);
  };

  const handleSend = async () => {
    try {
      setThinking(true);
      setMessage("");
      setChatHistory([
        ...chatHistory,
        {
          id: window.crypto.randomUUID(),
          message,
          sentBy: "user",
          sentTime: Date.now(),
        },
      ]);
      const prompt: MessageDTO[] = createPrompt(chatHistory, message);
      const displayMessage = await sendPrompt("/chat/completions", prompt);
      setChatHistory((_history) => [..._history, displayMessage]);
    } catch (err) {
      console.log({ err });
      // if err instanceof SomeCustomError: do something here...
    } finally {
      setThinking(false);
    }
  };

  return (
    <main className="container">
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {chatHistory.map((message) => (
              <Message
                key={message.id}
                model={{
                  message: `${message.message}`,
                  sentTime: formatRelative(new Date(message.sentTime)),
                  sender: message.sentBy,
                  direction:
                    message.sentBy === "system" ? "incoming" : "outgoing",
                  position: "single",
                }}
              />
            ))}
          </MessageList>
          <MessageInput
            attachButton={false}
            sendButton
            sendDisabled={thinking || message === ""}
            value={message}
            onChange={handleChange}
            onSend={handleSend}
          />
        </ChatContainer>
      </MainContainer>
    </main>
  );
}

export default App;
