import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "../components/pages/LandingPage";
import About from "../components/pages/About";
import Contact from "../components/pages/Contact";
import SingUp from "@/components/authPart/SingUp";
import LogIn from "@/components/authPart/LogIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>404</h1>,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/log-in",
        element: <LogIn />,
      },
      {
        path: "/sign-up",
        element: <SingUp />,
      },
    ],
  },
]);

export default router;
