# Merge Queue & Manual Merge-Train Runbook (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Od verzie v3.8.49 (WS3.2/WS3.4 plánu kvality/rýchlosti) je predvolenou cestou zlučovania
skontrolovaných PR do `release/vX.Y.Z` **front zlučovania Mergify** (`.mergify.yml`);
nižšie zdokumentovaný **manuálny merge-train** je ZÁLOŽNÝ POSTUP — používa sa počas incidentov,
zmrazení vydania alebo ak sa niekedy zmení plán Mergify Open Source.

## Predvolená cesta: front Mergify

1. PR je skontrolovaný/schválený kampaňami a schválený vlastníkovou kontrolnou bránou ⭐
   pred zlúčením (report + rozhodnutie pre každú položku — pozrite `/merge-prs`, krok 0.75).
2. Vlastník (alebo relácia konajúca na základe rozhodnutia vlastníka) priradí označenie
   **`queue`**. Toto označenie JE schválením zlúčenia; Mergify ho iba vykoná.
3. Mergify overuje PR zaradené do frontu **sériovo** (po jednom) podľa rýchlych kontrolných
   brán a zlučuje ich (squash). Dávkové spracovanie + automatická bisekcia sú súčasťou
   platenej úrovne Mergify („Cannot use Merge Queue batch“ v bezplatnom pláne, #7220),
   preto `.mergify.yml` nenastavuje žiadne `batch_size`; dávkové spracovanie zostáva úlohou
   nižšie uvedeného manuálneho zlučovacieho vlaku. PR, ktorého kontroly stále čakajú po
   uplynutí `checks_timeout` (240 min = 2× namerané p95 pre `quality.yml`), sa odstráni
   z frontu namiesto toho, aby front zablokoval.
4. Po zlúčení priebežný pracovný postup overovania vydania pri odoslaní zmien overí nový
   vrchol vetvy a otvorí problém s určením pôvodu, ak kombinácia spôsobila regresiu
   (nikdy nevykoná automatický revert).

Ochranné pravidlá (zodpovedajú tvrdým pravidlám č. 21/22 v `CLAUDE.md`):

- **Aktívne zmrazenie vydania** → NEPRIRAĎUJTE označenie PR smerujúcim do zmrazenej vetvy;
  najprv ich presmerujte do aktívnej vetvy `release/vX+1`.
- **Rozpracovaný PR inej relácie** → nikdy mu nepriraďujte označenie; iba vlastnícka relácia
  zaraďuje svoju vlastnú prácu do frontu.
- Rozdiely obsahujúce iba testy a PR s označením `hotfix` už používajú obmedzené CI (pozrite
  `RELEASE_CHECKLIST.md` → Rýchla cesta pre opravy hotfix); podmienky frontu akceptujú
  ľubovoľnú sadu kontrol, ktorá sa skutočne spustila (`#check-failure=0` + `#check-pending=0`).

## Záložný postup: manuálny merge-train

Používa sa, keď front nie je dostupný. Formalizuje postup, ktorý počas cyklu v3.8.47
spracoval 33 PR za jediný deň:

1. **Zostavte dávku** (~10–30 skontrolovaných a schválených PR). Skontrolujte kolízie
   `linked:` (rovnaké `tap.testFiles`, rovnaké úseky CHANGELOG) a spracujte ich sériovo.
2. **Overte RAZ**: v izolovanom worktree vytvorenom z vrcholu vydávacej vetvy lokálne
   zlúčte všetky hlavy dávky a potom spustite sadu ekvivalentnú vydaniu
   (`npm run check:release-green`; pred vydaním pridajte `--with-build`).
   `scripts/release/merge-train.sh <base> <PR#>…` automatizuje kroky 1–2 (konfliktné
   PR sa vyradia a vlak pokračuje). Úplný režim spúšťa `npm run test:unit` — spúšťač
   optimalizovaný pre daný stroj (`--test-concurrency=20`), **nie** dva sekvenčné
   4-jadrové CI shardy, ktoré dominantnú fázu obmedzovali približne na 25 % výkonu
   16-jadrového stroja (opravené 2026-07-18). `--fast` (vnútrodenné spracovanie
   veľkých merge-trainov, schválené vlastníkom 2026-07-18) zachováva každú statickú
   kontrolnú bránu + vitest, ale spúšťa iba súbory node:test zmenené zaradenými PR;
   ÚPLNÁ sada sa stále musí spustiť aspoň raz denne nad nahromadeným vrcholom
   (jeden vlak bez `--fast`).
3. **Úspešné** → zlúčte PR postupne (pred každým znova skontrolujte `state,headRefOid` —
   PR, ktorého hlava sa zmenila, sa vracia na kontrolu). Preukážte, že výsledný rozdiel
   každého zlúčenia predstavuje vlastnú zmenu daného PR (žiadne reverty pri automatickom
   riešení konfliktov: skontrolujte `git diff --stat`, či neobsahuje odstránenia mimo rozsahu).
4. **Neúspešné** → rozdeľte dávku na polovice (a overte každú polovicu) namiesto
   opakovaného overovania po jednom; problematický PR vráťte spolu s dôkazmi do frontu
   na kontrolu.
5. **Nikdy**: nezlučujte počas zmrazenia do zmrazenej vetvy; nikde nepoužívajte
   `git stash`; nespúšťajte opakovane celé CI v nádeji, že neúspech zmizne
   (pravidlo: neúspech je informácia).

## Úrovne (prečo je front bezpečný iba s rýchlymi kontrolnými bránami)

- **Pre každý PR** (rýchle kontrolné brány quality.yml): testy ovplyvnené podľa TIA +
  úplné jednotkové testy v 4 shardoch + vitest + sada lint kontrol + typecheck +
  integrita dokumentácie/changelogu.
- **Pre každú dávku/vrchol** (priebežné overovanie vydania): TVRDÉ kontrolné brány
  `--quick` pri každom odoslaní zmien do vydávacej vetvy; úplné priechody
  `--with-build --full-ci` 3× denne.
- **Pre každé vydanie** (ci.yml na vydávacom PR): úplná matica vrátane E2E ×9,
  package-artifact + overenie spustenia z tarballu, coverage/ratchets.

Nič sa neoveruje menej než predtým — náročná časť sa iba spúšťa pre každú dávku/vrchol
namiesto každého PR, čím sa odstraňujú O(N) spiatočné cykly.

## Predpoklady čistého checkoutu pre `merge-train.sh`

Skript spúšťa na koreňovom checkoute **predbežnú kontrolu**, ktorá pri prvom zlyhaní
skončí (pred akoukoľvek prácou s worktree), takže poškodená inštalácia sa nikdy nemôže
javiť ako neúspešný vlak:

1. `npm ci`, potom spustite postinstall pre `bun`, ktorý npm blokuje:
   `(cd node_modules/bun && node install.js)` — inak `check:provider-consistency`
   a `check:known-symbols` (oba používajú `bun scripts/…`) zlyhajú vo vlaku AJ na
   základnej vetve bez riadka s porušením.
2. Žiadny nadbytočný `node_modules/node_modules` (duplicitný strom závislostí; React
   sa načíta dvakrát a UI sady vitest okamžite zlyhajú).
3. `node_modules/.bin/tsc` musí byť prítomný a spustiteľný (pri čiastočnej inštalácii chýba).

Vlak spúšťa blokujúci `npm run check:cycles:ratchet`; samotný `npm run check:cycles`
je iba informatívny (vypíše SCC a skončí s nenulovým kódom aj na zdravej základnej vetve).
