import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, LinearProgress } from "@mui/material";
import { addMessage, startNewSession, ChatState} from "../features/chatSlice";
// ... other imports ...
import { fetchAiReply } from "../api/chatApi";
interface RootState {
    chat: ChatState;
  }

function ChatSession() {
  const dispatch = useDispatch();
  const sessions = useSelector((state: RootState) => state.chat.sessions);
  const activeSessionId = useSelector((state: RootState) => state.chat.activeSessionId);
  const activeSession = useSelector((state: RootState) => 
    state.chat.sessions.find(session => session.id === activeSessionId)
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    setLoading(true);
    dispatch(addMessage({ sender: "user", content: input }));

    try {
      const aiReply = await fetchAiReply(input);
      // Convert AI reply which is Json to a string
      const aiReplyStr = aiReply;

      dispatch(addMessage({ sender: "ai", content: aiReplyStr }));
      setInput("");
    } catch (error) {
      console.error("Error fetching AI reply:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={() => dispatch(startNewSession())}>
        Start New Session
      </Button>
      {activeSession && (
        <div>
          <div>
            {activeSession.messages.map((message, index) => (
              <div key={index}>
                <strong>{message.sender}:</strong> {message.content}
              </div>
            ))}
          </div>
          <div>
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
          {loading && <LinearProgress />}
        </div>
      )}
    </div>
  );
}

export default ChatSession;
