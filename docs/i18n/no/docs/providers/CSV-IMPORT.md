# Import providers from a CSV or JSON file (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Kontrollpanel → Leverandører → **Importer fra fil** oppretter API-nøkkeltilkoblinger fra en CSV- eller JSON-liste. Hver rad kan bruke en forskjellig leverandør. Delvis feil er forventet: Gyldige rader importeres selv om andre mislykkes, og dialogboksen viser hvorfor de mislykkede radene ble avvist.

Denne importen oppretter **ikke** nye OpenAI/Anthropic-kompatible endepunktnoder. Opprett disse først (Kontrollpanel → Leverandører → Legg til OpenAI-kompatibel, eller `omniroute nodes add`), og importer deretter rader der kolonnen `provider` er nodens id. En `baseUrl` per rad kan fortsatt overstyre nodens URL.

## CSV (posisjonsbasert)

Kolonnenavnene er kun kosmetiske. Parseren deler opp hver rad og destrukturerer etter indeks:

| Indeks | Felt       | Obligatorisk | Merknader                                                                                                                                          |
| ------ | ---------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0      | `provider` | ja           | Eksisterende administrert leverandør-id (`openai`, `anthropic`, …) **eller** id-en til en allerede registrert OpenAI/Anthropic-kompatibel **node** |
| 1      | `name`     | ja           | Visningsnavn for tilkoblingen                                                                                                                      |
| 2      | `apiKey`   | ja           | API-nøkkel                                                                                                                                         |
| 3      | `baseUrl`  | nei          | URL-overstyring per rad                                                                                                                            |
| 4      | `priority` | nei          | Heltall fra 1 til 100                                                                                                                              |

En første linje der den første kolonnen er det bokstavelige ordet `provider` (uavhengig av store og små bokstaver), hoppes over som overskrift. Tomme linjer og `#`-kommentarer hoppes over.

Last ned en startfil fra importdialogboksen (**Last ned CSV-mal**). Eksempel:

```csv
# OmniRoute-leverandørimport (posisjonsbaserte kolonner)
provider,name,apiKey,baseUrl,priority
openai,OpenAI-produksjon,sk-your-openai-key,,1
```

En oppdiktet id som `openai-compatible-chat-001` er ikke en node. API-et returnerer `Ukjent eller ikke-støttet leverandør` for denne raden. Dialogboksen viser meldingen ved siden av radnavnet.

## JSON

En JSON-tabell med objekter som har de samme feltene (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`). I motsetning til CSV har JSON navngitte nøkler.

```json
[
  {
    "provider": "openai",
    "name": "OpenAI-produksjon",
    "apiKey": "sk-your-openai-key",
    "priority": 1
  }
]
```
