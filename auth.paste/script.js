function copyText() {
  const text = document.getElementById("textToCopy").value;

  navigator.clipboard.writeText(text).then(() => {
    alert("Teks berhasil disalin: " + text);
  }).catch(err => {
    alert("Gagal menyalin teks: " + err);
  });
}
