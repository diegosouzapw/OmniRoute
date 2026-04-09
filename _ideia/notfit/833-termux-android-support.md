# Feature: Native Termux (Android/arm64) Support

> GitHub Issue: #833 — opened by @marojiro on 2026-03-30
> Status: 📋 Cataloged | Priority: Medium
> Duplicate of: #821 (92% similarity per Kilo)

## 📝 Original Request

OmniRoute can't run on Termux (Android/arm64) due to three blockers:

1. **`keytar` fails to compile** on Node 22+ — useless on Android (no system keychain)
2. **`better-sqlite3` missing `binding.gyp`** — bundled binary is x86_64, can't rebuild without sources
3. **`isNativeBinaryCompatible()` rejects Android** — `process.platform` returns "android" but ELF binary is detected as "linux"

### Proposed Fix for #3
```javascript
// Before:
if (target.platform !== runtimePlatform || ...
// After:
if ((target.platform !== runtimePlatform && !(target.platform === "linux" && runtimePlatform === "android")) || ...
```

## 💬 Community Discussion
- @kilo-code-bot flagged duplicate of #821

## 🎯 Refined Feature Description

Three concrete, small changes to unblock Termux users:

### What it solves
- OmniRoute unusable on Android devices (Termux)
- Growing mobile developer use case (coding on tablets/phones)

### How it should work
1. Make `keytar` optional with try/catch wrapper
2. Ensure `better-sqlite3` can be rebuilt from source on arm64
3. Treat `android` as equivalent to `linux` in platform checks

### Affected areas
- `scripts/native-binary-compat.mjs` — platform check fix (one-liner)
- `package.json` — make keytar optional dependency
- Docker/build — ensure better-sqlite3 sources are included

## 🔗 Related Ideas
- Duplicate of #821 — consolidate fixes
