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

## Public CV update on 29 October 2026

Prepared a one-page public PDF from the owner's supplied Word CV. Replaced private contact details with the owner-approved Gmail address and GitHub profile. Kept other source text, verified every source paragraph/table cell against extracted PDF text, restricted PDF metadata to its public title and author, and confirmed the original Word file's SHA256 was unchanged. The bundled DOCX renderer could not run because LibreOffice is unavailable on this Windows runtime; native Word automation also stalled. The final PDF was laid out locally with ReportLab using the source's section structure, rendered with bundled Poppler, and visually inspected in full.

Replaced the unavailable CV button with a functioning PDF download. HTML checks, static build, the existing four-width browser/accessibility suite, and 200% zoom all passed. Additional desktop (1440px) and mobile (390px) tests clicked the download, verified its filename and PDF content type, and compared downloaded bytes with the public asset. Reviewed screenshots of the CV section at both widths. Source Word files, contact-redaction intermediates, renderings, and downloaded test copies remain outside the published source tree or in ignored `artifacts/`.

## Research and CV redesign on 29 October 2026

Verified the official titles, author lists, 2026 dates, and Hanlin Zhao's co-authorship for arXiv:2610.13376 (EndoRSI) and arXiv:2610.24747 (EndoVLA-OOV). Related AgentVLA lab-project naming, the OOV-only IEEE TRL review status, and the accepted EICARL CoRL workshop record follow owner-provided information; no journal abbreviation, workshop name, year, presentation format, or acceptance beyond that information was inferred. The other workshop submission is excluded following the owner's correction.

OpenReview profile/forum URLs returned HTTP 200 challenge pages and API/PDF requests were blocked with HTTP 403. Updated link checking to classify the HTTP 200 challenge pages as blocked. arXiv abstract and PDF URLs, CUHK, and GitHub links returned HTTP 200. LinkedIn remains blocked with HTTP 999.

Added three research entries and OpenReview links. Reorganized the CV as a one-page research/engineering PDF with linked papers, correctly ordered abbreviated authors, two selected projects, and condensed honors/activities. The optional Word intermediate was structurally generated, but the canonical DOCX renderer remains unavailable without LibreOffice and native Word export did not complete. The delivered PDF was independently laid out with ReportLab from `content/cv.json`, rendered with bundled Poppler, and visually reviewed in full after adjusting typography. No unrendered Word file is presented as a verified deliverable. Original Word source remains unmodified.

Passed PDF text coverage against the generated content source, paper hyperlink preservation, one-page count, restricted metadata, and contact privacy checks. Repeated the four-width browser/accessibility suite with zero detected violations, overflow, or page/asset errors. HTML validation, static build, JavaScript-disabled content, keyboard navigation, reduced motion, and 200% zoom passed. Additional desktop/mobile checks confirmed three paper entries and matching downloaded PDF bytes/filename. Screenshots and source-access evidence remain in ignored `artifacts/`.

Published research update `07d360b` returned HTTP 200, with matching live HTML, CSS, and PDF bytes. Live desktop/mobile accessibility scans detected zero violations, and both downloaded the matching PDF. Visual review identified an existing navigation-highlight mismatch at section boundaries; the follow-up fix uses the configured scroll offset and checks the active navigation link at all six anchors across the four viewport widths.
