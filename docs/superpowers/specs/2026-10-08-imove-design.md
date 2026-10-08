# TH79 iMove — design and architecture

Build a Vietnamese marketing website in the current workspace. A partial Next.js project is present; complete and refine it in place. The user explicitly requests continuous implementation, so design and plan review do not interrupt execution. Do not edit sibling projects or publish.

## Visual direction
UI UX Pro Max searches: `ride hailing app minimal red`, `vietnamese modern sans`, Next.js server components and reduced-motion UX. Adopt Minimalism & Swiss Style, product demo + features, Vietnamese-friendly Be Vietnam Pro. Override the suggested dark/blue palette with the user's light/red brand requirement. Palette: brand #d92736, hover #b91e2d, warm background #faf9f6, ink #242625, muted #626660, border #e6e6df. Large editorial headings, spacious 8px grid, restrained soft shadows, 24–32px card radii.

## Routes
`/`: hero, services, benefits, interactive ecosystem tabs, journey steps, FAQ, downloads CTA.
`/gioi-thieu`: purpose, approach and role of the TH79 ecosystem.
`/dich-vu`: motorbike, car, delivery, merchant services. Descriptive marketing copy requires business review before release; no invented pricing, ratings or operating metrics.
`/tinh-nang`: booking, route tracking, role-specific management, transparent journey.
`/he-sinh-thai/user`, `/driver`, `/merchant`: dedicated role pages and application links.
`/tai-ung-dung`: separate User/Driver/Merchant, separate iOS/Android controls.

## Architecture
Next.js App Router, TypeScript, Tailwind v4. Server pages and shared content data; client islands for navigation, ecosystem tabs, GSAP and R3F. Procedural original 3D models: branded car, scooter, floating phone, city blocks, animated route and map markers. Client-only lazy import of canvas. GSAP ScrollTrigger scrubs camera without hijacking scrolling. Pause offscreen/hidden and via visible controls. Render demand-only when paused/reduced motion. WebGL errors and unsupported devices use an accessible SVG city fallback. No externally fetched models, fonts or HDR files at runtime.

## Accessibility and responsive behavior
Vietnamese document language, skip link, semantic headings, visible keyboard focus, native FAQ details, keyboard-operable tabs, >=44px targets, contrast >=4.5:1 for normal text. Mobile menu supports Escape, closes on navigation. Responsive at 360, 390, 768, 1024, 1440 and landscape. Respect live changes to prefers-reduced-motion.

## Downloads
No official store listing has been verified for this exact TH79 iMove project. Never infer URLs or use unrelated iMove listings. Store records default to null. Unavailable store buttons open accessible release-information dialogs; QR codes encode the current website origin and the correct role anchor, with a local-preview caption for localhost. Activate external downloads only for exact HTTPS App Store / Google Play app URLs with role-specific verification evidence. Document how to add approved records.

## Acceptance
Lint, TypeScript, production build and download-policy tests pass. Local Chromium verifies actual WebGL frames, changing camera on scroll, motion pause, mobile navigation, tabs, FAQ, routes, no overflow and no browser runtime errors. Save screenshots for review. Start local development server and provide its address. No production deployment.
