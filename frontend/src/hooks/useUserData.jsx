
import { useAuth } from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
const useUserData = () => {
  const secureAxios = useAxiosSecure()
  const { user } = useAuth();
  const {
    data: userData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await secureAxios.get(`/api/user/data/${user?.email}`);
      return data;
    },
  });

  return [userData, isLoading, refetch];
};

export default useUserData;