# Subscription-first routing (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Dve nové id `auto/*` — `auto/subscription` a `auto/thrifty`. Obe sú voliteľné a aktivujú sa
> vyžiadaním: nič sa cez ne nesmeruje, pokiaľ volajúci nepožiada o dané id podľa názvu, a nemení sa
> žiadny existujúci fond, stratégia ani predvolené nastavenie.

## Prečo to existuje

OmniRoute už odpovedá na dve otázky týkajúce sa nákladov, no ani jedna z nich nie je tou, ktorú kladie väčšina prevádzkovateľov.

| Existujúci mechanizmus                                   | Odpovedá na otázku                                 |
| -------------------------------------------------------- | -------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | „je tento model v katalógu vedený ako bezplatný?“  |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | „môže mi byť toto pripojenie niekedy účtované?“    |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | „blíži sa toto pripojenie k svojmu limitu?“        |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | „obmedziť výdavky, prejsť na najlacnejšiu možnosť“ |

Každý mechanizmus obmedzený iba na bezplatné možnosti **zlyhá uzavretím** — vyčerpaný bezplatný fond je prázdny fond, nikdy
nie prechod na platenú možnosť — a každý mechanizmus na platenej strane ignoruje cenové úrovne. Ani jeden neodpovedá:

> „Použi kvótu, za ktorú už platím. Keď sa vyčerpá, buď skonči, alebo postupuj po jednej úrovni
> cez najlacnejšie platené možnosti — a vráť sa hneď, ako sa kvóta obnoví.“

## Fakturácia je vlastnosťou pripojenia, nie modelu

`classifyTier()` (`open-sse/services/tierResolver.ts`) používa kľúč `(provider, model)` a podľa
katalógových cien vracia `free | cheap | premium`. To, či požiadavka spôsobí dodatočné náklady,
však závisí od toho, **ktoré pripojenie ju obslúži**: rovnaký model je zahrnutý v pláne cez pripojenie
Claude Code OAuth, ale pri pripojení pomocou API kľúča sa účtuje za token.

`provider_connections.auth_type` nie je spoľahlivým indikátorom ani v jednom smere — existujú
účtované pripojenia OAuth aj pripojenia pomocou API kľúča zahrnuté v pláne (token používateľského
miesta Copilot nie je účtovaný API kľúč). Trieda fakturácie preto pochádza z **kurátorovaného katalógu**,
`open-sse/config/connectionBillingCatalog.ts`, nastaveného ručne podľa zverejnených podmienok každého
poskytovateľa — ide o rovnaký vzor, aký už pre bezplatné modely zaviedol
`FreeModelBudget.hardStopGuaranteed`.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Poradie vyhodnocovania (`autoCombo/connectionBilling.ts`): syntetický indikátor bez autentifikácie →
`keyless`; položka katalógu zodpovedajúca poskytovateľovi **aj** `authType`; položka pre celého
poskytovateľa; inak `unknown`. **Nekurátorované neznamená bezplatné** — `unknown` sa všade
považuje za `metered`, takže poskytovateľ pridaný zajtra začne mimo úrovne predplatného a musí byť
zámerne zaradený do katalógu.

## Model úrovní

Päť úrovní v poradí eskalácie. Líšia sa nielen cenou — každá má **vlastný**
signál vyčerpania, preto nejde iba o triedenie.

| #   | Úroveň         | Členstvo                                            | Vyčerpaná, keď                             |
| --- | -------------- | --------------------------------------------------- | ------------------------------------------ |
| 0   | `subscription` | kurátorované `billing: "subscription"`              | okno kvóty je na hranici alebo pod limitom |
| 1   | `keyless`      | syntetická cesta bez autentifikácie                 | časové blokovanie pripojenia / istič       |
| 2   | `free`         | účtované pripojenie, `classifyTier() === "free"`    | bezplatný prídel je vyčerpaný              |
| 3   | `cheap`        | účtované pripojenie, `classifyTier() === "cheap"`   | rozpočet danej úrovne je vyčerpaný         |
| 4   | `premium`      | účtované pripojenie, `classifyTier() === "premium"` | rozpočet danej úrovne je vyčerpaný         |

Úrovne 0-2 sa vyčerpávajú na základe **kvóty**, ktorá je pozorovateľná a už sa sleduje. Úrovne 3-4
nemajú žiadnu kvótu — platené pripojenie môže obsluhovať požiadavky donekonečna — takže jediným
rozumným signálom ich vyčerpania je **rozpočet** pre každú úroveň. Bez neho nemá príkaz
„eskalovať po vyčerpaní úrovne `cheap`“ žiadny spúšťač.

## `auto/subscription` — bezpečné zlyhanie

Fond = iba úroveň 0, obmedzená na pripojenia, ktorých prekročenie limitu je zdokumentované ako `hard-stop`, pričom pri každom je naživo overená dostatočná rezerva kvóty. Všetko nejednoznačné je vylúčené: nespravovaný poskytovateľ, neoveriteľný údaj o kvóte, zastaraný údaj alebo prekročenie limitu, ktoré sa účtuje.

Prázdny fond je **zamýšľaným** výsledkom, nie chybou — existujúca cesta volajúceho pre prázdny fond ho zmení na jasnú chybu namiesto tichého, spoplatneného záložného riešenia. To je celý prísľub tohto id.

`keyless` zámerne **nespĺňa** podmienky: toto zoskupenie znamená „plán, za ktorý platím“, takže backend bez autentifikácie doň nepatrí. Na tento účel použite `auto/thrifty` (alebo `auto/best-free`).

### Bezpečnosť pripojení

Kandidát nie je vždy viazaný na jedno pripojenie — logický kandidát obsahuje zoznam povolených položiek `allowedConnectionIds` a účet, ktorý sa skutočne použije, vyberá neskôr pri odoslaní súbor `open-sse/services/combo/autoStrategy.ts`. Obe zoskupenia preto overujú **každé pripojenie samostatne** a prepisujú `allowedConnectionIds` presne na podmnožinu pripojení, ktoré prešli — nikdy nie na celý pôvodný zoznam ani na jedného ľubovoľne vybraného člena. Keďže `autoStrategy.ts` už toto pole vynucuje ako striktný zoznam povolených hodnôt, jeho prepísanie na tomto mieste zabezpečuje, že množiny „overené“ a „skutočne použité“ sú z princípu totožné. Ide o rovnaký invariant a rovnaké odôvodnenie ako pri [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — postup o jednu úroveň naraz

Fond = všetky úrovne zoradené podľa indexu úrovne, pričom vyčerpaní kandidáti sú vyradení. Mechanizmus `auto` naďalej vyhodnocuje kandidátov **v rámci** zostávajúceho fondu: rebrík určuje, ktoré úrovne sa zohľadnia, a vyhodnocovanie rozhoduje, ktorý kandidát v nich zvíťazí. Poradie v rámci úrovne je stabilné, takže toto prekrytie nikdy nemení vlastné poradie vyhodnocovacieho mechanizmu.

Ide o prekrytie poradia a podmienok zaradenia, **nie** o nový dispečer: špekulatívna slučka v `combo.ts` už prechádza ciele v určenom poradí a pri zlyhaní pokračuje ďalej, takže vyčerpanie počas behu, ktoré predbežná kontrola nezachytila, stále vedie k postupu na ďalšiu úroveň v rámci tej istej požiadavky.

Kým `auto/subscription` zlyháva **bezpečne**, `auto/thrifty` zlyháva **otvorene**: pripojenie zahrnuté v pláne bez použiteľného údaja o kvóte sa napriek tomu vyskúša ako prvé. Jeho vyskúšanie nič nestojí, a ak sa ukáže, že je vyčerpané, pokračovanie po zlyhaní sa aj tak dostane na ďalšiu úroveň — odmietnutie pokusu by však pri chýbajúcej telemetrii odoslalo požiadavku na platenú úroveň, teda presne k výsledku, ktorému má toto zoskupenie zabrániť.

## Návrat k plánu po obnovení limitu

Pred návratom smerovania na úroveň 0 musia vypršať tri nezávislé mechanizmy. Oprava iba jedného z nich ponechá rebrík zaseknutý na platených úrovniach ešte dlho po doplnení limitu plánu.

1. **Vyrovnávacia pamäť stavu kvóty** — `freeAccessQuota.ts` ukladá údaje pre každú dvojicu `(provider, connection)` do vyrovnávacej pamäte s TTL 180 s. Záznam vo vyrovnávacej pamäti, ktorého vlastný čas `resetAt` už uplynul, opisuje okno, ktoré už neexistuje, a preto sa teraz považuje za zastaraný **bez ohľadu na vek** a vynúti obnovenie. Bez toho sa plán, ktorého limit sa doplnil o polnoci, naďalej javí ako vyčerpaný, kým náhodou neuplynie TTL.
2. **Vlastný stav rebríka** — zámerne žiadny neexistuje. Oprávnenosť úrovní sa pri každom zostavení fondu prepočítava zo živého stavu kvóty; neexistuje žiadny trvalo uložený záznam „momentálne na úrovni 3“, ktorý by mohol pretrvať po obnovení limitu a zablokovať smerovanie.
3. **Čas blokovania pripojenia** — odpoveď 429 spôsobená vyčerpaním nastaví `rateLimitedUntil` podľa exponenciálneho predlžovania intervalov, ktoré môže pri pripojení v rámci plánu presiahnuť skutočný čas obnovenia limitu. `clampCooldownToReset()` (`subscriptionLadder.ts`) skráti čas blokovania na okamih obnovenia limitu na strane nadradenej služby a nikdy ho nemôže predĺžiť. **Funkcia je implementovaná a otestovaná, ale zatiaľ nie je zapojená**: vyrovnávacia pamäť kvóty sa v `src/sse/services/auth.ts` zneplatní _pred_ zapísaním času blokovania, takže `resetAt` sa musí v tejto funkcii zachytiť skôr — ide o zmenu kritickej cesty odolnosti, ktorá patrí do samostatného revidovaného PR. Dovtedy opätovné zaradenie čaká na uplynutie času blokovania pripojenia (ktorý už uprednostňuje pokyny `Retry-After` z nadradenej služby, ak ich poskytovateľ odošle).

### Ochrana proti oscilácii

Úroveň, ktorej limit sa práve obnovil, sa znova zaradí iba pri hodnote vyššej než `reentryMinRemainingPercent` (predvolene 5), zatiaľ čo pripojenie, ktoré sa už používa, musí zostať iba nad hodnotou `exitCutoffPercent` (predvolene 2, čo zodpovedá `quotaPreflight.defaultThresholdPercent`). Rozdiel medzi nimi je pásmo hysterézie — bez neho by pripojenie pohybujúce sa okolo hraničnej hodnoty pri po sebe nasledujúcich požiadavkách oscilovalo medzi úrovňami.

## Konfigurácia

Iba dolaďovanie. Zámerne tu **nie je** príznak `enabled`: prepínač, ktorým by sa dali tieto režimy vypnúť,
by spôsobil, že `auto/subscription` by nenápadne obsluhoval celý fond — vrátane platených modelov — pod
názvom, ktorý sľubuje opak.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // Hodnota 0 úplne zakáže priečku
  },
}
```

Obmedzenie podľa rozpočtu je neaktívne, kým sa nezapojí resolver výdavkov: ak nie sú k dispozícii účtovné
údaje, platená priečka sa zaradí, ale nikdy sa neobmedzí. Od verzie v3.8.51 schéma nastavenie
`rungBudgetUsd` prijíma, ale zatiaľ ho NEVYNUCUJE — považujte ho za rezervovanú konfiguráciu, nie za aktívny
limit výdavkov. Zoraďovanie priečok, vyčerpanie založené na kvóte a opätovné zaradenie po obnovení fungujú
aj bez neho.

## Kompozícia

`subscription` a `thrifty` sú hodnoty `AutoTier`, takže ich možno kombinovať s každou kategóriou:
`auto/coding:thrifty`, `auto/reasoning:subscription` a podobne. Dva samostatné identifikátory
(`auto/subscription`, `auto/thrifty`) sa zobrazujú v `/v1/models` a na ovládacom paneli.

Ani jeden identifikátor nepatrí do platenej úrovne, takže `isPaidTierAutoId()` pre oba vracia `false` a
`auto/subscription` zostáva zachovaný aj pri použití `hidePaidModels`.

## Kde sa nachádza kód

| Oblasť                                                | Súbor                                               |
| ----------------------------------------------------- | --------------------------------------------------- |
| Spravované fakturačné údaje                           | `open-sse/config/connectionBillingCatalog.ts`       |
| Klasifikátor                                          | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Priečky, obe zoskupenia a opätovné zaradenie          | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Zapojenie do fondu kandidátov                         | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Zastaranie vyrovnávacej pamäte zohľadňujúce obnovenie | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Rozhranie úrovní                                      | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Zverejňované identifikátory                           | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Testy                                                 | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
