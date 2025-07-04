import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { GetCategory } from "../../utils/get_searchParams/ger_searchParams";
import {
  addEvents,
  addUrl,
  addVideoFlag,
} from "../../utils/redux/slices/slice";
import { convertMatchTimeByTimeZone } from "../TimeZone/convertMatchTimeByTimeZone";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = ({ sidebarContent, channels }) => {
  const { user } = useAuth();
  const { url, timeZone } = useSelector((state) => state?.Slice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeChannel, setActiveChannel] = useState(null);
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("q");
  const catAndevent = GetCategory(categoryData);
  const urlName = catAndevent?.eventName;
  const filteredChannels = channels?.filter(
    (ch) => ch.category === sidebarContent
  );
  const isActiveOutside =
    activeChannel && activeChannel.category !== sidebarContent;

  const allChannelsToShow = [
    ...(isActiveOutside ? [activeChannel] : []),
    ...filteredChannels,
  ];

  return (
    <aside className="bg-[var(--secondary)] max-h-[600px]  overflow-y-scroll rounded-md shadow-lg overflow-hidden h-full p-3 border border-[var(--text)]/10">
      <div className="space-y-3">
        {allChannelsToShow?.length > 0 ? (
          allChannelsToShow.map((ch, idx) =>
            ch.category === "Channel" ? (
              <ChannelCard
                key={idx}
                ch={ch}
                index={idx}
                setActiveChannel={setActiveChannel}
                dispatch={dispatch}
                url={url}
                navigate={navigate}
                urlName={urlName}
                user={user}
                categoryData={categoryData}
              />
            ) : (
              <SheduleCard
                key={idx}
                ch={ch}
                setActiveChannel={setActiveChannel}
                dispatch={dispatch}
                url={url}
                timeZone={timeZone}
                navigate={navigate}
                urlName={urlName}
              />
            )
          )
        ) : (
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
  urlName,
  setActiveChannel,
  dispatch,
  url,
  index,
  navigate,
  categoryData,
  user,
}) => {
  const isWatching = url === ch?.channelURL || ch?.channelName === urlName;
  return (
    <div className="">
      <div
        className={`border-b-2 py-4 flex items-center justify-between gap-3 p-3 rounded-md transition-all duration-300 ease-in-out ${
          isWatching || (categoryData === undefined && index === 0 && user)
            ? "border-[var(--primary)] " // Active state
            : "border-[var(--text)]/20 hover:border-[var(--primary)]" // Inactive state
        }`}
      >
        <div className="space-x-3 flex items-center">
          <div className="h-8 w-8">
            <img
              src={ch?.channelLogo}
              alt={ch?.channelName}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-medium text-sm">{ch?.channelName}</h3>
        </div>
        <button
          onClick={() => {
            setActiveChannel(ch);
            dispatch(addVideoFlag(true));
            dispatch(addUrl(ch?.channelURL));
            dispatch(addEvents(ch));
            navigate(`/?q=${ch.category}+${ch?.channelName}`);
          }}
          className={`${
            isWatching || (categoryData === undefined && index === 0 && user)
              ? "bg-red-500 text-[var(--text)]"
              : "bg-[var(--primary)]"
          } cursor-pointer px-2 py-1 rounded-md text-[var(--background)] font-medium text-xs transition duration-300`}
        >
          {isWatching || (categoryData === undefined && index === 0 && user)
            ? "Watching"
            : "Watch"}
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
  urlName,
}) => {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const checkLiveStatus = () => {
      const matchDateTime = `${ch?.matchDate}T${ch?.matchTime}`;
      const matchStart = new Date(matchDateTime).getTime();
      const now = new Date().getTime();
      setIsLive(now >= matchStart);
    };

    // Check immediately
    checkLiveStatus();

    // Set up interval to check every minute
    const interval = setInterval(checkLiveStatus, 60000);

    return () => clearInterval(interval);
  }, [ch?.matchTime, ch?.matchDate]);

  const isWatching = url === ch?.matchUrl || ch?._id === urlName;
  return (
    <div className="space-y-2">
      <p className="text-[var(--primary)] pl-3">
        {new Date(ch?.matchDate).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div
        className={`flex flex-col gap-2 border p-3 rounded-md transition-all duration-300 ease-in-out ${
          isWatching
            ? "border-[var(--primary)] border-2 "
            : "border-[var(--background)] hover:border-[var(--primary)]"
        }`}
      >
        <div className="flex justify-between">
          <div className="font-medium text-xs flex items-center gap-2">
            {isLive ? (
              <>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-green-500">Live</span>
              </>
            ) : (
              <>
                <span>Schedule for</span>
                <span>
                  {convertMatchTimeByTimeZone(ch?.matchTime, timeZone)}
                </span>
              </>
            )}
          </div>
          <button
            onClick={() => {
              setActiveChannel(ch);
              dispatch(addVideoFlag(true));
              dispatch(addUrl(ch?.matchUrl));
              dispatch(addEvents(ch));
              navigate(`/?q=${ch.category}+${ch?._id}`);
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

        <div className="space-y-2 mt-2">
          <div className="flex items-center gap-2">
            <img
              className="h-8 w-8 object-cover"
              src={ch?.team1Image}
              alt={ch?.teamA || "Team 1"}
            />
            <h4>{ch?.teamA}</h4>
          </div>
          <div className="flex items-center gap-2">
            <img
              className="h-8 w-8 object-cover"
              src={ch?.team2Image}
              alt={ch?.teamB || "Team 2"}
            />
            <h4>{ch?.teamB}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
