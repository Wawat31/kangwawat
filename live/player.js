const stream1 = "https://play.lacrima2000.com/live/084b8ae9f47fd1e5.m3u8?wsSecret=2B194F40E68272563D87B8522AD4F22E&wsTime=1792676593";
const stream2 = "https://pul-tenm.gkykp.com/live/hd-en-1-4628482.m3u8?txSecret=09d535dbdea3624ed62d736c65b093d6&txTime=6ADA5C41";
const stream3 = "https://pul-tenm.gkykp.com/live/hd-en-1-4628438.m3u8?txSecret=e5ffbf11ca028beade48da8db81fcce3";

let hlsInstance = null;

const art = new Artplayer({
    container: "#player",
    url: stream1,
    autoplay: true,
    fullscreen: true,
    pip: true,
    setting: true,
    customType: {
        m3u8(video, url) {
            if (hlsInstance) {
                hlsInstance.destroy();
                hlsInstance = null;
            }
            if (Hls.isSupported()) {
                hlsInstance = new Hls();
                hlsInstance.loadSource(url);
                hlsInstance.attachMedia(video);
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                video.src = url;
                video.load();
            }
        }
    }
};

window.changeStream = function (url, button) {
    if (!url) return;
    document.querySelectorAll(".menu button").forEach((btn) => btn.classList.remove("active"));
    if (button) button.classList.add("active");
    art.switchUrl(url);
};

const donors = [
    {name:"Andi", amount:"Rp10.000"},
    {name:"Rizky", amount:"Rp20.000"},
    {name:"Budi", amount:"Rp5.000"},
    {name:"Wawat", amount:"Rp50.000"},
    {name:"Asep", amount:"Rp15.000"},
    {name:"Doni", amount:"Rp25.000"},
    {name:"Fajar", amount:"Rp100.000"}
];

const popup = document.getElementById("donation-popup");
const donorName = document.getElementById("donor-name");
const donorMessage = document.getElementById("donor-message");

function showDonation() {
    if (!popup || !donorName || !donorMessage || donors.length === 0) return;
    const random = donors[Math.floor(Math.random() * donors.length)];
    donorName.textContent = random.name;
    donorMessage.textContent = "baru saja berdonasi " + random.amount;
    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), 4000);
}
setInterval(showDonation, 12000);
