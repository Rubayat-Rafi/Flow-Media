import { useState } from "react";
import axios from "axios";
import useDBUser from "../../../../hooks/dbUser";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";

const AddDeviceEmail = () => {
  const [dbUser, roleLoading] = useDBUser();
  const [deviceEmail, setDeviceEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userEmail = dbUser?.email;
  const pack = dbUser?.subscription?.pack;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post(
        `${import.meta.env.VITE_FLOW_MRDIA_API}/api/payment/add_devices`,
        {
          pack,
          userEmail,
          deviceEmail,
        }
      );
      toast("Device added successfully");
      setDeviceEmail("");
    } catch (err) {
      setError(err?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (roleLoading) return <LoadingSpinner />;

  return (
    <div className="h-screen flex flex-col items-center justify-center">

      <div className="bg-[var(--secondary)] p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-center mb-6 uppercase">Add your device</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block">Package</label>
            <input
              type="text"
              value={pack || ""}
              readOnly
              className="py-2 px-4 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] uppercase bg-white  text-[var(--background)] font-semibold"
            />
          </div>

          <div className="space-y-2">
            <label className="block">Primary Email</label>
            <input
              type="text"
              value={userEmail || ""}
              readOnly
              className="py-2 px-4 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white  text-[var(--background)] font-semibold"
            />
          </div>

          <div className="space-y-2">
            <label className="block">Secondary Email</label>
            <input
              type="email"
              value={deviceEmail}
              onChange={(e) => setDeviceEmail(e.target.value)}
              placeholder="Enter device email"
              required
              className="py-2 px-4 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white  text-[var(--background)]"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              className="primary-btn w-full"
              disabled={loading || !pack}
            >
              {loading ? "Adding Device..." : "Add Device"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeviceEmail;
