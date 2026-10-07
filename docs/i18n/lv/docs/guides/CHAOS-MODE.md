# Chaos Mode (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Informācijas panelis:** **Chaos Mode** (sānjoslā) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (informācijas paneļa sesija) · `POST /api/skills/collect/chaos` (API atslēga)  
> **Avots:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode nosūta **vienu uzdevumu vairākiem nodrošinātājiem vienlaikus** — katrs iesaistītais nodrošinātājs
piedāvā vienu modeļa instanci, un jūs saņemat visas atbildes līdzās (vai ķēdē). Tā ir
vairāku modeļu izpildes saskarne, nevis maršrutēšanas stratēģija: tā nekad neietekmē jūsu parasto
`/v1/chat/completions` datplūsmu.

**Nošķīrums — tiek nodrošinātas trīs dažādas lietas, kuru nosaukumā ir „chaos”:**

| Lieta                            | Kas tā ir                                                                                                                                                                                      | Kur dokumentēta                              |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**                   | Šeit aprakstītā informācijas paneļa lapa un API: viena uzdevuma izsūtīšana daudziem nodrošinātājiem (paralēli vai sadarbojoties).                                                              | Šī rokasgrāmata                              |
| `auto/chaos`                     | Auto-Combo modeļa ID: paralēla izsūtīšana, viens modelis katram nodrošinātājam un viens augšupstraumes izsaukums katram. Tā nav kļūmju ievadīšana ([detalizēti](#autochaos-parallel-fan-out)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos kombinācijas konfigurācija | Saglabāta kombinācija ar `config.chaos.enabled` veic tādu pašu izsūtīšanu (tikai API); `judgeModel` tikai izvēlas galīgo atbildi, neveicot sintēzes izsaukumu.                                 | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: paralēla izsūtīšana

`auto/chaos` **nav** kļūmju ievadīšanas vai noturības testēšanas iestatījums. Pieprasot
`model: "auto/chaos"` galapunktā `/v1/chat/completions`:

1. Tiek izveidots panelis ar **vienu modeli no katra nodrošinātāja**: katra
   savienotā nodrošinātāja pirmais kandidāts kandidātu kopas secībā, ne vairāk kā 5 dalībnieki
   (`OMNIROUTE_CHAOS_MAX_PANEL`, maksimālā robeža ir 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). `chaos-mode` svaru
   pakotne tikai iestata katra dalībnieka `weight`; izsūtīšana šo vērtību nenolasa.
2. Tas pats pieprasījums tiek nosūtīts katram paneļa dalībniekam **paralēli**, tāpēc viens pieprasījums
   izmaksā vienu augšupstraumes izsaukumu katram paneļa dalībniekam
   (`open-sse/services/autoCombo/chaosEngine.ts`, nosūtīts no
   `open-sse/services/combo.ts`).
3. Kad pienāk rezultāti, katram paneļa dalībniekam tiek straumēta viena statusa rinda: pēc noklusējuma SSE komentārs
   (`: chaos <index> ok|fail <model>`), kā arī `omni-chaos-part`
   notikums (`model`, `index`, `ok`, `error`), ja pieprasījumā ir iestatīts
   `stream_options.include_chaos_parts: true`. Tie nesatur atbildes tekstu.
4. Kā galīgais OpenAI stila fragments tiek nosūtīta **viena** paneļa atbilde: pirmā paneļa
   dalībnieka atbilde (`auto/chaos` iestata to kā `judgeModel`), ja tā ir veiksmīga, pretējā gadījumā
   pēdējā veiksmīgā dalībnieka atbilde. Pārējās paneļa atbildes netiek atgrieztas, tāpēc
   jūs maksājat par N izsaukumiem un saņemat vienu pabeigto atbildi.

## Iestatīšana

1. Atveriet **Informācijas panelis → Haosa režīms** (`/dashboard/chaos`).
2. **Ieslēdziet** to — Haosa režīms pēc noklusējuma tiek piegādāts **atspējots** (`enabled: false` failā
   `src/lib/chaos/chaosConfig.ts`). Kamēr tas ir atspējots, `POST /api/chaos/run` atbild ar
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Izvēlieties dalībniekus un noklusējuma iestatījumus (katrai instancei tie tiek saglabāti iestatījumu krātuvē):

   | Lauks               | Nozīme                                                                             | Noklusējums / ierobežojumi                                     |
   | ------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------- |
   | `enabled`           | Galvenais slēdzis                                                                  | `false`                                                        |
   | `defaultMode`       | `parallel` vai `collaborative` (skatiet tālāk)                                     | `parallel`                                                     |
   | `providerOverrides` | Katra pakalpojumu sniedzēja dalība (`providerId`, neobligāts `modelId`, `enabled`) | tukšs = katrs aktīvais pakalpojumu sniedzējs, ne vairāk kā 200 |
   | `systemPrompt`      | Iebūvētās Haosa režīma sistēmas uzvednes aizstāšana                                | neobligāts, ne vairāk kā 10 000 rakstzīmju                     |
   | `timeoutMs`         | Maksimālais viena modeļa izsaukuma ilgums                                          | `120000` (5 000–600 000)                                       |
   | `maxTokens`         | `max_tokens` katram modeļa izsaukumam                                              | `4096` (256–128 000)                                           |

4. Palaidiet **testu pašā lapā** — rezultātu panelī tiek parādīta katra pakalpojumu sniedzēja atbilde,
   statuss un ilgums.

## Izpildes režīmi

- **`parallel`** — katrs modelis vienlaikus saņem vienu un to pašu uzdevumu; jūs saņemat visas atbildes
  neatkarīgi citu no citas.
- **`collaborative`** — modeļi darbojas **ķēdē**: katrs redz iepriekšējā modeļa izvadi un
  tiek aicināts to precizēt, paplašināt, kritizēt vai piedāvāt alternatīvu. Atbildes laukā `summary`
  sekmīgās izvades tiek apvienotas ķēdes secībā (paralēlajiem izpildes gadījumiem nav lauka `summary`).

## API

### `POST /api/chaos/run` — informācijas paneļa sesija

Autentificēts ar sīkfailu (pārvaldības sesija — skatiet
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); to izmanto informācijas paneļa lapa.

```jsonc
// pieprasījuma pamatteksts
{
  "task": "Compare approaches to X", // obligāts
  "providers": ["glm", "kimi"], // neobligāts filtrs
  "mode": "parallel", // neobligāts — aizstāj defaultMode
  "systemPrompt": "…", // neobligāta aizstāšana
  "maxTokens": 4096, // neobligāta aizstāšana
}
```

### `POST /api/skills/collect/chaos` — API atslēga

Bearer marķiera variants ārējiem izsaucējiem. Atslēgai jābūt piešķirtai **Haosa režīma atļaujai**
(`chaosModeEnabled`), kas pēc noklusējuma ir **izslēgta** — iespējojiet to katrai atslēgai atsevišķi sadaļā
**Informācijas panelis → API pārvaldnieks → rediģēt atslēgu → atļaujas → Haosa režīms**. Pieprasījuma pamatteksts ir tāds pats kā iepriekš.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Abi galapunkti atgriež vienādas struktūras datus:

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
  "summary": "…", // tikai collaborative režīmā
}
```

## Problēmu novēršana

- **`400 Chaos Mode is not enabled`** — skatiet iepriekš minēto 2. darbību: globālais slēdzis ir izslēgts.
- **API atslēga tiek noraidīta galapunktā `/api/skills/collect/chaos`** — atslēgai nav piešķirta atsevišķās atslēgas
  `chaosModeEnabled` atļauja (pēc noklusējuma tā ir izslēgta; tas ir iestatījums, nevis kļūda).
- **Rezultātos trūkst gaidītā pakalpojumu sniedzēja** — pārbaudiet `providerOverrides` Haosa režīma
  lapā (atspējota aizstāšana to izslēdz), kā arī to, vai pakalpojumu sniedzēja savienojums ir
  aktīvs.
