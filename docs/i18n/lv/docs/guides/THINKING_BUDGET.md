# Thinking Budget (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Informācijas panelis:** Iestatījumi → **MI** → Domāšanas budžets  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Avots:** `open-sse/services/thinkingBudget.ts`

Domāšanas budžets nosaka, vai OmniRoute **pārraksta klienta domāšanas/spriešanas parametrus**, nosūtot pieprasījumus pakalpojumu sniedzējiem. Tas **neieslēdz un neizslēdz** saspiešanu, maršrutēšanu vai uzvedņu kešatmiņu.

## Režīmi

| Režīms                          | OmniRoute darbība                                                                                                     | Kad izmantot                                                                                                                                                                                      |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (noklusējums) | Atstāj klienta laukus nemainītus (`reasoning`, `reasoning_effort`, Claude `thinking`, Gemini `thinking_config` utt.). | **Codex / Desktop / jebkurš klients, kam jākontrolē piepūles līmenis un spriešanas kopsavilkumi.** Nepieciešams redzamiem domāšanas paneļiem, kad klients pieprasa `reasoning.summary`.           |
| **`auto`**                      | Pirms nosūtīšanas augšupstraumei no pieprasījuma pamatteksta **noņem visus** domāšanas/spriešanas laukus.             | Tikai tad, ja apzināti vēlaties, lai **pakalpojumu sniedzējs** izveido noklusējuma vērtības, un jums nav nepieciešama klienta kontrolēta domāšana. Tas **nenozīmē** „automātiski rādīt domāšanu”. |
| **`custom`**                    | Pārraksta katru pieprasījumu ar fiksētu domāšanas marķieru budžetu.                                                   | Stingrs domāšanas marķieru ierobežojums visai datplūsmai.                                                                                                                                         |
| **`adaptive`**                  | Mērogo budžetu no piepūles pamatlīmeņa, izmantojot ziņojumu skaitu, rīkus un uzvednes garumu.                         | Elastīga marķieru kontrole, pilnībā nenoņemot klienta norādīto ieceri.                                                                                                                            |

### Ko noņem `auto`

Ja ir iestatīts režīms `auto`, `stripThinkingConfig()` cita starpā dzēš:

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking` un `output_config.effort`, ja tas ir norādīts
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Ja klients (piemēram, Codex Desktop) nosūtīja `reasoning: { effort: "ultra", summary: "detailed" }`, režīms **auto atmet šo objektu**. Augšupstraumes pakalpojums joprojām var aprēķināt maksu par dažiem spriešanas marķieriem, taču bieži atgriež **tukšus vai tikai šifrētus** spriešanas vienumus, tāpēc lietotāja saskarnē netiek rādīta noderīga domāšanas plūsma.

## Kas tas **nav**

| Funkcija                                                | Saistība                                                                                                                                                                   |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Saspiešana** (Caveman, RTK, stacked, …)               | Atsevišķs konveijers. Darbojas visos domāšanas budžeta režīmos.                                                                                                            |
| **Uzvedņu / semantiskā kešatmiņa**                      | Atsevišķa funkcija. Domāšanas budžeta režīms to neietekmē.                                                                                                                 |
| **Kombinētā maršrutēšana / atkāpšanās varianti**        | Atsevišķa funkcija. Netiek ietekmēta.                                                                                                                                      |
| **API atslēgu marķieru ierobežojumi / izmaksu budžeti** | Atsevišķa funkcija. Netiek ietekmēta.                                                                                                                                      |
| **Spriešanas atkārtotās atskaņošanas kešatmiņa**        | Vairāku sarunas kārtu atkārtota ievietošana stingriem pakalpojumu sniedzējiem (DeepSeek, Kimi, Qwen-thinking, …). Tas nav tas pats, kas Desktop funkcija „rādīt domāšanu”. |
| **`encrypted_content` atšifrēšana**                     | **Nav iespējama.** OpenAI/Codex privātie spriešanas blobi ir necaurredzami. OmniRoute tos nekad neatšifrē (#7095 / #7176 / #7304).                                         |

## Redzamā domāšana (Codex / Responses klienti)

Lai klients rādītu domāšanas tekstu, ir nepieciešams **viss** tālāk minētais:

1. Thinking Budget režīms = **`passthrough`** (vai `custom`/`adaptive`, kas joprojām saglabā kopsavilkuma pieprasījumus pietiekami nemainītus izmantotajam ceļam).
2. Klients pieprasa kopsavilkumu, piemēram, Codex `model_reasoning_summary = "detailed"` / `auto` (nevis `none`).
3. Augšupējais pakalpojums faktiski straumē `response.reasoning_summary_text.*` (vai vienumā ir netukšs `reasoning.summary`).

Ja saņemat tikai “šifrētu privāto domāšanu”, iemesls ir kāds no šiem:

- režīms bija **`auto`** (klienta pieprasījums tika noņemts), vai
- augšupējais pakalpojums atgrieza `encrypted_content` bez kopsavilkuma teksta (pakalpojuma sniedzēja ierobežojums; OmniRoute var parādīt tikai vietturi, nevis nešifrētu tekstu).

## API piemēri

```bash
# Nolasīšana
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Ieteicams domāšanas redzamībai Codex / Desktop klientos
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Shēma (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; neobligāti: `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### Saglabāšana / restartēšana

Vērtība tiek glabāta zem iestatījumu atslēgas `thinkingBudget` un ielādēta procesa palaišanas laikā (`hydrateThinkingBudgetConfig`). Pēc tās mainīšanas datubāzē vai citos ceļos, kas neizmanto API, **restartējiet OmniRoute procesu**, lai atmiņā esošais vienīgais eksemplārs atbilstu diskā saglabātajam.

## Operatora kontrolsaraksts

- [ ] Codex / Desktop lietotājiem: režīms = **passthrough**
- [ ] Atstājiet saspiešanu iespējotu, ja vēlaties ietaupīt tokenus **ziņojumiem**, nevis noņemot domāšanu
- [ ] Negaidiet, ka `auto` „parādīs vairāk domāšanas”
- [ ] Tikai šifrēti kopsavilkumi ir **pakalpojuma sniedzēja** darbība; `passthrough` nevar tos atšifrēt

## Saistītā dokumentācija

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — vairāku sarunas kārtu `reasoning_content` kešatmiņa
- [USER_GUIDE.md](./USER_GUIDE.md) — iestatījumu informācijas paneļa cilnes
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — iestatījumu galapunkti
