---
title: "OmniRoute — Przewodnik deinstalacji"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — Przewodnik deinstalacji

🌐 **Languages:** 🇺🇸 [English](./UNINSTALL.md) | 🇧🇷 [Português (Brasil)](../i18n/pt-BR/docs/guides/UNINSTALL.md) | 🇪🇸 [Español](../i18n/es/docs/guides/UNINSTALL.md) | 🇫🇷 [Français](../i18n/fr/docs/guides/UNINSTALL.md) | 🇮🇹 [Italiano](../i18n/it/docs/guides/UNINSTALL.md) | 🇷🇺 [Русский](../i18n/ru/docs/guides/UNINSTALL.md) | 🇨🇳 [中文 (简体)](../i18n/zh-CN/docs/guides/UNINSTALL.md) | 🇩🇪 [Deutsch](../i18n/de/docs/guides/UNINSTALL.md) | 🇮🇳 [हिन्दी](../i18n/in/docs/guides/UNINSTALL.md) | 🇹🇭 [ไทย](../i18n/th/docs/guides/UNINSTALL.md) | 🇺🇦 [Українська](../i18n/uk-UA/docs/guides/UNINSTALL.md) | 🇸🇦 [العربية](../i18n/ar/docs/guides/UNINSTALL.md) | 🇯🇵 [日本語](../i18n/ja/docs/guides/UNINSTALL.md) | 🇻🇳 [Tiếng Việt](../i18n/vi/docs/guides/UNINSTALL.md) | 🇧🇬 [Български](../i18n/bg/docs/guides/UNINSTALL.md) | 🇩🇰 [Dansk](../i18n/da/docs/guides/UNINSTALL.md) | 🇫🇮 [Suomi](../i18n/fi/docs/guides/UNINSTALL.md) | 🇮🇱 [עברית](../i18n/he/docs/guides/UNINSTALL.md) | 🇭🇺 [Magyar](../i18n/hu/docs/guides/UNINSTALL.md) | 🇮🇩 [Bahasa Indonesia](../i18n/id/docs/guides/UNINSTALL.md) | 🇰🇷 [한국어](../i18n/ko/docs/guides/UNINSTALL.md) | 🇲🇾 [Bahasa Melayu](../i18n/ms/docs/guides/UNINSTALL.md) | 🇳🇱 [Nederlands](../i18n/nl/docs/guides/UNINSTALL.md) | 🇳🇴 [Norsk](../i18n/no/docs/guides/UNINSTALL.md) | 🇵🇹 [Português (Portugal)](../i18n/pt/docs/guides/UNINSTALL.md) | 🇷🇴 [Română](../i18n/ro/docs/guides/UNINSTALL.md) | 🇵🇱 [Polski](../i18n/pl/docs/guides/UNINSTALL.md) | 🇸🇰 [Slovenčina](../i18n/sk/docs/guides/UNINSTALL.md) | 🇸🇪 [Svenska](../i18n/sv/docs/guides/UNINSTALL.md) | 🇵🇭 [Filipino](../i18n/phi/docs/guides/UNINSTALL.md) | 🇨🇿 [Čeština](../i18n/cs/docs/guides/UNINSTALL.md)

Ten przewodnik opisuje, jak czysto usunąć OmniRoute z systemu.

---

## Szybka deinstalacja (v3.6.2+)

OmniRoute udostępnia dwa wbudowane skrypty do czystego usunięcia:

### Zachowaj dane

```bash
npm run uninstall
```

To usuwa aplikację OmniRoute, ale **zachowuje** bazę danych, konfiguracje, klucze API oraz ustawienia providerów w `~/.omniroute/`. Użyj tej opcji, jeśli planujesz ponowną instalację i chcesz zachować swoją konfigurację.

### Pełne usunięcie

```bash
npm run uninstall:full
```

To usuwa aplikację **i trwale kasuje** wszystkie dane:

- Bazę danych (`storage.sqlite`)
- Konfiguracje providerów i klucze API
- Pliki kopii zapasowych
- Pliki logów
- Wszystkie pliki w katalogu `~/.omniroute/`

> ⚠️ **Ostrzeżenie:** `npm run uninstall:full` jest nieodwracalne. Wszystkie połączenia z providerami, combo, klucze API oraz historia użycia zostaną trwale usunięte.

---

## Deinstalacja ręczna

### Instalacja globalna NPM

```bash
# Remove the global package
npm uninstall -g omniroute

# (Optional) Remove data directory
rm -rf ~/.omniroute
```

### Instalacja globalna pnpm

```bash
pnpm uninstall -g omniroute
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

### Aplikacja desktopowa Electron

**Windows:**

- Otwórz `Settings → Apps → OmniRoute → Uninstall`
- Lub uruchom deinstalator NSIS z katalogu instalacji

**macOS:**

- Przeciągnij `OmniRoute.app` z `/Applications` do Kosza
- Usuń dane: `rm -rf ~/Library/Application Support/omniroute`

**Linux:**

- Usuń plik AppImage
- Usuń dane: `rm -rf ~/.omniroute`

### Instalacja ze źródeł (git clone)

```bash
# Remove the cloned directory
rm -rf /path/to/omniroute

# (Optional) Remove data directory
rm -rf ~/.omniroute
```

---

## Katalogi danych

OmniRoute domyślnie przechowuje dane w następujących lokalizacjach:

| Platforma     | Domyślna ścieżka              | Nadpisanie                |
| ------------- | ----------------------------- | ------------------------- |
| Linux         | `~/.omniroute/`               | `DATA_DIR` env var        |
| macOS         | `~/.omniroute/`               | `DATA_DIR` env var        |
| Windows       | `%APPDATA%/omniroute/`        | `DATA_DIR` env var        |
| Docker        | `/app/data/` (mounted volume) | `DATA_DIR` env var        |
| XDG-compliant | `$XDG_CONFIG_HOME/omniroute/` | `XDG_CONFIG_HOME` env var |

### Pliki w katalogu danych

| Plik/katalog         | Opis                                                      |
| -------------------- | --------------------------------------------------------- |
| `storage.sqlite`     | Główna baza danych (providery, combo, ustawienia, klucze) |
| `storage.sqlite-wal` | Dziennik write-ahead SQLite (tymczasowy)                  |
| `storage.sqlite-shm` | Pamięć współdzielona SQLite (tymczasowa)                  |
| `call_logs/`         | Archiwa payloadów żądań                                   |
| `backups/`           | Automatyczne kopie zapasowe bazy danych                   |
| `log.txt`            | Starszy log żądań (opcjonalny)                            |

---

## Weryfikacja pełnego usunięcia

Po deinstalacji sprawdź, czy nie pozostały żadne pliki:

```bash
# Check for global npm package
npm list -g omniroute 2>/dev/null

# Check for data directory
ls -la ~/.omniroute/ 2>/dev/null

# Check for running processes
pgrep -f omniroute
```

Jeśli jakiś proces nadal działa, zatrzymaj go:

```bash
pkill -f omniroute
```
