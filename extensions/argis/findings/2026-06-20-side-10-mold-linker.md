# SOTA — mold for Cargo Linker Acceleration (side-10)

**Date:** 2026-06-20 10:35 UTC
**Task ID:** side-10
**Agent:** orch-v11-real-research-5
**Verdict:** **Adopt** in dev and CI. ~2-5x link time improvement on Linux; smaller wins on macOS (lld is fine there).

## What mold is (2026-06)
mold (https://github.com/rui314/mold) is a drop-in linker replacement that achieves near-parallel link performance on multi-core machines. It supports x86_64 and aarch64, ELF and Mach-O. In Rust, you wire it via `.cargo/config.toml`:

```toml
[target.x86_64-unknown-linux-gnu]
linker = "clang"
rustflags = ["-C", "link-arg=-fuse-ld=mold"]
```

For macOS the canonical alternative is `zld` or the system `lld` via `RUSTFLAGS="-C link-arg=-fuse-ld=lld"`.

## Fleet relevance
- `pheno` monorepo (Rust workspace with 17+ crates): full `cargo build --workspace` link time is the bottleneck on cold CI.
- Per-crate dev iteration: incremental links are already small, but full clean builds dominate CI minutes.
- macOS (M-series) hosts: `lld` is bundled with Xcode CLT; `mold` is not. For local Mac development, `lld` is good enough.

## Concrete recommendations
1. **Linux CI (GHA runners)**: install `mold` via `apt-get install -y mold`; set `RUSTFLAGS="-C link-arg=-fuse-ld=mold"`. Expect 2-5x link speedup.
2. **macOS dev**: `lld` (via `brew install llvm`). Marginal but real.
3. **Local config**: add to `pheno/.cargo/config.toml` (already exists; layer it on). Use a `target.cfg.toml` overlay so Windows devs don't accidentally hit it.
4. **Don't use mold on Windows**: there is no port. Windows devs get `lld-link` via Visual Studio Build Tools.

## What it is NOT a fit for
- Production release builds: rust-lld is already embedded in the rustc toolchain and is fine. mold is a dev/CI optimization, not a runtime one.
- Embedded / cross-compile: mold only supports host-target.

**Refs:** `pheno/.cargo/config.toml`, `pheno` monorepo CI workflow.
