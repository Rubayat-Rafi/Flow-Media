import { GrLogout } from "react-icons/gr";
import { IoIosSettings } from "react-icons/io";
import { AiOutlineBars } from "react-icons/ai";

import { useAuth } from "../../hooks/useAuth";
import MenuItem from "./Menu/MenuItem";
import { useState } from "react";
import logo from "../../../public/logo.png";
import { Link } from "react-router";
import useRole from "../../hooks/useRole";
import AdminMenu from "./Menu/AdminMenu";

const Sidebar = () => {
  const { signOutUser } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role] = useRole();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="flex justify-between md:hidden bg-[var(--secondary)]">
        <div>
          <div className="block cursor-pointer p-4 font-bold outline-none">
            <Link to="/">
              <img
                // className='hidden md:block'
                src={logo}
                alt="logo"
                width="100"
                height="100"
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-[var(--background)]"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[var(--secondary)]  w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full px-4 py-2 shadow-lg rounded-md flex justify-center items-center bg-[var(--background)]   mx-auto">
              <Link to="/" className="">
                <img
                  // className='hidden md:block'
                  src={logo}
                  alt="logo"
                  width="100"
                  height="100"
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {/*  Menu Items */}
              {role === "admin" && <AdminMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <MenuItem
            icon={IoIosSettings}
            label="Profile"
            address="/dashboard/profile"
          />
          <button
            onClick={signOutUser}
            className="flex w-full items-center px-4 py-2 mt-5 hover:bg-[var(--primary)] hover:text-[var(--background)] transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
