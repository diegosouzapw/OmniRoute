# Release-Green: keeping the queue and release branch green (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Težava, ki jo to rešuje

**Celoten nabor preverjanj** (`.github/workflows/ci.yml` — razdeljeni testi enot, vitest, ratchets,
`package-artifact`, SonarQube, E2E) se izvaja **samo na PR-ju za izdajo** (PR → `main`). PR-ji, usmerjeni
v `release/**`, prejmejo **hitra preverjanja** (`quality.yml`: testi, na katere vpliva TIA, + preverjanje tipov + lint),
pri spremembah kode pa tudi **svetovalno** produkcijsko gradnjo. Posledica: napake, ki se pojavijo samo pri izdaji,
se lahko na veji za izdajo še naprej neopazno kopičijo in ob času izdaje **izbruhnejo v plasteh po približno 40 min**,
ena za drugo.

Družina »release-green« obstaja zato, da te napake **predvidi** — kadar koli lokalno oziroma zunaj postopka izdaje
preveri ekvivalent celotnega nabora preverjanj, tako da je PR za izdajo zelen že ob prvem
izvajanju CI-ja.

> **Načelo, o katerem se ni mogoče pogajati:** nič od tega ne blokira sodelujočega. Ne dodajamo zahtevanega
> preverjanja, zaradi katerega bi njegov PR spodletel. **Odklon** (ratchets) mora ob izdaji na novo umeriti vzdrževalec —
> nikoli ni skrb sodelujočega. Noben del ne **zapre** PR-ja (kraja zaslug) niti
> ne **oslabi** testa, da bi ta uspešno prestal preverjanje.

## Družina (4 deli) — in kako se vsak izvaja neodvisno

| Del                                                                       | Kaj je                                                                                          | Kdaj ga zagnati                                                    | Obseg                                       |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------- |
| **`/green-prs`** (rešitev A)                                              | Pregled **čakalne vrste odprtih PR-jev** na zahtevo vzdrževalca                                 | **Neodvisno, periodično** — in zlasti **pred** `/generate-release` | Celotna čakalna vrsta PR-jev → `release/**` |
| **`/validate-release-green`** (rešitev C — `npm run check:release-green`) | Mehanizem za preverjanje: poustvari celoten nabor preverjanj za vejo ALI kandidata za združitev | Neodvisno, kadar koli                                              | Določena veja ali PR za združitev           |
| **`/babysit <PR#>`**                                                      | Vodi **dejanski CI** enega PR-ja do zelenega stanja                                             | Neodvisno, za vsak PR posebej                                      | Posamezen PR                                |
| **`nightly-release-green.yml`** (rešitev D)                               | Avtomatiziran nočni delovni tok; ob KRITIČNI napaki odpre issue                                 | Samodejno (cron)                                                   | Aktivna veja za izdajo                      |

**Kratek odgovor na vprašanje »Ali je to namenjeno samo izdajam?«:** **ne.** `/green-prs` je bil zasnovan za
**periodično izvajanje med izdajami**. Neodvisno izvajanje je običajen način uporabe — izdaja je le
trenutek, ko njegovo izvajanje prinese največjo vrednost.

## Svetovalna gradnja od PR-ja do izdaje

`quality.yml` zdaj vključuje `Build (advisory)` za nedokončne PR-je s kodo in veje čakalne vrste Mergify.
Posnema produkcijski postopek gradnje iz `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` in `npm run build` z `OMNIROUTE_USE_TURBOPACK=1`. Namenoma
ne naloži artefakta gradnje, ker ga v tem delovnem toku ne uporablja nobeno nadaljnje opravilo za kakovost.
Po enem tednu stabilnih izvajanj PR-jev za izdajo odstranite `continue-on-error`, da bo signal postal
blokirna kontrola na poti od PR-ja do izdaje.

## Rešitev C — `npm run check:release-green` (mehanizem)

Ponovi preverjanje, enakovredno izdaji, na trenutnem delovnem drevesu in razvrsti vsako napako:

- **HARD** (preverjanje tipov, napake lintanja, unit, vitest, db-rules, public-creds, izbirni
  `package-artifact`) → **dejanska napaka**; `exit 1`. Odpravljena na izvorni veji (TDD, pravilo št. 18).
- **DRIFT** (**opozorila** eslint, kognitivna kompleksnost, velikost datotek) → odmik praga, nakopičen v
  ciklu, **za katerega sodelujoči ni odgovoren**; ta je samo sporočen in ga **vzdrževalec ob izdaji
  ponovno določi kot izhodišče**. DRIFT **nikoli** ne spremeni izhodne kode — zato nikogar ne blokira.

```bash
npm run check:release-green                 # trenutna veja (delovno drevo)
node scripts/quality/validate-release-green.mjs --json   # strukturiran izhod
node scripts/quality/validate-release-green.mjs --quick  # preskoči unit+vitest (samo odmik+preverjanje tipov+lintanje)
node scripts/quality/validate-release-green.mjs --with-build  # vključuje package-artifact (počasi)
```

Samo diagnosticira in **poroča** (brez samodejnih popravkov). Orkestracija odpravljanja težav do uspešnega stanja je v
`/green-prs` in `/review-prs`.

## Rešitev A — `/green-prs` (pregled čakalne vrste)

Postopek (povzetek — za podrobnosti glejte veščino `green-prs`):

1. **Popišite** čakalno vrsto odprtih PR-jev za aktivno vejo izdaje.
2. **Razvrstite** vsak PR (primeren / vreden zavrnitve / zahteva avtorja) — PR-ji za zavrnitev ali tisti, ki zahtevajo avtorja, so
   **sporočeni, ne zaprti** (odloči avtor).
3. Za vsak primeren PR v **izoliranem delovnem drevesu** (pravilo št. 19) uskladite PR z vrhom veje izdaje in zaženite
   `npm run check:release-green`:
   - **HARD** → odpravite **na veji sodelujočega** s soavtorstvom (ohrani avtorjevo stanje »Merged«),
     nato ponavljajte izvajanje, dokler niso odpravljene vse napake HARD.
   - **DRIFT** → pustite ga; ob izdaji bo ponovno določen kot izhodišče.
4. **Pripravite** tabelo PR × (razsodba, napake HARD, odpravljeno?, DRIFT, zdaj pripravljeno za izdajo?).

Čakalno vrsto lahko **pripravi** brez združevanja; združuje samo ob izrecni zahtevi — in nikoli ne zapre PR-ja.

## Priporočena pogostost

- **`/green-prs` izvajajte redno** (npr. tedensko) in **vedno pred
  `/generate-release`**.
- Ohranite **`nightly-release-green.yml`** (rešitev D) kot neprekinjen signal: ko odpre
  težavo zaradi napake HARD, je čas za pregled.
- Uporabite **`/validate-release-green`** po potrebi za preverjanje veje ali določenega kandidata za združitev.
- Uporabite **`/babysit <PR#>`**, kadar je treba določen PR pripeljati do uspešnega stanja v aktivnem CI-ju.

## Povezava z izdajo

- `/generate-release` pokliče preverjanje v **0. fazi (predhodno preverjanje)**: ponovno določi izhodišče za DRIFT in odpravi
  HARD, preden odpre PR za izdajo.
- `/review-prs` uporabi kontrolo pripravljenosti za izdajo pri koraku odločitve o združitvi (uspešno stanje pred združitvijo).

Cilj vseh delov je enak: **uspešen PR za izdajo že ob prvem izvajanju CI-ja**, namesto prebijanja
skozi napake v 40-minutnih slojih na dan izdaje.
