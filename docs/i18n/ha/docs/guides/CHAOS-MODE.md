# Chaos Mode (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Yanayin Chaos** (gefen menu) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (zaman dashboard) · `POST /api/skills/collect/chaos` (makullin API)  
> **Tushe:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Yanayin Chaos yana aika **aiki guda ɗaya zuwa masu samarwa da yawa a lokaci guda** — kowane mai samarwa da ke shiga
yana ba da gudummawar kwafin model guda ɗaya, kuma za ka sami duk amsoshin gefe da gefe (ko a jere). Wannan
fagen aiwatar da model da yawa ne, ba dabarar turawa ba: zirga-zirgar `/v1/chat/completions`
ta yau da kullum ba ta taɓa shafuwa da shi.

**Bambancewa — akwai abubuwa uku daban-daban da ake fitarwa tare da "chaos" a cikin sunansu:**

| Abu                   | Mene ne                                                                                                                                                                                             | Inda aka rubuta bayaninsa                    |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Yanayin Chaos**     | Shafin dashboard + API da aka bayyana a nan: aika aiki guda ɗaya zuwa masu samarwa da yawa (a layi ɗaya ko cikin haɗin gwiwa).                                                                      | Wannan jagorar                               |
| `auto/chaos`          | ID ɗin model na Auto-Combo: aikawa a layi ɗaya, model guda ɗaya ga kowane mai samarwa, kiran upstream guda ɗaya kowanne. Ba shigar da matsala ba ([cikakkun bayanai](#autochaos-parallel-fan-out)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Saitin combo na Chaos | Combo da aka adana wanda ke da `config.chaos.enabled` yana aikawa iri ɗaya (API kawai); `judgeModel` yana zaɓar amsar ƙarshe ne kawai, babu kiran haɗa amsoshi.                                     | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: aikawa a layi ɗaya

`auto/chaos` **ba** maɓallin shigar da matsala ko gwajin juriya ba ne. Neman
`model: "auto/chaos"` a kan `/v1/chat/completions` yana:

1. Gina rukunin **model guda ɗaya ga kowane mai samarwa**: ɗan takara na farko daga kowane
   mai samarwa da aka haɗa, bisa tsarin jerin ƴan takara, har zuwa mambobi 5
   (`OMNIROUTE_CHAOS_MAX_PANEL`, wanda aka iyakance zuwa 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). Kunshin nauyi na `chaos-mode`
   yana saita `weight` na kowane mamba ne kawai; tsarin aikawa ba ya karanta shi.
2. Aika buƙata iri ɗaya zuwa kowane mamban rukuni **a layi ɗaya**, don haka buƙata guda ɗaya
   tana cin kiran upstream guda ɗaya ga kowane mamban rukuni
   (`open-sse/services/autoCombo/chaosEngine.ts`, ana aika shi daga
   `open-sse/services/combo.ts`).
3. Watsa layin matsayi guda ɗaya ga kowane mamban rukuni yayin da ya iso: sharhin SSE
   (`: chaos <index> ok|fail <model>`) ta tsohuwa, tare da event na `omni-chaos-part`
   (`model`, `index`, `ok`, `error`) idan buƙatar ta saita
   `stream_options.include_chaos_parts: true`. Waɗannan ba sa ɗauke da rubutun amsa.
4. Aika amsar rukuni **guda ɗaya** a matsayin chunk na ƙarshe irin na OpenAI: ta mamban rukuni
   na farko (`auto/chaos` yana saita shi a matsayin `judgeModel`) idan ya yi nasara, in ba haka ba
   ta mamba na ƙarshe da ya yi nasara. Ba a dawo da sauran amsoshin rukunin, don haka
   za ka biya kuɗin kira N kuma ka karɓi completion guda ɗaya.

## Saitawa

1. Buɗe **Dashboard → Yanayin Chaos** (`/dashboard/chaos`).
2. **Kunna shi** — Yanayin Chaos yana zuwa ne **a kashe ta tsohuwa** (`enabled: false` a cikin
   `src/lib/chaos/chaosConfig.ts`). Yayin da yake a kashe, `POST /api/chaos/run` yana amsawa da
   `400 — "Ba a kunna Yanayin Chaos ba. Kunna shi a Dashboard → Yanayin Chaos."`.
3. Zaɓi mahalarta da tsoffin saituna (ana adana su ga kowane instance ta wurin ma'ajin saituna):

   | Fili                | Ma'ana                                                                  | Tsoho / iyakoki                                     |
   | ------------------- | ----------------------------------------------------------------------- | --------------------------------------------------- |
   | `enabled`           | Babban maɓallin kunnawa                                                 | `false`                                             |
   | `defaultMode`       | `parallel` ko `collaborative` (duba ƙasa)                               | `parallel`                                          |
   | `providerOverrides` | Shigar kowanne mai samarwa (`providerId`, `modelId` na zaɓi, `enabled`) | babu komai = kowane mai samarwa mai aiki, iyaka 200 |
   | `systemPrompt`      | Maye gurbin umarnin tsarin Chaos da ke ciki                             | na zaɓi, iyakar haruffa 10 000                      |
   | `timeoutMs`         | Matsakaicin lokaci ga kowane kiran ƙira                                 | `120000` (5 000–600 000)                            |
   | `maxTokens`         | `max_tokens` ga kowane kiran ƙira                                       | `4096` (256–128 000)                                |

4. Gudanar da **gwaji daga shafin kansa** — kwamitin sakamako yana nuna amsar kowane mai samarwa,
   matsayinta da tsawon lokacinta.

## Hanyoyin aiwatarwa

- **`parallel`** — kowane ƙira yana samun aiki iri ɗaya a lokaci guda; za ka karɓi duk amsoshin
  dabam-dabam.
- **`collaborative`** — ana gudanar da ƙirarrakin **a cikin sarƙa**: kowannensu yana ganin sakamakon ƙirar da ta gabata kuma
  ana umartarsa ya inganta, faɗaɗa, yi suka ko bayar da madadin. Filin `summary` na amsar
  yana haɗa sakamakon da aka yi nasara a jere na sarƙar (gudanarwar layi ɗaya ba ta da `summary`).

## API

### `POST /api/chaos/run` — zaman dashboard

Ana tantancewa da cookie (zaman gudanarwa — duba
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); shafin dashboard ne ke amfani da shi.

```jsonc
// jiki
{
  "task": "Kwatanta hanyoyin magance X", // dole
  "providers": ["glm", "kimi"], // tacewa ta zaɓi
  "mode": "parallel", // na zaɓi — yana maye gurbin defaultMode
  "systemPrompt": "…", // maye gurbi na zaɓi
  "maxTokens": 4096, // maye gurbi na zaɓi
}
```

### `POST /api/skills/collect/chaos` — maɓallin API

Nau'in bearer-token ne ga masu kira daga waje. Dole ne maɓallin ya ƙunshi **izinin Yanayin Chaos**
(`chaosModeEnabled`), wanda yake **a kashe ta tsohuwa** — kunna shi ga kowane maɓalli a
**Dashboard → Mai Gudanar da API → gyara maɓalli → izini → Yanayin Chaos**. Jikin iri ɗaya ne da na sama.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Kwatanta hanyoyin magance X","mode":"parallel"}'
```

Duka endpoints ɗin suna mayar da tsari iri ɗaya:

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
  "summary": "…", // yanayin haɗin gwiwa kawai
}
```

## Magance matsaloli

- **`400 Ba a kunna Yanayin Chaos ba`** — mataki na 2 a sama: babban maɓallin yana a kashe.
- **An ƙi maɓallin API a `/api/skills/collect/chaos`** — maɓallin ba shi da izinin
  `chaosModeEnabled` na kowane maɓalli (yana a kashe ta tsohuwa; wannan saiti ne, ba kuskure ba).
- **Mai samarwar da kake tsammani ba ya cikin sakamakon** — bincika `providerOverrides` a shafin
  Yanayin Chaos (mayewar da aka kashe tana cire shi) da kuma ko haɗin mai samarwar yana
  aiki.
