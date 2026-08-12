# CU Homepage — Bottom Sheet App

Vanilla HTML / CSS / JS prototype for Capella bottom-sheet UI work.
Repo: <https://github.com/camila-go/CU-Homepage-BottomSheetApp>

**Design north star: [capella.edu](https://www.capella.edu/).** The closer this
looks to the live site, the better. The header and footer here were carried over
from the [CU-Homepage-Test-v2](https://github.com/camila-go/CU-Homepage-Test-v2)
prototype (commit `0e61516`), which was itself built to match capella.edu — so
they are already the reference implementation. Match them when adding sections
rather than inventing new patterns.

`<main>` is intentionally empty; that is where the bottom sheet goes.

## Layout

```
index.html          head (fonts) + header + empty <main> + footer
css/tokens.css      design tokens — colors, type, spacing, nav/menu surfaces
css/base.css        reset, .page-container, shared .btn variants
css/nav.css         utility bar, main nav, megamenus, mobile menu stack
css/footer.css      footer columns, legal block, partner carousel
js/nav.js           nav scroll state, megamenus, mobile view stack
js/footer.js        partner carousel
public/assets/      only the images the header and footer need
```

⚠️ **Stylesheet load order is `base → nav → footer`**, matching the order these
rules had in the homepage's single `styles.css`. `base.css` defines the reset and
the shared `.btn` / `.page-container` rules the other two build on.

## What came from the homepage

| Here | Source | Notes |
| --- | --- | --- |
| `index.html` head | `index.html` 45–59 | Typekit + Inter + Font Awesome links |
| `index.html` header | `index.html` 142–380 | Utility bar, nav bar, 4 megamenus, mobile panel |
| `index.html` footer | `index.html` 881–1014 | Brand + social, 4 link columns, legal block, partner carousel |
| `css/tokens.css` | same, verbatim | Full token set |
| `css/base.css`, `nav.css`, `footer.css` | extracted from `css/styles.css` | Split by layer; rules nested in media queries came along, and source order is preserved so the cascade is unchanged |
| `js/nav.js` | from `js/main.js` | `initNavScroll`, `MEGA_PROGRAMS`, `initMegaMenu`, `initMobileMenuTree`, `initMobileNav` |
| `js/footer.js` | from `js/main.js` | `initFooterPartners` |

`tokens.css` was copied whole rather than trimmed — the header already pulls on
most of it, and the rest is what the bottom sheet will be built from.

## Fonts

Two providers, both required:

- **Typekit** (`use.typekit.net/rrn6owv.css`) — Acumin Pro / Acumin Pro Extra
  Condensed, behind `--font-display` and `--font-acumin-pro`.
- **Google Fonts** — Inter, behind `--font-body`. The `ital,wght` list includes
  `1,700`; dropping it silently downgrades bold italic to regular weight.

## Nav behaviour

- **Desktop megamenus** open on **click**, not hover, and only one at a time.
  `Degrees & Programs` is a three-level cascade (degree level → area of study →
  programs); the other three are grouped lists. The third level is generated
  from the `MEGA_PROGRAMS` map in `js/nav.js`, not authored in markup.
- **Mobile** is a stack of full-screen views that slide in from the right, each
  with a `« Back`. The tree is **derived from the desktop megamenu DOM** at
  load, so the two navs cannot drift apart — edit the markup and mobile follows.
- **Scrolled state** (`.main-nav--scrolled`) changes color only, never geometry:
  megamenus are positioned from the bar's bottom edge at the moment they open,
  so any height change here reopens a gap under an open dropdown.
- The mobile panel is reparented to `<body>` on init. It is `position: fixed`,
  and the scrolled header's `backdrop-filter` would otherwise make the header
  its containing block and collapse it to a sliver.

## Footer behaviour

- The partner carousel is **manual arrows only, no autoplay**, paging by a whole
  view. `--per-view` lives in CSS so the breakpoints own the responsive
  behaviour (6 on desktop, 1 on mobile) and the JS only reads it back.
- Arrows are `disabled` rather than hidden at the ends, so the viewport width
  never changes. Off-view items get `aria-hidden` and `tabIndex = -1`.

## Running it

There is no Node on this machine, so `npm run dev` will not work as-is. To
preview, serve a copy with `public/assets` flattened to `/assets` (which is what
Vite does at runtime):

```bash
D=/tmp/cu-bottomsheet-preview && rm -rf $D && mkdir -p $D && cp -R index.html css js $D/ && cp -R public/assets $D/assets && python3 -m http.server 4180 -d $D
```

⚠️ Editing source does **not** update that copy — re-run the command after edits
or you will verify against a stale build.

With Node installed, the normal path works:

```bash
npm install && npm run dev
```
