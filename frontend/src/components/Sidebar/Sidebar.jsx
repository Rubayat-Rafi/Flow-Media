import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUrl, addVideoFlag } from "../../utils/redux/slices/slice";
import { useNavigate } from "react-router";

const Sidebar = ({ sidebarContent, channels }) => {
  const { url } = useSelector((state) => state?.Slice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  // Filtered channels
  const filteredChannels =
    sidebarContent === "Channel"
      ? channels
      : channels?.filter((ch) => ch.category === sidebarContent);

  return (
    <aside className="bg-[var(--secondary)] h-[500px] overflow-y-scroll rounded-md shadow-lg overflow-hidden p-3">
      <p className="text-lg font-semibold mb-2">
        {sidebarContent ?? "None selected"}
      </p>
      <div className="space-y-3">
        {filteredChannels?.length > 0 ? (
          filteredChannels.map((ch, idx) => (
            <ChannelCard
              key={idx}
              ch={ch}
              idx={idx}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              dispatch={dispatch}
              url={url}
            />
          ))
        ) : (
          <p className="text-sm text-gray-400">No channels found.</p>
        )}
      </div>
    </aside>
  );
};

const ChannelCard = ({ ch, idx, activeIndex, setActiveIndex, dispatch, url }) => (
  <div className="border-b py-2 flex items-center justify-between">
    <h1>{ch?.logo}</h1>
    <h1>{ch.name}</h1>
    <button
      onClick={() => {
        setActiveIndex(idx);
        dispatch(addUrl(ch?.url));
        dispatch(addVideoFlag(true));
        // Optional: navigate somewhere
        // setTimeout(() => navigate("/login"), 5000);
      }}
      className={`${
        activeIndex === idx && url !== "" ? "bg-red-600" : "bg-orange-500"
      } w-20 px-2 py-1 rounded-lg text-white font-medium`}
    >
      {activeIndex === idx && url !== "" ? (
        <div className="relative flex items-center justify-center">
          live
          <span className="loading loading-ring loading-xl absolute"></span>
        </div>
      ) : (
        "Watch"
      )}
    </button>
  </div>
);

export default Sidebar;
