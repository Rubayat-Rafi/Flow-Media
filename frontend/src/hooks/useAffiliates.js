import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";
import useUserData from "./useUserData";
const useUserAffiliate = () => {
  const secureAxios = useSecureAxios();
  const [userData] = useUserData();
  const {
    data: affiliate = null,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["affiliate", userData?.email],
    queryFn: async () => {
      const { data } = await secureAxios.get(
        `/api/affiliate/my_affiliate/${userData?._id}`
      );
      return data?.data;
    },

    enabled: !!userData?.email,
    // refetchInterval: 500,
    refetchOnWindowFocus: false,
  });

  return [affiliate, isLoading, refetch];
};

export default useUserAffiliate;
