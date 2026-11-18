const COMMANDS = {
  help() {
    console.info("Available commands:", "help", "status", "ui.dark", "ui.light", "ui.title <text>");
  },
  status() {
    console.info("[web-addon] loaded; page:", window.location.origin);
  },
  "ui.dark"() {
    document.documentElement.style.colorScheme = "dark";
    document.body.style.backgroundColor = "#111827";
    document.body.style.color = "#f9fafb";
  },
  "ui.light"() {
    document.documentElement.style.colorScheme = "light";
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#111827";
  },
  "ui.title"(args) {
    const title = args.join(" ").trim();
    if (!title) {
      console.warn("Usage: webAddon('ui.title <text>')");
      return;
    }
    document.title = title;
  }
};

/** Register a small, allowlisted developer-console interface. */
export function registerAddonConsole() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  window.webAddon = function webAddon(input = "help") {
    if (typeof input !== "string") {
      console.warn("Command must be a string.");
      return;
    }

    const [name, ...args] = input.trim().split(/\s+/);
    const command = COMMANDS[name];

    if (typeof command !== "function") {
      console.warn(`Unknown command: ${name || "(empty)"}. Run webAddon('help').`);
      return;
    }

    try {
      command(args);
    } catch (error) {
      console.error(`[web-addon] Command failed: ${name}`, error);
    }
  };

  console.info("[web-addon] Ready. Run webAddon('help') for commands.");
}
