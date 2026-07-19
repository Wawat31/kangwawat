import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
    onValue,
    onDisconnect,
    remove
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBpNpngbXrTsZD2Xd-GAlw3_gz0SeNTHU0",
  authDomain: "wawat-id.firebaseapp.com",
  databaseURL: "https://wawat-id-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wawat-id",
  storageBucket: "wawat-id.firebasestorage.app",
  messagingSenderId: "208052952053",
  appId: "1:208052952053:web:82e2dbf0b87eae4c531ebc",
  measurementId: "G-1N2KYWT8QH"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const viewersRef = ref(db, "viewers");

// Tambah viewer baru
const myViewer = push(viewersRef);

myViewer.set({
    joined: Date.now()
});

// Hapus otomatis saat keluar
onDisconnect(myViewer).remove();

// Update jumlah viewer realtime
onValue(viewersRef, (snapshot) => {
    const total = snapshot.exists()
        ? Object.keys(snapshot.val()).length
        : 0;

    document.getElementById("viewerCount").textContent = total;
});