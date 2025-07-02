"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import useDBUser from "../../../../hooks/dbUser";
const RemoveDeviceEmail = () => {
  const [dbUser, roleLoading] = useDBUser();
  const [userEmail, setUserEmail] = useState("");
  const [deviceEmail, setDeviceEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (dbUser?.email) {
      setUserEmail(dbUser.email);
    }
  }, [dbUser]);

  const handleRemove = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_FLOW_MRDIA_API}/api/payment/remove_devices`,
        {
          userEmail,
          deviceEmail,
        }
      );

      setMessage(res.data.message || "Device email removed successfully!");
      setDeviceEmail("");
    } catch (err) {
      console.error("Axios Error:", err);
      setMessage(
        err.response?.data?.message || "Failed to remove device email."
      );
    } finally {
      setLoading(false);
    }
  };

  if (roleLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <FaSpinner className="animate-spin text-gray-600 text-2xl" />
        <span className="ml-2 text-gray-700">Loading user info...</span>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="bg-[var(--secondary)] p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-center mb-6 uppercase">Remove Your Device</h2>
        <form onSubmit={handleRemove} className="space-y-4">
          <input
            type="email"
            placeholder="User Email"
            value={userEmail}
            disabled
            className="py-2 px-4 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white font-semibold  text-[var(--background)]"
          />
          <input
            type="email"
            placeholder="Enter device email"
            value={deviceEmail}
            onChange={(e) => setDeviceEmail(e.target.value)}
            required
            className="py-2 px-4 rounded-md w-full border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--background)]"
          />
          <button
            type="submit"
            disabled={loading}
            className="primary-btn w-full"
          >
            {loading && <FaSpinner className="animate-spin" />}
            {loading ? "Removing..." : "Remove Device Email"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm">{message}</p>
        )}
      </div>
    </div>
  );
};

export default RemoveDeviceEmail;
