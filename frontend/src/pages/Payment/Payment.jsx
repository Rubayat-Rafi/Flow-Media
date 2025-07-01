import { useLocation } from "react-router";
import Container from "../../components/Shared/Container";

const Payment = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const packageType = searchParams.get("package");
  return (
    <div>
      <Container>{packageType}</Container>
    </div>
  );
};

export default Payment;
