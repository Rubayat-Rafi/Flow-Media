import { useSearchParams } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import FreeChannelHls from "../../components/FeeChannelHls/FreeChannelHls";
import { useSelector } from "react-redux";
const ForFreeChannel = ({ children, channels, className }) => {
  const { defaultUrl } = useSelector((state) => state?.Slice);
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("q");
  const categoryId = searchParams.get("id");
  const cat = category || "Channel";
  const filteredChannels = channels?.filter((ch) => ch.category === cat);
  const filterChannel = filteredChannels.find(
    (item) => item?._id === categoryId
  );
  const freeChannel =
    filterChannel?.type === "free" ? filterChannel?.channelURL : null;
  if (!category && !categoryId && !freeChannel) {
    return (
      <div className=" w-full h-full">
        <FreeChannelHls src={defaultUrl} />
      </div>
    );
  } else if (!user && freeChannel) {
    return (
      <div className=" w-full h-full">
        <FreeChannelHls src={freeChannel} />
      </div>
    );
  } else if (!user && !freeChannel) {
    return <div className={className}>{children}</div>;
  }

  return <div className={className}>{children}</div>;
};

export default ForFreeChannel;
