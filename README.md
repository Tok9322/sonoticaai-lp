# SONOTICA AI Portfolio

A one-page portfolio for the SONOTICA AI music label.

- Live: https://sonotica.pages-hub.com/
- Stack: HTML / CSS / JS (static), Netlify

## Project Structure
- `index.html` — Main single-page site
- `styles.css` — Styling (glassmorphism, responsive grids, animations)
- `script.js` — Smooth scroll, Spotify embed loader, unreleased tracks player, footer year
- `images/` — Logos, icons, favicons, assets

## Local Development
Open `index.html` directly in your browser.

## Deploy (Netlify)
This site is deployed via Netlify. Any push to the tracked branch triggers an automatic deploy.

- Build command: (none)
- Publish directory: `.`

If needed, you can trigger manually from the Netlify dashboard: `Deploys` → `Trigger deploy`.

## Custom Domain
Configured for `sonotica.pages-hub.com` with HTTPS (Let’s Encrypt).

## Editing Content
- Artists & Releases: Update sections in `index.html`
- Spotify embeds: Set the `data-spotify-src` on each `.spotify-embed`
- Apple Music / Spotify links in Artists: Replace `href` values in `.listen-row`
- Unreleased player: Add track objects to `script.js` `unreleasedTracks`

## License
All rights reserved.
