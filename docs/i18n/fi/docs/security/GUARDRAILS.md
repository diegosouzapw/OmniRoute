# Guardrails (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Totuuden lähde:** `src/lib/guardrails/`
> **Päivitetty viimeksi:** 2026-08-29 — v3.8.51 (Video Bridgen transkription alkuperän ilmoittaa kutsuja,
> eikä palvelin vielä varmista sitä — selvennetty kohdan #11661 mukaisesti)

Suojaukset toteuttavat turvallisuus-, käytäntö- ja sisältömuunnokset OmniRouten
ja ylävirran palveluntarjoajien välisellä rajalla. Kukin suojaus voi tarkastaa
(ja valinnaisesti hylätä, muuntaa tai annotoida) pyyntöjen hyötykuormia
(`preCall`) ja ylävirran vastauksia (`postCall`).

Järjestelmä on **häiriötilanteessa salliva**: jos suojaus aiheuttaa poikkeuksen
suorituksen aikana, rekisteri kirjaa virheen ja jatkaa seuraavaan suojaukseen
sen sijaan, että pyyntö epäonnistuisi. Estäminen on aina nimenomainen päätös
(`block: true`), ei koskaan vahinko.

## Sisäänrakennetut suojaukset

Rekisteri lataa tuonnin yhteydessä automaattisesti kuusi suojausta
prioriteettijärjestyksessä (katso `registry.ts` → `registerDefaultGuardrails()`):

| Prioriteetti | Nimi                | Vaihe(et)      | Tiedosto              |
| ------------ | ------------------- | -------------- | --------------------- |
| `5`          | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`          | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`          | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`         | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`         | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`         | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Pienemmät prioriteettiluvut suoritetaan **ensin**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Sieppaa kuvia sisältävät pyynnöt, jotka on kohdistettu **malleille ilman
näkökykyä**, ja joko uudelleenreitittää koko pyynnön näkökykyiseen malliin tai
korvaa kuvaosat määritettävän näkömallin tuottamilla tekstikuvauksilla ennen
ylävirran kutsua. Näin vain tekstiä tukevat palveluntarjoajat voivat käsitellä
multimodaalisia hyötykuormia läpinäkyvästi.

Kulku:

1. Ohita, jos kohdemalli tukee jo näkökykyä (ellei se esiinny pakotettujen
   bridge-mallien luettelossa `isVisionBridgeForcedModel`).
2. Poimi kuvaosat funktiolla `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), joka delegoi **yhtenäiselle mediatunnistimelle**
   `detectMediaParts()` tiedostossa `open-sse/utils/mediaParts.ts` — tämä on
   combo-yhteensopivuussuodattimen kanssa jaettu ainoa totuuden lähde.
   Poiminta on sallittujen luettelolla rajattu ylätason osiin, joiden muodot
   `replaceImageParts` voi liittää takaisin (poiminta↔korvaus-sopimus): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` ja Responses API `input_image`. Sisäkkäiset osumat ja
   vain ilmaisimena toimivat muodot kuuluvat combo-suodattimelle, eikä niitä
   koskaan poimita. Ohita, jos mitään ei löydy.
3. Selvitä ajonaikaiset asetukset funktiolla
   `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): uudet
   `modalityBridge*`-asetusavaimet ovat ensisijaisia; vanhat
   `visionBridge*`-avaimet säilyvät **yhden syklin vara-asetuksina**
   (palautusikkuna). Ohita ennen median läpikäyntiä, kun bridge on poistettu
   käytöstä.
4. Tilanvalitsin (`modalityBridgeVisionMode`, katso alla oleva taulukko)
   päättää uudelleenreitityksen ja kuvailun välillä. Uudelleenreititys palauttaa
   `modifiedPayload`-arvon, jossa vain `model` on vaihdettu, sekä metatiedot
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Kuvailupolku: rajoita kuvien määrä arvoon `maxImages`, muodosta tehtävän
   huomioiva kehote, tarkista kuvailuvälimuisti, kutsu näkömallia
   **rinnakkain** (`Promise.allSettled`) ja lisää kuvien tilalle
   `[Image N]: <description>`-tekstiosat. Epäonnistunut kuvailu tuottaa arvon
   `null`, ja alkuperäinen kuvaosa **säilytetään** (#4012) — paitsi
   combo-kuvailupolulla, kun kaikki kuvailut epäonnistuivat; tällöin
   vahvistetusti ilman näkökykyä olevalle ylävirralle annetaan sen sijaan
   paikkamerkki `(unavailable — no vision-capable provider connected)` (#8430).
6. Palauta `modifiedPayload` ja metatiedot (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Tilanvalitsin (`modalityBridgeVisionMode`)

| Tila       | Oletus | Toiminta                                                                                                                                                                                                                                                                                                                                   |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔      | Vanha heuristiikka muuttamattomana (#6640/#7204): muut kuin combo-/`auto/`-mallit uudelleenreititetään parhaaseen näkömalliin, ellei alkuperäisellä mallilla ole jo käyttökelpoisia tunnistetietoja (jolloin kuvaillaan); combo-kohteet kuvaillaan aina.                                                                                   |
| `describe` |        | Kuvaile aina — uudelleenreitityslohko ohitetaan kokonaan; käyttäjän valitsema malli vastaa aina.                                                                                                                                                                                                                                           |
| `reroute`  |        | Pakota uudelleenreititys: tunnistetiedot omaavan mallin säilyttävä tarkistus ohitetaan. Uudelleenreitityksen **kohteen** tunnistetietojen tarkistus on edelleen käytössä — kun käyttökelpoista näkökohdetta ei ole, pyyntö siirtyy kuvailuun, jotta raakakuvat eivät koskaan päädy vain tekstiä käsittelevään taustajärjestelmään (#8430). |

Pakotetut tilat oikosulkevat käsittelyn **ennen** automaattisen heuristiikan
suoritusta; `auto`-toiminta on tavutasolla identtinen PR-1:tä edeltäneen
suojauksen kanssa.

#### Tehtävän huomioiva kuvailukehote (`modalityBridgeVisionTaskAware`)

Oletuksena **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) lisää
peruskuvailukehotteeseen **viimeisen käyttäjäviestin** tekstin (lyhennettynä
500 merkkiin), ohjaa kuvailua siihen, mitä käyttäjä todella kysyi
(codex-vision-proxy-malli), ja pyytää näkömallia litteroimaan näkyvän tekstin.
Kun asetus on pois käytöstä — tai käyttäjätekstiä ei ole — peruskehotetta
käytetään muuttamattomana.

Describe-itsekutsun oma OpenAI-yhteensopiva pyyntö (`callVisionModelSingle()`
tiedostossa `visionBridgeHelpers.ts`) pyytää aina `image_url.detail: "high"` —
ehdoitta jokaiselle kutsujalle ja palveluntarjoajalle, eikä sitä rajoiteta
asiakkaan lähettämän signaalin perusteella. Alhaisen tarkkuustason näytteenotto
heikentää OCR-tarkkuutta juuri tämän kehotteen pyytämässä tekstin
transkriptiotehtävässä, joten describe-kutsu pyytää aina korkeaa tarkkuustasoa
riippumatta alkuperäisen saapuvan pyynnön käyttämästä tarkkuustasosta. Tämä
vaikuttaa vain sisäisen describe-pyynnön runkoon; se ei muuta sitä, miten
OmniRoute välittää kutsujan oman `image_url.detail`-arvon ensisijaisessa
pyynnössä — tämä oletusarvo asetetaan erikseen ja vain havaituille OpenCode-asiakkaille
funktiossa `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`).
Describe-itsekutsun Anthropic-siirtomuotoa käyttävässä haarassa ei ole
`detail`-kenttää, eivätkä kumpikaan oletusarvo vaikuta siihen.

#### Describe-tulosteen rajoitus (`modalityBridgeVisionMaxChars`)

| Avain                          | Oletusarvo | Alue              |
| ------------------------------ | ---------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`        | `0` tai 100–50000 |

`0` (oletusarvo) tarkoittaa, että **rajoitusta ei ole** — funktion
`callVisionModel()` palauttama kuvaus välitetään muuttamattomana, mikä säilyttää
nykyisen toiminnan. Mikä tahansa arvo alueella 100–50000 katkaisee kuvauksen ja
lisää sen loppuun `…`-merkin ennen kuin kuvaus liitetään takaisin muodossa
`[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` tiedostossa
`src/lib/guardrails/visionBridge.ts`). Suurenna arvoa yksityiskohtaisissa
OCR-tehtävissä, joissa myöhempi malli tarvitsee koko transkription; pienennä
sitä rajoittaaksesi tokenien käyttöä monisanaisissa konenäkömalleissa.
Hallintapaneelin kenttä sijaitsee Vision-välilehden Advanced-paneelissa
(`modality-bridge-max-chars` tiedostossa `ModalityBridgeVisionTab.tsx`) ja
nostaa kaikki arvot väliltä 1–99 alarajaan 100 jättäen nimenomaisen arvon `0`
koskematta — `0` on itsessään kelvollinen Zod-arvo
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), eikä
ainoastaan ”asettamaton”-oletusarvo.

#### Describe-välimuisti (`modalityBridge/bridgeCache.ts`)

Muistissa sijaitseva LRU- ja TTL-välimuisti describe-tulosteille, jaettu koko
prosessin laajuisesti. Avain = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
pituusetuliitteisellä kehystyksellä (ei kenttien rajojen törmäyksiä). Malliosa
on **määritetty** siltamalli, ei pyyntöön tosiasiassa vastannut malli —
`callVisionModel` voi käyttää sisäisesti varamallia, ja avaimen muodostaminen
yrityskohtaisesti pirstaloisi välimuistin. Epäonnistuneita describe-kutsuja ei
koskaan tallenneta välimuistiin. Asetukset:

| Avain                           | Oletusarvo | Alue    |
| ------------------------------- | ---------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`     | —       |
| `modalityBridgeCacheTtlMinutes` | `60`       | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`      | 10–5000 |

#### Etäkuvien normalisointi (itsekutsun describe/base64-haku)

Kun silta hakee **etäkuvan** itse — Anthropic-describe-itsekutsua ja
claude-wire-format-muodon base64-muunnosta (`ensureBase64ImagesForClaudeWire`)
varten, molemmat tiedoston `visionBridgeHelpers.ts` funktion
`fetchRemoteImageAsDataUri()` kautta — tuloksena syntyvä data-URI käsitellään
funktiolla `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) ennen sen
upottamista konenäkömallin pyyntöön. Ylisuuret kuvat pienennetään niin, että
niiden **pitkä sivu on 2048px** (vastaten OpenAI:n/Anthropicin jo
palvelinpuolella käyttämää koon ylärajaa), mikä vähentää lähetettävien tavujen
määrää ja viivettä muuttamatta sitä, mitä konenäkömalli näkee. Koon muuttamiseen
käytetään `sharp`-pakettia, joka ladataan dynaamisella tuonnilla: alustalla,
jolla sen natiivibinaarin lataaminen epäonnistuu, `normalizeDataUri()` **ei
koskaan aiheuta poikkeusta** — se välittää alkuperäiset tavut muuttamattomina,
joten describe/base64-muunnospolku toimii aina. Myös muu kuin kuvadata
(haku, joka ei palauttanut dekoodattavissa olevaa kuvaa) välitetään
muuttamattomana. Tämä normalisointi rajataan kuviin, jotka silta hakee omaa
itsekutsuaan varten — sitä ei koskaan sovelleta kutsujan sellaisenaan
välitettävään raakahyötykuormaan, mikä noudattaa vain erikseen käyttöön
otettavien muutosten periaatetta (kova sääntö #20).

#### Asetusskeema + migraatio

Uudet `modalityBridge*`-avaimet Zod-validoidaan skeemassa
`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCache*`-kolmikko sekä Audio Bridgen käyttämä
`modalityBridgeAudio*`-ryhmä. Migraatio `141_modality_bridge_settings.sql`
kopioi olemassa olevat vanhat `visionBridge*`-arvot vastaaviin uusiin avaimiin
(idempotentisti eikä koskaan korvaa ylläpitäjän asettamaa `modalityBridge*`-arvoa);
vanhat avaimet hyväksytään lukemisen varavaihtoehtona yhden julkaisusyklin ajan.

#### Läpinäkyvyysotsake + tilastot

Describe-muunnetut vastaukset sisältävät otsakkeen
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(jonka muodostaa `buildModalityBridgeHeader()` tiedostossa
`modalityBridge/bridgeStats.ts` ja jonka lisää `withModalityBridgeHeader()`
tiedostossa `src/sse/handlers/chatHelpers.ts`). Uudelleenreititetyt pyynnöt
**eivät** saa otsaketta — hyötykuormaan ei koskettu, ja mallin vaihto näkyy jo
vastauksen rungon `model`-kentässä.

`GET /api/modality-bridge/stats` (hallinnan todennus, sama taso kuin
`GET /api/settings`) palauttaa muistissa olevat modaliteettikohtaiset laskurit
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` modaliteeteille `vision`,
`audio` ja `video`. `averageLatencyMs` käyttää nimittäjänä arvoa
`latencySamples`, ei kaikkia yrityksiä; operaatio, josta ei ole ajoitustietoa,
ei luo keinotekoista nollan millisekunnin näytettä. `bridged` säilyy
taaksepäin yhteensopivana aliaksena onnistuneille muunnoksille;
epäonnistuneet yritykset eivät kasvata sitä.
Laskurit nollautuvat tarkoituksellisesti prosessin uudelleenkäynnistyksen
yhteydessä (telemetriaa, ei kirjanpitoa).

#### Hallintapaneelin määritys

Erillinen hallintapaneelisivu on
`/dashboard/settings/modality-bridge`. Sen URL-osoitteella avattavat `Vision`-, `Audio`-
ja `Video`-välilehdet säilyttävät kyselyparametrit `tab`-arvoa vaihdettaessa.
Vision-välilehdellä voidaan hallita käyttöönottoa, tilaa, mallin valintaa (mukaan
lukien automaattinen oletus), tehtävätietoista kehotusta, aikakatkaisun, kuvien,
kuvausten pituuden ja välimuistin lisärajoituksia, suorituksenaikaisia
laskureita sekä suojattua esimerkkipyyntöä. Myös Audio-välilehti on toiminnassa:
siinä voidaan hallita käyttöönottoa, vain STT-malleja sisältävää mallivalitsinta
Auto-vaihtoehdolla, aikakatkaisun ja leikkeen enimmäispituuden rajoja,
äänilaskureita sekä `input_audio`-esimerkkitestiä. Video-välilehti on toiminnallinen:
se näyttää FFmpeg/ffprobe-ajoympäristön tilan, joka on yksi neljästä eksplisiittisestä
käyttöliittymätilasta (`unknown`, kun tarkistus on käynnissä tai sitä ei voitu
suorittaa loppuun, `restricted`, kun hallintapaneelin isäntä ei ole loopback-osoite
ja tarkistus ohitetaan asiakaspuolella, `unavailable`, kun tarkistus on tehty ja
puuttuminen vahvistettu, tai `available`, jolloin näytetään FFmpeg/ffprobe-versiot),
tallentaa käyttöönotto-, malli-, ruutu-, video- ja aikakatkaisurajat, suodattaa
mallivalitsimeen vain konenäköä tukevat mallit ja näyttää videolaskurit.

AI-asetusten aiempi Vision Bridge -kortti on yhteensopivuuslinkki uudelle
sivulle; se ei enää ylläpidä lomakkeesta toista kopiota. Media Providers
linkittää myös Image-to-Text- ja Speech-to-Text-työnkulut vastaaville Modality
Bridge -välilehdille poistamatta nykyistä Speech-to-Text-kokeiluympäristöä.

**Omaan silmukkaan pääsyn ohitus:** kun kuvauspyyntö reititetään OmniRouten
oman `/v1`-silmukan kautta (epästandardi palveluntarjoajan malli), alipyyntö lähettää
`x-omniroute-admission-bypass: internal`-otsakkeen ja se todennetaan ratkaistulla
oman silmukan tunnistetiedolla — paikallisessa tilassa paikallisella
`sk_omniroute`-sentineliarvolla tai operaattorin määrittämällä
`OMNIROUTE_API_KEY`- / `ROUTER_API_KEY`-ympäristöavaimella (#1350), jotta
`REQUIRE_API_KEY=true`-käyttöönotot voivat edelleen suorittaa kuvauspyynnön.
Ohitus hyväksytään vain täsmälleen näillä tunnistetiedoilla, joten ulkoiset
asiakkaat eivät voi käyttää otsaketta pääsynvalvonnan ohittamiseen.

Vanhat oletusarvot sijaitsevat tiedostossa
`src/shared/constants/visionBridgeDefaults.ts`; uudet tilan, tehtävätietoisuuden
ja välimuistin oletusarvot sekä asetusten ratkaisija sijaitsevat tiedostossa
`src/shared/constants/modalityBridgeDefaults.ts`. Suojakaide tarjoaa
`deps`-konstruktorivalinnan, jotta testit voivat injektoida vale-
`getSettings`- ja `callVisionModel`-toteutuksia.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Sieppaa ääntä sisältävät keskustelupyynnöt ennen kuin ne saavuttavat kohteen,
jonka ei tiedetä hyväksyvän äänisyötettä. Se ei koskaan uudelleenreititä
keskustelupyyntöä: ääniosat litteroidaan nykyisen OpenAI-yhteensopivan
multipart-päätepisteen kautta, ja valittu keskustelumalli jatkaa
tekstilitteraateilla.

Kulku:

1. Ratkaise `supportsAudio` funktion `getResolvedModelCapabilities()` avulla.
   Eksplisiittiset palveluntarjoajarekisterin metatiedot ovat ensisijaisia,
   sitten staattiset mallin metatiedot ja lopuksi synkronoitu
   `modalities_input`. Määritetty syöteluettelo ilman `audio`-arvoa tuottaa
   arvon `false`; jos kyvykkyydestä ei ole näyttöä, arvoksi jää `null`. Sekä
   `false` että `null` aktivoivat varovaisen sillan, kun taas `true` ohittaa sen.
2. Ratkaise `modalityBridgeAudio*`-asetukset ja poimi jokaisen viestin
   liitettävissä olevat ylätason ääniosat jaetulla `detectMediaParts()`-
   tunnistimella. Tuettuja siirtomuotoja ovat OpenAI:n `input_audio`,
   `audio_url` ja `source.media_type: "audio/*"`. Sisäkkäinen ääni tunnistetaan
   reititystä varten, mutta liitospolku ei poista sitä. Työn määrä rajoitetaan
   asetuksella `modalityBridgeAudioMaxClips`; myöhemmät osat jätetään ennalleen.
3. Käytä määritettyä `provider/model`-arvoa tai anna funktion
   `selectAudioBridgeModel()` käydä `AUDIO_TRANSCRIPTION_PROVIDERS` läpi
   vakaassa luettelojärjestyksessä ja valita ensimmäinen malli, jolla on
   käyttökelpoinen aktiivinen palveluntarjoajan tunnistetieto.
4. `callAudioTranscription()` muuntaa base64-/data-URI-äänen multipart-
   `file`-tiedostoksi tai lataa etäresurssin `audio_url` julkisiin osoitteisiin
   rajatun lähtevän liikenteen suojauksen kautta käyttäen DNS-kiinnitystä ja
   25 MB:n rajaa. Sen jälkeen se lähettää tiedoston ja valitun mallin
   POST-pyynnöllä paikalliseen `/v1/audio/transcriptions`-silmukkaan, jonka
   todennuksessa käytetään funktiota `resolveSelfLoopBearer()`. Nykyinen
   litterointireitti suorittaa normaalin tunnistetietojen haun, jäähdytys- ja
   nopeusrajoitusten käsittelyn sekä palveluntarjoajalle välityksen.
5. Onnistuneet kutsut korvaavat osansa tekstillä
   `[Audio N]: <transcript>`. Kutsut suoritetaan käyttäen
   `Promise.allSettled`-menetelmää: yksittäinen epäonnistuminen säilyttää
   alkuperäisen ääniosan (#4012-sopimus). Jos kaikki kutsut epäonnistuvat ja
   kohteen on osoitettu olevan `supportsAudio === false`, osista tulee
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-sopimus).
   Tuntemattoman kohteen (`null`) tapauksessa kaikkien kutsujen epäonnistuminen
   jättää pyynnön ennalleen. Varmistetusti vain tekstiä tukeva kohde, jolle ei
   ole käyttökelpoista STT-tunnistetietoa, saa saman eksplisiittisen
   paikkamerkin ilman verkkokutsua.

Onnistuneet litteraatit käyttävät prosessinlaajuista Modality Bridge
LRU/TTL -välimuistia. Avain yhdistää ääniviitteen, vakaan
`audio-transcription`-toimintotunnisteen ja valitun STT-mallin; epäonnistumisia
ei koskaan tallenneta välimuistiin. Äänikäsittely-yritykset päivittävät jaetut
`bridged`-, `cacheHits`-, `failures`- ja `lastUsedAt`-laskurit. Muunnetut
vastaukset sisältävät
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`-otsakkeen;
muuttamattomat pyynnöt eivät saa Audio Bridge -segmenttiä.

Suorituksenaikaiset asetukset tallennetaan tietokantaan ja validoidaan Zodilla:

| Avain                         | Oletus  | Alue            |
| ----------------------------- | ------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —               |
| `modalityBridgeAudioModel`    | `""`    | Auto tai STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10            |

Jaettua välimuistia hallitaan edelleen asetuksilla
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ja
`modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Sieppaa ylimmän tason video-osat Chat Completions -rajapinnan `messages`-kentästä ja Responses
API:n `input`-kentästä ennen sellaisen kohteen kutsumista, jolla ei tiedetä olevan natiivia videotukea.
Tuettuja muotoja ovat `input_video`, `video_url`, `video_source`, HTTPS-URL-osoitteet
ja `data:video/*;base64,...`-data-URI:t. Tekstissä olevia tavallisia tiedostonimiä ei käsitellä
videoina.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) vastaa pyynnön läpikäynnistä,
ominaisuus- ja käytäntötarkistuksesta, pyyntökohtaisesta koostamisesta sekä vastaussisällöstä.
Videokohtainen käsittely — hankinta, koko tuloksen välimuisti, kehysjakson
kuvaileminen (johon yhdistetään mahdollinen kutsujan ilmoittama äänitranskriptio) sekä yrityskohtaiset
mittarit, keskeytys ja siivous — on piilotettu `processVideoPart`-toiminnon taakse
tiedostossa `videoBridgePipeline.ts`. Sitä kutsutaan kerran kutakin video-osaa kohden `preCall`-silmukassa.
Kyseinen moduuli määrittelee myös eksplisiittiset porttirajat `VideoMediaBrokerPort`
(tavujen hankinta ja otostettujen kehysten poiminta), `VideoAudioTranscriptionPort`
(kutsujan ilmoittaman äänitranskription yhdistäminen otostettujen kehysten kuvateksteihin) ja
`VideoDrilldownPort` (kehysten porautumistietojen pysyvyysraja; sitä ei ole vielä kytketty
`processVideoPart`-toimintoon — tällä hetkellä vain erillinen `/api/modality-bridge/video/drilldown`-reitti
kirjoittaa porautumistietueita).

Julkinen `/v1`-pyyntöpolku ei koskaan tuo tai käynnistä aliprosessia. Etävideot
ladataan 50 MiB:n rajan puitteissa; upotettujen base64-videoiden konservatiivinen puretun
datan videokohtainen enimmäiskoko on 36 MiB, jotta malli-, viesti- ja kehystyskuori
pysyy julkisen JSON-pyynnön 50 MiB:n hyväksymisrajan sisällä. Upotetun datan
pituus ja arvioitu purettu koko tarkistetaan ennen muistin varaamista. HTTPS:ää
edellytetään sekä alkuperäiseltä etä-URL-osoitteelta että jokaiselta uudelleenohjaukselta käyttäen nykyistä
vain julkiset kohteet sallivaa lähtevän liikenteen suojausta ja DNS-kiinnitystä. Tämän jälkeen tavut ylittävät täsmällisen sisäisen
`POST /api/modality-bridge/video/extract`-välittäjärajan. Kyseinen reitti on sekä
`LOCAL_ONLY` että `SPAWN_CAPABLE`, hyväksyy ainoastaan prosessikohtaisesti todennetun
ja luotetusta loopback-osoitteesta tulevan pyynnön eikä koskaan hyväksy URL-osoitetta, tiedostojärjestelmäpolkua, suoritettavaa tiedostoa
tai argumenttiluetteloa. API:n rungon kokoputki ja käsittelijän inkrementaalinen rungonlukija
valvovat kumpikin itsenäisesti välittäjän syötteen 50 MiB:n enimmäiskokoa. Sen rajattu jono käsittelee
yhden poiminnan kerrallaan, sallii neljä odottavaa työtä ja rajoittaa odottavan syötteen
100 MiB:uun.

Välittäjän sisällä `ffprobe` lukee yksityistä paikallista tiedostoa; kiinteä
muotojen sallittujen lista sulkee pois soittolista- ja manifestimuodot. Sallituissa MOV-perheen
säilöissä ulkoiset MOV-dataviittaukset pysyvät oletusarvoisesti poissa käytöstä, eikä
kiinteä komento ota niitä käyttöön. Sekä `ffprobe` että `ffmpeg` käyttävät
vain `file`-protokollan sallivaa listaa, yhtä säiettä, kiinteitä argumenttitaulukoita, eivät komentotulkkia,
ja `PATH`-muuttujasta ratkaistavia suoritettavia tiedostoja. Liitetyn kuvan kansikuvavirrat eivät ole
toistokelpoisia ehdokkaita. Kaikkien toistokelpoisten virtojen on täytettävä rajat, ja
eksplisiittistä oletusvirtaa suositaan ennen determinististä pienimmän indeksin
varavaihtoehtoa. Videoiden enimmäiskesto on 600 sekuntia, enimmäiskoko 8 192 pikseliä ulottuvuutta kohden ja
lähteen enimmäispikselimäärä 33 554 432. FFmpeg ottaa 1–16 JPEG-kehysotosta aikavälien keskipisteistä, pienentää
pitkän sivun enintään 1 024 pikseliin suurentamatta pienempiä syötteitä eikä
koskaan vastaanota URL-osoitetta. Otostus on oletusarvoisesti `uniform`. Valinnaiset
`scene_aware`- ja kokeelliset `segment_aware`-käytännöt suorittavat yhden ylimääräisen
kiinteän FFmpeg-ajon jo validoidulle paikalliselle virralle, valitsevat rajatun määrän
`showinfo`-kohtausaikaleimoja ja palaavat deterministisesti samoihin
tasavälisiin keskipisteisiin, jos tunnistus epäonnistuu tai aikakatkaistaan, tuloste on virheellinen tai
ehdokasjoukko on tyhjä. Segmenttitietoinen tila jakaa keskipisteotokset suhteessa
validoituihin kohtausväleihin; segmenttitietoinen todistusaineisto ja varatoiminta
kuvataan yksityiskohtaisesti jäljempänä. Kiinteää 16 kehyksen enimmäisrajaa
sovelletaan valinnan jälkeen kaikissa käytännöissä. Kun kohtaustietoisen pyynnön
kehysbudjetti on vain yksi kehys, se käyttää aktiivisen koko videon tai kohdistusikkunan
tasavälistä keskipistettä ja ilmoittaa `policyEffective: uniform`: yksi valittu kohtauskehys
ei voi säilyttää ajallisen jakson molempia päitä. Kutsuja voi valinnaisesti antaa
äärellisen kohdistusikkunan (`start`/`end` sekunteina); rajat sovitetaan median
kestoon, käänteiset tai ei-äärelliset ikkunat hylätään ja kaikki otostuskäytännöt
suoritetaan vain normalisoidun aikavälin sisällä. Tuloksena saatava
ikkuna sisällytetään otostuksen metatietoihin ja epäluotetun kuvauksen
etuliitteeseen, jotta myöhemmät mallit voivat erottaa kohdistetun katkelman koko
aikajanalta.

Semanttinen kuvatekstien kohdistus on erillinen, eksplisiittinen asetus. Oletusarvoinen `full`-
analyysitila säilyttää nykyisen kehotteen eikä koskaan välitä pyynnön
tekstiä kuvatekstimallille. `focused`-tilassa silta lukee vain viimeisimmän ei-tyhjän käyttäjän kirjoittaman
`text`/`input_text`-sisällön samasta Chat- tai Responses-säilöstä,
normalisoi sen NFC-muotoon, yhdistää ohjausmerkit ja välilyönnit
ja rajoittaa sen 500 Unicode-koodipisteeseen. Tyhjä tulos palautuu
täsmälleen `full`-kehotteeseen. Käyttökelpoinen vihje serialisoidaan JSON-muodossa erilliseen
epäluotetun käyttäjäkontekstin lohkoon, ja se saa ainoastaan priorisoida havaittavia yksityiskohtia; se
ei voi ohittaa erillistä varoitusta olla noudattamatta mediassa näkyviä
tai kuuluvia ohjeita. Tekstuaalinen kohdistus ei koskaan päättele `start`/`end`-arvoja eikä muuta
ajallista otostinta.

#### FU-07:n rakenteellinen segmenttitodistusaineisto

`segment_aware` käyttää yhtä rajattua esianalyysiajoa jo validoidulle
paikalliselle videovirralle. Kiinteä suodatinketju pienentää ensin leveyden enintään 320 pikseliin,
tunnistaa kohtausvaihdokset ja pysähtyneet aikavälit sekä ottaa sitten yhden kehyksen näytteen sekunnissa
epäterävyyden, keskimääräisen luminanssin sekä spatiaalisen ja temporaalisen informaation arvioimiseksi. Ajo on
rajattu 600 rakenteelliseen näytteeseen, yhteen FFmpeg-/suodatinsäikeeseen, samaan
vain `file`-protokollan sallivaan listaan ja säilöjen sallittuihin listoihin, 1 MiB:n prosessitulosterajaan
sekä enintään 30 sekuntiin välittäjän yhteisen keskeytys-/määräajan sisällä. Se ei koskaan
hyväksy pyynnöstä komentoa, suodatinta, polkua tai URL-osoitetta.

Rakenteelliset arvot ovat deterministisen näytteenoton evidenssiä, eivät videon
semanttista ymmärtämistä. Niiden perusteella ei päätellä kohteita, toimintoja,
kuvatekstejä, puhetta tai käyttäjän tarkoitusta. Kohtaus- ja pysäytysrajat
muodostavat segmenttejä; pysäytyksen kattavuus, sumennus, valotus, tilallinen
yksityiskohtaisuus ja ajallinen muutos vaikuttavat vain siihen, miten olemassa
oleva 1–16 kuvan budjetti jaetaan. Täysin pysähtyneen segmentin enimmäismäärä
on yksi kuva, kun taas muut kuin pysähtyneet segmentit kilpailevat jäljellä
olevasta budjetista. Kun rajoja on enemmän kuin kuvia, aikajanan tasainen
kattavuus säilytetään, jotta nopeat varhaiset leikkaukset eivät voi peittää
pitkää loppusegmenttiä. Kohtausrajat, jotka ovat enintään 1 sekunnin
analyysitarkkuuden päässä pysäytysrajasta, yhdistetään.

Puuttuvat suodattimet, virheellinen tai tyhjä evidenssi, tunnistimen virhe tai
rajatun esianalyysin aikakatkaisu johtavat täsmälleen yhdenmukaiseen
keskipistekäytäntöön. Kutsujan keskeytys tai välittäjän määräaika ei johda tähän
varakäytäntöön: se päättää käynnissä olevan aliprosessin, estää myöhemmän kuvien
poiminnan, ja yksityinen väliaikainen hakemistopuu poistetaan `finally`-lohkossa.

`scripts/perf/video-bridge-fu07-eval.ts` luo deterministisiä, todellisia FFmpeg-
testiaineistoja duplikaattien poiston jälkeisiä kuvatekstikutsujen säästöjä,
tiheän liikkeen budjetin jakoa, sumennuksen, valotuksen ja SI-TI:n evidenssiä,
nopeita leikkauksia pitkällä loppuosuudella sekä asteittaisen häivytyksen vääriä
positiivisia tuloksia varten. Se tallentaa esianalyysin kuluneen seinäkelloajan
sekä, jos `/usr/bin/time` on käytettävissä, lapsiprosessin suoritinajan ja
RSS-muistin huippuarvon. Sen laatutarkistukset ovat vain rakenteellisia
oraakkeleita. Todellisen kuvatekstimallin laatu pysyy tilassa `HOLD`, koska
tällä testikehyksellä ei ole valtuutettua päätepistettä tai jäädytettyä
arvioijaa. Myös rahalliset säästöt pysyvät tilassa `HOLD`, ellei
`--caption-cost-per-call-usd` anna nimenomaista positiivista arviota kutsun
hinnasta; komentosarja ei koskaan keksi kumpaakaan tulosta.

Kunkin kuvan koko on rajoitettu 4 MiB:iin, kaikkien raakakuvien yhteiskoko
23 MiB:iin ja sarjallistettu välittäjän vastaus 32 MiB:iin. Yksityinen
väliaikainen hakemisto poistetaan `finally`-lohkossa. OmniRoute ei sisällä
FFmpeg:iä eikä hyväksy mukautettua suoritettavan tiedoston polkua. Ennen
kuvatekstien luomista silta suorittaa konservatiivisen visuaalisen
duplikaattien poistovaiheen: kukin JPEG pienennetään 16×16-kokoiseksi
harmaasävypuskuriksi, ja sitä verrataan vain viimeiseen säilytettyyn kuvaan. Kun
pyydetty kuvatekstibudjetti on suurempi kuin yksi kuva, poiminta tuottaa
rajatun ehdokasjoukon, jonka koko on enintään kaksinkertainen budjettiin nähden
ja aina enintään 16 kuvaa. Pyydettyä ylärajaa sovelletaan vasta duplikaattien
poistamisen jälkeen, ja ensimmäinen sekä viimeinen valittu ehdokas säilytetään
lopullisessa harvennuksessa, kun budjetti on vähintään kaksi. Versioitu
`grayscale-16x16-mean-cells-v2`-käytäntö käyttää suurempaa keskimääräisestä
luminanssierosta ja niiden pikkukuvan solujen osuudesta, joiden normalisoitu ero
on vähintään 0.05. Duplikaattikynnys on vakio 0.04, joka on valittu
ennustettavuuden vuoksi sen sijaan, että se tarjottaisiin ajonaikaisena
asetuksena. Tämä toissijainen suuren kontrastin signaali säilyttää pienet
liikkeet ja näkyvän tekstin muutokset, jotka pelkkään keskiarvoon perustuva
vertailu voi piilottaa. Vertailijan tai dekooderin virheissä toiminta jatkuu
kattavuuden säilyttäen. Tulosteen metadata erottaa toisistaan poimitut
ehdokkaat, onnistuneesti käytetyt kuvat ja hylätyt visuaaliset duplikaatit.

Nimenomaisesti videoksi merkitty osa voi pyytää aikaleimallista
kontaktivedosta. Silta muodostaa enintään 4 sarakkeen ja 16 kuvan JPEG-ruudukon.
Jokainen 512 pikselin solu polttaa lähteen aikaleiman suuren kontrastin
alapalkkiin, ja samat aikaleimat säilyvät tekstimuotoisessa metadatassa
myöhempää yhdistämistä ja auditointia varten. Koko JPEG-tiedoston koko on
edelleen rajoitettu 32 MiB:iin. Jos `sharp` ei pysty dekoodaamaan tai koostamaan
ruudukkoa, silta palaa käyttämään yksittäisiä JPEG-kuvia; asiakaspuolen
keskeytys välittyy silti vedostoiminnon läpi.

Tuotantoon siirtämisen evidenssi pidetään tarkoituksella erillään synteettisestä
koostamisen mikrovertailusta. `scripts/perf/video-bridge-contact-sheet-eval.ts`
määrittelee skeemaversioidun A/B-testikehyksen todellisille OpenAI-yhteensopiville
konenäkömalleille. Se mittaa palveluntarjoajan ilmoittamat tokenit, päästä päähän
-kuluneen seinäkelloajan (mukaan lukien vedoksen koostaminen), mallikutsujen
määrän ja manifestissa määritettyjen faktojen säilymisen. Mallien raakavastauksia
ei kirjoiteta raporttiin; vain SHA-256-tiivisteet ja täsmänneiden faktojen
tunnukset säilytetään. Testikehys ei tee verkko- tai maksullisia mallikutsuja,
ellei `--execute-real`-valitsinta ole annettu ja ellei `--model`,
`OMNIROUTE_BASE_URL` ja `OMNIROUTE_API_KEY` ole määritetty. Ilman tätä
nimenomaista todellista suoritusta sen koneluettava päätös pysyy tilassa
`HOLD`; pelkät synteettisten hyötykuormien tai kutsumäärien mittaukset eivät ole
evidenssiä tuotantoon siirtämistä varten.

Kutsujat voivat liittää valinnaisen `transcript.cues`-taulukon tuettuun
video-osaan, kun niillä on jo kohdistettu teksti. Jokaisessa vihjeessä on oltava
`text`, äärellinen `start`/`end`-väli tutkitun keston sisällä sekä sallittujen
arvojen luetteloon kuuluva `source` (`client`, `embedded` tai `audio-bridge`);
`confidence`-arvon oletus on `1`, ja sen on pysyttävä välillä `0`–`1`.
Täsmälleen samat vihjeet yhdistetään. OmniRoute ei koskaan käynnistä
transkriptiota tämän metadatan perusteella: validoidut vihjeet kopioidaan
kuvattuun tulokseen lähteineen, luottamusarvoineen ja aikaväleineen, ja ne
esitetään epäluotettuina havaintoina kuvatekstien rinnalla. Virheellinen,
sallitun alueen ulkopuolinen tai alkuperätiedoton teksti hylätään sen sijaan,
että se sekoitettaisiin kuvatekstivirtaan. Kutsuja ilmoittaa tällä hetkellä itse
`source`-kentän arvon, eikä palvelin vahvista sitä: OmniRoute varmistaa, että
arvo on yksi kolmesta sallitusta merkkijonosta, mutta ei vielä varmista
kryptografisesti, että `embedded`- tai `audio-bridge`-tunniste on todella
peräisin palvelimen omistamasta poiminnasta. Käsittele `source`-arvoa
epäluotettuna vihjeenä, kunnes tämä varmennus toteutetaan; älä perusta siihen
valtuutuspäätöksiä.

Edistynyt kutsuja voi antaa samalle videolle valmiiksi valtuutetun
`audioTranscript`-raidan. Yhdistämisrajapinta suorittaa visuaaliset ja äänihavainnot
saman määräajan ja keskeytyssignaalin alaisina, järjestää ne yhteiselle aikajanalle,
yhdistää täysin identtiset havainnot ja ilmoittaa osittaisen tuloksen, kun vain toinen
haara onnistuu. Virheellinen `audioTranscript` heikentää tuloksen osittaiseksi —
visuaalinen kuvaus säilytetään ja äänihaara tallentaa puhdistetun virhekoodin —
sen sijaan, että koko videon käsittely epäonnistuisi. Haarakohtainen saatavuus,
osittaisuuden ilmaisin ja puhdistetut virhekoodit säilytetään kuvatussa tuloksessa,
suojausmetadatassa (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), tulosvälimuistin metadatassa ja sillan
yhdistämislaskureissa. Video Bridgen oletuspolku ei käynnistä puheen muuttamista
tekstiksi eikä lataa toista kopiota mediasta; ilman kyseistä nimenomaisesti annettua
raitaa se käsittelee edelleen vain videota.

**Transkriptin säilytys (#12150 P1).** Tätä sovelletaan automaattisesti aina, kun
Video Bridge (joka itsessään on valinnainen) hahmontaa transkriptivihjeen — erillistä
säilytysvalitsinta ei ole. Kun pyyntö hahmontaa minkä tahansa transkriptivihjeen
(kutsujan määrittämän `transcript`-raidan tai yhdistetyn `audioTranscript`-raidan),
suojaus merkitsee sen arvolla `videoBridgeObserved` ja tuottaa videokuvauksesta
peitetyn varjokopion — muuten identtisen hahmonnoksen, jossa jokaisen vihjeen vapaa
tekstisisältö korvataan arvolla `[redacted-video-transcript]`. Tämä tehdään korvaamalla
rakenteinen vihjekenttä ennen merkkijonon koostamista (ei koskaan jäsentämällä
litistettyä tekstiä, joten mikään vihjeen sisältö — vihamielinen tai tavallinen,
mukaan lukien merkin `]` sisältävät tekstit, kuten `[inaudible]`/`[music]` — ei voi
säilyä). Pysyvään kutsulokiin tallennettavassa pyynnön rungossa jokainen videosta
johdettu tekstiosa vaihdetaan tähän peitettyyn varjokopioon sisällön yhtäläisyyden
perusteella; `fullText`-ankkuri luetaan uudelleen valmiista kutsua edeltävästä
suojaushyötykuormasta, joten vastaavuus löytyy edelleen sen jälkeen, kun ketjun
myöhemmät suojaukset (henkilötietojen ja tunnistetietojen peittäjät, prioriteetit
10/95) ovat muokanneet kuvaustekstiä paikallaan, sekä sen jälkeen, kun
järjestelmäkehotteen, siirron tai muistin lisääminen on muovannut viestitaulukon
uudelleen. Mallille lähetettävä runko ei muutu. Havaittu pyyntö ei myöskään täytä
pysyvää Memory-muistia (sekä pyynnöstä että vastauksesta johdettu poiminta ohitetaan),
joten mallin oma vastaus ei voi kaiuttaa transkriptin tekstiä Memory-muistiin.

Edelleen avoimet säilytyspinnat, joita seurataan jatkotoimena (**P2**, #12430):
yksityiskohtaisen lokin artefaktissa oleva raaka, suojausta edeltävä asiakaspyynnön
tilannevedos; `previous_response_id`-jatkon turvallisesti sulkeutuva epäonnistuminen;
johdetun kehotteen sisäiset välitykset, jotka upottavat transkriptin synteettiseen
merkkijonokehotteeseen (putken vaiheet, kontekstin siirto); sekä transkriptiä lainaavan
mallivastauksen vastausrunko / semanttisen välimuistin kopio. Nämä ovat raaka- tai
vastausluokan taikka valinnaisia pintoja, jotka eivät kuulu P1:n pysyvän
pyyntörungon ja Memory-muistin kattavuuteen.

Sisäinen `/api/modality-bridge/video/drilldown`-elinkaari on erillinen,
takaisinkytkennällä ja tunnisteella todennettu välimuistialusta. Jokainen toiminto
edellyttää lisäksi kanonista, läpinäkymätöntä toimijatunnusta. Ennen tuotantokutsujan
käyttöönottoa sen on johdettava kyseinen tunnus todennetusta vuokraajasta, eikä se saa
koskaan välittää asiakkaan valitsemaa arvoa. Välimuistiavaimet sitovat tämän toimijan
kanonisiin istunto- ja videoviitetunnuksiin, tallentavat niistä vain SHA-256-johdetut
avaimet ja rajaavat sekä lukemisen että poistamisen samaan toimijaan. Välimuisti
tallentaa enintään 16 johdettua JPEG-kuvaruutua merkintää kohden, vanhentaa ne
kymmenen minuutin kuluttua ja tukee rajattuja `start`/`end`-lukuja tai istunnon
nimenomaista poistamista.

Kukin toimija on rajoitettu 16 merkintään ja 64 MiB:uun kanonista JPEG-dataa. Nämä
rajat ovat riippumattomia yleisestä 64 merkinnän / 256 MiB:n enimmäisrajasta:
toimijakiintiön paine poistaa ensin vain kyseisen toimijan vähiten viimeksi käytetyt
merkinnät, ennen kuin yleistä LRU-poistoa harkitaan. Vanhentuneet merkinnät poistetaan
sekä toimijakohtaisesta että yleisestä kirjanpidosta välimuistitoiminnan yhteydessä,
kun taas peruutus ja validointivirhe eivät tallenna osittaista korvausta.

Välimuisti hylkää ei-kanonisen Base64-datan, ylimääräisen täytteen, muun kuin
JPEG-median, virheelliset tai katkenneet JPEG-tiedostot sekä JPEG-tiedostot, jotka
tuottavat varoituksen rajatun, koko kuvan kattavan `sharp`-dekoodauksen aikana.
Jokainen hyväksytty kuva koodataan uudelleen kanoniseksi JPEG-kuvaksi, ja leveys sekä
korkeus johdetaan dekoodatuista tavuista sen sijaan, että kutsujan kenttiin
luotettaisiin. Mahdolliset perässä olevat polyglottitavut hylätään säilyttämisen
sijasta. Molempiin kiintiöihin lasketaan vain rajattu, kanoninen pakattu puskuri.
JSON-siirtoraja sisältää Base64-lisäkuorman 32 MiB:n dekoodatun syötteen
enimmäisrajaa varten. Jokainen
tallennettu johdos kirjaa validoidun JPEG-muotonsa ja -resoluutionsa, näytteenottokäytännön,
johdosversion, luontiajan, palvelimen laskeman sisältötiivisteen sekä hajautetun
ylätason viitteen ja luotetun kutsujan ylätason sisältötiivisteen. Peruutus tarkistetaan
asynkronisten dekoodaus- ja hajautusvaiheiden välissä ennen atomista
välimuistitallennusta.

Tämä toteutuserä ei vielä yhdistä tuotantotuottajaa reittiin eikä tarjoa
moniresoluutioista varianttien valintaa. Läpinäkyvä Video Bridge -pyyntöpolku ei siksi
aiheuta lisätyötä, kun taas vuokraajaan sidotun toimijatunnuksen johtaminen ja koko
FU-08-moniresoluutioelinkaari ovat edelleen nimenomaisia jatkotöitä, eikä niitä
dokumentoida valmiiksi toiminnallisuudeksi.

Kuvatekstit luodaan kuville järjestyksessä määritetyllä Video-mallilla. Tyhjä
Video-ohitus perii Vision-asetuksen; jos molemmat ovat tyhjiä, Visionin
automaattinen reititin valitsee käytettävän näkökykyisen mallin. Onnistuneet kuvatekstit
korvaavat alkuperäisen osan vakaalla `[Video description:`-etuliitteellä, joka myös
merkitsee tekstin epäluotettavaksi mediasta johdetuksi havainnoksi ja ohjeistaa myöhempiä
malleja olemaan noudattamatta mediasta löytyviä ohjeita. Kuvatekstivälimuistin avaimet
sisältävät JPEG-tavut, kehotteen, aikaleiman ja käytetyn mallin; vain onnistuneet
kuvatekstit tallennetaan välimuistiin. Välimuistimerkinnät säilyttävät kuvatekstin tuottaneen
todellisen mallin, mukaan lukien varamallin; silta ilmoittaa arvon `mixed`, kun eri kuvat
on tuotettu eri malleilla. Välimuistiosuma käyttää uudelleen kyseistä tuottajaidentiteettiä
sen sijaan, että se nimettäisiin uudelleen pyydetyn reitityssuunnitelman mukaisesti. Koko videon
tulosvälimuistin avain perustuu jokaiseen tulosta muuttavaan syötteeseen — kehotteeseen, käytettyyn
malliin, näytteenottokäytäntöön, kuvamäärään, semanttisen analyysin tilaan, normalisoidun
kohdistusvihjeen SHA-256-sormenjälkeen, kohdistusikkunaan, `transcript`-arvoon,
`audioTranscript`-arvoon ja yhteystaulukkovalitsimeen — joten minkä tahansa näistä
ulottuvuuksista muuttaminen aiheuttaa välimuistiohituksen, eikä vanhentunutta tulosta koskaan
käytetä uudelleen. Visuaalisen kaksoiskappaleiden poistokäytännön versio, kynnysarvo ja rajattu
ehdokaskuvien määrä ovat myös eksplisiittisesti mukana tulosvälimuistin avaimessa ja metatiedoissa;
käytännön muutos ei siksi voi käyttää uudelleen vanhentunutta koko videon kuvausta.
Tulosvälimuistin v4-metatiedot säilyttävät tilan ja sormenjäljen, mutta eivät koskaan käyttäjän
raakaa tehtävää. Suojauksen metatiedot ilmoittavat sekä pyydetyn että käytetyn analyysitilan;
pyydetty `focused`-tila ilman käyttökelpoista käyttäjätekstiä ilmoitetaan käytännössä `full`-tilana.

Suojaus poimii kaikki tuetut video-osat, mutta kuvailee enintään
`modalityBridgeVideoMaxVideos` videota. Jos kohteen on osoitettu olevan sellainen, että
`supportsVideo === false`, epäonnistuneet ja enimmäismäärän ylittävät videot muutetaan eksplisiittisiksi
turvallisiksi tekstimerkinnöiksi, jotta raakaa videota ei säily. Kun ominaisuus ei ole tiedossa, nämä osat
jätetään ennalleen. Kohteet, joilla `supportsVideo === true`, ohittavat sillan.
Asiakaspyynnön keskeytyssignaali välittyy latauksen, välittäjäjonon,
aliprosessien ja kuvatekstikutsujen läpi; keskeytykset pysäyttävät käsittelyn videoiden välillä eivätkä koskaan
salli raakaa mediaa virhetilanteessa.

Ajonaikaiset asetukset tallennetaan tietokantaan ja validoidaan Zodilla:

| Avain                               | Oletusarvo  | Alue / toiminta                                                                                             |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Valinnainen ajonaikainen toiminto, otettava erikseen käyttöön                                               |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` säilyttää yleiset kuvatekstit; `focused` käyttää rajattua, epäluotettavaa uusinta käyttäjäkontekstia |
| `modalityBridgeVideoModel`          | `""`        | Perii Vision Bridgen mallin                                                                                 |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                        |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` tai suhteellinen `segment_aware`; tunnistimen virhe palautuu `uniform`-tilaan      |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                         |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                              |

Vanhat tallennetut, yli 120 sekunnin Video-aikakatkaisuarvot rajoitetaan
välittäjän määräaikaan; uudet asetuskirjoitukset, jotka ylittävät tämän rajan, hylätään.
`GET /api/modality-bridge/video/runtime` edellyttää luotettua, leimattua loopback-
paikallisuutta ennen todennusta tai ajonaikaisen ympäristön tutkimista ja edellyttää sen jälkeen ylläpitäjän
todennusta. Se palauttaa vain `available`-arvon, puhdistetut FFmpeg/ffprobe-versiot ja kiinteän
syyn, kun ajonaikainen ympäristö ei ole käytettävissä. Sisäinen poimintapäätepiste ei ole
julkinen lataus-API: jonon täyttyminen palauttaa `503` sekä `Retry-After`-otsakkeen, kutsujan
yhteyden katkeaminen palauttaa `499` ja välittäjän kiinteän määräajan ylittyminen palauttaa `504`. Muunnetut vastaukset lisäävät
`video->text;model=<visionModel>;parts=<videos>` keskitettyyn
`x-omniroute-modality-bridge`-otsakkeeseen poistamatta Vision- tai Audio-segmenttejä.

### Henkilötietojen peittäjä (`piiMasker.ts`)

Suoritetaan **molemmissa** vaiheissa.

- **`preCall`** kloonaa hyötykuorman, käy läpi kentät `system`, `messages`, `input` ja
  `prompt` (mukaan lukien tavalliset merkkijonoalkiot) ja käyttää `processPII()`-funktiota (moduulista
  `@/shared/utils/inputSanitizer`) merkkijonomuotoisiin `content`/`text`-kenttiin. Kun
  `PII_REDACTION_ENABLED=true`, havaitut henkilötiedot peitetään lähtevästä
  hyötykuormasta. Tämä ei riipu `INPUT_SANITIZER_MODE`-arvosta (joka hallitsee vain
  kehotteen injektointikäytäntöä). Kun peittäminen ei ole käytössä, kutsu tallentaa havaintojen
  määrät kirjoittamatta sisältöä uudelleen.
- **`postCall`** syväkloonaa vastauksen ja suorittaa `sanitizePIIResponse()`-funktion sekä
  Responses API -muodon peittäjän (`maskResponsesOutput` — kattaa kentät
  `output_text` ja `output[].content[].text`). Jos peittämistä tapahtuu,
  muokattu vastaus korvaa alkuperäisen.

Suojaus ei koskaan estä käsittelyä; se vain lisää huomautuksia (`meta.detections`,
`meta.redacted`) tai kirjoittaa sisällön uudelleen.

### Kehoteinjektio (`promptInjection.ts`)

Tunnistaa käyttäjän toimittaman sisällön vihamieliset rakenteet ja panee määritetyn
käytännön täytäntöön. Toimintaa ohjaavat ympäristömuuttujat ja konstruktorin
asetukset:

| Asetus     | Ympäristömuuttuja                                                                                     | Oletusarvo | Vaikutus                                                                                                                                                                                                                    |
| ---------- | ----------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Käytössä   | `INPUT_SANITIZER_ENABLED`                                                                             | `true`     | Kun arvo on `false`, suojamekanismin suoritus ohitetaan.                                                                                                                                                                    |
| Tila       | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`     | Injektiokäytäntö: `block`, `warn` tai `log`. (`redact` hyväksytään taaksepäin yhteensopivuuden vuoksi, mutta se **ei** poista injektiotekstiä; pyynnön henkilötietojen uudelleenkirjoitusta ohjaa `PII_REDACTION_ENABLED`.) |
| Estokynnys | `blockThreshold`-asetus / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`     | Estämiseen vaadittava vähimmäisvakavuus. Oletusarvoisesti keskitasoa vain tarkkaillaan.                                                                                                                                     |

**Tilan ensisijaisuusjärjestys** (`getMode`): kutsujan `options.mode` →
`INJECTION_GUARD_MODE`-arvon **tietokannan ominaisuuslipun ohitus** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE`-ympäristömuuttuja → `INPUT_SANITIZER_MODE`-ympäristömuuttuja →
`warn`. Hallintapaneelin ohitus on siten ympäristömuuttujia ensisijaisempi, joten Feature
Flags -käyttöliittymä ohjaa käynnissä olevaa suojamekanismia reaaliaikaisesti (ilman uudelleenkäynnistystä). Tietokannan luku on vikasietoinen:
jos siinä tapahtuu virhe, suojamekanismi palaa ympäristömuuttujiin perustuvaan toimintaan, ja kun
ohitusta ei ole asetettu, toiminta vastaa täysin pelkkiin ympäristömuuttujiin perustuvaa määritystä.

Tunnistuslähteet:

1. `sanitizeRequest()` moduulista `@/shared/utils/inputSanitizer` (muuallakin käsittelyketjussa
   käytetty yhteinen tunnistinjoukko).
2. Sisäänrakennetut `DEFAULT_GUARD_PATTERNS`-mallit (tällä hetkellä `system_override_inline` ja
   `markdown_system_block`, molempien vakavuus on `high`).
3. Valinnaiset konstruktorin asetuksissa annetut `customPatterns`-mallit (merkkijonoja, säännöllisiä lausekkeita
   tai tietueita muodossa `{ name, pattern, severity }`).

Kun `mode === "block"` **ja** vähintään yksi tunnistus saavuttaa vakavuuden
kynnysarvon, `preCall` palauttaa arvon `{ block: true, message: "Request rejected:
suspicious content detected" }`. Tiloissa `warn`/`log` suojamekanismi kirjaa tapahtuman mutta
sallii kutsun. Myös yhteinen `evaluatePromptInjection()`-apufunktio viedään
kutsujille, joiden on arvioitava kehotteita käyttämättä rekisteriä.

**Tarkistuksen raja (v3.8.20):** tunnistin tarkistaa vain yhdistetyn kehotetekstin **ensimmäiset 16 KB** —
`MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 tavua) tiedostossa
`src/shared/utils/inputSanitizer.ts`. Sekä `detectInjection()` että
`evaluatePromptInjection()` suorittavat operaation `slice(0, MAX_INJECTION_SCAN_BYTES)` ennen
mallisilmukan suorittamista. Injektiodirektiivit sijaitsevat syötteen alkupuolella, joten tämä
rajoittaa säännöllisten lausekkeiden CPU-/GC-kuormitusta useiden satojen kilotavujen hyötykuormissa heikentämättä tunnistusta (vrt.
#3932, #4041).

### Tunnistetietojen peittäjä (`credentialMasker.ts`)

Suoritetaan **molemmissa** vaiheissa oletusketjun viimeisenä (prioriteetti `95`). Peittää
tunnetut API-avain- ja salaisen tunnuksen mallit lähtevästä hyötykuormasta (viestien
sisältö, työkalukutsujen argumentit ja työkalujen tulokset) **sekä** palveluntarjoajan vastauksesta, jotta
kehotteeseen liitetty tunnistetieto (tai työkalun tuloksen palauttama tunnistetieto) ei vuoda
palveluntarjoajalle tai takaisin asiakkaalle.

- **Vain erikseen käyttöön otettava**, sama käytäntö kuin henkilötietojen peittämisessä (lähellä kovaa sääntöä #20):
  poissa käytöstä, ellei `settings.credentialRedactionEnabled === true` **tai**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kun toiminto ei ole käytössä, suojamekanismi ei tee mitään —
  se ei koskaan estä eikä kirjoita uudelleen.
- `redactCredentials()` käy läpi koko hyötykuorma-/vastauspuun (`walkValue()`;
  suojattu prototyyppisaastumiselta ja sykleiltä `WeakSet`-joukon avulla) ja korvaa osumat
  `[REDACTED:<type>]`-paikkamerkillä kloonaten vain tosiasiallisesti
  muuttuneet haarat.
- `CREDENTIAL_PATTERNS` kattaa LLM-palveluntarjoajien avaimet (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS-/SaaS-tunnukset (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), maksuavaimet (Stripe, Square), pilvipalvelujen
  avaimet (AWS-käyttöavain, Twilio, SendGrid, Mailgun), yksityiset avaimet / JWT:t,
  tunnistetietoja sisältävät yhteysmerkkijonot (`mongodb://user:pass@...` jne.) sekä
  yleisen `Authorization`/`x-api-key`/`api-key`/`apikey`-otsakearvon
  mallin. Otsakkeen muotoiset avaimet (`authorization`, `x-api-key`, `api-key`,
  `apikey`) peitetään rakenteellisesti (vain arvo; skeeman etuliite, kuten
  `Bearer `/`Basic `, säilytetään) yleisen tekstin säännöllisen lausekkeen käyttämisen sijaan.
- Suojamekanismi ei koskaan estä, vaan ainoastaan kirjoittaa uudelleen (`modifiedPayload` /
  `modifiedResponse`) ja lisää metatietoja (`meta.credentialsRedacted`, `meta.count`).

Regressiosuojaus: `tests/unit/credential-masker-guardrail.test.ts`.

## Perussopimus (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true katkaisee ketjun välittömästi
  message?: string; // näytetään eston yhteydessä
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // preCall palauttaa tämän pyynnön uudelleenkirjoittamiseksi
  modifiedResponse?: TValue; // postCall palauttaa tämän vastauksen uudelleenkirjoittamiseksi
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Suojakaide ilmaisee, ettei muutoksia ole, palauttamalla joko arvon `void`, `{}` tai
`{ block: false }`. Arvon `modifiedPayload`/`modifiedResponse` palauttaminen korvaa
ketjussa eteenpäin myöhemmille suojakaiteille välitettävän arvon.
`signal?: AbortSignal` välittää kutsujan elinkaaren suojakaiteille. Pyynnön keskeytys on tarkoituksellinen avoimeksi jättävä poikkeus: mediasillat lopettavat työn ja siivoavat palauttamatta käsittelemätöntä mediaa kohteelle, jonka tiedetään, ettei se tue sitä.

## Rekisteri (`registry.ts`)

Singleton-olio `guardrailRegistry` tarjoaa seuraavat toiminnot:

- `register(guardrail)` — lisää suojakaiteen (tai korvaa sen normalisoidun nimen perusteella) ja
  järjestää suojakaiteet uudelleen `priority`-arvon mukaiseen nousevaan järjestykseen.
- `clear()` / `list()` — hallinnollisia aputoimintoja.
- `runPreCallHooks(payload, context)` — käy aktiiviset suojakaiteet läpi, välittää
  hyötykuorman `modifiedPayload`-arvojen kautta ja pysähtyy ensimmäiseen `block: true` -tulokseen.
- `runPostCallHooks(response, context)` — sama käsittely vastauksen puolella.
- `resetGuardrailsForTests({ registerDefaults })` — tyhjentää tilan ja valinnaisesti
  rekisteröi oletukset uudelleen testien puhdasta eristämistä varten.

Molemmat suorittimet palauttavat arvon `{ blocked, payload|response, results, guardrail?, message? }`,
jossa `results` on `GuardrailExecutionResult`-tietueiden taulukko. Tietueet sisältävät
kunkin suojakaiteen `blocked`-, `skipped`-, `modified`-, `error`- ja `meta`-kentät,
joista on hyötyä jäljityksessä.

### Suojakaiteiden poistaminen käytöstä pyyntökohtaisesti

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` kokoaa
duplikaateista puhdistetun luettelon suojakaiteiden nimistä, jotka tulee ohittaa nykyisessä
pyynnössä. Lähteet (kaikki valinnaisia ja yhdistetään):

- `apiKeyInfo.disabledGuardrails`
- Pyynnön rungon `disabledGuardrails` (ylimmällä tasolla)
- Pyynnön rungon `metadata.disabledGuardrails`
- Otsake `x-omniroute-disabled-guardrails` (tai vanha
  `x-disabled-guardrails`)

Arvot voivat olla merkkijonotaulukoita tai pilkuilla eroteltu merkkijono; nimet
normalisoidaan pienikirjaimisiksi kebab-case-muotoon (`pii_masker` → `pii-masker`). Tulos
välitetään rekisterille `context.disabledGuardrails`-arvon kautta, jolloin rekisteri ohittaa
vastaavat suojakaiteet (`skipped: true` kohteessa `results`).

## Suoritusjärjestys

Jokaiselle pyynnölle, joka kulkee tiedostojen `src/sse/handlers/chat.ts` ja
`open-sse/handlers/chatCore.ts` kautta:

1. `resolveDisabledGuardrails(...)` muodostaa ohitusluettelon API-avaimen, pyynnön rungon
   ja otsakkeiden perusteella.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` suorittaa suojamekanismit nousevassa
   prioriteettijärjestyksessä:
   - Käytöstä poistetut suojamekanismit kirjataan tilaan `skipped`.
   - Kunkin suojamekanismin `preCall` voi kirjoittaa hyötykuorman uudelleen `modifiedPayload`-arvon avulla.
   - Ensimmäinen `block: true` keskeyttää ketjun, ja käsittelijä palauttaa
     suojamekanismin hylkäysvastauksen.
3. Mahdollisesti uudelleenkirjoitettu hyötykuorma siirtyy yhdistelmäreititykseen ja edelleen
   ylävirran käsittelyyn.
4. Kun vastaus on koottu, `guardrailRegistry.runPostCallHooks(...)`
   suorittaa saman ketjun vastaukselle. Tässä vaiheessa `block: true` hylkää ylävirran
   vastauksen.

Poikkeuksen aiheuttaneet suojamekanismit kirjataan muodossa `error: <message>` ja lokitetaan
`logger.warn`-kutsulla, mutta ketjun suoritus jatkuu — suunnitellusti salliva virhetilanteissa.

## Määritykset

Sisäänrakennettujen suojamekanismien lukemat ympäristömuuttujat:

| Muuttuja                              | Käyttäjä                | Vaikutus                                                                                                |
| ------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`      | Aseta arvoksi `false`, jos haluat poistaa tunnistuksen kokonaan käytöstä.                               |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`      | Injektiokäytäntö: `warn`, `block` tai `log`. Vanha arvo `redact` ei kirjoita injektiotekstiä uudelleen. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`      | Injektiosuojan tila; myös tietokannan ominaisuuslippu, joka **ohittaa** ympäristömuuttujat (DB > ENV).  |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`      | Vähimmäisvakavuus, jonka `MODE=block` hylkää: `high` (oletus), `medium` tai `low`.                      |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`      | Vanha alias muuttujalle `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                              |
| `PII_REDACTION_ENABLED`               | `pii-masker`            | Kun arvo on `true`, pyynnön henkilötiedot peitetään (injektiotilasta riippumatta).                      |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (alavirta) | Hallitsee vastauksen peittimen toimintaa.                                                               |

Modality Bridge -suojamekanismit lukevat ajonaikaiset määritykset tietokantapohjaisesta asetussäilöstä
(`getSettings()`), eivät ympäristömuuttujista. Kuvankäsittelyn ensisijaiset avaimet ovat
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ja
`modalityBridgeCacheMaxEntries`. Vanhoja
`visionBridge*`-avaimia tuetaan vain dokumentoituna yhden julkaisusyklin lukemisen
vararatkaisuna; hallintapaneelin kirjoitukset käyttävät ensisijaisia avaimia. Oletusarvot ja vararatkaisun
selvitystoiminto sijaitsevat tiedostossa `src/shared/constants/modalityBridgeDefaults.ts`, ja vanhat
vakiot säilytetään tiedostossa `src/shared/constants/visionBridgeDefaults.ts`.

Ääni käyttää asetuksia `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` ja `modalityBridgeAudioMaxClips` sekä jaettuja
`modalityBridgeCache*`-asetuksia. Äänelle ei ole vanhojen avainten vararatkaisua, koska nämä
avaimet otettiin käyttöön Modality Bridge -skeeman yhteydessä.

Video käyttää asetuksia `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` ja
`modalityBridgeVideoTimeout` sekä jaettuja `modalityBridgeCache*`-asetuksia.
Se on oletusarvoisesti poissa käytöstä, koska FFmpeg/ffprobe ovat valinnaisia operatiivisia
riippuvuuksia ja kuvatekstien tuottaminen videoruuduille lisää viivettä ja mallin käyttökustannuksia.

## Mukautetut suojaukset

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Vaiheet:

1. Luo `src/lib/guardrails/myGuardrail.ts`, joka laajentaa `BaseGuardrail`-luokkaa.
2. Toteuta `preCall` ja/tai `postCall`.
3. Rekisteröi joko tuonnin yhteydessä (lisää `registerDefaultGuardrails`-funktiosta) tai
   kutsu `guardrailRegistry.register(...)` suorituksen aikana — rekisteri korvaa
   kaikki aiemmat suojaukset, joilla on sama normalisoitu nimi.
4. Lisää testit hakemistoon `tests/unit/` (olemassa olevia esimerkkejä:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testaus

Käytä `resetGuardrailsForTests()`-funktiota testien välissä, jotta jokainen testi alkaa tunnetusta tilasta.
Anna `{ registerDefaults: false }`, jos haluat aloittaa tyhjällä rekisterillä ja
rekisteröidä vain testattavat suojaukset. Vision Bridge hyväksyy riippuvuuksien
injektoinnin (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge tarjoaa
vastaavat liityntäkohdat asetuksille, ominaisuuksille, STT-mallin valinnalle, tunnistetietojen
tarkistuksille ja litteroinnille. Testeillä voidaan siten testata kumpaakin työnkulkua ilman
tietokanta- tai verkkoyhteyttä.

## Katso myös

- `src/lib/guardrails/` — toteutus
- `src/shared/utils/inputSanitizer.ts` — jaettu tunnistin, jota käytetään
  kehoteinjektioiden havaitsemiseen ja henkilökohtaisten tunnistetietojen peittämiseen
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridgen oletusarvot ja
  pakotetun siltauksen malliluettelo
- `src/shared/constants/modalityBridgeDefaults.ts` — Vision/Audio-ajonaikaiset jaetut oletusarvot
- `docs/architecture/RESILIENCE_GUIDE.md` — erillinen kerros (piirikatkaisin, jäähdytysajat)
- `docs/reference/ENVIRONMENT.md` — täydellinen ympäristömuuttujien viite

## Injektiosuojauksen reittikattavuus ja red-team-testaus (vaihe 8 · lohko D)

Injektiosuojaus (`createInjectionGuard` / `withInjectionGuard`) kattaa kaikki reitit,
jotka hyväksyvät käyttäjän kehotteita. Se noudattaa `INJECTION_GUARD_MODE`-asetusta (oletus `warn` = vain kirjaus;
`block` = palauttaa HTTP 400 `SECURITY_001`).

| Tyyppi            | Reitit                                                                                                                                               | Oletustila |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Teksti (nykyinen) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn       |
| Generatiivinen    | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn       |
| Data              | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn       |

Tekstin poiminta (`extractMessageContents`) kattaa kentät `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team-testaus (öisin, `nightly-llm-security.yml`):** promptfoo varmistaa, että kukin reitti estää
OWASP-LLM-aineiston tilassa `INJECTION_GUARD_MODE=block`; garak suorittaa testit (ohitetaan ilman salaisuutta).
`moderations` sisältyy yhdenmukaisuuden vuoksi — estotilaa käyttävät ylläpitäjät voivat vapauttaa sen
`resolveDisabledGuardrails`-toiminnolla.

Öisin suoritettavassa työnkulussa (`.github/workflows/nightly-llm-security.yml`, cron + manuaalinen
käynnistys) on kaksi työtä:

- **`promptfoo-guard` (estävä)** — suorittaa komennon `promptfoo eval -c promptfooconfig.yaml`
  asetuksella `INJECTION_GUARD_MODE=block`. Kukin vihamielinen tapaus (esim. "ohita kaikki
  aiemmat ohjeet…", DAN-tyyliset suojauksen ohitukset) varmistaa, että vastaus sisältää
  arvon `error.code === "SECURITY_001"` eli että suojaus todella hylkäsi pyynnön.
- **`garak` (neuvoa-antava)** — suorittaa garakin asetuksella `--probes promptinject,dan,leakreplay`
  paikallista OmniRoute-instanssia (`http://localhost:20128/v1`) vasten. Suoritus riippuu
  palveluntarjoajan salaisuudesta (`PROMPTFOO_PROVIDER_KEY`); ilman sitä testi ohitetaan hallitusti, ja
  komentoon on lisätty loppuliite `|| true`, joten se raportoi tulokset aiheuttamatta CI-ajon epäonnistumista.

Suojausaputoiminnon (`createInjectionGuard` / `withInjectionGuard`)
kattavuus ulottuu kaikkiin kehotteita vastaanottaviin `/v1`-reitteihin; kehoteteksti poimitaan
kentistä `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`
`src/shared/utils/inputSanitizer.ts`-tiedoston `extractMessageContents()`-funktiolla.
