/* ============================================================
   Single source of truth for the whole dashboard.
   Every page is rendered from this object by app.js — update
   stats here and every view (home + game pages) reflects it.
   ============================================================ */
window.DASH_DATA = {
  player: { riotId: "alnrfLO#93K", region: "EUW", season: "2026", updated: "27 juillet 2026" },

  games: [
    { id: "lol",      name: "League of Legends",  short: "LoL",     avatar: "https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon6860.jpg?image=q_auto:good,f_png,w_200", source: "op.gg",        status: "active" },
    { id: "valorant", name: "Valorant",            short: "VAL",     avatar: "https://c-valorant-api.op.gg/Assets/PlayerCards/FAA3C3B5-4B0B-1F20-B383-01B7B83126FF_small.png?image=q_auto:good,f_png,w_128", source: "op.gg",        status: "active" },
    { id: "tft",      name: "Teamfight Tactics",   short: "TFT",     avatar: "https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon6860.jpg?image=q_auto:good,f_png,w_200", source: "op.gg",        status: "active" },
    { id: "genshin",  name: "Genshin Impact",      short: "GI",      avatar: "https://enka.network/ui/UI_AvatarIcon_Furina.png", source: "enka.network", status: "active" },
    { id: "hsr",      name: "Honkai: Star Rail",   short: "HSR",     avatar: "https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/AvatarSkin/1140701.png", source: "enka.network", status: "active" },
    { id: "wuwa",     name: "Wuthering Waves",     short: "WuWa",    avatar: null, source: "wuwa.build",   status: "pending" }
  ],

  lol: {
    summonerLevel: 248,
    ladderRank: 1368563,
    ladderPercentile: 44.15,
    heroArt: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg",
    rankEmblem: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-gold.png",
    profileIcon: "https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon6860.jpg?image=q_auto:good,f_png,w_200",
    seasonTotals: { wins: 83, losses: 89, winrate: 48, champsPlayed: 31 },
    queues: {
      soloDuo: { tier: "Gold 2", lp: 26, wins: 29, losses: 36, winrate: 45 },
      flex:    { tier: "Gold 4", lp: 69, wins: 54, losses: 53, winrate: 50 }
    },
    lpHistory: [
      { season: "S23S2", lp: 45 }, { season: "S24S1", lp: 53 }, { season: "S24S2", lp: 7 },
      { season: "S24S3", lp: 21 }, { season: "S25", lp: 40 }, { season: "S26", lp: 26 }
    ],
    seasonHistory: {
      soloDuo: [
        { season: "S2025", tier: "Gold 2", lp: 40 }, { season: "S2024 S3", tier: "Gold 2", lp: 21 },
        { season: "S2024 S2", tier: "Bronze 4", lp: 7 }, { season: "S2024 S1", tier: "Bronze 4", lp: 53 },
        { season: "S2023 S2", tier: "Bronze 4", lp: 45 }
      ],
      flex: [
        { season: "S2025", tier: "Silver 4", lp: 84 }, { season: "S2024 S1", tier: "Platine 4", lp: 0 }
      ]
    },
    mastery: [
      { champion: "Yasuo", points: 375231 }, { champion: "Lux", points: 200046 },
      { champion: "Caitlyn", points: 145675 }, { champion: "Sylas", points: 111381 }
    ],
    champions: [
      { champion: "Caitlyn", wins: 25, losses: 26, kda: 2.54, csPerMin: 2026.8 },
      { champion: "Ezreal", wins: 14, losses: 12, kda: 2.90, csPerMin: 1896.1 },
      { champion: "Yasuo", wins: 14, losses: 11, kda: 2.11, csPerMin: 2056.8 },
      { champion: "Mel", wins: 5, losses: 7, kda: 3.26, csPerMin: 2016.4 },
      { champion: "Lux", wins: 3, losses: 2, kda: 2.50, csPerMin: 863.5 },
      { champion: "Shaco", wins: 2, losses: 3, kda: 2.97, csPerMin: 1845.4 },
      { champion: "Vayne", wins: 2, losses: 2, kda: 2.31, csPerMin: 1915.8 },
      { champion: "Yone", wins: 2, losses: 2, kda: 2.25, csPerMin: 2396.5 },
      { champion: "Kaisa", label: "Kai'Sa", wins: 2, losses: 2, kda: 2.29, csPerMin: 1656.6 },
      { champion: "Vladimir", wins: 1, losses: 3, kda: 1.80, csPerMin: 2026.2 },
      { champion: "Ashe", wins: 1, losses: 2, kda: 1.47, csPerMin: 1736.3 },
      { champion: "Kayn", wins: 0, losses: 3, kda: 1.89, csPerMin: 1825.0 },
      { champion: "Viego", wins: 0, losses: 3, kda: 1.82, csPerMin: 2236.4 },
      { champion: "Zed", wins: 2, losses: 0, kda: 2.20, csPerMin: 1425.9 },
      { champion: "Lucian", wins: 1, losses: 1, kda: 1.25, csPerMin: 1436.5 },
      { champion: "Leona", wins: 1, losses: 1, kda: 4.80, csPerMin: 331.2 },
      { champion: "Sylas", wins: 1, losses: 1, kda: 1.00, csPerMin: 1334.7 },
      { champion: "Yuumi", wins: 0, losses: 2, kda: 2.50, csPerMin: 230.9 },
      { champion: "Smolder", wins: 1, losses: 0, kda: 4.00, csPerMin: 2056.1 },
      { champion: "Yunara", wins: 1, losses: 0, kda: 3.00, csPerMin: 1896.1 },
      { champion: "Jinx", wins: 1, losses: 0, kda: 5.25, csPerMin: 1615.6 },
      { champion: "Fiddlesticks", wins: 1, losses: 0, kda: 9.00, csPerMin: 1747.0 },
      { champion: "Neeko", wins: 1, losses: 0, kda: 2.17, csPerMin: 902.0 },
      { champion: "Ahri", wins: 1, losses: 0, kda: 5.50, csPerMin: 1355.6 },
      { champion: "Veigar", wins: 1, losses: 0, kda: 2.88, csPerMin: 1985.4 },
      { champion: "Qiyana", wins: 0, losses: 1, kda: 1.75, csPerMin: 2806.6 },
      { champion: "Diana", wins: 0, losses: 1, kda: 1.25, csPerMin: 1846.2 },
      { champion: "Aurora", wins: 0, losses: 1, kda: 3.50, csPerMin: 1805.5 },
      { champion: "Varus", wins: 0, losses: 1, kda: 1.57, csPerMin: 1555.3 },
      { champion: "Nasus", wins: 0, losses: 1, kda: 1.71, csPerMin: 1534.5 },
      { champion: "Nunu", label: "Nunu et Willump", wins: 0, losses: 1, kda: 1.36, csPerMin: 1605.2 }
    ],
    matchups: {
      champion: "Caitlyn",
      vs: [
        { champion: "Smolder", wins: 2, losses: 5 }, { champion: "Jinx", wins: 2, losses: 4 },
        { champion: "Ashe", wins: 3, losses: 2 }, { champion: "Jhin", wins: 2, losses: 3 },
        { champion: "Kaisa", label: "Kai'Sa", wins: 1, losses: 3 }
      ]
    },
    recommended: [
      { champion: "Karthus", winrate: 54.0 }, { champion: "Xerath", winrate: 52.4 },
      { champion: "Hwei", winrate: 52.4 }, { champion: "Zeri", winrate: 51.8 }, { champion: "Twitch", winrate: 50.8 }
    ],
    highlights: [
      { emoji: "🎯", title: "Caitlyn — 51 parties", text: "Champion le plus joué cette saison (49% WR)" },
      { emoji: "🔥", title: "Yasuo — 56% WR", text: "Meilleur winrate sur échantillon significatif (25 parties)" },
      { emoji: "💥", title: "Mel — 3,26:1 KDA", text: "Meilleur ratio KDA moyen (12 parties)" },
      { emoji: "👑", title: "Yasuo — 375 231 pts", text: "Champion le plus maîtrisé (all-time)" }
    ]
  },

  valorant: {
    accountLevel: 51,
    act: "V26 Acte 4",
    rank: "Argent 1",
    heroArt: null,
    rankEmblem: "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/9/largeicon.png",
    playerCard: "https://c-valorant-api.op.gg/Assets/PlayerCards/FAA3C3B5-4B0B-1F20-B383-01B7B83126FF_small.png?image=q_auto:good,f_png,w_128",
    winrate: 54, wins: 20, losses: 16, remakes: 1,
    stats: {
      damagePerRound: 130, kd: 0.77, kda: 1.16, acsPerRound: 193.2, bestMatchKills: 23,
      playtime: "20h 43m", headshotPct: 10.77, bodyshotPct: 79.04, legshotPct: 10.19,
      headshots: 225, bodyshots: 1652, legshots: 213,
      kills: 488, deaths: 637, assists: 253
    },
    roles: [
      { role: "Contrôleur", kda: 1.10, winrate: 44, wins: 12, losses: 14 },
      { role: "Sentinelle", kda: 2.04, winrate: 100, wins: 5, losses: 0 },
      { role: "Duelliste", kda: 0.95, winrate: 60 }
    ],
    last20Matches: { wins: 8, remakes: 1, losses: 11, winrate: 40, kdaAvg: "1,06:1 (13/19/6)", opScore: 428, roundWinPct: 48.1, kast: 68.3, avgAcs: 194.3, adr: -26.1 },
    lastMatch: { date: "25 juillet", map: "Summit", mode: "Compétitif", result: "Défaite", score: "5 : 13", place: "4e place", kda: "13 / 18 / 3", kdaRatio: 0.89, acs: 211, adr: 127, hsPct: 6, dda: -39 },
    highlights: [
      { emoji: "🛡️", title: "Sentinelle — 100% WR", text: "Meilleur rôle (5V · 0D · KDA 2,04:1)" },
      { emoji: "🎯", title: "23 kills", text: "Meilleur score en un match" },
      { emoji: "⏱️", title: "20h 43m", text: "Temps de jeu compétitif tracké" },
      { emoji: "💥", title: "10,77% headshot", text: "Sur 2 090 tirs touchés au total" }
    ],
    note: "Stats synchronisées depuis op.gg — rang, agents, précision de tir et matchs proviennent tous de ton profil réel. L'historique complet match par match n'est pas accessible automatiquement (op.gg bloque le scraping) : seul le dernier match et l'agrégat des 20 derniers sont disponibles."
  },

  tft: {
    heroArt: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Maokai_0.jpg",
    rankEmblem: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-silver.png",
    set: "Set 17",
    ladderRank: 582412, ladderPercentile: 66,
    ranked: { tier: "Silver II", lp: 86, wins: 12, losses: 8, top4Rate: 60, avgPlacement: 3.95, games: 20 },
    hyperRoll: { tier: "Bronze I", lp: 87 },
    placementDistribution: [1, 6, 1, 4, 5, 1, 0, 2],
    topTraits: [
      { trait: "Bagarreur", games: 11, avgPlacement: 3.27 }, { trait: "N.O.V.A.", games: 8, avgPlacement: 3.25 },
      { trait: "Maraudeur", games: 6, avgPlacement: 3 }, { trait: "Rédempteur", games: 6, avgPlacement: 2.5 },
      { trait: "Astro-groove", games: 6, avgPlacement: 4.33 }
    ],
    topChampions: [
      { champion: "Maokai", cost: 3, games: 12, avgPlacement: 3.5 }, { champion: "Rek'Sai", cost: 1, games: 7, avgPlacement: 4.43 },
      { champion: "Akali", cost: 2, games: 6, avgPlacement: 3.67 }, { champion: "Rhaast", cost: 3, games: 6, avgPlacement: 2.5 },
      { champion: "Bel'Veth", cost: 2, games: 6, avgPlacement: 3.83 }
    ],
    highlights: [
      { emoji: "🐘", title: "Maokai — 12 parties", text: "Unité la plus jouée (3,5 place moy.)" },
      { emoji: "🌳", title: "Rhaast — 2,5 place moy.", text: "Meilleure moyenne de placement (6 parties)" },
      { emoji: "🥊", title: "Bagarreur — 11 parties", text: "Synergie la plus jouée (3,27 place moy.)" },
      { emoji: "🏆", title: "1 victoire (#1)", text: "Sur 20 parties classées cette saison" }
    ]
  },

  genshin: {
    uid: "707095481",
    nickname: "lou",
    signature: "« come furina »",
    adventureRank: 56, worldLevel: 8, achievements: 555, spiralAbyss: "8-3", stygianOnslaught: "107s",
    heroArt: "https://enka.network/ui/UI_Gacha_AvatarImg_Varesa.png",
    profileIcon: "https://enka.network/ui/UI_AvatarIcon_Furina.png",
    showcase: {
      name: "Varesa", element: "Électro", portrait: "https://enka.network/ui/UI_AvatarIcon_Varesa.png",
      level: "90/90", talents: "10/10/5",
      weapon: { name: "The Widsith R2", level: "90/90", icon: "https://enka.network/ui/UI_EquipIcon_Catalyst_Troupe_Awaken.png" },
      artifactSet: "Long Night's Oath 4pc",
      stats: { hp: 18415, atk: 1656, def: 968, elementalMastery: 93, critRate: 61.1, critDmg: 244.2, energyRecharge: 125.3, bonusDmg: { label: "Bonus DGT Électro", value: 46.6 } }
    },
    highlights: [
      { emoji: "⚡", title: "Varesa · Électro", text: "Vitrine — Niv. 90/90, talents 10/10/5" },
      { emoji: "💎", title: "61,1% crit · 244,2% dgt crit", text: "Ratio critique de la vitrine (build DPS)" },
      { emoji: "🌀", title: "Abîme Spiralé 8-3", text: "Chambre la plus profonde nettoyée" },
      { emoji: "🏅", title: "555 hauts faits", text: "Débloqués sur le compte" }
    ],
    note: "Seul le personnage mis en avant dans ta vitrine Enka est visible publiquement. Active le partage complet en jeu et redemande-moi une mise à jour pour afficher tout ton roster."
  },

  hsr: {
    uid: "721212389",
    nickname: "Emma",
    signature: "« idk »",
    trailblazeLevel: 70, equilibriumLevel: 6, achievements: 588, simulatedUniverse: 9,
    profileIcon: "https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/AvatarSkin/1140701.png",
    showcase: {
      name: "Castorice", element: "Quantique", portrait: "https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/AvatarSkin/1140701.png",
      level: "80/80", eidolon: 6,
      lightCone: { name: "Make Farewells More Beautiful S1", level: "80/80" },
      relicSets: ["Poet of Mourning Collapse 4pc", "Bone Collection's Serene Demesne 2pc"],
      stats: { hp: 7923, atk: 1492, def: 1246, spd: 89.7, critRate: 64.5, critDmg: 203.2, energyRegen: 100.0, bonusDmg: { label: "Bonus DGT Quantique", value: 63.2 } }
    },
    highlights: [
      { emoji: "🌌", title: "Castorice · Quantique", text: "Éidolon 6 — Niv. 80/80" },
      { emoji: "💎", title: "64,5% crit · 203,2% dgt crit", text: "Ratio critique de la vitrine" },
      { emoji: "🌠", title: "Univers Simulé 9", text: "Palier le plus avancé nettoyé" },
      { emoji: "🏅", title: "588 hauts faits", text: "Débloqués sur le compte" }
    ],
    note: "Seul le personnage mis en avant dans ta vitrine Enka est visible publiquement. Active le partage complet en jeu et redemande-moi une mise à jour pour afficher tout ton roster."
  },

  wuwa: {
    uid: "576656267", server: "NA",
    tracker: "https://wuwa.build/profile/576656267",
    status: "Profil trouvé sur WuWaBuilds — import manuel requis",
    note: "mais aucune donnée n'est encore synchronisée (0 build, 0 écho). Contrairement à Enka pour Genshin/HSR, WuWaBuilds n'a pas d'accès automatique à ton compte : il faut lui envoyer un import une fois.",
    steps: [
      "Rejoins le serveur Discord de WuWaBuilds et génère ta carte avec <b>wuwa-bot</b> (elle capture ton niveau d'Union, tes Résonateurs et leurs échos).",
      "Va sur wuwa.build/import et dépose la capture d'écran générée par le bot (glisser-déposer, ou Ctrl+V).",
      "Une fois importé, redemande-moi <i>« rafraîchis mon Wuthering Waves »</i> — j'irai lire ton profil WuWaBuilds et graver ici tes vraies stats."
    ],
    locked: ["Niveau d'Union", "Résonateurs débloqués", "Tour des Illusions", "Échos collectés"]
  },

  overview: {
    rankedGames: 172 + 36 + 20,
    realmsTracked: 6,
    bestRate: { value: 60, label: "Top 4 · TFT" },
    trackedPlaytime: { value: 20.7, label: "Valorant" },
    achievements: 555 + 588,
    highlights: [
      { emoji: "⚔️", title: "Yasuo — 375 231 pts", text: "Champion le plus maîtrisé (LoL)" },
      { emoji: "🛡️", title: "Sentinelle — 100% WR", text: "Meilleur rôle (Valorant · 5V 0D)" },
      { emoji: "🌳", title: "Rhaast — 2,5 place moy.", text: "Meilleure unité (TFT · 6 parties)" },
      { emoji: "🌸", title: "Varesa — Niv. 90/90", text: "Vitrine Genshin · 61,1% crit / 244,2% dgt crit" },
      { emoji: "🌙", title: "Castorice — Éidolon 6", text: "Vitrine HSR · 64,5% crit / 203,2% dgt crit" },
      { emoji: "🌊", title: "5 royaumes actifs", text: "Wuthering Waves — profil trouvé, import en attente" }
    ]
  }
};
