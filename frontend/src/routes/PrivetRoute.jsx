import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const PrivetRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (user) return children;

  return <Navigate to="/login" state={{ from: location }} replace="true" />;
};

export default PrivetRoute;
