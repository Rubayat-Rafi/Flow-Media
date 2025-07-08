import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import HlsPlayer from "../HlsPlayer/HlsPlayer";
import MatchCountdown from "../MatchCountdown/MatchCountdown";
import { useSearchParams } from "react-router";
import axios from "axios";

const PlayerPlate = ({ user, trialActive, trialTimeLeft }) => {
  const { defaultUrl } = useSelector((state) => state?.Slice); // only using defaultUrl
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

  // Show countdown if countdown is true and match time/date exist
  const showCountdown =
    liveData?.countdown === true &&
    liveData?.matchTime &&
    liveData?.matchDate;

  // Match stream if countdown is false and matchUrl exists
  const showMatchStream =
    liveData?.countdown === false && !!liveData?.matchUrl;

  // Channel stream if it's a channel category
  const showChannelStream =
    liveData?.category === "Channel" && !!liveData?.channelURL;

  // Fallback to default if nothing else applies
  const showDefaultStream =
    !showMatchStream && !showChannelStream && !isLoading && !showCountdown ;

  return (
    <div className="h-full relative">
      {/* Countdown Timer */}
      <div className="absolute top-0 right-0 bottom-0 left-0">
        {showCountdown && (
          <MatchCountdown
            matchTime={liveData.matchTime}
            matchDate={liveData.matchDate}
            matchId={liveData?._id}
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
