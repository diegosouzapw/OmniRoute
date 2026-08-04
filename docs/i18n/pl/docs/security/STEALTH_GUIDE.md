---
title: "Przewodnik po stealth"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Przewodnik po stealth

> **Source of truth:** `open-sse/utils/tlsClient.ts`, `open-sse/services/{chatgptTlsClient,claudeCodeCCH,claudeCodeFingerprint,claudeCodeObfuscation,claudeCodeCompatible}.ts`, `open-sse/config/cliFingerprints.ts`, `src/mitm/`
> **Last updated:** 2026-06-28 — v3.8.40
> **Audience:** Engineers maintaining provider-specific stealth integrations.

OmniRoute integruje się z providerami, których edge aktywnie fingerprintuje nieoficjalne klienty (TLS JA3/JA4, kolejność nagłówków, kształt body JSON, tokeny integralności). Ta strona dokumentuje powierzchnie stealth, które OmniRoute udostępnia, oraz miejsca ich implementacji.

## Uwaga prawna i etyczna

Funkcje stealth istnieją po to, by OmniRoute mógł działać jako warstwa kompatybilności między oficjalnymi kontami użytkownika (Claude Code CLI, ChatGPT Desktop/Web, Antigravity, Cursor itd.) a ujednoliconym API OmniRoute. **Nie** służą do omijania fraud detection, współdzielenia poświadczeń ani naruszania Terms of Service providera. Maintainerzy oczekują, że operatorzy będą przestrzegać upstream ToS, które zaakceptowali przy tworzeniu kont.

---

## Warstwa fingerprintingu TLS

### `open-sse/utils/tlsClient.ts` — wreq-js (Chrome 124)

Lazy-loaded sesja `wreq-js`, która impersonuje **Chrome 124 na macOS**. Używana jako generyczny wrapper JA3/JA4 dla upstreamów za Cloudflare. Przy braku zainstalowanego `wreq-js` spada na natywny fetch (`available = false`).

- Singleton session: `browser: "chrome_124", os: "macos"`
- Proxy resolution (priority): `HTTPS_PROXY` → `HTTP_PROXY` → `ALL_PROXY` (także lower-case)
- Timeout: `TLS_CLIENT_TIMEOUT_MS` (dziedziczy z `FETCH_TIMEOUT_MS`, domyślnie 600000)
- Response z `wreq-js` jest zgodny z fetch (`headers`, `text()`, `json()`, `clone()`, `body`).

### `open-sse/services/chatgptTlsClient.ts` — tls-client-node (Firefox 148)

Dedykowany impersonator TLS dla `chatgpt.com`. Konfiguracja Cloudflare ChatGPT pinuje `cf_clearance` do JA3/JA4 + kolejności ramek HTTP/2 SETTINGS — handshake undici dostaje `cf-mitigated: challenge` nawet przy poprawnych cookies.

- Profile: `firefox_148` (musi pasować do wysyłanego `User-Agent` Firefox 148)
- Mode: `runtimeMode: "native"` (shared library ładowana przez koffi; unika managed sidecar HTTP)
- `withRandomTLSExtensionOrder: true`
- `tlsFetchChatGpt(url, options)` obsługuje streaming (zapisuje body do pliku tymczasowego, tailed jako `ReadableStream`)
- Hang detection: `raceWithTimeout` + `TlsClientHangError` wywołuje `resetClientCache()`, więc kolejne wywołanie respawnuje binding
- Proxy resolution (priority): per-call `proxyUrl` → `OMNIROUTE_TLS_PROXY_URL` → `HTTPS_PROXY`/`HTTP_PROXY`/`ALL_PROXY` (natywny binding **nie** czyta tych env sam; trzeba je przekazać)
- Errors: `TlsClientUnavailableError` (brak binary), `TlsClientHangError` (binding w deadlocku)

---

## Pakiet stealth Claude Code

Gdy `cliCompatMode` jest włączony, OmniRoute przekształca wychodzące żądania Claude tak, by były nieodróżnialne od ruchu `claude-cli`. Współpracują trzy moduły:

### `claudeCodeFingerprint.ts`

Oblicza 3-znakowy fingerprint `cc_version` osadzony w nagłówku billing:

```
SHA256(SALT + msg[4] + msg[7] + msg[20] + version)[:3]
```

- `FINGERPRINT_SALT = "59cf53e54c78"` (hardcoded; zgodny z oficjalnym klientem)
- Inputs: znaki na indeksach 4, 7, 20 tekstu pierwszej wiadomości user + string wersji
- Output: 3-znakowy prefiks hex

### `claudeCodeCCH.ts` (Client Content Hash)

Server-side check integralności, który oficjalne Claude Code CLI liczy przez Bun/Zig. OmniRoute reimplementuje to z `xxhash-wasm`:

1. Serialize body z placeholdrem `cch=00000;`
2. `xxhash64(bytes, seed) & 0xFFFFF`
3. Zero-padded 5-znakowy lowercase hex
4. Zamień `cch=00000;` na wyliczony token

Constants:

- Seed: `0x6e52736ac806831e`
- Pattern: `/\bcch=([0-9a-f]{5});/`

### `claudeCodeObfuscation.ts`

Wstawia Unicode **zero-width joiner** (`U+200D`) po pierwszym znaku „wrażliwych” nazw klientów, by filtry upstream nie mogły ich grepnąć. Domyślna lista słów:

```
opencode, open-code, cline, roo-cline, roo_cline, cursor, windsurf,
aider, continue.dev, copilot, avante, codecompanion
```

Stosowane do: bloków `system`, całego `messages[].content` oraz `tools[].description` / `tools[].function.description`. Nadpisywalne przez operatora przez `setSensitiveWords()`.

### `claudeCodeCompatible.ts` — providery `anthropic-compatible-cc-*`

Dla zewnętrznych relay Anthropic, które akceptują tylko ruch „prawdziwego Claude Code”:

- `CLAUDE_CODE_COMPATIBLE_USER_AGENT = "claude-cli/2.1.219 (external, sdk-cli)"`
- `CLAUDE_CODE_COMPATIBLE_STAINLESS_PACKAGE_VERSION = "0.94.0"`
- `CLAUDE_CODE_COMPATIBLE_STAINLESS_RUNTIME_VERSION = "v26.3.0"`
- `anthropic-beta = "claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24"` domyślnie
- Per-connection toggle „Enable redact-thinking beta” dodaje `redact-thinking-2026-02-12`, gdy upstream CC Compatible wymaga redacted thinking streams
- Per-connection toggle „Enable summarized thinking display” zapisuje `providerSpecificData.requestDefaults.summarizeThinking` i dodaje `display: "summarized"` do żądań thinking CC Compatible, które nie miały jeszcze ustawionego display mode
- `CONTEXT_1M_BETA_HEADER = "context-1m-2025-08-07"` (rodzina Opus/Sonnet 4.x)
- Domyślna ścieżka: `/v1/messages?beta=true`

Moduły siostrzane w tym samym bundle:

- `claudeCodeConstraints.ts` — reguły temperature + cache-control
- `claudeCodeToolRemapper.ts` — remap nazw tooli
- `claudeCodeExtraRemap.ts` — dodatkowa normalizacja payloadu

---

## Stealth Antigravity

Żądania Antigravity zachowują tekst wywołującego bajt po bajcie. OmniRoute nie wstawia zero-width characters do promptów ani nie zmienia nazw/nie wstrzykuje tooli, by udawać klienta IDE.

### `antigravityHeaderScrub.ts`

Usuwa markery Stainless SDK (`x-stainless-lang`, `x-stainless-package-version`, `x-stainless-os`, `x-stainless-arch`, `x-stainless-runtime`, `x-stainless-runtime-version`, `x-stainless-timeout`, `x-stainless-retry-count`, `x-stainless-helper-method`) przed forwardem.

### ⚠️ Ryzyko: `ANTIGRAVITY_CREDITS=always` (hot spot banów kont)

`ANTIGRAVITY_CREDITS=always` (konsumowane przez `open-sse/executors/antigravity.ts`) kieruje **każde** żądanie przez Antigravity AI Credit Overages (płatne kredyty Google) zamiast pozwolić free-tier quota Google bramkować ruch. Jest to udokumentowane jako feature, ale to **najczęstszy raport naruszenia ToS, jaki widzimy** — wiele kont Google Ultra zostało zbanowanych z `403 / "service disabled for ToS violation" / insufficient_quota` po kilku godzinach z `=always`.

Egzekucja upstream jest po **stronie Google**, nie ma nic, co OmniRoute mógłby temu zapobiec. Nazwa zmiennej env i istniejąca dokumentacja sprawiają wrażenie bezpiecznego przełącznika; nim nie jest.

**Dlaczego to silniej przyciąga abuse detection niż użycie wyłącznie free-tier:**

- Utrzymany zautomatyzowany spend na jednym koncie Google flaguje się inaczej niż free-tier hits-quota-and-stops.
- Credit overages nie mają rate ceiling, więc źle skonfigurowany klient może spalić kilkaset USD w minutach i wyglądać jak odsprzedaż API key lub bot traffic.
- Wielu użytkowników OmniRoute uderzających w overage credits równolegle z tego samego zewnętrznego IP wzmacnia sygnał.

**Zalecana postawa:**

1. Zostaw domyślne `ANTIGRAVITY_CREDITS=off`, chyba że operator świadomie akceptuje ryzyko płatnych kredytów i egzekucji konta. `retry` najpierw wysyła normalne żądanie i wstrzykuje credits co najwyżej raz po kwalifikującym się quota 429; `always` wstrzykuje credits już przy pierwszym żądaniu.
2. **Rozkładaj obciążenie między providery przez Auto-Combo** (`model: "auto"` lub combo `kr/glm/etc`) zamiast nasycać pojedyncze konto Antigravity.
3. **Ustaw per-connection limity RPM** na stronie edycji providera Antigravity (Dashboard → Providers → Antigravity → connection → rate limit). 30–60 RPM to obronny górny limit przy sustained use.
4. **Używaj stabilnej, kontrolowanej przez operatora sieci upstream** i unikaj współdzielenia jednego konta między niepowiązanych użytkowników lub workloady.
5. **Przy banie**: odwołaj się przez `support.google.com` → „Restore Workspace/Account access” z dokładnym body odpowiedzi `quota_exceeded` / `service disabled` od Google. Przywrócenie nie jest gwarantowane.

Referencja środowiska dokumentuje implikacje konta i spendu dla każdego trybu credits.

Punkty styku:

- `open-sse/executors/antigravity.ts` — czyta `process.env.ANTIGRAVITY_CREDITS`
- `src/lib/oauth/providers/antigravity.ts` — plumbing poświadczeń
- Oryginalny raport incydentu: Discussion [#1183](https://github.com/diegosouzapw/OmniRoute/discussions/1183)

---

## Rejestr fingerprintów CLI — `open-sse/config/cliFingerprints.ts`

Tabela per-provider, która pinuje **dokładną** kolejność nagłówków i kolejność pól body JSON zrzutowaną z mitmproxy traces oficjalnych CLI. Obecnie zarejestrowane: `codex`, `claude`, plus profile wyprowadzane w runtime w `providerHeaderProfiles.ts` dla `antigravity` i `github`.

```ts
interface CliFingerprint {
  headerOrder: string[]; // case-sensitive
  bodyFieldOrder: string[]; // top-level JSON keys
  userAgent?: string | (() => string);
  extraHeaders?: Record<string, string>;
}
```

Przełączanie per provider przez env (patrz poniżej). Gdy wyłączone, nagłówki/klucze body pojawiają się w kolejności, jaką dał Node/JSON — łatwe do fingerprintu.

---

## Proxy MITM (Antigravity, Linux/macOS/Windows)

Dla CLI, których binarów nie da się przekierować przez `OPENAI_BASE_URL`, OmniRoute uruchamia lokalny proxy z terminacją TLS. Endpointy są pod `src/app/api/cli-tools/antigravity-mitm/`.

| Method | Endpoint                                | Purpose                                          |
| ------ | --------------------------------------- | ------------------------------------------------ |
| GET    | `/api/cli-tools/antigravity-mitm`       | Status — running, pid, dnsConfigured, certExists |
| POST   | `/api/cli-tools/antigravity-mitm`       | Start MITM (requires `apiKey` + `sudoPassword`)  |
| DELETE | `/api/cli-tools/antigravity-mitm`       | Stop MITM                                        |
| GET    | `/api/cli-tools/antigravity-mitm/alias` | List model aliases                               |
| PUT    | `/api/cli-tools/antigravity-mitm/alias` | Save model aliases for a tool                    |

Cel interceptowanego hosta: **`daily-cloudcode-pa.googleapis.com`** (upstream Antigravity).

### Sekwencja startu (`src/mitm/manager.ts::startMitm`)

1. Wygeneruj self-signed cert przez `selfsigned` (RSA-2048, SHA-256, 1y) — `cert/generate.ts`
2. Zainstaluj cert w systemowym trust store — `cert/install.ts`
3. Dodaj wpis hosts `127.0.0.1 daily-cloudcode-pa.googleapis.com` — `dns/dnsConfig.ts`
4. Spawn `src/mitm/server.cjs` z `ROUTER_API_KEY` + `MITM_LOCAL_PORT` (domyślnie `443`)
5. Zapisz PID do `<DATA_DIR>/mitm/.mitm.pid`

### Dynamiczna detekcja trust-store na Linux — `cert/install.ts`

`getLinuxCertConfig()` przechodzi listę priorytetów i wybiera pierwszy istniejący katalog:

| Distro family            | Directory                                   | Update command           |
| ------------------------ | ------------------------------------------- | ------------------------ |
| Debian / Ubuntu          | `/usr/local/share/ca-certificates`          | `update-ca-certificates` |
| Arch / CachyOS / Manjaro | `/etc/ca-certificates/trust-source/anchors` | `update-ca-trust`        |
| Fedora / RHEL / CentOS   | `/etc/pki/ca-trust/source/anchors`          | `update-ca-trust`        |
| openSUSE                 | `/etc/pki/trust/anchors`                    | `update-ca-certificates` |

Nazwa pliku cert: `omniroute-mitm.crt`. Dopasowanie fingerprintu przez `getCertFingerprint()` (SHA-1 z DER).

Dodatkowo `updateNssDatabases()` instaluje do per-user NSS DB, gdy dostępne jest `certutil`: `~/.pki/nssdb`, `~/snap/chromium/.../nssdb`, wszystkie profile Firefox (w tym snap), pod nickiem **`OmniRoute MITM Root CA`**.

### macOS / Windows

- **macOS:** `security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain`
- **Windows:** elevated PowerShell → `certutil -addstore Root`

### Auth

Wszystkie endpointy MITM wymagają management auth (`requireCliToolsAuth`). Hasło sudo jest cache'owane w module scope (nigdy `globalThis`) i czyszczone przy `stopMitm()`.

---

## Nadpisania User-Agent — zmienne env (`.env.example` sekcja 12)

| Variable                 | Default                                                         |
| ------------------------ | --------------------------------------------------------------- |
| `CLAUDE_USER_AGENT`      | `claude-cli/2.1.219 (external, cli)`                            |
| `CODEX_USER_AGENT`       | `codex-cli/0.142.0 (Windows 10.0.26200; x64)`                   |
| `GITHUB_USER_AGENT`      | `GitHubCopilotChat/0.54.0`                                      |
| `ANTIGRAVITY_USER_AGENT` | `antigravity/2.0.1 linux/arm64 google-api-nodejs-client/10.3.0` |
| `KIRO_USER_AGENT`        | `AWS-SDK-JS/3.0.0 kiro-ide/1.0.0`                               |
| `QODER_USER_AGENT`       | `Qoder-Cli`                                                     |
| `CURSOR_USER_AGENT`      | `Cursor/3.4`                                                    |

Konsumowane przez `open-sse/executors/base.ts::buildHeaders()` przez dynamic lookup. **Podbijaj je, gdy providery wypuszczają nowe wersje CLI** — stare stringi UA zaczynają być odrzucane jako outdated clients.

## Przełączniki trybu kompatybilności CLI (`.env.example` sekcja 13)

| Variable                   | Effect                          |
| -------------------------- | ------------------------------- |
| `CLI_COMPAT_CODEX=1`       | Codex fingerprint               |
| `CLI_COMPAT_CLAUDE=1`      | claude-cli fingerprint          |
| `CLI_COMPAT_GITHUB=1`      | GitHub Copilot Chat fingerprint |
| `CLI_COMPAT_ANTIGRAVITY=1` | Antigravity fingerprint         |
| `CLI_COMPAT_KIRO=1`        | Kiro                            |
| `CLI_COMPAT_CURSOR=1`      | Cursor                          |
| `CLI_COMPAT_KIMI_CODING=1` | Kimi Coding                     |
| `CLI_COMPAT_KILOCODE=1`    | KiloCode                        |
| `CLI_COMPAT_CLINE=1`       | Cline                           |
| `CLI_COMPAT_ALL=1`         | Enable all of the above         |

IP providera jest **zawsze zachowane** — toggle tylko przekształca wire image żądania, nie przełącza egress IP.

---

## Sanityzacja nagłówków inbound

OmniRoute czyści inbound nagłówki klienta przed forwardem, by żądanie przychodzące z Cursor nie wyciekało `User-Agent: Cursor/X.Y.Z` do upstream Claude. Zobacz `src/shared/constants/upstreamHeaders.ts` — denylist utrzymywany w lockstep ze schematami Zod i testami jednostkowymi.

---

## Aktualizacja fingerprintów przy rotacji u providera

1. Złap ruch oficjalnego CLI przez `mitmproxy` (TLS interception + dump)
2. Wyodrębnij JA3/JA4 i literową kolejność nagłówków
3. Zaktualizuj odpowiedni wpis `CLI_FINGERPRINTS[...]`
4. Podbij pasujący domyślny `*_USER_AGENT` w `.env.example`
5. Jeśli zmienił się sam TLS handshake: zaktualizuj `chatgptTlsClient.ts::CHATGPT_PROFILE` lub opcję wreq-js `browser:`
6. Odpal `chatgptTlsClient.test.ts` i ręcznego canary przeciwko żywemu providerowi
7. Wypuść w patch release; udokumentuj w `CHANGELOG.md`

---

## Testy

- `open-sse/services/__tests__/chatgptTlsClient.test.ts` — priorytet resolution proxy, obsługa abort, hang recovery
- `tests/unit/anthropic-cache-fingerprint.test.ts` — determinizm fingerprintu
- `tests/unit/chatgpt-web.test.ts` — end-to-end ścieżka stealth dla ChatGPT

---

## Zobacz też

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — co się dzieje, gdy ścieżka stealth dostanie `403`
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md)
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — pełna referencja env
- [CLI-TOOLS.md](../reference/CLI-TOOLS.md) — widok operatora na workflow MITM
