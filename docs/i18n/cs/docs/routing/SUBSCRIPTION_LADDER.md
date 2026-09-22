# Subscription-first routing (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Dvě nová id `auto/*` — `auto/subscription` a `auto/thrifty`. Obě jsou aktivována explicitním
> vyžádáním: nic přes ně není směrováno, pokud volající nepožádá o dané id podle názvu, a nemění se
> žádný existující fond, strategie ani výchozí nastavení.

## Proč to existuje

OmniRoute již zodpovídá dvě otázky týkající se nákladů, ale ani jedna není tou, kterou si klade většina provozovatelů.

| Existující mechanismus                                   | Odpovídá na otázku                                |
| -------------------------------------------------------- | ------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | „je tento model v katalogu veden jako bezplatný?“ |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | „může mi být toto připojení někdy účtováno?“      |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | „blíží se toto připojení svému limitu?“           |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | „omezit výdaje, přejít na nejlevnější variantu“   |

Každý mechanismus omezený pouze na bezplatné možnosti **selže uzavřeně** — vyčerpaný bezplatný fond je prázdný fond, nikdy
nedojde k přechodu na placenou možnost — a každý mechanismus na placené straně nerozlišuje úrovně. Ani jeden neodpovídá:

> „Použij kvótu, kterou už platím. Když se vyčerpá, buď se zastav, nebo postupuj po jedné úrovni
> přes nejlevnější placené možnosti — a vrať se hned, jakmile se kvóta obnoví.“

## Účtování je vlastností připojení, nikoli modelu

`classifyTier()` (`open-sse/services/tierResolver.ts`) používá jako klíč `(provider, model)` a na základě
katalogových cen vrací `free | cheap | premium`. To, zda požadavek způsobí dodatečné náklady,
ale závisí na tom, **které připojení jej obslouží**: tentýž model je zahrnutý v předplatném při použití připojení
Claude Code OAuth a účtovaný za token při použití připojení s API klíčem.

`provider_connections.auth_type` není spolehlivým indikátorem ani v jednom směru — existují
účtovaná připojení OAuth i připojení s API klíčem zahrnutá v předplatném (token uživatelské licence Copilot není
účtovaný API klíč). Třída účtování proto pochází z **ručně spravovaného katalogu**
`open-sse/config/connectionBillingCatalog.ts`, sestaveného ručně podle zveřejněných podmínek jednotlivých poskytovatelů —
stejného vzoru, který již pro bezplatné modely zavedlo `FreeModelBudget.hardStopGuaranteed`.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Pořadí vyhodnocování (`autoCombo/connectionBilling.ts`): syntetický příznak bez ověření →
`keyless`; položka katalogu odpovídající poskytovateli **i** `authType`; položka platná pro celého poskytovatele;
jinak `unknown`. **Co není v katalogu, není bezplatné** — `unknown` se všude používá jako `metered`,
takže poskytovatel přidaný zítra začne mimo úroveň předplatného a musí do ní být záměrně
zařazen.

## Model úrovní

Pět úrovní v pořadí eskalace. Liší se nejen cenou — každá má svůj **vlastní**
signál vyčerpání, a proto nejde pouze o řazení.

| #   | Úroveň         | Členství                                           | Považuje se za vyčerpanou, když             |
| --- | -------------- | -------------------------------------------------- | ------------------------------------------- |
| 0   | `subscription` | ručně spravované `billing: "subscription"`         | okno kvóty je na hranici limitu nebo pod ní |
| 1   | `keyless`      | syntetická cesta bez ověření                       | časové omezení připojení / jistič           |
| 2   | `free`         | účtované připojení, `classifyTier() === "free"`    | bezplatný příděl je vyčerpán                |
| 3   | `cheap`        | účtované připojení, `classifyTier() === "cheap"`   | rozpočet úrovně je vyčerpán                 |
| 4   | `premium`      | účtované připojení, `classifyTier() === "premium"` | rozpočet úrovně je vyčerpán                 |

Úrovně 0–2 se vyčerpávají na základě **kvóty**, kterou lze pozorovat a která se již sleduje. Úrovně 3–4 žádnou
kvótu nemají — placené připojení poskytuje službu neomezeně — takže jejich jediným rozumným signálem vyčerpání je **rozpočet**
pro jednotlivé úrovně. Bez něj nemá požadavek „eskalovat po vyčerpání levné úrovně“ žádný spouštěč.

## `auto/subscription` — selhání do uzavřeného stavu

Fond = pouze úroveň 0, omezená na připojení, jejichž překročení limitu je zdokumentováno jako `hard-stop`, přičemž u každého je živě ověřena dostatečná rezerva kvóty. Vše nejednoznačné je vyloučeno: nezařazený poskytovatel, neověřitelný údaj o kvótě, zastaralý údaj nebo překročení limitu účtované jako placené.

Prázdný fond je **zamýšlený** výsledek, nikoli chyba — existující cesta volajícího pro prázdný fond jej převede na srozumitelnou chybu namísto tichého, zpoplatněného záložního řešení. To je celý příslib tohoto id.

`keyless` záměrně **nesplňuje** podmínky: toto seskupení znamená „tarif, za který platím“, takže backend bez ověřování do něj nepatří. Pro tento účel použijte `auto/thrifty` (nebo `auto/best-free`).

### Bezpečnost připojení

Kandidát není vždy svázán pouze s jedním připojením — logický kandidát nese seznam povolených připojení `allowedConnectionIds` a skutečně použitý účet je vybrán později, při odeslání, pomocí `open-sse/services/combo/autoStrategy.ts`. Obě seskupení proto ověřují **každé připojení jednotlivě** a přepisují `allowedConnectionIds` tak, aby obsahoval přesně přeživší podmnožinu — nikdy celý původní seznam ani jedno libovolně zvolené připojení. Protože `autoStrategy.ts` již toto pole vynucuje jako striktní seznam povolených hodnot, jeho přepsání zde zajišťuje, že „ověřené“ a „skutečně použité“ tvoří z definice stejnou množinu. Jde o stejný invariant a stejné zdůvodnění jako u [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — eskalace po jedné úrovni

Fond = všechny úrovně seřazené podle indexu úrovně, přičemž vyčerpaní kandidáti jsou vyřazeni. Mechanismus `auto` stále provádí hodnocení **uvnitř** přeživšího fondu: žebřík určuje, které úrovně jsou ve hře, zatímco hodnocení určuje, který kandidát v nich zvítězí. Pořadí je v rámci úrovně stabilní, takže tato překryvná vrstva nikdy nepřeskupuje vlastní pořadí hodnoticího mechanismu.

Jde o překryvnou vrstvu řazení a omezování, **nikoli** o nový dispečer: spekulativní smyčka v `combo.ts` již prochází cíle v daném pořadí a při selhání pokračuje dál, takže vyčerpání za běhu, které předběžná kontrola nezachytila, stále způsobí eskalaci na další úroveň v rámci stejného požadavku.

Zatímco `auto/subscription` selhává **do uzavřeného stavu**, `auto/thrifty` selhává **do otevřeného stavu**: připojení zahrnuté v tarifu bez použitelného údaje o kvótě se přesto zkusí jako první. Jeho vyzkoušení nic nestojí, a pokud se ukáže, že je vyčerpané, pokračování při selhání stejně dosáhne další úrovně — naproti tomu odmítnutí pokusu by při chybějící telemetrii odeslalo požadavek do placené úrovně, tedy přesně k výsledku, kterému má toto seskupení zabránit.

## Návrat k tarifu po resetování

Než se směrování vrátí na úroveň 0, musí nezávisle vypršet tři věci. Oprava pouze jedné z nich ponechá žebřík zablokovaný na placených úrovních ještě dlouho po obnovení tarifu.

1. **Mezipaměť stavu kvóty** — `freeAccessQuota.ts` ukládá výsledky do mezipaměti pro každou dvojici `(provider, connection)` s TTL 180 s. Položka v mezipaměti, jejíž vlastní `resetAt` již uplynul, popisuje časové okno, které už neexistuje, takže je nyní považována za zastaralou **bez ohledu na stáří** a vynutí obnovení. Bez toho by se tarif obnovený o půlnoci stále jevil jako vyčerpaný, dokud by náhodou nevypršel TTL.
2. **Vlastní stav žebříku** — žádný takový stav záměrně neexistuje. Způsobilost úrovní se při každém sestavení fondu znovu vypočítává z aktuálního stavu kvóty; neexistuje žádný trvale uložený záznam „aktuálně na úrovni 3“, který by mohl přetrvat resetování a zablokovat směrování.
3. **Doba vyřazení připojení** — vyčerpávající odpověď 429 nastaví `rateLimitedUntil` podle exponenciálního prodlužování čekání, které může u připojení tarifu přesáhnout skutečný okamžik resetování. `clampCooldownToReset()` (`subscriptionLadder.ts`) zkrátí dobu vyřazení na vlastní okamžik resetování u nadřazené služby a nikdy ji nemůže prodloužit. **Je implementována a otestována, ale zatím není zapojena**: mezipaměť kvóty je v `src/sse/services/auth.ts` zneplatněna _před_ zapsáním jakékoli doby vyřazení, takže `resetAt` musí být v této funkci zachyceno dříve — jde o změnu v kritické cestě odolnosti, která patří do samostatného revidovaného PR. Do té doby návrat čeká na uplynutí doby vyřazení připojení (která již upřednostňuje pokyny `Retry-After` od nadřazené služby, pokud je poskytovatel odešle).

### Ochrana proti přepínání

Úroveň, která byla právě resetována, je znovu připuštěna pouze nad hodnotou `reentryMinRemainingPercent` (výchozí hodnota 5), zatímco připojení, které je již ve hře, musí pouze zůstat nad hodnotou `exitCutoffPercent` (výchozí hodnota 2, odpovídající `quotaPreflight.defaultThresholdPercent`). Rozdíl mezi nimi tvoří hysterezní pásmo — bez něj by připojení pohybující se kolem mezní hodnoty při po sobě jdoucích požadavcích oscilovalo mezi úrovněmi.

## Konfigurace

Pouze pro ladění. Záměrně zde **není** příznak `enabled`: přepínač, který by je dokázal vypnout,
by způsobil, že by `auto/subscription` nenápadně poskytovalo celý fond — včetně placených modelů — pod
názvem, který slibuje opak.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 danou příčku zcela zakáže
  },
}
```

Omezení podle rozpočtu je neaktivní, dokud není zapojen resolver útraty: pokud není k dispozici účtování, placená
příčka je zařazena do pořadí, ale nikdy není omezena. Od v3.8.51 je nastavení `rungBudgetUsd`
schématem přijímáno, ale zatím NENÍ vynucováno — považujte je za rezervovanou konfiguraci, nikoli za aktivní limit útraty. Řazení příček, vyčerpání na základě kvóty a opětovné zařazení po resetu fungují
i bez něj.

## Kompozice

`subscription` a `thrifty` jsou hodnoty `AutoTier`, takže je lze kombinovat s každou kategorií:
`auto/coding:thrifty`, `auto/reasoning:subscription` a tak dále. Obě samostatná ID
(`auto/subscription`, `auto/thrifty`) jsou zveřejněna v `/v1/models` a na řídicím panelu.

Ani jedno ID nepatří do placené úrovně, takže `isPaidTierAutoId()` pro obě vrací `false` a
`auto/subscription` zůstane zachováno při použití `hidePaidModels`.

## Kde se kód nachází

| Oblast                                       | Soubor                                              |
| -------------------------------------------- | --------------------------------------------------- |
| Kurátorované fakturační údaje                | `open-sse/config/connectionBillingCatalog.ts`       |
| Klasifikátor                                 | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Příčky, obě seskupení, opětovné zařazení     | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Zapojení do fondu kandidátů                  | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Zohlednění resetu při zastarávání mezipaměti | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Rozhraní úrovní                              | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Zveřejněná ID                                | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Testy                                        | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
