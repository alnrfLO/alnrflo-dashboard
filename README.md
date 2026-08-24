# Codex du Voyageur — alnrfLO

Dashboard gaming personnel (League of Legends, Valorant, TFT, Genshin Impact,
Honkai: Star Rail, Wuthering Waves) réalisé en HTML/CSS/JS pur — aucun
framework, aucune dépendance à installer, aucune étape de build.

## Structure du projet

```
index.html                        → page unique (SPA) : sidebar de navigation + zone de contenu
style.css                          → tous les styles (thème "Codex", fonts, cartes, mode nuit, sidebar)
data.js                             → toutes les stats, dans window.DASH_DATA
app.js                               → routage (hash-based : #/lol, #/valorant, ...) + rendu des pages
scripts/refresh-data.mjs              → régénère data.js depuis les APIs publiques (voir plus bas)
.github/workflows/refresh-data.yml     → fait tourner ce script tous les jours automatiquement
```

Le site lui-même reste 4 fichiers statiques à la racine — pas de sous-dossiers,
pas de liens relatifs fragiles. `scripts/` et `.github/` ne sont utiles qu'au
rafraîchissement automatique des données, jamais chargés par le navigateur.

## Utilisation en local

Double-clique sur `index.html` pour l'ouvrir dans ton navigateur. Aucun
serveur n'est nécessaire — tout fonctionne en `file://`.

## Héberger en ligne (GitHub Pages)

1. Pousse tous ces fichiers à la racine d'un repo GitHub (public).
2. Dans **Settings → Pages**, choisis la branche `main` et le dossier `/root`.
3. Ton site sera disponible à `https://<ton-pseudo>.github.io/<nom-du-repo>/`.

Comme tout est statique, ça marche aussi tel quel sur Netlify, Vercel ou
Cloudflare Pages (glisser-déposer le dossier suffit sur Netlify Drop).

## Mettre les stats à jour

Toutes les données vivent dans `data.js` (`window.DASH_DATA`), un seul objet
JS organisé par jeu (`lol`, `valorant`, `tft`, `genshin`, `hsr`, `wuwa`) plus
la liste des jeux affichés dans la sidebar (`games`). Modifier ce fichier
suffit à mettre à jour toutes les pages, aucune duplication de chiffres.

### Rafraîchissement automatique

Un [GitHub Action](.github/workflows/refresh-data.yml) tourne **chaque jour à
6h UTC** (et peut être lancé à la main depuis l'onglet *Actions* du repo → 
*Refresh dashboard data* → *Run workflow*). Il exécute `scripts/refresh-data.mjs`,
qui va chercher les vraies données publiques et régénère `data.js` tout seul,
puis commit/push le résultat si quelque chose a changé.

Sources actuellement automatisées, sans aucune action de ta part :
- **Genshin Impact** — via l'API publique d'[Enka.network](https://enka.network) :
  tout ton roster de personnages showcasé (pas juste la vitrine mise en avant),
  avec une Crit Value calculée nous-mêmes (2×Taux Crit + DGT Crit, uniquement
  la part venant des artéfacts — la même formule qu'Akasha.cv) pour ne pas
  dépendre d'Akasha, qui bloque les accès automatisés.
- **Wuthering Waves** — via `api.wuwa.build`, l'API JSON publique derrière
  WuWaBuilds (aucune protection anti-bot, tout est en clair).

Sources **pas encore automatisées** :
- **League of Legends / TFT** — op.gg bloque le scraping. La seule voie
  fiable est l'API officielle Riot Games (gratuite). Une fois que tu as une
  clé (voir ci-dessous), redemande-moi de la brancher dans le script.
- **Valorant** — Riot ne donne pas accès à son API de stats/matchs Valorant
  aux clés de développeur personnelles (accès réservé aux partenaires
  esport) ; ça restera manuel pour l'instant.

Pour ajouter LoL/TFT à l'auto-refresh :
1. Va sur [developer.riotgames.com](https://developer.riotgames.com/), connecte-toi avec ton compte Riot.
2. Génère une clé "Development API Key" (gratuite, valable 24h — il faudra la régénérer à chaque expiration tant que tu n'as pas de clé personnelle/production).
3. Dans le repo GitHub → **Settings → Secrets and variables → Actions → New repository secret**, crée un secret nommé `RIOT_API_KEY` avec cette valeur (ne me la donne jamais directement dans la conversation).
4. Reviens me voir : je branche le script pour qu'il l'utilise.

Tu peux aussi lancer le script toi-même en local à tout moment :
```
node scripts/refresh-data.mjs
```

Sinon, pour rafraîchir manuellement une source non automatisée, redemande à
Claude dans la conversation : *"rafraîchis mon dashboard"*.

## Fonctionnalités

- Navigation par sidebar persistante (avatar de chaque jeu + statut suivi/en attente)
- Routage par hash (`#/lol`, `#/valorant`, ...) — chaque page a son URL, retour arrière navigateur fonctionnel
- Résumé dense "par royaume" sur la page d'accueil (stats clés de chaque jeu en un coup d'œil)
- Navigation clavier entre les jeux (← / →)
- Mode nuit (persisté via `localStorage`), disponible partout
- Export du dashboard en image PNG
- Emblèmes de rang officiels (League/TFT via Community Dragon, Valorant via valorant-api.com)
- Graphiques en anneau (donut) et jauges SVG pour les répartitions winrate / précision de tir / top4-bottom4
- Vrais splash arts et portraits (League, TFT, Genshin, HSR) — aucune icône décorative, uniquement des images réelles ou rien
- Sidebar responsive (bascule en menu mobile sous 900px)

## Provenance des images

Toutes les images externes viennent de CDN publics déjà utilisés par op.gg / les jeux :
`ddragon.leagueoflegends.com`, `opgg-static.akamaized.net`, `raw.communitydragon.org` (emblèmes de rang),
`media.valorant-api.com` (icônes de rang et cartes joueur Valorant), `enka.network` (Genshin / HSR). Aucune clé API requise.

## Limites connues

- **Valorant** : op.gg ne fournit pas l'historique de partie complet par scraping — seules les stats agrégées et la dernière partie sont disponibles. Pas d'auto-refresh possible (voir plus haut).
- **LoL / TFT** : mis à jour à la main pour l'instant — auto-refresh prêt à être branché dès qu'une clé API Riot est disponible (voir plus haut).
- **HSR** : toujours mis à jour à la main (vitrine Enka single-personnage) — pas encore migré vers le même système multi-personnages que Genshin.
- **Genshin / Wuthering Waves** : entièrement automatiques, voir la section rafraîchissement automatique ci-dessus.
