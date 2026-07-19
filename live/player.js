const stream1 = "https://yallavoide.yalla-shoot-zhubo.com/sport/202_5216383_2.m3u8?auth_key=1784573657-0-0-d283da8b897b517f91940d91d54596b6";
const stream2 = "https://pul-tenm.gkykp.com/live/hd-en-1-4459814.m3u8?txSecret=c27a8bf610eb884d552f66b23f3058c4&txTime=6A5D3B48";
const stream3 = "https://cfd5.dcfcfd.cfd/doopentea_m1/monomax1_480p/chunks.m3u8?nimblesessionid=40144809&wmsAuthSign=c2VydmVyX3RpbWU9Ny8xOC8yMDI2IDk6MzQ6NTggUE0maGFzaF92YWx1ZT1pY05lZE4xQUx0eVdDMkhXKzdWbXl3PT0mdmFsaWRtaW51dGVzPTEmc3RybV9sZW49MCZpZD0xNzg0NDEwNDk4NDQ1";

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