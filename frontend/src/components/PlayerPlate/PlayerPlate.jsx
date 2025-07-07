import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import HlsPlayer from "../HlsPlayer/HlsPlayer";
import MatchCountdown from "../MatchCountdown/MatchCountdown";
import { useSearchParams } from "react-router";
import axios from "axios";
const PlayerPlate = ({ user, trialActive, trialTimeLeft }) => {
  const { events, defaultUrl } = useSelector((state) => state?.Slice);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("id");
  const { data: liveData } = useQuery({
    queryKey: ["livePlay", categoryId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_FLOW_MRDIA_API}/api/find_for_play/${categoryId}`
      );
      return data;
    },
    enabled: !!categoryId,
    refetchInterval: 500,
    staleTime: 0,
  });

  const shouldShowLiveMatchFromAPI =
    liveData?.countdown === false && !!liveData?.matchUrl;
  const isMatch = events?.category !== "Channel";
  const hasCountdown = events?.countdown === true;
  const matchReady = events?.matchTime && events?.matchDate;
  const showCountdown = hasCountdown && isMatch && matchReady;
  const showMatchStream =
    (events?.countdown === false && isMatch && matchReady) ||
    shouldShowLiveMatchFromAPI;
  const showChannelStream = events?.category === "Channel";
  const showDefaultStream = !events;

  return (
    <div className="h-full relative">
      {/* Countdown Timer */}
      <div className="absolute top-0 right-0 bottom-0 left-0">
        {showCountdown && (
          <MatchCountdown
            matchTime={events.matchTime}
            matchDate={events.matchDate}
            matchId={events?._id}
          />
        )}
      </div>

      {/* Match Streaming */}
      {showMatchStream && (
        <HlsPlayer
          src={shouldShowLiveMatchFromAPI ? liveData.matchUrl : defaultUrl}
          user={user}
          trialActive={trialActive}
          trialTimeLeft={trialTimeLeft}
        />
      )}

      {/* Channel Streaming */}
      {showChannelStream && (
        <HlsPlayer
          src={liveData?.channelURL || defaultUrl}
          user={user}
          trialActive={trialActive}
          trialTimeLeft={trialTimeLeft}
        />
      )}

      {/* Fallback */}
      {showDefaultStream && (
        <HlsPlayer
          src={defaultUrl}
          user={user}
          trialActive={trialActive}
          trialTimeLeft={trialTimeLeft}
        />
      )}
    </div>
  );
};

export default PlayerPlate;
