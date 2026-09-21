# Release Checklist (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Utolsó frissítés:** 2026-08-28 — v3.8.51
> Egyszerűsített kiadási folyamat, amely Claude Code-képességeket használ az automatizáláshoz.
>
> **Tartsd zölden a várólistát/ágat a kiadások között:** lásd: [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (`/green-prs` család + `npm run check:release-green` + `/babysit` + éjszakai futtatás). Ennek rendszeres futtatása
> — különösen **ezen ellenőrzőlista előtt** — biztosítja, hogy a kiadási PR zöld állapotból induljon.

## Röviden

```bash
# 1. Verzió növelése + CHANGELOG előállítása (képesség)
/version-bump-cc patch    # vagy minor/major

# 2. Minőségi ellenőrzés helyi futtatása
npm run check              # lintelés + tesztek
npm run test:coverage      # teljes lefedettségi küszöb (60/60/60/60)

# 3. Build és füstteszt
npm run build
npm run test:e2e           # opcionális, de ajánlott

# 4. Kiadás előállítása (képesség)
/generate-release-cc

# 5. Telepítés (képesség)
/deploy-vps-both-cc        # vagy akamai-cc / local-cc

# 6. Kiadási bizonyítékok rögzítése (képesség)
/capture-release-evidences-cc
```

## npm Trusted Publishing (v3.8.51 óta alapértelmezett) — kérésre előkészített, tartalékként közvetlen

Az `npm-publish.yml` alapértelmezés szerint az **npm Trusted Publishing (OIDC)** használatával tesz közzé: a
`stage-npm` feladat (GitHub által üzemeltetett környezetben) a GitHub id-tokenjét egy rövid élettartamú npm
hitelesítő adatra cseréli az adott futtatáshoz — nincs hosszú élettartamú npm-token a tároló titkos adatai között, nincs 2FA-kérés, és származási igazolás is csatolva van.
Ez az npm által engedélyezett megkerülési mód most, hogy a 2FA-t kihagyó tokeneket fokozatosan kivezetik;
visszaállítja a projekt v3.8.48-ig használt teljesen automatikus folyamatát, miközben megtartja a
WS1.3 garanciáját (egy kiszivárgott token önmagában nem tud közzétenni — mivel nincs token).

**Egyszeri beállítás (tulajdonos):** npmjs.com → `omniroute` csomag → Settings → _Trusted
Publisher_ → GitHub: tulajdonos `diegosouzapw`, tároló `OmniRoute`, munkafolyamat `npm-publish.yml`
(környezet: nincs). Amíg ez nincs beállítva, az automatikus lépés `ENEEDAUTH` hibával meghiúsul:
indítsd újra `publish_mode=staged` (lásd alább) vagy `direct` értékkel.

### Előkészített közzététel (kérésre — `publish_mode=staged`)

Az npm-publish munkafolyamat többé nem tesz közzé közvetlenül: elindítja a csomagolt tarballt
(`check:pack-boot`), majd futtatja az `npm stage publish` parancsot — a pontos bájtok a
regisztrációs adatbázisban várakoznak, és **nem telepíthetők**, amíg a tulajdonos jóvá nem hagyja őket. Az emberi 2FA-ellenőrzési pont
a bizonyítás UTÁNRA került, nem elé.

**Tulajdonosi folyamat, miután a munkafolyamat zöldre vált:**

1. `npm stage list omniroute` — keresd meg az előkészítés azonosítóját (a munkafolyamat összefoglalója is megjeleníti).
2. Ellenőrizd az előkészített bájtokat (ajánlott): `npm stage download <id>`, majd telepítsd a
   letöltött tarballt egy ideiglenes előtag alá, és indítsd el (az `npm run check:pack-boot` ugyanezt a
   csomagolás→telepítés→indítás ellenőrzést automatizálja a CI-ben).
3. `npm stage approve <id>` — a 2FA-kérés MAGA a közzététel. Az `npm stage reject <id>` elveti az előkészítést.
4. Közzététel utáni védőháló: a közzététel utáni ellenőrző (a v3.8.49 terv WS1.4 része) tiszta
   konténerben telepíti a közzétett verziót a nyilvános regisztrációs adatbázisból, majd elindítja.

**Vészhelyzeti tartalékmegoldás:** a `workflow_dispatch` `publish_mode=direct` beállítással visszaállítja a
korábbi, azonnali `npm publish` működést (csak akkor használd, ha maga az előkészítés hibásan működik; dokumentáld az okát).

**Egyszeri megerősítés (tulajdonos, npmjs.com):** állítsd be az `omniroute` Trusted Publisherét
csak előkészítési módra, hogy egy kiszivárgott, hosszú élettartamú token sehonnan se futtathasson közvetlenül `npm publish`
parancsot — a CI csak előkészíthet; kizárólag a tulajdonos 2FA-ja engedheti ki a kiadást.

**Hibás műtermék esetén követendő eljárás (változatlan):** alapértelmezett első lépésként
`npm deprecate omniroute@<bad> "<reason> — use <fixed>"` (percek alatt végrehajtható, visszafordítható);
az `npm unpublish` csak a 72 órás/nincs-függő-csomag időablakon belül használható, és soha nem lehet az első lépés.
Docker: soha ne írj felül verziócímkét — a visszaállítás a `latest` átirányítása az utolsó megfelelő digestre.

**Docker Hub `latest` (minden stabil SemVer-közzétételnél kötelező):** a
`docker-publish` munkafolyamatnak **mind** az `X.Y.Z`, **mind pedig — ha a
`should-promote-latest.sh` szerint ez a legmagasabb stabil SemVer — a `:latest`
címkét ugyanahhoz a **digesthez** kell rendelnie. A feladat után: a Hub `latest` digestje megegyezik az új
SemVer digestjével, és a `last_updated` értéke frissült. Ne hagyd a `:latest` címkét egy régebbi
builden, miközben a kiadási megjegyzések olyan javításokról szólnak, amelyek csak a gitben találhatók meg. A Compose
gyorsindítások a `:latest` címkét használják; a GitOps-konfigurációknak továbbra is az `X.Y.Z` verziót kell rögzíteniük. Lásd:
[Docker kiadási csatornák](../guides/DOCKER_GUIDE.md#release-channels) és #10317.

## Gyorsított hotfix-sáv (`hotfix` címke)

A `hotfix` címkével ellátott PR kihagyja a nagy CI-mátrixot (9 részre osztott E2E, lefedettségi ratchet,
quality-gate, quality-extended), és megtartja a gyors, nagy jelértékű ellenőrzéseket: build,
egységteszt-részek, integrációs tesztek, vitest, lint/typecheck, docs-sync, `check:pack-artifact`,
valamint a tarball indulási füsttesztje (`check:pack-boot`). Cél: zöld állapot ≤15 perc alatt a ~33 perc helyett.

**Belépési szabályzat — mind a négy feltétel kötelező (a Chromium/VS Code/Node vészhelyzeti sávjai alapján):**

1. **Súlyosság**: a produkciós rendszer működésképtelen — egy közzétett artifact induláskor összeomlik / biztonsági javítás szükséges / a kiadás minden felhasználója érintett. A „fontos” nem egyenlő a „működésképtelennel”.
2. **Jogosultság**: kizárólag a repository tulajdonosa alkalmazhatja a `hotfix` címkét. A címke MAGA a jóváhagyás — kampány-PR-en soha nem alkalmazható saját kezdeményezésre.
3. **Bizonyíték**: a PR törzse hivatkozik az előző, teljesen zöld nagy futtatásra (arra a tesztcsomagra, amelyet a kihagyott jobok újra ellenőriznének), valamint a javítás saját, előbb sikertelen, majd sikeres tesztjére.
4. **Hatókör**: kizárólag cherry-pick — csak a minimális javítás, refaktorálás és kapcsolódó extra módosítások nélkül.

A kihagyott lefedettségi/ratchet felületet a release ágon következő teljes futtatás újra ellenőrzi (folyamatosan zöld release) — a sáv csak a VÁRAKOZÁST hagyja ki, az ellenőrzést soha.
A kizárólag teszteket érintő diffek (minden fájl a `tests/` alatt, egyik sem a `tests/e2e/` alatt) automatikusan kihagyják az E2E-mátrixot, címke nélkül is.

## Részletes ellenőrzőlista

### Kiadás előtt

- [ ] A kiadáshoz szánt összes PR be van olvasztva a `release/vX.Y.0` ágba
- [ ] Az ehhez a verzióhoz tartozó összes nyitott Linear-/issue-elem le van zárva, vagy át van helyezve a következő mérföldkőhöz
- [ ] A CI zöld a `release/vX.Y.0` ágon
- [ ] Nincsenek `TODO(release)` jelölők a kódban: `grep -r "TODO(release)" src/ open-sse/`
- [ ] A Docker alap-image naprakész (jelenleg `node:24.15.0-trixie-slim`)

### Verzió és változásnapló

- [ ] Futtasd a `/version-bump-cc <patch|minor|major>` parancsot (Claude Code skill)
  - Frissíti a verziót a `package.json` és az `electron/package.json` fájlban
  - Újragenerálja a `CHANGELOG.md` fájlt az utolsó címke óta létrejött git commitokból
  - Frissíti a README.md jelvényeit
- [ ] Manuálisan ellenőrizd a CHANGELOG.md fájlt, és szükség esetén tisztázd a commitüzeneteket
- [ ] Győződj meg arról, hogy a `CHANGELOG.md` legújabb semver-szakasza megegyezik a `package.json` verziójával
- [ ] A `## [Unreleased]` maradjon a változásnapló első szakasza a közelgő munkák számára
- [ ] Frissítsd a `docs/openapi.yaml` fájlt → az `info.version` értékének meg kell egyeznie a `package.json` verziójával

### Kódminőség

- [ ] `npm run lint` — 0 hiba (a figyelmeztetések már korábban is léteztek)
- [ ] `npm run typecheck:core` — hibamentes
- [ ] `npm run typecheck:noimplicit:core` — hibamentes (szigorú)
- [ ] `npm run check:cycles` — nincs körkörös függőség
- [ ] `npm run check:any-budget:t11` — a kereten belül
- [ ] `npm run check:route-validation:t06` — hibamentes
- [ ] `npm run check:node-runtime` — a támogatott futtatókörnyezet alsó korlátja teljesül (`>=22.22.2 <23`, `>=24.0.0 <27`, a `src/shared/utils/nodeRuntimeSupport.ts` fájlban lévő `SUPPORTED_NODE_RANGE` szerint; összhangban a `package.json` `engines` mezőjével)

### Tesztelés

- [ ] `npm run test:unit` — sikeres
- [ ] `npm run test:vitest` — sikeres (MCP-szerver, autoCombo, cache)
- [ ] `npm run test:coverage` — a 60/60/60/60 küszöb teljesül (utasítások/sorok/függvények/elágazások)
- [ ] `npm run test:integration` — sikeres (ha a módosítások érintik a DB-t / handlereket)
- [ ] `npm run test:combo:matrix` — sikeres (kombinációs stratégiák mátrixa: determinisztikusan igazolja mind a 19 nyilvános útválasztási stratégia kiválasztási döntéseit; a kombinációs útválasztás, a stratégiafeloldás vagy a tartaléklogika módosításakor futtatandó)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **opcionális/manuális** (kapuval védett, valódi upstreamet használó füstteszt; csak olvasható DB-pillanatképet tölt be a `root@192.168.0.15` VPS-ről; valódi szolgáltatókat hív meg, krediteket használ; CI-ben soha nem fut; a kapu nélkül szabályosan kimarad)
- [ ] `npm run test:combo:live:vps` — **opcionális/manuális** (3. fázisú élő VPS-füstteszt: 7 HTTP-forgatókönyv az élő `.15` szerver ellen, közvetlen Node ESM használatával; `ssh root@192.168.0.15` szükséges; kizárólag `__live_test__*` kombinációkat hoz létre és töröl; valódi szolgáltatókat hív meg; CI-ben soha nem fut)
- [ ] `npm run test:e2e` — sikeres (UI-módosítások)
- [ ] `npm run test:protocols:e2e` — sikeres (MCP-/A2A-módosítások)
- [ ] `npm run test:ecosystem` — sikeres

### Hookok (Husky által ellenőrizve)

A Husky hookok a `.husky/` könyvtárban találhatók, és automatikusan lefutnak a git műveletek során.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** gyors, determinisztikus ellenőrzések — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktiválva: 2026-06-13). Szándékosan nem tartalmazza a `test:unit` tesztet (lassú; a CI `test-unit` jobja lefedi).
  - A release ágak pusholása előtt manuálisan futtasd az `npm run test:unit` parancsot.

Ha egy hook sikertelen: javítsd a kiváltó problémát, és ne kerüld meg a `--no-verify` használatával.

### Conventional Commits

Minden kiadásba kerülő commitnak a `type(scope): subject` formátumot kell követnie.

**Érvényes típusok:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Érvényes hatókörök:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Visszamenőleg nem kompatibilis módosítások: adj hozzá `BREAKING CHANGE:` láblécet vagy `!` jelet a hatókör után (például `feat(api)!: drop /v0`).

### Dokumentáció

- [ ] Az `npm run check:docs-sync` sikeresen lefut (a pre-commit automatikusan futtatja)
- [ ] Az `npm run check:docs-all` sikeresen lefut (összesített ellenőrzés: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] Az `npm run check:env-doc-sync` 0-s kilépési kóddal fejeződik be — a kód ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` környezeti szerződés konzisztens
- [ ] Az `npm run check:doc-links` 0-s kilépési kóddal fejeződik be — az átszervezés után nincsenek hibás belső Markdown-hivatkozások
- [ ] A `docs/architecture/ARCHITECTURE.md` áttekintve a tárolási és futtatókörnyezeti eltérések szempontjából
- [ ] A `docs/guides/TROUBLESHOOTING.md` áttekintve a környezeti változókat és az üzemeltetést érintő eltérések szempontjából
- [ ] Ha a `.env.example` megváltozott: a `docs/reference/ENVIRONMENT.md` frissítve
- [ ] Ha az új funkció felhasználói felülettel rendelkezik: a `docs/guides/USER_GUIDE.md` megemlíti
- [ ] Ha az új funkció API-val rendelkezik: a `docs/reference/API_REFERENCE.md` és a `docs/openapi.yaml` frissítve
- [ ] Ha az új funkció egy modul: létezik hozzá külön `docs/<MODULE>.md`
- [ ] Ha visszafelé nem kompatibilis változás történt: a `docs/guides/TROUBLESHOOTING.md` tartalmaz migrációs megjegyzést

### i18n

- [ ] Az `npm run i18n:check` 0-s kilépési kóddal fejeződik be — a fordítási állapot (`.i18n-state.json`) szinkronban van a forrásdokumentációval (szigorú módban nincsenek eltérő források; az utolsó pillanatban végzett dokumentációs módosítások esetén a figyelmeztetési mód jelzése elfogadható, de címkézés előtt az eredménynek 0-nak kell lennie)
- [ ] Az `npm run i18n:check-ui-coverage` 0-s kilépési kóddal fejeződik be — minden felhasználóifelület-lokalizáció eléri vagy meghaladja a 80%-os lefedettségi küszöböt
- [ ] Az `npm run i18n:sync-ui:dry` mind a 42 lokalizációban 0 hiányzó kulcsot jelent
- [ ] Ha az angol nyelvű forrásdokumentáció megváltozott, címkézés előtt futtasd az `npm run i18n:run` parancsot (ehhez az `.env` fájlban szükséges az `OMNIROUTE_TRANSLATION_API_KEY`)
- [ ] A fordítási hozzájárulások kisebb változások esetén elhalaszthatók a következő kiadásra (kövesd nyomon a CHANGELOG-ban)

### Adatbázis-migrációk

- [ ] Ha a `src/lib/db/migrations/` új fájlokat tartalmaz:
  - [ ] Minden migráció idempotens (`CREATE TABLE IF NOT EXISTS` stb.)
  - [ ] A migrációk tranzakciókba vannak csomagolva
  - [ ] A számozás helyes (nincsenek hiányok a sorrendben)
- [ ] Tesztelés friss telepítésen: töröld a `~/.omniroute/omniroute.db` fájlt, majd futtasd az `npm run dev` parancsot
- [ ] Tesztelés meglévő telepítésen: készíts biztonsági másolatot az adatbázisról, futtasd a migrációt, majd ellenőrizd a sémát
- [ ] A WAL-fájlok (`-wal`, `-shm`) megfelelően kezelve vannak, ha a migráció újraírja a táblákat

### Szolgáltatókatalógus (Zod által validált)

- [ ] A `src/shared/constants/providers.ts` Zod-sémája betöltéskor érvényes
  - [ ] Minden szolgáltató rendelkezik a kötelező mezőkkel (`id`, `label`, `kind` stb.)
  - [ ] Az új ingyenes szolgáltatókhoz meg van adva a `freeNote`
  - [ ] Az OAuth-szolgáltatók `oauthConfig` konfigurációja regisztrálva van a `src/lib/oauth/constants/oauth.ts` fájlban
- [ ] Ha új szolgáltató lett hozzáadva: a megfelelő végrehajtó megtalálható az `open-sse/executors/` könyvtárban
- [ ] Ha a formátum nem OpenAI-formátumú: a fordító megtalálható az `open-sse/translator/` könyvtárban
- [ ] A modellek regisztrálva vannak az `open-sse/config/providerRegistry.ts` fájlban
- [ ] A `tests/unit/` egységtesztjei lefedik a szolgáltatók osztályozását és az útválasztást

### Asztali alkalmazás (Electron)

Ha az `electron/` megváltozott:

- [ ] Az `npm run electron:smoke:packaged` sikeresen lefut
- [ ] A buildek tesztelve vannak legalább az alábbiak egyikére: `:win`, `:mac`, `:linux`
- [ ] A kódaláírási tanúsítványok nem jártak le (ha van aláírás)
- [ ] Az `electron/package.json` verziója megegyezik a gyökérszintű `package.json` verziójával
- [ ] Automatikus frissítési csatorna mutatója frissítve, ha a kiadás a `stable` csatornára történik

### Buildelési elrendezés

A repository három különálló kimeneti könyvtárat használ — soha ne keverd össze őket:

| Könyvtár  | Rendeltetés                                                     | Verziókövetett?  |
| --------- | --------------------------------------------------------------- | ---------------- |
| `src/`    | Alkalmazás forráskódja (TypeScript / TSX)                       | Igen             |
| `.build/` | Build köztes fájljai — a `next build` kimenete (`distDir`)      | Nem (gitignored) |
| `dist/`   | Terjeszthető npm-csomag — az `assembleStandalone` állítja össze | Nem (gitignored) |

> **Üzemeltetői megjegyzés:** a távoli VPS lemezképkönyvtára továbbra is `/usr/lib/node_modules/omniroute/app/`.
> Csak a repositoryn **belüli** buildkimenet került át (`app/` → `dist/`). A telepítési készségek rsync használatával
> másolják a `dist/` tartalmát a távoli `app/` könyvtárba — nincs szükség a VPS elérési útjainak módosítására.

**Egyszeri buildelési folyamat:**

```
npm run build:release
  └─ rm -rf .build dist          (tisztítás)
  └─ next build → .build/next/   (köztes fájlok)
  └─ assembleStandalone          (az önálló csomagot, a statikus és nyilvános fájlokat, valamint a natív komponenseket a dist/ könyvtárba másolja)
  └─ writes dist/BUILD_SHA       (HEAD őrérték)
```

Telepítéshez NE futtasd az `npm run build`, majd külön az `npm run build:cli` parancsot — használd
az `npm run build:release` parancsot, amely egyetlen parancsban végez tiszta újrabuildelést és hozza létre az őrértéket.

### Műtermék validálása

- [ ] Az `npm run build:release` sikeresen lefut, és a `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Az `npm run check:pack-artifact` tiszta eredményt ad — nincs `app.__qa_backup`, `scripts/scratch`, `package-lock.json` vagy más helyi maradvány
- [ ] A build után létezik a `dist/server.js`

### Címkézés és kiadás

- [ ] Futtasd a `/generate-release-cc` parancsot (Claude Code-készség):
  - Létrehozza a `vX.Y.Z` címkét
  - Feltölti a címkét és az ágat
  - Létrehozza a GitHub-kiadást a változásnapló tartalmával
  - Csatolja az Electron-telepítőket (ha elkészültek)
- [ ] Vagy manuálisan:
  ```bash
  git tag -a vX.Y.Z -m "Kiadás vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Telepítés

A telepítési készségek az egyszerűsített rsync-folyamatot használják — nincs `npm pack`, nincs `npm i -g`:

- [ ] Használd a célkörnyezetnek megfelelő telepítési készséget:
  - `/deploy-vps-local-cc` — helyi VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — mindkettő
- [ ] Telepítés előtt ellenőrizd, hogy a `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] A buildet olyan helyen kell futtatni, ahol a `node_modules` valódi (fő munkapéldány vagy `npm ci` használatával előkészített worktree — NEM szimbolikus hivatkozással csatolt worktree)
- [ ] A telepített példány gyors ellenőrzése:
  - Nyisd meg a `/dashboard/health` útvonalat → ellenőrizd, hogy a verziószöveg megegyezik a kiadással
  - Küldj egy `/v1/chat/completions` kérést egy ismert szolgáltatónak
  - Ellenőrizd, hogy az `/api/monitoring/health` `CLOSED` állapotú megszakítókat ad vissza
  - Győződj meg róla, hogy az MCP-átvitelek válaszolnak (`/mcp` HTTP, `/mcp-sse` SSE)

### Kiadás után

- [ ] Futtassa a `/capture-release-evidences-cc` parancsot (Claude Code-képesség)
  - WebP-képernyőképeket/-felvételeket készít az új funkciókról
  - Csatolja őket a kiadási megjegyzésekhez / blogbejegyzéshez
- [ ] Frissítse a GitHub Discussions / Discord felületeket a kiadási bejelentéssel
- [ ] Nyisson mérföldkövet a következő verzióhoz
- [ ] Kritikus esetben: rögzítse a beszélgetést, vagy tegye közzé a `news.json` fájlban az alkalmazáson belüli szalagcímhez

### A Radar nyilvános bevezetési ellenőrzőkapuja

A Radar bejelentése szándékosan `active: false` beállítással lett véglegesítve. Az aktiválás külön
módosítás, amelyre csak az alábbi elemek mindegyikének igazolása után kerülhet sor:

- [ ] Az összes egymásra épülő Radar PR egyesítve van, és a release-tip CI sikeresen lefutott
- [ ] Telepítse és végezzen gyors működési tesztet az OSS Radar-útvonalakon úgy, hogy a `RADAR_ENABLED` alapértelmezés szerint továbbra is ki legyen kapcsolva
- [ ] Végezzen gyors működési tesztet a `GET /planos`, `/termos`, `/privacidade` és `/reembolso` útvonalakon a megnevezett Radar-gazdagépen
- [ ] Rögzítse az üzemeltető személyazonosságát/kapcsolattartási adatait/címét, valamint a tulajdonos által jóváhagyott jogi felülvizsgálatot a privát szolgáltatásban
- [ ] Kizárólag tesztmódban próbálja ki a Stripe Checkout folyamatot és az aláírt webhookot
- [ ] Próbáljon ki egy titkosított tranzakciós e-mail-kézbesítést a jóváhagyott feladóval/domainnel
- [ ] Igazolja a biztonsági mentés visszaállítását és egy felügyelt, költségkerettel korlátozott kutatási futtatást
- [ ] Hagyja jóvá a BRL/PIX felülvizsgálati szabályzatot, mielőtt adományigazolásokat fogadna el
- [ ] Csak az előző ellenőrzőkapuk teljesítése után engedélyezze a nyilvános Checkout folyamatot, majd aktiválja az új `news.json`-azonosítót
- [ ] Ellenőrizze, hogy a kezdőlapi szalagcím lokalizált szöveget használ-e, és hogy egy új azonosító ismét megjelenik-e egy régebbi azonosító bezárása után

## Beágyazott szolgáltatások füsttesztje (v3.8.4+)

A beágyazott szolgáltatásokat érintő módosításokat tartalmazó kiadások közzététele előtt ellenőrizze a következőket:

### Indítás friss adatbázissal (észleli a migrációs ütközéseket — a v3.8.4 gyorsjavítása után hozzáadva)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — várjon 10 másodpercet az indulásra
- [ ] A `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` eredménye `"9router"` (NEM 404, NEM 500). Ez megerősíti, hogy a `071_services.sql` migráció lefutott, és a sor létrejött.
- [ ] A `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` 3 sort ad vissza.
- [ ] A `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` 2 sort ad vissza (ellenőrzi, hogy a `070_webhooks_kind_metadata.sql` alkalmazva lett).
- [ ] A `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` sikeresen lefut — védelmet nyújt a jövőbeli ütközésekkel szemben.

### 9Router

- [ ] A `POST /api/services/9router/install` 2 percen belül 200-as választ ad vissza, benne az `installedVersion` értékkel
- [ ] A `POST /api/services/9router/start` 30 másodpercen belül 200-as választ és `state: "running"` állapotot ad vissza
- [ ] A `GET /api/services/9router/status` `health: "healthy"` állapotot jelez
- [ ] A `POST /v1/chat/completions` kérés `"model": "9router/auto/..."` értékkel 200-as választ ad vissza (végpontok közötti útválasztás a 9Routeren keresztül)
- [ ] A `GET /dashboard/providers/services/9router/embed/dashboard` megjeleníti a 9Router natív felhasználói felületét a proxyn belül (nem közvetlen `127.0.0.1:port` iframe-ben)
- [ ] A `POST /api/services/9router/rotate-key` `{ keyRotated: true }` értéket ad vissza, és a szolgáltatás problémamentesen újraindul
- [ ] A `POST /api/services/9router/stop` 200-as választ és `state: "stopped"` állapotot ad vissza
- [ ] A `GET /api/services/9router/logs?tail=50` SSE-adatfolyamot ad vissza, benne egy friss sorokat tartalmazó `snapshot` eseménnyel
- [ ] A `npm` nélküli PATH környezetben végzett telepítés 500-as választ ad vissza közérthető, veremkövetést nem tartalmazó hibaüzenettel

### CLIProxyAPI

- [ ] A `POST /api/services/cliproxy/install` 2 percen belül 200-as választ ad vissza
- [ ] A `POST /api/services/cliproxy/start` 30 másodpercen belül 200-as választ és `state: "running"` állapotot ad vissza
- [ ] A `GET /api/services/cliproxy/status` `health: "healthy"` állapotot jelez
- [ ] A `POST /api/services/cliproxy/stop` 200-as választ és `state: "stopped"` állapotot ad vissza
- [ ] A `GET /api/services/cliproxy/logs?tail=50` SSE-adatfolyamot ad vissza

### Biztonsági regresszió

- [ ] A `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` `403 LOCAL_ONLY` választ ad vissza
- [ ] A `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` `403 LOCAL_ONLY` választ ad vissza
- [ ] Az `/api/services/*` hibaválaszai nem tartalmaznak `err.stack` értéket vagy abszolút fájlútvonalakat

## v3.8.0+ ellenőrzések

Bármely v3.8.x kiadás közzététele előtt ellenőrizze ezeket a további elemeket:

- [ ] Az `omniroute --tray` elindul macOS rendszeren (a systray2 telepítve van a `~/.omniroute/runtime/` könyvtárba)
- [ ] Az `omniroute --tray` elindul Linux rendszeren (DISPLAY szükséges; kulturált hibaüzenet, ha nincs beállítva)
- [ ] Az `omniroute --tray` elindul Windows rendszeren (PowerShell NotifyIcon, további binárisok nélkül)
- [ ] Az `omniroute config tray enable` létrehoz egy automatikus indítási bejegyzést; a letiltás eltávolítja azt
- [ ] Az `npm install -g omniroute@<this-version>` végzetes kilépés nélkül futtatja a postinstall lépést
- [ ] A frissítési folyamat megtartja az opcionális függőségeket: az `omniroute update --apply` és az automatikus frissítő
      az `npm install -g … --include=optional` parancsot futtatja, így az `optionalDependencies` függőségei (better-sqlite3,
      keytar, tls-client, valamint a llmlingua SLM-verem: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) megmaradnak egy frissítés után. Az ultra `modelPath` SLM-szintnek szüksége van továbbá a
      tinybert modellre, amely az első használatkor automatikusan letöltődik a `${DATA_DIR}/models/llmlingua` könyvtárba. A postinstall
      (`scripts/build/colocateOptionals.mjs`) ezután az SLM opcionális függőségi lezárását a
      `dist/node_modules` könyvtárba helyezi, így a worker EGYETLEN `@huggingface/transformers` ^4.2.0
      példányt old fel — az önálló nyomkövetési csomag csak a transformers csomagot tartalmazza, a dinamikusan importált
      opcionális függőségeket nem, ezért enélkül a worker a gyökérszintű transformers csomaggal töltené be a llmlingua-2 csomagot,
      és az SLM-szint észrevétlenül nyitott működésre váltana.
- [ ] Az `omniroute status` `.env` nélkül is működik (CLI-tokenútvonal, csak visszacsatolási interfészen)
- [ ] A `curl http://localhost:20128/api/shutdown` 401-es választ ad vissza (mindig védett útvonal)
- [ ] A `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` 401-es választ ad vissza (visszacsatolási védelem)
- [ ] Az SQLite futtatókörnyezete az első futtatáskor `bundled` értékre oldódik fel (a csomagolt bináris érvényes az adott platformon)
- [ ] Az SQLite futtatókörnyezete `runtime` értékre vált vissza, ha a `node_modules/better-sqlite3` törölve van
- [ ] Az intelligens MCP-szűrő tömöríti a `playwright-mcp browser_snapshot` valós kimenetét (≥50%-os csökkentés)
- [ ] Mind a 10 `skills/omniroute*/SKILL.md` fájl nyilvánosan lekérhető nyers GitHub URL-en keresztül
- [ ] A bevezető varázsló friss telepítéskor megjeleníti a „Hogyan működik” szintbemutató lépést
- [ ] A kezdőoldali irányítópult szintlefedettségi widgetje megjeleníti a konfigurált és aktív elemek számát

---

## Visszaállítás

Ha a kiadás kritikus hibát tartalmaz:

1. `gh release edit vX.Y.Z --prerelease` (nem legfrissebbként jelöli meg)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (csak akkor, ha a felhasználók még nem kezdték használni)
3. Vagy: gyorsjavítás a `release/vX.Y.0` ágon → javító kiadás `vX.Y.(Z+1)`
4. Azonnal tájékoztass a GitHub Discussions felületén és a Discordon

## Szigorú szabályok

- Soha ne véglegesíts közvetlenül a `main` ágra
- Soha ne használd a `git push --force` parancsot a `main` vagy `release/*` ágakon
- Soha ne hagyd ki a Husky-hookokat (`--no-verify`)
- Soha ne véglegesíts titkos adatokat, hitelesítő adatokat vagy `.env`-fájlokat
- A lefedettségnek ≥60/60/60/60 szinten kell maradnia (utasítások/sorok/függvények/elágazások)
- Mindig adj hozzá vagy frissíts teszteket, amikor a `src/`, `open-sse/`, `electron/` vagy `bin/` könyvtárban lévő éles kódot módosítod

## Automatizált szinkronizálási ellenőrzés

PR megnyitása előtt futtasd helyileg a dokumentáció szinkronizálási ellenőrzését:

```bash
npm run check:docs-sync
```

A CI szintén futtatja ezt az ellenőrzést a `.github/workflows/ci.yml` fájlban (lintelési feladat).
