import { useState } from "react";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

function App() {

  const [sidebarVisibility, setSidebarVisibility] = useState(true)

  return (
    <div className="grid grid-cols-9 h-screen overflow-hidden">
      {sidebarVisibility && (<Sidebar setSidebarVisibility={setSidebarVisibility}/>)}
      <Chat setSidebarVisibility={setSidebarVisibility}/>
    </div>
  );
}

export default App;
