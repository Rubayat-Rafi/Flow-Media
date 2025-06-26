import HlsPlayer from "../HlsPlayer/HlsPlayer";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
const MainContent = () => {
  const { user } = useAuth();
  const { url } = useSelector((state) => state?.Slice);
  return (
    <section
      className={`${
        user ? "max-md:h-fit " : "h-full"
      } w-full  md:bg-[var(--secondary)] rounded-md shadow-lg p-4`}
    >
      {!user ? (
        <div className="  flex items-center justify-center h-full w-full">
          <div className=" bg-black rounded-xl p-5  shadow-2xl shadow-white">
            <a href="/signup">
              <button className=" text-2xl max-md:text-xl bg-orange-500 py-3 px-5 rounded-xl cursor-pointer uppercase">
                signup to keep watching
              </button>
            </a>
            <div className=" text-xl max-md:text-base flex items-center gap-2 bg-slate-600 py-2 px-5 rounded-xl mt-3">
              <h1>Have an account already?</h1>
              <a href="/login">
                <button className=" text-orange-500 font-semibold">
                  Log in
                </button>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <HlsPlayer src={user ? url : ""} />
      )}
    </section>
  );
};

export default MainContent;
