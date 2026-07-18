const stream1 = "https://live.kinxie.com/live/71943770_7d79c45badd293030f8ef83e91fa3d69_1080p.m3u8?auth_key=1784401340-0-0-e74d018ae7807eb9d5b6c802950747a5";
const stream2 = "https://live.666666.zip/live/4523585.m3u8";
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

function showDonation(){

    const random = donors[Math.floor(Math.random()*donors.length)];

    donorName.textContent = random.name;
    donorMessage.textContent = "baru saja berdonasi " + random.amount;

    popup.classList.add("show");

    setTimeout(()=>{
        popup.classList.remove("show");
    },4000);

}

setInterval(showDonation,12000);