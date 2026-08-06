---
title: "AgentBridge"
version: 3.8.40
lastUpdated: 2026-06-28
---

# AgentBridge

AgentBridge to proxy MITM (Man-in-the-Middle) OmniRoute, który przechwytuje ruch HTTPS z agentów AI w IDE i przekierowuje go przez ujednolicony silnik routingu OmniRoute. Obsługuje **9 agentów IDE** — Antigravity, Kiro, GitHub Copilot, OpenAI Codex, Cursor, Zed, Claude Code, Open Code oraz Trae (w badaniu) — co czyni OmniRoute proxy MITM o najszerszym pokryciu asystentów AI do kodowania na rynku.

**Lokalizacja w dashboardzie:** `/dashboard/tools/agent-bridge`
**Grupa w sidebarze:** Tools (po Cloud Agents)
**Zobacz też:** [`TRAFFIC_INSPECTOR.md`](./TRAFFIC_INSPECTOR.md) — monitoruj cały przechwycony ruch w czasie rzeczywistym; [`docs/security/MITM-TPROXY-DECRYPT.md`](../security/MITM-TPROXY-DECRYPT.md) — tryb transparentnego deszyfrowania TPROXY na Linuxie, sterowany przez trasę `/api/tools/agent-bridge/tproxy`.

---

## §1 Przegląd

### Czym jest AgentBridge?

Gdy agent IDE (np. GitHub Copilot, Cursor, Claude Code) wykonuje wywołanie API, łączy się bezpośrednio z upstreamowym dostawcą AI (OpenAI, Anthropic itd.). AgentBridge przechwytuje to połączenie w sposób przezroczysty na poziomie TLS — bez konieczności zmiany konfiguracji agenta — i przepisuje żądanie przez OmniRoute.

Dzięki temu możesz:

- **Przekierować dowolnego agenta do dowolnego providera**: Copilot rozmawia z OpenAI? Przekieruj go na Anthropic Claude, Gemini lub dowolny z 329 wpisów katalogu OmniRoute.
- **Stosować mapowania modeli**: `gemini-3-flash` → `claude-sonnet-4.7` w sposób przezroczysty na poziomie handlera.
- **Obserwować cały ruch agentów**: każde przechwycone żądanie jest publikowane w [Traffic Inspector](./TRAFFIC_INSPECTOR.md).
- **Stosować odporność OmniRoute**: combo routing, circuit breakery, fallbacki i śledzenie kosztów działają także dla ruchu agentów IDE.

### Pozycjonowanie względem rynku

| Feature           | 9router | anti-api | llm-interceptor | **OmniRoute AgentBridge** |
| ----------------- | :-----: | :------: | :-------------: | :-----------------------: |
| Antigravity       |    ✓    |    ✓     |        —        |             ✓             |
| GitHub Copilot    |    ✓    |    ✓     |        —        |             ✓             |
| Kiro (AWS)        |    ✓    |    ✓     |        —        |             ✓             |
| OpenAI Codex      |    —    |    ✓     |        —        |             ✓             |
| Cursor IDE        |    ✓    |    ✓     |        —        |             ✓             |
| Zed Industries    |    —    |    ✓     |        —        |             ✓             |
| Claude Code       |    —    |    —     |        ✓        |             ✓             |
| Open Code         |    —    |    —     |        ✓        |             ✓             |
| Trae              |    —    |    —     |        —        |     🔍 Investigating      |
| Dashboard UI      |    ✓    |    ✗     |        ✗        |             ✓             |
| Traffic Inspector |    ✗    |    ✗     |        ✓        |             ✓             |
| OmniRoute routing |    ✗    |    ✗     |        ✗        |             ✓             |
| Model mapping UI  |    ✗    |    ✗     |        ✗        |             ✓             |
| Bypass list       |    ✗    |    ✗     |        ✓        |             ✓             |
| Upstream CA cert  |    ✗    |    ✗     |        ✓        |             ✓             |

---

## §2 Architektura

### 2.1 Przegląd komponentów

```
IDE Agent (VS Code / Cursor / etc.)
    │  HTTPS (port 443)
    ▼
/etc/hosts — 127.0.0.1 api.githubcopilot.com   ← DNS redirect
    │
    ▼
src/mitm/server.cjs  (port 443, CJS child process)
    │  resolves target by Host header SNI
    │  generates per-SNI TLS cert signed by AgentBridge CA
    ├── Bypass list match? → TCP passthrough (no decrypt)
    ├── Target match? → fetch → OmniRoute router (port 20128)
    │       └── handler.intercept() — TypeScript
    │               ├── maskSecrets() on request body/headers
    │               ├── TrafficBuffer.push() — publishes to Traffic Inspector
    │               └── fetchRouter() → /v1/chat/completions
    └── No match? → TCP passthrough (no decrypt)
```

### 2.2 Serwer MITM (`src/mitm/server.cjs`)

Rdzeniowy serwer MITM działa jako proces potomny Node.js CJS (aby uniknąć przepisywania istniejącej bazy kodu CJS). On:

- Nasłuchuje na porcie 443 (wymaga uprawnień lub `authbind`/`setcap`)
- Odbiera tunele CONNECT z systemu operacyjnego (przez przekierowanie DNS w `/etc/hosts`)
- Generuje certyfikaty TLS per-SNI podpisane przez CA AgentBridge (`DATA_DIR/mitm/ca.crt`)
- Rozwiązuje docelowego agenta po nagłówku Host przez rejestr `targets/index.ts`
- Przekazuje do warstwy handlerów TypeScript przez HTTP na `http://127.0.0.1:20128`

`TARGET_HOSTS` jest ładowany z `DATA_DIR/mitm/targets.json` (zapisywany przez `targets/index.ts` przy starcie), co umożliwia dynamiczne aktualizacje bez restartu serwera CJS.

> **Model Root-CA (#6684).** Opisany powyżej model certyfikatu per-SNI podpisanego przez CA
> to utrwalony model root-CA dodany w #6684 (`src/mitm/cert/rootCa.ts` +
> `src/mitm/_internal/rootCaShim.cjs`, wykorzystujący kryptografię CA/leaf już
> sprawdzoną dla TPROXY w `src/mitm/tproxy/dynamicCert.ts`) — zastępuje
> starszy pojedynczy statyczny self-signed leaf (`src/mitm/cert/generate.ts`, nadal
> ograniczony tylko do hostów antigravity), na który wskazuje sama para `server.crt`/`server.key`
> na dysku. **Zachowanie migracji**: świeża instalacja (bez wcześniejszego
> `server.crt`) automatycznie dostaje model root-CA; instalacja, która już
> zaufała staremu statycznemu leafowi, nadal go używa, dopóki operator nie ustawi
> `MITM_ROOT_CA_ENABLED=true` i nie zrestartuje bridge'a (`src/mitm/cert/migration.ts`
> to czysta funkcja decyzyjna — zaufane CA MITM, które może podpisać leaf dla
> **dowolnego** hosta, jest istotnie silniejsze niż stary leaf z fixed-SAN, więc
> przełączenie nigdy nie jest ciche dla już zaufanej instalacji). Certyfikat CA instaluje się
> w tym samym slocie trust-store `omniroute-mitm.crt`, którego używał stary leaf
> (`cert/install.ts::installCaCert`) — nie jest potrzebne czyszczenie dual-trust.

### 2.3 Baza handlerów (`src/mitm/handlers/base.ts`)

Wszystkie handlery agentów rozszerzają `MitmHandlerBase`:

```ts
export abstract class MitmHandlerBase {
  abstract readonly agentId: AgentId;

  abstract intercept(
    req: IncomingMessage,
    res: ServerResponse,
    body: Buffer,
    mappedModel: string
  ): Promise<void>;

  // Protected helpers: fetchRouter, pipeSSE, hookBufferStart, hookBufferUpdate
}
```

Każdy handler wywołuje `hookBufferStart()` przed proxyowaniem i `hookBufferUpdate()` po zakończeniu. Te metody wrzucają wpisy `InterceptedRequest` do `globalTrafficBuffer` (zob. [Traffic Inspector](./TRAFFIC_INSPECTOR.md) §4).

### 2.4 Rejestr targetów (`src/mitm/targets/`)

Każdy agent ma deklaratywny plik targetu:

```ts
// src/mitm/targets/copilot.ts
export const COPILOT_TARGET: MitmTarget = {
  id: "copilot",
  name: "GitHub Copilot",
  hosts: ["api.githubcopilot.com", "copilot-proxy.githubusercontent.com"],
  port: 443,
  endpointPatterns: ["/chat/completions", "/v1/chat/completions"],
  defaultModels: [{ id: "gpt-4o", name: "GPT-4o", alias: "gpt-4o" }],
  handler: () => import("../handlers/copilot"),
  riskNoticeKey: "providers.riskNotice.oauth",
};
```

Rejestr (`targets/index.ts`) eksportuje `ALL_TARGETS` i przy starcie emituje `DATA_DIR/mitm/targets.json`.

### 2.5 Passthrough i lista bypass (`src/mitm/passthrough.ts`)

**Lista bypass** (sprawdzana pierwsza, z pierwszeństwem nad dopasowaniem targetu):

- Wzorce domyślne: hosty bankowe, `.gov.`, providery OAuth/SSO (Okta, Auth0) itd.
- Wzorce użytkownika: przechowywane w tabeli DB `agent_bridge_bypass`
- Hosty z bypassu dostają przezroczysty tunel TCP — TLS **nigdy nie jest deszyfrowany**

**Domyślny passthrough** (brak dopasowania targetu i brak na liście bypass):

- Również dostaje tunel TCP — połączenia nigdy nie są zrywane
- Zapobiega zakłócaniu przez AgentBridge ogólnego ruchu HTTPS systemu

Kolejność routingu:

```
bypass list → target match → passthrough
```

### 2.6 Certyfikat CA upstream (`src/mitm/upstreamTrust.ts`)

Dla środowisk sieci korporacyjnych z własnym CA:

```bash
AGENTBRIDGE_UPSTREAM_CA_CERT=/path/to/corporate-ca.pem
```

Po ustawieniu konfiguruje globalny dispatcher `undici` o dodatkowy certyfikat CA, dzięki czemu AgentBridge może dotrzeć do upstreamowych providerów przez korporacyjne proxy terminujące TLS.

### 2.7 Maskowanie sekretów (`src/mitm/maskSecrets.ts`)

Stosowane do wszystkich ciał żądań i nagłówków **zanim** trafią do bufora Traffic Inspector lub jakiegokolwiek logu:

- Tokeny z prefiksem `sk-` / `ak-` / `pk-` (styl OpenAI/Anthropic)
- Nagłówki `Authorization: Bearer <token>`
- Generyczne długie tokeny (≥40 znaków)

---

## §3 Konfiguracja

### 3.1 Start/stop serwera MITM

Użyj karty AgentBridge Server Card pod `/dashboard/tools/agent-bridge`:

| Action          | Description                                                                        |
| --------------- | ---------------------------------------------------------------------------------- |
| Start Server    | Uruchamia `src/mitm/server.cjs` na porcie 443                                      |
| Stop Server     | Gracefully zamyka proces potomny                                                   |
| Restart Server  | Stop + start (przejmuje zmiany targetów)                                           |
| Trust Cert      | Instaluje `DATA_DIR/mitm/ca.crt` w magazynie zaufania OS                           |
| Download Cert   | Pobiera `ca.crt` do ręcznej instalacji                                             |
| Regenerate Cert | Tworzy nową parę kluczy CA (unieważnia wszystkie istniejące certyfikaty per-agent) |

### 3.2 Zaufanie certyfikatowi

Certyfikat CA AgentBridge musi być zaufany przez OS, zanim IDE zaakceptują połączenie MITM.

**Linux (NSS — Chrome/Firefox):**

```bash
certutil -A -d sql:$HOME/.pki/nssdb -n "OmniRoute AgentBridge" -t CT,, -i ~/.omniroute/mitm/ca.crt
```

**macOS (Keychain):**

```bash
sudo security add-trusted-cert -d -r trustRoot \
  -k /Library/Keychains/System.keychain ~/.omniroute/mitm/ca.crt
```

**Windows (certmgr):**

```powershell
certutil -addstore -f Root $env:USERPROFILE\.omniroute\mitm\ca.crt
```

Albo użyj przycisku „Trust Cert” w dashboardzie (uruchamia odpowiednią komendę dla Twojego OS, z promptem sudo jeśli potrzeba).

#### IDE oparte na Electron ignorują magazyn zaufania OS (`NODE_EXTRA_CA_CERTS`)

Niektóre IDE — zwłaszcza **Antigravity IDE** oraz inne aplikacje oparte na Electron / VS Code — dołączają
własne runtime Node.js, które **nie konsultuje magazynu zaufania OS** dla wychodzących
`fetch`/HTTPS. Zaufanie CA na poziomie OS/NSS wystarcza dla natywnego **backendu** IDE
(np. serwer języka Go, który używa pakietu CA systemu), ale **frontend Electron**
nadal będzie failował TLS — objawia się to jako _wylogowanie_ aplikacji lub komunikat _"connection error"_,
mimo że log MITM pokazuje, że wywołania bootstrap backendu zwracają `200`. Wymagane są dwa kroki
i oba mają znaczenie:

1. Wskaż runtime jawnie na CA:
   ```bash
   export NODE_EXTRA_CA_CERTS=/path/to/omniroute-agentbridge-ca.crt
   ```
2. **Uruchom IDE z tej powłoki.** Start z ikony pulpitu / Dock / menu Start
   **nie** dziedziczy eksportów powłoki, a `~/.config/environment.d/*.conf` działa dopiero po
   świeżym logowaniu graficznym. Najpierw w pełni zamknij IDE — singleton lock Electron sprawia, że drugie
   uruchomienie tylko fokusuje istniejący proces i nowe środowisko jest ignorowane.

Krok OS-trust + NSS powyżej nadal jest konieczny (stos sieciowy Chromium używany w niektórych flow
auth czyta per-user store NSS i ma własne statyczne piny dla `*.googleapis.com`, które
lokalnie zaufane CA nadpisuje). `NODE_EXTRA_CA_CERTS` pokrywa ścieżkę Node `fetch` na wierzchu tego.

### 3.3 Routing DNS

Dla każdego agenta, którego ruch chcesz przechwytywać, jego host(y) API muszą resolvować do `127.0.0.1`. AgentBridge zarządza wpisami `/etc/hosts` automatycznie, gdy włączysz DNS dla agenta w Setup Wizard.

Przykładowe wpisy `/etc/hosts` dla GitHub Copilot:

```
127.0.0.1 api.githubcopilot.com
127.0.0.1 copilot-proxy.githubusercontent.com
```

### 3.4 Mapowanie modeli

Użyj tabeli Model Mapping w karcie każdego agenta, aby zdefiniować mapowania source → target:

| Source model (agent native) | Target model (OmniRoute) |
| --------------------------- | ------------------------ |
| `gpt-4o`                    | `claude-sonnet-4.7`      |
| `*` (wildcard)              | `claude-haiku-4.7`       |

Wildcard `*` mapuje dowolny nierozpoznany model na wskazany target. Trwałe w tabeli `agent_bridge_mappings`.

> **Wskazówka — odkryj rzeczywiste ID modeli agenta.** IDE może wysyłać nazwy modeli inne niż
> etykiety w UI i zmieniające się między major versions. Na przykład **Antigravity 2** wysyła
> po drucie `gemini-3.1-pro-low`, `gemini-pro-agent` i `gemini-3.1-flash-lite` — nie
> `gemini-2.5-pro` z starszej dokumentacji. Wyślij jeden chat bez pasującego mapowania: MITM
> zaloguje dokładne przychodzące `model:` i przepuści żądanie. Zmapuj tę literałową wartość, a
> następne żądanie zostanie przechwycone i skierowane do Twojego targetu.

### 3.5 Ostrzeżenie o ryzyku

AgentBridge przechwytuje poświadczenia (tokeny OAuth, klucze API), których IDE używa do uwierzytelnienia u upstreamowych providerów. Są one **maskowane przed logowaniem** (zob. §2.7), ale są widoczne dla warstwy MITM OmniRoute. Pierwsza aktywacja każdego agenta pokazuje zamykalny modal z ostrzeżeniem o ryzyku.

### 3.6 Maintenance & Diagnostics

Dashboard udostępnia kartę **Maintenance & Diagnostics** (`AgentBridgeMaintenanceCard`, w `src/app/(dashboard)/dashboard/tools/agent-bridge/components/`), która ujawnia operacyjne trasy MITM wcześniej bez UI. Jej podtytuł: _"Self-test the capture pipeline, undo leftover system state, and move your setup between machines."_ Helpery klienckie karty żyją w `src/lib/inspector/agentBridgeMaintenanceApi.ts`.

| Button            | Route                                  | What it does                                                                                                                                                                    |
| ----------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Diagnose**      | `GET /api/tools/agent-bridge/diagnose` | Uruchamia self-test potoku przechwytywania i pokazuje raport per-check (✓/✗ + wskazówka remediaty).                                                                             |
| **Repair**        | `POST /api/tools/agent-bridge/repair`  | Cofa osierocony stan systemowy MITM (wpisy DNS spoof, root CA, system proxy) pozostały po crashu lub SIGKILL. Idempotentny — zgłasza „Nothing to repair”, gdy stan jest czysty. |
| **Remove CA**     | `DELETE /api/tools/agent-bridge/cert`  | Usuwa zaufanie i usuwa root CA MITM z magazynu zaufania OS (jawne, idempotentne). Pokazywane tylko gdy CA jest obecnie zaufane; wymaga inline potwierdzenia „Remove CA?”.       |
| **Export config** | `GET /api/tools/agent-bridge/config`   | Pobiera przenośny JSON konfiguracji (zob. §3.7).                                                                                                                                |
| **Import config** | `POST /api/tools/agent-bridge/config`  | Przesyła wcześniej wyeksportowany JSON konfiguracji (zob. §3.7).                                                                                                                |

**Checki diagnostyczne** (`summarizeDiagnostics()` w `src/mitm/inspector/diagnostics.ts`). Trasa uruchamia efektowy probe dla każdego i przekazuje booleany do czystego summarizera; zwracany jest pojedynczy werdykt `healthy` oraz wskazówka per-failure:

| Check name         | What it verifies                                             | Hint on failure                                                                                                                        |
| ------------------ | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `server-running`   | Proces serwera MITM jest aktywny                             | "The MITM server is not running. Start it from the AgentBridge tab."                                                                   |
| `server-reachable` | Serwer MITM akceptuje połączenia na swoim porcie (TCP probe) | "The MITM server is not accepting connections on its port. Check that the port is free and that you have privileges to bind it."       |
| `cert-exists`      | Certyfikat MITM został wygenerowany na dysku                 | "No MITM certificate has been generated yet. Generate one from the AgentBridge tab."                                                   |
| `cert-trusted`     | Root CA MITM jest w magazynie zaufania OS                    | "The MITM root CA is not trusted by the OS store, so TLS interception will fail. Trust the certificate from the AgentBridge tab."      |
| `dns-configured`   | Hostnames targetów są spoofowane w `/etc/hosts`              | "Target hostnames are not spoofed in /etc/hosts, so traffic never reaches the proxy. Enable DNS for the agent(s) you want to capture." |

**Banner osieroconego stanu:** gdy strona wykryje stan pozostały po crashu (DNS spoof / CA / system proxy), karta pokazuje bursztynowy banner — _"A previous session left system state behind (DNS spoof, CA, or system proxy). Run Repair to clean it up."_ — i podświetla przycisk **Repair**. `Repair` to warstwa aplikacyjna analogiczna do flagi `--cleanup` ProxyBridge (deleguje do `repairMitm()` w `src/mitm/manager.ts`).

> Root CA MITM pozostaje zainstalowany między stop/start, aby uniknąć powtarzanych promptów
> sudo (to samo zachowanie co mitmproxy/Charles), więc usunięcie go to jawna
> akcja **Remove CA**, a nie coś, co dzieje się automatycznie przy stopie.

### 3.7 Przenośny import/eksport konfiguracji

AgentBridge może zserializować **konfigurowalny przez operatora** stan do wersjonowanego bloba JSON, aby setup dało się replikować między maszynami. Serializer to `src/lib/inspector/configPortability.ts` (`exportConfig()` / `importConfig()`), walidowany przez `AgentBridgeConfigSchema`.

Eksport zawiera dokładnie trzy elementy (wbudowane domyślne są celowo **NIE** eksportowane, więc import nigdy ich nie duplikuje ani z nimi nie walczy):

| Field            | Source                                                               | Notes                                                                  |
| ---------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `bypassPatterns` | wzorce bypass zdefiniowane przez użytkownika (`agent_bridge_bypass`) | domyślne wzorce bank/gov/okta są wykluczone                            |
| `customHosts`    | niestandardowe hosty Traffic Inspector (`inspector_custom_hosts`)    | każdy: `{ host, kind: "llm"\|"app"\|"custom", label? }`                |
| `agentMappings`  | mapowania modeli per-agent (`agent_bridge_mappings`)                 | `{ [agentId]: [{ source, target }] }` dla każdego agenta z mapowaniami |

```jsonc
// GET /api/tools/agent-bridge/config
{
  "version": 1,
  "bypassPatterns": ["*.internal.example.com"],
  "customHosts": [{ "host": "api.example.com", "kind": "llm", "label": null }],
  "agentMappings": { "copilot": [{ "source": "gpt-4o", "target": "claude-sonnet-4.7" }] },
}
```

**Zachowanie importu** (`POST /api/tools/agent-bridge/config`): wzorce bypass i mapowania per-agent **zastępują w całości**; custom hosty są dodawane **idempotentnie** (`INSERT OR IGNORE`). Odpowiedź raportuje, ile z każdego zostało zastosowane:

```jsonc
{ "ok": true, "bypassPatterns": 1, "customHosts": 1, "agents": 1 }
```

Czego **NIE** ma w konfiguracji: stan działania serwera, ścieżki certyfikatów, stan DNS per-agent, ścieżka upstream CA oraz ustawienia TPROXY — to stan hosta/runtime, nie przenośne preferencje.

---

## §4 Referencja per-agent

| #   | Agent              | Status           | Hosts intercepted                                                  | Auth type      |
| --- | ------------------ | ---------------- | ------------------------------------------------------------------ | -------------- |
| 1   | **Antigravity**    | ✅ Supported     | `daily-cloudcode-pa.googleapis.com`, `cloudcode-pa.googleapis.com` | Firebase OAuth |
| 2   | **Kiro (AWS)**     | ✅ Supported     | `prod.kiro.aws`, `dev.kiro.aws`                                    | AWS SigV4      |
| 3   | **GitHub Copilot** | ✅ Supported     | `api.githubcopilot.com`, `copilot-proxy.githubusercontent.com`     | GitHub OAuth   |
| 4   | **OpenAI Codex**   | ✅ Supported     | `api.openai.com` (ścieżki Codex), `chatgpt.com`                    | OpenAI key     |
| 5   | **Cursor IDE**     | ✅ Supported     | `api2.cursor.sh`, `api.cursor.sh`                                  | Cursor OAuth   |
| 6   | **Zed Industries** | ✅ Supported     | `api.zed.dev`, `llm.zed.dev`                                       | Zed OAuth      |
| 7   | **Claude Code**    | ✅ Supported     | `api.anthropic.com` (opt-in)                                       | Anthropic key  |
| 8   | **Open Code**      | ✅ Supported     | `openrouter.ai`, `api.openai.com` (ścieżki zen)                    | API key        |
| 9   | **Trae**           | 🔍 Investigating | TBD — zob. §8                                                      | TBD            |

### Kroki setup wizard (per agent)

Każda karta agenta ma 3-krokowy setup wizard:

1. **Verify prerequisites** — Serwer działa? Cert zaufany? IDE zainstalowane (auto-wykrycie)?
2. **Enable DNS** — Dodaje wpisy `/etc/hosts` (wymaga sudo). Pokazuje dokładnie, które linie zostaną dodane.
3. **Map models** — Opcjonalna tabela mapowania modeli. Wildcards akceptowane.

### Wykrywanie agentów

Dla agentów 1–8 AgentBridge próbuje automatycznie wykryć instalację IDE:

```ts
export async function detectAgent(agentId: AgentId): Promise<DetectionResult>;
// Returns: { installed: boolean, version?: string, path?: string }
```

Wykrywanie używa ścieżek specyficznych dla OS i sprawdzeń binarnych (np. `code --list-extensions | grep github.copilot` dla Copilot, `~/.config/antigravity/` dla Antigravity).

---

## §5 Bezpieczeństwo

### Zastosowane Hard Rules

| Rule                              | Application                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------------ |
| **#12** `sanitizeErrorMessage`    | Wszystkie błędy handlerów są sanityzowane przed odpowiedzią lub wpisem do bufora           |
| **#13** Shell env-passing         | Edycje `/etc/hosts` używają opcji `env` — bez interpolacji stringów ścieżek                |
| **#15 + #17** `isLocalOnlyPath()` | `/api/tools/agent-bridge/` jest LOCAL_ONLY + SPAWN_CAPABLE — loopback wymuszany przed auth |

### Lista bypass dla wrażliwych hostów

Lista bypass gwarantuje, że instytucje finansowe, providery OAuth/SSO i inne wrażliwe hosty **nigdy nie są deszyfrowane**. Ich ruch TLS przechodzi jako przezroczysty tunel TCP — OmniRoute nigdy nie widzi plaintextu.

Domyślne wzorce bypass obejmują:

- `*.bank.*`, `*.gov.*` (finanse/administracja)
- `*.okta.com`, `*.auth0.com`, `*.microsoft.com` (SSO/tożsamość)
- `*.apple.com`, `*.icloud.com` (usługi systemowe Apple)

Wzorce bypass dodane przez użytkownika są przechowywane w tabeli `agent_bridge_bypass` i mają pierwszeństwo nad wszystkim.

### Maskowanie sekretów

`maskSecrets()` z `src/mitm/maskSecrets.ts` jest stosowane:

- Na każdym ciele żądania przed `TrafficBuffer.push()`
- Na każdym nagłówku przed logowaniem lub broadcastem

Wzorce: tokeny z prefiksem `sk-`/`ak-`/`pk-`, tokeny `Bearer` oraz generyczne tokeny ≥40 znaków.

### Certyfikat CA upstream

Gdy ustawione jest `AGENTBRIDGE_UPSTREAM_CA_CERT`, plik jest odczytywany przy starcie. Jeśli ścieżka istnieje, ale plik jest nieczytelny, AgentBridge loguje jasny błąd i odmawia startu (zapobiega cichym awariom TLS w środowiskach korporacyjnych).

### Znane ograniczenia

- **Port 443 wymaga uprawnień**: Na Linuxie AgentBridge potrzebuje `setcap 'cap_net_bind_service=+ep'` na binarium Node albo uruchomienia przez `authbind`. Setup Wizard wyświetla instrukcje specyficzne dla OS.
- **Wymagany restart IDE**: Po przekierowaniu DNS IDE musi zostać zrestartowane, aby nowa resolucja hostów weszła w życie.
- **Hardcoded tokeny OAuth**: Niektóre agenty (Kiro, Antigravity) przechowują lokalnie tokeny odświeżania OAuth. Są one przezroczyste dla AgentBridge — widzi Bearer token w każdym żądaniu, który jest maskowany przed logowaniem.
- **Frontend Electron wymaga `NODE_EXTRA_CA_CERTS`**: IDE, których frontend działa na dołączonym runtime Node/Electron, ignorują magazyn zaufania OS/NSS i muszą być uruchamiane z powłoki z ustawionym `NODE_EXTRA_CA_CERTS` (zob. §3.2). Objaw przy braku: backend IDE się uwierzytelnia (MITM pokazuje `200`), ale UI pozostaje wylogowany.
- **Wiele instalacji tego samego IDE jest niezależnych**: instalacja systemowa (np. `/usr/share/antigravity/antigravity`) i lokalna użytkownika „Full” (np. `~/AntigravityIDE_Full/antigravity-ide`) to osobne procesy z własnymi runtime — każdy musi być ponownie uruchomiony z wstrzykniętym CA. Zidentyfikuj, który działa, po ścieżce binarium przed relaunch.
- **Tożsamość ustawia system prompt agenta, nie routowany model**: gdy remapujesz model agenta na innego providera, odpowiedź nadal twierdzi natywną tożsamość agenta (np. Antigravity odpowiada „I am powered by Gemini”), bo IDE wstrzykuje to do system prompt. Potwierdź prawdziwy backend w `call_logs` / `proxy_logs` (`provider`, `model`, `target_format`), a nie pytając model, kim jest.

---

## §6 Rozwiązywanie problemów

### Konflikt portu 443

Jeśli inny proces już nasłuchuje na porcie 443 (serwer WWW, VPN itd.):

```bash
lsof -i :443          # find the process
sudo fuser -k 443/tcp  # force-kill (use with care)
```

Alternatywnie skonfiguruj nieuprzywilejowany port w ustawieniach AgentBridge i ustaw reguły przekierowania `iptables` / `pf`.

### Certyfikat niezaufany

Jeśli IDE pokazuje błędy TLS po starcie AgentBridge:

1. Sprawdź, czy cert został zainstalowany: `security find-certificate -c "OmniRoute AgentBridge"` (macOS) lub `certutil -L -d sql:$HOME/.pki/nssdb` (Linux/NSS)
2. Niektóre aplikacje utrzymują własny magazyn zaufania (Firefox, Chrome na Linuxie). Uruchom „Trust Cert” ponownie i sprawdź store certyfikatów NSS/Firefox.
3. Zrestartuj IDE po zaufaniu — trwające sesje TLS używają starego stanu zaufania.

### IDE wylogowane / „connection error” mimo zaufanego CA

Objaw: po przekierowaniu DNS i zaufaniu CA IDE oparte na Electron (np. Antigravity)
otwiera się **wylogowane** lub pokazuje błąd uwierzytelnienia/połączenia, a log MITM pokazuje, że
wywołania bootstrap (`loadCodeAssist`, `fetchAvailableModels`, …) zwracają `200`.

Przyczyna: **dołączone runtime Node/Electron IDE ignoruje magazyn zaufania OS**. Natywny
backend (serwer języka Go) ufa CA OS i się uwierzytelnia, ale frontend Electron
nie — więc UI uważa, że jest offline.

Naprawa (oba kroki): wyeksportuj `NODE_EXTRA_CA_CERTS=<ca.crt>` **i uruchom ponownie IDE z tej
powłoki**, nie z ikony pulpitu. Najpierw w pełni zamknij IDE — singleton lock Electron sprawia, że
drugie uruchomienie tylko fokusuje istniejący proces i nowe środowisko jest ignorowane. Zob. §3.2.
To odzwierciedla otwarty raport upstream, w którym samodzielny agent działa przez MITM, ale wariant
IDE failuje przy tym samym setupie.

### DNS nie rozpropagowany

Sprawdź, czy `/etc/hosts` został zaktualizowany:

```bash
grep "omniroute\|127.0.0.1.*github\|127.0.0.1.*cursor" /etc/hosts
```

Wyczyść cache DNS:

```bash
# macOS
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
# Linux (systemd-resolved)
sudo systemctl restart systemd-resolved
# Windows
ipconfig /flushdns
```

### IDE nie wykryte

Auto-wykrywanie używa typowych ścieżek instalacji. Jeśli detekcja failuje, ale IDE jest zainstalowane:

- Sprawdź, czy binarium IDE jest w niestandardowej lokalizacji
- Setup Wizard nadal działa — niepowodzenie detekcji oznacza tylko, że badge nie pokaże ścieżki instalacji

### Błędy handlera (upstream fetch failuje)

Jeśli AgentBridge przechwytuje, ale wszystkie żądania failują:

1. Sprawdź, czy co najmniej jeden provider jest podłączony pod `/dashboard/providers`
2. Sprawdź logi serwera OmniRoute: `APP_LOG_LEVEL=debug` w `.env`
3. Zweryfikuj, że `OMNIROUTE_BASE_URL` wskazuje na poprawny endpoint routera (domyślnie: `http://127.0.0.1:20128`)

---

## §7 Referencja API

Wszystkie trasy są `LOCAL_ONLY` (tylko loopback, wymuszane przed auth) i `SPAWN_CAPABLE`. Zob. `src/server/authz/routeGuard.ts`.

Base path: `/api/tools/agent-bridge/`

| Method              | Path                                           | Description                                                                                                                   |
| ------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| GET                 | `/api/tools/agent-bridge/state`                | Globalny stan serwera + detekcja/status per-agent                                                                             |
| GET                 | `/api/tools/agent-bridge/agents`               | Lista zarejestrowanych agentów (id, name, hosts, viability, state)                                                            |
| GET                 | `/api/tools/agent-bridge/agents/{id}`          | Stan jednego agenta (konfiguracja targetu + detekcja + stan zapisany)                                                         |
| PATCH               | `/api/tools/agent-bridge/agents/{id}`          | Aktualizacja `setup_completed` dla agenta                                                                                     |
| GET                 | `/api/tools/agent-bridge/agents/{id}/detect`   | Uruchom probe detekcji dla agenta (`installed`, `version?`, `path?`)                                                          |
| POST                | `/api/tools/agent-bridge/agents/{id}/dns`      | Włącz/wyłącz DNS dla agenta (`{enabled: boolean}`)                                                                            |
| GET                 | `/api/tools/agent-bridge/agents/{id}/mappings` | Mapowania modeli dla agenta                                                                                                   |
| PUT                 | `/api/tools/agent-bridge/agents/{id}/mappings` | Zastąp mapowania modeli                                                                                                       |
| POST                | `/api/tools/agent-bridge/server`               | Start/stop/restart serwera (`action: "start"\|"stop"\|"restart"\|"trust-cert"\|"regenerate-cert"`)                            |
| GET                 | `/api/tools/agent-bridge/cert`                 | Status certyfikatu (`exists`, `trusted`, `path`)                                                                              |
| POST                | `/api/tools/agent-bridge/cert`                 | Zaufaj (zainstaluj) root CA MITM                                                                                              |
| DELETE              | `/api/tools/agent-bridge/cert`                 | Usuń zaufanie (usuń) root CA MITM — idempotentne (zob. §3.6)                                                                  |
| POST                | `/api/tools/agent-bridge/cert/regenerate`      | Regeneruj self-signed cert MITM                                                                                               |
| GET                 | `/api/tools/agent-bridge/cert/download`        | Strumieniuj cert PEM do pobrania                                                                                              |
| GET                 | `/api/tools/agent-bridge/bypass`               | Lista wzorców bypass (`default` + `user`)                                                                                     |
| POST                | `/api/tools/agent-bridge/bypass`               | Zastąp w całości wzorce bypass zdefiniowane przez użytkownika                                                                 |
| DELETE              | `/api/tools/agent-bridge/bypass?pattern=...`   | Usuń pojedynczy wzorzec bypass użytkownika                                                                                    |
| GET                 | `/api/tools/agent-bridge/diagnose`             | Self-test potoku przechwytywania (zob. §3.6)                                                                                  |
| POST                | `/api/tools/agent-bridge/repair`               | Cofnij osierocony stan systemowy MITM (zob. §3.6)                                                                             |
| GET                 | `/api/tools/agent-bridge/config`               | Eksport przenośnego JSON konfiguracji (zob. §3.7)                                                                             |
| POST                | `/api/tools/agent-bridge/config`               | Import przenośnego JSON konfiguracji (zob. §3.7)                                                                              |
| GET                 | `/api/tools/agent-bridge/upstream-ca`          | Pobierz skonfigurowaną ścieżkę upstream CA                                                                                    |
| POST                | `/api/tools/agent-bridge/upstream-ca`          | Waliduj + utrwal ścieżkę upstream CA                                                                                          |
| POST                | `/api/tools/agent-bridge/upstream-ca/test`     | Tylko walidacja (dry-run) ścieżki upstream CA — nie utrwala                                                                   |
| GET / POST / DELETE | `/api/tools/agent-bridge/tproxy`               | Tryb transparentnego deszyfrowania TPROXY — zob. [`docs/security/MITM-TPROXY-DECRYPT.md`](../security/MITM-TPROXY-DECRYPT.md) |

Pełne schematy OpenAPI: `docs/openapi.yaml` → tag `AgentBridge`.

---

## §8 Roadmapa

### Badanie Trae

Trae to stosunkowo nowy asystent AI do kodowania. Przed implementacją handlera:

1. Zidentyfikuj binarium/rozszerzenie w marketplace VS Code / JetBrains lub jako samodzielną aplikację
2. Przechwyć ruch mitmproxy, aby odkryć hosty API i kształty endpointów
3. Ustal mechanizm uwierzytelniania
4. Oceń go/no-go na podstawie TOS i odkrywalności API

Dopóki badanie się nie zakończy, karta Trae w dashboardzie pokazuje badge „Investigating” z linkiem „Report viability”. Stub handlera w `src/mitm/handlers/trae.ts` rzuca ustrukturyzowany błąd `Not yet implemented`.

### Agenty w backlogu (wymagany MITM — brak wsparcia custom base URL)

Poniższe narzędzia w obecnych wersjach nie wspierają custom base URL, więc MITM jest jedyną ścieżką przechwytywania. Ocena viability jest w toku:

- **Windsurf** (Codeium/Cognition)
- **Amp** (Sourcegraph)
- **Amazon Q / Kiro CLI** (AWS Bedrock — osobno od Kiro IDE)
- **Cowork** (Anthropic desktop)

Uwaga: GitHub Copilot CLI ≥v1.0.19 wspiera `COPILOT_PROVIDER_BASE_URL` — dla tego narzędzia użyj bezpośredniej konfiguracji zamiast MITM.
