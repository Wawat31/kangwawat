const stream1 = "https://pul-tenm.gkykp.com/live/hd-en-1-4628396.m3u8?txSecret=d1d56c69d9a8f91a3e08f055df45b4ef&txTime=6ADA5C41";
const stream2 = "https://pul-tenm.gkykp.com/live/hd-en-1-4628459.m3u8?txSecret=abda0379ee5262b92c2267c950b35018&txTime=6AD909D0";
const stream3 = "https://pul-tenm.gkykp.com/live/hd-en-1-4628454.m3u8?txSecret=3f1b6f7c685cd6cb161f4946153f916e&txTime=6AD909D0";

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