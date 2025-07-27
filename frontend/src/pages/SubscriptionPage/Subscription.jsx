import React, { useEffect, useState } from "react";
import usePricing from "../../hooks/usePricing";
import { Link, useSearchParams } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const Subscription = () => {
  const [pricing] = usePricing();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [pid, setPid] = useState(4);
  const [worker, setWorker] = useState("member");

  useEffect(() => {
    const pid = searchParams.get("pid");
    const sub6 = searchParams.get("sub6");
    if (pid) {
      localStorage.setItem("pid", pid);
      localStorage.setItem("worker", sub6);
    }
  }, [searchParams]);

  useEffect(() => {
    const storedPid = localStorage.getItem("pid");
    const storedWorker = localStorage.getItem("worker");
    if (storedPid && storedWorker) {
      setPid(storedPid);
      setWorker(storedWorker);
    }
  }, [pid, worker]);

  if (!pricing || pricing.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">
            No subscription plans available at the moment.
          </p>
          <p className="text-sm text-gray-500 mt-2">Please check back later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-[var(--background)]/50 rounded-2xl shadow-md  shadow-[#dd8f3c] ">
        <div className="bg-[var(--card-bg)] rounded-xl shadow-lg overflow-hidden p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[var(--text)] mb-2">
              Choose Your Plan
            </h1>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Unlimited access to BOXING, MMA (PPV INCLUDED), NFL, NCAAF, NCAAB,
              Rodeo, MLB, NHL, NBA — No Blackouts. Instant activation!
            </p>
          </div>

          <div className="space-y-4">
            {pricing.map((plan) => (
              <div
                key={plan._id}
              >
                <Link
                  to={`https://go.adsflowmedia.com/go.php?oid=401&${
                    pid && `pid=${pid}`
                  }&sub3=${user?.email}&sub6=${worker}`}
                  className="block"
                >
                        <div className="group hover:bg-[var(--primary)] px-4 py-3 border border-[var(--primary)] rounded-lg flex items-center justify-between relative transition-colors duration-300 ease-linear">
                          <div>
                            <div className="flex items-center gap-6">
                              <h2 className="text-xl font-semibold group-hover:text-[var(--background)]">
                                {plan?.passName}
                              </h2>
                              <p className="text-sm group-hover:text-[var(--secondary)]">
                                {plan?.days} Days
                              </p>
                            </div>
                            <p className="mt-2 text-sm group-hover:text-[var(--secondary)]">
                              {plan?.device} Device
                            </p>
                          </div>
                          <div>
                            {plan?.value && (
                              <p className="uppercase text-center absolute -top-3 bg-[var(--primary)] text-xs p-1 rounded-sm group-hover:text-[var(--background)] group-hover:bg-[var(--text)]">
                                {plan.value}
                              </p>
                            )}
                            <div className="flex items-end flex-col space-y-2">
                              <div className="flex items-center space-x-2">
                                {plan.regularPrice && (
                                  <p className="line-through text-sm text-gray-400 group-hover:text-[var(--secondary)]">
                                    ${plan?.regularPrice}
                                  </p>
                                )}
                                <p className="font-semibold text-lg group-hover:text-[var(--background)]">
                                  ${plan?.offerPrice}
                                </p>
                              </div>
                              {plan.discount && (
                                <p className="bg-[var(--primary)] text-sm px-2 rounded-sm group-hover:text-[var(--background)] group-hover:bg-[var(--text)]">
                                  {plan?.discount}% Offer
                                </p>
                              )}
                            </div>
                          </div>
                        </div>


                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-[var(--text-secondary)]">
            <p>
              Our subscriptions do not auto-renew. You will need to renew
              manually if you wish to continue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
