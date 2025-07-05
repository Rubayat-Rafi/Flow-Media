import { useEffect, useRef, useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Container from "./Shared/Container";
import { Link, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import LoadingSpinner from "./Shared/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { addTime, addTimeZone } from "../utils/redux/slices/slice";
import { UpdateTime } from "./TimeZone/TimeZone";
const Navbar = () => {
  const dispatch = useDispatch();
  const { timeZone, time } = useSelector((state) => state?.Slice);
  const location = useLocation();
  const [clickProfile, setClickProfile] = useState(false);
  const profileBtnRef = useRef(null);
  const menuRef = useRef(null);
  const { user, loading, signOutUser } = useAuth();

  useEffect(() => {
    const update = () => dispatch(addTime(UpdateTime(timeZone)));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  // Close profile menu on outside click
  useEffect(() => {
    if (!clickProfile) return;
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        profileBtnRef.current &&
        !profileBtnRef.current.contains(event.target)
      ) {
        setClickProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [clickProfile]);

  const handleClickProfile = () => setClickProfile((prev) => !prev);

  if (
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/dashboard")
  )
    return null;

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <nav className="flex items-center justify-between py-6 relative">
        <div className="flex items-center gap-5">
          <Link href='/' className="outline-none">
            <img src="/logo.png" className="max-h-[48px]" alt="logo" />
          </Link>
          <div className="hidden  lg:flex items-center gap-2 py-2 px-4 rounded-md bg-[var(--secondary)]">
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

            <select
              value={timeZone}
              onChange={(e) => dispatch(addTimeZone(e.target.value))}
              className="bg-[var(--secondary)] text-sm focus:outline-none p-1 focus:ring-2 focus:ring-[var(--accent)] focus:rounded-md overflow-y-scroll no-scroll"
            >
              <option value="GMT-11">GMT -11</option>
              <option value="GMT-10">GMT -10</option>
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

            {/* Timezone-adjusted Time */}
            <div className="text-gray-300 font-bold bg-[var(--background)] py-1 px-4 rounded-lg">
              {time}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <a href="/" className="hidden lg:block hover:underline">
            Why Flow Media?
          </a>
          <a href="/" className="hidden lg:flex items-center gap-1 hover:underline">
            <IoInformationCircleOutline className="text-2xl" />
            FAQ?
          </a>
          {user ? (
            <button ref={profileBtnRef} onClick={handleClickProfile}>
              <CgProfile className="text-3xl cursor-pointer hover:text-[var(--primary)] transition-colors duration-300 ease-in" />
            </button>
          ) : (
            <a href="/login" className="primary-btn">
              My Account
            </a>
          )}
        </div>

        {/* Profile Menu Dropdown */}
        {clickProfile && user && (
          <div
            ref={menuRef}
            className="absolute w-64 right-0 top-20 z-50 transition-transform duration-300 ease-in-out"
          >
            <ProfileMenu user={user} signOutUser={signOutUser} />
          </div>
        )}
      </nav>
    </Container>
  );
};

export default Navbar;
