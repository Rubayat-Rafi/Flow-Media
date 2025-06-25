import { useState } from "react";

const WatchBtn = () => {
  const [watch, setWatch] = useState(false);
  return (
    <button
      onClick={() => setWatch(!watch)}
      className=" bg-orange-500 px-2 py-1 rounded-lg"
    >
      {!watch ? "watch" : "watching..."}
    </button>
  );
};

export default WatchBtn;
