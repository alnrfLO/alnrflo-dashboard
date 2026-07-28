(function(){
  // AMBIENT PARTICLES
  const colors = ['#E3C081','#F0A8B8','#8FCFC0','#AFA8E0','#8FCBD9'];
  for(let i=0;i<22;i++){
    const p = document.createElement('div');
    p.className='particle';
    const size = 3 + Math.random()*6;
    p.style.width = size+'px';
    p.style.height = size+'px';
    p.style.left = Math.random()*100+'vw';
    p.style.setProperty('--drift', (Math.random()*80-40)+'px');
    p.style.animationDuration = (10 + Math.random()*14)+'s';
    p.style.animationDelay = (Math.random()*16)+'s';
    p.style.background = `radial-gradient(circle, ${colors[i%colors.length]}, rgba(255,255,255,0))`;
    document.body.appendChild(p);
  }

  // TOAST
  let toastTimer;
  window.showToast = function(msg){
    const t = document.getElementById('toast');
    if(!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=> t.classList.remove('show'), 3200);
  };

  // REFRESH (informatif — pas de fetch live possible depuis un fichier statique)
  window.requestRefresh = function(e){
    if(e) e.stopPropagation();
    showToast('Redemande-moi "rafraîchis mon dashboard" dans le chat pour mettre ces stats à jour ✦');
  };

  // THEME TOGGLE
  const themeBtn = document.getElementById('themeToggle');
  if(themeBtn){
    themeBtn.addEventListener('click', ()=>{
      document.body.classList.toggle('night');
      const isNight = document.body.classList.contains('night');
      themeBtn.textContent = isNight ? '☀ Mode jour' : '🌙 Mode nuit';
    });
  }

  // EXPORT AS IMAGE
  const exportBtn = document.getElementById('exportBtn');
  if(exportBtn){
    exportBtn.addEventListener('click', async ()=>{
      showToast('Génération de l\'image en cours…');
      try{
        const target = document.querySelector('.wrap') || document.querySelector('.page-view');
        const canvas = await html2canvas(target, {backgroundColor:null, scale:2, useCORS:true});
        const link = document.createElement('a');
        link.download = 'alnrfLO-codex.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast('Image téléchargée ✦');
      }catch(err){
        showToast('Export impossible depuis ce navigateur — essaie une capture d\'écran.');
      }
    });
  }

  // PAGE FADE-OUT ON NAVIGATION
  document.querySelectorAll('a[href$=".html"]').forEach(link=>{
    link.addEventListener('click', function(e){
      const href = link.getAttribute('href');
      if(!href || link.target === '_blank') return;
      e.preventDefault();
      document.body.classList.add('fading-out');
      setTimeout(()=>{ window.location.href = href; }, 220);
    });
  });

  // ANIMATED COUNTERS (overview strip numbers count up on load)
  document.querySelectorAll('.overview-num[data-count]').forEach(el=>{
    const target = parseFloat(el.dataset.count);
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const suffix = el.dataset.suffix || '';
    if(isNaN(target)) return;
    const duration = 1100;
    const start = performance.now();
    function tick(now){
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals).replace('.', ',') + suffix;
      if(p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });

  // CARD TILT ON MOUSEMOVE (subtle 3D parallax)
  document.querySelectorAll('.card:not(.card-seal)').forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.classList.add('tilt-active');
      card.style.transform = `translateY(-10px) scale(1.012) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave', ()=>{
      card.classList.remove('tilt-active');
      card.style.transform = '';
    });
  });

  // KEYBOARD NAVIGATION BETWEEN GAME PAGES (← / →)
  const GAME_ORDER = ['lol','valorant','tft','genshin','hsr','wuwa'];
  const currentGame = document.body.dataset.game;
  if(currentGame && GAME_ORDER.includes(currentGame)){
    document.addEventListener('keydown', e=>{
      if(e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const idx = GAME_ORDER.indexOf(currentGame);
      let nextIdx = e.key === 'ArrowRight' ? idx+1 : idx-1;
      if(nextIdx < 0) nextIdx = GAME_ORDER.length-1;
      if(nextIdx >= GAME_ORDER.length) nextIdx = 0;
      const nextSlug = GAME_ORDER[nextIdx];
      document.body.classList.add('fading-out');
      setTimeout(()=>{ window.location.href = nextSlug + '.html'; }, 220);
    });
  }
})();
