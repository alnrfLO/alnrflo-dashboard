/* ============================================================
   Floating islands carousel (home page) — one island per game,
   arranged in a circle. Left/right arrows rotate the circle so the
   chosen island swings to the front and grows; clicking the front
   island navigates to that game's page. Built on Three.js (loaded
   via CDN in index.html).

   Public API (called from app.js):
     window.initIslandScene(games, { onFocusChange, initialIndex })
     window.islandSceneGo(delta)       — step focus by ±1 (arrows)
     window.islandSceneFocus(index)    — jump focus to a specific island
     window.stopIslandScene()          — dispose everything (route change)
   ============================================================ */
(function () {
  let renderer, scene, camera, group, raf, canvas, resizeHandler, clickHandler;
  let meshes = [];
  let focusIndex = 0;
  let targetRotationY = 0;
  let onFocusChange = null;

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
    renderer = scene = camera = group = canvas = resizeHandler = clickHandler = onFocusChange = null;
    meshes = [];
    focusIndex = 0;
    targetRotationY = 0;
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

  function angleFor(index, count) {
    // index 0 sits at the "front" slot (facing the camera, +Z) when the
    // group's own rotation is 0; going to island i means rotating the
    // whole group so slot i lands there instead.
    return (index / count) * Math.PI * 2;
  }

  window.initIslandScene = function (games, opts) {
    stopIslandScene();
    canvas = document.getElementById('islandCanvas');
    if (!canvas || !window.THREE || !games || !games.length) return;
    const container = canvas.parentElement;
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;

    onFocusChange = (opts && opts.onFocusChange) || null;
    focusIndex = (opts && opts.initialIndex) || 0;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 2.1, 6.6);
    camera.lookAt(0, 0.1, 0);

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dir = new THREE.DirectionalLight(0xffffff, 0.85);
    dir.position.set(3, 6, 5);
    scene.add(dir);

    group = new THREE.Group();
    const radius = 3.1;
    const count = games.length;
    meshes = games.map((game, i) => {
      const color = cssColor(game.colorVar, game.fallback);
      const island = makeIsland(new THREE.Color(color));
      const angle = angleFor(i, count);
      island.position.set(Math.sin(angle) * radius, 0, Math.cos(angle) * radius);
      island.userData.gameId = game.id;
      island.userData.index = i;
      island.userData.phase = i * 1.7;
      island.userData.baseScale = 1;
      group.add(island);
      return island;
    });
    scene.add(group);
    targetRotationY = -angleFor(focusIndex, count);
    group.rotation.y = targetRotationY;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    clickHandler = function (ev) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(meshes, true);
      if (!hits.length) return;
      let obj = hits[0].object;
      while (obj && obj.userData.index === undefined) obj = obj.parent;
      if (!obj) return;
      if (obj.userData.index === focusIndex) {
        location.hash = '#/' + obj.userData.gameId;
      } else {
        window.islandSceneFocus(obj.userData.index);
      }
    };
    canvas.addEventListener('click', clickHandler);
    canvas.style.cursor = 'pointer';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clock = new THREE.Clock();
    function animate() {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.08;
      meshes.forEach((isl) => {
        const isFocused = isl.userData.index === focusIndex;
        const targetScale = isFocused ? 1.35 : 0.85;
        const s = isl.scale.x + (targetScale - isl.scale.x) * 0.1;
        isl.scale.setScalar(s);
        if (!reduceMotion) {
          isl.position.y = Math.sin(t * 1.2 + isl.userData.phase) * 0.1;
          isl.rotation.y = t * 0.25;
        }
      });
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

    if (onFocusChange) onFocusChange(focusIndex);
  };

  window.islandSceneFocus = function (index) {
    if (!meshes.length) return;
    focusIndex = ((index % meshes.length) + meshes.length) % meshes.length;
    targetRotationY = -angleFor(focusIndex, meshes.length);
    if (onFocusChange) onFocusChange(focusIndex);
  };

  window.islandSceneGo = function (delta) {
    if (!meshes.length) return;
    window.islandSceneFocus(focusIndex + delta);
  };

  window.stopIslandScene = stopIslandScene;
})();
