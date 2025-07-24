import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useSelector } from "react-redux";

const HlsPlayer = ({ src, user, trialActive, trialTimeLeft }) => {
  const [isEmbed, setIsEmbed] = useState(false);
  const videoRef = useRef(null);
  const [hlsInstance, setHlsInstance] = useState(null);
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(-1);
  const { events } = useSelector((state) => state?.Slice);

  const isMp4 = src.endsWith(".mp4");
  const isM3u8 =
    src.endsWith(".m3u8") || src.endsWith(".mpd") || src.endsWith(".dash");

  useEffect(() => {
    if (!isMp4 && !isM3u8) {
      setIsEmbed(true);
    } else {
      setIsEmbed(false);
    }
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls;

    const startPlayback = () => {
      video.muted = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay failed:", error);
        });
      }
    };

    const setupPlayback = () => {
      setTimeout(() => {
        if (isM3u8 && Hls.isSupported()) {
          hls = new Hls({
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
            if (level720 !== -1) {
              hls.currentLevel = level720;
              setSelectedLevel(level720);
            } else {
              hls.currentLevel = -1;
              setSelectedLevel(-1);
            }
            startPlayback();
          });
        } else if (isM3u8 && video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = src;
          startPlayback();
        } else if (isMp4) {
          video.src = src;
          startPlayback();
        }
      }, 500);
    };

    setupPlayback();

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, isM3u8, isMp4]);

  const handleQualityChange = (levelIndex) => {
    if (hlsInstance) {
      hlsInstance.currentLevel = levelIndex;
      setSelectedLevel(levelIndex);
    }
  };

  if (isEmbed) {
    return (
      <div>
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
            autoPlay
            title="Embedded Video"
          />
          {!user && trialActive && (
            <div className="bg-red-600 w-6 h-6 lg:w-10 lg:h-10 text-xs lg:text-sm z-20 flex items-center justify-center absolute right-0 top-0 ">
              {trialTimeLeft}s
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="">
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
          muted
          playsInline
          className="w-full relative aspect-video bg-[var(--background)]"
        />

        {levels.length > 0 && (
          <div className="absolute -bottom-8 right-0 text-xs lg:text-sm py-2 ">
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
          <div className="bg-red-600 w-6 h-6 lg:w-10 lg:h-10 text-xs lg:text-sm z-20 flex items-center justify-center absolute right-0 top-0 ">
            {trialTimeLeft}s
          </div>
        )}
      </div>
    </div>
  );
};

export default HlsPlayer;
