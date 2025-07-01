import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../hooks/useAuth";
import { useEffect } from "react";
const AddDeviceEmail = ({ packageType }) => {
  const [deviceEmail, setDeviceEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [userEmail, setUserEmail] = useState(null);
  const [subscribe, setSubscribe] = useState(false);
  const [pack, setPack] = useState("");

  useEffect(() => {
    if (!user?.email) return;
    const fetchSubscription = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_FLOW_MRDIA_API}/api/user/role/${user.email}`
        );
        setSubscribe(response?.data?.user?.subscribe);
        setPack(response?.data?.user?.subscription?.pack);
        setUserEmail(response?.data?.user?.email);
      } catch (error) {
        console.error("Subscription check failed:", error?.message);
      }
    };
    fetchSubscription();
  }, [user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_FLOW_MRDIA_API}/api/payment/add_devices`, {
        pack: packageType,
        userEmail,
        deviceEmail,
      });
   console.log(response)

      alert("Device added successfully");
      setDeviceEmail("");
    } catch (err) {
      setError(err?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-center mb-6">
        Add Device Email for {pack} Plan
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-gray-700">Package</label>
          <input
            type="text"
            value={pack}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-gray-700">Device Email</label>
          <input
            type="email"
            value={deviceEmail}
            onChange={(e) => setDeviceEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-gray-700">User Email</label>
          <input
            type="text"
            value={userEmail}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md"
            disabled={!subscribe}
          >
            {loading ? "Adding Device..." : "Add Device"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDeviceEmail;
