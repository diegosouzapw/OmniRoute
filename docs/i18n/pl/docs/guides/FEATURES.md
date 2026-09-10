---
title: "OmniRoute — Galeria funkcji dashboardu"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — Galeria funkcji dashboardu

🌐 **Languages:** 🇺🇸 [English](../../../../guides/FEATURES.md) · 🇸🇦 [ar](../../../ar/docs/guides/FEATURES.md) · 🇦🇿 [az](../../../az/docs/guides/FEATURES.md) · 🇧🇬 [bg](../../../bg/docs/guides/FEATURES.md) · 🇧🇩 [bn](../../../bn/docs/guides/FEATURES.md) · 🇨🇿 [cs](../../../cs/docs/guides/FEATURES.md) · 🇩🇰 [da](../../../da/docs/guides/FEATURES.md) · 🇩🇪 [de](../../../de/docs/guides/FEATURES.md) · 🇪🇸 [es](../../../es/docs/guides/FEATURES.md) · 🇮🇷 [fa](../../../fa/docs/guides/FEATURES.md) · 🇫🇮 [fi](../../../fi/docs/guides/FEATURES.md) · 🇫🇷 [fr](../../../fr/docs/guides/FEATURES.md) · 🇮🇳 [gu](../../../gu/docs/guides/FEATURES.md) · 🇮🇱 [he](../../../he/docs/guides/FEATURES.md) · 🇮🇳 [hi](../../../hi/docs/guides/FEATURES.md) · 🇭🇺 [hu](../../../hu/docs/guides/FEATURES.md) · 🇮🇩 [id](../../../id/docs/guides/FEATURES.md) · 🇮🇹 [it](../../../it/docs/guides/FEATURES.md) · 🇯🇵 [ja](../../../ja/docs/guides/FEATURES.md) · 🇰🇷 [ko](../../../ko/docs/guides/FEATURES.md) · 🇮🇳 [mr](../../../mr/docs/guides/FEATURES.md) · 🇲🇾 [ms](../../../ms/docs/guides/FEATURES.md) · 🇳🇱 [nl](../../../nl/docs/guides/FEATURES.md) · 🇳🇴 [no](../../../no/docs/guides/FEATURES.md) · 🇵🇭 [phi](../../../phi/docs/guides/FEATURES.md) · 🇵🇹 [pt](../../../pt/docs/guides/FEATURES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/FEATURES.md) · 🇷🇴 [ro](../../../ro/docs/guides/FEATURES.md) · 🇷🇺 [ru](../../../ru/docs/guides/FEATURES.md) · 🇸🇰 [sk](../../../sk/docs/guides/FEATURES.md) · 🇸🇪 [sv](../../../sv/docs/guides/FEATURES.md) · 🇰🇪 [sw](../../../sw/docs/guides/FEATURES.md) · 🇮🇳 [ta](../../../ta/docs/guides/FEATURES.md) · 🇮🇳 [te](../../../te/docs/guides/FEATURES.md) · 🇹🇭 [th](../../../th/docs/guides/FEATURES.md) · 🇹🇷 [tr](../../../tr/docs/guides/FEATURES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/FEATURES.md) · 🇵🇰 [ur](../../../ur/docs/guides/FEATURES.md) · 🇻🇳 [vi](../../../vi/docs/guides/FEATURES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/FEATURES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/FEATURES.md)

Wizualny przewodnik po każdej sekcji dashboardu OmniRoute.

> 📅 **Ostatnia aktualizacja:** 2026-06-28 — **v3.8.40**

---

## ✨ Najważniejsze nowości v3.8.0

Cykl v3.7.x → v3.8.0 dodał auto-routing bez konfiguracji, nowych providerów, przepływy OAuth, głębszą odporność oraz znacznie bogatsze doświadczenie CLI. Poniżej kluczowe funkcje — pełne szczegóły dalej w dokumencie i w powiązanych specyfikacjach.

- 🤖 **Auto Combo / Zero-config auto-routing** — używaj prefiksów `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`. Oparte na 13-czynnikowym silniku scoringu i 4 kuratorowanych **mode packs** (ship-fast, cost-saver, quality-first, offline-friendly)
- 🆕 **Provider Command Code** (#2199) — rejestracja pierwszej klasy z katalogiem modeli i śledzeniem quota
- 🆕 **Provider Z.AI** — nowy provider w darmowym tierze z etykietami quota
- 🎬 **Rozszerzenie mediów KIE** — rozszerzony katalog, w tym modele generacji wideo
- 🔐 **Uwierzytelnianie Devin** — Desktop importuje istniejący klucz API Devin; CLI używa lokalnych poświadczeń `devin auth login`
- 🆓 **8 nowych darmowych providerów** — LLM7, Lepton, UncloseAI, BazaarLink, Completions, Enally, FreeTheAi, Command Code
- 🎯 **Manifest-aware tier routing W1–W4** — manifesty providerów sterują ważonym wyborem tierów
- 🎨 **Pełna zgodność Cursor z OpenAI** — tool calls, streaming, zarządzanie sesjami end-to-end
- 📊 **Użycie planu Cursor Pro** — dane quota i cyklu widoczne w dashboardzie provider-limits
- ⚡ **Podział service tier / analityka szybkiego tieru Codex** — widoczność zużycia per tier
- 📌 **Per-session sticky routing** — sesje Codex przypinają to samo konto między turami
- 🔊 **Ulepszenia Inworld TTS** — katalogi głosów, streaming i poprawa opóźnień
- 🔑 **Kiro headless auth** — logowanie przez lokalny magazyn SQLite `kiro-cli`, bez przeglądarki
- 📉 **Monitorowanie quota i limitów DeepSeek** — użycie dzienne/miesięczne widoczne w dashboardzie
- 🔄 **Strategia routingu reset-aware** — combo preferują konta, których okno quota resetuje się najszybciej
- ⏱️ **`fallbackDelayMs`** oraz **dynamiczne wykrywanie limitów narzędzi** — precyzyjniejszy timing fallbacku + limity liczby narzędzi per provider
- 🔧 **Degradacja trybu background (Responses API)** — przełącza na tryb synchroniczny ze strukturalnym ostrzeżeniem, gdy upstream nie obsługuje background polling
- 🚦 **Klasyfikacja 429 per provider** + przełącznik `useUpstream429BreakerHints` — precyzyjniejsze zachowanie breakera z użyciem wskazówek rate-limit z upstreamu
- 🩺 **Dashboard model cooldowns** — podgląd blokad per model i ręczne ponowne włączanie z UI
- 🔒 **MITM dynamiczna detekcja certyfikatów Linux** — działa na Debian/Ubuntu, Fedora/RHEL, Arch i innych dystrybucjach
- 💻 **Pakiet ulepszeń CLI** — ponad 20 poleceń, w tym `omniroute providers`, `omniroute combos`, `omniroute doctor`, `omniroute setup`
- 🔍 **Odkrywanie modeli embeddingów Qdrant** — automatyczna sonda modeli vector-store
- 🔑 **API Keys / Bearer keys z zakresem `manage`** — operacje administracyjne programowo przez API
- 🏥 **Analityka zdrowia celów combo** + **strukturalny builder combo** — zdrowie per target i builder UI do składania kroków `(provider, model, connection)`
- 🤝 **Provider OAuth GitLab Duo** — logowanie danymi GitLab
- 🧠 **Reasoning Replay Cache** — hybrydowa persystencja śladów reasoning: pamięć + SQLite

📚 **Powiązane dokumenty:** [Skills Framework](../frameworks/SKILLS.md) · [Memory System](../frameworks/MEMORY.md) · [Cloud Agents](../frameworks/CLOUD_AGENT.md) · [Webhooks](../frameworks/WEBHOOKS.md) · [Reasoning Replay Cache](../routing/REASONING_REPLAY.md)

---

## 🔌 Providers

Zarządzaj połączeniami z providerami AI: providerzy OAuth (Claude Code, Codex), providerzy z kluczem API (Groq, DeepSeek, OpenRouter) oraz darmowi providerzy (Qoder, Kiro). Konta Kiro obejmują śledzenie salda kredytów — pozostałe kredyty, całkowity limit i data odnowienia widoczne w Dashboard → Usage.

Połączenia OpenRouter mogą przechowywać per-connection `preset` w Advanced Settings. Gdy jest ustawiony, OmniRoute wysyła go jako pole najwyższego poziomu żądania OpenRouter, na przykład `"preset": "email-copywriter"`, chyba że żądanie klienta już dostarczyło własny `preset`.

![Providers Dashboard](../screenshots/01-providers.png)

---

## 🎨 Combos

Twórz combo routingu modeli z 19 publicznymi strategiami: priority, weighted, round-robin,
context-relay, fill-first, p2c (power-of-two-choices), random, least-used, cost-optimized,
reset-aware, reset-window, headroom, strict-random, auto, lkgp (last-known-good-provider),
context-optimized, cache-optimized, **fusion** (równoległy fan-out do panelu modeli, a następnie
synteza jednej odpowiedzi przez judge) oraz **pipeline**. Każde combo łączy wiele modeli z
automatycznym fallbackiem i zawiera szybkie szablony oraz kontrole gotowości.

Niedawne ulepszenia combo:

- **Strukturalny builder combo** — twórz każdy krok, wybierając providera, model i dokładne konto/połączenie
- **Wsparcie powtórzonego providera** — używaj tego samego providera wiele razy w jednym combo, o ile krotka `(provider, model, connection)` jest unikalna
- **Zdrowie celów combo** — analityka i widoki zdrowia rozróżniają teraz poszczególne cele/kroki combo zamiast spłaszczać wszystko do stringów modeli
- **Złożone porządkowanie tierów** — `defaultTier -> fallbackTier` wpływa teraz na kolejność wykonania/fallbacku w runtime dla kroków combo najwyższego poziomu

![Combos Dashboard](../screenshots/02-combos.png)

---

## 📊 Analytics

Kompleksowa analityka użycia ze zużyciem tokenów, szacunkami kosztów, mapami ciepła aktywności, wykresami tygodniowego rozkładu oraz podziałami per provider.

![Analytics Dashboard](../screenshots/03-analytics.png)

---

## 🏥 System Health

Monitorowanie w czasie rzeczywistym: uptime, pamięć, wersja, percentyle opóźnień (p50/p95/p99), statystyki cache, stany circuit breakerów providerów, aktywne sesje monitorowane pod kątem quota oraz zdrowie celów combo.

![Health Dashboard](../screenshots/04-health.png)

---

## 🔧 Translator Playground

Cztery tryby debugowania tłumaczeń API: **Playground** (konwerter formatów), **Chat Tester** (żywe żądania), **Test Bench** (testy wsadowe) oraz **Live Monitor** (strumień w czasie rzeczywistym).

![Translator Playground](../screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Testuj dowolny model bezpośrednio z dashboardu. Wybierz providera, model i endpoint, pisz prompty w Monaco Editor, streamuj odpowiedzi w czasie rzeczywistym, przerywaj w trakcie streamu i przeglądaj metryki czasowe.

---

## 🎨 Themes _(v2.0.5+)_

Konfigurowalne motywy kolorów dla całego dashboardu. Wybierz spośród 7 presetów kolorów (Coral, Blue, Red, Green, Violet, Orange, Cyan) albo utwórz własny motyw, wybierając dowolny kolor hex. Obsługa trybu light, dark i system.

---

## ⚙️ Settings

Kompleksowy panel ustawień z **7 kartami**:

- **General** — Pamięć systemowa, zarządzanie kopiami zapasowymi (export/import bazy)
- **Appearance** — Selektor motywu (dark/light/system), presety kolorów i kolory własne, widoczność logów health, kontrola widoczności elementów i separatorów grup w sidebarze, kontrola widoczności tuneli Endpoint
- **AI** — Funkcje asystenta AI, domyślne presety routingu (Auto Combo `auto/coding`, `auto/fast`, `auto/cheap`, `auto/smart`), cache reasoning replay oraz przełączniki skill/memory
- **Security** — Ochrona endpointów API, blokowanie niestandardowych providerów, filtrowanie IP, informacje o sesji
- **Routing** — Aliasy modeli, degradacja zadań w tle, manifest-aware tier routing (W1–W4), `fallbackDelayMs`, per-session sticky routing
- **Resilience** — Trwałość limitów rate, strojenie circuit breakera, auto-wyłączanie zbanowanych kont, monitoring wygasania providerów, próg handoff **Context Relay** i konfiguracja modelu podsumowań, klasyfikacja 429 per provider oraz przełącznik `useUpstream429BreakerHints`, model cooldowns
- **Advanced** — Nadpisania konfiguracji, ślad audytu konfiguracji, tryb degradacji fallbacku, degradacja trybu background dla Responses API

![Settings Dashboard](../screenshots/06-settings.png)

---

## 🔧 CLI Tools

Konfiguracja jednym kliknięciem dla narzędzi do kodowania AI: Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor i Factory Droid. Funkcje: automatyczne apply/reset konfiguracji, profile połączeń i mapowanie modeli.

![CLI Tools Dashboard](../screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Dashboard do odkrywania i zarządzania agentami CLI. Pokazuje siatkę 16 wbudowanych agentów (Codex, Claude, Goose, OpenClaw, Aider, OpenCode, Cline, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp, **Windsurf**, **Devin CLI**, **Kimi Coding**, **Command Code**) z:

- **Statusem instalacji** — Installed / Not Found z wykrywaniem wersji
- **Odznakami protokołów** — stdio, HTTP itd.
- **Własnymi agentami** — Rejestruj dowolne narzędzie CLI przez formularz (nazwa, binary, polecenie wersji, argumenty spawn)
- **CLI Fingerprint Matching** — Przełącznik per provider dopasowujący natywne sygnatury żądań CLI, zmniejszający ryzyko bana przy zachowaniu IP proxy
- **Lokalne uwierzytelnianie Devin** — Devin CLI używa `devin auth login`; przepływ OAuth w przeglądarce nie jest wymagany

---

## 🔗 Context Relay _(v3.5.5+)_

Strategia combo, która zachowuje ciągłość sesji, gdy rotacja konta następuje w trakcie rozmowy. Zanim aktywne konto się wyczerpie, OmniRoute generuje w tle strukturalne podsumowanie handoff. Po tym, jak kolejne żądanie rozwiąże się na inne konto, podsumowanie jest wstrzykiwane jako komunikat systemowy, dzięki czemu nowe konto kontynuuje z pełnym kontekstem.

Konfigurowalne przez ustawienia na poziomie combo lub globalne:

- **Handoff Threshold** — Procent użycia quota uruchamiający generowanie podsumowania (domyślnie 85%)
- **Max Messages For Summary** — Ile ostatnich wiadomości skondensować
- **Summary Model** — Opcjonalny model nadpisujący do generowania podsumowania handoff

Obecnie obsługuje rotację kont Codex. Zobacz [dokumentację Context Relay](../architecture/ARCHITECTURE.md).

---

## 🗜️ Prompt Compression _(v3.7.9+)_

Context & Cache udostępnia teraz dedykowane strony dla Caveman, RTK i Compression Combos:

- **Caveman** — pakiety reguł świadome języka, podgląd, kontrola trybu wyjścia i analityka
- **RTK** — kompresja świadoma poleceń dla wyjścia shell, git, test, build, package, Docker, infra, JSON i stack-trace
- **Compression Combos** — nazwane potoki, takie jak `rtk -> caveman`, przypisane do combo routingu; domyślna matematyka stacked osiąga średnio `~89%` oraz `78-95%` oszczędności eligible-context, gdy działają oba silniki
- **Raw-output recovery** — opcjonalne zredagowane wskaźniki raw-output RTK do debugowania skompresowanych awarii

Zobacz [Compression Guide](../compression/COMPRESSION_GUIDE.md), [RTK Compression](../compression/RTK_COMPRESSION.md) oraz
[Compression Engines](../compression/COMPRESSION_ENGINES.md).

---

## 🛡️ Proxy Hardening _(v3.5.5+)_

Kompleksowe egzekwowanie konfiguracji proxy w całym potoku żądań:

- **Token Health Check** — Odświeżanie OAuth w tle rozwiązuje teraz konfigurację proxy per połączenie, zapobiegając awariom w środowiskach wymagających proxy
- **Walidacja klucza API** — Walidacja klucza providera (`POST /api/providers/validate`) przechodzi przez `runWithProxyContext`, honorując ustawienia proxy na poziomie providera i globalne
- **Poprawka undici Dispatcher** — Dispatchery proxy używają własnej implementacji fetch undici zamiast wbudowanego fetch Node, rozwiązując błędy `invalid onRequestStart method` na Node.js 22
- **Wykrywanie wersji Node.js** — Strona logowania proaktywnie wykrywa niekompatybilne wersje Node.js (24+) i wyświetla baner ostrzegawczy z instrukcją użycia Node 22 LTS

---

## 📧 Maskowanie prywatności e-mail _(v3.5.6+)_

E-maile kont OAuth są domyślnie maskowane (np. `di*****@g****.com`), aby zapobiec przypadkowemu ujawnieniu przy udostępnianiu zrzutów ekranu lub nagrywaniu dem. Użyj Settings → Appearance → Account email visibility, aby globalnie ujawnić lub zamaskować pełne e-maile kont w widokach providers, combos, logs, quota i playground.

---

## 👁️ Przełącznik widoczności modeli _(v3.5.6+)_

Lista modeli na stronie providera obejmuje teraz:

- **Pasek wyszukiwania/filtrowania w czasie rzeczywistym** — Szybko znajdź konkretne modele
- **Przełącznik widoczności per model** (ikona 👁) — Ukryte modele są wyszarzone i wykluczone z katalogu `/v1/models`
- **Odznaka liczby aktywnych** (`N/M active`) — Pokazuje od razu, ile modeli jest włączonych względem całkowitej liczby

---

## 🔧 OAuth Env Repair _(v3.6.1+)_

Akcja „Repair env” jednym kliknięciem dla providerów OAuth przywraca brakujące zmienne środowiskowe i naprawia uszkodzony stan auth. Dostępna z `Dashboard → Providers → [OAuth Provider] → Repair env`. Automatycznie wykrywa i naprawia:

- Brakujące poświadczenia klienta OAuth
- Uszkodzone wpisy w pliku env
- Sanityzację ścieżek backupu

---

## 🗑️ Uninstall / Full Uninstall _(v3.6.2+)_

Skrypty czystego usuwania dla wszystkich metod instalacji:

| Polecenie                | Działanie                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `npm run uninstall`      | Usuwa aplikację systemową, ale **zachowuje DB i konfiguracje** w `~/.omniroute`.     |
| `npm run uninstall:full` | Usuwa aplikację ORAZ trwale **kasuje wszystkie konfiguracje, klucze i bazy danych**. |

---

## 🖼️ Media _(v2.0.3+)_

Generuj obrazy, wideo i muzykę z dashboardu. Obsługa OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open i MusicGen.

---

## 📝 Request Logs

Logowanie żądań w czasie rzeczywistym z filtrowaniem po providerze, modelu, koncie i kluczu API. Pokazuje kody statusu, użycie tokenów, opóźnienie i szczegóły odpowiedzi.

![Usage Logs](../screenshots/08-usage.png)

---

## 🌐 API Endpoint

Twój zunifikowany endpoint API z podziałem możliwości: Chat Completions, Responses API, Embeddings, Image Generation, Reranking, Audio Transcription, Text-to-Speech, Moderations oraz zarejestrowane klucze API. Dostępne są Cloudflare Quick Tunnel, Tailscale Funnel, ngrok Tunnel oraz wsparcie cloud proxy do zdalnego dostępu.

![Endpoint Dashboard](../screenshots/09-endpoint.png)

---

## 🔑 Zarządzanie kluczami API

Twórz, nadawaj zakresy i odwołuj klucze API. Każdy klucz może być ograniczony do konkretnych modeli/providerów z pełnym dostępem lub uprawnieniami tylko do odczytu. Wizualne zarządzanie kluczami ze śledzeniem użycia.

---

## 📋 Audit Log

Śledzenie działań administracyjnych z filtrowaniem po typie akcji, aktorze, celu, adresie IP i znaczniku czasu. Pełna historia zdarzeń bezpieczeństwa.

---

## 🖥️ Aplikacja desktopowa

Natywna aplikacja desktopowa Electron dla Windows, macOS i Linux. Uruchamiaj OmniRoute jako samodzielną aplikację z integracją zasobnika systemowego, wsparciem offline, auto-update i instalacją jednym kliknięciem.

Kluczowe funkcje:

- Polling gotowości serwera (bez pustego ekranu przy cold start)
- Zasobnik systemowy z zarządzaniem portem
- Content Security Policy
- Blokada jednej instancji
- Auto-update przy restarcie
- UI warunkowe platformowo (traffic lights macOS, domyślny pasek tytułu Windows/Linux)
- Wzmocnione pakowanie buildu Electron — symlinkowane `node_modules` w bundlu standalone są wykrywane i odrzucane przed pakowaniem, zapobiegając zależności runtime od maszyny build (v2.5.5+)
- **Graceful shutdown** — Electron `before-quit` zamyka Next.js czysto, zapobiegając blokadom bazy SQLite WAL (v3.6.2+)

📖 Zobacz [`electron/README.md`](../../electron/README.md), aby uzyskać pełną dokumentację.

---

## 🌐 V1 WebSocket Bridge _(v3.6.6+)_

OmniRoute obsługuje teraz **klienty WebSocket zgodne z OpenAI** przez endpoint upgrade `/v1/ws`. Niestandardowy serwer `scripts/dev/v1-ws-bridge.mjs` owija Next.js i upgrade’uje połączenia WS do pełnych dwukierunkowych sesji streamingowych. Uwierzytelnianie używa tego samego klucza API lub cookie sesji co żądania HTTP.

Kluczowe zachowania:

- Upgrade WS walidowany przez `src/lib/ws/handshake.ts` przed nawiązaniem połączenia
- Strumienie zamykane czysto przy zamknięciu sesji lub błędzie upstream
- Działa jednocześnie obok istniejącej ścieżki streamingu HTTP+SSE

---

## 🔑 Sync Tokens i Config Bundle _(v3.6.6+)_

Dostęp z wielu urządzeń i zewnętrznych operatorów jest teraz możliwy dzięki **scoped sync tokens**:

- **`POST /api/sync/tokens`** — Wystaw nowy sync token (z zakresem, z opcjonalnym wygaśnięciem)
- **`DELETE /api/sync/tokens/:id`** — Odwołaj token
- **`GET /api/sync/bundle`** — Pobierz wersjonowany, kluczowany ETag zrzut JSON wszystkich niepoufnych ustawień (hasła zredagowane)

Config bundle jest budowany przez `src/lib/sync/bundle.ts`. Konsumenci porównują nagłówek odpowiedzi `ETag`, aby wykryć zmiany bez ponownego pobierania pełnego payloadu.

---

## 🧠 GLM Thinking Preset _(v3.6.6+)_

**GLM Thinking (`glmt`)** jest teraz zarejestrowanym providerem pierwszej klasy: 65 536 max output tokens, 24 576 thinking budget, domyślny timeout 900 s, format API zgodny z Claude oraz współdzielona synchronizacja użycia z rodziną GLM.

**Hybrydowe zliczanie tokenów** również wchodzi w v3.6.6: gdy provider zgodny z Claude udostępnia `/messages/count_tokens`, OmniRoute wywołuje go przed dużymi żądaniami z łagodnym fallbackiem estymacji.

---

## 🛡️ Safe Outbound Fetch i SSRF Guard _(v3.6.6+)_

Wszystkie wywołania walidacji providerów i odkrywania modeli przechodzą teraz przez dwuwarstwową ochronę wychodzącą:

1. **URL guard** (`src/shared/network/outboundUrlGuard.ts`) — Blokuje zakresy IP private/loopback/link-local przed otwarciem gniazda.
2. **Safe fetch wrapper** (`src/shared/network/safeOutboundFetch.ts`) — Stosuje URL guard, normalizuje timeouty i ponawia przejściowe błędy z exponential backoff.

Naruszenia guarda pojawiają się jako HTTP 422 (`URL_GUARD_BLOCKED`) i są zapisywane w logu audytu compliance przez `providerAudit.ts`.

---

## 🔄 Ponowienia świadome cooldown _(v3.6.6+)_

Żądania chat **automatycznie ponawiają się**, gdy upstream provider zwraca cooldown w zakresie modelu. Konfigurowalne przez `REQUEST_RETRY` (domyślnie: 2) i `MAX_RETRY_DELAY_SEC` (domyślnie: 30 s). Uczenie nagłówków rate-limit ulepszone dla `x-ratelimit-reset-requests`, `x-ratelimit-reset-tokens` i `Retry-After` — stan cooldown per model jest widoczny w dashboardzie Resilience.

---

## 📋 Compliance Audit v2 _(v3.6.6+)_

Log audytu został rozszerzony o paginację cursor-based, wzbogacenie kontekstu żądania (request ID, user agent, IP), strukturalne zdarzenia auth, zdarzenia CRUD providerów z kontekstem diff oraz logowanie walidacji zablokowanej przez SSRF. Nowe zdarzenia emitowane przez `src/lib/compliance/providerAudit.ts`.
