import useUserData from "../../../hooks/useUserData";
import { useEffect, useState } from "react";
import { Link } from "react-router"; // or use Next.js <Link> if you're using Next.js

const ManageAffiliate = () => {
  const [userData] = useUserData();
  const affiliates = userData?.affiliates || [];
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Affiliate Management</h2>

      {affiliates?.length === 0 ? (
        <p>No affiliate applications found.</p>
      ) : (
        <div className="space-y-4">
          {affiliates.map((affiliate, index) => (
            <div
              key={affiliate.affiliateId}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow"
            >
              <div>
                <p className="font-medium">Affiliate #{index + 1}</p>
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  <span
                    className={
                      affiliate.status ? "text-green-600" : "text-red-600"
                    }
                  >
                    {affiliate.status === true && "Approved"}
                    {affiliate.status === false && "Pending"}
                    {affiliate.status === "rejected" && "Rejected"}
                  </span>
                </p>
              </div>

              <Link
                to={`/dashboard/affiliate/${affiliate?.userId}?adminId=${userData?._id}`} // Adjust if using Next.js
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageAffiliate;
