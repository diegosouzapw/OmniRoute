# Chaos Mode (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Pẹpẹ Ìṣàkóso:** **Ipo Chaos** (ọ̀pá ẹ̀gbẹ́) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (ìgbà ìṣiṣẹ́ pẹpẹ ìṣàkóso) · `POST /api/skills/collect/chaos` (kọ́kọ́rọ́ API)  
> **Orísun:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Ipo Chaos máa ń fi **iṣẹ́ kan ránṣẹ́ sí ọ̀pọ̀ olùpèsè lẹ́ẹ̀kan náà** — olùpèsè kọ̀ọ̀kan tó kópa
máa ń ṣàfikún àpẹẹrẹ model kan, o sì máa rí gbogbo àwọn ìdáhùn lẹ́gbẹ̀ẹ́ ara wọn (tàbí ní ẹ̀wọ̀n). Ó jẹ́
ojú-ọ̀nà ìṣiṣẹ́ model-púpọ̀, kì í ṣe ọgbọ́n ìtọ́sọ́nà: kò ní ipa lórí ìrìnàjò `/v1/chat/completions`
deede rẹ rárá.

**Ìyàtọ̀-kedere — ohun mẹ́ta ọ̀tọ̀ọ̀tọ̀ ni a pèsè pẹ̀lú "chaos" nínú orúkọ wọn:**

| Nǹkan             | Ohun tí ó jẹ́                                                                                                                | Ibi tí a ti ṣàkọsílẹ̀ rẹ̀                      |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Ipo Chaos**     | Ojú-ìwé pẹpẹ ìṣàkóso + API tí a ṣàlàyé níbí: pín iṣẹ́ kan sí ọ̀pọ̀ olùpèsè (ní ìṣọ̀kan tàbí ní ìfọwọ́sowọ́pọ̀).                    | Ìtọ́sọ́nà yìí                                  |
| `auto/chaos`      | Id model Auto-Combo kan pẹ̀lú àwọn ìwọ̀n ìṣírò ìfí-àṣìṣe-sínú-ètò, fún ìdánwò agbára ìfaradà. Kò sí ohun tí a nílò láti ṣètò. | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Àtòpọ̀ ìṣètò Chaos | Àtòpọ̀ tí a tọ́jú pẹ̀lú `config.chaos.enabled` máa ń pín sí panẹli kan pẹ̀lú model adájọ́ àṣàyàn (API-nìkan).                    | `open-sse/services/autoCombo/chaosEngine.ts` |

## Ìṣètò

1. Ṣí **Pẹpẹ Ìṣàkóso → Ipo Chaos** (`/dashboard/chaos`).
2. Tan-an — Ipo Chaos wà ní **pípà nípa àìyípadà** (`enabled: false` nínú
   `src/lib/chaos/chaosConfig.ts`). Nígbà tí ó wà ní pípà, `POST /api/chaos/run` máa dáhùn
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Yan àwọn olùkópa àti àwọn àìyípadà (a tọ́jú wọn fún instance kọ̀ọ̀kan nípasẹ̀ ilé ìtọ́jú àwọn ìṣètò):

   | Ààyè                | Ìtumọ̀                                                                | Àìyípadà / àwọn ààlà                         |
   | ------------------- | -------------------------------------------------------------------- | -------------------------------------------- |
   | `enabled`           | Yíyípadà àgbà                                                        | `false`                                      |
   | `defaultMode`       | `parallel` tàbí `collaborative` (wo ìsàlẹ̀)                           | `parallel`                                   |
   | `providerOverrides` | Ìkópa fún olùpèsè kọ̀ọ̀kan (`providerId`, `modelId` àṣàyàn, `enabled`) | òfìfo = gbogbo olùpèsè tó ń ṣiṣẹ́, ó pọ̀jù 200 |
   | `systemPrompt`      | Ìkọjá-ìṣètò fún ìtọ́sọ́nà ètò Chaos inú-ẹ̀rọ                            | àṣàyàn, ó pọ̀jù àmì-ọ̀rọ̀ 10 000                |
   | `timeoutMs`         | Àkókò tó pọ̀jù fún ìpè model kọ̀ọ̀kan                                   | `120000` (5 000–600 000)                     |
   | `maxTokens`         | `max_tokens` fún ìpè model kọ̀ọ̀kan                                    | `4096` (256–128 000)                         |

4. Ṣe **ìdánwò láti ojú-ìwé náà fúnra rẹ̀** — panẹli àbájáde máa ń fi ìdáhùn olùpèsè kọ̀ọ̀kan,
   ipò àti iye àkókò hàn.

## Àwọn ipo ìṣiṣẹ́

- **`parallel`** — model kọ̀ọ̀kan máa gba iṣẹ́ kan náà ní àkókò kan náà; o máa gba gbogbo àwọn ìdáhùn
  lọ́tọ̀ọ̀tọ̀.
- **`collaborative`** — àwọn model máa ṣiṣẹ́ **ní ẹ̀wọ̀n**: ọ̀kọ̀ọ̀kan máa rí àbájáde model tó ṣáájú,
  a sì máa ní kó ṣàtúnṣe, mú un gbòòrò sí i, ṣàríwísí rẹ̀ tàbí pèsè ọ̀nà mìíràn. Ààyè `summary`
  nínú ìdáhùn máa ń so àwọn àbájáde tó ṣàṣeyọrí pọ̀ ní ìtòlẹ́sẹẹsẹ ẹ̀wọ̀n (àwọn ìṣiṣẹ́ parallel kò ní `summary`).

## API

### `POST /api/chaos/run` — ìgbà ìṣiṣẹ́ pẹpẹ ìṣàkóso

Ìjẹ́rìísí nípasẹ̀ cookie (ìgbà ìṣiṣẹ́ ìṣàkóso — wo
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); ojú-ìwé pẹpẹ ìṣàkóso ló máa ń lò ó.

```jsonc
// ara ìbéèrè
{
  "task": "Compare approaches to X", // ó pọn dandan
  "providers": ["glm", "kimi"], // àlẹ̀ àṣàyàn
  "mode": "parallel", // àṣàyàn — kọjá defaultMode
  "systemPrompt": "…", // ìkọjá-ìṣètò àṣàyàn
  "maxTokens": 4096, // ìkọjá-ìṣètò àṣàyàn
}
```

### `POST /api/skills/collect/chaos` — kọ́kọ́rọ́ API

Ẹ̀yà bearer-token fún àwọn olùpè òde. Kọ́kọ́rọ́ náà gbọ́dọ̀ ní **àṣẹ Ipo Chaos**
(`chaosModeEnabled`), èyí tí ó wà ní **pípà nípa àìyípadà** — tan-an fún kọ́kọ́rọ́ kọ̀ọ̀kan ní
**Pẹpẹ Ìṣàkóso → Olùṣàkóso API → ṣàtúnṣe kọ́kọ́rọ́ → àwọn àṣẹ → Ipo Chaos**. Ara ìbéèrè kan náà bí èyí tó wà lókè.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Àwọn endpoint méjèèjì máa ń dá irú ìrísí kan náà padà:

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
  "summary": "…", // fún ipo collaborative nìkan
}
```

## Yíyanjú àwọn ìṣòro

- **`400 Chaos Mode is not enabled`** — ìgbésẹ̀ 2 lókè: yíyípadà àgbáyé wà ní pípà.
- **A kọ kọ́kọ́rọ́ API sílẹ̀ lórí `/api/skills/collect/chaos`** — kọ́kọ́rọ́ náà kò ní àṣẹ
  `chaosModeEnabled` fún kọ́kọ́rọ́ kọ̀ọ̀kan (ó wà ní pípà nípa àìyípadà; ìṣètò ni èyí, kì í ṣe àṣìṣe).
- **Olùpèsè kan tí o retí kò sí nínú àwọn àbájáde** — ṣàyẹ̀wò `providerOverrides` lórí ojú-ìwé
  Ipo Chaos (ìkọjá-ìṣètò tí a pa máa yọ ọ́ kúrò) àti bóyá àsopọ̀ olùpèsè náà
  ń ṣiṣẹ́.
