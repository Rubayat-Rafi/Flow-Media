import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
const Subscription = ({ children, className }) => {
  const { user } = useAuth();
  const { data, error, isLoading } = useQuery({
    queryKey: ["subscriptionCheck", user?.email],
    queryFn: async () => {
      if (!user?.email) return;
      const res = await axios.get(
        `${
          import.meta.env.VITE_FLOW_MRDIA_API
        }/api/payment/subscriptions/expired/${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
    refetchInterval: 500,
    refetchOnWindowFocus: false,
  });

  if (error) {
    console.error("Subscription check failed:", error?.message);
  }

  return <div className={className}>{children}</div>;
};

export default Subscription;
