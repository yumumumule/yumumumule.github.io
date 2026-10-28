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
- After publication, the canonical website and the official CUHK profile returned HTTP 200. All checked destinations passed except LinkedIn, which continued to block automated access with HTTP 999.

Screenshots and machine-readable test results are in the ignored local `artifacts/` folder. Browser automation does not replace a full manual screen-reader audit. Upstream repository experiments were inspected rather than rerun; metrics on the page are explicitly recorded upstream results.

## Publication

Successfully published at <https://yumumumule.github.io/> from <https://github.com/yumumumule/yumumumule.github.io>, using `main` at `/`. GitHub's API reported Pages and its latest build as `built` for source revision `49f2827c03821b4cff9891a22121a806b719fab0`, with no build error.

Live Chrome checks passed at desktop (1440×1000) and mobile (390×844): HTTP 200, four project cards, no horizontal overflow, zero axe-core violations for the same WCAG/best-practice tags, and no page or same-origin asset errors. The published HTML matched the local `index.html` byte for byte. Stylesheet and Open Graph image URLs also returned HTTP 200. Machine-readable live check results and screenshots are retained locally in `artifacts/`.

The final documentation-only commit records these results; it does not change the tested page or assets. Subsequent updates can be inspected with `node scripts/deploy.mjs --status` and the live URL.
