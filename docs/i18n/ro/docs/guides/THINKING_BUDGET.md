# Thinking Budget (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Panou de control:** Setări → **AI** → Buget de gândire  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Sursă:** `open-sse/services/thinkingBudget.ts`

Bugetul de gândire controlează dacă OmniRoute **rescrie parametrii de gândire/raționament ai clientului** în drumul către furnizori. Acesta **nu** activează sau dezactivează compresia, rutarea ori memoria cache pentru prompturi.

## Moduri

| Mod                          | Ce face OmniRoute                                                                                                                        | Când se utilizează                                                                                                                                                                                   |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (implicit) | Lasă neschimbate câmpurile clientului (`reasoning`, `reasoning_effort`, `thinking` pentru Claude, `thinking_config` pentru Gemini etc.). | **Codex / Desktop / orice client care trebuie să controleze efortul și rezumatele raționamentului.** Necesar pentru panourile de gândire vizibile atunci când clientul solicită `reasoning.summary`. |
| **`auto`**                   | **Elimină toate** câmpurile de gândire/raționament din corpul cererii înainte de trimiterea în amonte.                                   | Numai atunci când doriți în mod deliberat ca **furnizorul** să stabilească valorile implicite și **nu** aveți nevoie de gândire controlată de client. **Nu** înseamnă „afișează automat gândirea”.   |
| **`custom`**                 | Suprascrie fiecare cerere cu un buget fix de tokenuri pentru gândire.                                                                    | Limită strictă a tokenurilor de gândire pentru întregul trafic.                                                                                                                                      |
| **`adaptive`**               | Ajustează bugetul pornind de la un efort de bază, folosind numărul de mesaje, instrumentele și lungimea promptului.                      | Control flexibil al tokenurilor, fără a elimina complet intenția clientului.                                                                                                                         |

### Ce elimină `auto`

Când modul este `auto`, `stripThinkingConfig()` șterge (printre altele):

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking` și `output_config.effort`, atunci când este prezent
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Dacă un client (de exemplu, Codex Desktop) a trimis `reasoning: { effort: "ultra", summary: "detailed" }`, modul **auto elimină acel obiect**. Serviciul din amonte poate factura în continuare unele tokenuri de raționament, dar returnează adesea elemente de raționament **goale sau doar criptate** — astfel încât interfața cu utilizatorul nu afișează niciun flux de gândire util.

## Ce **nu** este această funcție

| Funcționalitate                                           | Relație                                                                                                                                                                |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Compresie** (Caveman, RTK, stacked, …)                  | Pipeline separat. Funcționează în fiecare mod al bugetului de gândire.                                                                                                 |
| **Memorie cache pentru prompturi / semantică**            | Separată. Nu este afectată de modul bugetului de gândire.                                                                                                              |
| **Rutare combinată / variante de rezervă**                | Separate. Nu sunt afectate.                                                                                                                                            |
| **Limite de tokenuri pentru cheile API / bugete de cost** | Separate. Nu sunt afectate.                                                                                                                                            |
| **Memorie cache pentru reluarea raționamentului**         | Reinjectare pe parcursul mai multor conversații pentru furnizori stricți (DeepSeek, Kimi, Qwen-thinking, …). Nu este același lucru cu „afișează gândirea” din Desktop. |
| **Decriptarea `encrypted_content`**                       | **Imposibilă.** Bloburile private de raționament OpenAI/Codex sunt opace. OmniRoute nu le decriptează niciodată (#7095 / #7176 / #7304).                               |

## Raționament vizibil (clienți Codex / Responses)

Pentru ca un client să afișeze textul raționamentului, aveți nevoie de **toate** următoarele:

1. Modul Thinking Budget = **`passthrough`** (sau custom/adaptive care păstrează totuși solicitările de rezumat suficient de intacte pentru calea utilizată).
2. Clientul solicită un rezumat, de exemplu Codex `model_reasoning_summary = "detailed"` / `auto` (nu `none`).
3. Serviciul din amonte transmite efectiv în flux `response.reasoning_summary_text.*` (sau un `reasoning.summary` care nu este gol în element).

Dacă primiți doar „raționament privat criptat”, atunci fie:

- modul a fost **`auto`** (solicitarea clientului a fost eliminată), fie
- serviciul din amonte a returnat `encrypted_content` fără textul rezumatului (limitare a furnizorului; OmniRoute poate afișa doar un substituent, nu textul în clar).

## Exemple API

```bash
# Citire
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Recomandat pentru vizibilitatea raționamentului în Codex / Desktop
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Schemă (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; opțional `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### Persistență / repornire

Valoarea este stocată sub cheia de setări `thinkingBudget` și încărcată la pornirea procesului (`hydrateThinkingBudgetConfig`). După modificarea prin baza de date sau prin unele căi care nu utilizează API-ul, **reporniți procesul OmniRoute**, astfel încât instanța singleton din memorie să corespundă datelor de pe disc.

## Listă de verificare pentru operator

- [ ] Utilizatori Codex / Desktop: modul = **passthrough**
- [ ] Compresia rămâne activată dacă doriți să economisiți tokenuri pentru **mesaje**, nu prin eliminarea raționamentului
- [ ] Nu vă așteptați ca `auto` să „afișeze mai mult raționament”
- [ ] Rezumatele disponibile doar în formă criptată reprezintă un comportament al **furnizorului**; passthrough nu le poate decripta

## Documentație conexă

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — memoria cache `reasoning_content` pentru conversații cu mai multe schimburi
- [USER_GUIDE.md](./USER_GUIDE.md) — filele panoului de setări
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — endpointuri pentru setări
