# Plugin Marketplace (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Autoritativ kilde:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` og
> `src/app/(dashboard)/dashboard/plugins/`
> **Sist oppdatert:** 2026-06-28 — v3.8.40

OmniRoute leveres med et programtilleggssystem i WordPress-stil. Programtillegg er selvstendige
kataloger — hver med et `plugin.json`-manifest og en inngangsfil — som kobler seg
til forespørselsflyten (`onRequest` / `onResponse` / `onError`) og til
livssyklushendelser (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Markedsplassen for programtillegg** er oppdagelseslaget oppå dette systemet. Den
tilbyr en katalog over programtillegg som kan installeres. Som standard er katalogen et
lite, innebygd startregister. En operatør kan konfigurere den til å bruke URL-en til et egendefinert
eksternt register. I så fall sikres hentingen av et DNS-oppløsende SSRF-vern
(se [Sikkerhet](#security)).

Alle ruter for programtillegg er **kun tilgjengelige via loopback** (nivå 1 — `LOCAL_ONLY`): Programtillegg laster inn
og kjører kode i underprosesser, så rutene er utilgjengelige fra en
opprinnelse som ikke er loopback, uavhengig av autentisering. Se
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Slik henger det sammen

```
Kontrollpanel (/dashboard/plugins)
  ├─ Fanen "Installert"  → GET /api/plugins            (listPlugins)
  │                        POST /api/plugins/scan      (pluginManager.scan)
  │                        POST /api/plugins/{name}/activate|deactivate
  │                        DELETE /api/plugins/{name}   (avinstaller)
  └─ Fanen "Markedsplass" → GET /api/plugins/marketplace
                             → listMarketplacePlugins()
                               ├─ ingen egendefinert URL → innebygd SEED_REGISTRY
                               └─ egendefinert URL → isSafeMarketplaceUrl() SSRF-vern
                                                   → safeOutboundFetch(guard:"public-only")
```

- **Registerlag** — `src/lib/plugins/marketplace.ts`: viser / søker i
  katalogen og faller tilbake til startregisteret ved enhver feil.
- **Livssykluslag** — `src/lib/plugins/manager.ts` (`pluginManager`-singleton):
  installer, oppgrader, aktiver, deaktiver, avinstaller, skann og last inn ved oppstart.
- **Manifestlag** — `src/lib/plugins/manifest.ts`: Zod-skjema + standardverdier for
  `plugin.json`.
- **Skanner** — `src/lib/plugins/scanner.ts`: finner programtillegg på disken under
  programtilleggskatalogen.
- **Laster** — `src/lib/plugins/loader.ts`: starter hvert programtillegg i en isolert
  underprosess og formidler hook-kall via IPC.

## Markedsplasskatalog

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) returnerer en liste med
`MarketplaceEntry`-objekter:

| Felt          | Type     | Merknader                                  |
| ------------- | -------- | ------------------------------------------ |
| `name`        | string   | Programtilleggsnavn i kebab-case           |
| `version`     | string   | semver                                     |
| `description` | string   | Kort sammendrag                            |
| `author`      | string   | Forfatter / organisasjon                   |
| `license`     | string   | Lisens-ID i SPDX-stil                      |
| `downloadUrl` | string   | URL for nedlasting av kilde (kan være tom) |
| `repository`  | string?  | Valgfri URL til kodelager                  |
| `tags`        | string[] | Tagger for søk/filtrering                  |
| `downloads`   | number   | Antall nedlastinger                        |
| `rating`      | number   | 0–5                                        |
| `verified`    | boolean  | Om oppføringen er merket som verifisert    |
| `lastUpdated` | string   | ISO-lignende datostreng                    |

Når ingen egendefinert register-URL er konfigurert, er katalogen den innebygde
`SEED_REGISTRY` (for øyeblikket `request-logger`, `rate-limiter`, `cost-tracker` og
`theme-manager`). Startregisteret er alltid tilgjengelig — hvis et konfigurert eksternt
register ikke kan nås, returnerer en annen status enn `200` eller returnerer et ukjent
innhold, logger `listMarketplacePlugins()` en advarsel og faller tilbake til startlisten.

> Merk: Markedsplassens **katalog** (bla gjennom/søk) er koblet opp fra ende til ende, men
> ettklikks-**installasjon** fra markedsplasskatalogen er ennå ikke implementert —
> «Installer»-knappen for en markedsplassoppføring i kontrollpanelet viser for øyeblikket et
> «kommer snart»-varsel. Installasjon utføres i dag gjennom installasjonsflyten fra en lokal bane
> (`POST /api/plugins`) og søk etter programtillegg på disken (`POST /api/plugins/scan`).

## REST-API

Alle endepunkter krever administrasjonsautentisering (`requireManagementAuth`) **og** er
kun tilgjengelige via loopback — `/api/plugins` og `/api/plugins/` er oppført i
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Endepunkt                        | Metode | Beskrivelse                                                     |
| -------------------------------- | ------ | --------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Vis installerte programtillegg (valgfritt `?status=`-filter)    |
| `/api/plugins`                   | POST   | Installer et programtillegg fra en absolutt lokal bane          |
| `/api/plugins/scan`              | POST   | Skann programtilleggskatalogen og registrer nye programtillegg  |
| `/api/plugins/marketplace`       | GET    | Vis katalogoppføringer fra markedsplassen                       |
| `/api/plugins/[name]`            | GET    | Hent detaljer om et installert programtillegg                   |
| `/api/plugins/[name]`            | DELETE | Avinstaller et programtillegg                                   |
| `/api/plugins/[name]/activate`   | POST   | Aktiver (last inn + registrer hooks)                            |
| `/api/plugins/[name]/deactivate` | POST   | Deaktiver (utløs `onDeactivate`, avregistrer hooks)             |
| `/api/plugins/[name]/config`     | GET    | Hent programtilleggskonfigurasjon + konfigurasjonsskjema        |
| `/api/plugins/[name]/config`     | PUT    | Oppdater programtilleggskonfigurasjonen (validert mot skjemaet) |

`status`-filteret for `GET /api/plugins` godtar én av
`installed` / `active` / `inactive` / `error`. En ugyldig verdi returnerer `400`.

### Vis installerte programtillegg

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Installer fra en lokal bane

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` må være **absolutt** og kan ikke inneholde `..`-traverseringssegmenter eller
nullbyte (håndheves av Zod). Kildekatalogen må inneholde en gyldig
`plugin.json` (eller være en overordnet katalog til en slik fil). Ved suksess er responsen `201` med
raden for det installerte programtillegget.

### Bla gjennom markedsplassen

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Oppdater programtilleggskonfigurasjonen

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` validerer hver angitte verdi mot programtilleggets
`configSchema` (deklarert i manifestet): `number`-felt respekterer `min`/`max`,
og `select`-felt må samsvare med deklarert `enum`. Nøkler som ikke finnes i skjemaet,
slippes gjennom.

## Konfigurasjon

### Programtilleggskatalog

Programtillegg ligger under OmniRoute-datakatalogen:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (eller det manifest.main peker til)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) finner denne katalogen i
tre trinn:

1. **`OMNIROUTE_PLUGINS_DIR`**, når den er angitt — brukes ordrett, uansett hva `HOME` sier. Dette er
   den eksplisitte innstillingen for Docker/K8s, der programtilleggstreet er bind-montert på en bane
   som vanligvis ikke har noe med containerens hjemmekatalog å gjøre (#11827).
2. `<home>/.omniroute/plugins`, der `<home>` kommer fra miljøvariablene `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, når prosessen ikke eksporterer noen hjemmekatalog i det hele tatt.

Den fastsatte katalogen logges én gang ved oppstart som `scanner.dir_resolved`, med navnet på
inndataverdien som vant (`OMNIROUTE_PLUGINS_DIR`, `home` eller `no-home-fallback`) — slik at et image
som uten varsel ender på trinn 3, opplyser om dette i stedet for bare å rapportere en tom programtilleggsliste.
`POST /api/plugins/scan` finner alle underkataloger der som inneholder en gyldig
`plugin.json`, og registrerer dem. Den samme katalogen er roten som
`pluginManager.install()` kopierer programtillegg til, slik at en overstyring flytter oppdagelse og
installasjon sammen.

> **`OMNIROUTE_PLUGINS_DIR` er ikke `OMNIROUTE_PLUGIN_PATH`.** Sistnevnte leses bare av
> CLI-lasteren for kommandoprogramtillegg (`bin/cli/plugins.mjs`) for å finne npm-pakker av typen `omniroute-cmd-*`
> som legger til `omniroute`-underkommandoer — den påvirker ikke kjøretidsskanneren
> som beskrives her. Se [PLUGINS.md](./PLUGINS.md) for denne delen.

### Egendefinert URL til markedsplassregisteret

Kilden til markedsplasskatalogen leses fra innstillingen `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` leser `settings.pluginMarketplaceUrl`). Når den
er satt til en `http(s)`-URL, henter `listMarketplacePlugins()` denne URL-en og godtar
enten en JSON-matrise med oppføringer på toppnivå eller et objekt med en `plugins`-matrise;
oppføringer uten en `name` av typen streng filtreres bort. Når den ikke er angitt (eller når hentingen
avvises av SSRF-vernet / returnerer en ugyldig respons), brukes det innebygde
startregisteret.

«Marketplace»-fanen i kontrollpanelet inneholder et felt for denne URL-en (leses tilbake fra
`GET /api/settings`).

> Implementasjonsmerknad: Handlingen «Save» i kontrollpanelet sender
> `pluginMarketplaceUrl` til `PATCH /api/settings`. I skrivende stund er denne
> nøkkelen ikke deklarert i `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), så kontroller at verdien vedvarer i din
> utgivelse før du baserer deg på den — **lesebanen** (`getSettings()` →
> `listMarketplacePlugins()`) respekterer nøkkelen når den først finnes i innstillingslageret.

## Sikkerhet

### Rutenivå — kun tilbakekobling

Programtillegg kjører kode i opprettede underprosesser, så hele `/api/plugins`-grensesnittet
er klassifisert som `LOCAL_ONLY` (nivå 1). Håndheving av tilbakekobling utføres
alltid **før** enhver autentiseringskontroll, slik at et lekket administrasjonstoken som når
maskinen gjennom en tunnel, fortsatt ikke kan installere, aktivere eller avinstallere et programtillegg.
Se [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) og
ufravikelige regler nr. 15 / 17.

### SSRF-beskyttelse for markedsplassregisteret

En egendefinert register-URL er konfigurasjon som kan påvirkes av en angriper, så før
den hentes, kjører `listMarketplacePlugins()` den gjennom to lag:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Avviser alt som ikke er `http:` / `https:`.
   - Avviser eksplisitte private/tilbakekoblings-/lokale koblings-/ULA-verter (IPv4 **og** IPv6,
     inkludert IPv4-mappede) via den kanoniske `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`).
   - Slår opp **både** `A`- og `AAAA`-oppføringer og avviser dersom **en hvilken som helst** oppslått
     adresse er privat — dette lukker omgåelsen offentlig vertsnavn → privat IP.
   - **Avviser ved feil**: en DNS-oppslagsfeil fører til at URL-en avvises.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): bruker URL-beskyttelsen for kun
   offentlige adresser på nytt under hentingen og **blokkerer omdirigeringer** (ingen overgang fra offentlig → privat via `30x`).

En URL som ikke består ett av lagene, avbryter ikke forespørselen — markedsplassen
går automatisk tilbake til det innebygde startregisteret og logger en advarsel.

> Denne beskyttelsen ble styrket i PR #3774 spesifikt for å slå opp A + AAAA og bruke
> den kanoniske `isPrivateHost` i stedet for en kontroll begrenset til IPv4.

### Isolering av programtilleggskjøring

- **Prosessisolering** — `loadPlugin()` (`src/lib/plugins/loader.ts`) starter
  hvert programtillegg i en separat Node.js-underprosess og kommuniserer via IPC.
  Hook-kall har et tidsavbrudd med eskalering fra `SIGTERM` → `SIGKILL`.
- **Tillatt liste for miljøvariabler** — underprosessen mottar bare et tillatt sett med miljøvariabler;
  det bredere settet gis kun når manifestet ber om
  `env`-tillatelsen.
- **Banebegrensning** — installasjon/oppgradering/avinstallasjon kontrollerer at programtilleggets
  katalog og `manifest.main` løses **innenfor** den administrerte programtilleggsroten
  før kopiering eller rekursiv sletting (beskytter mot manipulerte databasebaner og
  `../`-traversering i `manifest.main`). Ved aktivering løses symbolske lenker via
  `realpath`, og et inngangspunkt som unnslipper programtilleggskatalogen, nektes lastet.
- **Valgfri integritetsbinding** — et manifest kan deklarere et `integrity`-felt
  (`sha256-<base64>`, SRI-format). Når det finnes, verifiserer lasteren
  hashverdien til inngangsfilen ved innlasting og nekter aktivering ved avvik. Dette er
  valgfri deteksjon av manipulering, **ikke** en sikkerhetsgrense — ruting begrenset
  til tilbakekobling og tillatelsesmodellen er de faktiske grensene.

## Manifest (`plugin.json`)

Valideres av `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Felt               | Type      | Merknader                                                             |
| ------------------ | --------- | --------------------------------------------------------------------- |
| `name`             | string    | Påkrevd; kebab-case (`^[a-z0-9-]+$`), 1–100 tegn                      |
| `version`          | string    | Påkrevd; semver (`MAJOR.MINOR.PATCH`)                                 |
| `description`      | string?   | ≤ 500 tegn                                                            |
| `author`           | string?   | ≤ 200 tegn                                                            |
| `license`          | string?   | Standardverdi er `MIT`                                                |
| `main`             | string?   | Inngangsfil; standardverdi er `index.js`                              |
| `source`           | enum?     | `local` \| `marketplace` (standardverdi er `local`)                   |
| `tags`             | string[]? | Søkeetiketter                                                         |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                       |
| `hooks`            | object?   | Boolske verdier som angir hvilke hooks programtillegget implementerer |
| `skills`           | object[]? | Valgfrie ferdighetsdefinisjoner                                       |
| `enabledByDefault` | boolean?  | Aktiver automatisk ved installasjon                                   |
| `configSchema`     | object?   | Kart over konfigurasjonsfelt (`string`/`number`/`boolean`/`select`)   |
| `integrity`        | string?   | Valgfri `sha256-<base64>`-binding for inngangsfilen                   |

Tillatelser hentes fra enum-verdiene
`network` / `file-read` / `file-write` / `env` / `exec`.

## Livssyklusflyt

```
installer (POST /api/plugins, bane)
  → skann/valider manifest → kopier til staging → kontroller at main er i katalogen
  → atomisk navneendring til ~/.omniroute/plugins/<name> → sett inn rad i databasen
  → utløs onInstall → hvis enabledByDefault: aktiver

aktiver (POST /api/plugins/{name}/activate)
  → realpath-inneslutningskontroll → loadPlugin() (start underprosess)
  → registrer deklarerte hooks → status = "active" → utløs onActivate

deaktiver (POST /api/plugins/{name}/deactivate)
  → utløs onDeactivate (FØR avregistrering) → avregistrer hooks
  → avslutt underprosessen → status = "inactive"

avinstaller (DELETE /api/plugins/{name})
  → deaktiver hvis aktiv → utløs onUninstall
  → inneslutningskontrollert rekursiv sletting av plugin-katalogen → slett raden i databasen
```

Hvis `install` kjøres på nytt mot en katalog der manifestversjonen er **strengt
nyere** enn den installerte versjonen, utføres en automatisk oppgradering (ren
reinstallasjon; konfigurasjonen tilbakestilles til standardverdiene). En identisk
eller eldre versjon avvises.

## Database

Tabellen `plugins` (migrering `076_create_plugins.sql`):

| Kolonne         | Type    | Merknader                                                 |
| --------------- | ------- | --------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                      |
| `name`          | TEXT    | Unik                                                      |
| `version`       | TEXT    | semver; standardverdi `1.0.0`                             |
| `description`   | TEXT    | Valgfri                                                   |
| `author`        | TEXT    | Valgfri                                                   |
| `license`       | TEXT    | Standardverdi `MIT`                                       |
| `main`          | TEXT    | Startfil; standardverdi `index.js`                        |
| `source`        | TEXT    | Standardverdi `local`                                     |
| `tags`          | TEXT    | JSON-matrise; standardverdi `[]`                          |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`          |
| `enabled`       | INT     | 0/1; standardverdi 0                                      |
| `manifest`      | TEXT    | Fullstendig manifest-JSON                                 |
| `config`        | TEXT    | JSON; standardverdi `{}`                                  |
| `config_schema` | TEXT    | JSON; standardverdi `{}`                                  |
| `hooks`         | TEXT    | JSON-matrise med deklarerte hook-navn; standardverdi `[]` |
| `permissions`   | TEXT    | JSON-matrise; standardverdi `[]`                          |
| `plugin_dir`    | TEXT    | Absolutt installasjonskatalog                             |
| `error_message` | TEXT    | Angis når `status = "error"`                              |
| `installed_at`  | TEXT    | `datetime('now')`                                         |
| `updated_at`    | TEXT    | `datetime('now')`                                         |
| `activated_at`  | TEXT    | Angis ved aktivering                                      |

Plugin-metrikker og -analyse spores i flere tabeller
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Kontrollpanel

Kontrollpanelsiden på `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) har to faner:

- **Installert** — viser installerte plugins med de deklarerte hookene deres, en
  bryter for aktivering/deaktivering, en avinstalleringsknapp og handlingen
  «Skann etter plugins» (`POST /api/plugins/scan`).
- **Markedsplass** — viser katalogen fra `GET /api/plugins/marketplace` med et
  felt for å angi URL-en til et egendefinert register.

En konfigurasjonsside for hver plugin finnes på `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Se også

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  hvorfor `/api/plugins` bare er tilgjengelig via loopback (nivå 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — det tilknyttede rammeverket for ferdigheter
  (`src/lib/skills/`); programtillegg kan deklarere ferdigheter i manifestet sitt
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — hendelsesdrevne utgående
  integrasjoner
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  `buildErrorBody()`-mønsteret som alle rutene til programtillegg bruker for feilresponser
