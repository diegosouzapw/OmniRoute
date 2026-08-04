---
title: "Inspektor ruchu"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Inspektor ruchu

Traffic Inspector to wbudowany debugger ruchu HTTPS w OmniRoute — narzędzie w stylu Charles Proxy / mitmweb / HTTP Toolkit, które jest **świadome LLM** (**LLM-aware**) i **świadome agentów** (**agent-aware**). Znajduje się pod `/dashboard/tools/traffic-inspector` i odbiera ruch na żywo z maksymalnie 5 jednoczesnych źródeł przechwytywania.

**Lokalizacja w dashboardzie:** `/dashboard/tools/traffic-inspector`
**Grupa w sidebarze:** Tools (po AgentBridge)
**Zobacz też:** [`AGENTBRIDGE.md`](./AGENTBRIDGE.md) — AgentBridge to tryb przechwytywania 1.

---

## §1 Przegląd

### Co wyróżnia Traffic Inspector

| Feature                                                                | mitmweb | Charles | Fiddler | **OmniRoute Traffic Inspector** |
| ---------------------------------------------------------------------- | :-----: | :-----: | :-----: | :-----------------------------: |
| Interfejs webowy                                                       |    ✓    |    ✗    |    ✗    |                ✓                |
| Open-source                                                            |    ✓    |    ✗    | partial |                ✓                |
| **Agent-aware** (wie, czy żądanie pochodzi z Antigravity/Copilot/itd.) |    ✗    |    ✗    |    ✗    |                ✓                |
| **LLM-aware** (parsuje kształt OpenAI/Anthropic/Gemini, tokeny, model) |    ✗    |    ✗    |    ✗    |                ✓                |
| **Widoczne mapowanie modeli** (gemini-3-flash → claude-sonnet-4.7)     |    ✗    |    ✗    |    ✗    |                ✓                |
| **Podział latencji proxy/upstream**                                    | partial |    ✗    |    ✗    |                ✓                |
| **Zintegrowany z OmniRoute** routing, fallback, cost                   |    ✗    |    ✗    |    ✗    |                ✓                |
| **Debug proxy systemowego** (dowolna aplikacja na maszynie)            |    ✓    |    ✓    |    ✓    |                ✓                |
| **Przechwytywanie custom host** (per-host DNS redirect)                |    ✓    |    ✓    |    ✓    |                ✓                |
| **Tryb HTTP_PROXY env**                                                |    ✓    |    ✓    |    ✓    |                ✓                |
| **Widok Conversation** (multi-turn bubbles, tool_use/tool_result)      |    ✗    |    ✗    |    ✗    |                ✓                |
| **SSE stream merger** (rekonstrukcja z eventów delta)                  |    ✗    |    ✗    |    ✗    |                ✓                |
| **Nagrywanie sesji** (nazwane, eksport .har/.jsonl)                    |    ✗    |    ✓    |    ✓    |                ✓                |

### Architektura w jednym akapicie

`TrafficBuffer` (`src/mitm/inspector/buffer.ts`) to współdzielony pierścieniowy bufor w pamięci (domyślnie 1000 wpisów, konfigurowalny przez `INSPECTOR_BUFFER_SIZE`). Wszystkie źródła przechwytywania zapisują do niego przez `push()`. Bufor klasyfikuje każdy wpis za pomocą `kindDetector.ts` (określa, czy to żądanie LLM), wylicza `contextKey` (odcisk SHA-256 system promptu) i rozgłasza do wszystkich subskrybentów WebSocket przez `globalTrafficBuffer.subscribe()`. Dashboard łączy się przez `GET /api/tools/traffic-inspector/ws` i przy połączeniu dostaje snapshot, a potem eventy `new`/`update`/`clear`.

---

## §2 Tryby przechwytywania

Traffic Inspector obsługuje **5 jednoczesnych źródeł przechwytywania**. Każde da się włączać niezależnie. Pole `source` na każdym `InterceptedRequest` (`src/mitm/inspector/types.ts`) to jedno z: `"agent-bridge"`, `"custom-host"`, `"http-proxy"`, `"system-proxy"` lub `"tproxy"`.

### Mode 1 — AgentBridge (domyślny, zawsze włączony)

**Źródło:** handlery AgentBridge (`src/mitm/handlers/base.ts`)
**Mechanizm:** Każde wywołanie `intercept()` w `MitmHandlerBase` woła `hookBufferStart()` przed forwardingiem i `hookBufferUpdate()` po zakończeniu. Zero dodatkowej konfiguracji — działa, gdy tylko AgentBridge jest uruchomiony.
**Zasięg:** 9 agentów IDE skonfigurowanych w AgentBridge
**Uwaga:** pole `source` w `InterceptedRequest` = `"agent-bridge"`

### Mode 2 — Custom Hosts (przekierowanie DNS)

**Źródło:** lista hostów zdefiniowana przez użytkownika (tabela `inspector_custom_hosts`)
**Mechanizm:** Dodanie hosta w UI dopisuje `127.0.0.1 <host>` do `/etc/hosts` (wymaga sudo). Istniejący serwer MITM AgentBridge (port 443) generuje certyfikat SNI dynamicznie dla nowego hosta.
**Zasięg:** dowolna aplikacja używająca dodanego hosta — bez zmiany konfiguracji aplikacji
**Uwaga:** `source` = `"custom-host"`

Przykładowe zastosowania:

- Monitorowanie `api.openai.com` ze skryptów Pythona
- Debug `my-internal-llm.company.com`
- Przechwytywanie ruchu z urządzeń mobilnych w tej samej sieci (przez ARP spoofing — zaawansowane)

### Mode 3 — listener HTTP_PROXY (port 8080)

**Źródło:** aplikacje używające zmiennych środowiskowych `HTTP_PROXY`/`HTTPS_PROXY`
**Mechanizm:** Drugi listener na porcie 8080 (`src/mitm/inspector/httpProxyServer.ts`) działający jako standardowe jawne proxy HTTP/HTTPS. Akceptuje tunele `CONNECT` (HTTPS) i bezpośrednie żądania HTTP.
**Zasięg:** dowolna aplikacja respektująca env `HTTP_PROXY` — bez zmiany DNS, bez sudo
**Uwaga:** `source` = `"http-proxy"`

```bash
# Quick capture for a single command:
HTTPS_PROXY=http://127.0.0.1:8080 curl https://api.openai.com/v1/models

# Persistent capture in a shell session:
export HTTP_PROXY=http://127.0.0.1:8080
export HTTPS_PROXY=http://127.0.0.1:8080
```

**Ograniczenie TLS:** tunele HTTPS `CONNECT` są przechwytywane tylko jako metadane (host, port, timing) — ciało TLS domyślnie nie jest deszyfrowane. Włącz przełącznik „Decrypt HTTPS in proxy mode” (opt-in, wymaga zaufania certyfikatowi AgentBridge), aby w pełni oglądać body.

**Konflikt portu:** jeśli port 8080 jest zajęty, AgentBridge zwraca 409 ze strukturalnym błędem. Zmień port przez env `INSPECTOR_HTTP_PROXY_PORT`.

### Mode 4 — proxy systemowe (zaawansowane, opt-in)

**Źródło:** ustawienia proxy na poziomie OS (dotyczy wszystkich aplikacji na maszynie)
**Mechanizm:** używa API systemu operacyjnego, aby przekierować cały ruch HTTP/HTTPS przez listener HTTP_PROXY:

- **macOS:** `networksetup -setwebproxy / -setsecurewebproxy`
- **Linux:** `gsettings set org.gnome.system.proxy` + `/etc/environment`
- **Windows:** `netsh winhttp set proxy 127.0.0.1:8080`
  **Zasięg:** każda aplikacja na maszynie respektująca systemowe ustawienia proxy
  **Uwaga:** `source` = `"system-proxy"`

**Mechanizmy bezpieczeństwa:**

- Timer auto-wyłączenia (domyślnie 30 min, konfigurowalny przez `INSPECTOR_SYSTEM_PROXY_GUARD_MINUTES`)
- Poprzedni stan proxy systemowego jest zapisywany w DB i przywracany przy revert
- Dashboard pokazuje prompt „Reverting system proxy”, jeśli użytkownik odejdzie ze strony przy aktywnym trybie
- UI pokazuje odznakę `⚠ Advanced` + jawny checkbox potwierdzenia

### Mode 5 — przezroczyste deszyfrowanie TPROXY (Linux, root, opt-in)

**Źródło:** kernel TPROXY + policy routing (`src/mitm/tproxy/`)
**Mechanizm:** Oznacza nowe lokalne wychodzące połączenia TCP na port docelowy (domyślnie `443`) w `mangle OUTPUT`, `ip rule` przekierowuje oznaczone pakiety do lokalnego dostarczenia, a target `TPROXY` w `mangle PREROUTING` przekazuje je do przezroczystego listenera (**IP_TRANSPARENT**) (domyślny port `8443`). Listener kończy TLS certyfikatem liścia wystawianym **per hostname SNI na żądanie** przez dynamiczne CA, przechwytuje odszyfrowaną wymianę i forwarduje żądanie ponownie zaszyfrowane do oryginalnego miejsca docelowego.
**Zasięg:** **dowolne** hosty docelowe na porcie docelowym — bez spoof `/etc/hosts`, bez env `HTTP_PROXY`, bez mutacji proxy systemowego. Przechwytywany proces nie wymaga zmiany konfiguracji, ale musi ufać dynamicznemu CA.
**Uwaga:** `source` = `"tproxy"`

**Wymagania:** tylko Linux (**IP_TRANSPARENT** jest wyłącznie linuksowe), capability **CAP_NET_ADMIN** (root) oraz natywny addon N-API, który trzeba zbudować toolchainem C (`npm run build:native:tproxy`). Gdy niedostępne, przełącznik w dashboardzie jest wyłączony z tooltipem „TPROXY decrypt requires Linux + root + the native addon”. Reguły firewalla są aplikowane/cofane transakcyjnie (crash nigdy nie zostawia reguły `mangle`) i flushowane po restarcie. Anti-loop oparty o SO_MARK chroni przed ponownym przechwyceniem własnego, ponownie zaszyfrowanego forwardu proxy.

To istotny podsystem z własnym przewodnikiem operatorskim — zobacz **[`docs/security/MITM-TPROXY-DECRYPT.md`](../security/MITM-TPROXY-DECRYPT.md)** po pełną receptę firewalla, dynamiczne CA per-SNI + instalator trust-store, trasę local-only, szczegóły anti-loop i schemat konfiguracji. Przełącznik sterowany jest przez `GET / POST / DELETE /api/tools/agent-bridge/tproxy` (uwaga: trasa żyje pod prefiksem AgentBridge, nie Traffic Inspector).

### Porównanie trybów przechwytywania

| Mode              | Setup                         |          Sudo?          | Reach                       | Notes                                                                                                       |
| ----------------- | ----------------------------- | :---------------------: | --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 1. AgentBridge    | Automatycznie                 |    Once (cert+hosts)    | 9 agentów IDE               | Włączony domyślnie                                                                                          |
| 2. Custom Hosts   | Wejście per-host              |    Yes (hosts file)     | Dowolna app używająca hosta | Persystowane w DB                                                                                           |
| 3. HTTP_PROXY     | `export HTTPS_PROXY=...`      |           No            | Aplikacje respektujące env  | Port 8080, domyślnie bez deszyfracji TLS                                                                    |
| 4. System-wide    | Toggle + potwierdzenie        |           Yes           | Wszystkie app na maszynie   | Auto-wyłączenie po 30 min                                                                                   |
| 5. TPROXY decrypt | Toggle (Linux + native addon) | Yes (root + CA install) | Dowolny host na porcie doc. | Deszyfruje dowolne hosty; domyślnie off — zob. [MITM-TPROXY-DECRYPT.md](../security/MITM-TPROXY-DECRYPT.md) |

---

## §3 UI

### 3.1 Układ

```
┌─ Traffic Inspector ─────────────────────────────────────────────────────┐
│ ┌─ Capture sources toolbar ─────────────────────────────────────────┐   │
│ │ [✓ AgentBridge]  [✓ Custom hosts (3)]  [○ HTTP_PROXY]  [○ System]│   │
│ └─────────────────────────────────────────────────────────────────────┘  │
│ ┌─ Filter/control bar ──────────────────────────────────────────────┐   │
│ │ Profile: (●) LLM only  (○) Custom  (○) All                        │   │
│ │ [⎉ Pause] [🗑 Clear] [⬇ .har] [● REC session]    ● live 482/1k  │   │
│ └─────────────────────────────────────────────────────────────────────┘  │
├══◀▶══════════════════════════════╬══════════════════════════════════════╤╡
│ REQUEST LIST (resizable)         ║ DETAIL PANE                         ▲ │
│ ────────────────────────────── │ ║ [Conversation][Headers][Request]    │ │
│ ▎ 14:32 POST 200 12k AG openai ║ [Response][Timing][LLM][Stats]      │ │
│ ▎ 14:31 POST 200 8k  CP openai ║                                     ▼ │
│ ▎ 14:31 POST 503 ⚠   KR ...   ║                                       │
│ ▎ 14:30 GET  200 3k  🌐 custom ║                                       │
└══════════════════════════════════╝══════════════════════════════════════╝
```

### 3.2 Lista żądań (lewy panel)

- **Wirtualizowana** (`useVirtualList` + `ResizeObserver`): obsługuje 1000 elementów bez zamrażania
- **Auto-scroll** z przełącznikiem pauzy podczas inspekcji
- **Kolorowany status**: zielony (2xx), żółty (3xx), czerwony (4xx/5xx), szary (in-flight)
- **Emoji agenta**: 🔵 Antigravity, 🟢 Copilot, 🟠 Kiro, 🟣 Codex, 🔷 Cursor, 🟤 Zed, 🟡 Claude Code, ⚫ Open Code, 🌐 custom host
- **Pasek koloru kontekstu**: 1px lewa ramka kolorowana według `contextKey` (SHA-256 system promptu) — wizualnie grupuje powiązane rozmowy
- **Leniwe body**: tylko body wybranego żądania jest materializowane w zakładkach szczegółów (unika renderowania 1000 × 1MB body)

### 3.3 Panel szczegółów — 7 zakładek

| Tab              | Content                                                                         | Notes                                                                                           |
| ---------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Conversation** | Multi-turn chat bubbles (system/user/assistant + tool_use/tool_result)          | Znormalizowane z dowolnego formatu providera; tylko dla `detectedKind === "llm"`                |
| **Headers**      | Tabele nagłówków request + response                                             | Wrażliwe nagłówki (Authorization, Cookie, api-key) domyślnie zamaskowane; toggle „Show secrets” |
| **Request**      | Surowe body, widok drzewa JSON, badge pola model                                | Pretty-printed JSON lub surowy tekst                                                            |
| **Response**     | Surowe body lub lista eventów SSE; toggle „Raw ↔ Merged”                        | SSE merger rekonstruuje finalną wiadomość z eventów delta                                       |
| **Timing**       | Waterfall: narzut proxy vs latencja upstream                                    | Total, TTFB i rozmiar                                                                           |
| **LLM Details**  | Provider, model, liczba messages, tokeny in/out, szacunek kosztu, mapped target | Tylko dla żądań LLM                                                                             |
| **Stats**        | Recharts: timeline latencji, bar chart tokenów, scatter tool call               | Tylko gdy wczytana jest nagrana sesja                                                           |

### 3.4 Kontrolki paska narzędzi

| Control          | Action                                                                     |
| ---------------- | -------------------------------------------------------------------------- |
| ⎉ Pause          | Zatrzymuje renderowanie nowych żądań; badge „X new” się kumuluje           |
| 🗑 Clear          | Czyści listę UI (bufor serwera pozostaje nietknięty)                       |
| ⬇ Export .har    | Pobiera bieżącą przefiltrowaną listę jako plik HAR                         |
| ● Record session | Startuje nazwaną sesję nagrywania                                          |
| Profile selector | LLM only / Custom hosts / All                                              |
| Host filter      | Dopasowanie substring na polu `host`                                       |
| Agent filter     | Dropdown: All / per-agent                                                  |
| Status filter    | All / 2xx / 3xx / 4xx / 5xx / error                                        |
| Source filter    | All / agent-bridge / custom-host / http-proxy / system-proxy / tproxy      |
| **Live** filter  | Pokazuje tylko żądania in-flight (otwarte) — toggle `liveOnly` (zob. §4.6) |

### 3.5 Panele o zmiennym rozmiarze

- Lista i panel szczegółów rozdzielone uchwytem do przeciągania
- Szerokość listy: min 280px, max 720px, persystowana w `localStorage` (`inspector.listWidth`)
- Zwinięcie do 48px rail (tylko ikony); klik wiersza w rail rozwija panel

---

## §4 Funkcje LLM-aware

### 4.1 Kind detector (`src/mitm/inspector/kindDetector.ts`)

Klasyfikuje każde żądanie jako `"llm"`, `"app"` lub `"unknown"` na podstawie 4 sygnałów:

1. **Host registry** — ~18 znanych hostname’ów API LLM (OpenAI, Anthropic, Gemini, Groq, Mistral, Together, Fireworks, Cohere, Perplexity, Hugging Face, OpenRouter, xAI, Moonshot itd.)
2. **Path patterns** — `/v1/chat/completions`, `/v1/messages`, `/generateContent`, `/v1/responses` itd.
3. **Body shape** — wykrywa `messages[]` (OpenAI/Claude), `contents[]` (Gemini), pola `prompt`, `input`
4. **User-agent hints** — `codex`, `claude`, `gemini`, `antigravity`, `kiro`, `copilot`, `cursor` w stringu UA

Custom hosty dodane w Mode 2 dziedziczą swój `kind` z inputu formularza (domyślnie `"custom"`).

### 4.2 SSE merger (`src/mitm/inspector/sseMerger.ts`)

**Port MIT z [chouzz/llm-interceptor](https://github.com/chouzz/llm-interceptor)**

Rekonstruuje finalną wiadomość asystenta z surowych eventów SSE delta:

- **Anthropic**: akumuluje `content_block_delta` po indeksie; obsługuje `text_delta`, `input_json_delta` (tool calls), `thinking_delta`
- **OpenAI**: akumuluje `choices[i].delta.content` i `tool_calls` po indeksie
- **Gemini**: akumuluje `candidates[i].content.parts`
- **Unknown**: zwraca surowe eventy bez zmian

Zakładka Response pokazuje toggle: **„Raw events ↔ Merged”**.

### 4.3 Conversation normalizer (`src/mitm/inspector/conversationNormalizer.ts`)

**Port MIT z [chouzz/llm-interceptor](https://github.com/chouzz/llm-interceptor)**

Konwertuje formaty wiadomości OpenAI, Anthropic i Gemini do jednego `NormalizedConversation` przed renderowaniem:

```ts
interface NormalizedConversation {
  request: NormalizedTurn[]; // messages / contents / prompt from request body
  response: NormalizedTurn[]; // assistant response (merged via sseMerger)
  contextKey: string | null; // SHA-256 system-prompt fingerprint
}
```

Typy bloków: `text`, `tool_use`, `tool_result`. Zakładka Conversation używa tego kształtu niezależnie od providera.

### 4.4 Koloryzacja context key (`src/mitm/inspector/contextKey.ts`)

- Liczy `SHA-256` system promptu (pierwsza wiadomość `role:system`, albo pole `system`, albo Gemini `systemInstruction`)
- Zwraca 12-znakowy prefiks hex (`"a3f9c2..."`)
- Frontend mapuje klucz na deterministyczny kolor HSL dla paska lewej ramki
- **Filtr „same context”**: klik chipa `ctx #a3f` dodaje filtr pokazujący tylko żądania z tym samym fingerprintem

Ułatwia to wizualne rozróżnienie różnych „person” lub zadań w tej samej sesji agenta.

### 4.5 Ekstrakcja metadanych LLM

Dla żądań LLM zakładka LLM Details wyciąga:

```ts
interface LlmMetadata {
  provider: string | null; // "openai" | "anthropic" | "gemini" | ...
  apiKind: string | null; // "chat.completions" | "messages" | "embeddings" | ...
  model: string | null; // from request body or response
  messages: number; // turn count
  tokensIn: number | null; // usage.prompt_tokens / usage.input_tokens
  tokensOut: number | null; // usage.completion_tokens / usage.output_tokens
  streamed: boolean; // true if SSE response
  mappedTo: string | null; // x-omniroute-mapped header
  costEstimateUsd: number | null; // estimated cost based on OmniRoute pricing
}
```

### 4.6 Filtr live żądań in-flight

Pole `status` żądania to `number | "in-flight" | "error"` — wpis jest
pushowany jako `"in-flight"` w momencie startu żądania i **aktualizowany w miejscu**
gdy nadejdzie response (lub błąd). Toggle **„Live”** na toolbarze
(`liveOnly`, klucz i18n `trafficInspector.liveOnly`) ogranicza listę do wpisów
o `status === "in-flight"`, dzięki czemu możesz oglądać otwarte połączenia w czasie rzeczywistym.

Filtr to czysty, client-side predykat w
`src/lib/inspector/matchesTrafficFilter.ts`:

```ts
if (f.liveOnly && req.status !== "in-flight") return false;
```

Stan toggle’a żyje w `useTrafficFilters` (hooki dashboardu inspectora) i
łączy się z pozostałymi filtrami (profile, host, agent, source, status, context).

### 4.7 Atrybucja procesu (Linux)

Na Linuxie każde przechwycone żądanie może zostać przypisane do **lokalnego procesu
źródłowego**. Do `InterceptedRequest` dodawane są dwa opcjonalne pola:

```ts
pid?: number;          // originating process id (Linux only)
processName?: string;  // originating process name (Linux only)
```

`src/mitm/inspector/processAttribution.ts` mapuje _kliencki_
efemeryczny port połączenia na PID + nazwę przez:

1. Odczyt `/proc/net/tcp` i `/proc/net/tcp6` w celu znalezienia inode socketa dla
   portu (`parseProcNetTcpForInode`, czysty parser testowalny fixture’ami).
2. Skan `/proc/<pid>/fd/` w poszukiwaniu symlinku do `socket:[<inode>]`.
3. Odczyt nazwy procesu z `/proc/<pid>/comm`.

Cache TTL 1 s ogranicza koszt skanu procfs pod obciążeniem. Atrybucja jest
**best-effort** — każda porażka resolve’uje do `null` i nigdy nie blokuje przechwytywania. Na
macOS/Windows funkcja zwraca `null` (stub; wsparcie `lsof`/`GetExtendedTcpTable`
to follow-up).

---

## §5 Sesje

### 5.1 Nagrywanie sesji

1. Kliknij **„● Record session”** na toolbarze → podaj nazwę (opcjonalnie)
2. Live tail działa normalnie; czerwony pulsujący wskaźnik pokazuje `◉ REC · <name> · 00:42 · 23 reqs`
3. Kliknij **„⏹ Stop”** → snapshot sesji trafia do `inspector_sessions` + `inspector_session_requests`

### 5.2 Podgląd nagranej sesji

Dropdown **Sessions** na toolbarze listuje zapisane sesje. Wybór jednej:

- Ładuje snapshot sesji (zamrożony stan)
- Banner pokazuje: `Viewing recorded session "<name>" — [Back to live]`
- Zakładka Stats staje się dostępna z agregatami Recharts

### 5.3 Formaty eksportu

Każdą sesję można wyeksportować jako:

| Format                     | Use                                                                             |
| -------------------------- | ------------------------------------------------------------------------------- |
| **HAR** (HTTP Archive 1.2) | Kompatybilny z Chrome DevTools, Charles, Fiddler — import do analizy offline    |
| **JSONL**                  | Jeden `InterceptedRequest` na linię — kompatybilny z formatem `llm-interceptor` |

Eksport przez `GET /api/tools/traffic-inspector/sessions/{id}/export.har` lub przycisk ⬇ w dropdownie Sessions.

---

## §6 Bezpieczeństwo

Traffic Inspector pokazuje **cały przechwycony ruch HTTPS**, w tym nagłówki autoryzacji i body żądań. Wdrożone są następujące kontrole:

| Control                       | Details                                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **LOCAL_ONLY**                | Wszystkie trasy i endpoint WebSocket są tylko loopback (egzekwowane w `routeGuard.ts` przed auth)                                          |
| **Secret masking**            | `maskSecrets()` stosowane do wszystkich nagłówków i body przed `TrafficBuffer.push()` — domyślnie włączone (`INSPECTOR_MASK_SECRETS=true`) |
| **Body size cap**             | Body > `INSPECTOR_MAX_BODY_KB` (domyślnie 1024 KB) są obcinane z notatką `"(truncated for performance)"`                                   |
| **Sensitive header masking**  | `authorization`, `cookie`, `api-key`, `x-api-key`, `proxy-authorization` → `Bearer ***` w zakładce Headers; toggle „Show secrets”          |
| **CSP**                       | Ścisła Content Security Policy na stronach Traffic Inspector, by zapobiec XSS przez wstrzyknięte body response                             |
| **No persistence by default** | `TrafficBuffer` jest w pamięci i ginie przy restarcie serwera. Sesje są persystowane tylko przy jawnym nagraniu                            |

### Zastosowane Hard Rules

| Rule                              | Application                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`    | Wszystkie HTTP error response z tras Traffic Inspector są sanityzowane                      |
| **#15 + #17** `isLocalOnlyPath()` | `/api/tools/traffic-inspector/` jest LOCAL_ONLY + SPAWN_CAPABLE (komendy proxy systemowego) |

### Znane ograniczenia

- **Tryb proxy systemowego** wpływa na wszystkie aplikacje na maszynie, w tym klienty VPN i SSO. Zawsze używaj z timerem auto-wyłączenia. Nie używaj na współdzielonych maszynach.
- **HTTPS tunelu CONNECT**: Mode 3 (HTTP_PROXY) przechwytuje tylko metadane tunelu dla destynacji HTTPS, chyba że włączona jest interceptacja TLS. To zamierzone — przezroczyste przechwytywanie bez zaufania certyfikatowi AgentBridge złamałoby weryfikację TLS w tych aplikacjach.
- **Hardcoded stringi w niektórych komponentach**: część komponentów UI (F7/F8) ma niewielką liczbę hardcoded stringów jeszcze nieobjętych kluczami i18n. Są udokumentowane jako Known Limitation w raporcie luk i18n; migracja w follow-up. Dotknięte stringi to dekoracyjne etykiety UI, które nie wymagają tłumaczenia do użycia funkcjonalnego.

---

## §7 Rozwiązywanie problemów

### Rozłączenie WebSocket

Jeśli live tail pokazuje „Disconnected”:

1. Sprawdź, czy serwer nadal działa: `GET /api/tools/traffic-inspector/capture-modes`
2. Przeładuj stronę — WebSocket łączy się ponownie i dostaje świeży snapshot
3. Jeśli serwer został zrestartowany, bufor w pamięci został wyczyszczony — stare wpisy znikają, chyba że sesja była nagrana

### Konflikt portu 8080

Jeśli tryb HTTP_PROXY nie startuje:

```bash
lsof -i :8080    # find the process
```

Zmień port:

```bash
# .env
INSPECTOR_HTTP_PROXY_PORT=8888
```

### Proxy systemowe nie zostało cofnięte

Jeśli OmniRoute crashnie przy aktywnym trybie proxy systemowego:

**macOS:**

```bash
networksetup -setwebproxystate Wi-Fi off
networksetup -setsecurewebproxystate Wi-Fi off
```

**Linux (GNOME):**

```bash
gsettings set org.gnome.system.proxy mode 'none'
```

**Windows:**

```cmd
netsh winhttp reset proxy
```

Dashboard przy następnym załadowaniu zaproponuje też „Revert system proxy”, jeśli wykryje w stanie DB, że proxy było aktywne.

### Pełny bufor

Gdy bufor osiągnie `INSPECTOR_BUFFER_SIZE` (domyślnie 1000), nowe wpisy wypychają najstarsze. Jeśli gubisz ważne żądania:

- Zwiększ `INSPECTOR_BUFFER_SIZE` (np. 5000) — pamięć za retencję
- Nagraj sesję, by utrwalić istotny fragment w DB

---

## §8 Referencja API

Wszystkie trasy są `LOCAL_ONLY` (tylko loopback) i `SPAWN_CAPABLE` (komendy proxy systemowego). Zobacz `src/server/authz/routeGuard.ts`.

Base path: `/api/tools/traffic-inspector/`

### Zarządzanie żądaniami

| Method | Path                        | Description                                                                       |
| ------ | --------------------------- | --------------------------------------------------------------------------------- |
| GET    | `/requests`                 | Lista żądań (filtrowalna: `?profile=llm&host=&agent=&status=&source=&sessionId=`) |
| GET    | `/requests/{id}`            | Szczegóły pojedynczego żądania                                                    |
| DELETE | `/requests`                 | Czyści bufor w pamięci                                                            |
| POST   | `/requests/{id}/replay`     | Ponownie wykonuje to samo żądanie przez router OmniRoute                          |
| PUT    | `/requests/{id}/annotation` | Zapisuje lub aktualizuje notatkę przy żądaniu                                     |

### WebSocket

| Method | Path  | Description                                                                                |
| ------ | ----- | ------------------------------------------------------------------------------------------ |
| GET    | `/ws` | Live stream WebSocket. Wysyła `snapshot` przy connect, potem eventy `new`/`update`/`clear` |

### Eksport

| Method | Path          | Description                                         |
| ------ | ------------- | --------------------------------------------------- |
| GET    | `/export.har` | Eksport bieżącej przefiltrowanej listy jako HAR 1.2 |

### Custom hosts

| Method | Path            | Description                             |
| ------ | --------------- | --------------------------------------- |
| GET    | `/hosts`        | Lista custom hostów                     |
| POST   | `/hosts`        | Dodaje host (auto-edytuje `/etc/hosts`) |
| DELETE | `/hosts/{host}` | Usuwa host                              |
| PATCH  | `/hosts/{host}` | Przełącza `enabled`                     |

### Tryby przechwytywania

| Method | Path                           | Description                                                                                 |
| ------ | ------------------------------ | ------------------------------------------------------------------------------------------- |
| GET    | `/capture-modes`               | Stan trybów AgentBridge / custom-hosts / HTTP_PROXY / system-proxy + toggle `tls-intercept` |
| POST   | `/capture-modes/http-proxy`    | Start/stop listenera HTTP_PROXY (`{action: "start"\|"stop"}`)                               |
| POST   | `/capture-modes/system-proxy`  | Apply/revert proxy systemowego (`{action: "apply"\|"revert"}`)                              |
| POST   | `/capture-modes/tls-intercept` | Toggle deszyfracji body HTTPS w trybie proxy (`{enabled: boolean}`)                         |

> **TPROXY decrypt** (tryb przechwytywania 5) jest sterowany przez **osobną** trasę pod
> prefiksem AgentBridge — `GET / POST / DELETE /api/tools/agent-bridge/tproxy` — nie
> pod `/api/tools/traffic-inspector/`. Zobacz
> [`docs/security/MITM-TPROXY-DECRYPT.md`](../security/MITM-TPROXY-DECRYPT.md).

### Sesje

| Method | Path                        | Description                                                   |
| ------ | --------------------------- | ------------------------------------------------------------- |
| POST   | `/sessions`                 | Start nagrywania (`{name?: string}`)                          |
| PATCH  | `/sessions/{id}`            | Stop lub rename (`{action: "stop"\|"rename", name?: string}`) |
| GET    | `/sessions`                 | Lista wszystkich zapisanych sesji                             |
| GET    | `/sessions/{id}`            | Snapshot sesji (wszystkie żądania)                            |
| DELETE | `/sessions/{id}`            | Usuwa sesję                                                   |
| GET    | `/sessions/{id}/export.har` | Eksport sesji jako HAR 1.2                                    |

### Internal ingest (fallback D4)

| Method | Path               | Description                                                                                                           |
| ------ | ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| POST   | `/internal/ingest` | Przyjmuje przechwycone żądanie ze ścieżki passthrough `server.cjs`; wymaga nagłówka `INSPECTOR_INTERNAL_INGEST_TOKEN` |

Pełne schematy OpenAPI: `docs/openapi.yaml` → tag `Traffic Inspector`.
