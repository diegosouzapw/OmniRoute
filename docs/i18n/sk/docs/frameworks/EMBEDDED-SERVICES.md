# Embedded Services (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇰 [da](../../../da/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇪 [de](../../../de/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇸 [es](../../../es/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇩 [id](../../../id/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇹 [it](../../../it/docs/frameworks/EMBEDDED-SERVICES.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇴 [no](../../../no/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **Verzia:** v3.8.44
> **Posledná aktualizácia:** 2026-07-03
> **Cieľová skupina:** Inžinieri, ktorí pridávajú, udržiavajú alebo ladia zabudované služby (9Router, CLIProxyAPI, Mux, Bifrost).

Zabudované služby sú lokálne nainštalované sprievodné procesné nástroje, ktoré OmniRoute inštaluje, spravuje a
sprístupňuje ako plnohodnotné ciele smerovania. Na rozdiel od externých poskytovateľov (ku ktorým sa pristupuje cez internet
pomocou kľúčov API) bežia zabudované služby na rovnakom počítači ako OmniRoute a komunikujú cez rozhranie loopback.

---

## Obsah

1. [Prehľad](#1-overview)
2. [Architektúra — 4 vrstvy](#2-architecture--4-layers)
3. [Stavový automat životného cyklu](#3-lifecycle-state-machine)
4. [Referencia API](#4-api-reference)
5. [Zabezpečenie](#5-security)
6. [Pridanie novej zabudovanej služby](#6-adding-a-new-embedded-service)
7. [Riešenie problémov](#7-troubleshooting)
8. [Často kladené otázky](#8-faq)

---

## 1. Prehľad

### Prečo zabudované služby?

Zabudovaných je päť služieb:

| Služba          | Balík npm                                    | Predvolený port | Účel                                                                                                                                                                                                                |
| --------------- | -------------------------------------------- | :-------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **9Router**     | `9router`                                    |      20130      | Smerovač AI, ktorý môže OmniRoute používať ako čiastkového poskytovateľa. Modely sú sprístupnené ako `9router/{sub}/{model}`                                                                                        |
| **CLIProxyAPI** | Binárny súbor z vydania GitHubu (`cliproxy`) |      8317       | Lokálny proxy adaptér pre autentifikačné postupy Anthropic CLI. Poskytuje záložné smerovanie po vypršaní platnosti tokenov OAuth                                                                                    |
| **Mux**         | `mux` (bezhlavý `mux server`)                |      8322       | Lokálny démon na orchestráciu agentov (coder/mux). Iba so spravovaným životným cyklom — nejde o cieľ smerovania (bez proxy pre LLM).                                                                                |
| **Bifrost**     | `@maximhq/bifrost`                           |      8080       | Backendová brána AI typu relay napísaná v jazyku Go. Keď je spustená, automaticky ju vyberie trasa relay (`/v1/relay/`)                                                                                             |
| **Dario**       | `@askalf/dario`                              |      3456       | Proxy pre predplatné Claude — alternatíva/záložné riešenie k CLIProxyAPI pre komunikáciu vo formáte Claude Code; vložený kľúč sa stane `DARIO_ADMIN_TOKEN`, ktorý zabezpečuje jeho riadiacu vrstvu OAuth `/admin/*` |

Všetkých päť služieb používa rovnaký model dohľadu:

- OmniRoute ich inštaluje do `DATA_DIR/services/{name}/` (izolovane od vlastného súboru `package.json` systému OmniRoute)
- OmniRoute ich spúšťa a monitoruje ako podriadené procesy
- OmniRoute vkladá do prostredia podriadeného procesu dočasný kľúč API a obmieňa ho bez prerušenia prevádzky (ak je to relevantné)
- Všetky správcovské trasy (`/api/services/*`) sú **LOCAL_ONLY** — prístupné iba z rozhrania loopback (pevné pravidlo č. 17)

### Kľúčové rozhodnutia (z návrhového plánu)

| Rozhodnutie                                                              | Hodnota                                                                                                  |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Prístup ovládacieho panela k natívnemu používateľskému rozhraniu 9Router | Reverzný proxy server na `/dashboard/providers/services/9router/embed/*`                                 |
| Mechanizmus inštalácie                                                   | `npm install {package}` prostredníctvom `execFile` (bez interpolácie shellu)                             |
| Režim používania                                                         | Poskytovateľ zaregistrovaný v smerovacom jadre ako `9router/{sub}/{model}`                               |
| Správa kľúčov API                                                        | OmniRoute ich generuje, šifruje pri uložení (AES-256-GCM) a vkladá prostredníctvom premenných prostredia |
| Umiestnenie na ovládacom paneli                                          | `/dashboard/providers/services` (tri karty)                                                              |
| Automatické spustenie                                                    | Prepínač pre každú službu, predvolene VYPNUTÝ                                                            |

---

## 2. Architektúra — 4 vrstvy

```
┌────────────────────────────────────────────────────────────────────┐
│  Vrstva 1 — UI                                                     │
│  /dashboard/providers/services  (karty: CLIProxyAPI | 9Router | Mux)│
│  Živé logy (SSE), Spustiť/Zastaviť/Reštartovať/Aktualizovať,       │
│  Nastavenia, Inštalovať                                            │
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               Obal + smerovanie kariet podľa ?tab= │
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (Next.js fetch)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Vrstva 2 — API (LOCAL_ONLY — iba loopback)                        │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    (reverzný HTTP + WebSocket proxy → upstream 9Router)            │
│                                                                    │
│  Brána: LOCAL_ONLY_API_PREFIXES zahŕňa "/api/services/" a          │
│         "/dashboard/providers/services/*/embed/"                   │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ volania v rámci procesu
┌──────────────────────▼─────────────────────────────────────────────┐
│  Vrstva 3 — ServiceSupervisor (src/lib/services/)                  │
│                                                                    │
│  ServiceSupervisor.ts   Všeobecný správca (child_process.spawn)    │
│    ├── install:    execFile('npm', ['install', pkg, '--prefix'])    │
│    ├── start:      spawn(node, [entrypoint], {env, cwd})           │
│    ├── api_key:    crypto.randomBytes(32) → env NINEROUTER_API_KEY  │
│    ├── port:       20130 pre 9Router (konfigurovateľný)            │
│    ├── logs:       kruhový buffer stdio 5 MB → udalosti SSE        │
│    ├── health:     HTTP GET /health každé 2–5 s, lenivé obnovenie  │
│    └── lifecycle:  SIGTERM 15 s → SIGKILL                          │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       Inicializuje všetky SERVICES[] pri štarte procesu│
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       Periodické GET /v1/models → tabuľka service_models│
│  ringBuffer.ts      Kruhový buffer logov (5 MB na službu)          │
│  healthCheck.ts     Pravidelná kontrola stavu cez HTTP             │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts             │
│                      (inštalačné adaptéry)                         │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP kompatibilné s OpenAI (loopback)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Vrstva 4 — Poskytovateľ / Smerovanie                              │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    Pri každej požiadavke znova vyhľadá port a kľúč API (bez cache).│
│    Pred proxyovaním odstráni z ID modelu predponu "9router/".       │
│    Vráti 503 service_not_running, ak správca nie je v stave        │
│    "running".                                                      │
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    Záznam pre "9router": isEmbeddedService: true                   │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    Modely sú uložené ako "9router/{sub}/{model}" (s predponou).     │
│    modelSync.ts ich synchronizuje každých 5 min.                   │
│                                                                    │
│  Mux má spravovaný IBA životný cyklus (vrstvy 1–3) — je to démon   │
│  na orchestráciu agentov, nie LLM proxy, preto nemá executor ani   │
│  záznam poskytovateľa vo vrstve 4 a nikdy nie je cieľom smerovania.│
└────────────────────────────────────────────────────────────────────┘
```

### Kľúčové zdrojové súbory

| Súbor                                       | Úloha                                                          |
| ------------------------------------------- | -------------------------------------------------------------- |
| `src/lib/services/ServiceSupervisor.ts`     | Základná trieda: životný cyklus, zámok, stav, kruhový zásobník |
| `src/lib/services/bootstrap.ts`             | Registrácia na úrovni procesu a automatické spustenie          |
| `src/lib/services/registry.ts`              | Mapa singletonov `tool → supervisor`                           |
| `src/lib/services/apiKey.ts`                | Generovanie kľúčov, šifrovanie AES-256-GCM pri uložení         |
| `src/lib/services/modelSync.ts`             | Pravidelná synchronizácia modelov (5 min) + na požiadanie      |
| `src/lib/services/ringBuffer.ts`            | Kruhový zásobník protokolov s veľkosťou 5 MB a odberom SSE     |
| `src/lib/services/healthCheck.ts`           | Kontrola stavu cez HTTP (konfigurovateľný interval)            |
| `src/lib/services/installers/ninerouter.ts` | Inštalácia/aktualizácia/odinštalovanie 9Router cez npm         |
| `src/lib/services/installers/cliproxy.ts`   | Inštalácia/aktualizácia/odinštalovanie CLIProxyAPI cez npm     |
| `src/lib/services/installers/mux.ts`        | Inštalácia/aktualizácia/odinštalovanie Mux cez npm             |
| `src/app/api/services/9router/_lib.ts`      | Pomocná funkcia `getOrInitSupervisor()`                        |
| `src/app/api/services/[name]/logs/route.ts` | Zdieľaný koncový bod SSE pre protokoly                         |
| `open-sse/executors/ninerouter.ts`          | Vykonávací modul poskytovateľa (vrstva 4)                      |

---

## 3. Stavový automat životného cyklu

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
           kontrola stavu úspešná   │         pád / SIGTERM     │
                               ┌────▼─────┐  (ukončenie do 5 s) │
                               │ running  │──── pád ────────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

Stavy sa ukladajú v tabuľke DB `version_manager` (stĺpec `status`) a zrkadlia
sa v stave `ServiceSupervisor` v pamäti. Stav v pamäti je autoritatívny pre
spustený proces; stav v DB je trvalou záložnou hodnotou pri spustení systému.

### Prechody stavov

| Zo stavu        | Udalosť                                          | Do stavu               |
| --------------- | ------------------------------------------------ | ---------------------- |
| `not_installed` | `install()` uspeje                               | `stopped`              |
| `stopped`       | zavolá sa `start()`                              | `starting`             |
| `starting`      | kontrola stavu vráti 200                         | `running`              |
| `starting`      | proces sa ukončí pred dosiahnutím zdravého stavu | `error`                |
| `running`       | zavolá sa `stop()`                               | `stopping` → `stopped` |
| `running`       | proces sa neočakávane ukončí (< 5 s)             | `error` (rýchly pád)   |
| `running`       | proces sa neočakávane ukončí (> 5 s)             | `error`                |
| `error`         | zavolá sa `start()`                              | `starting`             |
| ľubovoľný       | `stop()` počas stavu `stopping`                  | bez operácie           |

### Zámok operácií

`ServiceSupervisor` serializuje operácie životného cyklu prostredníctvom asynchrónneho
zámku operácií (`withLock()`). Súbežné volania `start()` v tom istom supervisore
spôsobia presne jedno spustenie procesu; druhý volajúci počká a vráti existujúci stav.
Tým sa zabráni súbehovým konfliktom, napríklad keď sa automatické spustenie a tlačidlo
v používateľskom rozhraní aktivujú súčasne.

---

## 4. Referencia API

Všetky trasy pod `/api/services/` sú **LOCAL_ONLY** (iba loopback, pevné pravidlo č. 17).
Požiadavky, ktoré nepochádzajú z rozhrania loopback, dostanú odpoveď `403 LOCAL_ONLY`
bez ohľadu na autorizačný token.

### 4.1 Koncové body 9Router (11 trás)

#### `POST /api/services/9router/install`

Nainštaluje 9Router z npm. Vytvorí `DATA_DIR/services/9router/` s vlastnými
`package.json` a `node_modules/`. Nekoliduje s vlastnými závislosťami OmniRoute.

**Telo požiadavky** (všetky polia sú voliteľné):

```json
{ "version": "latest" }
```

| Pole      | Typ      | Predvolená hodnota | Popis                                        |
| --------- | -------- | ------------------ | -------------------------------------------- |
| `version` | `string` | `"latest"`         | značka verzie npm alebo semver na inštaláciu |

**Odpovede:**

| Stav  | Popis                                                           |
| ----- | --------------------------------------------------------------- |
| `200` | `{ ok: true, installedVersion: "x.y.z", path: "..." }`          |
| `400` | Neplatné telo požiadavky (zlyhanie validácie Zod)               |
| `409` | Inštalácia už prebieha (zámok je aktívny)                       |
| `500` | Inštalácia npm zlyhala — zrozumiteľnú chybu nájdete v `message` |

**Poznámky:** Používa `execFile('npm', [...])` — bez shellu a interpolácie (pevné pravidlo č. 13).
Chyby EACCES sa zobrazujú ako zrozumiteľné správy.

---

#### `POST /api/services/9router/start`

Spustí 9Router. Ak supervisor ešte nie je zaregistrovaný, zaregistruje ho a následne
zavolá `supervisor.start()`. Ak je služba už spustená, operácia je idempotentná.

**Telo požiadavky:** žiadne

**Odpovede:**

| Stav  | Popis                                                    |
| ----- | -------------------------------------------------------- |
| `200` | Objekt `ServiceStatus` (pozri schému nižšie)             |
| `409` | 9Router nie je nainštalovaný (`status: "not_installed"`) |
| `503` | Spustenie zlyhalo (chyba procesu — pozri `lastError`)    |

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

Korektne zastaví 9Router. Odošle SIGTERM, počká 15 s a potom odošle SIGKILL,
ak je proces stále aktívny. Ak je služba už zastavená, operácia je idempotentná.

**Telo požiadavky:** žiadne

**Odpovede:**

| Stav  | Popis                               |
| ----- | ----------------------------------- |
| `200` | `ServiceStatus` (stav: `"stopped"`) |
| `503` | Zastavenie neočakávane zlyhalo      |

---

#### `POST /api/services/9router/restart`

Ekvivalent volania `stop()` a následne `start()` v rámci zámku operácií.

**Telo požiadavky:** žiadne

**Odpovede:** rovnaké ako pri `start` (vráti konečný `ServiceStatus`).

---

#### `POST /api/services/9router/update`

Aktualizuje 9Router na novšiu verziu npm. Ak je služba spustená, najprv sa zastaví,
potom sa spustí inštalácia npm (novšia verzia sa nainštaluje na pôvodné miesto)
a následne sa služba reštartuje.

**Telo požiadavky** (všetky polia sú voliteľné):

```json
{ "version": "latest" }
```

**Odpovede:**

| Stav  | Popis                                                           |
| ----- | --------------------------------------------------------------- |
| `200` | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400` | Neplatné telo                                                   |
| `500` | Aktualizácia npm zlyhala                                        |

---

#### `POST /api/services/9router/rotate-key`

Vygeneruje nový API kľúč pre 9Router, zašifruje ho v úložisku a reštartuje službu
(ak je spustená), aby načítala nový kľúč zo svojho prostredia. Platnosť starého
kľúča sa okamžite zruší.

**Telo požiadavky:** žiadne

**Odpovede:**

| Stav  | Popis                                      |
| ----- | ------------------------------------------ |
| `200` | `{ keyRotated: true, restarted: boolean }` |
| `500` | Rotácia zlyhala                            |

**Zabezpečenie:** Nový kľúč sa nikdy nevracia v odpovedi (nedôjde k úniku prihlasovacích údajov).
Je uložený v zašifrovanej podobe (AES-256-GCM) v tabuľke `version_manager`.

---

#### `GET /api/services/9router/status`

Vráti kombinovaný aktuálny stav a stav z databázy vrátane metadát verzie a náhľadu API kľúča.

**Odpovede:**

| Stav  | Popis                    |
| ----- | ------------------------ |
| `200` | Pozrite si schému nižšie |
| `500` | Načítanie stavu zlyhalo  |

**Schéma odpovede:**

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

Prepne príznak automatického spustenia. Keď je `enabled: true`, služba sa automaticky
spustí pri nasledujúcom spustení OmniRoute (ak je služba nainštalovaná).

**Telo požiadavky:**

```json
{ "enabled": true }
```

**Odpovede:**

| Stav  | Popis                 |
| ----- | --------------------- |
| `200` | `{ autoStart: true }` |
| `400` | Neplatné telo         |

---

#### `GET /api/services/9router/logs`

Prúd SSE živých protokolov z kruhovej vyrovnávacej pamäte stdout/stderr služby 9Router.

**Parametre dopytu:**

| Parameter | Typ       | Predvolená hodnota | Popis                                                                                               |
| --------- | --------- | ------------------ | --------------------------------------------------------------------------------------------------- |
| `tail`    | `integer` | 200                | Počet historických riadkov, ktoré sa majú odoslať ako prvé (max. 1000)                              |
| `filter`  | `string`  | žiadny             | Filter podreťazca bez rozlišovania veľkosti písmen (bez regulárnych výrazov — bezpečný proti ReDoS) |

**Udalosti SSE:**

| Udalosť     | Dáta        | Popis                              |
| ----------- | ----------- | ---------------------------------- |
| `snapshot`  | `LogLine[]` | Počiatočná historická koncová časť |
| `log`       | `LogLine`   | Riadok živého protokolu            |
| `heartbeat` | `{}`        | Udržiavacia správa každých 15 s    |

**Schéma LogLine:**

```json
{
  "ts": 1716633600000,
  "stream": "stdout",
  "line": "[9router] Listening on :20130"
}
```

**Odpovede:**

| Stav  | Popis                                             |
| ----- | ------------------------------------------------- |
| `200` | `text/event-stream`                               |
| `400` | Parameter `filter` je príliš dlhý (> 200 znakov)  |
| `404` | Služba sa nenašla (správca nie je zaregistrovaný) |

---

### 4.2 Koncové body CLIProxyAPI (10 trás)

CLIProxyAPI má rovnakú štruktúru koncových bodov ako 9Router bez `rotate-key`, navyše má
`accounts`, `provider-expose` a `auto-restart-adopted`. Teraz dostáva vyhradený
API kľúč dátovej roviny vložený pri spustení (`needsApiKey: true` v
`bootstrap.ts`, používaný na synchronizáciu modelov); `status` obsahuje menej polí.

| Metóda | Cesta                               | Popis                                          |
| ------ | ----------------------------------- | ---------------------------------------------- |
| `POST` | `/api/services/cliproxy/install`    | Nainštaluje CLIProxyAPI z npm                  |
| `POST` | `/api/services/cliproxy/start`      | Spustí CLIProxyAPI                             |
| `POST` | `/api/services/cliproxy/stop`       | Zastaví CLIProxyAPI                            |
| `POST` | `/api/services/cliproxy/restart`    | Reštartuje CLIProxyAPI                         |
| `POST` | `/api/services/cliproxy/update`     | Aktualizuje na novšiu verziu                   |
| `GET`  | `/api/services/cliproxy/status`     | Aktuálny stav + stav z DB (bez `apiKeyMasked`) |
| `POST` | `/api/services/cliproxy/auto-start` | Prepne automatické spustenie                   |

Zdieľaný koncový bod `GET /api/services/{name}/logs` (pozrite si §4.1) funguje pre všetky
štyri služby pomocou dynamického segmentu `[name]`.

---

### 4.3 Koncové body Mux (8 trás)

Mux má rovnakú štruktúru koncových bodov ako CLIProxyAPI — bez trasy `rotate-key` v rozhraní
API (nosný token sa generuje rovnakým spôsobom ako token služby 9Router prostredníctvom
`getOrCreateApiKey("mux")` a vkladá sa pomocou premennej prostredia `MUX_SERVER_AUTH_TOKEN`, ale
zatiaľ neexistuje vyhradený koncový bod na rotáciu). Pre Mux sa spravuje iba životný cyklus: na rozdiel
od 9Router nemá vykonávaciu vrstvu 4 a nikdy sa neregistruje ako poskytovateľ smerovania.

| Metóda | Cesta                          | Popis                                   |
| ------ | ------------------------------ | --------------------------------------- |
| `POST` | `/api/services/mux/install`    | Nainštaluje Mux z npm (`npm i mux`)     |
| `POST` | `/api/services/mux/start`      | Spustí Mux (`mux server`)               |
| `POST` | `/api/services/mux/stop`       | Zastaví Mux                             |
| `POST` | `/api/services/mux/restart`    | Reštartuje Mux                          |
| `POST` | `/api/services/mux/update`     | Aktualizuje na novšiu verziu balíka npm |
| `GET`  | `/api/services/mux/status`     | Aktuálny stav + stav z DB               |
| `POST` | `/api/services/mux/auto-start` | Prepne automatické spustenie            |

---

### 4.4 Koncové body Bifrost (8 trás)

Bifrost je backendová prepojovacia brána AI napísaná v jazyku Go (`@maximhq/bifrost`). Používa rovnakú
štruktúru koncových bodov ako CLIProxyAPI (bez `rotate-key` — Bifrost spravuje vlastné kľúče
poskytovateľov v súbore `config.json` vo svojom adresári `-app-dir`).

| Metóda | Cesta                              | Popis                                                                               |
| ------ | ---------------------------------- | ----------------------------------------------------------------------------------- |
| `POST` | `/api/services/bifrost/install`    | Nainštaluje Bifrost z npm (`@maximhq/bifrost`)                                      |
| `POST` | `/api/services/bifrost/start`      | Spustí Bifrost na porte 8080 (predvolené)                                           |
| `POST` | `/api/services/bifrost/stop`       | Zastaví Bifrost                                                                     |
| `POST` | `/api/services/bifrost/restart`    | Reštartuje Bifrost                                                                  |
| `POST` | `/api/services/bifrost/update`     | Aktualizuje na novšiu verziu                                                        |
| `GET`  | `/api/services/bifrost/status`     | Aktuálny stav + stav v DB                                                           |
| `POST` | `/api/services/bifrost/auto-start` | Prepne automatické spustenie                                                        |
| `GET`  | `/api/services/bifrost/logs`       | Výstup protokolu cez SSE (prostredníctvom zdieľanej dynamickej trasy `[name]/logs`) |

**Konfigurácia smerovania:** Keď `BIFROST_BASE_URL` nie je nastavená a spravovaná
inštancia Bifrost je spustená, `getBifrostRoutingConfig()` (v `routingBackend.ts`) automaticky
použije `http://127.0.0.1:{port}` ako základnú URL relé. Explicitne nastavená premenná prostredia
`BIFROST_BASE_URL` má vždy prednosť.

---

### 4.5 Koncové body Dario (12 trás)

Rovnaká štruktúra životného cyklu ako pri ostatných službách (`install`, `start`, `stop`, `restart`,
`update`, `status`, `auto-start`, `auto-restart-adopted`) a navyše riadiaca vrstva OAuth
zabezpečená tokenom pod `admin/`: `admin/accounts`, `admin/import-from-omniroute`,
`admin/login-start`, `admin/login-complete` (všetky zabezpečené pomocou `DARIO_ADMIN_TOKEN`).

### 4.6 Reverzný proxy server (vložený ovládací panel 9Router)

Ovládací panel vkladá webové používateľské rozhranie 9Router do prvku iframe prostredníctvom interného reverzného
proxy servera na adrese:

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

Tento proxy server:

- Preposiela požiadavku na `http://127.0.0.1:{port}/{path}` (iba cez loopback)
- Odstraňuje prichádzajúce hlavičky `cookie` a `authorization` (bez úniku relácie OmniRoute)
- Vkladá `Authorization: Bearer {apiKey}` na autentifikáciu služby 9Router
- Z odpovede odstraňuje `set-cookie`, `content-security-policy`, `x-frame-options`, `cross-origin-*`
- Prepisuje odpovede HTML tak, aby vložil `<base href>` a normalizoval absolútne cesty (`/foo` → `/dashboard/.../embed/foo`)

Prechody na WebSocket pre vložený ovládací panel spracúva sprievodný server na
vyhradenom porte (pozrite si `src/lib/services/embedWsProxy.ts`).

**Zabezpečenie:** Trasy vloženého proxy servera sú klasifikované pod `LOCAL_ONLY_API_PREFIXES`
a sú dostupné iba cez loopback. Útočník, ktorý získa JWT prostredníctvom tunela
Cloudflare/Ngrok, nemôže využívať proxy na prístup k vloženým službám.

---

## 5. Bezpečnosť

### Vynucovanie LOCAL_ONLY (pevné pravidlo #17)

Všetky trasy pod `/api/services/` a `/dashboard/providers/services/*/embed/` sú
v `src/server/authz/routeGuard.ts` klasifikované ako LOCAL_ONLY. Kontrola spätnej slučky
sa vykonáva bezpodmienečne pred ktoroukoľvek vetvou autentifikácie:

```
príde požiadavka
  → isLocalOnlyPath(path)?
      → mimo spätnej slučky → 403 LOCAL_ONLY (vždy, pred kontrolou autentifikácie)
      → spätná slučka       → pokračovanie na bežnú autentifikáciu
```

Tým sa zabráni tomu, aby uniknutý JWT (napr. cez tunel) spustil `npm install` alebo
vytvorenie procesu. Úplnú maticu úrovní nájdete v
`docs/security/ROUTE_GUARD_TIERS.md`.

### Vkladanie API kľúča

9Router a Mux vyžadujú pre svoje vlastné HTTP koncové body API kľúč/bearer token.
OmniRoute:

1. Vygeneruje kľúč pomocou `crypto.randomBytes(32).toString("base64url")` s
   prefixom špecifickým pre službu (`nr_` pre 9Router, `mx_` pre Mux).
2. Zašifruje ho pri uložení pomocou AES-256-GCM (rovnaká šifra sa používa pre prihlasovacie údaje poskytovateľa).
3. Pri spustení ho dešifruje a vloží ako premennú prostredia —
   `NINEROUTER_API_KEY` pre 9Router, `MUX_SERVER_AUTH_TOKEN` pre Mux (nikdy nie ako
   príznak CLI, takže sa token nikdy nezobrazí v `ps`/zoznamoch procesov).
4. Nikdy nevráti kľúč v otvorenom texte v žiadnej HTTP odpovedi.

CLIProxyAPI dostáva vyhradený kľúč dátovej roviny vložený pri spustení
(`needsApiKey: true` — používa sa na synchronizáciu modelov s adaptérom).

### Ochrana proti SSRF

Reverzný HTTP proxy server (`/dashboard/.../embed/[...path]`) je napevno nastavený tak, aby
preposielal iba na `http://127.0.0.1:{port}`. Nikdy nenasleduje presmerovania na ciele
mimo spätnej slučky. Knižnica `ssrf-req-filter` sa používa na odmietnutie každej nadradenej URL adresy,
ktorá sa preloží na adresu mimo rozsahu spätnej slučky.

### Bezpečnosť shellu (pevné pravidlo #13)

`npm install` sa vyvoláva pomocou `execFile('npm', ['install', pkg, '--prefix', dir])` —
bez šablónových literálov, bez shellu a bez interpolácie externých ciest do reťazca
príkazu. Hodnoty za behu (porty, API kľúče) sa odovzdávajú prostredníctvom objektu `env` podradeného procesu.

### Sanitizácia chýb (pevné pravidlo #12)

Všetky chybové odpovede z `/api/services/*` prechádzajú cez `buildErrorBody()` alebo
`sanitizeErrorMessage()`. Nespracované `err.stack` a `err.message` sa volajúcemu nikdy
nevracajú doslovne.

---

## 6. Pridanie novej vnorenej služby

Postupujte podľa týchto 8 krokov. Existujúce implementácie v `src/lib/services/installers/`
a `src/app/api/services/` považujte za kanonickú referenciu.

### Krok 1 — Vytvorte inštalátor

Vytvorte `src/lib/services/installers/{name}.ts` podľa vzoru `ninerouter.ts`:

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // vyberte voľný port

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

Použite `runNpm(['install', NAME_PACKAGE, '--prefix', dir])` z `installers/utils.ts`
— nikdy nie `execSync` ani interpoláciu v shelli.

### Krok 2 — Zaregistrujte službu pri zavádzaní

Pridajte `ServiceEntry` do poľa `SERVICES` v `src/lib/services/bootstrap.ts`:

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // false, ak API kľúč nie je potrebný
}
```

Rozšírte `buildSpawnArgsFactory()` tak, aby spracovával `cfg.tool === "myservice"`.

#### Kontrakt zásuvného modulu poskytovateľa (1. fáza, #7333)

`src/lib/services/providerPlugins/` zavádza kontrakt `ServiceProviderPlugin`, ktorý
združuje polia `ServiceEntry` zo súboru `bootstrap.ts` backendu a polia šablóny manifestu
zo súboru `serviceBackends.ts` do jedného objektu namiesto toho, aby bola štruktúra toho
istého backendu vyjadrená samostatne v dvoch nesúvisiacich súboroch. V čase písania je
**migrovaný iba `9router`** — `bootstrap.ts` odvodzuje svoju položku `SERVICES[]` z
`getServiceProviderPlugin("9router")` (`src/lib/services/providerPlugins/registry.ts`)
a pri chýbajúcom zásuvnom module vyvolá chybu pri spustení. `cliproxy`, `mux` a `bifrost`
zostávajú nezmenené na už existujúcich vložených literáloch `SERVICES[]`.

Do `open-sse/config/providerPluginManifest.ts` bola tiež pridaná doplnková pomocná funkcia
`createServiceBackendManifestEntry(pluginId, template)`, ktorá vytvára správne sformovanú
položku `ProviderPluginManifestEntry` z položky `SERVICE_BACKEND_MANIFEST_TEMPLATE` — zatiaľ
**nie je** zapojená do žiadnej aktívnej cesty požiadavky (ani
`generateProviderPluginManifestFromRegistry()`, ani `/v1/providers/[provider]/models`);
to zostáva následným krokom po overení kontraktu pre druhý backend.

Do nadväzujúcich PR, sledovaných v rámci problému #7333, boli odložené: migrácia `cliproxyapi`
prostredníctvom rovnakého registra, zovšeobecnenie `mux`/`bifrost` do zjednotenia
`ServiceBackendPluginId`, začlenenie špeciálneho spracovania smerovania exekútorov
(`open-sse/executors/index.ts`, `open-sse/handlers/chatCore/executorProxy.ts`) do kontraktu
zásuvného modulu a zapojenie `createServiceBackendManifestEntry()` do aktívnej cesty kódu
manifestu/modelov.

### Krok 3 — Pridajte migráciu a počiatočné údaje databázy

Pomocou migrácie v `src/lib/db/migrations/` zabezpečte, aby mala služba riadok v
`version_manager`. Riadok by mal obsahovať:

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### Krok 4 — Vytvorte 7 koncových bodov API

V adresári `src/app/api/services/{name}/`:

```
_lib.ts            pomocná funkcia getOrInitSupervisor()
install/route.ts   POST — volá installer.install()
start/route.ts     POST — volá supervisor.start()
stop/route.ts      POST — volá supervisor.stop()
restart/route.ts   POST — volá supervisor.restart()
update/route.ts    POST — volá installer.update()
status/route.ts    GET  — zlučuje aktuálny stav so stavom databázy
auto-start/route.ts POST — prepína príznak auto_start
```

Zdieľaná trasa `GET /api/services/[name]/logs` je už zapojená — nie sú v nej
potrebné žiadne zmeny.

Všetky chybové odpovede delegujte prostredníctvom `createErrorResponse()` / `buildErrorBody()`.

### Krok 5 — Pridanie do LOCAL_ONLY_API_PREFIXES

V súbore `src/server/authz/routeGuard.ts` overte, že `/api/services/` sa už nachádza v zozname.
Ak zavediete nový prefix (napr. `/api/tools/`), pridajte ho do
`LOCAL_ONLY_API_PREFIXES` a ak spúšťa procesy, aj do `SPAWN_CAPABLE_PREFIXES`.
Pridajte test do `tests/unit/authz/routeGuard.test.ts`.

### Krok 6 — Pridanie karty používateľského rozhrania

Vytvorte `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`.
Znova použite zdieľané komponenty:

- `ServiceStatusCard` — aktuálny stav + indikátor stavu služby
- `ServiceLifecycleButtons` — Spustiť / Zastaviť / Reštartovať / Aktualizovať
- `ServiceLogsPanel` — priebežný výpis protokolov cez SSE (pripája sa k `/api/services/{name}/logs`)
- `ApiKeyCard` — zobrazenie + obnova kľúča (ak `needsApiKey: true`)

Zaregistrujte kartu v `ServicesPageShell.tsx`.

### Krok 7 — Pridanie položky poskytovateľa (ak je služba cieľom smerovania)

Ak vstavaná služba poskytuje koncový bod `/v1/chat/completions` kompatibilný s OpenAI:

1. Pridajte položku poskytovateľa do `src/shared/constants/providers.ts` s nastavením `isEmbeddedService: true`.
2. Vytvorte `open-sse/executors/{name}.ts`, ktorý rozširuje `BaseExecutor`. Pri každej požiadavke znova vyhľadajte port a
   API kľúč (nikdy ich neukladajte do vyrovnávacej pamäte v konštruktore). Keď stav správcu nie je `"running"`, vráťte
   odpoveď `503 service_not_running`.
3. Zaregistrujte modely v `open-sse/config/providerRegistry.ts` s prefixom služby
   (napr. `myservice/sub/model`). `modelSync.ts` ich bude priebežne aktualizovať.

### Krok 8 — Dokumentácia a testovanie

1. Aktualizujte `docs/frameworks/EMBEDDED-SERVICES.md` (tento súbor) — pridajte službu do
   tabuľky v §1 a všetky nové koncové body do §4.
2. Pridajte jednotkové testy do `tests/unit/services/` (životný cyklus, inštalátor, tvar API).
3. Pridajte integračný test do `tests/integration/services/` (podmienený nastavením `RUN_SERVICES_INT=1`).
4. Aktualizujte `docs/openapi.yaml` o nové koncové body.

---

## 7. Riešenie problémov

### Služba sa nespustí

**Príznaky:** Tlačidlo spustenia vráti 503, stav zostáva `"error"` alebo `"starting"`.

**Kontrolný zoznam:**

1. Skontrolujte `GET /api/services/{name}/logs` (alebo panel Logs na riadiacom paneli). Vyhľadajte
   riadky ako `Error: ENOENT`, `address already in use` alebo `Cannot find module`.
2. Overte, že `npm` sa nachádza v PATH: spustite `which npm` z rovnakého používateľského účtu, pod ktorým beží OmniRoute.
3. Overte, že je služba nainštalovaná: v odpovedi `GET /api/services/{name}/status` skontrolujte
   `installedVersion`. Ak má hodnotu `null`, najskôr spustite inštaláciu.
4. Skontrolujte, či `DATA_DIR/services/{name}/node_modules/` existuje a nie je prázdny.
5. V odpovedi so stavom skontrolujte pole `lastError`, ktoré obsahuje upravený dôvod ukončenia.

---

### Studený štart je pomalý (> 10 s do dosiahnutia stavu `running`)

**Príznaky:** Stav zostáva dlho `"starting"` a až potom sa zmení na `"running"` alebo `"error"`.

**Vysvetlenie:** Studený štart 9Router zahŕňa importovanie rozsiahlych stromov závislostí (DNS,
tunel, moduly MITM). Predvolený interval kontroly stavu je 2 s s 3 pokusmi, kým
správca vyhlási prekročenie časového limitu (v kontrole však pokračuje).

**Riešenie:** Hodnoty `healthIntervalMs` a časový limit `waitForHealthy`
(`healthIntervalMs * 3`) možno konfigurovať v súbore `bootstrap.ts`. Pre služby s dlhším
časom spúšťania zvýšte `healthIntervalMs` na 5000 a `stopTimeoutMs` na 30 000.

---

### Konflikt portov (`EADDRINUSE`)

**Príznaky:** Protokoly zobrazujú `address already in use :::20130`.

**Príčiny:**

- Port 20130 už používa iný proces.
- Predchádzajúci proces 9Router nebol úplne zastavený (zombie PID).

**Riešenie:**

1. Zmeňte predvolený port pomocou premennej prostredia `NINEROUTER_PORT` v súbore `.env`.
2. Nájdite a ukončite konfliktný proces: `lsof -ti :20130 | xargs kill -9`.
3. Port možno konfigurovať pre každú službu v súbore `bootstrap.ts` pomocou poľa `port`.

**Poznámka:** 9Router predvolene používa port 20130, aby sa predišlo konfliktu s
predvoleným portom 20128 služby OmniRoute.

---

### Prístup zamietnutý (EACCES) počas inštalácie

**Príznaky:** Inštalácia vráti 500, protokoly zobrazujú `EACCES` alebo `permission denied`.

**Príčiny:**

- Proces OmniRoute nemá oprávnenie na zápis do `DATA_DIR` alebo jeho nadradeného adresára.
- Spustenie v bezkoreňovom režime Docker bez oprávnenia na zápis do pripojeného zväzku.

**Riešenie:**

1. Skontrolujte `DATA_DIR` (predvolene: `~/.omniroute/`): `ls -la ~/.omniroute/`
2. Zaistite, aby používateľ procesu OmniRoute vlastnil tento adresár: `chown -R $USER ~/.omniroute/`
3. V prostredí Docker zaistite, aby mal pripojený zväzok správne oprávnenia pre používateľa kontajnera.

---

### Aktualizácia zlyhá (časový limit `npm install` alebo chyba siete)

**Príznaky:** Aktualizácia vráti 500 s chybou `InstallError`, protokoly zobrazujú prekročenie časového limitu siete.

**Kontrolný zoznam:**

1. Overte dostupnosť registra npm: `npm ping`.
2. Skontrolujte firemný proxy server: `npm config get proxy`, `npm config get https-proxy`.
3. Skúste inštaláciu vykonať manuálne: `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`.
4. Ak sa nachádzate v izolovanej sieti, vopred stiahnite archív tarball a použite `npm install /path/to/tarball.tgz`.

---

### Služba ihneď po spustení zobrazuje stav `"error"` (rýchle zlyhanie)

**Príznaky:** Stav sa zmení z `"starting"` na `"error"` za menej ako 5 sekúnd.
`lastError` zobrazuje `"Fast crash (exited with code 1)"`.

**Kontrolný zoznam:**

1. Prečítajte si úplný koniec protokolu: `GET /api/services/{name}/logs?tail=500`.
2. Bežná príčina: chýbajúce premenné prostredia, ktoré služba očakáva.
3. Pre 9Router: overte, že `NINEROUTER_DISABLE_MITM=true` a
   `NINEROUTER_DISABLE_TUNNEL=true` sú súčasťou prostredia odovzdaného pri spustení procesu (pozrite si
   `installers/ninerouter.ts` `resolveSpawnArgs`).

---

## 8. Často kladené otázky

**Otázka: Môžem sprístupniť koncové body vstavaných služieb klientom mimo rozhrania loopback?**

Nie. Úroveň LOCAL_ONLY je zámerná (pevné pravidlo č. 17). Trasy, ktoré môžu spustiť
`npm install` alebo vytvoriť procesy `node`, nesmú byť dostupné pre komunikáciu mimo
rozhrania loopback, pretože JWT uniknutý prostredníctvom tunela (Cloudflare, Ngrok, Tailscale) by
inak umožnil ľubovoľné vytváranie procesov. Pre
`/api/services/` neexistuje žiadna výnimka — na rozdiel od `/api/mcp/` je táto trasa vylúčená
zo zoznamu výnimiek pre rozsah správy. Pozrite si `docs/security/ROUTE_GUARD_TIERS.md`.

---

**Otázka: Budú 9Router a CLIProxyAPI dostupné v produkčných/cloudových nasadeniach?**

Áno. Obe služby používajú rovnaký model uprednostňujúci lokálne prostredie ako samotný OmniRoute. Sú spustené
na rovnakom počítači a komunikujú cez rozhranie loopback. „Produkcia“ tu znamená VPS
alebo lokálny server, na ktorom je nasadený OmniRoute, nie vzdialeného cloudového poskytovateľa.

---

**Otázka: Ako môžem ladiť supervisor?**

1. Sledujte výstup streamu protokolov SSE: `curl -N http://localhost:20128/api/services/9router/logs`.
2. Skontrolujte štruktúrované protokoly vo výstupe pino aplikácie OmniRoute, filtrované podľa
   menného priestoru `service:supervisor`.
3. Skontrolujte riadok DB: `sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`.
4. Pomocou `GET /api/services/9router/status` zobrazte v jednom volaní aktuálny živý stav, PID, stav služby
   a `lastError`.

---

**Otázka: Supervisor zobrazuje `health: "degraded"` alebo `health: "unknown"`, ale stav je `"running"`. Je to problém?**

`"degraded"` znamená, že kontrola stavu vrátila odpoveď inú ako 200. `"unknown"` znamená, že ešte
nebola dokončená žiadna kontrola (súbeh s prvým dopytovaním). Oba stavy sú počas spúšťania prechodné.
Ak stav zostane `"degraded"` dlhšie než `healthIntervalMs * 3` ms po
`"running"`, vstavaná služba je spustená, ale jej HTTP API neodpovedá. Skontrolujte,
či je port v odpovedi so stavom správny a či služba na danom porte skutočne
počúva.

---

**Otázka: Môžem zmeniť API kľúč služby 9Router bez úplného reštartu?**

Nie. API kľúč sa službe 9Router odovzdáva prostredníctvom premennej prostredia pri vytvorení procesu.
Premenné prostredia nemožno v spustenom procese meniť. `POST .../rotate-key`
automaticky zastaví a reštartuje službu, aby sa nový kľúč použil. Rotácia kľúča
sa prejaví v rámci hodnoty `stopTimeoutMs` služby (predvolene 15 s) plus čas potrebný
na jej spustenie.

---

**Otázka: Aký je limit kruhového zásobníka a čo sa stane, keď sa zaplní?**

Každá služba má vyhradený 5 MB kruhový zásobník. Keď je zásobník plný, najstaršie
riadky protokolu sa odstránia, aby sa uvoľnilo miesto pre nové. Udalosť SSE `snapshot` vráti
najnovšie riadky v rámci limitu `tail`. Protokoly sa neukladajú na disk, pokiaľ
v riadku DB nie je nastavená hodnota `logsBufferPath`.

---

## Pozrite si tiež

- `docs/security/ROUTE_GUARD_TIERS.md` — podrobnosti o úrovni LOCAL_ONLY
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 mapovanie modulu vstavaných služieb
- `docs/architecture/ARCHITECTURE.md` — kontext na úrovni systému
- `docs/openapi.yaml` — strojovo čitateľné definície koncových bodov
- `CLAUDE.md` §„Pridanie novej vstavanej služby“ — stručný kontrolný zoznam
