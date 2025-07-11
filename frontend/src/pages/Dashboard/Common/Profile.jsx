import { Helmet } from "react-helmet";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
// import { toast } from "react-hot-toast";
import useUserData from "../../../hooks/useUserData";
import useUserAffiliate from "../../../hooks/useAffiliates";
const Profile = () => {
  const [userData, isLoading] = useUserData();
  const [affiliate] = useUserAffiliate();
  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <div className="flex items-start flex-col md:flex-row h-screen gap-6 pt-12">
        {/* User Info Section */}
        <div className="w-full md:w-2/8 border p-6 rounded-lg bg-[var(--secondary)]">
          <img
            src="/user.png"
            alt="user icon"
            className="max-w-[100px] w-full mb-6"
          />
          <h2 className="text-2xl font-bold uppercase">{userData?.name}</h2>
          <div className="mt-4 space-y-3">
            <p className="text-sm flex items-center justify-between">
              <span className="font-medium uppercase">Email: </span>
              <span>{userData?.email}</span>
            </p>
            <p className="text-sm flex items-center justify-between">
              <span className="font-medium uppercase">Role: </span>
              <span>{userData?.role}</span>
            </p>
            <p className="text-sm flex items-center justify-between">
              <span className="font-medium uppercase">Subscription: </span>
              <span>{userData?.subscribe || "not subscribe"}</span>
            </p>
            {affiliate && (
              <p className="text-sm flex items-center justify-between">
                <span className="font-medium uppercase">Affiliate: </span>

                <span>
                  {userData?.affiliateInfo?.status === true &&
                    `Pid:${userData?.affiliateInfo?.pid}`}
                  {userData?.affiliateInfo?.status === false && `Pending`}
                  {userData?.affiliateInfo?.status === "rejected" && `Rejected`}
                </span>
              </p>
            )}

            {userData?.subscription?.details && (
              <p className="text-sm flex items-center justify-between">
                <span className="font-medium uppercase">Phone: </span>
                <span>{userData?.subscription?.details?.phone}</span>
              </p>
            )}
          </div>
        </div>

        {/*Plan */}

        {userData.subscribe === false ? (
          <div className="w-full md:w-6/8 border p-6 flex flex-col items-center rounded-lg justify-center bg-[var(--secondary)]">
            <div className="text-center">
              <h6 className="text-xl font-semibold mb-3">
                No Subscription Found
              </h6>
              <p className="text-gray-300">
                You do not have any active subscriptions.
              </p>
            </div>
            <button className="mt-6">
              <a href="/" className="primary-btn ">
                Get Subscription
              </a>
            </button>
          </div>
        ) : (
          <div className="w-full md:w-3/4 border p-6 rounded-lg flex flex-row items-start md:items-center justify-between bg-[var(--secondary)] shadow-md">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold uppercase text-white">
                {userData?.subscription?.pack || "No Plan"}
              </h2>

              <p className="bg-[var(--background)] inline-flex px-4 py-1 text-xs rounded-full text-red-400">
                Ex:{" "}
                {userData?.subscription?.endDate
                  ? new Date(userData.subscription.endDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "No End Date"}
              </p>
              <p className="">{userData?.email}</p>
            </div>

            <div className="mt-6 md:mt-0 text-right">
              {userData?.subscription?.status === "active" ? (
                <div className="space-y-4">
                  <p className="font-semibold text-green-600  ">Active</p>

                  {userData?.subscription?.pack === "yearly" && (
                    <p className="text-blue-400 font-semibold"> + Add Device</p>
                  )}
                </div>
              ) : (
                <p className=" font-semibold px-4 py-2 rounded-lg">Expired</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
