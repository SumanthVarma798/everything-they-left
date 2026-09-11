// The 3D stage: Moon, Earth, stars, Sun. createStage(canvas, textures) → { flyTo, snap, destroy } | null
// Waypoints come from content.js: { lat, lon, alt, sunLon, showEarth }.
// Kill switch: returns null when WebGL is unavailable — callers fall back to a still image.
import * as THREE from 'three';
import { SPEED } from './interactions.js';

const DEG = Math.PI / 180;
// Selenographic lat/lon → unit vector. Lon 0 (the side facing Earth) is +X, north is +Y.
const dir = (lat, lon) => new THREE.Vector3(Math.cos(lat * DEG) * Math.cos(lon * DEG), Math.sin(lat * DEG), -Math.cos(lat * DEG) * Math.sin(lon * DEG));

export function createStage(canvas, tex) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); } catch { return null; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(40, 1, 0.01, 200);
  const load = url => { const t = new THREE.TextureLoader().load(url); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = renderer.capabilities.getMaxAnisotropy(); return t; };

  const moonMap = load(tex.moon);
  const moon = new THREE.Mesh(new THREE.SphereGeometry(1, 192, 192),
    new THREE.MeshStandardMaterial({ map: moonMap, bumpMap: moonMap, bumpScale: 2.5, roughness: 1, metalness: 0 }));
  scene.add(moon);                          // SphereGeometry UVs already put texture lon 0 on +X, lon +90 on −Z = dir()

  const earth = new THREE.Mesh(new THREE.SphereGeometry(0.42, 64, 64), new THREE.MeshStandardMaterial({ map: load(tex.earth), roughness: .8 }));
  earth.position.set(9, -0.55, -2);        // in the equatorial plane over the near side: sits on the horizon seen from the south pole
  scene.add(earth);

  const sky = new THREE.Mesh(new THREE.SphereGeometry(90, 32, 32), new THREE.MeshBasicMaterial({ map: load(tex.stars), side: THREE.BackSide, color: 0x666666 }));
  scene.add(sky);

  const sun = new THREE.DirectionalLight(0xffffff, 3.2);
  // earthshine: sunlight bounced off Earth faintly lights the near side at night (real, and the Signal shot needs it)
  const earthshine = new THREE.DirectionalLight(0x9fc4ff, 0.35);
  earthshine.position.copy(earth.position);
  scene.add(sun, earthshine, new THREE.AmbientLight(0x223344, 0.12));

  // camera state: position + look target, tweened on a great-circle-ish path so it never cuts through the Moon
  const UP = new THREE.Vector3(0, 1, 0);
  const cam = { pos: new THREE.Vector3(0, 0.2, 3.4), look: new THREE.Vector3(), sun: new THREE.Vector3(1, .2, .6), up: UP.clone() };
  let tween = null, raf, alive = true;

  function frame(wp) {
    // trap: lookAt with `up` parallel to the view direction flips/NaNs at the poles → keep the camera off the pole axis
    const camLat = Math.max(-70, Math.min(70, wp.lat)), surf = dir(wp.lat, wp.lon);
    if (wp.showEarth) return {                               // standing on the surface, Earth on the skyline
      pos: dir(wp.lat, wp.lon).multiplyScalar(1.012), look: earth.position.clone().add(new THREE.Vector3(0, -0.9, 0)),
      sun: dir(wp.lat < 0 ? -7 : 7, wp.sunLon ?? wp.lon + 70).multiplyScalar(10),   // a few degrees above *their* horizon
      up: dir(wp.lat, wp.lon),                              // standing on the ground: up = away from the Moon (−Y at the south pole)
    };
    return {
      pos: dir(camLat, wp.lon).multiplyScalar(wp.alt ?? 1.8).add(new THREE.Vector3(0, wp.lat < -70 ? -0.35 : wp.lat > 70 ? 0.35 : 0, 0)),
      look: surf.multiplyScalar(wp.alt > 3 ? 0 : 0.92),
      sun: dir(10, wp.sunLon ?? wp.lon + 70).multiplyScalar(10),
      up: UP.clone(),
    };
  }
  function apply(p) {
    camera.position.copy(p.pos); camera.up.copy(p.up); camera.lookAt(p.look); sun.position.copy(p.sun);
  }
  function snap(wp) { const f = frame(wp); Object.assign(cam, f); tween = null; apply(cam); }
  function flyTo(wp, seconds = 3) {
    const from = { pos: cam.pos.clone(), look: cam.look.clone(), sun: cam.sun.clone(), up: cam.up.clone() }, to = frame(wp);
    return new Promise(res => { tween = { from, to, t0: performance.now(), dur: seconds * 1000 / SPEED, res }; });
  }
  const ease = t => t < .5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (canvas.width !== Math.round(w * renderer.getPixelRatio())) { renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
  }
  function loop(now) {
    if (!alive) return;
    resize();
    if (tween) {
      const t = Math.min(1, (now - tween.t0) / tween.dur), e = ease(t), { from, to } = tween;
      const r = THREE.MathUtils.lerp(from.pos.length(), to.pos.length(), e) + Math.sin(Math.PI * t) * 0.9;   // pull back mid-flight
      cam.pos.copy(from.pos).normalize().lerp(to.pos.clone().normalize(), e).normalize().multiplyScalar(r);
      cam.look.lerpVectors(from.look, to.look, e);
      cam.sun.lerpVectors(from.sun, to.sun, e);
      // up can flip +Y → −Y (south pole): lerping that passes through zero. Roll about the view axis
      // during the last third of the flight instead.
      const ue = THREE.MathUtils.clamp((e - 0.65) / 0.35, 0, 1), view = cam.look.clone().sub(cam.pos).normalize();
      const a = from.up.clone().projectOnPlane(view).normalize(), b = to.up.clone().projectOnPlane(view).normalize();
      const ang = Math.atan2(view.dot(a.clone().cross(b)), a.dot(b));
      cam.up.copy(t === 1 ? to.up : a.applyAxisAngle(view, ang * ue));
      if (t === 1) { tween.res(); tween = null; }
    }
    apply(cam);
    earth.rotation.y += 0.001;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  }
  apply(cam); raf = requestAnimationFrame(loop);
  return { flyTo, snap, destroy() { alive = false; cancelAnimationFrame(raf); renderer.dispose(); } };
}
