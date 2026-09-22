# Chaos Mode (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Chaosmodus** (zijbalk) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (dashboardsessie) · `POST /api/skills/collect/chaos` (API-sleutel)  
> **Bron:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

De Chaosmodus stuurt **één taak tegelijk naar meerdere providers** — elke deelnemende provider
draagt één modelinstantie bij en je krijgt alle antwoorden naast elkaar (of als keten). Het is een
uitvoeringsomgeving voor meerdere modellen, geen routeringsstrategie: je normale verkeer naar
`/v1/chat/completions` wordt er nooit door beïnvloed.

**Ter verduidelijking — er worden drie verschillende dingen geleverd met "chaos" in de naam:**

| Onderdeel         | Wat het is                                                                                                                    | Waar gedocumenteerd                          |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaosmodus**    | De dashboardpagina + API die hier worden beschreven: één taak verspreiden over meerdere providers (parallel of samenwerkend). | Deze handleiding                             |
| `auto/chaos`      | Een Auto-Combo-model-id met scoringsgewichten voor foutinjectie, bedoeld voor robuustheidstests. Niets te configureren.       | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos-comboconfig | Een opgeslagen combo met `config.chaos.enabled` die uitvoert naar een panel met een optioneel beoordelingsmodel (alleen API). | `open-sse/services/autoCombo/chaosEngine.ts` |

## Configuratie

1. Open **Dashboard → Chaosmodus** (`/dashboard/chaos`).
2. Schakel deze **in** — de Chaosmodus wordt standaard **uitgeschakeld geleverd** (`enabled: false` in
   `src/lib/chaos/chaosConfig.ts`). Zolang deze is uitgeschakeld, antwoordt `POST /api/chaos/run` met
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Kies de deelnemers en standaardwaarden (per instantie opgeslagen via het instellingenarchief):

   | Veld                | Betekenis                                                            | Standaardwaarde / limieten             |
   | ------------------- | -------------------------------------------------------------------- | -------------------------------------- |
   | `enabled`           | Hoofdschakelaar                                                      | `false`                                |
   | `defaultMode`       | `parallel` of `collaborative` (zie hieronder)                        | `parallel`                             |
   | `providerOverrides` | Deelname per provider (`providerId`, optioneel `modelId`, `enabled`) | leeg = elke actieve provider, max. 200 |
   | `systemPrompt`      | Overschrijving voor de ingebouwde Chaos-systeemprompt                | optioneel, max. 10.000 tekens          |
   | `timeoutMs`         | Maximale tijd per modelaanroep                                       | `120000` (5.000–600.000)               |
   | `maxTokens`         | `max_tokens` per modelaanroep                                        | `4096` (256–128.000)                   |

4. Voer **vanaf de pagina zelf een test uit** — het resultatenpaneel toont het antwoord,
   de status en de duur van elke provider.

## Uitvoeringsmodi

- **`parallel`** — elk model krijgt tegelijkertijd dezelfde taak; je ontvangt alle antwoorden
  onafhankelijk van elkaar.
- **`collaborative`** — modellen worden **als een keten uitgevoerd**: elk model ziet de uitvoer van het vorige model en
  krijgt de opdracht deze te verfijnen, uit te breiden, te bekritiseren of een alternatief te bieden. Het veld `summary` van
  de respons voegt de geslaagde uitvoer in de volgorde van de keten samen (parallelle uitvoeringen hebben geen `summary`).

## API

### `POST /api/chaos/run` — dashboardsessie

Cookie-geauthenticeerd (de beheersessie — zie
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); wordt gebruikt door de dashboardpagina.

```jsonc
// aanvraagbody
{
  "task": "Compare approaches to X", // verplicht
  "providers": ["glm", "kimi"], // optioneel filter
  "mode": "parallel", // optioneel — overschrijft defaultMode
  "systemPrompt": "…", // optionele overschrijving
  "maxTokens": 4096, // optionele overschrijving
}
```

### `POST /api/skills/collect/chaos` — API-sleutel

Bearer-tokenvariant voor externe aanroepers. De sleutel moet de **Chaosmodusmachtiging**
(`chaosModeEnabled`) bevatten, die **standaard uitgeschakeld** is — schakel deze per sleutel in via
**Dashboard → API-beheer → sleutel bewerken → machtigingen → Chaosmodus**. Dezelfde body als hierboven.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Beide endpoints retourneren dezelfde structuur:

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
  "summary": "…", // alleen in collaborative-modus
}
```

## Probleemoplossing

- **`400 Chaos Mode is not enabled`** — zie stap 2 hierboven: de globale schakelaar staat uit.
- **API-sleutel wordt geweigerd voor `/api/skills/collect/chaos`** — de sleutel heeft niet de
  sleutelspecifieke machtiging `chaosModeEnabled` (standaard uitgeschakeld; dit is een instelling, geen fout).
- **Een verwachte provider ontbreekt in de resultaten** — controleer `providerOverrides` op de
  Chaosmoduspagina (een uitgeschakelde overschrijving sluit deze uit) en controleer of de providerverbinding
  actief is.
