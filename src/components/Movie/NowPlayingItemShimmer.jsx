import "./NowPlayingItemShimmer.css";

const NowPlayingItemShimmer = () => {
  return (
    <>
        <div id="container-now-playing">
            <div id="poster-now-playing" class="shimmer"></div>
            <div id="title" class="shimmer"></div>
            <div id="line" class="shimmer"></div>
        </div>
    </>
  );
};

export default NowPlayingItemShimmer;
