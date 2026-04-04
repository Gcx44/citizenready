  ---
  Plan de publication LeafReady

  Phase 1 — Test final local (avant tout build de prod)

  iOS Simulator
  cd apps/mobile
  npx expo start --ios

  Android Studio (émulateur)
  npx expo start --android

  Check-list à valider :
  - Langue FR et EN (changer la langue système du simulateur)
  - Mode sombre / clair
  - Quiz 10 / 20 / 40 questions
  - Écran résultats
  - Écran stats (vide + avec données)
  - Pas de crash au retour arrière

  ---
  Phase 2 — Build de production avec EAS

  Tu dois avoir EAS CLI installé et être connecté :
  npm install -g eas-cli
  eas login

  Lier le projet à ton compte Expo :
  eas init   # génère le projectId dans app.json

  Build iOS (archive .ipa pour l'App Store) :
  eas build --platform ios --profile production
  ▎ EAS te demandera de te connecter avec ton Apple Developer account pour gérer les
  certificats. Il gère tout automatiquement.

  Build Android (AAB pour le Play Store) :
  eas build --platform android --profile production

  ---
  Phase 3 — App Store (Apple)

  1. Sur App Store Connect → New App
    - Bundle ID : ca.leafready.app
    - SKU : leafready
    - Primary language : English (ou French)
  2. Remplir les métadonnées (tu as déjà les descriptions dans store/)
  3. Screenshots requis : iPhone 6.5" + iPad 12.9" (si supportsTablet: true)
  4. Soumettre le build EAS directement :
  eas submit --platform ios --profile production
  5. Passer la review Apple (48-72h en général)

  ---
  Phase 4 — Google Play Store

  1. Sur Google Play Console → Créer une application
    - Package : ca.leafready.app
  2. Remplir les métadonnées + screenshots (minimum 2)
  3. Important : première publication = Upload manuel du .aab
  eas submit --platform android --profile production
  3. Ou upload manuel dans Play Console → Production → Releases
  4. Compléter le questionnaire de conformité (données collectées, public cible, etc.)
  5. Soumission → review Google (quelques heures à 24h)

  ---
  Points d'attention avant de soumettre

  - Screenshots : les as-tu déjà ? C'est souvent ce qui prend le plus de temps.
  - Privacy policy : obligatoire sur les deux stores. As-tu une URL ?
  - App Store Connect : il faut que ton Apple Developer account soit actif (99$/an).
  - Les stores vérifient que versionCode: 1 et buildNumber: "1" correspondent à un premier
  upload — c'est bon de ton côté.