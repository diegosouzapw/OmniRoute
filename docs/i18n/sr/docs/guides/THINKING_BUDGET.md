# Thinking Budget (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Kontrolna tabla:** Podešavanja → **AI** → Budžet za razmišljanje  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Izvor:** `open-sse/services/thinkingBudget.ts`

Budžet za razmišljanje kontroliše da li OmniRoute **prepisuje klijentske parametre za razmišljanje/rezonovanje** na putu do provajdera. On **ne** uključuje niti isključuje kompresiju, rutiranje ili keš promptova.

## Režimi

| Režim                             | Šta OmniRoute radi                                                                                                         | Kada koristiti                                                                                                                                                                        |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (podrazumevano) | Ostavlja klijentska polja neizmenjena (`reasoning`, `reasoning_effort`, Claude `thinking`, Gemini `thinking_config` itd.). | **Codex / Desktop / bilo koji klijent koji treba da kontroliše napor + sažetke rezonovanja.** Neophodno za vidljive panele razmišljanja kada klijent zahteva `reasoning.summary`.     |
| **`auto`**                        | **Uklanja sva** polja za razmišljanje/rezonovanje iz tela zahteva pre slanja uzvodnom servisu.                             | Samo kada namerno želite da **provajder** odredi podrazumevane vrednosti i kada vam nije potrebno da klijent kontroliše razmišljanje. **Ne** znači „automatski prikaži razmišljanje“. |
| **`custom`**                      | Prepisuje svaki zahtev fiksnim budžetom tokena za razmišljanje.                                                            | Čvrsto ograničenje tokena za razmišljanje za sav saobraćaj.                                                                                                                           |
| **`adaptive`**                    | Skalira budžet na osnovu početnog nivoa napora, koristeći broj poruka, alate i dužinu prompta.                             | Fleksibilna kontrola tokena bez potpunog uklanjanja namere klijenta.                                                                                                                  |

### Šta `auto` uklanja

Kada je režim `auto`, `stripThinkingConfig()` briše (između ostalog):

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking` i `output_config.effort` kada postoji
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Ako je klijent (npr. Codex Desktop) poslao `reasoning: { effort: "ultra", summary: "detailed" }`, **auto odbacuje taj objekat**. Uzvodni servis i dalje može da naplati određeni broj tokena za rezonovanje, ali često vraća **prazne ili samo šifrovane** stavke rezonovanja — pa korisnički interfejs ne prikazuje koristan tok razmišljanja.

## Šta ovo **nije**

| Funkcija                                             | Odnos                                                                                                                                                |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Kompresija** (Caveman, RTK, stacked, …)            | Zaseban procesni tok. Radi u svakom režimu budžeta za razmišljanje.                                                                                  |
| **Keš promptova / semantički keš**                   | Zasebno. Režim budžeta za razmišljanje ne utiče na njega.                                                                                            |
| **Kombinovano rutiranje / rezervne opcije**          | Zasebno. Nema uticaja.                                                                                                                               |
| **Ograničenja tokena API ključa / budžeti troškova** | Zasebno. Nema uticaja.                                                                                                                               |
| **Keš za ponavljanje rezonovanja**                   | Ponovno umetanje u razgovore sa više poteza za stroge provajdere (DeepSeek, Kimi, Qwen-thinking, …). Nije isto što i Desktop „prikaži razmišljanje“. |
| **Dešifrovanje `encrypted_content`**                 | **Nemoguće.** Privatni OpenAI/Codex blobovi rezonovanja nisu čitljivi. OmniRoute ih nikada ne dešifruje (#7095 / #7176 / #7304).                     |

## Видљиво размишљање (Codex / Responses клијенти)

Да би клијент приказао текст размишљања, потребно је **све** од следећег:

1. Режим буџета размишљања = **`passthrough`** (или прилагођени/адаптивни режим који и даље оставља захтеве за сажетак довољно неизмењеним за путању коју користите).
2. Клијент тражи сажетак, нпр. Codex `model_reasoning_summary = "detailed"` / `auto` (не `none`).
3. Надређени сервис заиста стримује `response.reasoning_summary_text.*` (или ставка садржи `reasoning.summary` који није празан).

Ако добијате само „шифровано приватно размишљање“, разлог је једно од следећег:

- режим је био **`auto`** (захтев клијента је уклоњен), или
- надређени сервис је вратио `encrypted_content` без текста сажетка (ограничење добављача; OmniRoute може да прикаже само заменски текст, не и отворени текст).

## Примери API-ја

```bash
# Читање
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Препоручено за видљивост размишљања у Codex-у / десктоп апликацији
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Шема (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; опциони `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### Перзистенција / поновно покретање

Вредност се чува под кључем подешавања `thinkingBudget` и учитава при покретању процеса (`hydrateThinkingBudgetConfig`). Након измене преко базе података или неких путања које не користе API, **поново покрените OmniRoute процес** како би синглтон у меморији одговарао стању на диску.

## Контролна листа за оператере

- [ ] Корисници Codex-а / десктоп апликације: режим = **passthrough**
- [ ] Компресија је и даље омогућена ако желите уштеду токена за **поруке**, а не уклањањем размишљања
- [ ] Не очекујте да ће `auto` „приказати више размишљања“
- [ ] Сажетци који су доступни само у шифрованом облику представљају понашање **добављача**; passthrough не може да их дешифрује

## Повезана документација

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — вишекружни кеш за `reasoning_content`
- [USER_GUIDE.md](./USER_GUIDE.md) — картице контролне табле за подешавања
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — крајње тачке за подешавања
