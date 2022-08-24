import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="grid grid-cols-9 h-screen overflow-hidden">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default App;
