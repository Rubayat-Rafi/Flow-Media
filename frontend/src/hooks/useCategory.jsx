import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCategory = () => {
  const { data: categorys = [], isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_FLOW_MRDIA_API}/api/category`
      );
      return data;
    },
  });

  return [categorys, isLoading];
};

export default useCategory;
