# Motion Design System

## Duration Tokens

| Token | Duration | Curve | Usage |
|-------|----------|-------|-------|
| `--motion-duration-instant` | 0ms | — | No animation, immediate state change |
| `--motion-duration-fast` | 100ms | ease-out | Micro-interactions, hover states, button press |
| `--motion-duration-normal` | 200ms | ease-in-out | Standard transitions, panel open/close |
| `--motion-duration-slow` | 400ms | ease-out | Emphasis transitions, page transitions |
| `--motion-duration-expressive` | 600ms | ease-out | Hero animations, onboarding sequences |

## Easing Curves

| Token | Curve | Feel |
|-------|-------|------|
| `--motion-easing-linear` | cubic-bezier(0, 0, 1, 1) | Mechanical, progress bars |
| `--motion-easing-standard` | cubic-bezier(0.4, 0, 0.2, 1) | Natural, default for most UI |
| `--motion-easing-decelerate` | cubic-bezier(0, 0, 0.2, 1) | Elements entering viewport |
| `--motion-easing-accelerate` | cubic-bezier(0.4, 0, 1, 1) | Elements leaving viewport |
| `--motion-easing-spring` | cubic-bezier(0.34, 1.56, 0.64, 1) | Playful, notifications |

## Motion Categories

### Micro-interactions (≤100ms)
- Hover/focus state transitions
- Button press feedback
- Checkbox toggle
- Tooltip show/hide

### Transitions (200ms)
- Panel open/close
- Dropdown expand/collapse
- Tab switch
- Accordion expand
- Sidebar slide

### Page-level (400ms)
- Route transitions (with `next/navigation`)
- Modal overlay fade
- Toast entrance/exit

### Expressive (600ms+)
- Loading skeleton reveal
- Onboarding step transitions
- Celebration confetti

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- All interactive animations MUST respect `prefers-reduced-motion: reduce`
- On reduced motion: snap to end state, use opacity transitions only
- Never disable essential movement (loading spinner, progress bar) — slow instead
