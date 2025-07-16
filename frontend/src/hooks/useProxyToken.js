import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useSearchParams } from "react-router"; // or 'next/navigation' in Next.js
import { useSelector } from "react-redux";

const useProxyToken = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const videoid = searchParams.get("id");
  const { defaultChannel } = useSelector((state) => state?.Slice);
  const streamId = videoid || defaultChannel?._id;

  const { data: streamToken = {}, isLoading } = useQuery({
    queryKey: ["secureProxyUrl", streamId],
    enabled: !loading && Boolean(streamId),
    queryFn: async () => {
      if (!streamId) return {};
      const { data } = await axiosSecure.get(
        `/api/proxy/streamToken/${streamId}`
      );
      return data; // should contain { token }
    },
  });


  return [streamToken, isLoading];
};

export default useProxyToken;
