# Router Backends & Embedded Services — architecture contract (ADR) (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Status:** Prihvaćeno · **Kontekst:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Ugovor:** `domain/routing/routerBackends.ts`
> (tipizirani registar — kod stiže s [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Ovaj ADR precizno definira međusobni odnos između mehanizama `ts` (izvorni), `bifrost`, `cliproxy`, `9router` i mehanizama kompatibilnih s VibeProxyjem kako bi suradnici prestali poistovjećivati dvije arhitektonski različite stvari. Dokumentira tipizirani registar uveden radom na registru pozadinskih sustava usmjerivača kao jedini izvor istine za taj model.

## Ključna razlika — dvije ortogonalne osi

Uloga mehanizma opisana je pomoću **dviju neovisnih osi**, koje su zajedno kodirane u definiciji registra `RouterBackendDefinition`:

1. **Životni ciklus** (`RouterBackendLifecycle`) — _kako se mehanizam izvršava_:
   - `in-process` — izvršava se unutar OmniRouteova Node procesa (izvorni TS protočni sustav).
   - `supervised` — lokalni podređeni proces koji OmniRoute instalira/pokreće/zaustavlja/provjerava mu stanje putem `ServiceSupervisor`, a zatim ga koristi kao vezu s pružateljem.
   - `external` — HTTP krajnja točka kojoj OmniRoute prosljeđuje zahtjeve, ali njome **ne** upravlja (konfigurirana putem osnovnog URL-a iz varijable okruženja).
   - `disabled` — registriran, ali nije dostupan za odabir.
2. **Os odabira** (pozadinski sustav usmjeravanja releja) — _prosljeđuje li relej zahtjeve tom mehanizmu_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` u
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Pogreška koju treba izbjeći: tretiranje „ugrađene usluge” i „pozadinskog sustava usmjeravanja” kao jednog popisa. To nisu ista stvar. Mehanizam s životnim ciklusom `supervised` (9router/cliproxy) jest **veza s pružateljem koju koristi izvorni protočni sustav**, a ne alternativni pozadinski sustav za prosljeđivanje zahtjeva releja. `bifrost` je suprotan slučaj — pozadinski sustav za prosljeđivanje zahtjeva releja koji je (povijesno) bio isključivo `external`.

## Registar — jedini izvor istine

Ugovor `domain/routing/routerBackends.ts` (kod stiže s
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) deklarira svaki mehanizam samo jednom, zajedno s njegovim životnim ciklusom, mogućnostima, identitetom usluge, zadanim priključkom, konfiguracijom provjere stanja i podrškom za telemetriju. Potrošači dohvaćaju mehanizme putem `getRouterBackend(id)`, `listRouterBackends()` i `listRouterBackendsByCapability(cap)` umjesto da za svaki popratni proces uvode posebne slučajeve.

| Pozadinski sustav | Životni ciklus | Usluga (os A) | Pozadinski sustav releja (os B) | Provjera stanja | Zadani priključak |
| ----------------- | -------------- | ------------- | ------------------------------- | --------------- | ----------------- |
| `ts`              | `in-process`   | —             | `ts` (izvorni)                  | —               | —                 |
| `bifrost`         | `external`¹    | —¹            | `bifrost` / `auto`              | `/health`       | —                 |
| `cliproxy`        | `supervised`   | `cliproxy`    | — (pružatelj)                   | `/v1/models`    | 8317              |
| `9router`         | `supervised`   | `9router`     | — (pružatelj)                   | `/api/health`   | 20130             |
| `vibeproxy`       | `external`     | —             | — (prilagodnik pružatelja)      | `/v1/models`    | —                 |

¹ Promicanje Bifrosta u ugrađenu uslugu s životnim ciklusom `supervised` (koju je moguće instalirati/pokrenuti putem `/api/services/bifrost/`) prati se u
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); dok se ne spoji,
Bifrost je isključivo `external` (dostupan samo putem `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) omogućuju pozivateljima filtriranje prema onome što mehanizam doista može učiniti, umjesto tvrdog kodiranja grana za svaki pojedini identifikator.

## Os A — ugrađene usluge (strana nadziranog procesa)

- **Registar nadziranih procesa:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (trenutačno: `9router`, `cliproxy`).
- **Vlasnik životnog ciklusa:** `src/lib/services/ServiceSupervisor.ts` — `start()` pokreće
  podređeni proces, čeka prolazak provjere `waitForHealthy()`, preusmjerava stdout/stderr u kružni međuspremnik;
  `stop()` šalje SIGTERM→SIGKILL; sve je serijalizirano pod zaključavanjem.
- **Unija stanja** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, uz
  ortogonalni `HealthState = healthy | unhealthy | unknown`.
- **Zašto zaseban proces (a ne SDK unutar procesa)?** Izolacija procesa omogućuje
  neovisno upravljanje instalacijom/pokretanjem/zaustavljanjem/zdravljem/zapisnicima za svaki pomoćni proces te omogućuje
  primjenu zaštite pokretanja preko povratne petlje. Modeliranje prilagodnika unutar procesa budući je zadatak —
  zastavica mogućnosti `native-hot-path` mjesto je na kojem bi se to izrazilo.

### Ugovor ruta životnog ciklusa (`/api/services/<tool>/…`)

Statusni kodovi **namjerno ovise o stanju/glagolu/putanji** — to je ugovor, a ne
nedosljednost:

| Poziv                           | Uvjet                                               | Status                                  |
| ------------------------------- | --------------------------------------------------- | --------------------------------------- |
| `POST .../start`                | usluga je `not_installed`                           | **409** (preduvjet)                     |
| `POST .../stop`                 | već zaustavljena                                    | **200** (idempotentna prazna operacija) |
| `GET .../status`                | U redu                                              | **200** (`live ?? row ?? "unknown"`)    |
| `POST .../start`                | neuspješno pokretanje procesa                       | **503** (prolazna pogreška)             |
| `GET .../status`, `.../stop`    | neuhvaćena pogreška                                 | **500**                                 |
| `GET /api/services/<x>/logs`    | nepoznat alat `<x>`                                 | **404** `Service '<x>' not found`       |
| `GET .../status?reveal=key`     | nedostaje `X-Reveal-Confirm: yes`                   | **403** (samo 9router)                  |
| **bilo koji** `/api/services/*` | pozivatelj nije na povratnoj petlji/privatnom LAN-u | **403 LOCAL_ONLY**                      |

Sva tijela pogrešaka oblikuje `createErrorResponse()` →
`{ error: { message, type }, requestId }`, pri čemu se `type` izvodi iz statusa
(`500→server_error`, `404→not_found`, `409→conflict`, inače `invalid_request`) i predstavlja
strojno obradivi razlikovni element. Poruke su unaprijed pročišćene
(`sanitizeErrorMessage()`, Strogo pravilo br. 12).

**Zaštita povratne petlje** najčešći je izvor odgovora `403`: `/api/services/` nalazi se u
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`), a
`src/server/authz/policies/management.ts` odbija svakog pozivatelja koji nije na povratnoj petlji / privatnom LAN-u
**prije autentikacije**, jer te rute pokreću podređene procese (Stroga pravila 15
i 17). Pristup putem javnog tunela namjerno rezultira statusom `403`.

## Os B — pozadinski sustav usmjeravanja releja (strana otpreme)

Samo putanja relejnog proxyja `/api/v1/relay/chat/completions` odabire pozadinski sustav
otpreme; glavna površina `/api/v1/chat/completions` nikada ne koristi
`routingBackend.ts`.

- **Odabir** (`resolveRelayRoutingBackend`): jedna globalna sklopka okruženja —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Ako nije postavljena, vrijednost je `auto` kada je Bifrost konfiguriran i omogućen, a inače `ts`.
- **Ponašanje:**
  - `bifrost` (prisilno): neuspjeh Bifrosta → konačni `502`, bez pričuvnog rješenja.
  - `auto`: pokušava Bifrost, a u slučaju neuspjeha/razdoblja hlađenja neprimjetno prelazi na nativni sustav.
  - `ts` / nakon prijelaza na pričuvno rješenje: nativni cjevovod prevoditelja/izvršitelja `open-sse`.
- **Razdoblje hlađenja:** razdoblje hlađenja nakon neuspjeha za svaki `baseUrl` u `bifrostCooldown.ts`.

Odabir je **trenutačno sve-ili-ništa na razini releja** — u izdanju `release/v3.8.43`
ne postoji promjena mehanizma po pružatelju ni po zahtjevu. Kontrola po zahtjevu dodaje se
u sklopu rada na manifestu pomoćnog procesa
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
što omogućuje da `auto` kroz Bifrost usmjerava samo pružatelje koji ispunjavaju uvjete manifesta.

## Integracija nadzorne ploče

Nadzorna ploča usluga svakih 5 s šalje upit `GET /api/services/<tool>/status` putem
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
koji vraća `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Ne postoji zajednički pružatelj konteksta dostupnosti —
svaka komponenta poziva hook za pojedini alat. Pri `!res.ok` hook trenutačno prikazuje
samo `HTTP <status>`; mapiranje polja `error.type` na razumljivo objašnjenje
evidentirano je kao poboljšanje korisničkog iskustva, a ne kao promjena ugovora.

## Posljedice

- Novi mehanizmi registriraju se jednom u `ROUTER_BACKENDS`; potrošači ih dobivaju putem upita
  o mogućnostima bez novih grananja za svaki ID.
- Odgovor na pitanje „Je li ovo usluga ili pozadinski sustav za usmjeravanje?” daje polje `lifecycle`, a ne
  popis na kojem se neki ID slučajno nalazi.
- Nadzor Bifrosta (#5817) i izvorna migracija kritične putanje (#5670) nadograđuju se na ovaj
  zajednički ugovor umjesto da zasebno obrađuju svaki pomoćni proces.
