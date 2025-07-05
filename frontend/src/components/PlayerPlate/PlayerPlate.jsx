import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import HlsPlayer from "../HlsPlayer/HlsPlayer";
import MatchCountdown from "../MatchCountdown/MatchCountdown";
import { data, useSearchParams } from "react-router";
import { GetCategory } from "../../utils/get_searchParams/get_searchParams";
import axios from "axios";

const PlayerPlate = ({ hlsSrc }) => {
  const { events, defaultUrl } = useSelector((state) => state?.Slice);
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("q");
  const { categ, eventName } = GetCategory(categoryData) || {};

  // ✅ TanStack Query to fetch live data every 500ms
  const { data: liveData, isLoading, isError } = useQuery({
    queryKey: ["livePlay", eventName],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_FLOW_MRDIA_API}/api/find_for_play/${eventName}`
      );
      return data;
    },
    enabled: !!eventName,
    refetchInterval: 500,
    staleTime: 0,
  });
  const shouldShowLiveMatchFromAPI = liveData?.countdown === false && !!liveData?.matchUrl;
  const isMatch = events?.category !== "Channel";
  const hasCountdown = events?.countdown === true;
  const matchReady = events?.matchTime && events?.matchDate;
  const showCountdown = hasCountdown && isMatch && matchReady;
  const showMatchStream = (events?.countdown === false && isMatch && matchReady) || shouldShowLiveMatchFromAPI;
  const showChannelStream = events?.category === "Channel";
  const showDefaultStream = !events;
  return (
    <div className="h-full">
      {/* Top Bar */}
      {events && (
        <div className="max-lg:hidden bg-[var(--background)] px-4 py-2 inline-flex rounded-t-md gap-2 items-center border-t border-x border-[var(--primary)]">
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

      {/* Countdown Timer */}
      {showCountdown && (
        <MatchCountdown
          matchTime={events.matchTime}
          matchDate={events.matchDate}
          matchId={events?._id}
        />
      )}

      {/* Match Streaming */}
      {showMatchStream && (
        <HlsPlayer
          src={
            shouldShowLiveMatchFromAPI
              ? liveData.matchUrl
              : hlsSrc?.match_url || defaultUrl
          }
        />
      )}

      {/* Channel Streaming */}
      {showChannelStream && (
        <HlsPlayer src={hlsSrc?.channel_url || defaultUrl} />
      )}

      {/* Fallback */}
      {showDefaultStream && <HlsPlayer src={defaultUrl} />}
    </div>
  );
};

export default PlayerPlate;
