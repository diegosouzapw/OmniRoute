# Plugin Marketplace (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Patiesais avots:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` un
> `src/app/(dashboard)/dashboard/plugins/`
> **Pēdējoreiz atjaunināts:** 2026-06-28 — v3.8.40

OmniRoute ietver WordPress stila spraudņu sistēmu. Spraudņi ir pašpietiekami
direktoriji — katram ir `plugin.json` manifests un ieejas fails —, kas pieslēdzas
pieprasījumu apstrādes konveijeram (`onRequest` / `onResponse` / `onError`) un
dzīves cikla notikumiem (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Spraudņu tirgus** ir uz šīs sistēmas balstīts atklāšanas slānis. Tas
nodrošina pārlūkojamu instalējamo spraudņu katalogu. Pēc noklusējuma katalogs ir
neliels iebūvēts sākotnējais reģistrs; operators var norādīt pielāgota attālā
reģistra URL, un šādā gadījumā ielāde tiek aizsargāta ar DNS atrisinošu SSRF
aizsardzību (skatiet sadaļu [Drošība](#security)).

Katrs spraudņu maršruts ir **pieejams tikai no atgriezeniskās cilpas**
(1. līmenis — `LOCAL_ONLY`): spraudņi ielādē un izpilda kodu pakārtotajos
procesos, tāpēc maršruti nav sasniedzami no avota, kas nav atgriezeniskās cilpas
avots, neatkarīgi no autentifikācijas. Skatiet
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Kā viss darbojas kopā

```
Informācijas panelis (/dashboard/plugins)
  ├─ Cilne "Instalētie" → GET /api/plugins            (listPlugins)
  │                       POST /api/plugins/scan      (pluginManager.scan)
  │                       POST /api/plugins/{name}/activate|deactivate
  │                       DELETE /api/plugins/{name}   (atinstalēšana)
  └─ Cilne "Tirgus"      → GET /api/plugins/marketplace
                            → listMarketplacePlugins()
                              ├─ nav pielāgota URL → iebūvētais SEED_REGISTRY
                              └─ pielāgots URL → isSafeMarketplaceUrl() SSRF aizsardzība
                                               → safeOutboundFetch(guard:"public-only")
```

- **Reģistra slānis** — `src/lib/plugins/marketplace.ts`: uzskaita / meklē
  katalogā un jebkuras kļūmes gadījumā izmanto sākotnējo reģistru.
- **Dzīves cikla slānis** — `src/lib/plugins/manager.ts` (`pluginManager` vienīgais eksemplārs):
  instalēšana, jaunināšana, aktivizēšana, deaktivizēšana, atinstalēšana, skenēšana, ielāde palaišanas laikā.
- **Manifesta slānis** — `src/lib/plugins/manifest.ts`: Zod shēma un noklusējuma
  vērtības failam `plugin.json`.
- **Skeneris** — `src/lib/plugins/scanner.ts`: atrod diskā esošos spraudņus
  spraudņu direktorijā.
- **Ielādētājs** — `src/lib/plugins/loader.ts`: palaiž katru spraudni izolētā
  pakārtotajā procesā un koordinē āķu izsaukumus, izmantojot IPC.

## Tirgus katalogs

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) atgriež
`MarketplaceEntry` objektu sarakstu:

| Lauks         | Tips     | Piezīmes                               |
| ------------- | -------- | -------------------------------------- |
| `name`        | string   | Spraudņa nosaukums kebab-case formātā  |
| `version`     | string   | semver                                 |
| `description` | string   | Īss kopsavilkums                       |
| `author`      | string   | Autors / organizācija                  |
| `license`     | string   | SPDX stila licences identifikators     |
| `downloadUrl` | string   | Avota lejupielādes URL (var būt tukšs) |
| `repository`  | string?  | Neobligāts repozitorija URL            |
| `tags`        | string[] | Meklēšanas/filtrēšanas birkas          |
| `downloads`   | number   | Lejupielāžu skaits                     |
| `rating`      | number   | 0–5                                    |
| `verified`    | boolean  | Vai ieraksts ir atzīmēts kā verificēts |
| `lastUpdated` | string   | ISO tipa datuma virkne                 |

Ja nav konfigurēts pielāgota reģistra URL, katalogs izmanto iebūvēto
`SEED_REGISTRY` (pašlaik `request-logger`, `rate-limiter`, `cost-tracker` un
`theme-manager`). Sākotnējais reģistrs ir pieejams vienmēr — ja konfigurētais
attālais reģistrs nav sasniedzams, atgriež statusu, kas nav `200`, vai atgriež
neatpazītu saturu, `listMarketplacePlugins()` reģistrē brīdinājumu un izmanto
sākotnējo sarakstu.

> Piezīme: tirgus **katalogs** (pārlūkošana/meklēšana) ir pilnībā integrēts, taču
> tirgus **instalēšana** ar vienu klikšķi no kataloga vēl nav ieviesta —
> informācijas paneļa poga "Instalēt" tirgus ierakstā pašlaik parāda paziņojumu
> "drīzumā". Pašlaik instalēšana notiek, izmantojot instalēšanas plūsmu no lokāla
> ceļa (`POST /api/plugins`) un atrašanu diskā (`POST /api/plugins/scan`).

## REST API

Visiem galapunktiem ir nepieciešama pārvaldības autentifikācija (`requireManagementAuth`), **un** tie ir
pieejami tikai no lokālās atgriezeniskās cilpas — `/api/plugins` un `/api/plugins/` ir norādīti
sarakstā `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Galapunkts                       | Metode | Apraksts                                                      |
| -------------------------------- | ------ | ------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Uzskaitīt instalētos spraudņus (neobligāts `?status=` filtrs) |
| `/api/plugins`                   | POST   | Instalēt spraudni no absolūta lokālā ceļa                     |
| `/api/plugins/scan`              | POST   | Skenēt spraudņu direktoriju un reģistrēt jaunus spraudņus     |
| `/api/plugins/marketplace`       | GET    | Uzskaitīt tirgus kataloga ierakstus                           |
| `/api/plugins/[name]`            | GET    | Iegūt instalētā spraudņa informāciju                          |
| `/api/plugins/[name]`            | DELETE | Atinstalēt spraudni                                           |
| `/api/plugins/[name]/activate`   | POST   | Aktivizēt (ielādēt un reģistrēt āķus)                         |
| `/api/plugins/[name]/deactivate` | POST   | Deaktivizēt (izsaukt `onDeactivate`, atcelt āķu reģistrāciju) |
| `/api/plugins/[name]/config`     | GET    | Iegūt spraudņa konfigurāciju un konfigurācijas shēmu          |
| `/api/plugins/[name]/config`     | PUT    | Atjaunināt spraudņa konfigurāciju (validējot pret shēmu)      |

`GET /api/plugins` filtrs `status` pieņem vienu no šīm vērtībām:
`installed` / `active` / `inactive` / `error`. Nederīgas vērtības gadījumā tiek atgriezts `400`.

### Instalēto spraudņu uzskaitīšana

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Instalēšana no lokāla ceļa

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

Ceļam `path` jābūt **absolūtam**, un tas nedrīkst saturēt `..` pārvietošanās segmentus vai
nulles baitus (to nodrošina Zod). Avota direktorijā jābūt derīgam
`plugin.json` (vai tai jābūt šāda faila vecākdirektorijai). Veiksmes gadījumā atbildes kods ir `201`, un tajā ir
instalētā spraudņa ieraksts.

### Tirgus pārlūkošana

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Spraudņa konfigurācijas atjaunināšana

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` validē katru norādīto vērtību pret spraudņa
`configSchema` (kas deklarēta manifestā): `number` lauki ievēro `min`/`max`,
bet `select` laukiem jāatbilst deklarētajam `enum`. Atslēgas, kuru shēmā nav,
ir atļautas.

## Konfigurācija

### Spraudņu direktorijs

Spraudņi atrodas OmniRoute datu direktorijā:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (vai jebkurš fails, uz kuru norāda manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) nosaka šo direktoriju
trīs soļos:

1. **`OMNIROUTE_PLUGINS_DIR`**, ja tas ir iestatīts — tiek izmantots burtiski neatkarīgi no `HOME` vērtības. Šī ir
   tiešā vadības opcija Docker/K8s videi, kur spraudņu koks ir piesaistīts ceļam,
   kam parasti nav nekāda sakara ar konteinera mājas direktoriju (#11827).
2. `<home>/.omniroute/plugins`, kur `<home>` tiek iegūts no `HOME` / `USERPROFILE`
   vides mainīgajiem.
3. `/tmp/.omniroute/plugins`, ja process vispār neeksportē mājas direktoriju.

Noteiktais direktorijs tiek vienreiz reģistrēts žurnālā palaišanas laikā kā `scanner.dir_resolved`, norādot
izvēlēto ievadi (`OMNIROUTE_PLUGINS_DIR`, `home` vai `no-home-fallback`) — tādējādi attēls,
kas nemanāmi nonāk līdz 3. solim, par to paziņo, nevis tikai ziņo par tukšu spraudņu sarakstu.
`POST /api/plugins/scan` atrod jebkuru apakšdirektoriju, kurā ir derīgs
`plugin.json`, un to reģistrē; šis pats direktorijs ir saknes direktorijs, kurā
`pluginManager.install()` kopē spraudņus, tāpēc pārrakstīšana kopā pārvieto gan atklāšanu, gan
instalēšanu.

> **`OMNIROUTE_PLUGINS_DIR` nav `OMNIROUTE_PLUGIN_PATH`.** Pēdējo nolasa tikai
> CLI komandu spraudņu ielādētājs (`bin/cli/plugins.mjs`), lai atrastu `omniroute-cmd-*` npm
> pakotnes, kas pievieno `omniroute` apakškomandas — tas neietekmē šeit aprakstīto izpildlaika skeneri.
> Informāciju par šo daļu skatiet dokumentā [PLUGINS.md](./PLUGINS.md).

### Pielāgots tirgus reģistra URL

Tirgus kataloga avots tiek nolasīts no iestatījuma `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` nolasa `settings.pluginMarketplaceUrl`). Ja tam ir
iestatīts `http(s)` URL, `listMarketplacePlugins()` izgūst šo URL un pieņem
vai nu augstākā līmeņa JSON ierakstu masīvu, vai objektu ar `plugins` masīvu;
ieraksti bez virknes tipa `name` tiek izfiltrēti. Ja vērtība nav iestatīta (vai ja pieprasījumu
noraida SSRF aizsardzība / tiek saņemta nederīga atbilde), tiek izmantots iebūvētais sākotnējais reģistrs.

Informācijas paneļa cilnē "Tirgus" ir pieejams šī URL lauks (tas tiek nolasīts no
`GET /api/settings`).

> Ieviešanas piezīme: informācijas paneļa darbība "Saglabāt" nosūta
> `pluginMarketplaceUrl` uz `PATCH /api/settings`. Šī teksta rakstīšanas brīdī šī
> atslēga nav deklarēta shēmā `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), tāpēc pirms paļaušanās uz to pārbaudiet datu saglabāšanu savā
> laidienā — **lasīšanas** ceļš (`getSettings()` →
> `listMarketplacePlugins()`) ņem vērā šo atslēgu, tiklīdz tā ir pieejama iestatījumu
> krātuvē.

## Drošība

### Maršruta līmenis — tikai atgriezeniskās cilpas saskarne

Spraudņi izpilda kodu palaistos bērnprocesos, tāpēc visa `/api/plugins`
virsma ir klasificēta kā `LOCAL_ONLY` (1. līmenis). Atgriezeniskās cilpas ierobežojums tiek
bez izņēmumiem piemērots **pirms** jebkuras autentifikācijas pārbaudes, tāpēc nopludināts pārvaldības marķieris, kas
sasniedz ierīci pa tuneli, joprojām nevar instalēt, aktivizēt vai atinstalēt spraudni.
Skatiet [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) un
stingros noteikumus Nr. 15 / Nr. 17.

### Tirgus reģistra SSRF aizsardzība

Pielāgota reģistra URL ir konfigurācija, ko var ietekmēt uzbrucējs, tāpēc pirms
tā izgūšanas `listMarketplacePlugins()` to apstrādā divos līmeņos:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Noraida visu, kas nav `http:` / `https:`.
   - Noraida literālas privātas/atgriezeniskās cilpas/lokālās saites/ULA resursdatora adreses (IPv4 **un** IPv6,
     tostarp IPv4 kartētas adreses), izmantojot kanonisko `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`).
   - Atrisina **gan** `A`, **gan** `AAAA` ierakstus un noraida URL, ja **jebkura** atrisinātā
     adrese ir privāta, tādējādi novēršot publiska resursdatora nosaukuma → privātas IP adreses apiešanas iespēju.
   - **Kļūmes gadījumā noraida**: DNS atrisināšanas kļūme izraisa URL noraidīšanu.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): izgūšanas laikā atkārtoti piemēro tikai publiskām adresēm paredzēto URL
   aizsardzību un **bloķē novirzīšanu** (nav iespējama publiskas → privātas adreses `30x`
   pāreja).

URL, kas neiztur kādu no šiem līmeņiem, nepārtrauc pieprasījumu — tirgus
klusi izmanto iebūvēto sākotnējo reģistru un reģistrē brīdinājumu žurnālā.

> Šī aizsardzība tika pastiprināta PR #3774, lai īpaši atrisinātu A + AAAA ierakstus un izmantotu
> kanonisko `isPrivateHost`, nevis tikai IPv4 paredzētu pārbaudi.

### Spraudņu izpildes izolācija

- **Procesu izolācija** — `loadPlugin()` (`src/lib/plugins/loader.ts`) palaiž
  katru spraudni atsevišķā Node.js bērnprocesā un sazinās, izmantojot IPC.
  Āķu izsaukumiem ir noildze ar `SIGTERM` → `SIGKILL` eskalāciju.
- **Vides atļauto vērtību saraksts** — bērnprocess saņem tikai atļauto vides
  mainīgo kopu; plašāka kopa tiek piešķirta tikai tad, ja manifests pieprasa
  `env` atļauju.
- **Ceļu ierobežošana** — instalēšanas/jaunināšanas/atinstalēšanas laikā tiek pārbaudīts, vai spraudņa
  direktorijs un `manifest.main` tiek atrisināti **pārvaldītā spraudņu saknes direktorija ietvaros**
  pirms jebkādas kopēšanas vai rekursīvas dzēšanas (aizsardzība pret manipulētiem datubāzes ceļiem un
  `../` šķērsošanu laukā `manifest.main`). Aktivizēšanas laikā simboliskās saites tiek atrisinātas, izmantojot
  `realpath`, un tiek atteikta tāda ieejas punkta ielāde, kas atrodas ārpus spraudņa
  direktorija.
- **Neobligāta integritātes piesaiste** — manifestā var deklarēt lauku `integrity`
  (`sha256-<base64>`, SRI formāts). Ja tas ir norādīts, ielādētājs ielādes laikā pārbauda
  ieejas faila jaucējvērtību un neatbilstības gadījumā atsakās veikt aktivizēšanu. Tā ir
  brīvprātīgi iespējojama aizsardzība pret manipulācijām, **nevis** drošības robeža — tikai atgriezeniskās cilpas maršrutēšana
  un atļauju modelis ir faktiskās robežas.

## Manifests (`plugin.json`)

Validē `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Lauks              | Tips       | Piezīmes                                                          |
| ------------------ | ---------- | ----------------------------------------------------------------- |
| `name`             | virkne     | Obligāts; kebab-case (`^[a-z0-9-]+$`), 1–100 rakstzīmes           |
| `version`          | virkne     | Obligāts; semver (`MAJOR.MINOR.PATCH`)                            |
| `description`      | virkne?    | ≤ 500 rakstzīmes                                                  |
| `author`           | virkne?    | ≤ 200 rakstzīmes                                                  |
| `license`          | virkne?    | Noklusējuma vērtība ir `MIT`                                      |
| `main`             | virkne?    | Ieejas fails; noklusējuma vērtība ir `index.js`                   |
| `source`           | enum?      | `local` \| `marketplace` (noklusējuma vērtība ir `local`)         |
| `tags`             | virkne[]?  | Meklēšanas tagi                                                   |
| `requires`         | objekts?   | `{ omniroute?, permissions[] }`                                   |
| `hooks`            | objekts?   | Būla vērtības, kas norāda, kurus āķus spraudnis implementē        |
| `skills`           | objekts[]? | Neobligātas prasmju definīcijas                                   |
| `enabledByDefault` | boolean?   | Automātiski aktivizēt instalēšanas laikā                          |
| `configSchema`     | objekts?   | Konfigurācijas lauku karte (`string`/`number`/`boolean`/`select`) |
| `integrity`        | virkne?    | Neobligāta ieejas faila `sha256-<base64>` piesaiste               |

Atļaujas tiek ņemtas no uzskaitījuma
`network` / `file-read` / `file-write` / `env` / `exec`.

## Dzīves cikla plūsma

```
instalēšana (POST /api/plugins, ceļš)
  → manifesta skenēšana/validēšana → kopēšana pagaidu direktorijā → pārbaude, vai galvenais fails atrodas direktorijā
  → atomāra pārdēvēšana uz ~/.omniroute/plugins/<name> → rindas ievietošana datubāzē
  → onInstall izsaukšana → ja enabledByDefault: aktivizēšana

aktivizēšana (POST /api/plugins/{name}/activate)
  → realpath ietveršanas pārbaude → loadPlugin() (atvasinātā procesa palaišana)
  → deklarēto āķu reģistrēšana → statuss = "active" → onActivate izsaukšana

deaktivizēšana (POST /api/plugins/{name}/deactivate)
  → onDeactivate izsaukšana (PIRMS reģistrācijas atcelšanas) → āķu reģistrācijas atcelšana
  → atvasinātā procesa apturēšana → statuss = "inactive"

atinstalēšana (DELETE /api/plugins/{name})
  → deaktivizēšana, ja aktīvs → onUninstall izsaukšana
  → spraudņa direktorijas rekursīva dzēšana ar ietveršanas pārbaudi → datubāzes rindas dzēšana
```

Atkārtoti palaižot `install` direktorijam, kura manifesta versija ir **strikti
jaunāka** par instalēto versiju, tiek veikta automātiska jaunināšana (tīra
pārinstalēšana; konfigurācija tiek atiestatīta uz noklusējuma vērtībām).
Tāda pati vai vecāka versija tiek noraidīta.

## Datubāze

Tabula `plugins` (migrācija `076_create_plugins.sql`):

| Kolonna         | Tips    | Piezīmes                                              |
| --------------- | ------- | ----------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                  |
| `name`          | TEXT    | Unikāls                                               |
| `version`       | TEXT    | semver; noklusējums `1.0.0`                           |
| `description`   | TEXT    | Neobligāts                                            |
| `author`        | TEXT    | Neobligāts                                            |
| `license`       | TEXT    | Noklusējums `MIT`                                     |
| `main`          | TEXT    | Ieejas fails; noklusējums `index.js`                  |
| `source`        | TEXT    | Noklusējums `local`                                   |
| `tags`          | TEXT    | JSON masīvs; noklusējums `[]`                         |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`      |
| `enabled`       | INT     | 0/1; noklusējums 0                                    |
| `manifest`      | TEXT    | Pilns manifesta JSON                                  |
| `config`        | TEXT    | JSON; noklusējums `{}`                                |
| `config_schema` | TEXT    | JSON; noklusējums `{}`                                |
| `hooks`         | TEXT    | Deklarēto āķu nosaukumu JSON masīvs; noklusējums `[]` |
| `permissions`   | TEXT    | JSON masīvs; noklusējums `[]`                         |
| `plugin_dir`    | TEXT    | Absolūtais instalēšanas direktorijs                   |
| `error_message` | TEXT    | Iestatīts, ja `status = "error"`                      |
| `installed_at`  | TEXT    | `datetime('now')`                                     |
| `updated_at`    | TEXT    | `datetime('now')`                                     |
| `activated_at`  | TEXT    | Iestatīts aktivizēšanas laikā                         |

Spraudņu metrika un analītika tiek uzskaitīta papildu tabulās
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Informācijas panelis

Informācijas paneļa lapā `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) ir divas cilnes:

- **Instalētie** — uzskaita instalētos spraudņus kopā ar to deklarētajiem āķiem,
  aktivizēšanas/deaktivizēšanas pārslēgu, atinstalēšanas pogu un darbību
  "Meklēt spraudņus" (`POST /api/plugins/scan`).
- **Tirgus** — parāda katalogu no `GET /api/plugins/marketplace` un lauku
  pielāgota reģistra URL iestatīšanai.

Katra spraudņa konfigurācijas lapa atrodas
`/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Skatiet arī

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  kāpēc `/api/plugins` ir pieejams tikai no atgriezeniskās cilpas (1. līmenis)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — saistītais prasmju ietvars
  (`src/lib/skills/`); spraudņi var deklarēt prasmes savā manifestā
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — notikumu vadītas izejošās
  integrācijas
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  `buildErrorBody()` modelis, ko kļūdu atbildēm izmanto katrs spraudņa maršruts
