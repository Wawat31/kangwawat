const controls =
[
    'play-large',
    'restart',
    'rewind',
    'play', 
    'fast-forward', 
    'progress', 
    'mute', 
    'volume', 
    'captions', 
    'settings', 
    'pip', 
    'airplay', 
    'fullscreen'
];
const player = new Plyr('#video',{controls});

setTimeout(videovisible, 4000)

function videovisible() {
    document.getElementById('loading')
}
var url="https://hls.uouetrq19.com/live/hd-en-6MtJQX23mEGV1RsA1m.m3u8?txSecret=d04819a17f35d725156fbe2f935220e9&txTime=67D31A53";

var video = document.getElementById('video');
 if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {     
       video.play();
    });
  }
  else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = url;
    video.addEventListener('loadedmetadata', function() {
    video.play();
    });
  }
