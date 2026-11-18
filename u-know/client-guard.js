/*
 * u-know: lightweight browser-side form friction.
 *
 * Usage:
 *   1. Add data-guard to forms you want this to cover:
 *        <form data-guard ...>
 *   2. Paste this IIFE into your page's existing JavaScript.
 *
 * This is NOT a security boundary or DDoS mitigation. A bot can disable or
 * bypass browser JavaScript and send requests directly to your server.
 * Enforce rate limits, validation, bot challenges and request limits server-side.
 */
(() => {
  "use strict";

  const COOLDOWN_MS = 2500;
  const lastSubmit = new WeakMap();

  // Only opt-in forms are affected; unrelated forms and fetch() remain untouched.
  document.querySelectorAll("form[data-guard]").forEach((form) => {
    // A honeypot is an extra, visually hidden field. Real users should leave it empty.
    // Do not use this as the only bot check: automated clients can detect it.
    if (!form.querySelector('input[name="company_website"]')) {
      const trap = document.createElement("input");
      trap.type = "text";
      trap.name = "company_website";
      trap.tabIndex = -1;
      trap.autocomplete = "off";
      trap.setAttribute("aria-hidden", "true");
      trap.style.cssText =
        "position:absolute;left:-10000px;width:1px;height:1px;opacity:0";
      form.appendChild(trap);
    }

    form.addEventListener(
      "submit",
      (event) => {
        const trap = form.querySelector('input[name="company_website"]');

        // A filled honeypot is a signal, not proof, of automation.
        if (trap && trap.value.trim() !== "") {
          event.preventDefault();
          event.stopImmediatePropagation();
          return;
        }

        // Small per-page cooldown reduces accidental rapid double-submits.
        const now = Date.now();
        const previous = lastSubmit.get(form) || 0;

        if (now - previous < COOLDOWN_MS) {
          event.preventDefault();
          event.stopImmediatePropagation();
          return;
        }

        lastSubmit.set(form, now);
      },
      true
    );
  });
})();
