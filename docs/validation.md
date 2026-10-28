# Validation record

Implemented and checked on Windows with Node.js 24.14.1 and installed Google Chrome, 28–29 October 2026 (Asia/Shanghai).

## Executed before publication

- `npm test`: passed at 1440×1000, 768×1024, 390×844, and 320×740. All four widths had no horizontal overflow, no page/asset errors, and zero axe-core violations under WCAG 2 A/AA, WCAG 2.1 AA, and best-practice tags.
- At each width, verified keyboard activation of the skip link moves focus to main content; all six navigation anchors resolve and remain below the sticky header; reduced-motion preference disables smooth scrolling.
- Verified core content/navigation with JavaScript disabled and checked 200% CSS zoom without horizontal overflow.
- Reviewed full desktop/mobile screenshots plus full-size desktop and mobile hero captures. Fixed a skip-link focus issue, nested complementary-landmark semantics, and header overflow found during checks.
- `npm run check`: passed HTML Validate recommended rules, unique IDs, all local referenced files, internal fragments, required metadata, and checks against publishing student-number emails, phone links, tokens, or tracking.
- `npm run build`: passed; `dist/` contains only the public-file allowlist. No runtime dependency download is needed to use the page.
- All 11 unique GitHub destination URLs returned HTTP 200. LinkedIn returned HTTP 999 and is classified as automation-blocked, not independently verified. The initial CUHK department link timed out; it was replaced with an official CUHK research profile that returned HTTP 200.
- The canonical website initially returned 404 because the new Pages repository had not yet been created. Publication verification must check this URL again.

Screenshots and machine-readable test results are in the ignored local `artifacts/` folder. Browser automation does not replace a full manual screen-reader audit. Upstream repository experiments were inspected rather than rerun; metrics on the page are explicitly recorded upstream results.

## Publication

Target: `https://github.com/yumumumule/yumumumule.github.io`, GitHub Pages from `main` at `/`. Deployment and live verification are recorded after the initial validated source commit. See repository commit history and GitHub's Pages build status for the exact published revision.
