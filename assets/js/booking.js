(function () {
  var config = window.BOOKING_CONFIG || {};
  var email = String(config.email || "").trim();
  var calendly = config.calendly || {};
  var inPerson = String(calendly.inPerson || "").trim();
  var virtualUrl = String(calendly.virtual || "").trim();

  function httpsUrl(value) {
    if (!value) return false;
    try {
      return new URL(value).protocol === "https:";
    } catch (error) {
      return false;
    }
  }

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

  var inOk = httpsUrl(inPerson);
  var virtualOk = httpsUrl(virtualUrl);
  var mount = document.getElementById("calendly-mount");

  function appendWidget(url, label) {
    var section = document.createElement("section");
    section.className = "calendly-section";
    var heading = document.createElement("h2");
    heading.textContent = label;
    var widget = document.createElement("div");
    widget.className = "calendly-inline-widget";
    widget.setAttribute("data-url", url);
    widget.style.minWidth = "320px";
    widget.style.height = "740px";
    section.appendChild(heading);
    section.appendChild(widget);
    mount.appendChild(section);
  }

  if (mount && (inOk || virtualOk)) {
    if (inOk) appendWidget(inPerson, "In-person author visit");
    if (virtualOk) appendWidget(virtualUrl, "Virtual meet-the-author session");
    var script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }

  var formSection = document.getElementById("visit-request");
  if (formSection) {
    formSection.hidden = inOk && virtualOk;
    var partial = document.getElementById("partial-booking-note");
    if (partial && (inOk || virtualOk) && !(inOk && virtualOk)) {
      partial.hidden = false;
      partial.textContent = inOk
        ? "In-person visits can be booked above. The virtual calendar is not connected yet. Use the form to request a virtual session."
        : "Virtual sessions can be booked above. The in-person calendar is not connected yet. Use the form to request an in-person visit.";
    }
  }

  function openMail(subject, lines) {
    var address = safeEmail || email;
    var href = "mailto:" + address
      + "?subject=" + encodeURIComponent(subject)
      + "&body=" + encodeURIComponent(lines.join("\n"));
    window.location.href = href;
  }

  var visitForm = document.getElementById("visit-form");
  if (visitForm) {
    visitForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!visitForm.reportValidity()) return;
      var data = new FormData(visitForm);
      var format = data.get("format") === "virtual"
        ? "Virtual meet-the-author session"
        : "In-person author visit";
      var schoolType = field(data, "schoolType");
      openMail("Meet the Author request — 30-minute interview", [
        "Request: 30-minute interview",
        "Name: " + field(data, "name"),
        "School: " + field(data, "school"),
        "School type: " + schoolType,
        "Role: " + field(data, "role"),
        "Format: " + format,
        "Preferred dates: " + field(data, "dates")
      ]);
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
