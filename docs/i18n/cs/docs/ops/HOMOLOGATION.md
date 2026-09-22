# Homologation Suite (`npm run homolog`) (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

E2E validace nasazení OmniRoute v reálném prostředí běžícím na homologačním VPS
(`HOMOLOG_BASE_URL`, např. `http://192.168.0.15:20128`). Jediný příkaz nahrazuje ruční
kontrolní seznam STOP #2 pro vydání automatizovaným během, který vytváří důkazy.

## Co pokrývá

| Vrstva                    | Co kontroluje                                                                                                                                                                                                        | Implementace                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — stav/parita          | `/api/monitoring/health` odpovídá kódem `200` se `status: "healthy"` a očekávanou verzí                                                                                                                              | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — dočasný klíč        | Přihlášení správce → `POST /api/keys` vytvoří pro běh API klíč s omezeným rozsahem, který je bez ohledu na výsledek odvolán (`DELETE /api/keys/:id`) v bloku `finally`                                               | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — rozhraní API        | Katalog `/v1/models`, skutečné nestreamované dokončení chatu (model kritický pro danou úroveň, `max_tokens: 5`), odpověď `401` pro neplatný klíč a veřejný endpoint `/api/monitoring/health`                         | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — streamování SSE     | Skutečné streamované dokončení chatu; ověřuje `text/event-stream`, alespoň jeden obsahový přírůstek a ukončovací značku `[DONE]`                                                                                     | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — reální poskytovatelé | Jeden chatovací požadavek s minimálními náklady pro každého kritického poskytovatele přítomného v živém katalogu `/v1/models`, generovaný za běhu pomocí promptfoo                                                   | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — autentizace UI      | Jednou se přihlásí prostřednictvím skutečného přihlašovacího formuláře a znovu používá relaci (`storageState`) napříč vrstvou UI                                                                                     | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — trasy UI            | Každá statická stránka `page.tsx` v `src/app/(dashboard)/dashboard` (zjištěná ze souborového systému; dynamické trasy `[param]` jsou přeskočeny) se načte bez chyby HTTP, chyby stránky nebo chybové hranice Next.js | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — kritický tok UI     | Vytvoří API klíč prostřednictvím UI řídicího panelu a následně jej znovu odvolá (na VPS nezanechá žádné pozůstatky)                                                                                                  | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — sjednocený report    | Sloučí httpYac (prostřednictvím `junit-to-ctrf`), adaptér promptfoo→CTRF a reportér Playwright CTRF do jednoho souboru `homolog-ctrf.json` spolu s lidsky čitelným souborem `homolog-report/summary.md`              | `scripts/homolog/run.mjs`                                                     |

Při samotném opakovaném spuštění se LLM vůbec nepoužívá — jde o deterministickou sadu regresních testů,
nikoli o evaluaci. AI se zapojí pouze při budoucí údržbě (viz Plán níže).

## Předpoklady

1. Zkopírujte `.env.homolog.example` do `.env.homolog` (gitignorováno — nikdy tento soubor necommitujte) a vyplňte:
   - `HOMOLOG_BASE_URL` — cílové nasazení, např. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — heslo pro správu dashboardu daného nasazení.
   - `HOMOLOG_CRITICAL_PROVIDERS` — čárkami oddělené prefixy poskytovatelů, pro které se provede skutečný
     smoke test požadavku chatu (např. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — při běžném spuštění ponechte prázdné; sada vytvoří a odvolá svůj
     vlastní dočasný klíč. Nastavte jej pouze při izolovaném ladění jedné vrstvy.
2. Spusťte `npm install` v repozitáři (závislosti sady — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — jsou běžné devDependencies).
3. Spusťte `npx playwright install`, pokud ještě nejsou k dispozici binární soubory prohlížečů.

## Jak spustit

```bash
npm run homolog
```

Chcete-li provést ověření vůči nasazení, jehož verze neodpovídá místnímu souboru `package.json`
(např. homologační prostředí stále používá předchozí opravnou verzi), explicitně přepište očekávanou
verzi:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Běh skončí s nenulovým návratovým kódem, pokud selže kterákoli vrstva, a vždy se pokusí odvolat vytvořený dočasný
API klíč, a to i při selhání (blok `finally` v `scripts/homolog/run.mjs`).

## Čtení reportu

Veškerý výstup se ukládá do `homolog-report/` (gitignorováno):

- `summary.md` — stejná tabulka vypsaná na standardní výstup, jeden řádek pro každou vrstvu (✅/❌ + podrobnosti).
- `homolog-ctrf.json` — sjednocený report CTRF (sloučení výsledků API/SSE, smoke testů poskytovatelů a
  uživatelského rozhraní) — tento artefakt přiložte ke kontrolnímu seznamu STOP #2 pro vydání.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — nezpracované/průběžné reporty
  jednotlivých vrstev.
- `promptfooconfig.yaml`, `provider-misses.json` — vygenerovaná konfigurace promptfoo pro
  aktuální běh a všichni kritičtí poskytovatelé, kteří chyběli v živém katalogu.

Selhání L0 běh okamžitě přeruší (nevytvoří se žádný dočasný klíč), protože neshoda
verze nebo stavu znamená, že by všechny navazující vrstvy ověřovaly nesprávné nasazení.

## Aktualizace výchozího stavu při legitimní změně uživatelského rozhraní

L4b (smoke test tras) a L4c (postup uživatelského rozhraní pro API klíč) používají skutečné lokátory DOM, nikoli
snímky, takže většina legitimních změn uživatelského rozhraní nevyžaduje žádnou aktualizaci sady. Pokud změna
lokátor přece jen naruší (např. přejmenovaný popisek tlačítka nebo přesunutá stránka nastavení):

1. Znovu ověřte lokátor podle aktuálního zdrojového kódu (specifikace již dokumentují, vůči kterému
   souboru/řádku byl každý lokátor ověřen — postupujte stejně, nehádejte).
2. Aktualizujte specifikaci v `tests/homolog/ui/`.
3. Znovu spusťte `npm run homolog` (nebo pouze dotčenou specifikaci Playwright) vůči VPS, abyste
   opravu potvrdili, a poté změny commitněte.

Tato sada neobsahuje žádný vizuální/pixelový výchozí stav (F1) — viz Plán dalšího vývoje.

## Plán dalšího vývoje (F2 / F3)

Návrh a postupné zavádění jsou popsány v interní plánovací specifikaci
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (bez odkazu — interní
artefakt `_tasks/`, který není součástí verzované dokumentace tohoto repozitáře). Shrnutí:

- **F2** — záznam kompletního průchodu → Playwright Test Agents (`planner`/`generator`)
  jej převedou na specifikace postupů (vytvoření kombinace, test poskytovatele, úprava nastavení, nástroje MCP) +
  výchozí stav pro vizuální regresi (Lost Pixel) s maskami nad dynamickými daty (metriky,
  časová razítka, protokoly) + rutina údržby `healer` pro každé vydání.
- **F3** — pokrytí odolnosti, kontraktů a propojení: toxiproxy + falešný poskytovatel kompatibilní s OpenAI
  na devboxu, kombinace `homolog-resilience` na VPS, která na něj odkazuje
  (vložený timeout → ověření fallbacku + otevření/zavření jističe prostřednictvím
  `/api/monitoring/health`); řízené kontraktní testování Schemathesis vůči
  `docs/openapi.yaml` (nízká hodnota `--max-examples`, pevné seedy, pouze endpointy bez LLM); a
  zapojení `npm run homolog` + jeho `summary.md` do fáze STOP #2 procesu `/generate-release`.
