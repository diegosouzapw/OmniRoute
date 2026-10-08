# Release-Green: keeping the queue and release branch green (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Problém, který toto řeší

**Kompletní sada kontrol** (`.github/workflows/ci.yml` — jednotkové shardy, vitest, ratchety,
`package-artifact`, SonarQube, E2E) se spouští **pouze pro release PR** (PR → `main`). PR cílené
na `release/**` procházejí **rychlými kontrolami** (`quality.yml`: testy ovlivněné podle TIA + kontrola typů + lint)
a v případě změn kódu také **informativním** produkčním sestavením. Důsledek: chyby specifické pro release
se mohou na release větvi nepozorovaně hromadit a v okamžiku vydání **vybuchnout ve vrstvách po ~40 min**,
jedna po druhé.

Rodina „release-green“ existuje proto, aby těmto chybám **předcházela** — kdykoli ověřila ekvivalent kompletní
sady kontrol **lokálně / mimo proces vydání**, takže release PR je zelený už při svém prvním
běhu CI.

> **Nezpochybnitelný princip:** nic z toho nesmí blokovat přispěvatele. Nepřidáváme žádnou povinnou
> kontrolu, jejíž selhání by zablokovalo jejich PR. **Odchylky** (ratchety) má při vydání znovu nastavit správce —
> nikdy nejsou starostí přispěvatele. Žádná součást **nezavírá** PR (přivlastnění zásluh) ani
> **neoslabuje** test, aby prošel.

## Rodina (4 součásti) — a jak se každá spouští nezávisle

| Součást                                                                  | Co to je                                                                                   | Kdy ji spustit                                                     | Rozsah                        |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ | ----------------------------- |
| **`/green-prs`** (Řešení A)                                              | Kontrola **fronty otevřených PR** na vyžádání správcem                                     | **Nezávisle, pravidelně** — a zejména **před** `/generate-release` | Celá fronta PR → `release/**` |
| **`/validate-release-green`** (Řešení C — `npm run check:release-green`) | Validační nástroj: reprodukuje kompletní sadu kontrol pro větev NEBO kandidáta na sloučení | Nezávisle, kdykoli                                                 | Konkrétní větev nebo merge PR |
| **`/babysit <PR#>`**                                                     | Dovede **živé CI** jednoho PR do zeleného stavu                                            | Nezávisle, pro každý PR                                            | Jeden PR                      |
| **`nightly-release-green.yml`** (Řešení D)                               | Automatizovaný noční workflow; při KRITICKÉM neúspěchu otevře issue                        | Automaticky (cron)                                                 | Aktivní release větev         |

**Krátká odpověď na otázku „je to jen pro releasy?“:** **ne.** `/green-prs` byl navržen tak, aby se
spouštěl **pravidelně mezi releasy**. Nezávislé spouštění je běžný způsob použití — release je pouze
okamžikem, kdy jeho spuštění přináší největší hodnotu.

## Poradní sestavení od PR k vydání

`quality.yml` nyní zahrnuje `Build (advisory)` pro koncepty neoznačené kódové PR a větve fronty Mergify.
Kopíruje produkční postup sestavení z `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` a `npm run build` s `OMNIROUTE_USE_TURBOPACK=1`. Záměrně
nenahrává artefakt sestavení, protože jej v tomto workflow nevyužívá žádná navazující úloha kontroly kvality.
Po jednom týdnu stabilních běhů PR vydání odstraňte `continue-on-error`, aby se tento signál stal
blokující bránou mezi PR a vydáním.

## Řešení C — `npm run check:release-green` (jádro)

Reprodukuje validaci odpovídající vydání nad aktuálním pracovním stromem a klasifikuje každý neúspěch:

- **HARD** (typecheck, chyby lintu, unit, vitest, db-rules, public-creds, volitelně
  `package-artifact`) → **skutečná vada**; `exit 1`. Opravuje se ve zdrojové větvi (TDD, pravidlo #18).
- **DRIFT** (**varování** eslintu, cognitive-complexity, file-size) → posun prahových hodnot nahromaděný
  během cyklu, **nikoli vina přispěvatele**; pouze se nahlásí a **správce jej při
  vydání znovu nastaví jako výchozí stav**. DRIFT **nikdy** nemění návratový kód — takže nikoho neblokuje.

```bash
npm run check:release-green                 # aktuální větev (pracovní strom)
node scripts/quality/validate-release-green.mjs --json   # strukturovaný výstup
node scripts/quality/validate-release-green.mjs --quick  # přeskočí unit+vitest (pouze drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # zahrnuje package-artifact (pomalé)
```

Pouze diagnostikuje a **hlásí** (bez automatických oprav). Orchestrace oprav do zeleného stavu se nachází v
`/green-prs` a `/review-prs`.

## Řešení A — `/green-prs` (kontrola fronty)

Postup (shrnutí — podrobnosti najdete v dovednosti `green-prs`):

1. **Inventarizujte** frontu otevřených PR vůči aktivní větvi vydání.
2. **Roztřiďte** každý PR (životaschopný / vhodný k zamítnutí / vyžaduje zásah autora) — PR k zamítnutí / vyžadující zásah autora se
   **nahlásí, ale nezavřou** (rozhoduje autor).
3. Pro každý životaschopný PR jej v **izolovaném pracovním stromu** (pravidlo #19) přeneste
   na špičku větve vydání a spusťte `npm run check:release-green`:
   - **HARD** → opravte **ve větvi přispěvatele** prostřednictvím spoluautorství (zachová autorův stav „Merged“),
     poté kontrolu opakujte, dokud nebudou odstraněny všechny HARD chyby.
   - **DRIFT** → ponechte jej; při vydání bude znovu nastaven jako výchozí stav.
4. **Vygenerujte** tabulku PR × (verdikt, HARD chyby, opraveno?, DRIFT, nyní release-green?).

Dokáže **připravit** frontu bez slučování; slučuje pouze na výslovný požadavek — a nikdy PR nezavírá.

## Doporučená frekvence

- Spouštějte **`/green-prs` pravidelně** (např. každý týden) a **vždy před
  `/generate-release`**.
- Ponechte **`nightly-release-green.yml`** (řešení D) jako průběžný signál: jakmile otevře
  issue s HARD chybou, je čas provést kontrolu.
- Pomocí **`/validate-release-green`** podle potřeby kontrolujte větev nebo konkrétního kandidáta na sloučení.
- Když je potřeba dovést konkrétní PR do zeleného stavu v živém CI, použijte **`/babysit <PR#>`**.

## Vztah k vydání

- `/generate-release` volá validaci ve **fázi 0 (předběžná kontrola)**: znovu nastaví výchozí stav pro DRIFT a opraví
  HARD chyby před otevřením PR vydání.
- `/review-prs` používá bránu release-green v kroku rozhodování o sloučení (zelený stav před sloučením).

Cíl všech částí je stejný: **zelený PR vydání při prvním běhu CI**, namísto postupného zdolávání
chyb v 40minutových vrstvách v den vydání.
