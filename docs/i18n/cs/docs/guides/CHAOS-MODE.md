# Chaos Mode (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Řídicí panel:** **Režim Chaos** (postranní panel) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (relace řídicího panelu) · `POST /api/skills/collect/chaos` (klíč API)  
> **Zdroj:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Režim Chaos odesílá **jeden úkol několika poskytovatelům současně** — každý zapojený poskytovatel
přispívá jednou instancí modelu a všechny odpovědi obdržíte vedle sebe (nebo zřetězené). Jde o
rozhraní pro spouštění více modelů, nikoli o strategii směrování: váš běžný provoz
`/v1/chat/completions` jím nikdy není ovlivněn.

**Upřesnění — s názvem „chaos“ se dodávají tři různé věci:**

| Věc                         | Co to je                                                                                                                            | Kde je zdokumentována                        |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Režim Chaos**             | Zde popsaná stránka řídicího panelu a API: rozeslání jednoho úkolu mnoha poskytovatelům (paralelně nebo ve spolupráci).             | Tato příručka                                |
| `auto/chaos`                | ID modelu Auto-Combo s vahami hodnocení pro vkládání chyb, určené k testování odolnosti. Není třeba nic konfigurovat.               | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Konfigurace kombinace Chaos | Trvale uložená kombinace s `config.chaos.enabled`, která rozešle požadavek panelu s volitelným hodnoticím modelem (pouze přes API). | `open-sse/services/autoCombo/chaosEngine.ts` |

## Nastavení

1. Otevřete **Řídicí panel → Režim Chaos** (`/dashboard/chaos`).
2. **Zapněte jej** — Režim Chaos se dodává **ve výchozím nastavení vypnutý** (`enabled: false` v
   `src/lib/chaos/chaosConfig.ts`). Dokud je vypnutý, `POST /api/chaos/run` odpovídá
   `400 — „Režim Chaos není povolen. Povolte jej v části Řídicí panel → Režim Chaos.“`.
3. Vyberte účastníky a výchozí hodnoty (ukládají se pro každou instanci prostřednictvím úložiště nastavení):

   | Pole                | Význam                                                                          | Výchozí hodnota / omezení                      |
   | ------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------- |
   | `enabled`           | Hlavní přepínač                                                                 | `false`                                        |
   | `defaultMode`       | `parallel` nebo `collaborative` (viz níže)                                      | `parallel`                                     |
   | `providerOverrides` | Účast jednotlivých poskytovatelů (`providerId`, volitelné `modelId`, `enabled`) | prázdné = každý aktivní poskytovatel, max. 200 |
   | `systemPrompt`      | Přepsání vestavěné systémové instrukce režimu Chaos                             | volitelné, max. 10 000 znaků                   |
   | `timeoutMs`         | Maximální doba jednoho volání modelu                                            | `120000` (5 000–600 000)                       |
   | `maxTokens`         | `max_tokens` pro jedno volání modelu                                            | `4096` (256–128 000)                           |

4. Spusťte **test přímo ze stránky** — panel výsledků zobrazí odpověď, stav a dobu trvání
   každého poskytovatele.

## Režimy spuštění

- **`parallel`** — každý model obdrží tentýž úkol současně; všechny odpovědi dostanete
  nezávisle.
- **`collaborative`** — modely běží **v řetězci**: každý z nich vidí výstup předchozího modelu a
  je požádán, aby jej vylepšil, rozšířil, kriticky zhodnotil nebo nabídl alternativu. Pole `summary`
  v odpovědi zřetězí úspěšné výstupy v pořadí řetězce (paralelní spuštění pole `summary` nemají).

## API

### `POST /api/chaos/run` — relace řídicího panelu

Ověřováno pomocí souboru cookie (relace pro správu — viz
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); používá se na stránce řídicího panelu.

```jsonc
// tělo
{
  "task": "Compare approaches to X", // povinné
  "providers": ["glm", "kimi"], // volitelný filtr
  "mode": "parallel", // volitelné — přepíše defaultMode
  "systemPrompt": "…", // volitelné přepsání
  "maxTokens": 4096, // volitelné přepsání
}
```

### `POST /api/skills/collect/chaos` — klíč API

Varianta s nosným tokenem pro externí volající. Klíč musí mít **oprávnění Režimu Chaos**
(`chaosModeEnabled`), které je **ve výchozím nastavení vypnuté** — povolte jej pro jednotlivé klíče v části
**Řídicí panel → Správce API → upravit klíč → oprávnění → Režim Chaos**. Tělo je stejné jako výše.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Oba koncové body vracejí stejnou strukturu:

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
  "summary": "…", // pouze režim spolupráce
}
```

## Řešení problémů

- **`400 Režim Chaos není povolen`** — viz krok 2 výše: globální přepínač je vypnutý.
- **Klíč API je na `/api/skills/collect/chaos` odmítnut** — klíči chybí oprávnění
  `chaosModeEnabled` pro daný klíč (ve výchozím nastavení je vypnuté; jde o nastavení, nikoli o chybu).
- **Ve výsledcích chybí očekávaný poskytovatel** — zkontrolujte `providerOverrides` na stránce
  Režimu Chaos (vypnuté přepsání jej vyloučí) a ověřte, zda je připojení k poskytovateli
  aktivní.
