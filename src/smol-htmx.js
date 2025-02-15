var smolHTMX = (() => {
  "use strict";

  // Private state
  let initialized = false;

  // Private methods
  const process = (element) => {};

  // Public API
  return {
    init() {
      if (initialized) return;
      initialized = true;
    },
  };
})();

// Auto-initialize when DOM loads
document.addEventListener("DOMContentLoaded", () => smolHTMX.init());
