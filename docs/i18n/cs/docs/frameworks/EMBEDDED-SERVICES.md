# Embedded Services (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇰 [da](../../../da/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇪 [de](../../../de/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇸 [es](../../../es/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇩 [id](../../../id/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇹 [it](../../../it/docs/frameworks/EMBEDDED-SERVICES.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇴 [no](../../../no/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **Verze:** v3.8.44
> **Poslední aktualizace:** 2026-09-09
> **Cílová skupina:** Technici, kteří přidávají, udržují nebo ladí vložené služby (9Router, CLIProxyAPI, Mux, Bifrost, open-wa).

Vložené služby jsou lokálně instalované pomocné procesní nástroje, které OmniRoute instaluje, monitoruje a
zpřístupňuje jako plnohodnotné cíle směrování. Na rozdíl od externích poskytovatelů (kteří jsou dostupní přes internet
pomocí klíčů API) běží vložené služby na stejném počítači jako OmniRoute a komunikují přes rozhraní loopback.

---

## Obsah

1. [Přehled](#1-overview)
2. [Architektura — 4 vrstvy](#2-architecture--4-layers)
3. [Stavový automat životního cyklu](#3-lifecycle-state-machine)
4. [Referenční dokumentace API](#4-api-reference)
5. [Zabezpečení](#5-security)
6. [Přidání nové vestavěné služby](#6-adding-a-new-embedded-service)
7. [Řešení problémů](#7-troubleshooting)
8. [Časté dotazy](#8-faq)

---

## 1. Přehled

### Proč integrované služby?

Je integrováno šest služeb:

| Služba          | npm balíček                                     | Výchozí port | Účel                                                                                                                                                                                           |
| --------------- | ----------------------------------------------- | :----------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **9Router**     | `9router`                                       |    20130     | AI router, který může OmniRoute používat jako dílčího poskytovatele. Modely jsou zpřístupněny ve tvaru `9router/{sub}/{model}`                                                                 |
| **CLIProxyAPI** | Binární soubor z GitHub release (`cliproxy`)    |     8317     | Lokální proxy adaptér pro ověřovací toky Anthropic CLI. Poskytuje záložní směrování po vypršení platnosti tokenů OAuth                                                                         |
| **Mux**         | `mux` (bez uživatelského rozhraní `mux server`) |     8322     | Lokální démon pro orchestraci agentů (coder/mux). Pouze správa životního cyklu — není cílem směrování (bez proxy přenosu LLM).                                                                 |
| **Bifrost**     | `@maximhq/bifrost`                              |     8080     | Backend přenosové AI brány v jazyce Go. Je-li spuštěn, je automaticky vybrán přenosovou trasou (`/v1/relay/`)                                                                                  |
| **Dario**       | `@askalf/dario`                                 |     3456     | Proxy pro předplatné Claude — alternativa/záloha ke CLIProxyAPI pro provoz ve formátu Claude Code; vložený klíč se stává `DARIO_ADMIN_TOKEN`, který chrání jeho řídicí rovinu OAuth `/admin/*` |
| **open-wa**     | `@open-wa/wa-automate`                          |     8323     | Automatizace WhatsApp Web (bez uživatelského rozhraní, Chromium prostřednictvím Puppeteer). Pouze správa životního cyklu — není cílem směrování.                                               |

Všech šest používá stejný model dohledu:

- OmniRoute je instaluje do `DATA_DIR/services/{name}/` (izolovaně od vlastního souboru `package.json` OmniRoute)
- OmniRoute je spouští a monitoruje jako podřízené procesy
- OmniRoute vkládá do prostředí podřízeného procesu dočasný klíč API a obměňuje jej bez výpadku (kde je to relevantní)
- Všechny trasy pro správu (`/api/services/*`) jsou **LOCAL_ONLY** — přístupné pouze z loopback rozhraní (pevné pravidlo č. 17)

### Klíčová rozhodnutí (z návrhového plánu)

| Rozhodnutí                                | Hodnota                                                                                                |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Přístup dashboardu k nativnímu UI 9Router | Reverzní proxy na `/dashboard/providers/services/9router/embed/*`                                      |
| Mechanismus instalace                     | `npm install {package}` prostřednictvím `execFile` (bez interpolace shellu)                            |
| Režim použití                             | Poskytovatel registrován jako `9router/{sub}/{model}` ve směrovacím enginu                             |
| Správa klíčů API                          | OmniRoute je generuje, šifruje při uložení (AES-256-GCM) a vkládá prostřednictvím proměnných prostředí |
| Umístění dashboardu                       | `/dashboard/providers/services` (tři karty)                                                            |
| Automatické spuštění                      | Přepínač pro každou službu, ve výchozím nastavení VYPNUTO                                              |

---

## 2. Architektura — 4 vrstvy

```
┌────────────────────────────────────────────────────────────────────┐
│  Vrstva 1 — UI                                                     │
│  /dashboard/providers/services  (karty: CLIProxyAPI | 9Router | Mux)│
│  Živé protokoly (SSE), Spustit/Zastavit/Restartovat/Aktualizovat, Nastavení, Instalace│
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               Rámec + směrování karet podle ?tab=  │
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (Next.js fetch)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Vrstva 2 — API (LOCAL_ONLY — pouze loopback)                      │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    (reverzní HTTP + WebSocket proxy → upstream 9Router)            │
│                                                                    │
│  Brána: LOCAL_ONLY_API_PREFIXES zahrnuje "/api/services/" a        │
│         "/dashboard/providers/services/*/embed/"                   │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ volání v rámci procesu
┌──────────────────────▼─────────────────────────────────────────────┐
│  Vrstva 3 — ServiceSupervisor (src/lib/services/)                  │
│                                                                    │
│  ServiceSupervisor.ts   Obecný správce (child_process.spawn)       │
│    ├── instalace:   execFile('npm', ['install', pkg, '--prefix'])   │
│    ├── spuštění:    spawn(node, [entrypoint], {env, cwd})          │
│    ├── klíč API:    crypto.randomBytes(32) → env NINEROUTER_API_KEY │
│    ├── port:        20130 pro 9Router (konfigurovatelný)           │
│    ├── protokoly:   kruhová vyrovnávací paměť stdio 5 MB → události SSE│
│    ├── stav:        HTTP GET /health každé 2–5 s, opožděné zotavení│
│    └── životní cyklus: SIGTERM 15 s → SIGKILL                      │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       Inicializuje všechny SERVICES[] při spuštění procesu│
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       Pravidelný GET /v1/models → tabulka service_models│
│  ringBuffer.ts      Kruhová vyrovnávací paměť protokolů (5 MB na službu)│
│  healthCheck.ts     Pravidelná kontrola stavu přes HTTP            │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts, openwa.ts  │
│                      (instalační adaptéry)                         │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP kompatibilní s OpenAI (loopback)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Vrstva 4 — Poskytovatel / směrování                               │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    Pro každý požadavek znovu vyhledá port a klíč API (bez mezipaměti).│
│    Před předáním proxy odstraní z ID modelu prefix "9router/".      │
│    Vrátí 503 service_not_running, pokud správce není ve stavu "running".│
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    Záznam pro "9router": isEmbeddedService: true                   │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    Modely jsou uloženy jako "9router/{sub}/{model}" (s prefixem).   │
│    Synchronizace každých 5 min pomocí modelSync.ts.                │
│                                                                    │
│  Mux má spravován POUZE životní cyklus (vrstvy 1–3) — jde o démona │
│  pro orchestraci agentů, nikoli LLM proxy, takže nemá executor ani │
│  záznam poskytovatele ve vrstvě 4 a nikdy není cílem směrování.     │
└────────────────────────────────────────────────────────────────────┘
```

### Klíčové zdrojové soubory

| Soubor                                      | Role                                                                   |
| ------------------------------------------- | ---------------------------------------------------------------------- |
| `src/lib/services/ServiceSupervisor.ts`     | Základní třída: životní cyklus, zámek, stav, kruhová vyrovnávací paměť |
| `src/lib/services/bootstrap.ts`             | Registrace na úrovni procesu a automatické spuštění                    |
| `src/lib/services/registry.ts`              | Singleton mapa `nástroj → supervisor`                                  |
| `src/lib/services/apiKey.ts`                | Generování klíčů, šifrování AES-256-GCM pro data v úložišti            |
| `src/lib/services/modelSync.ts`             | Pravidelná synchronizace modelů (5 min) + na vyžádání                  |
| `src/lib/services/ringBuffer.ts`            | Kruhová vyrovnávací paměť protokolů o velikosti 5 MB s odběrem SSE     |
| `src/lib/services/healthCheck.ts`           | HTTP kontrola stavu (konfigurovatelný interval)                        |
| `src/lib/services/installers/ninerouter.ts` | Instalace/aktualizace/odinstalace balíčku 9Router pomocí npm           |
| `src/lib/services/installers/cliproxy.ts`   | Instalace/aktualizace/odinstalace balíčku CLIProxyAPI pomocí npm       |
| `src/lib/services/installers/mux.ts`        | Instalace/aktualizace/odinstalace balíčku Mux pomocí npm               |
| `src/lib/services/installers/openwa.ts`     | Instalace/aktualizace/odinstalace balíčku open-wa pomocí npm           |
| `src/app/api/services/9router/_lib.ts`      | Pomocná funkce `getOrInitSupervisor()`                                 |
| `src/app/api/services/[name]/logs/route.ts` | Sdílený koncový bod SSE pro protokoly                                  |
| `open-sse/executors/ninerouter.ts`          | Exekutor poskytovatele (vrstva 4)                                      |

---

## 3. Stavový automat životního cyklu

```
                    install()
  ┌─────────────┐ ──────────► ┌─────────────┐
  │ not_installed│             │   stopped   │◄──────────────────┐
  └─────────────┘             └──────┬──────┘                   │
                                     │ start()                   │
                                     ▼                           │ stop()
                               ┌──────────┐                      │
                               │ starting │                      │
                               └────┬─────┘                     │
            kontrola stavu úspěšná  │         pád / SIGTERM     │
                               ┌────▼─────┐  (ukončení do 5 s)  │
                               │ running  │──── pád ────────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

Stavy se ukládají v databázové tabulce `version_manager` (sloupec `status`) a zrcadlí
se ve stavu `ServiceSupervisor` v paměti. Stav v paměti je autoritativní pro
spuštěný proces; stav v databázi představuje trvalou záložní variantu při spuštění systému.

### Přechody stavů

| Z               | Událost                                        | Do                     |
| --------------- | ---------------------------------------------- | ---------------------- |
| `not_installed` | `install()` proběhne úspěšně                   | `stopped`              |
| `stopped`       | zavolání `start()`                             | `starting`             |
| `starting`      | kontrola stavu vrátí 200                       | `running`              |
| `starting`      | proces se ukončí před dosažením zdravého stavu | `error`                |
| `running`       | zavolání `stop()`                              | `stopping` → `stopped` |
| `running`       | proces se neočekávaně ukončí (< 5 s)           | `error` (rychlý pád)   |
| `running`       | proces se neočekávaně ukončí (> 5 s)           | `error`                |
| `error`         | zavolání `start()`                             | `starting`             |
| libovolný       | `stop()` během stavu `stopping`                | bez operace            |

### Zámek operací

`ServiceSupervisor` serializuje operace životního cyklu prostřednictvím asynchronního
zámku operací (`withLock()`). Souběžná volání `start()` nad stejným supervisorem vedou
právě k jednomu spuštění procesu; druhý volající počká a vrátí existující stav. Tím se
zabraňuje souběhovým konfliktům, například když se automatické spuštění a tlačítko
v uživatelském rozhraní aktivují současně.

---

## 4. Referenční dokumentace API

Všechny trasy pod `/api/services/` jsou **LOCAL_ONLY** (pouze loopback, pevné pravidlo č. 17).
Požadavky, které nejsou z loopbacku, obdrží `403 LOCAL_ONLY` bez ohledu na ověřovací token.

### 4.1 Endpointy 9Routeru (11 tras)

#### `POST /api/services/9router/install`

Nainstaluje 9Router z npm. Vytvoří `DATA_DIR/services/9router/` s vlastními soubory
`package.json` a `node_modules/`. Není v konfliktu s vlastními závislostmi OmniRoute.

**Tělo požadavku** (vše volitelné):

```json
{ "version": "latest" }
```

| Pole      | Typ      | Výchozí    | Popis                                    |
| --------- | -------- | ---------- | ---------------------------------------- |
| `version` | `string` | `"latest"` | Značka verze npm nebo semver k instalaci |

**Odpovědi:**

| Stav  | Popis                                                                      |
| ----- | -------------------------------------------------------------------------- |
| `200` | `{ ok: true, installedVersion: "x.y.z", path: "..." }`                     |
| `400` | Neplatné tělo požadavku (selhání validace Zod)                             |
| `409` | Instalace již probíhá (zámek je držen)                                     |
| `500` | Instalace npm selhala — uživatelsky přívětivou chybu naleznete v `message` |

**Poznámky:** Používá `execFile('npm', [...])` — bez shellu a bez interpolace (pevné pravidlo č. 13).
Chyby EACCES jsou prezentovány jako uživatelsky přívětivé zprávy.

---

#### `POST /api/services/9router/start`

Spustí 9Router. Pokud ještě není zaregistrován správce, zaregistruje jej a poté zavolá
`supervisor.start()`. Pokud již služba běží, je operace idempotentní.

**Tělo požadavku:** žádné

**Odpovědi:**

| Stav  | Popis                                                 |
| ----- | ----------------------------------------------------- |
| `200` | Objekt `ServiceStatus` (viz schéma níže)              |
| `409` | 9Router není nainstalován (`status: "not_installed"`) |
| `503` | Spuštění selhalo (chyba procesu — viz `lastError`)    |

**Schéma ServiceStatus:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null
}
```

---

#### `POST /api/services/9router/stop`

Korektně zastaví 9Router. Odešle SIGTERM, počká 15 s a poté odešle SIGKILL, pokud proces stále běží.
Pokud je služba již zastavena, je operace idempotentní.

**Tělo požadavku:** žádné

**Odpovědi:**

| Stav  | Popis                              |
| ----- | ---------------------------------- |
| `200` | `ServiceStatus` (state: "stopped") |
| `503` | Zastavení neočekávaně selhalo      |

---

#### `POST /api/services/9router/restart`

Odpovídá volání `stop()` a následně `start()` pod zámkem operace.

**Tělo požadavku:** žádné

**Odpovědi:** stejné jako u `start` (vrací výsledný `ServiceStatus`).

---

#### `POST /api/services/9router/update`

Aktualizuje 9Router na novější verzi npm. Pokud služba běží, nejprve se zastaví,
poté se spustí instalace npm (novější verze se nainstaluje na stejné místo)
a služba se následně restartuje.

**Tělo požadavku** (vše volitelné):

```json
{ "version": "latest" }
```

**Odpovědi:**

| Stav  | Popis                                                           |
| ----- | --------------------------------------------------------------- |
| `200` | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400` | Neplatné tělo                                                   |
| `500` | Aktualizace npm selhala                                         |

---

#### `POST /api/services/9router/rotate-key`

Vygeneruje nový klíč API pro 9Router, zašifruje jej pro uložení a restartuje službu
(pokud běží), aby nový klíč načetla ze svého prostředí. Platnost starého klíče
je okamžitě zrušena.

**Tělo požadavku:** žádné

**Odpovědi:**

| Stav  | Popis                                      |
| ----- | ------------------------------------------ |
| `200` | `{ keyRotated: true, restarted: boolean }` |
| `500` | Rotace selhala                             |

**Zabezpečení:** Nový klíč se v odpovědi nikdy nevrací (nedochází k úniku přihlašovacích údajů).
Je uložen v zašifrované podobě (AES-256-GCM) v tabulce `version_manager`.

---

#### `GET /api/services/9router/status`

Vrací kombinovaný aktuální stav a stav z DB, včetně metadat verze a náhledu klíče API.

**Odpovědi:**

| Stav  | Popis               |
| ----- | ------------------- |
| `200` | Viz schéma níže     |
| `500` | Čtení stavu selhalo |

**Schéma odpovědi:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null,
  "installedVersion": "1.2.3",
  "latestVersion": "1.2.4",
  "updateAvailable": true,
  "apiKeyMasked": "nr_****abcd",
  "autoStart": false,
  "providerExpose": false
}
```

---

#### `POST /api/services/9router/auto-start`

Přepne příznak automatického spuštění. Když je `enabled: true`, služba se automaticky spustí
při příštím spuštění OmniRoute (pokud je služba nainstalována).

**Tělo požadavku:**

```json
{ "enabled": true }
```

**Odpovědi:**

| Stav  | Popis                 |
| ----- | --------------------- |
| `200` | `{ autoStart: true }` |
| `400` | Neplatné tělo         |

---

#### `GET /api/services/9router/logs`

SSE stream živých protokolů z kruhové vyrovnávací paměti stdout/stderr služby 9Router.

**Parametry dotazu:**

| Parametr | Typ       | Výchozí | Popis                                                                            |
| -------- | --------- | ------- | -------------------------------------------------------------------------------- |
| `tail`   | `integer` | 200     | Počet historických řádků, které se mají odeslat jako první (max. 1000)           |
| `filter` | `string`  | žádný   | Filtr podřetězce bez rozlišení velikosti písmen (bez regexu — odolný vůči ReDoS) |

**Události SSE:**

| Událost     | Data        | Popis                          |
| ----------- | ----------- | ------------------------------ |
| `snapshot`  | `LogLine[]` | Počáteční konec historie       |
| `log`       | `LogLine`   | Řádek živého protokolu         |
| `heartbeat` | `{}`        | Udržování spojení každých 15 s |

**Schéma LogLine:**

```json
{
  "ts": 1716633600000,
  "stream": "stdout",
  "line": "[9router] Listening on :20130"
}
```

**Odpovědi:**

| Stav  | Popis                                                |
| ----- | ---------------------------------------------------- |
| `200` | `text/event-stream`                                  |
| `400` | Parametr `filter` je příliš dlouhý (> 200 znaků)     |
| `404` | Služba nebyla nalezena (supervizor není registrován) |

---

### 4.2 Koncové body CLIProxyAPI (10 tras)

CLIProxyAPI má stejnou strukturu koncových bodů jako 9Router, avšak bez `rotate-key`
a navíc s `accounts`, `provider-expose` a `auto-restart-adopted`. Nyní při spuštění
dostává vyhrazený klíč API datové roviny (`needsApiKey: true` v
`bootstrap.ts`, používaný k synchronizaci modelů); `status` obsahuje méně polí.

| Metoda | Cesta                               | Popis                                        |
| ------ | ----------------------------------- | -------------------------------------------- |
| `POST` | `/api/services/cliproxy/install`    | Nainstalovat CLIProxyAPI z npm               |
| `POST` | `/api/services/cliproxy/start`      | Spustit CLIProxyAPI                          |
| `POST` | `/api/services/cliproxy/stop`       | Zastavit CLIProxyAPI                         |
| `POST` | `/api/services/cliproxy/restart`    | Restartovat CLIProxyAPI                      |
| `POST` | `/api/services/cliproxy/update`     | Aktualizovat na novější verzi                |
| `GET`  | `/api/services/cliproxy/status`     | Aktuální stav + stav DB (bez `apiKeyMasked`) |
| `POST` | `/api/services/cliproxy/auto-start` | Přepnout automatické spouštění               |

Sdílený koncový bod `GET /api/services/{name}/logs` (viz §4.1) funguje pro všechny
čtyři služby pomocí dynamického segmentu `[name]`.

---

### 4.3 Koncové body Mux (8 tras)

Mux má stejnou strukturu koncových bodů jako CLIProxyAPI — na povrchu API není trasa
`rotate-key` (bearer token se generuje stejným způsobem jako u 9Router prostřednictvím
`getOrCreateApiKey("mux")` a předává se pomocí proměnné prostředí `MUX_SERVER_AUTH_TOKEN`,
ale zatím neexistuje žádný vyhrazený koncový bod pro jeho rotaci). U Mux se spravuje
pouze životní cyklus: na rozdíl od 9Router nemá žádný executor vrstvy 4 a nikdy se
neregistruje jako poskytovatel směrování.

| Metoda | Cesta                          | Popis                                |
| ------ | ------------------------------ | ------------------------------------ |
| `POST` | `/api/services/mux/install`    | Nainstalovat Mux z npm (`npm i mux`) |
| `POST` | `/api/services/mux/start`      | Spustit Mux (`mux server`)           |
| `POST` | `/api/services/mux/stop`       | Zastavit Mux                         |
| `POST` | `/api/services/mux/restart`    | Restartovat Mux                      |
| `POST` | `/api/services/mux/update`     | Aktualizovat na novější verzi npm    |
| `GET`  | `/api/services/mux/status`     | Aktuální stav + stav DB              |
| `POST` | `/api/services/mux/auto-start` | Přepnout automatické spouštění       |

---

### 4.4 Koncové body Bifrost (8 tras)

Bifrost je backend přenosové brány AI napsaný v Go (`@maximhq/bifrost`). Používá
stejnou strukturu koncových bodů jako CLIProxyAPI (bez `rotate-key` — Bifrost spravuje
vlastní klíče poskytovatelů v souboru `config.json` ve svém `-app-dir`).

| Metoda | Cesta                              | Popis                                                                   |
| ------ | ---------------------------------- | ----------------------------------------------------------------------- |
| `POST` | `/api/services/bifrost/install`    | Nainstalovat Bifrost z npm (`@maximhq/bifrost`)                         |
| `POST` | `/api/services/bifrost/start`      | Spustit Bifrost na portu 8080 (výchozí hodnota)                         |
| `POST` | `/api/services/bifrost/stop`       | Zastavit Bifrost                                                        |
| `POST` | `/api/services/bifrost/restart`    | Restartovat Bifrost                                                     |
| `POST` | `/api/services/bifrost/update`     | Aktualizovat na novější verzi                                           |
| `GET`  | `/api/services/bifrost/status`     | Aktuální stav + stav DB                                                 |
| `POST` | `/api/services/bifrost/auto-start` | Přepnout automatické spouštění                                          |
| `GET`  | `/api/services/bifrost/logs`       | Konec protokolu přes SSE (pomocí sdílené dynamické trasy `[name]/logs`) |

**Zapojení směrování:** Pokud není nastavena proměnná `BIFROST_BASE_URL` a
spravovaná instance Bifrost běží, funkce `getBifrostRoutingConfig()` (v souboru
`routingBackend.ts`) automaticky použije `http://127.0.0.1:{port}` jako základní URL
přenosové služby. Explicitně nastavená proměnná prostředí `BIFROST_BASE_URL` má vždy
přednost.

---

### 4.5 Koncové body Dario (12 tras)

Stejná struktura životního cyklu jako u ostatních služeb (`install`, `start`, `stop`,
`restart`, `update`, `status`, `auto-start`, `auto-restart-adopted`) plus řídicí
rovina OAuth chráněná tokenem pod `admin/`: `admin/accounts`,
`admin/import-from-omniroute`, `admin/login-start`, `admin/login-complete` (všechny
chráněné pomocí `DARIO_ADMIN_TOKEN`).

### 4.6 Koncové body open-wa (7 tras)

open-wa (`@open-wa/wa-automate`) ovládá bezhlavou instanci Chromia (prostřednictvím
Puppeteer) za účelem automatizace WhatsApp Web. Používá stejnou strukturu koncových
bodů jako Mux (zatím bez trasy `rotate-key`). Spravuje se pouze jeho životní cyklus
— není cílem směrování a nemá žádný executor vrstvy 4 ani záznam poskytovatele.

| Metoda | Cesta                             | Popis                                                                       |
| ------ | --------------------------------- | --------------------------------------------------------------------------- |
| `POST` | `/api/services/openwa/install`    | Nainstaluje open-wa z npm (`@open-wa/wa-automate`)                          |
| `POST` | `/api/services/openwa/start`      | Spustí open-wa na portu 8323 (výchozí)                                      |
| `POST` | `/api/services/openwa/stop`       | Zastaví open-wa                                                             |
| `POST` | `/api/services/openwa/restart`    | Restartuje open-wa                                                          |
| `POST` | `/api/services/openwa/update`     | Aktualizuje na novější verzi                                                |
| `GET`  | `/api/services/openwa/status`     | Aktuální stav + stav v DB                                                   |
| `POST` | `/api/services/openwa/auto-start` | Přepne automatické spouštění                                                |
| `GET`  | `/api/services/openwa/logs`       | SSE výpis protokolu (prostřednictvím sdílené dynamické trasy `[name]/logs`) |

**Klíč API:** je vložen jako `WA_KEY` — obecný mechanismus open-wa pro přepsání
pomocí proměnných prostředí s předponou `WA_*` jej mapuje na volbu CLI
`--key`/`-k` (`dist/cli/setup.js::envArgs()`, ověřeno vůči nainstalovanému balíčku
verze 4.76.0). Při vygenerování pomocí `generateServiceApiKey()` je opatřen předponou
`ow_`. open-wa načítá klíč z hlavičky HTTP `key`/`api_key` (nikoli
`Authorization: Bearer`); cesta `/api-docs*` je z kontroly explicitně vyňata
(`setupAuthenticationLayer` v `dist/cli/server.js`), takže kontrola stavu
nepotřebuje autentizační hlavičku.

**Párování:** open-wa je neoficiální a není přidruženo ke službě WhatsApp —
u připojeného čísla hrozí riziko zablokování kvůli vlastní detekci automatizace
služby WhatsApp. Při prvním spuštění se párovací QR kód vypíše na stdout
a zpřístupní prostřednictvím stávajícího panelu Protokoly / streamu SSE —
v této integraci zatím neexistuje vyhrazený koncový bod pro obrázek QR kódu.

---

### 4.7 Reverzní proxy (vložený dashboard 9Router)

Dashboard vkládá webové uživatelské rozhraní 9Router do prvku iframe prostřednictvím
interní reverzní proxy na adrese:

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

Tato proxy:

- Předává požadavek na `http://127.0.0.1:{port}/{path}` (pouze loopback)
- Odstraňuje příchozí hlavičky `cookie` a `authorization` (nedochází k úniku relace OmniRoute)
- Vkládá `Authorization: Bearer {apiKey}` pro autentizaci 9Router
- Z odpovědi odstraňuje `set-cookie`, `content-security-policy`, `x-frame-options`, `cross-origin-*`
- Přepisuje odpovědi HTML tak, aby vložila `<base href>` a normalizovala absolutní cesty (`/foo` → `/dashboard/.../embed/foo`)

Upgrady WebSocket pro vložený dashboard zpracovává doprovodný server na
vyhrazeném portu (viz `src/lib/services/embedWsProxy.ts`).

**Zabezpečení:** Trasy vložené proxy jsou klasifikovány pod `LOCAL_ONLY_API_PREFIXES`
a lze k nim přistupovat pouze z loopbacku. Útočník, který získá JWT prostřednictvím
tunelu Cloudflare/Ngrok, nemůže využít proxy pro přístup k vloženým službám.

---

## 5. Zabezpečení

### Vynucení LOCAL_ONLY (pevné pravidlo č. 17)

Všechny trasy pod `/api/services/` a `/dashboard/providers/services/*/embed/` jsou
v souboru `src/server/authz/routeGuard.ts` klasifikovány jako LOCAL_ONLY. Kontrola
loopback rozhraní probíhá bezpodmínečně před jakoukoli větví ověřování:

```
přijde požadavek
  → isLocalOnlyPath(path)?
      → mimo loopback → 403 LOCAL_ONLY (vždy, před kontrolou ověření)
      → loopback      → pokračování ke standardnímu ověření
```

Tím se zabrání tomu, aby uniklý JWT (např. prostřednictvím tunelu) spustil
`npm install` nebo vytvoření procesu. Úplnou matici úrovní najdete v
`docs/security/ROUTE_GUARD_TIERS.md`.

### Vkládání API klíče

9Router a Mux vyžadují pro své vlastní HTTP endpointy API klíč / bearer token.
OmniRoute:

1. Vygeneruje klíč pomocí `crypto.randomBytes(32).toString("base64url")` s prefixem
   specifickým pro službu (`nr_` pro 9Router, `mx_` pro Mux).
2. Zašifruje jej při uložení pomocí AES-256-GCM (stejné šifry, která se používá pro
   přihlašovací údaje poskytovatelů).
3. Při spuštění jej dešifruje a vloží jako proměnnou prostředí —
   `NINEROUTER_API_KEY` pro 9Router, `MUX_SERVER_AUTH_TOKEN` pro Mux (nikdy jako
   příznak CLI, takže se token nikdy nezobrazí ve výpisu `ps` ani v seznamech procesů).
4. Nikdy nevrací klíč v podobě prostého textu v žádné HTTP odpovědi.

CLIProxyAPI obdrží při spuštění vyhrazený klíč datové vrstvy
(`needsApiKey: true` — používá se k synchronizaci modelů s adaptérem).

### Ochrana proti SSRF

Reverzní HTTP proxy (`/dashboard/.../embed/[...path]`) je napevno nastavena tak, aby
předávala požadavky pouze na `http://127.0.0.1:{port}`. Nikdy nenásleduje přesměrování
do cílů mimo loopback. Knihovna `ssrf-req-filter` se používá k odmítnutí jakékoli
upstream URL, která se přeloží na adresu mimo rozsah loopback.

### Bezpečnost shellu (pevné pravidlo č. 13)

`npm install` se spouští pomocí `execFile('npm', ['install', pkg, '--prefix', dir])` —
bez šablonových literálů, bez shellu a bez interpolace externích cest do řetězce
příkazu. Běhové hodnoty (porty, API klíče) se předávají prostřednictvím objektu
`env` podřízeného procesu.

### Sanitizace chyb (pevné pravidlo č. 12)

Všechny chybové odpovědi z `/api/services/*` procházejí přes `buildErrorBody()` nebo
`sanitizeErrorMessage()`. Nezpracované hodnoty `err.stack` a `err.message` se
volajícímu nikdy nevracejí doslovně.

---

## 6. Přidání nové vestavěné služby

Postupujte podle těchto 8 kroků. Za kanonickou referenci považujte existující
implementace v `src/lib/services/installers/` a `src/app/api/services/`.

### Krok 1 — Vytvoření instalačního modulu

Vytvořte `src/lib/services/installers/{name}.ts` podle vzoru `ninerouter.ts`:

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // vyberte volný port

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

Použijte `runNpm(['install', NAME_PACKAGE, '--prefix', dir])` z
`installers/utils.ts` — nikdy nepoužívejte `execSync` ani interpolaci shellu.

### Krok 2 — Registrace v bootstrapu

Přidejte položku `ServiceEntry` do pole `SERVICES` v
`src/lib/services/bootstrap.ts`:

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // false, pokud není potřeba API klíč
}
```

Rozšiřte `buildSpawnArgsFactory()` tak, aby zpracovávala
`cfg.tool === "myservice"`.

#### Rozšiřitelný kontrakt pluginu poskytovatele (fáze 1, č. 7333)

`src/lib/services/providerPlugins/` zavádí kontrakt `ServiceProviderPlugin`, který
sdružuje pole `ServiceEntry` ze souboru `bootstrap.ts` daného backendu a pole šablony
manifestu ze souboru `serviceBackends.ts` do jednoho objektu namísto toho, aby byla
podoba stejného backendu definována odděleně ve dvou nesouvisejících souborech. V době
psaní tohoto textu je **migrován pouze `9router`** — `bootstrap.ts` odvozuje svou
položku `SERVICES[]` z `getServiceProviderPlugin("9router")`
(`src/lib/services/providerPlugins/registry.ts`) a při případné absenci pluginu
vyvolá chybu při spuštění. `cliproxy`, `mux` a `bifrost` zůstávají beze změny
u dříve existujících inline literálů `SERVICES[]`.

Soubor `open-sse/config/providerPluginManifest.ts` také získal doplňkovou pomocnou
funkci `createServiceBackendManifestEntry(pluginId, template)`, která vytváří správně
formovanou položku `ProviderPluginManifestEntry` z položky
`SERVICE_BACKEND_MANIFEST_TEMPLATE` — zatím **není** zapojena do žádné aktivní cesty
požadavku (ani `generateProviderPluginManifestFromRegistry()`, ani
`/v1/providers/[provider]/models`); to zůstává následným krokem poté, co bude kontrakt
ověřen pro druhý backend.

Do následných PR, sledovaných v rámci issue č. 7333, bylo odloženo: migrace
`cliproxyapi` prostřednictvím stejného registru, zobecnění `mux`/`bifrost` do sjednocení
`ServiceBackendPluginId`, začlenění zvláštního zpracování směrování executorů
(`open-sse/executors/index.ts`, `open-sse/handlers/chatCore/executorProxy.ts`) do
kontraktu pluginu a zapojení `createServiceBackendManifestEntry()` do aktivní cesty
kódu manifestu/modelů.

### Krok 3 — Přidání migrace a počátečních dat databáze

Pomocí migrace v `src/lib/db/migrations/` zajistěte, aby služba měla řádek
v tabulce `version_manager`. Řádek by měl obsahovat:

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### Krok 4 — Vytvoření 7 API endpointů

Pod `src/app/api/services/{name}/`:

```
_lib.ts            pomocná funkce getOrInitSupervisor()
install/route.ts   POST — volá installer.install()
start/route.ts     POST — volá supervisor.start()
stop/route.ts      POST — volá supervisor.stop()
restart/route.ts   POST — volá supervisor.restart()
update/route.ts    POST — volá installer.update()
status/route.ts    GET  — slučuje aktuální stav se stavem z DB
auto-start/route.ts POST — přepíná příznak auto_start
```

Sdílená trasa `GET /api/services/[name]/logs` je již zapojena — nejsou v ní potřeba
žádné změny.

Všechny chybové odpovědi delegujte prostřednictvím `createErrorResponse()` / `buildErrorBody()`.

### Krok 5 — Přidání do LOCAL_ONLY_API_PREFIXES

V souboru `src/server/authz/routeGuard.ts` ověřte, že je již uvedena cesta `/api/services/`.
Pokud zavedete nový prefix (např. `/api/tools/`), přidejte jej do
`LOCAL_ONLY_API_PREFIXES` a pokud spouští procesy, také do `SPAWN_CAPABLE_PREFIXES`.
Přidejte test do `tests/unit/authz/routeGuard.test.ts`.

### Krok 6 — Přidání karty uživatelského rozhraní

Vytvořte `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`.
Znovu použijte sdílené komponenty:

- `ServiceStatusCard` — aktuální stav + indikátor stavu služby
- `ServiceLifecycleButtons` — Spustit / Zastavit / Restartovat / Aktualizovat
- `ServiceLogsPanel` — průběžný výpis protokolů přes SSE (připojuje se k `/api/services/{name}/logs`)
- `ApiKeyCard` — zobrazení + obměna klíče (pokud platí `needsApiKey: true`)

Zaregistrujte kartu v `ServicesPageShell.tsx`.

### Krok 7 — Přidání položky poskytovatele (pokud je služba cílem směrování)

Pokud vestavěná služba zpřístupňuje koncový bod `/v1/chat/completions` kompatibilní s OpenAI:

1. Přidejte položku poskytovatele do `src/shared/constants/providers.ts` s nastavením `isEmbeddedService: true`.
2. Vytvořte `open-sse/executors/{name}.ts` rozšiřující `BaseExecutor`. Pro každý požadavek znovu zjistěte port a
   klíč API (nikdy je neukládejte do mezipaměti v konstruktoru). Pokud stav správce služby není `"running"`, vraťte
   odpověď `503 service_not_running`.
3. Zaregistrujte modely v `open-sse/config/providerRegistry.ts` s prefixem služby
   (např. `myservice/sub/model`). `modelSync.ts` je bude průběžně aktualizovat.

### Krok 8 — Dokumentace a testování

1. Aktualizujte `docs/frameworks/EMBEDDED-SERVICES.md` (tento soubor) — přidejte službu do
   tabulky v §1 a všechny nové koncové body do §4.
2. Přidejte jednotkové testy do `tests/unit/services/` (životní cyklus, instalační program, struktura API).
3. Přidejte integrační test do `tests/integration/services/` (aktivovaný pomocí `RUN_SERVICES_INT=1`).
4. Aktualizujte `docs/openapi.yaml` o nové koncové body.

---

## 7. Řešení problémů

### Služba se nespustí

**Příznaky:** Tlačítko pro spuštění vrací stav 503, stav zůstává `"error"` nebo `"starting"`.

**Kontrolní seznam:**

1. Zkontrolujte `GET /api/services/{name}/logs` (nebo panel Protokoly v řídicím panelu). Hledejte
   řádky jako `Error: ENOENT`, `address already in use` nebo `Cannot find module`.
2. Ověřte, že je `npm` v PATH: spusťte `which npm` ze stejného uživatelského účtu, pod kterým běží OmniRoute.
3. Ověřte, že je služba nainstalována: zkontrolujte `GET /api/services/{name}/status`
   a hodnotu `installedVersion`. Pokud je `null`, nejprve spusťte instalaci.
4. Zkontrolujte, že `DATA_DIR/services/{name}/node_modules/` existuje a není prázdný.
5. V odpovědi se stavem zkontrolujte pole `lastError`, které obsahuje upravený důvod ukončení.

---

### Studený start je pomalý (> 10 s do dosažení stavu `running`)

**Příznaky:** Stav zůstává dlouho `"starting"`, než se změní na `"running"` nebo `"error"`.

**Vysvětlení:** Studený start služby 9Router zahrnuje import rozsáhlých stromů závislostí (moduly DNS,
tunelování a MITM). Výchozí interval kontroly stavu je 2 s se 3 pokusy, než
supervizor ohlásí překročení časového limitu (ale pokračuje v kontrolách).

**Řešení:** Hodnoty `healthIntervalMs` a časový limit `waitForHealthy`
(`healthIntervalMs * 3`) lze nakonfigurovat v souboru `bootstrap.ts`. U služeb s delší
dobou spouštění zvyšte `healthIntervalMs` na 5000 a `stopTimeoutMs` na 30 000.

---

### Kolize portů (`EADDRINUSE`)

**Příznaky:** Protokoly obsahují `address already in use :::20130`.

**Příčiny:**

- Port 20130 již používá jiný proces.
- Předchozí proces 9Router nebyl zcela ukončen (zombie PID).

**Řešení:**

1. Změňte výchozí port pomocí proměnné prostředí `NINEROUTER_PORT` v souboru `.env`.
2. Vyhledejte a ukončete konfliktní proces: `lsof -ti :20130 | xargs kill -9`.
3. Port lze pro každou službu nakonfigurovat v souboru `bootstrap.ts` pomocí pole `port`.

**Poznámka:** 9Router ve výchozím nastavení používá port 20130, aby nedocházelo ke kolizi
s výchozím portem 20128 služby OmniRoute.

---

### Oprávnění odepřeno (EACCES) při instalaci

**Příznaky:** Instalace vrací stav 500, protokoly obsahují `EACCES` nebo `permission denied`.

**Příčiny:**

- Proces OmniRoute nemá oprávnění k zápisu do `DATA_DIR` nebo jeho nadřazeného adresáře.
- Spuštění v režimu rootless Dockeru bez oprávnění k zápisu do připojeného svazku.

**Řešení:**

1. Zkontrolujte `DATA_DIR` (výchozí hodnota: `~/.omniroute/`): `ls -la ~/.omniroute/`
2. Zajistěte, aby adresář vlastnil uživatel procesu OmniRoute: `chown -R $USER ~/.omniroute/`
3. V Dockeru zajistěte, aby měl připojený svazek správná oprávnění pro uživatele kontejneru.

---

### Aktualizace selže (časový limit `npm install` nebo chyba sítě)

**Příznaky:** Aktualizace vrací stav 500 s chybou `InstallError`, protokoly uvádějí překročení časového limitu sítě.

**Kontrolní seznam:**

1. Ověřte, že je registr npm dostupný: `npm ping`.
2. Zkontrolujte podnikový proxy server: `npm config get proxy`, `npm config get https-proxy`.
3. Zkuste instalaci provést ručně: `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`.
4. Pokud se nacházíte v izolované síti, stáhněte archiv předem a použijte `npm install /path/to/tarball.tgz`.

---

### Služba ihned po spuštění zobrazuje stav `"error"` (rychlé selhání)

**Příznaky:** Stav se změní z `"starting"` na `"error"` za méně než 5 sekund.
`lastError` zobrazuje `"Fast crash (exited with code 1)"`.

**Kontrolní seznam:**

1. Přečtěte si celý konec protokolu: `GET /api/services/{name}/logs?tail=500`.
2. Běžná příčina: chybějící proměnné prostředí, které služba očekává.
3. Pro 9Router: ověřte, že `NINEROUTER_DISABLE_MITM=true` a
   `NINEROUTER_DISABLE_TUNNEL=true` jsou součástí prostředí předaného při spuštění procesu (viz
   `installers/ninerouter.ts` `resolveSpawnArgs`).

---

## 8. Často kladené otázky

**Otázka: Mohu zpřístupnit koncové body integrovaných služeb klientům mimo loopback?**

Ne. Úroveň LOCAL_ONLY je záměrná (pevné pravidlo č. 17). Trasy, které mohou spustit
`npm install` nebo vytvářet procesy `node`, nesmějí být dostupné pro provoz
mimo loopback, protože JWT uniklý prostřednictvím tunelu (Cloudflare, Ngrok, Tailscale)
by jinak umožnil libovolné spouštění procesů. Pro
`/api/services/` neexistuje žádná výjimka — na rozdíl od `/api/mcp/` je tato trasa
vyloučena ze seznamu výjimek pro obcházení rozsahu manage.
Viz `docs/security/ROUTE_GUARD_TIERS.md`.

---

**Otázka: Budou 9Router a CLIProxyAPI dostupné v produkčních/cloudových nasazeních?**

Ano. Obě služby používají stejný model local-first jako samotný OmniRoute. Běží
na stejném počítači a komunikují přes loopback. „Produkční“ zde označuje VPS
nebo místní server, na kterém je OmniRoute nasazen, nikoli vzdáleného poskytovatele cloudu.

---

**Otázka: Jak mohu ladit supervisor?**

1. Sledujte výpis protokolu SSE: `curl -N http://localhost:20128/api/services/9router/logs`.
2. Zkontrolujte strukturované protokoly ve výstupu pino systému OmniRoute filtrované podle
   jmenného prostoru `service:supervisor`.
3. Prozkoumejte řádek databáze: `sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`.
4. Pomocí `GET /api/services/9router/status` zobrazte v jediném volání aktuální živý stav, PID, stav funkčnosti
   a `lastError`.

---

**Otázka: Supervisor zobrazuje `health: "degraded"` nebo `health: "unknown"`, ale stav je `"running"`. Je to problém?**

`"degraded"` znamená, že sonda stavu funkčnosti vrátila odpověď jinou než 200. `"unknown"` znamená, že zatím
nebyla dokončena žádná kontrola (souběh s prvním dotazováním). Oba stavy jsou během spouštění
přechodné. Pokud stav funkčnosti zůstane `"degraded"` déle než `healthIntervalMs * 3` ms po dosažení stavu
`"running"`, integrovaná služba běží, ale její HTTP API neodpovídá. Zkontrolujte,
zda je ve stavové odpovědi uveden správný port a zda služba na tomto portu skutečně
naslouchá.

---

**Otázka: Mohu změnit klíč API služby 9Router bez úplného restartu?**

Ne. Klíč API se předává službě 9Router prostřednictvím proměnné prostředí při spuštění procesu.
Proměnné prostředí nelze v běžícím procesu změnit. `POST .../rotate-key`
automaticky službu zastaví a restartuje, aby se nový klíč použil. Rotace klíče
se projeví během hodnoty `stopTimeoutMs` služby (výchozí hodnota je 15 s) plus doby jejího
spuštění.

---

**Otázka: Jaký je limit kruhové vyrovnávací paměti a co se stane po jejím zaplnění?**

Každá služba má vyhrazenou kruhovou vyrovnávací paměť o velikosti 5 MB. Když se vyrovnávací paměť zaplní, nejstarší
řádky protokolu se odstraní, aby se uvolnilo místo pro nové. Událost SSE `snapshot` vrací
nejnovější řádky v rámci limitu `tail`. Protokoly se neukládají na disk, pokud
není v řádku databáze nastavena hodnota `logsBufferPath`.

---

## Viz také

- `docs/security/ROUTE_GUARD_TIERS.md` — podrobnosti o úrovni LOCAL_ONLY
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 mapování modulu integrovaných služeb
- `docs/architecture/ARCHITECTURE.md` — kontext na úrovni systému
- `docs/openapi.yaml` — strojově čitelné definice koncových bodů
- `CLAUDE.md` §„Přidání nové integrované služby“ — stručný kontrolní seznam
