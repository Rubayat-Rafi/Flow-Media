import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import SportsNav from "../../components/SportsNav/SportsNav";
import MainContent from "../../components/MianContent/MainContent";
import { AllChannels } from "../../components/AllChennels/AllChannels";
import { useDispatch, useSelector } from "react-redux";
import { addVideoFlag, addUrl } from "../../utils/redux/slices/slice";
const Home = () => {
  const { hideVideoFlag } = useSelector((state) => state?.Slice);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("Channel");
  const category = (selectCategory) => {
    setSelectedCategory(selectCategory);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <section>
      <SportsNav onSelectCategory={category} />
      <div className="max-w-[1440px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 flex flex-col md:flex-row gap-4 my-10">
        {/* sidebar content */}
        <div className="w-2/6 max-md:w-full">
          <Sidebar sidebarContent={selectedCategory} channels={AllChannels} />
        </div>

        <div
          className={`${
            !hideVideoFlag ? " max-md:hidden" : " max-md:block"
          }  w-4/6  max-md:w-full max-md:fixed z-50 max-md:bg-slate-800/80 top-0 left-0 bottom-0 right-0 max-md:flex max-md:items-center max-md:justify-center`}
        >
          <div className="  relative h-full w-full  flex items-center justify-center">
            <button
              onClick={() => {
                dispatch(addVideoFlag(false)), dispatch(addUrl(""));
              }}
              className=" md:hidden absolute right-5 top-5 px-5 py-1 rounded-md cursor-pointer hover:bg-orange-600"
            >
              cancel
            </button>
            <MainContent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
