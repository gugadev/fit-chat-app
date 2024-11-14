const httpChatGPT = async <T = unknown>(
  url: string,
  method: "GET" | "POST" = "GET",
  payload?: BodyInit | object,
) => {
  const res = await fetch(`${import.meta.env.VITE_CHATGPT_API_URL}/${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_CHATGPT_KEY}`,
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });
  return (await res.json()) as T;
};

export { httpChatGPT };
