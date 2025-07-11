import { FaUserAlt, FaDollarSign } from "react-icons/fa";
import { BsFillCartPlusFill } from "react-icons/bs";
import { MdConnectedTv } from "react-icons/md";
import { IoCard } from "react-icons/io5";
import useUsers from "../../../hooks/useUsers";
import useCategory from "../../../hooks/useCategory";

const AdminStatistics = () => {
  const [users] = useUsers();
  const [categories] = useCategory();

// total subscription 
const subscribeUsers = users.filter(user => user?.role === 'user' && user?.subscribe === 'active');

// total weekly subscription 
const annualPlanUsers = users.filter(user => user?.role === "user" && user?.subscription?.pack === "Annual Pass");
const MonthlyPlanUsers = users.filter(user => user?.role === 'user' && user?.subscription?.pack === 'Monthly Pass');
const weeklyPlanUsers  = users.filter(user => user?.role  === 'user' && user?.subscription?.pack === 'Weekly Pass');
const customPlanUser = users.filter(user => user?.role === 'user' && user?.subscription?.pack ==='Caustom');


  return (
    <div>
      <div className="mt-12">
        {/* small cards */}
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-grow">
          {/* Sales Card */}
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
                $120
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


          {/* Weekly Subscribtion */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-rose-600 to-rose-400 text-white shadow-rose-500/40`}
            >
              <IoCard className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Weekly Subscribtion
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {weeklyPlanUsers.length}
              </h4>
            </div>
          </div>

          {/* Monthly Subscribtion */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-fuchsia-600 to-fuchsia-400 text-white shadow-fuchsia-500/40`}
            >
              <IoCard className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Monthly Subscribtion
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {MonthlyPlanUsers.length}
              </h4>
            </div>
          </div>

          {/* Monthly Subscribtion */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-yellow-600 to-yellow-400 text-white shadow-yellow-500/40`}
            >
              <IoCard className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Yearly Subscribtion
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {annualPlanUsers.length}
              </h4>
            </div>
          </div>


          {/* Custom Subscribtion */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-purple-500 to-purple-400 text-white shadow-purple-500/40`}
            >
              <IoCard className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Custom Subscribtion
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {customPlanUser.length}
              </h4>
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
