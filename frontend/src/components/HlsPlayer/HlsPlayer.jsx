import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useSelector } from "react-redux";
const HlsPlayer = ({ src, user, trialActive, trialTimeLeft }) => {
  const videoRef = useRef(null);
  const [hlsInstance, setHlsInstance] = useState(null);
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(-1);
  const { events } = useSelector((state) => state?.Slice);
  const isMp4 = src.endsWith(".mp4");
  const isM3u8 = src.endsWith(".m3u8");
  const isEmbed =
    src.includes("youtube.com") ||
    src.includes("vimeo.com") ||
    src.includes("embed") ||
    src.includes("player.php");
  const tryAutoPlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    try {
      await video.play();
    } catch (e) {
      console.warn("Muted autoplay failed", e);
    }
    setTimeout(async () => {
      video.muted = false;
      try {
        await video.play();
        console.log("Auto-unmute success");
      } catch (e) {
        console.warn("Auto-unmute failed (browser blocked it)", e);
        video.muted = true;
      }
    }, 500);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (isM3u8 && Hls.isSupported()) {
      const hls = new Hls({
        maxMaxBufferLength: 30,
        maxBufferLength: 10,
        maxBufferSize: 60 * 1000 * 1000,
      });
      setHlsInstance(hls);
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLevels(hls.levels);
        const level720 = hls.levels.findIndex((level) => level.height === 720);
        hls.currentLevel = level720 !== -1 ? level720 : -1;
        setSelectedLevel(hls.currentLevel);
        tryAutoPlay();
      });

      return () => {
        hls.destroy();
      };
    } else if (
      isM3u8 &&
      video?.canPlayType("application/vnd.apple.mpegurl")
    ) {
      video.src = src;
      tryAutoPlay();
    } else if (isMp4) {
      video.src = src;
      tryAutoPlay();
    }
  }, [src, isM3u8, isMp4]);
  const handleQualityChange = (levelIndex) => {
    if (hlsInstance) {
      hlsInstance.currentLevel = levelIndex;
      setSelectedLevel(levelIndex);
    }
  };
  if (isEmbed) {
    return (
      <div className="bg-[var(--background)]">
        {src && (
          <div className="max-lg:hidden bg-[var(--background)] px-4 py-2 inline-flex rounded-t-md gap-2 items-center border-t border-x border-[var(--primary)]">
            <div className="inline-grid *:[grid-area:1/1]">
              <div className="status status-lg status-error animate-ping bg-red-500"></div>
              <div className="status status-lg status-error bg-red-600"></div>
            </div>
            <div className="font-semibold max-lg:text-sm">
              {events?.category === "Channel" ? (
                <p>{events?.channelName}</p>
              ) : (
                <p>Live</p>
              )}
            </div>
          </div>
        )}
        <div className="relative w-full aspect-video">
          <iframe
            src={src}
            className="w-full h-full bg-[var(--background)]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded Video"
          />
          {!user && trialActive && (
            <div className="bg-red-600 w-6 h-6 lg:w-10 lg:h-10 text-xs lg:text-sm z-20 flex items-center justify-center absolute right-0 top-0">
              {trialTimeLeft}s
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[var(--background)]">
      {src && (
        <div className="max-lg:hidden bg-[var(--background)] px-4 py-2 inline-flex rounded-t-md gap-2 items-center border-t border-x border-[var(--primary)]">
          <div className="inline-grid *:[grid-area:1/1]">
            <div className="status status-lg status-error animate-ping bg-red-500"></div>
            <div className="status status-lg status-error bg-red-600"></div>
          </div>
          <div className="font-semibold max-lg:text-sm">
            {events?.category === "Channel" ? (
              <p>{events?.channelName}</p>
            ) : (
              <p>Live</p>
            )}
          </div>
        </div>
      )}

      <div className="w-full relative">
        <video
          ref={videoRef}
          controls
          autoPlay
          playsInline
          className="w-full relative aspect-video bg-[var(--background)]"
        />
        {levels.length > 0 && (
          <div className="absolute -bottom-8 right-0 text-xs lg:text-sm py-2">
            <label className="mr-2">Quality:</label>
            <select
              value={selectedLevel}
              onChange={(e) => handleQualityChange(parseInt(e.target.value))}
              className="bg-[var(--secondary)]"
            >
              <option value={-1}>Auto</option>
              {levels.map((level, i) => (
                <option key={i} value={i}>
                  {level.height}p
                </option>
              ))}
            </select>
          </div>
        )}
        {!user && trialActive && (
          <div className="bg-red-600 w-6 h-6 lg:w-10 lg:h-10 text-xs lg:text-sm z-20 flex items-center justify-center absolute right-0 top-0">
            {trialTimeLeft}s
          </div>
        )}
      </div>
    </div>
  );
};

export default HlsPlayer;