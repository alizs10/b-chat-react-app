import { useEffect, useState } from "react";

import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

import { useDispatch } from "react-redux";
import { setConversations } from "./redux/slices/conversationsSlice";

import { AppContext } from "./Context/AppContext";
import SidebarContext from "./Context/SidebarContext";

import { initialData } from "./api/app";

import 'react-toastify/dist/ReactToastify.css';

import { useQueries, useQuery } from "@tanstack/react-query";
import { getUserSettings } from "./api/users";
import { setSettings } from "./redux/slices/settingsSlice";

function App() {

  const onSuccess = (initData) => {
    dispatch(setConversations(initData.conversations))
    dispatch(setSettings(initData.settings))
    
    if(initData.settings.dark_theme == 1)
    {
      localStorage.setItem("theme", "dark")
    } else {
      localStorage.setItem("theme", "light")
    }
  }

  useQuery(
    ['conversations'],
    initialData,
    {
      refetchOnWindowFocus: false,
      onSuccess,
      select: data => {
        return data.data
      }
    }
  )

  const dispatch = useDispatch()

  const [activeConversation, setActiveConversation] = useState(null)
  const [sidebarVisibility, setSidebarVisibility] = useState(false)
  const [isBigScreen, setIsBigScreen] = useState(false)

  useEffect(() => {

    if (activeConversation) {
      if (window.innerWidth < 1024) {
        setSidebarVisibility(false)
      }
    }

  }, [activeConversation])

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


      </SidebarContext.Provider>
    </AppContext.Provider>


  );
}

export default App;
