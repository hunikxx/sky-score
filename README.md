# Sky Score

**How photogenic is the sky right now?** Sky Score rates the sky at any location on a 0–100 scale based on cloud cover, cloud type, visibility, and weather conditions — for the past, present, or future.

---

## Features

- **Search by city or zip code** — type a city name (e.g. "Tokyo") or a US zip code (e.g. "90210")
- **GPS location** — tap "Use my location" to auto-detect your position with reverse geocoding that resolves to a real city/area name
- **Time travel** — pick any date and time to score the sky historically (back to 1940) or check the forecast (up to 16 days ahead)
- **Composite scoring** — four weighted sub-scores combine into a single 0–100 Sky Score
- **Dynamic backgrounds** — the entire page shifts to match the sky conditions, with separate palettes for daytime and nighttime
- **Fully responsive** — works on desktop, tablet, and mobile with proper touch targets and iOS zoom prevention
- **Zero dependencies** — single HTML file, no build step, no API keys required

## Scoring Methodology

Sky Score is a weighted composite of four sub-scores, each rated 0–100:

| Sub-score | Weight | What it measures |
|---|---|---|
| **Clear Sky** | 40% | Cloud cover percentage. 20–30% coverage scores highest because scattered clouds add visual interest to an otherwise blank sky. |
| **Pretty Clouds** | 25% | Cloud altitude distribution. High-altitude and mid-level clouds are dramatic and photogenic. Low, flat clouds are penalized. |
| **Visibility** | 20% | Atmospheric clarity in km. Higher visibility means crisper, more vivid skies. |
| **Conditions** | 15% | Current weather events. Clear or partly cloudy scores best; rain, fog, and storms pull the score down. |

**Formula:**

```
Sky Score = (ClearSky × 0.40) + (PrettyClouds × 0.25) + (Visibility × 0.20) + (Conditions × 0.15)
```

### Score Tiers

| Score | Verdict | Description |
|---|---|---|
| 85–100 | **Stunning** | Exceptional sky conditions. Grab your camera. |
| 70–84 | **Beautiful** | Great sky with clear views and lovely cloud formations. |
| 50–69 | **Decent** | Reasonable sky, some cloud cover but still worth a look up. |
| 30–49 | **Meh** | Heavy clouds or reduced visibility. |
| 0–29 | **Gloomy** | Overcast, foggy, or stormy conditions. |

## Data Sources

All weather data comes from [Open-Meteo](https://open-meteo.com/), a free, open-source weather API. No API key is required.

| Time range | API used |
|---|---|
| Live (current moment) | Open-Meteo Forecast API — `current` + `hourly` data |
| Future (up to 16 days) | Open-Meteo Forecast API — `start_date` / `end_date` |
| Recent past (≤3 months) | Open-Meteo Forecast API — historical mode |
| Older history (back to 1940) | Open-Meteo Archive API — ERA5 reanalysis |

Additional services:
- **City geocoding** — [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- **Zip code geocoding** — [Zippopotam.us](https://api.zippopotam.us/) (US zip codes)
- **Reverse geocoding (GPS)** — [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/)

## Setup

### Quick Start

1. Download `sky-score.html`
2. Rename it to `index.html`
3. Open it in a browser — that's it

### Deploy to GitHub Pages

```bash
# Create a repo and push
git init
mv sky-score.html index.html
git add index.html
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sky-score.git
git push -u origin main
```

Then go to **Settings → Pages**, select `main` branch, and your site will be live at:

```
https://YOUR_USERNAME.github.io/sky-score/
```

### Custom Domain (Optional)

1. Buy a domain from any registrar (Namecheap, Cloudflare, Porkbun, etc.)
2. Add DNS records pointing to GitHub Pages:
   - **A records** (for apex domain): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME record** (for www): `YOUR_USERNAME.github.io.`
3. In your repo, go to **Settings → Pages → Custom domain** and enter your domain
4. Enable **Enforce HTTPS** once the SSL certificate is provisioned

## Project Structure

```
sky-score/
├── index.html              ← the app (single self-contained file)
├── manifest.webmanifest    ← PWA manifest
├── sw.js                   ← service worker (offline + API caching)
├── icon.svg                ← vector source for app icon
├── icon-maskable.svg       ← maskable variant (Android adaptive)
├── icons/                  ← rasterized PWA icons + Apple splash screens
├── assets/                 ← @capacitor/assets source images
├── capacitor.config.json   ← Capacitor app config
├── package.json            ← Node deps for Capacitor wrapper
├── scripts/build-web.js    ← copies static site → www/ for Capacitor
├── ios/                    ← generated Xcode project (from `cap add ios`)
└── android/                ← generated Android Studio project
```

The web app is still a single self-contained HTML file. The Node/Capacitor side only exists to package it as native iOS/Android apps — you can ignore it entirely if you only care about the web/PWA.

## App Version (PWA + Capacitor)

The site is also a **Progressive Web App**. On iOS Safari or Android Chrome, tap "Add to Home Screen" to install — it runs full-screen with offline support.

For native App Store / Play Store builds, this repo ships with a Capacitor wrapper.

### Prerequisites
- Node 18+ (for `npm install`)
- Xcode + CocoaPods (`brew install cocoapods`) — iOS builds
- Android Studio — Android builds

### Build & Run

```bash
npm install              # one-time
npm run sync             # copy web assets → www/, sync into ios/ + android/
npm run ios              # opens Xcode → Run on simulator/device
npm run android          # opens Android Studio → Run
```

To regenerate icons / splash screens after editing `assets/icon.png`:

```bash
npx @capacitor/assets generate \
  --iconBackgroundColor '#7BB7E5' \
  --iconBackgroundColorDark '#1A2A3F' \
  --splashBackgroundColor '#F6F4F0' \
  --splashBackgroundColorDark '#1A1A1A'
```

### App Identity
- **Name:** Sky Palette
- **Bundle ID:** `today.howsthesky.app`

## Browser Support

Works in all modern browsers: Chrome, Firefox, Safari, Edge. GPS location requires HTTPS (which GitHub Pages provides automatically).

## License

MIT — use it however you like.
