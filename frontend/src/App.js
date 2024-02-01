import "./App.css";

import { AuthProvider } from "./Contexts/Auth/index";
import { ConfigProvider } from "./Contexts/Config/index";
import { StreamingProvider } from "./Contexts/Streaming/index";
import Router from './Router'

function App() {
  return (
    <ConfigProvider>
      <AuthProvider>
        <StreamingProvider>
          <Router />
        </StreamingProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
