# Codex du Voyageur — alnrfLO

Dashboard gaming personnel (League of Legends, Valorant, TFT, Genshin Impact,
Honkai: Star Rail, Wuthering Waves) réalisé en HTML/CSS/JS pur — aucun
framework, aucune dépendance à installer, aucune étape de build.

## Structure du projet

```
index.html   → page unique (SPA) : sidebar de navigation + zone de contenu
style.css     → tous les styles (thème "Codex", fonts, cartes, mode nuit, sidebar)
data.js        → toutes les stats, dans window.DASH_DATA
app.js          → routage (hash-based : #/lol, #/valorant, ...) + rendu des pages
```

Tout est contenu dans ces 4 fichiers à la racine — pas de sous-dossiers, pas
de liens relatifs fragiles.

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

Pour rafraîchir les stats avec les vraies valeurs actuelles, redemande à
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

- **Valorant** : op.gg ne fournit pas l'historique de partie complet par scraping — seules les stats agrégées et la dernière partie sont disponibles.
- **Genshin / HSR** : seul le personnage mis en avant dans la vitrine Enka est visible publiquement. Activer le partage complet en jeu pour afficher tout le roster.
- **Wuthering Waves** : profil créé sur WuWaBuilds (UID 576656267, serveur NA) mais aucune donnée synchronisée — contrairement à Enka, WuWaBuilds nécessite un import manuel via le bot Discord `wuwa-bot` + wuwa.build/import.
