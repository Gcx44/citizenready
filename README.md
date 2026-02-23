<div align="center">

<img src="public/favicon.svg" width="80" alt="LeafReady maple leaf logo" />

# LeafReady

**Free bilingual practice quiz for the Canadian citizenship test**

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![Questions](https://img.shields.io/badge/Questions-385%2B-D42B2B)](src/data/questions.json)
[![Bilingual](https://img.shields.io/badge/Bilingual-EN%20%7C%20FR-0052CC)](https://www.canada.ca)

[🇨🇦 English](#) · [🇨🇦 Français](#)

</div>

---

Based exclusively on the official [**Discover Canada / Découvrir le Canada**](https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada.html) guide from Immigration, Refugees and Citizenship Canada.

## Features

- **385+ questions** drawn directly from the official study guide
- **Same format as the real test** — 20 random questions, 45-minute timer, 75% to pass
- **Immediate feedback** with source reference (section + PDF page link)
- **Fully bilingual** — English and French, switchable mid-session
- **No account needed** — statistics stored locally in your browser
- **Dark mode** — toggle between light and dark themes
- **Mobile-friendly** — works on any device

## Requirements

- Node.js 18+
- npm

## Installation

```bash
git clone https://github.com/Gcx44/citizenready.git
cd citizenready
npm install
```

> **Note:** The official study guide PDFs are not included in the repository (large binary files).
> Place them manually in `public/documents/` if you want source links to work locally:
>
> - `public/documents/discover.pdf`
> - `public/documents/decouvrir.pdf`
>
> You can download them from [canada.ca](https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada.html).

## Usage

```bash
# Start development server
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Run linter
npm run lint
```

## Contributing

Contributions are welcome. The most impactful way to help is to **add or improve questions**.

### Adding questions

All questions live in [`src/data/questions.json`](src/data/questions.json). Each entry must follow this schema:

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

| Layer     | Choice                                         |
| --------- | ---------------------------------------------- |
| Framework | [Next.js 15](https://nextjs.org) (App Router)  |
| Styling   | [Tailwind CSS v3](https://tailwindcss.com)     |
| i18n      | [next-intl](https://next-intl-docs.vercel.app) |
| Data      | Static JSON (`src/data/questions.json`)        |
| Stats     | `localStorage`                                 |
| Hosting   | [Netlify](https://netlify.com)                 |

No backend. No database. No cookies. No account required.

## Deployment

The app is configured for [Netlify](https://netlify.com):

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Language-based redirects are configured automatically (EN/FR based on browser language).

## Disclaimer

This is an **unofficial** practice tool. It is not affiliated with, endorsed by, or connected to the Government of Canada or Immigration, Refugees and Citizenship Canada (IRCC).

The official study guide remains the only authoritative source for the citizenship test.

## License

[MIT](LICENSE)
