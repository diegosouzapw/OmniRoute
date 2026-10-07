# Router Backends & Embedded Services — architecture contract (ADR) (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Stanje:** Sprejeto · **Kontekst:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Pogodba:** `domain/routing/routerBackends.ts`
> (tipiziran register — koda bo vključena z [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Ta ADR natančno določa medsebojna razmerja med `ts` (izvorni), `bifrost`, `cliproxy`, `9router` in pogoni, združljivimi z VibeProxy, da sodelavci ne bi več zamenjevali dveh arhitekturno ločenih stvari. Dokumentira tipiziran register, uveden v okviru dela na registru usmerjevalnih zaledij, kot edini vir resnice za ta model.

## Ključna razlika — dve pravokotni osi

Vloga pogona je opisana z **dvema neodvisnima osema**, ki sta skupaj kodirani v `RouterBackendDefinition` registra:

1. **Življenjski cikel** (`RouterBackendLifecycle`) — _kako se pogon izvaja_:
   - `in-process` — izvaja se znotraj procesa Node aplikacije OmniRoute (izvorni cevovod TS).
   - `supervised` — lokalni podrejeni proces, ki ga OmniRoute namesti/zažene/ustavi/preverja njegovo stanje
     prek `ServiceSupervisor`, nato pa ga uporablja kot povezavo s ponudnikom.
   - `external` — končna točka HTTP, na katero OmniRoute posreduje zahteve, vendar je **ne** upravlja
     (konfigurirana je z osnovnim URL-jem iz okoljske spremenljivke).
   - `disabled` — registriran, vendar ga ni mogoče izbrati.
2. **Os izbire** (usmerjevalno zaledje posrednika) — _ali posrednik vanj usmerja zahteve_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` v
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Napaka, ki se ji je treba izogniti: obravnavanje »vgrajene storitve« in »usmerjevalnega zaledja« kot enega seznama. To nista. Pogon `supervised` (9router/cliproxy) je **povezava s ponudnikom, ki jo uporablja izvorni cevovod**, in ne nadomestno zaledje za posrednikovo usmerjanje zahtev. `bifrost` je nasprotno — usmerjevalno zaledje posrednika, ki je bilo (zgodovinsko) omejeno na `external`.

## Register — edini vir resnice

Pogodba `domain/routing/routerBackends.ts` (koda bo vključena z
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) vsak pogon deklarira enkrat, skupaj z njegovim
življenjskim ciklom, zmogljivostmi, identiteto storitve, privzetimi vrati, konfiguracijo preverjanja stanja in
podporo za telemetrijo. Odjemalci pogone poiščejo prek `getRouterBackend(id)`,
`listRouterBackends()` in `listRouterBackendsByCapability(cap)`, namesto da bi
posebej obravnavali vsako spremljevalno storitev.

| Zaledje     | Življenjski cikel | Storitev (os A) | Zaledje posrednika (os B) | Preverjanje stanja | Privzeta vrata |
| ----------- | ----------------- | --------------- | ------------------------- | ------------------ | -------------- |
| `ts`        | `in-process`      | —               | `ts` (izvorno)            | —                  | —              |
| `bifrost`   | `external`¹       | —¹              | `bifrost` / `auto`        | `/health`          | —              |
| `cliproxy`  | `supervised`      | `cliproxy`      | — (ponudnik)              | `/v1/models`       | 8317           |
| `9router`   | `supervised`      | `9router`       | — (ponudnik)              | `/api/health`      | 20130          |
| `vibeproxy` | `external`        | —               | — (vmesnik ponudnika)     | `/v1/models`       | —              |

¹ Napredovanje Bifrosta v vgrajeno storitev `supervised` (ki jo je mogoče namestiti/zagnati
iz `/api/services/bifrost/`) se spremlja v
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); dokler ta sprememba ni združena,
je Bifrost omejen na `external` (dosegljiv izključno prek `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) klicateljem omogočajo
filtriranje glede na dejanske zmožnosti pogona, namesto trdo kodiranih vej za posamezne identifikatorje.

## Os A — vdelane storitve (stran nadzorovanih procesov)

- **Register nadzorovanih procesov:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (trenutno: `9router`, `cliproxy`).
- **Lastnik življenjskega cikla:** `src/lib/services/ServiceSupervisor.ts` — `start()` zažene
  podrejeni proces, nadaljuje po `waitForHealthy()` ter zajema stdout/stderr v krožni medpomnilnik;
  `stop()` uporabi SIGTERM→SIGKILL; vse je serializirano z zaklepom.
- **Unija stanj** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error` ter neodvisno
  stanje `HealthState = healthy | unhealthy | unknown`.
- **Zakaj ločen proces (in ne SDK znotraj procesa)?** Izolacija procesov omogoča,
  da se namestitev/zagon/zaustavitev/zdravje/dnevniki vsakega pomožnega procesa upravljajo neodvisno,
  hkrati pa omogoča uporabo zaščite pred zagonom zunaj povratne zanke.
  Modeliranje adapterja znotraj procesa je načrtovano v prihodnosti — to bi izražala
  zastavica zmogljivosti `native-hot-path`.

### Pogodba poti življenjskega cikla (`/api/services/<tool>/…`)

Kode stanja so **namenoma specifične za stanje/glagol/pot** — to je pogodba in ne
nedoslednost:

| Klic                              | Pogoj                                                | Stanje                                       |
| --------------------------------- | ---------------------------------------------------- | -------------------------------------------- |
| `POST .../start`                  | storitev je `not_installed`                          | **409** (predpogoj)                          |
| `POST .../stop`                   | že zaustavljena                                      | **200** (idempotentna operacija brez učinka) |
| `GET .../status`                  | v redu                                               | **200** (`live ?? row ?? "unknown"`)         |
| `POST .../start`                  | neuspešen zagon procesa                              | **503** (prehodno)                           |
| `GET .../status`, `.../stop`      | neobravnavana napaka                                 | **500**                                      |
| `GET /api/services/<x>/logs`      | neznano orodje `<x>`                                 | **404** `Service '<x>' not found`            |
| `GET .../status?reveal=key`       | manjka `X-Reveal-Confirm: yes`                       | **403** (samo 9router)                       |
| **katera koli** `/api/services/*` | klicatelj ni iz povratne zanke/zasebnega omrežja LAN | **403 LOCAL_ONLY**                           |

Vsa telesa napak oblikuje `createErrorResponse()` →
`{ error: { message, type }, requestId }`, pri čemer je `type` izpeljan iz stanja
(`500→server_error`, `404→not_found`, `409→conflict`, sicer `invalid_request`) in je
strojno obdelovljiv razločevalnik. Sporočila so vnaprej očiščena
(`sanitizeErrorMessage()`, strogo pravilo št. 12).

**Zaščita povratne zanke** je najpogostejši vir odgovora `403`: `/api/services/` je v
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`), pravilnik
`src/server/authz/policies/management.ts` pa zavrne vsakega klicatelja, ki ni iz
povratne zanke ali zasebnega omrežja LAN, **še pred preverjanjem pristnosti**, saj
te poti zaganjajo podrejene procese (strogi pravili 15 in 17). Dostop do njih prek
javnega tunela po zasnovi vrne `403`.

## Os B — zaledje usmerjanja posredovanja (stran razpošiljanja)

Zaledje razpošiljanja izbira samo pot posredniškega strežnika
`/api/v1/relay/chat/completions`; glavna površina `/api/v1/chat/completions` nikoli
ne uporablja `routingBackend.ts`.

- **Izbira** (`resolveRelayRoutingBackend`): enotna globalna nastavitev okolja —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Če ni nastavljena, se uporabi `auto`, kadar je Bifrost konfiguriran in omogočen,
  sicer pa `ts`.
- **Vedenje:**
  - `bifrost` (vsiljeno): napaka storitve Bifrost → neposreden `502`, brez rezervne možnosti.
  - `auto`: poskusi Bifrost; ob napaki ali obdobju čakanja neopazno preklopi na izvorno izvedbo.
  - `ts` / po preklopu na rezervno možnost: izvorni cevovod prevajalnika/izvajalnika `open-sse`.
- **Obdobje čakanja:** obdobje čakanja po napaki za vsak `baseUrl` v `bifrostCooldown.ts`.

Izbira je **trenutno na ravni posredovanja vse ali nič** — v `release/v3.8.43` ni
preklopa mehanizma za posameznega ponudnika ali posamezno zahtevo. Prehod za
posamezno zahtevo se dodaja v okviru dela na manifestu pomožnih procesov
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
kar načinu `auto` omogoča, da prek storitve Bifrost usmerja samo ponudnike,
ki izpolnjujejo pogoje manifesta.

## Integracija nadzorne plošče

Nadzorna plošča storitev vsakih 5 s poizveduje po `GET /api/services/<tool>/status` prek
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
ki vrne `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Skupni ponudnik konteksta razpoložljivosti ne obstaja —
vsaka komponenta pokliče kavelj za posamezno orodje. Pri `!res.ok` kavelj trenutno prikaže
le `HTTP <status>`; preslikava polja `error.type` v uporabniku razumljivo razlago je
načrtovana izboljšava uporabniške izkušnje, ne sprememba pogodbe.

## Posledice

- Novi pogoni se enkrat registrirajo v `ROUTER_BACKENDS`; odjemalci jih pridobijo prek poizvedb
  o zmogljivostih brez novih vej za posamezne identifikatorje.
- Na vprašanje »Ali je to storitev ali usmerjevalno zaledje?« odgovarja polje `lifecycle`, ne
  seznam, na katerem se identifikator slučajno pojavi.
- Nadzorovanje Bifrosta (#5817) in selitev kritične poti na izvorno izvajanje (#5670) temeljita na tej
  skupni pogodbi, namesto da bi vsako spremljevalno storitev obravnavala kot poseben primer.
