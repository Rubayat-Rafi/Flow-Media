import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const usePricing = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: pricing = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pricing"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/pricing`);
      return data.data;
    },
  });

  return [pricing, isLoading, refetch];
};

export default usePricing;
