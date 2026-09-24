# Chaos Mode (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Chaos Mode** (sidebjælke) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (dashboard-session) · `POST /api/skills/collect/chaos` (API-nøgle)  
> **Kilde:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode sender **én opgave til flere udbydere på én gang** — hver deltagende udbyder
bidrager med én modelinstans, og du får alle svarene vist side om side (eller sammenkædet). Det er en
kørselsflade til flere modeller, ikke en routingstrategi: Din normale `/v1/chat/completions`-trafik
påvirkes aldrig af den.

**Præcisering — der findes tre forskellige ting med "chaos" i navnet:**

| Ting                     | Hvad det er                                                                                                                  | Hvor det er dokumenteret                     |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**           | Dashboard-siden + API'et, der beskrives her: Send én opgave ud til mange udbydere (parallelt eller kollaborativt).           | Denne vejledning                             |
| `auto/chaos`             | Et Auto-Combo-model-id med vægte til fejlinjektionsscoring til robusthedstest. Intet skal konfigureres.                      | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos-kombokonfiguration | En permanent gemt kombination, hvor `config.chaos.enabled` sender ud til et panel med en valgfri bedømmelsesmodel (kun API). | `open-sse/services/autoCombo/chaosEngine.ts` |

## Opsætning

1. Åbn **Dashboard → Chaos Mode** (`/dashboard/chaos`).
2. Slå den **til** — Chaos Mode leveres **deaktiveret som standard** (`enabled: false` i
   `src/lib/chaos/chaosConfig.ts`). Når den er deaktiveret, svarer `POST /api/chaos/run` med
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Vælg deltagerne og standardindstillingerne (gemmes permanent pr. instans via indstillingslageret):

   | Felt                | Betydning                                                           | Standard / grænser                    |
   | ------------------- | ------------------------------------------------------------------- | ------------------------------------- |
   | `enabled`           | Hovedkontakt                                                        | `false`                               |
   | `defaultMode`       | `parallel` eller `collaborative` (se nedenfor)                      | `parallel`                            |
   | `providerOverrides` | Deltagelse pr. udbyder (`providerId`, valgfri `modelId`, `enabled`) | tom = alle aktive udbydere, maks. 200 |
   | `systemPrompt`      | Tilsidesættelse af den indbyggede Chaos-systemprompt                | valgfri, maks. 10.000 tegn            |
   | `timeoutMs`         | Maksimal tid pr. modelkald                                          | `120000` (5.000–600.000)              |
   | `maxTokens`         | `max_tokens` pr. modelkald                                          | `4096` (256–128.000)                  |

4. Kør en **test fra selve siden** — resultatpanelet viser hver udbyders svar,
   status og varighed.

## Kørselstilstande

- **`parallel`** — alle modeller modtager den samme opgave samtidigt; du modtager alle svarene
  uafhængigt af hinanden.
- **`collaborative`** — modellerne kører **i en kæde**: Hver model ser den forrige models output og
  bliver bedt om at forbedre, udvide, kritisere eller tilbyde et alternativ. Svarets `summary`-felt
  sammenkæder de vellykkede output i kædens rækkefølge (parallelle kørsler har ingen `summary`).

## API

### `POST /api/chaos/run` — dashboard-session

Cookie-godkendt (administrationssessionen — se
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); bruges af dashboard-siden.

```jsonc
// brødtekst
{
  "task": "Compare approaches to X", // påkrævet
  "providers": ["glm", "kimi"], // valgfrit filter
  "mode": "parallel", // valgfri — tilsidesætter defaultMode
  "systemPrompt": "…", // valgfri tilsidesættelse
  "maxTokens": 4096, // valgfri tilsidesættelse
}
```

### `POST /api/skills/collect/chaos` — API-nøgle

Bearer-token-variant til eksterne kaldere. Nøglen skal have **Chaos Mode-tilladelsen**
(`chaosModeEnabled`), som er **slået fra som standard** — aktivér den for hver nøgle under
**Dashboard → API Manager → rediger nøgle → tilladelser → Chaos Mode**. Samme brødtekst som ovenfor.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Begge endpoints returnerer den samme struktur:

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
  "summary": "…", // kun i collaborative-tilstand
}
```

## Fejlfinding

- **`400 Chaos Mode is not enabled`** — se trin 2 ovenfor: Den globale kontakt er slået fra.
- **API-nøglen afvises på `/api/skills/collect/chaos`** — nøglen mangler den nøglespecifikke
  `chaosModeEnabled`-tilladelse (slået fra som standard; dette er en indstilling, ikke en fejl).
- **En forventet udbyder mangler i resultaterne** — kontrollér `providerOverrides` på
  Chaos Mode-siden (en deaktiveret tilsidesættelse udelukker udbyderen), og kontrollér, om udbyderforbindelsen er
  aktiv.
