import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import SportsNav from "../../components/SportsNav/SportsNav";
import MainContent from "../../components/MianContent/MainContent";
import { useDispatch, useSelector } from "react-redux";
import { addVideoFlag, addUrl } from "../../utils/redux/slices/slice";
import useCategory from "../../hooks/useCategory";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const Home = () => {
  const { hideVideoFlag } = useSelector((state) => state?.Slice);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("Channel");
  const [categorys, isLoading] = useCategory();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (!isMounted) return;

    const handleResize = () => {
      if (window.innerWidth < 768 && hideVideoFlag) {
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
  }, [hideVideoFlag, isMounted]);

  const category = (selectCategory) => {
    setSelectedCategory(selectCategory);
  };
  if (!isMounted || isLoading) {
    return <LoadingSpinner />;
  }
  return (
<section className="space-y-10 pb-10">
  <SportsNav onSelectCategory={category} />
  
  <div className="max-w-[1440px]  mx-auto px-4 md:px-10 xl:px-20 flex items-start flex-col-reverse lg:flex-row gap-6 ">
    {/* Sidebar - Full width on mobile, 25% on desktop */}
    <div className="w-full lg:w-1/4">
      <Sidebar sidebarContent={selectedCategory} channels={categorys} />
    </div>

    {/* Main content - Hidden on mobile when video is not playing */}
    <div className={`${!hideVideoFlag ? "hidden md:block" : "block"} 
        w-full lg:w-3/4 relative`}>
      
      {/* Video player area */}
      <div className="relative h-full w-full flex justify-center items-center">
        {/* Close button for mobile */}
        <button
          onClick={() => {
            dispatch(addVideoFlag(false));
            dispatch(addUrl(""));
          }}
          className="md:hidden absolute right-4 top-4 z-30 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
        >
          Close
        </button>
        
        <MainContent />
      </div>
    </div>
  </div>
</section>
  );
};

export default Home;
