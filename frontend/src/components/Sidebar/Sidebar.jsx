import channels from "../../data/chennels";
import { useState } from "react";
const Sidebar = ({sidebarContent}) => {

    console.log('sidebarContent:', sidebarContent);

  const [currentChannel, setCurrentChannel] = useState(channels[0]);


    return (
    <aside className='bg-[var(--secondary)] p-4 rounded-md shadow-lg h-full'>
      <h2 className="font-bold text-white mb-2">Selected Category:</h2>
      <p>{sidebarContent ?? "None selected"}</p>
      <div className="">
          {
            channels?.map((ch,idx)=>(
          <button
            key={idx}
            className={`block w-full p-2 rounded ${
              currentChannel.name === ch.name
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setCurrentChannel(ch)}
          >
            {ch.name}
          </button>
            ))
          }
      </div>
    </aside>
    );
};

export default Sidebar;