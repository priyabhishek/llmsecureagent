interface ImportMetaEnv {
    VITE_OPENAI_API_KEY: string; // Or "string | undefined" to be more explicit that it could be missing
    // more environment variables can be added here as needed
    VITE_DEFAULT_CHAT_MODEL: string | undefined;
  }
  
  interface ImportMeta {
    env: ImportMetaEnv;
  }