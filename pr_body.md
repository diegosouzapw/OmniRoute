## Summary

Migrates the application to prioritize local SVG icons over fetching from LobeHub or falling back to static PNGs.

## Problem

Built-in providers currently rely on third-party remote assets (LobeHub) or pixelated static PNG files. This introduces unnecessary network latency, potential visual degradation on high-res displays, and a point of failure if the external registry is unreachable.

## Files changed

- **`src/shared/components/ProviderIcon.tsx`** � Updates the resolution chain to prioritize local SVG assets, while safely preserving custom `src` overrides (from #2166) and downstream fallbacks.
- **`public/providers/*.svg`** � Adds 100+ local, crisp SVG icons for built-in providers.
- **`public/providers/*.png`** � Removes obsolete PNG fallbacks for providers that now have SVGs.

## Test Plan

- Unit/Integration tests pass (verified explicit `any` budget and tracked artifacts CI gates locally).
