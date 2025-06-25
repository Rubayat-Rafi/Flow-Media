import HlsPlayer from "../HlsPlayer/HlsPlayer";
const MainContent = () => {
  return (
    <section className="h-full bg-[var(--secondary)] rounded-md shadow-lg p-4">
      <HlsPlayer src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" />
    </section>
  );
};

export default MainContent;
