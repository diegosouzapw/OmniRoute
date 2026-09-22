# Merge Queue & Manual Merge-Train Runbook (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Od verzie v3.8.49 (WS3.2/WS3.4 plánu kvality/rýchlosti) je predvolenou cestou zlučovania
skontrolovaných PR do `release/vX.Y.Z` **front zlučovania Mergify** (`.mergify.yml`);
nižšie zdokumentovaný **manuálny zlučovací vlak** je ZÁLOŽNÝ POSTUP — používa sa počas incidentov,
zmrazení vydania alebo v prípade, že sa niekedy zmení plán Mergify Open Source.

## Predvolená cesta: front Mergify

1. PR je skontrolovaný, kampane sú úspešné a PR je schválený kontrolnou bránou ⭐
   vlastníka pred zlúčením (správa + rozhodnutie pre každú položku — pozrite krok 0.75 v `/merge-prs`).
2. Vlastník (alebo relácia konajúca na základe rozhodnutia vlastníka) pridá označenie **`queue`**.
   Toto označenie JE schválením zlúčenia; Mergify ho iba vykoná.
3. Mergify zoskupí najviac 10 PR zaradených do frontu, overí dávku pomocou rýchlych kontrolných brán
   a zlúči ju (squash). Neúspešná dávka sa **automaticky rozdelí binárnym vyhľadávaním** — problematický PR
   sa izoluje približne za log2(N) opätovných overení a odstráni sa z frontu; ostatné pokračujú.
4. Po zlúčení priebežný pracovný postup na kontrolu stavu vydania overí nový vrchol pri pushnutí
   a otvorí problém s určením príčiny, ak kombinácia spôsobila regresiu (nikdy ju automaticky nevráti).

Ochranné pravidlá (zodpovedajú tvrdým pravidlám č. 21/22 v `CLAUDE.md`):

- **Aktívne zmrazenie vydania** → NEPRIDÁVAJTE označenia PR smerujúcim do zmrazenej vetvy;
  najprv zmeňte ich cieľ na aktívnu vetvu `release/vX+1`.
- **Rozpracovaný PR inej relácie** → nikdy ho neoznačujte; iba vlastnícka relácia zaraďuje
  svoju vlastnú prácu do frontu.
- Rozdiely týkajúce sa iba testov a PR s označením `hotfix` už spúšťajú obmedzené CI (pozrite
  `RELEASE_CHECKLIST.md` → Rýchla cesta opráv); podmienky frontu akceptujú akúkoľvek
  množinu kontrol, ktorá sa skutočne spustila (`#check-failure=0` + `#check-pending=0`).

## Záložný postup: manuálny zlučovací vlak

Používa sa, keď front nie je dostupný. Formalizuje postup, ktorý počas cyklu v3.8.47
spracoval 33 PR za jeden deň:

1. **Zostavte dávku** (~10–30 skontrolovaných a schválených PR). Skontrolujte kolízie `linked:`
   (rovnaké `tap.testFiles`, rovnaké časti CHANGELOG) a spracujte ich sériovo.
2. **Overte RAZ**: v izolovanom pracovnom strome vytvorenom z vrcholu vetvy vydania lokálne zlúčte všetky
   vrcholy dávky a potom spustite sadu ekvivalentnú vydaniu
   (`npm run check:release-green`, pred vydaním pridajte `--with-build`).
   `scripts/release/merge-train.sh <base> <PR#>…` automatizuje kroky 1–2 (konfliktné
   PR sa vyradia a vlak pokračuje). Úplný režim spúšťa `npm run test:unit` — spúšťač
   vyladený pre daný stroj (`--test-concurrency=20`), **nie** dva sekvenčné 4-jadrové fragmenty CI,
   ktoré spôsobili, že dominantná fáza využívala približne 25 % 16-jadrového stroja (opravené
   2026-07-18). `--fast` (vnútrodenné spracovanie megavlakov, schválené vlastníkom 2026-07-18)
   zachováva každú statickú kontrolnú bránu + vitest, ale spúšťa iba súbory node:test zmenené
   PR zaradenými do vlaku; ÚPLNÁ sada sa stále musí spustiť aspoň raz denne na
   kumulovanom vrchole (jeden vlak bez `--fast`).
3. **Úspech** → zlúčte PR v poradí (pred každým znova skontrolujte `state,headRefOid` —
   PR, ktorého vrchol sa zmenil, sa vracia na kontrolu). Overte, že výsledný rozdiel každého zlúčenia
   predstavuje vlastnú zmenu daného PR (žiadne automatické riešenie konfliktov vracajúce zmeny: skontrolujte
   `git diff --stat`, či neobsahuje odstránenia mimo rozsahu).
4. **Neúspech** → rozdeľte dávku binárnym vyhľadávaním na polovice (overte každú polovicu) namiesto
   opätovného overovania po jednom; vráťte problematický PR spolu s dôkazmi späť do frontu na kontrolu.
5. **Nikdy**: počas zmrazenia nezlučujte do zmrazenej vetvy; nikde nepoužívajte `git stash`;
   neopakujte bez rozmyslu CI v nádeji, že neúspech zmizne (pravidlo: neúspech je informácia).

## Úrovne (prečo je front bezpečný iba s rýchlymi kontrolnými bránami)

- **Pre každý PR** (rýchle kontrolné brány quality.yml): testy ovplyvnené podľa TIA + úplné jednotkové testy
  v 4 fragmentoch + vitest + sada lint kontrol + typecheck + integrita dokumentácie/CHANGELOG.
- **Pre každú dávku/vrchol** (priebežná kontrola stavu vydania): TVRDÉ kontrolné brány `--quick` pri každom pushnutí do
  vetvy vydania; úplné kontroly `--with-build --full-ci` 3× denne.
- **Pre každé vydanie** (ci.yml na PR vydania): úplná matica vrátane E2E ×9,
  package-artifact + základný test spustenia z tarballu, coverage/ratchets.

Nič sa neoveruje menej než predtým — náročné kontroly sa iba spúšťajú pre každú dávku/vrchol
namiesto každého PR, čím sa odstraňujú opakované cykly O(N).
