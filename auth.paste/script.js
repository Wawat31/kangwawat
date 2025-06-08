function copyText() {
  const text = document.getElementById("textToCopy");
  text.select();
  text.setSelectionRange(0, 99999); // untuk mobile
  document.execCommand("copy");
  alert("Teks berhasil disalin: " + text.value);
