# Web Addon Library

A small, auditable browser-side addon example.

## Structure

- `web/loader.js` — explicitly loads the addon module.
- `executable/addon.js` — registers a small, allowlisted developer console interface.

## Usage

Serve this repository over HTTP(S), then include `web/loader.js` from a page as an ES module:

```html
<script type="module" src="./web/loader.js"></script>
```

Open the browser developer console and run `webAddon("help")`.

This is a client-side developer utility, not an authentication or authorization boundary. Anyone who can load the page can inspect and invoke its client code. Do not put secrets or privileged server operations in this addon.