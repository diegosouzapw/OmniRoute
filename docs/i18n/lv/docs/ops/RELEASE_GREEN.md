# Release-Green: keeping the queue and release branch green (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Problēma, ko tas atrisina

**Pilnā pārbaudes kopa** (`.github/workflows/ci.yml` — vienībtestu segmenti, vitest, sliekšņi,
`package-artifact`, SonarQube, E2E) tiek izpildīta **tikai laidiena PR** (PR → `main`). PR, kuru mērķis ir
`release/**`, saņem **ātrās pārbaudes** (`quality.yml`: TIA ietekmētie testi + tipu pārbaude + lintēšana)
un koda izmaiņu gadījumā arī **konsultatīvu** produkcijas būvējumu. Sekas: tikai laidienā konstatējamas kļūmes joprojām var
nemanāmi uzkrāties laidiena zarā un laidiena laikā **izpausties cita pēc citas ~40 min slāņos**.

“release-green saime” pastāv, lai šīs kļūmes **paredzētu** — jebkurā laikā pārbaudītu pilnās
pārbaudes kopas ekvivalentu **lokāli / ārpus laidiena**, lai laidiena PR būtu
zaļš jau pirmajā CI izpildē.

> **Neapspriežams princips:** nekas no šī nebloķē līdzautoru. Mēs nepievienojam obligātu
> pārbaudi, kuras kļūme apturētu viņa PR. **Novirze** (sliekšņi) ir uzturētāja ziņā, kuram laidiena laikā jāatjaunina bāzes līmenis —
> tā nekad nav līdzautora problēma. Neviena daļa **neaizver** PR (nopelnu piesavināšanās), kā arī
> **nemīkstina** testu, lai tas tiktu izturēts.

## Saime (4 daļas) — un kā katra darbojas neatkarīgi

| Daļa                                                                         | Kas tā ir                                                                        | Kad izpildīt                                                           | Tvērums                           |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------- |
| **`/green-prs`** (risinājums A)                                              | Uzturētāja pēc pieprasījuma veikta **atvērto PR rindas** pārbaude                | **Neatkarīgi, periodiski** — un jo īpaši **pirms** `/generate-release` | Visa PR rinda → `release/**`      |
| **`/validate-release-green`** (risinājums C — `npm run check:release-green`) | Validācijas dzinis: atkārto pilno pārbaudes kopu zarā VAI apvienošanas kandidātā | Neatkarīgi, jebkurā laikā                                              | Konkrēts zars vai apvienošanas PR |
| **`/babysit <PR#>`**                                                         | Vada **viena** PR **reāllaika CI**, līdz tas ir zaļš                             | Neatkarīgi, katram PR                                                  | Viens PR                          |
| **`nightly-release-green.yml`** (risinājums D)                               | Automatizēta iknakts darbplūsma; KRITISKAS kļūmes gadījumā atver pieteikumu      | Automātiski (cron)                                                     | Aktīvais laidiena zars            |

**Īsā atbilde uz jautājumu “vai tas ir paredzēts tikai laidieniem?”:** **nē.** `/green-prs` tika izstrādāts, lai to
izpildītu **periodiski starp laidieniem**. Neatkarīga izpilde ir ierastais lietojums — laidiens ir tikai
brīdis, kad tās izpilde sniedz vislielāko vērtību.

## Konsultatīvais būvējums no PR līdz laidienam

`quality.yml` tagad ietver `Build (advisory)` melnraksta statusā neesošiem koda PR un Mergify rindas zariem.
Tas atkārto produkcijas būvēšanas recepti no `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` un `npm run build` ar `OMNIROUTE_USE_TURBOPACK=1`. Tas apzināti
neaugšupielādē būvējuma artefaktu, jo šajā darbplūsmā neviens pakārtotais kvalitātes darbs to neizmanto.
Pēc vienas nedēļas stabiliem laidiena PR izpildes gadījumiem noņemiet `continue-on-error`, lai šis signāls kļūtu par
bloķējošu vārteju no PR līdz laidienam.

## Risinājums C — `npm run check:release-green` (dzinējs)

Atveido laidienam līdzvērtīgu validāciju pašreizējam darba kokam un klasificē katru neveiksmi:

- **HARD** (tipu pārbaude, lint kļūdas, vienību testi, vitest, db-rules, public-creds, neobligātais
  `package-artifact`) → **reāls defekts**; `exit 1`. Tiek labots avota zarā (TDD, noteikums #18).
- **DRIFT** (eslint **brīdinājumi**, kognitīvā sarežģītība, faila izmērs) → cikla laikā uzkrāta sliekšņu nobīde,
  **nevis līdzautora vaina**; tā tiek tikai ziņota un **uzturētājs laidiena laikā tai no jauna nosaka
  bāzes vērtības**. DRIFT **nekad** nemaina izejas kodu, tādēļ tā nevienu nebloķē.

```bash
npm run check:release-green                 # pašreizējais zars (darba koks)
node scripts/quality/validate-release-green.mjs --json   # strukturēta izvade
node scripts/quality/validate-release-green.mjs --quick  # izlaiž vienību testus un vitest (tikai nobīde, tipu pārbaude un lint)
node scripts/quality/validate-release-green.mjs --with-build  # ietver package-artifact (lēni)
```

Tikai diagnosticē un **ziņo** (bez automātiskas labošanas). Orķestrācija labošanai līdz sekmīgam stāvoklim atrodas
`/green-prs` un `/review-prs`.

## Risinājums A — `/green-prs` (rindas skenēšana)

Procedūra (kopsavilkums — detalizētu informāciju skatiet `green-prs` prasmē):

1. Izveidot atvērto PR rindas **sarakstu** attiecībā pret aktīvo laidiena zaru.
2. **Klasificēt** katru PR (dzīvotspējīgs / noraidāms / nepieciešama autora rīcība) — noraidāmie un tādi, kam nepieciešama autora rīcība,
   tiek **norādīti ziņojumā, nevis aizvērti** (lēmumu pieņem autors).
3. Katram dzīvotspējīgajam PR **izolētā darba kokā** (noteikums #19) atjaunināt PR līdz laidiena zara galotnei un izpildīt
   `npm run check:release-green`:
   - **HARD** → labot **līdzautora zarā**, izmantojot līdzautorību (saglabā autora statusu “Merged”),
     atkārtoti izpildīt, līdz visas HARD problēmas ir novērstas.
   - **DRIFT** → atstāt nemainītu; bāzes vērtības tai no jauna tiks noteiktas laidiena laikā.
4. **Sniegt ziņojumu** tabulā PR × (spriedums, HARD problēmas, izlabots?, DRIFT, vai tagad gatavs laidienam?).

Var **sagatavot** rindu bez apvienošanas; apvienošana notiek tikai pēc skaidra pieprasījuma, un PR nekad netiek aizvērts.

## Ieteicamais izpildes biežums

- Izpildiet **`/green-prs` periodiski** (piemēram, reizi nedēļā) un **vienmēr pirms
  `/generate-release`**.
- Saglabājiet **`nightly-release-green.yml`** (risinājums D) kā nepārtrauktu signālu: kad tas izveido
  HARD problēmas pieteikumu, ir pienācis laiks skenēšanai.
- Izmantojiet **`/validate-release-green`** pēc vajadzības, lai pārbaudītu zaru vai konkrētu apvienošanas kandidātu.
- Izmantojiet **`/babysit <PR#>`**, ja konkrēts PR aktīvajā CI ir jānoved līdz sekmīgam stāvoklim.

## Saistība ar laidienu

- `/generate-release` izsauc validāciju **0. fāzē (pirmsizpildes pārbaudē)**: no jauna nosaka DRIFT bāzes vērtības un izlabo
  HARD problēmas pirms laidiena PR izveides.
- `/review-prs` izmanto laidiena gatavības vārteju apvienošanas lēmuma posmā (sekmīgs stāvoklis pirms apvienošanas).

Visu daļu mērķis ir vienāds: **sekmīgs laidiena PR jau pirmajā CI izpildē**, nevis
neveiksmju risināšana 40 minūšu slāņos laidiena dienā.
