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
var url="https://hls.uouetrq19.com/live/hd-en-6MsG9jCyEuZeA2Kpbq.m3u8?txSecret=9d3b40d5538d42df335817c0cce1f22c&txTime=67DDAF3B";

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
