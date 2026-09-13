---
name: Cloud Engineer Journey
description: A practical cloud engineering journal — clean, minimal, monochrome.
colors:
  primary: "#171717"
  neutral-bg: "#ffffff"
  neutral-muted: "#6b7280"
  neutral-border: "#e5e7eb"
  dark-bg: "#0a0a0a"
  dark-foreground: "#ededed"
  dark-muted: "#9ca3af"
  dark-border: "#374151"
typography:
  display:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 3.125rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  body:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.625
  caption:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.2em"
    textTransform: "uppercase"
  mono:
    fontFamily: "var(--font-geist-mono), ui-monospace, monospace"
    fontSize: "0.875rem"
    lineHeight: 1.6
rounded:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  full: "9999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  px-6: "1.5rem"
  max-w-3xl: "48rem"
  max-w-4xl: "56rem"
components:
  btn-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.full}"
    padding: "0.75rem 1.5rem"
  tag-pill:
    backgroundColor: "{colors.primary}/10"
    textColor: "{colors.primary}/75"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.75rem"
  card-container:
    backgroundColor: "{colors.primary}/2"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
  input-field:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 0.75rem"
---

# Design System: Cloud Engineer Journey

## Overview

**Creative North Star: "The Engineering Notebook"**

This is a working engineer's notebook rendered as a website — clean, intentional, and unhurried. Every element serves comprehension first; nothing competes for attention. The visual language strips away ornamentation, leaving only what helps readers absorb technical content and authors document their progress without distraction.

Light mode is maximum-contrast white-on-off-white, like ink on fresh paper. Dark mode inverts into zinc charcoal on deep zinc, like a terminal session at midnight. No accent color distracts from the work. Depth comes from tonal layering — subtle background shifts, borders, and hover states rather than shadows or gradients.

The result is calm authority: it feels like someone who does real work wrote it, not someone trying to prove they can design.

**Key Characteristics:**
- Strictly monochrome — black, white, grays; no hue whatsoever
- Tonal depth over decorative elevation — cards use opacity-shifted backgrounds, not drop shadows
- Large type scales create hierarchy through size contrast alone
- Pill-shaped tags and buttons add warmth against sharp-edged cards
- Code blocks are the sole splash of syntax-highlighted color — and that color stays within the GitHub/GitHub Dark palette

## Colors

A disciplined grayscale palette where value is the only variable. Contrast is high by default and preserved across both themes.

### Primary

- **Onyx** (`#171717` / light mode): The dominant foreground — headings, body text, links, interactive elements. In dark mode, this role shifts to `#ededed`. Its near-black density signals importance without the coldness of pure #000000.
- **Carbon** (`#0a0a0a` / dark mode bg): The dark canvas. Pure blacks would feel too harsh; this zinc-950 base softens while maintaining maximum contrast against the foreground.

### Neutral

- **Zinc-500** (`#6b7280` / light muted): Secondary text — dates, reading time, meta information. Low enough to recede, high enough to read comfortably. In dark mode, elevated to `#9ca3af` (zinc-400).
- **Zinc-200** (`#e5e7eb` / light border): Subtle structural boundaries — card edges, section dividers, input fields. Thin and unobtrusive. In dark mode, tightened to `#374151` (zinc-700).
- **Foreground ghost** (`rgba(#171717, 0.02)` / light card bg): Ultra-subtle card background on light mode — barely perceptible but creates the surface distinction needed for hover lift effects. Equivalent in dark mode uses the same pattern inverted.

### Named Rules

**The Zero-Hue Rule.** No chromatic color appears in the design system except inside syntax-highlighted code blocks, which inherit the GitHub Prism palette. Any new component must justify why introducing hue is necessary; absence is the default position.

## Typography

Two families, one purpose: readability at every scale.

**Display Font:** Geist Sans (with `system-ui, sans-serif` fallback)  
**Body Font:** Geist Sans (same family)  
**Mono Font:** Geist Mono (for code and technical notation)

Geist was chosen specifically for its clarity at small sizes, generous x-height, and modern sans-serif geometry. The mono variant maintains visual alignment with the sans throughout headings, captions, and code contexts.

### Hierarchy

- **Display** (700, `clamp(2.5rem, 6vw, 3.75rem)`, 1.1): Homepage hero title only. Tight tracking (`-0.02em`) gives it a condensed, editorial presence.
- **Headline** (700, `clamp(1.75rem, 4vw, 3.125rem)`, 1.15): Page titles (Blog heading, post titles). Same bold weight as Display but slightly looser tracking for approachability.
- **Title/Lead** (600, 1.25rem–1.5rem, tight): Blog card headings, section labels. Medium-weight emphasis that reads quickly without shouting.
- **Body** (400, 1rem, 1.625): Standard prose via Tailwind's `prose` class. Line length kept to ~65–75 characters through the `max-w-none` prose modifier on article pages. Paragraph color is `foreground/85` — slightly softened from solid black.
- **Caption** (600, 0.875rem, 1.4, 0.2em letter-spacing, uppercase): Overline labels ("A PRACTICAL CLOUD ENGINEERING JOURNAL", "NOTES FROM THE CLOUD", "CLOUD ENGINEERING NOTES"). Consistent spacing and weight make these visual signposts regardless of page context.
- **Mono** (400, 0.875rem, 1.6): Inline code, code blocks, technical notation. The monospace face signals "this is executable or configuration content" before the reader processes the words.

### Named Rules

**The Weight-Through-Size Rule.** Bold type is reserved for headlines and CTAs only. Body copy never exceeds regular weight — hierarchy comes from scale and color contrast, not font weight variations in paragraph text.

## Layout

A single-column spine with a consistent rhythm. The visual system trusts whitespace as an organizational tool rather than filling gaps with decorative dividers or backgrounds.

- **Container widths:** Content pages use `max-w-3xl` (48rem) for individual posts and `max-w-4xl` (56rem) for the blog index. The homepage hero sits in `max-w-3xl` with centered alignment.
- **Horizontal padding:** `px-6` (1.5rem) on all pages, consistent across breakpoints. On larger screens, the container limits width; on smaller screens, padding prevents edge-to-edge content.
- **Vertical rhythm:** Generous top/bottom spacing — `py-14`/`py-20` on listing pages, `py-10`/`py-14` on posts. Nothing feels cramped.
- **Grid structure:** The blog index uses a two-column grid (`sm:grid-cols-2`) at medium breakpoints, collapsing to single-column below. Cards are evenly spaced with `gap-5` (~20px).
- **Navigation/header bar:** Fixed-width nav centered with `max-w-3xl mx-auto`, left-aligned brand, right-aligned theme toggle. Minimal height — just enough for comfortable touch targets.
- **Footer:** Full-width banner, centered text, small caption-size font. It exists and disappears until you notice it.

## Elevation & Depth

Flat-by-default with lift-only state responses. No drop shadows are used anywhere in the system.

Depth is conveyed exclusively through three mechanisms:

1. **Tonal layering** — Cards sit on `bg-foreground/[0.02]` (light) or its equivalent in dark mode, creating a barely-visible surface distinct from the page background.
2. **Border intensity** — Default state uses `border-border/60` (60% opacity). On hover, the border intensifies to `border-foreground/30` (30% opacity of the strong foreground), signaling interactivity without adding visual weight.
3. **Translational movement** — Cards shift up by `-translate-y-1` (-4px) on hover, creating physical separation from the page plane. The shadow property is explicitly avoided; the combination of vertical shift + intensified border is sufficient.

No element accumulates multiple elevation treatments simultaneously. Hover state = one translation + one border change + one background shift. Never more.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows do not exist in this system. State changes are communicated through precise, measured adjustments — a lift, a color shift, a border tighten. If it requires a box-shadow declaration, it's wrong for this system.

## Shapes

A deliberate mix of sharp and curved geometry. Cards and containers use generous corner radii; inputs and pagination maintain moderate rounding; interactive pills go fully circular.

- **Card corners** — `rounded-2xl` (1rem / 16px). Rounded enough to feel open and friendly, sharp enough to retain structural clarity. This is the largest radius used for any container.
- **Input/select/pagination** — `rounded-lg` (0.5rem / 8px). Functional controls carry moderate rounding that signals "interactive field" without competing with card shapes.
- **Pills/tags/buttons** — `rounded-full` (9999px). Tag pills and the primary CTA button are fully pill-shaped, creating the strongest form-language contrast in the system. Curves soften the overall rigidity of the monochrome layout.
- **Borders:** All structural lines use `1px` solid strokes with semantic color tokens. Dashed borders appear only on empty-state placeholders (`border-dashed`).
- **Clipping:** No image clipping beyond standard border-radius; no asymmetric curves or clip-path polygons.

## Components

### Primary Button (CTA)
- **Shape:** Fully pill-shaped (`rounded-full`)
- **Color:** Inverted — dark background (`bg-foreground`) with light text (`text-background`)
- **Padding:** 12px vertical × 24px horizontal
- **Hover:** Opacity drops to 85%, color swap only — no background change
- **Behavior:** The sole conversion point on every surface (homepage → blog, blog → post). There is exactly one per page.

### Blog Card
- **Shape:** `rounded-2xl` (16px) with subtle border
- **Background:** `bg-foreground/[0.02]` (ultra-light tone on white; similar in dark)
- **States:** On hover — translate up 4px, border intensifies to `foreground/30`, background shifts to `foreground/[0.05]`, card title transitions from foreground to muted-foreground
- **Structure:** Date + reading time at top, title in middle (flex-grows via `mt-auto`), tags pinned to bottom
- **Interaction:** Entire card is clickable via an absolutely-positioned link overlay; tags are additional interactive targets
- **Inner padding:** 24px all sides

### Tag Pills
- **Shape:** Fully pill-shaped (`rounded-full`)
- **Color:** Background `foreground/10` (10% opacity of primary), text `foreground/75` (75% opacity)
- **Padding:** 4px vertical × 12px horizontal
- **Hover:** Background shifts to `foreground/20` (darker)
- **Usage:** Tag filtering, metadata badges on posts — always lowercase with `#` prefix

### Input Fields
- **Shape:** `rounded-lg` (8px) with border
- **Color:** White/invert background, colored border matching semantic token
- **Focus:** Border transitions to `border-foreground/50` (50% opacity)
- **Placeholder:** Muted foreground color
- **Padding:** 8px horizontal × 8px vertical

### Pagination
- **Shape:** `rounded-lg` (8px)
- **Active state:** `bg-foreground text-background` (inverted fill)
- **Inactive state:** Muted foreground, hover adds background tint
- **Sizing:** Fixed 36px height × minimum 36px width, compact padding
- **Disabled:** Reduced opacity (40%), no hover interaction

### Theme Toggle
- **Shape:** Fully pill-shaped (`rounded-full`)
- **Icon:** Sun/Moon pair from Lucide React (16px)
- **Hit area:** 36×36px
- **Hover:** Circular background ring at `foreground/10` opacity
- **Behavior:** Resolves system preference, toggles between dark/light classes on `<html>`

### Navigation Header
- **Structure:** Single row, brand name left, theme toggle right
- **Typography:** Brand at 18px bold, tight tracking
- **Divider:** Bottom border at 1px, `border-border/20` (subtle, 20% opacity)
- **Height:** Content-dependent, approximately 56–64px

### Article Footer
- **Structure:** Top-bordered section (`border-t border-border/60`) separating post body from publication metadata
- **Typography:** Small caption size, muted foreground
- **Content:** Publication date in plain sentence format

### Code Blocks (Prose-injected)
- **Shape:** `rounded-xl` (12px / 0.75rem) with border
- **Light mode:** Background `#f6f8fa` (GitHub Light inline-code), border uses semantic token
- **Dark mode:** Background `#161b22` (GitHub Dark inline-code), border inherits dark token
- **Padding:** 20px vertical × 20px horizontal
- **Syntax highlighting:** Inherits GitHub Prism theme — keywords in red/orange, strings in green, numbers in blue, comments in gray (both light and dark variants)

## Do's and Don'ts

### Do:
- **Do** let whitespace breathe — generous margins and padding are features, not wasted space
- **Do** use tonal shifts for state changes — hover lifts, background opacity changes, and border intensifications are the primary interaction vocabulary
- **Do** reserve bold weight for headlines and interactive CTAs only; body text should remain regular weight
- **Do** maintain strict monochrome outside of code blocks — the syntax highlight colors are the system's sanctioned exception
- **Do** keep tag pills lowercase with the `#` prefix consistently
- **Do** use `clamp()` for fluid typography scaling across viewports

### Don't:
- **Don't** add drop shadows anywhere — depth is achieved through layering, lift, and border modulation
- **Don't** introduce chromatic color to UI elements — backgrounds, borders, icons, text, or accents. The zero-hue rule is firm.
- **Don't** stack elevation treatments — hover state gets ONE lift, ONE border change, ONE background shift. Not all three plus a shadow.
- **Don't** exceed `max-w-3xl` for reading content — line length matters for comprehension
- **Don't** use heavy or decorative font weights (800, 900) — 700 is the ceiling
- **Don't** replace the GitHub syntax-highlight palette — code block colors are part of the system identity
