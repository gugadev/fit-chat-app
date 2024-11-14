interface CompletionChoice {
  finish_reason: string;
  index: number;
  logprobs: string | null;
  message: {
    content: string;
    role: string;
    refusal: string | null;
  };
}

interface CompletionResponse {
  choices: CompletionChoice[];
  created: number;
  id: string;
  model: string;
  object: string;
  system_fingerprint: string;
  // usage => not use atm, but this can be used to determine the usage of the model and throw a custom error when the limit is reached
}

export type { CompletionChoice, CompletionResponse };
