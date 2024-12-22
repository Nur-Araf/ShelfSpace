import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "../components/pages/LandingPage";
import SingUp from "@/components/authPart/SingUp";
import LogIn from "@/components/authPart/LogIn";
import NotFoundPage from "@/components/common/NotFoundPage ";
import AllBooks from "@/components/pages/AllBooks";
import AddBook from "@/components/pages/AddBook";
import BorrowedBooks from "@/components/pages/BorrowedBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/add-book",
        element: <AddBook />,
      },
      {
        path: "/borrowed-books",
        element: <BorrowedBooks />,
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
