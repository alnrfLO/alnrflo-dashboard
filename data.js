/* ============================================================
   Single source of truth for the whole dashboard.
   Every page is rendered from this object by app.js — update
   stats here and every view (home + game pages) reflects it.
   ============================================================ */
window.DASH_DATA = {
  player: { riotId: "alnrfLO#93K", region: "EUW", season: "2026", updated: "27 juillet 2026" },
  // real Riot account behind the "alnrfLO" handle above (op.gg still shows the old
  // pre-rename name) — used only by scripts/refresh-data.mjs to query the Riot API,
  // never displayed anywhere.
  riotAccount: { gameName: "Byron Love", tagLine: "93K", platform: "euw1" },

  games: [
    { id: "lol",      name: "League of Legends",  short: "LoL",     avatar: "https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon6860.jpg?image=q_auto:good,f_png,w_200", source: "op.gg",        status: "active" },
    { id: "valorant", name: "Valorant",            short: "VAL",     avatar: "https://c-valorant-api.op.gg/Assets/PlayerCards/FAA3C3B5-4B0B-1F20-B383-01B7B83126FF_small.png?image=q_auto:good,f_png,w_128", source: "op.gg",        status: "active" },
    { id: "tft",      name: "Teamfight Tactics",   short: "TFT",     avatar: "https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon6860.jpg?image=q_auto:good,f_png,w_200", source: "op.gg",        status: "active" },
    { id: "genshin",  name: "Genshin Impact",      short: "GI",      avatar: "https://enka.network/ui/UI_AvatarIcon_Furina.png", source: "enka.network", status: "active" },
    { id: "hsr",      name: "Honkai: Star Rail",   short: "HSR",     avatar: "https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/AvatarSkin/1140701.png", source: "enka.network", status: "active" },
    { id: "wuwa",     name: "Wuthering Waves",     short: "WuWa",    avatar: "https://wuwa.build/assets/UIResources/Common/Image/IconRoleHead256/T_IconRoleHead256_57_UI.webp", source: "wuwa.build",   status: "active" }
  ],

  lol: {
    "summonerLevel": 254,
    "ladderRank": 1368563,
    "ladderPercentile": 44.15,
    "heroArt": "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg",
    "rankEmblem": "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-platinum.png",
    "profileIcon": "https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon6806.jpg?image=q_auto:good,f_png,w_200",
    "seasonTotals": {
      "wins": 83,
      "losses": 89,
      "winrate": 48,
      "champsPlayed": 31
    },
    "queues": {
      "soloDuo": {
        "tier": "Platinum 4",
        "lp": 17,
        "wins": 41,
        "losses": 40,
        "winrate": 51
      },
      "flex": {
        "tier": "Gold 4",
        "lp": 86,
        "wins": 56,
        "losses": 54,
        "winrate": 51
      }
    },
    "lpHistory": [
      {
        "season": "S23S2",
        "lp": 45
      },
      {
        "season": "S24S1",
        "lp": 53
      },
      {
        "season": "S24S2",
        "lp": 7
      },
      {
        "season": "S24S3",
        "lp": 21
      },
      {
        "season": "S25",
        "lp": 40
      },
      {
        "season": "S26",
        "lp": 26
      }
    ],
    "seasonHistory": {
      "soloDuo": [
        {
          "season": "S2025",
          "tier": "Gold 2",
          "lp": 40
        },
        {
          "season": "S2024 S3",
          "tier": "Gold 2",
          "lp": 21
        },
        {
          "season": "S2024 S2",
          "tier": "Bronze 4",
          "lp": 7
        },
        {
          "season": "S2024 S1",
          "tier": "Bronze 4",
          "lp": 53
        },
        {
          "season": "S2023 S2",
          "tier": "Bronze 4",
          "lp": 45
        }
      ],
      "flex": [
        {
          "season": "S2025",
          "tier": "Silver 4",
          "lp": 84
        },
        {
          "season": "S2024 S1",
          "tier": "Platine 4",
          "lp": 0
        }
      ]
    },
    "mastery": [
      {
        "champion": "Yasuo",
        "points": 375231
      },
      {
        "champion": "Lux",
        "points": 200046
      },
      {
        "champion": "Caitlyn",
        "points": 145675
      },
      {
        "champion": "Sylas",
        "points": 111381
      }
    ],
    "champions": [
      {
        "champion": "Caitlyn",
        "wins": 25,
        "losses": 26,
        "kda": 2.54,
        "csPerMin": 2026.8
      },
      {
        "champion": "Ezreal",
        "wins": 14,
        "losses": 12,
        "kda": 2.9,
        "csPerMin": 1896.1
      },
      {
        "champion": "Yasuo",
        "wins": 14,
        "losses": 11,
        "kda": 2.11,
        "csPerMin": 2056.8
      },
      {
        "champion": "Mel",
        "wins": 5,
        "losses": 7,
        "kda": 3.26,
        "csPerMin": 2016.4
      },
      {
        "champion": "Lux",
        "wins": 3,
        "losses": 2,
        "kda": 2.5,
        "csPerMin": 863.5
      },
      {
        "champion": "Shaco",
        "wins": 2,
        "losses": 3,
        "kda": 2.97,
        "csPerMin": 1845.4
      },
      {
        "champion": "Vayne",
        "wins": 2,
        "losses": 2,
        "kda": 2.31,
        "csPerMin": 1915.8
      },
      {
        "champion": "Yone",
        "wins": 2,
        "losses": 2,
        "kda": 2.25,
        "csPerMin": 2396.5
      },
      {
        "champion": "Kaisa",
        "label": "Kai'Sa",
        "wins": 2,
        "losses": 2,
        "kda": 2.29,
        "csPerMin": 1656.6
      },
      {
        "champion": "Vladimir",
        "wins": 1,
        "losses": 3,
        "kda": 1.8,
        "csPerMin": 2026.2
      },
      {
        "champion": "Ashe",
        "wins": 1,
        "losses": 2,
        "kda": 1.47,
        "csPerMin": 1736.3
      },
      {
        "champion": "Kayn",
        "wins": 0,
        "losses": 3,
        "kda": 1.89,
        "csPerMin": 1825
      },
      {
        "champion": "Viego",
        "wins": 0,
        "losses": 3,
        "kda": 1.82,
        "csPerMin": 2236.4
      },
      {
        "champion": "Zed",
        "wins": 2,
        "losses": 0,
        "kda": 2.2,
        "csPerMin": 1425.9
      },
      {
        "champion": "Lucian",
        "wins": 1,
        "losses": 1,
        "kda": 1.25,
        "csPerMin": 1436.5
      },
      {
        "champion": "Leona",
        "wins": 1,
        "losses": 1,
        "kda": 4.8,
        "csPerMin": 331.2
      },
      {
        "champion": "Sylas",
        "wins": 1,
        "losses": 1,
        "kda": 1,
        "csPerMin": 1334.7
      },
      {
        "champion": "Yuumi",
        "wins": 0,
        "losses": 2,
        "kda": 2.5,
        "csPerMin": 230.9
      },
      {
        "champion": "Smolder",
        "wins": 1,
        "losses": 0,
        "kda": 4,
        "csPerMin": 2056.1
      },
      {
        "champion": "Yunara",
        "wins": 1,
        "losses": 0,
        "kda": 3,
        "csPerMin": 1896.1
      },
      {
        "champion": "Jinx",
        "wins": 1,
        "losses": 0,
        "kda": 5.25,
        "csPerMin": 1615.6
      },
      {
        "champion": "Fiddlesticks",
        "wins": 1,
        "losses": 0,
        "kda": 9,
        "csPerMin": 1747
      },
      {
        "champion": "Neeko",
        "wins": 1,
        "losses": 0,
        "kda": 2.17,
        "csPerMin": 902
      },
      {
        "champion": "Ahri",
        "wins": 1,
        "losses": 0,
        "kda": 5.5,
        "csPerMin": 1355.6
      },
      {
        "champion": "Veigar",
        "wins": 1,
        "losses": 0,
        "kda": 2.88,
        "csPerMin": 1985.4
      },
      {
        "champion": "Qiyana",
        "wins": 0,
        "losses": 1,
        "kda": 1.75,
        "csPerMin": 2806.6
      },
      {
        "champion": "Diana",
        "wins": 0,
        "losses": 1,
        "kda": 1.25,
        "csPerMin": 1846.2
      },
      {
        "champion": "Aurora",
        "wins": 0,
        "losses": 1,
        "kda": 3.5,
        "csPerMin": 1805.5
      },
      {
        "champion": "Varus",
        "wins": 0,
        "losses": 1,
        "kda": 1.57,
        "csPerMin": 1555.3
      },
      {
        "champion": "Nasus",
        "wins": 0,
        "losses": 1,
        "kda": 1.71,
        "csPerMin": 1534.5
      },
      {
        "champion": "Nunu",
        "label": "Nunu et Willump",
        "wins": 0,
        "losses": 1,
        "kda": 1.36,
        "csPerMin": 1605.2
      }
    ],
    "matchups": {
      "champion": "Caitlyn",
      "vs": [
        {
          "champion": "Smolder",
          "wins": 2,
          "losses": 5
        },
        {
          "champion": "Jinx",
          "wins": 2,
          "losses": 4
        },
        {
          "champion": "Ashe",
          "wins": 3,
          "losses": 2
        },
        {
          "champion": "Jhin",
          "wins": 2,
          "losses": 3
        },
        {
          "champion": "Kaisa",
          "label": "Kai'Sa",
          "wins": 1,
          "losses": 3
        }
      ]
    },
    "recommended": [
      {
        "champion": "Karthus",
        "winrate": 54
      },
      {
        "champion": "Xerath",
        "winrate": 52.4
      },
      {
        "champion": "Hwei",
        "winrate": 52.4
      },
      {
        "champion": "Zeri",
        "winrate": 51.8
      },
      {
        "champion": "Twitch",
        "winrate": 50.8
      }
    ],
    "highlights": [
      {
        "emoji": "🎯",
        "title": "Caitlyn — 51 parties",
        "text": "Champion le plus joué cette saison (49% WR)"
      },
      {
        "emoji": "🔥",
        "title": "Yasuo — 56% WR",
        "text": "Meilleur winrate sur échantillon significatif (25 parties)"
      },
      {
        "emoji": "💥",
        "title": "Mel — 3,26:1 KDA",
        "text": "Meilleur ratio KDA moyen (12 parties)"
      },
      {
        "emoji": "👑",
        "title": "Yasuo — 375 231 pts",
        "text": "Champion le plus maîtrisé (all-time)"
      }
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
    "heroArt": "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Maokai_0.jpg",
    "rankEmblem": "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-gold.png",
    "set": "Set 17",
    "ladderRank": 582412,
    "ladderPercentile": 66,
    "ranked": {
      "tier": "Gold 3",
      "lp": 18,
      "wins": 21,
      "losses": 12,
      "top4Rate": 60,
      "avgPlacement": 3.95,
      "games": 20
    },
    "hyperRoll": {
      "tier": "Bronze I",
      "lp": 87
    },
    "doubleUp": {
      "tier": "Silver 2",
      "lp": 40,
      "wins": 11,
      "losses": 5
    },
    "placementDistribution": [
      1,
      6,
      1,
      4,
      5,
      1,
      0,
      2
    ],
    "topTraits": [
      {
        "trait": "Bagarreur",
        "games": 11,
        "avgPlacement": 3.27
      },
      {
        "trait": "N.O.V.A.",
        "games": 8,
        "avgPlacement": 3.25
      },
      {
        "trait": "Maraudeur",
        "games": 6,
        "avgPlacement": 3
      },
      {
        "trait": "Rédempteur",
        "games": 6,
        "avgPlacement": 2.5
      },
      {
        "trait": "Astro-groove",
        "games": 6,
        "avgPlacement": 4.33
      }
    ],
    "topChampions": [
      {
        "champion": "Maokai",
        "cost": 3,
        "games": 12,
        "avgPlacement": 3.5
      },
      {
        "champion": "Rek'Sai",
        "cost": 1,
        "games": 7,
        "avgPlacement": 4.43
      },
      {
        "champion": "Akali",
        "cost": 2,
        "games": 6,
        "avgPlacement": 3.67
      },
      {
        "champion": "Rhaast",
        "cost": 3,
        "games": 6,
        "avgPlacement": 2.5
      },
      {
        "champion": "Bel'Veth",
        "cost": 2,
        "games": 6,
        "avgPlacement": 3.83
      }
    ],
    "highlights": [
      {
        "emoji": "🐘",
        "title": "Maokai — 12 parties",
        "text": "Unité la plus jouée (3,5 place moy.)"
      },
      {
        "emoji": "🌳",
        "title": "Rhaast — 2,5 place moy.",
        "text": "Meilleure moyenne de placement (6 parties)"
      },
      {
        "emoji": "🥊",
        "title": "Bagarreur — 11 parties",
        "text": "Synergie la plus jouée (3,27 place moy.)"
      },
      {
        "emoji": "🏆",
        "title": "1 victoire (#1)",
        "text": "Sur 20 parties classées cette saison"
      }
    ]
  },

  genshin: {
    "uid": "707095481",
    "nickname": "lou",
    "signature": "come furina",
    "adventureRank": 56,
    "worldLevel": 8,
    "achievements": 601,
    "spiralAbyss": "8-3",
    "stygianOnslaught": "107s",
    "heroArt": "https://enka.network/ui/UI_Gacha_AvatarImg_Varesa.png",
    "profileIcon": "https://enka.network/ui/UI_AvatarIcon_Varesa.png",
    "characters": [
      {
        "name": "Varesa",
        "element": "Électro",
        "portrait": "https://enka.network/ui/UI_AvatarIcon_Varesa.png",
        "level": "90/90",
        "weapon": {
          "name": "Mouvement vagabond",
          "rarity": 4,
          "refine": "R2",
          "level": "90/90"
        },
        "set": "Serment de la longue nuit (4)",
        "stats": {
          "hp": 19478,
          "atk": 2079,
          "def": 968,
          "elementalMastery": 56,
          "critRate": 61.9,
          "critDmg": 243.5,
          "energyRecharge": 125.3,
          "bonusDmg": null
        },
        "critValue": 213.7
      },
      {
        "name": "Furina",
        "element": "Hydro",
        "portrait": "https://enka.network/ui/UI_AvatarIcon_Furina.png",
        "level": "90/90",
        "weapon": {
          "name": "Splendeur des eaux calmes",
          "rarity": 5,
          "refine": "R1",
          "level": "90/90"
        },
        "set": "Troupe dorée (4)",
        "stats": {
          "hp": 31683,
          "atk": 1347,
          "def": 696,
          "elementalMastery": 40,
          "critRate": 67.8,
          "critDmg": 259.5,
          "energyRecharge": 173.8,
          "bonusDmg": null
        },
        "critValue": 208.3
      },
      {
        "name": "Chasca",
        "element": "Anémo",
        "portrait": "https://enka.network/ui/UI_AvatarIcon_Chasca.png",
        "level": "90/90",
        "weapon": {
          "name": "Ailes de la Voûte d'Azur",
          "rarity": 5,
          "refine": "R1",
          "level": "90/90"
        },
        "set": "Chasseur de la Maréchaussée (4)",
        "stats": {
          "hp": 15742,
          "atk": 2458,
          "def": 736,
          "elementalMastery": 61,
          "critRate": 82.4,
          "critDmg": 200.6,
          "energyRecharge": 104.5,
          "bonusDmg": null
        },
        "critValue": 202.8
      },
      {
        "name": "Mona",
        "element": "Hydro",
        "portrait": "https://enka.network/ui/UI_AvatarIcon_Mona.png",
        "level": "70/70",
        "weapon": {
          "name": "Malice (prototype)",
          "rarity": 4,
          "refine": "R1",
          "level": "70/70"
        },
        "set": "Ancien rituel royal (4)",
        "stats": {
          "hp": 21767,
          "atk": 1322,
          "def": 695,
          "elementalMastery": 0,
          "critRate": 56.3,
          "critDmg": 115.3,
          "energyRecharge": 138.7,
          "bonusDmg": {
            "label": "Bonus DGT Hydro",
            "value": 27.7
          }
        },
        "critValue": 167.9
      },
      {
        "name": "Columbina",
        "element": "",
        "portrait": "https://enka.network/ui/UI_AvatarIcon_Columbina.png",
        "level": "90/90",
        "weapon": {
          "name": "Reliquaire de la vérité",
          "rarity": 5,
          "refine": "R1",
          "level": "90/90"
        },
        "set": "Aubade d'astre et de lune (4)",
        "stats": {
          "hp": 35970,
          "atk": 1094,
          "def": 620,
          "elementalMastery": 80,
          "critRate": 66.8,
          "critDmg": 228.4,
          "energyRecharge": 118.8,
          "bonusDmg": null
        },
        "critValue": 159.4
      },
      {
        "name": "Kazuha",
        "element": "Anémo",
        "portrait": "https://enka.network/ui/UI_AvatarIcon_Kazuha.png",
        "level": "90/90",
        "weapon": {
          "name": "Épée émoussée",
          "rarity": 1,
          "refine": "R1",
          "level": "1/90"
        },
        "set": "Ombre de la Verte Chasseuse (4)",
        "stats": {
          "hp": 21812,
          "atk": 855,
          "def": 983,
          "elementalMastery": 488,
          "critRate": 24.8,
          "critDmg": 116.1,
          "energyRecharge": 138.2,
          "bonusDmg": {
            "label": "Bonus DGT Anémo",
            "value": 15
          }
        },
        "critValue": 105.7
      },
      {
        "name": "Xingqiu",
        "element": "Hydro",
        "portrait": "https://enka.network/ui/UI_AvatarIcon_Xingqiu.png",
        "level": "70/70",
        "weapon": {
          "name": "Épée rituelle",
          "rarity": 4,
          "refine": "R2",
          "level": "20/90"
        },
        "set": "Rideau du Gladiateur (1)",
        "stats": {
          "hp": 7897,
          "atk": 716,
          "def": 777,
          "elementalMastery": 23,
          "critRate": 10.4,
          "critDmg": 85,
          "energyRecharge": 140.4,
          "bonusDmg": {
            "label": "Bonus DGT Hydro",
            "value": 20
          }
        },
        "critValue": 45.7
      },
      {
        "name": "Bennett",
        "element": "Pyro",
        "portrait": "https://enka.network/ui/UI_AvatarIcon_Bennett.png",
        "level": "90/90",
        "weapon": {
          "name": "Épée de Favonius",
          "rarity": 4,
          "refine": "R1",
          "level": "50/50"
        },
        "set": "Ancien rituel royal (3)",
        "stats": {
          "hp": 22555,
          "atk": 1101,
          "def": 933,
          "elementalMastery": 0,
          "critRate": 11.2,
          "critDmg": 77.2,
          "energyRecharge": 186.5,
          "bonusDmg": null
        },
        "critValue": 39.6
      },
      {
        "name": "Iansan",
        "element": "Électro",
        "portrait": "https://enka.network/ui/UI_AvatarIcon_Iansan.png",
        "level": "60/60",
        "weapon": {
          "name": "Lance du débutant",
          "rarity": 1,
          "refine": "R1",
          "level": "1/90"
        },
        "set": "Rideau du Gladiateur (1)",
        "stats": {
          "hp": 7738,
          "atk": 227,
          "def": 490,
          "elementalMastery": 37,
          "critRate": 16.7,
          "critDmg": 56.2,
          "energyRecharge": 114.3,
          "bonusDmg": null
        },
        "critValue": 29.6
      },
      {
        "name": "Cyno",
        "element": "Électro",
        "portrait": "https://enka.network/ui/UI_AvatarIcon_Cyno.png",
        "level": "50/50",
        "weapon": {
          "name": "Pampille blanche",
          "rarity": 3,
          "refine": "R5",
          "level": "60/60"
        },
        "set": "Set inconnu (0)",
        "stats": {
          "hp": 6459,
          "atk": 427,
          "def": 444,
          "elementalMastery": 0,
          "critRate": 22.3,
          "critDmg": 59.6,
          "energyRecharge": 100,
          "bonusDmg": null
        },
        "critValue": 0
      },
      {
        "name": "Yaoyao",
        "element": "Dendro",
        "portrait": "https://enka.network/ui/UI_AvatarIcon_Yaoyao.png",
        "level": "1/90",
        "weapon": {
          "name": "Lance du débutant",
          "rarity": 1,
          "refine": "R1",
          "level": "1/90"
        },
        "set": "Set inconnu (0)",
        "stats": {
          "hp": 1030,
          "atk": 41,
          "def": 63,
          "elementalMastery": 0,
          "critRate": 5,
          "critDmg": 50,
          "energyRecharge": 100,
          "bonusDmg": null
        },
        "critValue": 0
      },
      {
        "name": "Collei",
        "element": "Dendro",
        "portrait": "https://enka.network/ui/UI_AvatarIcon_Collei.png",
        "level": "1/90",
        "weapon": {
          "name": "Arc de chasse",
          "rarity": 1,
          "refine": "R1",
          "level": "1/90"
        },
        "set": "Set inconnu (0)",
        "stats": {
          "hp": 821,
          "atk": 40,
          "def": 50,
          "elementalMastery": 0,
          "critRate": 5,
          "critDmg": 50,
          "energyRecharge": 100,
          "bonusDmg": null
        },
        "critValue": 0
      }
    ],
    "highlights": [
      {
        "emoji": "💎",
        "title": "Varesa — 213.7 CV",
        "text": "Meilleure Crit Value du roster (61.9% crit · 243.5% dgt crit)"
      },
      {
        "emoji": "🗂️",
        "title": "12 personnages",
        "text": "Build trackés automatiquement via Enka.network"
      },
      {
        "emoji": "🌀",
        "title": "Abîme Spiralé 8-3",
        "text": "Chambre la plus profonde nettoyée"
      }
    ],
    "note": "12 personnages actualisés automatiquement depuis Enka.network — Crit Value calculée nous-mêmes (2×Taux Crit + DGT Crit, uniquement la part venant des artéfacts) pour ne pas dépendre d'Akasha.cv, qui bloque l'accès automatisé."
  },

  hsr: {
    uid: "721212389",
    nickname: "Emma",
    signature: "« idk »",
    trailblazeLevel: 70, equilibriumLevel: 6, achievements: 589, simulatedUniverse: 9,
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
      { emoji: "🏅", title: "589 hauts faits", text: "Débloqués sur le compte" }
    ],
    note: "Seul le personnage mis en avant dans ta vitrine Enka est visible publiquement. Active le partage complet en jeu et redemande-moi une mise à jour pour afficher tout ton roster."
  },

  wuwa: {
    "uid": "605245370",
    "server": "EU",
    "nickname": "Lou",
    "heroArt": "https://wuwa.build/assets/UIResources/Common/Image/IconRolePile/T_IconRole_Pile_Qianxiao_UI.webp",
    "tracker": "https://wuwa.build/profile/605245370",
    "buildsCount": 2,
    "echoesCount": 10,
    "characters": [
      {
        "name": "Chisa",
        "portrait": "https://wuwa.build/assets/UIResources/Common/Image/IconRoleHeadCircle256/T_IconRoleHeadCircle256_57_UI.webp",
        "sequence": "S0",
        "board": "Hypercarry",
        "boardPct": 84.3,
        "rank": 918,
        "rankTotal": 1089,
        "weapon": {
          "name": "Lame lustrée",
          "refine": "R1",
          "icon": "https://wuwa.build/assets/UIResources/Common/Image/IconWeapon/T_IconWeapon21010015_UI.webp"
        },
        "set": "Le Crépuscule noir (2)",
        "critValue": 71.6,
        "critRate": 19.3,
        "critDmg": 209
      },
      {
        "name": "Cartethyia",
        "portrait": "https://wuwa.build/assets/UIResources/Common/Image/IconRoleHeadCircle256/T_IconRoleHeadCircle256_40_UI.webp",
        "sequence": "S0",
        "board": "Solo",
        "boardPct": 80.3,
        "rank": 2192,
        "rankTotal": 2731,
        "weapon": {
          "name": "Épine de l'insoumise",
          "refine": "R1",
          "icon": "https://wuwa.build/assets/UIResources/Common/Image/IconWeapon/T_IconWeapon21020056_UI.webp"
        },
        "set": "Pèlerinage au vent (5)",
        "critValue": 102.8,
        "critRate": 64.4,
        "critDmg": 150
      }
    ],
    "echoes": [
      {
        "name": "Chair du dévot",
        "set": "Pèlerinage au vent",
        "mainStat": "22.8%",
        "cv": 17.4,
        "icon": "https://wuwa.build/assets/UIResources/Common/Image/IconMonsterHead/T_IconMonsterHead_31061_UI.webp"
      },
      {
        "name": "Loup de Havoc",
        "set": "Le Crépuscule noir",
        "mainStat": "30%",
        "cv": 15,
        "icon": "https://wuwa.build/assets/UIResources/Common/Image/IconMonsterGoods/T_IconMonsterGoods_984_UI.webp"
      },
      {
        "name": "Sacerdos",
        "set": "Pèlerinage au vent",
        "mainStat": "22.8%",
        "cv": 15,
        "icon": "https://wuwa.build/assets/UIResources/Common/Image/IconMonsterHead/T_IconMonsterHead_31054_UI.webp"
      },
      {
        "name": "Kérasaure",
        "set": "Pèlerinage au vent",
        "mainStat": "30%",
        "cv": 13.8,
        "icon": "https://wuwa.build/assets/UIResources/Common/Image/IconMonsterHead/T_IconMonsterHead_31062_UI.webp"
      },
      {
        "name": "Le Sans-délire",
        "set": "Le Crépuscule noir",
        "mainStat": "44%",
        "cv": 12.6,
        "icon": "https://wuwa.build/assets/UIResources/Common/Image/IconMonsterHead/T_IconMonsterHead_998_UI.webp"
      },
      {
        "name": "Capitaneus",
        "set": "Pèlerinage au vent",
        "mainStat": "30%",
        "cv": 12.6,
        "icon": "https://wuwa.build/assets/UIResources/Common/Image/IconMonsterHead/T_IconMonsterHead_32033_UI.webp"
      },
      {
        "name": "Jeunpierre vernie",
        "set": "Couronne de vaillance",
        "mainStat": "18%",
        "cv": 0,
        "icon": "https://wuwa.build/assets/UIResources/Common/Image/IconMonsterHead/T_IconMonsterHead_31050_UI.webp"
      },
      {
        "name": "Petit dragon Fusion",
        "set": "Pèlerinage au vent",
        "mainStat": "18%",
        "cv": 0,
        "icon": "https://wuwa.build/assets/UIResources/Common/Image/IconMonsterHead/T_IconMonsterHead_31058_UI.webp"
      },
      {
        "name": "Cauchemar : Héron cyan",
        "set": "Loi de l'harmonie",
        "mainStat": "30%",
        "cv": 0,
        "icon": "https://wuwa.build/assets/UIResources/Common/Image/IconMonsterHead/T_IconMonsterHead_32046_UI.webp"
      },
      {
        "name": "Résidu résonnant : Fleurdelys",
        "set": "Pèlerinage au vent",
        "mainStat": "22%",
        "cv": 0,
        "icon": "https://wuwa.build/assets/UIResources/Common/Image/IconMonsterHead/T_IconMonsterHead_34012_1_UI.webp"
      }
    ],
    "note": "Synchronisé automatiquement depuis WuWaBuilds (api.wuwa.build, mise à jour côté site toutes les 5 minutes) — regénère simplement ta carte avec wuwa-bot puis réimporte sur wuwa.build/import si tu changes de build."
  },

  overview: {
    rankedGames: 172 + 36 + 20,
    realmsTracked: 6,
    bestRate: { value: 60, label: "Top 4 · TFT" },
    trackedPlaytime: { value: 20.7, label: "Valorant" },
    achievements: 555 + 589,
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
