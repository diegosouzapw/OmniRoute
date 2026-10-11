# Merge Queue & Manual Merge-Train Runbook (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Nuo v3.8.49 (kokybės / spartos plano WS3.2/WS3.4) numatytasis peržiūrėtų PR
sujungimo į `release/vX.Y.Z` kelias yra **„Mergify“ sujungimo eilė** (`.mergify.yml`);
toliau aprašytas **rankinis sujungimo traukinys** yra ATSARGINIS variantas — naudojamas incidentų,
leidimo įšaldymo metu arba jei kada nors pasikeistų „Mergify“ atvirojo kodo planas.

## Numatytasis kelias: „Mergify“ eilė

1. PR peržiūrimas / patvirtinamas kampanijų ir gauna savininko patvirtinimą prieš sujungimą ⭐
   kontroliniame etape (ataskaita + kiekvieno elemento sprendimas — žr. `/merge-prs` 0.75 veiksmą).
2. Savininkas (arba sesija, vykdanti savininko sprendimą) pritaiko **`queue`**
   žymą. Ši žyma YRA sujungimo patvirtinimas; „Mergify“ tik jį įvykdo.
3. „Mergify“ tikrina eilėje esančius PR **nuosekliai** (po vieną) pagal greituosius
   kontrolinius etapus ir sujungia („squash“ būdu). Paketinis apdorojimas ir automatinė bisekcija priklauso mokamam „Mergify“ planui
   („Cannot use Merge Queue batch“ nemokamame plane, #7220), todėl `.mergify.yml` nenustato
   `batch_size`; paketinis apdorojimas paliekamas toliau aprašytam rankiniam sujungimo konvejeriui. PR, kurio
   patikros vis dar nebaigtos pasibaigus `checks_timeout` (240 min. = 2× išmatuotas `quality.yml`
   p95), pašalinamas iš eilės, užuot sustabdžius visą eilę.
4. Po sujungimo nuolatinė leidimo tinkamumo darbo eiga patikrina naują viršūnę po „push“
   ir sukuria priskyrimo problemą, jei derinys sukėlė regresiją (automatinis atšaukimas niekada nevykdomas).

Apsaugos priemonės (atitinka `CLAUDE.md` griežtąsias taisykles #21/#22):

- **Aktyvus leidimo įšaldymas** → NEŽYMĖKITE PR, nukreiptų į įšaldytą šaką; pirmiausia
  nukreipkite juos į aktyvią `release/vX+1`.
- **Kitos sesijos vykdomas PR** → niekada jo nežymėkite; tik jį valdanti sesija įtraukia
  savo darbą į eilę.
- Skirtumai, apimantys tik testus, ir `hotfix` žyma pažymėti PR jau vykdo sumažintą CI patikrų rinkinį (žr.
  `RELEASE_CHECKLIST.md` → „Hotfix Fast-Lane“); eilės sąlygos priima bet kokį
  faktiškai vykdytą patikrų rinkinį (`#check-failure=0` + `#check-pending=0`).

## Atsarginis variantas: rankinis sujungimo traukinys

Naudojamas, kai eilė nepasiekiama. Taip formalizuojama praktika, per kurią v3.8.47 ciklo metu
per vieną dieną buvo apdoroti 33 PR:

1. **Sudarykite grupę** (~10–30 peržiūrėtų ir patvirtintų PR). Patikrinkite `linked:` sutapimus
   (tie patys `tap.testFiles`, tos pačios CHANGELOG fragmentų dalys) ir tokius PR apdorokite nuosekliai.
2. **Patikrinkite VIENĄ KARTĄ**: izoliuotame darbiniame medyje, sukurtame nuo leidimo šakos viršūnės, lokaliai sujunkite visas grupės
   viršūnes, tada paleiskite leidimui lygiavertį rinkinį
   (`npm run check:release-green`, prieš leidimą pridėkite `--with-build`).
   `scripts/release/merge-train.sh <base> <PR#>…` automatizuoja 1–2 veiksmus (konfliktuojantys
   PR pašalinami, traukinys tęsia darbą). Visas režimas vykdo `npm run test:unit` — konkrečiam
   kompiuteriui suderintą vykdyklę (`--test-concurrency=20`), **o ne** dvi nuoseklias 4 branduolių CI
   dalis, dėl kurių dominuojantis etapas naudojo tik ~25 % 16 branduolių kompiuterio pajėgumo (ištaisyta
   2026-07-18). `--fast` (dienos metu vykdomiems didžiulių traukinių ištuštinimams, savininko patvirtinta 2026-07-18)
   išlaiko kiekvieną statinį kontrolinį etapą ir vitest, tačiau vykdo tik į traukinį įtrauktų PR
   pakeistus node:test failus; VISAS rinkinys vis tiek turi būti vykdomas bent kartą per dieną
   sukauptoje šakos viršūnėje (vienas traukinys be `--fast`).
3. **Sėkminga patikra** → sujunkite PR nuosekliai (prieš kiekvieną iš naujo patikrindami `state,headRefOid` —
   PR, kurio viršūnė pasikeitė, grąžinamas peržiūrėti). Įrodykite, kad kiekvieno sujungimo grynasis skirtumas yra tik
   paties PR pakeitimas (jokių automatinio konfliktų sprendimo sukeltų atšaukimų: patikrinkite `git diff --stat`, ar nėra
   į apimtį nepatenkančių pašalinimų).
4. **Nesėkminga patikra** → dalykite grupę pusiau (patikrinkite kiekvieną pusę), užuot pakartotinai tikrinę
   po vieną; grąžinkite probleminį PR į peržiūros eilę kartu su įrodymais.
5. **Niekada**: įšaldymo metu nejunkite į įšaldytą šaką; niekur nenaudokite `git stash`;
   aklai iš naujo nevykdykite CI tikėdamiesi, kad nesėkmė išnyks (taisyklė: nesėkmė yra informacija).

## Lygiai (kodėl eilė saugi naudojant tik sparčiuosius kontrolinius etapus)

- **Kiekvienam PR** (quality.yml spartieji kontroliniai etapai): TIA paveikti testai + visas 4 dalių vienetinių testų rinkinys +
  vitest + lint rinkinys + tipų patikra + dokumentacijos / pakeitimų žurnalo vientisumas.
- **Kiekvienai grupei / viršūnei** (nuolatinis leidimo tinkamumo patvirtinimas): `--quick` PRIVALOMIEJI kontroliniai etapai kiekvienam `push` į
  leidimo šaką; visi `--with-build --full-ci` patikrinimai 3 kartus per dieną.
- **Kiekvienam leidimui** (ci.yml leidimo PR): visa matrica, įskaitant E2E ×9,
  paketo artefaktą + tarball paleidimo testą, aprėptį / karteles.

Niekas nėra tikrinama mažiau nei anksčiau — didelės apimties patikros tiesiog vykdomos kiekvienai grupei / viršūnei,
o ne kiekvienam PR; būtent tai pašalina O(N) pirmyn ir atgal atliekamus ciklus.

## Naujos darbinės kopijos būtinosios sąlygos, skirtos `merge-train.sh`

Scenarijus šakninėje darbinėje kopijoje vykdo nedelsiant nesėkmę aptinkantį **išankstinį patikrinimą** (prieš bet kokį darbą
darbiniame medyje), kad sugadytas diegimas niekada negalėtų apsimesti nesėkmingu traukiniu:

1. `npm ci`, tada paleiskite `bun` podiegiminį veiksmą, kurį npm blokuoja:
   `(cd node_modules/bun && node install.js)` — kitaip `check:provider-consistency`
   ir `check:known-symbols` (abu `bun scripts/…`) nepavyksta tiek traukinyje, TIEK bazėje,
   nepateikdami pažeidimo eilutės.
2. Neturi būti pašalinio `node_modules/node_modules` (dubliuotas priklausomybių medis; „React“ įkeliamas du kartus,
   todėl UI vitest rinkiniai iškart nepavyksta).
3. `node_modules/.bin/tsc` turi egzistuoti ir būti vykdomas (daliniame diegime jo nėra).

Traukinys vykdo blokuojantį `npm run check:cycles:ratchet`; paprastas `npm run check:cycles`
yra informacinis (jis išvardija SCC ir baigiamas ne nuliniu kodu net sveikoje bazėje).
