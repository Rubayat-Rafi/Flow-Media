import { useAuth } from "../../hooks/useAuth";
import Subscription from "../../utils/subscription/Subscription";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router";
import useCategory from "../../hooks/useCategory";
import LoginPalate from "../LoginPalate/LoginPalate";
import PlayerPlate from "../PlayerPlate/PlayerPlate";
import { useDispatch } from "react-redux";
import {
  addDefaultChannel,
  addDefaultUrl,
} from "../../utils/redux/slices/slice";
import usePricing from "../../hooks/usePricing";
import { useSearchParams } from "react-router";
import FreeChannelHls from "../FeeChannelHls/FreeChannelHls";

// const subscriptions = [
//   {
//     id: 1,
//     name: "Annual Pass",
//     days: "365 days",
//     device: "2 Devices",
//     value: "Best value",
//     regularPrice: "$240",
//     offerPrice: "99.99",
//     discount: "50% offer",
//     url: "/payment/yearly",
//   },
//   {
//     id: 2,
//     name: "Monthly Pass",
//     days: "30 days",
//     device: "1 Device",
//     offerPrice: "19.99",
//     url: "/payment/monthly",
//   },
//   {
//     id: 3,
//     name: "Weekly Pass",
//     days: "7 days",
//     device: "1 Device",
//     offerPrice: "14.99",
//     url: "/payment/weekly",
//   },
// ];

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
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [trialActive, setTrialActive] = useState(false);
  const [trialTimeLeft, setTrialTimeLeft] = useState(60);
  const [pricing] = usePricing();
  const [pid, setPid] = useState(null);
  const channelDataFilter = categorys?.filter(
    (item) => item?.category === "Channel"
  );

  const categoryId = searchParams.get("id");

  useEffect(() => {
    const pid = searchParams.get("pid");
    if (pid) {
      localStorage.setItem("pid", pid);
    }
  }, [searchParams]);

  useEffect(() => {
    const storedToken = localStorage.getItem("pid");
    if (storedToken) {
      setPid(storedToken);
    }
  }, [pid]);

  console.log(pid)
  const filterChannel = channelDataFilter.find(
    (item) => item?._id === categoryId
  );
  const freeChannel = filterChannel?.type === "free" ? filterChannel : null;
  const { data: subscription, isLoading: subLoading } = useQuery({
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
    refetchInterval: 5000,
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
      dispatch(addDefaultChannel(channelDataFilter[0]));
    }
  }, [channelDataFilter, dispatch]);

  return (
    <Subscription className="w-full lg:h-[600px]">
      <section className="h-full w-full">
        {!user ? (
          trialActive ? (
            <PlayerPlate
              user={user}
              trialActive={trialActive}
              trialTimeLeft={trialTimeLeft}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4">
              <div
                className={`${
                  trialData?.used === false &&
                  "rounded-xl p-4 md:p-6 text-center bg-[var(--secondary)] max-w-md md:min-w-md  shadow-md shadow-[#dd8f3c]"
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
                    className="bg-[var(--primary)] flex gap-2 items-center justify-center text-white  px-4 py-2 lg:py-3 w-full rounded-md font-medium hover:bg-opacity-90  cursor-pointer transition"
                  >
                    <FaPlay className="text-xl" />
                    Watch Now
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
        ) : subscription === "active" ? (
          <PlayerPlate />
        ) : (subscription === "expired" || subscription === false) &&
          !subLoading &&
          !trialActive ? (
          !freeChannel && !subscription ? (
            <div className="flex items-center justify-center h-full w-full">
              <div className="bg-[var(--secondary)] rounded-xl p-4">
                <h1 className="text-2xl font-semibold mb-2">Select a plan</h1>
                <p className="text-sm">
                  Watch Unlimited BOXING, MMA (PPV INCLUDED), NFL, NCAAF, NCAAB,
                  Rodeo, MLB, NHL, NBA — No Blackouts. Instant activation!
                </p>
                <div className="flex flex-col gap-6 mt-6">
                  {pricing?.map((price) => (
                    <Link
                      key={price?._id}
                      to={`https://go.adsflowmedia.com/go.php?oid=401&${pid && `pid=${pid}`}&sub3=${user?.email}`}
                    >
                      <div className="group hover:bg-[var(--primary)] px-4 py-3 border border-[var(--primary)] rounded-lg flex items-center justify-between relative transition-colors duration-300 ease-linear">
                        <div>
                          <div className="flex items-center gap-6">
                            <h2 className="text-xl font-semibold group-hover:text-[var(--background)]">
                              {price?.passName}
                            </h2>
                            <p className="text-sm group-hover:text-[var(--secondary)]">
                              {price?.days} Days
                            </p>
                          </div>
                          <p className="mt-2 text-sm group-hover:text-[var(--secondary)]">
                            {price?.device} Device
                          </p>
                        </div>
                        <div>
                          {price?.value && (
                            <p className="uppercase text-center absolute -top-3 bg-[var(--primary)] text-xs p-1 rounded-sm group-hover:text-[var(--background)] group-hover:bg-[var(--text)]">
                              {price.value}
                            </p>
                          )}
                          <div className="flex items-end flex-col space-y-2">
                            <div className="flex items-center space-x-2">
                              {price.regularPrice && (
                                <p className="line-through text-sm text-gray-400 group-hover:text-[var(--secondary)]">
                                  {price?.regularPrice}
                                </p>
                              )}
                              <p className="font-semibold text-lg group-hover:text-[var(--background)]">
                                ${price?.offerPrice}
                              </p>
                            </div>
                            {price.discount && (
                              <p className="bg-[var(--primary)] text-sm px-2 rounded-sm group-hover:text-[var(--background)] group-hover:bg-[var(--text)]">
                                {price?.discount} Offer
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
          ) : (
            <FreeChannelHls
              src={freeChannel?.channelURL}
              channelName={freeChannel?.channelName}
            />
          )
        ) : null}
      </section>
    </Subscription>
  );
};

export default MainContent;
