import { Helmet } from "react-helmet";
import { FaRegUser } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const Profile = () => {
  const { user } = useAuth();
  const [role, isLoading] = useRole();
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="rounded-2xl max-w-xs bg-[var(--secondary)] w-full p-6 flex items-center justify-center flex-col">
        <div className="bg-[var(--primary)] p-6 rounded-full">
          <FaRegUser className="text-4xl" />
        </div>

        <div className=" text-center space-y-3 mt-5">
          <p className="">{role}</p>
          <h4 className="uppercase">{user.displayName}</h4>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
