# Subscription-first routing (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Két új `auto/*` azonosító — `auto/subscription` és `auto/thrifty`. Mindkettő csak kifejezett
> kérésre használható: semmi sem kerül rajtuk keresztül irányításra, hacsak a hívó név szerint
> nem kéri az azonosítót, és egyetlen meglévő készlet, stratégia vagy alapértelmezés sem változik.

## Miért létezik ez?

Az OmniRoute már megválaszol két költségekkel kapcsolatos kérdést, de egyik sem az, amelyet a legtöbb üzemeltető feltesz.

| Meglévő mechanizmus                                      | Ezt válaszolja meg                            |
| -------------------------------------------------------- | --------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | „ingyenesként van katalogizálva ez a modell?” |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | „számlázhat nekem valaha ez a kapcsolat?”     |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | „közel van ez a kapcsolat a korlátjához?”     |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | „korlátozd a költést, válts a legolcsóbbra”   |

Minden kizárólag ingyenes opciókat használó mechanizmus **zártan hibázik** — egy kimerült ingyenes
készlet üres készletet jelent, soha nem továbblépést egy fizetős opcióra —, és minden fizetős oldali
mechanizmus figyelmen kívül hagyja a szinteket. Egyik sem válaszolja meg ezt:

> „Használd fel a kvótát, amelyért már fizetek. Amikor elfogy, vagy állj le, vagy lépj felfelé
> egyesével a legolcsóbb fizetős opciókon keresztül — és térj vissza, amint a kvóta
> alaphelyzetbe áll.”

## A számlázás a kapcsolat, nem pedig a modell jellemzője

A `classifyTier()` (`open-sse/services/tierResolver.ts`) a `(provider, model)` páros alapján működik,
és a katalógusban szereplő árképzés szerint `free | cheap | premium` értéket ad vissza. Az azonban,
hogy egy kérés jár-e többletköltséggel, attól függ, **melyik kapcsolat szolgálja ki**: ugyanaz a modell
egy Claude Code OAuth-kapcsolaton keresztül benne foglaltatik az előfizetésben, míg egy API-kulcsos
kapcsolaton keresztül tokenenként számlázott.

A `provider_connections.auth_type` egyik irányban sem megbízható helyettesítő — léteznek használat
alapján számlázott OAuth-kapcsolatok, és léteznek előfizetésben foglalt API-kulcsos kapcsolatok is
(egy Copilot-licenchez tartozó token nem használat alapján számlázott API-kulcs). Ezért a számlázási
osztály egy **gondozott katalógusból**, az `open-sse/config/connectionBillingCatalog.ts` fájlból
származik, amelyet az egyes szolgáltatók közzétett feltételei alapján kézzel állítanak be — ugyanazt
a mintát követve, amelyet a `FreeModelBudget.hardStopGuaranteed` már meghonosított az ingyenes
modellekhez.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

A feloldási sorrend (`autoCombo/connectionBilling.ts`): a szintetikus, hitelesítés nélküli jelzőérték
→ `keyless`; egy, a szolgáltatóval **és** az `authType` értékével egyező katalógusbejegyzés; egy
szolgáltatói szintű bejegyzés; egyébként `unknown`. **A nem gondozott nem jelent ingyenest** — az
`unknown` mindenhol `metered` értékként kerül felhasználásra, így egy holnap hozzáadott szolgáltató
az előfizetési szinten kívülről indul, és csak szándékos katalogizálással kerülhet be oda.

## A szintmodell

Öt szint, eszkalációs sorrendben. Nem csupán az árukban különböznek — mindegyiknek **saját**
kimerülési jelzése van, ezért ez nem pusztán rendezés.

| #   | Szint          | Tagság                                                                 | Akkor merül ki, ha                        |
| --- | -------------- | ---------------------------------------------------------------------- | ----------------------------------------- |
| 0   | `subscription` | gondozott `billing: "subscription"`                                    | a kvótaablak eléri vagy átlépi a küszöböt |
| 1   | `keyless`      | a szintetikus, hitelesítés nélküli útvonal                             | kapcsolati várakozási idő / megszakító    |
| 2   | `free`         | használat alapján számlázott kapcsolat, `classifyTier() === "free"`    | az ingyenes keret kimerül                 |
| 3   | `cheap`        | használat alapján számlázott kapcsolat, `classifyTier() === "cheap"`   | a szintenkénti keret elfogy               |
| 4   | `premium`      | használat alapján számlázott kapcsolat, `classifyTier() === "premium"` | a szintenkénti keret elfogy               |

A 0–2. szint **kvóta** alapján merül ki, ami megfigyelhető, és amelyet a rendszer már nyomon követ.
A 3–4. szinthez nem tartozik kvóta — egy fizetős kapcsolat korlátlan ideig kiszolgál —, ezért az
egyetlen ésszerű kimerülési jelzésük a szintenkénti **költségkeret**. Enélkül a „lépj tovább, amikor
az olcsó szint kimerült” feltételnek nincs kiváltó eseménye.

## `auto/subscription` — zárt hibakezelés

Készlet = kizárólag a 0. fokozat, azokra a kapcsolatokra korlátozva, amelyeknél a kerettúllépés dokumentáltan `hard-stop`, és amelyek mindegyikénél élőben ellenőrizve lett, hogy van még rendelkezésre álló kvóta. Minden bizonytalan eset ki van zárva: a nem ellenőrzött szolgáltató, a nem ellenőrizhető kvótaérték, az elavult érték, illetve a fizetős használatként elszámolt kerettúllépés.

Az üres készlet a **szándékolt** eredmény, nem hiba — a hívó meglévő, üres készletet kezelő ága ezt egyértelmű hibává alakítja a csendes, számlázható tartalékmegoldás helyett. Ez az azonosító teljes ígérete.

A `keyless` szándékosan **nem** felel meg a feltételeknek: ez a csoportosítás azt jelenti, hogy „az előfizetés, amelyért fizetek”, ezért egy hitelesítést nem igénylő háttérrendszer nem tartozik ide. Erre az `auto/thrifty` (vagy az `auto/best-free`) használható.

### Kapcsolatbiztonság

Egy jelölt nem mindig egyetlen kapcsolathoz tartozik — egy logikai jelölt egy `allowedConnectionIds` engedélyezési listát hordoz, a ténylegesen használt fiókot pedig később, a továbbításkor választja ki az `open-sse/services/combo/autoStrategy.ts`. Ezért mindkét csoportosítás **minden kapcsolatot egyenként** ellenőriz, és az `allowedConnectionIds` értékét pontosan a megmaradó részhalmazra írja át — soha nem a teljes eredeti listára, és soha nem egy önkényesen kiválasztott elemre. Mivel az `autoStrategy.ts` ezt a tömböt már eleve szigorú engedélyezési listaként érvényesíti, az itteni átírás konstrukciós módon azonossá teszi az „ellenőrzött” és a „ténylegesen használt” halmazt. Ez ugyanaz az invariáns és ugyanaz az érvelés, mint a [STRICT_ZERO_COST](./STRICT_ZERO_COST.md) esetében.

## `auto/thrifty` — fokozatonkénti továbblépés

Készlet = minden fokozat a fokozatindex szerint rendezve, a kimerült jelöltek kizárásával. Az `auto` motor továbbra is a megmaradó készleten **belül** pontoz: a létra dönti el, hogy mely fokozatok vesznek részt, a pontozás pedig azt, hogy ezeken belül melyik jelölt nyer. A sorrend egy fokozaton belül stabil, ezért ez a ráépülő réteg soha nem rendezi át a pontozó saját rangsorát.

Ez egy sorrendezési + szűrési ráépülő réteg, **nem** új továbbító: a `combo.ts` spekulatív ciklusa már eleve sorrendben járja be a célokat, és hiba esetén továbblép, így ha a futásidejű kimerülést az előzetes ellenőrzés nem észlelte, ugyanazon kérésen belül akkor is továbblép a következő fokozatra.

Míg az `auto/subscription` zártan hibázik, az `auto/thrifty` **nyitottan** hibázik: az előfizetésben foglalt, használható kvótaértékkel nem rendelkező kapcsolatot továbbra is elsőként próbálja meg. A kipróbálása nem kerül semmibe, és ha kiderül, hogy kimerült, a továbblépési mechanizmus mindenképpen eléri a következő fokozatot — míg a kipróbálás megtagadása hiányzó telemetria esetén egy fizetős fokozatra küldené a kérést, vagyis pontosan azt az eredményt okozná, amelynek elkerülésére ez a csoportosítás szolgál.

## Visszatérés az előfizetéshez egy visszaállítás után

Három egymástól független dolognak kell lejárnia, mielőtt az útválasztás visszatér a 0. fokozathoz. Ha csak az egyiket javítjuk, a létra még jóval az előfizetési keret feltöltődése után is a fizetős fokozatokon ragad.

1. **A kvótaállapot gyorsítótára** — a `freeAccessQuota.ts` `(provider, connection)` páronként gyorsítótáraz 180 másodperces TTL-lel. Az a gyorsítótárazott bejegyzés, amelynek saját `resetAt` időpontja már elmúlt, egy már nem létező időablakot ír le, ezért mostantól **a korától függetlenül** elavultként kezelendő, és frissítést kényszerít ki. Enélkül az éjfélkor feltöltődött előfizetési keret egészen a TTL esetleges lejártáig kimerültként jelenik meg.
2. **A létra saját állapota** — tervezetten nincs ilyen. A fokozatok jogosultsága minden készlet-összeállításkor újraszámításra kerül az élő kvótaállapotból; nincs olyan tartósított „jelenleg a 3. fokozaton” bejegyzés, amely túlélhetné a visszaállítást és beragaszthatná az útválasztást.
3. **A kapcsolat várakozási ideje** — a kimerülést jelző 429 az exponenciális visszalépés alapján állítja be a `rateLimitedUntil` értékét, ami egy előfizetéshez tartozó kapcsolat esetében túlnyúlhat a tényleges visszaállításon. A `clampCooldownToReset()` (`subscriptionLadder.ts`) a várakozási időt a felsőbb szintű szolgáltató saját visszaállítási időpontjára rövidíti, és soha nem hosszabbíthatja meg. **Implementálva és tesztelve van, de még nincs bekötve**: a kvóta-gyorsítótár érvénytelenítése a `src/sse/services/auth.ts` fájlban _minden várakozási idő beállítása előtt_ megtörténik, ezért a `resetAt` értékét korábban kell rögzíteni ugyanebben a függvényben — ez a rezilienciát biztosító kritikus végrehajtási útvonal módosítása, amelynek saját, ellenőrzött PR-ban van a helye. Addig az újbóli bekerülés megvárja a kapcsolat várakozási idejének lejártát (amely már most is előnyben részesíti a felsőbb szintű szolgáltató `Retry-After` jelzéseit, amikor a szolgáltató küld ilyet).

### Ingadozásgátlás

Az éppen visszaállított fokozat csak akkor kerül vissza, ha meghaladja a `reentryMinRemainingPercent` értékét (alapértelmezés szerint 5), míg egy már használatban lévő kapcsolatnak csak az `exitCutoffPercent` fölött kell maradnia (alapértelmezés szerint 2, ami megegyezik a `quotaPreflight.defaultThresholdPercent` értékével). A kettő közötti rés a hiszterézissáv — enélkül egy határérték körül ingadozó kapcsolat az egymást követő kéréseknél folyamatosan váltogatna a fokozatok között.

## Konfiguráció

Csak finomhangolás. Szándékosan **nincs** `enabled` jelző: egy kapcsoló, amely ezeket kikapcsolhatná,
az `auto/subscription` az ígéretével ellentétben észrevétlenül továbbra is a teljes készletből szolgálna ki — beleértve a fizetős modelleket is.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // A 0 teljesen letiltja az adott fokozatot
  },
}
```

A költségkeret-alapú korlátozás mindaddig inaktív, amíg nincs bekötve költésfeloldó: elszámolás hiányában a fizetős
fokozat bekerül a sorrendbe, de soha nem lesz korlátozva. A v3.8.51 verziótól kezdve a séma elfogadja a
`rungBudgetUsd` beállítást, de az még NINCS érvényesítve — fenntartott konfigurációként kezelje, ne aktív költési korlátként. A fokozatok sorrendje, a kvótaalapú kimerülés és a visszaállítás utáni újbóli belépés enélkül is
működik.

## Kombinálhatóság

A `subscription` és a `thrifty` `AutoTier` értékek, ezért minden kategóriával kombinálhatók:
`auto/coding:thrifty`, `auto/reasoning:subscription` és így tovább. A két egyszerű azonosító
(`auto/subscription`, `auto/thrifty`) megjelenik a `/v1/models` végponton és az irányítópulton.

Egyik azonosító sem fizetős szintű, ezért az `isPaidTierAutoId()` mindkettő esetében `false` értéket ad vissza, és az
`auto/subscription` a `hidePaidModels` alkalmazása után is megmarad.

## A kód helye

| Terület                                          | Fájl                                                |
| ------------------------------------------------ | --------------------------------------------------- |
| Válogatott számlázási adatok                     | `open-sse/config/connectionBillingCatalog.ts`       |
| Osztályozó                                       | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Fokozatok, mindkét csoportosítás, újbóli belépés | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Bekötés a jelöltek készletébe                    | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Visszaállítás-tudatos gyorsítótár-elévülés       | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Szintek felülete                                 | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Közzétett azonosítók                             | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Tesztek                                          | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
