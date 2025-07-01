import React, { useState } from "react";
import axios from "axios";
import useDBUser from "../../../../hooks/dbUser";

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
      const response = await axios.post(
        `${import.meta.env.VITE_FLOW_MRDIA_API}/api/payment/add_devices`,
        {
          pack,
          userEmail,
          deviceEmail,
        }
      );

      console.log(response);
      alert("Device added successfully");
      setDeviceEmail("");
    } catch (err) {
      setError(err?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (roleLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600">Loading user info...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        Add Device Email for {pack} Plan
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-gray-700">Package</label>
          <input
            type="text"
            value={pack || ""}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
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
            value={userEmail || ""}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            disabled={loading || !pack}
          >
            {loading ? "Adding Device..." : "Add Device"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDeviceEmail;
