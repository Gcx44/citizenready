<div align="center">

<img src="apps/web/public/favicon.svg" width="80" alt="LeafReady maple leaf logo" />

# LeafReady

**Free bilingual practice quiz for the Canadian citizenship test**

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![Expo](https://img.shields.io/badge/Expo-SDK%2055-000020?logo=expo)](https://expo.dev)
[![Questions](https://img.shields.io/badge/Questions-450%2B-D42B2B)](packages/core/src/questions.json)
[![Bilingual](https://img.shields.io/badge/Bilingual-EN%20%7C%20FR-0052CC)](https://www.canada.ca)

[🇨🇦 English](#) · [🇨🇦 Français](#)

</div>

---

Based exclusively on the official [**Discover Canada / Découvrir le Canada**](https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada.html) guide from Immigration, Refugees and Citizenship Canada.

## Features

- **450+ questions** drawn directly from the official study guide
- **Same format as the real test** — 20 random questions, 45-minute timer, 75% to pass
- **Immediate feedback** with source reference (section + PDF page link)
- **Fully bilingual** — English and French, switchable mid-session
- **No account needed** — statistics stored locally in your browser / on your device
- **Dark mode** — web toggle or system preference on mobile
- **Mobile app** — iOS & Android via Expo (React Native)

## Requirements

- Node.js 18+
- npm 7+ (workspaces support)

## Monorepo structure

```
citizenship/
├── apps/
│   ├── web/        # Next.js 15 web app
│   └── mobile/     # Expo (React Native) iOS/Android app
├── packages/
│   └── core/       # Shared logic: questions, quiz, stats, translations
└── package.json    # Workspace root
```

## Installation

```bash
git clone https://github.com/Gcx44/leafready.git
cd leafready
npm install          # installs all workspaces at once
```

> **Note:** The official study guide PDFs are not included in the repository.
> Place them manually in `apps/web/public/documents/` if you want source links to work locally:
>
> - `apps/web/public/documents/discover.pdf`
> - `apps/web/public/documents/decouvrir.pdf`
>
> You can download them from [canada.ca](https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada.html).

## Running the web app

All commands run from the **monorepo root**:

```bash
npm run dev:web      # Dev server → http://localhost:3000
npm run build:web    # Production build
npm run lint:web     # ESLint
```

## Running the mobile app (iOS/Android)

### Prerequisites (Mac)

To run on a simulator you need either:

- **iOS simulator** — install [Xcode](https://developer.apple.com/xcode/) from the Mac App Store
- **Android emulator** — install [Android Studio](https://developer.android.com/studio) and create a virtual device (AVD)

The quickest option without installing any simulator: install **[Expo Go](https://expo.dev/go)** on your physical iPhone or Android device.

### Start the Expo dev server

```bash
npm run dev:mobile
```

This runs `expo start` inside `apps/mobile/`. An interactive menu appears in the terminal:

| Key | Action                                                        |
| --- | ------------------------------------------------------------- |
| `i` | Open in iOS Simulator (requires Xcode)                        |
| `a` | Open in Android Emulator (requires Android Studio)            |
| `s` | Switch to Expo Go mode, then scan the QR code with your phone |

> **Physical device:** make sure your phone and Mac are on the **same Wi-Fi network**, then scan the QR code with:
>
> - iPhone → the native **Camera** app
> - Android → the **Expo Go** app

## Contributing

Contributions are welcome. The most impactful way to help is to **add or improve questions**.

### Adding questions

All questions live in [`packages/core/src/questions.json`](packages/core/src/questions.json). Each entry must follow this schema:

```json
{
  "id": 386,
  "category": "government",
  "en": {
    "question": "What is the name of Canada's national anthem?",
    "choices": [
      "O Canada",
      "God Save the King",
      "The Maple Leaf Forever",
      "True North Strong and Free"
    ],
    "answer": 0
  },
  "fr": {
    "question": "Quel est le nom de l'hymne national du Canada ?",
    "choices": [
      "Ô Canada",
      "God Save the King",
      "The Maple Leaf Forever",
      "Vrai Nord fort et libre"
    ],
    "answer": 0
  },
  "source": {
    "page_en": 45,
    "page_fr": 47,
    "section_en": "Symbols of Canada",
    "section_fr": "Symboles du Canada"
  }
}
```

**Rules:**

- `id` must be unique and sequential (no gaps)
- Both `en` and `fr` versions are required
- `answer` is the **index** (0–3) of the correct choice in `choices`
- Content must come **exclusively** from the official Discover Canada guide
- `source.page_*` can be approximate

**Valid categories:**

| Key                       | Label                     |
| ------------------------- | ------------------------- |
| `rights_responsibilities` | Rights & Responsibilities |
| `who_we_are`              | Who We Are                |
| `history_aboriginal`      | Aboriginal History        |
| `history_european`        | European History          |
| `modern_canada`           | Modern Canada             |
| `government`              | Government                |
| `federal_elections`       | Federal Elections         |
| `justice_system`          | Justice System            |
| `symbols`                 | Canadian Symbols          |
| `economy`                 | Economy                   |
| `regions`                 | Canada's Regions          |

### Other contributions

- Bug fixes
- UI/UX improvements
- Accessibility improvements
- Translation corrections

Please **open an issue** before starting significant work.

## Tech Stack

| Layer     | Web                                            | Mobile                                                           |
| --------- | ---------------------------------------------- | ---------------------------------------------------------------- |
| Framework | [Next.js 15](https://nextjs.org) (App Router)  | [Expo](https://expo.dev) + Expo Router                           |
| Styling   | [Tailwind CSS v3](https://tailwindcss.com)     | [NativeWind v4](https://www.nativewind.dev)                      |
| i18n      | [next-intl](https://next-intl-docs.vercel.app) | [i18n-js](https://github.com/fnando/i18n-js) + expo-localization |
| Data      | `@leafready/core` (shared package)             | `@leafready/core` (shared package)                               |
| Stats     | `localStorage`                                 | `AsyncStorage`                                                   |
| Hosting   | [Netlify](https://netlify.com)                 | App Store / Play Store (coming soon)                             |

No backend. No database. No cookies. No account required.

## Deployment

The web app is configured for [Netlify](https://netlify.com):

```toml
# apps/web/netlify.toml
[build]
  base    = "apps/web"
  command = "cd ../.. && npm install && npm run build:web"
  publish = ".next"
```

Language-based redirects are configured automatically (EN/FR based on browser language).

## Disclaimer

This is an **unofficial** practice tool. It is not affiliated with, endorsed by, or connected to the Government of Canada or Immigration, Refugees and Citizenship Canada (IRCC).

The official study guide remains the only authoritative source for the citizenship test.

## License

[MIT](LICENSE)
