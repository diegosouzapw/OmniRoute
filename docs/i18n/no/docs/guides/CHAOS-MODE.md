# Chaos Mode (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Kontrollpanel:** **Chaos Mode** (sidefelt) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (kontrollpaneløkt) · `POST /api/skills/collect/chaos` (API-nøkkel)  
> **Kilde:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode sender **én oppgave til flere leverandører samtidig** – hver deltakende leverandør
bidrar med én modellinstans, og du får alle svarene side om side (eller kjedet sammen). Det er en
utførelsesflate for flere modeller, ikke en rutingsstrategi: Den vanlige trafikken din til `/v1/chat/completions`
påvirkes aldri av dette.

**Presisering – tre forskjellige ting leveres med «chaos» i navnet:**

| Ting                            | Hva det er                                                                                                                                                        | Hvor det er dokumentert                      |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**                  | Kontrollpanelsiden og API-et som beskrives her: Spre én oppgave til mange leverandører (parallelt eller i samarbeid).                                             | Denne veiledningen                           |
| `auto/chaos`                    | Auto-Combo-modell-ID: parallell spredning, én modell per leverandør, ett oppstrømskall hver. Ikke feilinjisering ([detaljer](#autochaos-parallel-fan-out)).       | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos-kombinasjonskonfigurasjon | En lagret kombinasjon med `config.chaos.enabled` sprer forespørselen på samme måte (kun via API); `judgeModel` velger bare det endelige svaret, uten syntesekall. | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: parallell spredning

`auto/chaos` er **ikke** en innstilling for feilinjisering eller robusthetstesting. En forespørsel med
`model: "auto/chaos"` til `/v1/chat/completions`:

1. Bygger et panel med **én modell per leverandør**: den første kandidaten fra hver
   tilkoblede leverandør, i kandidatpoolens rekkefølge, med opptil 5 medlemmer
   (`OMNIROUTE_CHAOS_MAX_PANEL`, begrenset til maksimalt 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). Vektpakken `chaos-mode`
   angir bare hvert medlems `weight`; spredningen leser den ikke.
2. Sender den samme forespørselen til hvert panelmedlem **parallelt**, slik at én forespørsel
   koster ett oppstrømskall per panelmedlem
   (`open-sse/services/autoCombo/chaosEngine.ts`, distribuert fra
   `open-sse/services/combo.ts`).
3. Strømmer én statuslinje per panelmedlem etter hvert som den ankommer: en SSE-kommentar
   (`: chaos <index> ok|fail <model>`) som standard, samt en `omni-chaos-part`-hendelse
   (`model`, `index`, `ok`, `error`) når forespørselen angir
   `stream_options.include_chaos_parts: true`. Disse inneholder ingen svartekst.
4. Sender **ett** panelsvar som den endelige delen i OpenAI-format: svaret fra det første
   panelmedlemmet (`auto/chaos` angir det som `judgeModel`) når det lykkes, ellers
   svaret fra det siste medlemmet som lyktes. De andre panelsvarene returneres ikke, så
   du betaler for N kall og mottar én fullføring.

## Oppsett

1. Åpne **Kontrollpanel → Chaos Mode** (`/dashboard/chaos`).
2. Slå den **på** — Chaos Mode leveres **deaktivert som standard** (`enabled: false` i
   `src/lib/chaos/chaosConfig.ts`). Når den er deaktivert, svarer `POST /api/chaos/run` med
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Velg deltakere og standardinnstillinger (lagres per instans via innstillingslageret):

   | Felt                | Betydning                                                              | Standard / grenser                        |
   | ------------------- | ---------------------------------------------------------------------- | ----------------------------------------- |
   | `enabled`           | Hovedbryter                                                            | `false`                                   |
   | `defaultMode`       | `parallel` eller `collaborative` (se nedenfor)                         | `parallel`                                |
   | `providerOverrides` | Deltakelse per leverandør (`providerId`, valgfri `modelId`, `enabled`) | tom = alle aktive leverandører, maks. 200 |
   | `systemPrompt`      | Overstyring av den innebygde Chaos-systeminstruksen                    | valgfri, maks. 10 000 tegn                |
   | `timeoutMs`         | Maksimal tid per modellkall                                            | `120000` (5 000–600 000)                  |
   | `maxTokens`         | `max_tokens` per modellkall                                            | `4096` (256–128 000)                      |

4. Kjør en **test fra selve siden** — resultatpanelet viser hver leverandørs svar,
   status og varighet.

## Utførelsesmoduser

- **`parallel`** — hver modell mottar den samme oppgaven samtidig; du mottar alle svarene
  uavhengig av hverandre.
- **`collaborative`** — modellene kjører **i en kjede**: hver modell ser utdataene fra den forrige modellen og
  blir bedt om å forbedre, utvide, kritisere eller tilby et alternativ. Feltet `summary` i svaret
  slår sammen vellykkede utdata i kjederekkefølge (parallelle kjøringer har ingen `summary`).

## API

### `POST /api/chaos/run` — kontrollpaneløkt

Autentisert med informasjonskapsel (administrasjonsøkten — se
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); brukes av kontrollpanelsiden.

```jsonc
// forespørselskropp
{
  "task": "Compare approaches to X", // påkrevd
  "providers": ["glm", "kimi"], // valgfritt filter
  "mode": "parallel", // valgfritt — overstyrer defaultMode
  "systemPrompt": "…", // valgfri overstyring
  "maxTokens": 4096, // valgfri overstyring
}
```

### `POST /api/skills/collect/chaos` — API-nøkkel

Variant med bearer-token for eksterne kallere. Nøkkelen må ha **Chaos Mode-tillatelsen**
(`chaosModeEnabled`), som er **av som standard** — aktiver den for hver nøkkel under
**Kontrollpanel → API Manager → rediger nøkkel → tillatelser → Chaos Mode**. Samme forespørselskropp som ovenfor.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Begge endepunktene returnerer samme struktur:

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
  "summary": "…", // bare i collaborative-modus
}
```

## Feilsøking

- **`400 Chaos Mode is not enabled`** — se trinn 2 ovenfor: den globale bryteren er av.
- **API-nøkkelen avvises på `/api/skills/collect/chaos`** — nøkkelen mangler den nøkkelspesifikke
  `chaosModeEnabled`-tillatelsen (av som standard; dette er en innstilling, ikke en feil).
- **En leverandør du forventet, mangler i resultatene** — sjekk `providerOverrides` på
  Chaos Mode-siden (en deaktivert overstyring utelukker den), og om leverandørtilkoblingen er
  aktiv.
