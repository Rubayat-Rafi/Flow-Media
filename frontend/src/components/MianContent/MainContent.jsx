import HlsPlayer from "../HlsPlayer/HlsPlayer";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";

const subscriptions = [
  {
    id: 1,
    name: "Annual Pass",
    days: "365 days",
    device: "2 Devices",
    value: "Best value",
    regularPrice: "$240",
    offerPrice: "$99.99",
    discount: "50% offer",
    url: "/payment/annual",
  },
  {
    id: 2,
    name: "Monthly Pass",
    days: "30 days",
    device: "1 Devices",
    // value: "Best value",
    // regularPrice: "$240",
    offerPrice: "$19.99",
    url: "/payment/monthly",
  },
  {
    id: 2,
    name: "Weekly Pass",
    days: "7 days",
    device: "1 Devices",
    // value: "Best value",
    // regularPrice: "$240",
    offerPrice: "$14.99",
    url: "/payment/weekly",
  },
];

// url: `${import.meta.env.PAYMENT_URL}/payment/annual?email=${user?.email}`,

const MainContent = () => {
  const { user } = useAuth();
  const { url } = useSelector((state) => state?.Slice);
  const [subscription, setSubscription] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Only run browser-side logic after mount
  useEffect(() => {
    setIsMounted(true);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const { subscribe } = JSON.parse(storedUser);
        setSubscription(subscribe);
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
  }, []);

  // Prevent rendering until mounted (fix hydration)
  if (!isMounted) return null;

  return (
    <section
      className={`${
        user ? "max-md:h-fit " : "h-full"
      } w-full  md:bg-[var(--secondary)] rounded-md shadow-lg p-8`}
    >
      {!user ? (
        <div className="flex items-center justify-center h-full w-full">
          <div className="bg-black rounded-xl p-5">
            <a href="/signup">
              <button className="text-2xl max-md:text-xl bg-orange-500 py-3 px-5 rounded-xl cursor-pointer uppercase">
                signup to keep watching
              </button>
            </a>
            <div className="text-xl max-md:text-base flex items-center gap-2 bg-slate-600 py-2 px-5 rounded-xl mt-3">
              <h1>Have an account already?</h1>
              <a href="/login">
                <button className="text-orange-500 font-semibold">
                  Log in
                </button>
              </a>
            </div>
          </div>
        </div>
      ) : !subscription ? (
        <div className="flex items-center justify-center h-full w-full">
          <div className="bg-[var(--background)] rounded-xl p-6">
            <h1 className="text-2xl font-semibold mb-2">Select a plan</h1>
            <p className="text-sm">
              Watch Unlimited BOXING, MMA (PPV INCLUDED), NFL, NCAAF, NCAAB,
              Rodeo, MLB, NHL, NBA No Blackouts. Instant activation!
            </p>
            <div className="flex flex-col gap-6 mt-6">
              {subscriptions.map((subscription) => (
                <a
                  key={subscription.id}
                  target="_blank"
                  href={`${import.meta.env.PAYMENT_URL}${
                    subscription.url
                  }?email=${user?.email}`}
                >
                  <div className="group hover:bg-[var(--primary)] px-4 py-3 border border-[var(--primary)] rounded-lg flex items-center justify-between relative transition-colors duration-300 ease-linear">
                    <div>
                      <div className="flex items-center gap-6">
                        <h2 className="text-xl font-semibold group-hover:text-[var(--background)]">
                          {subscription.name}
                        </h2>
                        <p className="text-sm group-hover:text-[var(--secondary)]">
                          {subscription.days}
                        </p>
                      </div>
                      <p className="mt-2 text-sm group-hover:text-[var(--secondary)]">
                        {subscription.device}
                      </p>
                    </div>
                    <div>
                      {subscription.value && (
                        <p className="uppercase text-center absolute -top-3 bg-[var(--primary)] text-xs p-1 rounded-sm group-hover:text-[var(--background)] group-hover:bg-[var(--text)]">
                          {subscription.value}
                        </p>
                      )}
                      <div className="flex items-end flex-col space-y-2 ">
                        <div className="flex items-center space-x-2">
                          {subscription.regularPrice && (
                            <p className="line-through text-sm text-gray-400 group-hover:text-[var(--secondary)]">
                              {subscription.regularPrice}
                            </p>
                          )}
                          <p className="font-semibold text-lg group-hover:text-[var(--background)]">
                            {subscription.offerPrice}
                          </p>
                        </div>
                        <div>
                          {subscription.discount && (
                            <p className="bg-[var(--primary)] text-sm px-2 rounded-sm group-hover:text-[var(--background)] group-hover:bg-[var(--text)]">
                              {subscription.discount}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <p className="mt-4 text-sm">
              Our subscriptions do not auto-renew. You will need to renew
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
