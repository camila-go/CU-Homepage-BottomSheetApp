# capella.edu — design reference

Measured from the live site on 2026-08-12 at 1440×900 and 375×812. Everything
here is read off the rendered page (computed styles), not guessed.

**⚠️ The live site and the CU-Homepage-Test-v2 prototype are different designs.**
The prototype is a dark-theme redesign concept; the live site is light. The header
and footer currently in this repo came from the prototype, so the header does
**not** match capella.edu. See the diff table at the bottom.

## Palette

| Token | Value | Where |
| --- | --- | --- |
| White | `#ffffff` | page background, nav bar |
| Ink | `#212322` | body text, utility bar, stats band |
| Capella red | `#c10016` | CTAs, "Make your move" band, mobile action bar |
| Red border | `#b62025` | 1px border on the red Apply button |
| Card grey | `#f0f0ef` | FlexPath / GuidedPath cards |
| Card blue | `#a9c5c9` | Popular-program cards |

The first three already exist in `tokens.css` as `--color-white`,
`--color-uni-black`, `--color-uni-red`. The two card colors do not — the
prototype's near-equivalents are `--color-boulder-50` (`#f3f4f4`) and
`--color-stat-blue` (`#94b7bb`), which are close but not the live values.

## Type

- **Display:** `acuminVF` (self-hosted on capella.edu), `text-transform: uppercase`,
  line-height ≈ 0.9. H1 72px desktop / 40px mobile; H2 48px.

  The real spec is the **variation settings**, not the weight:

  ```css
  font-variation-settings: 'slnt' 0, 'wdth' 50, 'wght' 800;
  ```

  ⚠️ `wdth 50` is what makes the headlines condensed, and it is easy to miss
  because the computed `font-weight` reads 500. Measured on the live site,
  "WHAT CAN'T YOU DO" at 40px is **232px** wide. Same string with the width axis
  left at its 100 default is **420px** — 80% too wide to fit its column.

  This project uses `acumin-variable` from the same Typekit kit as the static
  faces, which reproduces the live metrics exactly (measured: 232px). The
  prototype's `acumin-pro-extra-condensed` at weight 800 measures 419px — close
  to the *un-axised* variable font, not to the live site.
- **Body:** Inter. 20px/30px hero copy, 16px buttons, 15px/22.5px nav and footer.
- Ink for all body copy is `#212322`, not pure black.

## Header (140px desktop, 113px mobile, `position: fixed`)

| | Desktop | Mobile |
| --- | --- | --- |
| Utility bar | 61px, bg `#212322` | 72px, bg `#212322` |
| Nav bar | 79px, bg **`#ffffff`** | 41px, bg `#ffffff` |

- Content container is **1140px wide, centred** (150px margins at 1440); the logo
  sits at x=165 (15px of inner padding).
- Utility bar content is **right-aligned**: an outlined "Request information"
  button (2px solid white, transparent fill, Inter-Bold 13px, padding 8.5px 15px,
  radius 7.5px, 163×41), then the phone number, then "Log in" — both white
  Inter 13px.
- Nav links: Inter 15px, color `#212322`, padding `22.5px 30px`, full 79px tall,
  with a **`border-bottom: 4px solid transparent`** that is the hover/active
  indicator. No pills.
- "Apply now": `<button>` with red `#c10016` fill, white text, **6px radius**,
  120×32.
- Logo is the horizontal lockup, 153×32.
- Mobile collapses to logo + hamburger.

### Button radii (measured, not assumed)

| Control | Radius |
| --- | --- |
| Filled primary (Apply now) | **6px** |
| Outlined (Request information) and hero chips | **7.5px** |

⚠️ Do not read these off a hidden duplicate element — capella.edu ships both a
desktop and a mobile copy of several controls, and the hidden one reports
`border-radius: 0` and a different font size. Sample the element that actually
has a non-zero bounding box, or hit-test with `elementFromPoint`.

## Sections, top to bottom

1. **Hero** (562px desktop) — tan/beige studio photo of five people.
   ⚠️ **Two different assets, and the desktop one is a `background-image`:**
   - Desktop: `.../final-hero-images/SEI_NA_GROUP1_00715_FINAL-CU-1440x640-3x.jpg`
     as a full-bleed `background-size: cover; background-position: 0 0`. The tan
     backdrop therefore spans the **whole width** and the copy sits on top of it.
     It is *not* a white panel with a photo attached to the right edge.
   - Mobile: a separate 640×432 `<img>` stacked above the copy.

   H1 "WHAT CAN'T YOU DO", 20px body paragraph, a "Find your program" label with
   a clipboard icon, then four **red chips** (radius 7.5px, min-height 48px):
   Bachelor's, Master's, Doctoral, Certificate. Copy column is 645px at x=150.
2. **"'One size fits all' never fit you. Learn your way."** — dark `#212322`
   band, H2 centered in white, then two `#f0f0ef` cards side by side:
   *FlexPath / Learn on demand* and *GuidedPath / Structured for your success*,
   each ending in a red link ("Is FlexPath right for you?").
3. **Stats + popular programs** — same dark band. Left: H2 "YOU'VE GOT PLANS.
   WE'VE GOT PROGRAMS." over four stats — 40 Degree programs, 80 Specializations,
   1,530+ Courses available, 63% Part-time students — with a "Source: Capella
   University Fact Sheet, as of December 31, 2024" footnote. Right: "Popular
   programs" over four `#a9c5c9` cards (BS RN-to-BSN, MS in Applied Behavior
   Analysis, MBA, MSW), each with an icon and a right arrow, then a red
   "See all Capella programs" button.
4. **"MAKE YOUR MOVE"** (366px) — full-bleed red `#c10016` band, centered H2,
   six white tiles in a 2-column grid: Finish my degree, Get help with financial
   aid, Learn more about admissions, Find out more about scholarships, Apply,
   Explore FlexPath.
5. **Accreditation** — white band. Four accreditor logos (ACBSP, CACREP, CCNE,
   CSWE), the Higher Learning Commission line, a red "See all of Capella's
   accreditations" link, and two small-print paragraphs.
5. **Accreditation** — white band. Four accreditor logos rendered at **215px wide**
   each, the Higher Learning Commission line, a red "See all of Capella's
   accreditations" link, and two italic small-print paragraphs.
   ⚠️ Use full-colour artwork here. The prototype's `accr-*.svg` are white
   knockout versions for a dark band and are invisible on white.
6. **Footer** (683px) — dark. Logo + social icons + copyright on the left, then
   four link columns with **uppercase** headings at 13px/`#cdcdcd`: AREAS OF
   STUDY, ABOUT US, INFORMATION FOR, LEGAL. Below: the Strategic Education
   ownership line and the partner carousel with prev/next arrows.

## Interaction states

Read out of the live theme stylesheet
(`/etc.clientlibs/visitorcenter/clientlibs/visitorcenter-themes/vcrefresh.min.css`),
not eyeballed. **The site's root font-size is 15px**, so its rem values convert as
`0.1333rem=2px, 0.2rem=3px, 0.2667rem=4px, 0.3333rem=5px, 1.3333rem=20px`.

⚠️ **capella.edu uses four different reds and they are not interchangeable:**

| Red | Used for |
| --- | --- |
| `#c10016` | rest fill on filled buttons |
| `#b62025` | the nav hover/active underline; darker link text |
| `#74000d` | hover/active fill on filled buttons |
| `#8a0010` | hover on the megamenu "Find your program" CTA **only** |

| Control | Live class | Rest | Hover | Active / Focus |
| --- | --- | --- | --- | --- |
| Nav link | `.nav-link .brand-underline` | 4px transparent bottom border | **3px `#b62025`** bottom border, no bg change | same underline |
| Request information | `white-outline-btn` | transparent, 2px white border | **`rgba(255,255,255,.1)`**, text stays white | active `rgba(255,255,255,.2)`; focus 2px white outline |
| Apply now | `primary-fill-btn` | `#c10016`, shadow `0 5px 20px rgba(0,0,0,.1)` | **`#74000d`**, shadow `…,.2` | active shadow `…,.25`; focus 4px `#e68c96` |
| Hero chips | `primary-fill-btn` | `#c10016`, radius 7.5px | `#74000d` | as above |
| Popular-programme card | `secondary-fill-btn` | `#a9c5c9`, `#212322` text | **`#5f777a`, white text, icon inverted white** | focus 4px `#94b7bb` |
| Make-your-move tile | `white-fill-btn` **+ page-level override** | white, **`#212322` text**, dark icon, **4px radius**, padding 10px 20px, no border | **`#212322` fill, white text, icon `invert(1)`** | no `:active` defined |
| FlexPath/GuidedPath link | `.image-text-cta__link` | grey card, red text | **red fill `#c10016`, white text** — not an underline | — |
| Megamenu level row | `.nav-link-heading.level-1` | dark, white text | **full light treatment**: `#f5f5f5`, `#212322` text, red left edge, bold, red chevron | same as hover |
| Megamenu areas row | `.dropdown-menu.level1-dd .nav-link` | `#f5f5f5`, dark text | **white fill, `#111` text** | — |
| Find your program CTA | `.explore-btn` | `#c10016` | **`#8a0010`**, no shadow | — |
| Footer link | `footer .nav-link` | 14px/27px, `#cdcdcd`, opacity .91 | **underline only — colour does NOT change** | active `#c8c0b6` |

The site recolours its black icon SVGs with filters rather than shipping
variants; both are copied verbatim into `tokens.css` as `--filter-icon-white`
and `--filter-icon-red`.

### ⚠️ The linked stylesheets are not the whole story

capella.edu ships a **page-level inline `<style>` block** (the 3rd `<style>` in
`<head>`, ~1.5 KB) that overrides the theme with `!important`. Reading only the
linked CSS gives the wrong answer for anything it touches. What it changes:

```css
.quick-links .white-fill-btn        { border:0 !important; color:#212322 !important }
.quick-links .white-fill-btn:hover  { background-color:#212322; color:#fff !important }
.quick-links .white-fill-btn .iconImage       { filter:none !important; transition:all .2s ease-in-out }
.quick-links .white-fill-btn:hover .iconImage { filter:invert(1) !important }
.facts-number, .facts-text          { color:#fff !important }
.quick-links__title span            { color:#fff !important }
.bg-parsys__color-wrapper .custom-limited-vc-rte a { color:#fff; font-weight:400 }
@media (max-width:991px) { .hero-basic .hb__bg-img-inline > div { background:#fff !important } }
```

Because of this the Make-your-move tiles are **dark-on-white with a near-black
hover**, not the red-on-white / red-hover that the theme's generic
`.white-fill-btn` describes. I got this wrong by trusting the theme class alone.

**Always confirm against `getComputedStyle` on the live element** before
encoding a state. The theme class tells you which component it is; only the
computed value tells you what it actually looks like on this page.

### Verifying hover states in this environment

Real hover cannot be simulated here — the Browser pane dispatches no
`mousemove`, so `:hover` never engages. Two things that do work:

1. Clone every `:hover` rule onto a `.force-hover` class
   (`selectorText.replace(/:hover/g,'.force-hover')` + `insertRule`), then add
   the class and read computed styles.
2. **Inject `* { transition: none !important }` first.** While the pane is
   hidden, `document.visibilityState === 'hidden'` freezes transitions at their
   START value, so every transitioned property reports its rest colour and looks
   like a failing test. This wasted a real debugging cycle.

Also: in current Chrome `CSSStyleRule` exposes an empty `cssRules` list (CSS
nesting), so a stylesheet walker written as `if (r.cssRules) { recurse; continue }`
silently skips **every** style rule. Test for `CSSMediaRule`/`CSSSupportsRule`
explicitly instead.

## Megamenu (Degrees & Programs)

Same "a row highlights in the colour of the column it opens" logic as the
prototype, but the ramp runs **light**, not dark:

| Part | Value |
| --- | --- |
| Panel | `#212322`, `border-top: 4px solid #c10016` |
| Levels rail | `#212322`, white text |
| Areas column | **`#f5f5f5`, `#212322` text** |
| Active level row | `#f5f5f5` + red left edge, `#212322` text |
| "Find your program" CTA | `#c10016`, white, Inter-Bold 16px |
| Open trigger | red 4px bottom border |

Panel opens flush under the bar (0px gap) at the content column's left edge (150).

⚠️ Only this menu could be sampled — the three grouped-list menus are
Angular-rendered and never painted on a synthetic click.

## Mobile-only: fixed bottom action bar

A red `#c10016` bar pinned to the bottom of the viewport, split in two by a
vertical rule: **"Apply now"** | **"Request info"**. This is the element the
bottom-sheet work most likely attaches to — worth confirming before building.

The prototype's `<meta name="theme-color" content="#c10016">` (already in
`index.html`) exists to tint iOS Safari's toolbar to match this bar.

## Prototype vs live, at a glance

| | Live capella.edu | v2 prototype (in this repo now) |
| --- | --- | --- |
| Nav bar | white, square | near-black, pill-shaped, 24px radius |
| Buttons | square corners | pills (`--radius-pill: 32px`) |
| Apply now | red fill | white fill |
| Hero | tan photo, dark text | red wall, white text |
| Display face | `acuminVF` w500 | `acumin-pro-extra-condensed` w800 |
| Footer | dark | dark ✅ already close |

The footer is the one piece that already matches.
