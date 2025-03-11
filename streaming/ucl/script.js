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
var url="https://hls.uouetrq19.com/live/hd-en-6MtJQX23buaGuQdiHD.m3u8?txSecret=01d521e92cf0556c3efa175ec193bf01&txTime=67D1E7C7";

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
