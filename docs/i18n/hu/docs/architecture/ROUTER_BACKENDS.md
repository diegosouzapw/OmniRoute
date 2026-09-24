# Router Backends & Embedded Services — architecture contract (ADR) (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Állapot:** Elfogadva · **Kontextus:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Szerződés:** `domain/routing/routerBackends.ts`
> (típusos nyilvántartás — a kód a [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) keretében érkezik)

Ez az ADR pontosan meghatározza, hogyan viszonyul egymáshoz a `ts` (natív), a `bifrost`, a `cliproxy`, a `9router`, valamint a VibeProxy-kompatibilis motorok, hogy a közreműködők ne mossanak össze két, architekturálisan különálló fogalmat. Az útválasztási háttérrendszer nyilvántartásával bevezetett típusos nyilvántartást dokumentálja e modell igazságának egyetlen forrásaként.

## Az alapvető különbség — két ortogonális tengely

Egy motor szerepét **két független tengely** írja le, amelyeket a nyilvántartás `RouterBackendDefinition` típusa együtt kódol:

1. **Életciklus** (`RouterBackendLifecycle`) — _hogyan fut a motor_:
   - `in-process` — az OmniRoute Node-folyamatán belül fut (a natív TS-folyamatlánc).
   - `supervised` — egy helyi gyermekfolyamat, amelyet az OmniRoute a `ServiceSupervisor` segítségével telepít, indít el, állít le és ellenőriz állapot szempontjából, majd szolgáltatói kapcsolatként használ.
   - `external` — egy HTTP-végpont, amelyhez az OmniRoute kéréseket irányít, de amelyet **nem** kezel (egy környezeti változóban megadott alap-URL konfigurálja).
   - `disabled` — regisztrálva van, de nem választható ki.
2. **Kiválasztási tengely** (a relay útválasztási háttérrendszere) — _a relay továbbít-e hozzá kéréseket_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` a
   `src/app/api/v1/relay/chat/completions/routingBackend.ts` fájlban.

Az elkerülendő hiba: a „beágyazott szolgáltatást” és az „útválasztási háttérrendszert” egyetlen listaként kezelni. Ezek nem azonosak. Egy `supervised` motor (9router/cliproxy) a **natív folyamatlánc által használt szolgáltatói kapcsolat**, nem pedig egy alternatív relay-továbbítási háttérrendszer. A `bifrost` ennek a fordítottja — egy relay-továbbítási háttérrendszer, amely (történelmileg) kizárólag `external` volt.

## A nyilvántartás — az igazság egyetlen forrása

A `domain/routing/routerBackends.ts` szerződés (a kód a [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) keretében érkezik) minden motort egyszer deklarál, annak életciklusával, képességeivel, szolgáltatásazonosítójával, alapértelmezett portjával, állapotellenőrzési konfigurációjával és telemetriai támogatásával együtt. A felhasználók a motorokat a `getRouterBackend(id)`, `listRouterBackends()` és `listRouterBackendsByCapability(cap)` segítségével keresik meg ahelyett, hogy minden kísérőfolyamathoz külön esetkezelést alkalmaznának.

| Háttérrendszer | Életciklus   | Szolgáltatás (A tengely) | Relay-háttérrendszer (B tengely) | Állapotellenőrzés | Alapértelmezett port |
| -------------- | ------------ | ------------------------ | -------------------------------- | ----------------- | -------------------- |
| `ts`           | `in-process` | —                        | `ts` (natív)                     | —                 | —                    |
| `bifrost`      | `external`¹  | —¹                       | `bifrost` / `auto`               | `/health`         | —                    |
| `cliproxy`     | `supervised` | `cliproxy`               | — (szolgáltató)                  | `/v1/models`      | 8317                 |
| `9router`      | `supervised` | `9router`                | — (szolgáltató)                  | `/api/health`     | 20130                |
| `vibeproxy`    | `external`   | —                        | — (szolgáltatói adapter)         | `/v1/models`      | —                    |

¹ A Bifrost `supervised` beágyazott szolgáltatássá történő előléptetését (amely a `/api/services/bifrost/` útvonalról telepíthető és indítható) a [#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817) követi nyomon; annak egyesítéséig a Bifrost kizárólag `external` (csak a `BIFROST_BASE_URL` címen keresztül érhető el).

A `capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`, `oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) lehetővé teszi, hogy a hívók az alapján szűrjenek, mire képes ténylegesen egy motor, ahelyett, hogy az egyes azonosítókhoz külön ágakat kódolnának.

## A tengely — beágyazott szolgáltatások (felügyelt folyamat oldala)

- **Felügyelt folyamatok nyilvántartása:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (jelenleg: `9router`, `cliproxy`).
- **Az életciklus kezelője:** `src/lib/services/ServiceSupervisor.ts` — a `start()` elindítja a
  gyermekfolyamatot, megvárja a `waitForHealthy()` sikerét, valamint a stdout/stderr kimenetét egy körkörös pufferbe irányítja;
  a `stop()` SIGTERM→SIGKILL; minden művelet zárolással van sorosítva.
- **Állapotunió** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, valamint egy
  ortogonális `HealthState = healthy | unhealthy | unknown`.
- **Miért külön folyamat (és nem folyamaton belüli SDK)?** A folyamatizoláció teszi lehetővé,
  hogy az egyes sidecarok telepítése/indítása/leállítása/állapotellenőrzése/naplózása egymástól függetlenül vezérelhető legyen, és hogy
  a loopback indításvédelme alkalmazható legyen. A folyamaton belüli adapter modellezése jövőbeli feladat — ezt
  a `native-hot-path` képességjelző fejezné ki.

### Életciklus-útvonal szerződése (`/api/services/<tool>/…`)

Az állapotkódok **szándékosan állapot-/ige-/útvonalspecifikusak** — ez maga a szerződés, nem
következetlenség:

| Hívás                         | Feltétel                        | Állapot                              |
| ----------------------------- | ------------------------------- | ------------------------------------ |
| `POST .../start`              | a szolgáltatás `not_installed`  | **409** (előfeltétel)                |
| `POST .../stop`               | már le van állítva              | **200** (idempotens üres művelet)    |
| `GET .../status`              | rendben                         | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`              | indítási hiba                   | **503** (átmeneti)                   |
| `GET .../status`, `.../stop`  | kezeletlen hiba                 | **500**                              |
| `GET /api/services/<x>/logs`  | ismeretlen eszköz: `<x>`        | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`   | hiányzó `X-Reveal-Confirm: yes` | **403** (csak 9router)               |
| **bármely** `/api/services/*` | a hívó nem loopback/privát LAN  | **403 LOCAL_ONLY**                   |

Minden hibatörzs formáját a `createErrorResponse()` határozza meg →
`{ error: { message, type }, requestId }`, ahol a `type` az állapotkódból származik
(`500→server_error`, `404→not_found`, `409→conflict`, egyébként `invalid_request`), és ez a
géppel feldolgozható megkülönböztető érték. Az üzenetek előzetesen megtisztításra kerülnek
(`sanitizeErrorMessage()`, 12. szigorú szabály).

**A loopback-védelem** a `403` leggyakoribb forrása: az `/api/services/` szerepel a
`LOCAL_ONLY_API_PREFIXES` listában (`src/server/authz/routeGuard.ts`), és a
`src/server/authz/policies/management.ts` **a hitelesítés előtt** elutasít minden nem loopback / nem privát LAN-ról érkező
hívót, mivel ezek az útvonalak gyermekfolyamatokat indítanak (15. és 17.
szigorú szabály). A nyilvános alagúton keresztüli elérésük szándékosan `403` választ ad.

## B tengely — relay-útválasztási háttérrendszer (továbbítási oldal)

Csak a relay proxy `/api/v1/relay/chat/completions` útvonala választ továbbítási
háttérrendszert; a fő `/api/v1/chat/completions` felület soha nem használja a
`routingBackend.ts` fájlt.

- **Kiválasztás** (`resolveRelayRoutingBackend`): egyetlen globális környezetiváltozó-kapcsoló —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Ha nincs beállítva, akkor `auto`, amennyiben a Bifrost konfigurálva és engedélyezve van, egyébként `ts`.
- **Viselkedés:**
  - `bifrost` (kényszerített): Bifrost-hiba → kötelező `502`, nincs tartalék útvonal.
  - `auto`: megpróbálja a Bifrostot, hiba/várakozási idő esetén észrevétlenül továbblép a natív megoldásra.
  - `ts` / tartalék útvonalra váltás után: a natív `open-sse` fordító-/végrehajtási folyamat.
- **Várakozási idő:** `baseUrl` értékenkénti, hibát követő várakozási idő a `bifrostCooldown.ts` fájlban.

A kiválasztás **jelenleg a relay szintjén mindent vagy semmit alapon történik** — a `release/v3.8.43` verzióban nincs
szolgáltatónkénti vagy kérésenkénti motorváltás. A kérésenkénti kaput a
sidecar-manifeszt munkálatai adják hozzá
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifeszt +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
ami lehetővé teszi, hogy az `auto` csak a manifeszt alapján jogosult szolgáltatókat irányítsa át a Bifroston.

## Integráció az irányítópulttal

A szolgáltatások irányítópultja 5 másodpercenként lekérdezi a `GET /api/services/<tool>/status` végpontot a
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`
fájlon keresztül, amely a következőt adja vissza: `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Nincs megosztott rendelkezésreállásikontextus-szolgáltató —
minden komponens eszközönként hívja meg a hookot. `!res.ok` esetén a hook jelenleg egy
egyszerű `HTTP <status>` üzenetet jelenít meg; az `error.type` mező közérthető magyarázatra
való leképezése nyomon követett UX-fejlesztés, nem pedig a kontraktus módosítása.

## Következmények

- Az új motorokat egyszer kell regisztrálni a `ROUTER_BACKENDS` alatt; a fogyasztók képesség-
  lekérdezéseken keresztül érik el őket, új, azonosítónkénti elágazások nélkül.
- Arra a kérdésre, hogy „Ez egy szolgáltatás vagy egy útválasztási háttérrendszer?”, a `lifecycle` mező
  ad választ, nem pedig az, hogy egy adott azonosító melyik listában szerepel.
- A Bifrost felügyelete (#5817) és a natív gyorsútvonal-migráció (#5670) erre a
  megosztott kontraktusra épül, ahelyett, hogy minden egyes sidecart különleges esetként kezelne.
