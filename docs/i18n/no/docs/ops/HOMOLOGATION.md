# Homologation Suite (`npm run homolog`) (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

E2E-validering i reelt miljø av OmniRoute-distribusjonen som kjører på homologerings-VPS-en
(`HOMOLOG_BASE_URL`, f.eks. `http://192.168.0.15:20128`). Én kommando erstatter den manuelle
STOPP #2-sjekklisten for utgivelsen med en automatisert kjøring som produserer dokumentasjon.

## Hva den dekker

| Lag                      | Hva den kontrollerer                                                                                                                                                                       | Implementasjon                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| L0 — helse/paritet       | `/api/monitoring/health` svarer med `200`, `status: "healthy"` og forventet versjon                                                                                                        | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — midlertidig nøkkel | Administratorinnlogging → `POST /api/keys` oppretter en avgrenset API-nøkkel for kjøringen, som tilbakekalles (`DELETE /api/keys/:id`) i en `finally`-blokk uavhengig av resultatet        | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API-overflate      | `/v1/models`-katalogen, en reell ikke-strømmet chat-fullføring (nivåkritisk modell, `max_tokens: 5`), en `401` for ugyldig nøkkel og det offentlige endepunktet `/api/monitoring/health`   | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE-strømming      | Reell strømmet chat-fullføring; verifiserer `text/event-stream`, minst ett innholdsdelta og en `[DONE]`-avslutning                                                                         | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — reelle leverandører | Én chat-forespørsel med minimal kostnad per kritiske leverandør som finnes i den aktive `/v1/models`-katalogen, generert dynamisk via promptfoo                                            | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI-autentisering   | Logger inn én gang via det reelle innloggingsskjemaet og gjenbruker økten (`storageState`) på tvers av UI-laget                                                                            | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI-ruter           | Hver statiske `page.tsx` under `src/app/(dashboard)/dashboard` (oppdaget fra filsystemet; dynamiske `[param]`-ruter hoppes over) lastes uten HTTP-feil, sidefeil eller Next.js-feilgrensen | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — kritisk UI-flyt    | Oppretter en API-nøkkel via kontrollpanelets brukergrensesnitt og tilbakekaller den igjen (etterlater ingen rester på VPS-en)                                                              | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — samlet rapport      | Slår sammen httpYac (via `junit-to-ctrf`), promptfoo→CTRF-adapteren og Playwright CTRF-rapporteringen i én `homolog-ctrf.json`, samt en lesbar `homolog-report/summary.md`                 | `scripts/homolog/run.mjs`                                                     |

Ingen LLM-involvering i selve avspillingen — dette er en deterministisk regresjonstestpakke,
ikke en evaluering. KI brukes bare i fremtidig vedlikeholdsarbeid (se veikartet nedenfor).

## Forutsetninger

1. Kopier `.env.homolog.example` til `.env.homolog` (git-ignorert — aldri commit den), og fyll inn:
   - `HOMOLOG_BASE_URL` — måldistribusjonen, f.eks. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — passordet for administrasjon av kontrollpanelet for denne distribusjonen.
   - `HOMOLOG_CRITICAL_PROVIDERS` — kommaseparerte leverandørprefikser som får en reell
     smoke-testforespørsel for chat (f.eks. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — la denne stå tom ved normale kjøringer; testpakken oppretter og tilbakekaller sin
     egen midlertidige nøkkel. Angi denne bare for å feilsøke ett enkelt lag isolert.
2. Kjør `npm install` i repoet (testpakkens avhengigheter — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — er vanlige devDependencies).
3. Kjør `npx playwright install` hvis nettleserbinærfilene ikke allerede finnes.

## Slik kjører du

```bash
npm run homolog
```

For å validere mot en distribusjon der versjonen ikke samsvarer med den lokale `package.json`
(f.eks. en homologeringsmaskin som fortsatt kjører en tidligere feilrettingsversjon), overstyrer du den forventede
versjonen eksplisitt:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Kjøringen avsluttes med en annen kode enn null hvis et lag feiler, og forsøker alltid å tilbakekalle den midlertidige
API-nøkkelen den opprettet, selv ved feil (`finally`-blokken i `scripts/homolog/run.mjs`).

## Slik leser du rapporten

Alle utdata havner i `homolog-report/` (git-ignorert):

- `summary.md` — den samme tabellen som skrives til standard utdata, én rad per lag (✅/❌ + detaljer).
- `homolog-ctrf.json` — den samlede CTRF-rapporten (sammenslåing av API/SSE-, leverandør-smoke- og
  UI-resultater) — dette er artefakten som skal legges ved sjekklisten for STOPP #2 i en utgivelse.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — de
  rå/mellomliggende rapportene per lag.
- `promptfooconfig.yaml`, `provider-misses.json` — den genererte promptfoo-konfigurasjonen for
  gjeldende kjøring og eventuelle kritiske leverandører som manglet i den aktive katalogen.

En feil i L0 avbryter umiddelbart (ingen midlertidig nøkkel opprettes), siden et avvik i versjon/helsetilstand
betyr at alle etterfølgende lag ville validert feil distribusjon.

## Oppdatering av referansegrunnlaget når brukergrensesnittet endres på gyldig vis

L4b (smoke-test av ruter) og L4c (UI-flyt for API-nøkler) styres av faktiske DOM-lokatorer, ikke
øyeblikksbilder, så de fleste gyldige UI-endringer krever ingen oppdatering av testpakken. Når en endring
faktisk bryter en lokator (f.eks. en knappetekst som har fått nytt navn, eller en innstillingsside som er flyttet):

1. Bekreft lokatoren på nytt mot den gjeldende kildekoden (spesifikasjonene dokumenterer allerede hvilken
   fil/linje hver lokator ble bekreftet mot — følg det samme mønsteret, ikke gjett).
2. Oppdater spesifikasjonen i `tests/homolog/ui/`.
3. Kjør `npm run homolog` på nytt (eller bare den berørte Playwright-spesifikasjonen) mot VPS-en for å
   bekrefte rettelsen, og commit deretter.

Det finnes ikke noe visuelt/pikselbasert referansegrunnlag i denne testpakken (F1) — se veikartet for dette.

## Veikart (F2 / F3)

Design og trinnvis utrulling finnes i den interne planleggingsspesifikasjonen
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (ikke lenket — internt
`_tasks/`-artefakt, ikke en del av dette repoets sporede dokumentasjon). Sammendrag:

- **F2** — full gjennomgangsregistrering → Playwright Test Agents (`planner`/`generator`)
  gjør den om til flytspesifikasjoner (opprett kombinasjon, test leverandør, rediger innstillinger, MCP-verktøy) +
  visuelt regresjonsgrunnlag (Lost Pixel) med masker over dynamiske data (måledata,
  tidsstempler, logger) + en `healer`-vedlikeholdsrutine per utgivelse.
- **F3** — dekning for robusthet/kontrakter/koblinger: toxiproxy + en falsk OpenAI-kompatibel
  leverandør på utviklingsmaskinen, en `homolog-resilience`-kombinasjon på VPS-en som peker mot den
  (injisert tidsavbrudd → verifiser reserveovergang + åpning/lukking av kretsbryter via
  `/api/monitoring/health`); betinget Schemathesis-kontrakttesting mot
  `docs/openapi.yaml` (lav `--max-examples`, faste seed-verdier, kun endepunkter uten LLM); og
  integrering av `npm run homolog` + tilhørende `summary.md` i STOPP #2-fasen i `/generate-release`.
