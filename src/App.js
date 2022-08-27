import { useState } from "react";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

function App() {

  const [sidebarVisibility, setSidebarVisibility] = useState(true)

  return (
    <div className="grid grid-cols-9 h-screen overflow-hidden">
      {sidebarVisibility && (<Sidebar />)}
      <Chat />
    </div>
  );
}

export default App;
