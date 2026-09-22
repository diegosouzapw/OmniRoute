# Router Backends & Embedded Services — architecture contract (ADR) (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

# Pozadinski programi usmjerivača (Router Backends) i ugrađene usluge — arhitektonski ugovor (ADR)

> **Status:** Prihvaćeno · **Kontekst:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Ugovor:** `domain/routing/routerBackends.ts`
> (tipizirani registar — kod stiže sa [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Ovaj ADR definiše kako su `ts` (izvorni), `bifrost`, `cliproxy`, `9router` i VibeProxy-kompatibilni mehanizmi (engines) povezani jedni s drugima, kako bi saradnici prestali miješati dvije stvari koje su arhitektonski različite. On dokumentuje tipizirani registar uveden radom na router-backend-registry kao jedini izvor istine za taj model.

## Osnovna razlika — dvije ortogonalne ose

Uloga mehanizma (engine) opisana je **dvjema nezavisnim osama**, kodiranim zajedno u `RouterBackendDefinition` registra:

1. **Životni ciklus** (`RouterBackendLifecycle`) — _kako mehanizam radi_:
   - `in-process` — radi unutar OmniRoute Node procesa (izvorni TS cjevovod).
   - `supervised` — lokalni podređeni proces koji OmniRoute instalira/pokreće/zaustavlja/provjerava ispravnost putem `ServiceSupervisor`-a, a zatim ga koristi kao vezu provajdera.
   - `external` — HTTP krajnja tačka (endpoint) na koju OmniRoute šalje zahtjeve, ali kojom **ne** upravlja (konfigurisano putem env base URL-a).
   - `disabled` — registrovan, ali nije moguće odabrati.
2. **Osa odabira** (relay routing backend) — _da li relay šalje zahtjeve na njega_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` u
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Greška koju treba izbjegavati: tretiranje "ugrađene usluge" (embedded service) i "pozadinskog programa usmjerivača" (routing backend) kao jedne liste. Oni to nisu. `supervised` mehanizam (9router/cliproxy) je **veza provajdera koju koristi izvorni cjevovod**, a ne alternativni relay dispatch backend. `bifrost` je suprotno — relay dispatch backend koji je (istorijski) bio samo `external`.

## Registar — jedini izvor istine

Ugovor `domain/routing/routerBackends.ts` (kod stiže sa
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) deklariše svaki mehanizam jednom, sa njegovim životnim ciklusom, mogućnostima, identitetom usluge, podrazumijevanim portom, konfiguracijom ispravnosti i podrškom za telemetriju. Potrošači traže mehanizme putem `getRouterBackend(id)`,
`listRouterBackends()` i `listRouterBackendsByCapability(cap)` umjesto da posebno tretiraju svaki sidecar.

| Backend     | Životni ciklus | Usluga (osa A) | Relay backend (osa B)  | Ispravnost    | Podrazumijevani port |
| ----------- | -------------- | -------------- | ---------------------- | ------------- | -------------------- |
| `ts`        | `in-process`   | —              | `ts` (izvorni)         | —             | —                    |
| `bifrost`   | `external`¹    | —¹             | `bifrost` / `auto`     | `/health`     | —                    |
| `cliproxy`  | `supervised`   | `cliproxy`     | — (provajder)          | `/v1/models`  | 8317                 |
| `9router`   | `supervised`   | `9router`      | — (provajder)          | `/api/health` | 20130                |
| `vibeproxy` | `external`     | —              | — (adapter provajdera) | `/v1/models`  | —                    |

¹ Promocija Bifrosta u `supervised` ugrađenu uslugu (koja se može instalirati/pokrenuti sa `/api/services/bifrost/`) se prati u
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); dok se ne spoji, Bifrost je samo `external` (dostupan isključivo putem `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`, `oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) omogućavaju pozivaocima da filtriraju prema onome što mehanizam zaista može da uradi, umjesto hardkodiranja grana po ID-u.

## Osa A — ugrađeni servisi (strana nadziranog procesa)

- **Registar nadziranih procesa:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (danas: `9router`, `cliproxy`).
- **Vlasnik životnog ciklusa:** `src/lib/services/ServiceSupervisor.ts` — `start()` pokreće dijete, čeka na `waitForHealthy()`, preusmjerava stdout/stderr u kružni bafer; `stop()` SIGTERM→SIGKILL; sve serijalizirano pod zaključavanjem.
- **Unija stanja** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, plus ortogonalno `HealthState = healthy | unhealthy | unknown`.
- **Zašto poseban proces (a ne in-proc SDK)?** Izolacija procesa je ono što čini instalaciju/pokretanje/zaustavljanje/zdravlje/logove nezavisno kontrolisanim po sidecaru i omogućava primjenu loopback spawn-guard-a. Modeliranje in-proc adaptera je budući rad — `native-hot-path` oznaka mogućnosti je mjesto gdje bi se to izrazilo.

### Ugovor rute životnog ciklusa (`/api/services/<tool>/…`)

Statusni kodovi su **specifični za stanje/glagol/putanju po dizajnu** — ovo je ugovor, a ne nedosljednost:

| Poziv                           | Uslov                                | Status                                      |
| ------------------------------- | ------------------------------------ | ------------------------------------------- |
| `POST .../start`                | servis `not_installed`               | **409** (preduslov)                         |
| `POST .../stop`                 | već zaustavljen                      | **200** (idempotentna operacija bez efekta) |
| `GET .../status`                | OK                                   | **200** (`live ?? row ?? "unknown"`)        |
| `POST .../start`                | neuspjeh pokretanja                  | **503** (prolazno)                          |
| `GET .../status`, `.../stop`    | neuhvaćena greška                    | **500**                                     |
| `GET /api/services/<x>/logs`    | nepoznat alat `<x>`                  | **404** `Service '<x>' not found`           |
| `GET .../status?reveal=key`     | nedostaje `X-Reveal-Confirm: yes`    | **403** (samo 9router)                      |
| **bilo koji** `/api/services/*` | pozivalac nije loopback/privatni-LAN | **403 LOCAL_ONLY**                          |

Sva tijela grešaka su oblikovana pomoću `createErrorResponse()` →
`{ error: { message, type }, requestId }`, gdje se `type` izvodi iz statusa
(`500→server_error`, `404→not_found`, `409→conflict`, inače `invalid_request`) i predstavlja mašinski čitljiv diskriminator. Poruke su unaprijed sanitizirane
(`sanitizeErrorMessage()`, Hard Rule #12).

**Loopback zaštita** je najčešći izvor `403` greške: `/api/services/` se nalazi u
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) i
`src/server/authz/policies/management.ts` odbija svakog pozivaoca koji nije loopback / privatni-LAN **prije autorizacije**, jer ove rute pokreću podprocese (Hard Rules 15 i 17). Pristupanje njima kroz javni tunel je `403` po dizajnu.

## Osa B — pozadinski sistem za rutiranje releja (strana otpremanja)

Samo putanja relay proxy-ja `/api/v1/relay/chat/completions` bira pozadinski sistem za otpremanje; glavna površina `/api/v1/chat/completions` nikada ne konsultuje `routingBackend.ts`.

- **Izbor** (`resolveRelayRoutingBackend`): jedan globalni env prekidač —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Ako nije postavljen, `auto` kada je Bifrost konfigurisan+omogućen, inače `ts`.
- **Ponašanje:**
  - `bifrost` (forsirano): Bifrost neuspjeh → hard `502`, bez povratka na alternativu.
  - `auto`: pokušaj Bifrost, u slučaju neuspjeha/hlađenja tiho pređi na izvorni (native).
  - `ts` / nakon povratka: izvorni `open-sse` prevodilac/izvršni cjevovod.
- **Hlađenje (Cooldown):** hlađenje neuspjeha po `baseUrl` u `bifrostCooldown.ts`.

Izbor je **danas sve-ili-ništa na nivou releja** — ne postoji zamjena mehanizma po provajderu ili po zahtjevu u `release/v3.8.43`. Kapija po zahtjevu se dodaje kroz rad na sidecar-manifestu
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
što omogućava `auto` rutiranje samo provajdera koji ispunjavaju uslove manifesta kroz Bifrost.

## Integracija dashboarda

Dashboard servisa šalje upite na `GET /api/services/<tool>/status` svakih 5s putem `src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`, vraćajući `{ tool, state, pid, port, health, installedVersion, latestVersion, updateAvailable, autoStart, … }`. Ne postoji zajednički provider za kontekst dostupnosti — svaka komponenta poziva hook za svaki alat. U slučaju `!res.ok`, hook trenutno prikazuje samo `HTTP <status>`; mapiranje polja `error.type` u objašnjenje razumljivo ljudima je praćeno poboljšanje UX-a, a ne promjena ugovora.

## Posljedice

- Novi mehanizmi se registruju jednom u `ROUTER_BACKENDS`; potrošači ih dobijaju putem upita o mogućnostima bez novih grana po ID-u.
- Na pitanje „Da li je ovo servis ili routing backend?“ odgovara se poljem `lifecycle`, a ne time u kojoj se listi ID slučajno pojavljuje.
- Bifrost nadzor (#5817) i migracija native hot-path-a (#5670) se oslanjaju na ovaj zajednički ugovor umjesto posebnog tretiranja svakog sidecar-a.
