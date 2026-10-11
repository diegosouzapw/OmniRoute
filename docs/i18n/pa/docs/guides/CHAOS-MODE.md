# Chaos Mode (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **ਡੈਸ਼ਬੋਰਡ:** **Chaos Mode** (ਸਾਈਡਬਾਰ) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ) · `POST /api/skills/collect/chaos` (API ਕੁੰਜੀ)  
> **ਸਰੋਤ:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **ਇੱਕੋ ਕੰਮ ਨੂੰ ਇੱਕੋ ਵੇਲੇ ਕਈ ਪ੍ਰਦਾਤਾਵਾਂ ਕੋਲ ਭੇਜਦਾ ਹੈ** — ਹਰ ਭਾਗ ਲੈਣ ਵਾਲਾ ਪ੍ਰਦਾਤਾ
ਇੱਕ ਮਾਡਲ ਇੰਸਟੈਂਸ ਦਾ ਯੋਗਦਾਨ ਪਾਉਂਦਾ ਹੈ, ਅਤੇ ਤੁਹਾਨੂੰ ਸਾਰੇ ਜਵਾਬ ਨਾਲ-ਨਾਲ (ਜਾਂ ਲੜੀਬੱਧ) ਮਿਲਦੇ ਹਨ। ਇਹ
ਇੱਕ ਬਹੁ-ਮਾਡਲ ਐਗਜ਼ੀਕਿਊਸ਼ਨ ਸਤਹ ਹੈ, ਰੂਟਿੰਗ ਰਣਨੀਤੀ ਨਹੀਂ: ਤੁਹਾਡਾ ਆਮ `/v1/chat/completions`
ਟ੍ਰੈਫ਼ਿਕ ਇਸ ਨਾਲ ਕਦੇ ਵੀ ਪ੍ਰਭਾਵਿਤ ਨਹੀਂ ਹੁੰਦਾ।

**ਸਪਸ਼ਟੀਕਰਨ — "chaos" ਨਾਮ ਵਾਲੀਆਂ ਤਿੰਨ ਵੱਖਰੀਆਂ ਚੀਜ਼ਾਂ ਉਪਲਬਧ ਹਨ:**

| ਚੀਜ਼               | ਇਹ ਕੀ ਹੈ                                                                                                                                                     | ਦਸਤਾਵੇਜ਼ ਕਿੱਥੇ ਹਨ                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Chaos Mode**     | ਇੱਥੇ ਵਰਣਿਤ ਡੈਸ਼ਬੋਰਡ ਪੰਨਾ + API: ਇੱਕ ਕੰਮ ਨੂੰ ਕਈ ਪ੍ਰਦਾਤਾਵਾਂ ਤੱਕ ਫੈਲਾਉਣਾ (ਸਮਾਂਤਰ ਜਾਂ ਸਹਿਯੋਗੀ ਢੰਗ ਨਾਲ)।                                                          | ਇਹ ਗਾਈਡ                                      |
| `auto/chaos`       | Auto-Combo ਮਾਡਲ id: ਸਮਾਂਤਰ ਫੈਨ-ਆਉਟ, ਹਰ ਪ੍ਰਦਾਤਾ ਲਈ ਇੱਕ ਮਾਡਲ, ਅਤੇ ਹਰੇਕ ਲਈ ਇੱਕ ਅੱਪਸਟ੍ਰੀਮ ਕਾਲ। ਇਹ ਫ਼ਾਲਟ ਇੰਜੈਕਸ਼ਨ ਨਹੀਂ ਹੈ ([ਵੇਰਵੇ](#autochaos-parallel-fan-out))। | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos ਕੌਂਬੋ ਸੰਰਚਨਾ | `config.chaos.enabled` ਵਾਲਾ ਇੱਕ ਸਥਾਈ ਕੌਂਬੋ, ਜੋ ਇਸੇ ਤਰ੍ਹਾਂ ਫੈਨ-ਆਉਟ ਕਰਦਾ ਹੈ (ਕੇਵਲ API); `judgeModel` ਸਿਰਫ਼ ਅੰਤਿਮ ਜਵਾਬ ਚੁਣਦਾ ਹੈ, ਕੋਈ ਸਿੰਥੇਸਿਸ ਕਾਲ ਨਹੀਂ ਹੁੰਦੀ।   | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: ਸਮਾਂਤਰ ਫੈਨ-ਆਉਟ

`auto/chaos` ਕੋਈ ਫ਼ਾਲਟ-ਇੰਜੈਕਸ਼ਨ ਜਾਂ ਲਚਕੀਲੇਪਣ ਦੀ ਜਾਂਚ ਕਰਨ ਵਾਲੀ ਸੈਟਿੰਗ **ਨਹੀਂ** ਹੈ।
`/v1/chat/completions` ਉੱਤੇ `model: "auto/chaos"` ਦੀ ਬੇਨਤੀ ਕਰਨ ਨਾਲ:

1. **ਹਰ ਪ੍ਰਦਾਤਾ ਲਈ ਇੱਕ ਮਾਡਲ** ਵਾਲਾ ਪੈਨਲ ਬਣਦਾ ਹੈ: ਹਰੇਕ
   ਜੁੜੇ ਹੋਏ ਪ੍ਰਦਾਤਾ ਦਾ ਪਹਿਲਾ ਉਮੀਦਵਾਰ, ਉਮੀਦਵਾਰ-ਪੂਲ ਦੇ ਕ੍ਰਮ ਅਨੁਸਾਰ, ਵੱਧ ਤੋਂ ਵੱਧ 5 ਮੈਂਬਰਾਂ ਤੱਕ
   (`OMNIROUTE_CHAOS_MAX_PANEL`, ਅਧਿਕਤਮ 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`)। `chaos-mode` ਵੇਟ
   ਪੈਕ ਸਿਰਫ਼ ਹਰੇਕ ਮੈਂਬਰ ਦਾ `weight` ਸੈੱਟ ਕਰਦਾ ਹੈ; ਫੈਨ-ਆਉਟ ਇਸਨੂੰ ਪੜ੍ਹਦਾ ਨਹੀਂ ਹੈ।
2. ਇੱਕੋ ਬੇਨਤੀ ਨੂੰ ਹਰ ਪੈਨਲ ਮੈਂਬਰ ਕੋਲ **ਸਮਾਂਤਰ ਤੌਰ 'ਤੇ** ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ, ਇਸ ਲਈ ਇੱਕ ਬੇਨਤੀ
   ਲਈ ਪ੍ਰਤੀ ਪੈਨਲ ਮੈਂਬਰ ਇੱਕ ਅੱਪਸਟ੍ਰੀਮ ਕਾਲ ਦੀ ਲਾਗਤ ਆਉਂਦੀ ਹੈ
   (`open-sse/services/autoCombo/chaosEngine.ts`, ਜਿਸਨੂੰ
   `open-sse/services/combo.ts` ਤੋਂ ਡਿਸਪੈਚ ਕੀਤਾ ਜਾਂਦਾ ਹੈ)।
3. ਹਰ ਪੈਨਲ ਮੈਂਬਰ ਦਾ ਨਤੀਜਾ ਆਉਂਦੇ ਹੀ ਉਸ ਲਈ ਇੱਕ ਸਥਿਤੀ ਲਾਈਨ ਸਟ੍ਰੀਮ ਕੀਤੀ ਜਾਂਦੀ ਹੈ: ਮੂਲ ਰੂਪ ਵਿੱਚ ਇੱਕ SSE ਟਿੱਪਣੀ
   (`: chaos <index> ok|fail <model>`), ਅਤੇ ਜਦੋਂ ਬੇਨਤੀ
   `stream_options.include_chaos_parts: true` ਸੈੱਟ ਕਰਦੀ ਹੈ ਤਾਂ ਇੱਕ `omni-chaos-part`
   ਇਵੈਂਟ (`model`, `index`, `ok`, `error`) ਵੀ। ਇਨ੍ਹਾਂ ਵਿੱਚ ਜਵਾਬ ਦਾ ਕੋਈ ਪਾਠ ਨਹੀਂ ਹੁੰਦਾ।
4. ਅੰਤਿਮ OpenAI-ਸ਼ੈਲੀ ਚੰਕ ਵਜੋਂ ਪੈਨਲ ਦਾ **ਇੱਕ** ਜਵਾਬ ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ: ਪਹਿਲੇ ਪੈਨਲ
   ਮੈਂਬਰ ਦਾ (`auto/chaos` ਇਸਨੂੰ `judgeModel` ਵਜੋਂ ਸੈੱਟ ਕਰਦਾ ਹੈ), ਜੇ ਉਹ ਸਫਲ ਹੁੰਦਾ ਹੈ; ਨਹੀਂ ਤਾਂ
   ਆਖਰੀ ਸਫਲ ਮੈਂਬਰ ਦਾ। ਪੈਨਲ ਦੇ ਹੋਰ ਜਵਾਬ ਵਾਪਸ ਨਹੀਂ ਕੀਤੇ ਜਾਂਦੇ, ਇਸ ਲਈ
   ਤੁਸੀਂ N ਕਾਲਾਂ ਲਈ ਭੁਗਤਾਨ ਕਰਦੇ ਹੋ ਅਤੇ ਇੱਕ ਕੰਪਲੀਸ਼ਨ ਪ੍ਰਾਪਤ ਕਰਦੇ ਹੋ।

## ਸੈੱਟਅੱਪ

1. **ਡੈਸ਼ਬੋਰਡ → Chaos Mode** (`/dashboard/chaos`) ਖੋਲ੍ਹੋ।
2. ਇਸਨੂੰ **ਚਾਲੂ** ਕਰੋ — Chaos Mode ਮੂਲ ਰੂਪ ਵਿੱਚ **ਅਯੋਗ** ਹੁੰਦਾ ਹੈ (`enabled: false`
   `src/lib/chaos/chaosConfig.ts` ਵਿੱਚ)। ਅਯੋਗ ਹੋਣ ਦੌਰਾਨ, `POST /api/chaos/run` ਇਹ ਜਵਾਬ ਦਿੰਦਾ ਹੈ:
   `400 — "Chaos Mode ਸਮਰੱਥ ਨਹੀਂ ਹੈ। ਇਸਨੂੰ ਡੈਸ਼ਬੋਰਡ → Chaos Mode ਵਿੱਚ ਸਮਰੱਥ ਕਰੋ।"`.
3. ਭਾਗੀਦਾਰ ਅਤੇ ਡਿਫਾਲਟ ਚੁਣੋ (ਸੈਟਿੰਗਜ਼ ਸਟੋਰ ਰਾਹੀਂ ਹਰੇਕ ਇੰਸਟੈਂਸ ਲਈ ਸਥਾਈ ਤੌਰ 'ਤੇ ਸੰਭਾਲੇ ਜਾਂਦੇ ਹਨ):

   | ਫੀਲਡ                | ਅਰਥ                                                                 | ਡਿਫਾਲਟ / ਸੀਮਾਵਾਂ                         |
   | ------------------- | ------------------------------------------------------------------- | ---------------------------------------- |
   | `enabled`           | ਮੁੱਖ ਸਵਿੱਚ                                                          | `false`                                  |
   | `defaultMode`       | `parallel` ਜਾਂ `collaborative` (ਹੇਠਾਂ ਦੇਖੋ)                         | `parallel`                               |
   | `providerOverrides` | ਪ੍ਰਤੀ-ਪ੍ਰਦਾਤਾ ਭਾਗੀਦਾਰੀ (`providerId`, ਵਿਕਲਪਿਕ `modelId`, `enabled`) | ਖਾਲੀ = ਹਰ ਸਰਗਰਮ ਪ੍ਰਦਾਤਾ, ਵੱਧ ਤੋਂ ਵੱਧ 200 |
   | `systemPrompt`      | ਅੰਦਰੂਨੀ Chaos ਸਿਸਟਮ ਪ੍ਰੌਂਪਟ ਲਈ ਓਵਰਰਾਈਡ                              | ਵਿਕਲਪਿਕ, ਵੱਧ ਤੋਂ ਵੱਧ 10 000 ਅੱਖਰ         |
   | `timeoutMs`         | ਹਰੇਕ ਮਾਡਲ ਕਾਲ ਲਈ ਵੱਧ ਤੋਂ ਵੱਧ ਸਮਾਂ                                   | `120000` (5 000–600 000)                 |
   | `maxTokens`         | ਹਰੇਕ ਮਾਡਲ ਕਾਲ ਲਈ `max_tokens`                                       | `4096` (256–128 000)                     |

4. **ਪੰਨੇ ਤੋਂ ਹੀ ਇੱਕ ਟੈਸਟ ਚਲਾਓ** — ਨਤੀਜਾ ਪੈਨਲ ਹਰ ਪ੍ਰਦਾਤਾ ਦਾ ਜਵਾਬ,
   ਸਥਿਤੀ ਅਤੇ ਮਿਆਦ ਦਿਖਾਉਂਦਾ ਹੈ।

## ਐਗਜ਼ੀਕਿਊਸ਼ਨ ਮੋਡ

- **`parallel`** — ਹਰ ਮਾਡਲ ਨੂੰ ਇੱਕੋ ਕੰਮ ਇੱਕੋ ਸਮੇਂ ਮਿਲਦਾ ਹੈ; ਤੁਹਾਨੂੰ ਸਾਰੇ ਜਵਾਬ
  ਸੁਤੰਤਰ ਤੌਰ 'ਤੇ ਮਿਲਦੇ ਹਨ।
- **`collaborative`** — ਮਾਡਲ **ਇੱਕ ਲੜੀ ਵਿੱਚ** ਚੱਲਦੇ ਹਨ: ਹਰ ਮਾਡਲ ਪਿਛਲੇ ਮਾਡਲ ਦਾ ਆਉਟਪੁੱਟ ਦੇਖਦਾ ਹੈ ਅਤੇ
  ਉਸਨੂੰ ਸੁਧਾਰਨ, ਵਿਸਤਾਰ ਕਰਨ, ਆਲੋਚਨਾ ਕਰਨ ਜਾਂ ਕੋਈ ਵਿਕਲਪ ਪੇਸ਼ ਕਰਨ ਲਈ ਕਿਹਾ ਜਾਂਦਾ ਹੈ। ਜਵਾਬ ਦਾ `summary` ਫੀਲਡ
  ਲੜੀ ਦੇ ਕ੍ਰਮ ਵਿੱਚ ਸਫਲ ਆਉਟਪੁੱਟਾਂ ਨੂੰ ਜੋੜਦਾ ਹੈ (`parallel` ਰਨਾਂ ਵਿੱਚ ਕੋਈ `summary` ਨਹੀਂ ਹੁੰਦਾ)।

## API

### `POST /api/chaos/run` — ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ

ਕੂਕੀ-ਪ੍ਰਮਾਣਿਤ (ਪ੍ਰਬੰਧਨ ਸੈਸ਼ਨ — ਦੇਖੋ
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); ਡੈਸ਼ਬੋਰਡ ਪੰਨੇ ਦੁਆਰਾ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ।

```jsonc
// ਬਾਡੀ
{
  "task": "X ਲਈ ਪਹੁੰਚਾਂ ਦੀ ਤੁਲਨਾ ਕਰੋ", // ਲੋੜੀਂਦਾ
  "providers": ["glm", "kimi"], // ਵਿਕਲਪਿਕ ਫਿਲਟਰ
  "mode": "parallel", // ਵਿਕਲਪਿਕ — defaultMode ਨੂੰ ਓਵਰਰਾਈਡ ਕਰਦਾ ਹੈ
  "systemPrompt": "…", // ਵਿਕਲਪਿਕ ਓਵਰਰਾਈਡ
  "maxTokens": 4096, // ਵਿਕਲਪਿਕ ਓਵਰਰਾਈਡ
}
```

### `POST /api/skills/collect/chaos` — API ਕੁੰਜੀ

ਬਾਹਰੀ ਕਾਲਰਾਂ ਲਈ Bearer-token ਰੂਪ। ਕੁੰਜੀ ਕੋਲ **Chaos Mode ਇਜਾਜ਼ਤ**
(`chaosModeEnabled`) ਹੋਣੀ ਲਾਜ਼ਮੀ ਹੈ, ਜੋ ਮੂਲ ਰੂਪ ਵਿੱਚ **ਬੰਦ** ਹੁੰਦੀ ਹੈ — ਇਸਨੂੰ ਹਰੇਕ ਕੁੰਜੀ ਲਈ
**ਡੈਸ਼ਬੋਰਡ → API ਮੈਨੇਜਰ → ਕੁੰਜੀ ਸੋਧੋ → ਇਜਾਜ਼ਤਾਂ → Chaos Mode** ਵਿੱਚ ਸਮਰੱਥ ਕਰੋ। ਬਾਡੀ ਉੱਪਰ ਦਿੱਤੀ ਬਾਡੀ ਵਰਗੀ ਹੀ ਹੈ।

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"X ਲਈ ਪਹੁੰਚਾਂ ਦੀ ਤੁਲਨਾ ਕਰੋ","mode":"parallel"}'
```

ਦੋਵੇਂ ਐਂਡਪੌਇੰਟ ਇੱਕੋ ਬਣਤਰ ਵਿੱਚ ਜਵਾਬ ਦਿੰਦੇ ਹਨ:

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
  "summary": "…", // ਕੇਵਲ collaborative ਮੋਡ
}
```

## ਸਮੱਸਿਆ-ਨਿਵਾਰਣ

- **`400 Chaos Mode is not enabled`** — ਉੱਪਰਲਾ ਕਦਮ 2: ਗਲੋਬਲ ਸਵਿੱਚ ਬੰਦ ਹੈ।
- **API ਕੁੰਜੀ `/api/skills/collect/chaos` 'ਤੇ ਅਸਵੀਕਾਰ ਹੋ ਜਾਂਦੀ ਹੈ** — ਕੁੰਜੀ ਕੋਲ ਪ੍ਰਤੀ-ਕੁੰਜੀ
  `chaosModeEnabled` ਇਜਾਜ਼ਤ ਨਹੀਂ ਹੈ (ਮੂਲ ਰੂਪ ਵਿੱਚ ਬੰਦ; ਇਹ ਇੱਕ ਸੈਟਿੰਗ ਹੈ, ਗਲਤੀ ਨਹੀਂ)।
- **ਨਤੀਜਿਆਂ ਵਿੱਚ ਉਮੀਦ ਕੀਤਾ ਪ੍ਰਦਾਤਾ ਮੌਜੂਦ ਨਹੀਂ ਹੈ** — Chaos Mode ਪੰਨੇ 'ਤੇ `providerOverrides`
  ਦੀ ਜਾਂਚ ਕਰੋ (ਅਯੋਗ ਓਵਰਰਾਈਡ ਉਸਨੂੰ ਬਾਹਰ ਰੱਖਦਾ ਹੈ) ਅਤੇ ਇਹ ਵੀ ਜਾਂਚੋ ਕਿ ਪ੍ਰਦਾਤਾ ਕਨੈਕਸ਼ਨ
  ਸਰਗਰਮ ਹੈ ਜਾਂ ਨਹੀਂ।
