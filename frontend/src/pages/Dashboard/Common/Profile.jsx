import { Helmet } from "react-helmet";
import { FaRegUser } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { toast } from "react-hot-toast";
import {
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import axios from "axios";
import { auth } from "../../../firebase/firebaseConfig";

const Profile = () => {
  const { user } = useAuth();
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;

  const deleteHandler = async (t) => {
    try {
      toast.dismiss(t.id);
      const password = prompt("Please enter your password to confirm:");
      if (!password) {
        toast.error("Password is required.");
        return;
      }
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await deleteUser(auth.currentUser);
      await axios.delete(
        `${import.meta.env.VITE_FLOW_MRDIA_API}/api/user/${user.email}`
      );
      toast.success("Account deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete account.");
    }
  };

  const handleDeleteAccount = () => {
    toast.custom((t) => (
      <div className="bg-white p-2 rounded shadow-lg flex flex-col md:flex-row items-center gap-3">
        <span className="text-[var(--background)]">
          Wanna Delete Your Account?
        </span>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => deleteHandler(t)}
          >
            Yes
          </button>
          <button
            className="bg-green-500 px-2 py-1 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="rounded-2xl max-w-xs bg-[var(--secondary)] w-full p-6 flex items-center justify-center flex-col">
        <div className="flex items-end justify-end w-full">
          <button
            onClick={handleDeleteAccount}
            className="text-xs bg-red-500 hover:bg-red-700 py-1 px-3 rounded-2xl"
          >
            Delete
          </button>
        </div>
        <div className="bg-[var(--primary)] p-6 rounded-full">
          <FaRegUser className="text-4xl" />
        </div>

        <div className="text-center space-y-4 mt-5">
          <p className="bg-[var(--background)] py-1.5 px-3 rounded-full">
            {role}
          </p>
          <h4 className="uppercase text-2xl font-semibold">
            {user.displayName}
          </h4>
          <p className="text-gray-300">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
