import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import HlsPlayer from "../HlsPlayer/HlsPlayer";
import MatchCountdown from "../MatchCountdown/MatchCountdown";
import { useSearchParams } from "react-router";
import axios from "axios";
import useUserData from "../../hooks/useUserData";
import Pricing from "../Pricing/Pricing";
const PlayerPlate = ({ user, trialActive, trialTimeLeft }) => {
  const { defaultUrl, defaultChannel } = useSelector((state) => state?.Slice);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("id");
  const [userData] = useUserData();
  const isSubscribed = userData?.subscribe;

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
  const matchStartTime = liveData?.targetDate
    ? new Date(liveData?.targetDate)
    : null;

  const beforeMatch =
    matchStartTime &&
    currentTimeUTC < matchStartTime &&
    liveData?.matchTime &&
    liveData?.matchDate;

  const afterMatch =
    matchStartTime && currentTimeUTC >= matchStartTime;

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
        <div className="loading loading-spinner loading-md"></div>
      </div>
    );
  }

  // ✅ Priority: if trial is active, show video
  if (trialActive) {
    return (
      <HlsPlayer
        src={
          liveData?.matchUrl ||
          liveData?.channelURL ||
          defaultUrl
        }
        user={user}
        trialActive={trialActive}
        trialTimeLeft={trialTimeLeft}
        videoId={categoryId || defaultChannel?._id}
      />
    );
  }

  // ✅ If subscribed
  if (isSubscribed) {
    if (beforeMatch) {
      return (
        <MatchCountdown
          matchTime={liveData?.matchTime}
          matchDate={liveData?.matchDate}
          matchId={liveData?._id}
          targetDate={liveData?.targetDate}
          user={user}
        />
      );
    }
    if (afterMatch && liveData?.matchUrl) {
      return (
        <HlsPlayer
          src={liveData.matchUrl}
          user={user}
          videoId={categoryId}
        />
      );
    }
    if (liveData?.category === "Channel" && liveData?.channelURL) {
      return (
        <HlsPlayer
          src={liveData.channelURL}
          user={user}
          videoId={categoryId}
        />
      );
    }
    return (
      <HlsPlayer
        src={defaultUrl}
        user={user}
        videoId={categoryId || defaultChannel?._id}
      />
    );
  }

  if (!isSubscribed) {
    if (beforeMatch) {
      return (
        <MatchCountdown
          matchTime={liveData?.matchTime}
          matchDate={liveData?.matchDate}
          matchId={liveData?._id}
          targetDate={liveData?.targetDate}
          user={user}
        />
      );
    }
    return <Pricing />;
  }

  return null;
};

export default PlayerPlate;
