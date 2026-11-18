// Loads the addon module when this page includes the loader as an ES module.
// The module exposes an allowlisted console API; it does not execute arbitrary input.
import("../executable/addon.js")
  .then(({ registerAddonConsole }) => registerAddonConsole())
  .catch((error) => console.error("[web-addon] Could not load addon:", error));
