# Plugin Marketplace (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Sursa adevărului:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` și
> `src/app/(dashboard)/dashboard/plugins/`
> **Ultima actualizare:** 2026-06-28 — v3.8.40

OmniRoute include un sistem de pluginuri în stil WordPress. Pluginurile sunt
directoare autonome — fiecare având un manifest `plugin.json` și un fișier de
intrare — care se conectează la fluxul de procesare a cererilor (`onRequest` /
`onResponse` / `onError`) și la evenimentele ciclului de viață (`onInstall` /
`onActivate` / `onDeactivate` / `onUninstall`).

**Piața de pluginuri** este stratul de descoperire construit peste acest sistem.
Aceasta oferă un catalog navigabil de pluginuri care pot fi instalate. În mod
implicit, catalogul este un registru inițial restrâns, încorporat; un operator îl
poate configura să folosească URL-ul unui registru extern personalizat, caz în
care preluarea este securizată de o protecție SSRF care efectuează rezoluția DNS
(consultați [Securitate](#security)).

Fiecare rută pentru pluginuri este accesibilă **numai prin loopback** (Nivelul 1 —
`LOCAL_ONLY`): pluginurile încarcă și execută cod în procese copil, astfel încât
rutele nu pot fi accesate dintr-o origine care nu este loopback, indiferent de
autentificare. Consultați
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Cum funcționează componentele împreună

```
Panou de control (/dashboard/plugins)
  ├─ Fila „Instalate”    → GET /api/plugins            (listPlugins)
  │                        POST /api/plugins/scan      (pluginManager.scan)
  │                        POST /api/plugins/{name}/activate|deactivate
  │                        DELETE /api/plugins/{name}   (dezinstalare)
  └─ Fila „Piață”        → GET /api/plugins/marketplace
                             → listMarketplacePlugins()
                               ├─ fără URL personalizat → SEED_REGISTRY încorporat
                               └─ URL personalizat → protecția SSRF isSafeMarketplaceUrl()
                                                   → safeOutboundFetch(guard:"public-only")
```

- **Stratul registrului** — `src/lib/plugins/marketplace.ts`: listează / caută în
  catalog, revenind la registrul inițial în cazul oricărei erori.
- **Stratul ciclului de viață** — `src/lib/plugins/manager.ts` (instanța singleton
  `pluginManager`): instalare, actualizare, activare, dezactivare, dezinstalare,
  scanare, încărcare la pornire.
- **Stratul manifestului** — `src/lib/plugins/manifest.ts`: schemă Zod + valori
  implicite pentru `plugin.json`.
- **Scannerul** — `src/lib/plugins/scanner.ts`: descoperă pluginurile de pe disc
  în directorul de pluginuri.
- **Încărcătorul** — `src/lib/plugins/loader.ts`: pornește fiecare plugin într-un
  proces copil izolat și intermediază apelurile hook-urilor prin IPC.

## Catalogul pieței

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) returnează o listă
de obiecte `MarketplaceEntry`:

| Câmp          | Tip      | Observații                                 |
| ------------- | -------- | ------------------------------------------ |
| `name`        | string   | Numele pluginului în format kebab-case     |
| `version`     | string   | semver                                     |
| `description` | string   | Scurtă descriere                           |
| `author`      | string   | Autor / organizație                        |
| `license`     | string   | Identificator de licență în stil SPDX      |
| `downloadUrl` | string   | URL-ul sursei de descărcare (poate fi gol) |
| `repository`  | string?  | URL opțional al depozitului                |
| `tags`        | string[] | Etichete pentru căutare/filtrare           |
| `downloads`   | number   | Numărul de descărcări                      |
| `rating`      | number   | 0–5                                        |
| `verified`    | boolean  | Dacă intrarea este marcată ca verificată   |
| `lastUpdated` | string   | Șir de dată în format aproximativ ISO      |

Atunci când nu este configurat niciun URL de registru personalizat, catalogul
este reprezentat de `SEED_REGISTRY` încorporat (în prezent `request-logger`,
`rate-limiter`, `cost-tracker` și `theme-manager`). Registrul inițial este
disponibil întotdeauna — dacă un registru extern configurat nu este accesibil,
returnează o stare diferită de `200` sau returnează un corp nerecunoscut,
`listMarketplacePlugins()` înregistrează un avertisment și revine la lista
inițială.

> Notă: **catalogul** pieței (navigare/căutare) este conectat complet de la un
> capăt la altul, dar **instalarea** cu un singur clic din catalog nu este încă
> implementată — butonul „Instalare” din panoul de control pentru o intrare din
> piață afișează momentan o notificare „în curând”. În prezent, instalarea se
> realizează prin fluxul de instalare dintr-o cale locală (`POST /api/plugins`) și
> prin descoperirea pe disc (`POST /api/plugins/scan`).

## API REST

Toate endpointurile necesită autentificare de administrare (`requireManagementAuth`) **și** sunt
accesibile exclusiv prin interfața loopback — `/api/plugins` și `/api/plugins/` sunt incluse în
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Endpoint                         | Metodă | Descriere                                                                     |
| -------------------------------- | ------ | ----------------------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Listează pluginurile instalate (filtru opțional `?status=`)                   |
| `/api/plugins`                   | POST   | Instalează un plugin dintr-o cale locală absolută                             |
| `/api/plugins/scan`              | POST   | Scanează directorul de pluginuri și înregistrează pluginuri noi               |
| `/api/plugins/marketplace`       | GET    | Listează intrările din catalogul marketplace                                  |
| `/api/plugins/[name]`            | GET    | Obține detaliile pluginului instalat                                          |
| `/api/plugins/[name]`            | DELETE | Dezinstalează un plugin                                                       |
| `/api/plugins/[name]/activate`   | POST   | Activează (încarcă + înregistrează hook-urile)                                |
| `/api/plugins/[name]/deactivate` | POST   | Dezactivează (declanșează `onDeactivate`, anulează înregistrarea hook-urilor) |
| `/api/plugins/[name]/config`     | GET    | Obține configurația pluginului + schema de configurare                        |
| `/api/plugins/[name]/config`     | PUT    | Actualizează configurația pluginului (validată conform schemei)               |

Filtrul `status` pentru `GET /api/plugins` acceptă una dintre valorile
`installed` / `active` / `inactive` / `error`. O valoare nevalidă returnează `400`.

### Listarea pluginurilor instalate

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Instalarea dintr-o cale locală

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` trebuie să fie **absolută** și nu poate conține segmente de traversare `..` sau
octeți nuli (restricție impusă de Zod). Directorul sursă trebuie să conțină un
`plugin.json` valid (sau să fie directorul părinte al unuia). În caz de succes, răspunsul este `201` și conține
rândul pluginului instalat.

### Navigarea în marketplace

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Actualizarea configurației pluginului

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` validează fiecare valoare furnizată conform
`configSchema` a pluginului (declarată în manifest): câmpurile `number` respectă `min`/`max`,
iar câmpurile `select` trebuie să corespundă valorilor `enum` declarate. Cheile care nu sunt prezente în schemă
sunt permise.

## Configurare

### Directorul de pluginuri

Pluginurile se află în directorul de date OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (sau orice fișier indicat de manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) determină acel director în
trei pași:

1. **`OMNIROUTE_PLUGINS_DIR`**, când este setată — este utilizată ca atare, indiferent de valoarea `HOME`. Aceasta este
   opțiunea explicită pentru Docker/K8s, unde arborele de pluginuri este montat prin bind la o cale
   care, de obicei, nu are nicio legătură cu directorul home al containerului (#11827).
2. `<home>/.omniroute/plugins`, unde `<home>` provine din variabilele de mediu `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, când procesul nu exportă deloc un director home.

Directorul determinat este înregistrat o singură dată la pornire ca `scanner.dir_resolved`, indicând
sursa utilizată (`OMNIROUTE_PLUGINS_DIR`, `home` sau `no-home-fallback`) — astfel, o imagine
care ajunge în mod silențios la pasul 3 raportează acest lucru, în loc să raporteze doar o listă goală de pluginuri.
`POST /api/plugins/scan` descoperă orice subdirector de acolo care conține un
`plugin.json` valid și îl înregistrează; același director este rădăcina în care
`pluginManager.install()` copiază pluginurile, astfel încât o suprascriere mută împreună procesele de descoperire și
instalare.

> **`OMNIROUTE_PLUGINS_DIR` nu este `OMNIROUTE_PLUGIN_PATH`.** Aceasta din urmă este citită numai de
> încărcătorul de pluginuri de comandă CLI (`bin/cli/plugins.mjs`) pentru a găsi pachetele npm `omniroute-cmd-*`
> care adaugă subcomenzi `omniroute` — nu are niciun efect asupra scanerului din timpul execuției
> descris aici. Consultați [PLUGINS.md](./PLUGINS.md) pentru acea componentă.

### URL personalizat pentru registrul marketplace

Sursa catalogului marketplace este citită din setarea `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` citește `settings.pluginMarketplaceUrl`). Când
este setată la un URL `http(s)`, `listMarketplacePlugins()` preia acel URL și acceptă
fie o matrice JSON de nivel superior cu intrări, fie un obiect cu o matrice `plugins`;
intrările fără un `name` de tip șir sunt eliminate. Când nu este setată (sau când preluarea
nu trece de protecția SSRF / returnează un răspuns nevalid), este utilizat registrul
inițial încorporat.

Fila „Marketplace” din tabloul de bord oferă un câmp pentru acest URL (citit înapoi din
`GET /api/settings`).

> Notă privind implementarea: acțiunea „Save” din tabloul de bord trimite
> `pluginMarketplaceUrl` către `PATCH /api/settings`. La momentul redactării, această
> cheie nu este declarată în `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), așadar verificați persistența în
> versiunea dumneavoastră înainte de a vă baza pe ea — calea de **citire** (`getSettings()` →
> `listMarketplacePlugins()`) respectă cheia odată ce aceasta este prezentă în depozitul
> de setări.

## Securitate

### Nivelul rutei — exclusiv loopback

Pluginurile execută cod în procese copil lansate separat, astfel încât întreaga suprafață `/api/plugins`
este clasificată drept `LOCAL_ONLY` (Nivelul 1). Aplicarea restricției loopback rulează
necondiționat **înaintea** oricărei verificări de autentificare, astfel încât un token de administrare divulgat care ajunge
la sistem printr-un tunel tot nu poate instala, activa sau dezinstala un plugin.
Consultați [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) și
Regulile stricte #15 / #17.

### Protecție SSRF pentru registrul marketplace-ului

Un URL de registru personalizat este o configurație care poate fi influențată de un atacator, astfel încât, înainte
de a-l prelua, `listMarketplacePlugins()` îl trece prin două niveluri de protecție:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Respinge orice adresă care nu utilizează `http:` / `https:`.
   - Respinge gazdele literale private/loopback/link-local/ULA (IPv4 **și** IPv6,
     inclusiv cele mapate IPv4) prin intermediul funcției canonice `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`).
   - Rezolvă **atât** înregistrările `A`, cât și `AAAA` și respinge adresa dacă **oricare** adresă
     rezolvată este privată — eliminând posibilitatea de eludare prin maparea unui nume de gazdă public la un IP privat.
   - **Eșuează în mod sigur**: o eroare de rezoluție DNS determină respingerea URL-ului.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): reaplică la momentul preluării protecția URL
   exclusiv pentru adrese publice și **blochează redirecționările** (fără posibilitatea unui pivot `30x`
   de la public la privat).

Un URL care nu trece de oricare dintre cele două niveluri nu abandonează cererea — marketplace-ul
revine în mod silențios la registrul inițial încorporat și înregistrează un avertisment.

> Această protecție a fost consolidată în PR #3774 în mod special pentru a rezolva A + AAAA și pentru a utiliza
> funcția canonică `isPrivateHost` în locul unei verificări limitate la IPv4.

### Izolarea execuției pluginurilor

- **Izolarea proceselor** — `loadPlugin()` (`src/lib/plugins/loader.ts`) lansează
  fiecare plugin într-un proces copil Node.js separat și comunică prin IPC.
  Apelurile hook au un timeout cu escaladare `SIGTERM` → `SIGKILL`.
- **Listă de permisiuni pentru variabilele de mediu** — procesul copil primește doar un set permis de variabile
  de mediu; setul mai larg este acordat numai atunci când manifestul solicită
  permisiunea `env`.
- **Limitarea căilor** — instalarea/actualizarea/dezinstalarea verifică dacă directorul
  pluginului și `manifest.main` se rezolvă **în interiorul** rădăcinii administrate pentru pluginuri,
  înaintea oricărei copieri sau ștergeri recursive (protejând împotriva căilor alterate din baza de date și a
  traversării `../` în `manifest.main`). Activarea rezolvă legăturile simbolice prin
  `realpath` și refuză încărcarea unui punct de intrare care iese din directorul
  pluginului.
- **Fixare opțională a integrității** — un manifest poate declara un câmp `integrity`
  (`sha256-<base64>`, format SRI). Atunci când este prezent, loaderul verifică hash-ul
  fișierului de intrare la momentul încărcării și refuză activarea în caz de neconcordanță. Aceasta este
  o metodă opțională de detectare a modificărilor neautorizate, **nu** o limită de securitate — rutarea exclusiv
  loopback și modelul de permisiuni reprezintă limitele reale.

## Manifest (`plugin.json`)

Validat de `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Câmp               | Tip       | Observații                                                               |
| ------------------ | --------- | ------------------------------------------------------------------------ |
| `name`             | string    | Obligatoriu; kebab-case (`^[a-z0-9-]+$`), 1–100 de caractere             |
| `version`          | string    | Obligatoriu; semver (`MAJOR.MINOR.PATCH`)                                |
| `description`      | string?   | ≤ 500 de caractere                                                       |
| `author`           | string?   | ≤ 200 de caractere                                                       |
| `license`          | string?   | Valoarea implicită este `MIT`                                            |
| `main`             | string?   | Fișier de intrare; valoarea implicită este `index.js`                    |
| `source`           | enum?     | `local` \| `marketplace` (valoarea implicită este `local`)               |
| `tags`             | string[]? | Etichete de căutare                                                      |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                          |
| `hooks`            | object?   | Valori booleene care declară hook-urile implementate de plugin           |
| `skills`           | object[]? | Definiții opționale ale abilităților                                     |
| `enabledByDefault` | boolean?  | Activare automată la instalare                                           |
| `configSchema`     | object?   | Hartă a câmpurilor de configurare (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Fixare opțională `sha256-<base64>` pentru fișierul de intrare            |

Permisiunile sunt selectate din enumerarea
`network` / `file-read` / `file-write` / `env` / `exec`.

## Fluxul ciclului de viață

```
install (POST /api/plugins, cale)
  → scanare/validare manifest → copiere în staging → verificare că main se află în director
  → redenumire atomică în ~/.omniroute/plugins/<name> → inserare rând în baza de date
  → declanșare onInstall → dacă enabledByDefault: activare

activate (POST /api/plugins/{name}/activate)
  → verificarea includerii cu realpath → loadPlugin() (pornire proces copil)
  → înregistrare hook-uri declarate → status = "active" → declanșare onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → declanșare onDeactivate (ÎNAINTE de anularea înregistrării) → anulare înregistrare hook-uri
  → închidere proces copil → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → dezactivare dacă este activ → declanșare onUninstall
  → ștergere recursivă, cu verificarea includerii, a directorului pluginului → ștergere rând din baza de date
```

Rularea din nou a `install` pentru un director a cărui versiune din manifest este **strict
mai nouă** decât versiunea instalată efectuează automat upgrade-ul (reinstalare curată; configurația revine
la valorile implicite). O versiune identică sau mai veche este respinsă.

## Baza de date

Tabelul `plugins` (migrarea `076_create_plugins.sql`):

| Coloană         | Tip     | Observații                                                  |
| --------------- | ------- | ----------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                        |
| `name`          | TEXT    | Unic                                                        |
| `version`       | TEXT    | semver; implicit `1.0.0`                                    |
| `description`   | TEXT    | Opțional                                                    |
| `author`        | TEXT    | Opțional                                                    |
| `license`       | TEXT    | Implicit `MIT`                                              |
| `main`          | TEXT    | Fișier de intrare; implicit `index.js`                      |
| `source`        | TEXT    | Implicit `local`                                            |
| `tags`          | TEXT    | Matrice JSON; implicit `[]`                                 |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`            |
| `enabled`       | INT     | 0/1; implicit 0                                             |
| `manifest`      | TEXT    | Manifest JSON complet                                       |
| `config`        | TEXT    | JSON; implicit `{}`                                         |
| `config_schema` | TEXT    | JSON; implicit `{}`                                         |
| `hooks`         | TEXT    | Matrice JSON cu numele hook-urilor declarate; implicit `[]` |
| `permissions`   | TEXT    | Matrice JSON; implicit `[]`                                 |
| `plugin_dir`    | TEXT    | Director absolut de instalare                               |
| `error_message` | TEXT    | Setat când `status = "error"`                               |
| `installed_at`  | TEXT    | `datetime('now')`                                           |
| `updated_at`    | TEXT    | `datetime('now')`                                           |
| `activated_at`  | TEXT    | Setat la activare                                           |

Metricile și datele analitice ale pluginurilor sunt urmărite în tabele suplimentare
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Panoul de control

Pagina panoului de control de la `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) oferă două file:

- **Instalate** — enumeră pluginurile instalate împreună cu hook-urile declarate, un
  comutator de activare/dezactivare, un buton de dezinstalare și o acțiune „Scanează după pluginuri”
  (`POST /api/plugins/scan`).
- **Marketplace** — afișează catalogul de la `GET /api/plugins/marketplace` cu un
  câmp pentru setarea URL-ului registrului personalizat.

O pagină de configurare pentru fiecare plugin se află la `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Consultați și

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  de ce `/api/plugins` este accesibil doar prin interfața loopback (Nivelul 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — cadrul asociat pentru abilități
  (`src/lib/skills/`); pluginurile pot declara abilități în manifestul lor
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — integrări externe
  bazate pe evenimente
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  modelul `buildErrorBody()` utilizat de fiecare rută de plugin pentru răspunsurile de eroare
