# Chaos Mode (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Ọnọdụ Chaos** (ogwe akụkụ) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (nnọkọ dashboard) · `POST /api/skills/collect/chaos` (igodo API)  
> **Ebe koodu si:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Ọnọdụ Chaos na-eziga **otu ọrụ n'aka ọtụtụ ndị na-eweta ọrụ n'otu oge** — onye ọ bụla na-eweta ọrụ nke sonyere
na-etinye otu ihe nlereanya, ma ị ga-enweta azịza niile n'akụkụ ibe ha (ma ọ bụ n'usoro njikọ). Ọ bụ
ebe ọtụtụ ihe nlereanya na-arụ ọrụ, ọ bụghị atụmatụ ịhọrọ ụzọ: ọ dịghị mgbe ọ na-emetụta okporo ụzọ
`/v1/chat/completions` gị nkịtị.

**Nkọwa iji zere mgbagwoju anya — e nwere ihe atọ dị iche iche nwere "chaos" n'aha ha:**

| Ihe                  | Ihe ọ bụ                                                                                                                      | Ebe e dere nkọwa ya                          |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Ọnọdụ Chaos**      | Ibe dashboard + API a kọwara ebe a: kesaa otu ọrụ nye ọtụtụ ndị na-eweta ọrụ (n'otu oge ma ọ bụ n'ịrụkọ ọrụ).                 | Ntuziaka a                                   |
| `auto/chaos`         | NJ ihe nlereanya Auto-Combo nwere ibu akara ntinye-ndudue, maka ịnwale nkwụsi ike. Ọ dịghị ihe a ga-ahazi.                    | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Nhazi ngwakọta Chaos | Ngwakọta echekwara nke nwere `config.chaos.enabled` na-ekesa ọrụ nye otu panel nwere ihe nlereanya ọkaikpe nhọrọ (naanị API). | `open-sse/services/autoCombo/chaosEngine.ts` |

## Ntọlite

1. Mepee **Dashboard → Ọnọdụ Chaos** (`/dashboard/chaos`).
2. Gbanye ya — Ọnọdụ Chaos na-abịa **agbanyụrụ na ndabara** (`enabled: false` n'ime
   `src/lib/chaos/chaosConfig.ts`). Mgbe ọ ka agbanyụrụ, `POST /api/chaos/run` na-aza
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Họrọ ndị ga-esonye na ntọala ndabara (a na-echekwa ha maka instansị ọ bụla site na ebe nchekwa ntọala):

   | Oghere              | Ihe ọ pụtara                                                                   | Ndabara / oke                                                 |
   | ------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------- |
   | `enabled`           | Mgbanwe ukwu                                                                   | `false`                                                       |
   | `defaultMode`       | `parallel` ma ọ bụ `collaborative` (lee n'okpuru)                              | `parallel`                                                    |
   | `providerOverrides` | Nsonye nke onye na-eweta ọrụ ọ bụla (`providerId`, `modelId` nhọrọ, `enabled`) | tọgbọ chakoo = onye ọ bụla na-eweta ọrụ nọ n'ọrụ, kachasị 200 |
   | `systemPrompt`      | Dochie prompt sistemụ Chaos arụnyere n'ime ya                                  | nhọrọ, kachasị mkpụrụedemede 10 000                           |
   | `timeoutMs`         | Oge kachasị maka oku ihe nlereanya ọ bụla                                      | `120000` (5 000–600 000)                                      |
   | `maxTokens`         | `max_tokens` maka oku ihe nlereanya ọ bụla                                     | `4096` (256–128 000)                                          |

4. Mee **nnwale site n'ime ibe ahụ n'onwe ya** — panel nsonaazụ na-egosi azịza onye ọ bụla na-eweta ọrụ,
   ọnọdụ ya na oge o were.

## Ụdị arụmọrụ

- **`parallel`** — ihe nlereanya ọ bụla na-enweta otu ọrụ ahụ n'otu oge; ị na-enweta azịza niile
  n'adabereghị na ibe ha.
- **`collaborative`** — ihe nlereanya na-arụ ọrụ **n'usoro njikọ**: nke ọ bụla na-ahụ nsonaazụ ihe nlereanya gara aga ma
  a gwa ya ka ọ melite, gbasaa, tụlee nkatọ, ma ọ bụ nye ụzọ ọzọ. Oghere `summary` nke nzaghachi ahụ
  na-ejikọta nsonaazụ ndị gara nke ọma n'usoro njikọ ahụ (arụmọrụ parallel enweghị `summary`).

## API

### `POST /api/chaos/run` — nnọkọ dashboard

A na-eji kuki nyochaa njirimara (nnọkọ njikwa — lee
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); ibe dashboard na-eji ya.

```jsonc
// ahụ arịrịọ
{
  "task": "Compare approaches to X", // achọrọ
  "providers": ["glm", "kimi"], // nzacha nhọrọ
  "mode": "parallel", // nhọrọ — na-edochi defaultMode
  "systemPrompt": "…", // ngbanwe nhọrọ
  "maxTokens": 4096, // ngbanwe nhọrọ
}
```

### `POST /api/skills/collect/chaos` — igodo API

Ụdị Bearer-token maka ndị ọkpụkpọ si n'èzí. Igodo ahụ ga-enwerịrị **ikike Ọnọdụ Chaos**
(`chaosModeEnabled`), nke **agbanyụrụ na ndabara** — gbanye ya maka igodo ọ bụla na
**Dashboard → Onye njikwa API → dezie igodo → ikike → Ọnọdụ Chaos**. Ọ na-eji otu ahụ arịrịọ ahụ dị n'elu.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Ebe njedebe abụọ ahụ na-eweghachi otu nhazi:

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
  "summary": "…", // naanị ọnọdụ collaborative
}
```

## Ịdozi nsogbu

- **`400 Chaos Mode is not enabled`** — nzọụkwụ 2 dị n'elu: mgba ọkụ zuru ụwa ọnụ agbanyụrụ.
- **A jụrụ igodo API na `/api/skills/collect/chaos`** — igodo ahụ enweghị ikike
  `chaosModeEnabled` nke akọwapụtara maka igodo ọ bụla (agbanyụrụ na ndabara; nke a bụ ntọala, ọ bụghị njehie).
- **Onye na-eweta ọrụ ị tụrụ anya ya adịghị na nsonaazụ** — lelee `providerOverrides` na
  ibe Ọnọdụ Chaos (ngbanwe agbanyụrụ na-ewepụ ya) ma leleekwa ma njikọ onye na-eweta ọrụ ahụ
  nọ n'ọrụ.
