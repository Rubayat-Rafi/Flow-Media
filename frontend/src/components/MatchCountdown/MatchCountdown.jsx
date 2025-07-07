// import { useEffect, useState } from "react";
// import { MdOutlineAccessTime } from "react-icons/md";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { convertMatchTimeByTimeZone } from "../TimeZone/convertMatchTimeByTimeZone";
// const MatchCountdown = ({ matchTime, matchDate, matchId }) => {
//   const [countdown, setCountdown] = useState(null);
//   const [isLive, setIsLive] = useState(false);
//   const [hasUpdated, setHasUpdated] = useState(false);
//   const { events,timeZone } = useSelector((state) => state?.Slice);

//   useEffect(() => {
//     let timer;

//     const calculateCountdown = async () => {
//       let [hour, minute] = matchTime.split(":").map(Number);
//       let date = new Date(matchDate);

//       // Handle "24:00" case
//       if (hour === 24) {
//         date.setDate(date.getDate() + 1);
//         hour = 0;
//       }

//       date.setHours(hour);
//       date.setMinutes(minute);
//       date.setSeconds(0);

//       const matchStart = date.getTime();
//       const now = new Date().getTime();
//       const diff = matchStart - now;

//       if (diff <= 0) {
//         setIsLive(true);

//         // ✅ API call when countdown ends
//         if (!hasUpdated && matchId) {
//           try {
//             await axios.get(
//               `${import.meta.env.VITE_FLOW_MRDIA_API}/api/countdown/${matchId}`
//             );
//             setHasUpdated(true);
//           } catch (err) {
//             console.error("Failed to update countdown in backend:", err);
//           }
//         }

//         clearInterval(timer);
//         return null;
//       }

//       const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//       const hours = Math.floor(
//         (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//       );
//       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//       return { days, hours, minutes, seconds };
//     };

//     // Initial countdown check
//     calculateCountdown().then((initialCountdown) => {
//       setCountdown(initialCountdown);
//     });

//     // Timer for updates
//     timer = setInterval(async () => {
//       const updatedCountdown = await calculateCountdown();
//       setCountdown(updatedCountdown);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [matchTime, matchDate, matchId, hasUpdated]);

//   return (
//     <div className="w-full max-h-[600px] h-full flex items-center justify-center relative overflow-hidden">
//       {/* Background Image with Overlay */}
//       <div className="absolute inset-0 z-0">
//         <img
//           src="/count-down-bg.jpg" // Replace with your image path
//           alt="Stadium background"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/70"></div>
//         {/* Dark overlay */}
//       </div>

//       {/* Countdown Content */}
//       {!isLive && countdown && (
//         <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-white p-6 rounded-lg text-center">
//           <h3 className="font-bold text-2xl md:text-3xl mb-4">
//             {events.category}
//           </h3>

//           <div className="flex flex-col items-center w-full">
//             {/* Teams and VS section */}
//             <div className="flex items-center justify-center gap-8 md:gap-16 w-full mb-8">
//               {/* Team A */}
//               <div className="flex flex-col items-center">
//                 <img
//                   src={events.team1Image}
//                   alt={events.teamA}
//                   className="w-24 h-24 md:w-32 md:h-32 object-contain mb-2"
//                 />
//                 <h4 className="text-xl font-semibold">{events?.teamA}</h4>
//               </div>

//               {/* VS separator */}
//               <div className="flex flex-col items-center justify-center">
//                 <p className="text-4xl font-bold my-4">VS</p>

//                 {/* Countdown days */}
//                 {countdown.days > 0 && (
//                   <div className="mb-4">
//                     <span className="text-3xl md:text-4xl font-bold">
//                       {countdown.days} Days
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Team B */}
//               <div className="flex flex-col items-center">
//                 <img
//                   src={events.team2Image}
//                   alt={events.teamB}
//                   className="w-24 h-24 md:w-32 md:h-32 object-contain mb-2"
//                 />
//                 <h4 className="text-xl font-semibold">{events?.teamB}</h4>{" "}
//                 {/* Fixed: was showing teamA */}
//               </div>
//             </div>

//             {/* Time and Date section - now properly centered */}
//             <div className="flex flex-col items-center space-y-4 w-full">
//               {/* Timer */}
//               <div className="flex items-center justify-center gap-1 bg-[var(--primary)]/30 rounded-full px-6 py-2 backdrop-blur-sm">
//                 <MdOutlineAccessTime className="text-white text-xl" />
//                 <span className="font-semibold text-white">
//                   {countdown.hours.toString().padStart(2, "0")}
//                 </span>
//                 <span className="text-white">:</span>
//                 <span className="font-semibold text-white">
//                   {countdown.minutes.toString().padStart(2, "0")}
//                 </span>
//                 <span className="text-white">:</span>
//                 <span className="font-semibold text-white">
//                   {countdown.seconds.toString().padStart(2, "0")}
//                 </span>
//               </div>

//               {/* Date */}
//               <p className="text-xl font-semibold">
//                 {new Date(events?.matchDate).toLocaleDateString("en-US", {
//                   weekday: "long",
//                   month: "long",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MatchCountdown;

import { useEffect, useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";
import { convertMatchTimeByTimeZone } from "../TimeZone/convertMatchTimeByTimeZone";

const MatchCountdown = ({ matchTime, matchDate, matchId }) => {
  const [countdown, setCountdown] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [hasUpdated, setHasUpdated] = useState(false);
  const { events, timeZone } = useSelector((state) => state?.Slice);

  useEffect(() => {
    let timer;

    const calculateCountdown = async () => {
      if (!matchTime || !matchDate || !timeZone) return;

      const [hour, minute] = matchTime.split(":").map(Number);
      const [year, month, day] = matchDate.split("-").map(Number); // "YYYY-MM-DD"
      const matchStartUTC = Date.UTC(year, month - 1, day, hour, minute, 0);

      // Extract GMT offset from string (e.g., GMT+6 or GMT-5)
      const offsetMatch = timeZone.match(/GMT([+-]?\d+)/);
      const gmtOffset = offsetMatch ? parseInt(offsetMatch[1], 10) : 0;

      // Get current time in selected timezone
      const nowUTC = Date.now();
      const nowInSelectedZone = nowUTC + gmtOffset * 60 * 60 * 1000;

      // Time difference
      const diff = matchStartUTC - nowInSelectedZone;

      if (diff <= 0) {
        setIsLive(true);

        if (!hasUpdated && matchId) {
          try {
            await axios.get(
              `${import.meta.env.VITE_FLOW_MRDIA_API}/api/countdown/${matchId}`
            );
            setHasUpdated(true);
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

    // Initial countdown setup
    calculateCountdown().then((initialCountdown) => {
      setCountdown(initialCountdown);
    });

    // Timer for updates
    timer = setInterval(async () => {
      const updatedCountdown = await calculateCountdown();
      setCountdown(updatedCountdown);
    }, 1000);

    return () => clearInterval(timer);
  }, [matchTime, matchDate, matchId, hasUpdated, timeZone]);

  return (
    <div className="w-full max-h-[600px] h-full flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/count-down-bg.jpg"
          alt="Stadium background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Countdown Content */}
      {!isLive && countdown && (
        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-white p-6 rounded-lg text-center">
          <h3 className="font-bold text-2xl md:text-3xl mb-4">
            {events?.category}
          </h3>

          <div className="flex flex-col items-center w-full">
            {/* Teams */}
            <div className="flex items-center justify-center gap-8 md:gap-16 w-full mb-8">
              <div className="flex flex-col items-center">
                <img
                  src={events?.team1Image}
                  alt={events?.teamA}
                  className="w-24 h-24 md:w-32 md:h-32 object-contain mb-2"
                />
                <h4 className="text-xl font-semibold">{events?.teamA}</h4>
              </div>

              <div className="flex flex-col items-center justify-center">
                <p className="text-4xl font-bold my-4">VS</p>
                {countdown.days > 0 && (
                  <div className="mb-4">
                    <span className="text-3xl md:text-4xl font-bold">
                      {countdown.days} Days
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center">
                <img
                  src={events?.team2Image}
                  alt={events?.teamB}
                  className="w-24 h-24 md:w-32 md:h-32 object-contain mb-2"
                />
                <h4 className="text-xl font-semibold">{events?.teamB}</h4>
              </div>
            </div>

            {/* Time and Date */}
            <div className="flex flex-col items-center space-y-4 w-full">
              {/* Timer */}
              <div className="flex items-center justify-center gap-1 bg-[var(--primary)]/30 rounded-full px-6 py-2 backdrop-blur-sm">
                <MdOutlineAccessTime className="text-white text-xl" />
                <span className="font-semibold text-white">
                  {countdown.hours.toString().padStart(2, "0")}
                </span>
                <span className="text-white">:</span>
                <span className="font-semibold text-white">
                  {countdown.minutes.toString().padStart(2, "0")}
                </span>
                <span className="text-white">:</span>
                <span className="font-semibold text-white">
                  {countdown.seconds.toString().padStart(2, "0")}
                </span>
              </div>

              {/* Date */}
              <p className="text-xl font-semibold">
                {new Date(events?.matchDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchCountdown;
