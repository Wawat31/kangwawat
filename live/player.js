const stream1 = "https://2a6096f50ffc05c7c7766fbd1358fce6.v.smtcdns.net/play.cbalive.weibisai.com/live/4266837211348061_AiHD.m3u8?txSecret=7151e6578658d1e135c7e220a4efc78f&txTime=6A5AA5E0";
const stream2 = "LINK_M3U8_2";
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