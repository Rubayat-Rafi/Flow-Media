import { useEffect, useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import {
  convertMatchDateZone,
  convertMatchTimeByTimeZone,
} from "../TimeZone/ConvertMatchTimeByTimeZone";

const MatchCountdown = ({ matchId, targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [hasUpdated, setHasUpdated] = useState(false);
  const { events, timeZone } = useSelector((state) => state?.Slice);

  // Extract GMT offset from string (e.g., GMT+6 or GMT-5)
  const offsetMatch = timeZone?.match(/GMT([+-]?\d+)/);
  const gmtOffset = offsetMatch ? parseInt(offsetMatch[1], 10) : 0;

  // Countdown calculation
  const calculateTimeLeft = () => {
    const nowUTC = new Date();
    const currentGMTTime = new Date(
      nowUTC.getTime() + gmtOffset * 60 * 60 * 1000
    );

    const parts = targetDate.split(/[-T:]/);
    const target = new Date(
      Date.UTC(
        parts[0],
        parts[1] - 1,
        parts[2],
        parts[3],
        parts[4],
        parts[5] || 0
      )
    );

    const difference = target.getTime() - currentGMTTime.getTime();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  // useMutation for API call when countdown is done
  const { mutate: updateCountdown } = useMutation({
    mutationFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_FLOW_MRDIA_API}/api/countdown/${matchId}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.success) {
        setHasUpdated(true);
      }
    },
    onError: (err) => {
      console.error("Failed to update countdown:", err);
    },
  });

  // Countdown timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);

      if (!updated) {
        clearInterval(interval);

        if (!hasUpdated && matchId) {
          updateCountdown();
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [targetDate, gmtOffset, matchId, hasUpdated, updateCountdown]);

  if (!timeLeft) return null;

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div
      style={{ backgroundImage: "url('/count-bg.jpg')" }}
      className="w-full max-h-[600px] h-full flex items-center justify-center relative bg-cover bg-center"
    >
      {/* Background Image */}
      {/* <div className="absolute inset-0 z-0">
        <img
          src="/count-bg.jpg"
          alt="Stadium background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div> */}
        <div className="absolute inset-0 bg-black/70" />

      {/* Countdown Content */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-white p-6 rounded-lg text-center">
        <h3 className="font-bold text-2xl md:text-3xl">
          {events?.category}
        </h3>

        <div className="flex flex-col items-center w-full">
          <div className="flex items-center justify-center gap-8 md:gap-16 w-full mb-8">
            <div className="flex flex-col items-center">
              <img
                src={events?.team1Image}
                alt={events?.teamA}
                className="w-24 h-24 md:w-32 md:h-32 object-contain mb-2 bg-amber-200"
              />
              <h4 className="text-xl font-semibold">{events?.teamA}</h4>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="text-4xl font-bold my-4">VS</p>
              {days > 0 && (
                <div className="mb-4">
                  <span className="text-3xl md:text-4xl font-bold">
                  In  {days} Days
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center">
              <img
                src={events?.team2Image}
                alt={events?.teamB}
                className="w-24 h-24 md:w-32 md:h-32 object-contain mb-2 bg-amber-200"
              />
              <h4 className="text-xl font-semibold">{events?.teamB}</h4>
            </div>
          </div>

          {/* Timer and Date */}
          <div className="flex flex-col items-center space-y-4 w-full">
            <div className="flex items-center justify-center gap-1 bg-[var(--primary)]/30 rounded-full px-6 py-2 backdrop-blur-sm">
              <MdOutlineAccessTime className="text-white text-xl" />
              <span className="font-semibold text-white">
                {String(hours).padStart(2, "0")}
              </span>
              <span className="text-white">:</span>
              <span className="font-semibold text-white">
                {String(minutes).padStart(2, "0")}
              </span>
              <span className="text-white">:</span>
              <span className="font-semibold text-white">
                {String(seconds).padStart(2, "0")}
              </span>
            </div>

            <p className="text-xl font-semibold flex items-center gap-2">
              <span>{convertMatchDateZone(targetDate, timeZone)}</span>
              <span>{convertMatchTimeByTimeZone(targetDate, timeZone)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCountdown;
