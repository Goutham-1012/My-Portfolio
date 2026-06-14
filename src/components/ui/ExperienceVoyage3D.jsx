import { useEffect, useRef } from "react";
import { useMotionValueEvent } from "framer-motion";
import * as THREE from "three";

const MAP_WIDTH = 10;
const MAP_DEPTH = 13.5;
const ROUTE = [
  { x: 0.24, y: 0.1 },
  { x: 0.76, y: 0.36 },
  { x: 0.24, y: 0.62 },
  { x: 0.74, y: 0.88 },
];

function rng(seed = 1) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function worldPoint(point) {
  return new THREE.Vector3(
    (point.x - 0.5) * MAP_WIDTH,
    0.08,
    (point.y - 0.5) * MAP_DEPTH
  );
}

function makeMapTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1536;
  canvas.height = 2048;
  const ctx = canvas.getContext("2d");
  const random = rng(42);
  const w = canvas.width;
  const h = canvas.height;

  const base = ctx.createLinearGradient(0, 0, w, h);
  base.addColorStop(0, "#d8c07e");
  base.addColorStop(0.28, "#f5e6b4");
  base.addColorStop(0.58, "#e4c989");
  base.addColorStop(1, "#c49b55");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);

  const glow = ctx.createRadialGradient(w * 0.54, h * 0.42, h * 0.05, w * 0.54, h * 0.42, h * 0.74);
  glow.addColorStop(0, "rgba(255,255,238,0.48)");
  glow.addColorStop(0.65, "rgba(255,246,206,0.12)");
  glow.addColorStop(1, "rgba(74,42,18,0.32)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  ctx.globalAlpha = 0.42;
  ctx.strokeStyle = "rgba(88, 62, 32, 0.22)";
  ctx.lineWidth = 2;
  for (let x = -120; x < w + 120; x += 118) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 260, h);
    ctx.stroke();
  }
  for (let y = -120; y < h + 120; y += 118) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y + 130);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  function coast(cx, cy, rx, ry, color, label) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.beginPath();
    for (let i = 0; i <= 52; i += 1) {
      const a = (Math.PI * 2 * i) / 52;
      const n = 0.78 + random() * 0.34;
      const x = Math.cos(a) * rx * n;
      const y = Math.sin(a) * ry * (0.76 + random() * 0.28);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.strokeStyle = "rgba(89,62,31,0.54)";
    ctx.lineWidth = 8;
    ctx.fill();
    ctx.stroke();
    ctx.globalAlpha = 0.45;
    ctx.strokeStyle = "rgba(78,109,63,0.55)";
    ctx.lineWidth = 3;
    for (let i = 0; i < 8; i += 1) {
      ctx.beginPath();
      ctx.ellipse(0, 0, rx * (0.28 + i * 0.08), ry * (0.2 + i * 0.055), -0.25, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.font = `${Math.max(34, Math.round(rx * 0.18))}px Georgia, serif`;
    ctx.fillStyle = "rgba(72,45,25,0.5)";
    ctx.textAlign = "center";
    ctx.rotate(-0.08);
    ctx.fillText(label, 0, ry * 0.12);
    ctx.restore();
  }

  coast(w * 0.05, h * 0.16, 360, 250, "#b9a55e", "Clinical Coast");
  coast(w * 0.94, h * 0.26, 330, 230, "#d6ba62", "Finance Bank");
  coast(w * 0.03, h * 0.68, 370, 300, "#bfc46f", "Retail Sound");
  coast(w * 0.92, h * 0.83, 300, 220, "#d1ae67", "Aviation Shoal");

  ctx.save();
  ctx.setLineDash([28, 22]);
  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(84,61,33,0.32)";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(w * ROUTE[0].x, h * ROUTE[0].y);
  for (let i = 1; i < ROUTE.length; i += 1) {
    const a = ROUTE[i - 1];
    const b = ROUTE[i];
    const ay = h * a.y;
    const by = h * b.y;
    const midY = (ay + by) / 2;
    ctx.bezierCurveTo(w * a.x, midY, w * b.x, midY, w * b.x, by);
  }
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.translate(w * 0.82, h * 0.12);
  ctx.rotate(-0.25);
  ctx.strokeStyle = "rgba(82,52,27,0.28)";
  ctx.lineWidth = 5;
  for (let i = 0; i < 16; i += 1) {
    ctx.rotate(Math.PI / 8);
    ctx.beginPath();
    ctx.moveTo(0, -105);
    ctx.lineTo(0, 105);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(0, 0, 92, 0, Math.PI * 2);
  ctx.arc(0, 0, 42, 0, Math.PI * 2);
  ctx.stroke();
  ctx.font = "700 54px Georgia, serif";
  ctx.fillStyle = "rgba(82,52,27,0.34)";
  ctx.textAlign = "center";
  ctx.fillText("N", 0, -122);
  ctx.restore();

  ctx.fillStyle = "rgba(68,42,20,0.1)";
  for (let i = 0; i < 4200; i += 1) {
    const x = random() * w;
    const y = random() * h;
    const size = 0.7 + random() * 2.8;
    ctx.fillRect(x, y, size, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function makeClothTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  const grad = ctx.createRadialGradient(160, 120, 20, 256, 256, 390);
  grad.addColorStop(0, "#fff8dc");
  grad.addColorStop(0.6, "#d9c08a");
  grad.addColorStop(1, "#8a6a3c");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = "rgba(75,51,24,0.18)";
  ctx.lineWidth = 5;
  for (let x = 74; x < 512; x += 82) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x - 36, 512);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(255,255,240,0.18)";
  ctx.lineWidth = 2;
  for (let y = 42; y < 512; y += 58) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y + 12);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeBillowSail(width, height, side = 1, texture) {
  const shape = new THREE.Shape();
  shape.moveTo(-width * 0.46, -height * 0.5);
  shape.bezierCurveTo(-width * 0.62, -height * 0.1, -width * 0.48, height * 0.38, -width * 0.1, height * 0.5);
  shape.bezierCurveTo(width * 0.22, height * 0.42, width * 0.54, height * 0.2, width * 0.42, -height * 0.48);
  shape.bezierCurveTo(width * 0.14, -height * 0.36, -width * 0.18, -height * 0.38, -width * 0.46, -height * 0.5);
  const geometry = new THREE.ShapeGeometry(shape, 24);
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i += 1) {
    const x = pos.getX(i) / width;
    const y = pos.getY(i) / height;
    const billow = Math.sin((y + 0.5) * Math.PI) * (0.08 + Math.abs(x) * 0.05) * side;
    pos.setZ(i, billow);
  }
  pos.needsUpdate = true;
  geometry.computeVertexNormals();
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    color: 0xf4dfac,
    roughness: 0.92,
    metalness: 0,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.96,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  return mesh;
}

function lineBetween(a, b, material) {
  const geometry = new THREE.BufferGeometry().setFromPoints([a, b]);
  return new THREE.Line(geometry, material);
}

function createShip() {
  const group = new THREE.Group();
  const clothTexture = makeClothTexture();
  const hullMaterial = new THREE.MeshStandardMaterial({
    color: 0x3a1d10,
    roughness: 0.58,
    metalness: 0.08,
  });
  const deckMaterial = new THREE.MeshStandardMaterial({
    color: 0x8a542a,
    roughness: 0.74,
  });
  const darkWood = new THREE.MeshStandardMaterial({ color: 0x261208, roughness: 0.72 });
  const rope = new THREE.LineBasicMaterial({ color: 0x28160c, transparent: true, opacity: 0.55 });
  const gold = new THREE.MeshStandardMaterial({ color: 0xd8a642, roughness: 0.35, metalness: 0.2 });

  const hullShape = new THREE.Shape();
  hullShape.moveTo(-1.18, 0.1);
  hullShape.bezierCurveTo(-0.86, -0.32, -0.22, -0.43, 0.42, -0.35);
  hullShape.bezierCurveTo(0.86, -0.29, 1.08, -0.1, 1.2, 0.15);
  hullShape.bezierCurveTo(0.6, 0.28, -0.55, 0.28, -1.18, 0.1);
  const hullGeometry = new THREE.ExtrudeGeometry(hullShape, {
    depth: 0.42,
    bevelEnabled: true,
    bevelSegments: 5,
    bevelSize: 0.045,
    bevelThickness: 0.055,
  });
  hullGeometry.translate(0, 0, -0.21);
  const hull = new THREE.Mesh(hullGeometry, hullMaterial);
  hull.castShadow = true;
  hull.receiveShadow = true;
  group.add(hull);

  const deck = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.1, 0.36), deckMaterial);
  deck.position.set(-0.03, 0.2, 0);
  deck.castShadow = true;
  group.add(deck);

  const stern = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.34, 0.45), deckMaterial);
  stern.position.set(-0.88, 0.36, 0);
  stern.castShadow = true;
  group.add(stern);

  [-0.48, -0.12, 0.24, 0.6].forEach((x) => {
    [-0.226, 0.226].forEach((z) => {
      const porthole = new THREE.Mesh(new THREE.CircleGeometry(0.045, 18), gold);
      porthole.position.set(x, -0.04, z);
      porthole.rotation.y = z < 0 ? Math.PI : 0;
      group.add(porthole);
    });
  });

  const mastXs = [-0.48, 0.1, 0.58];
  mastXs.forEach((x, i) => {
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.033, i === 1 ? 1.75 : 1.36, 12), darkWood);
    mast.position.set(x, 0.88, 0);
    mast.castShadow = true;
    group.add(mast);

    const yardTop = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.018, i === 1 ? 0.98 : 0.72, 12), darkWood);
    yardTop.rotation.z = Math.PI / 2;
    yardTop.position.set(x, i === 1 ? 1.34 : 1.12, 0.01);
    yardTop.castShadow = true;
    group.add(yardTop);

    const yardLow = yardTop.clone();
    yardLow.position.y -= i === 1 ? 0.52 : 0.42;
    group.add(yardLow);
  });

  const sails = [
    { x: -0.48, y: 0.84, w: 0.6, h: 0.92, side: -1 },
    { x: 0.1, y: 1.02, w: 0.82, h: 1.2, side: 1 },
    { x: 0.58, y: 0.86, w: 0.56, h: 0.84, side: 1 },
  ].map((spec) => {
    const sail = makeBillowSail(spec.w, spec.h, spec.side, clothTexture);
    sail.position.set(spec.x, spec.y, -0.035);
    group.add(sail);
    return sail;
  });

  const jibShape = new THREE.Shape();
  jibShape.moveTo(0, -0.42);
  jibShape.lineTo(0.62, -0.1);
  jibShape.lineTo(0, 0.5);
  jibShape.closePath();
  const jib = new THREE.Mesh(
    new THREE.ShapeGeometry(jibShape),
    new THREE.MeshStandardMaterial({
      map: clothTexture,
      color: 0xe4c78c,
      roughness: 0.92,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
    })
  );
  jib.position.set(0.82, 0.85, -0.02);
  jib.castShadow = true;
  group.add(jib);
  sails.push(jib);

  const bow = new THREE.Vector3(1.28, 0.18, 0);
  const sternPoint = new THREE.Vector3(-1.08, 0.22, 0);
  const mastTops = [
    new THREE.Vector3(-0.48, 1.56, 0),
    new THREE.Vector3(0.1, 1.78, 0),
    new THREE.Vector3(0.58, 1.47, 0),
  ];
  mastTops.forEach((top) => {
    group.add(lineBetween(top, bow, rope));
    group.add(lineBetween(top, sternPoint, rope));
  });
  group.add(lineBetween(mastTops[0], mastTops[1], rope));
  group.add(lineBetween(mastTops[1], mastTops[2], rope));

  const flag = new THREE.Mesh(
    new THREE.PlaneGeometry(0.24, 0.12, 1, 1),
    new THREE.MeshStandardMaterial({
      color: 0x21130c,
      side: THREE.DoubleSide,
      roughness: 0.72,
    })
  );
  flag.position.set(0.1, 1.92, 0.02);
  flag.rotation.z = -0.1;
  group.add(flag);

  group.scale.setScalar(0.72);
  group.position.y = 0.25;
  return { group, sails };
}

function createRouteDashes(curve) {
  const group = new THREE.Group();
  const dashes = [];
  const active = new THREE.MeshStandardMaterial({
    color: 0xf4c12f,
    roughness: 0.48,
    metalness: 0.06,
    transparent: true,
    opacity: 0.96,
  });
  const inactive = new THREE.MeshStandardMaterial({
    color: 0x8c6431,
    roughness: 0.8,
    transparent: true,
    opacity: 0.32,
  });
  const shadow = new THREE.MeshBasicMaterial({
    color: 0x2a1a0c,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
  });
  const dashGeometry = new THREE.PlaneGeometry(0.38, 0.08);
  const shadowGeometry = new THREE.PlaneGeometry(0.42, 0.1);
  for (let t = 0.03; t < 0.98; t += 0.04) {
    const point = curve.getPoint(t);
    const tangent = curve.getTangent(t).normalize();
    const angle = Math.atan2(-tangent.z, tangent.x);
    const shadowDash = new THREE.Mesh(shadowGeometry, shadow);
    shadowDash.position.set(point.x + 0.04, 0.073, point.z + 0.04);
    shadowDash.rotation.set(-Math.PI / 2, 0, angle);
    group.add(shadowDash);

    const dash = new THREE.Mesh(dashGeometry, inactive.clone());
    dash.position.set(point.x, 0.082, point.z);
    dash.rotation.set(-Math.PI / 2, 0, angle);
    group.add(dash);
    dashes.push({ mesh: dash, t, active, inactive: dash.material });
  }
  return { group, dashes };
}

export default function ExperienceVoyage3D({ progress }) {
  const mountRef = useRef(null);
  const targetProgress = useRef(0);

  useMotionValueEvent(progress, "change", (v) => {
    targetProgress.current = Math.min(1, Math.max(0, v));
  });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf2dfad, 10, 24);

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 80);
    camera.position.set(0, 7.4, 9.2);
    camera.lookAt(0, 0.1, 0.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.HemisphereLight(0xfff2cc, 0x3c2415, 2.1);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfff0c4, 3.6);
    sun.position.set(-4.2, 8.8, 4.8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 24;
    sun.shadow.camera.left = -8;
    sun.shadow.camera.right = 8;
    sun.shadow.camera.top = 8;
    sun.shadow.camera.bottom = -8;
    scene.add(sun);

    const fill = new THREE.DirectionalLight(0x87b7ff, 1.1);
    fill.position.set(4, 5, -5);
    scene.add(fill);

    const mapTexture = makeMapTexture();
    const mapMaterial = new THREE.MeshStandardMaterial({
      map: mapTexture,
      roughness: 0.86,
      metalness: 0,
    });
    const map = new THREE.Mesh(new THREE.PlaneGeometry(MAP_WIDTH, MAP_DEPTH, 80, 80), mapMaterial);
    map.rotation.x = -Math.PI / 2;
    map.receiveShadow = true;
    scene.add(map);

    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x7b5529,
      roughness: 0.78,
      metalness: 0.02,
    });
    const edge = new THREE.Mesh(new THREE.BoxGeometry(MAP_WIDTH + 0.08, 0.16, MAP_DEPTH + 0.08), edgeMaterial);
    edge.position.y = -0.12;
    edge.receiveShadow = true;
    scene.add(edge);

    const routePoints = ROUTE.map(worldPoint);
    const curve = new THREE.CatmullRomCurve3(routePoints, false, "centripetal", 0.45);
    const { group: routeGroup, dashes } = createRouteDashes(curve);
    scene.add(routeGroup);

    const { group: ship, sails } = createShip();
    scene.add(ship);

    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.68, 40),
      new THREE.MeshBasicMaterial({
        color: 0x241207,
        transparent: true,
        opacity: 0.24,
        depthWrite: false,
      })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.scale.set(1.5, 0.46, 1);
    scene.add(shadow);

    const resize = () => {
      const rect = mount.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let frameId = 0;
    let current = targetProgress.current;
    const clock = new THREE.Clock();
    const render = () => {
      const t = clock.getElapsedTime();
      current += (targetProgress.current - current) * 0.075;
      const point = curve.getPoint(Math.min(0.995, Math.max(0.005, current)));
      const tangent = curve.getTangent(Math.min(0.995, Math.max(0.005, current))).normalize();
      const yaw = Math.atan2(-tangent.z, tangent.x);

      ship.position.set(point.x, 0.29 + Math.sin(t * 1.4) * 0.035, point.z);
      ship.rotation.set(Math.sin(t * 1.2) * 0.018, yaw, Math.sin(t * 1.7) * 0.028);

      shadow.position.set(point.x + 0.28, 0.09, point.z + 0.28);
      shadow.material.opacity = 0.18 + Math.sin(t * 1.4) * 0.025;

      sails.forEach((sail, i) => {
        sail.rotation.y = Math.sin(t * 1.1 + i * 0.7) * 0.035;
      });

      dashes.forEach(({ mesh, t: dashT, active, inactive }) => {
        if (dashT <= current + 0.02) {
          mesh.material = active;
          active.opacity = 0.96;
        } else {
          mesh.material = inactive;
          inactive.opacity = 0.26;
        }
      });

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      ro.disconnect();
      renderer.dispose();
      mapTexture.dispose();
      mapMaterial.dispose();
      routeGroup.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material?.dispose) obj.material.dispose();
      });
      ship.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material?.map) obj.material.map.dispose();
        if (obj.material?.dispose) obj.material.dispose();
      });
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="voyage-canvas-shell absolute inset-0" aria-hidden="true" />;
}
