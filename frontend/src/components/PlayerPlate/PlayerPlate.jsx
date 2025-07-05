import { useSelector } from "react-redux";
import HlsPlayer from "../HlsPlayer/HlsPlayer";
import MatchCountdown from "../MatchCountdown/MatchCountdown";
const PlayerPlate = ({ user, trialActive, trialTimeLeft, hlsSrc }) => {
  const { events } = useSelector((state) => state?.Slice);
  return (
    <div className="h-full relative">
      <div className=" max-lg:hidden bg-[var(--background)] px-4 py-2 inline-flex rounded-t-md gap-2 items-center border-t border-x border-[var(--primary)]">
        <div className="inline-grid *:[grid-area:1/1]">
          <div className="status status-lg status-error animate-ping bg-red-500"></div>
          <div className="status status-lg status-error bg-red-600"></div>
        </div>
        <div className="font-semibold max-lg:text-sm">
          {events?.category === "Channel" ? (
            <p>{events?.channelName}</p>
          ) : (
            <p>Live</p>
          )}
        </div>
      </div>

      {/* Add the countdown component */}
      {/* {events?.matchTime && events?.matchDate && (
          <MatchCountdown
            matchTime={events.matchTime}
            matchDate={events.matchDate}
          />
        )} */}

      {/* trail timer  */}
      {!user && trialActive && (
        <div className="absolute bg-red-600 text-[var(--bakground)] text-xs lg:text-sm inline-flex p-1 rounded right-2 top-2 lg:top-12 z-10 w-6 h-6 lg:w-10 lg:h-10  items-center justify-center">
          {trialTimeLeft}s
        </div>
      )}

      <HlsPlayer src={hlsSrc} />
    </div>
  );
};

export default PlayerPlate;
