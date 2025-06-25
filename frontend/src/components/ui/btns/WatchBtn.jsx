import { useState } from "react";

const WatchBtn = () => {
  const [watch, setWatch] = useState(false);
  return (
    <button
      onClick={() => setWatch(!watch)}
      className=" bg-[var(--primary)] text-[var(--background)] text-sm font-medium px-2 py-1 rounded-md cursor-pointer"
    >
      {!watch ? "watch" : "watching"}
    </button>
  );
};

export default WatchBtn;
