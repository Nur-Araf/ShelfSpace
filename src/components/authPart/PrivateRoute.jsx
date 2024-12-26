import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return <span className="loading loading-spinner text-primary"></span>;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/log-in"></Navigate>;
};

export default PrivateRoute;
