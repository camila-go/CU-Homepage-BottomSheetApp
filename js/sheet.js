/* Application sheet controller.
 *
 * Drives the ten-step application ported from apply.capella.edu (captured
 * 2026-08-13) inside a bottom sheet on mobile / right-aligned modal on desktop.
 *
 * ⚠️ PROTOTYPE ONLY. There is deliberately NO submit, NO endpoint and NO
 * persistence — `collect()` exists so the steps can echo entered values back
 * (the live wizard greets you by first name and confirms your email), and its
 * result never leaves this module. Do not add a fetch here without also
 * revisiting the DOB/SSN/password steps, which reproduce the real application's
 * sensitive fields.
 *
 * Step order and labels mirror the live wizard's `.tab-panel` sequence:
 *   1 name → 2 welcome → 3 dob → 4 confirm dob → 5 ssn → 6 existing account
 *   → 7 email → 8 confirm email → 9 password → 10 account created
 *
 * Steps 2, 4, 6 are CONDITIONAL on the live site (`cl-dob-flow-check`,
 * `cl-dob-match`, `cl-ssn-match-login`): they only appear when a record matches.
 * They are all reachable here so the whole flow can be reviewed — step 6 is a
 * terminal branch on live, so it offers "Go to Log In" and does not continue.
 */

// Per-step docked-button label, taken from the live wizard.
const NEXT_LABEL = {
  1: 'Continue',
  2: 'Continue',
  3: 'Continue',
  4: 'Looks good!',
  5: 'Continue',
  6: 'Go to Log In',
  7: 'Agree and Go',
  8: 'Looks good!',
  9: 'Continue',
  10: 'Ok, Got it!',
};

// Which fields each step requires. The docked action validates these before
// advancing, mirroring the live wizard (whose Continue also refuses to move on).
// The messages in the markup are the live application's own strings.
const REQUIRED = {
  1: ['app-first', 'app-last'],
  3: ['app-dob'],
  5: ['app-ssn'],
  7: ['app-email'],
  9: ['app-password'],
};

// The sheet header shows the Capella logo, so these titles are announced to
// assistive tech only (the visually-hidden #sheet-title). They are not displayed.
const STEP_TITLE = {
  1: 'Your name',
  2: 'Welcome',
  3: 'Date of birth',
  4: 'Verify birthdate',
  5: 'Identity check',
  6: 'Existing account',
  7: 'Email address',
  8: 'Confirm email',
  9: 'Password',
  10: 'Account created',
};

function initSheet() {
  const sheet = document.getElementById('application-sheet');
  const scrim = document.querySelector('[data-sheet-scrim]');
  if (!sheet || !scrim) return;

  const steps = [...sheet.querySelectorAll('.sheet__step')];
  const titleEl = sheet.querySelector('#sheet-title');
  const nextBtn = sheet.querySelector('[data-sheet-next]');
  const backBtn = sheet.querySelector('[data-sheet-back]');
  const body = sheet.querySelector('[data-sheet-body]');
  const total = steps.length;

  let current = 1;
  let opener = null;

  const stepEl = (n) => steps.find((s) => Number(s.dataset.step) === n);

  const collect = () => ({
    firstName: (sheet.querySelector('#app-first')?.value || '').trim(),
    dob: (sheet.querySelector('#app-dob')?.value || '').trim(),
    email: (sheet.querySelector('#app-email')?.value || '').trim(),
  });

  function render() {
    const data = collect();

    steps.forEach((s) => {
      s.hidden = Number(s.dataset.step) !== current;
    });

    titleEl.textContent = STEP_TITLE[current] || 'Apply to Capella';
    nextBtn.textContent = NEXT_LABEL[current] || 'Continue';
    backBtn.hidden = current === 1;

    // Echo entered values the way the live wizard does.
    sheet.querySelectorAll('[data-first-name]').forEach((el) => {
      el.textContent = data.firstName || 'there';
    });
    const dobConfirm = sheet.querySelector('#app-dob-confirm');
    if (dobConfirm) dobConfirm.value = data.dob;
    const emailConfirm = sheet.querySelector('#app-email-confirm');
    if (emailConfirm) emailConfirm.value = data.email;

    // "Step n of 10" — the live wizard has no visible counter, but without one a
    // ten-step flow in a sheet gives no sense of length.
    const el = stepEl(current);
    const counter = el && el.querySelector('[data-step-count]');
    if (counter) counter.textContent = `Step ${current} of ${total}`;

    body.scrollTop = 0;
  }

  // ---- Validation -------------------------------------------------------
  const fieldOf = (input) => input.closest('.sheet__field');

  function clearError(input) {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
    fieldOf(input)?.classList.remove('is-invalid');
  }

  function showError(input) {
    const err = sheet.querySelector('#' + input.id + '-error');
    input.setAttribute('aria-invalid', 'true');
    if (err) input.setAttribute('aria-describedby', err.id);
    fieldOf(input)?.classList.add('is-invalid');
  }

  /* Returns true when the current step is complete. The SSN step is satisfied
     either by four digits or by the "I don't have Social Security Number"
     checkbox — the live wizard treats the checkbox as the alternative. */
  function validateStep(n) {
    const ids = REQUIRED[n] || [];
    let firstBad = null;
    for (const id of ids) {
      const input = sheet.querySelector('#' + id);
      if (!input) continue;
      if (id === 'app-ssn' && sheet.querySelector('[data-no-ssn]')?.checked) {
        clearError(input);
        continue;
      }
      if (!input.value.trim()) {
        showError(input);
        if (!firstBad) firstBad = input;
      } else {
        clearError(input);
      }
    }
    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  // Clear a field's error as soon as the user starts fixing it.
  sheet.querySelectorAll('.sheet__input').forEach((input) => {
    input.addEventListener('input', () => {
      if (input.value.trim()) clearError(input);
    });
  });

  // Ticking "I don't have SSN" clears that field's error and disables it, which
  // is the feedback the live form gives for the alternative path.
  const noSsn = sheet.querySelector('[data-no-ssn]');
  const ssnInput = sheet.querySelector('#app-ssn');
  if (noSsn && ssnInput) {
    noSsn.addEventListener('change', () => {
      ssnInput.disabled = noSsn.checked;
      if (noSsn.checked) {
        ssnInput.value = '';
        clearError(ssnInput);
      }
    });
  }

  function open(trigger) {
    opener = trigger || null;
    scrim.hidden = false;
    sheet.hidden = false;
    // Two frames: the element must be laid out at its off-screen transform
    // before the class flips it in, or it jumps instead of sliding.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrim.classList.add('is-open');
        sheet.classList.add('is-open');
      });
    });
    document.body.style.overflow = 'hidden';
    render();
    // Focus the first control so keyboard users land inside the dialog.
    (sheet.querySelector('.sheet__input') || nextBtn).focus();
  }

  function close() {
    scrim.classList.remove('is-open');
    sheet.classList.remove('is-open');
    document.body.style.overflow = '';
    const done = () => {
      sheet.hidden = true;
      scrim.hidden = true;
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) done();
    else sheet.addEventListener('transitionend', done, { once: true });
    // Return focus to whatever opened the sheet.
    if (opener) opener.focus();
  }

  nextBtn.addEventListener('click', () => {
    // Step 6 is a TERMINAL branch on the live site — it links to log in rather
    // than continuing. Step 10 is the end of the flow.
    if (current === 6 || current === total) {
      close();
      return;
    }
    // Refuse to advance while the step is incomplete, as the live wizard does.
    if (!validateStep(current)) return;
    // ⚠️ 5 → 7, skipping 6. On the live site step 6 ("We meet again!") only
    // appears when the entered SSN matches an existing Capella account, so it is
    // the exception, not the normal route — routing through it by default made
    // the common path dead-end before email/password. With no backend here there
    // is nothing to match against, so the default path skips it and step 6 is
    // reachable for review via `?step=6` or `__sheetGoTo(6)` (see below).
    current = current === 5 ? 7 : current + 1;
    render();
  });

  backBtn.addEventListener('click', () => {
    current = current === 7 ? 5 : Math.max(1, current - 1);
    render();
  });

  sheet.querySelectorAll('[data-sheet-close]').forEach((b) =>
    b.addEventListener('click', close)
  );
  scrim.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (sheet.hidden) return;
    if (e.key === 'Escape') {
      close();
      return;
    }
    // Focus trap: keep Tab inside the dialog while it is open.
    if (e.key !== 'Tab') return;
    const focusables = [...sheet.querySelectorAll(
      'button:not([hidden]), a[href], input:not([disabled]), select, textarea'
    )].filter((el) => el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Every "Apply now" on the page opens the sheet instead of navigating.
  const triggers = [...document.querySelectorAll('a, button')].filter((el) =>
    /^apply now$/i.test((el.textContent || '').trim())
  );
  triggers.forEach((t) =>
    t.addEventListener('click', (e) => {
      e.preventDefault();
      current = 1;
      open(t);
    })
  );

  // Review hooks. "Validate every step is brought in" needs a way to reach the
  // CONDITIONAL steps (2, 4 and 6 are gated on record matches upstream), without
  // adding fake controls to the UI. `?step=N` opens the sheet there on load, and
  // `__sheetGoTo(n)` jumps while it is open.
  window.__sheetGoTo = (n) => {
    const target = Number(n);
    if (!Number.isInteger(target) || target < 1 || target > total) return false;
    if (sheet.hidden) open(null);
    current = target;
    render();
    return true;
  };

  const requested = Number(new URLSearchParams(location.search).get('step'));
  if (Number.isInteger(requested) && requested >= 1 && requested <= total) {
    window.__sheetGoTo(requested);
  }
}

document.addEventListener('DOMContentLoaded', initSheet);
