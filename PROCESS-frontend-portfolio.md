# How this portfolio was built

The reasoning behind the design and build decisions for this site — the first project built with real, hands-on JavaScript.

## Starting point

Three interactive features were decided upfront: a mobile hamburger nav, a contact form with client-side validation, and a project filter by category.

The filter needed more thought than expected. A generic "frontend/backend" split didn't make sense — every current project is frontend, and this was the first JavaScript project at all. Filtering by tech used, project type, and skill demonstrated was more honest, and lets the filter grow naturally as more projects get added. It's fully data-driven: each project card carries `data-category` attributes, and the JS reads whatever categories exist on the page and builds the filter buttons automatically — new projects with new categories just work, with no JS changes needed. Projects can belong to more than one category, and an "All" button is always present by default.

## Finding the direction: "the workshop"

The target feeling: serious, hard-working, gets the job done — not flashy, but honest about still learning. Landed on a near-black graphite background (not pure black), one confident burnt-orange accent used sparingly, monospace labels for a technical/blueprint feel, and a Space Grotesk / Inter pairing for headings and body.

## Content before structure

Writing came before HTML — it made more sense to know what was being said before deciding how to structure it. This turned out to be the hardest part of the whole project, despite being confident in the actual work.

The honesty standard applied throughout: the Hero title is plain "Frontend Developer" with no qualifiers like "junior," since the honesty of the surrounding content already does that work. Python was left off the site entirely, since this is a frontend-focused page and that positioning shouldn't blur.

For Projects, the first real entry pulled directly from the ceramics project's own build log and README rather than guessing at a description. Category tags were chosen deliberately — "client-brief" was left out since it describes the project's origin, not something a recruiter would filter by; "accessibility" was kept despite initial hesitation, since running a real Lighthouse audit and fixing an actual contrast issue is a genuine, uncommon signal worth surfacing.

## Building the shared layout system

Before any single section, the layout system every section would share got worked out first. Heading sizes use `rem` instead of raw `px`, since `rem` scales with a user's browser font-size setting — a real accessibility factor. The Google Fonts import moved from a CSS `@import` to a `<link>` in the HTML head, since `@import` blocks the browser from fetching fonts in parallel with the stylesheet.

The bigger decision was the content-width wrapper. A two-variable system (narrow-for-prose, wide-for-grids) was explored first, following the same pattern used on the ceramics project — but only the Projects section actually needed to be wider, so a two-variable system was unnecessary complexity for one real exception. Simplified to a single `.container` class with a sensible default max-width, plus one targeted override for Projects. Lesson: don't build a flexible multi-variant system for a distinction that only has one real exception.

A wrapper `<div class="container">` inside each section, rather than max-width on the section itself, was chosen so a section's background can span full width later while keeping content centered and narrow — something the section-level approach can't do.

Midway through, noticed the work was jumping around without a clear order — stopped to regroup rather than push through, and committed explicitly to mobile-first, one section at a time, in document order.

## Hero

Full-viewport height using `dvh` instead of `vh`, since mobile address-bar UI changes can cause `vh` to misjudge visible space. Content sits centered as a block overall, but an inner text wrapper is left-aligned within itself — a middle ground that keeps the hero balanced as a whole page while reading naturally left-to-right, fitting the workshop feel better than dead-centered poster text. Both hero buttons carry equal visual weight, styled as matching outlined buttons rather than one primary and one secondary, so neither competes with the other or overuses the accent color.

An early `95dvh` height guess turned out to be an approximation rather than a real fix — the nav sits above Hero in normal flow, so Hero's full height plus the nav's real height was pushing the page taller than one screen. Solved with a shared `--nav-height` variable used in both the nav and in `calc(100dvh - var(--nav-height))` on Hero, calculated from the nav's actual rendered content rather than guessed — one source of truth instead of two numbers that could silently drift apart.

## Skills

Icons needed to sit between the text-heavy About section and the more visual Projects section. Hand-drawn SVG icons were tried first, but drawing five distinct, recognizable shapes proved genuinely hard. Landed on a simpler, more forgiving pattern instead: small monospace symbols inside a colored square, same "canvas" every time, only the character changing. One of the first icon attempts turned out to closely recreate the official CSS3 logo — a real trademarked mark, not a generic symbol — and was replaced with an original character to keep the icon set genuinely original.

A few real bugs surfaced during review here: a dead duplicate CSS declaration, unscoped element selectors that only worked because Skills happened to be the only section using those tags at the time, and a non-square SVG that was quietly distorting icon shapes. All three fixed. Also caught: no explicit base font-size existed anywhere on `body` except a local Hero override — every other section had been relying on the unstated browser default.

*(Note: the section originally shipped as two labeled groups — "what I know well" and "what I'm learning now." That structure was later dropped in favor of a single flattened list; see "Redesigning Skills" below.)*

## Projects

The card layout uses a bordered treatment (chosen over a filled surface after testing both, to stay visually distinct from Skills' filled cards), with the image flush at the top using `overflow: hidden` on the card and `aspect-ratio` on the image, so any future screenshot renders at a consistent shape regardless of its original dimensions.

Reusing the ceramics project's gallery grid pattern directly didn't actually transfer — that gallery held small, uniform, text-free images, while these cards carry a screenshot, heading, description, and two buttons, needing meaningfully more room. Mobile doesn't need grid complexity at all with only one column available regardless — that split was deliberately left as a desktop-only decision for later.

Testing with real duplicate content (not a single card) surfaced the equal-height question directly. An initial instinct to protect content with `align-items: start` turned out to be based on an unfounded fear — grid's default stretch behavior sizes every card in a row to the tallest one's real content height, with nothing clipped. Removed the unnecessary override, and made the card's content area grow to absorb the extra space internally instead of leaving a dead gap.

Later, testing with more varied content (some cards with much longer descriptions) surfaced a related but distinct problem: cards were rendering at visibly different heights within the same row again — not solvable with `align-items: stretch` alone, since that would force equal heights but leave large empty gaps inside shorter cards. Researched how established platforms handle this before reaching for a fix, and found CSS line-clamping as the standard technique — capping text to a fixed number of visible lines with an automatic ellipsis. Implemented `-webkit-line-clamp` on descriptions specifically (titles didn't need it, being short and self-authored by nature). This also resolved an unrelated complaint that had lingered since early in the build — cards feeling subtly "too long" — which turned out to be the same root cause, not a separate issue.

## The contact form

Validation messages live in JS logic since they're conditional, but each field has its own empty error `<span>` already in the HTML, positioned directly under that input rather than one shared message near the submit button — this handles multiple simultaneous errors correctly and lets `aria-describedby` connect each input to its own error text for screen readers.

Empty-field validation was built first: a function checking trimmed input against an empty string, returning true or false so results could be combined afterward. For email specifically, the browser's built-in `checkValidity()` method turned out to be a genuinely better tool than a manual regex check, since it uses the browser's real understanding of the `email` input type. A three-branch email validator (empty / wrong format / valid) followed, with its own dynamic error text per case.

Real bugs caught through review: one branch referenced an undefined variable left over from copying an earlier pattern, which would have thrown a runtime error the moment a fully valid email was submitted. A second, subtler bug: stale error text sticking around from a previous invalid attempt even after the field was cleared — fixed by explicitly setting the correct message in every branch rather than relying on leftover state.

`form.reset()` was added after a successful submission — without visibly clearing the fields, a user has no strong confirmation their submission actually went through beyond the success text alone. Testing deliberately covered edge cases: whitespace-only input, resubmitting after fixing a single error, repeated failed submissions, and confirming full re-validation runs on every submit regardless of which field actually changed.

*(Note: at this stage the form validated correctly but didn't actually send anywhere — `action=""` with a hardcoded success message regardless of outcome. That gap was closed later; see "Real form submission" below.)*

## The hamburger menu

Built with three plain `<span>` bars rather than an SVG icon, chosen specifically because a hamburger-to-X animation is simpler to achieve by rotating real HTML elements via CSS than by manipulating SVG paths. `aria-label` and `aria-expanded` give screen reader users real state information.

The open mobile nav initially either overlapped Hero or got cut off — the root cause wasn't the JavaScript at all, but a missing position strategy: the nav was sitting in normal document flow, pushing against a fixed-height header. Fixed with `position: absolute`, dropping the open menu below the header as an overlay instead of pushing page content around — the standard pattern for mobile dropdowns.

`classList.toggle()` returns a boolean reporting whether the class was just added or removed — that return value keeps `aria-expanded` and `aria-label` accurately synced to the menu's real state, since a screen reader user has no other way to know it. The repeated update logic for that syncing was noticed being written twice and extracted into a single reusable function instead.

## The project filter

Built in stages: reading `data-category` off every card, splitting the raw string into an array, then using `Set` combined with the spread operator to deduplicate categories across cards. The "All" button isn't real discovered data the way the other categories are, so it's hardcoded directly in HTML rather than mixed into the same array — keeping data-derived and UI-only concepts cleanly separated.

A subtle bug surfaced later: a hidden class wasn't taking effect inside the desktop media query. Traced to a CSS specificity conflict — a more specific display rule was winning over the hide rule — and fixed by adding the override inside the media query as well.

## Final review, and one bug found after "done"

A full pass across HTML, CSS, and JS together caught a stray unmatched closing tag, a duplicate CSS declaration, a dead unused grid rule, and a missing hover transition on filter buttons. Two small non-breaking improvements were deliberately deferred rather than rushed in, since they weren't functional bugs.

After the project was marked complete, one more real bug turned up: the submit handler was listening for a click on the submit button specifically, not a submit event on the form itself. Pressing Enter while focused in a text field — a completely normal way to submit a form — bypassed the click listener, went to the browser's native form submission, and would have reloaded the page and wiped out everything typed, with no validation ever running. Fixed with a minimal, targeted swap: listening for `submit` on the form instead of `click` on the button, changing nothing else, since every validation and success function only cares that a submission happened, not how it was triggered.

The lesson that closed the project out: "finished and tested" doesn't mean tested against every real way a user might interact with something — worth deliberately trying alternate interaction paths, keyboard included, even after a feature feels done.

---

## Real form submission — Formspree, fetch, and async/await

The `action=""` gap from earlier was a known, deliberate deferral, not an oversight — closing it meant setting up a real endpoint. Formspree was the fit, since the site runs on GitHub Pages with no backend of its own.

This also meant a genuine first introduction to `fetch()`, `async`/`await`, and `FormData` — none used before. The core idea to work through first: `fetch()` returns a Promise rather than an immediate value, and `await` pauses only the specific `async` function it's inside, not the whole page. Built step by step from there: the handler marked `async`, a `FormData` object built directly off the form (reads every named input automatically, no manual `.value` grabbing), and the actual fetch call wrapped in `try`/`catch` to separate two genuinely different failure modes — Formspree responding but rejecting the request (`response.ok` false) versus the request never completing at all (a network failure, caught in `catch`).

The async logic was pulled out into its own `submitForm()` function, kept separate from the click handler — a cleaner split between "handle the submit event" (validation) and "do the actual async work" (the request itself). Real bugs surfaced on the first pass: a variable declared as `failureMessage` but referenced everywhere else as `failureMessageMessage`, a stray leading dot mistakenly included in a `classList.add()` call (that's CSS-selector syntax, not a JS class name), an `await` left inside a function that wasn't marked `async` after being moved, and a missing `formData` declaration that got dropped in the same move. Each was worked through and fixed properly rather than guessed at.

Message cleanup got the same care as the earlier stale-error-text issue: success and failure messages need to be mutually exclusive, so each branch removes the other before appending its own — including the outer validation-failure branch, since either message could be a leftover from a previous attempt, not just success.

Tested for real, not just visually: a valid submission landed in the actual Formspree dashboard and arrived by email. The failure path was confirmed too, by deliberately breaking the endpoint URL.

## Fixing aria-live properly

A deferred item from earlier — `aria-live` on the form's error and status messages. The three per-field error spans were straightforward: `aria-live="polite"` added directly in the HTML, since they already exist as static elements. Polite rather than assertive, since a field error isn't urgent enough to interrupt whatever a screen reader is currently announcing.

The success/failure status message was trickier. The first pass added `aria-live="polite"` to the dynamically created success/failure paragraphs, but testing with VoiceOver showed it only announced the message when manually navigating onto it — not automatically on submission. Root cause: `aria-live` only reliably announces content changes inside a region already present in the accessibility tree; `appendChild`-ing a brand-new element isn't consistently treated as a "content change," even with the attribute set.

Fixed properly instead of working around it: one permanent, empty `<p id="form-status" aria-live="polite">` added directly in the HTML, present from page load. The JS was refactored to stop creating and appending/removing separate success/failure elements entirely — `onFormSucess()` and `onFormFailure()` now just update that same persistent element's `textContent` and class. This is the correct pattern for dynamic status messages: the live region itself never moves, only its content does.

Two real bugs surfaced while wiring this up, both the same underlying category as an earlier bug in this project (stale state left over from a previous branch): classes were being added but never removed, so a failure right after a success (or vice versa) would leave both `success-message` and `error-status-message` on the element at once instead of swapping cleanly. Fixed by having each state-setting function explicitly remove the other's class before adding its own — the same principle as the earlier message cleanup, resurfacing in a new spot. The leftover class, not just the text, was also cleared in the validation-failure branch, for the same reason.

Verified with an actual screen reader, not just visually: confirmed the success message now announces immediately on a successful submission without needing to manually navigate to it, and confirmed the class-swap fix by deliberately triggering a failure immediately after a success and checking only the correct state was visible.

## Redesigning Skills — dropping the two-tier split

The original "what I know well" / "what I'm learning now" two-card layout was retired. The reasoning was structural, not aesthetic: the "known" list only grows over time, while "learning now" stays capped around 2–3 items by nature — guaranteeing an increasingly lopsided layout with real empty space on one side within a month or two. Reconsidering the audience mattered too: a portfolio is judged on current capability, not what's in progress — "still learning" content already belongs in this log, where it's tracked honestly, not on the page itself.

Current portfolio conventions were researched before deciding how to handle each skill's supporting sentence. The clear consensus: a bare list of tech names reads as a credibility-free buzzword list, so the per-skill sentence stayed — the goal was to lose the tier system, not the depth. The icon-vs-no-icon question was verified the same way, side by side, rather than guessed at — the icon is a real distinct visual motif Projects doesn't have, worth keeping even with a small margin.

The HTML was restructured: both `h3` category headers and the two wrapping `.skill-list` divs were dropped, everything flattened into one `<ul>`, and each skill's name promoted from an inline `<strong>` label to its own `<h3>` — a real semantic upgrade, not just style, since a screen reader user navigating by heading can now jump skill-to-skill instead of reading through one undifferentiated list.

A real layout bug surfaced switching to the single-list grid: only 2 items rendering per row despite the math clearly supporting 4–5 at the container's actual width. Chased properly instead of patched around: confirmed the computed width first (1052px, exactly as predicted), which ruled out a starved-container theory. Root cause turned out to be a leftover `.skill-content` wrapper div still carrying its old `flex-direction: row` rule from the two-column layout — as the sole child of a row-direction flex parent, the `<ul>` was sizing to its own content instead of stretching, since flex `stretch` only applies along the cross-axis, not the main axis. The dead wrapper was removed entirely rather than forcing the width with a workaround, and the grid filled correctly on its own — confirming `width: 100%` had been masking the real cause, not fixing it.

A smaller misunderstanding got caught on the way: nearly stripping the wrong attribute off each skill's SVG icon. The `<rect fill="var(--color-bg)">` was a same-color background chip, unrelated to the glyph's own color, which comes from the `<text fill="var(--color-accent)">` element. The whole `<rect>` line was removed, not just its fill attribute — dropping only the attribute would have left a default-black square behind the icon instead of removing it cleanly.

The finished section was compared directly against Projects, not just in isolation, to confirm it reads as clearly its own thing — distinct in shape and rhythm, without needing a border or card treatment to separate itself.

## One more review pass

A final pass across the Skills and form changes together, the same discipline as the earlier full-project review, caught three small things — none functional bugs: two dead CSS rules left over from the retired two-column Skills layout, a dead JS variable left from before the submit handler moved from a click listener to a form-submit listener, and one naming typo (`onFormSucess`, missing the second "s"). All cheap to fix now rather than later, once referenced in more places.
