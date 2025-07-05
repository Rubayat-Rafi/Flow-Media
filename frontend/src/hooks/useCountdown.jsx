import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCountdown = (id) => {
  const {
    data: countdown,
    isLoading,
    refetch,
    error,
    isError,
  } = useQuery({
    queryKey: ["countdown", id], // include ID to uniquely cache per match
    queryFn: async () => {
      const { data } = await axios.get(
        ``
      );
      return data;
    },
    enabled: !!id, // prevent query from running if id is undefined or null
  });

  return { countdown, isLoading, refetch, isError, error };
};

export default useCountdown;
