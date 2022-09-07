import { useEffect, useState } from "react";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

import SidebarContext from "./Context/SidebarContext";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [sidebarVisibility, setSidebarVisibility] = useState(false)
  const [isBigScreen, setIsBigScreen] = useState(false)

  useEffect(() => {

    function handleWindowResize() {
      if (window.innerWidth > 1024) {
        setSidebarVisibility(true);
        setIsBigScreen(true)
      } else {
        setIsBigScreen(false)
      }
    }
    handleWindowResize()
    window.addEventListener("resize", handleWindowResize)


    return () => window.removeEventListener("resize", handleWindowResize);
  }, [])

  const handleToggleSidebar = () => {
    setSidebarVisibility(!sidebarVisibility)
  }

  const sidebarVisibilityCondition = (!sidebarVisibility && !isBigScreen) || (sidebarVisibility && isBigScreen)

  return (
    <SidebarContext.Provider value={{
      sidebarVisibility, setSidebarVisibility,
      handleToggleSidebar
    }}>

      <div className="grid grid-cols-9 h-screen overflow-hidden">
        {sidebarVisibility && (<Sidebar />)}
        {sidebarVisibilityCondition && (<Chat />)}

      </div>
      <ToastContainer />
    </SidebarContext.Provider>
  );
}

export default App;
