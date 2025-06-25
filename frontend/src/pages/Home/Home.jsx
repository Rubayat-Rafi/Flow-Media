import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import SportsNav from "../../components/SportsNav/SportsNav";
import MainContent from "../../components/MianContent/MainContent";
import { m3u8FilesArray } from "../../components/M3u8Files/M3u8Files";
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("Channel");
  const category = (selectCategory) => {
    setSelectedCategory(selectCategory);
    console.log("Seelected Category:", selectCategory);
  };

  return (
    <section>
      <SportsNav onSelectCategory={category} />
      <div className="max-w-[1440px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 flex flex-col md:flex-row gap-4 my-10 min-h-[calc(100vh-372px)]">
        {/* sidebar content */}
        <div className=" w-2/6 max-md:w-full ">
          <Sidebar
            sidebarContent={selectedCategory}
            channels={m3u8FilesArray}
          />
        </div>
        {/* main content */}
        <div className=" w-4/6 max-md:w-full ">
          <MainContent />
        </div>
      </div>
    </section>
  );
};

export default Home;
