import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
const HLSPlayer = ({ src }) => {
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
      <video
        ref={videoRef}
        controls
        autoPlay
        className="w-full h-[70vh] rounded border border-white"
      />
      <div className="mt-2">
        <label className="mr-2">Resolution:</label>
        <select
          value={selectedLevel}
          onChange={(e) => handleQualityChange(parseInt(e.target.value))}
          className="text-white p-1"
        >
          <option value={-1}>Auto</option>
          {levels.map((level, i) => (
            <option key={i} value={i} className=" text-black">
              {level.height}p
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default HLSPlayer;
