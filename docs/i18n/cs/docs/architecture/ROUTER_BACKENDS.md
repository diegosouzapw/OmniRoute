# Router Backends & Embedded Services — architecture contract (ADR) (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Stav:** Přijato · **Kontext:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Kontrakt:** `domain/routing/routerBackends.ts`
> (typovaný registr — kód bude začleněn v rámci [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Tento ADR přesně vymezuje vzájemné vztahy mezi enginy `ts` (nativní), `bifrost`, `cliproxy`, `9router` a enginy kompatibilními s VibeProxy, aby přispěvatelé přestali zaměňovat dvě architektonicky odlišné věci. Dokumentuje typovaný registr zavedený v rámci implementace registru backendů routeru jako jediný zdroj pravdy pro tento model.

## Základní rozlišení — dvě ortogonální osy

Role enginu je popsána pomocí **dvou nezávislých os**, které jsou společně zakódovány v `RouterBackendDefinition` registru:

1. **Životní cyklus** (`RouterBackendLifecycle`) — _jak engine běží_:
   - `in-process` — běží uvnitř procesu Node aplikace OmniRoute (nativní pipeline v TS).
   - `supervised` — místní podřízený proces, který OmniRoute instaluje/spouští/zastavuje/kontroluje jeho stav prostřednictvím `ServiceSupervisor` a následně jej používá jako připojení k poskytovateli.
   - `external` — koncový bod HTTP, na který OmniRoute odesílá požadavky, ale **nespravuje** jej (konfiguruje se pomocí základní URL z proměnné prostředí).
   - `disabled` — je zaregistrován, ale nelze jej vybrat.
2. **Osa výběru** (backend směrování přenosu) — _zda na něj přenos odesílá požadavky_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` v
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Je třeba se vyvarovat chyby, kdy se „vestavěná služba“ a „backend směrování“ považují za jeden seznam. Není tomu tak. Engine typu `supervised` (9router/cliproxy) je **připojení k poskytovateli používané nativní pipeline**, nikoli alternativní backend pro odesílání požadavků přenosu. `bifrost` je opačný případ — jedná se o backend pro odesílání požadavků přenosu, který byl (historicky) pouze typu `external`.

## Registr — jediný zdroj pravdy

Kontrakt `domain/routing/routerBackends.ts` (kód bude začleněn v rámci [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) deklaruje každý engine právě jednou, včetně jeho životního cyklu, funkcí, identity služby, výchozího portu, konfigurace kontroly stavu a podpory telemetrie. Spotřebitelé vyhledávají enginy prostřednictvím `getRouterBackend(id)`, `listRouterBackends()` a `listRouterBackendsByCapability(cap)` namísto přidávání speciálních podmínek pro jednotlivé postranní služby.

| Backend     | Životní cyklus | Služba (osa A) | Backend přenosu (osa B)   | Kontrola stavu | Výchozí port |
| ----------- | -------------- | -------------- | ------------------------- | -------------- | ------------ |
| `ts`        | `in-process`   | —              | `ts` (nativní)            | —              | —            |
| `bifrost`   | `external`¹    | —¹             | `bifrost` / `auto`        | `/health`      | —            |
| `cliproxy`  | `supervised`   | `cliproxy`     | — (poskytovatel)          | `/v1/models`   | 8317         |
| `9router`   | `supervised`   | `9router`      | — (poskytovatel)          | `/api/health`  | 20130        |
| `vibeproxy` | `external`     | —              | — (adaptér poskytovatele) | `/v1/models`   | —            |

¹ Povýšení Bifrostu na vestavěnou službu typu `supervised` (kterou lze nainstalovat/spustit z `/api/services/bifrost/`) se sleduje v [#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); dokud nebude začleněno, je Bifrost pouze typu `external` (dostupný výhradně prostřednictvím `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`, `oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) umožňují volajícím filtrovat podle toho, co daný engine skutečně umí, namísto pevně zakódovaných větví pro jednotlivé identifikátory.

## Osa A — vestavěné služby (strana spravovaného procesu)

- **Registr spravovaných procesů:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (aktuálně: `9router`, `cliproxy`).
- **Vlastník životního cyklu:** `src/lib/services/ServiceSupervisor.ts` — `start()` spustí
  podřízený proces, čeká na úspěšné dokončení `waitForHealthy()`, zachytává stdout/stderr do kruhového bufferu;
  `stop()` provede SIGTERM→SIGKILL; vše je serializováno pomocí zámku.
- **Sjednocení stavů** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error` a k tomu
  ortogonální `HealthState = healthy | unhealthy | unknown`.
- **Proč samostatný proces (a ne SDK běžící uvnitř procesu)?** Izolace procesů umožňuje
  nezávisle řídit instalaci/spuštění/zastavení/stav/protokoly každého sidecaru a dovoluje
  použít ochranu spouštění omezenou na loopback. Modelování adaptéru běžícího uvnitř procesu je plánováno do budoucna —
  právě k jeho vyjádření by sloužil příznak schopnosti `native-hot-path`.

### Kontrakt tras životního cyklu (`/api/services/<tool>/…`)

Stavové kódy jsou **záměrně specifické pro stav/sloveso/cestu** — jde o kontrakt, nikoli
nekonzistenci:

| Volání                          | Podmínka                                    | Stav                                   |
| ------------------------------- | ------------------------------------------- | -------------------------------------- |
| `POST .../start`                | služba je `not_installed`                   | **409** (nesplněný předpoklad)         |
| `POST .../stop`                 | již zastaveno                               | **200** (idempotentní prázdná operace) |
| `GET .../status`                | v pořádku                                   | **200** (`live ?? row ?? "unknown"`)   |
| `POST .../start`                | selhání spuštění                            | **503** (přechodné)                    |
| `GET .../status`, `.../stop`    | nezachycená chyba                           | **500**                                |
| `GET /api/services/<x>/logs`    | neznámý nástroj `<x>`                       | **404** `Service '<x>' not found`      |
| `GET .../status?reveal=key`     | chybí `X-Reveal-Confirm: yes`               | **403** (pouze 9router)                |
| **libovolné** `/api/services/*` | volající není z loopbacku/privátní sítě LAN | **403 LOCAL_ONLY**                     |

Všechna těla chyb mají strukturu vytvořenou funkcí `createErrorResponse()` →
`{ error: { message, type }, requestId }`, kde je `type` odvozen od stavu
(`500→server_error`, `404→not_found`, `409→conflict`, jinak `invalid_request`) a
slouží jako strojově zpracovatelný rozlišovací údaj. Zprávy jsou předem sanitizovány
(`sanitizeErrorMessage()`, Tvrdé pravidlo č. 12).

**Ochrana loopbacku** je nejčastějším zdrojem odpovědi `403`: `/api/services/` je v
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) a
`src/server/authz/policies/management.ts` odmítá všechny volající, kteří nejsou z loopbacku / privátní sítě LAN,
**ještě před ověřením**, protože tyto trasy spouštějí podřízené procesy (Tvrdá pravidla č. 15
a 17). Přístup k nim prostřednictvím veřejného tunelu končí záměrně stavem `403`.

## Osa B — backend směrování relay (strana dispatchingu)

Backend dispatchingu vybírá pouze cesta relay proxy `/api/v1/relay/chat/completions`;
hlavní rozhraní `/api/v1/chat/completions` nikdy nepoužívá
`routingBackend.ts`.

- **Výběr** (`resolveRelayRoutingBackend`): jeden globální přepínač prostředí —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Není-li nastaven, použije se `auto`, pokud je Bifrost nakonfigurován a povolen, jinak `ts`.
- **Chování:**
  - `bifrost` (vynucený): selhání Bifrostu → pevná odpověď `502`, bez náhradního řešení.
  - `auto`: vyzkouší Bifrost; při selhání nebo aktivním cooldownu tiše přejde na nativní řešení.
  - `ts` / po přechodu na náhradní řešení: nativní pipeline překladače/exekutoru `open-sse`.
- **Cooldown:** cooldown po selhání pro jednotlivé hodnoty `baseUrl` v `bifrostCooldown.ts`.

Výběr se dnes na úrovni relay řídí principem **všechno, nebo nic** — ve verzi
`release/v3.8.43` neexistuje přepínání enginu podle poskytovatele ani jednotlivého požadavku. Brána pro jednotlivé požadavky je doplňována
v rámci práce na manifestu sidecaru
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
která umožní režimu `auto` směrovat přes Bifrost pouze poskytovatele vyhovující manifestu.

## Integrace dashboardu

Dashboard služeb každých 5 s dotazuje endpoint `GET /api/services/<tool>/status` prostřednictvím
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
který vrací `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Neexistuje žádný sdílený poskytovatel kontextu dostupnosti —
každá komponenta volá hook pro každý nástroj zvlášť. Při `!res.ok` hook aktuálně zobrazuje
pouze `HTTP <status>`; mapování pole `error.type` na srozumitelné vysvětlení pro uživatele je
evidovaným vylepšením UX, nikoli změnou kontraktu.

## Důsledky

- Nové enginy se jednou zaregistrují v `ROUTER_BACKENDS`; konzumenti je získají prostřednictvím
  dotazů na schopnosti bez nových větví pro jednotlivá ID.
- Na otázku „Je toto služba, nebo směrovací backend?“ odpovídá pole `lifecycle`, nikoli
  seznam, ve kterém se dané ID náhodou nachází.
- Dohled nad Bifrostem (#5817) a nativní migrace kritické cesty (#5670) stavějí na tomto
  sdíleném kontraktu namísto speciálního zpracování jednotlivých sidecarů.
