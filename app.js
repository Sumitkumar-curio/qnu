/* No JavaScript required for this page — edit index.html and styles.css only. */
(function () {
  const main = document.querySelector("main#main");
  const lightbox = document.getElementById("lightbox");
  if (!main || !lightbox) return;

  const shell = lightbox.querySelector(".lightbox__shell");
  const lbImg = lightbox.querySelector(".lightbox__img");
  const closeBtn = lightbox.querySelector(".lightbox__close");
  if (!shell || !lbImg || !closeBtn) return;
  let lastFocus = null;

  function afterClose() {
    lbImg.src = "";
    lbImg.alt = "";
    lastFocus?.focus({ preventScroll: true });
    lastFocus = null;
  }

  function openLightbox(img) {
    if (!img?.src) return;
    lastFocus = document.activeElement;
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || "Enlarged image";
    lightbox.showModal();
    requestAnimationFrame(function () {
      closeBtn?.focus({ preventScroll: true });
    });
  }

  function closeLightbox() {
    if (lightbox.open) lightbox.close();
  }

  lightbox.addEventListener("close", afterClose);

  main.addEventListener("click", function (e) {
    const img = e.target.closest("img");
    if (!img?.closest("figure")) return;
    openLightbox(img);
  });

  shell.addEventListener("click", function (e) {
    if (e.target === shell) closeLightbox();
  });

  closeBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    closeLightbox();
  });
})();
