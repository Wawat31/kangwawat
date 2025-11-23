document.addEventListener('DOMContentLoaded', () => {
  const source = 'https://fhlsport301.tbhmp205ycp5.work/token-J09znuacK%2FaG5G16xvY6y26KlMPQgn%2FjbXetw6MaEjPw5OWXHUJaCJQrrwtJXlIeR2PdxTJjmv50fpBLBQEU9c9gS0i3a/v3/get/s3/aHR0cHM6Ly9wbGF5LmdweWN2YWMuY29t/rrty/hd-zh-1-4343322.m3u8?txSecret=7f366221e2222f7a4a8db8659d2fa005&txTime=69233491';
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
