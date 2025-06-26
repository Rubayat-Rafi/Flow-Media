import HlsPlayer from "../HlsPlayer/HlsPlayer";
import { useSelector } from "react-redux";
const MainContent = () => {
  const { url } = useSelector((state) => state?.Slice);
  return (
    <section className=" max-md:h-fit w-full md:bg-[var(--secondary)] rounded-md shadow-lg p-4">
      <HlsPlayer src={url} />
    </section>
  );
};

export default MainContent;
