import React from "react";
import ChatSession from "./components/ChatSession";
import { Provider } from "react-redux";
import store from "./app/store";
import { StyledEngineProvider } from '@mui/system';

function App() {
  return (
    <Provider store={store}>
      <ChatSession />
    </Provider>
  );
}

export default App;
