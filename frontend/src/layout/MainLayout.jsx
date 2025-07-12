import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import useRole from "../hooks/useRole";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import { useDetectAdBlock } from "adblock-detect-react";
import { SiAdblock } from "react-icons/si";

const MainLayout = () => {
  const { loading } = useAuth();
  const [, isLoading] = useRole();
  const adBlockDetected = useDetectAdBlock(); // 🚨 Adblock detection
  if (isLoading || loading) return <LoadingSpinner />;

  return (
    <>
      {/* AdBlock Overlay */}
      {adBlockDetected && (
        <div className="fixed inset-0 z-[9999] bg-black/20 flex flex-col items-center justify-center text-center px-4 h-screen">
          <div className="bg-white rounded-lg p-8">
            <div className="flex items-center justify-center mb-4">
              <SiAdblock className="text-5xl text-red-500"/>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Ad Blocker Detected</h2>
            <p className="mb-6 max-w-lg mx-auto text-gray-500">
              Please disable your ad blocker to continue using our website. Ads
              help keep this service free.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-100 text-red-700 px-6 py-2 rounded hover:bg-red-200 transition"
            >
              I disabled it. Refresh
            </button>
          </div>
        </div>
      )}

      {/* Normal Layout Content */}
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
