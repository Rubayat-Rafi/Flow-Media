import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const FreeChannelHls = ({ src, channelName }) => {
  const videoRef = useRef(null);
  const [hlsInstance, setHlsInstance] = useState(null);
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(-1);

  // Check if the video is MP4 or M3U8 or an embed link
  const isMp4 = src?.endsWith(".mp4");
  const isM3u8 = src?.endsWith(".m3u8");
  const isEmbed =
    src?.includes("youtube.com") ||
    src?.includes("vimeo.com") ||
    src?.includes("embed") ||
    src?.includes("player.php");

  useEffect(() => {
    if (!src || !videoRef.current || isEmbed) return;

    // If it's an M3U8 stream and HLS.js is supported
    if (isM3u8 && Hls.isSupported()) {
      const hls = new Hls({
        maxMaxBufferLength: 30,
        maxBufferLength: 10,
        maxBufferSize: 60 * 1000 * 1000,
      });

      setHlsInstance(hls);
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLevels(hls.levels);

        // Find and set the best quality (720p)
        const level720 = hls.levels.findIndex((level) => level.height === 720);
        hls.currentLevel = level720 !== -1 ? level720 : -1;
        setSelectedLevel(hls.currentLevel);

        // Auto-play muted, then unmute after a short delay
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {});

        // After 500ms, unmute and try to play again
        setTimeout(() => {
          videoRef.current.muted = false;
          videoRef.current.play().catch(() => {});
        }, 500);
      });

      return () => hls.destroy();
    }

    // If it's an Apple-supported M3U8 format (Safari, etc.)
    else if (
      isM3u8 &&
      videoRef.current.canPlayType("application/vnd.apple.mpegurl")
    ) {
      videoRef.current.src = src;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    } 

    // If it's an MP4 video
    else if (isMp4) {
      videoRef.current.src = src;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }

  }, [src, isM3u8, isMp4, isEmbed]);

  const handleQualityChange = (levelIndex) => {
    if (hlsInstance) {
      hlsInstance.currentLevel = levelIndex;
      setSelectedLevel(levelIndex);
    }
  };

  return (
    <div className="w-full relative">
      {/* Top bar with "Live" or Channel Name */}
      {src && (
        <div className="max-lg:hidden bg-[var(--background)] px-4 py-2 inline-flex rounded-t-md gap-2 items-center border-t border-x border-[var(--primary)]">
          <div className="inline-grid *:[grid-area:1/1]">
            <div className="status status-lg status-error animate-ping bg-red-500"></div>
            <div className="status status-lg status-error bg-red-600"></div>
          </div>
          <div className="font-semibold max-lg:text-sm">
            {!channelName ? <p>Live</p> : <p>{channelName}</p>}
          </div>
        </div>
      )}

      {/* Video / Embed Player */}
      <div className="w-full relative">
        {isEmbed ? (
          <iframe
            src={src}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full aspect-video bg-[var(--background)]"
            title={channelName || "Embedded Video"}
          />
        ) : (
          <video
            ref={videoRef}
            controls
            autoPlay
            muted
            playsInline
            className="w-full relative aspect-video bg-[var(--background)]"
          />
        )}

        {/* Quality selector for HLS streams */}
        {!isEmbed && levels.length > 0 && (
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
      </div>
    </div>
  );
};

export default FreeChannelHls;
