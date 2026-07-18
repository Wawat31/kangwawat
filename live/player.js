const stream1 = "https://pul-tenm.gkykp.com/live/hd-en-1-4459814.m3u8?txSecret=c1ac103923b054b94718ef974b5bd16c&txTime=6A5CFCF1";
const stream2 = "https://pul-tenm.gkykp.com/live/hd-en-1-4459814.m3u8?txSecret=c27a8bf610eb884d552f66b23f3058c4&txTime=6A5D3B48";
const stream3 = "https://live.666666.zip/live/4488074.m3u8";

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