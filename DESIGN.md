# Design System Document: Vanguard Editorial

## 1. Overview & Creative North Star
**Creative North Star: The Architectural Monograph**

This design system is not a mere collection of components; it is a digital manifestation of a high-end personal brand. The goal is to move away from the "template" feel of modern SaaS and toward the tactile, authoritative presence of a luxury architectural monograph or a premium financial journal.

The system breaks standard digital conventions through:
*   **Intentional Asymmetry:** Utilizing a rigorous grid but purposefully leaving large "voids" of whitespace to allow content to breathe.
*   **The Cinematic Scale:** Contrasting oversized, dramatic serif headlines against tiny, wide-tracked utilitarian meta-data.
*   **Physical Layering:** Treating the screen as a series of stacked, high-quality paper stocks rather than a flat digital canvas.

---

## 2. Colors: Tonal Depth & The No-Line Rule
The palette is rooted in heritage and stability, utilizing the "Financial Forest" green for authority and "Warm Parchment" for a premium, tactile feel.

### Surface Hierarchy & Nesting
Depth is achieved through background shifts, not outlines.
*   **Base Layer:** `surface` (#FBF9F4) – The default canvas.
*   **Sectioning:** To define a new content area, shift to `surface-container-low` (#F5F3EE).
*   **Floating Elements:** Use `surface-container-lowest` (#FFFFFF) for cards or panels that need to appear "lifted" off the page.
*   **Deep Contrast:** Use `primary-container` (#173124) for high-impact "interstitial" sections where white text (`on-primary`) provides a cinematic break in the scroll.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections or cards. Boundaries must be defined solely through background color shifts. If a visual break is needed, use a transition from `surface` to `surface-container`.

### The Glass & Gradient Rule
To prevent the UI from feeling "flat," use Glassmorphism for floating navigation or overlays:
*   **Token:** `surface-variant` at 70% opacity with a `20px` backdrop-blur.
*   **Signature Textures:** For primary CTAs, use a subtle radial gradient from `primary` (#021C10) to `primary-container` (#173124) to add a "lustre" that feels bespoke and metallic.

---

## 3. Typography: The Tension of Scale
This system relies on the interplay between the sharp, intellectual Newsreader serif and the technical, wide-tracked Manrope sans-serif.

*   **Display & Headlines (Newsreader):** These are the "hero" elements. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) to create an authoritative, editorial impact.
*   **Data & Labels (Manrope):** All functional text (labels, buttons, small captions) must use Manrope with increased letter-spacing (`0.05em` to `0.1em`). This creates a "luxury watch" aesthetic where the technical details feel as considered as the headlines.
*   **The Hierarchy of Truth:**
    *   **Serif:** For narrative, storytelling, and quotes.
    *   **Sans-Serif:** For facts, figures, navigation, and actions.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are too "digital." We utilize **Tonal Layering** and **Ambient Light**.

*   **The Layering Principle:** Stacking is the primary method of hierarchy. A `surface-container-highest` card sitting on a `surface` background creates a natural, soft-edge lift.
*   **Ambient Shadows:** If a floating effect is required (e.g., a dropdown), use a shadow with a 48px blur, 0px spread, and 4% opacity using the `on-surface` (#1B1C19) color. It should look like a soft glow, not a hard shadow.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use `outline-variant` (#C2C8C2) at **15% opacity**. It should be felt rather than seen.

---

## 5. Components: Sharpness & Precision

### Corner Radius
**The Zero-Radius Rule:** All components (Buttons, Cards, Inputs, Chips) must use a `0px` border radius. The system celebrates sharp, architectural lines.

### Buttons
*   **Primary:** `primary` background with `on-primary` text. No border. Manrope Medium, uppercase, 0.1em tracking.
*   **Secondary:** `surface` background with a `secondary` (#775A19) Ghost Border.
*   **Tertiary:** Text-only in `primary`. Hover state: A 1px underline in `secondary_fixed_dim`.

### Input Fields
*   **Styling:** No enclosing box. Use a 1px baseline in `outline-variant`. 
*   **Focus:** The baseline transitions to `primary` (#021C10) with a subtle vertical "bloom" animation.
*   **Typography:** Labels must be `label-sm` in Manrope, uppercase, wide-tracked.

### Cards & Lists
*   **Forbidden:** Divider lines. 
*   **Alternative:** Use generous vertical padding (`spacing-8` or `spacing-12`) and `surface-container` shifts. To separate list items, use a change in weight or a small `secondary` accent dot (the "Muted Clay" accent).

### Editorial Chips
*   Used for categorization. Rectangular (`0px` radius), `surface-container-high` background, `on-surface-variant` text in `label-sm`.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace the Void:** Use more whitespace than you think is comfortable. 
*   **Scale Contrast:** Pair a `display-lg` headline with a `label-sm` caption immediately adjacent to it.
*   **Monochromatic Foundations:** Build 90% of the UI in green and parchment; use the Gold/Clay (`secondary`) only for the "moment of truth" (CTAs or success states).

### Don’t:
*   **No Rounded Corners:** Never use a border-radius. It breaks the "Vanguard" architectural feel.
*   **No Heavy Borders:** Never use 100% opaque lines to separate content. Let the background colors do the work.
*   **No Generic Gradients:** Avoid "web 2.0" shiny gradients. Only use the subtle tonal shifts described in the Signature Textures section.
*   **No Center-Alignment for Long Copy:** Keep the editorial feel with left-aligned, grid-anchored typography. Center alignment is reserved only for high-drama pull quotes.

### Accessibility Note:
While we use tonal shifts, ensure the contrast between `surface` and `surface-container` tiers remains distinguishable for users with visual impairments. Use the `outline-variant` Ghost Border at 20% opacity if necessary to pass WCAG AA standards in complex data views.