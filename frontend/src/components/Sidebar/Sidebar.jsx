import WatchBtn from "../ui/btns/WatchBtn";
const Sidebar = ({ sidebarContent, channels }) => {
  return (
    <aside className="bg-[var(--secondary)] rounded-md shadow-lg h-full overflow-hidden">
      <p>{sidebarContent ?? "None selected"}</p>
      <div className="space-y-3">
        {channels?.map((ch, idx) => (
          <div
            key={idx}
            className="py-2 px-4 flex items-center justify-between hover:bg-gray-600 transition-colors duration-300 ease-in-out cursor-pointer"
          >
            <div className="h-[25px] w-auto">
              <img className="w-full h-full" src={ch.logo} alt="logo" />
            </div>
            <h3 className="text-start font-semibold ">{ch.name}</h3>
            <WatchBtn />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
