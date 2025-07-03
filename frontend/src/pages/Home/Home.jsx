import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import SportsNav from "../../components/SportsNav/SportsNav";
import MainContent from "../../components/MianContent/MainContent";
import { useDispatch, useSelector } from "react-redux";
import { addVideoFlag, addUrl } from "../../utils/redux/slices/slice";
import useCategory from "../../hooks/useCategory";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import { RxCross2 } from "react-icons/rx";

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
    <section className="space-y-6 pb-10">
      <SportsNav onSelectCategory={category} />

      <div className="max-w-[1440px] w-full mx-auto xl:px-20 md:px-10 sm:px-2 px-4 flex flex-col-reverse lg:flex-row gap-6 h-full">
        {/* Sidebar - Always visible on desktop, modal on mobile */}
        <div className="w-full lg:w-2/8">
          <Sidebar sidebarContent={selectedCategory} channels={categorys} />
        </div>

        {/* Main content */}
        <div
          className={`${
            !hideVideoFlag ? "max-lg:hidden" : "max-lg:block"
          } w-full lg:w-6/8 relative  max-lg:w-full max-lg:fixed z-20 max-lg:bg-black/50 backdrop-blur-xs top-0 left-0 bottom-0 right-0 max-lg:flex max-lg:items-center max-lg:justify-center max-lg:h-screen max-lg:px-2`}
        >
          <div className="relative  w-full flex justify-center ">
            <button
              onClick={() => {
                dispatch(addVideoFlag(false));
                dispatch(addUrl(""));
              }}
              className="lg:hidden absolute right-0 -top-10 p-2   rounded-full cursor-pointer hover:bg-primary bg-[var(--primary)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <MainContent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
