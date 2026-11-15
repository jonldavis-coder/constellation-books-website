/* Google Analytics 4.
   Load the library after the page has rendered so it does not compete
   with the cover image. Commands queued below still send a page view
   once the library arrives.
*/
(function () {
  var id = "G-6GWSZXPBNY";
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id);

  var started = false;
  function load() {
    if (started) return;
    started = true;
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
    document.head.appendChild(script);
  }

  function schedule() {
    window.setTimeout(load, 4000);
  }

  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule);
})();
