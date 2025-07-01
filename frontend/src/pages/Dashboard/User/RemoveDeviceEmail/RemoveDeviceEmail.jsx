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
      setDeviceEmail(""); // Clear the device email input
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
    <div className="max-w-md mx-auto p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-semibold mb-4">Remove Device Email</h2>
      <form onSubmit={handleRemove} className="space-y-3">
        <input
          type="email"
          placeholder="User Email"
          value={userEmail}
          disabled
          className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-500"
        />
        <input
          type="email"
          placeholder="Device Email"
          value={deviceEmail}
          onChange={(e) => setDeviceEmail(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2"
        >
          {loading && <FaSpinner className="animate-spin" />}
          {loading ? "Removing..." : "Remove Device Email"}
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default RemoveDeviceEmail;
