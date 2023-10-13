import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  sender: "user" | "ai";
  content: string;
}

interface Session {
  id: number;
  messages: Message[];
}

export interface ChatState {
  sessions: Session[];
  activeSessionId: number | null;
}

const initialState: ChatState = {
  sessions: [],
  activeSessionId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    startNewSession: (state) => {
      const newSession: Session = { id: Date.now(), messages: [] };
      state.sessions.push(newSession);
      state.activeSessionId = newSession.id;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const session = state.sessions.find((s) => s.id === state.activeSessionId);
      if (session) session.messages.push(action.payload);
    },
  },
});

export const { startNewSession, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
