import { useRef, useState } from "react";
import Container from "../Shared/Container";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Categories } from "../Categories/Categories";

const SportsNav = ({ onSelectCategory }) => {
  const scrollRef = useRef(null);
  const [active, setActive] = useState("Channel");
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
      <div className="relative flex items-center px-10">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 bg-[var(--secondary)] text-[var(--text)] p-2 rounded-full hover:text-[var(--primary)] shadow-lg transition-colors duration-300 ease-in-out"
        >
          <IoIosArrowBack />
        </button>

        {/* Added margin for arrows */}
        <div
          ref={scrollRef}
          className="w-full whitespace-nowrap overflow-x-scroll no-scroll "
        >
          <div className="flex space-x-4 mx-auto">
            {/* Centered and full width */}
            {Categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleClick(cat.name)}
                className={`px-4 py-2 rounded-md font-semibold flex items-center gap-2 transition duration-200 uppercase cursor-pointer   " ${
                  active === cat.name
                    ? "bg-[var(--primary)] text-[var(--background)]"
                    : "bg-[var(--secondary)] hover:bg-[var(--primary)] hover:text-[var(--background)]"
                }`}
              >
                <cat.Icon className="text-xl hover:text-[var(--background)]" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 bg-[var(--secondary)] text-[var(--text)] p-2 rounded-full hover:text-[var(--primary)] shadow-lg transition-colors duration-300 ease-in-out"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </Container>
  );
};

export default SportsNav;