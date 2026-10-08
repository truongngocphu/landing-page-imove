# TH79 iMove design system

Source: UI UX Pro Max local searches on 2026-10-08. Minimalism & Swiss Style and Product Demo + Features fit a transport ecosystem. Brand palette and light theme override generic dark-map recommendations.

## Tokens
| Semantic token | Value | Purpose |
|---|---|---|
| brand | #d92736 | Primary CTA, logo, routes |
| brand-hover | #b91e2d | Hover / pressed |
| canvas | #faf9f6 | Warm light background |
| surface | #ffffff | Cards and navigation |
| ink | #242625 | Headings and body |
| muted | #626660 | Supporting copy |
| line | #e6e6df | Decorative dividers |
| tint | #fff0ef | Brand backgrounds |
| success | #397054 | Positive icon with text |

Be Vietnam Pro 400/500/600/700, locally served with font-display swap. Display size clamp(44px, 5.1vw, 76px), section title clamp(32px, 3.3vw, 48px), body 16px/1.7. Heading tracking -0.045em. Container 1280px, gutters 24px mobile / 48px desktop. Spacing 4/8/16/24/32/48/64/96/120px. Radius 12px button, 24px card, 32px feature panel, full pills. Motion 180ms feedback, 700ms reveal, 0.7s camera scrub. Keyboard focus 3px brand outline with 4px offset.

## Components
Primary red button, quiet outlined secondary button, numbered service cards, segmented ecosystem tabs, native FAQ accordion, separate role-specific store controls. Unverified store buttons open release-information dialogs; QR links point to the current website and role anchor. Lucide icons only, decorative SVGs aria-hidden. One primary action per composition. No fabricated social proof. Final layout uses a 1320px container, display headings up to 80px, monospaced section labels, a local CSS app preview, and a restrained charcoal partner section within the predominantly light website.

## Motion and performance
Client-only lazy R3F. Maximum DPR 1.5 desktop / 1 mobile. Procedural meshes and local canvas texture. GSAP camera scroll/parallax only when motion is enabled. Canvas paused offscreen/hidden. SVG city retained when WebGL fails. All text remains accessible independently of 3D. Visible pause button. Reduced motion disables scrub, float and reveal.

## Verification
Inspect 360/390/768/1024/1440px plus landscape, no horizontal scroll, touch targets >=44px, body contrast >=4.5:1, keyboard menu/tabs/FAQ, WebGL render/camera change/pause, link allowlist and role evidence.
