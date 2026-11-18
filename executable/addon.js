const COMMANDS = {
  "hexagon.help"() {
    console.info(
      "Hexagon commands:",
      "hexagon.help",
      "hexagon.status",
      "hexagon.page",
      "hexagon.title <text>",
      "hexagon.theme.dark",
      "hexagon.theme.light",
      "hexagon.scroll.top",
      "hexagon.scroll.bottom",
      "hexagon.copy-url",
      "hexagon.time"
    );
  },

  "hexagon.status"() {
    console.info("[hexagon] addon is running.");
  },

  "hexagon.page"() {
    console.info({
      title: document.title,
      url: window.location.href,
      domain: window.location.hostname
    });
  },

  "hexagon.title"(args) {
    const title = args.join(" ").trim();

    if (!title) {
      console.warn("Usage: webAddon('hexagon.title <text>')");
      return;
    }

    document.title = title;
    console.info("[hexagon] Page title updated.");
  },

  "hexagon.theme.dark"() {
    document.documentElement.style.colorScheme = "dark";
    document.body.style.backgroundColor = "#111827";
    document.body.style.color = "#f9fafb";
    console.info("[hexagon] Dark theme applied.");
  },

  "hexagon.theme.light"() {
    document.documentElement.style.colorScheme = "light";
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#111827";
    console.info("[hexagon] Light theme applied.");
  },

  "hexagon.scroll.top"() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  "hexagon.scroll.bottom"() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  },

  async "hexagon.copy-url"() {
    if (!navigator.clipboard?.writeText) {
      console.warn("[hexagon] Clipboard access is not available on this page.");
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    console.info("[hexagon] Page URL copied.");
  },

  "hexagon.time"() {
    console.info("[hexagon] Local time:", new Date().toLocaleString());
  }
};

/** Register the allowlisted Hexagon console commands. */
export function registerAddonConsole() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  window.webAddon = function webAddon(input = "hexagon.help") {
    if (typeof input !== "string") {
      console.warn("Command must be a string.");
      return;
    }

    const [name, ...args] = input.trim().split(/\s+/);
    const command = COMMANDS[name];

    if (typeof command !== "function") {
      console.warn(
        `Unknown command: ${name || "(empty)"}. Run webAddon('hexagon.help').`
      );
      return;
    }

    try {
      const result = command(args);
      if (result && typeof result.catch === "function") {
        result.catch((error) => {
          console.error(`[hexagon] Command failed: ${name}`, error);
        });
      }
    } catch (error) {
      console.error(`[hexagon] Command failed: ${name}`, error);
    }
  };

  console.info("[hexagon] Ready. Run webAddon('hexagon.help') to list commands.");
}
