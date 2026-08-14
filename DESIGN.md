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
   band, H2 centered in white, then two cards side by side: *FlexPath / Learn on
   demand* and *GuidedPath / Structured for your success*.
   Card: `#f0f0ef` body, **`border-radius: 10px`**, 30px padding.
   ⚠️ The terminal link row is **WHITE**, not a transparent strip showing the
   grey through — `border-top: 1px solid #d9d9d6`,
   `border-radius: 0 0 10px 10px`, padding `15px 30px`, text `#c10016`. That
   white band against the grey body is a big part of the card's look.
3. **Stats + popular programs** — same dark band. Left: H2 "YOU'VE GOT PLANS.
   WE'VE GOT PROGRAMS." over four stats — 40 Degree programs, 80 Specializations,
   1,530+ Courses available, 63% Part-time students — with a "Source: Capella
   University Fact Sheet, as of December 31, 2024" footnote (that link is
   **white, weight 400, no underline**). Right: "Popular programs" over four
   `#a9c5c9` cards (BS RN-to-BSN, MS in Applied Behavior Analysis, MBA, MSW),
   each with an icon and a right arrow, then a red "See all Capella programs"
   button.

   ⚠️ **The stat figures are Inter Bold 60px / 72px — NOT the condensed display
   face.** Labels are Inter Bold 22px / 26.4px. I had the figures on `.display`
   (Acumin at `wdth 50`), which rendered them far too narrow. Cards are square
   (radius 0) with `padding: 18.5px 30px` **plus a 4px transparent border**,
   which is what makes them 90px tall rather than 82.
4. **"MAKE YOUR MOVE"** (366px) — full-bleed red `#c10016` band, centered H2,
   six white tiles in a 2-column grid: Finish my degree, Get help with financial
   aid, Learn more about admissions, Find out more about scholarships, Apply,
   Explore FlexPath.
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
| Nav link | `.nav-link .brand-underline` | 4px transparent bottom border | **3px `#b62025`** bottom border, **background stays transparent** | same underline; still no fill |
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

### The sweep

`scratchpad/probe.js` is the harness: it names each component, gives its selector
per side, and dumps the same computed-property set on both pages so the two can be
diffed offline. Run it on capella.edu and on the local build at the same viewport
width. It found eight mismatches that four rounds of spot-checking had missed
(stat figures on the wrong typeface, stat labels 6px small, programme-card padding,
missing nav-bar shadow, card-link size/tracking, chip border, and two margins).

**Prefer this over reading stylesheets.** Every mismatch in this project came from
trusting a CSS rule or a Figma-era assumption instead of the rendered value.

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

Panel opens flush under the bar (0px gap) at the content column's left edge (150),
paints its own `#212322`, and carries `box-shadow: 0 7.5px 15px rgba(0,0,0,.176)`.

⚠️ **No panel has a red top border.** Both panels compute `border-top: 0px`
despite carrying `border-top border-brand-red` classes. The red bar above an open
panel is the **trigger's own 3px `#b62025` underline**, sitting flush on the
panel's top edge — so it spans the trigger's width, not the panel's.

## Grouped-list menus (Experience / Financing / Admissions)

⚠️ **These panels are LIGHT, not dark.** Easy to get wrong: they are
Angular-driven and never render on a synthetic click, so they can't be sampled
the usual way. Force `display: block` on the live panel to inspect them.

| Part | Value |
| --- | --- |
| Panel | `#f5f5f5` (`gray-bg`), 300px wide, no border-top, same shadow |
| Rows | `#111` at 16px |
| Group headings | `#212322`, bold |
| Row hover | white fill, `#111` text (`.level1-dd .nav-link:hover`) |

**Anchoring: left-aligned to the trigger, not centred.** Measured at 1440 —
Capella Experience 539/539, Financing 736/736, Admissions 865/865. The prototype
centred them, which was a visible mismatch.

**The trigger is NEVER filled**, in any state. capella.edu's theme enforces
`.headervc .navbar .navbar-nav .nav-item > .nav-link:hover { background: 0 0 !important }`
for hover, focus and active — the only affordance is the red underline.

⚠️ The prototype's `nav.css` paints the open/current trigger with a grey pill
(`--nav-pill-current`, `#5e6361`) via selectors at specificity **(0,3,0)**:

```css
.main-nav__item > a[aria-expanded='true']:hover { background: var(--nav-pill-current) }
.main-nav__item > a[aria-current='page']:hover  { background: var(--nav-pill-current) }
```

A `.main-nav__item > a:hover` override is only (0,2,0) and loses, so a trigger
that was **both open and hovered** showed a grey block on the white bar. Every
state in `nav-live.css` is spelled out at matching specificity for this reason —
don't collapse them back into one short selector.

**Opening behaviour:** the live triggers carry `data-toggle="dropdown"` (Bootstrap
**click**), and the `<li>`s do *not* carry `dropdown-hover`, so hovering does not
open a menu. Our click-to-open matches. (`.dropdown-hover:hover > .dropdown-menu`
does exist in the theme but is used by exactly one unrelated element.)

⚠️ Only this menu could be sampled — the three grouped-list menus are
Angular-rendered and never painted on a synthetic click.

## Hero interaction (the program finder)

Clicking a degree chip is not a link — it opens a two-step finder in place. The
hero grows 562 → 677 at desktop.

1. **Click a chip** → that chip goes to **`#3a0007`** (a third, darker red used
   only for this selected state) and a "Select area of study" label + `<select>`
   appear.
2. **Choose an area** → a second "Select specialization" `<select>` appears,
   populated with that degree + area's programmes.
3. **Choose a specialization** → an **"Explore my program" CTA appears.**

⚠️ **There IS a submit CTA.** I originally checked for one after step 2, found
none, and wrote "there is no submit button" into this file as fact — it only
appears once a specialization is picked. Changing the degree or the area hides it
again, since the choice it would act on no longer exists.

| CTA | Value |
| --- | --- |
| Button | `#c10016` fill, white, `radius 7.5px`, `padding 6.5px 15px`, `border: 4px solid transparent`, Inter-Bold 18px, shadow `0 5px 20px rgba(0,0,0,.1)`, 48px tall |
| Icon | `double-arrow.svg` (23px) in a **45×27 slot**, `gap: 4px`, inverted white |
| Desktop | content-width (**264px**), inline as the row's third item, 30px gap, bottom-aligned with the selects |
| Mobile | full width (345), stacked 22.5px below the last select |

⚠️ At desktop the finder row is **wider than the copy column and overflows it on
purpose** — live's form wrapper is 750px against a 645px column, with the CTA
ending at x=912 while the column ends at 795. Constrained to the column, the CTA
is squeezed to ~100px and its label wraps to three lines.

| Part | Value |
| --- | --- |
| Label | 18px `#212322`, line-height 1.5 |
| Select | 212 × 50 (345 at mobile), `1px solid #212322`, **radius 10px**, Inter-Bold 16px, transparent fill, `padding: 14px 34px 14px 24px` |
| Chevron | **custom 12×8 SVG**, `right: 24px`, vertically centred, `#212322` |

⚠️ The select sets `appearance: none` and overlays its own chevron —
`<path d="M6 7.4L0 1.4L1.4 0L6 4.6L10.6 0L12 1.4L6 7.4Z">`. Leaving the browser's
native arrow is the most obvious tell that it isn't the real control: the default
is thinner and sits closer to the edge. The 34px right padding is the chevron's
room.

⚠️ At mobile the chips become an **equal-width 2×2 grid** — `column-gap: 18px`,
`row-gap: 12px` (desktop uses a uniform 12px in a single row). The grid sizes the
`<li>`, so `.chip-red` needs `width: 100%` too; being `inline-flex` it otherwise
stays content-width and the chips come out ragged (131/115/113/132) with a 50px
visual gap.
| Layout | `display: flex; gap: 30px; align-items: flex-end` — the two selects sit **side by side** (x=165 and x=407), each with its label above it |
| Label → select offset | 40.5px (22px label box + 18.5px gap) |

⚠️ The label's line-height is ~1.22 (22px at 18px), **not** 1.5 — at 1.5 the box
is 27px and the label sits 5px low against its select.

### Hero vertical rhythm (desktop)

Every gap is a half-pixel value; rounding them all up drifts the whole column.

| From → to | Gap |
| --- | --- |
| Band top → h1 top | **82.5px** (60px wrapper + a nested 22.5px) |
| h1 → body | 22.5px |
| body → "Find your program" | 30px |
| "Find your program" → chips | 15px |
| chips → finder label | 32.5px |
| label → select | 18.5px |
| last select → band bottom | **120px** (22.5 + 15 + 22.5 + 60) |

Closed band 562px; open 677px. The 120px below the selects only exists when the
finder is open, so it is applied via a class the JS toggles — adding it
unconditionally pushes the closed band past 562.

At ≤991 all of those wrapper paddings drop to **37.5px** (15 + 22.5), the selects
go full-width (345 at 375), and the space below the last select is 75px.

⚠️ **`.hero__inner` must drop its 15px inner padding at ≤991.** The container is
already `min(1140px, 100% - 30px)`, so at 375 it is 345 wide at x=15; the extra
padding double-indented every piece of hero copy to x=30 while live keeps it on
the 15px gutter. At desktop the padding IS needed (150 + 15 = 165).

The area/programme catalogue is **identical to the desktop megamenu's third
level**, so `js/programs.js` is shared by the nav and the hero rather than
duplicated — verified Bachelor's → Business, Health Sciences, Information
Technology, Nursing, Psychology, Social Work, and Bachelor's + Nursing →
BSN (Prelicensure), RN-to-BSN.

## Breakpoints

⚠️ **Bootstrap 4 breakpoints — 991 / 767 / 575, not round numbers.** Measured
across 1440 / 992 / 768 / 576 / 375. Using 1024/768 collapses the two-column
bands a full breakpoint early: at 768 the live site still shows format cards,
stats and move tiles two-up.

| | 1440 | 992 | 768 | 576 | 375 |
| --- | --- | --- | --- | --- | --- |
| Utility bar | 61 | 61 | 61 | **72** | 72 |
| Nav bar | 79 | 79 | **41** | 41 | 41 |
| Hamburger | — | — | **yes** | yes | yes |
| Hero artwork | bg image | bg image | **stacked `<img>`** | `<img>` | `<img>` |
| H1 | 72px | 72px | **40px** | 40px | 40px |
| Stat value | 60px | 60px | **24px** | 24px | 24px |
| Stat label | 22px | 22px | **16px** | 16px | 16px |
| Format cards | 2 col | 2 col | 2 col | 2 col | **1 col** |
| Stats / programmes | 2 col | 2 col | 2 col | **1 col** | 1 col |
| Move tiles | 2 col | 2 col | 2 col | **1 col** | 1 col |
| Action bar | — | — | — | — | **50px** |

So:

- **≤991** — nav collapses (41px bar, hamburger 45×40), hero swaps to the stacked
  `<img>` and drops the background artwork, H1 40px, stat value 24px, stat
  label 16px.
- **≤767** — utility bar grows to 72px, stats/programmes stack, move tiles 1 col,
  hero selects stack.
- **≤575** — format cards 1 col, hero chips 2-up, fixed action bar appears (50px,
  not 56px) and `<body>` reserves 50px.

⚠️ `nav.css` collapses the nav at its own ≤1024, so `nav-live.css` carries a
`@media (min-width: 992px) and (max-width: 1024px)` window that puts the desktop
nav back for that band. The hamburger must also be **45 × 40**, not the
prototype's 44 × 44, or it sets the bar's height to 44 instead of 41.

## Mobile nav

⚠️ **The mobile menu is WHITE on capella.edu**, not the dark surface the prototype
ships. That single fact is most of why it read as a different component. The
view-stack *structure* was already right — slide-in panels over the parent,
"« Back" to pop, a parent heading from level 3 down — only the skin was wrong.

| Part | Value |
| --- | --- |
| Panel | `#fff`, **`border-top: 5px solid #c10016`** |
| Root rows | Inter **Bold** 16px `#212322`, **71px** tall (20px block padding) |
| Deeper rows | Inter **Regular** 16px, **55px** tall (15px block padding) |
| Row rule | `1px solid #d9d9d6` |
| Gutter | **15px, on the VIEW** — the row element is inset so its rule stops short of the panel edges |
| Chevron | **`#c10016`**, right-aligned |
| « Back | `#c10016`, **12px**, regular weight |
| Heading | `#212322` regular 16px with a `1px #d9d9d6` rule beneath; shown from level 3 (level 2 has none) |
| Close X | 45 × 40, 3.75px radius, **no fill in any state** |
| Footer | red Apply now \| Request info |

⚠️ That 5px red top border is real **only at mobile** — the desktop megamenus
carry the same `border-top border-brand-red` classes but compute to `0`.

⚠️ Two prototype rules must be explicitly cleared or the reskin looks broken:
`.mobile-menu__row--strong` has a `#262626` fill (`--menu-row-mobile`), which on
a white panel leaves dark blocks with dark text on them; and the open hamburger
gets a grey circle behind the X.

## Mobile-only: fixed bottom action bar

A red `#c10016` bar pinned to the bottom of the viewport, **50px tall**, split in
two by a vertical rule: **"Apply now"** | **"Request info"**. Appears at ≤575.
This is the element the bottom-sheet work most likely attaches to — worth
confirming before building.

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

## Application sheet

Ported from **apply.capella.edu** (an Adobe AEM adaptive form), captured
2026-08-13. "Apply now" on the live site navigates there; here it opens the
application in a sheet instead.

### ⚠️ Prototype only — not for deployment

Steps 3–5 and 9 reproduce the real application's **date of birth**, **last four
SSN digits** and **password** fields. There is no form action, no endpoint and no
storage: nothing is submitted or persisted, and the inputs carry
`autocomplete="off"`. Do not deploy this publicly and do not type real personal
data into it. If a backend is ever added, revisit these steps first.

### The ten steps

The live wizard marks each step with `.tab-panel` inside `.guidePanelNode`;
enumerating those is what gives the definitive list.

| # | Live panel | Heading | Fields | Docked action |
| --- | --- | --- | --- | --- |
| 1 | `namePanel` | Capella University is here to help with your educational journey. | First Name, Last Name | Continue |
| 2 | `welcomePanel` † | It's nice to meet you, {firstName}. Let's get started. | — | Continue |
| 3 | `dobPanel` | What's your date of birth? | MM/DD/YYYY | Continue |
| 4 | `confirmDOBPanel` † | Verify your birthdate | Birth Date (readonly) | Looks good! |
| 5 | `SSNPanel` † | Please enter last four digits of your Social Security Number | SSN last 4, "I don't have Social Security Number" | Continue |
| 6 | `ssnLoginPanel` † | We meet again! | — | Go to Log In *(terminal)* |
| 7 | `emailPanel` | What's your email address? | Email + consent copy | Agree and Go |
| 8 | *(email confirm)* | Is this your current email, {firstName}? | Email (readonly) | Looks good! |
| 9 | `passwordPanel` | Set up your Capella password. | Password + 6 rules | Continue |
| 10 | `accountSetupMessagePanel` | Your Capella account is all set up! | — | Ok, Got it! |

† **Conditional on the live site.** `cl-dob-flow-check`, `cl-dob-match`,
`cl-ssn-number-match` and `cl-ssn-match-login` gate steps 2, 4, 5 and 6 on a
record match upstream.

Password rules (step 9), verbatim: 8-15 characters · One uppercase letter · One
lowercase letter · One number · One special character (such as $, #, &, !) ·
Cannot contain your name or email address.

⚠️ **Step 6 is the exception, not the route.** "We meet again!" only appears when
the entered SSN matches an existing Capella account, and it *terminates* the flow
(it links to log in). Routing through it by default dead-ends the common path
before email and password, so the default path is **5 → 7**.

### Reviewing every step

The conditional steps aren't reachable by clicking through. Rather than adding
fake controls:

- `?step=N` opens the sheet at step N on load — e.g. `/?step=6`
- `__sheetGoTo(n)` jumps while the sheet is open

### Sheet anatomy

| | Mobile | Desktop (≥768) |
| --- | --- | --- |
| Position | rises from the bottom, `top: 24px` so the previous context peeks behind | full-height panel pinned right, 520px wide |
| Transform | `translateY(100%)` → 0 | `translateX(100%)` → 0 |
| Header | dismiss **X at the left**, title **centred** | title **left**, X **right** |
| Corners | 12px top | square |
| Drag handle | shown at the bottom | hidden (touch affordance only) |

Shared: a `rgba(33,35,34,.5)` scrim, scrollable body with
`overscroll-behavior: contain`, a docked action row (Back ghost + primary), body
scroll lock while open, Escape to close, a Tab focus trap, and focus returned to
the trigger on close.

⚠️ `.sheet__action` is `display: inline-flex`, which beats the UA's
`[hidden] { display: none }` — Back stayed visible on step 1 until an explicit
`.sheet__action[hidden] { display: none }` was added. Same trap as
`.hero__field[hidden]`.
