# 0001 — Record architecture decisions

> Status: **Accepted** (template)
> Date: 2026-06-08

## Context

We need to record architecture decisions so future contributors understand *why*
the codebase is shaped the way it is. This is the MADR template.

## Decision

We use the [MADR](https://adr.github.io/madr/) (Markdown Any Decision Records)
format for all architecture decision records. The template is:

```markdown
# NNNN — Short title

> Status: Proposed | Accepted | Superseded by NNNN | Deprecated
> Date: YYYY-MM-DD
> Deciders: …

## Context

What is the issue we're deciding? What forces are at play?

## Decision

What did we decide?

## Consequences

What becomes easier or harder because of this change?

## Alternatives Considered

What other options were on the table? Why were they rejected?

## Cross-References

Links to related docs, PRs, code, etc.
```

## Consequences

- Easy to grep (`grep -r "^# [0-9]" docs/adr/`)
- New contributors can follow the chain of decisions
- ADR-0000 or this one (0001) is the bootstrap

## Cross-References

- (none — this is the first)
