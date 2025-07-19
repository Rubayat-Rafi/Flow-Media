import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import toast from "react-hot-toast";
import {
  addEvents,
  addUrl,
  addVideoFlag,
} from "../../utils/redux/slices/slice";
import { convertMatchTimeByTimeZone } from "../TimeZone/ConvertMatchTimeByTimeZone";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = ({ channels }) => {
  const { user } = useAuth();
  const { url, timeZone } = useSelector((state) => state?.Slice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeChannel, setActiveChannel] = useState(null);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("q");
  const categoryId = searchParams.get("id");
  const event_name = categoryId || null;
  const cat = category || "Channel";

  const filteredChannels = channels?.filter((ch) => ch.category === cat);

  const activeIsChannel =
    activeChannel &&
    activeChannel.category === "Channel" &&
    activeChannel.category !== cat;

  const activeIsSchedule =
    activeChannel &&
    activeChannel.category !== "Channel" &&
    activeChannel.category !== cat;

  const allChannelsToShow = [...filteredChannels];
  const groupedMatches =
    cat !== "Channel"
      ? Object.entries(
          allChannelsToShow.reduce((acc, match) => {
            const date = match.matchDate;
            if (!acc[date]) acc[date] = [];
            acc[date].push(match);
            return acc;
          }, {})
        ).sort(([a], [b]) => new Date(a) - new Date(b))
      : [];

  return (
    <aside className="bg-[var(--secondary)] h-full max-h-[500px]  md:max-h-[600px] overflow-y-scroll rounded-md shadow-lg overflow-hidden p-3 border border-[var(--text)]/10">
      <div className="space-y-3">
        {/* Show active channel card on top even outside of current category */}
        {activeIsChannel && (
          <ChannelCard
            ch={activeChannel}
            index={-1}
            setActiveChannel={setActiveChannel}
            dispatch={dispatch}
            navigate={navigate}
            user={user}
            categoryId={categoryId}
            category={category}
          />
        )}

        {/* Show active schedule card on top even outside of current category */}
        {activeIsSchedule && (
          <SheduleCard
            ch={activeChannel}
            setActiveChannel={setActiveChannel}
            dispatch={dispatch}
            url={url}
            timeZone={timeZone}
            navigate={navigate}
            event_name={event_name}
            user={user}
          />
        )}

        {/* Render all channels */}
        {cat === "Channel" &&
          allChannelsToShow.map((ch, idx) => (
            <ChannelCard
              key={ch._id || idx}
              ch={ch}
              index={idx}
              setActiveChannel={setActiveChannel}
              dispatch={dispatch}
              navigate={navigate}
              user={user}
              categoryId={categoryId}
              category={category}
            />
          ))}

        {/* Render grouped schedule matches */}
        {cat !== "Channel" &&
          groupedMatches.map(([date, matches]) => (
            <div key={date} className="space-y-2">
              <p className="text-[var(--primary)] pl-3 text-sm font-semibold">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <div className="space-y-3">
                {matches.map((ch, idx) => (
                  <SheduleCard
                    key={ch._id || idx}
                    ch={ch}
                    setActiveChannel={setActiveChannel}
                    dispatch={dispatch}
                    url={url}
                    timeZone={timeZone}
                    navigate={navigate}
                    event_name={event_name}
                    user={user}
                  />
                ))}
              </div>
            </div>
          ))}

        {allChannelsToShow?.length === 0 && (
          <div className="flex items-center flex-col text-center justify-center py-6">
            <h6 className="text-base font-semibold text-gray-400">
              There are no events today
            </h6>
            <p className="text-xs text-gray-400">
              Come back tomorrow or pick another sport
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

const ChannelCard = ({
  ch,
  setActiveChannel,
  dispatch,
  index,
  navigate,
  categoryId,
  category,
  user,
}) => {
  return (
    <div>
      <div
        className={`border-b-2 py-4 flex items-center justify-between gap-3 p-3 rounded-md transition-all duration-300 ease-in-out
          ${
            !category && !categoryId && index === 0
              ? "border-[var(--primary)]"
              : ch?._id === categoryId
              ? "border-[var(--primary)]"
              : "border-[var(--text)]/20 hover:border-[var(--primary)]"
          }
        `}
      >
        <div className="space-x-3 flex items-center">
          <div className="h-8 w-8">
            {ch?.channelLogo ? (
              <img
                src={ch?.channelLogo}
                alt={ch?.channelName}
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded">No Logo</div>
            )}
          </div>
          <h3 className="font-medium text-sm">{ch?.channelName}</h3>
        </div>
        <button
          onClick={() => {
            setActiveChannel(ch);
            dispatch(addVideoFlag(true));
            dispatch(addUrl(ch?.channelURL));
            dispatch(addEvents(ch));
            navigate(`/?q=${ch.category}&id=${ch?._id}`);
            !user &&
              toast.error("Login for full access!", {
                style: {
                  background: "red",
                  color: "#fff",
                },
                position: "bottom-center",
              });
          }}
          className={`${
            !category && !categoryId && index === 0
              ? "bg-red-500 text-[var(--text)]"
              : ch?._id === categoryId
              ? "bg-red-500 text-[var(--text)]"
              : "bg-[var(--primary)]"
          } cursor-pointer px-2 py-1 rounded-md text-[var(--background)] font-medium text-xs transition duration-300`}
        >
          {!category && !categoryId && index === 0
            ? "watching"
            : ch?._id === categoryId
            ? "Watching"
            : "watch"}
        </button>
      </div>
    </div>
  );
};

const SheduleCard = ({
  ch,
  setActiveChannel,
  dispatch,
  url,
  timeZone,
  navigate,
  event_name,
  user,
}) => {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const checkLiveStatus = () => {
      const currentTimeUTC = new Date();
      const matchStartTime = new Date(ch?.targetDate || null);
      setIsLive(currentTimeUTC >= matchStartTime);
    };

    checkLiveStatus();
    const interval = setInterval(checkLiveStatus, 60000);

    return () => clearInterval(interval);
  }, [ch?.matchTime, ch?.matchDate]);

  const isWatching = url === ch?.matchUrl || ch?._id === event_name;

  return (
    <div
      className={`flex flex-col gap-2 border p-3 rounded-md transition-all duration-300 ease-in-out ${
        isWatching
          ? "border-[var(--primary)] border-2"
          : "border-[var(--background)] hover:border-[var(--primary)]"
      }`}
    >
      <div>
        {ch?.eventName && (
          <h5 className="mb-2 font-semibold">{ch?.eventName}</h5>
        )}
        <div className="flex justify-between items-center">
          <div className="font-medium text-xs flex items-center gap-2">
            {!isLive ? (
              <>
                <span>Schedule for</span>
                <span>
                  {ch?.targetDate
                    ? convertMatchTimeByTimeZone(ch.targetDate, timeZone)
                    : "Time not set"}
                </span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-green-500">Live</span>
              </>
            )}
          </div>
          <button
            onClick={() => {
              if (!user) {
                toast.error("Login for full access!", {
                  style: {
                    background: "red",
                    color: "#fff",
                  },
                  position: "bottom-center",
                });
              } else {
                setActiveChannel(ch);
                dispatch(addVideoFlag(true));
                dispatch(addUrl(ch?.matchUrl));
                dispatch(addEvents(ch));
                navigate(`/?q=${ch.category}&id=${ch?._id}`);
              }
            }}
            className={`${
              isWatching
                ? "bg-red-500 text-[var(--text)]"
                : "bg-[var(--primary)]"
            } cursor-pointer px-2 py-1 rounded-md text-[var(--background)] font-medium text-xs transition duration-300`}
          >
            {isWatching ? "Watching" : "Watch"}
          </button>
        </div>
      </div>

      <div className="space-y-2 mt-2">
        <div className="flex items-center gap-2">
          <img
            className="h-8 w-8 object-cover rounded"
            src={ch?.team1Image}
            alt={ch?.teamA || "Team 1"}
          />
          <h4>{ch?.teamA}</h4>
        </div>
        <div className="flex items-center gap-2">
          <img
            className="h-8 w-8 object-cover rounded"
            src={ch?.team2Image}
            alt={ch?.teamB || "Team 2"}
          />
          <h4>{ch?.teamB}</h4>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
