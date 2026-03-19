(function () {
  var STORAGE_KEY = "theme";

  function getStoredTheme() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (v === "light" || v === "dark") return v;
    } catch (_) {}
    return null;
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function getEffectiveTheme() {
    var attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") return attr;
    return getSystemTheme();
  }

  function syncToggle() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var effective = getEffectiveTheme();
    btn.setAttribute(
      "aria-label",
      effective === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  function applyStoredOrSystem() {
    var stored = getStoredTheme();
    if (stored) {
      document.documentElement.setAttribute("data-theme", stored);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    syncToggle();
  }

  function onToggle() {
    var effective = getEffectiveTheme();
    var next = effective === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (_) {}
    document.documentElement.setAttribute("data-theme", next);
    syncToggle();
  }

  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", function () {
    if (getStoredTheme() === null) {
      document.documentElement.removeAttribute("data-theme");
      syncToggle();
    }
  });

  applyStoredOrSystem();

  var toggle = document.getElementById("theme-toggle");
  if (toggle) toggle.addEventListener("click", onToggle);
})();
