# Codex du Voyageur — alnrfLO

Dashboard gaming personnel (League of Legends, Valorant, TFT, Genshin Impact,
Honkai: Star Rail, Wuthering Waves) réalisé en HTML/CSS/JS pur — aucun
framework, aucune dépendance à installer.

## Structure du projet

```
index.html          → redirige automatiquement vers dashboard.html
dashboard.html       → page d'accueil (hub avec toutes les cartes de jeux)
style.css             → styles partagés par toutes les pages
script.js              → particules, thème jour/nuit, export image, navigation
data.json              → toutes les stats en un seul endroit (référence / futur usage)
pages/
  lol.html              → page dédiée League of Legends
  valorant.html         → page dédiée Valorant
  tft.html               → page dédiée Teamfight Tactics
  genshin.html          → page dédiée Genshin Impact
  hsr.html                → page dédiée Honkai: Star Rail
  wuwa.html              → page dédiée Wuthering Waves
```

⚠️ **Les fichiers doivent rester ensemble**, dans la même arborescence
(notamment le dossier `pages/` à côté de `dashboard.html`), sinon les liens
relatifs et le CSS/JS partagés ne se chargeront pas.

## Utilisation en local

Double-clique sur `index.html` (ou `dashboard.html`) pour l'ouvrir dans ton
navigateur. Aucun serveur n'est nécessaire — tout fonctionne en `file://`.

## Héberger en ligne (GitHub Pages)

1. Crée un repo GitHub (public) et pousse tous ces fichiers à la racine.
2. Dans **Settings → Pages**, choisis la branche `main` et le dossier `/root`.
3. Ton site sera disponible à `https://<ton-pseudo>.github.io/<nom-du-repo>/`.

Comme tout est statique, ça marche aussi tel quel sur Netlify, Vercel ou
Cloudflare Pages (glisser-déposer le dossier suffit sur Netlify Drop).

## Mettre les stats à jour

Les données sont actuellement codées en dur dans chaque page HTML (dans
`.card-detail` / `.detail-content`). `data.json` centralise les mêmes valeurs
pour référence, mais n'est pas encore chargé dynamiquement par les pages —
ce serait une évolution possible (fetch du JSON en JS au chargement de
chaque page pour éviter de dupliquer les chiffres à la main).

Pour rafraîchir les stats avec les vraies valeurs actuelles, redemande à
Claude dans la conversation : *"rafraîchis mon dashboard"*.

## Fonctionnalités

- Navigation clavier entre les jeux (← / →) sur chaque page
- Fondu de transition entre les pages
- Mode nuit (persiste seulement pendant la session, pas de stockage local)
- Export du dashboard en image PNG
- Fil d'ariane + barre de navigation rapide entre tous les jeux
- Bandeau "Vue d'ensemble" avec compteurs animés (parties classées, royaumes suivis, meilleur taux, temps de jeu, hauts faits)
- Section "Faits marquants" calculée à partir des vraies stats (meilleur champion/rôle/unité, etc.)
- Emblèmes de rang officiels (League/TFT via Community Dragon, Valorant via valorant-api.com)
- Graphiques en anneau (donut) pour les répartitions winrate / précision de tir / top4-bottom4
- Vrais splash arts (League, TFT, Genshin) et avatars ronds en bandeau sur le hub
- Léger effet de parallaxe (tilt 3D) au survol des cartes du hub

## Provenance des images

Toutes les images externes viennent de CDN publics déjà utilisés par op.gg / les jeux :
`ddragon.leagueoflegends.com`, `opgg-static.akamaized.net`, `raw.communitydragon.org` (emblèmes de rang),
`media.valorant-api.com` (icônes de rang Valorant), `enka.network` (Genshin / HSR). Aucune clé API requise.

## Limites connues

- **Valorant** : op.gg n'a pas encore synchronisé le profil (rang/agents/K-D
  indisponibles). Il faut cliquer sur "Mettre à jour" sur op.gg côté joueur.
- **Genshin / HSR** : seul le personnage mis en avant dans la vitrine Enka
  est visible publiquement. Activer le partage complet en jeu pour afficher
  tout le roster.
- **Wuthering Waves** : aucun tracker public lié — en attente d'un lien
  (type wuwatracker.com) pour aller chercher les vraies stats.
- **Style (runes/perks) et partie en cours (LoL)** : pages non récupérées
  pour l'instant, à ajouter dans une prochaine itération.
