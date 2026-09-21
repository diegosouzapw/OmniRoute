# Import providers from a CSV or JSON file (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Painéal → Soláthraithe → **Iompórtáil ó chomhad** cruthaíonn sé naisc eochair-API ó liosta CSV nó JSON. Is féidir le gach ró díriú ar sholáthraí difriúil. Glactar le teip pháirteach: iompórtáiltear rónna bailí fós nuair a theipeann ar chinn eile, agus liostaítear sa mhódalfhuinneog na cúiseanna ar diúltaíodh do na rónna ar theip orthu.

Ní chruthaíonn an t-iompórtáil seo nóid chríochphointe nua atá comhoiriúnach le OpenAI/Anthropic. Cruthaigh iad sin ar dtús (Painéal → Soláthraithe → Cuir ceann comhoiriúnach le OpenAI leis, nó `omniroute nodes add`), ansin iompórtáil rónna arb é id an nóid sin atá sa cholún `provider`. Is féidir le `baseUrl` in aghaidh an ró URL an nóid a shárú fós.

## CSV (de réir suímh)

Níl aon tionchar feidhmiúil ag ainmneacha na gcolún. Roinneann an parsálaí gach ró agus dístruchtúrálann sé de réir innéacs:

| Innéacs | Réimse     | Riachtanach | Nótaí                                                                                                                                                 |
| ------- | ---------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0       | `provider` | tá          | id soláthraí bainistithe atá ann cheana (`openai`, `anthropic`, …) **nó** id **nóid** atá comhoiriúnach le OpenAI/Anthropic agus atá cláraithe cheana |
| 1       | `name`     | tá          | Ainm taispeána an naisc                                                                                                                               |
| 2       | `apiKey`   | tá          | Eochair API                                                                                                                                           |
| 3       | `baseUrl`  | níl         | Sárú URL in aghaidh an ró                                                                                                                             |
| 4       | `priority` | níl         | Slánuimhir 1–100                                                                                                                                      |

Má tá an focal litriúil `provider` (i gcás ar bith) sa chéad cholún den chéad líne, scipeáiltear í mar cheanntásc. Scipeáiltear línte bána agus nótaí tráchta `#`.

Íoslódáil comhad tosaithe ón módalfhuinneog iompórtála (**Íoslódáil teimpléad CSV**). Sampla:

```csv
# Iompórtáil soláthraithe OmniRoute (colúin de réir suímh)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

Ní nód é id cumtha amhail `openai-compatible-chat-001`. Tugann an API `Unknown or unsupported provider` ar ais don ró sin; taispeánann an mhódalfhuinneog é in aice le hainm an ró.

## JSON

Eagar JSON d’oibiachtaí leis na réimsí céanna (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`). Murab ionann agus CSV, tá ainmneacha ar eochracha JSON.

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
