import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
const PrivetRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const [role, roleLoading] = useRole();
  const loading = authLoading || roleLoading;
  if (loading) {
    return <LoadingSpinner/>
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (location.pathname === "/dashboard" && role === "user") {
    return <Navigate to="/dashboard/subscription" replace />;
  }
  return children;
};
export default PrivetRoute;

