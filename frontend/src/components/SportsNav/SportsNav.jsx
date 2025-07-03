import { useRef, useState } from "react";
import Container from "../Shared/Container";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Categories } from "../Categories/Categories";
import { GetCategory } from "../../utils/get_searchParams/ger_searchParams";
import { useSearchParams } from "react-router";
const SportsNav = ({ onSelectCategory }) => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("q");
  const catAndevent = GetCategory(categoryData);
  const urlCategory = catAndevent?.categ;
  const scrollRef = useRef(null);
  const [active, setActive] = useState(urlCategory || "Channel");
  const handleClick = (category) => {
    setActive(category);
    onSelectCategory(category);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <Container>
      <div className="relative flex items-center px-10 md:px-14 bg-[var(--secondary)] py-4 rounded-md border border-[var(--text)]/10">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-1 md:left-3 z-10 bg-[var(--background)] text-[var(--text)] p-2 rounded-full hover:text-[var(--primary)] shadow-lg transition-colors duration-300 ease-in-out"
        >
          <IoIosArrowBack className="text-sm md:text-base" />
        </button>

        {/* Added margin for arrows */}
        <div
          ref={scrollRef}
          className="w-full whitespace-nowrap overflow-x-scroll no-scroll "
        >
          <div className="flex space-x-2 md:space-x-4 mx-auto">
            {/* Centered and full width */}
            {Categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleClick(cat.name)}
                className={`px-2 py-1 md:px-4 md:py-2 rounded md:rounded-md font-semibold flex items-center gap-1 md:gap-2 transition duration-200 uppercase cursor-pointer text-sm md:text-base" ${
                  active === cat.name
                    ? "bg-[var(--primary)] text-[var(--background)]"
                    : "hover:bg-[var(--primary)] hover:text-[var(--background)]"
                }`}
              >
                <cat.Icon className="text-lg  md:text-xl hover:text-[var(--background)]" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-1 md:right-3 z-10 bg-[var(--background)] text-[var(--text)] p-2 rounded-full hover:text-[var(--primary)] shadow-lg transition-colors duration-300 ease-in-out"
        >
          <IoIosArrowForward className="text-sm md:text-base" />
        </button>
      </div>
    </Container>
  );
};

export default SportsNav;
