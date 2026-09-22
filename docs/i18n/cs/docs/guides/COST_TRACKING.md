# Cost & Spend Tracking (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇩🇪 [de](../../../de/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇸 [es](../../../es/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇫🇷 [fr](../../../fr/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇮🇩 [id](../../../id/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇯🇵 [ja](../../../ja/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇳🇴 [no](../../../no/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇭 [phi](../../../phi/docs/guides/COST_TRACKING.md) · 🇵🇱 [pl](../../../pl/docs/guides/COST_TRACKING.md) · 🇵🇹 [pt](../../../pt/docs/guides/COST_TRACKING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇰 [sk](../../../sk/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/COST_TRACKING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/COST_TRACKING.md)

---

Jak OmniRoute odhaduje, zaznamenává a vykazuje náklady každého požadavku — a proč je
číslo na řídicím panelu **ukazatelem úspor**, nikoli účtem.

Viz také: [Uživatelská příručka](./USER_GUIDE.md) · [Přehled funkcí](./FEATURES.md)

---

## Co to je (a co to není)

OmniRoute přiřazuje každému dokončení náklady v USD za jednotlivý požadavek vynásobením počtu
tokenů cenovými sazbami modelu. Tyto údaje slouží jako podklad pro řídicí panel **Náklady**,
CLI `omniroute cost` / `omniroute usage`, exporty CSV/JSON a rozpočty jednotlivých API klíčů.

> **„Náklady“ na řídicím panelu jsou ukazatelem úspor, nikoli účtem.** OmniRoute vám nikdy nic neúčtuje
> — směruje vaše požadavky k poskytovatelům, které jste již připojili (vaše vlastní
> předplatná, bezplatné tarify a API klíče). „Celkové náklady 290 $“ vzniklé výhradně u bezplatných
> modelů znamenají, že jste placenému API **přibližně 290 $ _nezaplatili_**. Tento údaj je _odhadem_
> toho, kolik by stejný provoz stál při standardních ceníkových cenách, abyste viděli, kde
> se vaše využití soustřeďuje a kolik díky směrování k levnějším či bezplatným poskytovatelům ušetříte.

Toto pojetí je výslovně uvedeno v souboru [README](../../README.md) projektu („náklady“
na řídicím panelu jsou ukazatelem úspor, nikoli účtem).

Protože jde o odhad:

- Závisí na cenové tabulce, kterou má OmniRoute pro každý model. Model bez záznamu
  o ceně přispívá náklady `0` (v průzkumníku se zobrazuje jako řádek „Starší / bezplatné“).
- Provoz v rámci bezplatných tarifů a předplatných stále akumuluje _odhadované_ náklady — jde
  o částku, kterou šetříte, nikoli o dlužnou částku.

---

## Jak se náklady odhadují

### Zdroj cen

Náklady vycházejí z cenové tabulky, která se vyhodnocuje podle následujícího pořadí priorit
([`src/lib/pricingSync.ts`](../../src/lib/pricingSync.ts)):

1. **Uživatelská přepsání** — ceny, které nastavíte na řídicím panelu / prostřednictvím `PATCH /api/pricing`.
2. **Synchronizované externí ceny** — načítané z veřejného souboru LiteLLM
   `model_prices_and_context_window.json`, když je synchronizace povolena (ukládají se do samostatného
   jmenného prostoru `pricing_synced`, takže nikdy nepřepíšou vaše vlastní hodnoty).
3. **Pevně zakódované výchozí hodnoty** — dodávané s OmniRoute.

Synchronizace externích cen je **volitelná** a ve výchozím nastavení zakázaná. Související proměnné prostředí
(viz [`.env.example`](../../.env.example)):

| Proměnná prostředí      | Výchozí hodnota | Účel                                                                       |
| ----------------------- | --------------- | -------------------------------------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`         | Povolí synchronizaci cen LiteLLM na pozadí při spuštění.                   |
| `PRICING_SYNC_INTERVAL` | `86400`         | Interval synchronizace v **sekundách** (ve výchozím nastavení denně).      |
| `PRICING_SYNC_SOURCES`  | `litellm`       | Seznam zdrojů oddělených čárkami (aktuálně je podporován pouze `litellm`). |

### Vzorec pro výpočet nákladů

Náklady se počítají pro každý požadavek z počtu tokenů a sazeb za milion tokenů v
[`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts)
(`computeCostFromPricing` / `calculateCost`):

- **Vstupní tokeny** (po odečtení tokenů načtených z mezipaměti a tokenů použitých k vytvoření mezipaměti) × sazba `input`.
- **Tokeny načtené z mezipaměti** × sazba `cached` (pokud není k dispozici, použije se vstupní sazba).
- **Tokeny použité k vytvoření mezipaměti** × sazba `cache_creation` (pokud není k dispozici, použije se vstupní sazba).
- **Výstupní tokeny** × sazba `output`.
- **Tokeny uvažování** × sazba `reasoning` (pokud není k dispozici, použije se výstupní sazba).

Všechny sazby jsou chápány jako USD za 1 000 000 tokenů. Úroveň služby Codex „fast“/„priority“ nebo
„flex“ používá násobitel nákladů (`getCodexFastCostMultiplier`) — například flex
se účtuje s 50% slevou na tokeny, která se na řídicím panelu zobrazuje jako **úspory flex**.

Názvy modelů se nejprve normalizují (odstraní se prefixy cest poskytovatelů, například `openai/` nebo
`accounts/fireworks/models/`), takže cenám nadále odpovídají i historické řádky.

### Jak se výdaje zaznamenávají

- Náklady na jednotlivé požadavky se vypočítají po obdržení odpovědi a zaznamenají se bez čekání na výsledek, aby
  se klientovi nikdy nezvyšovala latence. Čerpání sdílené kvóty je naplánováno na následující
  průchod smyčkou událostí prostřednictvím [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts).
- Výdaje API klíčů se ukládají do vyrovnávací paměti a dávkově zapisují pomocí
  [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) (výchozí interval zápisu je 60 s,
  vyrovnávací paměť pojme 1 000 záznamů). Lze upravit pomocí:

  | Proměnná prostředí                  | Výchozí hodnota | Účel                                                        |
  | ----------------------------------- | --------------- | ----------------------------------------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000`         | Interval zápisu v milisekundách.                            |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`          | Maximální počet záznamů ve vyrovnávací paměti před zápisem. |

Údaje o nákladech na řídicím panelu se **nečtou** z uložené dolarové částky pro jednotlivé řádky —
pokaždé, když se spustí analytický koncový bod, jsou průběžně přepočítány z počtu tokenů a aktuální
cenové tabulky. To znamená, že oprava nesprávné ceny (a opětovná synchronizace) zpětně aktualizuje
historické odhady nákladů.

---

## Dashboard: stránka Náklady

Stránka **Náklady** se nachází na adrese `/dashboard/costs`
(`src/app/(dashboard)/dashboard/costs/`).
Jejím hlavním zobrazením je karta **Přehled nákladů**
(`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`),
která načítá veškerá data z `GET /api/usage/analytics`.

Co zobrazuje:

- **Dlaždice výdajů** — odhadované výdaje za _dnešek (1d)_, _7d_, _30d_ a vybrané
  období. Volba rozsahu: `7d`, `30d`, `90d`, `all`.
- **Hlavní metriky** — požadavky v daném období, aktivní poskytovatelé, aktivní modely,
  průměrné náklady na požadavek.
- **Průzkumník nákladů** — řaditelná a filtrovatelná tabulka seskupená podle
  **poskytovatele**, **modelu**, **API klíče**, **účtu** nebo **úrovně služby**,
  s náklady, požadavky, tokeny, průměrnými náklady na požadavek a procentuálním
  podílem na celku.
- **Využití tokenů** — celkový počet / vstupní / výstupní tokeny a poměr vstupů
  k výstupům.
- **Efektivita směrování** — počet přepnutí na záložní variantu, míra těchto přepnutí
  a pokrytí požadovaných modelů.
- **Měsíční prognóza** — odhaduje výdaje na konci měsíce podle nedávného denního
  průměru.
- **Porovnání období** — procentuální změna mezi první a druhou polovinou období.
- **Grafy** — denní vývoj nákladů, podíl poskytovatelů (výsečový graf), nejvýznamnější
  poskytovatelé, nejpoužívanější modely, náklady podle API klíče, náklady podle účtu,
  týdenní vzorec využití a teplotní mapa aktivity.
- **Export** — stažení aktuálního období ve formátu **CSV** nebo **JSON** (tlačítka se
  zobrazí, jakmile jsou k dispozici údaje s nenulovými náklady).

Pokud neexistuje žádný provoz s přiřazenou cenou, řádky se místo `$0` zobrazí se
štítkem „Starší / zdarma“, což odpovídá modelu sledování úspor.

### Související podstránky Nákladů

Oblast Náklady také obsahuje následující stránky (všechny pod `/dashboard/costs/`):

- **Ceny** (`/dashboard/costs/pricing`) — zobrazení a přepsání cen jednotlivých modelů
  (vykresluje sdílenou kartu Ceny).
- **Rozpočet** (`/dashboard/costs/budget`) — nastavení limitů výdajů pro jednotlivé
  rozsahy (vykresluje sdílenou kartu Rozpočet).
- **Sdílení kvót** (`/dashboard/costs/quota-share`) — fondy sdílených kvót a zobrazení
  rychlosti čerpání.

---

## Koncové body API

Všechny vyžadují autentizaci pro správu (loopback/JWT prostřednictvím
`requireManagementAuth`), není-li uvedeno jinak.

### Analytika využití a nákladů

| Metoda | Koncový bod              | Účel                                                                                                                                                                                     |
| ------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/analytics`   | Kompletní analytika nákladů a využití: souhrn, denní vývoj, podle poskytovatele/modelu/API klíče/účtu/úrovně. Parametry dotazu: `range`, `startDate`, `endDate`, `apiKeyIds`, `presets`. |
| `GET`  | `/api/usage/utilization` | Využití kvóty jednotlivých poskytovatelů v čase. Parametry dotazu: `range` (`1h`/`24h`/`7d`/`30d`), `provider`.                                                                          |
| `GET`  | `/api/usage/history`     | Nezpracované řádky historie využití.                                                                                                                                                     |
| `GET`  | `/api/usage/call-logs`   | Protokoly jednotlivých požadavků (model, tokeny, náklady, latence, stav).                                                                                                                |
| `GET`  | `/api/usage/quota`       | Stav kvóty poskytovatele.                                                                                                                                                                |
| `GET`  | `/api/usage/proxy-logs`  | Protokoly požadavků proxy.                                                                                                                                                               |

### Rozpočty

| Metoda | Koncový bod              | Účel                                                                                             |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/usage/budget`      | Souhrn nákladů a kontrola rozpočtu pro jeden API klíč (je vyžadován parametr dotazu `apiKeyId`). |
| `POST` | `/api/usage/budget`      | Nastavení denních/týdenních/měsíčních limitů v USD a prahu upozornění pro API klíč.              |
| `GET`  | `/api/usage/budget/bulk` | Hromadné souhrny rozpočtů napříč API klíči.                                                      |

> Rozpočtové API je vymezeno pro jednotlivé **API klíče** (`apiKeyId`). Limity vrácené
> prostřednictvím `GET /api/usage/budget` zahrnují `dailyLimitUsd`, `weeklyLimitUsd`,
> `monthlyLimitUsd`, hodnotu `warningThreshold` a průběžné součty (`totalCostToday`,
> `totalCostMonth`, …).

### Ceny

| Metoda   | Koncový bod             | Účel                                                                                                               |
| -------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `GET`    | `/api/pricing`          | Aktuální sloučené ceny (uživatelské + synchronizované + výchozí). `?includeSources=1` zobrazí zdroj každé položky. |
| `PATCH`  | `/api/pricing`          | Přepsání cen pro `{ provider: { model: { input, output, cached, … } } }`.                                          |
| `DELETE` | `/api/pricing`          | Obnovení výchozích cen (volitelně omezené pomocí `?provider=&model=`).                                             |
| `GET`    | `/api/pricing/defaults` | Zobrazení výchozích záložních sazeb za 1 milion jednotek.                                                          |
| `GET`    | `/api/pricing/models`   | Ceny indexované podle modelu.                                                                                      |
| `POST`   | `/api/pricing/sync`     | Spuštění ruční synchronizace z externích zdrojů (LiteLLM).                                                         |
| `GET`    | `/api/pricing/sync`     | Aktuální stav synchronizace.                                                                                       |
| `DELETE` | `/api/pricing/sync`     | Vymazání všech synchronizovaných cenových dat.                                                                     |

### Další koncové body související s náklady

| Metoda | Koncový bod                   | Účel                                                                                         |
| ------ | ----------------------------- | -------------------------------------------------------------------------------------------- |
| `GET`  | `/api/free-tier/summary`      | Celkový počet tokenů bezplatného modelu, využití za tento měsíc a zbývající bezplatný limit. |
| `GET`  | `/api/quota/pools/[id]/usage` | Využití fondu sdílené kvóty.                                                                 |

---

## CLI

CLI nástroje OmniRoute zpřístupňuje příkazy pro náklady, využití a ceny (registrované v
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)).

### `omniroute cost`

Přehled nákladů agregovaný z `/api/usage/analytics`.

```bash
omniroute cost                          # posledních 30 dní, seskupeno podle poskytovatele
omniroute cost --period 7d              # posledních 7 dní
omniroute cost --group-by model         # seskupit podle provider | model | combo | api-key | day
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

Sloupce: skupina, požadavky, vstupní/výstupní tokeny, náklady (USD) a % z celkové částky. Řádek s celkovým součtem
se vypíše na konci (potlačí se pomocí `--quiet` nebo `--output json`).

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # souhrn nákladů podle poskytovatelů
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# Rozpočty
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> `pricing defaults show` načítá `GET /api/pricing/defaults`. Chcete-li místo toho upravit ceny
> jednotlivých modelů, použijte stránku **Pricing** na řídicím panelu nebo `PATCH /api/pricing`.

---

## Řešení problémů

- **Všechny náklady zobrazují $0 / „Legacy / Free“.** Používané modely nemají záznam s cenou.
  Povolte externí synchronizaci (`PRICING_SYNC_ENABLED=true`) a spusťte `omniroute pricing sync`, nebo
  nastavte ceny ručně prostřednictvím stránky Pricing / `PATCH /api/pricing`.
- **Historický model má nesprávnou cenu.** Opravte cenu (přepsáním nebo opětovnou synchronizací) — náklady se
  při každém načtení analytických údajů znovu vypočítají z počtu tokenů, takže se odhady aktualizují zpětně.
- **Údaje o útratě mají oproti reálnému času zpoždění.** Útrata podle jednotlivých klíčů se zpracovává dávkově; pokud potřebujete
  aktuálnější údaje, snižte hodnotu `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS`.

---

Informace o tom, kam tato funkce zapadá v širším kontextu řídicího panelu, najdete v [uživatelské příručce](./USER_GUIDE.md) a
v [galerii funkcí](./FEATURES.md).
