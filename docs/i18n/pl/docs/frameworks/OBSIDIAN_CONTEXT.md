---
title: "Źródło kontekstu Obsidian"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Źródło kontekstu Obsidian

> **Source of truth:** `src/lib/obsidian/api.ts` (klient REST + sync),
> `src/lib/db/obsidian.ts` (trwałość tokenu / base-URL / WebDAV),
> `src/lib/obsidianSync.ts` (synchronizacja vaultu WebDAV), `open-sse/mcp-server/tools/obsidianTools.ts`
> (22 narzędzia MCP), `src/app/api/settings/obsidian/route.ts` +
> `src/app/api/settings/obsidian/webdav/route.ts` (API ustawień). Rejestracja narzędzi
> i podłączenie scope znajdują się w `open-sse/mcp-server/server.ts`.

## Czym to jest

OmniRoute łączy się z vaultem **Obsidian** jako **źródłem kontekstu** — lokalną bazą
wiedzy w Markdown, którą agenci odczytują i zapisują przez wbudowany serwer MCP.
Integracja komunikuje się z wtyczką społecznościową **Obsidian Local REST API**
działającą wewnątrz aplikacji desktopowej, dzięki czemu agenci mogą wyszukiwać notatki,
odczytywać/zapisywać/patchować pliki, listować vault, pracować z periodycznymi
notatkami dziennymi/tygodniowymi, zarządzać tagami, uruchamiać komendy Obsidian oraz
(opcjonalnie) koordynować dwukierunkową synchronizację vaultu desktop↔mobile.

Klient (`src/lib/obsidian/api.ts`) opakowuje Local REST API z:

- **Retry with backoff** dla przejściowych `5xx`, **30-sekundowym timeoutem** przez `AbortController`.
- **Typowaną klasyfikacją błędów** — `ObsidianAuthError` (401/403),
  `ObsidianNotFoundError` (404), `ObsidianServerError` (5xx), `ObsidianTimeoutError`.
- **Przyjazną podpowiedzią „cannot reach Obsidian”**, która wskazuje częsty błąd portu
  (HTTP na `27123`, **nie** endpoint MCP na `27124`) oraz formę Tailscale.
- Względnym względem vaultu **kodowaniem ścieżek**, dzięki czemu ścieżki notatek ze spacjami/ukośnikami są bezpieczne.

## Konfiguracja

**Nie ma zmiennej środowiskowej** na token Obsidian ani base URL — oba są
przechowywane w tabeli SQLite `key_value` (namespace `obsidian`) przez
`src/lib/db/obsidian.ts`. Token jest **szyfrowany w spoczynku** (AES-256-GCM, z
fallbackiem kompatybilności wstecznej dla plaintext). Konfiguruj z zakładki
**Context Sources** dashboardu Endpoint (`ObsidianSourceCard`) albo przez REST API ustawień.

> [!IMPORTANT]
> Wtyczka **Obsidian Local REST API** musi być zainstalowana i uruchomiona. Jej
> interfejs REST nasłuchuje na **HTTP `127.0.0.1:27123`** (domyślny base URL). Port `27124`
> to _osobny_ endpoint MCP/HTTPS i jest jawnie odrzucany przez route ustawień.
> Przy połączeniu z innego urządzenia użyj `http://<tailscale-ip>:27123`.

### Klucze konfiguracji (SQLite `key_value`, namespace `obsidian`)

| Key               | Purpose                                             | Encrypted |
| ----------------- | --------------------------------------------------- | --------- |
| `api_key`         | Bearer token Local REST API                         | yes       |
| `base_url`        | REST base URL (domyślnie `http://127.0.0.1:27123`)  | no        |
| `vault_path`      | Bezwzględna ścieżka do katalogu vaultu (do sync)    | no        |
| `webdav_username` | Wygenerowana nazwa użytkownika WebDAV (sync vaultu) | no        |
| `webdav_password` | Wygenerowane hasło WebDAV (sync vaultu)             | yes       |
| `webdav_enabled`  | Czy synchronizacja vaultu WebDAV jest włączona      | no        |

### Konfiguracja przez REST

```bash
# Save + validate the Local REST API token (POST validates via a status check)
curl -X POST http://localhost:20128/api/settings/obsidian \
  -H "Content-Type: application/json" \
  -d '{"token":"<obsidian-rest-api-key>","baseUrl":"http://127.0.0.1:27123"}'

# Check connection status (returns connected, hasToken, baseUrl, vaultPath)
curl http://localhost:20128/api/settings/obsidian

# Disconnect (clears the stored token)
curl -X DELETE http://localhost:20128/api/settings/obsidian
```

Wszystkie metody wymagają uwierzytelnienia dashboardu. `POST` odrzuca każdy URL na porcie `27124`
i waliduje token, wywołując endpoint statusu Local REST API przed zapisem.

### Synchronizacja vaultu WebDAV

`src/app/api/settings/obsidian/webdav/route.ts` zarządza opcjonalną synchronizacją
vaultu opartą na WebDAV (sterowaną przez `src/lib/obsidianSync.ts`). Włączenie
wskazuje OmniRoute na lokalny katalog vaultu i generuje losową parę username/password WebDAV:

```bash
# Enable WebDAV sync for a vault directory (mints username/password)
curl -X POST http://localhost:20128/api/settings/obsidian/webdav \
  -H "Content-Type: application/json" \
  -d '{"vaultPath":"/home/me/MyVault"}'

# Get WebDAV sync status (credentials returned only while enabled)
curl http://localhost:20128/api/settings/obsidian/webdav

# Disable WebDAV sync (clears credentials + managed .stignore)
curl -X DELETE http://localhost:20128/api/settings/obsidian/webdav
```

### Źródło kontekstu per klucz API (opcjonalne)

Konfiguracja Obsidian może być zawężona **per klucz API** przez tabelę `api_key_context_sources`
(`src/lib/db/apiKeyContextSources.ts`). Gdy wywołanie MCP niesie uwierzytelnione id
klucza API, `getObsidianConfigForApiKey()` preferuje własny token/base-URL/vault-path
tego klucza (`source: "api_key"`), a w przeciwnym razie spada do konfiguracji globalnej
(`source: "global"`).

## Narzędzia MCP (22)

Zdefiniowane w `open-sse/mcp-server/tools/obsidianTools.ts`. Token/base-URL są
rozwiązywane per wywołanie (najpierw per-API-key, potem global). Narzędzia trafiające
w **serwer sync** OmniRoute (cztery narzędzia `obsidian_sync_*`) dodatkowo wymagają
tokenu auth sync skonfigurowanego w ustawieniach OmniRoute.

### Narzędzia odczytu (`read:obsidian`)

| Tool                         | Description                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| `obsidian_check_status`      | Sprawdza, czy Local REST API jest osiągalne i uwierzytelnione.                               |
| `obsidian_search_simple`     | Pełnotekstowe wyszukiwanie treści notatek; zwraca snippety ze ścieżkami plików.              |
| `obsidian_search_structured` | Wyszukiwanie wyrażeniem JSON Logic (filtry and/or/regex/path).                               |
| `obsidian_read_note`         | Odczyt notatki po ścieżce względnej vaultu; opcjonalnie konkretny heading/block/frontmatter. |
| `obsidian_list_vault`        | Lista plików i katalogów w vaulcie (drzewo wpisów).                                          |
| `obsidian_get_document_map`  | Struktura nagłówków notatki jako mapa headings → numery linii.                               |
| `obsidian_get_note_metadata` | Frontmatter, tagi, linki, liczba znaków/słów bez pełnej treści.                              |
| `obsidian_get_active_file`   | Ścieżka + treść aktualnie aktywnego pliku w Obsidian.                                        |
| `obsidian_get_periodic_note` | Periodyczna notatka daily/weekly/monthly dla daty (dziś, jeśli pominięto).                   |
| `obsidian_get_tags`          | Lista wszystkich tagów vaultu z ich częstotliwościami.                                       |
| `obsidian_list_commands`     | Lista dostępnych ID komend Obsidian (użyj z `obsidian_execute_command`).                     |
| `obsidian_sync_status`       | Status serwera sync OmniRoute: running, nazwa vaultu, port, uptime, last sync.               |
| `obsidian_sync_conflicts`    | Lista nierozwiązanych konfliktów sync (path, conflict path, detected-at).                    |

### Narzędzia zapisu (`write:obsidian`)

| Tool                             | Description                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| `obsidian_write_note`            | Utwórz lub nadpisz notatkę podaną treścią Markdown.                                   |
| `obsidian_append_note`           | Dołącz treść do notatki; opcjonalnie do konkretnego heading/block.                    |
| `obsidian_patch_note`            | Precyzyjny append/prepend/replace przy heading, block lub polu frontmatter.           |
| `obsidian_delete_note`           | Trwale usuń notatkę z vaultu.                                                         |
| `obsidian_move_note`             | Przenieś lub zmień nazwę notatki w obrębie vaultu.                                    |
| `obsidian_execute_command`       | Wykonaj komendę Obsidian po jej command ID.                                           |
| `obsidian_open_file`             | Otwórz plik w Obsidian (tworzy go, jeśli nie istnieje).                               |
| `obsidian_sync_trigger`          | Wyzwól natychmiastową dwukierunkową synchronizację vaultu desktop↔mobile.             |
| `obsidian_sync_resolve_conflict` | Rozwiąż konflikt sync: zachowaj `local` (mobile), `remote` (desktop) lub `keep-both`. |

> [!NOTE]
> Cele `obsidian_patch_note` przyjmują `targetType` o wartości `heading | block | frontmatter`
> oraz `operation` o wartości `append | prepend | replace`, z opcjonalnym
> `createTargetIfMissing`. Cztery narzędzia `obsidian_sync_*` rozmawiają z lokalnym
> serwerem sync (`http://127.0.0.1:27781` domyślnie) i wymagają tokenu sync.

### Scope

Narzędzia odczytu wymagają `read:obsidian`; narzędzia zapisu wymagają `write:obsidian`.
Egzekwowanie jest identyczne jak w Notion — obsługiwane przez `withScopeEnforcement()` w
`open-sse/mcp-server/server.ts`, bramkowane przez `OMNIROUTE_MCP_ENFORCE_SCOPES=true`, z
dozwolonymi scope pochodzącymi z `OMNIROUTE_MCP_SCOPES` lub kontekstu scope klucza API. Zobacz
[MCP-SERVER.md](./MCP-SERVER.md).

## Endpointy

| Method   | Path                            | Purpose                                               |
| -------- | ------------------------------- | ----------------------------------------------------- |
| `GET`    | `/api/settings/obsidian`        | Zwraca `{ connected, hasToken, baseUrl, vaultPath }`. |
| `POST`   | `/api/settings/obsidian`        | Zapisz + waliduj token (odrzuca port `27124`).        |
| `DELETE` | `/api/settings/obsidian`        | Rozłącz (wyczyść zapisany token).                     |
| `GET`    | `/api/settings/obsidian/webdav` | Status sync WebDAV + credentials (gdy włączone).      |
| `POST`   | `/api/settings/obsidian/webdav` | Włącz sync WebDAV dla katalogu vaultu.                |
| `DELETE` | `/api/settings/obsidian/webdav` | Wyłącz sync WebDAV.                                   |

> To są route’y ustawień dashboardu. Sam vault jest osiągany przez Obsidian
> Local REST API (skonfigurowany `base_url`) oraz przez powyższe narzędzia MCP — nie ma
> publicznego endpointu proxy Obsidian `/v1`.

## Przypadki użycia

- **Odpowiedzi ugruntowane w vaulcie** — `obsidian_search_simple` / `obsidian_search_structured`,
  potem `obsidian_read_note`, aby agent odpowiadał na podstawie Twoich prawdziwych notatek.
- **Tworzenie notatek / dziennik** — `obsidian_write_note`, `obsidian_append_note` lub
  precyzyjny `obsidian_patch_note` do logowania wyjścia agenta, podsumowań albo notatek
  dziennych (`obsidian_get_periodic_note`) w vaulcie.
- **Nawigacja po vaulcie** — `obsidian_list_vault`, `obsidian_get_document_map` i
  `obsidian_get_tags` do eksploracji struktury przed odczytem/zapisem.
- **Automatyzacja Obsidian** — `obsidian_list_commands` + `obsidian_execute_command` do
  sterowania wtyczkami/komendami z poziomu agenta; `obsidian_open_file`, by pokazać notatkę w UI.
- **Sync mobilny** — włącz sync WebDAV, potem `obsidian_sync_trigger` /
  `obsidian_sync_status` / `obsidian_sync_conflicts` / `obsidian_sync_resolve_conflict`
  do koordynacji desktop↔mobile i rozwiązywania konfliktów.

## Powiązane

- [MCP Server](./MCP-SERVER.md) — transporty, egzekwowanie scope, pełny inwentarz narzędzi.
- [Notion Context Source](./NOTION_CONTEXT.md) — drugie wbudowane źródło kontekstu.
- [Memory System](./MEMORY.md) — trwała pamięć konwersacyjna (komplementarna
  warstwa kontekstu, wstrzykiwana automatycznie, a nie pobierana narzędziami).
