import { useEffect } from "react";

const DomainRedirector = () => {
  useEffect(() => {
    const domains = [
      "https://flowmediatv.fun",
      "https://flowmediatv.io",
      "https://flowmediatv.live",
    ];

    const checkDomains = async () => {
      for (const domain of domains) {
        try {
          await fetch(`${domain}/api/health`, { method: "GET", mode: "no-cors" });
          window.location.href = domain;
          return;
        } catch (error) {
          // Try the next domain
          continue;
        }
      }

      // If none of the domains work
      alert("All servers are currently unavailable. Please try again later.");
    };

    checkDomains();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Redirecting...</h1>
      <p>Please wait while we check server availability...</p>
    </div>
  );
};

export default DomainRedirector;
