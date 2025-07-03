import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEvents,
  addUrl,
  addVideoFlag,
} from "../../utils/redux/slices/slice";
import { convertMatchTimeByTimeZone } from "../TimeZone/convertMatchTimeByTimeZone";
const Sidebar = ({ sidebarContent, channels }) => {
  const { url, timeZone } = useSelector((state) => state?.Slice);
  const dispatch = useDispatch();
  const [activeChannel, setActiveChannel] = useState(null);
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
    <aside className="bg-[var(--secondary)] max-h-[600px] overflow-y-scroll rounded-md shadow-lg overflow-hidden  p-3 border border-[var(--text)]/10">
      {/* <p className="text-lg font-semibold mb-2">
        {sidebarContent ?? "None selected"}
      </p> */}
      <div className="space-y-3">
        {allChannelsToShow?.length > 0 ? (
          allChannelsToShow.map((ch, idx) =>
            ch.category == "Channel" ? (
              <ChannelCard
                key={idx}
                ch={ch}
                idx={idx}
                isActive={activeChannel?.channelURL === ch?.channelURL}
                setActiveChannel={setActiveChannel}
                dispatch={dispatch}
                url={url}
                timeZone={timeZone}
                isTopLive={isActiveOutside && idx === 0}
              />
            ) : (
              <SheduleCard
                key={idx}
                ch={ch}
                idx={idx}
                isActive={activeChannel?.channelURL === ch?.channelURL}
                setActiveChannel={setActiveChannel}
                dispatch={dispatch}
                url={url}
                timeZone={timeZone}
                isTopLive={isActiveOutside && idx === 0}
              />
            )
          )
        ) : (
          <div className=" flex items-center flex-col text-center justify-center py-6">
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
  isActive,
  setActiveChannel,
  dispatch,
  url,
  // timeZone,
  // isTopLive,
}) => (
  <div className="">
    <div className="border-b-2 border-[var(--text)]/20 hover:border-[var(--primary)] py-4 flex items-center justify-between gap-3 bg-[var(--background)] hover:bg-[var(--secondary)]  p-3 rounded-md transition-transform duration-300 ease-in-out">
      <div className="space-x-3 flex items-center">
        <div className="h-8 w-8 ">
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
        }}
        className={`${
          isActive && url !== ""
            ? "bg-red-500 text-[var(--text)]"
            : "bg-[var(--primary)]"
        } cursor-pointer px-2 py-1 rounded-md text-[var(--background)] font-medium text-xs transform duration-300 ease-linear`}
      >
        {isActive && url !== "" ? (
          <div className="relative flex items-center justify-center">
            Watching
          </div>
        ) : (
          "Watch"
        )}
      </button>
    </div>
  </div>
);

const SheduleCard = ({
  ch,
  isActive,
  setActiveChannel,
  dispatch,
  url,
  timeZone,
}) => (
  <div className="space-y-2">
    <p className=" text-[var(--primary)] pl-3">
      {new Date(ch?.matchDate).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })}
    </p>

    <div className="flex flex-col gap-2 border border-[var(--background)] bg-[var(--background)] hover:border-[var(--primary)] p-3 rounded-md transition-transform duration-300 ease-linear">
      <div className="flex  justify-between">
        <div className="font-medium text-xs flex items-center gap-2">
          <span>Shedule for</span>
          <span>{convertMatchTimeByTimeZone(ch?.matchTime, timeZone)}</span>
        </div>
        <button
          onClick={() => {
            setActiveChannel(ch);
            dispatch(addVideoFlag(true));
            dispatch(addUrl(ch?.matchUrl));
            dispatch(addEvents(ch));
          }}
          className={`${
            isActive && url !== ""
              ? "bg-red-500 text-[var(--text)]"
              : "bg-[var(--primary)]"
          } cursor-pointer px-2 py-1 rounded-md text-[var(--background)] font-medium text-xs transform duration-300 ease-linear`}
        >
          {isActive && url !== "" ? (
            <div className="relative flex items-center justify-center">
              Watching
            </div>
          ) : (
            "Watch"
          )}
        </button>
      </div>

      <div className=" space-y-2 mt-2">
        <div className=" flex items-center gap-2">
          <img
            className="h-8 w-8 object-cover"
            src={ch?.team1Image}
            alt="image"
          />
          <h4>{ch?.teamA}</h4>
        </div>
        <div className=" flex items-center gap-2">
          <img
            className=" h-8 w-8  object-cover"
            src={ch?.team2Image}
            alt="image"
          />
          <h4>{ch?.teamB}</h4>
        </div>
      </div>
    </div>
  </div>
);

export default Sidebar;
