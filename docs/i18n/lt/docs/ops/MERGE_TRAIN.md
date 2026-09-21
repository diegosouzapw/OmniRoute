# Merge Queue & Manual Merge-Train Runbook (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Nuo v3.8.49 (kokybės / spartos plano WS3.2/WS3.4) numatytasis peržiūrėtų
PR sujungimo į `release/vX.Y.Z` būdas yra **„Mergify“ sujungimo eilė** (`.mergify.yml`);
toliau aprašytas **rankinis sujungimo konvejeris** yra ATSARGINIS būdas, naudojamas incidentų,
leidimo įšaldymo metu arba jei kada nors pasikeistų „Mergify“ atvirojo kodo planas.

## Numatytasis būdas: „Mergify“ eilė

1. PR peržiūrimas, kampanijos patvirtina jo sėkmingą būseną, o savininkas patvirtina jį savo prieš sujungimą taikomoje ⭐
   patikroje (ataskaita ir kiekvieno elemento sprendimas — žr. `/merge-prs` 0.75 veiksmą).
2. Savininkas (arba pagal savininko sprendimą veikianti sesija) priskiria **`queue`**
   žymą. Žyma YRA sujungimo patvirtinimas; „Mergify“ tik jį įvykdo.
3. „Mergify“ sugrupuoja iki 10 eilėje esančių PR, patikrina grupę pagal sparčiąsias patikras
   ir sujungia (suglaudindama). Nesėkminga grupė **automatiškai dalijama pusiau** — problemą sukėlęs PR
   izoliuojamas per maždaug log2(N) pakartotinių patikrų ir pašalinamas iš eilės; likusieji tęsiami.
4. Po sujungimo nuolatinė leidimo sėkmingos būsenos darbo eiga patikrina naują šakos viršūnę po išsiuntimo
   ir, jei derinys sukėlė regresiją, sukuria priskyrimo problemą (niekada automatiškai neatšaukia pakeitimų).

Apsaugos priemonės (atitinka `CLAUDE.md` griežtąsias taisykles Nr. 21/Nr. 22):

- **Aktyvus leidimo įšaldymas** → NEPRISKIRKITE žymų PR, nukreiptiems į įšaldytą šaką; pirmiausia pakeiskite jų tikslą į
  aktyvią `release/vX+1`.
- **Kitos sesijos vykdomas PR** → niekada nepriskirkite jam žymos; tik savininko sesija įtraukia
  savo darbą į eilę.
- Tik testų pakeitimai ir `hotfix` žyma pažymėti PR jau vykdo sumažintą CI apimtį (žr.
  `RELEASE_CHECKLIST.md` → sparčiąją kritinių pataisų juostą); eilės sąlygos priima bet kokį
  faktiškai vykdytą patikrų rinkinį (`#check-failure=0` + `#check-pending=0`).

## Atsarginis būdas: rankinis sujungimo konvejeris

Naudojamas, kai eilė nepasiekiama. Taip formalizuojama praktika, per v3.8.47 ciklą
leidusi per vieną dieną apdoroti 33 PR:

1. **Sudarykite grupę** (apie 10–30 peržiūrėtų ir patvirtintų PR). Patikrinkite `linked:` sutapimus
   (tie patys `tap.testFiles`, tos pačios CHANGELOG ištraukos) ir tokius PR apdorokite nuosekliai.
2. **Patikrinkite VIENĄ KARTĄ**: izoliuotame darbiniame medyje, sukurtame nuo leidimo šakos viršūnės, lokaliai sujunkite visas grupės
   viršūnes, tada paleiskite leidimui lygiavertį rinkinį
   (`npm run check:release-green`, prieš leidimą pridėkite `--with-build`).
   `scripts/release/merge-train.sh <base> <PR#>…` automatizuoja 1–2 veiksmus (nesuderinami
   PR pašalinami, o konvejeris tęsia darbą). Visas režimas vykdo `npm run test:unit` — konkrečiam
   kompiuteriui optimizuotą vykdyklę (`--test-concurrency=20`), **o ne** dvi nuoseklias 4 branduolių CI
   dalis, dėl kurių pagrindinė fazė išnaudodavo tik apie 25 % 16 branduolių kompiuterio pajėgumo (ištaisyta
   2026-07-18). `--fast` (tos pačios dienos didžiuliams konvejerio ištuštinimams, savininko patvirtinta 2026-07-18)
   išlaiko visas statines patikras ir vitest, tačiau vykdo tik į konvejerį įtrauktų PR pakeistus
   node:test failus; VISAS rinkinys vis tiek turi būti vykdomas bent kartą per dieną
   sukauptoje šakos viršūnėje (vienas konvejeris be `--fast`).
3. **Sėkminga būsena** → sujunkite PR nuosekliai (prieš kiekvieną iš naujo patikrindami `state,headRefOid` —
   PR, kurio viršūnė pasikeitė, grąžinamas peržiūrėti). Įsitikinkite, kad kiekvieno sujungimo galutinis skirtumas yra tik
   to PR pakeitimas (jokių automatinio konfliktų sprendimo sukeltų atšaukimų: patikrinkite `git diff --stat`, ar nėra
   su užduoties apimtimi nesusijusių pašalinimų).
4. **Nesėkminga būsena** → dalykite grupę pusiau (tikrinkite kiekvieną pusę), užuot pakartotinai tikrinę
   po vieną; problemą sukėlusį PR su įrodymais grąžinkite į peržiūros eilę.
5. **Niekada**: įšaldymo metu nejunkite į įšaldytą šaką; niekur nenaudokite `git stash`;
   aklai neperleiskite CI tikėdamiesi, kad nesėkminga būsena išnyks (taisyklė: nesėkminga būsena yra informacija).

## Lygiai (kodėl eilė yra saugi naudojant tik sparčiąsias patikras)

- **Kiekvienam PR** (quality.yml sparčiosios patikros): TIA paveikti testai + visas 4 dalių vienetinių testų rinkinys +
  vitest + lint rinkinys + tipų patikra + dokumentacijos / pakeitimų žurnalo vientisumas.
- **Kiekvienai grupei / viršūnei** (nuolatinė leidimo sėkmingos būsenos patikra): `--quick` PRIVALOMOS patikros po kiekvieno išsiuntimo į
  leidimo šaką; visi `--with-build --full-ci` patikrinimai 3 kartus per dieną.
- **Kiekvienam leidimui** (ci.yml leidimo PR): visa matrica, įskaitant E2E ×9,
  paketo artefaktą + tar archyvo paleidimo bazinį testą, aprėptį / slenksčių griežtinimą.

Niekas nėra tikrinama mažiau nei anksčiau — didelės apimties patikros tiesiog vykdomos kiekvienai grupei / viršūnei,
o ne kiekvienam PR, todėl pašalinami O(N) pirmyn ir atgal ciklai.
