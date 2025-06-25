// src/components/HLSPlayer.jsx
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const HlsPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [hlsInstance, setHlsInstance] = useState(null);
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(-1); // -1 = auto

  useEffect(() => {
    if (Hls.isSupported()) {
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
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = src;
    }
  }, [src]);

  const handleQualityChange = (levelIndex) => {
    if (hlsInstance) {
      hlsInstance.currentLevel = levelIndex;
      setSelectedLevel(levelIndex);
    }
  };
  return (
    <div className="w-full">
      {/* live status  */}
      <div className="bg-[var(--background)] px-4 py-2 inline-flex rounded-t-md gap-2 items-center border-t border-x border-[var(--primary)]">
        <div className="inline-grid *:[grid-area:1/1]">
          <div className="status status-lg status-error animate-ping bg-red-500"></div>
          <div className="status status-lg status-error bg-red-600"></div>
        </div>
        <p className="font-semibold ">Live</p>
      </div>

      {/* video component  */}
      <video ref={videoRef} controls autoPlay className="w-full" />
      <div className="mt-2">
        <label className="mr-2">Resolution:</label>
        <select
          value={selectedLevel}
          onChange={(e) => handleQualityChange(parseInt(e.target.value))}
          className="p-1 bg-[var(--secondary)]"
        >
          <option value={-1}>Auto</option>
          {levels.map((level, i) => (
            <option key={i} value={i}>
              {level.height}p
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default HlsPlayer;
