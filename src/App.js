import { useEffect, useState } from "react";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

import SidebarContext from "./Context/SidebarContext";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { setConversations } from "./redux/slices/conversationsSlice";
import { initialData } from "./api/app";

function App() {
  const dispatch = useDispatch()

  const [sidebarVisibility, setSidebarVisibility] = useState(false)
  const [isBigScreen, setIsBigScreen] = useState(false)

  useEffect(() => {

    async function initial() {
      console.log("here");
      let res = await initialData()
      console.log(res);
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
