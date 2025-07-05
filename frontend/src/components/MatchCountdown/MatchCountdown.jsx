import { useEffect, useState } from "react";
import axios from "axios";

const MatchCountdown = ({ matchTime, matchDate, matchId }) => {
  const [countdown, setCountdown] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [hasUpdated, setHasUpdated] = useState(false);

  useEffect(() => {
    let timer;

    const calculateCountdown = async () => {
      let [hour, minute] = matchTime.split(":").map(Number);
      let date = new Date(matchDate);

      // Handle "24:00" case
      if (hour === 24) {
        date.setDate(date.getDate() + 1);
        hour = 0;
      }

      date.setHours(hour);
      date.setMinutes(minute);
      date.setSeconds(0);

      const matchStart = date.getTime();
      const now = new Date().getTime();
      const diff = matchStart - now;

      if (diff <= 0) {
        setIsLive(true);

        // ✅ API call when countdown ends
        if (!hasUpdated && matchId) {
          try {
            await axios.get(
              `${import.meta.env.VITE_FLOW_MRDIA_API}/api/countdown/${matchId}`
            );
            setHasUpdated(true); // prevent duplicate API call
          } catch (err) {
            console.error("Failed to update countdown in backend:", err);
          }
        }

        clearInterval(timer);
        return null;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    // Initial countdown check
    calculateCountdown().then((initialCountdown) => {
      setCountdown(initialCountdown);
    });

    // Timer for updates
    timer = setInterval(async () => {
      const updatedCountdown = await calculateCountdown();
      setCountdown(updatedCountdown);
    }, 1000);

    return () => clearInterval(timer);
  }, [matchTime, matchDate, matchId, hasUpdated]);

  return (
    <div className="w-full">
      {!isLive && countdown && (
        <div className="bg-[var(--primary)] text-white p-3 rounded-lg text-center mb-4">
          <h3 className="font-bold text-lg mb-2">Match Starts In:</h3>
          <div className="flex justify-center gap-4">
            {countdown.days > 0 && (
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">{countdown.days}</span>
                <span className="text-xs">Days</span>
              </div>
            )}
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">{countdown.hours}</span>
              <span className="text-xs">Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">{countdown.minutes}</span>
              <span className="text-xs">Minutes</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">{countdown.seconds}</span>
              <span className="text-xs">Seconds</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchCountdown;
