# Cost & Spend Tracking (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇨🇿 [cs](../../../cs/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇩🇪 [de](../../../de/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇸 [es](../../../es/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇫🇷 [fr](../../../fr/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇮🇩 [id](../../../id/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇯🇵 [ja](../../../ja/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇳🇴 [no](../../../no/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇭 [phi](../../../phi/docs/guides/COST_TRACKING.md) · 🇵🇱 [pl](../../../pl/docs/guides/COST_TRACKING.md) · 🇵🇹 [pt](../../../pt/docs/guides/COST_TRACKING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/COST_TRACKING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/COST_TRACKING.md)

---

Ako OmniRoute odhaduje, zaznamenáva a vykazuje náklady na každú požiadavku — a prečo je
číslo na ovládacom paneli **ukazovateľom úspor**, nie faktúrou.

Pozri tiež: [Používateľská príručka](./USER_GUIDE.md) · [Galéria funkcií](./FEATURES.md)

---

## Čo to je (a čo to nie je)

OmniRoute priraďuje každému dokončeniu náklady v USD na jednu požiadavku vynásobením počtu
tokenov cenovými sadzbami modelu. Tieto čísla sa používajú na ovládacom paneli **Náklady**,
v CLI `omniroute cost` / `omniroute usage`, exportoch CSV/JSON a rozpočtoch jednotlivých API kľúčov.

> **„Náklady“ na ovládacom paneli sú ukazovateľom úspor, nie faktúrou.** OmniRoute vám nikdy
> nič neúčtuje — smeruje vaše požiadavky k poskytovateľom, ktorých ste už pripojili (vaše
> vlastné predplatné, bezplatné úrovne a API kľúče). „Celkové náklady 290 USD“ vytvorené výlučne
> na bezplatných modeloch znamenajú približne **290 USD, ktoré ste _nezaplatili_**
> platenému API. Toto číslo je _odhadom_ toho, koľko by rovnaká prevádzka stála pri štandardných
> cenníkových cenách, takže môžete vidieť, kde sa sústreďuje vaše používanie a koľko ušetríte
> smerovaním k lacnejším alebo bezplatným poskytovateľom.

Toto vysvetlenie je uvedené priamo v súbore [README](../../README.md) projektu („náklady“
na ovládacom paneli sú ukazovateľom úspor, nie faktúrou).

Keďže toto číslo je odhad:

- Závisí od cenovej tabuľky, ktorú má OmniRoute pre každý model. Model bez záznamu
  o cene prispieva nákladmi `0` (v prehľade sa zobrazuje ako riadok „Starší / bezplatný“).
- Prevádzke v rámci bezplatnej úrovne a predplatného sa stále pripočítavajú _odhadované_
  náklady — ide o sumu, ktorú ušetríte, nie o dlžnú sumu.

---

## Ako sa odhadujú náklady

### Zdroj cien

Náklady pochádzajú z cenovej tabuľky určenej podľa nasledujúceho poradia priorít
([`src/lib/pricingSync.ts`](../../src/lib/pricingSync.ts)):

1. **Používateľské prepísania** — ceny, ktoré nastavíte na ovládacom paneli alebo prostredníctvom `PATCH /api/pricing`.
2. **Synchronizované externé ceny** — načítané z verejného súboru
   `model_prices_and_context_window.json` služby LiteLLM, keď je synchronizácia povolená (ukladajú sa v samostatnom
   mennom priestore `pricing_synced`, takže nikdy neprepíšu vaše vlastné nastavenia).
3. **Predvolené hodnoty zapísané v kóde** — dodávané s OmniRoute.

Synchronizácia externých cien je **voliteľná** a predvolene vypnutá. Súvisiace premenné prostredia
(pozri [`.env.example`](../../.env.example)):

| Premenná prostredia     | Predvolené | Účel                                                                    |
| ----------------------- | ---------- | ----------------------------------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`    | Povolenie synchronizácie cien LiteLLM na pozadí pri spustení.           |
| `PRICING_SYNC_INTERVAL` | `86400`    | Interval synchronizácie v **sekundách** (predvolene raz denne).         |
| `PRICING_SYNC_SOURCES`  | `litellm`  | Zoznam zdrojov oddelených čiarkami (dnes je podporovaný iba `litellm`). |

### Vzorec na výpočet nákladov

Náklady sa počítajú pre každú požiadavku z počtu tokenov a sadzieb za milión tokenov v
[`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts)
(`computeCostFromPricing` / `calculateCost`):

- **Vstupné tokeny** (bez tokenov načítaných z vyrovnávacej pamäte a tokenov na jej vytvorenie) × sadzba `input`.
- **Tokeny načítané z vyrovnávacej pamäte** × sadzba `cached` (ak chýba, použije sa vstupná sadzba).
- **Tokeny na vytvorenie vyrovnávacej pamäte** × sadzba `cache_creation` (ak chýba, použije sa vstupná sadzba).
- **Výstupné tokeny** × sadzba `output`.
- **Tokeny uvažovania** × sadzba `reasoning` (ak chýba, použije sa výstupná sadzba).

Všetky sadzby sa interpretujú ako USD za 1 000 000 tokenov. Úroveň služby Codex „fast“/„priority“
alebo „flex“ uplatňuje násobiteľ nákladov (`getCodexFastCostMultiplier`) — napr. pri úrovni flex
sa účtuje 50 % zľava na tokeny, ktorá sa na ovládacom paneli zobrazuje ako **úspory flex**.

Názvy modelov sa najprv normalizujú (odstránia sa predpony ciest poskytovateľov, ako napríklad `openai/`
alebo `accounts/fireworks/models/`), aby sa aj historické riadky naďalej zhodovali s cenou.

### Ako sa zaznamenávajú výdavky

- Náklady na jednu požiadavku sa vypočítajú po odpovedi a zaznamenajú sa asynchrónne bez čakania,
  takže klientovi nikdy nepridávajú latenciu. Spotreba zdieľanej kvóty sa naplánuje na nasledujúci
  cyklus udalostí prostredníctvom [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts).
- Výdavky API kľúčov sa ukladajú do vyrovnávacej pamäte a zapisujú v dávkach pomocou
  [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) (predvolený interval zápisu 60 s,
  vyrovnávacia pamäť s kapacitou 1 000 záznamov). Možno ich upraviť pomocou:

  | Premenná prostredia                 | Predvolené | Účel                                            |
  | ----------------------------------- | ---------- | ----------------------------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000`    | Interval zápisu v milisekundách.                |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`     | Maximálny počet záznamov pred vykonaním zápisu. |

Údaje o nákladoch na ovládacom paneli sa **nenačítavajú** z dolárovej sumy uloženej v jednotlivých
riadkoch — pri každom spustení analytického koncového bodu sa nanovo vypočítajú z počtu tokenov
a aktuálnej cenovej tabuľky. To znamená, že oprava nesprávnej ceny (a opätovná synchronizácia)
spätne aktualizuje historické odhady nákladov.

---

## Informačný panel: stránka Náklady

Stránka **Náklady** sa nachádza na `/dashboard/costs`
(`src/app/(dashboard)/dashboard/costs/`).
Jej hlavným zobrazením je karta **Prehľad nákladov**
(`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`),
ktorá načítava všetky údaje z `GET /api/usage/analytics`.

Čo zobrazuje:

- **Dlaždice výdavkov** — odhadované výdavky za _dnes (1d)_, _7 dní_, _30 dní_ a vybrané
  obdobie. Výber rozsahu: `7d`, `30d`, `90d`, `all`.
- **Hlavné metriky** — požiadavky v danom období, aktívni poskytovatelia, aktívne modely, priemerné
  náklady na požiadavku.
- **Prieskumník nákladov** — tabuľka s možnosťou zoradenia a filtrovania, zoskupená podľa **poskytovateľa**, **modelu**,
  **kľúča API**, **účtu** alebo **úrovne služby**, s nákladmi, požiadavkami, tokenmi, priemernými
  nákladmi na požiadavku a percentuálnym podielom z celku.
- **Využitie tokenov** — celkový počet/vstupné/výstupné tokeny a pomer vstupných a výstupných tokenov.
- **Efektívnosť smerovania** — počet záložných prepnutí, miera záložných prepnutí a pokrytie požadovaného modelu.
- **Mesačná prognóza** — odhaduje výdavky na konci mesiaca podľa nedávneho denného priemeru.
- **Porovnanie období** — percentuálna zmena medzi prvou a druhou polovicou obdobia.
- **Grafy** — trend denných nákladov, podiel poskytovateľov (koláčový graf), najpoužívanejší poskytovatelia, najpoužívanejšie modely, náklady
  podľa kľúča API, náklady podľa účtu, týždenný vzorec používania a teplotná mapa aktivity.
- **Export** — stiahnutie aktuálneho obdobia vo formáte **CSV** alebo **JSON** (tlačidlá sa zobrazia,
  keď sú k dispozícii údaje s nenulovými nákladmi).

Ak neexistuje žiadna spoplatnená prevádzka, v riadkoch sa namiesto `$0` zobrazí štítok „Staršia verzia / Bezplatné“,
čo zodpovedá modelu sledovania úspor.

### Súvisiace podstránky Náklady

Oblasť Náklady obsahuje aj nasledujúce stránky (všetky pod `/dashboard/costs/`):

- **Ceny** (`/dashboard/costs/pricing`) — zobrazenie a prepísanie cien jednotlivých modelov (vykresľuje
  zdieľanú kartu Ceny).
- **Rozpočet** (`/dashboard/costs/budget`) — nastavenie limitov výdavkov pre jednotlivé rozsahy (vykresľuje zdieľanú
  kartu Rozpočet).
- **Zdieľanie kvóty** (`/dashboard/costs/quota-share`) — fondy zdieľaných kvót a zobrazenia rýchlosti
  čerpania.

---

## Koncové body API

Všetky tieto koncové body vyžadujú overenie správy (loopback/JWT, prostredníctvom `requireManagementAuth`), pokiaľ
nie je uvedené inak.

### Analytika využitia a nákladov

| Metóda | Koncový bod              | Účel                                                                                                                                                                             |
| ------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/analytics`   | Kompletná analytika nákladov/využitia: súhrn, denný trend, podľa poskytovateľa/modelu/kľúča API/účtu/úrovne. Parametre: `range`, `startDate`, `endDate`, `apiKeyIds`, `presets`. |
| `GET`  | `/api/usage/utilization` | Využitie kvóty jednotlivých poskytovateľov v čase. Parametre: `range` (`1h`/`24h`/`7d`/`30d`), `provider`.                                                                       |
| `GET`  | `/api/usage/history`     | Riadky nespracovanej histórie využitia.                                                                                                                                          |
| `GET`  | `/api/usage/call-logs`   | Denníky jednotlivých požiadaviek (model, tokeny, náklady, latencia, stav).                                                                                                       |
| `GET`  | `/api/usage/quota`       | Stav kvóty poskytovateľa.                                                                                                                                                        |
| `GET`  | `/api/usage/proxy-logs`  | Denníky požiadaviek proxy.                                                                                                                                                       |

### Rozpočty

| Metóda | Koncový bod              | Účel                                                                                         |
| ------ | ------------------------ | -------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/budget`      | Súhrn nákladov + kontrola rozpočtu pre jeden kľúč API (povinný parameter dopytu `apiKeyId`). |
| `POST` | `/api/usage/budget`      | Nastavenie denných/týždenných/mesačných limitov v USD + prahu upozornenia pre kľúč API.      |
| `GET`  | `/api/usage/budget/bulk` | Hromadné súhrny rozpočtov naprieč kľúčmi API.                                                |

> Rozpočtové API je obmedzené na jednotlivé **kľúče API** (`apiKeyId`). Limity vrátené volaním
> `GET /api/usage/budget` zahŕňajú `dailyLimitUsd`, `weeklyLimitUsd`, `monthlyLimitUsd`,
> `warningThreshold` a priebežné súčty (`totalCostToday`, `totalCostMonth`, …).

### Ceny

| Metóda   | Koncový bod             | Účel                                                                                                                              |
| -------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/pricing`          | Aktuálne zlúčené ceny (používateľské + synchronizované + predvolené). Pomocou `?includeSources=1` zobrazíte zdroj každej položky. |
| `PATCH`  | `/api/pricing`          | Prepísanie cien pre `{ provider: { model: { input, output, cached, … } } }`.                                                      |
| `DELETE` | `/api/pricing`          | Obnovenie predvolených cien (voliteľne obmedzené pomocou `?provider=&model=`).                                                    |
| `GET`    | `/api/pricing/defaults` | Zobrazenie predvolených záložných sadzieb za 1 milión.                                                                            |
| `GET`    | `/api/pricing/models`   | Ceny podľa modelu.                                                                                                                |
| `POST`   | `/api/pricing/sync`     | Spustenie manuálnej synchronizácie z externých zdrojov (LiteLLM).                                                                 |
| `GET`    | `/api/pricing/sync`     | Aktuálny stav synchronizácie.                                                                                                     |
| `DELETE` | `/api/pricing/sync`     | Vymazanie všetkých synchronizovaných cenových údajov.                                                                             |

### Ďalšie koncové body súvisiace s nákladmi

| Metóda | Koncový bod                   | Účel                                                                                           |
| ------ | ----------------------------- | ---------------------------------------------------------------------------------------------- |
| `GET`  | `/api/free-tier/summary`      | Celkový počet tokenov bezplatného modelu, využitie tento mesiac a zostávajúci bezplatný limit. |
| `GET`  | `/api/quota/pools/[id]/usage` | Využitie fondu zdieľanej kvóty.                                                                |

---

## CLI

CLI nástroja OmniRoute sprístupňuje príkazy na prácu s nákladmi, využitím a cenami (registrované v
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)).

### `omniroute cost`

Prehľad nákladov agregovaný z `/api/usage/analytics`.

```bash
omniroute cost                          # posledných 30 dní, zoskupené podľa poskytovateľa
omniroute cost --period 7d              # posledných 7 dní
omniroute cost --group-by model         # zoskupiť podľa provider | model | combo | api-key | day
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

Stĺpce: skupina, požiadavky, vstupné/výstupné tokeny, náklady (USD) a % z celku. Riadok s celkovým súčtom
sa vypíše na konci (potlačí sa pomocou `--quiet` alebo `--output json`).

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # súhrn nákladov podľa poskytovateľa
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

> `pricing defaults show` načíta `GET /api/pricing/defaults`. Ak chcete namiesto toho upraviť ceny jednotlivých modelov,
> použite stránku **Ceny** na ovládacom paneli alebo `PATCH /api/pricing`.

---

## Riešenie problémov

- **Všetky náklady sa zobrazujú ako $0 / „Legacy / Free“.** Používané modely nemajú záznam s cenami.
  Povoľte externú synchronizáciu (`PRICING_SYNC_ENABLED=true`) a spustite `omniroute pricing sync` alebo
  nastavte ceny manuálne prostredníctvom stránky Ceny / `PATCH /api/pricing`.
- **Historický model má nesprávnu cenu.** Opravte cenu (prepísaním alebo opätovnou synchronizáciou) — náklady sa
  pri každom načítaní analytických údajov prepočítajú z počtu tokenov, takže odhady sa aktualizujú spätne.
- **Výdavky zaostávajú za reálnym časom.** Výdavky podľa kľúča sa spracúvajú dávkovo; ak potrebujete aktuálnejšie údaje,
  znížte hodnotu `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS`.

---

Informácie o tom, ako táto funkcia zapadá do širšieho ovládacieho panela, nájdete v [Používateľskej príručke](./USER_GUIDE.md) a
v [Galérii funkcií](./FEATURES.md).
