import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import Subscription from "../../utils/subscription/Subscription";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSearchParams } from "react-router";
import useCategory from "../../hooks/useCategory";
import { GetParams } from "../../utils/get_searchParams/ger_searchParams";
import LoginPalate from "../LoginPalate/LoginPalate";
import PlayerPlate from "../PlayerPlate/PlayerPlate";
import { useDispatch } from "react-redux";
import { addDefaultUrl } from "../../utils/redux/slices/slice";

const subscriptions = [
  {
    id: 1,
    name: "Annual Pass",
    days: "365 days",
    device: "2 Devices",
    value: "Best value",
    regularPrice: "$240",
    offerPrice: "99.99",
    discount: "50% offer",
    url: "/payment/yearly",
  },
  {
    id: 2,
    name: "Monthly Pass",
    days: "30 days",
    device: "1 Device",
    offerPrice: "19.99",
    url: "/payment/monthly",
  },
  {
    id: 3,
    name: "Weekly Pass",
    days: "7 days",
    device: "1 Device",
    offerPrice: "14.99",
    url: "/payment/weekly",
  },
];
const fetchSubscription = async (email) => {
  const res = await axios.get(
    `${import.meta.env.VITE_FLOW_MRDIA_API}/api/user/role/${email}`
  );
  return res?.data?.userData?.subscribe;
};
const fetchTrialStatus = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_FLOW_MRDIA_API}/api/free-trial/check`
  );
  return res.data;
};
const startTrialRequest = async () => {
  const res = await axios.post(
    `${import.meta.env.VITE_FLOW_MRDIA_API}/api/free-trial/start`
  );
  return res.data;
};
const MainContent = () => {
  const dispatch = useDispatch();
  const [categorys] = useCategory();
  const { user } = useAuth();
  const { url, events, defaultUrl } = useSelector((state) => state?.Slice);

  const [trialActive, setTrialActive] = useState(false);
  const [trialTimeLeft, setTrialTimeLeft] = useState(60);
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const channelDataFilter = categorys?.filter(
    (item) => item?.category === "Channel"
  );

  const categoryData = searchParams.get("q");
  const hlsSrc = GetParams(categoryData, categorys, url) || defaultUrl;
  const {
    data: subscription,
    isLoading: subLoading,
    isError,
  } = useQuery({
    queryKey: ["subscription-status", user?.email],
    queryFn: () => fetchSubscription(user.email),
    enabled: !!user?.email,
    refetchInterval: 500,
  });

  const { data: trialData, isLoading: trialLoading } = useQuery({
    queryKey: ["free-trial-status"],
    queryFn: fetchTrialStatus,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { mutate: startTrial } = useMutation({
    mutationFn: startTrialRequest,
    onSuccess: () => {
      setTrialActive(true);
      const interval = setInterval(() => {
        setTrialTimeLeft((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setTrialActive(false);
            queryClient.invalidateQueries(["free-trial-status"]);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
  });

  useEffect(() => {
    if (channelDataFilter.length > 0 && channelDataFilter[0]?.channelURL) {
      dispatch(addDefaultUrl(channelDataFilter[0].channelURL));
    }
  }, [channelDataFilter, dispatch]);

  return (
    <Subscription className="w-full lg:bg-[var(--secondary)] rounded-md shadow-lg lg:p-5 lg:border border-[var(--text)]/10 lg:h-[600px]">
      <section className="h-full w-full">
        {/* ... (keep your existing trial button and countdown code) ... */}
        {!user && (
          <div>
            {subscription && (
              <div className=" max-lg:hidden bg-[var(--background)] px-4 py-2 inline-flex rounded-t-md gap-2 items-center border-t border-x border-[var(--primary)]">
                <div className="inline-grid *:[grid-area:1/1]">
                  <div className="status status-lg status-error animate-ping bg-red-500"></div>
                  <div className="status status-lg status-error bg-red-600"></div>
                </div>
                <div className="font-semibold max-lg:text-sm">
                  {events?.category === "Channel" ? (
                    <p>{events?.channelName}</p>
                  ) : (
                    <p>Live</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modified guest user section */}
        {!user ? (
          trialActive ? (
            <div>
              <div className="bg-red-600 text-[var(--bakground)] inline-flex p-1 rounded absolute right-6 top-16 z-10 w-10 h-10  items-center justify-center">
                {trialTimeLeft}s
              </div>
              <div className="relative">
                <PlayerPlate hlsSrc={hlsSrc} />
              </div>
            </div>
          ) : (
            // Show trial options instead of login for new users
            <div className="flex flex-col items-center justify-center h-full p-4">
              <div
                className={`${
                  trialData?.used === false &&
                  "rounded-xl p-4 md:p-6 text-center bg-[var(--background)]  "
                } `}
              >
                {trialData?.used === false && (
                  <>
                    <h2 className="text-xl font-bold mb-4">
                      Start Watching Now
                    </h2>
                    <p className="mb-6">
                      Try our free trial to access all content
                    </p>
                  </>
                )}

                {trialData?.used === false && !trialActive && (
                  <button
                    onClick={() => startTrial()}
                    className="bg-[var(--primary)] text-white px-4 py-2 lg:py-3 w-full rounded-md font-medium hover:bg-opacity-90   md:min-w-md cursor-pointer transition"
                  >
                    Start Free Trial
                  </button>
                )}

                {trialData?.used === true && <LoginPalate />}

                {trialLoading && (
                  <div className="text-center py-4">
                    <p>Checking trial availability...</p>
                  </div>
                )}
              </div>
            </div>
          )
        ) : (
          subscription && <PlayerPlate hlsSrc={hlsSrc} />
        )}

        {/* No subscription plans */}
        {user && !subscription && !subLoading && !trialActive && (
          <div className="flex items-center justify-center h-full w-full">
            <div className="bg-[var(--background)] rounded-xl p-6">
              <h1 className="text-2xl font-semibold mb-2">Select a plan</h1>
              <p className="text-sm">
                Watch Unlimited BOXING, MMA (PPV INCLUDED), NFL, NCAAF, NCAAB,
                Rodeo, MLB, NHL, NBA — No Blackouts. Instant activation!
              </p>
              <div className="flex flex-col gap-6 mt-6">
                {subscriptions.map((subscription) => (
                  <Link
                    key={subscription.id}
                    to={`${import.meta.env.VITE_PAYMENT_URL}${
                      subscription.url
                    }?email=${user?.email}&price=${subscription.offerPrice}`}
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
                        <div className="flex items-end flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            {subscription.regularPrice && (
                              <p className="line-through text-sm text-gray-400 group-hover:text-[var(--secondary)]">
                                {subscription.regularPrice}
                              </p>
                            )}
                            <p className="font-semibold text-lg group-hover:text-[var(--background)]">
                              ${subscription.offerPrice}
                            </p>
                          </div>
                          {subscription.discount && (
                            <p className="bg-[var(--primary)] text-sm px-2 rounded-sm group-hover:text-[var(--background)] group-hover:bg-[var(--text)]">
                              {subscription.discount}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-sm">
                Our subscriptions do not auto-renew. You will need to renew
                manually if you wish to continue.
              </p>
            </div>
          </div>
        )}
      </section>
    </Subscription>
  );
};

export default MainContent;
