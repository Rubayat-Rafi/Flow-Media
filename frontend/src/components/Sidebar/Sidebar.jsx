import WatchBtn from "../ui/btns/WatchBtn";
const Sidebar = ({ sidebarContent,channels }) => {

  return (
    <aside className="bg-[var(--secondary)] p-4 rounded-md shadow-lg h-full">
      <h2 className="font-bold text-white mb-2">Selected Category:</h2>
      <p>{sidebarContent ?? "None selected"}</p>

      <div className=" space-y-3">
        {channels?.map((ch, idx) => (
          <div
            key={idx}
            className=" border-b py-2 flex items-center justify-between"
          >
            <h1>{ch?.logo}</h1>
            <h1>{ch.name}</h1>
            <WatchBtn />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
