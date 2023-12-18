import "./NowPlayingItemShimmer.css";

const NowPlayingItemShimmer = () => {
  return (
    <>
        <div id="container-now-playing">
            <div id="poster-now-playing" className="shimmer"></div>
            <div id="title" className="shimmer"></div>
            <div id="line" className="shimmer"></div>
        </div>
    </>
  );
};

export default NowPlayingItemShimmer;
