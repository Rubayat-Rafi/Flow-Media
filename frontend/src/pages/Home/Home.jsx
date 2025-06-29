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

  // Prevent hydration mismatch by waiting for mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fix scroll issue on small screens
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

  // Only render after mount to avoid hydration mismatch
  if (!isMounted || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section>
      <SportsNav onSelectCategory={category} />
      <div className="max-w-[1440px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 flex flex-col md:flex-row gap-6 my-10">
        {/* Sidebar */}
        <div className="w-2/6 max-md:w-full">
          <Sidebar sidebarContent={selectedCategory} channels={categorys} />
        </div>

        {/* Main content */}
        <div
          className={`${
            !hideVideoFlag ? "max-md:hidden" : "max-md:block"
          } w-4/6 max-md:w-full max-md:fixed z-20 max-md:bg-[var(--secondary)] top-0 left-0 bottom-0 right-0 max-md:flex max-md:items-center max-md:justify-center`}
        >
          <div className="relative h-full w-full flex items-center justify-center">
            <button
              onClick={() => {
                dispatch(addVideoFlag(false));
                dispatch(addUrl(""));
              }}
              className="md:hidden absolute right-5 top-5 px-5 py-1 rounded-md cursor-pointer hover:bg-orange-600"
            >
              Cancel
            </button>
            <MainContent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
