// -------------------------------- hidden Orverlay ------------------------------
const overlayArr = document.querySelectorAll(".overlay");
overlayArr.forEach((overlays) => {
  overlays.addEventListener("click", (event) => {
    if (event.target === overlays) overlays.style.display = "none";
  });
});
const closes = document.querySelectorAll(".close");
closes.forEach((closebtn) => {
  closebtn.addEventListener("click", () => {
    closebtn.parentElement.parentElement.style.display = "none";
  });
});
