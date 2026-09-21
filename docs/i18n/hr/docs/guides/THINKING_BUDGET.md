# Thinking Budget (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Nadzorna ploča:** Postavke → **AI** → Proračun razmišljanja  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Izvor:** `open-sse/services/thinkingBudget.ts`

Proračun razmišljanja određuje hoće li OmniRoute **prepisivati klijentske parametre razmišljanja/rezoniranja** pri slanju pružateljima usluga. On **ne** uključuje niti isključuje kompresiju, usmjeravanje ili predmemoriju upita.

## Načini rada

| Način rada                 | Što OmniRoute radi                                                                                                              | Kada upotrebljavati                                                                                                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (zadano) | Ostavlja klijentska polja nepromijenjenima (`reasoning`, `reasoning_effort`, Claude `thinking`, Gemini `thinking_config` itd.). | **Codex / Desktop / bilo koji klijent koji treba upravljati razinom napora i sažecima rezoniranja.** Obavezno za vidljive ploče razmišljanja kada klijent zatraži `reasoning.summary`. |
| **`auto`**                 | **Uklanja sva** polja razmišljanja/rezoniranja iz tijela zahtjeva prije slanja nadređenom pružatelju.                           | Samo kada namjerno želite da **pružatelj usluge** odredi zadane vrijednosti i **ne** trebate razmišljanje kojim upravlja klijent. **Ne** znači „automatski prikaži razmišljanje”.      |
| **`custom`**               | Prepisuje svaki zahtjev fiksnim proračunom tokena za razmišljanje.                                                              | Strogo ograničenje tokena za razmišljanje za sav promet.                                                                                                                               |
| **`adaptive`**             | Skalira proračun na temelju osnovne razine napora, koristeći broj poruka, alate i duljinu upita.                                | Fleksibilna kontrola tokena bez potpunog uklanjanja namjere klijenta.                                                                                                                  |

### Što `auto` uklanja

Kada je način rada `auto`, `stripThinkingConfig()` briše (između ostalog):

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking` i `output_config.effort` kada postoji
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Ako je klijent (npr. Codex Desktop) poslao `reasoning: { effort: "ultra", summary: "detailed" }`, **`auto` odbacuje taj objekt**. Nadređeni pružatelj i dalje može naplatiti određeni broj tokena za rezoniranje, ali često vraća **prazne ili samo šifrirane** stavke rezoniranja — pa korisničko sučelje ne prikazuje koristan tok razmišljanja.

## Što ovo **nije**

| Značajka                                                | Odnos                                                                                                                                                 |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Kompresija** (Caveman, RTK, stacked, …)               | Zaseban procesni slijed. Radi u svakom načinu proračuna razmišljanja.                                                                                 |
| **Predmemorija upita / semantička predmemorija**        | Zasebno. Način proračuna razmišljanja ne utječe na to.                                                                                                |
| **Kombinirano usmjeravanje / pričuvne opcije**          | Zasebno. Bez utjecaja.                                                                                                                                |
| **Ograničenja tokena API ključa / troškovni proračuni** | Zasebno. Bez utjecaja.                                                                                                                                |
| **Predmemorija ponovne reprodukcije rezoniranja**       | Ponovno umetanje kroz više krugova za stroge pružatelje (DeepSeek, Kimi, Qwen-thinking, …). Nije isto što i Desktopova opcija „prikaži razmišljanje”. |
| **Dešifriranje `encrypted_content`**                    | **Nemoguće.** Privatni blobovi rezoniranja sustava OpenAI/Codex neprozirni su. OmniRoute ih nikada ne dešifrira (#7095 / #7176 / #7304).              |

## Vidljivo razmišljanje (Codex / Responses klijenti)

Da bi klijent prikazao tekst razmišljanja, potrebno je **sve** od sljedećeg:

1. Način Thinking Budget = **`passthrough`** (ili prilagođeni/adaptivni način koji zahtjeve za sažetkom ostavlja dovoljno netaknutima za put koji upotrebljavate).
2. Klijent traži sažetak, npr. Codex `model_reasoning_summary = "detailed"` / `auto` (ne `none`).
3. Nadređeni servis stvarno šalje tok `response.reasoning_summary_text.*` (ili stavka sadrži `reasoning.summary` koji nije prazan).

Ako dobivate samo „šifrirano privatno razmišljanje”, razlog je jedno od sljedećeg:

- način je bio **`auto`** (zahtjev klijenta je uklonjen) ili
- nadređeni servis vratio je `encrypted_content` bez teksta sažetka (ograničenje pružatelja; OmniRoute može prikazati samo rezervirano mjesto, ne i čisti tekst).

## Primjeri API-ja

```bash
# Čitanje
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Preporučeno za vidljivost razmišljanja u Codexu / Desktopu
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Shema (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; neobavezni `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### Trajnost / ponovno pokretanje

Vrijednost se pohranjuje pod ključem postavki `thinkingBudget` i učitava pri pokretanju procesa (`hydrateThinkingBudgetConfig`). Nakon promjene putem baze podataka ili nekim putem koji ne upotrebljava API, **ponovno pokrenite proces OmniRoute** kako bi instanca u memoriji odgovarala stanju na disku.

## Kontrolni popis za operatere

- [ ] Korisnici Codexa / Desktopa: način = **passthrough**
- [ ] Kompresija je i dalje omogućena ako želite uštedu tokena na **porukama**, a ne uklanjanjem razmišljanja
- [ ] Nemojte očekivati da će `auto` „prikazati više razmišljanja”
- [ ] Sažeci koji su dostupni samo u šifriranom obliku ponašanje su **pružatelja**; passthrough ih ne može dešifrirati

## Povezana dokumentacija

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — predmemorija `reasoning_content` kroz više krugova razgovora
- [USER_GUIDE.md](./USER_GUIDE.md) — kartice nadzorne ploče postavki
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — krajnje točke postavki
