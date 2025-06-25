const Sidebar = ({ sidebarContent }) => {
  console.log("sidebarContent:", sidebarContent);
  return (
    <aside className="bg-[var(--secondary)] p-4 rounded-md shadow-lg h-full">
      <h2 className="font-bold text-white mb-2">Selected Category:</h2>
      <p>{sidebarContent ?? "None selected"}</p>
    </aside>
  );
};

export default Sidebar;
