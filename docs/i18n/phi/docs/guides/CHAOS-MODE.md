# Chaos Mode (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Chaos Mode** (sidebar) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (session ng dashboard) · `POST /api/skills/collect/chaos` (API key)  
> **Source:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Nagpapadala ang Chaos Mode ng **isang gawain sa maraming provider nang sabay-sabay** — nag-aambag ang bawat kalahok na provider ng isang instance ng model, at makukuha mo ang lahat ng sagot nang magkakatabi (o magkakasunod). Isa itong surface para sa multi-model execution, hindi isang routing strategy: hindi nito kailanman naaapektuhan ang karaniwan mong traffic sa `/v1/chat/completions`.

**Paglilinaw — tatlong magkakaibang bagay ang may "chaos" sa pangalan:**

| Bagay              | Ano ito                                                                                                                           | Saan nakadokumento                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**     | Ang dashboard page + API na inilalarawan dito: ipamahagi ang isang gawain sa maraming provider (parallel o collaborative).        | Ang gabay na ito                             |
| `auto/chaos`       | Isang Auto-Combo model id na may fault-injection scoring weights, para sa resilience testing. Walang kailangang i-configure.      | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos combo config | Isang naka-persist na combo na may `config.chaos.enabled` na namamahagi sa isang panel na may opsyonal na judge model (API-only). | `open-sse/services/autoCombo/chaosEngine.ts` |

## Pag-set up

1. Buksan ang **Dashboard → Chaos Mode** (`/dashboard/chaos`).
2. **I-on** ito — naka-**disable bilang default** ang Chaos Mode (`enabled: false` sa
   `src/lib/chaos/chaosConfig.ts`). Habang naka-disable, sumasagot ang `POST /api/chaos/run` ng
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Piliin ang mga kalahok at default (naka-persist bawat instance sa pamamagitan ng settings store):

   | Field               | Kahulugan                                                                      | Default / mga limitasyon                        |
   | ------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------- |
   | `enabled`           | Pangunahing switch                                                             | `false`                                         |
   | `defaultMode`       | `parallel` o `collaborative` (tingnan sa ibaba)                                | `parallel`                                      |
   | `providerOverrides` | Pakikilahok ng bawat provider (`providerId`, opsyonal na `modelId`, `enabled`) | walang laman = bawat aktibong provider, max 200 |
   | `systemPrompt`      | Override para sa built-in na Chaos system prompt                               | opsyonal, max 10 000 character                  |
   | `timeoutMs`         | Pinakamahabang oras sa bawat model call                                        | `120000` (5 000–600 000)                        |
   | `maxTokens`         | `max_tokens` sa bawat model call                                               | `4096` (256–128 000)                            |

4. Magpatakbo ng **test mula mismo sa page** — ipinapakita ng results panel ang sagot,
   status, at tagal ng bawat provider.

## Mga mode ng execution

- **`parallel`** — natatanggap ng bawat model ang parehong gawain nang sabay-sabay; matatanggap mo ang lahat ng sagot
  nang magkakahiwalay.
- **`collaborative`** — tumatakbo ang mga model **nang magkakasunod sa isang chain**: nakikita ng bawat isa ang output ng naunang model at
  inuutusang paghusayin, palawakin, suriin, o magbigay ng alternatibo. Pinagsasama ng `summary` field
  ng response ang mga matagumpay na output ayon sa pagkakasunod-sunod sa chain (walang `summary` ang mga parallel run).

## API

### `POST /api/chaos/run` — session ng dashboard

Cookie-authenticated (ang management session — tingnan ang
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); ginagamit ng dashboard page.

```jsonc
// body
{
  "task": "Compare approaches to X", // kinakailangan
  "providers": ["glm", "kimi"], // opsyonal na filter
  "mode": "parallel", // opsyonal — ino-override ang defaultMode
  "systemPrompt": "…", // opsyonal na override
  "maxTokens": 4096, // opsyonal na override
}
```

### `POST /api/skills/collect/chaos` — API key

Variant na gumagamit ng bearer token para sa mga external caller. Dapat taglay ng key ang **pahintulot sa Chaos Mode**
(`chaosModeEnabled`), na **naka-off bilang default** — i-enable ito sa bawat key sa
**Dashboard → API Manager → i-edit ang key → mga pahintulot → Chaos Mode**. Pareho ang body sa nasa itaas.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Pareho ang hugis ng ibinabalik ng dalawang endpoint:

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
  "summary": "…", // collaborative mode lamang
}
```

## Pag-troubleshoot

- **`400 Chaos Mode is not enabled`** — hakbang 2 sa itaas: naka-off ang global switch.
- **Tinatanggihan ang API key sa `/api/skills/collect/chaos`** — wala sa key ang pahintulot na
  `chaosModeEnabled` para sa bawat key (naka-off bilang default; isa itong setting, hindi error).
- **Wala sa mga resulta ang isang provider na inaasahan mo** — tingnan ang `providerOverrides` sa
  page ng Chaos Mode (hindi isinasama ng naka-disable na override ang provider) at kung aktibo ang
  koneksyon ng provider.
