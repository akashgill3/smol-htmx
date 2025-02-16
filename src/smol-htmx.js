var smolHTMX = (() => {
  "use strict";

  // Private state
  let initialized = false;

  // Private methods
  const process = () => {
    const hxElements = document.querySelectorAll('[hx-get]');
    hxElements.forEach(e => console.log(e.getAttribute('hx-get')));

  };

  // Public API
  return {
    init() {
      if (initialized) return;
      initialized = true;
      process();
      console.log("Initialized smol-htmx");
    },
  };
})();

// Auto-initialize when DOM loads
document.addEventListener("DOMContentLoaded", () => smolHTMX.init());
