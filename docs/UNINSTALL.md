# OmniRoute — docs/UNINSTALL Guide

🌐 **Languages:** 🇺🇸 [English](UNINSTALL.md) | 🇧🇷 [Português (Brasil)](i18n/pt-BR/docs/UNINSTALL.md) | 🇪🇸 [Español](i18n/es/docs/UNINSTALL.md) | 🇫🇷 [Français](i18n/fr/docs/UNINSTALL.md) | 🇮🇹 [Italiano](i18n/it/docs/UNINSTALL.md) | 🇷🇺 [Русский](i18n/ru/docs/UNINSTALL.md) | 🇨🇳 [中文 (简体)](i18n/zh-CN/docs/UNINSTALL.md) | 🇩🇪 [Deutsch](i18n/de/docs/UNINSTALL.md) | 🇮🇳 [हिन्दी](i18n/in/docs/UNINSTALL.md) | 🇹🇭 [ไทย](i18n/th/docs/UNINSTALL.md) | 🇺🇦 [Українська](i18n/uk-UA/docs/UNINSTALL.md) | 🇸🇦 [العربية](i18n/ar/docs/UNINSTALL.md) | 🇯🇵 [日本語](i18n/ja/docs/UNINSTALL.md) | 🇻🇳 [Tiếng Việt](i18n/vi/docs/UNINSTALL.md) | 🇧🇬 [Български](i18n/bg/docs/UNINSTALL.md) | 🇩🇰 [Dansk](i18n/da/docs/UNINSTALL.md) | 🇫🇮 [Suomi](i18n/fi/docs/UNINSTALL.md) | 🇮🇱 [עברית](i18n/he/docs/UNINSTALL.md) | 🇭🇺 [Magyar](i18n/hu/docs/UNINSTALL.md) | 🇮🇩 [Bahasa Indonesia](i18n/id/docs/UNINSTALL.md) | 🇰🇷 [한국어](i18n/ko/docs/UNINSTALL.md) | 🇲🇾 [Bahasa Melayu](i18n/ms/docs/UNINSTALL.md) | 🇳🇱 [Nederlands](i18n/nl/docs/UNINSTALL.md) | 🇳🇴 [Norsk](i18n/no/docs/UNINSTALL.md) | 🇵🇹 [Português (Portugal)](i18n/pt/docs/UNINSTALL.md) | 🇷🇴 [Română](i18n/ro/docs/UNINSTALL.md) | 🇵🇱 [Polski](i18n/pl/docs/UNINSTALL.md) | 🇸🇰 [Slovenčina](i18n/sk/docs/UNINSTALL.md) | 🇸🇪 [Svenska](i18n/sv/docs/UNINSTALL.md) | 🇵🇭 [Filipino](i18n/phi/docs/UNINSTALL.md) | 🇨🇿 [Čeština](i18n/cs/docs/UNINSTALL.md)

This guide covers how to cleanly remove OmniRoute from your system.

---

## Quick docs/UNINSTALL (v3.6.2+)

OmniRoute provides two built-in scripts for clean removal:

### Keep Your Data

```bash
npm run docs/UNINSTALL
```

This removes the OmniRoute application but **preserves** your database, configurations, API keys, and provider settings in `~/.omniroute/`. Use this if you plan to reinstall later and want to keep your setup.

### Full Removal

```bash
npm run docs/UNINSTALL:full
```

This removes the application **and permanently erases** all data:

- Database (`storage.sqlite`)
- Provider configurations and API keys
- Backup files
- Log files
- All files in the `~/.omniroute/` directory

> ⚠️ **Warning:** `npm run docs/UNINSTALL:full` is irreversible. All your provider connections, combos, API keys, and usage history will be permanently deleted.

---

## Manual docs/UNINSTALL

### NPM Global Install

```bash
# Remove the global package
npm docs/UNINSTALL -g omniroute

# (Optional) Remove data directory
rm -rf ~/.omniroute
```

### pnpm Global Install

```bash
pnpm docs/UNINSTALL -g omniroute
rm -rf ~/.omniroute
```

### Docker

```bash
# Stop and remove the container
docker stop omniroute
docker rm omniroute

# Remove the volume (deletes all data)
docker volume rm omniroute-data

# (Optional) Remove the image
docker rmi diegosouzapw/omniroute:latest
```

### Docker Compose

```bash
# Stop and remove containers
docker compose down

# Also remove volumes (deletes all data)
docker compose down -v
```

### Electron Desktop App

**Windows:**

- Open `Settings → Apps → OmniRoute → docs/UNINSTALL`
- Or run the NSIS docs/UNINSTALLer from the install directory

**macOS:**

- Drag `OmniRoute.app` from `/Applications` to Trash
- Remove data: `rm -rf ~/Library/Application Support/omniroute`

**Linux:**

- Remove the AppImage file
- Remove data: `rm -rf ~/.omniroute`

### Source Install (git clone)

```bash
# Remove the cloned directory
rm -rf /path/to/omniroute

# (Optional) Remove data directory
rm -rf ~/.omniroute
```

---

## Data Directories

OmniRoute stores data in the following locations by default:

| Platform      | Default Path                  | Override                  |
| ------------- | ----------------------------- | ------------------------- |
| Linux         | `~/.omniroute/`               | `DATA_DIR` env var        |
| macOS         | `~/.omniroute/`               | `DATA_DIR` env var        |
| Windows       | `%APPDATA%/omniroute/`        | `DATA_DIR` env var        |
| Docker        | `/app/data/` (mounted volume) | `DATA_DIR` env var        |
| XDG-compliant | `$XDG_CONFIG_HOME/omniroute/` | `XDG_CONFIG_HOME` env var |

### Files in the data directory

| File/Directory       | Description                                       |
| -------------------- | ------------------------------------------------- |
| `storage.sqlite`     | Main database (providers, combos, settings, keys) |
| `storage.sqlite-wal` | SQLite write-ahead log (temporary)                |
| `storage.sqlite-shm` | SQLite shared memory (temporary)                  |
| `call_logs/`         | Request payload archives                          |
| `backups/`           | Automatic database backups                        |
| `log.txt`            | Legacy request log (optional)                     |

---

## Verify Complete Removal

After docs/UNINSTALLing, verify there are no remaining files:

```bash
# Check for global npm package
npm list -g omniroute 2>/dev/null

# Check for data directory
ls -la ~/.omniroute/ 2>/dev/null

# Check for running processes
pgrep -f omniroute
```

If any process is still running, stop it:

```bash
pkill -f omniroute
```
