# Cursor Image Generation (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute tarjoaa Cursor-tilauksen **kuvien luonnin** reitissä `POST /v1/images/generations` samalla palveluntarjoajatunnuksella kuin keskustelussa: `cursor` (alias `cu`).

| Kenttä                   | Arvo                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS`-tunnus | `cursor`                                                                                    |
| Muoto                    | `cursor-agent-image`                                                                        |
| Todennus                 | Sama OAuth-/API-avainyhteys kuin keskustelussa (`provider_connections.provider = "cursor"`) |
| Mallit                   | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                   |

## Miksi Agent CLI:tä käytetään

OmniRouten Cursor-keskustelu käyttää rajapintaa `agent.v1.AgentService/Run` (protobuf). Tämä reitti **hylkää** sisäänrakennetut asiakastyökalut (shell, write, …). Kuvien luonti on Cursorin oma työkalu, jonka **`agent` CLI** suorittaa lisenssipaikkaa vasten. Kuvankäsittelijä käynnistää siksi `agent`-prosessin lukitulla kehotteella ja pyyntökohtaisella tilapäisellä työtilalla (samalla rakenteella kuin yhteisön lisenssipaikkasillat) ja palauttaa sitten OpenAI-yhteensopivan `b64_json`-arvon.

## Käyttörajoitus (kiinteät säännöt #15 + #17)

Tämä on ainoa `IMAGE_PROVIDERS`-muoto, joka käynnistää aliprosessin (`agent`-
binääritiedoston). Koska `POST /v1/images/generations` on noin 40 muun sellaisen
kuvapalveluntarjoajan yhteiskäytössä, jotka eivät käynnistä prosesseja ja joita etäkutsujat käyttävät perustellusti, koko reittiä **ei**
luokitella `LOCAL_ONLY`-tasolle. Sen sijaan `handleCursorAgentImageGeneration` käyttää omaa
portinvartijaansa hyödyntämällä luotettua `AUTHZ_HEADER_PEER_LOCALITY`-päätöstä, jonka valtuutusputki lisää
jokaiseen pyyntöön (todellisen TCP-vertaisjärjestelmän perusteella, ei koskaan väärennettävissä olevan `Host`-otsakkeen perusteella): vain
`loopback`- ja `lan`-kutsujat voivat käynnistää prosessin; kaikki muut (mukaan lukien vuotaneella
API-avaimella julkisen tunnelin kautta toistetut pyynnöt) saavat vastauksen `403` ennen tunnistetietojen hakua tai
prosessin käynnistämistä. Katso tiedostosta `src/server/authz/policies/management.ts` sama
käytäntö, jota sovelletaan muuhun `LOCAL_ONLY`-tasoon.

## Samanaikaisuusportti on moduulitasoinen (yhden instanssin rajoitus)

`CURSOR_IMG_MAX_CONCURRENT` toteutetaan muistin sisäisellä laskurilla/jonolla, jonka käyttöalueena on
Node-moduulin instanssi (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
Se rajoittaa oikein samanaikaisia `agent`-prosessien käynnistyksiä yhdessä OmniRoute-prosessissa, mutta se
**ei** koordinoi useita prosesseja/instansseja, jotka jakavat saman Cursor-lisenssipaikan
(esimerkiksi usean replikan käyttöönotossa) — jokainen instanssi käyttää omaa itsenäistä rajoitustaan.
Yhden instanssin käyttöönotossa (oletus) rajoitus on tarkka; vaakasuunnassa skaalatuissa
käyttöönotossa `CURSOR_IMG_MAX_CONCURRENT` kannattaa pitää maltillisena kussakin instanssissa tai ohjata
Cursor-kuvaliikenne yhteen instanssiin.

## Vaatimukset

1. Hallintapaneelissa yhdistetty Cursor-tili (OAuth tai `crsr_…`-API-avain).
2. Cursor Agent -binääritiedoston on oltava OmniRoute-prosessin käytettävissä:
   - ympäristömuuttuja `CURSOR_AGENT_BIN=/path/to/agent`, tai
   - `~/.local/bin/agent`, tai
   - `providerSpecificData.agentBin` Cursor-yhteydessä.

Valinnainen hienosäätö:

| Ympäristömuuttuja           | Oletus                   | Merkitys                                   |
| --------------------------- | ------------------------ | ------------------------------------------ |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                 | Kuvakohtainen kokonaisaika                 |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                      | Jaetun lisenssipaikan samanaikaisuusportti |
| `CURSOR_IMG_MODEL`          | (pyynnön malli / `auto`) | Ohita CLI:n `--model`                      |

## Esimerkki

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Luonti kestää tavallisesti 1–2 minuuttia. Käytä mieluiten sisäistä verkkoreittiä; reunavälityspalvelimet, joiden aikakatkaisu on noin 100 sekuntia, epäonnistuvat.

## LiteLLM

Rekisteröi kuvamalli asetuksilla `mode: image_generation`, `api_base: http://omniroute:20128/v1` ja `model: openai/cursor/auto` (tai pelkkä `cursor/auto` LiteLLM-versiosi mukaan).
