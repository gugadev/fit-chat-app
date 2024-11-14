import { httpChatGPT } from "../infra/http";
import { CompletionResponse } from "../types/completions";
import { DisplayMessage, MessageDTO } from "../types/message";

type ChatGPTRoutes = "/chat/completions"; // add another routes if needed

const sendPrompt = async (
  path: ChatGPTRoutes,
  messages: MessageDTO[],
): Promise<DisplayMessage> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await httpChatGPT<CompletionResponse>(path, "POST", {
      model: "gpt-4o-mini",
      messages,
    });
    console.log({ response });
    const firstChoice = response.choices[0];
    return {
      id: response.id,
      message: firstChoice.message.content,
      sentBy: firstChoice.message.role === "assistant" ? "system" : "user",
      sentTime: Date.now(),
    } as DisplayMessage;
  } catch (err) {
    // we can throw a custom error here, for example for rate limit or when the model usage reaches its limit
    throw err;
  }
};

export { sendPrompt };
