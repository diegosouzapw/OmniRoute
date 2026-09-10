# CLI-TOOLS (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "Narzędzia CLI — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# Narzędzia CLI — OmniRoute

Ostatnia aktualizacja: 2026-08-18

OmniRoute integruje się z trzema kategoriami narzędzi CLI rozłożonymi na trzech dedykowanych stronach pulpitu:

| Strona         | Trasa                   | Koncepcja                                                                                   | Liczba         |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------------- | -------------- |
| **Kod CLI**    | `/dashboard/cli-code`   | Narzędzia do kodowania, które wskazujesz na OmniRoute (Klient → CLI → OmniRoute → Dostawca) | 26             |
| **Agenci CLI** | `/dashboard/cli-agents` | Autonomiczne agenty, które wskazujesz na OmniRoute (ta sama ścieżka, szerszy zakres)        | 8              |
| **Agenci ACP** | `/dashboard/acp-agents` | CLIs, które OmniRoute uruchamia jako backend przez stdio/ACP (odwrotna ścieżka)             | zobacz rejestr |

Trasy legacy przekierowują przez 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Jak to działa

```
Kod CLI / Agenci CLI (przepływ konsumpcji):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (wszystkie wskazują na OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute kieruje do odpowiedniego dostawcy)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

Agenci ACP (odwrotny przepływ uruchamiania):
    Żądanie klienta → OmniRoute → uruchamia CLI przez stdio/ACP → odpowiedź
```

**Korzyści:**

- Jeden klucz API do zarządzania wszystkimi narzędziami
- Śledzenie kosztów we wszystkich CLI na pulpicie
- Przełączanie modeli bez ponownej konfiguracji każdego narzędzia
- Działa lokalnie i na zdalnych serwerach (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Automatyczna konfiguracja z `setup-*`

Nie musisz pisać konfiguracji każdego narzędzia ręcznie. OmniRoute dostarcza polecenie `setup-*`
dla każdego obsługiwanego CLI, które odczytuje **na żywo** katalog modeli z działającego
OmniRoute (lokalnie lub zdalnie) i zapisuje własną konfigurację narzędzia na twojej maszynie:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

Każde z nich akceptuje `--remote <url> --api-key <key>` (konfiguracja lokalnego narzędzia w
odniesieniu do zdalnego OmniRoute), `--dry-run` (podgląd bez zapisywania) oraz `--port`. Narzędzia
bez automatycznego odkrywania modeli (Cline, Kilo, Roo, Goose, Aider, Qwen) przyjmują
`--model <id>` (i `--yes` dla uruchomień bez interakcji). Aby uruchomić CLI z
odpowiednim środowiskiem wstrzykniętym i bez zapisanej konfiguracji, użyj ogólnego
uruchamiacza `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen,
gemini — cele i aliasy pochodzą z `bin/cli/cli-manifest.mjs`); legacy
uruchamiacze per-narzędzie `omniroute launch` (Claude Code) i `omniroute launch-codex`
(Codex) pozostają dostępne. Gemini CLI jest tylko do uruchamiania: jest celem `omniroute run`
ale nie ma przepisu `setup-*`/`configure`.

> **Pełna dokumentacja:** główny stół — co każde polecenie zapisuje, każdy flag,
> lokalnie vs zdalnie, i które narzędzia wymagają sufiksu `/v1` — znajduje się w
> **[Integracje CLI](../guides/CLI-INTEGRATIONS.md)**.

### Uruchamianie tych wewnątrz kontenera

Polecenie `setup-*` wykonane wewnątrz kontenera OmniRoute zapisuje w
własnym katalogu domowym kontenera, do którego żadne lokalne CLI nie ma dostępu i które znika z
kontenerem. OmniRoute to wykrywa i kończy z kodem `2` z instrukcjami zamiast
zapisywać. Dwie wspierane metody — zainstaluj CLI na hoście i
`omniroute connect` do kontenera, lub zamontuj katalogi konfiguracyjne i ustaw
`CLI_CONFIG_HOME` (profil hosta w compose). Każde polecenie `setup-*`, plus
`omniroute configure` i `omniroute config set`, akceptuje
`--allow-container-write`, gdy konfiguracja własnych CLI kontenera jest tym, co
naprawdę miałeś na myśli; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` robi to samo dla
serwera. Zobacz
[Przewodnik Docker → Konfigurowanie narzędzi CLI na hoście](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

**Endpoint zastosowania** pulpitu (`POST /api/cli-tools/apply`) egzekwuje
ten sam guard: w kontenerze, zapis, którego cel nie jest zamontowany z hosta, odpowiada
**`422`** z `containerEphemeralTarget: true`, bezpiecznym tekstem błędu i — dla narzędzi z przepisem hosta (claude, codex, opencode, cline,
kilo, continue) — `hostSetupCommand` (np. `omniroute setup-opencode`), które należy uruchomić
na hoście zamiast tego; nic nie jest zapisywane. `dryRun: true` działa nadal w trybie kontenera
i zwraca wygenerowaną zawartość + ścieżkę docelową bez dotykania dysku, więc
możesz podglądać z pulpitu i zastosować na hoście. To zachowanie jest
zamierzone i chronione przed regresją przez
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — nigdy nie "naprawiaj" 422
poprzez usunięcie guard.

## Źródło prawdy

Zunifikowany katalog znajduje się w `src/shared/constants/cliTools.ts` jako `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Każdy wpis ma te pola (zdefiniowane w `src/shared/schemas/cliCatalog.ts`):

| Pole                                            | Typ                                                          | Opis                                                                           |
| ----------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `category`                                      | `"code" \| "agent"`                                          | Na której stronie narzędzie się pojawia                                        |
| `vendor`                                        | `string`                                                     | Pochodzenie narzędzia ("Anthropic", "OSS (P. Gauthier)")                       |
| `acpSpawnable`                                  | `boolean`                                                    | Może być również używane jako agent ACP (wyświetlany badge)                    |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Poziom wsparcia dla niestandardowego punktu końcowego. `"none"` = MITM backlog |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Mechanizm konfiguracji                                                         |
| `id`, `name`, `color`, `description`, `docsUrl` | standard                                                     | Podstawowe pola wyświetlania                                                   |

Wpisy z `baseUrlSupport: "none"` **nie są wyświetlane** na stronach dashboardu — są zarejestrowane w MITM backlog dla planu 11 (zobacz `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Poziomy możliwości (skatalogowane × wykrywalne × konfigurowalne × uruchamialne)

Nie każde skatalogowane narzędzie jest wykrywalne, konfigurowalne lub uruchamialne. Każdy poziom ma jedno
deklarujące źródło, a test dryfu utrzymuje je w synchronizacji:

| Poziom             | Znaczenie                                                                           | Zadeklarowane w                                                   |
| ------------------ | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Skatalogowane**  | Pojawia się w katalogu dashboardu (nazwa, dostawca, dokumentacja, typ konfiguracji) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                  |
| **Wykrywalne**     | Wykrywanie binariów/konfiguracji, kontrole stanu, ścieżki konfiguracji              | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` runtime catalog) |
| **Konfigurowalne** | Wsparcie przez `omniroute configure <cli>` (istnieje przepis na konfigurację)       | `bin/cli/cli-manifest.mjs` (`configure: true`)                    |
| **Uruchamialne**   | Wsparcie przez `omniroute run <target>` (definiowane wstrzykiwanie env/args)        | `bin/cli/cli-manifest.mjs` (`run: true`)                          |

`bin/cli/cli-manifest.mjs` jest kanonicznym manifestem wykonywalnym dla poleceń CLI: `run`, `configure` oraz generatorów uzupełnień powłoki, które czerpią swoje
listy celów, rozwiązywanie aliasów (na przykład `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
i okablowanie flagi `--model` z niego. Guard dryfu
`tests/unit/cli/cli-manifest-drift.test.ts` zapewnia, że manifest, katalog runtime,
katalog UI i każda powierzchnia konsumencka pozostają w synchronizacji — cel dodany do
jednej powierzchni bez innych powoduje niepowodzenie zestawu testów zamiast cichego dryfu.

## 1. Katalog kodów CLI (26 narzędzi)

Wszystkie narzędzia, które pojawiają się w `/dashboard/cli-code`. Te z `baseUrlSupport: none` są podłączone przez MITM lub ręczny przewodnik zamiast niestandardowego adresu URL:

| id           | nazwa                   | dostawca            | wsparcieBaseUrl | typKonfiguracji | acpSpawnable |
| ------------ | ----------------------- | ------------------- | --------------- | --------------- | ------------ |
| claude       | Claude Code             | Anthropic           | pełne           | env             | true         |
| codex        | OpenAI Codex CLI        | OpenAI              | pełne           | custom          | true         |
| zcode        | ZCode (GLM Coding Plan) | Z.ai                | brak            | custom          | false        |
| cline        | Cline                   | OSS (ex-Claude Dev) | pełne           | custom          | true         |
| kilo         | Kilo Code               | Kilo-Org            | pełne           | custom          | false        |
| roo          | Roo Code                | Roo (OSS)           | pełne           | przewodnik      | false        |
| continue     | Continue                | continue.dev        | pełne           | przewodnik      | false        |
| aider        | Aider                   | OSS (P. Gauthier)   | pełne           | przewodnik      | true         |
| forge        | ForgeCode               | Antinomy HQ         | pełne           | custom          | true         |
| jcode        | jcode                   | 1jehuang (OSS)      | pełne           | custom          | false        |
| deepseek-tui | DeepSeek TUI            | Hunter Bown (OSS)   | pełne           | custom          | false        |
| codewhale    | CodeWhale               | Hmbown (OSS)        | pełne           | custom          | false        |
| opencode     | OpenCode                | Anomaly (ex-SST)    | pełne           | przewodnik      | true         |
| droid        | Factory Droid           | Factory AI          | częściowe       | przewodnik      | false        |
| copilot      | GitHub Copilot CLI      | GitHub/MS           | pełne           | custom          | false        |
| cursor-cli   | Cursor CLI              | Anysphere           | częściowe       | przewodnik      | true         |
| smelt        | Smelt                   | leonardcser (OSS)   | pełne           | custom          | false        |
| pi           | Pi (pi-coding-agent)    | M. Zechner (OSS)    | pełne           | custom          | false        |
| grok-build   | Grok Build              | xAI                 | pełne           | custom          | false        |
| crush        | Crush                   | OSS (Charm)         | pełne           | custom          | false        |
| qwen         | Qwen Code               | Alibaba             | pełne           | przewodnik      | true         |
| cursor       | Cursor                  | Anysphere           | brak            | przewodnik      | false        |
| antigravity  | Antigravity             | Google              | brak            | mitm            | false        |
| hermes       | Hermes                  | Nous Research       | brak            | przewodnik      | false        |
| kiro         | Kiro AI                 | Amazon              | brak            | mitm            | false        |
| custom       | Custom CLI              | —                   | pełne           | custom-builder  | false        |

Narzędzia z `baseUrlSupport: "partial"` wyświetlają znacznik "⚠ Częściowe wsparcie adresu URL" na karcie w dashboardzie.

## 2. Katalog agentów CLI (8 narzędzi)

Autonomiczne agenty, które pojawiają się w `/dashboard/cli-agents`:

| id           | nazwa            | dostawca                 | wsparcieBaseUrl | acpSpawnable |
| ------------ | ---------------- | ------------------------ | --------------- | ------------ |
| hermes-agent | Hermes Agent     | Nous Research            | pełne           | fałsz        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | pełne           | prawda       |
| goose        | Goose            | Block / Linux Foundation | pełne           | prawda       |
| interpreter  | Open Interpreter | OSS                      | pełne           | prawda       |
| warp         | Warp AI          | Warp Inc.                | częściowe       | prawda       |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | pełne           | fałsz        |
| omp          | Oh My Pi         | OSS                      | pełne           | prawda       |
| letta        | Letta CLI        | Letta                    | pełne           | fałsz        |

---

## 3. Agenci ACP (/dashboard/acp-agents)

Ta strona (zmieniona z `/dashboard/agents`) pokazuje CLI, które OmniRoute może **uruchomić** jako silniki wykonawcze w tle za pomocą protokołu stdio/ACP. Katalog jest utrzymywany osobno w `src/lib/acp/registry.ts` i **nie** jest tym samym co `CLI_TOOLS`.

---

## 4. Zaległości MITM (nie pokazane w dashboardzie)

Następujące CLI nie obsługują niestandardowego podstawowego URL-a natywnie i **nie są wymienione** na stronach kodu CLI ani agentów CLI. Są kandydatami do przechwytywania MITM w planie 11:

| CLI                 | Powód                                                                |
| ------------------- | -------------------------------------------------------------------- |
| windsurf            | BYOK ograniczone do wybranych modeli Claude + korporacyjny URL/token |
| amp                 | Zamknięty ekosystem (Sourcegraph)                                    |
| amazon-q / kiro-cli | AWS SSO auth, brak niestandardowego URL                              |
| cowork              | Anthropic Desktop, brak konfigurowalnego punktu końcowego            |

Zobacz `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` dla pełnego odniesienia.

---

## 5. API wykrywania wsadowego

Wszystkie wykrycia narzędzi są agregowane za pomocą jednego punktu końcowego:

**`GET /api/cli-tools/all-statuses`**

- Auth: `requireCliToolsAuth(request)` (tak samo jak inne trasy `/api/cli-tools/`)
- Zwraca: `Record<toolId, ToolBatchStatus>` (typ: `src/shared/types/cliBatchStatus.ts`)
- Strategia: `Promise.all` dla wszystkich narzędzi, 5s limit czasu na narzędzie
- Cache: w pamięci LRU indeksowane przez plik konfiguracyjny `mtime`. Cache unieważnione, gdy mtime się zmienia. Resetowane przy restarcie serwera.

Kształt odpowiedzi dla narzędzia:

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // oczyszczone, bez śladów stosu
}
```

## 6. Obsługa Ustawień dla Nowych Narzędzi

Nowe narzędzia z `configType: "custom"` mają dedykowane trasy API do ustawień:

| Trasa                                       | Narzędzie                                                        |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                          |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                           |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primary + legacy `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Pi coding agent                                                  |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)            |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + dedicated `.env` key)       |

Wszystkie trasy używają `sanitizeErrorMessage()` do odpowiedzi błędów (Twarda zasada #12).

---

## 7. Architektura Stron Dashboardu

### Kod CLI (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — komponent serwera
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — klient grid
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — strona szczegółów narzędzia
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 specjalistycznych kart narzędzi + `ToolDetailClient.tsx`

### Agenci CLI (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — komponent serwera
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — klient grid
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — ponownie wykorzystuje `ToolDetailClient`

### Agenci ACP (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — komponent serwera (przeniesiony z `agents/`)

### Wspólne Komponenty UI (`src/shared/components/cli/`)

| Plik                    | Cel                                                                    |
| ----------------------- | ---------------------------------------------------------------------- |
| `CliToolCard.tsx`       | Inteligentna karta statusu (wykrywanie + konfiguracja + punkt końcowy) |
| `CliConceptCard.tsx`    | Karta wyjaśniająca pojęcie na stronie                                  |
| `CliComparisonCard.tsx` | Porównanie w trzech kolumnach między typami CLI                        |
| `BaseUrlSelect.tsx`     | Dropdown punktu końcowego (Lokalny/Chmura/Custom)                      |
| `ApiKeySelect.tsx`      | Selektor klucza API                                                    |
| `ManualConfigModal.tsx` | Modal z fragmentem konfiguracyjnym do skopiowania                      |

### Wspólny Hook (`src/shared/hooks/cli/`)

| Plik                      | Cel                                                                          |
| ------------------------- | ---------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Pobiera `/api/cli-tools/all-statuses`, zarządza stanem ładowania/odświeżania |

## 8. i18n

Nowe przestrzenie nazw dodane w planie 14 F9:

| Przestrzeń nazw | Cel                                                                                    |
| --------------- | -------------------------------------------------------------------------------------- |
| `cliCommon`     | Wspólne ciągi (etykiety kart, teksty koncepcji/porównań, etykiety stron szczegółowych) |
| `cliCode`       | Ciągi stron kodu CLI                                                                   |
| `cliAgents`     | Ciągi stron agentów CLI                                                                |
| `acpAgents`     | Ciągi stron agentów ACP                                                                |

Pełne tłumaczenia PT-BR i EN są dostępne. 39 innych lokalizacji automatycznie przechodzi na EN poprzez scalanie na poziomie przestrzeni nazw w `src/i18n/request.ts`.

---

## 9. Szybki start

### Krok 1 — Uzyskaj klucz API OmniRoute

1. Otwórz `/dashboard/api-manager` → **Utwórz klucz API**
2. Nadaj mu nazwę (np. `cli-tools`) i wybierz wszystkie uprawnienia
3. Skopiuj klucz — będziesz go potrzebować w każdym CLI poniżej

> Twój klucz wygląda jak: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Krok 2 — Zainstaluj narzędzia CLI

Wszystkie narzędzia oparte na npm wymagają Node.js 22.22.2+ lub 24.x:

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Google Gemini CLI (uruchamiane przez `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Oparte na Rust

# Pi coding agent
# zobacz https://github.com/zechnerj/pi-coding-agent w celu instalacji

# jcode
# zobacz https://github.com/1jehuang/jcode w celu instalacji
```

---

### Krok 3 — Skonfiguruj przez Dashboard

1. Przejdź do `http://localhost:20128/dashboard/cli-code`
2. Znajdź swoje narzędzie w siatce
3. Kliknij kartę, aby otworzyć stronę szczegółów narzędzia
4. Wybierz swój klucz API i podstawowy URL
5. Kliknij **Zastosuj konfigurację** lub skopiuj ręczny fragment konfiguracji

---

### Krok 4 — Ustaw globalne zmienne środowiskowe

```bash
# Uniwersalny punkt końcowy OmniRoute
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI odczytuje GOOGLE_GEMINI_BASE_URL na ROOT (jego SDK dodaje /v1beta/... samodzielnie)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Dla **zdalnego serwera** zamień `localhost:20128` na adres IP serwera lub domenę,
> np. `http://<your-server-ip>:20128`.

---

### Krok 4 — Skonfiguruj każde narzędzie

#### Claude Code

```bash
# Utwórz ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Użyj zjednoczonego korzenia bramy Anthropic dla Claude Code. Nie dodawaj tutaj `/v1`.

**Test:** `claude "say hello"`

---

#### OpenAI Codex

Nowoczesny Codex (v0.137+) odczytuje tylko `~/.codex/config.toml` — stary
`config.yaml` należy do przestarzałego CLI npm i jest cicho ignorowany. Klucz API
pozostaje w zmiennej środowiskowej `OMNIROUTE_API_KEY` (`env_key`), nigdy
wewnątrz pliku:

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

Pełna dokumentacja (profile, `wire_api`, okna kontekstowe): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**Test:** `codex "what is 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "sk-your-omniroute-key"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**Test:** `opencode`

> Użyj `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> aby wysłać warianty myślenia.

---

#### Cline (CLI lub VS Code)

**Tryb CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**Tryb VS Code:**
Ustawienia rozszerzenia Cline → Dostawca API: `OpenAI Compatible` → Podstawowy URL: `http://localhost:20128/v1`

Lub użyj dashboardu OmniRoute → **Narzędzia CLI → Cline → Zastosuj konfigurację**.

---

#### KiloCode (CLI lub VS Code)

**Tryb CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Ustawienia VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Lub użyj dashboardu OmniRoute → **Narzędzia CLI → KiloCode → Zastosuj konfigurację**.

---

#### Continue (Rozszerzenie VS Code)

Edytuj `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Uruchom ponownie VS Code po edytowaniu.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Użyj tego, gdy VS Code Insiders jest skonfigurowany dla modeli punktów końcowych i chcesz, aby OmniRoute działał bez niestandardowego pola nagłówka.

**Zalecana lokalizacja:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Przykład używający tokenizowanego aliasu OmniRoute:**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**Uwagi:**

- Zamień `sk-your-omniroute-key` na klucz API utworzony w OmniRoute.
- Pole `url` powinno wskazywać na `/api/v1/vscode/{token}/chat/completions`.
- Pole `modelsUrl` powinno wskazywać na `/api/v1/vscode/{token}/models`.
- Preferuj normalny przepływ `/v1` + nagłówek Bearer, gdy klient obsługuje niestandardowe nagłówki.
- Tokeny osadzone w URL są rozwiązaniem zgodności i mogą pojawić się w logach edytora lub historii proxy.

---

#### Kiro CLI (Amazon)

```bash
# Zaloguj się do swojego konta AWS/Kiro:
kiro-cli login

# CLI używa własnej autoryzacji — OmniRoute nie jest potrzebny jako backend dla Kiro CLI.
# Użyj kiro-cli obok OmniRoute dla innych narzędzi.
kiro-cli status
```

Dla aplikacji desktopowej **Kiro IDE** użyj punktu końcowego MITM udostępnionego przez OmniRoute
pod `/dashboard/cli-tools → Kiro`.

---

## 10. Wewnętrzny OmniRoute CLI

Binarna wersja `omniroute` oferuje polecenia do zarządzania cyklem życia serwera, konfiguracji, diagnostyki i zarządzania dostawcami. Punkt wejścia: `bin/omniroute.mjs`.

```bash
omniroute                              # Uruchom serwer (domyślny port 20128)
omniroute setup                        # Interaktywny kreator konfiguracji
omniroute doctor                       # Sprawdź konfigurację, DB, porty, czas działania
omniroute providers list               # Skonfigurowane połączenia dostawców
omniroute providers test-all           # Przetestuj każde aktywne połączenie
omniroute reset-password               # Zresetuj hasło administratora
omniroute logs                         # Strumieniuj logi żądań
omniroute health                       # Szczegółowe informacje o stanie (wyłączniki, pamięć podręczna, pamięć)
omniroute --version                    # Wydrukuj wersję
omniroute --help                       # Pokaż wszystkie polecenia
```

### Konfiguracja i inicjalizacja

```bash
omniroute setup                        # Interaktywny kreator konfiguracji
omniroute setup --non-interactive      # Tryb CI/automatyzacji (odczytuje zmienne środowiskowe + flagi)
omniroute setup --password '<value>'   # Ustaw hasło administratora bezpośrednio
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Dodaj i przetestuj dostawcę w jednym kroku
```

Rozpoznane zmienne środowiskowe do konfiguracji bez interakcji:

| Var                 | Cel                                                             |
| ------------------- | --------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | Klucz API dostawcy (powiązany z `--api-key` za pomocą `.env()`) |
| `DATA_DIR`          | Nadpisz katalog danych OmniRoute                                |

Wszystkie inne wejścia bez interakcji są przekazywane jako flagi, a nie zmienne środowiskowe:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(zobacz opcje `omniroute setup` powyżej).

### Diagnostyka

```bash
omniroute doctor                       # Sprawdź konfigurację, DB, porty, czas działania, pamięć, żywotność
omniroute doctor --json                # Odczyt maszynowy w formacie JSON
omniroute doctor --no-liveness         # Pomiń HTTP health probe
omniroute doctor --host 0.0.0.0        # Nadpisz host żywotności
omniroute doctor --liveness-url <url>  # Pełny adres URL punktu końcowego zdrowia
```

Diagnosta wykonuje te kontrole: `Konfiguracja`, `Baza danych`, `Przechowywanie/szyfrowanie`,
`Dostępność portu`, `Czas działania węzła`, `Binarna wersja` (better-sqlite3),
`Pamięć` i `Żywotność serwera`. Kończy z kodem różnym od zera, jeśli jakakolwiek kontrola zakończy się `niepowodzeniem`.

### Zarządzanie dostawcami

```bash
omniroute providers available                       # Katalog dostawców OmniRoute
omniroute providers available --search openai       # Filtruj katalog według id/nazwy/aliasu/kategorii
omniroute providers available --category api-key    # Filtruj według kategorii (api-key, oauth, free, ...)
omniroute providers available --json                # Odczyt maszynowy w formacie JSON

omniroute providers list                            # Skonfigurowane połączenia dostawców
omniroute providers list --json

omniroute providers test <id|name>                  # Przetestuj jedno skonfigurowane połączenie
omniroute providers test-all                        # Przetestuj każde aktywne połączenie
omniroute providers validate                        # Walidacja strukturalna tylko lokalnie
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Istniejący proces OAuth
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` są oparte na API i dlatego działają w
aktywnym lokalnym lub zdalnym kontekście. Wprowadzenie poświadczeń powinno używać
`--credential-stdin` lub `--credential-env`; `--dry-run --json` raportuje tylko
ukryte istnienie/kształt. `providers available` odczytuje katalog OmniRoute;
`providers list/test/test-all/validate` zachowują swoje lokalne zachowanie SQLite i
nie wymagają uruchomionego serwera.

### Przywracanie i resetowanie

```bash
omniroute reset-password                # Zresetuj hasło administratora (również: omniroute-reset-password)
omniroute reset-encrypted-columns       # Pokaż ostrzeżenie + dry-run dla resetowania szyfrowanych poświadczeń
omniroute reset-encrypted-columns --force  # Rzeczywiście wyczyść szyfrowane poświadczenia w SQLite
```

### Eksport poświadczeń (⚠ traktuj ostrożnie)

```bash
omniroute auth export                                 # Pokaż ostrzeżenie + bramkę potwierdzenia — brak dostępu do DB
omniroute auth export --force                          # Eksportuj WSZYSTKIE połączenia z DESZYFROWANYMI poświadczeniami do stdout jako JSON
omniroute auth export --force --id <id>                 # Eksportuj tylko pasujące połączenie
omniroute auth export --force --format env               # Emituj linie OMNIROUTE_<PROVIDER>_<FIELD>=<value>
omniroute auth export --force --out creds.json           # Zapisz do pliku (utworzony z uprawnieniami 0600)
```

`auth export` jest **tylko lokalny** (bezpośredni odczyt SQLite, brak trasy HTTP) i celowo drukuje/zapisuje
**czysty tekst** wartości `apiKey`/`accessToken`/`refreshToken`/`idToken` — to jest funkcja, a nie
błąd. Nic nie jest odczytywane z bazy danych, a nic nie jest deszyfrowane, bez `--force`. Zawsze przed
wydrukowaniem jakiegokolwiek czystego tekstu wyświetlane jest ostrzeżenie na stderr. Wymaga ustawienia `STORAGE_ENCRYPTION_KEY`.
Pole, które nie uda się zdeszyfrować (stary klucz, uszkodzony szyfrogram) jest zgłaszane jako
`<field>DecryptFailed: true` zamiast przerywać cały eksport lub ujawniać podstawowy błąd.

### Inne podpolecenia

Te zakładają działający serwer OmniRoute, chyba że zaznaczone inaczej:

```bash
omniroute status                       # Wszechstronny status czasu działania
omniroute logs                         # Strumieniuj logi żądań (--json, --search, --follow)
omniroute config show                  # Wyświetl bieżącą konfigurację

omniroute provider list                # Lista dostępnych dostawców (alias polecenia providers list)
omniroute provider add                 # Zarejestruj OmniRoute jako dostawcę w narzędziu
omniroute keys add | list | remove     # Zarządzaj kluczami API
omniroute models [provider]            # Lista modeli (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Zrzut konfiguracji + DB
omniroute restore                      # Przywróć z poprzedniego zrzutu

omniroute health                       # Szczegółowe informacje o stanie (wyłączniki, pamięć podręczna, pamięć)
omniroute quota                        # Użycie limitu dostawcy
omniroute cache                        # Status pamięci podręcznej
omniroute cache clear                  # Wyczyść pamięć podręczną semantyczną + podpisów

omniroute mcp status | restart         # Status serwera MCP / restart
omniroute a2a status | card            # Status serwera A2A / karta agenta

omniroute tunnel list | create | stop  # Zarządzaj tunelami (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Inspekcja / ustaw zmienne środowiskowe (tymczasowe)

omniroute test                         # Test łączności dostawcy
omniroute update                       # Sprawdź dostępność aktualizacji
omniroute completion                   # Generuj uzupełnienie powłoki
```

### Wspólne flagi

| Flaga               | Opis                                                          |
| ------------------- | ------------------------------------------------------------- |
| `--no-open`         | Nie otwieraj automatycznie przeglądarki przy uruchomieniu     |
| `--port <n>`        | Nadpisz port API (domyślny 20128)                             |
| `--mcp`             | Uruchom jako serwer MCP przez stdio (dla IDE)                 |
| `--non-interactive` | Tryb CI (bez podpowiedzi; odczytuje z env/flag)               |
| `--json`            | Odczyt maszynowy w formacie JSON (diagnostyka, dostawcy itp.) |
| `--help`, `-h`      | Pokaż pomoc specyficzną dla polecenia                         |
| `--version`, `-v`   | Wydrukuj zainstalowaną wersję                                 |

---

## Dostępne punkty końcowe API

| Punkt końcowy              | Opis                                | Użyj do                               |
| -------------------------- | ----------------------------------- | ------------------------------------- |
| `/v1/chat/completions`     | Standardowy czat (wszyscy dostawcy) | Wszystkie nowoczesne narzędzia        |
| `/v1/responses`            | API odpowiedzi (format OpenAI)      | Codex, agentyczne przepływy pracy     |
| `/v1/completions`          | Dziedziczne uzupełnienia tekstu     | Starsze narzędzia używające `prompt:` |
| `/v1/embeddings`           | Osadzenia tekstu                    | RAG, wyszukiwanie                     |
| `/v1/images/generations`   | Generowanie obrazów                 | GPT-Image, Flux itd.                  |
| `/v1/audio/speech`         | Tekst na mowę                       | ElevenLabs, OpenAI TTS                |
| `/v1/audio/transcriptions` | Mowa na tekst                       | Deepgram, AssemblyAI                  |

Przykłady gotowe do wklejenia z tokenizowanym adresem URL OmniRoute:

```txt
Przykład tokena: sk-a3ab3c080beaee3a-69f4a4-070d71af

Standardowa baza OpenAI: http://localhost:20128/v1
Modele VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
Czat VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
Odpowiedzi VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Tagi Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Czat Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Rozwiązywanie problemów

| Błąd                                            | Przyczyna                       | Naprawa                                                      |
| ----------------------------------------------- | ------------------------------- | ------------------------------------------------------------ |
| `Connection refused`                            | OmniRoute nie działa            | `omniroute serve`                                            |
| `401 Unauthorized`                              | Zły klucz API                   | Sprawdź w `/dashboard/api-manager`                           |
| `No combo configured`                           | Brak aktywnego zestawu routingu | Skonfiguruj w `/dashboard/combos`                            |
| CLI pokazuje "not installed"                    | Plik binarny nie w PATH         | Sprawdź `which <command>`                                    |
| Dashboard pokazuje "not detected" po instalacji | Cache przestarzałe              | Kliknij "⟳ Odśwież wykrywanie" w dashboardzie                |
| Stary link `/dashboard/cli-tools`               | Zakładka przed wersją 3.8.6     | Automatyczne przekierowanie do `/dashboard/cli-code` (308)   |
| Stary link `/dashboard/agents`                  | Zakładka przed wersją 3.8.6     | Automatyczne przekierowanie do `/dashboard/acp-agents` (308) |
