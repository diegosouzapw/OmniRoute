# Merge Queue & Manual Merge-Train Runbook (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Kopš v3.8.49 (kvalitātes/ātruma plāna WS3.2/WS3.4) noklusējuma sapludināšanas ceļš
pārskatītiem PR uz `release/vX.Y.Z` ir **Mergify sapludināšanas rinda** (`.mergify.yml`);
tālāk dokumentētais **manuālais sapludināšanas vilciens** ir REZERVES RISINĀJUMS — to izmanto incidentu,
laidiena iesaldēšanas laikā vai tad, ja Mergify Open Source plāns kādreiz mainās.

## Noklusējuma ceļš: Mergify rinda

1. Kampaņas ir pārskatījušas PR, un tā pārbaudes ir zaļas; to ir apstiprinājis arī īpašnieka pirmsapvienošanas ⭐
   kontroles posms (atskaite + lēmums par katru vienumu — skatiet `/merge-prs` 0.75. soli).
2. Īpašnieks (vai sesija, kas rīkojas saskaņā ar īpašnieka lēmumu) pievieno **`queue`**
   etiķeti. Šī etiķete IR sapludināšanas apstiprinājums; Mergify to tikai izpilda.
3. Mergify apvieno grupā līdz 10 rindā ievietotiem PR, validē grupu, izmantojot ātrās pārbaudes,
   un sapludina (squash). Neveiksmīga grupa tiek **automātiski sadalīta uz pusēm** — vainīgais PR
   tiek izolēts aptuveni log2(N) atkārtotās validācijās un izņemts no rindas; pārējie turpina procesu.
4. Pēc sapludināšanas nepārtrauktā laidiena zaļā statusa darbplūsma pēc push validē jauno galotni
   un izveido attiecinājuma problēmu, ja kombinācija izraisījusi regresiju (nekad neveic automātisku atsaukšanu).

Drošības ierobežojumi (atbilst `CLAUDE.md` stingrajiem noteikumiem Nr. 21/Nr. 22):

- **Ir spēkā laidiena iesaldēšana** → NEPIEVIENOJIET etiķetes PR, kuru mērķis ir iesaldētais zars; vispirms mainiet mērķi uz
  aktīvo `release/vX+1`.
- **Citas sesijas izpildē esošs PR** → nekad nepievienojiet tam etiķeti; tikai īpašnieka sesija ievieto
  rindā savu darbu.
- Izmaiņas, kas skar tikai testus, un PR ar `hotfix` etiķeti jau izpilda samazinātu CI (skatiet
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); rindas nosacījumi pieņem faktiski
  izpildīto pārbaužu kopu (`#check-failure=0` + `#check-pending=0`).

## Rezerves risinājums: manuālais sapludināšanas vilciens

Izmanto, kad rinda nav pieejama. Tas formalizē praksi, ar kuru v3.8.47 cikla laikā
vienā dienā tika apstrādāti 33 PR:

1. **Izveidojiet grupu** (~10–30 pārskatīti un apstiprināti PR). Pārbaudiet `linked:` sadursmes
   (tie paši `tap.testFiles`, tās pašas CHANGELOG sadaļas) un šādus PR apstrādājiet secīgi.
2. **Validējiet VIENU REIZI**: izolētā worktree, kas izveidots no laidiena galotnes, lokāli sapludiniet visas grupas
   galotnes un pēc tam palaidiet laidienam ekvivalento komplektu
   (`npm run check:release-green`; pirms laidiena pievienojiet `--with-build`).
   `scripts/release/merge-train.sh <base> <PR#>…` automatizē 1.–2. soli (konfliktējošie
   PR tiek izņemti, vilciens turpina darbu). Pilnais režīms palaiž `npm run test:unit` — konkrētajai
   iekārtai pielāgoto izpildītāju (`--test-concurrency=20`), **nevis** divus secīgus 4 kodolu CI
   segmentus, kuru dēļ dominējošā fāze izmantoja tikai ~25% no 16 kodolu iekārtas (izlabots
   2026-07-18). `--fast` (vienas dienas milzu vilciena iztukšošanai, īpašnieks apstiprināja 2026-07-18)
   saglabā visas statiskās pārbaudes un vitest, taču palaiž tikai tos node:test failus, kurus mainījuši
   vilcienā iekļautie PR; PILNAIS komplekts joprojām jāpalaiž vismaz reizi dienā uz
   uzkrātās galotnes (viens vilciens bez `--fast`).
3. **Zaļš statuss** → sapludiniet PR secīgi (pirms katra vēlreiz pārbaudot `state,headRefOid` —
   PR, kura galotne ir mainījusies, atgriežas pārskatīšanā). Pierādiet, ka katras sapludināšanas neto izmaiņas ir
   paša PR izmaiņas (nekādu automātiskās konfliktu atrisināšanas izraisītu atsaukšanu: auditējiet `git diff --stat`, meklējot
   ārpus tvēruma esošus dzēsumus).
4. **Sarkans statuss** → sadaliet grupu uz pusēm (validējiet katru pusi), nevis atkārtoti validējiet
   katru PR atsevišķi; pārvietojiet vainīgo PR atpakaļ uz pārskatīšanas rindu, pievienojot pierādījumus.
5. **Nekad**: iesaldēšanas laikā nesapludiniet iesaldētajā zarā; neizmantojiet `git stash`;
   akli neatkārtojiet CI, cerot, ka sarkanais statuss pazudīs (noteikums: sarkans statuss ir informācija).

## Līmeņi (kāpēc rinda ir droša, izmantojot tikai ātrās pārbaudes)

- **Katram PR** (quality.yml ātrās pārbaudes): TIA ietekmētie testi + pilns vienību testu 4 segmentu komplekts +
  vitest + lint komplekts + tipu pārbaude + dokumentācijas/izmaiņu žurnāla integritāte.
- **Katrai grupai/galotnei** (nepārtrauktais laidiena zaļais statuss): `--quick` OBLIGĀTĀS pārbaudes pēc katra push uz
  laidiena zaru; pilnās `--with-build --full-ci` pārbaudes 3× dienā.
- **Katram laidienam** (ci.yml laidiena PR): pilnā matrica, tostarp E2E ×9,
  pakotnes artefakts + tarball sāknēšanas pamatpārbaude, pārklājums/sliekšņi.

Nekas netiek validēts mazāk nekā iepriekš — resursietilpīgās pārbaudes vienkārši tiek izpildītas katrai grupai/galotnei,
nevis katram PR, un tieši tas novērš O(N) aprites.
