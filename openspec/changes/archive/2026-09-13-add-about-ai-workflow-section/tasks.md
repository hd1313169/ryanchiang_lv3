## 1. Content data

- [x] 1.1 Add an `aiWorkflow` array literal to `src/pages/about.astro` (same pattern as `skills`/`experience`) with the six steps' title and description text, in order 01-06, and verify it renders as plain data with no missing fields

## 2. Markup

- [x] 2.1 Add a new `<section>` between the `.skills-band` section and the "工作經歷" `.section-row` in `src/pages/about.astro`, using the existing `.section-heading` markup (icon + `<h2>AI 應用實踐高效設計</h2>` + rule) plus one lead-in sentence, and verify it appears in that position in the rendered page
- [x] 2.2 Render the six steps as a list of step cards with visible numbering (01-06) plus title and description, and verify all six render with correct copy and order in the DOM (view-source or dev tools, independent of CSS)
- [x] 2.3 Add the arrow/connector elements between cards (5 horizontal arrows across the two rows, 1 row-transition connector for desktop, 2 vertical connectors for mobile) as their own DOM nodes, following `.workflow-arrow`'s precedent, and verify each connector element exists in the DOM

## 3. Desktop layout (≥40em)

- [x] 3.1 Style the section as a 3-column × 2-row CSS Grid so steps 01-03 form row 1 and 04-06 form row 2, and verify the grid renders 3 columns at a ≥40em viewport
- [x] 3.2 Style the horizontal arrows to sit between same-row cards pointing right, and verify arrows appear between 01→02, 02→03, 04→05, 05→06
- [x] 3.3 Style the row-transition connector between 03 and 04, and verify it is visible only at ≥40em and visually bridges the two rows

## 4. Mobile layout (<40em)

- [x] 4.1 Switch the grid to 2 columns at <40em and verify steps 01-02 form row 1, 03-04 form row 2, 05-06 form row 3
- [x] 4.2 Apply CSS `order` (or equivalent grid placement) so row 2 renders with 04 in the left column and 03 in the right column, while the underlying DOM order remains 01→02→03→04→05→06, and verify both the rendered column positions and the DOM order (via dev tools/inspect, independent of CSS) match
- [x] 4.3 Mirror the row 2 horizontal arrow to point left, and verify it visually points toward the left column at <40em
- [x] 4.4 Add the two vertical connectors (below 02 going into 03, below 04 going into 05) and verify both appear only at <40em in the correct positions

## 5. Cross-cutting checks

- [x] 5.1 Verify keyboard/no-JS/no-CSS fallback: with CSS disabled, confirm the six steps still read in order 01→06 in the raw document flow
- [x] 5.2 Verify `prefers-reduced-motion` compatibility: if any entrance/reveal animation is added to the new section's cards, confirm it follows the same reduced-motion guard pattern already used elsewhere in `about.astro` (e.g. `.skill-enter`, `.reveal`)
- [ ] 5.3 Visually check the section at a phone-width viewport (~400px), a tablet-width viewport (~800px), and a desktop-width viewport (≥1280px) to confirm no horizontal overflow and correct arrow directions at each
- [x] 5.4 Run `openspec validate add-about-ai-workflow-section --strict` and confirm it passes
