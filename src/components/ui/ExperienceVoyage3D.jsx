import { useEffect, useRef } from "react";
import { useMotionValueEvent } from "framer-motion";
import * as THREE from "three";

const MAP_WIDTH = 120;
const MAP_DEPTH = 112;
const MAP_ART_WIDTH = 31.5;
const MAP_ART_DEPTH = 29.5;
const ROUTE_WIDTH = 16.2;
const ROUTE_DEPTH = 19.2;
const ROUTE = [
  { x: 0.31, y: 0.24 },
  { x: 0.76, y: 0.3 },
  { x: 0.24, y: 0.5 },
  { x: 0.76, y: 0.7 },
  { x: 0.28, y: 0.88 },
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
    (point.x - 0.5) * ROUTE_WIDTH,
    0.08,
    (point.y - 0.5) * ROUTE_DEPTH
  );
}

function texturePoint(point, width, height) {
  return {
    x: width * (0.5 + (point.x - 0.5) * (ROUTE_WIDTH / MAP_ART_WIDTH)),
    y: height * (0.5 + (point.y - 0.5) * (ROUTE_DEPTH / MAP_ART_DEPTH)),
  };
}

function createMapGeometry() {
  const geometry = new THREE.PlaneGeometry(MAP_WIDTH, MAP_DEPTH, 96, 96);
  const position = geometry.attributes.position;
  const uv = geometry.attributes.uv;

  for (let i = 0; i < position.count; i += 1) {
    uv.setXY(
      i,
      0.5 + position.getX(i) / MAP_ART_WIDTH,
      0.5 + position.getY(i) / MAP_ART_DEPTH
    );
  }

  uv.needsUpdate = true;
  return geometry;
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

  function coast(point, rx, ry, color, label) {
    const { x: cx, y: cy } = texturePoint(point, w, h);
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
    ctx.lineWidth = 5;
    ctx.fill();
    ctx.stroke();
    ctx.globalAlpha = 0.45;
    ctx.strokeStyle = "rgba(78,109,63,0.55)";
    ctx.lineWidth = 1.8;
    for (let i = 0; i < 8; i += 1) {
      ctx.beginPath();
      ctx.ellipse(0, 0, rx * (0.28 + i * 0.08), ry * (0.2 + i * 0.055), -0.25, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.font = `${Math.max(26, Math.round(rx * 0.19))}px Georgia, serif`;
    ctx.fillStyle = "rgba(72,45,25,0.5)";
    ctx.textAlign = "center";
    ctx.rotate(-0.08);
    ctx.fillText(label, 0, ry * 0.12, rx * 1.65);
    ctx.restore();
  }

  coast({ x: 0.2, y: 0.18 }, 150, 116, "#b7c56a", "Energy Coast");
  coast({ x: 0.84, y: 0.23 }, 146, 112, "#d6ba62", "Finance Bank");
  coast({ x: 0.18, y: 0.5 }, 154, 118, "#d1ae67", "Aviation Shoal");
  coast({ x: 0.82, y: 0.72 }, 154, 118, "#bfc46f", "Retail Sound");
  coast({ x: 0.24, y: 0.9 }, 144, 110, "#b9a55e", "Clinical Coast");

  ctx.save();
  ctx.setLineDash([28, 22]);
  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(84,61,33,0.32)";
  ctx.lineWidth = 7;
  ctx.beginPath();
  const firstRoutePoint = texturePoint(ROUTE[0], w, h);
  ctx.moveTo(firstRoutePoint.x, firstRoutePoint.y);
  for (let i = 1; i < ROUTE.length; i += 1) {
    const a = texturePoint(ROUTE[i - 1], w, h);
    const b = texturePoint(ROUTE[i], w, h);
    const ay = a.y;
    const by = b.y;
    const midY = (ay + by) / 2;
    ctx.bezierCurveTo(a.x, midY, b.x, midY, b.x, by);
  }
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.translate(w * 0.66, h * 0.23);
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
  const random = rng(71);
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
  ctx.strokeStyle = "rgba(89,58,26,0.18)";
  ctx.lineWidth = 3;
  for (let x = 42; x < 512; x += 70) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.bezierCurveTo(x - 20, 150, x + 28, 310, x - 12, 512);
    ctx.stroke();
  }
  ctx.globalAlpha = 0.14;
  ctx.fillStyle = "#5f3b18";
  for (let i = 0; i < 190; i += 1) {
    const x = random() * 512;
    const y = random() * 512;
    ctx.fillRect(x, y, 1 + random() * 2.2, 1 + random() * 2.2);
  }
  ctx.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeWoodTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 384;
  const ctx = canvas.getContext("2d");
  const random = rng(99);

  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, "#2c1309");
  grad.addColorStop(0.35, "#6d3a18");
  grad.addColorStop(0.68, "#3b1b0d");
  grad.addColorStop(1, "#8d5427");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalAlpha = 0.38;
  for (let y = 22; y < canvas.height; y += 38) {
    ctx.strokeStyle = random() > 0.5 ? "#b77736" : "#1b0b05";
    ctx.lineWidth = 2 + random() * 2.5;
    ctx.beginPath();
    ctx.moveTo(0, y + random() * 10);
    for (let x = 0; x <= canvas.width; x += 48) {
      ctx.lineTo(x, y + Math.sin(x * 0.018 + random() * 3) * 7);
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = "#f6c16b";
  for (let i = 0; i < 48; i += 1) {
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    ctx.beginPath();
    ctx.ellipse(x, y, 18 + random() * 24, 5 + random() * 8, random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.6, 1);
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
  const woodTexture = makeWoodTexture();
  const hullMaterial = new THREE.MeshStandardMaterial({
    map: woodTexture,
    color: 0x4b2412,
    roughness: 0.74,
    metalness: 0.04,
  });
  const deckMaterial = new THREE.MeshStandardMaterial({
    map: woodTexture,
    color: 0xa56a33,
    roughness: 0.78,
  });
  const darkWood = new THREE.MeshStandardMaterial({ color: 0x211006, roughness: 0.78 });
  const rope = new THREE.LineBasicMaterial({ color: 0x1e1008, transparent: true, opacity: 0.68 });
  const gold = new THREE.MeshStandardMaterial({ color: 0xd8a642, roughness: 0.35, metalness: 0.24 });
  const cabinGlass = new THREE.MeshStandardMaterial({
    color: 0xf2c55b,
    emissive: 0x7a3f0d,
    emissiveIntensity: 0.16,
    roughness: 0.22,
    metalness: 0.05,
    side: THREE.DoubleSide,
  });

  const hullShape = new THREE.Shape();
  hullShape.moveTo(-1.38, 0.16);
  hullShape.bezierCurveTo(-1.06, -0.36, -0.42, -0.56, 0.36, -0.46);
  hullShape.bezierCurveTo(0.92, -0.39, 1.25, -0.13, 1.4, 0.18);
  hullShape.bezierCurveTo(0.72, 0.34, -0.72, 0.36, -1.38, 0.16);
  const hullGeometry = new THREE.ExtrudeGeometry(hullShape, {
    depth: 0.68,
    bevelEnabled: true,
    bevelSegments: 8,
    bevelSize: 0.06,
    bevelThickness: 0.07,
  });
  hullGeometry.translate(0, 0, -0.34);
  const hull = new THREE.Mesh(hullGeometry, hullMaterial);
  hull.castShadow = true;
  hull.receiveShadow = true;
  group.add(hull);

  const deck = new THREE.Mesh(new THREE.BoxGeometry(2.08, 0.1, 0.56), deckMaterial);
  deck.position.set(-0.06, 0.25, 0);
  deck.castShadow = true;
  group.add(deck);

  for (let z = -0.22; z <= 0.22; z += 0.11) {
    const plank = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.012, 0.018), darkWood);
    plank.position.set(-0.07, 0.31, z);
    plank.castShadow = true;
    group.add(plank);
  }

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.34, 0.58), deckMaterial);
  cabin.position.set(-0.98, 0.48, 0);
  cabin.castShadow = true;
  group.add(cabin);

  const cabinRoof = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.08, 0.68), darkWood);
  cabinRoof.position.set(-0.98, 0.68, 0);
  cabinRoof.castShadow = true;
  group.add(cabinRoof);

  [-0.34, 0.34].forEach((z) => {
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.028, 2.18, 16), darkWood);
    rail.rotation.z = Math.PI / 2;
    rail.position.set(-0.05, 0.4, z);
    rail.castShadow = true;
    group.add(rail);

    [-1.05, -0.68, -0.28, 0.14, 0.56, 0.96].forEach((x) => {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.016, 0.26, 10), darkWood);
      post.position.set(x, 0.31, z);
      post.castShadow = true;
      group.add(post);
    });
  });

  [-0.34, 0.34].forEach((z) => {
    [-1.08, -0.9].forEach((x) => {
      const window = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.075), cabinGlass);
      window.position.set(x, 0.52, z < 0 ? z - 0.002 : z + 0.002);
      window.rotation.y = z < 0 ? Math.PI : 0;
      group.add(window);
    });
  });

  [-0.68, -0.34, 0.02, 0.38, 0.74].forEach((x) => {
    [-0.356, 0.356].forEach((z) => {
      const porthole = new THREE.Group();
      const glass = new THREE.Mesh(new THREE.CircleGeometry(0.044, 24), cabinGlass);
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.048, 0.066, 24), gold);
      porthole.add(glass, ring);
      porthole.position.set(x, -0.02, z);
      porthole.rotation.y = z < 0 ? Math.PI : 0;
      group.add(porthole);
    });
  });

  [-0.72, -0.36, 0.02, 0.42, 0.82].forEach((x) => {
    [-0.42, 0.42].forEach((z) => {
      const cannon = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.024, 0.22, 12), darkWood);
      cannon.rotation.x = Math.PI / 2;
      cannon.position.set(x, 0.08, z);
      cannon.castShadow = true;
      group.add(cannon);
    });
  });

  const keel = new THREE.Mesh(new THREE.BoxGeometry(2.25, 0.055, 0.08), darkWood);
  keel.position.set(0.02, -0.22, 0);
  keel.castShadow = true;
  group.add(keel);

  const bowsprit = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.028, 0.82, 14), darkWood);
  bowsprit.rotation.z = Math.PI / 2 + 0.18;
  bowsprit.position.set(1.46, 0.36, 0);
  bowsprit.castShadow = true;
  group.add(bowsprit);

  const mastSpecs = [
    { x: -0.58, height: 1.62, topYard: 1.36, lowYard: 0.91, yard: 0.84 },
    { x: 0.04, height: 2.02, topYard: 1.66, lowYard: 1.08, yard: 1.12 },
    { x: 0.64, height: 1.58, topYard: 1.32, lowYard: 0.9, yard: 0.78 },
  ];

  mastSpecs.forEach((spec) => {
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.046, spec.height, 18), darkWood);
    mast.position.set(spec.x, 0.3 + spec.height / 2, 0);
    mast.castShadow = true;
    group.add(mast);

    const yardTop = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.02, spec.yard, 14), darkWood);
    yardTop.rotation.z = Math.PI / 2;
    yardTop.position.set(spec.x, spec.topYard, 0.018);
    yardTop.castShadow = true;
    group.add(yardTop);

    const yardLow = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.023, spec.yard * 1.08, 14), darkWood);
    yardLow.rotation.z = Math.PI / 2;
    yardLow.position.set(spec.x, spec.lowYard, 0.018);
    yardLow.castShadow = true;
    group.add(yardLow);
  });

  const sails = [
    { x: -0.58, y: 0.92, w: 0.64, h: 0.84, side: -1 },
    { x: -0.58, y: 1.36, w: 0.48, h: 0.48, side: -1 },
    { x: 0.04, y: 1.08, w: 0.86, h: 1.08, side: 1 },
    { x: 0.04, y: 1.6, w: 0.68, h: 0.58, side: 1 },
    { x: 0.64, y: 0.94, w: 0.56, h: 0.78, side: 1 },
    { x: 0.64, y: 1.32, w: 0.42, h: 0.42, side: 1 },
  ].map((spec) => {
    const sail = makeBillowSail(spec.w, spec.h, spec.side, clothTexture);
    sail.position.set(spec.x, spec.y, -0.035);
    group.add(sail);
    return sail;
  });

  const jibShape = new THREE.Shape();
  jibShape.moveTo(0, -0.42);
  jibShape.lineTo(0.72, -0.12);
  jibShape.lineTo(0, 0.58);
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
  jib.position.set(0.98, 0.83, -0.02);
  jib.castShadow = true;
  group.add(jib);
  sails.push(jib);

  const bow = new THREE.Vector3(1.78, 0.4, 0);
  const sternPoint = new THREE.Vector3(-1.28, 0.42, 0);
  const mastTops = mastSpecs.map((spec) => new THREE.Vector3(spec.x, 0.3 + spec.height, 0));
  const deckCorners = [
    new THREE.Vector3(-1.15, 0.38, -0.34),
    new THREE.Vector3(-1.15, 0.38, 0.34),
    new THREE.Vector3(1.03, 0.38, -0.34),
    new THREE.Vector3(1.03, 0.38, 0.34),
  ];
  mastTops.forEach((top) => {
    group.add(lineBetween(top, bow, rope));
    group.add(lineBetween(top, sternPoint, rope));
    deckCorners.forEach((corner) => {
      if (Math.abs(corner.x - top.x) < 0.9) {
        group.add(lineBetween(top, corner, rope));
      }
    });
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

  group.scale.setScalar(0.68);
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
    scene.fog = new THREE.Fog(0xf2dfad, 12, 30);

    const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 180);
    camera.position.set(0, 7.1, 8.6);
    camera.lookAt(0, 0.05, 0.15);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    mount.appendChild(renderer.domElement);

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = reduceQuery.matches;
    const updateReducedMotion = (event) => {
      reducedMotion = event.matches;
    };
    reduceQuery.addEventListener?.("change", updateReducedMotion);

    const ambient = new THREE.HemisphereLight(0xfff2cc, 0x3c2415, 1.85);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfff0c4, 3.6);
    sun.position.set(-4.2, 8.8, 4.8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 24;
    sun.shadow.camera.left = -12;
    sun.shadow.camera.right = 12;
    sun.shadow.camera.top = 10;
    sun.shadow.camera.bottom = -10;
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
    const map = new THREE.Mesh(createMapGeometry(), mapMaterial);
    map.rotation.x = -Math.PI / 2;
    map.receiveShadow = true;
    scene.add(map);

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

    const frameCamera = (width) => {
      if (width < 640) {
        camera.fov = 54;
        camera.position.set(0, 13.1, 20.2);
      } else if (width < 1024) {
        camera.fov = 42;
        camera.position.set(0, 10.6, 14.8);
      } else {
        camera.fov = 38;
        camera.position.set(0, 9.5, 13.0);
      }
      camera.lookAt(0, 0.05, 0.35);
    };

    const resize = () => {
      const rect = mount.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      camera.aspect = width / height;
      frameCamera(width);
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
      const bob = reducedMotion ? 0 : Math.sin(t * 1.4) * 0.035;
      const roll = reducedMotion ? 0 : Math.sin(t * 1.7) * 0.028;
      const pitch = reducedMotion ? 0 : Math.sin(t * 1.2) * 0.018;

      ship.position.set(point.x, 0.29 + bob, point.z);
      ship.rotation.set(pitch, yaw, roll);

      shadow.position.set(point.x + 0.28, 0.09, point.z + 0.28);
      shadow.material.opacity = reducedMotion ? 0.18 : 0.18 + Math.sin(t * 1.4) * 0.025;

      if (!reducedMotion) {
        sails.forEach((sail, i) => {
          sail.rotation.y = Math.sin(t * 1.1 + i * 0.7) * 0.035;
        });
      }

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
      reduceQuery.removeEventListener?.("change", updateReducedMotion);
      ro.disconnect();
      renderer.dispose();
      mapTexture.dispose();
      map.geometry.dispose();
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
