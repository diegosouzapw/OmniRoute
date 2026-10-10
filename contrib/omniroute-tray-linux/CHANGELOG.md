# Changelog

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and
this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-09-19

First public release.

### Added

- Native KDE Plasma 6 plasmoid with a tabbed popover (server, monitor, diagnostics, updates).
- Universal PySide6 system tray for GNOME, XFCE, Cinnamon, MATE, LXQt, and tiling
  Wayland/X11 compositors (Hyprland, Sway, i3).
- Process supervision that adopts an already-running daemon on port `20128` instead of
  spawning a duplicate.
- Provider health, circuit-breaker, quota, spend (1d/7d/30d), and 30-day trend telemetry.
- Doctor diagnostics and a live log viewer.
- Updates center: tray self-update from GitHub plus server release checks against npm.
- Single-instance protection and XDG desktop autostart.
- One-line installer and a dedicated uninstaller with `--purge`.

### Changed

- Aligned the plasmoid version with the tray version (`TRAY_VERSION`).
- Condensed the README; documented `hidden_sections` and the full `cost_range` values.

### Removed

- Unused `TrayIntegrationService` class, superseded by `TrayApp`.

### Fixed

- Process cleanup no longer uses broad `pgrep -f` / `pkill -f` matching, which could
  signal unrelated processes whose command line merely mentioned `omniroute serve` or the
  tray filename. Matching is now positional against `/proc/<pid>/cmdline`.
- Added a timeout to the server version check so a hung CLI cannot leak a worker thread.
- The tray log now rotates to `omniroute-tray.log.1` at 1 MiB instead of growing unbounded.

[1.1.0]: https://github.com/Susanthakuri92/omniroute-tray-linux/releases/tag/v1.1.0
