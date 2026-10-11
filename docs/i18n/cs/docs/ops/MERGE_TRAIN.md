# Merge Queue & Manual Merge-Train Runbook (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Od verze v3.8.49 (WS3.2/WS3.4 plánu kvality/rychlosti) je výchozí cestou slučování
zkontrolovaných PR do `release/vX.Y.Z` **fronta slučování Mergify** (`.mergify.yml`);
níže zdokumentovaný **ruční merge-train** je ZÁLOŽNÍ postup — používá se během incidentů,
zmrazení vydání nebo pokud se někdy změní plán Mergify Open Source.

## Výchozí cesta: fronta Mergify

1. PR je zkontrolován kampaněmi, získá zelený stav a je schválen předslučovací ⭐
   bránou vlastníka (report + rozhodnutí pro každou položku — viz `/merge-prs`, krok 0.75).
2. Vlastník (nebo relace jednající na základě rozhodnutí vlastníka) přidá štítek **`queue`**.
   Tento štítek JE schválením sloučení; Mergify jej pouze provede.
3. Mergify ověřuje PR zařazené do fronty **sériově** (jeden po druhém) pomocí rychlých
   kontrol a slučuje je (squash). Dávkové zpracování + automatické půlení vyžaduje
   placenou úroveň Mergify („Cannot use Merge Queue batch“ u bezplatného plánu, #7220),
   proto `.mergify.yml` nenastavuje žádný `batch_size`; dávkové zpracování zůstává
   úlohou níže popsaného ručního slučovacího vlaku. PR, jehož kontroly stále čekají
   po uplynutí `checks_timeout` (240 min = 2× naměřený p95 pro `quality.yml`), je
   odebrán z fronty, aby ji nezablokoval.
4. Po sloučení průběžný workflow kontroly zeleného stavu vydání ověří nový vrchol
   při pushi a v případě, že kombinace způsobila regresi, otevře problém s uvedením
   původu (nikdy neprovádí automatický revert).

Ochranná pravidla (odpovídají přísným pravidlům č. 21/22 v `CLAUDE.md`):

- **Probíhá zmrazení vydání** → NEPŘIDÁVEJTE štítky k PR cílícím na zmrazenou větev;
  nejprve je přesměrujte na aktivní `release/vX+1`.
- **Rozpracovaný PR jiné relace** → nikdy k němu nepřidávejte štítek; pouze vlastnící
  relace zařazuje svou práci do fronty.
- Změny pouze v testech a PR se štítkem `hotfix` již používají omezenou sadu CI
  kontrol (viz `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); podmínky fronty akceptují
  libovolnou sadu kontrol, která se skutečně spustila (`#check-failure=0` +
  `#check-pending=0`).

## Záložní postup: ruční merge-train

Používá se, když fronta není dostupná. Formalizuje postup, kterým bylo během cyklu v3.8.47
za jediný den zpracováno 33 PR:

1. **Sestavte dávku** (~10–30 zkontrolovaných a schválených PR). Zkontrolujte kolize `linked:`
   (stejné `tap.testFiles`, stejné části CHANGELOGu) a zpracujte je sériově.
2. **Ověřte POUZE JEDNOU**: v izolovaném worktree založeném na tipu vydání lokálně slučte všechny
   hlavy dávky a poté spusťte sadu odpovídající vydání
   (`npm run check:release-green`; před vydáním přidejte `--with-build`).
   `scripts/release/merge-train.sh <base> <PR#>…` automatizuje kroky 1–2 (konfliktní
   PR jsou vyřazeny, vlak pokračuje). Plný režim spouští `npm run test:unit` — spouštěč
   vyladěný pro daný stroj (`--test-concurrency=20`), **nikoli** dva sekvenční 4jádrové CI
   shardy, kvůli nimž dominantní fáze využívala jen ~25 % 16jádrového stroje (opraveno
   2026-07-18). `--fast` (vnitrodenní zpracování mega-vlaku, schválené vlastníkem 2026-07-18)
   zachovává všechny statické brány + vitest, ale spouští pouze soubory node:test změněné
   zařazenými PR; PLNÁ sada musí nad kumulovaným tipem přesto proběhnout alespoň jednou
   denně (jeden vlak bez `--fast`).
3. **Zelená** → slučte PR postupně (před každým znovu zkontrolujte `state,headRefOid` —
   PR, jehož hlava se změnila, se vrací do kontroly). Prokažte, že výsledný rozdíl každého
   sloučení obsahuje pouze vlastní změnu daného PR (žádné reverty automatického řešení:
   pomocí `git diff --stat` zkontrolujte odstranění mimo rozsah).
4. **Červená** → rozdělte dávku metodou bisekce na poloviny (ověřte každou polovinu), místo abyste
   ji znovu ověřovali položku po položce; vraťte problematický PR s důkazy zpět do fronty ke kontrole.
5. **Nikdy**: neslučujte během zmrazení do zmrazené větve; nikde nepoužívejte `git stash`;
   nespouštějte CI plošně znovu v naději, že červená zmizí (pravidlo: červená je informace).

## Úrovně (proč je fronta bezpečná pouze s rychlými branami)

- **Pro každý PR** (rychlé brány quality.yml): testy ovlivněné podle TIA + úplné jednotkové testy ve 4 shardech +
  vitest + sada lintů + kontrola typů + integrita dokumentace/changelogu.
- **Pro každou dávku/tip** (průběžné release-green): TVRDÉ brány `--quick` při každém pushi do
  větve vydání; úplné průchody `--with-build --full-ci` 3× denně.
- **Pro každé vydání** (ci.yml na PR vydání): kompletní matice včetně E2E ×9,
  artefaktu balíčku + základního testu spuštění z tarballu, pokrytí/ratchetů.

Nic není ověřováno méně než dříve — náročná část se pouze spouští pro každou dávku/tip
místo pro každý PR, čímž se odstraňují O(N) opakované průchody.

## Předpoklady pro `merge-train.sh` v čerstvě naklonovaném repozitáři

Skript spouští v kořenovém checkoutu **předběžnou kontrolu** s okamžitým ukončením při chybě
(před jakoukoli prací s worktree), aby se poškozená instalace nikdy nemohla vydávat za červený vlak:

1. Spusťte `npm ci` a poté postinstall pro `bun`, který npm blokuje:
   `(cd node_modules/bun && node install.js)` — jinak `check:provider-consistency`
   a `check:known-symbols` (oba používají `bun scripts/…`) selžou ve vlaku I na základní větvi,
   aniž by uvedly řádek s porušením.
2. Nesmí existovat žádný nadbytečný `node_modules/node_modules` (duplicitní strom závislostí; React se načte dvakrát
   a sady UI testů vitest okamžitě selžou).
3. `node_modules/.bin/tsc` musí existovat a být spustitelný (v částečné instalaci chybí).

Vlak spouští blokující `npm run check:cycles:ratchet`; samotný `npm run check:cycles`
je pouze informativní (vypíše SCC a skončí nenulovým kódem i na zdravé základní větvi).
