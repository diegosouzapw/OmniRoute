# Thinking Budget (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

# Budžet za razmišljanje

> **Kontrolna tabla:** Postavke → **AI** → Budžet za razmišljanje  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Izvor:** `open-sse/services/thinkingBudget.ts`

Budžet za razmišljanje (Thinking Budget) kontroliše da li OmniRoute **prepisuje parametre razmišljanja/rezonovanja klijenta** na putu do provajdera. On **ne** uključuje niti isključuje kompresiju, rutiranje ili keširanje upita (prompt cache).

## Režimi

| Režim                               | Šta OmniRoute radi                                                                                                            | Kada koristiti                                                                                                                                                                                       |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (podrazumijevano) | Ostavlja polja klijenta nepromijenjenim (`reasoning`, `reasoning_effort`, Claude `thinking`, Gemini `thinking_config`, itd.). | **Codex / Desktop / bilo koji klijent koji treba da kontroliše napor + sažetke razmišljanja.** Neophodno za vidljive panele razmišljanja kada klijent zahtijeva `reasoning.summary`.                 |
| **`auto`**                          | **Uklanja sva** polja za razmišljanje/rezonovanje iz tijela zahtjeva prije slanja uzvodno.                                    | Samo kada namjerno želite da **provajder** izmisli podrazumijevane vrijednosti i kada vam **nije** potrebno razmišljanje kontrolisano od strane klijenta. **Nije** „automatski prikaz razmišljanja“. |
| **`custom`**                        | Prepisuje svaki zahtjev fiksnim budžetom tokena za razmišljanje.                                                              | Fiksno ograničenje na tokene za razmišljanje za sav saobraćaj.                                                                                                                                       |
| **`adaptive`**                      | Skalira budžet na osnovu baznog napora koristeći broj poruka, alate i dužinu upita.                                           | Meka kontrola tokena bez potpunog uklanjanja namjere klijenta.                                                                                                                                       |

### Šta `auto` uklanja

Kada je režim `auto`, `stripThinkingConfig()` briše (između ostalog):

- OpenAI / Odgovori: `reasoning`, `reasoning_effort`
- Claude: `thinking` i `output_config.effort` kada su prisutni
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Ako klijent (npr. Codex Desktop) pošalje `reasoning: { effort: "ultra", summary: "detailed" }`, **auto odbacuje taj objekat**. Uzvodni sistem može i dalje naplatiti neke tokene za razmišljanje, ali često vraća **prazne ili samo šifrovane** stavke razmišljanja — tako da korisnički interfejs ne prikazuje koristan tok razmišljanja.

## Šta ovo **nije**

| Funkcionalnost                                       | Odnos                                                                                                                                                    |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Kompresija** (Caveman, RTK, stacked, …)            | Zaseban cjevovod. Radi u svakom režimu budžeta za razmišljanje.                                                                                          |
| **Keširanje upita / semantičko keširanje**           | Zasebno. Nije pod uticajem režima budžeta za razmišljanje.                                                                                               |
| **Kombinovano rutiranje / rezervne opcije**          | Zasebno. Nije pod uticajem.                                                                                                                              |
| **Ograničenja tokena API ključa / budžeti troškova** | Zasebno. Nije pod uticajem.                                                                                                                              |
| **Keš ponavljanja razmišljanja**                     | Ponovno ubacivanje za više krugova (multi-turn) za stroge provajdere (DeepSeek, Kimi, Qwen-thinking, …). Nije isto što i Desktop „prikaži razmišljanje“. |
| **Dekriptovanje `encrypted_content`**                | **Nemoguće.** Privatni blokovi razmišljanja OpenAI/Codex su neprozirni. OmniRoute ih nikada ne dekriptuje (#7095 / #7176 / #7304).                       |

## Vidljivo razmišljanje (Codex / Klijenti za odgovore)

Da bi klijent prikazao tekst razmišljanja, potrebno je **sve** od sljedećeg:

1. Thinking Budget način rada = **`passthrough`** (ili custom/adaptive koji i dalje ostavlja zahtjeve za sažetkom dovoljno netaknutim za putanju koju koristite).
2. Klijent traži sažetak, npr. Codex `model_reasoning_summary = "detailed"` / `auto` (ne `none`).
3. Upstream zapravo strimuje `response.reasoning_summary_text.*` (ili neprazan `reasoning.summary` na stavci).

Ako dobijate samo „šifrovano privatno razmišljanje“ (encrypted private reasoning), ili:

- način rada je bio **`auto`** (zahtjev klijenta je uklonjen), ili
- upstream je vratio `encrypted_content` bez teksta sažetka (ograničenje provajdera; OmniRoute može prikazati samo čuvar mjesta, a ne običan tekst).

## API primjeri

```bash
# Čitanje
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Preporučeno za vidljivost razmišljanja u Codex / Desktop
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Šema (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; opcionalno `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### Trajnost / ponovno pokretanje

Vrijednost se pohranjuje pod ključem postavki `thinkingBudget` i hidrira pri pokretanju procesa (`hydrateThinkingBudgetConfig`). Nakon promjene putem baze podataka ili nekih ne-API putanja, **ponovo pokrenite OmniRoute proces** kako bi se singleton u memoriji podudarao sa diskom.

## Kontrolna lista za operatera

- [ ] Codex / Desktop korisnici: način rada = **passthrough**
- [ ] Kompresija je i dalje omogućena ako želite uštedu tokena na **porukama**, a ne uklanjanjem razmišljanja
- [ ] Ne očekujte da će `auto` „prikazati više razmišljanja“
- [ ] Sažeci koji su samo šifrovani su ponašanje **provajdera**; passthrough ih ne može dešifrovati

## Povezana dokumentacija

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — keš za `reasoning_content` sa više razmjena (multi-turn)
- [USER_GUIDE.md](./USER_GUIDE.md) — Kartice kontrolne table postavki
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — krajnje tačke (endpoints) postavki
