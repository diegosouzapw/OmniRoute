# Thinking Budget (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇧🇦 [bs](../../../bs/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Kontrollpanel:** Innstillinger → **AI** → Tenkebudsjett  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Kilde:** `open-sse/services/thinkingBudget.ts`

Tenkebudsjettet styrer om OmniRoute **skriver om klientens parametere for tenking/resonnering** på vei til leverandørene. Det slår **ikke** komprimering, ruting eller promptbufring av eller på.

## Moduser

| Modus                        | Hva OmniRoute gjør                                                                                                  | Når den bør brukes                                                                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (standard) | Lar klientfeltene være uendret (`reasoning`, `reasoning_effort`, Claude `thinking`, Gemini `thinking_config` osv.). | **Codex / Desktop / enhver klient som skal styre innsats + resonneringssammendrag.** Kreves for synlige tenkepaneler når klienten ber om `reasoning.summary`. |
| **`auto`**                   | **Fjerner alle** tenke-/resonneringsfelt fra forespørselskroppen før den sendes oppstrøms.                          | Bare når du bevisst vil at **leverandøren** skal finne standardverdier, og du **ikke** trenger klientstyrt tenking. Betyr **ikke** «vis tenking automatisk».  |
| **`custom`**                 | Overskriver hver forespørsel med et fast tokenbudsjett for tenking.                                                 | En absolutt grense for antall tenketokener for all trafikk.                                                                                                   |
| **`adaptive`**               | Skalerer budsjettet fra en grunninnsats basert på antall meldinger, verktøy og promptlengde.                        | Fleksibel tokenkontroll uten å fjerne klientens intensjon fullstendig.                                                                                        |

### Hva `auto` fjerner

Når modusen er `auto`, sletter `stripThinkingConfig()` blant annet:

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking` og `output_config.effort` når det finnes
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Hvis en klient (f.eks. Codex Desktop) sendte `reasoning: { effort: "ultra", summary: "detailed" }`, **fjerner auto dette objektet**. Oppstrømsleverandøren kan fortsatt fakturere for noen resonneringstokener, men returnerer ofte **tomme eller kun krypterte** resonneringselementer – derfor viser brukergrensesnittet ingen nyttig tenkestrøm.

## Hva dette **ikke** er

| Funksjon                                                   | Sammenheng                                                                                                                                |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Komprimering** (Caveman, RTK, stablet, …)                | En separat behandlingskjede. Fungerer i alle moduser for tenkebudsjett.                                                                   |
| **Prompt-/semantisk hurtigbuffer**                         | Separat. Påvirkes ikke av modusen for tenkebudsjett.                                                                                      |
| **Kombinasjonsruting / reserveløsninger**                  | Separat. Påvirkes ikke.                                                                                                                   |
| **Tokenbegrensninger / kostnadsbudsjetter for API-nøkler** | Separat. Påvirkes ikke.                                                                                                                   |
| **Hurtigbuffer for resonneringsavspilling**                | Gjeninnsetting over flere runder for strenge leverandører (DeepSeek, Kimi, Qwen-thinking, …). Ikke det samme som «vis tenking» i Desktop. |
| **Dekryptering av `encrypted_content`**                    | **Umulig.** Private resonneringsblokker fra OpenAI/Codex er ugjennomsiktige. OmniRoute dekrypterer dem aldri (#7095 / #7176 / #7304).     |

## Synlig tenkning (Codex-/Responses-klienter)

For at en klient skal vise tenketekst, trenger du **alt** dette:

1. Thinking Budget-modus = **`passthrough`** (eller custom/adaptive som fortsatt lar forespørsler om sammendrag være tilstrekkelig intakte for banen du bruker).
2. Klienten ber om et sammendrag, f.eks. Codex `model_reasoning_summary = "detailed"` / `auto` (ikke `none`).
3. Oppstrømstjenesten strømmer faktisk `response.reasoning_summary_text.*` (eller et ikke-tomt `reasoning.summary` på elementet).

Hvis du bare får «kryptert privat resonnering», skyldes det enten:

- at modusen var **`auto`** (klientforespørselen ble fjernet), eller
- at oppstrømstjenesten returnerte `encrypted_content` uten sammendragstekst (leverandørbegrensning; OmniRoute kan bare vise en plassholder, ikke klartekst).

## API-eksempler

```bash
# Les
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Anbefalt for synlig tenkning i Codex / Desktop
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Skjema (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; valgfrie `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### Persistens / omstart

Verdien lagres under innstillingsnøkkelen `thinkingBudget` og lastes inn ved prosessoppstart (`hydrateThinkingBudgetConfig`). Etter endring via databasen eller enkelte baner utenom API-et må du **starte OmniRoute-prosessen på nytt**, slik at singleton-objektet i minnet samsvarer med det som er lagret på disken.

## Sjekkliste for operatører

- [ ] Codex-/Desktop-brukere: modus = **passthrough**
- [ ] La komprimering være aktivert hvis du vil spare tokenbruk på **meldinger**, ikke ved å fjerne tenkning
- [ ] Ikke forvent at `auto` skal «vise mer tenkning»
- [ ] Sammendrag som bare er kryptert, er en **leverandøratferd**; passthrough kan ikke dekryptere dem

## Relatert dokumentasjon

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — hurtigbuffer for `reasoning_content` over flere runder
- [USER_GUIDE.md](./USER_GUIDE.md) — faner i innstillingspanelet
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — endepunkter for innstillinger
