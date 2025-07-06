
import { useAuth } from './useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useUserData = () => {
  const { user } = useAuth();

  console.log(user.email)

  const {
    data: userData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_FLOW_MRDIA_API}/api/user/data/${user?.email}`);
      return data;
    },
  });

  return [userData, isLoading, refetch];
};

export default useUserData;