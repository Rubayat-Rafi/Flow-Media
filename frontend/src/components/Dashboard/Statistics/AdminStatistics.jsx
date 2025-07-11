import { FaUserAlt, FaDollarSign } from "react-icons/fa";
import { BsFillCartPlusFill } from "react-icons/bs";
import { MdConnectedTv } from "react-icons/md";
import { IoCard } from "react-icons/io5";
import useUsers from "../../../hooks/useUsers";
import useCategory from "../../../hooks/useCategory";
import usePricing from "../../../hooks/usePricing";
import { useMemo } from "react";

const AdminStatistics = () => {
  const [users] = useUsers();
  const [categories] = useCategory();

  // total subscription
  const subscribeUsers = users.filter(
    (user) => user?.role === "user" && user?.subscribe === "active"
  );

  const [pricing] = usePricing();

  // Get all unique subscription plans from pricing data
  const subscriptionPlans = useMemo(() => {
    return (
      pricing?.map((plan) => ({
        name: plan.passName,
        id: plan._id,
        colorFrom: getColorGradient(plan.passName).from,
        colorTo: getColorGradient(plan.passName).to,
        shadowColor: getColorGradient(plan.passName).shadow,
      })) || []
    );
  }, [pricing]);

  // Count users for each subscription plan
  const userCounts = useMemo(() => {
    const counts = {};
    subscriptionPlans.forEach((plan) => {
      counts[plan.name] = users.filter(
        (user) =>
          user?.role === "user" && user?.subscription?.pack === plan.name
      ).length;
    });
    return counts;
  }, [users, subscriptionPlans]);

  // Helper function to assign colors based on plan name
  function getColorGradient(planName) {
    switch (planName) {
      case "Monthly Pass":
        return {
          from: "from-fuchsia-600",
          to: "to-fuchsia-400",
          shadow: "shadow-fuchsia-500/40",
        };
      case "Annual Pass":
        return {
          from: "from-yellow-600",
          to: "to-yellow-400",
          shadow: "shadow-yellow-500/40",
        };
      case "Weekly Pass":
        return {
          from: "from-blue-600",
          to: "to-blue-400",
          shadow: "shadow-blue-500/40",
        };
      case "Custom":
        return {
          from: "from-purple-600",
          to: "to-purple-400",
          shadow: "shadow-purple-500/40",
        };
      default:
        return {
          from: "from-gray-600",
          to: "to-gray-400",
          shadow: "shadow-gray-500/40",
        };
    }
  }

  // Calculate total revenue
  const totalRevenue = useMemo(() => {
    return users.reduce((total, user) => {
      if (user.revenue && Array.isArray(user.revenue)) {
        const userRevenue = user.revenue.reduce((sum, transaction) => {
          return sum + (transaction.amount || 0);
        }, 0);
        return total + userRevenue;
      }
      return total;
    }, 0);
  }, [users]);

  // Calculate revenue by plan type
  const revenueByPlan = useMemo(() => {
    const planRevenue = {};

    users.forEach((user) => {
      if (user.revenue && Array.isArray(user.revenue)) {
        user.revenue.forEach((transaction) => {
          const plan = transaction.plan || "Unknown";
          planRevenue[plan] =
            (planRevenue[plan] || 0) + (transaction.amount || 0);
        });
      }
    });

    return planRevenue;
  }, [users]);

  return (
    <div>
      <div className="mt-12">
        {/* small cards */}
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-grow">
          {/* total sub Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
            >
              <FaDollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Revenue
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                ${totalRevenue.toFixed(2)}
              </h4>
            </div>
          </div>

          {/* Total Orders */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
            >
              <BsFillCartPlusFill className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Subscribtion
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {subscribeUsers?.length}
              </h4>
            </div>
          </div>
          {/* Total Plants */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
            >
              <MdConnectedTv className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Channel and Events
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {categories.length}
              </h4>
            </div>
          </div>
          {/* Users Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
            >
              <FaUserAlt className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total User
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {users.length}
              </h4>
            </div>
          </div>

          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md"
            >
              <div
                className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center ${plan.colorFrom} ${plan.colorTo} text-white ${plan.shadowColor}`}
              >
                <IoCard className="w-6 h-6 text-white" />
              </div>
              <div className="p-4 text-right pt-6">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Total {plan.name}
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {userCounts[plan.name] || 0}
                </h4>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue by Plan */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-black">
              Revenue by Subscription Plan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(revenueByPlan).map(([plan, amount]) => (
                <div
                  key={plan}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <p className="text-sm text-gray-800">{plan}</p>
                  <p className="text-xl font-bold mt-1 text-gray-600">${amount.toFixed(2)}</p>
                  <p className="text-xs text-gray-800 mt-1">
                    {totalRevenue > 0
                      ? `${((amount / totalRevenue) * 100).toFixed(
                          1
                        )}% of total`
                      : "No revenue"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Transactions (optional) */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-black">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.flatMap((user) =>
                    (user.revenue || []).map((txn, index) => (
                      <tr key={`${user._id}-${index}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {txn.plan}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${txn.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(txn.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {/*Sales Bar Chart */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
            {/* Chart goes here.. */}
          </div>
          {/* Calender */}
          <div className=" relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
            {/* <Calendar color="#4cc718" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
