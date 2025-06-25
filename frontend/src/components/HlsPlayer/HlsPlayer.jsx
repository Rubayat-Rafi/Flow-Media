import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const HlsPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [hlsInstance, setHlsInstance] = useState(null);
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(-1); // -1 = auto

  const isMp4 = src.endsWith(".mp4");
  const isM3u8 = src.endsWith(".m3u8");
  const isEmbed = src.includes("youtube.com") || src.includes("vimeo.com") || src.includes("embed");

  useEffect(() => {
    if (isM3u8 && Hls.isSupported()) {
      const hls = new Hls();
      setHlsInstance(hls);
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLevels(hls.levels);
        setSelectedLevel(hls.currentLevel);
      });

      return () => {
        hls.destroy();
      };
    } else if (isM3u8 && videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = src;
    } else if (isMp4) {
      videoRef.current.src = src;
    }
  }, [src]);

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
          className="w-full h-full border rounded"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded Video"
        ></iframe>
      </div>
    );
  }

  return (
    <div className="w-full">
      <video
        ref={videoRef}
        controls
        autoPlay
        className="w-full rounded border border-white"
      />
      {levels.length > 0 && (
        <div className="mt-2">
          <label className="mr-2">Resolution:</label>
          <select
            value={selectedLevel}
            onChange={(e) => handleQualityChange(parseInt(e.target.value))}
            className="text-black p-1"
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
  );
};

export default HlsPlayer;
