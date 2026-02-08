document.addEventListener('DOMContentLoaded', () => {
  const source = 'https://live-en.aisports.cc/moviebox/football001/playlist.m3u8?auth_key=C5B4D8FAECEB1FF3C6E4A0F9627A642F55524B7B34F67D21BB74A02A82D2EA78C24C08867AE18F3F8B15742AF7517FA800D239FE378C2919E28286089A75367072DFBFCDF0ABFE2467D280D3CE5428C745826119DD3FC91D021C08C23F9BA3A8%';
  const video = document.querySelector('video');

  // For more options see: https://github.com/sampotts/plyr/#options
  // captions.update is required for captions to work with hls.js
  const player = new Plyr(video, { captions: { active: true, update: true, language: 'en' } });

  if (!Hls.isSupported()) {
    video.src = source;
  } else {
    // For more Hls.js options, see https://github.com/dailymotion/hls.js
    const hls = new Hls();
    hls.loadSource(source);
    hls.attachMedia(video);
    window.hls = hls;

    // Handle changing captions
    player.on('languagechange', () => {
      // Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
      setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
    });
  }

  // Expose player so it can be used from the console
  window.player = player;
});
