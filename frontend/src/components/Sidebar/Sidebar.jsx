import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUrl } from "../../utils/redux/slices/slice";
import { useNavigate } from "react-router";
const Sidebar = ({ sidebarContent, channels }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <aside className="bg-[var(--secondary)] rounded-md shadow-lg h-full overflow-hidden">
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
                setTimeout(()=>{
                  navigate("/login")
                },5000)
              }}
              className="bg-orange-500 px-2 py-1 rounded-lg"
            >
              {activeIndex === idx ? "Watching..." : "Watch"}
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
