import { useSelector } from "react-redux";
import HlsPlayer from "../HlsPlayer/HlsPlayer";
import MatchCountdown from "../MatchCountdown/MatchCountdown";

const PlayerPlate = ({ hlsSrc }) => {
  const { events, defaultUrl } = useSelector((state) => state?.Slice);
  console.log(events);
  return (
    <div className="h-full">
      <div className="max-lg:hidden bg-[var(--background)] px-4 py-2 inline-flex rounded-t-md gap-2 items-center border-t border-x border-[var(--primary)]">
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

      {events?.countdown === true &&
        events?.matchTime &&
        events?.matchDate &&
        events?.category !== "Channel" && (
          <MatchCountdown
            matchTime={events.matchTime}
            matchDate={events.matchDate}
            matchId={events?._id}
          />
        )}

      {events?.countdown === false &&
        events?.matchTime &&
        events?.matchDate &&
        events?.category !== "Channel" && <HlsPlayer src={hlsSrc?.match_url} />}
      {events?.category == "Channel" && <HlsPlayer src={hlsSrc?.channel_url} />}
      {events === null && <HlsPlayer src={defaultUrl} />}
    </div>
  );
};

export default PlayerPlate;
