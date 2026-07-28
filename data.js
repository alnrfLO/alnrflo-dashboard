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
    { id: "wuwa",     name: "Wuthering Waves",     short: "WuWa",    avatar: "https://wuwa.build/assets/UIResources/Common/Image/IconRoleHead256/T_IconRoleHead256_57_UI.webp", source: "wuwa.build",   status: "active" }
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
    heroArt: "https://media.valorant-api.com/playercards/faa3c3b5-4b0b-1f20-b383-01b7b83126ff/wideart.png",
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
    characters: [
      {
        name: "Kaedehara Kazuha", element: "Anémo", portrait: "https://enka.network/ui/UI_AvatarIcon_Kazuha.png",
        level: "90/90",
        weapon: { name: "Piqûre de fer", rarity: 4, refine: "R3", level: "90/90" },
        set: "Ombre de la Verte Chasseuse (4)",
        stats: { hp: 21812, atk: 1591, def: 983, elementalMastery: 654, critRate: 24.8, critDmg: 116.1, energyRecharge: 138.2, bonusDmg: { label: "Bonus DGT Anémo", value: 15.0 } },
        critValue: 105.7
      },
      {
        name: "Columbina", element: "Hydro", portrait: "https://enka.network/ui/UI_AvatarIcon_Columbina.png",
        level: "90/90",
        weapon: { name: "Reliquaire de la vérité", rarity: 5, refine: "R1", level: "90/90" },
        set: "Aubade d'astre et de lune (4)",
        stats: { hp: 35970, atk: 1094, def: 620, elementalMastery: 80, critRate: 66.8, critDmg: 228.4, energyRecharge: 118.8 },
        critValue: 159.4
      },
      {
        name: "Chasca", element: "Géo", portrait: "https://enka.network/ui/UI_AvatarIcon_Chasca.png",
        level: "90/90",
        weapon: { name: "Ailes de la Voûte d'Azur", rarity: 5, refine: "R1", level: "90/90" },
        set: "Chasseur de la Maréchaussée (4)",
        stats: { hp: 15742, atk: 2036, def: 646, elementalMastery: 47, critRate: 82.4, critDmg: 180.4, energyRecharge: 109.7, bonusDmg: { label: "Bonus DGT Géo", value: 7.0 } },
        critValue: 182.7
      },
      {
        name: "Furina", element: "Hydro", portrait: "https://enka.network/ui/UI_AvatarIcon_Furina.png",
        level: "90/90",
        weapon: { name: "Splendeur des eaux calmes", rarity: 5, refine: "R1", level: "90/90" },
        set: "Troupe dorée (4)",
        stats: { hp: 24788, atk: 1269, def: 696, elementalMastery: 63, critRate: 70.1, critDmg: 247.8, energyRecharge: 179.0, bonusDmg: { label: "Bonus DGT Hydro", value: 46.6 } },
        critValue: 201.3, topPercent: 39, buildLabel: "Skill · 170% ER"
      },
      {
        name: "Varesa", element: "Électro", portrait: "https://enka.network/ui/UI_AvatarIcon_Varesa.png",
        level: "90/90",
        weapon: { name: "Mouvement vagabond", rarity: 4, refine: "R2", level: "90/90" },
        set: "Serment de la longue nuit (4)",
        stats: { hp: 18415, atk: 1656, def: 968, elementalMastery: 93, critRate: 61.1, critDmg: 244.2, energyRecharge: 125.3, bonusDmg: { label: "Bonus DGT Électro", value: 46.6 } },
        critValue: 213.0, topPercent: 47, buildLabel: "Hyper · 120% ER"
      }
    ],
    highlights: [
      { emoji: "💎", title: "Varesa — 213 CV", text: "Meilleure Crit Value du roster (61,1% crit · 244,2% dgt crit)" },
      { emoji: "🏆", title: "Varesa — TOP 47%", text: "Classement Akasha (build Hyper, 120% Recharge Énergie)" },
      { emoji: "🎏", title: "Furina — TOP 39%", text: "Classement Akasha (build Skill, 170% Recharge Énergie)" },
      { emoji: "🌀", title: "Abîme Spiralé 8-3", text: "Chambre la plus profonde nettoyée" }
    ],
    note: "5 personnages entièrement build trackés via Akasha.cv (Kazuha, Columbina, Chasca, Furina, Varesa) — un vrai board de leaderboard Genshin, contrairement à Enka qui ne montre que le personnage mis en avant dans ta vitrine."
  },

  hsr: {
    uid: "721212389",
    nickname: "Emma",
    signature: "« idk »",
    trailblazeLevel: 70, equilibriumLevel: 6, achievements: 588, simulatedUniverse: 9,
    heroArt: "https://enka.network/ui/hsr/SpriteOutput/AvatarDrawCard/1407.png",
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
    uid: "605245370", server: "EU", nickname: "Lou",
    heroArt: "https://static.wikia.nocookie.net/wutheringwaves/images/c/ca/Chisa_Card.jpg",
    tracker: "https://wuwa.build/profile/605245370",
    buildsCount: 2, echoesCount: 10,
    characters: [
      {
        name: "Cartethyia", portrait: "https://wuwa.build/assets/UIResources/Common/Image/IconRoleHead256/T_IconRoleHead256_40_UI.webp",
        sequence: "S0", board: "Solo", boardPct: 80.3, rank: 2005, rankTotal: 2497,
        weapon: { name: "Defier's Thorn", refine: "R1", icon: "https://wuwa.build/assets/UIResources/Common/Image/IconWeapon/T_IconWeapon21020056_UI.webp" },
        set: "Windward Pilgrimage (5)",
        critValue: 102.8, critRate: 64.4, critDmg: 150.0
      },
      {
        name: "Chisa", portrait: "https://wuwa.build/assets/UIResources/Common/Image/IconRoleHead256/T_IconRoleHead256_57_UI.webp",
        sequence: "S0", board: "Hypercarry", boardPct: 84.7, rank: 789, rankTotal: 931,
        weapon: { name: "Lustrous Razor", refine: "R1", icon: "https://wuwa.build/assets/UIResources/Common/Image/IconWeapon/T_IconWeapon21010015_UI.webp" },
        set: "Havoc Eclipse (2)",
        critValue: 71.6, critRate: 19.3, critDmg: 209.0
      }
    ],
    echoes: [
      { name: "Devotee's Flesh", set: "Windward Pilgrimage", mainStat: "22.8%", cv: 17.4, rv: 84, icon: "https://wuwa.build/assets/UIResources/Common/Image/IconMonsterHead/T_IconMonsterHead_31061_UI.webp" },
      { name: "Havoc Dreadmane", set: "Havoc Eclipse", mainStat: "30.0%", cv: 15.0, rv: 74, icon: "https://wuwa.build/assets/UIResources/Common/Image/IconMonsterGoods/T_IconMonsterGoods_984_UI.webp" },
      { name: "Sacerdos", set: "Windward Pilgrimage", mainStat: "22.8%", cv: 15.0, rv: 71, icon: "https://wuwa.build/assets/UIResources/Common/Image/IconMonsterHead/T_IconMonsterHead_31054_UI.webp" },
      { name: "Kerasaur", set: "Windward Pilgrimage", mainStat: "30.0%", cv: 13.8, rv: 66, icon: "https://wuwa.build/assets/UIResources/Common/Image/IconMonsterHead/T_IconMonsterHead_31062_UI.webp" },
      { name: "Dreamless", set: "Havoc Eclipse", mainStat: "44.0%", cv: 12.6, rv: 81, icon: "https://wuwa.build/assets/UIResources/Common/Image/IconMonsterHead/T_IconMonsterHead_998_UI.webp" },
      { name: "Capitaneus", set: "Windward Pilgrimage", mainStat: "30.0%", cv: 12.6, rv: 82, icon: "https://wuwa.build/assets/UIResources/Common/Image/IconMonsterHead/T_IconMonsterHead_32033_UI.webp" },
      { name: "Calcified Junrock", set: "Crown of Valor", mainStat: "18.0%", cv: 0.0, rv: 0, icon: "https://wuwa.build/assets/UIResources/Common/Image/IconMonsterHead/T_IconMonsterHead_31050_UI.webp" },
      { name: "Fusion Drake", set: "Windward Pilgrimage", mainStat: "18.0%", cv: 0.0, rv: 0, icon: "https://wuwa.build/assets/UIResources/Common/Image/IconMonsterHead/T_IconMonsterHead_31058_UI.webp" },
      { name: "Nightmare: Cyan-Feathered Heron", set: "Law of Harmony", mainStat: "30.0%", cv: 0.0, rv: 75, icon: "https://wuwa.build/assets/UIResources/Common/Image/IconMonsterHead/T_IconMonsterHead_32046_UI.webp" },
      { name: "Reminiscence: Fleurdelys", set: "Windward Pilgrimage", mainStat: "22.0%", cv: 0.0, rv: 65, icon: "https://wuwa.build/assets/UIResources/Common/Image/IconMonsterHead/T_IconMonsterHead_34012_1_UI.webp" }
    ],
    note: "Synchronisé automatiquement depuis WuWaBuilds (mise à jour côté site toutes les 5 minutes) — regénère simplement ta carte avec wuwa-bot puis réimporte sur wuwa.build/import si tu changes de build."
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
      { emoji: "🌊", title: "Chisa — 84,7% (Hypercarry)", text: "Wuthering Waves · meilleur board WuWaBuilds" }
    ]
  }
};
