# CitizenReady — CLAUDE.md projet

Quiz d'entraînement au test de citoyenneté canadienne. Bilingue EN/FR.
Basé exclusivement sur le guide officiel "Discover Canada" / "Découvrir le Canada".

## Stack

| Couche      | Choix                                     |
| ----------- | ----------------------------------------- |
| Framework   | Next.js 15 (App Router)                   |
| Styling     | Tailwind CSS v3 (`darkMode: "class"`)     |
| i18n        | next-intl (middleware + App Router)       |
| Data        | JSON statique (`src/data/questions.json`) |
| Stats       | localStorage (`citizenready_stats`)        |
| Hébergement | Netlify (plugin `@netlify/plugin-nextjs`) |

## Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (passthrough)
│   └── [locale]/
│       ├── layout.tsx          # HTML + NextIntlClientProvider + ThemeProvider + script anti-FOUC
│       ├── page.tsx            # Page d'accueil
│       └── quiz/
│           └── page.tsx        # Quiz (délègue à QuizContainer)
├── components/
│   ├── QuizContainer.tsx       # Logique complète du quiz (client)
│   ├── ResultsView.tsx         # Résultats + révision des questions
│   ├── Timer.tsx               # Compte à rebours 45 min
│   ├── ProgressBar.tsx         # Barre de progression
│   ├── LanguageSwitcher.tsx    # Toggle EN ↔ FR + ThemeToggle intégré
│   ├── StatsCard.tsx           # Stats depuis localStorage
│   ├── ThemeProvider.tsx       # Context dark/light + toggle (client)
│   └── ThemeToggle.tsx         # Bouton soleil/lune (client)
├── data/
│   └── questions.json          # Banque de ~385 questions bilingues (IDs 1-400, gap 251-265)
├── i18n/
│   ├── routing.ts              # Locales : ['en', 'fr'], défaut: 'en'
│   └── request.ts              # Config next-intl server-side
├── lib/
│   ├── quiz.ts                 # selectQuestions(), calculateScore()
│   └── stats.ts                # loadStats(), saveStats(), clearStats()
├── messages/
│   ├── en.json                 # Strings UI EN
│   └── fr.json                 # Strings UI FR
└── middleware.ts               # Détection locale + redirect

public/
└── favicon.svg                 # Feuille d'érable rouge (SVG, #D42B2B)
```

## Format questions.json

```json
[
  {
    "id": 1,
    "category": "rights_responsibilities",
    "en": {
      "question": "...",
      "choices": ["A", "B", "C", "D"],
      "answer": 0
    },
    "fr": {
      "question": "...",
      "choices": ["A", "B", "C", "D"],
      "answer": 0
    },
    "source": {
      "page_en": 9,
      "page_fr": 9,
      "section_en": "Rights and Responsibilities of Citizenship",
      "section_fr": "Droits et responsabilités liés à la citoyenneté"
    }
  }
]
```

Catégories valides : `rights_responsibilities` | `who_we_are` | `history_aboriginal` |
`history_european` | `modern_canada` | `government` | `federal_elections` |
`justice_system` | `symbols` | `economy` | `regions`

**Note sur les IDs :** Les IDs 251–265 sont absents (jamais créés). Ce n'est pas un bug — le quiz fonctionne correctement avec les 385 questions disponibles.

## Commandes

```bash
npm install          # Installer les dépendances
npm run dev          # Serveur de dev → http://localhost:3000
npm run build        # Build de production
npm run lint         # ESLint
```

## Dark mode

- Tailwind `darkMode: "class"` — la classe `dark` est gérée sur `<html>`
- **ThemeProvider** (`src/components/ThemeProvider.tsx`) : context React, lit/écrit `localStorage.theme`
- **ThemeToggle** (`src/components/ThemeToggle.tsx`) : bouton soleil/lune dans le header (intégré dans `LanguageSwitcher`)
- **Script anti-FOUC** dans `src/app/[locale]/layout.tsx` : applique la classe avant le premier rendu pour éviter le flash
- Tous les composants ont des variantes `dark:` correspondantes

## Favicon

- `public/favicon.svg` — feuille d'érable rouge (`#D42B2B`)
- Référencé dans le metadata de `src/app/[locale]/layout.tsx` via `icons: { icon: '/favicon.svg' }`

## Documents source

Les PDFs officiels **ne sont pas trackés dans git** (`.gitignore`).
Les placer manuellement dans `public/documents/` pour que les liens sources fonctionnent en dev :

- `public/documents/discover.pdf` — Guide EN
- `public/documents/decouvrir.pdf` — Guide FR

Téléchargeables sur [canada.ca](https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada.html).

En production (Netlify), les PDFs doivent être fournis manuellement (upload ou LFS).

## Conventions

- Tout ajout de question se fait dans `src/data/questions.json` directement (fichier unique)
- Les IDs sont séquentiels, pas de trous intentionnels (le gap 251-265 est une exception historique)
- Chaque question doit avoir EN + FR + source (page approximative acceptée)
- Le texte de l'app (UI) est dans `src/messages/{en,fr}.json`
- Pas de backend, pas de DB, pas de cookies — localStorage uniquement pour les stats

## Déploiement Netlify

1. Connecter le repo GitHub à Netlify
2. Build command : `npm run build`
3. Publish dir : `.next`
4. Plugin `@netlify/plugin-nextjs` (dans `netlify.toml`)
5. Uploader les PDFs manuellement dans `public/documents/` via Netlify UI ou CLI
6. Domaines : `discover.ca` et `decouvre.ca` → configurer dans Netlify DNS

# currentDate

Today's date is 2026-02-20.
