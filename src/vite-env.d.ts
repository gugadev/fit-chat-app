/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHATGPT_API_URL: string;
  readonly VITE_CHATGPT_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
