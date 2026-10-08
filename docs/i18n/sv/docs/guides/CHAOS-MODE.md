# Chaos Mode (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Chaos Mode** (sidofältet) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (dashboard-session) · `POST /api/skills/collect/chaos` (API-nyckel)  
> **Källa:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode skickar **en uppgift till flera leverantörer samtidigt** — varje deltagande leverantör
bidrar med en modellinstans, och du får alla svar sida vid sida (eller länkade i en kedja). Det är en
körningsyta för flera modeller, inte en routningsstrategi: din normala trafik till `/v1/chat/completions`
påverkas aldrig av den.

**Förtydligande — tre olika saker levereras med ”chaos” i namnet:**

| Sak                | Vad det är                                                                                                                                                             | Var det dokumenteras                         |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**     | Dashboard-sidan + API:et som beskrivs här: distribuera en uppgift till många leverantörer (parallellt eller gemensamt).                                                | Den här guiden                               |
| `auto/chaos`       | Auto-Combo-modell-id: parallell distribution, en modell per leverantör, ett uppströmsanrop vardera. Inte felinjektion ([detaljer](#autochaos-parallell-distribution)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos combo-konfig | En beständig combo med `config.chaos.enabled` distribuerar på samma sätt (endast via API); `judgeModel` väljer bara slutsvaret, utan något syntesanrop.                | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: parallell distribution

`auto/chaos` är **inte** en inställning för felinjektion eller resiliensprovning. När
`model: "auto/chaos"` begärs på `/v1/chat/completions`:

1. Skapas en panel med **en modell per leverantör**: den första kandidaten från varje
   ansluten leverantör, i kandidatpoolens ordning, upp till 5 medlemmar
   (`OMNIROUTE_CHAOS_MAX_PANEL`, begränsat till högst 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). Viktpaketet `chaos-mode`
   anger endast varje medlems `weight`; distributionen läser det inte.
2. Samma begäran skickas till varje panelmedlem **parallellt**, så en begäran
   kostar ett uppströmsanrop per panelmedlem
   (`open-sse/services/autoCombo/chaosEngine.ts`, skickat från
   `open-sse/services/combo.ts`).
3. En statusrad strömmas för varje panelmedlem när den anländer: som standard en SSE-kommentar
   (`: chaos <index> ok|fail <model>`), samt en `omni-chaos-part`-händelse
   (`model`, `index`, `ok`, `error`) när begäran anger
   `stream_options.include_chaos_parts: true`. Dessa innehåller ingen svarstext.
4. **Ett** panelsvar skickas som den slutliga OpenAI-formaterade delen: den första
   panelmedlemmens (`auto/chaos` anger den som `judgeModel`) när den lyckas, annars
   den senast lyckade medlemmens. De andra panelsvaren returneras inte, så du
   betalar för N anrop och får ett slutförande.

## Konfiguration

1. Öppna **Dashboard → Chaos Mode** (`/dashboard/chaos`).
2. Slå **på** det — Chaos Mode levereras **inaktiverat som standard** (`enabled: false` i
   `src/lib/chaos/chaosConfig.ts`). När det är inaktiverat svarar `POST /api/chaos/run` med
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Välj deltagare och standardvärden (beständiga per instans via inställningslagret):

   | Fält                | Betydelse                                                               | Standardvärde/gränser                    |
   | ------------------- | ----------------------------------------------------------------------- | ---------------------------------------- |
   | `enabled`           | Huvudströmbrytare                                                       | `false`                                  |
   | `defaultMode`       | `parallel` eller `collaborative` (se nedan)                             | `parallel`                               |
   | `providerOverrides` | Deltagande per leverantör (`providerId`, valfritt `modelId`, `enabled`) | tomt = alla aktiva leverantörer, max 200 |
   | `systemPrompt`      | Åsidosättning av den inbyggda Chaos-systemprompten                      | valfritt, max 10 000 tecken              |
   | `timeoutMs`         | Maximal tid per modellanrop                                             | `120000` (5 000–600 000)                 |
   | `maxTokens`         | `max_tokens` per modellanrop                                            | `4096` (256–128 000)                     |

4. Kör ett **test direkt från sidan** — resultatpanelen visar varje leverantörs svar,
   status och varaktighet.

## Körningslägen

- **`parallel`** — varje modell får samma uppgift samtidigt; du får alla svar
  oberoende av varandra.
- **`collaborative`** — modellerna körs **i en kedja**: var och en ser den föregående modellens utdata och
  ombeds att förfina, utöka, kritisera eller erbjuda ett alternativ. Svarets `summary`-fält
  sammanfogar lyckade utdata i kedjeordning (parallella körningar har ingen `summary`).

## API

### `POST /api/chaos/run` — dashboard-session

Cookie-autentiserad (hanteringssessionen — se
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); används av dashboard-sidan.

```jsonc
// begärandetext
{
  "task": "Compare approaches to X", // obligatoriskt
  "providers": ["glm", "kimi"], // valfritt filter
  "mode": "parallel", // valfritt — åsidosätter defaultMode
  "systemPrompt": "…", // valfri åsidosättning
  "maxTokens": 4096, // valfri åsidosättning
}
```

### `POST /api/skills/collect/chaos` — API-nyckel

Bearer-token-variant för externa anropare. Nyckeln måste ha **Chaos Mode-behörigheten**
(`chaosModeEnabled`), som är **avstängd som standard** — aktivera den för varje nyckel under
**Dashboard → API Manager → redigera nyckel → behörigheter → Chaos Mode**. Samma begärandetext som ovan.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Båda slutpunkterna returnerar samma struktur:

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
  "summary": "…", // endast i collaborative-läget
}
```

## Felsökning

- **`400 Chaos Mode is not enabled`** — se steg 2 ovan: den globala strömbrytaren är avstängd.
- **API-nyckeln avvisas för `/api/skills/collect/chaos`** — nyckeln saknar den nyckelspecifika
  behörigheten `chaosModeEnabled` (avstängd som standard; detta är en inställning, inte ett fel).
- **En leverantör som du förväntade dig saknas i resultaten** — kontrollera `providerOverrides` på
  Chaos Mode-sidan (en inaktiverad åsidosättning utesluter leverantören) och om leverantörsanslutningen är
  aktiv.
