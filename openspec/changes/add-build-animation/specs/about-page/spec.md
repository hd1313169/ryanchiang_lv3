# Spec Delta

## MODIFIED Requirements

### Requirement: Sticky cover-scroll transition
On wider viewports, as a visitor scrolls from the skills section into the AI workflow section, the skills section SHALL remain pinned in place while the AI workflow section visually rises to fully cover it, before scrolling continues normally into the AI workflow section's own content. On narrow viewports, or whenever the skills section is taller than the viewport, this pin-and-cover transition SHALL be skipped so the skills section instead scrolls normally and all of its content remains reachable.

#### Scenario: Scrolling from skills into the AI workflow section on a wide viewport
- **WHEN** a visitor on a wide viewport scrolls down past the "我擅長的事" section
- **THEN** that section stays fixed in the viewport while the "AI 應用實踐高效設計" section slides up over it until it is fully covered, after which further scrolling moves through the AI workflow section as normal

#### Scenario: Scrolling from skills into the AI workflow section on a narrow viewport
- **WHEN** a visitor on a narrow viewport scrolls down through the "我擅長的事" section
- **THEN** the section scrolls normally (it is not pinned), so every item in it becomes visible before the "AI 應用實踐高效設計" section follows

#### Scenario: JavaScript disabled
- **WHEN** a visitor has JavaScript disabled and scrolls through the same region on a wide viewport
- **THEN** both sections scroll normally with no cover transition, and all content is visible

## REMOVED Requirements

### Requirement: Staggered card entrance
**Reason**: All About page entrance motion is replaced by the build animation.
**Migration**: The community cards appear through the build-from-zero entrance; each card is its own group, so they still build independently on mobile.
