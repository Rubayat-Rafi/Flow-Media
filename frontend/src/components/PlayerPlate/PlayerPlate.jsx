import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import HlsPlayer from "../HlsPlayer/HlsPlayer";
import MatchCountdown from "../MatchCountdown/MatchCountdown";
import { useSearchParams } from "react-router";
import axios from "axios";
const PlayerPlate = ({ user, trialActive, trialTimeLeft }) => {
  const { defaultUrl } = useSelector((state) => state?.Slice);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("id");
  const { data: liveData, isLoading } = useQuery({
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
  const currentTimeUTC = new Date();
  const matchStartTime = new Date(liveData?.targetDate || null);
  const showCountdown =
    matchStartTime &&
    currentTimeUTC < matchStartTime &&
    liveData?.matchTime &&
    liveData?.matchDate;
  const showMatchStream =
    matchStartTime && currentTimeUTC >= matchStartTime && !!liveData?.matchUrl;
  const showChannelStream =
    liveData?.category === "Channel" && !!liveData?.channelURL;
  const showDefaultStream =
    !showMatchStream && !showChannelStream && !isLoading && !showCountdown;
  return (
    <div className="h-full relative ">
      {/*Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
          <div className=" loading loading-spinner loading-md"></div>
        </div>
      )}

      {/* Countdown Timer */}
      <div className="absolute top-0 right-0 bottom-0 left-0">
        {showCountdown && (
          <MatchCountdown
            matchTime={liveData.matchTime}
            matchDate={liveData.matchDate}
            matchId={liveData?._id}
            targetDate={liveData?.targetDate}
          />
        )}
      </div>

      {/* Match Streaming */}
      {showMatchStream && (
        <HlsPlayer
          src={liveData.matchUrl}
          user={user}
          trialActive={trialActive}
          trialTimeLeft={trialTimeLeft}
        />
      )}

      {/* Channel Streaming */}
      {showChannelStream && (
        <HlsPlayer
          src={liveData.channelURL}
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
