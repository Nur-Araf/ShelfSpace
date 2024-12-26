import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "../components/pages/LandingPage";
import SingUp from "@/components/authPart/SingUp";
import LogIn from "@/components/authPart/LogIn";
import NotFoundPage from "@/components/common/NotFoundPage ";
import AllBooks from "@/components/pages/AllBooks";
import AddBook from "@/components/pages/AddBook";
import BorrowedBooks from "@/components/pages/BorrowedBooks";
import UpdateBook from "@/components/pages/UpdateBook";
import CategoryPage from "@/components/landingPage/CategoryPage";
import DetailsBookPage from "@/components/landingPage/DetailsBook";
import PrivateRoute from "@/components/authPart/PrivateRoute";

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
        element: (
          <PrivateRoute>
            <AllBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/borrowed-books",
        element: (
          <PrivateRoute>
            <BorrowedBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-book/:id",
        element: (
          <PrivateRoute>
            <UpdateBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/category/:title",
        element: (
          <PrivateRoute>
            <CategoryPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/detail-book/:id",
        element: (
          <PrivateRoute>
            <DetailsBookPage />
          </PrivateRoute>
        ),
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
