(function () {
  var config = window.LINKS_CONFIG || {};
  var books = config.books || {};

  function httpsUrl(value) {
    if (!value || !String(value).trim()) return false;
    try {
      var url = new URL(String(value).trim());
      return url.protocol === "https:";
    } catch (error) {
      return false;
    }
  }

  document.querySelectorAll("[data-amazon-book]").forEach(function (node) {
    var id = node.getAttribute("data-amazon-book");
    var entry = books[id] || {};
    var amazon = entry.amazon || "";
    if (!httpsUrl(amazon)) {
      node.textContent = "Coming soon to Amazon";
      node.setAttribute("aria-disabled", "true");
      if (node.tagName === "BUTTON") node.disabled = true;
      if (node.tagName === "A") node.removeAttribute("href");
      return;
    }

    var link = node;
    if (node.tagName !== "A") {
      link = document.createElement("a");
      link.className = node.className;
      link.id = node.id;
      if (node.getAttribute("aria-describedby")) {
        link.setAttribute("aria-describedby", node.getAttribute("aria-describedby"));
      }
      node.replaceWith(link);
    }
    link.href = String(amazon).trim();
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Buy on Amazon";
    var note = document.createElement("span");
    note.className = "visually-hidden";
    note.textContent = " (opens in a new tab)";
    link.appendChild(note);
  });
})();
