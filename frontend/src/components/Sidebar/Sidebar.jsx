import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUrl } from "../../utils/redux/slices/slice";
import { useNavigate } from "react-router";
import { addVideoFlag } from "../../utils/redux/slices/slice";
const Sidebar = ({ sidebarContent, channels }) => {
  const { url } = useSelector((state) => state?.Slice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <aside className="bg-[var(--secondary)] h-[500px] overflow-y-scroll rounded-md shadow-lg  overflow-hidden">
      <p>{sidebarContent ?? "None selected"}</p>
      <div className="space-y-3">
        {channels?.map((ch, idx) => (
          <div
            key={idx}
            className="border-b py-2 flex items-center justify-between"
          >
            <h1>{ch?.logo}</h1>
            <h1>{ch.name}</h1>
            <button
              onClick={() => {
                setActiveIndex(idx);
                dispatch(addUrl(ch?.url));
                dispatch(addVideoFlag(true));

                // setTimeout(()=>{
                //   navigate("/login")
                // },5000)
              }}
              className={` ${
                activeIndex === idx && url !== ""
                  ? " bg-red-600"
                  : "bg-orange-500"
              } w-20 px-2 py-1 rounded-lg`}
            >
              {activeIndex === idx && url !== "" ? (
                <div className=" relative flex items-center justify-center">
                  live
                   <span class="loading loading-ring loading-xl absolute"></span>
                </div>
               
              ) : (
                "Watch"
              )}
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
