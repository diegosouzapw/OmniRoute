# Guardrails (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

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

## Sisäänrakennetut suojakaiteet

Rekisteri lataa automaattisesti kuusi suojakaidetta prioriteettijärjestyksessä tuonnin yhteydessä
(katso `registry.ts` → `registerDefaultGuardrails()`):

| Prioriteetti | Nimi                | Vaihe(et)      | Tiedosto              |
| ------------ | ------------------- | -------------- | --------------------- |
| `5`          | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`          | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`          | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`         | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`         | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`         | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Pienemmät prioriteettinumerot ajetaan **ensin**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Sieppaa kuvia sisältävät pyynnöt, jotka on suunnattu **ei-näkömalleille**, ja joko
uudelleenreitittää koko pyynnön näkökykyiselle mallille tai korvaa kuvaosat
tekstikuvauksilla, jotka on tuotettu konfiguroitavalla näkömallilla ennen
ylävirran kutsua. Tämä antaa vain tekstiä tukeville palveluntarjoajille mahdollisuuden käsitellä
läpinäkyvästi multimodaalisia hyötykuormia.

Kulku:

1. Ohita, jos kohdemalli tukee jo näköä (ellei se esiinny
   pakotetun sillan luettelossa `isVisionBridgeForcedModel`).
2. Pura kuvaosat `extractImageParts(messages)`-funktion avulla
   (`visionBridgeHelpers.ts`), joka delegointi **yhdistetylle median
   tunnistimelle** `detectMediaParts()` tiedostossa `open-sse/utils/mediaParts.ts` —
   yksi totuuden lähde, joka jaetaan yhdistelmäyhteensopivuussuodattimen kanssa.
   Purku on sallittu ylätason osille muodoista, jotka
   `replaceImageParts` voi liittää takaisin (extract↔replace-sopimus): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` ja Responses API `input_image`. Sisäkkäiset osumat ja
   vain indikaattorimuodot ovat yhdistelmäsuodattimen materiaalia, eikä niitä koskaan pureta.
   Ohita, jos mitään ei löydy.
3. Ratkaise ajonaikainen konfiguraatio `resolveVisionBridgeRuntimeSettings()`-funktion avulla
   (`src/shared/constants/modalityBridgeDefaults.ts`): uudet `modalityBridge*`
   asetusavaimet voittavat; vanhat `visionBridge*`-avaimet pysyvät **yhden syklin
   vararatkaisuna** (palautusikkuna). Ohita ennen median läpikäyntiä, kun
   silta on poissa käytöstä.
4. Tilavalitsin (`modalityBridgeVisionMode`, katso alla oleva taulukko) päättää
   uudelleenreitityksen vs. kuvauksen. Uudelleenreititys palauttaa `modifiedPayload`-tiedon, jossa vain `model` on
   vaihdettu, sekä metatiedot `{ rerouted, fromModel, toModel, imagesKept }`.
5. Kuvauspolku: rajoita kuvat `maxImages`-arvoon, muodosta tehtävätietoinen kehotus,
   konsultoi kuvausvälimuistia, kutsu näkömallia **rinnakkain**
   (`Promise.allSettled`), ja lisää `[Image N]: <kuvaus>` -tekstiosat
   niiden paikalle. Epäonnistunut kuvaus tuottaa `null`-arvon ja alkuperäinen kuvaosa
   **säilytetään** (#4012) — paitsi yhdistelmäkuvauspolulla, kun jokainen
   kuvaus epäonnistui, jolloin vahvistettu ei-näköinen ylävirta saa
   `(ei saatavilla – ei näkökykyistä palveluntarjoajaa yhdistetty)` -tyngän (#8430).
6. Palauta `modifiedPayload` + metatiedot (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Tilavalitsin (`modalityBridgeVisionMode`)

| Tila       | Oletus | Käyttäytyminen                                                                                                                                                                                                                                                                                                             |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | Vanha heuristiikka, koskematon (#6640/#7204): ei-yhdistelmä-/`auto/`-mallit uudelleenreitittävät parhaaseen näkömalliin, ellei alkuperäisellä mallilla ole jo käyttökelpoisia tunnistetietoja (sitten kuvaus); yhdistelmäkohteet kuvaavat aina.                                                                            |
| `describe` |        | Kuvaa aina – uudelleenreitityslohko ohitetaan kokonaan; käyttäjän valitsema malli vastaa aina.                                                                                                                                                                                                                             |
| `reroute`  |        | Pakota uudelleenreititys: tunnistetietojen säilyttämisen mallisuoja ohitetaan. Uudelleenreitityksen **kohde**-tunnistetietojen suoja on edelleen voimassa – kun käyttökelpoista näkökohdetta ei ole, pyyntö menee kuvaukseen, jotta raakakuvat eivät koskaan päädy vain tekstiä käsittelevään taustajärjestelmään (#8430). |

Pakotetut tilat oikosulkevat **ennen** automaattisen heuristiikan suorittamista; `auto`-käyttäytyminen
on tavuittain identtinen PR-1:tä edeltävän suojakaiteen kanssa.

#### Tehtävätietoinen kuvauskehotus (`modalityBridgeVisionTaskAware`)

Oletus **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) liittää
**viimeisen käyttäjäviestin** tekstin (katkaistu 500 merkkiin) peruskuvauskehotukseen,
ohjaten kuvauksen kohti sitä, mitä käyttäjä todella kysyi
(codex-vision-proxy-malli) ja pyytäen näkömallia transkriptoimaan näkyvän
tekstin. Jos lippu on pois päältä – tai käyttäjätekstiä ei ole – peruskehotusta
käytetään muuttumattomana.

Kuvaileva silmukka oma OpenAI-yhteensopiva pyyntö (`callVisionModelSingle()`
tiedostossa `visionBridgeHelpers.ts`) pyytää aina `image_url.detail: "high"` –
ehdoitta, jokaiselle kutsujalle/palveluntarjoajalle, ilman asiakkaan signaalia.
Matalan yksityiskohdan näytteenotto heikentää OCR-tarkkuutta juuri siinä tekstin
transkriptiotehtävässä, jota tämä kehotus pyytää, joten kuvauspyyntö itsessään
pyytää aina korkeaa yksityiskohtaa riippumatta siitä, mitä yksityiskohtatasoa
alkuperäinen saapuva pyyntö käytti. Tämä vaikuttaa vain sisäiseen kuvauspyynnön
runkoon; se ei muuta sitä, miten OmniRoute välittää kutsujan oman
`image_url.detail`-arvon ensisijaisessa pyynnössä – tämä oletusarvo
sovelletaan erikseen ja vain havaittuihin OpenCode-asiakkaisiin
`defaultImageDetail()`-funktiossa (`open-sse/handlers/chatCore/upstreamBody.ts`).
Kuvaavan silmukan Anthropic-langallisen muodon haarassa ei ole `detail`-kenttää,
eikä kumpikaan oletusarvo vaikuta siihen.

#### Kuvausrajoitus (`modalityBridgeVisionMaxChars`)

| Avain                          | Oletus | Alue              |
| ------------------------------ | ------ | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` tai 100–50000 |

`0` (oletus) tarkoittaa **ei rajoitusta** – `callVisionModel()`-funktion
palauttama kuvaus välitetään muokkaamattomana, säilyttäen olemassa olevan
käyttäytymisen. Mikä tahansa arvo välillä 100–50000 katkaisee kuvauksen
`…`-suffiksilla ennen kuin se liitetään takaisin muodossa
`[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` tiedostossa
`src/lib/guardrails/visionBridge.ts`). Nosta tätä arvoa yksityiskohtaisissa
OCR-tehtävissä, joissa alavirran malli tarvitsee täyden transkription; laske
sitä rajoittaaksesi tokenien käyttöä puheliaissa näkömalleissa.
Hallintapaneelin kenttä sijaitsee Vision-välilehden Advanced-paneelissa
(`modality-bridge-max-chars` tiedostossa `ModalityBridgeVisionTab.tsx`) ja
rajoittaa minkä tahansa arvon välillä 1 ja 99 sadan alarajaan jättäen
nimenomaisen `0`-arvon koskemattomaksi – `0` on kelvollinen Zod-arvo
itsessään (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`),
ei pelkästään "asettamaton" oletusarvo.

#### Kuvausvälimuisti (`modalityBridge/bridgeCache.ts`)

Muistissa oleva LRU + TTL-välimuisti kuvausten tuloksille, jaettu prosessikohtaisesti.
Avain = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
pituus-etuliitteen kehystyksellä (ei kenttärajojen törmäyksiä). Mallikomponentti
on **määritetty** siltamalli, ei malli, joka todella vastasi –
`callVisionModel` voi palata sisäisesti, ja avaimen asettaminen yrityskohtaisesti
hajottaisi välimuistin. Epäonnistuneita kuvauksia ei koskaan tallenneta välimuistiin.
Asetukset:

| Avain                           | Oletus | Alue    |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Etäkuvan normalisointi (silmukan kuvaus/base64-haku)

Kun silta hakee **etäkuvan** itse – Anthropicin itsepuhelu ja claude-wire-format
base64-muunnos (`ensureBase64ImagesForClaudeWire`), molemmat
`fetchRemoteImageAsDataUri()`-funktion kautta tiedostossa `visionBridgeHelpers.ts`
– tuloksena oleva data-URI välitetään `normalizeDataUri()`-funktion kautta
(`open-sse/utils/imageNormalize.ts`) ennen kuin se upotetaan näkömallipyyntöön.
Ylisuuret kuvat skaalataan alas **2048 pikselin pitkään reunaan** (vastaa
OpenAI/Anthropicin jo palvelinpuolella soveltamaa koonmuutosrajoitusta), mikä
vähentää lähetettyjä tavuja/viivettä muuttamatta sitä, mitä näkömalli näkee.
Koonmuutos käyttää `sharp`-kirjastoa, joka ladataan dynaamisella tuonnilla:
alustalla, jossa sen natiivi binääri ei lataudu, `normalizeDataUri()`
**ei koskaan heitä poikkeusta** – se palaa alkuperäisten tavujen läpivientiin,
joten kuvaus/base64-muunnosreitti toimii aina. Ei-kuvatavut (haku, joka ei
palauttanut dekoodattavaa kuvaa) välitetään myös koskemattomina. Tämä
normalisointi on rajattu kuviin, jotka silta hakee omaa itsepuheluaan varten –
sitä ei koskaan sovelleta kutsujan raakaan läpivientidataan, mikä on
yhdenmukaista vain opt-in-muutosperiaatteen kanssa (kova sääntö #20).

#### Asetusten skeema + migraatio

Uudet `modalityBridge*`-avaimet validoidaan Zodilla `updateSettingsSchema`-funktiossa
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, `modalityBridgeCache*`-kolmikko ja
`modalityBridgeAudio*`-ryhmä, jota Audio Bridge käyttää. Migraatio
`141_modality_bridge_settings.sql` kopioi olemassa olevat vanhat
`visionBridge*`-arvot vastaaviin uusiin avaimiin (idempotentti, ei koskaan
kirjoita yli operaattorin asettamaa `modalityBridge*`-arvoa); vanhat avaimet
hyväksytään edelleen lukupalautuksena yhden julkaisusyklin ajan.

#### Läpinäkyvyysotsikko + tilastot

Kuvausmuunnetut vastaukset sisältävät
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(rakennettu `buildModalityBridgeHeader()`-funktiolla tiedostossa
`modalityBridge/bridgeStats.ts`, leimattu `withModalityBridgeHeader()`-funktiolla
tiedostossa `src/sse/handlers/chatHelpers.ts`). Uudelleenohjatut pyynnöt
**eivät saa** otsikkoa – hyötykuorma oli koskematon ja mallinvaihto näkyy jo
vastauksen rungon `model`-kentässä.

`GET /api/modality-bridge/stats` (hallintatunnistus, sama taso kuin
`GET /api/settings`) palauttaa muistissa olevat modaliteettikohtaiset laskurit
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` `vision`, `audio` ja `video`
osalta. `averageLatencyMs` käyttää `latencySamples`-arvoa, ei kaikkia yrityksiä,
nimittäjänä; operaatio ilman ajoitusta ei luo nollan millisekunnin näytettä.
`bridged` pysyy taaksepäin yhteensopivana aliasina onnistuneille muunnoksille;
epäonnistuneet yritykset eivät lisää sitä.
Laskurit nollautuvat prosessin uudelleenkäynnistyksessä suunnitellusti
(telemetria, ei kirjanpito).

#### Hallintapaneelin konfiguraatio

Oma koontinäyttösivu on
`/dashboard/settings/modality-bridge`. Sen URL-osoitteelliset `Vision`-, `Audio`-
ja `Video`-välilehdet säilyttävät kyselyparametrit vaihtaessaan `tab`-arvoa.
Vision-välilehti näyttää käytön, tilan, mallin valinnan (mukaan lukien automaattisen
oletuksen), tehtävätietoisen kehotuksen, edistyneet aikakatkaisu-/kuva-/kuvaus-pituus-/välimuisti-
rajat, ajonaikaiset laskurit ja suojatun esimerkkipyynnön. Audio-välilehti on myös käytössä: se näyttää
käytön, vain STT-mallin valitsimen Autolla, aikakatkaisu-/maksimileike-rajat, äänilaskurit ja
`input_audio`-esimerkkikokeilun. Video-välilehti on toiminnallinen: se raportoi
FFmpeg/ffprobe-ajonaikaisen tilan – yhden neljästä eksplisiittisestä käyttöliittymätilasta (`unknown`
kun tarkistus on käynnissä tai ei voinut valmistua, `restricted` ei-loopback-
koontinäyttöisännässä, jossa tarkistus ohitetaan asiakaspuolella, `unavailable` kun tarkistettu
ja vahvistettu puuttuvaksi, tai `available` FFmpeg/ffprobe-versioiden kanssa) – säilyttää
käyttö-/malli-/kehys-/video-/aikakatkaisurajat, suodattaa mallinvalitsimen näkökykyisiin
malleihin ja näyttää videolaskurit.

Entinen Vision Bridge -kortti tekoälyasetusten alla on yhteensopivuuslinkki
uudelle sivulle; se ei enää omista toista kopiota lomakkeesta. Media Providers
linkittää myös Image-to-Text- ja Speech-to-Text-työnkulut vastaaviin Modality
Bridge -välilehtiin poistamatta olemassa olevaa Speech-to-Text-leikkikenttää.

**Itsesilmukan pääsyn ohitus:** kun kuvauspyyntö reititetään OmniRouten
oman `/v1`-itsesilmukan kautta (epästandardi palveluntarjoajamalli), alipyyntö lähettää
`x-omniroute-admission-bypass: internal` ja se todennetaan ratkaistulla
itsesilmukan tunnuksella – paikallisella `sk_omniroute`-sentinelillä paikallisessa tilassa, tai
operaattorin määrittämällä `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` -ympäristöavaimella (#1350), jotta
`REQUIRE_API_KEY=true`-käyttöönotot voivat silti suorittaa kuvauspyynnön. Ohitus
hyväksytään vain näille täsmällisille tunnuksille, joten ulkoiset asiakkaat eivät voi käyttää
otsikkoa pääsyn ohittamiseen.

Vanhat oletukset ovat tiedostossa `src/shared/constants/visionBridgeDefaults.ts`;
uudet tila-/tehtävätietoiset-/välimuistioletukset ja asetusten ratkaisija ovat tiedostossa
`src/shared/constants/modalityBridgeDefaults.ts`. Suojakaide näyttää
`deps`-konstruktorivaihtoehdon, jotta testit voivat syöttää väärennettyjä `getSettings`- ja
`callVisionModel`-toteutuksia.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Sieppaa ääntä sisältävät chat-pyynnöt ennen kuin ne saavuttavat kohteen, jonka
ei tiedetä hyväksyvän äänisyötettä. Se ei koskaan uudelleenreititä chat-pyyntöä: ääniosat
transkriboidaan olemassa olevan OpenAI-yhteensopivan moniosaisen päätepisteen kautta ja
valittu chat-malli jatkaa tekstikopioilla.

Kulku:

1. Ratkaise `supportsAudio` `getResolvedModelCapabilities()`-funktion kautta. Nimenomainen
   palveluntarjoajarekisterin metatiedot voittavat, sitten staattiset mallin metatiedot, sitten synkronoidut
   `modalities_input`. Ilmoitettu syöttölista ilman `audio`-kenttää on `false`; ei
   kykyjen todisteita jää `null`. Sekä `false` että `null` aktivoivat
   konservatiivisen sillan, kun taas `true` ohittaa sen.
2. Ratkaise `modalityBridgeAudio*`-asetukset ja pura liitettävät ylimmän tason
   ääniosat jokaisesta viestistä jaetun `detectMediaParts()`-tunnistimen kautta.
   Tuetut johdinmuodot ovat OpenAI `input_audio`, `audio_url` ja
   `source.media_type: "audio/*"`. Sisäkkäinen ääni tunnistetaan reititystä varten, mutta sitä ei
   poisteta liitospolun kautta. Työ on rajattu `modalityBridgeAudioMaxClips`-arvolla;
   myöhemmät osat pysyvät koskemattomina.
3. Kunnioita määritettyä `provider/model`-arvoa tai anna `selectAudioBridgeModel()`-funktion käydä läpi
   `AUDIO_TRANSCRIPTION_PROVIDERS` vakaassa luettelojärjestyksessä ja valita ensimmäinen
   malli, jolla on käyttökelpoinen aktiivinen palveluntarjoajan tunnus.
4. `callAudioTranscription()` muuntaa base64/data-URI-äänen moniosaiseksi
   `file`-tiedostoksi tai lataa etäisen `audio_url`-tiedoston vain julkisen ulospäin suuntautuvan
   suojauksen kautta DNS-kiinnityksellä ja 25 Mt:n rajalla. Se sitten POSTaa tiedoston ja valitun
   mallin paikalliseen `/v1/audio/transcriptions`-itsesilmukkaan, todennettuna
   `resolveSelfLoopBearer()`-funktion avulla. Olemassa oleva transkriptioreitti suorittaa normaalin
   tunnusten haun, jäähtymis-/nopeusrajoitusten käsittelyn ja palveluntarjoajan lähetyksen.
5. Onnistuneet puhelut korvaavat osansa `[Audio N]: <transcript>`-merkkijonolla. Puhelut
   suoritetaan `Promise.allSettled`-funktiolla: yksittäinen virhe säilyttää alkuperäisen
   ääniosan (#4012-sopimus). Jos jokainen puhelu epäonnistuu ja kohde on todistettu
   `supportsAudio === false`, osista tulee
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-sopimus). Tuntemattomalle
   kohteelle (`null`) kaikki epäonnistuneet tulokset pysyvät koskemattomina. Todistettu
   vain tekstiä tukeva kohde, jolla ei ole käyttökelpoista STT-tunnusta, saa saman eksplisiittisen
   stubin ilman verkkopuhelua.

Onnistuneet transkriptiot käyttävät prosessikohtaista Modality Bridge LRU/TTL -välimuistia.
Avain yhdistää ääniviitteen, vakaan `audio-transcription`-toimintatunnisteen ja valitun STT-mallin;
virheitä ei koskaan tallenneta välimuistiin. Äänikokeilut päivittävät jaettuja
`bridged`, `cacheHits`, `failures` ja `lastUsedAt` -laskureita.
Muunnetut vastaukset sisältävät
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; koskemattomat
pyynnöt eivät saa Audio Bridge -segmenttiä.

Ajonaikaiset asetukset ovat tietokantapohjaisia ja Zod-validoituja:

| Avain                         | Oletus  | Alue            |
| :---------------------------- | :------ | :-------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —               |
| `modalityBridgeAudioModel`    | `""`    | Auto tai STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10            |

Jaettu välimuisti pysyy `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` ja `modalityBridgeCacheMaxEntries` -asetusten hallinnassa.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Sieppaa ylimmän tason video-osat Chat Completions `messages` -viesteissä ja Responses API `input` -syötteessä ennen kuin kutsutaan kohdetta, jolla ei ole tunnettua natiivia videotukea.
Tuetut muodot ovat `input_video`, `video_url`, `video_source`, HTTPS-URL-osoitteet ja `data:video/*;base64,...` data-URI:t. Pelkkiä tiedostonimiä tekstissä ei käsitellä videona.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) vastaa pyynnön läpikäynnistä, kykyjen/käytäntöjen tarkistuksesta, pyyntökohtaisesta yhdistämisestä ja vastauskuormasta.
Videokohtainen työ – hankinta, koko tuloksen välimuisti, kehyssekvenssin kuvaaminen (joka yhdistää kaikki kutsujan ilmoittamat äänitranskriptiot) ja yrityskohtaiset mittarit/keskeytys/siivous – on piilotettu `processVideoPart`-funktion taakse tiedostossa `videoBridgePipeline.ts`, jota kutsutaan kerran videon osaa kohden `preCall`-silmukan sisällä.
Tämä moduuli määrittelee myös eksplisiittiset porttirajat `VideoMediaBrokerPort` (tavujen hankinta ja näytteistettyjen kehysten poiminta), `VideoAudioTranscriptionPort` (kutsujan ilmoittaman äänitranskription yhdistäminen näytteistettyihin tekstityksiin) ja `VideoDrilldownPort` (kehysten porautumisen pysyvyysraja; ei vielä kytketty `processVideoPart`-funktioon – vain erillinen `/api/modality-bridge/video/drilldown`-reitti kirjoittaa porautumistietoja tänään).

Julkinen `/v1`-pyyntöpolku ei koskaan tuo tai kutsu aliprosessia. Etävideot ladataan 50 MiB:n rajan puitteissa; sisäisillä base64-videoilla on konservatiivinen 36 MiB:n dekoodattu videokohtainen raja, jotta malli/viestit/kehystyskuori voi pysyä julkisen JSON-pyynnön hyväksymisrajan (50 MiB) sisällä. Sisäisen pituuden ja dekoodatun koon arviot tarkistetaan ennen varausta. HTTPS vaaditaan alkuperäisessä etä-URL-osoitteessa ja jokaisessa uudelleenohjauksessa, käyttäen olemassa olevaa vain julkista ulospäin suuntautuvaa suojakaistaa DNS-kiinnityksellä. Tavut ylittävät sitten tarkan sisäisen `POST /api/modality-bridge/video/extract` välittäjärajan. Tämä reitti on sekä `LOCAL_ONLY` että `SPAWN_CAPABLE`, hyväksyy vain prosessikohtaisesti todennetun, luotetun takaisinkytkentäpyynnön, eikä koskaan hyväksy URL-osoitetta, tiedostojärjestelmäpolkua, suoritettavaa tiedostoa tai argumenttiluetteloa. API:n runkokoon putki ja käsittelijän inkrementaalinen rungonlukija valvovat itsenäisesti 50 MiB:n välittäjän syöttörajaa. Sen rajattu jono suorittaa yhden poiminnan kerrallaan, sallii neljä odottavaa työtä ja rajoittaa odottavan syötteen 100 MiB:iin.

Välittäjän sisällä `ffprobe` lukee yksityisen paikallisen tiedoston; kiinteä muotoluettelo sulkee pois soittolista- ja manifestimuodot. Sallituissa MOV-perheen konteissa ulkoiset MOV-dataviittaukset pysyvät oletusarvoisesti poissa käytöstä, eikä kiinteä komento ota niitä käyttöön. Sekä `ffprobe` että `ffmpeg` käyttävät vain `file`-protokollan sallittujen luetteloa, yhtä säiettä, kiinteitä argumenttitaulukoita, ei shelliä ja suoritettavia tiedostoja, jotka on ratkaistu `PATH`-ympäristömuuttujasta. Liitetyt kuvakannet eivät ole toistettavia ehdokkaita. Kaikkien toistettavien virtojen on täytettävä rajoitukset, ja eksplisiittinen oletusvirta on etusijalla ennen determinististä pienimmän indeksin varajärjestelmää. Videot on rajoitettu 600 sekuntiin, 8 192 pikseliin per ulottuvuus ja 33 554 432 lähdepikseliin. FFmpeg näytteistää 1–16 keskipisteen JPEG-kehystä, skaalaa pitkän reunan enintään 1 024 pikseliin skaalaamatta pienempiä syötteitä ylöspäin, eikä koskaan vastaanota URL-osoitetta. Näytteistys on oletusarvoisesti `uniform`. Valinnaiset `scene_aware` ja kokeelliset `segment_aware` -käytännöt suorittavat yhden ylimääräisen kiinteän FFmpeg-kierroksen jo validoidun paikallisen virran yli, valitsevat rajatut `showinfo`-kohtausaikaleimat ja palautuvat deterministisesti samoihin yhtenäisiin keskipisteisiin ilmaisimen vian, aikakatkaisun, virheellisen tulosteen tai tyhjän ehdokasjoukon sattuessa. Segmenttitietoinen tila jakaa keskipistenäytteet suhteellisesti validoituihin kohtausväleihin; segmenttitietoisen todisteen ja varajärjestelmän käyttäytymisen yksityiskohdat ovat alla. Kova 16 kehyksen raja
sovelletaan valinnan jälkeen jokaisessa käytännössä. Kun kohtauskohtaisella pyynnöllä on vain yhden kehyksen budjetti, se käyttää aktiivisen koko videon tai tarkennusikkunan yhtenäistä keskipistettä ja ilmoittaa `policyEffective: uniform`: yksittäinen valittu kohtauskehys ei voi säilyttää molempia ajallisia päitä. Kutsuja voi valinnaisesti antaa äärellisen tarkennusikkunan (`start`/`end` sekuntia); rajat rajataan median kestoon, käännetyt tai äärettömät ikkunat hylätään, ja kaikki näytteenottokäytännöt suoritetaan vain normalisoidun aikavälin sisällä. Tuloksena oleva ikkuna sisällytetään näytteenottometatietoihin ja epäluotettavaan kuvauksen etuliitteeseen, jotta alavirran mallit voivat erottaa tarkennetun otteen koko aikajanasta.

Semanttinen kuvatekstin tarkennus on erillinen, eksplisiittinen asetus. Oletusarvoinen `full`-analyysitila säilyttää olemassa olevan kehyskehotteen eikä koskaan välitä pyyntötekstiä kuvatekstimallille. `focused`-tilassa silta lukee vain uusimman ei-tyhjän käyttäjän kirjoittaman `text`/`input_text`-kentän samasta Chat- tai Responses-säilöstä, normalisoi sen NFC:ksi, tiivistää ohjausmerkit ja välilyönnit ja rajoittaa sen 500 Unicode-koodipisteeseen. Tyhjä tulos palautuu tarkkaan `full`-kehotteeseen. Käyttökelpoinen vihje serialisoidaan JSON-muodossa erillisessä epäluotettavan käyttäjän kontekstilohkossa ja se voi vain priorisoida havaittavia yksityiskohtia; se ei voi ohittaa erillistä varoitusta ohjeiden noudattamista vastaan, jotka ovat näkyvissä tai kuuluvissa mediassa. Tekstuaalinen tarkennus ei koskaan päättelee `start`/`end`-arvoja tai muuta ajallista näytteenottajaa.

#### FU-07 rakenteellisen segmentin todisteet

`segment_aware` käyttää yhtä rajattua esianalyysikierrosta jo validoidun paikallisen videovirran yli. Kiinteä suodatinketju skaalaa ensin enintään 320 pikselin leveyteen, havaitsee kohtausmuutokset ja jäädytetyt aikavälit, sitten näytteistää 1 kuvan sekunnissa sumeuden, keskimääräisen luminanssin ja spatiaalisen/ajallisen tiedon osalta. Kierros on rajoitettu 600 rakenteelliseen näytteeseen, yhteen FFmpeg/suodatinsäikeeseen, samaan `file`-protokollaan ja säilöjen sallittujen luetteloihin, 1 MiB:n prosessin tulostusrajaan ja enintään 30 sekuntiin välittäjän jaetun keskeytyksen/määräajan sisällä. Se ei koskaan hyväksy komentoa, suodatinta, polkua tai URL-osoitetta pyynnöstä.

Rakenteelliset arvot ovat deterministisiä näytteenottoon perustuvia todisteita, eivät semanttista videon ymmärtämistä. Ne eivät päättele aiheita, toimintoja, kuvatekstejä, puhetta tai käyttäjän tarkoitusta. Kohtaus- ja pysäytysrajat muodostavat segmenttejä; pysäytyksen kattavuus, sumeus, valotus, spatiaalinen yksityiskohta ja ajallinen muutos vaikuttavat vain siihen, miten olemassa oleva 1–16 ruudun budjetti jaetaan. Täysin pysäytetty segmentti on rajattu yhteen ruutuun, kun taas ei-pysäytetyt segmentit kilpailevat jäljellä olevasta budjetista. Kun rajat ylittävät ruutujen määrän, tasainen aikajanan kattavuus säilytetään, jotta nopeat varhaiset leikkaukset eivät voi piilottaa pitkää loppusegmenttiä. Kohtausrajat, jotka ovat 1 sekunnin analyysiresoluution sisällä pysäytysrajasta, yhdistetään.

Puuttuvat suodattimet, virheelliset/tyhjät todisteet, ilmaisinvirhe tai rajattu esianalyysin aikakatkaisu epäonnistuvat avoimesti tarkkaan tasaiseen keskipistepolitiikkaan. Kutsujan keskeytys tai välittäjän määräaika ei epäonnistu avoimesti: se lopettaa käynnissä olevan aliprosessin, estää myöhemmän ruudun poiminnan, ja yksityinen väliaikainen puu poistetaan `finally`-lohkossa.

`scripts/perf/video-bridge-fu07-eval.ts` luo deterministisiä todellisia FFmpeg-tietoja jälkikäsittelyn kuvatekstipuhelujen säästöjä, tiheän liikkeen budjetin allokointia, sumeuden/valotuksen/SI-TI-todisteita, nopeita leikkauksia pitkällä hännällä ja asteittaisen häivytyksen vääriä positiivisia varten. Se tallentaa esianalyysin todellisen ajan ja, jos `/usr/bin/time` on saatavilla, lapsiprosessorin ja huippumuistin käytön. Sen laaduntarkistukset ovat vain rakenteellisia oraakkeleita. Todellisen kuvatekstimallin laatu pysyy `HOLD`-tilassa, koska tällä testivaljaalla ei ole valtuutettua päätepistettä tai jäädytettyä tuomaria. Rahalliset säästöt pysyvät myös `HOLD`-tilassa, ellei `--caption-cost-per-call-usd` anna eksplisiittistä positiivista puhelukohtaista arviota; skripti ei koskaan väärennä kumpaakaan tulosta.

Jokainen ruutu on rajoitettu 4 MiB:iin, kaikki raakarutut yhteensä 23 MiB:iin ja sarjoitettu välittäjän vastaus 32 MiB:iin. Yksityinen väliaikainen hakemisto poistetaan `finally`-lohkossa. OmniRoute ei niputa FFmpeg:iä eikä hyväksy mukautettua suoritettavan tiedoston polkua. Ennen kuvatekstien luomista silta soveltaa konservatiivista visuaalista duplikaattien poistamista: jokainen JPEG-kuva pienennetään 16x16 harmaasävyiseksi puskuriksi ja sitä verrataan vain viimeksi säilytettyyn ruutuun. Pyydetyn kuvatekstibudjetin ollessa yli yhden ruudun, poiminta tarjoaa rajatun ehdokasjoukon, joka on enintään kaksi kertaa budjetin kokoinen ja ei koskaan yli 16 ruutua. Pyydetty raja sovelletaan vasta duplikaattien poistamisen jälkeen, ja ensimmäinen ja viimeinen valittu ehdokas säilytetään lopullisen ohennuksen aikana, kun budjetti on vähintään kaksi. Versioitu `grayscale-16x16-mean-cells-v2` -käytäntö käyttää suurempaa keskimääräisen luma-deltan ja niiden pikkukuvakennojen suhteen, joiden normalisoitu delta on vähintään 0,05. Duplikaattikynnys on vakio 0,04, joka on valittu ennustettavuuden vuoksi eikä sitä ole paljastettu ajonaikaisena asetuksena. Tämä toissijainen korkeakontrastinen signaali säilyttää pienen liikkeen ja näkyvän tekstin muutokset, jotka pelkkä keskiarvovertailu voi piilottaa. Vertailijan tai dekooderin virheet epäonnistuvat avoimesti ja säilyttävät kattavuuden. Tulostusmetadata erottaa poimitut ehdokkaat, onnistuneesti käytetyt ruudut ja visuaalisesti pudotetut duplikaatit.

Nimenomaisesti merkitty videon osa voi pyytää aikaleimattua yhteenvetokuvaa. Silta rakentaa enintään 4-sarakkeisen, 16-ruutuisen JPEG-ruudukon. Jokainen 512 pikselin solu polttaa lähdeaikaleimansa korkeakontrastiseen alareunaan, kun taas samat aikaleimat säilyvät tekstimuotoisessa metadatassa myöhempää yhdistämistä ja tarkastusta varten. Koko JPEG on edelleen rajattu 32 MiB:iin. Jos `sharp` ei pysty dekoodaamaan tai koostamaan ruudukkoa, silta palaa yksittäisiin JPEG-ruutuihin; asiakkaan keskeytys leviää edelleen ruudukon toiminnon läpi.

Ylennyksen todisteet ovat tarkoituksellisesti erillään synteettisestä koostumuksen mikrovertailusta. `scripts/perf/video-bridge-contact-sheet-eval.ts` määrittelee skeemaversioidun A/B-testivaljaan todellisille OpenAI-yhteensopiville näkömalleille. Se mittaa palveluntarjoajan ilmoittamia tokeneita, päästä päähän -viivettä (mukaan lukien arkin koostumus), mallikutsujen määrää ja manifestissa määriteltyjen tosiasioiden säilyttämistä. Raakoja mallivastauksia ei kirjoiteta raporttiin; vain SHA-256-tiivisteet ja vastaavat tosiasiatunnukset säilytetään. Testivaljaat eivät tee verkko- tai maksullisia mallikutsuja, ellei `--execute-real` ole annettu ja `--model`, `OMNIROUTE_BASE_URL` ja `OMNIROUTE_API_KEY` ole määritetty. Ilman tätä eksplisiittistä todellista ajoa sen koneellisesti luettava tuomio pysyy `HOLD`-tilassa; pelkät synteettiset hyötykuorma-/kutsulaskentamittaukset eivät ole ylennyksen todisteita.

Kutsujat voivat liittää valinnaisen `transcript.cues`-taulukon tuettuun videon osaan, kun heillä on jo kohdistettu teksti. Jokaisen vihjeen on sisällettävä `text`, äärellinen `start`/`end`-väli tutkitun keston sisällä ja sallittu `source` (`client`, `embedded` tai `audio-bridge`); `confidence` oletusarvo on `1` ja sen on pysyttävä välillä `0` ja `1`. Tarkat kaksoiskappaleet yhdistetään. OmniRoute ei koskaan aloita transkriptiota tästä metadatasta: validoidut vihjeet kopioidaan kuvattuun tulokseen lähteen, luottamuksen ja aikavälin kanssa, ja ne esitetään epäluotettavina havaintoina ruutujen kuvatekstien rinnalla. Virheellinen, alueen ulkopuolinen tai alkuperätön teksti hylätään sen sijaan, että se sekoitettaisiin kuvatekstivirtaan. `source`-kenttä on tällä hetkellä kutsujan ilmoittama, ei palvelimen vahvistama: OmniRoute varmistaa, että arvo on yksi kolmesta sallitusta merkkijonosta, mutta ei vielä kryptografisesti vahvista, että `embedded`- tai `audio-bridge`-merkintä todella tuli palvelimen omistamasta poiminnasta. Käsittele `source`-kenttää epäluotettavana vihjeenä, kunnes tämä vahvistus saadaan; älä rakenna valtuutuspäätöksiä sen varaan.

Edistynyt kutsuja voi tarjota jo valtuutetun `audioTranscript`-raidan samalle videolle. Fuusaumakohta yhdistää visuaaliset ja audiotarkkailut yhden määräajan ja keskeytyssignaalin alle, järjestää ne yhteiselle aikajanalle, poistaa tarkat kaksoiskappaleet ja raportoi osittaisen tuloksen, kun vain toinen puoli onnistuu. Virheellinen `audioTranscript` heikkenee tähän osittaiseen tulokseen – visuaalinen kuvaus säilytetään ja audioraita tallentaa puhdistetun virhekoodin – sen sijaan, että koko video epäonnistuisi. Haarakohtainen saatavuus, osittainen lippu ja puhdistetut virhekoodit säilytetään kuvatussa tuloksessa, suojakaiteen metatiedoissa (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), tulosvälimuistin metatiedoissa ja sillan fuusiolaskureissa. Oletusarvoinen Video Bridge -polku ei kutsu puheentunnistusta tai lataa toista mediakopiota; ilman tätä eksplisiittistä raitaa se pysyy vain videona.

**Transkription säilyttäminen (#12150 P1).** Tämä soveltuu automaattisesti aina, kun Video Bridge (joka on itsessään opt-in) renderöi transkription vihjeen – erillistä säilytyslippua ei ole. Kun pyyntö renderöi minkä tahansa transkription vihjeen (kutsujan ilmoittama `transcript` tai yhdistetty `audioTranscript`), suojakaide merkitsee sen `videoBridgeObserved`-tilaksi ja tuottaa videokuvauksen redaktoidun varjon – identtisen renderöinnin, jossa jokaisen vihjeen vapaatekstikenttä korvataan `[redacted-video-transcript]`-tekstillä, joka rakennetaan korvaamalla strukturoitu vihjekenttä ennen merkkijonon kokoamista (ei koskaan jäsentämällä litistettyä tekstiä, joten mikään vihjeen sisältö – haitallinen tai tavallinen, mukaan lukien `]`-merkin sisältävät kappaleet, kuten `[inaudible]`/`[music]` – ei voi säilyä). Säilytetty puhelulokin pyynnön runko vaihtaa jokaisen videosta johdetun tekstiosan tähän redaktoituun varjoon, joka vastaa sisällön samankaltaisuutta; `fullText`-ankkuri luetaan uudelleen valmiista esipuhelun suojakaiteen hyötykuormasta, joten vastaavuus onnistuu edelleen myöhempien ketjun suojakaiteiden (PII- ja tunnistetietojen peittäjät, prioriteetit 10/95) kirjoittaessa kuvaustekstin paikoilleen ja järjestelmän kehotteen/siirron/muistin injektion muokatessa viestitaulukkoa. Mallille lähetetty runko on muuttumaton. Tarkkailtu pyyntö ei myöskään täytä kestävää muistia (sekä pyynnöstä että vastauksesta johdettu poiminta ohitetaan), joten mallin oma vastaus ei voi toistaa transkriptiotekstiä muistiin.

Lisäkopiot käyttävät samaa tarkkailtua pyyntösignaalia. Raaka ennen suojakaidetta otettu asiakaspyynnön tilannekuva, muistissa odottava pyyntö ja varhainen hylätyn pyynnön loki korvaavat rakenteellisesti transkriptiokentät videon osissa; putkilinjan vaiheiden syntetisoimat merkkijonokehotteet ja kontekstin siirto redaktoidaan säilytetyn pyynnön rungon vastaanottajassa. Säilytetty `video_content_removed`-merkki saa `previous_response_id`-jatkumon epäonnistumaan suljettuna sen sijaan, että se rekonstruoisi tarkoituksella hylätyn tekstin. Jos tarkkailtu pyyntö menettää osakohtaisen redaktointivarjonsa ennen lokitusta, tai jopa yksi useista videovarjoista ei vastaa myöhempien pyyntömuutosten jälkeen, säilytetty pyynnön runko jätetään kokonaan pois sen sijaan, että säilytettäisiin osittain redaktoitu transkriptio.

Tarkkaillun pyynnön osalta mallin vastaus voi lainata mitä tahansa osaa transkriptiosta ilman strukturoitua vihjerajaa. Sen säilytetty puhelulokin `responseBody` korvataan siksi poisjättömerkillä; yksityiskohtaista putkilinjan artefaktia (joka voi sisältää ylävirran/asiakkaan runkoja ja virran osia) ei säilytetä. Semanttiset, idempotenttiset ja päättely-uudelleentoistovälimuistit ohittavat luku- ja kirjoitustoiminnot kyseiselle pyynnölle. Palveluntarjoajan pyyntö ja asiakkaalle näkyvä vastaus pysyvät muuttumattomina. Varhaiset keepalive-tavut tyhjennetään väliaikaisesta puskurista, kun yksityiskohtainen artefakti jätetään pois. Kiron virheellinen EventStream-varoitus ilmoittaa vain hyötykuorman tavumäärän, ei koskaan sen sisältöä tai JSON-jäsentimen raakaa virhettä.
Tämä ei väitä, että jokainen toisiinsa liittymätön palveluntarjoajan/lisäosan diagnostiikka olisi tarkastettu; laajempi säilytettyjen kohteiden tarkastus on seurannassa numerolla #11658.

Sisäinen `/api/modality-bridge/video/drilldown`-elinkaari on erillinen, takaisinkytketty/tunnistautunut välimuistin alusta. Jokainen operaatio vaatii myös kanonisen läpinäkymättömän pääkäyttäjätunnuksen. Ennen kuin tuotantokutsuja otetaan käyttöön, sen on johdettava tämä tunnus todennetusta vuokralaisesta eikä se saa koskaan välittää asiakkaan valitsemaa arvoa. Välimuistin avaimet sitovat tämän pääkäyttäjän kanonisiin istunto- ja videoviitetunnuksiin, tallentavat vain niiden SHA-256-johdetut avaimet ja rajaavat sekä luku- että poistotoiminnot samalle pääkäyttäjälle. Välimuisti tallentaa enintään 16 johdettua JPEG-kehystä merkintää kohti, vanhentaa ne kymmenen minuutin kuluttua ja tukee rajattuja `start`/`end`-lukuja tai eksplisiittistä istunnon poistamista.

Jokainen pääkäyttäjä on rajoitettu 16 merkintään ja 64 MiB kanoniseen JPEG-dataan. Nämä rajat ovat riippumattomia globaalista 64 merkinnän/256 MiB:n katosta: pääkäyttäjän kiintiöpaine poistaa vain kyseisen pääkäyttäjän vähiten äskettäin käytetyt merkinnät ennen kuin globaalia LRU-poistoa harkitaan. Vanhentuneet merkinnät poistetaan sekä pääkäyttäjän että globaalista kirjanpidosta välimuistin toiminnan yhteydessä, kun taas peruutus ja validointivirhe eivät sitoudu osittaiseen korvaukseen.

Välimuisti hylkää ei-kanonisen Base64:n, liiallisen täytteen, ei-JPEG-median, virheelliset tai katkaistut JPEG-kuvat ja JPEG-kuvat, jotka tuottavat varoituksen rajatun koko kuvan `sharp`-dekoodauksen aikana. Se uudelleenkoodaa jokaisen hyväksytyn kuvan kanoniseksi JPEG-kuvaksi, johtaa leveyden ja korkeuden dekoodatuista tavuista luottamatta kutsujan kenttiin ja hylkää kaikki jäljellä olevat monikieliset tavut sen sijaan, että säilyttäisi ne. Vain rajattu kanoninen pakattu puskuri veloitetaan molemmista kiintiöistä. JSON-rajajohto sisältää Base64-yläkustannukset 32 MiB:n dekoodatun syötteen katolle. Jokainen tallennettu johdannainen tallentaa validoidun JPEG-muotonsa/resoluutionsa, näytteenottopolitiikkansa, johdannaisversion, luomisajan, palvelimen laskeman sisällön tiivisteen ja tiivistetyn vanhemman viitteen sekä luotetun kutsujan vanhemman sisällön tiivisteen. Peruutus tarkistetaan asynkronisten dekoodaus-/tiivistysvaiheiden välillä ennen atomista välimuistin sitoutumista.

Tämä erä ei vielä yhdistä tuotantotuottajaa reittiin eikä tarjoa moniresoluutioista variantinvalintaa. Läpinäkyvä Video Bridge -pyyntöpolku ei siksi aiheuta lisätyötä, kun taas vuokralaiskohtainen pääperiaatteen johtaminen ja täysi FU-08 moniresoluutioinen elinkaari pysyvät nimenomaisena jatkotyönä sen sijaan, että ne olisi dokumentoitu valmiiksi toiminnoksi.

Kuvat tekstitetään peräkkäin määritetyn Video-mallin mukaisesti. Tyhjä Video-ohitus perii Vision-asetuksen; jos molemmat ovat tyhjiä, Vision-automaattireititin valitsee tehokkaan näkökykyisen mallin. Onnistuneet kuvatekstit korvaavat alkuperäisen osan vakaalla `[Video description:` -etuliitteellä, joka myös merkitsee tekstin epäluotettavaksi mediasta johdetuksi havainnoksi ja kehottaa alavirran malleja olemaan noudattamatta mediasta löytyviä ohjeita. Kuva-tekstityksen välimuistin avaimet sisältävät JPEG-tavuja, kehotteen, aikaleiman ja tehokkaan mallin; vain onnistuneet kuvatekstit tallennetaan välimuistiin. Välimuistin merkinnät säilyttävät todellisen onnistuneen tuottajamallin, mukaan lukien varamallin; silta ilmoittaa `mixed`, kun eri kehykset on tuotettu eri malleilla. Välimuistiosuma käyttää uudelleen kyseistä tuottajan identiteettiä sen sijaan, että se nimitettäisiin uudelleen pyydetyksi reitityssuunnitelmaksi. Koko videon tulosvälimuisti on avainnettu jokaisen syötteen perusteella, joka muuttaa tulostetta — kehote, tehokas malli, näytteenottopolitiikka, kehysten määrä, semanttisen analyysin tila, normalisoidun tarkennusvihjeen SHA-256-sormenjälki, tarkennusikkuna, `transcript`, `audioTranscript` ja yhteystietolomakkeen lippu — joten minkä tahansa näiden ulottuvuuksien muuttaminen on välimuistihuti, ei koskaan vanhentunut uudelleenkäyttö. Visuaalisen dedup-politiikan versio, kynnysarvo ja rajattu ehdokaskehysten määrä ovat myös eksplisiittisiä tulosvälimuistin avaimessa ja metatiedoissa; politiikan muutos ei siksi voi käyttää uudelleen vanhentunutta koko videon kuvausta. Tulosvälimuistin v4-metatiedot säilyttävät tilan ja sormenjäljen, eivät koskaan raakaa käyttäjän tehtävää. Suojakaiteen metatiedot raportoivat sekä pyydetyt että tehokkaat analyysitilat; pyydetty `focused`-tila ilman käyttökelpoista käyttäjätekstiä raportoidaan tehokkaasti `full`.

Suojakaide poimii kaikki tuetut video-osat, mutta kuvaa enintään `modalityBridgeVideoMaxVideos`. Kohteelle, jonka on todistettu olevan `supportsVideo === false`, epäonnistuneet ja ylisuuret videot muuttuvat eksplisiittisiksi turvallisiksi tekstimerkeiksi, jotta raakaa videota ei säily. Kun ominaisuus on tuntematon, nämä osat pysyvät koskemattomina. Kohteet, joilla on `supportsVideo === true`, ohittavat sillan. Asiakkaan pyynnön keskeytyssignaali leviää latauksen, välittäjäjonon, aliprosessien ja kuvatekstikutsujen kautta; keskeytykset pysähtyvät videoiden välillä eivätkä koskaan epäonnistu avautumaan raakaan mediaan.

Ajonaikaiset asetukset ovat DB-pohjaisia ja Zod-validoituja:

| Key                                 | Default     | Alue / toiminta                                                                                             |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Valinnainen ajonaikainen, opt-in                                                                            |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` säilyttää yleiset kuvatekstit; `focused` käyttää rajattua, epäluotettavaa uusinta käyttäjäkontekstia |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                        |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` tai suhteellinen `segment_aware`; ilmaisimen vika palautuu `uniform`iin            |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                         |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                              |

Vanhat tallennetut videon aikakatkaisu-arvot yli 120 sekunnin rajataan välittäjän määräaikaan; uudet asetuskirjoitukset tämän rajan yli hylätään. `GET /api/modality-bridge/video/runtime` vaatii luotetun leimatun takaisinkytkentäpaikallisuuden ennen todennusta tai ajonaikaista tarkistusta, ja sen jälkeen hallintatodennuksen. Se palauttaa vain `available`, puhdistetut FFmpeg/ffprobe-versiot ja kiinteän syyn, kun ajonaikainen ympäristö ei ole käytettävissä. Sisäinen poimintapäätepiste ei ole julkinen lataus-API: jonon kyllästyminen palauttaa `503` plus `Retry-After`, soittajan katkaisu palauttaa `499`, ja kiinteä välittäjän määräaika palauttaa `504`. Muunnetut vastaukset lisäävät `video->text;model=<visionModel>;parts=<videos>` keskitettyyn `x-omniroute-modality-bridge`-otsakkeeseen poistamatta Vision- tai Audio-segmenttejä.

### PII-maskaaja (`piiMasker.ts`)

Käynnistyy **molemmissa** vaiheissa.

- **`preCall`** kloonaa hyötykuorman, käy läpi `system`, `messages`, `input` ja `prompt` (mukaan lukien pelkät merkkijono-kohteet) ja soveltaa `processPII()`-funktiota (tiedostosta `@/shared/utils/inputSanitizer`) merkkijono `content`/`text`-kenttiin. Kun `PII_REDACTION_ENABLED=true`, havaittu PII redaktoidaan lähtevästä hyötykuormasta. Tämä on riippumaton `INPUT_SANITIZER_MODE`-asetuksesta (joka ohjaa vain kehotteen injektiopolitiikkaa). Kun redaktointi on pois päältä, kutsu tallentaa havaintomäärät ilman sisällön uudelleenkirjoitusta.
- **`postCall`** tekee syväkloonin vastauksesta, suorittaa `sanitizePIIResponse()`-funktion sekä Responses-API-muotoisen maskaajan (`maskResponsesOutput` — kattaa `output_text` ja `output[].content[].text`). Jos redaktointia tapahtuu, muokattu vastaus korvaa alkuperäisen.

Suojakaide ei koskaan estä; se vain annotoi (`meta.detections`, `meta.redacted`) tai kirjoittaa uudelleen.

### Kehotteen injektio (`promptInjection.ts`)

Havaitsee haitallisia rakenteita käyttäjän syöttämässä sisällössä ja panee täytäntöön määritetyn käytännön. Toimintaa ohjaavat ympäristömuuttujat ja konstruktorin asetukset:

| Asetus     | Ympäristömuuttuja                                                                                      | Oletus | Vaikutus                                                                                                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Käytössä   | `INPUT_SANITIZER_ENABLED`                                                                              | `true` | Kun `false`, suojakaide ohittaa toiminnon.                                                                                                                                                              |
| Tila       | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                        | `warn` | Injektiokäytäntö: `block`, `warn` tai `log`. (`redact` hyväksytään taaksepäin yhteensopivuuden vuoksi, mutta se **ei** poista injektiotekstiä; PII-uudelleenkirjoitusta ohjaa `PII_REDACTION_ENABLED`.) |
| Estokynnys | `blockThreshold` -asetus / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Estämiseen vaadittava vähimmäisvakavuus. Keskivakavuus on oletuksena vain tarkkailutilassa.                                                                                                             |

**Tilan etusija** (`getMode`): kutsujan `options.mode` →
`INJECTION_GUARD_MODE` **tietokannan ominaisuuslipun ohitus** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` ympäristömuuttuja → `INPUT_SANITIZER_MODE` ympäristömuuttuja →
`warn`. Kojelaudan ohitus voittaa siis ympäristömuuttujat, joten ominaisuuslippujen käyttöliittymä
ohjaa käynnissä olevaa suojaa reaaliaikaisesti (ei uudelleenkäynnistystä). Tietokannan luku on vikasietoinen:
jos se epäonnistuu, suoja palautuu ympäristömuuttujiin perustuvaan toimintaan, ja jos ohitusta ei ole asetettu,
toiminta on identtinen vain ympäristömuuttujiin perustuvan ratkaisun kanssa.

Tunnistuslähteet:

1.  `sanitizeRequest()` osoitteesta `@/shared/utils/inputSanitizer` (jaettu tunnistinsarja, jota käytetään muualla putkessa).
2.  Sisäänrakennetut `DEFAULT_GUARD_PATTERNS` (tällä hetkellä `system_override_inline` ja
    `markdown_system_block`, molemmat `high` vakavuusasteella).
3.  Valinnaiset `customPatterns`, jotka välitetään konstruktorin asetusten kautta (merkkijonot, regex tai
    `{ name, pattern, severity }` -tietueet).

Kun `mode === "block"` **ja** vähintään yksi tunnistus täyttää vakavuuskynnyksen,
`preCall` palauttaa `{ block: true, message: "Request rejected: suspicious content detected" }`.
`warn`/`log`-tiloissa suojakaide kirjaa tapahtuman, mutta sallii kutsun. Jaettu apufunktio
`evaluatePromptInjection()` on myös viety ulos kutsujille, jotka tarvitsevat kehotteiden arviointia
rekisterin kautta kulkematta.

**Skannausraja (v3.8.20):** tunnistin tarkastaa vain yhdistetyn kehotetekstin **ensimmäiset 16 KB**
— `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 tavua) tiedostossa
`src/shared/utils/inputSanitizer.ts`. Sekä `detectInjection()` että `evaluatePromptInjection()`
käyttävät `slice(0, MAX_INJECTION_SCAN_BYTES)` ennen kuviosilmukan suorittamista.
Injektiokäskyt sijaitsevat syötteen yläosassa, joten tämä rajoittaa regexin suorittimen/roskankeruun
kuormitusta satojen kilotavujen kokoisilla hyötykuormilla heikentämättä tunnistusta (vrt. #3932, #4041).

### Tunnistetietojen peittäjä (`credentialMasker.ts`)

Käynnistyy **molemmissa** vaiheissa, viimeisenä oletusketjussa (prioriteetti `95`). Poistaa
tunnetut API-avain- / salaisen tunnuksen kuviot lähtevästä hyötykuormasta (viestin sisältö,
työkalukutsun argumentit, työkalun tulokset) **ja** palveluntarjoajan vastauksesta, jotta
kehotteeseen liitetty tunnistetieto (tai työkalun tuloksena takaisin kaikuva) ei vuoda
ylävirran palveluntarjoajalle tai takaisin asiakkaalle.

- **Vain valinnainen**, sama käytäntö kuin PII-sensuroinnissa (Hard Rule #20:n vieressä):
  poissa käytöstä, ellei `settings.credentialRedactionEnabled === true` **tai**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kun se on pois päältä, suojakaide ei tee mitään –
  se ei koskaan estä eikä koskaan uudelleenkirjoita.
- `redactCredentials()` käy läpi koko hyötykuorma-/vastauspuun (`walkValue()`,
  prototyyppisaasteelta turvallinen, sykliturvallinen `WeakSet`:in kautta) ja korvaa
  vastaavuudet `[REDACTED:<type>]` -paikkamerkillä, kloonaten vain ne haarat, jotka
  todella muuttuivat.
- `CREDENTIAL_PATTERNS` kattaa LLM-palveluntarjoajien avaimet (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS-tunnukset (GitHub, Slack, Linear,
  Notion, npm, Postman, Discord), maksuavaimet (Stripe, Square), pilviavaimet (AWS access key,
  Twilio, SendGrid, Mailgun), yksityiset avaimet / JWT:t, tunnistetietoja sisältävät
  yhteysmerkkijonot (`mongodb://user:pass@...`, jne.) ja yleisen
  `Authorization`/`x-api-key`/`api-key`/`apikey` -otsikkoarvokuvion. Otsikkomuotoiset avaimet
  (`authorization`, `x-api-key`, `api-key`, `apikey`) sensuroidaan rakenteellisesti (vain arvo,
  skeeman etuliite kuten `Bearer `/`Basic ` säilytetään) yleisen tekstiregexin sijaan.
- Suojakaide ei koskaan estä; se vain uudelleenkirjoittaa (`modifiedPayload` /
  `modifiedResponse`) ja annotoi (`meta.credentialsRedacted`, `meta.count`).

Regressiotesti: `tests/unit/credential-masker-guardrail.test.ts`.

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
