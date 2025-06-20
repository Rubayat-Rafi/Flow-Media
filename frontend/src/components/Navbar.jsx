import { useEffect, useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import Container from "./Shared/Container";

const Navbar = () => {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    // Update time immediately and set interval
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateTime = () => {
    // Format local time as 12-hour with AM/PM
    const time = new Date();
    setLocalTime(
      time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
  };

  return (
    <Container>
      <nav className="flex items-center justify-between py-4">
        <div className="flex items-center gap-5">
          {/* logo */}
          <div className="text-4xl font-black text-[var(--primary)] uppercase">
            Flow <span className="text-[var(--text)]">Media</span>
          </div>
          <div className="flex items-center gap-2 py-2 px-4 rounded-md bg-[var(--secondary)]">
            {/* Clock Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            {/* Timezone Dropdown */}
            <select className="text-sm focus:outline-none p-1 focus:ring-2 focus:ring-[var(--accent)] focus:rounded-md overflow-y-scroll no-scroll ">
              <option value="GMT-11">GMT -11</option>
              <option value="GMT-10">GGMT -10</option>
              <option value="GMT-9">GMT -9</option>
              <option value="GMT-8">GMT -8</option>
              <option value="GMT-7">GMT -7</option>
              <option value="GMT-6">GMT -6</option>
              <option value="GMT-5">GMT -5</option>
              <option value="GMT-4">GMT -4</option>
              <option value="GMT-3">GMT -3</option>
              <option value="GMT-2">GMT -2</option>
              <option value="GMT+0">GMT +0</option>
              <option value="GMT+1">GMT +1</option>
              <option value="GMT+2">GMT +2</option>
              <option value="GMT+3">GMT +3</option>
              <option value="GMT+4">GMT +4</option>
              <option value="GMT+5">GMT +5</option>
              <option value="GMT+6">GMT +6</option>
              <option value="GMT+7">GMT +7</option>
              <option value="GMT+8">GMT +8</option>
              <option value="GMT+9">GMT +9</option>
              <option value="GMT+10">GMT +10</option>
              <option value="GMT+11">GMT +11</option>
              <option value="GMT+12">GMT +12</option>
            </select>

            {/* Local Time Display */}
            <div className=" text-gray-300 font-bold bg-[var(--background)] py-1 px-4 rounded-lg">
              {localTime}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <a href={"/"} className="hover:underline">
            Why Flow Mdeia?
          </a>
          <a href={"/"} className="flex items-center gap-1 hover:underline">
            <IoInformationCircleOutline className="text-2xl" />
            FAQ?
          </a>
          <button className="primary-btn">My Account</button>
        </div>
      </nav>
    </Container>
  );
};

export default Navbar;
