#!/usr/bin/env node
/* ============================================================
   Refreshes the auto-fetchable parts of data.js from public APIs:
     - genshin: Enka.network (full character roster, self-computed
       Crit Value = 2×CritRate + CritDmg from artifact rolls only —
       same formula Akasha.cv uses — so we don't depend on Akasha,
       which blocks automated access).
     - wuwa:    api.wuwa.build (public JSON API, no auth needed).
     - lol/tft: official Riot Games API — only runs if RIOT_API_KEY is
       set (see README for how to get one). Valorant has no public
       Riot API access for personal keys, so it stays manual.
   Run: node scripts/refresh-data.mjs
   Run with Riot refresh: RIOT_API_KEY=... node scripts/refresh-data.mjs
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DATA_JS = path.join(ROOT, 'data.js');

const GENSHIN_UID = '707095481';
const WUWA_UID = '605245370';

async function getJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'alnrflo-dashboard-refresh/1.0' } });
  if (!res.ok) throw new Error(`GET ${url} -> HTTP ${res.status}`);
  return res.json();
}
async function urlExists(url) {
  try { const res = await fetch(url, { method: 'HEAD' }); return res.ok; } catch { return false; }
}

/* ============================== GENSHIN (Enka.network) ============================== */

const ASCEND_MAX = [20, 40, 50, 60, 70, 80, 90];
const ELEM_DMG_PROP = { 40: 'Pyro', 41: 'Électro', 42: 'Hydro', 43: 'Dendro', 44: 'Anémo', 45: 'Géo', 46: 'Cryo' };
// Hand-verified overrides for content too recent to be in Enka's community
// characters.json / loc.json yet (new characters, artifact sets, weapons).
// Extend these if a future patch introduces something new that falls back
// to a generic "Set NNNNN" / "Perso NNNNN" / "Arme" label.
const KNOWN_SET_NAMES = {
  15039: 'Serment de la longue nuit',
  15031: 'Chasseur de la Maréchaussée',
  15043: "Aubade d'astre et de lune",
  15002: 'Ombre de la Verte Chasseuse',
};
const KNOWN_CHAR_ICONS = { 10000125: 'Columbina' };
const KNOWN_WEAPON_NAMES = { 11513: 'Splendeur des eaux calmes', 11407: 'Piqûre de fer' };
const ELEMENT_FR = { Fire: 'Pyro', Electric: 'Électro', Water: 'Hydro', Grass: 'Dendro', Wind: 'Anémo', Rock: 'Géo', Ice: 'Cryo' };

async function fetchGenshin() {
  const [charMap, loc, raw] = await Promise.all([
    getJson('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/characters.json'),
    getJson('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/loc.json'),
    getJson(`https://enka.network/api/uid/${GENSHIN_UID}`),
  ]);
  const nameOf = (hash, fallback) => loc.fr?.[hash] || loc.en?.[hash] || fallback;
  const p = raw.playerInfo;

  const characters = await Promise.all((raw.avatarInfoList || []).map(async (av) => {
    const meta = charMap[String(av.avatarId)] || {};
    const iconName = KNOWN_CHAR_ICONS[av.avatarId]
      || (meta.SideIconName || meta.IconName || '').replace(/^UI_AvatarIcon_(Side_)?/, '')
      || `Perso${av.avatarId}`;
    const fp = av.fightPropMap || {};
    const ascension = Number(av.propMap?.['1002']?.val || 6);
    const level = av.propMap?.['4001']?.val || '90';

    const weapon = (av.equipList || []).find((e) => e.flat?.itemType === 'ITEM_WEAPON');
    const relics = (av.equipList || []).filter((e) => e.flat?.itemType === 'ITEM_RELIQUARY');

    // Crit Value = 2×CritRate + CritDmg, counting ONLY what artifacts rolled
    // (main stats + substats) — matches the Akasha.cv / community standard formula.
    let critRateRoll = 0, critDmgRoll = 0;
    const setCounts = {};
    for (const r of relics) {
      const fl = r.flat;
      if (fl.setId) setCounts[fl.setId] = (setCounts[fl.setId] || 0) + 1;
      const ms = fl.reliquaryMainstat;
      if (ms?.mainPropId === 'FIGHT_PROP_CRITICAL') critRateRoll += ms.statValue;
      if (ms?.mainPropId === 'FIGHT_PROP_CRITICAL_HURT') critDmgRoll += ms.statValue;
      for (const s of fl.reliquarySubstats || []) {
        if (s.appendPropId === 'FIGHT_PROP_CRITICAL') critRateRoll += s.statValue;
        if (s.appendPropId === 'FIGHT_PROP_CRITICAL_HURT') critDmgRoll += s.statValue;
      }
    }
    const bestSet = Object.entries(setCounts).sort((a, b) => b[1] - a[1])[0];
    let setName = 'Set inconnu', setCount = 0;
    if (bestSet) {
      setCount = bestSet[1];
      const relic = relics.find((r) => String(r.flat.setId) === bestSet[0]);
      setName = KNOWN_SET_NAMES[bestSet[0]] || nameOf(relic?.flat?.setNameTextMapHash, `Set ${bestSet[0]}`);
    }

    let bonusDmg = null;
    for (const [propId, label] of Object.entries(ELEM_DMG_PROP)) {
      const v = fp[propId];
      if (v && v > 0.001) { bonusDmg = { label: `Bonus DGT ${label}`, value: Math.round(v * 1000) / 10 }; break; }
    }

    const gachaArt = `https://enka.network/ui/UI_Gacha_AvatarImg_${iconName}.png`;

    return {
      name: iconName,
      element: ELEMENT_FR[meta.Element] || (bonusDmg ? bonusDmg.label.replace('Bonus DGT ', '') : ''),
      portrait: `https://enka.network/ui/UI_AvatarIcon_${iconName}.png`,
      _gachaArt: (await urlExists(gachaArt)) ? gachaArt : null,
      level: `${level}/${ASCEND_MAX[ascension] ?? 90}`,
      weapon: weapon ? {
        name: KNOWN_WEAPON_NAMES[weapon.itemId] || nameOf(weapon.flat.nameTextMapHash, `Arme ${weapon.itemId}`),
        rarity: weapon.flat.rankLevel,
        refine: `R${(Object.values(weapon.weapon?.affixMap || {})[0] ?? 0) + 1}`,
        level: `${weapon.weapon.level}/${ASCEND_MAX[weapon.weapon.promoteLevel] ?? 90}`,
      } : null,
      set: `${setName} (${setCount})`,
      stats: {
        hp: Math.round(fp['2000'] || 0), atk: Math.round(fp['2001'] || 0), def: Math.round(fp['2002'] || 0),
        elementalMastery: Math.round(fp['28'] || 0),
        critRate: Math.round((fp['20'] || 0) * 1000) / 10, critDmg: Math.round((fp['22'] || 0) * 1000) / 10,
        energyRecharge: Math.round((fp['23'] || 0) * 1000) / 10,
        bonusDmg,
      },
      critValue: Math.round((2 * critRateRoll + critDmgRoll) * 10) / 10,
    };
  }));

  characters.sort((a, b) => b.critValue - a.critValue);
  const best = characters[0];
  const heroArt = best?._gachaArt || best?.portrait || null;
  const cleanCharacters = characters.map(({ _gachaArt, ...c }) => c);

  return {
    uid: GENSHIN_UID,
    nickname: p.nickname,
    signature: p.signature || '',
    adventureRank: p.level,
    worldLevel: p.worldLevel,
    achievements: p.finishAchievementNum,
    spiralAbyss: `${p.towerFloorIndex}-${p.towerLevelIndex}`,
    stygianOnslaught: p.stygianSeconds ? `${p.stygianSeconds}s` : null,
    heroArt,
    profileIcon: best?.portrait || null,
    characters: cleanCharacters,
    highlights: [
      { emoji: '💎', title: `${best.name} — ${best.critValue} CV`, text: `Meilleure Crit Value du roster (${best.stats.critRate}% crit · ${best.stats.critDmg}% dgt crit)` },
      { emoji: '🗂️', title: `${characters.length} personnages`, text: 'Build trackés automatiquement via Enka.network' },
      { emoji: '🌀', title: `Abîme Spiralé ${p.towerFloorIndex}-${p.towerLevelIndex}`, text: 'Chambre la plus profonde nettoyée' },
    ],
    note: `${characters.length} personnages actualisés automatiquement depuis Enka.network — Crit Value calculée nous-mêmes (2×Taux Crit + DGT Crit, uniquement la part venant des artéfacts) pour ne pas dépendre d'Akasha.cv, qui bloque l'accès automatisé.`,
  };
}

/* ============================== WUTHERING WAVES (api.wuwa.build) ============================== */

function echoCv(substats) {
  if (!substats) return 0;
  return Math.round((2 * (substats.crit_rate || 0) + (substats.crit_dmg || 0)) * 10) / 10;
}

async function fetchWuwa() {
  const [charsRef, weaponsRef, echoesRef, fettersRef, builds, standings, echoesResp] = await Promise.all([
    getJson('https://wuwa.build/Data/Characters.json'),
    getJson('https://wuwa.build/Data/Weapons.json'),
    getJson('https://wuwa.build/Data/Echoes.json'),
    getJson('https://wuwa.build/Data/Fetters.json'),
    getJson(`https://api.wuwa.build/profile/${WUWA_UID}/builds?page=1&pageSize=12&sort=finalCV&direction=desc`),
    getJson(`https://api.wuwa.build/profile/${WUWA_UID}/standings`),
    getJson(`https://api.wuwa.build/profile/${WUWA_UID}/echoes?page=1&pageSize=20&sort=cv&direction=desc`),
  ]);
  const charById = Object.fromEntries(charsRef.map((c) => [String(c.id), c]));
  const weaponById = Object.fromEntries(weaponsRef.map((w) => [String(w.id), w]));
  const echoById = Object.fromEntries(echoesRef.map((e) => [String(e.id), e]));
  const fetterById = Object.fromEntries(fettersRef.map((f) => [String(f.id), f]));
  const standingByCharId = Object.fromEntries((standings.standings || []).map((s) => [String(s.characterId), s]));

  const characters = (builds.builds || []).map((b) => {
    const c = charById[String(b.character.id)] || {};
    const w = weaponById[String(b.weapon.id)] || {};
    const st = standingByCharId[String(b.character.id)] || {};
    const setCounts = b.echoSummary?.sets || {};
    const bestSet = Object.entries(setCounts).sort((a, x) => x[1] - a[1])[0];
    const setName = bestSet ? (fetterById[bestSet[0]]?.name?.fr || `Set ${bestSet[0]}`) : 'Set inconnu';
    const setCount = bestSet ? bestSet[1] : 0;
    const rank = st.rank ?? 0, rankTotal = st.total ?? 0;
    // WuwaBuilds' rank/total is expressed "you rank Nth out of total, higher
    // is better" (verified against the site's own displayed percentile), so
    // the board percentage is the raw ratio, not its inverse.
    const boardPct = rankTotal ? Math.round((rank / rankTotal) * 1000) / 10 : 0;
    return {
      name: c.name?.fr || `Résonateur ${b.character.id}`,
      portrait: c.icon?.iconRound ? `https://wuwa.build${c.icon.iconRound}` : null,
      _splashArt: c.icon?.banner ? `https://wuwa.build${c.icon.banner}` : null,
      sequence: `S${b.sequence ?? 0}`,
      board: st.trackLabel || '—', boardPct, rank, rankTotal,
      weapon: { name: w.name?.fr || `Arme ${b.weapon.id}`, refine: `R${b.weapon.rank}`, icon: w.icon?.icon ? `https://wuwa.build${w.icon.icon}` : null },
      set: `${setName} (${setCount})`,
      critValue: b.cv, critRate: b.statCritRate, critDmg: b.statCritDmg,
    };
  }).sort((a, b) => b.boardPct - a.boardPct);

  const echoes = (echoesResp.echoes || []).map((e) => {
    const ref = echoById[String(e.echoId)] || {};
    const fetter = fetterById[String(e.activeSetId)];
    return {
      name: ref.name?.fr || `Écho ${e.echoId}`,
      set: fetter?.name?.fr || `Set ${e.activeSetId}`,
      mainStat: `${e.mainStatValue}%`,
      cv: echoCv(e.substats),
      icon: ref.icon ? `https://wuwa.build${ref.icon}` : null,
    };
  }).sort((a, b) => b.cv - a.cv);

  const best = characters[0];
  const owner = builds.builds?.[0]?.owner;

  return {
    uid: WUWA_UID, server: 'EU', nickname: owner?.username || 'Lou',
    heroArt: best?._splashArt || characters.find((c) => c._splashArt)?._splashArt || null,
    tracker: `https://wuwa.build/profile/${WUWA_UID}`,
    buildsCount: builds.total ?? characters.length,
    echoesCount: echoesResp.total ?? echoes.length,
    characters: characters.map(({ _splashArt, ...c }) => c),
    echoes,
    note: 'Synchronisé automatiquement depuis WuWaBuilds (api.wuwa.build, mise à jour côté site toutes les 5 minutes) — regénère simplement ta carte avec wuwa-bot puis réimporte sur wuwa.build/import si tu changes de build.',
  };
}

/* ============================== LEAGUE OF LEGENDS / TFT (Riot API) ============================== */

async function riotGet(url) {
  const res = await fetch(url, { headers: { 'X-Riot-Token': process.env.RIOT_API_KEY } });
  if (!res.ok) throw new Error(`Riot API ${url} -> HTTP ${res.status}`);
  return res.json();
}
const ROMAN = { I: 1, II: 2, III: 3, IV: 4 };
function tierLabel(tier, rank) {
  const word = tier.charAt(0) + tier.slice(1).toLowerCase();
  return rank ? `${word} ${ROMAN[rank] ?? rank}` : word;
}
const rankEmblemUrl = (tier) => `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${tier.toLowerCase()}.png`;
const profileIconUrl = (id) => `https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon${id}.jpg?image=q_auto:good,f_png,w_200`;
const winrate = (w, l) => (w + l ? Math.round((w / (w + l)) * 100) : 0);

// Only patches rank/level/profile-icon fields — champion mastery, match
// history and highlights need Match-V5 (a lot more calls/complexity) and
// stay as the last manually-refreshed snapshot for now.
async function fetchRiot({ gameName, tagLine, platform }) {
  const acct = await riotGet(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`);
  const [summoner, entries, tftEntries] = await Promise.all([
    riotGet(`https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${acct.puuid}`),
    riotGet(`https://${platform}.api.riotgames.com/lol/league/v4/entries/by-puuid/${acct.puuid}`),
    riotGet(`https://${platform}.api.riotgames.com/tft/league/v1/by-puuid/${acct.puuid}`),
  ]);
  const solo = entries.find((e) => e.queueType === 'RANKED_SOLO_5x5');
  const flex = entries.find((e) => e.queueType === 'RANKED_FLEX_SR');
  const tft = tftEntries.find((e) => e.queueType === 'RANKED_TFT');

  const lolPatch = { summonerLevel: summoner.summonerLevel, profileIcon: profileIconUrl(summoner.profileIconId) };
  if (solo) {
    lolPatch.rankEmblem = rankEmblemUrl(solo.tier);
    lolPatch.queues = { soloDuo: { tier: tierLabel(solo.tier, solo.rank), lp: solo.leaguePoints, wins: solo.wins, losses: solo.losses, winrate: winrate(solo.wins, solo.losses) } };
  }
  if (flex) {
    lolPatch.queues = { ...lolPatch.queues, flex: { tier: tierLabel(flex.tier, flex.rank), lp: flex.leaguePoints, wins: flex.wins, losses: flex.losses, winrate: winrate(flex.wins, flex.losses) } };
  }

  const tftPatch = {};
  if (tft) {
    tftPatch.rankEmblem = rankEmblemUrl(tft.tier);
    tftPatch.ranked = { tier: tierLabel(tft.tier, tft.rank), lp: tft.leaguePoints, wins: tft.wins, losses: tft.losses };
  }

  return { lolPatch, tftPatch };
}

/* ============================== data.js surgery ============================== */

// Finds `  <key>: {` at the top level and returns the [start, end) character
// range of the balanced `{ ... }` block that follows, so it can be swapped
// out without disturbing anything else in the file (comments, other blocks,
// formatting). Brace-counting skips over string literals so a `{`/`}`
// inside a quoted value never throws off the count.
function findBlock(text, key) {
  const marker = `\n  ${key}: {`;
  const markerIdx = text.indexOf(marker);
  if (markerIdx === -1) throw new Error(`Could not find top-level "${key}:" block in data.js`);
  const start = markerIdx + marker.length - 1; // position of the opening `{`
  let depth = 0, inString = null;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (ch === '\\') { i++; continue; }
      if (ch === inString) inString = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { inString = ch; continue; }
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) return [start, i + 1]; }
  }
  throw new Error(`Unbalanced braces while scanning "${key}:" block in data.js`);
}

function reindent(jsonText, baseIndent) {
  return jsonText.split('\n').map((line, i) => (i === 0 ? line : baseIndent + line)).join('\n');
}

function replaceBlock(text, key, value) {
  const [start, end] = findBlock(text, key);
  const serialized = reindent(JSON.stringify(value, null, 2), '  ');
  return text.slice(0, start) + serialized + text.slice(end);
}

// Reads a top-level block back into a real JS value (safe: this only ever
// runs against our own data.js, never untrusted input).
function readBlock(text, key) {
  const [start, end] = findBlock(text, key);
  return new Function(`return (${text.slice(start, end)})`)();
}

function deepMerge(target, patch) {
  for (const [k, v] of Object.entries(patch)) {
    if (v && typeof v === 'object' && !Array.isArray(v) && target[k] && typeof target[k] === 'object') deepMerge(target[k], v);
    else target[k] = v;
  }
  return target;
}

// Unlike replaceBlock, this only overwrites the fields present in `patch`,
// preserving everything else already in the block (e.g. lol.champions,
// tft.topTraits — data Riot's simple rank endpoints don't provide).
function mergeBlock(text, key, patch) {
  const current = readBlock(text, key);
  deepMerge(current, patch);
  return replaceBlock(text, key, current);
}

async function main() {
  let text = fs.readFileSync(DATA_JS, 'utf8');
  let hadError = false;

  // Each source is independent: if one fails (a flaky API, an expired Riot
  // dev key that needs manual renewal every 24h, ...) the others still get
  // written instead of the whole run being thrown away.
  try {
    console.log('Fetching Genshin (Enka.network)...');
    const genshin = await fetchGenshin();
    text = replaceBlock(text, 'genshin', genshin);
    console.log(`  -> ${genshin.characters.length} characters, best CV: ${genshin.characters[0].name} (${genshin.characters[0].critValue})`);
  } catch (err) { hadError = true; console.error('Genshin refresh failed:', err.message); }

  try {
    console.log('Fetching Wuthering Waves (api.wuwa.build)...');
    const wuwa = await fetchWuwa();
    text = replaceBlock(text, 'wuwa', wuwa);
    console.log(`  -> ${wuwa.characters.length} builds, ${wuwa.echoes.length} echoes`);
  } catch (err) { hadError = true; console.error('Wuthering Waves refresh failed:', err.message); }

  if (process.env.RIOT_API_KEY) {
    try {
      console.log('Fetching LoL/TFT (Riot API)...');
      const riotAccount = readBlock(text, 'riotAccount');
      const { lolPatch, tftPatch } = await fetchRiot(riotAccount);
      text = mergeBlock(text, 'lol', lolPatch);
      text = mergeBlock(text, 'tft', tftPatch);
      console.log(`  -> LoL ${lolPatch.queues?.soloDuo?.tier ?? '?'} · TFT ${tftPatch.ranked?.tier ?? '?'}`);
    } catch (err) {
      hadError = true;
      console.error('Riot API refresh failed (dev keys expire every 24h — regenerate at developer.riotgames.com and update the RIOT_API_KEY secret):', err.message);
    }
  } else {
    console.log('RIOT_API_KEY not set — skipping LoL/TFT refresh.');
  }

  fs.writeFileSync(DATA_JS, text);
  console.log('data.js updated.');
  if (hadError) process.exit(1); // non-zero so the Action run shows as failed, but data.js still has whatever succeeded
}

main().catch((err) => { console.error(err); process.exit(1); });
