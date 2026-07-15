# Auto-Update Mechanism

> Decision record: How OmniRoute desktop app auto-updates.

## Status

**Draft** — 2026-07-09

## Context

The Electron desktop app needs automatic updates for users who installed via
downloadable installer (not npm/pip).

## Options

### Option A: electron-updater (Recommended)

`electron-updater` works with electron-builder. Supports:
- GitHub Releases (current release workflow)
- S3
- Generic HTTP server

**Pros:**
- Zero-config with GitHub Releases
- Differential updates (small download)
- Delta updates for .appImage / .dmg
- Works on macOS, Windows, Linux

**Cons:**
- Requires code signing for macOS auto-update

### Option B: Squirrel

Windows-only, deprecated.

### Option C: Manual check

User downloads new version manually. Not acceptable for production.

## Decision

**Adopt Option A (electron-updater with GitHub Releases).**

## Implementation

1. Install: `npm install electron-updater` (already in dependencies)
2. Configure: `electron-builder.yml` with `publish: github`
3. Wire: `app.on('ready')` → `autoUpdater.checkForUpdates()`
4. Notify: Show update dialog when available

## Releases

Published Electron releases use the same `v*` tags as the server release.
`electron-updater` checks the GitHub Releases API for new versions.
