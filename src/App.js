import { useEffect, useState } from "react";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import SidebarContext from "./Context/SidebarContext";

function App() {

  const [sidebarVisibility, setSidebarVisibility] = useState(true)

  useEffect(() => {

    function handleWindowResize() {
      if (window.innerWidth > 1024) {
        setSidebarVisibility(true);
      }
    }

    window.addEventListener("resize", handleWindowResize)


    return () => window.removeEventListener("resize", handleWindowResize);
  }, [])

  return (
    <SidebarContext.Provider value={{
      sidebarVisibility, setSidebarVisibility
    }}>

      <div className="grid grid-cols-9 h-screen overflow-hidden">
        {sidebarVisibility && (<Sidebar setSidebarVisibility={setSidebarVisibility} />)}
        <Chat setSidebarVisibility={setSidebarVisibility} />
      </div>

    </SidebarContext.Provider>
  );
}

export default App;
