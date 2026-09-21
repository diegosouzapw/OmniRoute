# Cost & Spend Tracking (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇨🇿 [cs](../../../cs/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇩🇪 [de](../../../de/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇸 [es](../../../es/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇫🇷 [fr](../../../fr/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇮🇩 [id](../../../id/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇯🇵 [ja](../../../ja/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇭 [phi](../../../phi/docs/guides/COST_TRACKING.md) · 🇵🇱 [pl](../../../pl/docs/guides/COST_TRACKING.md) · 🇵🇹 [pt](../../../pt/docs/guides/COST_TRACKING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇰 [sk](../../../sk/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/COST_TRACKING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/COST_TRACKING.md)

---

Hvordan OmniRoute estimerer, registrerer og rapporterer kostnaden for hver forespørsel — og hvorfor
tallet i kontrollpanelet er en **sporing av besparelser**, ikke en faktura.

Se også: [Brukerveiledning](./USER_GUIDE.md) · [Funksjonsgalleri](./FEATURES.md)

---

## Hva det er (og hva det ikke er)

OmniRoute tilordner en kostnad i USD per forespørsel til hver fullføring ved å multiplisere
antall token med prismodellens satser. Disse tallene driver kontrollpanelet **Kostnader**,
CLI-kommandoene `omniroute cost` / `omniroute usage`, CSV-/JSON-eksporter og budsjetter per API-nøkkel.

> **«Kostnaden» i kontrollpanelet er en sporing av besparelser, ikke en faktura.** OmniRoute belaster deg aldri
> — det ruter forespørslene dine til leverandører du allerede har koblet til (dine egne
> abonnementer, gratiskvoter og API-nøkler). En «total kostnad på $290» som utelukkende er opptjent med gratis
> modeller, betyr at du omtrent **ikke betalte $290** til et betalt API. Tallet er et _estimat_
> på hva den samme trafikken ville ha kostet til standard listepriser, slik at du kan se hvor
> bruken din er konsentrert, og hvor mye du sparer ved å rute til rimeligere/gratis leverandører.

Denne fremstillingen er angitt direkte i prosjektets [README](../../README.md) («'kostnaden'
i kontrollpanelet er en sporing av besparelser, ikke en faktura»).

Fordi tallet er et estimat:

- Det avhenger av pristabellen OmniRoute har for hver modell. En modell uten en prisoppføring
  bidrar med en kostnad på `0` (den vises som en «Eldre / gratis»-rad i utforskeren).
- Trafikk gjennom gratiskvoter og abonnementer får fortsatt en _estimert_ kostnad — dette er
  beløpet du sparer, ikke et beløp du skylder.

---

## Hvordan kostnader estimeres

### Priskilden

Kostnadene kommer fra en pristabell som fastsettes i denne prioritetsrekkefølgen
([`src/lib/pricingSync.ts`](../../src/lib/pricingSync.ts)):

1. **Brukerdefinerte overstyringer** — priser du angir i kontrollpanelet / via `PATCH /api/pricing`.
2. **Synkroniserte eksterne priser** — hentes fra LiteLLMs offentlige
   `model_prices_and_context_window.json` når synkronisering er aktivert (lagres i et eget
   `pricing_synced`-navnerom, slik at brukerdefinerte overstyringer aldri overskrives).
3. **Hardkodede standardverdier** — leveres med OmniRoute.

Ekstern prissynkronisering er **valgfri** og deaktivert som standard. Relevante miljøvariabler
(se [`.env.example`](../../.env.example)):

| Miljøvariabel           | Standard  | Formål                                                         |
| ----------------------- | --------- | -------------------------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`   | Aktiver LiteLLM-prissynkronisering i bakgrunnen ved oppstart.  |
| `PRICING_SYNC_INTERVAL` | `86400`   | Synkroniseringsintervall i **sekunder** (daglig som standard). |
| `PRICING_SYNC_SOURCES`  | `litellm` | Kommaseparert kildeliste (bare `litellm` støttes per i dag).   |

### Kostnadsformelen

Kostnaden beregnes per forespørsel ut fra antall token og satser per million token i
[`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts)
(`computeCostFromPricing` / `calculateCost`):

- **Inndata-token** (minus cacheavlesninger og token for opprettelse av cache) × `input`-satsen.
- **Token lest fra cache** × `cached`-satsen (bruker inndatasatsen som reserve).
- **Token for opprettelse av cache** × `cache_creation`-satsen (bruker inndatasatsen som reserve).
- **Utdata-token** × `output`-satsen.
- **Resonneringstoken** × `reasoning`-satsen (bruker utdatasatsen som reserve).

Alle satser tolkes som USD per 1 000 000 token. Et Codex-tjenestenivå av typen «fast»/«priority» eller
«flex» bruker en kostnadsmultiplikator (`getCodexFastCostMultiplier`) — «flex» faktureres for eksempel
med 50 % tokenrabatt, som vises som **flex-besparelser** i kontrollpanelet.

Modellnavn normaliseres først (leverandørbaneprefikser som `openai/` eller
`accounts/fireworks/models/` fjernes), slik at historiske rader fortsatt samsvarer med en pris.

### Hvordan forbruk registreres

- Kostnaden per forespørsel beregnes etter svaret og registreres asynkront uten å vente, slik at den
  aldri øker svartiden for klienten. Forbruk av delt kvote planlegges i neste
  hendelsesløkkesyklus via [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts).
- Forbruk per API-nøkkel bufres og tømmes satsvis av
  [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) (standard tømmeintervall på 60 sekunder,
  buffer med 1 000 oppføringer). Kan justeres via:

  | Miljøvariabel                       | Standard | Formål                                            |
  | ----------------------------------- | -------- | ------------------------------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000`  | Tømmeintervall i millisekunder.                   |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`   | Maksimalt antall bufrede oppføringer før tømming. |

Kostnadstallene i kontrollpanelet leses **ikke** fra et lagret dollarbeløp per rad — de
beregnes på nytt fra antall token og den gjeldende pristabellen hver gang
analyseendepunktet kjøres. Det betyr at korrigering av en feil pris (og ny synkronisering)
oppdaterer historiske kostnadsestimater med tilbakevirkende kraft.

---

## Kontrollpanel: Kostnader-siden

**Kostnader**-siden ligger på `/dashboard/costs`
(`src/app/(dashboard)/dashboard/costs/`).
Hovedvisningen er fanen **Kostnadsoversikt**
(`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`),
som laster inn alt fra `GET /api/usage/analytics`.

Dette vises:

- **Kostnadsfliser** — estimert forbruk for _I dag (1d)_, _7d_, _30d_ og den valgte
  perioden. Periodevelger: `7d`, `30d`, `90d`, `all`.
- **Hovedmålinger** — forespørsler i perioden, aktive leverandører, aktive modeller og
  gjennomsnittlig kostnad per forespørsel.
- **Kostnadsutforsker** — en sorterbar og filtrerbar tabell gruppert etter **leverandør**,
  **modell**, **API-nøkkel**, **konto** eller **tjenestenivå**, med kostnad, forespørsler,
  tokener, gjennomsnittlig kostnad per forespørsel og prosentandel av totalen.
- **Tokenbruk** — totalt antall tokener / inndatatokener / utdatatokener og forholdet
  mellom inndata og utdata.
- **Rutingseffektivitet** — antall reserveløsninger, reservefrekvens og dekning for
  forespurte modeller.
- **Månedsprognose** — beregner forventet forbruk ved månedsslutt basert på det nylige
  daglige gjennomsnittet.
- **Periodesammenligning** — prosentvis endring mellom første og andre halvdel av perioden.
- **Diagrammer** — daglig kostnadsutvikling, leverandørandel (sektordiagram), viktigste
  leverandører, viktigste modeller, kostnad per API-nøkkel, kostnad per konto, ukentlig
  bruksmønster og et aktivitetsvarmekart.
- **Eksport** — last ned gjeldende periode som **CSV** eller **JSON** (knappene vises
  når det finnes kostnadsdata som ikke er null).

Når det ikke finnes prissatt trafikk, vises radene med etiketten «Eldre / Gratis» i stedet for `$0`,
i tråd med modellen for sporing av besparelser.

### Relaterte undersider for Kostnader

Kostnader-området inneholder også (alle under `/dashboard/costs/`):

- **Prissetting** (`/dashboard/costs/pricing`) — vis og overstyr priser per modell (viser
  den delte Prissetting-fanen).
- **Budsjett** (`/dashboard/costs/budget`) — angi forbruksgrenser per omfang (viser den
  delte Budsjett-fanen).
- **Kvotedeling** (`/dashboard/costs/quota-share`) — delte kvotepuljer og visninger av
  forbruksrate.

---

## API-endepunkter

Alle disse krever administrasjonsautentisering (loopback/JWT, via `requireManagementAuth`) med mindre
annet er angitt.

### Bruks- og kostnadsanalyse

| Metode | Endepunkt                | Formål                                                                                                                                                                          |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/analytics`   | Fullstendig kostnads-/bruksanalyse: sammendrag, daglig trend, etter leverandør/modell/API-nøkkel/konto/nivå. Spørring: `range`, `startDate`, `endDate`, `apiKeyIds`, `presets`. |
| `GET`  | `/api/usage/utilization` | Kvotebruk over tid per leverandør. Spørring: `range` (`1h`/`24h`/`7d`/`30d`), `provider`.                                                                                       |
| `GET`  | `/api/usage/history`     | Rådata for brukshistorikk.                                                                                                                                                      |
| `GET`  | `/api/usage/call-logs`   | Kallogger per forespørsel (modell, tokener, kostnad, ventetid, status).                                                                                                         |
| `GET`  | `/api/usage/quota`       | Status for leverandørkvoter.                                                                                                                                                    |
| `GET`  | `/api/usage/proxy-logs`  | Logger for proxy-forespørsler.                                                                                                                                                  |

### Budsjetter

| Metode | Endepunkt                | Formål                                                                                              |
| ------ | ------------------------ | --------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/budget`      | Kostnadssammendrag + budsjettkontroll for én API-nøkkel (`apiKeyId`-spørringsparameter er påkrevd). |
| `POST` | `/api/usage/budget`      | Angi daglige/ukentlige/månedlige USD-grenser + varselterskel for en API-nøkkel.                     |
| `GET`  | `/api/usage/budget/bulk` | Samlede budsjettsammendrag på tvers av API-nøkler.                                                  |

> Budsjett-API-et er avgrenset per **API-nøkkel** (`apiKeyId`). Grenser som returneres av
> `GET /api/usage/budget`, inkluderer `dailyLimitUsd`, `weeklyLimitUsd`, `monthlyLimitUsd`,
> en `warningThreshold` og løpende totaler (`totalCostToday`, `totalCostMonth`, …).

### Prissetting

| Metode   | Endepunkt               | Formål                                                                                                                       |
| -------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/pricing`          | Gjeldende sammenslåtte priser (bruker + synkroniserte + standardverdier). `?includeSources=1` for å se kilden per oppføring. |
| `PATCH`  | `/api/pricing`          | Overstyr priser for `{ provider: { model: { input, output, cached, … } } }`.                                                 |
| `DELETE` | `/api/pricing`          | Tilbakestill priser til standardverdiene (eventuelt avgrenset med `?provider=&model=`).                                      |
| `GET`    | `/api/pricing/defaults` | Vis standard reservesatser per 1M.                                                                                           |
| `GET`    | `/api/pricing/models`   | Priser indeksert etter modell.                                                                                               |
| `POST`   | `/api/pricing/sync`     | Utløs en manuell synkronisering fra eksterne kilder (LiteLLM).                                                               |
| `GET`    | `/api/pricing/sync`     | Gjeldende synkroniseringsstatus.                                                                                             |
| `DELETE` | `/api/pricing/sync`     | Slett alle synkroniserte prisdata.                                                                                           |

### Andre kostnadsrelevante endepunkter

| Metode | Endepunkt                     | Formål                                                                          |
| ------ | ----------------------------- | ------------------------------------------------------------------------------- |
| `GET`  | `/api/free-tier/summary`      | Tokenantall for gratismodeller, brukt denne måneden og gjenværende gratiskvote. |
| `GET`  | `/api/quota/pools/[id]/usage` | Bruk for en delt kvotepulje.                                                    |

---

## CLI

OmniRoutes CLI tilbyr kommandoer for kostnader, bruk og priser (registrert i
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)).

### `omniroute cost`

En kostnadsrapport aggregert fra `/api/usage/analytics`.

```bash
omniroute cost                          # siste 30 dager, gruppert etter leverandør
omniroute cost --period 7d              # siste 7 dager
omniroute cost --group-by model         # grupper etter provider | model | combo | api-key | day
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

Kolonner: gruppe, forespørsler, tokens inn/ut, kostnad (USD) og prosentandel av totalen. En linje med totalsummen
skrives ut til slutt (utelates med `--quiet` eller `--output json`).

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # kostnadssammendrag per leverandør
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# Budsjetter
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

> `pricing defaults show` leser `GET /api/pricing/defaults`. For å redigere prisene for individuelle modeller
> i stedet bruker du instrumentbordsiden **Priser** eller `PATCH /api/pricing`.

---

## Feilsøking

- **Alle kostnader vises som $0 / «Legacy / Free».** Modellene som brukes, har ingen prisoppføring.
  Aktiver ekstern synkronisering (`PRICING_SYNC_ENABLED=true`) og kjør `omniroute pricing sync`, eller
  angi priser manuelt via siden Priser / `PATCH /api/pricing`.
- **En historisk modell har feil pris.** Korriger prisen (overstyr eller synkroniser på nytt) – kostnaden
  beregnes på nytt fra antall tokens hver gang analysedataene leses, slik at estimatene oppdateres med tilbakevirkende kraft.
- **Forbruket ligger etter sanntid.** Forbruk per nøkkel behandles satsvis. Reduser
  `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` hvis du trenger mer oppdaterte tall.

---

For å se hvordan dette passer inn i det overordnede instrumentbordet, kan du lese [brukerveiledningen](./USER_GUIDE.md) og
[funksjonsgalleriet](./FEATURES.md).
