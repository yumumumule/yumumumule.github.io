# Hanlin Zhao — academic and engineering portfolio

Personal website for a CUHK Artificial Intelligence: Systems & Technologies undergraduate researcher. Includes research topics, four curated GitHub projects, education, honors, CV availability, and contact links.

- Website: <https://yumumumule.github.io/>
- Repository: <https://github.com/yumumumule/yumumumule.github.io>
- Project selection and evidence: [repository audit](docs/repository-audit.md)
- Content review and privacy decisions: [content notes](docs/content-notes.md)
- Executed checks: [validation record](docs/validation.md)

## Technology

Semantic HTML, CSS, and a small JavaScript enhancement for navigation. System fonts, local assets, no runtime dependencies, analytics, backend, or live GitHub API dependency. The page works with JavaScript disabled. Development checks use Node.js 22+, HTML Validate, Playwright Core, and axe-core; a locally installed Chrome/Chromium is required for browser tests.

## Local development

```sh
npm ci
npm run dev
```

Open <http://127.0.0.1:4173>. No compilation is required. In PowerShell, use `npm.cmd` if script execution policy blocks `npm.ps1`.

```sh
npm test
npm run check
npm run check:links
npm run build
```

`npm test` runs desktop/mobile browser and accessibility checks, saves screenshots in ignored `artifacts/`, and renders the typographic Open Graph card. Set `CHROME_PATH` if Chrome is installed outside the script's standard locations. `npm run check:links` distinguishes failed links from services blocking automated requests. Before first deployment, the canonical website URL will return 404. `npm run build` optionally creates an ignored, allowlisted `dist/` for any static host. GitHub Pages serves the tracked root directly.

## Update content

1. Edit the corresponding section in `index.html`; headings and anchor IDs identify each section.
2. For projects, update the manually curated `.project-card` entries. Link to code and recorded results; retain dataset, split, and uncertainty limitations. Do not copy unverified headline metrics.
3. For research, edit `#research`. Separate team research topics from personal responsibilities. Keep preprints, journal submissions under review, and accepted workshop papers distinct. Use official paper titles and published author order. Review `docs/content-notes.md` for provenance and access limits. The IEEE TRL status applies only to EndoVLA-OOV; EICARL is listed as an accepted CoRL workshop paper, without an inferred year or specific workshop name.
4. Edit `assets/style.css` for visual changes and `assets/main.js` for progressive enhancement. Keep essential content in HTML.
5. Review changed content in the browser, run the checks above, commit, and push `main`.

## Add or replace the CV

The website links to a redesigned, one-page public CV incorporating the owner's Word CV, verified public projects, arXiv co-authorship, and owner-confirmed workshop/review information. The public copy uses the approved Gmail address and omits phone numbers and the student-number-based email; the original Word document is preserved outside this repository. To replace the public CV:

1. Review its currency and remove phone numbers, student IDs, private addresses, and confidential research details. Check PDF metadata too.
2. Save it as `assets/Hanlin_Zhao_CV.pdf`.
3. Keep the existing download link in `#cv` and update the adjacent description if the contents change.
4. Keep the filename for future replacements, check the download, then commit and push.

Curated CV content is in `content/cv.json`. With Python, `python-docx`, `pypdf`, and `reportlab` available, run `python scripts/generate-cv.py --docx-out artifacts/cv-refresh/Hanlin_Zhao_CV_Updated.docx`, then `python scripts/generate-cv.py --render-pdf` to regenerate the public PDF. The PDF layout uses locally installed Windows Calibri and Georgia fonts. The script validates its one-page output, text, paper hyperlinks, metadata, and contact privacy. Render and inspect the PDF before pushing. The generated Word file is an optional editable intermediate and must be rendered separately before sharing; its pagination is not assumed to match the PDF. If exporting Word with a supported renderer, validate it with `python scripts/generate-cv.py --pdf-in <exported.pdf> --docx-source artifacts/cv-refresh/Hanlin_Zhao_CV_Updated.docx`. Regenerating a CV is separate from the buildless website workflow.

The owner-provided contact email is `zhl2104405665@gmail.com`, linked from the hero and contact section alongside GitHub and LinkedIn. To change it, update both `mailto:` destinations and the visible address in `index.html`.

## GitHub Pages deployment

The public repository `yumumumule/yumumumule.github.io` uses GitHub Pages **Deploy from a branch → main → / (root)**. `.nojekyll` disables Jekyll processing. Each push to `main` triggers GitHub's native Pages build; no custom workflow is necessary.

For initial setup, after committing and running validation, use:

```sh
npm run deploy
node scripts/deploy.mjs --status
```

The deployment helper reads the existing GitHub credential from Git Credential Manager in memory, checks the authenticated account, creates the target repository only if absent, performs a normal push, and configures Pages. It never writes tokens, commits automatically, changes project repositories, or force-pushes. If credentials are unavailable, authenticate locally with Git Credential Manager or `gh auth login`, then rerun. Do not paste tokens into website files or chat.

For later updates:

```sh
npm test
npm run check
npm run build
git add index.html assets README.md docs scripts package.json package-lock.json
git commit -m "Update portfolio content"
git push origin main
```

Wait for the Pages build to finish and inspect the live URL. Browser QA artifacts, audit clones, installed dependencies, and experimental data are not published. Only public project evidence and owner-supplied biographical details appear on the website.
