import { Helmet } from "react-helmet";

import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";

const Statistics = () => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;

  if (role === "user") return <Navigate to="/dashboard/profile" />;

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {role === "admin" && <AdminStatistics />}
    </div>
  );
};

export default Statistics;
