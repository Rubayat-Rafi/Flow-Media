import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUrl, addVideoFlag } from "../../utils/redux/slices/slice";
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
    <aside className="bg-[var(--secondary)] h-[500px] overflow-y-scroll rounded-md shadow-lg overflow-hidden p-3">
      <p className="text-lg font-semibold mb-2">
        {sidebarContent ?? "None selected"}
      </p>
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
          <p className="text-sm text-gray-400">No channels found.</p>
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
    <div className="border-b py-2 flex items-center justify-between gap-3">
      <div className="h-6 overflow-hidden">
        <img
          src={ch?.channelLogo}
          alt={ch?.channelName}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="font-medium text-sm">{ch?.channelName}</h3>
      {/* <div className="">
        {isTopLive && (
          <p className="text-[10px] text-green-400 font-semibold">
            LIVE from other category
          </p>
        )}
      </div> */}

      <button
        onClick={() => {
          setActiveChannel(ch);
          dispatch(addUrl(ch?.channelURL));
          dispatch(addVideoFlag(true));
        }}
        className={`${
          isActive && url !== ""
            ? "bg-red-500 text-[var(--text)]"
            : "bg-[var(--primary)]"
        } cursor-pointer px-3 py-1.5 rounded-md text-[var(--background)] font-medium text-sm transform duration-300 ease-linear`}
      >
        {isActive && url !== "" ? (
          <div className="relative flex items-center justify-center">
            Watching
            <span className="loading loading-ring loading-xl absolute"></span>
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
  isTopLive,
}) => (
  <div className=" rounded-md hover:border hover:border-orange-500 bg-slate-800 p-2">
    <h1 className=" text-xl text-orange-600 mb-2">
      {new Date(ch?.matchDate).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })}
    </h1>
    <div className="  flex  justify-between gap-2">
      <div className="flex-1">
        <div className="font-medium text-sm flex items-center gap-2">
          <h1>Shedule for:</h1>
          <h1>{convertMatchTimeByTimeZone(ch?.matchTime, timeZone)}</h1>
        </div>
        <div className=" space-y-2 mt-2">
          <div className=" flex items-center gap-3">
            <img className="h-8" src={ch?.team1Image} alt="" />
            <h4>Marcus</h4>
          </div>
          <div className=" flex items-center gap-5">
            <img className=" h-8" src={ch?.team2Image} alt="" />
            <h4>Marcus</h4>
          </div>
        </div>
        {isTopLive && (
          <p className="text-[10px] text-green-400 font-semibold">
            LIVE from other category
          </p>
        )}
      </div>

      <button
        onClick={() => {
          setActiveChannel(ch);
          dispatch(addUrl(ch?.matchUrl));
          dispatch(addVideoFlag(true));
        }}
        className={`${
          isActive && url !== ""
            ? "bg-red-500 text-[var(--text)]"
            : "bg-[var(--primary)]"
        } cursor-pointer px-3 py-1.5 rounded-md text-[var(--background)] font-medium text-sm transform duration-300 ease-linear`}
      >
        {isActive && url !== "" ? (
          <div className="relative flex items-center justify-center">
            Watching
            <span className="loading loading-ring loading-xl absolute"></span>
          </div>
        ) : (
          "Watch"
        )}
      </button>
    </div>
  </div>
);

export default Sidebar;
