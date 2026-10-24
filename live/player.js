// WARKOP WAWAT — HLS player + reliable LIVE button handling
// Replace these with active M3U8 URLs you own or are authorized to use.
window.WAWAT_STREAMS = {
  1: "https://pul-tenm.gkykp.com/live/hd-en-1-4558635.m3u8?txSecret=9331fdc74c5814dced1998d56e1fb0fc&txTime=6ADDC76A",
  2: "https://a117.azplay49.me/hls/streama242313/index.m3u8?cst=b84ca587877901acb6f1eaeea9dec7fd",
  3: "https://a121.azplay49.me/hls/streama237115/index.m3u8?cst=9b8a218f513e510f1b5000bea2d41e24"
};

let hlsInstance = null;
let art = null;

function showPlayerError(message) {
  const player = document.getElementById("player");
  if (!player) return;
  let notice = document.getElementById("player-error");
  if (!notice) {
    notice = document.createElement("div");
    notice.id = "player-error";
    notice.style.cssText = "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:22px;text-align:center;background:#020711;color:#dbeafe;font:600 14px/1.6 system-ui;z-index:20";
    player.appendChild(notice);
  }
  notice.textContent = message;
  notice.style.display = "flex";
}
function hidePlayerError() {
  const notice = document.getElementById("player-error");
  if (notice) notice.style.display = "none";
}

function initPlayer() {
  const container = document.getElementById("player");
  if (!container) return;
  if (typeof window.Artplayer !== "function") {
    showPlayerError("Pemutar gagal dimuat. Periksa koneksi internet atau CDN Artplayer.");
    return;
  }

  try {
    art = new window.Artplayer({
      container,
      url: window.WAWAT_STREAMS[1],
      autoplay: false,
      fullscreen: true,
      pip: true,
      setting: true,
      playbackRate: true,
      customType: {
        m3u8(video, url) {
          if (hlsInstance) {
            hlsInstance.destroy();
            hlsInstance = null;
          }
          if (window.Hls && window.Hls.isSupported()) {
            hlsInstance = new window.Hls({ enableWorker: true, lowLatencyMode: true });
            hlsInstance.on(window.Hls.Events.ERROR, (_event, data) => {
              if (!data || !data.fatal) return;
              if (data.type === window.Hls.ErrorTypes.NETWORK_ERROR) {
                showPlayerError("Stream gagal dimuat. URL/token mungkin kedaluwarsa atau server menolak akses/CORS.");
              } else {
                showPlayerError("Stream tidak kompatibel atau gagal diputar di browser ini.");
              }
            });
            hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, hidePlayerError);
            hlsInstance.loadSource(url);
            hlsInstance.attachMedia(video);
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = url;
            video.load();
          } else {
            showPlayerError("Browser tidak mendukung HLS secara langsung. Coba Chrome/Edge terbaru.");
          }
        }
      }
    });

    const video = container.querySelector("video");
    if (video) {
      video.addEventListener("playing", hidePlayerError);
      video.addEventListener("error", () => showPlayerError("Video gagal diputar. Periksa URL M3U8, masa berlaku token, CORS, dan dukungan codec."));
    }
  } catch (error) {
    console.error("Artplayer init error:", error);
    showPlayerError("Pemutar gagal diinisialisasi. Muat ulang halaman dan periksa koneksi.");
  }
}

function changeStream(channel, button) {
  const url = window.WAWAT_STREAMS[String(channel)];
  if (!url || !art) {
    if (!art) showPlayerError("Pemutar belum siap. Tunggu sebentar lalu coba lagi.");
    return;
  }
  document.querySelectorAll(".channel-tabs button").forEach((item) => {
    item.classList.toggle("active", item === button);
  });
  hidePlayerError();
  if (hlsInstance) {
    hlsInstance.destroy();
    hlsInstance = null;
  }
  art.switchUrl(url);
}
document.querySelectorAll(".channel-tabs [data-channel]").forEach((button) => {
  button.addEventListener("click", () => changeStream(button.dataset.channel, button));
});
initPlayer();

// Visual demo notifications; these are not verified real donations.
const donors = [
  {name:"Andi", amount:"Rp10.000"}, {name:"Rizky", amount:"Rp20.000"},
  {name:"Budi", amount:"Rp5.000"}, {name:"Wawat", amount:"Rp50.000"},
  {name:"Asep", amount:"Rp15.000"}, {name:"Doni", amount:"Rp25.000"},
  {name:"Fajar", amount:"Rp100.000"}
];
const popup = document.getElementById("donation-popup");
const donorName = document.getElementById("donor-name");
const donorMessage = document.getElementById("donor-message");
function showDonation() {
  if (!popup || !donorName || !donorMessage) return;
  const donor = donors[Math.floor(Math.random() * donors.length)];
  donorName.textContent = donor.name;
  donorMessage.textContent = "baru saja berdonasi " + donor.amount;
  popup.classList.add("show");
  window.setTimeout(() => popup.classList.remove("show"), 4000);
}
window.setInterval(showDonation, 12000);
