// hooks/useLiveStreamUrl.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchLiveUrl = async (matchId, category) => {
  const res = await axios.get(`${import.meta.env.VITE_FLOW_MRDIA_API}/api/live/${matchId}?category=${category}`);
  return res.data; // should return { match_url, channel_url }
};

export const useLiveStreamUrl = (matchId, category) => {
  return useQuery({
    queryKey: ["live-stream-url", matchId],
    queryFn: () => fetchLiveUrl(matchId, category),
    enabled: !!matchId,
    refetchInterval: 500,
    refetchOnWindowFocus: false,
  });
};
