import HlsPlayer from "../HlsPlayer/HlsPlayer";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
const MainContent = () => {
  const { user } = useAuth();
  const { url } = useSelector((state) => state?.Slice);
  const [subscription, setSubscription] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user == null) {
      return;
    } else {
      const { subscribe } = JSON.parse(user);
      setSubscription(subscribe);
    }
  }, [subscription]);

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
      ) : !subscription ? (
        <div className="  flex items-center justify-center h-full w-full">
          <div className=" bg-black rounded-xl p-5  shadow-2xl shadow-white">
            <h1 className=" text-4xl font-semibold mb-1">Select a plan</h1>
            <p>
              Watch Unlimited BOXING, MMA (PPV INCLUDED), NFL, NCAAF, NCAAB,
              Rodeo, MLB, NHL, NBA No Blackouts. Instant activation!
            </p>

            <div className=" space-y-5 mt-5">
              <div className=" hover:bg-orange-600 px-5 py-2 border rounded-md flex items-center justify-between">
                <div className="">
                  <div className=" flex items-center gap-5">
                    <h1 className=" text-4xl font-semibold">Annual Pass</h1>
                    <h1>365 days</h1>
                  </div>
                  <h1 className=" mt-3">2 Devices</h1>
                </div>
                <div className="">
                  <h1 className=" uppercase relative -top-6 bg-orange-500 px-2 rounded-md">
                    best value
                  </h1>
                  <div className="">
                    <h1>$240</h1>
                    <h1>
                      $99<sap>.99</sap>
                    </h1>
                  </div>
                </div>
              </div>

              <div className=" hover:bg-orange-600 px-5 py-2 border rounded-md flex items-center justify-between">
                <div className="">
                  <div className=" flex items-center gap-5">
                    <h1 className=" text-4xl font-semibold">Annual Pass</h1>
                    <h1>365 days</h1>
                  </div>
                  <h1 className=" mt-3">2 Devices</h1>
                </div>
                <div className="">
                  <h1 className=" uppercase relative -top-6 bg-orange-500 px-2 rounded-md">
                    best value
                  </h1>
                  <div className="">
                    <h1>$240</h1>
                    <h1>
                      $99<sap>.99</sap>
                    </h1>
                  </div>
                </div>
              </div>

              <div className=" hover:bg-orange-600 px-5 py-2 border rounded-md flex items-center justify-between">
                <div className="">
                  <div className=" flex items-center gap-5">
                    <h1 className=" text-4xl font-semibold">Annual Pass</h1>
                    <h1>365 days</h1>
                  </div>
                  <h1 className=" mt-3">2 Devices</h1>
                </div>
                <div className="">
                  <h1 className=" uppercase relative -top-6 bg-orange-500 px-2 rounded-md">
                    best value
                  </h1>
                  <div className="">
                    <h1>$240</h1>
                    <h1>
                      $99<sap>.99</sap>
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <p className=" mt-5">
              Our subscriptions do not auto-renew. You wll need to renew
              manually if you wish to continue.
            </p>
          </div>
        </div>
      ) : (
        <HlsPlayer src={user ? url : ""} />
      )}
    </section>
  );
};

export default MainContent;
