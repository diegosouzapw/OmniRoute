# Import providers from a CSV or JSON file (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashibodi → Watoa huduma → **Leta kutoka kwenye faili** huunda miunganisho ya funguo za API kutoka kwenye orodha ya CSV au JSON. Kila safu inaweza kulenga mtoa huduma tofauti. Kufeli kwa sehemu ni sehemu ya makubaliano: safu halali bado huletwa hata nyingine zikifeli, na dirisha linaorodhesha sababu zilizofanya safu zilizofeli zikataliwe.

Uletaji huu **hauundi** nodi mpya za endpoint zinazooana na OpenAI/Anthropic. Ziunde kwanza (Dashibodi → Watoa huduma → Ongeza Inayooana na OpenAI, au `omniroute nodes add`), kisha ulete safu ambazo safu wima ya `provider` ina id ya nodi hiyo. `baseUrl` ya kila safu bado inaweza kubatilisha URL ya nodi.

## CSV (kulingana na nafasi)

Majina ya safu wima ni ya mwonekano tu. Kichanganuzi hugawanya kila safu na kuitenganisha kulingana na faharasa:

| Faharasa | Sehemu     | Inahitajika | Maelezo                                                                                                                             |
| -------- | ---------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 0        | `provider` | ndiyo       | Id ya mtoa huduma anayesimamiwa (`openai`, `anthropic`, …) **au** id ya **nodi** iliyosajiliwa tayari inayooana na OpenAI/Anthropic |
| 1        | `name`     | ndiyo       | Jina la muunganisho linaloonyeshwa                                                                                                  |
| 2        | `apiKey`   | ndiyo       | Ufunguo wa API                                                                                                                      |
| 3        | `baseUrl`  | hapana      | Ubatilishaji wa URL kwa kila safu                                                                                                   |
| 4        | `priority` | hapana      | Nambari kamili 1–100                                                                                                                |

Mstari wa kwanza ambao safu yake ya kwanza ni neno halisi `provider` (bila kujali herufi kubwa au ndogo) hurukwa kama kichwa. Mistari tupu na maoni ya `#` hurukwa.

Pakua faili ya kuanzia kutoka kwenye dirisha la uletaji (**Pakua kiolezo cha CSV**). Mfano:

```csv
# Uletaji wa watoa huduma wa OmniRoute (safu wima kulingana na nafasi)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

Id ya kubuniwa kama `openai-compatible-chat-001` si nodi. API hurejesha `Unknown or unsupported provider` kwa safu hiyo; dirisha huionyesha karibu na jina la safu.

## JSON

Safu ya JSON ya vipengee vyenye sehemu zilezile (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`). Tofauti na CSV, funguo za JSON zina majina.

```json
[
  {
    "provider": "openai",
    "name": "Prod OpenAI",
    "apiKey": "sk-your-openai-key",
    "priority": 1
  }
]
```
