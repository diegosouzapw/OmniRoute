# Import providers from a CSV or JSON file (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇧🇦 [bs](../../../bs/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Providers → **Bubata site na faịlụ** na-emepụta njikọ API-key site na ndepụta CSV ma ọ bụ JSON. Ahịrị ọ bụla nwere ike iji provider dị iche. Ọdịda n’akụkụ ụfọdụ bụ usoro a tụrụ anya ya: a ka na-ebubata ahịrị ndị ziri ezi mgbe ndị ọzọ dara, modal ahụ na-edepụtakwa ihe mere e ji jụ ahịrị ndị dara.

Mbubata a **anaghị** emepụta node endpoint ọhụrụ dakọtara na OpenAI/Anthropic. Buru ụzọ mepụta ha (Dashboard → Providers → Add OpenAI-Compatible, ma ọ bụ `omniroute nodes add`), wee bubata ahịrị ndị kọlụm `provider` ha bụ id nke node ahụ. `baseUrl` nke ahịrị ọ bụla ka nwekwara ike dochie URL nke node ahụ.

## CSV (dabere n’ọnọdụ)

Aha kọlụm bụ naanị maka ọdịdị. Parser ahụ na-ekewa ahịrị ọ bụla ma na-ekesa ụkpụrụ ya dịka index si dị:

| Index | Field      | Achọrọ | Nkọwa                                                                                                                               |
| ----- | ---------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| 0     | `provider` | ee     | id nke managed provider dị adị (`openai`, `anthropic`, …) **ma ọ bụ** id nke **node** dakọtara na OpenAI/Anthropic nke edebanyelarị |
| 1     | `name`     | ee     | Aha njikọ a ga-egosi                                                                                                                |
| 2     | `apiKey`   | ee     | API key                                                                                                                             |
| 3     | `baseUrl`  | mba    | URL nke ahịrị ahụ ga-eji dochie nke ndabara                                                                                         |
| 4     | `priority` | mba    | Nọmba zuru ezu 1–100                                                                                                                |

A na-amafere ahịrị mbụ ma ọ bụrụ na kọlụm mbụ ya bụ kpọmkwem okwu `provider` (n’agbanyeghị mkpụrụedemede ukwu ma ọ bụ nta), dịka header. A na-amaferekwa ahịrị ndị tọgbọ chakoo na comments `#`.

Budata faịlụ mmalite site na modal mbubata (**Budata ndebiri CSV**). Ọmụmaatụ:

```csv
# Mbubata provider OmniRoute (kọlụm ndị dabere n’ọnọdụ)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

id e chepụtara echepụta dịka `openai-compatible-chat-001` abụghị node. API ahụ na-eweghachi `Provider amaghi ma ọ bụ nke anaghị akwado` maka ahịrị ahụ; modal ahụ na-egosi ya n’akụkụ aha ahịrị ahụ.

## JSON

JSON array nke objects nwere fields ndị ahụ (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`). N’adịghị ka CSV, JSON keys nwere aha.

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
