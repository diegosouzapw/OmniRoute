# Chaos Mode (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Modalità Chaos** (fil-barra tal-ġenb) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (sessjoni tad-dashboard) · `POST /api/skills/collect/chaos` (ċavetta tal-API)  
> **Sors:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Il-Modalità Chaos tibgħat **kompitu wieħed lil diversi fornituri fl-istess ħin** — kull fornitur parteċipanti
jikkontribwixxi istanza waħda ta' mudell, u tirċievi t-tweġibiet kollha maġenb xulxin (jew f'katina). Din hija
superfiċje ta' eżekuzzjoni b'diversi mudelli, mhux strateġija ta' routing: it-traffiku normali tiegħek ta'
`/v1/chat/completions` qatt ma jiġi affettwat minnha.

**Kjarifika — jiġu inklużi tliet affarijiet differenti li għandhom "chaos" f'isimhom:**

| Ħaġa                            | X'inhi                                                                                                                                       | Fejn hi ddokumentata                         |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Modalità Chaos**              | Il-paġna tad-dashboard + l-API deskritta hawnhekk: tqassam kompitu wieħed lil ħafna fornituri (b'mod parallel jew kollaborattiv).            | Din il-gwida                                 |
| `auto/chaos`                    | ID ta' mudell Auto-Combo b'piżijiet ta' punteġġ għall-injezzjoni ta' ħsarat, għall-ittestjar tar-reżiljenza. M'hemm xejn x'jiġi kkonfigurat. | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Konfigurazzjoni tal-combo Chaos | Combo persistenti b'`config.chaos.enabled` tqassam ix-xogħol lil panel b'mudell ta' ġudizzju fakultattiv (permezz tal-API biss).             | `open-sse/services/autoCombo/chaosEngine.ts` |

## Konfigurazzjoni

1. Iftaħ **Dashboard → Modalità Chaos** (`/dashboard/chaos`).
2. **Ixgħelha** — il-Modalità Chaos tiġi **diżattivata b'mod awtomatiku** (`enabled: false` f'
   `src/lib/chaos/chaosConfig.ts`). Waqt li tkun diżattivata, `POST /api/chaos/run` iwieġeb
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Agħżel il-parteċipanti u l-valuri predefiniti (ippersistiti għal kull istanza permezz tal-maħżen tas-settings):

   | Qasam               | Tifsira                                                                             | Valur predefinit / limiti                   |
   | ------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------- |
   | `enabled`           | Swiċċ ewlieni                                                                       | `false`                                     |
   | `defaultMode`       | `parallel` jew `collaborative` (ara hawn taħt)                                      | `parallel`                                  |
   | `providerOverrides` | Parteċipazzjoni għal kull fornitur (`providerId`, `modelId` fakultattiv, `enabled`) | vojt = kull fornitur attiv, massimu ta' 200 |
   | `systemPrompt`      | Sostituzzjoni tal-prompt tas-sistema Chaos inkorporat                               | fakultattiv, massimu ta' 10 000 karattru    |
   | `timeoutMs`         | Ħin massimu għal kull sejħa ta' mudell                                              | `120000` (5 000–600 000)                    |
   | `maxTokens`         | `max_tokens` għal kull sejħa ta' mudell                                             | `4096` (256–128 000)                        |

4. Ħaddem **test mill-paġna stess** — il-panel tar-riżultati juri t-tweġiba,
   l-istatus u t-tul ta' żmien għal kull fornitur.

## Modi ta' eżekuzzjoni

- **`parallel`** — kull mudell jirċievi l-istess kompitu fl-istess ħin; tirċievi t-tweġibiet kollha
  indipendentement.
- **`collaborative`** — il-mudelli jitħaddmu **f'katina**: kull wieħed jara l-output tal-mudell preċedenti u
  jintalab jirfinah, jestendih, jikkritikah jew joffri alternattiva. Il-qasam `summary` tar-rispons
  jikkonkatenja l-outputs li rnexxew skont l-ordni tal-katina (l-eżekuzzjonijiet paralleli m'għandhomx `summary`).

## API

### `POST /api/chaos/run` — sessjoni tad-dashboard

Awtentikat permezz ta' cookie (is-sessjoni tal-ġestjoni — ara
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); jintuża mill-paġna tad-dashboard.

```jsonc
// korp
{
  "task": "Compare approaches to X", // meħtieġ
  "providers": ["glm", "kimi"], // filtru fakultattiv
  "mode": "parallel", // fakultattiv — jissostitwixxi defaultMode
  "systemPrompt": "…", // sostituzzjoni fakultattiva
  "maxTokens": 4096, // sostituzzjoni fakultattiva
}
```

### `POST /api/skills/collect/chaos` — ċavetta tal-API

Varjant b'token Bearer għal klijenti esterni. Iċ-ċavetta jrid ikollha l-**permess tal-Modalità Chaos**
(`chaosModeEnabled`), li huwa **mitfi b'mod awtomatiku** — attivah għal kull ċavetta f'
**Dashboard → API Manager → edit key → permissions → Chaos Mode**. L-istess korp bħal hawn fuq.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Iż-żewġ endpoints jirritornaw l-istess struttura:

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
  "summary": "…", // fil-modalità kollaborattiva biss
}
```

## Soluzzjoni tal-problemi

- **`400 Chaos Mode is not enabled`** — ara l-pass 2 hawn fuq: is-swiċċ globali huwa mitfi.
- **Iċ-ċavetta tal-API tiġi miċħuda fuq `/api/skills/collect/chaos`** — iċ-ċavetta m'għandhiex il-permess
  `chaosModeEnabled` speċifiku għaċ-ċavetta (mitfi b'mod awtomatiku; dan huwa setting, mhux żball).
- **Fornitur li stennejt ma jidhirx fir-riżultati** — iċċekkja `providerOverrides` fil-paġna
  tal-Modalità Chaos (override diżattivat jeskludih) u jekk il-konnessjoni tal-fornitur hijiex
  attiva.
