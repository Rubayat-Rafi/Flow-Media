import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const HlsPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [hlsInstance, setHlsInstance] = useState(null);
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Detect video type
  const isMp4 = src.endsWith(".mp4");
  const isM3u8 = src.endsWith(".m3u8");
  const isEmbed =
    src.includes("youtube.com") ||
    src.includes("vimeo.com") ||
    src.includes("embed") ||
    src.includes("player.php");

  useEffect(() => {
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

        // Find and set 720p as default if available
        const level720 = hls.levels.findIndex((level) => level.height === 720);
        if (level720 !== -1) {
          hls.currentLevel = level720;
          setSelectedLevel(level720);
        } else {
          // Fallback to highest available quality
          hls.currentLevel = -1; // Auto
          setSelectedLevel(-1);
        }

        // Auto-play with muted audio to bypass browser restrictions
        videoRef.current.muted = true;
        const playPromise = videoRef.current.play();

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
         
            // Show play button or handle error
          });
        }
      });

      return () => {
        hls.destroy();
      };
    } else if (
      isM3u8 &&
      videoRef.current?.canPlayType("application/vnd.apple.mpegurl")
    ) {
      // For Safari and other browsers with native HLS support
      videoRef.current.src = src;
      videoRef.current.muted = true;
      videoRef.current.play().catch((e) => console.log("Auto-play error:", e));
    } else if (isMp4) {
      videoRef.current.src = src;
      videoRef.current.muted = true;
      videoRef.current.play().catch((e) => console.log("Auto-play error:", e));
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
      <div className="w-full aspect-video">
        <iframe
          src={src}
          className="w-full h-full rounded-md"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded Video"
        />
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <video
        ref={videoRef}
        controls
        autoPlay
        muted
        playsInline
        className="w-full aspect-video bg-black"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {levels.length > 0 && (
        <div className="absolute -bottom-11 right-0 bg-opacity-70 text-white p-2 rounded">
          <label className="mr-2">Quality:</label>
          <select
            value={selectedLevel}
            onChange={(e) => handleQualityChange(parseInt(e.target.value))}
            className="bg-[var(--secondary)] text-white p-1 rounded"
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

      {!isPlaying && (
        <button
          onClick={() => videoRef.current.play()}
          className="absolute inset-0 m-auto w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
        >
          <svg
            className="w-10 h-10 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default HlsPlayer;
