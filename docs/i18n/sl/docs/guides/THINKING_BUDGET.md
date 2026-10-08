# Thinking Budget (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇧🇦 [bs](../../../bs/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Nadzorna plošča:** Nastavitve → **AI** → Proračun razmišljanja  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Izvorna koda:** `open-sse/services/thinkingBudget.ts`

Proračun razmišljanja določa, ali OmniRoute **prepiše odjemalčeve parametre za razmišljanje/sklepanje** na poti do ponudnikov. **Ne** vklaplja ali izklaplja stiskanja, usmerjanja ali predpomnilnika pozivov.

## Načini

| Način                        | Kaj naredi OmniRoute                                                                                                       | Kdaj ga uporabiti                                                                                                                                                                       |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (privzeto) | Odjemalčeva polja pusti nespremenjena (`reasoning`, `reasoning_effort`, Claude `thinking`, Gemini `thinking_config` itd.). | **Codex / Desktop / kateri koli odjemalec, ki mora nadzorovati intenzivnost + povzetke sklepanja.** Obvezno za vidne plošče razmišljanja, ko odjemalec zahteva `reasoning.summary`.     |
| **`auto`**                   | Pred pošiljanjem nadrejenemu ponudniku iz telesa zahteve **odstrani vsa** polja za razmišljanje/sklepanje.                 | Samo kadar namerno želite, da **ponudnik** sam določi privzete vrednosti, in ne potrebujete razmišljanja, ki ga nadzoruje odjemalec. To **ne** pomeni »samodejno prikaži razmišljanje«. |
| **`custom`**                 | Vsako zahtevo prepiše s fiksnim proračunom žetonov za razmišljanje.                                                        | Stroga omejitev žetonov za razmišljanje za ves promet.                                                                                                                                  |
| **`adaptive`**               | Proračun prilagaja glede na osnovno intenzivnost z uporabo števila sporočil, orodij in dolžine poziva.                     | Prilagodljiv nadzor žetonov brez popolne odstranitve namena odjemalca.                                                                                                                  |

### Kaj odstrani `auto`

Ko je način nastavljen na `auto`, `stripThinkingConfig()` med drugim izbriše:

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking` in `output_config.effort`, kadar je prisoten
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Če je odjemalec (npr. Codex Desktop) poslal `reasoning: { effort: "ultra", summary: "detailed" }`, način **auto ta objekt odstrani**. Nadrejeni ponudnik lahko še vedno zaračuna nekaj žetonov za sklepanje, vendar pogosto vrne **prazne ali samo šifrirane** elemente sklepanja — zato uporabniški vmesnik ne prikaže uporabnega toka razmišljanja.

## Kaj to **ni**

| Funkcija                                               | Povezava                                                                                                                                                                 |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Stiskanje** (Caveman, RTK, stacked, …)               | Ločen cevovod. Deluje v vseh načinih proračuna razmišljanja.                                                                                                             |
| **Predpomnilnik pozivov / semantični predpomnilnik**   | Ločeno. Način proračuna razmišljanja nanj ne vpliva.                                                                                                                     |
| **Kombinirano usmerjanje / nadomestne poti**           | Ločeno. Nanje ne vpliva.                                                                                                                                                 |
| **Omejitve žetonov ključa API / stroškovni proračuni** | Ločeno. Nanje ne vpliva.                                                                                                                                                 |
| **Predpomnilnik ponovnega predvajanja sklepanja**      | Ponovno vstavljanje v več zaporednih pogovornih korakih za stroge ponudnike (DeepSeek, Kimi, Qwen-thinking, …). Ni isto kot »prikaži razmišljanje« v aplikaciji Desktop. |
| **Dešifriranje `encrypted_content`**                   | **Ni mogoče.** Zasebni blobi sklepanja OpenAI/Codex so neprosojni. OmniRoute jih nikoli ne dešifrira (#7095 / #7176 / #7304).                                            |

## Vidno razmišljanje (odjemalci Codex / Responses)

Da odjemalec prikaže besedilo razmišljanja, potrebujete **vse** naslednje:

1. Način Thinking Budget = **`passthrough`** (ali `custom`/`adaptive`, ki zahteve za povzetek še vedno ohrani dovolj nespremenjene za uporabljeno pot).
2. Odjemalec zahteva povzetek, npr. Codex `model_reasoning_summary = "detailed"` / `auto` (ne `none`).
3. Zaledni ponudnik dejansko pretočno pošilja `response.reasoning_summary_text.*` (ali neprazen `reasoning.summary` v elementu).

Če prejmete samo »šifrirano zasebno razmišljanje«, velja eno od naslednjega:

- način je bil **`auto`** (zahteva odjemalca je bila odstranjena) ali
- zaledni ponudnik je vrnil `encrypted_content` brez besedila povzetka (omejitev ponudnika; OmniRoute lahko prikaže le označbo mesta, ne pa navadnega besedila).

## Primeri API-ja

```bash
# Branje
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Priporočeno za vidnost razmišljanja v Codexu / namiznem odjemalcu
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Shema (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; izbirno `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### Trajnost / ponovni zagon

Vrednost je shranjena pod ključem nastavitev `thinkingBudget` in naložena ob zagonu procesa (`hydrateThinkingBudgetConfig`). Po spremembi prek podatkovne zbirke ali nekaterih poti, ki ne uporabljajo API-ja, **znova zaženite proces OmniRoute**, da se primerek v pomnilniku ujema s stanjem na disku.

## Kontrolni seznam za skrbnike

- [ ] Uporabniki Codexa / namiznega odjemalca: način = **passthrough**
- [ ] Če želite prihraniti žetone pri **sporočilih**, naj stiskanje ostane omogočeno; razmišljanja ne odstranjujte
- [ ] Ne pričakujte, da bo `auto` »prikazal več razmišljanja«
- [ ] Povzetki, ki so samo šifrirani, so vedenje **ponudnika**; `passthrough` jih ne more dešifrirati

## Povezana dokumentacija

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — medpogovorni predpomnilnik `reasoning_content`
- [USER_GUIDE.md](./USER_GUIDE.md) — zavihki nadzorne plošče z nastavitvami
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — končne točke nastavitev
