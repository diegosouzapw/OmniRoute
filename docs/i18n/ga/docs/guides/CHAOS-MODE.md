# Chaos Mode (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Painéal:** **Mód Anordúil** (barra taoibh) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (seisiún painéil) · `POST /api/skills/collect/chaos` (eochair API)  
> **Foinse:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Seolann Mód Anordúil **tasc amháin chuig roinnt soláthraithe ag an am céanna** — cuireann gach soláthraí rannpháirteach
ásc samhla amháin ar fáil, agus faigheann tú na freagraí go léir taobh le taobh (nó i slabhra). Is
comhéadan rite ilsamhla é, ní straitéis ródaithe: ní dhéanann sé difear riamh do do ghnáththrácht
`/v1/chat/completions`.

**Soiléiriú — seoltar trí rud éagsúla a bhfuil "chaos" ina n-ainm:**

| Rud                       | Cad atá ann                                                                                                                                | Cá bhfuil sé doiciméadaithe                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Mód Anordúil**          | Leathanach an phainéil + an API a ndéantar cur síos orthu anseo: dáil tasc amháin ar go leor soláthraithe (comhthreomhar nó comhoibríoch). | An treoir seo                                |
| `auto/chaos`              | Aitheantas samhla Auto-Combo le hualuithe scórála insteallta lochta, le haghaidh tástáil athléimneachta. Níl aon rud le cumrú.             | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Cumraíocht teaglama chaos | Teaglama marthanach ina ndáileann `config.chaos.enabled` an tasc ar phainéal le samhail bhreithimh roghnach (API amháin).                  | `open-sse/services/autoCombo/chaosEngine.ts` |

## Socrú

1. Oscail **Painéal → Mód Anordúil** (`/dashboard/chaos`).
2. Cuir **ar siúl** é — seoltar Mód Anordúil **díchumasaithe de réir réamhshocraithe** (`enabled: false` in
   `src/lib/chaos/chaosConfig.ts`). Agus é díchumasaithe, freagraíonn `POST /api/chaos/run` le
   `400 — "Níl Mód Anordúil cumasaithe. Cumasaigh é in Painéal → Mód Anordúil."`.
3. Roghnaigh na rannpháirtithe agus na réamhshocruithe (arna gcoinneáil do gach ásc tríd an stór socruithe):

   | Réimse              | Brí                                                                             | Réamhshocrú / teorainneacha                     |
   | ------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------- |
   | `enabled`           | Máistirlasc                                                                     | `false`                                         |
   | `defaultMode`       | `parallel` nó `collaborative` (féach thíos)                                     | `parallel`                                      |
   | `providerOverrides` | Rannpháirtíocht de réir soláthraí (`providerId`, `modelId` roghnach, `enabled`) | folamh = gach soláthraí gníomhach, uasmhéid 200 |
   | `systemPrompt`      | Sárú ar leid chórais ionsuite Chaos                                             | roghnach, uasmhéid 10 000 carachtar             |
   | `timeoutMs`         | Uas-am do gach glao samhla                                                      | `120000` (5 000–600 000)                        |
   | `maxTokens`         | `max_tokens` do gach glao samhla                                                | `4096` (256–128 000)                            |

4. Rith **tástáil ón leathanach féin** — taispeánann painéal na dtorthaí freagra,
   stádas agus fad gach soláthraí.

## Móid rite

- **`parallel`** — faigheann gach samhail an tasc céanna go comhuaineach; faigheann tú gach freagra
  go neamhspleách.
- **`collaborative`** — ritear na samhlacha **i slabhra**: feiceann gach ceann acu aschur na samhla roimhe sin agus
  iarrtar uirthi é a bheachtú, a leathnú, a cháineadh nó rogha eile a thairiscint. Comhcheanglaíonn réimse `summary`
  an fhreagra na haschuir rathúla in ord an tslabhra (ní bhíonn `summary` ag rití comhthreomhara).

## API

### `POST /api/chaos/run` — seisiún painéil

Fíordheimhnithe le fianán (an seisiún bainistíochta — féach
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); úsáideann leathanach an phainéil é.

```jsonc
// corp
{
  "task": "Cuir chuige i leith X i gcomparáid", // riachtanach
  "providers": ["glm", "kimi"], // scagaire roghnach
  "mode": "parallel", // roghnach — sáraíonn sé defaultMode
  "systemPrompt": "…", // sárú roghnach
  "maxTokens": 4096, // sárú roghnach
}
```

### `POST /api/skills/collect/chaos` — eochair API

Leagan comhartha iompróra do ghlaoiteoirí seachtracha. Ní mór don eochair an **cead Mód Anordúil**
(`chaosModeEnabled`) a bheith aici, atá **múchta de réir réamhshocraithe** — cumasaigh é do gach eochair in
**Painéal → Bainisteoir API → cuir eochair in eagar → ceadanna → Mód Anordúil**. An corp céanna agus atá thuas.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Cuir chuige i leith X i gcomparáid","mode":"parallel"}'
```

Tugann an dá chríochphointe an struchtúr céanna ar ais:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // mód comhoibríoch amháin
}
```

## Fabhtcheartú

- **`400 Níl Mód Anordúil cumasaithe`** — céim 2 thuas: tá an lasc domhanda múchta.
- **Diúltaítear don eochair API ar `/api/skills/collect/chaos`** — níl an cead
  `chaosModeEnabled` ag an eochair (múchta de réir réamhshocraithe; is socrú é seo, ní earráid).
- **Tá soláthraí a raibh tú ag súil leis ar iarraidh ó na torthaí** — seiceáil `providerOverrides` ar leathanach
  Mhód Anordúil (fágann sárú díchumasaithe ar lár é) agus seiceáil an bhfuil nasc an tsoláthraí
  gníomhach.
