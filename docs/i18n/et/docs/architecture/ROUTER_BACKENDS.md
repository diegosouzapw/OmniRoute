# Router Backends & Embedded Services — architecture contract (ADR) (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Olek:** Vastu võetud · **Kontekst:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Leping:** `domain/routing/routerBackends.ts`
> (tüübitud register — kood lisatakse koos [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

See ADR määratleb, kuidas `ts` (natiivne), `bifrost`, `cliproxy`, `9router` ja
VibeProxyga ühilduvad mootorid omavahel suhestuvad, et kaastöötajad ei ajaks enam
segi kaht arhitektuuriliselt erinevat asja. See dokument kirjeldab marsruutimise
taustaprogrammide registri töö käigus lisatud tüübitud registrit selle mudeli
ainsa tõeallikana.

## Põhierinevus — kaks ortogonaalset telge

Mootori rolli kirjeldavad **kaks sõltumatut telge**, mis on registri
`RouterBackendDefinition`-is koos kodeeritud:

1. **Elutsükkel** (`RouterBackendLifecycle`) — _kuidas mootor töötab_:
   - `in-process` — töötab OmniRoute'i Node'i protsessis (natiivne TS-i konveier).
   - `supervised` — kohalik alamprotsess, mille OmniRoute paigaldab/käivitab/peatab/mille tervist kontrollib
     `ServiceSupervisor`-i kaudu ning mida seejärel kasutatakse pakkuja ühendusena.
   - `external` — HTTP-lõpp-punkt, kuhu OmniRoute päringuid suunab, kuid mida ta **ei** halda
     (seadistatakse keskkonnamuutuja baas-URL-iga).
   - `disabled` — registreeritud, kuid pole valitav.
2. **Valikutelg** (relee marsruutimise taustaprogramm) — _kas relee suunab päringud sellele_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` failis
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Viga, mida tuleb vältida: „manustatud teenuse” ja „marsruutimise taustaprogrammi”
käsitlemine ühe loendina. Need ei ole sama asi. `supervised`-mootor
(9router/cliproxy) on **natiivse konveieri kasutatav pakkuja ühendus**, mitte
alternatiivne relee suunamise taustaprogramm. `bifrost` on vastupidine — relee
suunamise taustaprogramm, mis oli (ajalooliselt) ainult `external`.

## Register — ainus tõeallikas

`domain/routing/routerBackends.ts`-i leping (kood lisatakse koos
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) deklareerib iga mootori üks kord koos selle
elutsükli, võimekuste, teenuseidentiteedi, vaikepordi, tervisekontrolli seadistuse
ja telemeetria toega. Tarbijad otsivad mootoreid funktsioonide
`getRouterBackend(id)`, `listRouterBackends()` ja
`listRouterBackendsByCapability(cap)` kaudu, selle asemel et iga abiprotsessi
eraldi käsitleda.

| Taustaprogramm | Elutsükkel   | Teenus (telg A) | Relee taustaprogramm (telg B) | Tervisekontroll | Vaikeport |
| -------------- | ------------ | --------------- | ----------------------------- | --------------- | --------- |
| `ts`           | `in-process` | —               | `ts` (natiivne)               | —               | —         |
| `bifrost`      | `external`¹  | —¹              | `bifrost` / `auto`            | `/health`       | —         |
| `cliproxy`     | `supervised` | `cliproxy`      | — (pakkuja)                   | `/v1/models`    | 8317      |
| `9router`      | `supervised` | `9router`       | — (pakkuja)                   | `/api/health`   | 20130     |
| `vibeproxy`    | `external`   | —               | — (pakkuja adapter)           | `/v1/models`    | —         |

¹ Bifrosti ülendamist `supervised`-tüüpi manustatud teenuseks (paigaldatav/käivitatav
asukohast `/api/services/bifrost/`) jälgitakse
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); kuni see liidetakse,
on Bifrost ainult `external` (ligipääsetav üksnes `BIFROST_BASE_URL`-i kaudu).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) võimaldab kutsujatel
filtreerida selle järgi, mida mootor tegelikult teha suudab, selle asemel et
iga identifikaatori jaoks harusid jäigalt koodi kirjutada.

## Telg A — manustatud teenused (järelevalvatava protsessi pool)

- **Järelevalvatavate protsesside register:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (praegu: `9router`, `cliproxy`).
- **Elutsükli haldur:** `src/lib/services/ServiceSupervisor.ts` — `start()` käivitab
  alamprotsessi, ootab `waitForHealthy()` kontrolli läbimist ja suunab stdout/stderr-i ringpuhvrisse;
  `stop()` SIGTERM→SIGKILL; kõik toimingud jadastatakse luku abil.
- **Olekute ühendtüüp** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, lisaks
  ortogonaalne `HealthState = healthy | unhealthy | unknown`.
- **Miks eraldi protsess (mitte protsessisisene SDK)?** Protsesside isoleerimine võimaldab
  iga külgproksi installimist, käivitamist, peatamist, seisundikontrolli ja logisid eraldi hallata ning
  rakendada tagasisideaadressilt käivitamise kaitset. Protsessisisese adapteri modelleerimine on tulevikutöö —
  selle väljendamiseks on võimekuslipp `native-hot-path`.

### Elutsükli marsruudi leping (`/api/services/<tool>/…`)

Olekukoodid on **oleku-, verbi- ja teepõhised taotluslikult** — see on leping, mitte
ebajärjekindlus:

| Kutse                        | Tingimus                                               | Olek                                 |
| ---------------------------- | ------------------------------------------------------ | ------------------------------------ |
| `POST .../start`             | teenus on `not_installed`                              | **409** (eeltingimus)                |
| `POST .../stop`              | juba peatatud                                          | **200** (idempotentne tühitoiming)   |
| `GET .../status`             | korras                                                 | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | käivitamise nurjumine                                  | **503** (ajutine)                    |
| `GET .../status`, `.../stop` | püüdmata viga                                          | **500**                              |
| `GET /api/services/<x>/logs` | tundmatu tööriist `<x>`                                | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | `X-Reveal-Confirm: yes` puudub                         | **403** (ainult 9router)             |
| **iga** `/api/services/*`    | kutsuja pole tagasisideaadressil ega privaatses LAN-is | **403 LOCAL_ONLY**                   |

Kõik veakehad vormindab `createErrorResponse()` →
`{ error: { message, type }, requestId }`, kus `type` tuletatakse olekukoodist
(`500→server_error`, `404→not_found`, `409→conflict`, muul juhul `invalid_request`) ja see on
masintöödeldav eristaja. Sõnumid eelpuhastatakse
(`sanitizeErrorMessage()`, range reegel nr 12).

**Tagasisideaadressi kaitse** on kõige tavalisem `403` põhjus: `/api/services/` kuulub
loendisse `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) ning
`src/server/authz/policies/management.ts` lükkab iga tagasisideaadressilt või privaatsest LAN-ist
mitte pärineva kutsuja tagasi **enne autentimist**, sest need marsruudid käivitavad alamprotsesse (ranged reeglid 15
ja 17). Nende poole pöördumine avaliku tunneli kaudu annab taotluslikult vastuseks `403`.

## Telg B — releemarsruutimise taustsüsteem (suunamise pool)

Ainult releeproksi tee `/api/v1/relay/chat/completions` valib suunamise
taustsüsteemi; peamine `/api/v1/chat/completions` liides ei kasuta kunagi faili
`routingBackend.ts`.

- **Valik** (`resolveRelayRoutingBackend`): üks globaalne keskkonnalüliti —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Kui see on määramata, kasutatakse väärtust `auto`, kui Bifrost on konfigureeritud ja lubatud; vastasel juhul `ts`.
- **Käitumine:**
  - `bifrost` (sunnitud): Bifrosti nurjumine → kohene `502`, varuvarianti ei kasutata.
  - `auto`: proovitakse Bifrosti; nurjumise või ooteaja korral minnakse vaikselt üle omalahendusele.
  - `ts` / pärast varuvariandile üleminekut: omalahenduse `open-sse` teisendaja/täituri konveier.
- **Ooteaeg:** `baseUrl`-i põhine nurjumisjärgne ooteaeg failis `bifrostCooldown.ts`.

Valik on praegu relee tasandil **kõik-või-mitte-midagi** — versioonis `release/v3.8.43`
ei saa mootorit teenusepakkuja- ega päringupõhiselt vahetada. Päringupõhine päästik lisatakse
külgproksi manifesti töö raames
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
mis võimaldab režiimil `auto` suunata Bifrosti kaudu ainult manifesti järgi sobivad teenusepakkujad.

## Töölaua integratsioon

Teenuste töölaud pollib iga 5 sekundi järel lõpp-punkti `GET /api/services/<tool>/status` faili
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts` kaudu,
tagastades `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Ühist saadavuskonteksti pakkujat ei ole —
iga komponent kutsub konksu iga tööriista jaoks eraldi. Tingimuse `!res.ok` korral kuvab konks praegu
pelgalt `HTTP <status>`; välja `error.type` sidumine inimloetava selgitusega on
jälgitav kasutajakogemuse parendus, mitte lepingu muudatus.

## Tagajärjed

- Uued mootorid registreeritakse üks kord loendis `ROUTER_BACKENDS`; tarbijad saavad need kättesaadavaks võimekuste
  päringute kaudu, ilma uute identifikaatoripõhiste harudeta.
- Küsimusele „Kas see on teenus või marsruutimise taustsüsteem?” vastab väli `lifecycle`, mitte
  see, millises loendis identifikaator juhtumisi esineb.
- Bifrosti järelevalve (#5817) ja jõudluskriitilise tee migreerimine omakoodi lahendusele (#5670) tuginevad sellele
  ühisele lepingule, selle asemel et iga külgprotsessi eraldi käsitleda.
