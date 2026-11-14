(function () {
  var config = window.BOOKING_CONFIG || {};
  var email = String(config.email || "").trim();

  function placeholderEmail(value) {
    if (!value) return true;
    var lower = value.toLowerCase();
    if (lower.indexOf("placeholder") !== -1) return true;
    if (lower.indexOf("example.com") !== -1) return true;
    if (lower.indexOf("replace_with") !== -1) return true;
    if (/[\r\n<>]/.test(value) || value.indexOf("?") !== -1) return true;
    return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function field(data, name) {
    return String(data.get(name) || "").replace(/\s+/g, " ").trim();
  }

  var emailIsPlaceholder = placeholderEmail(email);
  var safeEmail = emailIsPlaceholder || /[\r\n?]/.test(email) ? "" : email;

  document.querySelectorAll("[data-config-email]").forEach(function (node) {
    node.textContent = "";
    if (!safeEmail) {
      node.textContent = "The contact email is still a placeholder in the site configuration.";
      return;
    }
    var link = document.createElement("a");
    link.href = "mailto:" + safeEmail;
    link.textContent = safeEmail;
    node.appendChild(link);
  });

  document.querySelectorAll("[data-email-placeholder-note]").forEach(function (note) {
    note.hidden = !emailIsPlaceholder;
  });

  function openMail(subject, lines) {
    var address = safeEmail || email;
    var href = "mailto:" + address
      + "?subject=" + encodeURIComponent(subject)
      + "&body=" + encodeURIComponent(lines.join("\n"));
    window.location.href = href;
  }

  var visitTypes = {
    "in-person": "In-person",
    virtual: "Virtual",
    "book-club-chat": "Book club chat"
  };

  var visitForm = document.getElementById("visit-form");
  if (visitForm) {
    visitForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!visitForm.reportValidity()) return;
      var data = new FormData(visitForm);
      var visitType = visitTypes[field(data, "visitType")] || field(data, "visitType");
      var lines = [
        "Request: Free visit with the author",
        "Name: " + field(data, "name"),
        "Email: " + field(data, "email")
      ];
      var organization = field(data, "organization");
      if (organization) lines.push("Organization: " + organization);
      lines.push("Visit type: " + visitType);
      lines.push("Preferred date: " + field(data, "preferredDate"));
      lines.push("Preferred time: " + field(data, "preferredTime"));
      var secondDate = field(data, "secondDate");
      var secondTime = field(data, "secondTime");
      if (secondDate || secondTime) {
        lines.push("Second-choice date: " + (secondDate || "not given"));
        lines.push("Second-choice time: " + (secondTime || "not given"));
      }
      var message = String(data.get("message") || "").trim();
      if (message) {
        lines.push("");
        lines.push("Message:");
        lines.push(message);
      }
      openMail("Free visit with the author", lines);
      var status = document.getElementById("visit-status");
      if (status) {
        status.textContent = emailIsPlaceholder
          ? "Your email app should open addressed to the placeholder in the site configuration. The message is not stored on this website, and it will not reach Jonathan Lee Davis until that placeholder is replaced."
          : "Your email app should open with this request. Nothing is stored on this website.";
      }
    });
  }

  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;
      var data = new FormData(contactForm);
      openMail("Note for Jonathan Lee Davis", [
        "Name: " + field(data, "name"),
        "Email: " + field(data, "email"),
        "",
        String(data.get("message") || "").trim()
      ]);
      var status = document.getElementById("contact-status");
      if (status) {
        status.textContent = emailIsPlaceholder
          ? "Your email app should open addressed to the placeholder in the site configuration. Nothing is stored on this website."
          : "Your email app should open with your note. Nothing is stored on this website.";
      }
    });
  }
})();
