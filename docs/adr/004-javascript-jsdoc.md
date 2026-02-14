# ADR-004: JavaScript + JSDoc over TypeScript

**Date:** 2025-10-01  
**Status:** Accepted  
**Deciders:** @diegosouzapw

## Context

The project needs type safety and developer experience improvements. Options:

1. **Full TypeScript migration** — `.ts` files, `tsconfig.json`, build step
2. **JavaScript + JSDoc + @ts-check** — type checking without compilation
3. **No type checking** — status quo

## Decision

Adopt **JavaScript with JSDoc annotations and `@ts-check`** instead of migrating to TypeScript.

- Add `// @ts-check` to critical module files
- Use JSDoc `@param`, `@returns`, `@typedef` for type documentation
- TypeScript compiler used only for checking (via IDE), not for building
- Zod schemas for runtime validation at API boundaries

## Consequences

### Positive

- No build step — `node src/proxy.js` runs directly
- Faster development iteration (no compile wait)
- Gradual adoption — files can be annotated one at a time
- IDE still provides autocomplete and type errors via JSDoc
- Lower barrier for contributors

### Negative

- JSDoc type syntax is more verbose than TypeScript
- Some advanced TypeScript features (generics, conditional types) are harder in JSDoc
- No `.d.ts` generation for consumers

### Neutral

- Existing Zod schemas provide runtime validation regardless of type system choice
- `@ts-check` can be added to any file without affecting others
