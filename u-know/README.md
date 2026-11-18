# u-know — lightweight browser-side form guard

## What it does

- Applies only to forms marked with `data-guard`.
- Adds a visually hidden honeypot field named `company_website`.
- Blocks submissions when that field is filled.
- Adds a short per-page cooldown to reduce accidental rapid double-submits.
- Does not patch global APIs, replace `fetch`, or affect forms without the opt-in attribute.

## Use as a snippet

Add `data-guard` to the forms you want to cover:

```html
<form data-guard action="/contact" method="post">
  <!-- Your existing fields -->
  <button type="submit">Send</button>
</form>
```

Then copy the contents of `client-guard.js` into an existing browser-side JavaScript file.

## Important security limitations

This is lightweight client-side friction, not bot-proofing and not DDoS protection.
A client can disable JavaScript, remove the honeypot, ignore the cooldown, or send
requests directly to the server. The in-memory cooldown also resets on page reload.

For real protection, enforce controls on the server:
- Per-IP, per-account, and per-endpoint rate limits.
- Request/body size limits and strict input validation.
- CDN/WAF DDoS protection and caching where appropriate.
- Server-verified bot challenges for sensitive public forms.
- Monitoring, alerting, and sensible upstream capacity limits.

Never trust a client-side check for authorization, identity, or abuse prevention.
