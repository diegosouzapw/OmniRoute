# Thinking Budget (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Juhtpaneel:** Seaded → **AI** → Mõtlemise eelarve  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Lähtekood:** `open-sse/services/thinkingBudget.ts`

Mõtlemise eelarve määrab, kas OmniRoute **kirjutab teenusepakkujatele saatmisel ümber kliendi mõtlemis-/arutlusparameetrid**. See **ei** lülita tihendamist, marsruutimist ega viipade vahemälu sisse või välja.

## Režiimid

| Režiim                        | Mida OmniRoute teeb                                                                                                 | Millal kasutada                                                                                                                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (vaikimisi) | Jätab kliendi väljad muutmata (`reasoning`, `reasoning_effort`, Claude’i `thinking`, Gemini `thinking_config` jne). | **Codex / Desktop / iga klient, mis peaks ise määrama pingutuse taseme ja arutluskokkuvõtted.** Nõutav nähtavate mõtlemispaneelide jaoks, kui klient taotleb `reasoning.summary` välja. |
| **`auto`**                    | **Eemaldab kõik** mõtlemis-/arutlusväljad päringu kehast enne ülesvooluteenusele saatmist.                          | Ainult siis, kui soovite teadlikult, et **teenusepakkuja** määraks vaikeväärtused, ja te **ei** vaja kliendi juhitavat mõtlemist. See **ei** tähenda „näita mõtlemist automaatselt”.    |
| **`custom`**                  | Kirjutab iga päringu üle fikseeritud mõtlemisžetoonide eelarvega.                                                   | Mõtlemisžetoonide range ülempiir kogu liiklusele.                                                                                                                                       |
| **`adaptive`**                | Skaleerib eelarvet baaspingutuse järgi, kasutades sõnumite arvu, tööriistu ja viiba pikkust.                        | Paindlik žetoonikasutuse juhtimine ilma kliendi kavatsust täielikult eemaldamata.                                                                                                       |

### Mida `auto` eemaldab

Kui režiim on `auto`, kustutab `stripThinkingConfig()` muu hulgas järgmised väljad:

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking` ja olemasolu korral `output_config.effort`
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Kui klient (nt Codex Desktop) saatis `reasoning: { effort: "ultra", summary: "detailed" }`, siis **eemaldab `auto` selle objekti**. Ülesvooluteenus võib siiski arveldada mõningate arutlusžetoonide eest, kuid tagastab sageli **tühje või ainult krüpteeritud** arutluselemente — seetõttu ei kuvata kasutajaliideses kasulikku mõtlemisvoogu.

## Mida see **ei ole**

| Funktsioon                                      | Seos                                                                                                                                                     |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tihendamine** (Caveman, RTK, virnastatud, …)  | Eraldi töötluskonveier. Töötab kõigis mõtlemiseelarve režiimides.                                                                                        |
| **Viiba-/semantiline vahemälu**                 | Eraldiseisev. Mõtlemiseelarve režiim seda ei mõjuta.                                                                                                     |
| **Kombineeritud marsruutimine / varuvariandid** | Eraldiseisev. Mõju puudub.                                                                                                                               |
| **API-võtme žetoonilimiidid / kulueelarved**    | Eraldiseisev. Mõju puudub.                                                                                                                               |
| **Arutluse taasesituse vahemälu**               | Mitme vooru korral uuesti sisestamine rangete teenusepakkujate jaoks (DeepSeek, Kimi, Qwen-thinking, …). See ei ole sama mis Desktopi „näita mõtlemist”. |
| **`encrypted_content` dekrüptimine**            | **Võimatu.** OpenAI/Codexi privaatsed arutlusplokid on läbipaistmatud. OmniRoute ei dekrüpti neid kunagi (#7095 / #7176 / #7304).                        |

## Nähtav mõttekäik (Codexi / Responsesi kliendid)

Et klient kuvaks mõttekäigu teksti, peavad olema täidetud **kõik** järgmised tingimused:

1. Thinking Budgeti režiim = **`passthrough`** (või kohandatud/adaptiivne režiim, mis jätab kokkuvõttetaotlused kasutatava tee jaoks piisavalt muutmata).
2. Klient taotleb kokkuvõtet, nt Codexis `model_reasoning_summary = "detailed"` / `auto` (mitte `none`).
3. Ülemine teenus voogedastab tegelikult sündmusi `response.reasoning_summary_text.*` (või elemendil on mittetühi `reasoning.summary`).

Kui saate ainult „krüpteeritud privaatse mõttekäigu”, siis:

- režiim oli **`auto`** (kliendi taotlus eemaldati) või
- ülemine teenus tagastas `encrypted_content` ilma kokkuvõtte tekstita (teenusepakkuja piirang; OmniRoute saab kuvada ainult kohatäidet, mitte lihtteksti).

## API näited

```bash
# Lugemine
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Soovitatav Codexis / Desktopis mõttekäigu nähtavaks tegemiseks
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Skeem (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; valikulised `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### Püsivus / taaskäivitamine

Väärtus salvestatakse seadete võtme `thinkingBudget` alla ja laaditakse protsessi käivitamisel (`hydrateThinkingBudgetConfig`). Pärast väärtuse muutmist andmebaasi või mõne API-välise tee kaudu **taaskäivitage OmniRoute'i protsess**, et mälus olev singleton vastaks kettal olevale väärtusele.

## Operaatori kontrollnimekiri

- [ ] Codexi / Desktopi kasutajad: režiim = **passthrough**
- [ ] Kui soovite säästa tokeneid **sõnumitelt**, mitte mõttekäigu eemaldamise kaudu, jätke tihendamine lubatuks
- [ ] Ärge eeldage, et `auto` „näitab rohkem mõttekäiku”
- [ ] Ainult krüpteeritud kokkuvõtted tulenevad **teenusepakkuja** käitumisest; passthrough ei saa neid dekrüpteerida

## Seotud dokumentatsioon

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — mitme vooru `reasoning_content` vahemälu
- [USER_GUIDE.md](./USER_GUIDE.md) — seadete töölaua vahekaardid
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — seadete otspunktid
