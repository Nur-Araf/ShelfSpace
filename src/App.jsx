import { Outlet } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/common/Navbar";

//basic structure max-w-7xl mx-auto px-2 sm:px-6 lg:px-8
function App() {
  return (
    <div className="bg-black text-white font-sora">
      <Navbar />
      <Outlet />

      <ToastContainer />
    </div>
  );
}

export default App;
