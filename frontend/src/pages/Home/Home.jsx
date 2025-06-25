import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import SportsNav from "../../components/SportsNav/SportsNav";
import MainContent from "../../components/MianContent/MainContent";

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
        <div className="w-full  md:w-1/4 lg:w-1/5">
          <Sidebar sidebarContent={selectedCategory} />
        </div>
        {/* main content */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <MainContent />
        </div>
      </div>
    </section>
  );
};

export default Home;
