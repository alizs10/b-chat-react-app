import { useEffect, useState } from "react";

import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

import { useDispatch } from "react-redux";
import { setConversations } from "./redux/slices/conversationsSlice";

import { AppContext } from "./Context/AppContext";
import SidebarContext from "./Context/SidebarContext";

import { initialData } from "./api/app";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch()

  const [activeConversation, setActiveConversation] = useState(null)
  const [sidebarVisibility, setSidebarVisibility] = useState(false)
  const [isBigScreen, setIsBigScreen] = useState(false)

  useEffect(() => {

    async function initial() {
      let res = await initialData()
      dispatch(setConversations(res.conversations))
    }

    initial()

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
    <AppContext.Provider value={{
      activeConversation, setActiveConversation
    }}>
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
    </AppContext.Provider>
  );
}

export default App;
