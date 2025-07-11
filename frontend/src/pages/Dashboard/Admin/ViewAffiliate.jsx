import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useUserData from "../../../hooks/useUserData";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { useSearchParams } from "react-router";
import { useState } from "react";

const ViewAffiliate = () => {
  const { id } = useParams();
  const [userData] = useUserData();
  const secureAxios = useSecureAxios();
  const [searchParams] = useSearchParams();
  const adminId = searchParams.get("adminId");
  const [actionLoading, setActionLoading] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [pid, setPid] = useState("");

  const {
    data: affiliate = null,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["affiliate", id, userData?.email],
    queryFn: async () => {
      const { data } = await secureAxios.get(
        `/api/affiliate/my_affiliate/${id}`
      );
      return data?.data;
    },
    enabled: !!userData?.email && !!id,
    refetchOnWindowFocus: false,
  });

  const handleApproveSubmit = async () => {
    if (!pid) return;
    setActionLoading(true);
    try {
      await secureAxios.patch(`/api/affiliate/action/${id}`, {
        action: "approve",
        pid,
        adminId,
      });
      await refetch();
      setShowApproveModal(false);
      setPid("");
    } catch (err) {
      console.error("Approve failed:", err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleOtherActions = async (type) => {
    setActionLoading(true);
    try {
      await secureAxios.patch(`/api/affiliate/action/${id}`, {
        action: type,
        adminId,
      });
      await refetch();
    } catch (err) {
      console.error("Action failed:", err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (isLoading) return <div className="p-4">Loading affiliate info...</div>;
  if (isError)
    return <div className="p-4 text-red-600">Error: {error.message}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow border relative">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Affiliate Application
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
        <Info label="Affiliate ID" value={affiliate?._id} />
        <Info label="User ID" value={affiliate?.userId} />
        <Info label="Email" value={affiliate?.email} />
        <Info label="Phone" value={affiliate?.phone} />
        <Info
          label="Address"
          value={`${affiliate?.city}, ${affiliate?.state}, ${affiliate?.zip}, ${affiliate?.country}`}
        />
        <Info label="Payment Method" value={affiliate?.paymentMethod} />
        <Info label="Website" value={affiliate?.website} />
        <Info label="Skype" value={affiliate?.skype} />
        <Info label="Telegram" value={affiliate?.telegram} />
        <Info label="Referral Source" value={affiliate?.referralSource} />
        <Info label="Promotion Method" value={affiliate?.promotionMethod} />
        <Info
          label="Status"
          value={
            <span
              className={
                affiliate?.status ? "text-green-600" : "text-yellow-600"
              }
            >
              {affiliate?.status === true && "Approved"}
              {affiliate?.status === false && "Pending"}
              {affiliate?.status === "rejected" && "Rejected"}
            </span>
          }
        />
        <Info
          label="Apply Date"
          value={new Date(affiliate?.applyDate).toLocaleString()}
        />
        {affiliate?.pid && <Info label="PID" value={affiliate?.pid} />}
      </div>

      <div className="flex gap-4 mt-8 justify-center">
        <button
          disabled={actionLoading || affiliate?.status}
          onClick={() => setShowApproveModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          Approve
        </button>

        <button
          disabled={actionLoading}
          onClick={() => handleOtherActions("reject")}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          Reject
        </button>

        <button
          disabled={actionLoading}
          onClick={() => handleOtherActions("delete")}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          Delete
        </button>
      </div>

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Approve Affiliate</h3>
            <label className="block mb-2 font-medium text-gray-700">
              PID Number
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
              value={pid}
              onChange={(e) => setPid(e.target.value)}
              placeholder="Enter PID"
            />
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowApproveModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleApproveSubmit}
                disabled={!pid || actionLoading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                Confirm Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-medium">{value || "—"}</p>
  </div>
);

export default ViewAffiliate;
