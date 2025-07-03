import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import useRole from "../hooks/useRole";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const MainLayout = () => {
  const { loading } = useAuth();
  const [, isLoading] = useRole();
  if (isLoading || loading) return <LoadingSpinner />;

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="min-h-[calc(100vh-232px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
