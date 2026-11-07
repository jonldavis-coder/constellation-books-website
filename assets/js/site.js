(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      var label = toggle.querySelector(".nav-toggle-label");
      if (label) label.textContent = open ? "Close" : "Menu";
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        var label = toggle.querySelector(".nav-toggle-label");
        if (label) label.textContent = "Menu";
        toggle.focus();
      }
    });
  }

  var dialog = document.getElementById("lightbox");
  if (!dialog || typeof dialog.showModal !== "function") return;
  var image = dialog.querySelector("img");
  var caption = document.getElementById("lightbox-caption");

  function capToNaturalSize() {
    if (!image.naturalWidth) return;
    image.style.maxWidth = image.naturalWidth + "px";
  }

  document.querySelectorAll("[data-enlarge]").forEach(function (button) {
    button.addEventListener("click", function () {
      var source = button.querySelector("img");
      image.removeAttribute("style");
      image.alt = source ? source.alt : "";
      image.src = button.getAttribute("data-full") || (source ? source.currentSrc || source.src : "");
      if (caption) caption.textContent = button.getAttribute("data-label") || image.alt;
      image.onload = capToNaturalSize;
      dialog.showModal();
      if (image.complete) capToNaturalSize();
    });
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", function () {
    image.onload = null;
  });
})();
