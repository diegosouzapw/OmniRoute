---
title: "OmniRoute — Przewodnik deinstalacji"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — Przewodnik deinstalacji

🌐 **Languages:** 🇺🇸 [English](../../../../guides/UNINSTALL.md) · 🇸🇦 [ar](../../../ar/docs/guides/UNINSTALL.md) · 🇦🇿 [az](../../../az/docs/guides/UNINSTALL.md) · 🇧🇬 [bg](../../../bg/docs/guides/UNINSTALL.md) · 🇧🇩 [bn](../../../bn/docs/guides/UNINSTALL.md) · 🇨🇿 [cs](../../../cs/docs/guides/UNINSTALL.md) · 🇩🇰 [da](../../../da/docs/guides/UNINSTALL.md) · 🇩🇪 [de](../../../de/docs/guides/UNINSTALL.md) · 🇪🇸 [es](../../../es/docs/guides/UNINSTALL.md) · 🇮🇷 [fa](../../../fa/docs/guides/UNINSTALL.md) · 🇫🇮 [fi](../../../fi/docs/guides/UNINSTALL.md) · 🇫🇷 [fr](../../../fr/docs/guides/UNINSTALL.md) · 🇮🇳 [gu](../../../gu/docs/guides/UNINSTALL.md) · 🇮🇱 [he](../../../he/docs/guides/UNINSTALL.md) · 🇮🇳 [hi](../../../hi/docs/guides/UNINSTALL.md) · 🇭🇺 [hu](../../../hu/docs/guides/UNINSTALL.md) · 🇮🇩 [id](../../../id/docs/guides/UNINSTALL.md) · 🇮🇹 [it](../../../it/docs/guides/UNINSTALL.md) · 🇯🇵 [ja](../../../ja/docs/guides/UNINSTALL.md) · 🇰🇷 [ko](../../../ko/docs/guides/UNINSTALL.md) · 🇮🇳 [mr](../../../mr/docs/guides/UNINSTALL.md) · 🇲🇾 [ms](../../../ms/docs/guides/UNINSTALL.md) · 🇳🇱 [nl](../../../nl/docs/guides/UNINSTALL.md) · 🇳🇴 [no](../../../no/docs/guides/UNINSTALL.md) · 🇵🇭 [phi](../../../phi/docs/guides/UNINSTALL.md) · 🇵🇹 [pt](../../../pt/docs/guides/UNINSTALL.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/UNINSTALL.md) · 🇷🇴 [ro](../../../ro/docs/guides/UNINSTALL.md) · 🇷🇺 [ru](../../../ru/docs/guides/UNINSTALL.md) · 🇸🇰 [sk](../../../sk/docs/guides/UNINSTALL.md) · 🇸🇪 [sv](../../../sv/docs/guides/UNINSTALL.md) · 🇰🇪 [sw](../../../sw/docs/guides/UNINSTALL.md) · 🇮🇳 [ta](../../../ta/docs/guides/UNINSTALL.md) · 🇮🇳 [te](../../../te/docs/guides/UNINSTALL.md) · 🇹🇭 [th](../../../th/docs/guides/UNINSTALL.md) · 🇹🇷 [tr](../../../tr/docs/guides/UNINSTALL.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/UNINSTALL.md) · 🇵🇰 [ur](../../../ur/docs/guides/UNINSTALL.md) · 🇻🇳 [vi](../../../vi/docs/guides/UNINSTALL.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/UNINSTALL.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/UNINSTALL.md)

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
