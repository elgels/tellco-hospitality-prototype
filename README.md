# TellCo Hospitality & Real Estate — starter website

Private prototype prepared for employee handover. The homepage is populated; the other 23 pages intentionally contain only the shared shell and an accessible hidden page title. No production deployment is configured.

## Start here — prompts for Codex

1. Open this repository's local folder in Codex.
2. Ask: “Confirm this workspace's GitHub remote, branch, and status. Do not change anything.”
3. Ask: “Start the local preview with npm run preview and give me the localhost link.”
4. Ask: “Create a task branch from up-to-date main. Stop if there is unfinished work. Update only [specific section/page]. Edit the source files and rebuild the generated HTML.”
5. Review the preview on desktop and mobile. The default URL is http://127.0.0.1:4174/ and works only on the computer running the server.
6. Ask: “Run npm run build and npm test. Check links, images, keyboard navigation and mobile overflow. Show me the changes.”
7. Once approved: “Commit and push this task branch and open a pull request for review.” Merge only after approval.

## How the files work

- `src/home.html`: homepage prose and section layout.
- `src/content.mjs`: repeated cards, partner categories, hospitality navigation.
- `src/pages/*.html`: empty page bodies ready for your colleague.
- `src/partials/header.html` and `footer.html`: shared TellCoExperience shell. Edit once, then build all pages.
- `assets/css/tellco-shared.css`: imported corporate styles.
- `assets/css/hospitality.css`: hospitality content styling.
- `assets/js/site.js`: accessible corporate mobile menu and header behavior.
- `assets/images/`: three generated illustrative images, encoded as WebP.
- Root `*.html`: generated static pages, committed so hosting needs no Node runtime.

Do not edit generated root HTML directly: a rebuild overwrites it. Edit the matching source, run the build, and commit both source and generated output.

## Developer commands

Node 20 or newer; no third-party dependencies or npm install required.

- `npm run build` — build the homepage and all templates.
- `npm run preview` — serve locally on 127.0.0.1:4174. Ctrl+C stops it.
- `npm test` — validate local links/assets, single h1, prototype noindex, and absence of copied analytics.

The one-time `scripts/import-shell.mjs` is retained for provenance; do not rerun it during routine edits because it overwrites the shared partials and styles.

## What was reused and adapted

Corporate header/footer markup, logo, colors, icons and responsive menu came from TellCoExperience's local checkout. Corporate links use absolute TellCoExperience URLs; the new second navigation row is hospitality-specific. The footer's Solutions link points to the existing #solutions anchor.

The corporate mobile-menu breakpoint was raised from 1130px to 1350px in this separate project because the inherited full desktop navigation overflowed at intermediate widths. Its visual treatment and labels are unchanged.

Homepage information architecture follows the TellCo mining site: hero, quick overview, services, product platforms, sustainability, business models, property types, partner ecosystem, assessment CTA and newsletter.

Copy is based on Hospitality_PerplexityAI.docx supplied by the user. Treat the text as draft marketing copy requiring company approval, not verified specifications. Confirm product names, financing availability, performance claims and the legal entity name (the supplied text uses Sàrl, whereas the corporate footer uses Sagl).

## Images and placeholder features

Images were generated with the built-in image-generation tool, not photographs of actual TellCo installations. Visible captions disclose this. No third-party partner logos were added. See ASSETS.md for prompts and image provenance.

The newsletter is disabled and does not collect or transmit data. Assessment links lead to the blank contact template; no inquiry form exists yet. All 23 non-home pages are intentionally empty.

All pages contain noindex/nofollow because this is an unfinished prototype. This is not access control: the repository remains private, and the preview binds only to this computer.

## Handover and launch checklist

1. Agree transfer with the owner of the receiving company GitHub account. Confirm access for the successor and company control before removing your access.
2. After transfer, verify the new remote URL and update every local clone. Give IT the new repository URL.
3. Complete and approve placeholder content, product claims, image usage, privacy/legal material and contact details.
4. IT must confirm the exact Bluehost destination directory and hosting setup. Do not overwrite the existing TellCoExperience or mining site.
5. IT should configure deployment for the approved branch using least-privilege credentials stored as GitHub secrets, never in source files. Use a staging target first.
6. Enable HTTPS, verify relative assets under the intended subdirectory, add approved forms/newsletter services, spam protection, privacy notices and consent as needed.
7. Decide analytics and consent requirements; no analytics from TellCoExperience was copied.
8. Configure backups and rollback, reviewer access and branch protection where supported.
9. Remove noindex only when the site is approved for public launch; add production metadata, canonical URLs and sitemap.
10. Test every page, form, navigation link, mobile layout and keyboard interaction; then verify the live deployment.

There is intentionally no GitHub Actions deployment workflow, Bluehost configuration, production secrets, or inherited deployment automation.
