# TH79 iMove implementation ledger

Plan: 2026-10-08-imove.md. Execute inline in the user's existing website directory.

- Baseline: partial Next.js source exists. Hero import and every secondary route are missing. Existing five download-policy tests pass; typecheck fails on the missing hero.
- Ruling: continue implementation without design approval pauses because the user explicitly requests continuous implementation and delegates design decisions.
- Ruling: no git repository is present and the user limits work to this folder. Do not create an external worktree or commit.
- Ruling: store URLs are unavailable (user answered no). Store buttons open an accessible release-info dialog; QR contains the actual website origin and role anchor, never a guessed app listing.
- Design: retain local Be Vietnam Pro and light/red/charcoal brand; original procedural models, no network model or HDR requests.
- Dependencies: added shadcn primitives and QR encoder. npm cache stays inside .cache/npm to respect filesystem scope.
- Verification will cover actual rendering, scroll camera, pause/reduced motion, WebGL failure, dialogs, all routes, mobile navigation, accessibility and production build.
- Tasks 1–3: complete. Config/dependencies, original geometry/texture, shared sections, all eight pages, shadcn dialogs/buttons and website QR implemented.
- Task 4: development browser suite passed. Fixed measured contrast failures; axe reports zero violations on all eight pages in the extended navigation suite.
- Final review: independent read-only reviewer found no Critical/Important issue and one menu-state finding. Regraded the menu finding as Important because it obscures destination content; reproduced with a failing real-browser navigation test, closed state for header navigation and verified it passes.
- Review limitation: software WebGL in Chrome is verified; real-phone/GPU performance and accessibility certification remain unmeasured.
- Quality fix: high-density mobile test reproduced DPR 1.5 instead of 1. Added adaptive cap and verified DPR 1; also verified denied WebGL context restores the fallback.
- Tasks 4–5: complete. Final production build passed; final production browser, navigation, quality and visual checks passed at http://127.0.0.1:3001. Unit tests: 5/5; lint and typecheck passed. Both development and local production previews remain available.
- Evidence: artifacts/browser-report.json, navigation-report.json, visual-report.json and accessibility reports; final desktop/mobile section screenshots inspected. No page/console errors in the browser suite and no axe violations on the eight pages audited.
- Audit: runtime dependencies clean; five high development-tool advisories in the lint dependency chain documented in README. No forced dependency downgrade.
