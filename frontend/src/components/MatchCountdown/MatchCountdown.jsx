import { useEffect, useState } from "react";

const MatchCountdown = ({ matchTime, matchDate }) => {


  const [countdown, setCountdown] = useState(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const calculateCountdown = () => {
      // Combine date and time into a single datetime string
      const matchDateTime = `${matchDate}T${matchTime}:00`;
      const matchStart = new Date(matchDateTime).getTime();
      const now = new Date().getTime();
      const diff = matchStart - now;

      if (diff <= 0) {
        setIsLive(true);
        return null;
      }

      // Calculate days, hours, minutes, seconds
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    // Update immediately
    setCountdown(calculateCountdown());

    // Update every second
    const timer = setInterval(() => {
      const result = calculateCountdown();
      setCountdown(result);
      if (result === null) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [matchTime, matchDate]);


  if (!countdown) return null;

  return (
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
  );
};


export default MatchCountdown;