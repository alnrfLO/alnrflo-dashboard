/* ============================================================
   alnrfLO Dashboard v2 — SPA router + renderers.
   Reuses the v1 "Codex du Voyageur" stylesheet/components as-is;
   this file only turns data.js into that exact markup. No emoji
   icons — real game images, or nothing.
   ============================================================ */
(function () {
  const D = window.DASH_DATA;
  const $content = document.getElementById('content');

  const VIVID = { gold: 'var(--gold-vivid)', rose: 'var(--rose-vivid)', peach: 'var(--peach-vivid)', teal: 'var(--teal-vivid)', lav: 'var(--lav-vivid)', cyan: 'var(--cyan-vivid)' };
  const SOFT = { gold: 'var(--gold-soft)', rose: 'var(--rose-soft)', peach: 'var(--peach-soft)', teal: 'var(--teal-soft)', lav: 'var(--lav-soft)', cyan: 'var(--cyan-soft)' };

  /* ---------- helpers ---------- */
  const esc = s => (s == null ? '' : String(s));
  const fmtInt = n => n.toLocaleString('fr-FR');
  const fmt1 = n => n.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const wrClass = wr => (wr >= 55 ? 'wr-good' : wr <= 40 ? 'wr-bad' : 'wr-mid');
  const champIcon = name => `https://opgg-static.akamaized.net/meta/images/lol/16.14.1/champion/${name}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_png,w_160,h_160`;

  const sectionLabel = text => `<div class="section-label">${esc(text)}</div>`;

  function donut(pct, color, center) {
    return `<div class="donut" style="--d1:${VIVID[color]}; --d2:${SOFT[color]}; --p1:${pct}%;"><div class="donut-center"><b>${pct}%</b><span>${esc(center || '')}</span></div></div>`;
  }
  function donut3(colors, pcts, centerBig, centerSmall) {
    const p1 = pcts[0], p2 = pcts[0] + pcts[1];
    return `<div class="donut donut-3" style="--d1:${colors[0]}; --d2:${colors[1]}; --d3:${colors[2]}; --p1:${p1}%; --p2:${p2}%;"><div class="donut-center"><b>${esc(centerBig)}</b><span>${esc(centerSmall || '')}</span></div></div>`;
  }
  function donutLegendItem(label, value, color) {
    const dot = color ? `<span class="donut-dot" style="background:${color}"></span>` : '';
    return `<div class="donut-legend-item"><span class="lg-left">${dot}${esc(label)}</span><b>${esc(value)}</b></div>`;
  }
  function gaugeSvg(pct, colorVar) {
    const r = 38, circ = 2 * Math.PI * r, offset = circ - (circ * pct / 100);
    return `<svg class="gauge-svg" height="76" viewbox="0 0 90 90" width="76">
      <circle cx="45" cy="45" fill="none" r="${r}" stroke="rgba(0,0,0,0.08)" stroke-width="9"></circle>
      <circle cx="45" cy="45" fill="none" r="${r}" stroke="${colorVar}" stroke-dasharray="${circ.toFixed(2)}" stroke-dashoffset="${offset.toFixed(2)}" stroke-linecap="round" stroke-width="9" transform="rotate(-90 45 45)"></circle>
      <text fill="var(--ink)" font-size="20" font-weight="600" text-anchor="middle" x="45" y="51">${pct}%</text>
    </svg>`;
  }
  function highlightGrid(items) {
    return `<div class="highlight-grid">${items.map(h => `<div class="highlight-card"><div class="highlight-text"><b>${esc(h.title)}</b>${esc(h.text)}</div></div>`).join('')}</div>`;
  }
  function fullStats(pairs) {
    return `<div class="full-stats">${pairs.map(([k, v]) => `<div><span>${esc(k)}</span><span>${esc(v)}</span></div>`).join('')}</div>`;
  }
  function chipRow(chips) {
    return `<div class="chip-row">${chips.map(c => `<div class="chip${c.img ? ' chip-img' : ''}">${c.img ? `<img alt="" class="champ-icon" src="${c.img}"/>` : ''}${esc(c.text)}${c.small ? ` <small>${esc(c.small)}</small>` : ''}</div>`).join('')}</div>`;
  }
  function statBlockQueue(label, tier, lp, wins, losses, winrate) {
    return `<div class="stat-block">
      <div class="stat-top"><div><div class="stat-queue">${esc(label)}</div><div class="stat-tier">${esc(tier)} · ${lp} LP</div></div><div class="stat-wr">${wins}V ${losses}D · <b>${winrate}%</b></div></div>
      <div class="bar bar-gold"><span style="width:${lp}%"></span></div>
    </div>`;
  }
  function lpChart(items, colorVar, colorSoft) {
    const max = Math.max(...items.map(i => Math.abs(i.value)), 1);
    return `<div class="lp-chart">${items.map(i => `<div class="lp-bar-col"><div class="lp-bar" style="height:${Math.max(4, Math.abs(i.value) / max * 100)}%; background:linear-gradient(180deg,${colorVar},${colorSoft});"></div><div class="lp-bar-label">${esc(i.label)}<br/>${esc(i.value)}</div></div>`).join('')}</div>`;
  }
  function champTable(rows) {
    return `<div class="champ-table-wrap"><table class="champ-full-table">
      <tr><th>Champion</th><th>Parties</th><th>KDA</th><th>CS/m</th></tr>
      ${rows.map(c => {
        const wr = Math.round((c.wins / (c.wins + c.losses)) * 100);
        return `<tr><td class="champ-name-cell"><img src="${champIcon(c.champion)}" alt=""/>${esc(c.label || c.champion)}</td><td class="${wrClass(wr)}">${c.wins}V ${c.losses}D · ${wr}%</td><td>${c.kda.toFixed(2)}:1</td><td>${fmt1(c.csPerMin)}</td></tr>`;
      }).join('')}
    </table></div>`;
  }
  function matchupRows(items) {
    return items.map(m => {
      const wr = Math.round((m.wins / (m.wins + m.losses)) * 100);
      return `<div class="matchup-row"><span><img src="${champIcon(m.champion)}" alt=""/>vs ${esc(m.label || m.champion)}</span><span class="${wrClass(wr)}">${m.wins}V ${m.losses}D · ${wr}%</span></div>`;
    }).join('');
  }
  function echoTable(rows) {
    return `<div class="champ-table-wrap"><table class="champ-full-table">
      <tr><th>Écho</th><th>Set</th><th>Stat principale</th><th>Crit Value</th></tr>
      ${rows.map(e => `<tr><td class="champ-name-cell"><img src="${e.icon}" alt=""/>${esc(e.name)}</td><td>${esc(e.set)}</td><td>${esc(e.mainStat)}</td><td>${e.cv > 0 ? `${fmt1(e.cv)} CV` : '—'}</td></tr>`).join('')}
    </table></div>`;
  }
  function genshinCharBlock(c) {
    const s = c.stats;
    const statPairs = [['PV', fmtInt(s.hp)], ['ATQ', fmtInt(s.atk)], ['DÉF', fmtInt(s.def)], ['Maîtrise Élém.', s.elementalMastery], ['Taux CRIT', s.critRate + '%'], ['DGT CRIT', s.critDmg + '%'], ['Recharge Énergie', s.energyRecharge + '%']];
    if (s.bonusDmg) statPairs.push([s.bonusDmg.label, s.bonusDmg.value + '%']);
    return `<div class="char-block">
      <div class="char-top"><span class="char-name">${esc(c.name)}</span><span class="char-lv">${esc(c.element)} · Niv. ${esc(c.level)} · ${c.critValue} CV${c.topPercent ? ` · TOP ${c.topPercent}%` : ''}</span></div>
      <div class="char-block-body">
        <img alt="${esc(c.name)}" class="char-portrait" src="${c.portrait}"/>
        <div>
          ${chipRow([{ text: `${c.weapon.name} ${c.weapon.rarity}★ ${c.weapon.refine} (Niv. ${c.weapon.level})` }, { text: c.set }])}
          ${fullStats(statPairs)}
        </div>
      </div>
    </div>`;
  }
  function wuwaCharBlock(c) {
    return `<div class="char-block">
      <div class="char-top"><span class="char-name">${esc(c.name)}</span><span class="char-lv">${esc(c.sequence)} · ${esc(c.board)} · ${c.boardPct}%</span></div>
      <div class="char-block-body">
        <img alt="${esc(c.name)}" class="char-portrait" src="${c.portrait}"/>
        <div>
          ${chipRow([{ img: c.weapon.icon, text: `${c.weapon.name} (${c.weapon.refine})` }, { text: c.set }])}
          ${fullStats([['Séquence', c.sequence], ['Rang mondial', `#${fmtInt(c.rank)} / ${fmtInt(c.rankTotal)}`], ['Crit Value', `${c.critValue} CV`], ['Taux CRIT', `${c.critRate}%`], ['DGT CRIT', `${c.critDmg}%`], ['Board', `${esc(c.board)} · ${c.boardPct}%`]])}
        </div>
      </div>
    </div>`;
  }
  function pageHero({ badge, title, art, accentVars, rankImg, rankLabel, rankSub }) {
    return `<div class="page-hero">
      ${art ? `<div class="page-hero-art" style="background-image:url('${art}')"></div>` : `<div class="page-hero-art art-abstract" style="${accentVars}"></div>`}
      <div class="page-hero-overlay"></div>
      ${rankImg ? `<div class="hero-rank-badge"><img alt="" src="${rankImg}"/><div class="hero-rank-badge-text"><b>${esc(rankLabel)}</b><span>${esc(rankSub)}</span></div></div>` : ''}
      <div class="page-hero-content"><div class="page-badge">${badge}</div><div class="page-title">${esc(title)}</div></div>
    </div>`;
  }
  function pageFooter() {
    return `<div class="modal-footer-meta"><span class="updated-tag">Dernière mise à jour · ${esc(D.player.updated)}</span></div>`;
  }
  function pageShell(hero, sideHtml, mainHtml) {
    return `${hero}<div class="page-body"><div class="detail-content">
      <div class="detail-grid">
        <div class="detail-side">${sideHtml}</div>
        <div class="detail-main">${mainHtml}</div>
      </div>
      ${pageFooter()}
    </div></div>`;
  }

  /* ============================================================ HOME */
  const GAME_COLOR = {
    lol: { colorVar: '--gold-vivid', fallback: '#E8A93C' },
    valorant: { colorVar: '--rose-vivid', fallback: '#F0466C' },
    tft: { colorVar: '--peach-vivid', fallback: '#E8842E' },
    genshin: { colorVar: '--teal-vivid', fallback: '#16B894' },
    hsr: { colorVar: '--lav-vivid', fallback: '#6C4FE0' },
    wuwa: { colorVar: '--cyan-vivid', fallback: '#17A9C4' },
  };

  function gameQuickStats() {
    const bestGenshin = D.genshin.characters.reduce((a, c) => (c.critValue > a.critValue ? c : a));
    const wuwaByBoard = [...D.wuwa.characters].sort((a, b) => b.boardPct - a.boardPct);
    return [
      { id: 'lol', avatar: D.lol.profileIcon, name: 'League of Legends', badgeClass: 'badge-gold', badgeText: 'op.gg', stats: [
        ['Niveau', D.lol.summonerLevel],
        ['Solo / Duo', `${D.lol.queues.soloDuo.tier} · ${D.lol.queues.soloDuo.lp} LP`],
        ['WR Solo / Duo', D.lol.queues.soloDuo.winrate + '%'],
        ['Flexible', `${D.lol.queues.flex.tier} · ${D.lol.queues.flex.lp} LP`],
        ['WR Flexible', D.lol.queues.flex.winrate + '%'],
        ['Top champion', `${D.lol.mastery[0].champion} · ${Math.round(D.lol.mastery[0].points / 1000)}k pts`]
      ] },
      { id: 'valorant', avatar: null, name: 'Valorant', badgeClass: 'badge-rose', badgeText: 'op.gg', stats: [
        ['Niveau', D.valorant.accountLevel],
        ['Rang', D.valorant.rank],
        ['Winrate', `${D.valorant.winrate}% (${D.valorant.wins}V ${D.valorant.losses}D)`],
        ['KDA', D.valorant.stats.kda.toFixed(2) + ':1'],
        ['Headshot %', D.valorant.stats.headshotPct + '%'],
        ['Meilleur rôle', `${D.valorant.roles[1].role} · ${D.valorant.roles[1].winrate}% WR`]
      ] },
      { id: 'tft', avatar: D.lol.profileIcon, name: 'Teamfight Tactics', badgeClass: 'badge-peach', badgeText: 'op.gg', stats: [
        ['Rang', `${D.tft.ranked.tier} · ${D.tft.ranked.lp} LP`],
        ['Top 4', D.tft.ranked.top4Rate + '%'],
        ['Place moyenne', D.tft.ranked.avgPlacement + ' / 8'],
        ['Parties', D.tft.ranked.games],
        ['Meilleure unité', `${D.tft.topChampions[3].champion} · #${D.tft.topChampions[3].avgPlacement}`],
        ['Top synergie', D.tft.topTraits[0].trait]
      ] },
      { id: 'genshin', avatar: D.genshin.profileIcon, name: 'Genshin Impact', badgeClass: 'badge-teal', badgeText: 'enka.network', stats: [
        ['Rang Aventure', 'AR ' + D.genshin.adventureRank],
        ['Niveau Monde', 'WL ' + D.genshin.worldLevel],
        ['Abîme Spiralé', D.genshin.spiralAbyss],
        ['Roster build', D.genshin.characters.length + ' personnages'],
        ['Meilleur CV', `${bestGenshin.name} · ${bestGenshin.critValue}`],
        ['Hauts faits', D.genshin.achievements]
      ] },
      { id: 'hsr', avatar: D.hsr.profileIcon, name: 'Honkai: Star Rail', badgeClass: 'badge-lav', badgeText: 'enka.network', stats: [
        ['Niv. Trailblaze', 'TL ' + D.hsr.trailblazeLevel],
        ['Équilibre', 'EQ ' + D.hsr.equilibriumLevel],
        ['Univers Simulé', D.hsr.simulatedUniverse],
        ['Hauts faits', D.hsr.achievements],
        ['Vitrine', `${D.hsr.showcase.name} · Éidolon ${D.hsr.showcase.eidolon}`],
        ['Crit / Crit DMG', `${D.hsr.showcase.stats.critRate}% / ${D.hsr.showcase.stats.critDmg}%`]
      ] },
      { id: 'wuwa', avatar: wuwaByBoard[0].portrait, name: 'Wuthering Waves', badgeClass: 'badge-cyan', badgeText: 'wuwa.build', stats: [
        ['Résonateurs', D.wuwa.characters.map(c => c.name).join(' · ')],
        ['Meilleur board', `${wuwaByBoard[0].name} · ${wuwaByBoard[0].boardPct}%`],
        ['2e board', `${wuwaByBoard[1] ? `${wuwaByBoard[1].name} · ${wuwaByBoard[1].boardPct}%` : '—'}`],
        ['Échos', D.wuwa.echoesCount],
        ['Meilleur écho', `${D.wuwa.echoes[0].name} · ${fmt1(D.wuwa.echoes[0].cv)} CV`],
        ['Serveur', D.wuwa.server]
      ] }
    ];
  }

  function islandPreviewHtml(g) {
    return `
      <div class="island-preview-title">${g.avatar ? `<img src="${g.avatar}" alt=""/>` : ''}${esc(g.name)}<span class="badge ${g.badgeClass} realm-summary-badge">${esc(g.badgeText)}</span></div>
      ${fullStats(g.stats)}
      <a href="#/${g.id}" class="island-preview-hint">Voir la page →</a>
    `;
  }

  function renderHome() {
    const stats = gameQuickStats();
    $content.innerHTML = `
      <div class="island-scene">
        <div class="island-stage">
          <canvas id="islandCanvas"></canvas>
          <button class="island-arrow island-arrow-prev" id="islandPrev" aria-label="Île précédente">‹</button>
          <button class="island-arrow island-arrow-next" id="islandNext" aria-label="Île suivante">›</button>
        </div>
        <div class="island-preview" id="islandPreview">${islandPreviewHtml(stats[0])}</div>
      </div>
    `;
    const preview = document.getElementById('islandPreview');
    document.getElementById('islandPrev').addEventListener('click', () => window.islandSceneGo && window.islandSceneGo(-1));
    document.getElementById('islandNext').addEventListener('click', () => window.islandSceneGo && window.islandSceneGo(1));
    if (window.initIslandScene) {
      requestAnimationFrame(() => window.initIslandScene(
        D.games.map(g => ({ id: g.id, avatar: g.avatar, ...GAME_COLOR[g.id] })),
        { onFocusChange: (index) => { preview.innerHTML = islandPreviewHtml(stats[index]); } }
      ));
    }
  }

  /* ============================================================ LOL */
  function renderLol() {
    const g = D.lol;
    const hero = pageHero({ badge: `op.gg · ${D.player.riotId}`, title: 'League of Legends', art: g.heroArt, rankImg: g.rankEmblem, rankLabel: `${g.queues.soloDuo.tier} · ${g.queues.soloDuo.lp} LP`, rankSub: `Solo/Duo · Saison ${D.player.season}` });

    const side = `
      <div class="side-card">
        ${sectionLabel(`Vue d'ensemble — Saison ${D.player.season}`)}
        <div class="donut-wrap">
          ${donut(g.seasonTotals.winrate, 'gold', 'winrate')}
          <div class="donut-legend">
            ${donutLegendItem('Victoires', g.seasonTotals.wins, 'var(--gold-vivid)')}
            ${donutLegendItem('Défaites', g.seasonTotals.losses, 'var(--gold-soft)')}
            ${donutLegendItem('Total parties classées', g.seasonTotals.wins + g.seasonTotals.losses)}
            ${donutLegendItem('Champions différents', g.seasonTotals.champsPlayed)}
          </div>
        </div>
      </div>
      <div class="side-card">${sectionLabel('Faits marquants')}${highlightGrid(g.highlights)}</div>
      <div class="side-card">
        ${sectionLabel('File Solo / Duo')}
        ${statBlockQueue('Saison actuelle', g.queues.soloDuo.tier, g.queues.soloDuo.lp, g.queues.soloDuo.wins, g.queues.soloDuo.losses, g.queues.soloDuo.winrate)}
        ${sectionLabel('File Flexible')}
        ${statBlockQueue('Saison actuelle', g.queues.flex.tier, g.queues.flex.lp, g.queues.flex.wins, g.queues.flex.losses, g.queues.flex.winrate)}
      </div>
      <div class="side-card">${sectionLabel('Maîtrise — Top champions')}${chipRow(g.mastery.map(m => ({ img: champIcon(m.champion), text: m.champion, small: `${fmtInt(m.points)} pts` })))}</div>
    `;

    const main = `
      ${sectionLabel(`Évolution LP — Solo/Duo (par saison)`)}
      ${lpChart(g.lpHistory.map(h => ({ label: h.season, value: h.lp })), 'var(--gold)', 'var(--gold-soft)')}
      <div class="two-col">
        <div>${sectionLabel('Historique — Solo/Duo')}<table class="season-table">${g.seasonHistory.soloDuo.map(s => `<tr><td>${s.season}</td><td>${s.tier}</td><td>${s.lp} LP</td></tr>`).join('')}</table></div>
        <div>${sectionLabel('Historique — Flexible')}<table class="season-table">${g.seasonHistory.flex.map(s => `<tr><td>${s.season}</td><td>${s.tier}</td><td>${s.lp} LP</td></tr>`).join('')}</table></div>
      </div>
      ${sectionLabel(`Tous les champions joués — Saison ${D.player.season} (${g.seasonTotals.wins}V ${g.seasonTotals.losses}D · ${g.seasonTotals.winrate}%)`)}
      ${champTable(g.champions)}
      ${sectionLabel(`Matchups les plus joués — ${g.matchups.champion}`)}
      <div>${matchupRows(g.matchups.vs)}</div>
      ${sectionLabel('Champions recommandés pour toi (méta EUW)')}
      ${chipRow(g.recommended.map(r => ({ img: champIcon(r.champion), text: r.champion, small: `${r.winrate.toFixed(1)}% WR` })))}
    `;
    $content.innerHTML = pageShell(hero, side, main);
  }

  /* ============================================================ VALORANT */
  function renderValorant() {
    const g = D.valorant;
    const hero = pageHero({ badge: `op.gg · ${D.player.riotId}`, title: 'Valorant', accentVars: '--art-c1: rgba(240,70,108,0.4); --art-c2: rgba(108,79,224,0.25); --art-c3: rgba(255,255,255,0.25);', rankImg: g.rankEmblem, rankLabel: g.rank, rankSub: g.act });

    const totalShots = g.stats.headshots + g.stats.bodyshots + g.stats.legshots;
    const side = `
      <div class="side-card">
        <div class="val-id"><img alt="" class="val-card-img" src="${g.playerCard}"/><div><div class="val-name">${D.player.riotId.split('#')[0]} <span class="val-tag">#${D.player.riotId.split('#')[1]}</span></div><div class="val-tag">Niveau de compte ${g.accountLevel} · ${D.player.region}</div></div></div>
        <div class="gauge-wrap">${gaugeSvg(g.winrate, 'var(--rose-vivid)')}<div class="gauge-label">${esc(g.rank)} · ${esc(g.act)}<b>${g.wins}V · ${g.losses}D (+${g.remakes} remake)</b></div></div>
      </div>
      <div class="side-card">${sectionLabel('Faits marquants')}${highlightGrid(g.highlights)}</div>
      <div class="side-card">${sectionLabel('Performance par rôle')}<div>${g.roles.map(r => `<div class="matchup-row"><span>${esc(r.role)}</span><span class="${wrClass(r.winrate)}">${r.kda.toFixed(2)}:1 KDA · ${r.winrate}% WR${r.wins != null ? ` <small>(${r.wins}V ${r.losses}D)</small>` : ''}</span></div>`).join('')}</div></div>
      <div class="side-card">
        ${sectionLabel(`Dernier match — ${g.lastMatch.date}`)}
        ${chipRow([{ text: `${g.lastMatch.result} ${g.lastMatch.score} · ${g.lastMatch.place}` }, { text: g.lastMatch.kda, small: `KDA ${g.lastMatch.kdaRatio}:1` }, { text: `ACS ${g.lastMatch.acs}`, small: `ADR ${g.lastMatch.adr}` }, { text: `HS% ${g.lastMatch.hsPct}%`, small: `DDA ${g.lastMatch.dda}` }])}
      </div>
    `;
    const main = `
      ${sectionLabel('Statistiques — Compétitif')}
      ${fullStats([['Dégâts / round', g.stats.damagePerRound], ['Ratio K/D', g.stats.kd], ['KDA', g.stats.kda.toFixed(2) + ':1'], ['Score / round (ACS)', g.stats.acsPerRound], ['Meilleur match (kills)', g.stats.bestMatchKills], ['Temps de jeu', g.stats.playtime]])}
      ${sectionLabel('Précision de tir')}
      <div class="donut-wrap">
        ${donut3([VIVID.rose, VIVID.peach, VIVID.lav], [g.stats.headshotPct, g.stats.bodyshotPct, g.stats.legshotPct], fmtInt(totalShots), 'tirs touchés')}
        <div class="donut-legend">
          ${donutLegendItem('Tête', `${g.stats.headshotPct}% (${g.stats.headshots})`, VIVID.rose)}
          ${donutLegendItem('Corps', `${g.stats.bodyshotPct}% (${g.stats.bodyshots})`, VIVID.peach)}
          ${donutLegendItem('Jambes', `${g.stats.legshotPct}% (${g.stats.legshots})`, VIVID.lav)}
        </div>
      </div>
      ${fullStats([['Éliminations', g.stats.kills], ['Morts', g.stats.deaths], ['Assists', g.stats.assists]])}
      ${sectionLabel('20 derniers matchs (compétitif)')}
      ${fullStats([['Bilan', `${g.last20Matches.wins}V · ${g.last20Matches.remakes} Remake · ${g.last20Matches.losses}D`], ['Winrate', g.last20Matches.winrate + '%'], ['KDA moyen', g.last20Matches.kdaAvg], ['OP Score', g.last20Matches.opScore + ' / 1000'], ['Round win', g.last20Matches.roundWinPct + '%'], ['KAST', g.last20Matches.kast + '%'], ['ACS moyen', g.last20Matches.avgAcs], ['DDA', g.last20Matches.adr]])}
      <div class="note">${esc(g.note)}</div>
    `;
    $content.innerHTML = pageShell(hero, side, main);
  }

  /* ============================================================ TFT */
  function renderTft() {
    const g = D.tft;
    const hero = pageHero({ badge: `op.gg · ${D.player.riotId} · ${g.set}`, title: 'Teamfight Tactics', art: g.heroArt, rankImg: g.rankEmblem, rankLabel: `${g.ranked.tier} · ${g.ranked.lp} LP`, rankSub: `Classé · ${g.set}` });
    const side = `
      <div class="side-card">
        ${sectionLabel(`Classé · ${g.set}`)}
        ${statBlockQueue('Saison actuelle', g.ranked.tier, g.ranked.lp, g.ranked.wins, g.ranked.losses, g.ranked.top4Rate)}
        ${fullStats([['Parties jouées', g.ranked.games], ['Place moyenne', g.ranked.avgPlacement + ' / 8']])}
      </div>
      <div class="side-card">
        ${sectionLabel('Top 4 vs Bottom 4')}
        <div class="donut-wrap">
          ${donut(g.ranked.top4Rate, 'peach', 'top 4')}
          <div class="donut-legend">
            ${donutLegendItem('Top 4', g.ranked.wins + ' parties', VIVID.peach)}
            ${donutLegendItem('Bottom 4', g.ranked.losses + ' parties', SOFT.peach)}
            ${donutLegendItem('Place moyenne', g.ranked.avgPlacement + ' / 8')}
          </div>
        </div>
      </div>
      <div class="side-card">${sectionLabel('Faits marquants')}${highlightGrid(g.highlights)}</div>
      <div class="side-card">${sectionLabel('Autres modes classés')}${chipRow([{ text: `${g.hyperRoll.tier} · ${g.hyperRoll.lp} LP`, small: 'Hyper Roll' }, { text: `${g.doubleUp.tier} · ${g.doubleUp.lp} LP`, small: `Double Up · ${g.doubleUp.wins}V ${g.doubleUp.losses}D` }])}</div>
    `;
    const main = `
      ${sectionLabel('Répartition des places')}
      ${lpChart(g.placementDistribution.map((v, i) => ({ label: '#' + (i + 1), value: v })), 'var(--peach)', 'var(--peach-soft)')}
      ${sectionLabel('Top synergies')}
      ${chipRow(g.topTraits.map(t => ({ text: t.trait, small: `${t.games} parties · #${t.avgPlacement}` })))}
      ${sectionLabel('Champions les plus joués')}
      ${chipRow(g.topChampions.map(c => ({ text: c.champion, small: `$${c.cost} · ${c.games} parties · #${c.avgPlacement}` })))}
    `;
    $content.innerHTML = pageShell(hero, side, main);
  }

  /* ============================================================ GENSHIN / HSR */
  const RADAR_POLY = {
    genshin: { color: 'var(--teal-vivid)', points: '70,28.75 99.11,53.20 99.05,86.78 70,97.5 55.23,78.53 37.13,51.02' },
    hsr: { color: 'var(--lav-vivid)', points: '70,32.6 100.72,52.26 94.29,84.03 70,92 43.32,85.4 27.61,45.52' }
  };
  function radarSvg(kind) {
    const r = RADAR_POLY[kind];
    return `<svg height="160" viewbox="0 0 140 140" width="160">
      <polygon fill="none" points="70,15 117.63,42.5 117.63,97.5 70,125 22.37,97.5 22.37,42.5" stroke="rgba(0,0,0,0.08)" stroke-width="1"></polygon>
      <polygon fill="none" points="70,42.5 93.815,56.25 93.815,83.75 70,97.5 46.185,83.75 46.185,56.25" stroke="rgba(0,0,0,0.08)" stroke-width="1"></polygon>
      <polygon fill="${r.color}" fill-opacity="0.35" points="${r.points}" stroke="${r.color}" stroke-linejoin="round" stroke-width="2"></polygon>
    </svg>`;
  }
  function radarLegend(kind, items) {
    const color = RADAR_POLY[kind].color;
    return `<div class="radar-legend">${items.map(([k, v]) => `<div class="radar-legend-item"><span><span class="radar-dot" style="background:${color}"></span>${esc(k)}</span><b>${esc(v)}</b></div>`).join('')}</div>`;
  }

  function renderGenshin() {
    const g = D.genshin;
    const hero = pageHero({ badge: `enka.network · UID ${g.uid}`, title: 'Genshin Impact', art: g.heroArt, rankImg: g.profileIcon, rankLabel: `AR ${g.adventureRank} · WL ${g.worldLevel}`, rankSub: `Abîme Spiralé ${g.spiralAbyss}` });
    const side = `
      <div class="side-card">
        <div class="profile-row">
          <div class="profile-stat"><div class="profile-num">AR ${g.adventureRank}</div><div class="profile-label">Rang Aventure</div></div>
          <div class="profile-stat"><div class="profile-num">WL ${g.worldLevel}</div><div class="profile-label">Niveau Monde</div></div>
          <div class="profile-stat"><div class="profile-num">${g.achievements}</div><div class="profile-label">Hauts faits</div></div>
          <div class="profile-stat"><div class="profile-num">${g.spiralAbyss}</div><div class="profile-label">Abîme Spiralé</div></div>
        </div>
        <div class="signature">${esc(g.signature)}</div>
      </div>
      <div class="side-card">${sectionLabel('Faits marquants')}${highlightGrid(g.highlights)}</div>
      <div class="side-card">${sectionLabel('Armes')}${chipRow(g.characters.map(c => ({ text: `${c.weapon.name} (${c.weapon.refine})`, small: c.name })))}</div>
      <div class="side-card"><div class="note">${esc(g.note)}</div></div>
    `;
    const main = `
      ${sectionLabel(`Roster — ${g.characters.length} personnages (Enka.network)`)}
      ${g.characters.map(genshinCharBlock).join('')}
    `;
    $content.innerHTML = pageShell(hero, side, main);
  }

  function renderHsr() {
    const g = D.hsr, s = g.showcase;
    const hero = pageHero({ badge: `enka.network · UID ${g.uid}`, title: 'Honkai: Star Rail', art: g.heroArt, rankImg: g.profileIcon, rankLabel: `TL ${g.trailblazeLevel} · EQ ${g.equilibriumLevel}`, rankSub: `Univers Simulé ${g.simulatedUniverse}` });
    const side = `
      <div class="side-card">
        <div class="profile-row">
          <div class="profile-stat"><div class="profile-num">TL ${g.trailblazeLevel}</div><div class="profile-label">Niv. Trailblaze</div></div>
          <div class="profile-stat"><div class="profile-num">EQ ${g.equilibriumLevel}</div><div class="profile-label">Équilibre</div></div>
          <div class="profile-stat"><div class="profile-num">${g.achievements}</div><div class="profile-label">Hauts faits</div></div>
          <div class="profile-stat"><div class="profile-num">${g.simulatedUniverse}</div><div class="profile-label">Univers Simulé</div></div>
        </div>
        <div class="signature">${esc(g.signature)}</div>
      </div>
      <div class="side-card">${sectionLabel('Faits marquants')}${highlightGrid(g.highlights)}</div>
      <div class="side-card">${sectionLabel('Équipement')}${chipRow([{ text: `${s.lightCone.name} (Niv. ${s.lightCone.level})` }, ...s.relicSets.map(r => ({ text: r }))])}</div>
      <div class="side-card"><div class="note">${esc(g.note)}</div></div>
    `;
    const main = `
      ${sectionLabel('Vitrine — Personnage mis en avant')}
      <div class="char-block">
        <div class="char-top"><span class="char-name">${esc(s.name)}</span><span class="char-lv">Niv. ${esc(s.level)} · Éidolon ${s.eidolon}</span></div>
        <div class="char-block-body">
          <img alt="${esc(s.name)}" class="char-portrait" src="${s.portrait}"/>
          <div>
            <div class="radar-wrap">${radarSvg('hsr')}${radarLegend('hsr', [['ATK', fmtInt(s.stats.atk)], ['Taux CRIT', s.stats.critRate + '%'], ['DGT CRIT', s.stats.critDmg + '%'], ['Régén. Énergie', s.stats.energyRegen + '%'], ['VIT', s.stats.spd], ['DEF', fmtInt(s.stats.def)]])}</div>
            ${fullStats([['PV', fmtInt(s.stats.hp)], ['ATK', fmtInt(s.stats.atk)], ['DEF', fmtInt(s.stats.def)], ['VIT', s.stats.spd], ['Taux CRIT', s.stats.critRate + '%'], ['DGT CRIT', s.stats.critDmg + '%'], ['Régén. Énergie', s.stats.energyRegen + '%'], [s.stats.bonusDmg.label, s.stats.bonusDmg.value + '%']])}
          </div>
        </div>
      </div>
    `;
    $content.innerHTML = pageShell(hero, side, main);
  }

  /* ============================================================ WUWA */
  function renderWuwa() {
    const g = D.wuwa;
    const best = g.characters.reduce((a, b) => (b.boardPct > a.boardPct ? b : a));
    const hero = pageHero({
      badge: `wuwa.build · UID ${g.uid} · ${esc(g.nickname)}`, title: 'Wuthering Waves',
      art: g.heroArt,
      rankImg: best.portrait, rankLabel: `${best.boardPct}% · ${esc(best.board)}`, rankSub: `${esc(best.name)} · #${fmtInt(best.rank)} / ${fmtInt(best.rankTotal)}`
    });
    const side = `
      <div class="side-card">
        <div class="profile-row">
          <div class="profile-stat"><div class="profile-num">${g.buildsCount}</div><div class="profile-label">Builds trackés</div></div>
          <div class="profile-stat"><div class="profile-num">${g.echoesCount}</div><div class="profile-label">Échos possédés</div></div>
          <div class="profile-stat"><div class="profile-num">${best.boardPct}%</div><div class="profile-label">Meilleur board (${esc(best.name)})</div></div>
          <div class="profile-stat"><div class="profile-num">${g.server}</div><div class="profile-label">Serveur</div></div>
        </div>
      </div>
      <div class="side-card">${sectionLabel('Faits marquants')}${highlightGrid(g.characters.map(c => ({ title: `${esc(c.name)} — ${c.boardPct}% (${esc(c.board)})`, text: `#${fmtInt(c.rank)} / ${fmtInt(c.rankTotal)} mondial · ${c.critValue} CV` })).concat([{ title: `${esc(g.echoes[0].name)} — ${fmt1(g.echoes[0].cv)} CV`, text: 'Meilleur écho du roster' }]))}</div>
      <div class="side-card">${sectionLabel('Armes')}${chipRow(g.characters.map(c => ({ img: c.weapon.icon, text: `${c.weapon.name} (${c.weapon.refine})`, small: c.name })))}</div>
      <div class="side-card"><div class="note" style="border-top:none; padding-top:0;">Profil <a href="${g.tracker}" target="_blank" rel="noopener">WuWaBuilds</a> — ${esc(g.note)}</div></div>
    `;
    const main = `
      ${sectionLabel('Résonateurs')}
      ${g.characters.map(wuwaCharBlock).join('')}
      ${sectionLabel(`Échos (${g.echoesCount})`)}
      ${echoTable(g.echoes)}
    `;
    $content.innerHTML = pageShell(hero, side, main);
  }

  /* ---------- router ---------- */
  const ROUTES = { '': renderHome, home: renderHome, lol: renderLol, valorant: renderValorant, tft: renderTft, genshin: renderGenshin, hsr: renderHsr, wuwa: renderWuwa };
  const ORDER = ['home', 'lol', 'valorant', 'tft', 'genshin', 'hsr', 'wuwa'];
  const currentRoute = () => (location.hash.replace(/^#\/?/, '') || 'home');

  function router() {
    const route = currentRoute();
    if (window.stopIslandScene) window.stopIslandScene();
    (ROUTES[route] || renderHome)();
    document.querySelectorAll('.app-nav-item').forEach(a => a.classList.toggle('active', a.dataset.route === route));
    window.scrollTo(0, 0);
    closeSidebar();
  }
  window.addEventListener('hashchange', router);

  /* ---------- sidebar nav build (real images, or nothing — no emoji) ---------- */
  function buildNav() {
    const nav = document.getElementById('appNav');
    const homeItem = `<a href="#/home" class="app-nav-item" data-route="home">Vue d'ensemble</a>`;
    const gameItems = D.games.map(g => `
      <a href="#/${g.id}" class="app-nav-item" data-route="${g.id}">
        ${g.avatar ? `<img class="app-nav-avatar" src="${g.avatar}" alt=""/>` : ''}
        ${esc(g.name)}
        <span class="app-nav-dot${g.status === 'pending' ? ' pending' : ''}"></span>
      </a>`).join('');
    nav.innerHTML = homeItem + `<div class="app-nav-label">Royaumes</div>` + gameItems;
  }

  /* ---------- theme (persisted) ---------- */
  function initTheme() {
    const saved = localStorage.getItem('dash-night');
    if (saved === '1') document.body.classList.add('night');
    const btn = document.getElementById('themeToggle');
    btn.textContent = document.body.classList.contains('night') ? '☀ Mode jour' : '🌙 Mode nuit';
    btn.addEventListener('click', () => {
      document.body.classList.toggle('night');
      const isNight = document.body.classList.contains('night');
      localStorage.setItem('dash-night', isNight ? '1' : '0');
      btn.textContent = isNight ? '☀ Mode jour' : '🌙 Mode nuit';
    });
  }

  /* ---------- mobile sidebar toggle ---------- */
  function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarScrim').classList.remove('show');
  }
  function initSidebarToggle() {
    document.getElementById('sidebarToggle').addEventListener('click', () => {
      document.getElementById('sidebar').classList.add('open');
      document.getElementById('sidebarScrim').classList.add('show');
    });
    document.getElementById('sidebarScrim').addEventListener('click', closeSidebar);
  }

  /* ---------- toast + export (same as v1) ---------- */
  let toastTimer;
  window.showToast = function (msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
  };
  const EXPORT_SLUGS = { home: 'vue-ensemble', lol: 'league-of-legends', valorant: 'valorant', tft: 'tft', genshin: 'genshin-impact', hsr: 'honkai-star-rail', wuwa: 'wuthering-waves' };
  const DAY_BG = 'linear-gradient(160deg, #E7DCF5 0%, #F6E3EA 38%, #FBEEDD 68%, #EFE6F7 100%)';
  const NIGHT_BG = 'linear-gradient(160deg, #1B1730 0%, #241A2E 38%, #2A1F2C 68%, #1E1A30 100%)';
  function initExport() {
    document.getElementById('exportBtn').addEventListener('click', async () => {
      showToast('Génération de l\'image en cours…');
      const content = document.getElementById('content');
      const prevBg = content.style.background;
      // #content itself has no background (the pastel/night gradient lives on <body>) — html2canvas
      // only rasterizes what's inside the captured element, so without this the glass cards and
      // flowing (card-less) sections would export with a transparent/empty backdrop.
      content.style.background = document.body.classList.contains('night') ? NIGHT_BG : DAY_BG;
      // scrollable panels (e.g. the full champion table) only show their scrolled-into-view slice
      // to html2canvas — expand them so the export includes every row, not just the first screenful.
      const scrollers = content.querySelectorAll('.champ-table-wrap');
      const prevScroll = Array.from(scrollers).map(el => ({ maxHeight: el.style.maxHeight, overflow: el.style.overflow }));
      scrollers.forEach(el => { el.style.maxHeight = 'none'; el.style.overflow = 'visible'; });
      try {
        const canvas = await html2canvas(content, { backgroundColor: null, scale: 2, useCORS: true });
        const slug = EXPORT_SLUGS[currentRoute()] || currentRoute();
        const link = document.createElement('a');
        link.download = `alnrfLO-${slug}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast('Image téléchargée ✦');
      } catch (e) { showToast('Export impossible depuis ce navigateur — essaie une capture d\'écran.'); }
      finally {
        content.style.background = prevBg;
        scrollers.forEach((el, i) => { el.style.maxHeight = prevScroll[i].maxHeight; el.style.overflow = prevScroll[i].overflow; });
      }
    });
  }

  /* ---------- keyboard nav between games (← / →), same as v1 ---------- */
  function initKeyboardNav() {
    document.addEventListener('keydown', e => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      const idx = ORDER.indexOf(currentRoute());
      if (idx === -1) return;
      let next = e.key === 'ArrowRight' ? idx + 1 : idx - 1;
      if (next < 0) next = ORDER.length - 1;
      if (next >= ORDER.length) next = 0;
      location.hash = '#/' + ORDER[next];
    });
  }

  /* ---------- ambient particles (same as v1) ---------- */
  function initParticles() {
    const colors = ['#E3C081', '#F0A8B8', '#8FCFC0', '#AFA8E0', '#8FCBD9'];
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = 3 + Math.random() * 6;
      p.style.width = size + 'px'; p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
      p.style.animationDuration = (10 + Math.random() * 14) + 's';
      p.style.animationDelay = (Math.random() * 16) + 's';
      p.style.background = `radial-gradient(circle, ${colors[i % colors.length]}, rgba(255,255,255,0))`;
      document.body.appendChild(p);
    }
  }

  /* ---------- boot ---------- */
  buildNav();
  initTheme();
  initSidebarToggle();
  initExport();
  initKeyboardNav();
  initParticles();
  router();
})();
