import { useEffect, useState } from "react";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { setConversations } from "./redux/slices/conversationsSlice";
import { AppContext } from "./Context/AppContext";
import SidebarContext from "./Context/SidebarContext";
import { initialData } from "./api/app";
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from "@tanstack/react-query";
import { setSettings } from "./redux/slices/settingsSlice";

function App() {

  const [activeConversation, setActiveConversation] = useState(null)
  const [sidebarVisibility, setSidebarVisibility] = useState(false)
  const [isBigScreen, setIsBigScreen] = useState(false)

  const dispatch = useDispatch()

  const onSuccess = (initData) => {
    dispatch(setConversations(initData.conversations))
    dispatch(setSettings(initData.settings))

  }

  const { isLoading } = useQuery(
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

  useEffect(() => {

    handleWindowResize()
    window.addEventListener("resize", handleWindowResize)

    return () => window.removeEventListener("resize", handleWindowResize);
  }, [])

  const handleWindowResize = () => {
    if (window.innerWidth > 1024) {
      setSidebarVisibility(true);
      setIsBigScreen(true)
    } else {
      setIsBigScreen(false)
    }
  }

  const { dark_theme } = useSelector(state => state.settings)

  useEffect(() => {

    if (dark_theme == 1) {
      localStorage.setItem("theme", "dark")
    } else {
      localStorage.setItem("theme", "light")
    }

    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

  }, [dark_theme])
  useEffect(() => {

    if (activeConversation) {
      if (window.innerWidth < 1024) {
        setSidebarVisibility(false)
      }
    }

  }, [activeConversation])



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
