import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  onDisconnect
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

// Tambahkan viewer baru
const myViewer = push(viewersRef);

set(myViewer, {
  joined: Date.now()
});

// Hapus otomatis saat browser ditutup
onDisconnect(myViewer).remove();

// Hitung jumlah viewer realtime
onValue(viewersRef, (snapshot) => {
  let total = 0;

  if (snapshot.exists()) {
    total = snapshot.size || Object.keys(snapshot.val()).length;
  }

  const counter = document.getElementById("viewerCount");
  if (counter) {
    counter.textContent = total;
  }
});