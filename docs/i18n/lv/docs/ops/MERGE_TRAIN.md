# Merge Queue & Manual Merge-Train Runbook (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Kopš v3.8.49 (kvalitātes/ātruma plāna WS3.2/WS3.4) noklusējuma apvienošanas ceļš
pārskatītiem PR zarā `release/vX.Y.Z` ir **Mergify apvienošanas rinda** (`.mergify.yml`);
tālāk dokumentētais **manuālais apvienošanas vilciens** ir REZERVES RISINĀJUMS — to izmanto incidentu,
laidiena iesaldēšanas laikā vai tad, ja Mergify Open Source plāns kādreiz mainās.

## Noklusējuma ceļš: Mergify rinda

1. Kampaņas pārskata/apstiprina PR, un īpašnieks to apstiprina savā pirmsapvienošanas ⭐
   kontrolpunktā (atskaite + lēmums par katru vienumu — skatiet `/merge-prs` 0.75. darbību).
2. Īpašnieks (vai sesija, kas rīkojas saskaņā ar īpašnieka lēmumu) pievieno **`queue`**
   etiķeti. Šī etiķete IR apvienošanas apstiprinājums; Mergify to tikai izpilda.
3. Mergify pārbauda rindā ievietotos PR **secīgi** (pa vienam), izmantojot ātrās pārbaudes,
   un apvieno tos (`squash`). Pakešapstrāde + automātiska dalīšana ir pieejama maksas Mergify
   līmenī ("Nevar izmantot apvienošanas rindas pakešapstrādi" bezmaksas plānā, #7220), tāpēc
   `.mergify.yml` nenosaka `batch_size`; pakešapstrāde joprojām ir tālāk aprakstītā manuālā
   apvienošanas vilciena uzdevums. PR, kura pārbaudes pēc `checks_timeout` (240 min = 2×
   izmērītais `quality.yml` p95) joprojām nav pabeigtas, tiek izņemts no rindas, nevis
   bloķē visu rindu.
4. Pēc apvienošanas nepārtrauktā laidiena zaļā statusa darbplūsma `push` notikuma laikā
   pārbauda jauno zara galu un, ja kombinācija izraisījusi regresiju, izveido problēmas
   pieteikumu vainīgā noteikšanai (nekad neveic automātisku atsaukšanu).

Drošības ierobežojumi (atbilst `CLAUDE.md` stingrajiem noteikumiem #21/#22):

- **Aktīva laidiena iesaldēšana** → NEPIEVIENOJIET etiķetes PR, kuru mērķis ir iesaldētais
  zars; vispirms mainiet mērķi uz aktīvo `release/vX+1`.
- **Citas sesijas procesā esošs PR** → nekad nepievienojiet tam etiķeti; tikai īpašnieka
  sesija ievieto rindā savu darbu.
- PR, kuros mainīti tikai testi, un PR ar `hotfix` etiķeti jau izmanto samazinātu CI pārbaužu
  kopu (skatiet `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); rindas nosacījumi pieņem jebkuru
  faktiski izpildīto pārbaužu kopu (`#check-failure=0` + `#check-pending=0`).

## Rezerves risinājums: manuālais apvienošanas vilciens

To izmanto, kad rinda nav pieejama. Tas formalizē praksi, ar kuru v3.8.47 cikla laikā
vienā dienā tika apstrādāti 33 PR:

1. **Izveidojiet grupu** (~10–30 pārskatīti un apstiprināti PR). Pārbaudiet `linked:` kolīzijas
   (tie paši `tap.testFiles`, tie paši CHANGELOG fragmenti) un apstrādājiet tās secīgi.
2. **Validējiet VIENU REIZI**: izolētā darba kokā, kas izveidots no laidiena zara gala, lokāli apvienojiet visus grupas
   galvenos zarus un pēc tam izpildiet laidienam līdzvērtīgo komplektu
   (`npm run check:release-green`; pirms laidiena pievienojiet `--with-build`).
   `scripts/release/merge-train.sh <base> <PR#>…` automatizē 1.–2. darbību (konfliktējošie
   PR tiek izslēgti, vilciens turpina darbu). Pilnais režīms izpilda `npm run test:unit` — sistēmai
   pielāgoto izpildītāju (`--test-concurrency=20`), **nevis** divus secīgus 4 kodolu CI
   segmentus, kuru dēļ dominējošais posms izmantoja tikai ~25% no 16 kodolu sistēmas (izlabots
   2026-07-18). `--fast` (dienas laikā izpildāmai lielā vilciena iztukšošanai, īpašnieks apstiprinājis 2026-07-18)
   saglabā visas statiskās pārbaudes + vitest, bet izpilda tikai tos node:test failus, kurus mainījuši
   vilcienā iekļautie PR; PILNAIS komplekts joprojām vismaz reizi dienā ir jāizpilda
   uz uzkrātā zara gala (viens vilciens bez `--fast`).
3. **Zaļš statuss** → apvienojiet PR secīgi (pirms katra vēlreiz pārbaudot `state,headRefOid` —
   PR, kura galvenais zars ir mainījies, atgriežas pārskatīšanā). Pierādiet, ka katras apvienošanas neto atšķirības ir
   paša PR izmaiņas (nekādu automātiskās konfliktu atrisināšanas izraisītu atsaukšanu: pārbaudiet `git diff --stat`, vai nav
   ārpus tvēruma esošu dzēsumu).
4. **Sarkans statuss** → sadaliet grupu uz pusēm (validējiet katru pusi), nevis veiciet atkārtotu validāciju
   pa vienam; atgrieziet problemātisko PR pārskatīšanas rindā kopā ar pierādījumiem.
5. **Nekad**: iesaldēšanas laikā neapvienojiet izmaiņas iesaldētajā zarā; neizmantojiet `git stash`;
   atkārtoti nepalaidiet visu CI, cerot, ka sarkanais statuss pazudīs (noteikums: sarkans statuss ir informācija).

## Līmeņi (kāpēc rinda ir droša, izmantojot tikai ātrās pārbaudes)

- **Katram PR** (quality.yml ātrās pārbaudes): TIA ietekmētie testi + pilns vienību testu komplekts 4 segmentos +
  vitest + lint pārbaužu kopa + tipu pārbaude + dokumentācijas/izmaiņu žurnāla integritāte.
- **Katrai grupai/zara galam** (nepārtraukta laidiena zaļā statusa pārbaude): `--quick` OBLIGĀTĀS pārbaudes pēc katras izmaiņu
  nosūtīšanas laidiena zarā; pilnās `--with-build --full-ci` pārbaudes 3× dienā.
- **Katram laidienam** (ci.yml laidiena PR): pilnā matrica, tostarp E2E ×9,
  pakotnes artefakts + tarball pamata palaišanas pārbaude, pārklājums/sliekšņi.

Nekas netiek validēts mazāk nekā iepriekš — resursietilpīgās pārbaudes vienkārši tiek izpildītas katrai grupai/zara galam,
nevis katram PR, un tieši tas novērš O(N) atkārtotos ciklus.

## Svaigas repozitorija kopijas priekšnosacījumi skriptam `merge-train.sh`

Skripts saknes repozitorija kopijā izpilda tūlītēji pārtraucošu **pirmsstarta pārbaudi** (pirms jebkādām darbībām
darba kokā), lai bojāta instalācija nekad nevarētu izskatīties pēc neveiksmīga vilciena:

1. `npm ci`, pēc tam izpildiet `bun` pēcinatalēšanas darbību, ko npm bloķē:
   `(cd node_modules/bun && node install.js)` — pretējā gadījumā `check:provider-consistency`
   un `check:known-symbols` (abi `bun scripts/…`) neizdodas gan vilcienam, GAN bāzei,
   neuzrādot nevienu pārkāpuma rindu.
2. Nedrīkst būt lieka `node_modules/node_modules` direktorija (dublēts atkarību koks; React tiek ielādēts divreiz,
   un UI vitest komplekti uzreiz neizdodas).
3. Failam `node_modules/.bin/tsc` jābūt pieejamam un izpildāmam (daļējā instalācijā tā nav).

Vilciens izpilda bloķējošo `npm run check:cycles:ratchet`; vienkāršais `npm run check:cycles`
ir informatīvs (tas uzskaita SCC un beidz darbu ar kodu, kas nav nulle, pat veselai bāzei).
