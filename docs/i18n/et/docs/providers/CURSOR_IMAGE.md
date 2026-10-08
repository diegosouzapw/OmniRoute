# Cursor Image Generation (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute pakub Cursor plaani **pildigenereerimist** aadressil `POST /v1/images/generations`, kasutades sama teenusepakkuja ID-d nagu vestluse puhul: `cursor` (alias `cu`).

| Väli                 | Väärtus                                                                                        |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS` ID | `cursor`                                                                                       |
| Vorming              | `cursor-agent-image`                                                                           |
| Autentimine          | Sama OAuthi/API-võtme ühendus nagu vestluse puhul (`provider_connections.provider = "cursor"`) |
| Mudelid              | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                      |

## Miks Agent CLI?

Cursori vestlus OmniRoutes kasutab teenust `agent.v1.AgentService/Run` (protobuf). See tee **lükkab tagasi** sisseehitatud klienditööriistad (shell, write, …). Pildigenereerimine on Cursori omatööriist, mida **`agent` CLI** käitab kasutajakonto litsentsi alusel. Seetõttu käivitab pilditöötleja `agent`-i lukustatud viiba ja iga päringu jaoks loodud ajutise tööruumiga (sama ülesehitusega nagu kogukonna kasutajakonto sillad) ning tagastab seejärel OpenAI-ga ühilduva `b64_json`-i.

## Juurdepääsupiirang (ranged reeglid nr 15 ja 17)

See on ainus `IMAGE_PROVIDERS`-i vorming, mis käivitab alamprotsessi (`agent`-i
binaarfaili). Kuna `POST /v1/images/generations` on jagatud ligikaudu 40 muu,
alamprotsesse mittekäivitava pilditeenuse pakkujaga, mida kaugkutsujad õiguspäraselt
kasutavad, ei ole kogu marsruut liigitatud kategooriasse `LOCAL_ONLY` — selle asemel
rakendab `handleCursorAgentImageGeneration` oma pääsukontrolli, kasutades usaldusväärset
`AUTHZ_HEADER_PEER_LOCALITY` otsust, mille autoriseerimiskonveier lisab igale päringule
(tegeliku TCP-võrdseadme põhjal, mitte kunagi võltsitava `Host`-päise põhjal): ainult
`loopback`- ja `lan`-kutsujad võivad alamprotsessi käivitamiseni jõuda; kõik teised
(sealhulgas avaliku tunneli kaudu lekkinud API-võtme taaskasutajad) saavad vastuseks
`403` enne mis tahes identimisteabe otsingut või protsessi käivitamist. Sama poliitikat,
mida rakendatakse ülejäänud `LOCAL_ONLY` tasemele, vaadake failist
`src/server/authz/policies/management.ts`.

## Samaaegsuse pääsukontroll on moodulitasemel (ühe eksemplari piirang)

`CURSOR_IMG_MAX_CONCURRENT` jõustatakse mälusisese loenduri/järjekorraga, mille ulatus
piirdub Node'i mooduli eksemplariga
(`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
See piirab õigesti samaaegseid `agent`-i käivitusi ühe OmniRoute'i protsessi sees, kuid
**ei** koordineeri mitut protsessi/eksemplari, mis jagavad sama Cursori kasutajakohta
(nt mitme replikaga juurutus) — iga eksemplar rakendab oma sõltumatut piirangut.
Ühe eksemplariga juurutuse puhul (vaikeseade) on piirang täpne; horisontaalselt
skaleeritud juurutustes tuleks hoida `CURSOR_IMG_MAX_CONCURRENT` väärtus iga eksemplari
kohta konservatiivsena või suunata Cursori pildiliiklus ühte eksemplari.

## Nõuded

1. Juhtpaneelil ühendatud Cursori konto (OAuth või `crsr_…` API-võti).
2. Cursori Agenti binaarfail peab olema OmniRoute'i protsessile kättesaadav:
   - keskkonnamuutuja `CURSOR_AGENT_BIN=/path/to/agent`, või
   - `~/.local/bin/agent`, või
   - `providerSpecificData.agentBin` Cursori ühenduses.

Valikuline häälestamine:

| Keskkonnamuutuja            | Vaikeväärtus             | Tähendus                                       |
| --------------------------- | ------------------------ | ---------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                 | Ühe pildi maksimaalne täitmisaeg               |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                      | Jagatud kasutajakoha samaaegsuse pääsukontroll |
| `CURSOR_IMG_MODEL`          | (päringu mudel / `auto`) | CLI suvandi `--model` alistamine               |

## Näide

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Genereerimine võtab tavaliselt 1–2 minutit. Eelistage sisevõrgu ühendusteed; ligikaudu 100-sekundilise ajalõpuga servaproksid põhjustavad nurjumise.

## LiteLLM

Registreerige pildimudel väärtustega `mode: image_generation`, `api_base: http://omniroute:20128/v1` ja `model: openai/cursor/auto` (või lihtsalt `cursor/auto`, olenevalt teie LiteLLM-i versioonist).
