import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="min-h-[calc(100vh-248px)] max-w-[1440px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
