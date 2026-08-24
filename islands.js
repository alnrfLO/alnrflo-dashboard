/* ============================================================
   Floating islands scene (home page) — one island per game,
   orbiting slowly in a circle. Built on Three.js (loaded via CDN
   in index.html). Self-contained: exposes window.initIslandScene()
   / window.stopIslandScene() for app.js to call on route changes.
   ============================================================ */
(function () {
  let renderer, scene, camera, group, raf, canvas, resizeHandler, clickHandler;

  function stopIslandScene() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    if (canvas && clickHandler) canvas.removeEventListener('click', clickHandler);
    if (resizeHandler) window.removeEventListener('resize', resizeHandler);
    if (renderer) {
      renderer.dispose();
      const ctx = renderer.getContext && renderer.getContext();
      if (ctx && ctx.getExtension) { const ext = ctx.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext(); }
    }
    renderer = scene = camera = group = canvas = resizeHandler = clickHandler = null;
  }

  function cssColor(varName, fallback) {
    const v = getComputedStyle(document.body).getPropertyValue(varName).trim();
    return v || fallback;
  }

  function makeIsland(colorHex) {
    const g = new THREE.Group();
    const rock = new THREE.Mesh(
      new THREE.ConeGeometry(1.05, 1.3, 7),
      new THREE.MeshStandardMaterial({ color: 0x8a7b6d, roughness: 0.95, flatShading: true })
    );
    rock.rotation.x = Math.PI;
    rock.position.y = -0.35;
    const top = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.05, 0.42, 7),
      new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.75, flatShading: true })
    );
    top.position.y = 0.5;
    g.add(rock, top);
    const bump = new THREE.Mesh(
      new THREE.ConeGeometry(0.26, 0.55, 6),
      new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.75, flatShading: true })
    );
    bump.position.set(0.42, 0.98, 0.18);
    g.add(bump);
    return g;
  }

  window.initIslandScene = function (games) {
    stopIslandScene();
    canvas = document.getElementById('islandCanvas');
    if (!canvas || !window.THREE || !games || !games.length) return;
    const container = canvas.parentElement;
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(0, 5.2, 8.6);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const dir = new THREE.DirectionalLight(0xffffff, 0.85);
    dir.position.set(3, 6, 4);
    scene.add(dir);

    group = new THREE.Group();
    const radius = 3.3;
    const meshes = [];
    games.forEach((game, i) => {
      const angle = (i / games.length) * Math.PI * 2;
      const color = cssColor(game.colorVar, game.fallback);
      const island = makeIsland(new THREE.Color(color));
      island.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      island.userData.gameId = game.id;
      island.userData.phase = i * 1.7;
      group.add(island);
      meshes.push(island);
    });
    scene.add(group);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    clickHandler = function (ev) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(meshes, true);
      if (hits.length) {
        let obj = hits[0].object;
        while (obj && !obj.userData.gameId) obj = obj.parent;
        if (obj) location.hash = '#/' + obj.userData.gameId;
      }
    };
    canvas.addEventListener('click', clickHandler);
    canvas.style.cursor = 'pointer';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clock = new THREE.Clock();
    function animate() {
      raf = requestAnimationFrame(animate);
      if (!reduceMotion) {
        const t = clock.getElapsedTime();
        group.rotation.y = t * 0.15;
        meshes.forEach((isl) => {
          isl.position.y = Math.sin(t * 1.2 + isl.userData.phase) * 0.12;
          isl.rotation.y = t * 0.3;
        });
      }
      renderer.render(scene, camera);
    }
    animate();

    resizeHandler = function () {
      const w2 = container.clientWidth, h2 = container.clientHeight;
      if (!w2 || !h2) return;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    };
    window.addEventListener('resize', resizeHandler);
  };

  window.stopIslandScene = stopIslandScene;
})();
