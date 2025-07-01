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
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
