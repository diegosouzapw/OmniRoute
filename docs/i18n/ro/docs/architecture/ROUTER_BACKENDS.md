# Router Backends & Embedded Services — architecture contract (ADR) (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Stare:** Acceptată · **Context:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Contract:** `domain/routing/routerBackends.ts`
> (registru tipizat — codul este livrat odată cu [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Acest ADR stabilește modul în care motoarele `ts` (nativ), `bifrost`, `cliproxy`, `9router` și
cele compatibile cu VibeProxy se raportează unele la altele, astfel încât contribuitorii să nu mai
confunde două concepte distincte din punct de vedere arhitectural. Documentează registrul tipizat
introdus prin lucrările aferente registrului backendurilor de rutare ca sursă unică de
adevăr pentru acest model.

## Distincția fundamentală — două axe ortogonale

Rolul unui motor este descris prin **două axe independente**, codificate împreună în
`RouterBackendDefinition` din registru:

1. **Ciclul de viață** (`RouterBackendLifecycle`) — _modul în care rulează motorul_:
   - `in-process` — rulează în cadrul procesului Node al OmniRoute (fluxul nativ TS).
   - `supervised` — un proces-copil local pe care OmniRoute îl instalează/pornește/oprește/îi verifică starea
     prin `ServiceSupervisor`, apoi îl utilizează drept conexiune la furnizor.
   - `external` — un endpoint HTTP către care OmniRoute trimite cereri, dar pe care **nu** îl gestionează
     (configurat printr-un URL de bază din variabilele de mediu).
   - `disabled` — înregistrat, dar nu poate fi selectat.
2. **Axa de selecție** (backendul de rutare al releului) — _dacă releul trimite cereri către acesta_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` în
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Greșeala care trebuie evitată: tratarea „serviciului încorporat” și a „backendului de rutare” ca fiind o singură
listă. Nu sunt același lucru. Un motor `supervised` (9router/cliproxy) este o **conexiune
la furnizor utilizată de fluxul nativ**, nu un backend alternativ pentru trimiterea cererilor prin releu.
`bifrost` este opusul — un backend pentru trimiterea cererilor prin releu care (istoric)
era exclusiv `external`.

## Registrul — sursa unică de adevăr

Contractul `domain/routing/routerBackends.ts` (codul este livrat odată cu
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) declară fiecare motor o singură dată, împreună cu
ciclul său de viață, capabilitățile, identitatea serviciului, portul implicit, configurația
stării de sănătate și suportul pentru telemetrie. Consumatorii caută motoarele prin `getRouterBackend(id)`,
`listRouterBackends()` și `listRouterBackendsByCapability(cap)`, în loc să
trateze separat fiecare serviciu auxiliar.

| Backend     | Ciclu de viață | Serviciu (axa A) | Backend de releu (axa B) | Stare de sănătate | Port implicit |
| ----------- | -------------- | ---------------- | ------------------------ | ----------------- | ------------- |
| `ts`        | `in-process`   | —                | `ts` (nativ)             | —                 | —             |
| `bifrost`   | `external`¹    | —¹               | `bifrost` / `auto`       | `/health`         | —             |
| `cliproxy`  | `supervised`   | `cliproxy`       | — (furnizor)             | `/v1/models`      | 8317          |
| `9router`   | `supervised`   | `9router`        | — (furnizor)             | `/api/health`     | 20130         |
| `vibeproxy` | `external`     | —                | — (adaptor de furnizor)  | `/v1/models`      | —             |

¹ Promovarea Bifrost la statutul de serviciu încorporat `supervised` (care poate fi instalat/pornit
din `/api/services/bifrost/`) este urmărită în
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); până la integrarea acesteia,
Bifrost rămâne exclusiv `external` (accesibil numai prin `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) le permit apelanților
să filtreze în funcție de ceea ce poate face efectiv un motor, în loc să codifice explicit ramificații pentru fiecare id.

## Axa A — servicii încorporate (partea proceselor supervizate)

- **Registrul proceselor supervizate:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (în prezent: `9router`, `cliproxy`).
- **Responsabilul ciclului de viață:** `src/lib/services/ServiceSupervisor.ts` — `start()` pornește
  procesul copil, așteaptă confirmarea de la `waitForHealthy()`, captează stdout/stderr într-un buffer circular;
  `stop()` SIGTERM→SIGKILL; toate operațiile sunt serializate printr-un lock.
- **Uniunea de stări** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, plus un
  `HealthState = healthy | unhealthy | unknown` ortogonal.
- **De ce un proces separat (și nu un SDK în același proces)?** Izolarea proceselor este cea care permite
  controlul independent al instalării/pornirii/opririi/stării de sănătate/jurnalelor pentru fiecare sidecar și permite
  aplicarea protecției de pornire prin loopback. Modelarea unui adaptor în același proces este o activitate viitoare —
  indicatorul de capabilitate `native-hot-path` este locul în care ar fi exprimat acest lucru.

### Contractul rutelor ciclului de viață (`/api/services/<tool>/…`)

Codurile de stare sunt **specifice stării/verbului/căii în mod intenționat** — acesta este contractul, nu
o inconsecvență:

| Apel                         | Condiție                                  | Stare                                |
| ---------------------------- | ----------------------------------------- | ------------------------------------ |
| `POST .../start`             | serviciul este `not_installed`            | **409** (precondiție)                |
| `POST .../stop`              | deja oprit                                | **200** (operație nulă idempotentă)  |
| `GET .../status`             | OK                                        | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | eșec la pornirea procesului               | **503** (tranzitoriu)                |
| `GET .../status`, `.../stop` | eroare neprinsă                           | **500**                              |
| `GET /api/services/<x>/logs` | instrument necunoscut `<x>`               | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | lipsește `X-Reveal-Confirm: yes`          | **403** (doar 9router)               |
| **orice** `/api/services/*`  | apelantul nu este din loopback/LAN privat | **403 LOCAL_ONLY**                   |

Toate corpurile de eroare sunt structurate de `createErrorResponse()` →
`{ error: { message, type }, requestId }`, unde `type` este derivat din starea
(`500→server_error`, `404→not_found`, `409→conflict`, altfel `invalid_request`) și este
discriminatorul acționabil programatic. Mesajele sunt pre-sanitizate
(`sanitizeErrorMessage()`, Regula strictă #12).

**Protecția loopback** este cea mai frecventă sursă a unui `403`: `/api/services/` se află în
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`), iar
`src/server/authz/policies/management.ts` respinge orice apelant care nu provine din loopback / LAN privat
**înainte de autentificare**, deoarece aceste rute pornesc procese copil (Regulile stricte 15
și 17). Accesarea lor printr-un tunel public returnează `403` în mod intenționat.

## Axa B — backendul de rutare al releului (partea de expediere)

Doar calea proxy a releului `/api/v1/relay/chat/completions` selectează un backend
de expediere; suprafața principală `/api/v1/chat/completions` nu consultă niciodată
`routingBackend.ts`.

- **Selecție** (`resolveRelayRoutingBackend`): un singur comutator global de mediu —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Dacă nu este setat, se folosește `auto` când Bifrost este configurat+activat, altfel `ts`.
- **Comportament:**
  - `bifrost` (forțat): eșec Bifrost → eroare fermă `502`, fără fallback.
  - `auto`: încearcă Bifrost, iar în caz de eșec/perioadă de cooldown continuă în mod silențios cu implementarea nativă.
  - `ts` / după fallback: pipeline-ul nativ de traducere/execuție `open-sse`.
- **Cooldown:** perioadă de cooldown per `baseUrl` după eșec, în `bifrostCooldown.ts`.

În prezent, selecția este **totul-sau-nimic la nivelul releului** — nu există schimbare de motor per furnizor
sau per cerere în `release/v3.8.43`. Mecanismul de control per cerere este adăugat
prin lucrările la manifestul sidecar
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
ceea ce permite modului `auto` să direcționeze prin Bifrost doar furnizorii eligibili conform manifestului.

## Integrarea cu tabloul de bord

Tabloul de bord al serviciilor interoghează `GET /api/services/<tool>/status` la fiecare 5s prin
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
returnând `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Nu există niciun furnizor comun de context pentru disponibilitate —
fiecare componentă apelează hook-ul pentru fiecare instrument. În cazul `!res.ok`, hook-ul afișează în prezent
doar `HTTP <status>`; asocierea câmpului `error.type` cu o explicație ușor de înțeles
este o îmbunătățire UX planificată, nu o modificare a contractului.

## Consecințe

- Motoarele noi se înregistrează o singură dată în `ROUTER_BACKENDS`; consumatorii le obțin prin interogări
  de capabilități, fără ramuri noi specifice fiecărui id.
- Răspunsul la întrebarea „Este acesta un serviciu sau un backend de rutare?” este dat de câmpul `lifecycle`, nu
  de lista în care se întâmplă să apară un id.
- Supervizarea Bifrost (#5817) și migrarea nativă a căii critice (#5670) se bazează pe acest
  contract comun, în loc să trateze separat fiecare sidecar.
