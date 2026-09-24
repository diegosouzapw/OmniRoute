# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Tämä dokumentti kuvaa OmniRouteen lisättyä palautepohjaisen mukautuvan reitityksen perustaa. Se on tarkoituksella suppea: se lisää tyypitetyn reititystulosten kanavan, olemassa olevaa auto-combo-pisteytystä syöttävän reaaliaikaisen laatusignaalin, valinnaisen OpenTelemetry-viejän sekä selitettävyyden rajapinnan. Se **ei** korvaa olemassa olevaa vikasietoisuuspinoa (katkaisija, yhteyden jäähdytysjakso, mallin lukitus, kuntomatriisi, autopilotti), vaan täydentää sitä.

## 1. Arkkitehtoninen konteksti

OmniRoute on datataso, jossa on **pyyntöjen kriittinen polku** ja **ohjaus-/älykkyystaso**. Kriittisen polun on pysyttävä nopeana, muistitehokkaana, asynkronisena, vikasietoisena ja ennustettavana. Arviointi, laadun pisteytys, kokeilut ja historiallinen analyysi kuuluvat ohjaustasolle.

```
AI-agentti / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   datataso (nopea, synkroninen, muistissa)
│  reititys / vaihto  │
│  kunto / suojaukset │
│  välimuisti / virta │
└──────────┬──────────┘
           │ RoutingEvent (lähetä ja unohda, ~0.2µs)
           ▼
┌─────────────────────┐
│ Palautekanavat      │   ohjaustaso (asynkroninen, parhaan yrityksen periaate)
│ laadun seuranta     │
│ OTel-viejä          │
│ selitystietovarasto │
└──────────┬──────────┘
           ▼  laatupisteet
      auto-combo-pisteytys
```

### Mitä oli jo olemassa (auditoitu, ei toteutettu uudelleen)

| Käsite                                     | Olemassa oleva toteutus                                                                                        |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Saatavuus (voimmeko lähettää liikennettä?) | Katkaisija (CLOSED/DEGRADED/OPEN/HALF_OPEN, tallennettu tietokantaan), yhteyden jäähdytysjakso, mallin lukitus |
| Kunnon raportointi                         | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                        |
| Varjoliikenne                              | `open-sse/services/combo/shadowRouting.ts`                                                                     |
| Suojaukset                                 | `src/lib/guardrails/` (esi-/jälkikäsittelijät)                                                                 |
| Tarkka välimuisti                          | `src/lib/semanticCache.ts` (allekirjoituspohjainen)                                                            |
| Arvioijat / arviointipohjainen reititys    | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                           |
| Combo-päätösten selitettävyys              | `open-sse/services/combo/decisionTrace.ts`                                                                     |
| Hallintapaneelin reaaliaikaiset tapahtumat | `src/lib/events/eventBus.ts` (käyttöliittymän ilmoituskanava, `unknown`-hyötykuormat, 100 merkinnän historia)  |

Reititystapahtumakerros **ei** ole `eventBus`-väylän uudelleentoteutus: kyseinen väylä on hallintapaneelin reaaliaikainen ilmoituskanava (tyypitetyt _tapahtumien nimet_, läpinäkymättömät hyötykuormat, käyttöliittymäkuluttajat). `RoutingEvent` on tyypitetty _tulosrakenne_ (viive/tunnisteet/kustannus/tulos/lopetussyy), jota ohjaustason palautekanavat (laadun seuranta, OTel-viejä, selitystietovarasto) käyttävät.

### Mitä puuttui (lisätty tässä)

1. **Tyypitetty reititystuloksen tapahtuma- ja vastaanotinabstraktio** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` on rajattu comboon ja toimii vain muistissa;
   `comboMetrics` sisältää kumulatiivisia laskureita; `call_logs` on raakamuotoista asynkronista pysyvää tallennusta.
   Mikään näistä ei ole tyypitetty, vastaanottimiin perustuva tuloskanava, jonka laadun seuranta, OTel-viejä
   tai Future-AGI-tyylinen arvioija voisi tilata.
2. **Reaaliaikainen laatusignaali** (EWMA) tulosteen laadulle — pisteytys arvioi aiemmin
   ”laatua” vain staattisen tehtäväsopivuuden ja erikseen käyttöön otettujen arviointien läpäisyasteiden avulla.
3. **Valinnainen, riippuvuuksista vapaa OTel-viejä**, joka käyttää GenAI:n semanttisia käytäntöjä.
4. **Selitettävyyden rajapinta**, joka palauttaa todelliset reitityspäätökset ja laatutilan.

## 2. Reititystapahtumat (palautteen perusta)

Tiedostot: `open-sse/services/routing/events.ts`, `.../index.ts`

`RoutingEvent` sisältää vain reitityksen metatiedot:

```ts
interface RoutingEvent {
  requestId: string;
  provider: string;
  model: string;
  strategy: string; // "auto" | "priority" | "direct" | ...
  latencyMs: number;
  ttftMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome; // sallittujen arvojen unioni
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` on TypeScriptissä `Send+Sync`-tyylinen rajapinta:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // on oltava O(1), ei synkronista I/O:ta
}
```

Kuumalla suorituspolulla kutsutaan `emitRoutingEvent(event)`-funktiota kerran kutakin valmistunutta pyyntöä kohden
(suoratoiston valmistumisen takaisinkutsussa, ilman suoratoistoa onnistuneen pyynnön polulla ja
virheellisen 200-vastauksen vikapolulla `handleChatCore`-funktiossa). Jakelu rekisteröidyille
vastaanottajille tapahtuu synkronisesti, mutta kukin vastaanottaja vain lisää tapahtuman jonoon tai päivittää muistissa olevaa tilaa. **Ei
synkronisia tietokantakirjoituksia eikä verkko-I/O:ta kuumalla suorituspolulla.**

Oletusvastaanottajat:

- `MemoryRoutingEventStore` — rajattu (500) rengaspuskuri, uusin ensin, selityspäätepistettä
  varten.
- `QualityTracker`-kuluttaja — päivittää EWMA-laatuarvion.
- `OtlpHttpsEventSink` — valinnainen; käytössä vain, kun `OMNIROUTE_OTEL_ENDPOINT`
  (tai `OTEL_EXPORTER_OTLP_ENDPOINT`) on asetettu.

### Mitattu yleiskustannus (rehellinen vertailu)

`npm run bench:routing-events` tällä työasemalla (100k iteraatiota; alle mikrosekunnin operaatiot
mitattu koostettuina µs/op-arvoina, koska operaatiokohtaiset persentiilit alittavat
`performance.now()`-ajastimen resoluution):

| Skenaario                                   | µs/op  | ops/s  |
| ------------------------------------------- | ------ | ------ |
| perustaso (vain pisteytys)                  | ~0.045 | ~22 M  |
| perustaso + RoutingEvent (2 vastaanottajaa) | ~0.168 | ~5.9 M |
| perustaso + tapahtuma + OTel-jonotus        | ~0.163 | ~6.1 M |
| rinnakkainen (8 lomitettua pursketta)       | ~0.18  | —      |

Tapahtumien jakelun lisäkustannus perustason pisteytykseen verrattuna on ~0.12 µs/pyyntö; OTel-vastaanottaja
vain lisää jonoon (O(1)-puskurilisäys), eikä sen aiheuttama lisäkustannus ole mitattavissa. Nämä luvut ovat
konekohtaisia ja suhteellisia — ne eivät ole tuotantotakuu. Version v1 "~0.2 µs"
-luku oli koostettu arvio; tämä menetelmä erottaa pisteytyksen perustason
tapahtumien jakelun kustannuksesta.

## 3. Laatusignaali (palautteeseen perustuva palveluntarjoajan tila)

Tiedostot: `open-sse/services/routing/quality.ts`

v2 erottaa **toiminnallisen** laadun **semanttisesta** laadusta:

- **Toiminnallinen** — johdetaan reitityksen kuumalta suorituspolulta (HTTP 4xx/5xx, yhteysvirheet,
  429-vastaukset, virheelliset vastaukset, suoratoiston keskeytykset, `finish_reason=length`,
  onnistuneet vastaukset ilman tulostetta sekä viiveen/TTFT:n EWMA). 200-vastausta EI käsitellä semanttisena
  laatuna.
- **Semanttinen** — luodun tulosteen todellinen arvo. Sen tuottaa AINOASTAAN
  arvioija `setSemanticQuality()`-funktion kautta. Arvo on `null`, kunnes jokin arvioija antaa sen,
  eikä se koskaan vuoda toiminnalliseen pistemäärään.

Tila kullekin (palveluntarjoaja, malli) -parille (EWMA + rajatut laskurit):

- `successEwma` — lopputuloksen onnistumisen EWMA (α=0.2).
- `latencyEwma` / `ttftEwma` — viiveen EWMA (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — kuinka äskettäin malli havaittiin viimeksi.

### Luottamuksen / otosmäärän huomiointi

`confidence = clamp01(samples / 50)`, ja pisteyttäjälle palautettava pistemäärä
sekoitetaan kohti neutraalia keskipistettä:

```
score = 0.5 + confidence * (operational - 0.5)
```

Seuraukset (vahvistettu testeillä):

- Kylmä palveluntarjoaja (0 otosta) saa pistemäärän **0.5** — sitä ei rangaista epäoikeudenmukaisesti, mutta
  se ei voi ohittaa palveluntarjoajaa, jolla on tuhansia vahvoja havaintoja.
- Palveluntarjoajan, jolla on 7 onnekasta onnistumista, pistemäärää vedetään kohti arvoa 0.5 (se ei koskaan pääse hallitsemaan
  optimistisen alustuksen ansiosta).
- Palveluntarjoaja, jolla on vähintään 50 otosta, lähestyy todellista toiminnallista pistemääräänsä.
- Heikkeneminen ja palautuminen tapahtuvat asteittain (EWMA), eikä yksittäinen erillinen virhe
  romahduta terveen palveluntarjoajan tilaa.

`ProviderQuality` tarjoaa arvot `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Tämä syötetään automaattisen yhdistelmän pisteyttäjälle `quality`-pisteytystekijänä:

- `ScoringFactors.quality` / `ScoringWeights.quality` tiedostossa
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Summa pysyy arvossa 1.0.
- `buildAutoCandidates` täyttää `candidate.quality`-arvon seurannasta; ehdokkaat,
  joista ei ole tietoja, saavat oletusarvoisesti neutraalin arvon **0.5** (kylmää ehdokasta ei suosita eikä
  rangaista).

Suljettu palautesilmukka:

```
RoutingEvent → QualityTracker → getQualityScore → automaattisen yhdistelmän laatutekijä
      ↑                                                    │
      └────── pyynnön lopputulos (handleChatCore) ←─────────┘
```

### Tiukka poissulkeminen vs. pehmeä rangaistus

Laatusignaali on ainoastaan **pehmeä mukautuva preferenssi**. Tiukka poissulkeminen jää
olemassa olevan vikasietoisuuspinon vastuulle: OPEN-tilassa oleva katkaisija, loppuun käytetty kiintiö,
todennusvirhe, mallin lukitus — laatuarvo ei vaikuta yhteenkään näistä.
Palveluntarjoajaa, jonka laatuarvo laskee tilapäisesti, suositaan vähemmän, mutta sitä ei koskaan
poisteta käytöstä kokonaan.

## 3b. Kanoninen suoratoiston ajoitus (TTFT / ITL)

Tiedostot: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` on suoratoistopolun keskitetty instrumentointipiste,
joka on kytketty `createSSEStream`-toimintoon (open-sse/utils/stream.ts):

- `markByte()` — ensimmäinen ylävirrasta vastaanotettu lohko.
- `markForward()` — ensimmäinen asiakkaalle välitetty lohko (käytetään TTFT:hen).
- `markInterrupted()` — suoratoiston aikakatkaisu/keskeytys/virhe ennen hallittua päättymistä.
- `ttft()` = ensimmäisen välitetyn SSE-lohkon viive. **Tämä EI ole token-tason TTFT** —
  yksi SSE-lohko voi sisältää nolla, yhden tai useita tokeneita. Dokumentoitu täsmällisesti.
- `avgItlMs()` = lohkojen välisten aikojen keskiarvo (ITL:n lohkoviiveeseen perustuva sijaismittari).

TTFT/ITL/keskeytystieto siirtyvät `RoutingEvent`-tapahtumaan (`ttftMs`, `itlMs`) ja
viedään GenAI/OmniRoute-span-attribuutteina OTel-nielun kautta.

## 4. OpenTelemetry / GenAI-havainnoitavuus

Tiedostot: `open-sse/services/routing/otel.ts`

- Riippuvuuksista vapaa OTLP/HTTP JSON -viejä (käyttää globaalia `fetch`-toimintoa, ei
  `@opentelemetry/*` SDK:ta).
- Spanit noudattavat GenAI:n semanttisia käytäntöjä (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) sekä OmniRouten reititys-
  attribuutteja (lopputulos, tila, ttft, uudelleenyritykset, varavaihtoehto).
- `record()` vain lisää tapahtuman rajattuun puskuriin (O(1)); tausta-ajastin
  tyhjentää puskurin asynkronisesti kutsulla `POST {endpoint}/v1/traces`. Ylikuormituksessa
  vanhimmat tapahtumat pudotetaan (`dropped`-laskuri) — datatasoon ei koskaan kohdisteta
  vastapainetta.
- **Pois käytöstä, ellei sitä ole määritetty.** `OMNIROUTE_OTEL_ENDPOINT` (tai
  `OTEL_EXPORTER_OTLP_ENDPOINT`) on asetettava; muutoin nielua ei
  rekisteröidä eikä mitään OTel-koodia suoriteta.

## 5. Selitettävyys

- `GET /v1/explain/routing` palauttaa viimeisimmät `RoutingEvent`-tapahtumat (todelliset
  päätökset, uusimmat ensin) sekä palveluntarjoaja-/mallikohtaisen laatutilannekuvan.
- Todennus vastaa `/v1/combos`-päätepistettä (Bearer-API-avain tai hallintapaneelin istunto; anonyymi käyttö
  yhden käyttäjän paikallisissa käyttöönotoissa, joissa `REQUIRE_API_KEY=false`).
- Yhdistelmätason kutsukohtaiset jäljitykset ovat edelleen saatavilla olemassa olevan
  `decisionTrace.ts`-toteutuksen kautta (otsake `X-OmniRoute-Combo-Trace`).
- Turvallisuus: tapahtumat sisältävät vain reitityksen metatietoja, eivät koskaan kehotteita/runkoja/tunnistetietoja.

## 6. Arviointitason integrointi (valmius Future AGI:ta varten)

OmniRoute käsittelee Future AGI:ta (tai mitä tahansa arvioijaa) **mahdollisena
älykkyys-/arviointitaustajärjestelmänä, ei riippuvuutena**. Liitoskohdat:

- `RoutingEventSink` voi välittää tapahtumia arvioijalle asynkronisesti.
- `MemoryRoutingEventStore` ja laatutilannekuva antavat arvioijalle käsittelemättömän
  päätösvirran.
- Tuleva `Evaluator` (deterministinen, paikallinen arvioija, HTTP, WASM) käyttäisi
  tapahtumia/jäljityksiä ja palauttaisi `QualityScore`-arvon, joka syötetään samaan
  `getQualityScore`-/laatukerroinpolkuun.
- Nykyinen arviointiohjattu reititys (`open-sse/services/evalRouting.ts`) järjestää jo
  yhdistelmän kohteet uudelleen `eval_runs`-läpäisyasteiden perusteella, kun toiminto on käytössä.

Mitään arviointia ei suoriteta synkronisesti pyyntöpolulla, ja yhdyskäytävä toimii
täysin ilman arvioijaa.

## 7. Lopullinen arkkitehtuurikatselmus

1. **Mitä synkroniselle kuumalle polulle jää?** Reititys/pisteytys, suojakaiteiden
   ennakkotarkistukset, välimuistihaku ja yksi `emitRoutingEvent`-hajautus (noin 0,12 µs
   perustason pisteytyksen lisäksi) muistissa oleviin nieluihin.
2. **Mitä siirrettiin asynkroniseen käsittelyyn?** OTel-vienti (ajastin + fetch),
   `call_logs`-/käyttötietojen pysyväistallennus, semanttisen välimuistin kirjoitukset; laatu säilytetään muistissa
   ja toimii O(1)-ajassa (asynkronisuutta ei tarvita).
3. **Miten reititystuloksesta tulee palautetta?** `handleChatCore` lähettää
   `RoutingEvent`-tapahtuman → `QualityTracker` päivittää EWMA-tilan → `getQualityScore`
   syöttää automaattisen yhdistelmän `quality`-kerrointa.
4. **Miten laatu vaikuttaa tulevaan reititykseen?** Matala laatupistemäärä pienentää
   kyseisen palveluntarjoajan/mallin painotettua pistemäärää `scoreAutoTargets`-toiminnossa, joten heikentyneitä
   malleja suositaan asteittain vähemmän, ja niiden asema palautuu EWMA-arvon parantuessa.
5. **Miten Future AGI voidaan integroida ilman, että siitä tulee riippuvuus?** Käyttämällä
   `RoutingEventSink`-rajapintaa / tulevaa `Evaluator`-sovitinta — ei kovakoodattua
   riippuvuutta.
6. **Mitä tapahtuu, kun arvioija ei ole käytettävissä?** Reititys ei muutu;
   malleille, joista ei ole havaittua signaalia, käytetään neutraalia laatua (1.0).
7. **Mitä tapahtuu, kun telemetria ei ole käytettävissä?** OTel-nielua ei yksinkertaisesti
   rekisteröidä; muu reitityskerros toimii muuttumattomana.
8. **Mitä tapahtuu ylikuormituksessa?** OTel-puskuri pudottaa vanhimmat tapahtumat; laadun
   seuranta ja rengaspuskuri ovat rakenteellisesti rajattuja; vastapainetta ei synny.
9. **Miten palveluntarjoajan tila palautuu heikentymisen jälkeen?** EWMA konvergoituu uudelleen
   onnistumisten kertyessä; lämmittely pitää kylmät mallit neutraaleina; katkaisija
   palautuu itsenäisesti HALF_OPEN-koekutsujen avulla.
10. **Mitä ehdotettuja ominaisuuksia jätettiin tarkoituksella toteuttamatta ja miksi?**
    - Varjoliikenne / kokeilut — jo toteutettu
      (`combo/shadowRouting.ts`); ei toteutettu uudelleen.
    - Suojakaiteet — jo toteutettu (`src/lib/guardrails/`); ei monistettu.
    - Semanttinen välimuisti — jo toteutettu (`src/lib/semanticCache.ts`); ei
      monistettu.
    - Täysimittainen kokeilujen hallinta-alusta, tietojoukkotyökalut, kehotteiden optimointi-
      alusta, vektoritietokanta tai pakollinen ulkoinen OTel-infrastruktuuri — eivät kuulu
      kevyen datatason rajaukseen.
    - Rustin `RoutingEvent`-rakenne — datataso on toteutettu TypeScriptillä; TS-tyyppi
      on mukautettu vastine.

## 8. Konfiguraation viite

| Muuttuja                      | Oletusarvo  | Vaikutus                                                                               |
| ----------------------------- | ----------- | -------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | ei asetettu | Kun asetettu, ottaa OTLP/HTTP-jälkien viejän käyttöön (esim. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | ei asetettu | OTLP-päätepisteen varanimike.                                                          |
| `OTEL_SERVICE_NAME`           | `omniroute` | `service.name`-resurssiattribuutti.                                                    |

## 9. Testit

- `tests/unit/routing-events.test.ts` — tapahtumien normalisointi, tilan
  luokittelu, rajattu rengaspuskuri, välitys useille nieluille + eristys.
- `tests/unit/routing-quality.test.ts` — EWMA-lämmittely, palautuminen epäonnistumisesta/onnistumisesta,
  poikkeamien rangaistukset, 429-tilan väliaikainen käsittely, tilannekuva, nollaus.
- `tests/unit/routing-scoring-quality.test.ts` — painojen eheys, neutraali
  oletusarvo, laatutekijän mukainen järjestys.
- `tests/unit/routing-otel.test.ts` — käyttöönoton ehdollisuus, GenAI-spanin hyötykuorma, asynkroninen
  tyhjennys, hylkäys ylikuormituksessa.
- `tests/unit/routing-events-concurrency.test.ts` — tuhansia tapahtumia, rengas-
  puskurin rajallisuus, poikkeuksen heittävän nielun eristys, lomitetut asynkroniset purskeet,
  nollaus lisäysten aikana.
- `tests/unit/routing-adaptive-e2e.test.ts` — deterministinen päästä päähän -silmukka
  todellisen `scoreAutoTargets`-pisteyttäjän kautta: terve → heikkenee → palautuu → hetkellinen häiriö sekä
  kylmäkäynnistys- ja onnekas-kylmä-palveluntarjoaja-skenaariot.
- `tests/unit/stream-timing.test.ts` — TTFT (ensimmäinen välitetty lohko), ITL,
  ensimmäinen tavu vs. ensimmäinen välitys, keskeytys, virheellisten/tyhjien lohkojen turvallinen käsittely.

## 10. Aiemmin havaittujen ongelmien tila (vaihe 18)

| Ongelma                                                    | Tila                       | Huomautukset                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniglyph`-viennin ristiriita                             | **KORJATTU (ympäristö)**   | `node_modules` ei ollut synkronoitu `package-lock.json`-tiedoston kanssa (asennettu 1.3.1, lukittu 1.4.0). Komennon `npm install omniglyph@1.4.0` suorittaminen palautti lukitun version; tyyppivirheiden määrä putosi nollaan. Manifestit säilyivät muuttumattomina.                                               |
| Vanhentuneet `getKnownContextOverflow`-testit              | **TUNNETTU — ei korjattu** | `combo-context-overflow-compression-probe.test.ts` tuo funktion, jota ei enää ole tiedostossa `open-sse/services/combo.ts` (siihen viitataan vain kommenteissa). Korjaaminen edellyttää toteuttamista uudelleen tai kyseisten testien kirjoittamista uudelleen — arkkitehtuurin muutoksia, jotka eivät liity tähän. |
| `combo-runtime-unit-concurrency.test.ts`-tietokantaeristys | **TUNNETTU — ei korjattu** | Testausympäristön SQLite-eristyksen varmennus epäonnistuu suoraan suoritettaessa; se epäonnistuu samalla tavalla myös perushaarassa.                                                                                                                                                                                |
| i18n-`llm.txt`-poikkeama                                   | **TUNNETTU — ei korjattu** | `docs/i18n/*/llm.txt` poikkeavat juuritason tiedostosta; ongelma oli olemassa jo ennestään ja estää dokumenttien synkronoinnin pre-commit-tarkistuksen.                                                                                                                                                             |

Ympäristö- ja koodiongelmat pidetään erillään; asiaan liittymättömiä virheitä ei piiloteta
muutettujen testisuodattimien taakse.
