import HLSPlayer from "../HLSPlayer/HLSPlaye";
const MainContent = () => {
    return (
        <section className='h-full bg-[var(--secondary)] rounded-md shadow-lg p-4'>
              <HLSPlayer src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" />
        </section>
    );
};

export default MainContent;