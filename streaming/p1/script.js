document.addEventListener('DOMContentLoaded', () => {
  const source = 'https://hls.bitiyu9.cc/LM3qNwIkIsDnscDxPG0yrBUL2pKQ2JqK0RGRTZWa0Q3MlgxeUlobkVMWXRNOGRKekZFWFp3SHhlSno3c3M1blNXSHkzVnl0bE8rUUdTSSGZxRGwxTk83TnJQc2lhOhgrI0tnw-6MvYM2f2BjWsSA7FrFm1u8uotkTnd07871d986ef654b88377598b95ca88c28eed9a21e12dc45a73b24ffb61f8b500e5a7e192fdf6a1f1ec9166e4b72ca094b20401aef2318605e064f38097f973fb1001065bc6a16b7f72352c7780a8be66fc3098d883d4bf08d29c509ad54d0165322951989b3b4752235a99639eef6a130a03dbe3f2e7c2f1fd3e4541ba965bd8fecc92e8fde3721e230a314b4504fb8e2232b5b3d0765d77dc2c70d4b7c6abcf9f4a0d7add788f9d8310f6f5f58b3cee7c4e919275369e63da65d301684a798d70fac09c6add7190f68bb6b6e5df1d396bd7ea3cd/hd-en-6MuT7JykrhxFpwjMr7.m3u8?token=iktv2869109a908e0a10ba8ab04481b9f317e61f5fc21998140c2d49219a750ac4504cbbb216e88aea572c7c82bf66f7c231f1cb530aeb02015e872774eddb3722a090da65aabdcd858f3ca03807dbc20e5dd6dc694e7f92bb3ef35dff952cbe1cc8ed5994cfcff5fc8b90081b1f13564b62%';
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
