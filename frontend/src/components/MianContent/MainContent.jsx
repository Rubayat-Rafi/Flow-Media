import HlsPlayer from "../HlsPlayer/HlsPlayer";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import Subscription from "../../utils/subscription/Subscription";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";

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
  const { user } = useAuth();
  const { url, events } = useSelector((state) => state?.Slice);
  const [trialActive, setTrialActive] = useState(false);

  const [trialTimeLeft, setTrialTimeLeft] = useState(60);
  const queryClient = useQueryClient();
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

  // const hasTrialUsed = trialData?.used;
  return (
    <Subscription
      className={`${
        user ? "max-md:h-fit" : "h-full"
      } w-full md:bg-[var(--secondary)] rounded-md shadow-lg  lg:p-8 border border-[var(--text)]/10`}
    >
      <section className="h-full w-full">
        <div className=" flex items-center justify-between">
          {/* live status */}
          <div className="bg-[var(--background)] px-4 py-2 inline-flex rounded-t-md gap-2 items-center border-t border-x border-[var(--primary)]">
            <div className="inline-grid *:[grid-area:1/1]">
              <div className="status status-md lg:status-lg  status-error animate-ping bg-red-500"></div>
              <div className="status status-md lg:status-lg  status-error bg-red-600"></div>
            </div>
            <div className="text-xs lg:text-base lg:font-medium">
              {events ? (
                events?.category === "Channel" ? (
                  <p>{events?.channelName}</p>
                ) : (
                  <p>Live</p>
                )
              ) : (
                <p>Live</p>
              )}
            </div>
          </div>

          <div className="">
            {/* trial ststus  */}
            {
              !user &&
                !trialLoading &&
                !trialActive &&
              trialData?.used === true && (
                <div className="text-end">
                  <button
                    onClick={() => startTrial()}
                    className=""
                    // disabled={trialActive}
                    disabled={false}
                  >
                    Start Trial
                  </button>
                </div>
              )
            }
            <p className=" mr-6 lg:mr-0 text-xs lg:text-base text-[var(--primary)] font-semibold text-end">
              Trial: {trialTimeLeft}s
            </p>

            {!user && trialLoading && (
              <div className="text-sx text-end ">Checking free trial...</div>
            )}
          </div>
        </div>

        {!user && trialData?.used && !trialActive && (
          <div className="flex items-center justify-center lg:h-[500px] w-full">
            <div
              className="bg-[var(--background)] rounded-xl p-6"
              style={{ boxShadow: "0 2px 6px 0 var(--primary)" }}
            >
              <Link
                to="/signup"
                className="text-xl max-md:text-base bg-[var(--primary)] py-3 px-4 rounded-md cursor-pointer uppercase"
              >
                Signup to keep watching
              </Link>
              <p className="text-base max-md:text-xs text-center mt-4">
                Already have an account?
                <Link
                  to="/login"
                  className="text-[var(--primary)] font-medium ml-2"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        )}

        {user && subLoading && (
          <div className="text-center text-gray-600">
            Checking subscription...
          </div>
        )}
        {user && isError && (
          <div className="text-center text-red-500">
            Failed to fetch subscription.
          </div>
        )}
        {user && !subscription && !subLoading && (
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
                    // to={`https://www.pbg4jptrk.com/7XGQTB/7RZT374/?sub3=${user?.email}`}
                    to={`${import.meta.env.VITE_PAYMENT_URL}${
                      subscription.url
                    }?email=${user?.email}&price=${subscription.offerPrice}`}
                    // https://www.pbg4jptrk.com/7XGQTB/7RZT374/?sub3=rafi@gmail.com
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
        {user && subscription && <HlsPlayer src={url} />}
        {!user && trialActive && (
          <>
            <HlsPlayer src={url} />
          </>
        )}
      </section>
    </Subscription>
  );
};

export default MainContent;
