# RTK Compression (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

RTK-compressie is OmniRoute's opdrachtbewuste compressie-engine voor terminal- en tooluitvoer. Deze is ontworpen voor sessies met programmeeragents, waarin de meeste contextgroei afkomstig is van testlogboeken, build-uitvoer, ruis van pakketbeheerders, shelltranscripten, Docker-uitvoer, git-uitvoer en stacktraces.

RTK kan rechtstreeks worden uitgevoerd met `defaultMode: "rtk"` of als eerste stap in een gestapelde pipeline, doorgaans:

```txt
rtk -> caveman
```

Deze volgorde comprimeert eerst ruisrijke machine-uitvoer en laat Caveman vervolgens de resterende tekst comprimeren.

Upstream RTK rapporteert een besparing van `60-90%` op opdrachtuitvoer. De voorbeeldsessie in de README gaat van `~118,000` standaardtokens naar `~23,900` RTK-tokens, wat een besparing van `79.7%` (`~80%`) oplevert. OmniRoute gebruikt dat upstreamgemiddelde voor de berekening van de gestapelde besparing met Caveman-invoercompressie:

```txt
RTK-gemiddelde: 80% bespaard
Caveman-invoer: 46% bespaard
Gestapeld:      1 - (1 - 0.80) * (1 - 0.46) = 89.2% bespaard
Bereik:         1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Wat Het Comprimeert

De ingebouwde catalogus bevat momenteel 49 filters, verdeeld over deze categorieën:

| Categorie | Voorbeelden                                                   |
| --------- | ------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`             |
| `test`    | Vitest, Jest, Pytest, Playwright, Go-tests, Cargo-tests       |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`   | `ls`, `find`, `grep`, generieke shelllogboeken                |
| `docker`  | `docker ps`, Docker-logboeken                                 |
| `infra`   | Terraform, OpenTofu, `systemctl status`                       |
| `generic` | JSON-uitvoer, stacktraces, generieke terugval voor uitvoer    |

De detector in `open-sse/services/compression/engines/rtk/commandDetector.ts` classificeert uitvoer voordat een filter wordt geselecteerd. Filters kunnen ook overeenkomen op basis van een opdrachtpatroon of reguliere expressie voor uitvoer wanneer een opdrachtklasse niet voldoende is.

## Filterresolutie

RTK laadt filters in deze volgorde:

1. Projectfilters uit `.rtk/filters.toml` en `.rtk/filters.json`, alleen wanneer ze worden vertrouwd.
2. Globale filters uit `DATA_DIR/rtk/filters.toml` en `DATA_DIR/rtk/filters.json`.
3. Ingebouwde filters uit `open-sse/services/compression/engines/rtk/filters/`.

Binnen hetzelfde bereik hebben RTK TOML-schema-v1-filters voorrang op OmniRoute JSON-filters. TOML-`match_command`-expressies worden vóór overeenkomsten op opdrachttype gecontroleerd, zodat een geïmporteerd opdrachtspecifiek filter een breder filter binnen dat bereik kan overschrijven. Het projectbereik heeft nog steeds voorrang op het globale bereik, ongeacht de bestandsindeling.

Projectfilters zijn bewust onderworpen aan een vertrouwenscontrole, omdat regex-filters kunnen wijzigen hoe tooluitvoer aan agents wordt getoond. Een projectfilterbestand wordt geaccepteerd wanneer aan een van deze voorwaarden wordt voldaan:

- `rtkConfig.trustProjectFilters` is `true`.
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` is ingesteld.
- `.rtk/trust.json` bevat de overeenkomende SHA-256-hash voor het projectfilterbestand.

Voorbeeld van een vertrouwensbestand:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

De hashes zijn afzonderlijk: `filtersSha256` vertrouwt `.rtk/filters.json`, terwijl `filtersTomlSha256` `.rtk/filters.toml` vertrouwt. Als een van beide bestanden wordt bewerkt, wordt alleen de bijbehorende vertrouwensvermelding ongeldig. Globale bestanden worden door de beheerder geïnstalleerd en maken gebruik van het bestaande vertrouwensgedrag voor globale filters.

Aangepaste filters kunnen bestaan uit één filterobject of een array met filterobjecten. Ongeldige aangepaste filters worden overgeslagen en gemeld via diagnostische gegevens van `/api/context/rtk/filters`. Ongeldige ingebouwde filters leiden onmiddellijk tot een fout.

## Compatibiliteit met RTK TOML-schema v1

OmniRoute kan declaratieve filterbestanden die gebruikmaken van RTK TOML-schema v1 parseren, valideren, testen en installeren.
De ondersteunde velden zijn `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` en `[[tests.<filter>]]`-inlinetests.
Onbekende velden, ongeldige of onveilige reguliere expressies, gelijktijdige regels voor verwijderen/behouden, bestanden groter dan
1 MiB en verwijzingen naar onbekende filters worden geweigerd. Een bestand waarvan de inlinetests mislukken, kan ter inspectie worden
gevalideerd, maar kan niet worden geïnstalleerd of geladen. Fouten bij het laden van aangepaste bestanden blijven
fail-open: het ongeldige bestand wordt overgeslagen en de overige filters blijven werken.

OmniRoute ontvangt tooluitvoer nadat de client deze al heeft vastgelegd. Daarom kan `filter_stderr = true`
de procesvastlegging niet wijzigen. Het veld wordt geaccepteerd als een no-op en de validatie retourneert een waarschuwing.
Dit wordt bewust omschreven als **compatibiliteit met RTK TOML-schema v1**, niet als volledige compatibiliteit
met het uitvoerbare RTK-bestand, shell-hooks, Rust-opdrachtimplementaties of de indeling van de trust-store.

De geavanceerde RTK-weergave van het dashboard accepteert geplakte of geüploade TOML. Validatie is alleen-lezen.
Bij installatie wordt `DATA_DIR/rtk/filters.toml` atomair en met beperkende machtigingen geschreven, waarna
de actieve filtercatalogus zonder herstart wordt vernieuwd. Voor het vervangen van een bestaand bestand is expliciete
`overwrite`-bevestiging vereist en wordt eerst `DATA_DIR/rtk/filters.toml.bak` aangemaakt.

## Filter-DSL

Filters gebruiken het JSON-schema dat wordt beschreven in [Indeling van compressieregels](./COMPRESSION_RULES_FORMAT.md).
De runtime past deze fasen in de volgende volgorde toe:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> regels verwijderen/opnemen
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Belangrijke velden:

| Veld                         | Doel                                                                                         |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| `rules.stripAnsi`            | Terminalkleur-/besturingsreeksen vóór het matchen verwijderen                                |
| `rules.filterStderr`         | Veelvoorkomende stderr-voorvoegsels vóór matchen/filteren normaliseren                       |
| `rules.replace`              | Geordende regexvervangingen toepassen                                                        |
| `rules.matchOutput`          | Een compacte samenvatting retourneren wanneer uitvoer overeenkomt met een bekende voorwaarde |
| `rules.matchOutput[].unless` | De verkorte afhandeling overslaan wanneer een fout-/mislukkingspatroon aanwezig is           |
| `rules.dropPatterns`         | Ruis veroorzakende regels verwijderen                                                        |
| `rules.includePatterns`      | Bruikbare regels verkiezen                                                                   |
| `rules.collapsePatterns`     | Herhaalde overeenkomende regels samenvouwen                                                  |
| `rules.deduplicate`          | Opt-in per filter: opeenvolgende dubbele regels samenvouwen                                  |
| `rules.truncateLineAt`       | Unicode-veilige afkapping per regel                                                          |
| `rules.onEmpty`              | Terugvalbericht als alle regels zijn weggefilterd                                            |
| `tests[]`                    | Inlinevoorbeelden die door de verificatiepoort worden gebruikt                               |

Van ingebouwde filters wordt verwacht dat ze inline `tests[]`-voorbeelden bevatten. Aangepaste filters zouden
deze ook moeten bevatten, vooral wanneer ze tussen projecten worden gedeeld.

## Regeldeduplicatie (twee lagen)

RTK voegt dubbele regels op twee onafhankelijke lagen samen:

1. **`deduplicate` per filter (opt-in, standaard `false`).** Een filter kan `rules.deduplicate: true`
   instellen om opeenvolgende dubbele regels _binnen de overeenkomende uitvoer van dat filter_ samen te voegen, vóór het afkappen.
   Dit wordt uitgevoerd in `lineFilter.ts`. Voor verouderde filters wordt dit automatisch ingeschakeld wanneer het filter
   `collapsePatterns` definieert. Schema: `deduplicate: z.boolean().default(false)` in
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **Enginebrede `deduplicateThreshold` (standaard `3`).** Nadat alle filters zijn uitgevoerd, voegt de engine
   elke reeks van `>= deduplicateThreshold` identieke opeenvolgende regels in het volledige resultaat samen
   (`deduplicateRepeatedLines`, toegepast in `engines/rtk/index.ts`). Bij normalisatie wordt de waarde begrensd op 2–100.

De verwerking per filter wordt eerst uitgevoerd (binnen het filter) en de enginebrede verwerking als laatste (op de samengevoegde
uitvoer), zodat beide zonder dubbeltelling kunnen worden gecombineerd.

## Regels groeperen (`enableGrouping`)

Wanneer `rtkConfig.enableGrouping` `true` is (standaard `false`), voert RTK een aanvullende `groupSimilarLines`-bewerking
uit op het resultaat na deduplicatie, waarmee reeksen _bijna-equivalente_ (niet byte-identieke)
opeenvolgende regels worden samengevoegd. `rtkConfig.groupingThreshold` (standaard `3`) is de minimale reekslengte waarbij
groepering wordt geactiveerd. Dit is de structurele tegenhanger van `deduplicateThreshold`: deduplicatie verwerkt exacte herhalingen,
terwijl groepering „dezelfde vorm met kleine verschillen” verwerkt. Beide vlaggen maken deel uit van de `rtkConfig`-JSON
die in de tabel `key_value` wordt opgeslagen (zie Configuratie hierboven), zodat de instelling behouden blijft na herstarts.

## Codecommentaar verwijderen (`stripCodeComments` / `preserveDocstrings`)

Wanneer `rtkConfig.applyToCodeBlocks` is ingeschakeld, kan RTK ook commentaar uit afgebakende codeblokken verwijderen:

- `stripCodeComments` (standaard `false`) — opt-in. Wanneer dit `true` is, verwijdert RTK commentaar uit afgebakende JavaScript-
  en TypeScript-blokken. Historisch gezien werd de vlag wel uitgelezen maar nooit toegepast, waardoor de standaardwaarde
  op „behouden” blijft staan om een ongemerkte productiewijziging te voorkomen.
- `preserveDocstrings` (standaard `true`) — bij het verwijderen van commentaar blijven JSDoc-/`/** … */`-blokcommentaren
  behouden (ze bevatten API-documentatie die meer waard is dan de bytes die ze kosten). Stel dit in op `false` om
  die ook te verwijderen.

Het verwijderen van commentaar is geïmplementeerd in `open-sse/services/compression/engines/rtk/codeStripper.ts`. Hiervoor wordt
de **TypeScript-parser** gebruikt (geen regex), zodat tekenreeks-, template- en regex-literalen nooit ten onrechte
als commentaar worden beschouwd. Bovendien wordt de verwerking volledig afgebroken wanneer JSX wordt gedetecteerd (zodat commentaar in JSX-expressiecontainers
nooit wordt beschadigd). Het verwijderen van commentaar is momenteel alleen van toepassing op **JavaScript en TypeScript** — andere
talen in de `CodeLanguage`-verzameling van de stripper (Python, Rust, Go, Ruby, Java) ondergaan wel samenvoeging van lege regels en
witruimte, maar geen commentaarverwijdering. De verwerking van het opgeschoonde blok wordt in
`rulesApplied` gelabeld als `rtk:code-strip`.

> **Opmerking — GCF / tabulaire codering is een afzonderlijke engine.** RTK bevat **niet** de tabulaire/kolomgebaseerde JSON-encoder „GCF”
> (Graph Compact Format). Die encoder — die een oudere
> `omni-tabular`-encoder heeft vervangen — bevindt zich in de **headroom**-engine
> (`open-sse/services/compression/engines/headroom/`, met de meegeleverde codec onder
> `headroom/gcf/`). Deze staat los van de hier gedocumenteerde RTK-filterpijplijn.

## Configuratie

Algemene instellingen zijn beschikbaar via `/api/settings/compression`. RTK-specifieke instellingen zijn ook
beschikbaar via `/api/context/rtk/config`.

```json
{
  "defaultMode": "stacked",
  "autoTriggerMode": "stacked",
  "autoTriggerTokens": 32000,
  "stackedPipeline": [
    { "engine": "rtk", "intensity": "standard" },
    { "engine": "caveman", "intensity": "full" }
  ],
  "rtkConfig": {
    "enabled": true,
    "intensity": "standard",
    "applyToToolResults": true,
    "applyToCodeBlocks": false,
    "applyToAssistantMessages": false,
    "enabledFilters": [],
    "disabledFilters": [],
    "maxLinesPerResult": 120,
    "maxCharsPerResult": 12000,
    "deduplicateThreshold": 3,
    "customFiltersEnabled": true,
    "trustProjectFilters": false,
    "rawOutputRetention": "never",
    "rawOutputMaxBytes": 1048576,
    "enableGrouping": false,
    "groupingThreshold": 3,
    "stripCodeComments": false,
    "preserveDocstrings": true
  }
}
```

`enabledFilters` en `disabledFilters` gebruiken filter-id's, bijvoorbeeld `test-vitest` of `git-diff`.

De volledige structuur van `rtkConfig` wordt gedefinieerd door `RtkConfig` / `DEFAULT_RTK_CONFIG` in
`open-sse/services/compression/types.ts`. Het volledige object wordt als één JSON-waarde opgeslagen in
de SQLite-tabel `key_value` onder `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`) en bij het lezen genormaliseerd door `normalizeRtkConfig`. Daardoor wordt elk onderstaand
veld — inclusief `enableGrouping`, `groupingThreshold`, `stripCodeComments` en `preserveDocstrings` —
via dezelfde opslag heen en terug verwerkt en blijft het na een herstart behouden.

| Sleutel                | Standaardwaarde | Doel                                                                                                       |
| ---------------------- | --------------- | ---------------------------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`             | Voor de hele engine: minimaal aantal opeenvolgende identieke regels om samen te vouwen (begrensd op 2–100) |
| `enableGrouping`       | `false`         | Opt-in: reeksen vrijwel gelijkwaardige opeenvolgende regels samenvoegen                                    |
| `groupingThreshold`    | `3`             | Minimale reeks opeenvolgende vergelijkbare regels waarbij groepering wordt geactiveerd                     |
| `stripCodeComments`    | `false`         | Opt-in: commentaar uit omheinde codeblokken verwijderen (vereist `applyToCodeBlocks`)                      |
| `preserveDocstrings`   | `true`          | Bij het verwijderen van commentaar JSDoc-/`/** … */`-blokken behouden                                      |

## API

| Route                              | Methode | Doel                                                   |
| ---------------------------------- | ------- | ------------------------------------------------------ |
| `/api/context/rtk/config`          | GET     | RTK-configuratie lezen                                 |
| `/api/context/rtk/config`          | PUT     | RTK-configuratie bijwerken                             |
| `/api/context/rtk/filters`         | GET     | Filtercatalogus en laaddiagnostiek weergeven           |
| `/api/context/rtk/import`          | POST    | RTK TOML-schema-v1-bestanden valideren of installeren  |
| `/api/context/rtk/test`            | POST    | Voorvertoning van RTK-compressie voor één tekstpayload |
| `/api/context/rtk/raw-output/[id]` | GET     | Bewaarde, geredigeerde ruwe uitvoer lezen              |
| `/api/compression/preview`         | POST    | Voorvertoning van elke compressiemodus                 |

RTK-testpayload:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Payload voor compressievoorvertoning:

```json
{
  "mode": "stacked",
  "messages": [
    {
      "role": "tool",
      "content": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed"
    }
  ],
  "config": {
    "rtkConfig": {
      "rawOutputRetention": "failures"
    }
  }
}
```

Beheerroutes vereisen beheerauthenticatie voor het dashboard of het overeenkomende API-sleutelbeleid.

Payload voor RTK TOML-validatie:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Gebruik `"action": "install"` om het gevalideerde bestand globaal te installeren. Voeg `"overwrite": true` alleen toe
nadat u de vervanging van een bestaand globaal bestand hebt gecontroleerd en bevestigd.

## Herstel van ruwe uitvoer

RTK retourneert normaal gesproken alleen gecomprimeerde tekst. Voor foutopsporing kan `rawOutputRetention` geredigeerde
ruwe uitvoer bewaren:

| Waarde     | Gedrag                                                      |
| ---------- | ----------------------------------------------------------- |
| `never`    | Ruwe uitvoer niet bewaren                                   |
| `failures` | Alleen uitvoer van waarschijnlijke fouten bewaren           |
| `always`   | Alle gecomprimeerde ruwe RTK-uitvoer bewaren, na redigering |

Bewaarde bestanden worden opgeslagen onder:

```txt
DATA_DIR/rtk/raw-output/
```

Geheimen worden vóór opslag geredigeerd, waaronder gangbare bearer-tokens, API-sleutels, Slack-tokens,
AWS-toegangssleutels en waarden in toewijzingsvorm zoals `token=...`, `secret=...` en `password=...`. Analyses
slaan alleen de verwijzings-id, grootte en hashmetadata op.

## Verificatiepoort

De gerichte verificatiepoort voert ingebouwde tests voor inlinefilters uit zonder externe opdrachten via een shell aan te roepen:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

De bredere RTK-poort is:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Voer vóór een release de brede compressiepoort uit:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## RTK uitbreiden

1. Voeg een JSON-filterbestand toe of werk er een bij.
2. Neem ten minste één `tests[]`-voorbeeld op dat het belangrijke gedrag aantoont.
3. Voeg voor nieuwe opdrachtfamilies een fixture toe onder `tests/unit/compression/fixtures/rtk/`.
4. Voeg dekking voor opdrachtdetectie toe wanneer je een nieuwe uitvoerklasse introduceert.
5. Voer de verificatiepoort en de brede RTK-poort uit.
6. Als het filter projectspecifiek is, commit dan `.rtk/filters.json` en vernieuw `.rtk/trust.json` pas na beoordeling.

---

## Intensiteitsniveaus (v3.8.16+)

RTK ondersteunt **3 intensiteitsniveaus** die een afweging maken tussen **agressiviteit van compressie** en **veiligheid**. Het niveau wordt ingesteld via `config.intensity` in de engineconfiguratie.

### De 3 niveaus

| Niveau                 | Afkappingsdrempel    | Tokenbesparing | Risico    | Het meest geschikt voor           |
| ---------------------- | -------------------- | -------------- | --------- | --------------------------------- |
| `minimal`              | 24 regels per sectie | ~20-40%        | Zeer laag | Productie met kritieke context    |
| `standard` (standaard) | 24 regels per sectie | ~50-70%        | Laag      | Dagelijkse programmeersessies     |
| `aggressive`           | 16 regels per sectie | ~70-90%        | Gemiddeld | Lange sessies, maximale besparing |

### Waar de afkapping plaatsvindt

De afkappingsdrempel is van invloed op `lineFilter.ts`:

```ts
// Uit open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Zowel het **begin** als het **einde** van elke sectie blijft behouden; inhoud in het midden wordt verwijderd wanneer de afkapping wordt geactiveerd.

### Wat behouden blijft en wat wordt verwijderd

| Inhoud                                 | minimal          | standard         | aggressive       |
| -------------------------------------- | ---------------- | ---------------- | ---------------- |
| Fouten / stacktraces                   | ✅ behouden      | ✅ behouden      | ✅ behouden      |
| Mislukte tests                         | ✅ behouden      | ✅ behouden      | ✅ behouden      |
| Buildfouten                            | ✅ behouden      | ✅ behouden      | ✅ behouden      |
| Geslaagde tests (uitgebreid)           | ✅ behouden      | 🟡 samengevouwen | 🟡 samengevouwen |
| Routinematige uitvoer (informatielogs) | 🟡 samengevouwen | 🟡 samengevouwen | ❌ verwijderd    |
| Voortgangsbalken                       | 🟡 samengevouwen | ❌ verwijderd    | ❌ verwijderd    |
| Banner / ASCII-art                     | 🟡 samengevouwen | ❌ verwijderd    | ❌ verwijderd    |

### De juiste intensiteit kiezen

```
                  Is contextverlies catastrofaal?
                  │
      ┌───────────┼───────────┐
      │           │           │
     JA          NEE       NIET ZEKER
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Hoe kritiek     Probeer eerst `standard`
      │      is doorvoer?    (werkt voor 80% van de
      │           │          gevallen)
      │      ┌────┴────┐
      │      │         │
      │    LAAG       HOOG
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Intensiteit configureren

**Per combinatie** (in de combinatieconfiguratie):

```json
{
  "combo": "my-coding-combo",
  "routing": {/* ... */},
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

**Programmatisch**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) is een
`CompressionEngine` en heeft geen `updateConfig`-methode. Werk de configuratie van een engine
in plaats daarvan bij via de registerhelper:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Het effect verifiëren

Gebruik de **verificatiepoort** (zie hieronder) om te bevestigen dat je filter veilig is bij de gekozen intensiteit:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filters zijn mislukt bij agressieve intensiteit");
}
```

---

## Aangepaste filters ontwikkelen (v3.8.16+)

De map `engines/rtk/filters/` bevat **meer dan 49 ingebouwde JSON-filterbestanden**. U kunt uw eigen filters toevoegen om uitvoer te comprimeren van aangepaste tools die niet door de standaardfilters worden ondersteund.

### Filterschema (Zod)

```ts
{
  "id": "string",                      // Verplicht. Filter-ID (kebab-case, bijvoorbeeld "python-traceback")
  "label": "string",                   // Verplicht. Voor mensen leesbare filternaam
  "description": "string",             // Optioneel (standaard: ""). Korte beschrijving van wat het filter doet
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Optioneel (0-100, standaard: 50). Uitvoeringsvolgorde (hoger = eerst)
  "match": {
    "commands": ["string"],            // Namen van opdrachten die moeten overeenkomen (bijvoorbeeld "python", "pytest")
    "patterns": ["string"],            // Reguliere expressies die met de uitvoer moeten overeenkomen
    "outputTypes": ["string"]          // Gedetecteerde uitvoerklassen (bijvoorbeeld "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Optioneel (standaard: false). ANSI-kleurcodes verwijderen
    "replace": [                       // Zoek-en-vervangregels (standaard: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Direct stoppen bij een patroonovereenkomst (standaard: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Overslaan als dit patroon overeenkomt
      }
    ],
    "includePatterns": ["string"],     // Regels die behouden moeten blijven (reguliere expressies, standaard: [])
    "dropPatterns": ["string"],        // Regels die moeten worden verwijderd (reguliere expressies, standaard: [])
    "collapsePatterns": ["string"],    // Regels die tot één exemplaar moeten worden samengevoegd (standaard: [])
    "deduplicate": boolean,            // Optioneel (standaard: false). Dubbele regels verwijderen
    "truncateLineAt": number,          // Optioneel (standaard: 0). Regels tot het maximale aantal tekens afkappen
    "maxLines": number,                // Optioneel (standaard: 0). Harde limiet voor het totale aantal regels
    "headLines": number,               // Optioneel (standaard: 20). De eerste N regels van overeenkomende uitvoer behouden
    "tailLines": number,               // Optioneel (standaard: 20). De laatste N regels van overeenkomende uitvoer behouden
    "onEmpty": "string",               // Optioneel (standaard: ""). Terugvalbericht als alle regels zijn uitgefilterd
    "filterStderr": boolean            // Optioneel (standaard: false). Ook stderr-uitvoer filteren
  },
  "preserve": {
    "errorPatterns": ["string"],       // Patronen die altijd behouden moeten blijven (standaard: [])
    "summaryPatterns": ["string"]      // Patronen voor de laatste samenvattingsregel (standaard: [])
  },
  "tests": [                           // Ingebouwde tests voor verificatie (standaard: [])
    {
      "name": "string",               // Verplicht. Testnaam
      "input": "sample output",        // Verplicht. Voorbeeld van invoertekst
      "expected": "expected output",   // Verplicht. Verwachte gecomprimeerde uitvoer
      "command": "optional command"    // Optioneel. Opdrachtcontext
    }
  ]
}
```

### Voorbeeld: Python-tracebackfilter

```json
{
  "id": "python-traceback",
  "label": "Python Traceback Filter",
  "description": "Compresses Python tracebacks to essential file/line locations and error type",
  "category": "test",
  "priority": 60,
  "match": {
    "commands": ["python", "python3", "pytest", "uv", "poetry"],
    "patterns": ["Traceback \\(most recent call last\\)", "Error", "Exception"],
    "outputTypes": ["error-traceback"]
  },
  "rules": {
    "stripAnsi": true,
    "includePatterns": [
      "Traceback \\(most recent call last\\)",
      "^\\s*File \".+\", line \\d+",
      "^\\s*[A-Z][a-zA-Z]+Error:",
      "^\\s*[A-Z][a-zA-Z]+Exception"
    ],
    "dropPatterns": ["site-packages/", "^\\s+[a-z_]+\\([^)]*\\)$"],
    "headLines": 5,
    "tailLines": 3,
    "maxLines": 25,
    "filterStderr": true
  },
  "preserve": {
    "errorPatterns": ["Error:", "Exception:", "Traceback"],
    "summaryPatterns": ["^[A-Z][a-zA-Z]+(?:Error|Exception):"]
  },
  "tests": [
    {
      "name": "preserves-error-type-and-location",
      "input": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "expected": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n  File \"lib/utils.py\", line 17, in helper\nZeroDivisionError: division by zero",
      "command": "python app.py"
    }
  ]
}
```

### Aangepaste filters laden

Plaats het bestand op een herkende locatie:

```
~/.omniroute/rtk/filters/my-filter.json     # Gebruikersniveau
<project>/.rtk/filters/my-filter.json      # Projectniveau
```

Filters worden bij het opstarten automatisch geladen via `loadRtkFilters()` in `open-sse/services/compression/engines/rtk/filterLoader.ts`. De loader zoekt naar filters in:

- Ingebouwde catalogus: `open-sse/services/compression/engines/rtk/filters/`
- Gebruikersmap: `~/.omniroute/rtk/filters/`
- Projectmap: `<project>/.rtk/filters/`

Om filters programmatisch te laden:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Opties: customFiltersEnabled (gebruikers-/projectfilters laden, standaard ingeschakeld),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Validatie

Filters worden tijdens het laden gevalideerd aan de hand van het Zod-schema. Een filter met een onjuiste structuur kan niet worden geladen en er wordt een fout geregistreerd:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

Om alle geïnstalleerde filters te valideren, roept u `runRtkFilterTests()` aan, dat wordt geëxporteerd vanuit `open-sse/services/compression/engines/rtk/verify.ts`.

### Aanbevolen werkwijzen

1. **Neem altijd `tests[]` op** — hiermee bewijs je dat je filter werkt en voorkom je regressies
2. **Gebruik `matchOutput` voor kortsluitingen** — als één regel het hele verhaal vertelt, vervang dan het volledige blok
3. **Geef de voorkeur aan `keep` boven `strip`** — expliciete regels voor "altijd behouden" zijn veiliger dan regels voor "altijd verwijderen"
4. **Test op alle 3 intensiteitsniveaus** — `minimal` hoort niets te wijzigen, terwijl `aggressive` fouten nog steeds moet behouden
5. **Gebruik het veld `unless`** — scherm kortsluitingen af met "niet activeren als X aanwezig is"

---

## Herstel van ruwe uitvoer & verificatiepoort

Wanneer RTK uitvoer agressief comprimeert, kunt u **de oorspronkelijke tekst herstellen** voor foutopsporing, audits of herhaling.

### Hoe herstel van ruwe uitvoer werkt

```
Oorspronkelijke uitvoer (10K tokens)
        │
        ▼
RTK-compressie (met rawOutput.enabled=true)
        │
        ├─▶ Gecomprimeerde uitvoer (2K tokens)  ──▶ naar LLM
        │
        └─▶ Oorspronkelijke uitvoer (10K tokens) ──▶ opgeslagen in DB
                                                   (gekoppeld via request_id)
```

### Opslag van ruwe uitvoer inschakelen

**Per aanvraag** (in de combo-configuratie):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // Limiet van 1 MB
    }
  }
}
```

**Standaard**: `rawOutput.enabled: false` (bespaart opslagruimte).

### Opslagkosten

| Per aanvraag                      | Limiet van 1 MB | Limiet van 10 MB |
| --------------------------------- | --------------- | ---------------- |
| Gemiddelde gecomprimeerde uitvoer | ~5KB            | ~5KB             |
| Opgeslagen ruwe uitvoer           | ~50-500KB       | ~500KB-5MB       |
| Bij 1000 aanvragen per dag        | 50-500MB/dag    | 500MB-5GB/dag    |

> **Aanbeveling**: Schakel ruwe uitvoer alleen in voor **foutopsporingssessies** of **steekproefsgewijze audits**, niet permanent.

### Het origineel herstellen

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId uit compressiestatistieken
if (raw) {
  console.log("Oorspronkelijke uitvoer:", raw);
}
```

De `pointerId` wordt na compressie geretourneerd in `CompressionStats.rtkRawOutputPointers[]`.
Zie `open-sse/services/compression/engines/rtk/rawOutput.ts:102` voor de functiesignatuur.

### De verificatiepoort

De **RTK-filterverificatie** (`open-sse/services/compression/engines/rtk/verify.ts`) valideert alle filters aan de hand van hun `tests[]` en zorgt ervoor dat het gedrag correct is op alle 3 intensiteitsniveaus.

**Roep `runRtkFilterTests()` aan** om de verificatie uit te voeren:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Geslaagd: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Mislukt: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Filters zijn niet door de verificatie gekomen");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: verwachtte "${o.expected}", kreeg "${o.actual}"`
      );
    });
}
```

**Wat wordt gevalideerd**:

1. Elk filter wordt geladen en doorstaat de schemavalidatie
2. Elke `tests[]`-vermelding produceert de verwachte uitvoer
3. De intensiteit `minimal` voert geen bewerkingen uit (behoudt het origineel en past alleen structurele filters toe)
4. De intensiteit `aggressive` behoudt fouten, mislukte tests en stacktraces
5. Gecomprimeerde uitvoer is nooit groter dan de oorspronkelijke invoer

- Bron: `open-sse/services/compression/engines/rtk/` (63 bestanden, ~70KB)

- **Voordat u een filterwijziging samenvoegt** — zorg er altijd voor dat de tests slagen
- **Na het upgraden van de RTK-engine** — het schema kan zijn gewijzigd
- **Periodiek tijdens monitoring** — beschermt tegen afwijkingen in testfixtures
- **Bij het toevoegen van een nieuwe tool- of opdrachtfamilie** — bewijst dat het nieuwe filter werkt

---

## Zie ook

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Volledig overzicht van de compressiepijplijn
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Engineregister en ingebouwde engines
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Aangepaste engines, taalpakketten, gestapelde pijplijnen
- Bron: `open-sse/services/compression/engines/rtk/` (63 bestanden, ~70 KB)
