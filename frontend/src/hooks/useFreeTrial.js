// hooks/useFreeTrial.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCheckFreeTrial = () => {
  return useQuery({
    queryKey: ["free-trial-check"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/free-trial/check`);
      return res.data;
    },
    retry: false,
  });
};

export const useStartFreeTrial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await axios.post(`${import.meta.env.VITE_FLOW_MRDIA_API}/api/free-trial/start`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["free-trial-check"]);
    },
  });
};
