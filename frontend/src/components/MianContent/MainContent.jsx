import HlsPlayer from "../HlsPlayer/HlsPlayer";
const MainContent = () => {
  return (
    <section className="h-full bg-[var(--secondary)] rounded-md shadow-lg p-8">
      <HlsPlayer src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8" />
    </section>
  );
};

export default MainContent;
