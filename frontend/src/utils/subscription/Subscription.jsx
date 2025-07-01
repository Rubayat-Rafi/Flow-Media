import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
const Subscription = ({ children, className }) => {
  const { user } = useAuth();
  useEffect(() => {
    if (!user?.email) return;
    const checkSubscription = async () => {
      try {
        await axios.get(
          `${
            import.meta.env.VITE_FLOW_MRDIA_API
          }/api/payment/subscriptions/expired/${user.email}`
        );
      } catch (error) {
        console.error("Subscription check failed:", error?.message);
      }
    };
    checkSubscription();
    const interval = setInterval(checkSubscription, 500);
    return () => clearInterval(interval);
  }, [user?.email]);
  
  return <div className={className}>{children}</div>;
};
export default Subscription;
