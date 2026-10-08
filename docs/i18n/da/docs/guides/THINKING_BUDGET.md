# Thinking Budget (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇧🇦 [bs](../../../bs/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Dashboard:** Indstillinger → **AI** → Tænkebudget  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Kilde:** `open-sse/services/thinkingBudget.ts`

Tænkebudgettet styrer, om OmniRoute **omskriver klientens parametre for tænkning/ræsonnement**, før anmodningen sendes til udbydere. Det slår **ikke** komprimering, routing eller promptcache til eller fra.

## Tilstande

| Tilstand                     | Hvad OmniRoute gør                                                                                                      | Hvornår den bør bruges                                                                                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (standard) | Lader klientfelterne være uændrede (`reasoning`, `reasoning_effort`, Claude `thinking`, Gemini `thinking_config` osv.). | **Codex / Desktop / enhver klient, der selv skal styre indsats + ræsonnementsresumeer.** Påkrævet for synlige tænkepaneler, når klienten anmoder om `reasoning.summary`.   |
| **`auto`**                   | **Fjerner alle** tænknings-/ræsonnementsfelter fra anmodningens body, før den sendes upstream.                          | Kun når du bevidst ønsker, at **udbyderen** skal fastsætte standardværdier, og du **ikke** har brug for klientstyret tænkning. Betyder **ikke** “vis automatisk tænkning”. |
| **`custom`**                 | Overskriver hver anmodning med et fast tokenbudget til tænkning.                                                        | Fast loft over antallet af tænkningstokens for al trafik.                                                                                                                  |
| **`adaptive`**               | Skalerer budgettet ud fra en grundindsats ved hjælp af antal beskeder, værktøjer og promptlængde.                       | Fleksibel tokenstyring uden helt at fjerne klientens hensigt.                                                                                                              |

### Hvad `auto` fjerner

Når tilstanden er `auto`, sletter `stripThinkingConfig()` blandt andet:

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking` og `output_config.effort`, når det findes
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Hvis en klient (f.eks. Codex Desktop) sendte `reasoning: { effort: "ultra", summary: "detailed" }`, **fjerner auto dette objekt**. Upstream kan stadig fakturere for visse ræsonnementstokens, men returnerer ofte **tomme ræsonnementselementer eller elementer, der kun er krypterede** — så brugergrænsefladen viser ingen brugbar tankestrøm.

## Hvad dette **ikke** er

| Funktion                                            | Forhold                                                                                                                                          |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Komprimering** (Caveman, RTK, stacked, …)         | Separat pipeline. Fungerer i alle tilstande for tænkebudgettet.                                                                                  |
| **Prompt-/semantisk cache**                         | Separat. Påvirkes ikke af tilstanden for tænkebudgettet.                                                                                         |
| **Kombinationsrouting / fallbacks**                 | Separat. Påvirkes ikke.                                                                                                                          |
| **API-nøglers tokengrænser / omkostningsbudgetter** | Separat. Påvirkes ikke.                                                                                                                          |
| **Cache til genafspilning af ræsonnement**          | Genindsættelse over flere samtalerunder for strikse udbydere (DeepSeek, Kimi, Qwen-thinking, …). Er ikke det samme som “vis tænkning” i Desktop. |
| **Dekryptering af `encrypted_content`**             | **Umuligt.** Private ræsonnementsblobs fra OpenAI/Codex er uigennemsigtige. OmniRoute dekrypterer dem aldrig (#7095 / #7176 / #7304).            |

## Synlig tænkning (Codex-/Responses-klienter)

For at en klient kan vise tænkningstekst, skal **alle** følgende betingelser være opfyldt:

1. Thinking Budget-tilstand = **`passthrough`** (eller custom/adaptive, der stadig bevarer anmodninger om opsummeringer tilstrækkeligt intakte til den sti, du bruger).
2. Klienten anmoder om en opsummering, f.eks. Codex `model_reasoning_summary = "detailed"` / `auto` (ikke `none`).
3. Upstream streamer faktisk `response.reasoning_summary_text.*` (eller et ikke-tomt `reasoning.summary` på elementet).

Hvis du kun får “krypteret privat ræsonnement”, skyldes det enten:

- at tilstanden var **`auto`** (klientanmodningen blev fjernet), eller
- at upstream returnerede `encrypted_content` uden opsummeringstekst (en udbyderbegrænsning; OmniRoute kan kun vise en pladsholder, ikke klartekst).

## API-eksempler

```bash
# Læs
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Anbefalet til synlig tænkning i Codex / Desktop
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Skema (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; valgfri `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### Lagring / genstart

Værdien gemmes under indstillingsnøglen `thinkingBudget` og indlæses ved processtart (`hydrateThinkingBudgetConfig`). Efter ændring via databasen eller visse stier uden om API'et skal du **genstarte OmniRoute-processen**, så singletonen i hukommelsen stemmer overens med disken.

## Tjekliste for operatører

- [ ] Codex-/Desktop-brugere: tilstand = **passthrough**
- [ ] Lad komprimering forblive aktiveret, hvis du vil spare tokens på **beskeder**, ikke ved at fjerne tænkning
- [ ] Forvent ikke, at `auto` “viser mere tænkning”
- [ ] Opsummeringer, der kun er krypterede, er en **udbyderadfærd**; passthrough kan ikke dekryptere dem

## Relateret dokumentation

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — cache til `reasoning_content` over flere ture
- [USER_GUIDE.md](./USER_GUIDE.md) — faner på indstillingsdashboardet
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — indstillingsendpoints
