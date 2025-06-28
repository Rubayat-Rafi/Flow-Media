import { useLocation } from "react-router-dom";
const Payment = () => {
      const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const packageType = searchParams.get("package");
  return (
    <div>
      <div className=" max-w-[1440px] mx-auto w-11/12">
        {packageType}
      </div>
    </div>
  );
};

export default Payment;
