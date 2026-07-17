const stream1 = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
const stream2 = "https://rodjatv.com/rodjatv/live.m3u8";
const stream3 = "LINK_M3U8_3";

const art = new Artplayer({
    container: "#player",
    url: stream1,
    autoplay: true,
    fullscreen: true,
    pip: true,
    setting: true,

    customType: {
        m3u8(video, url) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(url);
                hls.attachMedia(video);
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                video.src = url;
            }
        }
    }
});

function changeStream(url, button) {
    document.querySelectorAll(".menu button").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");
    art.switchUrl(url);
}