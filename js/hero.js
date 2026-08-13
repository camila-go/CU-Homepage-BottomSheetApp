/* Hero program finder.
 *
 * Mirrors capella.edu's hero interaction, measured 2026-08-13:
 *   1. Click a degree chip  → the chip goes #3a0007 (dark red) and an
 *                             "Select area of study" label + <select> appear.
 *                             The hero grows 562 → 677 at desktop.
 *   2. Choose an area       → a second "Select specialization" <select> appears,
 *                             populated with that degree+area's programmes.
 *   3. Choose a programme   → the live site navigates. Links here are `#`, so
 *                             this only records the choice.
 *
 * There is NO submit button — the live finder has none; the selects are the
 * whole control. Verified: the only visible controls after step 2 are the four
 * chips and the two selects.
 *
 * The catalogue comes from ./programs.js, the same map that drives the desktop
 * megamenu's third level and the mobile nav tree, so the hero cannot drift out
 * of sync with the menu.
 */

import { MEGA_PROGRAMS } from './programs.js';

// The chips carry `data-degree`, matching the live markup's own attribute. These
// map onto MEGA_PROGRAMS' keys.
const DEGREE_KEYS = {
  bachelors: 'area-bachelors',
  masters: 'area-masters',
  doctoral: 'area-doctoral',
  certificate: 'area-certificates',
};

function initHeroFinder() {
  const finder = document.querySelector('.hero__finder');
  if (!finder) return;

  const chips = [...document.querySelectorAll('.hero__chips [data-degree]')];
  const areaField = finder.querySelector('.hero__field--area');
  const areaSelect = finder.querySelector('#hero-area');
  const specField = finder.querySelector('.hero__field--spec');
  const specSelect = finder.querySelector('#hero-spec');
  if (!chips.length || !areaSelect || !specSelect) return;

  const fill = (select, placeholder, items) => {
    select.replaceChildren();
    // DOM APIs rather than innerHTML: several programme names contain "&" and a
    // curly apostrophe.
    const first = document.createElement('option');
    first.value = '';
    first.textContent = placeholder;
    select.appendChild(first);
    items.forEach((name) => {
      const o = document.createElement('option');
      o.value = name;
      o.textContent = name;
      select.appendChild(o);
    });
  };

  function selectDegree(chip) {
    chips.forEach((c) => {
      const on = c === chip;
      c.classList.toggle('is-selected', on);
      c.setAttribute('aria-pressed', String(on));
    });

    const map = MEGA_PROGRAMS[DEGREE_KEYS[chip.dataset.degree]] || {};
    fill(areaSelect, 'Select area of study', Object.keys(map));
    areaField.hidden = false;
    // Step 2 always resets when the degree changes — the previous area belonged
    // to the level you just left.
    specField.hidden = true;
    specSelect.value = '';
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      selectDegree(chip);
    });
  });

  areaSelect.addEventListener('change', () => {
    const chip = chips.find((c) => c.classList.contains('is-selected'));
    const map = chip ? MEGA_PROGRAMS[DEGREE_KEYS[chip.dataset.degree]] || {} : {};
    const programs = map[areaSelect.value];
    if (!programs || !programs.length) {
      specField.hidden = true;
      return;
    }
    fill(specSelect, 'Select specialization', programs);
    specField.hidden = false;
  });
}

document.addEventListener('DOMContentLoaded', initHeroFinder);
