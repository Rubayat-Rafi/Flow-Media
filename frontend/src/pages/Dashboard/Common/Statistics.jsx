import { Helmet } from "react-helmet";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";
import { Navigate } from "react-router";

const Statistics = () => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;
  //   if (role === "customer") return <Navigate to="/dashboard/my-orders" />;
  //   if (role === "seller") return <Navigate to="/dashboard/my-inventory" />;

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {role === "user" && <AdminStatistics />}
    </div>
  );
};

export default Statistics;
