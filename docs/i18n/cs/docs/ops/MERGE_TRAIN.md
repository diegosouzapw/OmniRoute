# Merge Queue & Manual Merge-Train Runbook (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Od verze v3.8.49 (WS3.2/WS3.4 plánu kvality/rychlosti) je výchozí cestou začlenění
zkontrolovaných PR do `release/vX.Y.Z` **fronta začlenění Mergify** (`.mergify.yml`);
níže zdokumentovaný **ruční slučovací vlak** je ZÁLOŽNÍ VARIANTA — používá se během incidentů,
zmrazení vydání nebo pokud se někdy změní plán Mergify Open Source.

## Výchozí cesta: fronta Mergify

1. PR je zkontrolován, kampaně jej označí jako zelený a vlastník jej schválí pomocí
   své brány ⭐ před začleněním (zpráva + rozhodnutí pro každou položku — viz krok 0.75
   v `/merge-prs`).
2. Vlastník (nebo relace jednající na základě rozhodnutí vlastníka) přidá štítek
   **`queue`**. Tento štítek JE schválením začlenění; Mergify jej pouze provede.
3. Mergify seskupí až 10 PR ve frontě, ověří dávku pomocí rychlých kontrol
   a začlení ji (squash). Červená dávka je **automaticky půlena** — problematický PR
   je izolován přibližně za log2(N) opakovaných ověření a odebrán z fronty; ostatní pokračují.
4. Po začlenění průběžný pracovní postup release-green při odeslání změn ověří nový vrchol
   a otevře problém s uvedením původu, pokud kombinace způsobila regresi (nikdy neprovádí automatický revert).

Ochranná pravidla (odpovídají tvrdým pravidlům č. 21/22 v `CLAUDE.md`):

- **Probíhá zmrazení vydání** → NEPŘIDÁVEJTE štítky k PR cílícím na zmrazenou větev;
  nejprve změňte jejich cíl na aktivní `release/vX+1`.
- **Rozpracovaný PR jiné relace** → nikdy k němu nepřidávejte štítek; do fronty svou práci
  zařazuje pouze relace, která ji vlastní.
- Rozdíly obsahující pouze testy a PR se štítkem `hotfix` již používají omezené CI (viz
  `RELEASE_CHECKLIST.md` → Zrychlený postup pro opravy hotfix); podmínky fronty přijmou jakoukoli
  sadu kontrol, která byla skutečně spuštěna (`#check-failure=0` + `#check-pending=0`).

## Záložní varianta: ruční slučovací vlak

Používá se, když fronta není dostupná. Formalizuje postup, který během cyklu v3.8.47
zpracoval 33 PR za jediný den:

1. **Sestavte dávku** (~10–30 zkontrolovaných a schválených PR). Zkontrolujte kolize `linked:`
   (stejné `tap.testFiles`, stejné části CHANGELOG) a zpracujte je postupně.
2. **Ověřte POUZE JEDNOU**: v izolovaném worktree založeném na vrcholu větve vydání lokálně začleňte
   hlavičky všech PR v dávce a poté spusťte sadu odpovídající vydání
   (`npm run check:release-green`, před vydáním přidejte `--with-build`).
   `scripts/release/merge-train.sh <base> <PR#>…` automatizuje kroky 1–2 (PR s konflikty
   jsou vyřazeny a vlak pokračuje). Plný režim spouští `npm run test:unit` — běhové prostředí
   vyladěné pro daný stroj (`--test-concurrency=20`), **nikoli** dva sekvenční 4jádrové CI
   oddíly, které způsobovaly, že dominantní fáze využívala přibližně 25 % 16jádrového stroje (opraveno
   2026-07-18). `--fast` (vnitrodenní zpracování megavlaků, schválené vlastníkem 2026-07-18)
   zachovává všechny statické brány + vitest, ale spouští pouze soubory node:test změněné
   zařazenými PR; PLNÁ sada musí být stále spuštěna alespoň jednou denně nad
   souhrnným vrcholem (jeden vlak bez `--fast`).
3. **Zelená** → začleňte PR postupně (před každým znovu zkontrolujte `state,headRefOid` —
   PR, jehož hlavička se změnila, se vrací ke kontrole). Ověřte, že výsledný rozdíl každého začlenění
   obsahuje pouze vlastní změnu daného PR (žádné reverty způsobené automatickým řešením konfliktů: zkontrolujte
   pomocí `git diff --stat`, zda nedošlo k odstraněním mimo rozsah).
4. **Červená** → rozdělte dávku na poloviny (ověřte každou polovinu) namísto opakovaného ověřování
   jednoho PR po druhém; vraťte problematický PR do fronty ke kontrole spolu s důkazy.
5. **Nikdy**: nezačleňujte během zmrazení do zmrazené větve; nikde nepoužívejte `git stash`;
   nespouštějte plošně znovu CI v naději, že červená zmizí (pravidlo: červená je informace).

## Úrovně (proč je fronta bezpečná pouze s rychlými kontrolami)

- **Pro každý PR** (rychlé kontroly quality.yml): testy ovlivněné podle TIA + úplné jednotkové testy
  ve 4 oddílech + vitest + sada lintů + kontrola typů + integrita dokumentace/CHANGELOG.
- **Pro každou dávku/vrchol** (průběžný release-green): PEVNÉ brány `--quick` při každém odeslání
  do větve vydání; úplné průchody `--with-build --full-ci` 3× denně.
- **Pro každé vydání** (ci.yml v PR vydání): úplná matice včetně E2E ×9,
  artefaktu balíčku + základního spouštěcího testu tarballu, pokrytí/prahových hodnot.

Nic se neověřuje méně než dříve — náročná část se pouze spouští pro každou dávku/vrchol
namísto pro každý PR, což odstraňuje O(N) opakovaných cyklů.
