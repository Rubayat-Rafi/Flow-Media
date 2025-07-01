import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCategory = () => {
  const { data: categories = [], isLoading, refetch } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_FLOW_MRDIA_API}/api/categorys`
      );
      return data;
    },
  });

  return [categories, isLoading, refetch];
};

export default useCategory;
