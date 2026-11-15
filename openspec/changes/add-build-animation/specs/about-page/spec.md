# Spec Delta

## REMOVED Requirements

### Requirement: Sticky cover-scroll transition
**Reason**: The CSS sticky cover between「我擅長的事」and「AI 應用實踐高效設計」conflicts with the build animation's scroll pinning. Both sections now use the scroll-driven build entrance.
**Migration**: Each section is pinned and built in turn per the build-animation capability's "Scroll-driven sections" requirement; the layout around these two sections may be adjusted to fit.

### Requirement: Staggered card entrance
**Reason**: All About page entrance motion is replaced by the build animation.
**Migration**: The community cards appear through the build-from-zero entrance; each card is its own group, so they still build independently on mobile.
