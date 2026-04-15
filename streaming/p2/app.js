// =============================
// GANTI LINK M3U8 DI SINI
// =============================
const m3u8Url = 'https://hls-ls.cdnok9.site/live/TRIEUTULONG/index.m3u8?expire=1788427256&sign=45e4fdc4bdb8472f513ccc78f57f6070';

const art = new Artplayer({
  container: document.querySelector('#player'),
  url: m3u8Url,

  customType: {
    m3u8: function (video, url) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
      } else {
        alert('Browser tidak support M3U8');
      }
    }
  },

  title: 'M3U8 Stream',
  autoplay: true,
  volume: 0.7,
  isLive: true,
  pip: true,
  autoSize: true,
  autoMini: true,
  screenshot: true,
  setting: true,
  playbackRate: true,
  aspectRatio: true,
  fullscreen: true,
  fullscreenWeb: true,
  miniProgressBar: true,
  playsInline: true
});
