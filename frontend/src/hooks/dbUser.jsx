import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import axios from "axios";

const useDBUser = () => {
  const { user, loading: authLoading } = useAuth();

  const {
    data: dbUser, 
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_FLOW_MRDIA_API}/api/user/role/${user.email}`
      );
      return data?.userData; 
    },
  });

  return [dbUser, isLoading, isError];
};

export default useDBUser;
