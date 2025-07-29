import { Link } from "react-router";
import usePricing from "../../hooks/usePricing";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useAuth } from "../../hooks/useAuth";
const Pricing = () => {
  const { user } = useAuth();
  const [pricing] = usePricing();
  const [searchParams] = useSearchParams();
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

  if (pricing.length == 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-center h-full w-full">
        <div className="bg-[var(--background)] rounded-xl p-4">
          <h1 className="text-2xl font-semibold mb-2">Select a plan</h1>
          <p className="text-sm">
            Watch Unlimited BOXING, MMA (PPV INCLUDED), NFL, NCAAF, NCAAB,
            Rodeo, MLB, NHL, NBA — No Blackouts. Instant activation!
          </p>
          <div className="flex flex-col gap-6 mt-6">
            {pricing?.map((price) => (
              <Link
                key={price?._id}
                to={`https://go.adsflowmedia.com/go.php?oid=401&${
                  pid && `pid=${pid}`
                }&sub3=${user?.email}&sub6=${worker}`}
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
                            ${price?.regularPrice}
                          </p>
                        )}
                        <p className="font-semibold text-lg group-hover:text-[var(--background)]">
                          ${price?.offerPrice}
                        </p>
                      </div>
                      {price.discount && (
                        <p className="bg-[var(--primary)] text-sm px-2 rounded-sm group-hover:text-[var(--background)] group-hover:bg-[var(--text)]">
                          {price?.discount}% Offer
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm">
            Our subscriptions do not auto-renew. You will need to renew manually
            if you wish to continue.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
