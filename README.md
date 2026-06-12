# Goutham Reddy Gunnala — Portfolio

A bright, cartoon-pirate themed portfolio for a Generative AI / ML Engineer.
Built with **React 18 + Vite 6 + Tailwind CSS v4 + Framer Motion + Lucide**.

## Quick start

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Add your resume PDF

The hero's **Download Resume** button points at `/Goutham_Reddy_Gunnala_Resume.pdf`.
Drop your resume PDF into the `public/` folder with that exact filename:

```
public/Goutham_Reddy_Gunnala_Resume.pdf
```

## Replace the placeholder links

- LinkedIn / GitHub buttons in `src/components/Contact.jsx` (`href: "#"`)
- GitHub / demo icons on project cards in `src/components/Projects.jsx`

## Signature features

- **Storm mode** — click the sun in the hero and the whole site flips to a
  rainy pirate night: stars, crescent moon, lightning, page-wide drizzle,
  rougher seas. Click the moon to return to day. Implemented as a
  `data-theme="storm"` attribute on `<html>` that overrides the design-token
  CSS variables (`src/index.css`).
- **The Voyage (Chapter 03)** — an interactive sea chart. A 3D pirate ship
  sails a serpentine route between four islands as you scroll; islands light
  up as the ship anchors. Clicking an island opens the captain's log as a
  modal — a different scroll artifact per employer.
- **3D everywhere** — mouse-parallax scenery layers in the hero, perspective
  card tilts with cursor-tracking glare, scroll reveals that unfold from a
  tipped-back angle, and spinning gold doubloons.

## Pirate frames (no plain boxes)

Every container is a "physical" artifact from `src/components/ui/PirateFrames.jsx`:

| Frame | Used for |
| --- | --- |
| `RolledScroll` | Captain's log (About), Fiserv log popup |
| `TornParchment` | About stats scraps, Skills cards, Lowe's popup |
| `SideScroll` | Skills cards, Diffusion project |
| `WantedPoster` | Credit-risk project ("BOUNTY"), Textron popup |
| `Logbook` | M.S. degree, Siemens popup |
| `WaxSealCard` | Certifications (gold ★ / ocean ⚓ seals), Skills cards |
| `MapPiece` | Flagship RAG project (burnt treasure-map fragment) |
| `WoodSign` | Hero signposts, island name plates, contact channels |

Materials are theme-stable: the `parchment-scope` / `wood-scope` classes
re-pin the ink/accent CSS variables inside each artifact, so parchment keeps
dark ink and wood keeps cream lettering in **both** day and storm mode.

## Design system — "Sunny Corsair"

| Token | Hex | Role |
| --- | --- | --- |
| `parchment-50 … 300` | `#fffaf0 → #e9d39e` | Paper canvas & surfaces |
| `ink-900 … 300` | `#2f2014 → #a98f6f` | Warm brown type hierarchy |
| `ocean-300 … 600` | `#8fd9f5 → #0c6e9e` | Sea & sky blues |
| `gold-300 … 600` | `#ffd76e → #a8730d` | Treasure gold (CTAs, certs) |
| `crimson-400 … 600` | `#e85d4a → #b03224` | Pirate red (accents, routes) |
| `palm-400 … 600` | `#4caf6d → #1f7a42` | Island green |
| `tar` / `foam` | `#2f2014` / `#fffaf0` | Fixed-contrast text on colored fills |

Fonts: **Pirata One** (display), **Fredoka** (body), **Caveat** (handwriting).

The page background is a layered vintage sea chart (`.bg-chart`): aged-edge
vignette, plotting grid, tiling water squiggles, plus speckle and grain.
Scene pieces (sun/moon, clouds, waves, the 3D ship) live in
`src/components/Hero.jsx` and `src/components/ui/PirateShip.jsx`; map doodles
in `src/components/ui/MapDecor.jsx`.

All animations respect `prefers-reduced-motion`.
