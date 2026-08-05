# compression-core

Standalone Rust core for AI context optimization — tokenization, compression,
hashing, translation primitives. Independent OSS library usable by OmniRoute,
OpenCode, Cline, Roo, and any AI proxy. No OmniRoute imports anywhere.

## Layout

```
compression-core/
├── Cargo.toml            # workspace
├── crates/
│   ├── core-api/         # stable public API (traits + types) — no host deps
│   ├── tokenizer/        # tiktoken (cl100k_base, o200k_base) — PORTED
│   ├── tests/            # golden tests against fixtures/expected/
│   ├── bench/            # criterion benchmarks
│   └── ffi/              # N-API adapter (integration phase)
├── fixtures/
│   ├── tokenizer/        # JS-generated token counts (13 samples)
│   └── expected/         # manifests
└── scripts/
    ├── generate-fixtures.ts  # JS reference output (source of truth)
    └── verify-golden.ts      # regen + cargo test
```

## Porting order (per design)

1. tiktoken (done — golden 100%)
2. ionizer
3. headroom
4. caveman
5. RTK (last — biggest, requires proven harness)

## Golden pipeline

```text
fixtures → JS implementation → expected.json → Rust → assert_eq!
```

`node scripts/verify-golden.ts` regenerates fixtures from the current JS code
and runs `cargo test -p compression-tests`. Until 100% match, JS stays in prod.

## Measured baseline

| Impl | Input | Cost |
|---|---|---|
| JS js-tiktoken (cl100k) | 230K chars | 37.9 ms |
| Rust tiktoken-rs (cl100k) | ~440K chars | 21.4 ms |

Per-char Rust is ~3x faster; golden output is byte-identical on all fixtures.

## Status

- [x] workspace + stable API (`core-api`)
- [x] tokenizer port + golden tests (100% match)
- [x] bench harness (criterion)
- [ ] ionizer
- [ ] headroom
- [ ] caveman
- [ ] RTK
- [ ] N-API adapter
