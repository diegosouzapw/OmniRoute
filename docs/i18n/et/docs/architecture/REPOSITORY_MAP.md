# Repository Map (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Iga kataloogi ja juurfaili üherealine kirjeldus.**
> Viimati uuendatud: 2026-06-28 — OmniRoute v3.8.40
>
> Kasutage seda kaarti koodibaasis kiireks navigeerimiseks. Põhjalikuma teabe saamiseks järgige spetsiaalsete dokumentide linke.

## Tipptaseme puu

```
OmniRoute/
├── src/                  # Next.js 16 rakendus (kasutajaliides + API marsruudid + teegid + domeen + server)
├── open-sse/             # Voogedastusmootori tööruum (töötlejad, täitjad, tõlkija, MCP-server)
├── electron/             # Töölauarakenduse ümbris (Electron 41 + electron-builder 26.10)
├── bin/                  # CLI sisendpunkt ja käsutöötlejad
├── scripts/              # Koostamis-, kontrollimis-, sünkroonimis- ja ühekordsed skriptid
├── docs/                 # Avalik dokumentatsioon (olete siin)
├── tests/                # Kõik testikomplektid (üksus-, integratsiooni-, e2e- ja protokollikliendi testid)
├── public/               # Next.js staatilised ressursid, PWA manifest, teenusetöötaja, ikoonid
├── config/               # Staatiline konfiguratsioon + kvaliteedivärava olek (i18n, payloadRules, quality/)
├── images/               # Turunduse / README pildiressursid
├── @omniroute/           # Avaldatavad kaaspaketid (opencode-plugin, opencode-provider)
├── skills/               # CLI/agentide oskustepaketid (cli-* + omni-* + config-codex-cli)
├── examples/             # Näidispluginad + omniroute-cmd-hello alustuspõhi
├── contrib/              # Kogukonna panused (podman/)
├── .source/              # Fumadocs lähtekoodi konfiguratsioon (source.config.mjs + server/browser/dynamic)
├── .github/              # GitHub Actionsi töövood + probleemimallid + PR-mall
├── .husky/               # Giti konksud (pre-commit, pre-push)
├── .claude/              # Claude Code’i kaldkriipsukäsud (projektipõhised)
├── .agents/              # Codexi / üldised agentide töövood + oskused (.claude/ peegel)
├── .vscode/              # VS Code’i tööruumi sätted
├── _ideia/               # Planeerimismärkmed (mitteametlikud; ei tarnita)
├── _mono_repo/           # Ajaloolised alamprojektid (cloud, site, vscode-extension)
├── _references/          # Kirjutuskaitstud viitekloonid seotud OSS-projektidest
├── _tasks/               # Väljalaskepõhised ülesannete jälgimise failid (mitteametlikud)
├── .build/ .worktrees/ dist/   # kohaliku koostamise / git-worktree / koostamisväljundi ajutised failid (gitignored)
├── .issues/              # Kohalik probleemide vahemälu (gitignored)
├── .playwright-mcp/      # Playwright MCP testiartefaktid
├── coverage/             # c8 testikatvuse väljund (gitignored)
├── logs/                 # Käitusaegsed logid (gitignored)
├── node_modules/         # Sõltuvused (gitignored)
├── package/              # npm pack ettevalmistusala (koostamisartefakt)
├── .next/                # Next.js koostamisväljund (gitignored)
└── (juurfailid — vt allpool)
```

---

## Juurfailid

| Fail                                        | Eesmärk                                                                                                |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **README.md**                               | Turunduse maandumisleht + kiirjuhend + funktsioonide maatriks (vt ka `llm.txt`)                        |
| **CHANGELOG.md**                            | Väljalaskepõhine muudatuste logi (genereeritakse automaatselt oskusega `/version-bump-cc`)             |
| **LICENSE**                                 | MIT-litsentsi tekst                                                                                    |
| **CLAUDE.md**                               | Projekti reeglid Claude Code'i agentidele (ranged reeglid, kokkulepped, stsenaariumid)                 |
| **AGENTS.md**                               | Sama mis CLAUDE.md, kuid mitte-Claude'i AI-agentidele (Codex, Cursor jne)                              |
| **GEMINI.md**                               | Lühireeglid Gemini-põhistele agentidele (CLAUDE.md alamhulk)                                           |
| **CONTRIBUTING.md**                         | Kaastöötaja juhend: seadistamine, tavapärased commit'id, testimine, PR-i töövoog                       |
| **SECURITY.md**                             | Turvanõrkustest teatamise poliitika, toetatud versioonid, ohumudel                                     |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — ootused kogukonnas käitumisele                                                  |
| **llm.txt**                                 | Lihtteksti maandumisleht, mis on optimeeritud LLM-roomajatele (SEO AI-assistentidele)                  |
| **package.json**                            | npm-i manifest, skriptid, sõltuvused, mootorid, c8 katvuse lävend                                      |
| **package-lock.json**                       | Lukustatud sõltuvuspuu                                                                                 |
| **tsconfig.json**                           | TypeScripti juurkonfiguratsioon                                                                        |
| **tsconfig.typecheck-core.json**            | `src/` tuuma tüübikontrolli konfiguratsioon                                                            |
| **tsconfig.typecheck-noimplicit-core.json** | Range (`noImplicitAny`) tüübikontroll                                                                  |
| **tsconfig.tsbuildinfo**                    | TS-i järkjärgulise koostamise vahemälu (gitignore'is)                                                  |
| **next.config.mjs**                         | Next.js 16 koostamise konfiguratsioon (autonoomne väljund)                                             |
| **next-env.d.ts**                           | Next.js-i automaatselt genereeritud keskkonnatüübid                                                    |
| **eslint.config.mjs**                       | ESLinti lamekonfiguratsioon (reeglid projektiala järgi)                                                |
| **prettier.config.mjs**                     | Prettieri vormindusreeglid                                                                             |
| **postcss.config.mjs**                      | PostCSS-i konfiguratsioon Tailwindi/CSS-i konveieri jaoks                                              |
| **playwright.config.ts**                    | Playwrighti E2E-testide konfiguratsioon                                                                |
| **vitest.config.ts**                        | Vitesti konfiguratsioon (vaikimisi testikomplekt)                                                      |
| **vitest.mcp.config.ts**                    | Vitesti konfiguratsioon MCP-serveri / autoCombo / vahemälu testikomplektidele                          |
| **sonar-project.properties**                | SonarQube'i/SonarCloudi konfiguratsioon (koodi kvaliteet)                                              |
| **Dockerfile**                              | Mitmeetapiline Dockeri koostamine (builder → runner-base → runner-cli)                                 |
| **docker-compose.yml**                      | Arenduse compose nelja profiiliga (base, cli, host, cliproxyapi) + Redise külgkonteiner                |
| **docker-compose.prod.yml**                 | Tootmiskeskkonna compose (port 20130, Redis, nimega köited)                                            |
| **.dockerignore**                           | Dockeri kontekstist välistatud failid                                                                  |
| **fly.toml**                                | Fly.io juurutuskonfiguratsioon (piirkond `sin`, port 20128, /data köide)                               |
| **.env.example**                            | Keskkonnafaili mall (kopeeritakse esimesel installimisel automaatselt faili `.env`)                    |
| **.gitignore**                              | Giti ignoreerimismustrid                                                                               |
| **.npmignore**                              | npm-is avaldamisest välistatavate failide loend                                                        |
| **.npmrc**                                  | npm-i konfiguratsioon (register, lukufaili poliitika)                                                  |
| **.node-version**                           | Fikseeritud Node'i versioon (kasutavad nvm-iga ühilduvad tööriistad)                                   |
| **.nvmrc**                                  | Fikseeritud Node'i versioon nvm-i jaoks                                                                |
| **eslint.complexity.config.mjs**            | ESLinti konfiguratsioon keerukuse kontrollmehhanismile (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | ESLinti konfiguratsioon SonarJS-i reeglitele (kognitiivne keerukus / dubleerimine)                     |
| **source.config.ts**                        | Fumadocsi `defineDocs` lähtekonfiguratsioon (täidab `.source/` kataloogi)                              |
| **knip.json**                               | Knipi konfiguratsioon — kasutamata failid/ekspordid/sõltuvused (sisend surnud koodi kontrollile)       |
| **stryker.conf.json**                       | Strykeri mutatsioontestimise konfiguratsioon                                                           |
| **.size-limit.json**                        | size-limit'i paketi mahupiirangu konfiguratsioon                                                       |
| **promptfooconfig.yaml**                    | promptfoo hindamise konfiguratsioon                                                                    |
| **.gitleaks.toml**                          | gitleaksi saladuste skannimise reeglistik                                                              |
| **.zizmor.yml**                             | zizmori GitHub Actionsi turbekontrolli konfiguratsioon                                                 |
| **socket.yml**                              | Socket.devi tarneahela konfiguratsioon                                                                 |
| **news.json**                               | Lokaliseeritud v2 teadaannete voog; Radari käivituskirje tarnitakse passiivsena                        |
| **flake.nix** / **flake.lock**              | Nixi arenduskesta definitsioon + lukustus                                                              |
| **.env**                                    | Kohalikud saladused (gitignore'is — genereeritakse failist `.env.example`)                             |

> **Teisaldatud juurkaustast versioonis v3.8.26 (korrastamine):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` ja genereeritud `quality-metrics.json` (gitignore’i lisatud). Vaadake jaotist [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Next.js-i rakendus

```
src/
├── app/                 # App Router (lehed + API marsruudid + olekulehed + maandumisleht)
├── lib/                 # Põhiteegid / domeenimoodulid (80 alamkataloogi + ~70 tipptaseme faili)
├── domain/              # Puhas domeeniloogika (reeglimootor, varulahendus, kulu, lukustus, comboResolver, hindamine)
├── server/              # Ainult serverile mõeldud moodulid (autoriseerimiskonveier, cors, autentimise vahevara) — neid ei saa klienti importida
├── shared/              # Serveri ja kliendi vahel jagatud osad, kui see on ohutu (konstandid, tüübid, valideerimine, lepingud, utiliidid)
├── i18n/                # next-intl-i konfiguratsioon + lokaadipõhised sõnumite JSON-failid (42 lokaati)
├── middleware/          # Next.js-i vahevara (päringute rikastamine, lokaadi tuvastamine)
├── mitm/                # MITM-puhverserveri tuum: sertifikaatide genereerimine/installimine, töötlejad, sihtmärgid, inspektor, maskid, otseedastus
│   ├── handlers/        # 9 IDE-agendi töötlejaklassi, mis laiendavad klassi MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Liikluse hõivekiht: puhver (mälusisene ringpuhver), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Mudeliadapterite siduskiht (pärandühilduvuskiht)
├── scripts/             # Lähtekoodipuus asuvad hooldusskriptid (nt backfillAggregation)
├── sse/                 # Pärand-SSE töötlejad/teenused (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Pärand-mälusalvesti (asendatakse järk-järgult kataloogiga src/lib/db)
├── types/               # Jagatud TS-i tüübifailid
├── instrumentation.ts   # Next.js-i telemeetriahaak (brauser + serv)
├── instrumentation-node.ts  # Ainult Node'ile mõeldud instrumentimine
└── proxy.ts             # HTTP-puhverserveri sisenemispunkti ühilduvuskiht
```

### `src/app/` — App Router (Next.js 16)

| Tee                                                                          | Eesmärk                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Avalik OpenAI-ga ühilduv API (~25 alammarsruuti: vestlus, tekstilõpetused, manused, failid, pakktöötlus, heli, pildid, videod, muusika, ümberjärjestamine, modereerimine, otsing, ws, agendid, kontod, pakkujad jne)                                                                                                        |
| `app/api/v1beta/`                                                            | Gemini-stiilis API lõpp-punktid                                                                                                                                                                                                                                                                                             |
| `app/api/playground/`                                                        | Playground Studio marsruudid: `improve-prompt/` (POST — LLM-i viiba ümberkirjutaja), `presets/` (GET loend / POST loomine), `presets/[id]/` (GET / PUT / DELETE) — vt `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                |
| `app/api/` (mitte-v1)                                                        | Halduse/administraatori marsruudid (~60 kataloogi: pakkujad, kombinatsioonid, seaded, mcp, a2a, hindamised, mälu, oskused, veebihaagid, vastavus, tõrkekindlus, seire, tunnelid, CLI-tööriistad jne)                                                                                                                        |
| `app/api/tools/agent-bridge/`                                                | AgentBridge'i REST API — 12 marsruuti (serveri juhtimine, agendi olek/DNS/vastendused, möödaviik, sert, ülesvoolu-CA). LOCAL_ONLY + SPAWN_CAPABLE. Vt `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                  |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspectori REST + WS API — üle 16 marsruudi (päringud, seansid, hostid, hõiverežiimid, eksport, ws). LOCAL_ONLY + SPAWN_CAPABLE. Vt `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                      |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0 sisendpunkt (`POST /a2a`)                                                                                                                                                                                                                                                                                  |
| `app/.well-known/agent.json/`                                                | A2A agendikaart (avastamine)                                                                                                                                                                                                                                                                                                |
| `app/(dashboard)/dashboard/`                                                 | Töölaua kasutajaliidese lehed (üle 50 jaotise, ~118 page.tsx faili: pakkujad, kombinatsioonid, seaded, mälu, oskused, veebihaagid, hindamised, audit, pakktöötlus, vahemälu, kulud, seisund, süsteem, tegevus jne)                                                                                                          |
| `app/(dashboard)/dashboard/search-tools/`                                    | Search Tools Studio kasutajaliides (3 vahekaarti: otsing/kraapimine/võrdlus + SearchConceptCard + ProviderCatalog) — vt `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                            |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plaan 21): `page.tsx` (3 vahekaardiga kest), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge'i töölaualeht — serverikaart, 9 agendikaarti, seadistusviisard, mudelite vastendamine, möödaviikude loend. i18n PT-BR + EN. Vt `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                                                |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic Inspectori töölaualeht — DevToolsi poolitatud vaade, 7 üksikasjade vahekaarti, 4 hõiverežiimi lülitit, seansisalvesti, konteksti värvimine. i18n PT-BR + EN. Vt `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                                             |
| `app/(dashboard)/dashboard/activity/`                                        | Tegevusvoo leht (rühm B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — vt `docs/architecture/MONITORING_SECTIONS.md`                                                                                                                           |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Kvoodi jagamise leht (rühm B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                                  |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Pakkuja plaani konfiguratsioonileht (rühm B): `page.tsx` + `ProviderPlanConfigClient.tsx` — kvoodimõõtmete ühendusepõhised alistused                                                                                                                                                                                        |
| `app/docs/`                                                                  | Sisseehitatud dokumentatsioonivaatur (renderdab faile `docs/*.md`)                                                                                                                                                                                                                                                          |
| `app/landing/`                                                               | Turunduse sihtleht                                                                                                                                                                                                                                                                                                          |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Autentimisega seotud lehed                                                                                                                                                                                                                                                                                                  |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP-tõrkelehed                                                                                                                                                                                                                                                                                                             |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Staatilised/olekulehed                                                                                                                                                                                                                                                                                                      |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Juurpaigutus, avaleht, PWA manifest, globaalne CSS                                                                                                                                                                                                                                                                          |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Veapiirid                                                                                                                                                                                                                                                                                                                   |

### `src/lib/` — Põhiteegid (~50 moodulit)

| Moodul                                   | Otstarve                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | A2A protokolli ülesannete haldur, oskused (5), voogedastus                                                                                                                                                                                                                                                                 |
| `acp/`                                   | CLI-agentide register (kohalike CLI-de tuvastamine — vt `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                        |
| `api/`                                   | Jagatud API-abifunktsioonid (`requireManagementAuth`, valideerimine)                                                                                                                                                                                                                                                       |
| `auth/`                                  | Seansid, paroolide räsimine, sõnede valideerimine                                                                                                                                                                                                                                                                          |
| `batches/`                               | OpenAI Batches API töötlejad                                                                                                                                                                                                                                                                                               |
| `catalog/`                               | Teenusepakkujate kataloogi Zod-valideerimine + võimekuste lahendamine                                                                                                                                                                                                                                                      |
| `cloudAgent/`                            | Pilveagendid (Codex Cloud, Devin, Jules) — vt `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                             |
| `combos/`                                | Kombinatsioonide lahendamine + järjestuse muutmise abifunktsioonid                                                                                                                                                                                                                                                         |
| `audit/`                                 | Tegevusvoo abifunktsioonid: `highLevelActions.ts` (lubatud loend + `isHighLevelAction()`), `activityIcons.ts` (tegevuse → ikooni/verbi vastendus), `timeline.ts` (groupByDay/relativeTime) — vt `docs/architecture/MONITORING_SECTIONS.md`                                                                                 |
| `compliance/`                            | Auditilogi + teenusepakkujate audit — vt `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                     |
| `compression/`                           | Tihendusmootorite siduskiht (mootorid asuvad kataloogis `open-sse/services/compression/`)                                                                                                                                                                                                                                  |
| `config/`                                | Käitusaegse konfiguratsiooni abifunktsioonid                                                                                                                                                                                                                                                                               |
| `db/`                                    | Üle 120 domeenipõhise andmebaasimooduli + 168 migratsiooni (SQLite'i puhul kasuta alati neid)                                                                                                                                                                                                                              |
| `quota/`                                 | Kvootide jagamise mootor: `dimensions.ts` (tüübid/Zod), `types.ts` (`QuotaStore`-liides), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — vt `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Radari tasuta mudelite kataloogi klient: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — vt `docs/frameworks/RADAR.md`                                                                                                                                        |
| `display/`                               | Kasutajaliidese vormindamise abifunktsioonid (kulu, latentsus jne)                                                                                                                                                                                                                                                         |
| `embeddings/`                            | Manustamisteenuse abifunktsioonid                                                                                                                                                                                                                                                                                          |
| `env/`                                   | Keskkonnamuutujate parsimine + valideerimine                                                                                                                                                                                                                                                                               |
| `evals/`                                 | Hindamisraamistik (komplektid, käitaja, käituskeskkond) — vt `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                    |
| `guardrails/`                            | Isikuandmete maskija, viibainjektsioon, nägemismudeliga ühendamise sild — vt `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                 |
| `jobs/`                                  | Taustatööd (cron'i-laadsed)                                                                                                                                                                                                                                                                                                |
| `memory/`                                | Vestlusmälu (SQLite FTS5 + sqlite-vec hübriidne RRF + Qdrant, 2. tase) — vt `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                    |
| `memory/embedding/`                      | Mitme allikaga manustamiskiht: `index.ts` (lahendaja), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plaan 21)                                                                                                                                                                           |
| `memory/vectorStore.ts`                  | sqlite-vec v0.1.9 mähis — KNN-i ammendav otsing + hübriidne RRF (FTS5 + vektor, k=60). Viivitatud lähtestamine, sqlite-vec'i puudumisel jätkab piiratud funktsionaalsusega. (plaan 21)                                                                                                                                     |
| `memory/reindex.ts`                      | `runReindexBatch()` — töötleb taustal mälukirjeid, millel on `needs_reindex=1`; seda kutsuvad `POST /api/memory/reindex` ja viivitatud järelindekseerimise tee. (plaan 21)                                                                                                                                                 |
| `monitoring/`                            | Tervisekontrollid, mõõdikute väljastamine                                                                                                                                                                                                                                                                                  |
| `oauth/`                                 | OAuth-/impordivood 22 teenusepakkuja moodulile (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                 |
| `plugins/`                               | Pistikprogrammide register                                                                                                                                                                                                                                                                                                 |
| `promptCache/`                           | Anthropic-stiilis viipade vahemälu katkestuspunktid                                                                                                                                                                                                                                                                        |
| `skills/`                                | Oskuste raamistik (sisseehitatud + turuplats + SkillsSH) — vt `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                  |
| `playground/`                            | Playground Studio jagatud abifunktsioonid: `codeExport.ts` (curl-i/Pythoni/TS-i generaator), `promptImprover.ts` (metaviiba koostaja), `streamMetrics.ts` (puhas TTFT/TPS), `types.ts` (hinnatabel) — vt `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                            |
| `webhookDispatcher.ts`                   | HMAC-veebihaakide edastus — vt `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                               |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Tunnelihaldurid — vt `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                           |
| `cloudSync.ts`, `initCloudSync.ts`       | Oleku valikuline pilvesünkroonimine                                                                                                                                                                                                                                                                                        |
| `localDb.ts`                             | db-moodulite koond-reeeksport (loogika puudub — ainult re-eksport)                                                                                                                                                                                                                                                         |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Päringute vahemällu salvestamine + idempotentsus                                                                                                                                                                                                                                                                           |
| (veel ~30 tipptaseme faili)              | Spetsiaalsed abifunktsioonid (logEnv, modelsDevSync, piiSanitizer jne)                                                                                                                                                                                                                                                     |

### `src/lib/db/` — Andmebaas (122 moodulit + 168 migratsiooni)

| Alamkataloog              | Otstarve                                                                                                                                                                    |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | `getDbInstance()` üksikeksemplar koos WAL-logimisega                                                                                                                        |
| `db/migrations/`          | Versioonitud SQL-failid (idempotentsed, transaktsioonilised). `073_memory_vec.sql` lisab tabeli `memory_vec_meta` ja veeru `needs_reindex` (plaan 21).                      |
| `db/playgroundPresets.ts` | Playground Studio eelseadistuste CRUD-moodul (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | `memory_vec_meta` CRUD (active_dim, embedding_signature, last_reset_at, vec_loaded) ning `markMemoryNeedsReindex`, `getMemoryReindexQueue` jne (plaan 21)                   |
| `db/<domain>.ts`          | Üks moodul domeeni kohta: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache jne |

### `src/domain/`

| Moodul                 | Otstarve                                          |
| ---------------------- | ------------------------------------------------- |
| `policy.ts`            | Reeglistikumootor                                 |
| `fallbackPolicy.ts`    | Varuvaliku otsustuspuu                            |
| `costRules.ts`         | Kulude arvutamise reeglid                         |
| `lockoutPolicy.ts`     | Mudeli/ühenduse lukustamise reeglistik            |
| `tagRouter.ts`         | Sildipõhine marsruutimine                         |
| `comboResolver.ts`     | Kombinatsiooni lahendamine (kasutab kombomootor)  |
| `modelAvailability.ts` | Mudelipõhine saadavuse kontroll                   |
| `assessment/`          | Mudeli hindamine (RFC-AUTO-ASSESSMENT-i 1. etapp) |

### `src/server/`

| Moodul   | Otstarve                                                                                            |
| -------- | --------------------------------------------------------------------------------------------------- |
| `authz/` | Autoriseerimiskonveier: `classify` → `policies` → `enforce` — vt `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS-i konfiguratsioon                                                                              |
| `auth/`  | Seansi vahetarkvara                                                                                 |

### `src/shared/`

| Moodul                           | Otstarve                                                                             |
| -------------------------------- | ------------------------------------------------------------------------------------ |
| `constants/providers.ts`         | **355 teenusepakkujat** koos Zodi valideerimisega (ainus tõeallikas)                 |
| `constants/cliTools.ts`          | Väliste CLI-tööriistade register                                                     |
| `constants/routingStrategies.ts` | **19 marsruutimisstrateegiat** koos prioriteetidega                                  |
| `constants/publicApiRoutes.ts`   | Marsruudid, mis nõuavad Bearer-autentimist (haldusautentimise asemel)                |
| `constants/upstreamHeaders.ts`   | Päiste keeluloend ülesvoolupäringute jaoks                                           |
| `validation/schemas.ts`          | ~80 Zodi skeemi (API-lepingute ainus tõeallikas)                                     |
| `validation/helpers.ts`          | Zodi valideerimise abifunktsioonid (`validateBody` jne)                              |
| `types/`                         | Jagatud TS-tüübid                                                                    |
| `contracts/`                     | Avalikud API-lepingud (mida kasutab `package.json`-i `files:`)                       |
| `utils/circuitBreaker.ts`        | Teenusepakkuja kaitselüliti (vt `docs/architecture/RESILIENCE_GUIDE.md`)             |
| `utils/apiAuth.ts`               | API-võtme valideerimine ja ulatuse kontrollimine                                     |
| `utils/fetchTimeout.ts`          | Ajalõpu/katkestamise ümbrised ülesvoolu fetch-päringute jaoks                        |
| `utils/releaseNotes.ts`          | Suletud v2/pärandversiooni teadaannete parser, lokaliseerimine ja ID-põhine eiramine |

---

## `open-sse/` — voogedastusmootori tööruum

Eraldi npm-i tööruum (`@omniroute/open-sse`). Töötleb päringuid ja käivitab teenusepakkujaid.

```
open-sse/
├── handlers/            # 16 faili (12 töötlejat + 4 abimoodulit): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search jne.
├── executors/           # 67 teenusepakkuja-põhist täiturit (laiendavad BaseExecutorit)
├── translator/          # Vorminguteisendajad (9 päringu-, 9 vastuse- ja 9 abimoodulit)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ teenusemoodulit (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM jne)
├── mcp-server/          # MCP-server (110 tööriista, 3 transporti, 33 ulatust)
├── config/              # Teenusepakkujate/mudelite registrid, päiste konfiguratsioon, mudelite aliased
├── utils/               # TLS-klient, puhverserveri fetch/dispatcher, võrgu abimoodulid
├── index.ts             # Tööruumi sisenemispunkt
├── package.json         # Tööruumi manifest
├── tsconfig.json        # Tööruumi TS-i konfiguratsioon
└── types.d.ts           # Tööruumi tüübideklaratsioonid
```

### `open-sse/mcp-server/`

| Tee                         | Otstarve                                                                           |
| --------------------------- | ---------------------------------------------------------------------------------- |
| `server.ts`                 | MCP-serveri elutsükkel (stdio- ja HTTP-transpordid)                                |
| `httpTransport.ts`          | HTTP Streamable- ja SSE-transpordid (`/api/mcp/sse`, `/api/mcp/stream`)            |
| `audit.ts`                  | Auditilogimine tabelisse `mcp_tool_audit`                                          |
| `scopeEnforcement.ts`       | Tööriistapõhine ulatuse valideerimine                                              |
| `runtimeHeartbeat.ts`       | Tervise olekusignaal faili `DATA_DIR/runtime/mcp-heartbeat.json`                   |
| `descriptionCompressor.ts`  | Tööriistakirjelduste metaandmete tihendamine konteksti säästmiseks                 |
| `schemas/tools.ts`          | 36 põhitööriista definitsiooni + ulatused                                          |
| `tools/advancedTools.ts`    | Täiustatud tööriistade teostused                                                   |
| `tools/memoryTools.ts`      | 3 mälutööriista (otsing/lisamine/tühjendamine)                                     |
| `tools/skillTools.ts`       | 4 oskusetööriista (loend/lubamine/käivitamine/käivitused)                          |
| `tools/compressionTools.ts` | 5 tihendustööriista                                                                |
| `README.md`                 | MCP-serveri sisemine README (ristviidatud failist `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — töölauarakenduse ümbris

| Fail             | Otstarve                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| `main.js`        | Electroni põhiprotsess (BrowserWindow, manustatud Next.js-i server, süsteemisalv, automaatvärskendus) |
| `preload.js`     | IPC-sild (contextBridge → `window.omniroute`)                                                         |
| `package.json`   | electron-builderi konfiguratsioon + Electron 41 + electron-builder 26.10 sõltuvused                   |
| `assets/`        | Rakenduse ikoonid (Windowsi .ico, macOS-i .icns, Linuxi .png)                                         |
| `dist-electron/` | Kompileerimise väljund (gitignore'iga eiratud)                                                        |
| `types.d.ts`     | Renderdaja silla tüübideklaratsioonid                                                                 |
| `README.md`      | Electroni sisemine README (vt ka `docs/guides/ELECTRON_GUIDE.md`)                                     |

---

## `bin/` — CLI

| Fail                                                                                                        | Otstarve                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | CLI peamine käivituspunkt — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` jne |
| `reset-password.mjs`                                                                                        | Eraldiseisev parooli lähtestamise CLI                                                                                               |
| `cli/commands/setup.mjs`                                                                                    | Interaktiivne ja mitteinteraktiivne seadistusviisard                                                                                |
| `cli/commands/doctor.mjs`                                                                                   | Süsteemi seisundi diagnostika (üle 8 kontrolli)                                                                                     |
| `cli/commands/providers.mjs`                                                                                | Pakkujate loendamine/testimine/valideerimine                                                                                        |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | CLI abimoodulid                                                                                                                     |
| `cli/tray/tray.ts`                                                                                          | Süsteemisalve integratsioon (platvormideülene: Windowsis NotifyIcon, macOS-is/Linuxis systray2)                                     |
| `cli/tray/tray.ps1`                                                                                         | PowerShelli NotifyIconi taustaprogramm (Windows, null uut binaarfaili)                                                              |
| `cli/tray/autostart.ts`                                                                                     | Platvormideülene automaatkäivitus (LaunchAgent / .desktop / register)                                                               |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | SQLite'i draiveri 5-etapiline lahendusahel (kaasapandud → käituskeskkond → viitpaigaldus → node:sqlite → sql.js)                    |
| `cli/runtime/magicBytes.mjs`                                                                                | Binaarfaili signatuurbaitide valideerimine (ELF / Mach-O / Mach-O fat / PE)                                                         |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — eellahendab draiverid järelpaigalduse / esimese käivituse ajal                                                 |
| `nodeRuntimeSupport.mjs`                                                                                    | Toetatud Node.js-i versiooni valideerimine paigaldamisel                                                                            |

---

## `skills/` — Avalikud agendioskused

| Fail                         | Otstarve                                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| `skills/omniroute*/SKILL.md` | 10 oskuse manifesti välistele tehisintellektiagentidele (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Koostamis- ja kontrollskriptid

| Skript                              | Otstarve                                                                                              |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Arendus-/käivitustööriist keskkonnamuutujate laadimisega                                              |
| `build-next-isolated.mjs`           | Iseseisev koostamine (Next.js 16 standalone)                                                          |
| `prepublish.ts`                     | Paketi ettevalmistamine enne käsku `npm pack`                                                         |
| `postinstall.mjs`                   | `.env`-faili automaatne loomine `.env.example`-faili põhjal esimesel installimisel                    |
| `sync-env.mjs`                      | `.env`-faili võtmete uuesti sünkroonimine `.env.example`-failiga                                      |
| `check-cycles.mjs`                  | Tsükliliste sõltuvuste tuvastamine                                                                    |
| `check-route-validation.mjs`        | Kontrollimine, et kõigil API-marsruutidel oleks Zodi valideerimine                                    |
| `check-t11-any-budget.mjs`          | Selgesõnalise `any`-eelarve jõustamine failipõhiselt                                                  |
| `check-docs-sync.mjs`               | Dokumentatsiooni versioonide sünkroonsuse kontrollimine (olemasolev commit’i-eelne kontroll)          |
| **`check-env-doc-sync.mjs`**        | UUS: koodis, `.env.example`-failis ja `ENVIRONMENT.md`-failis olevate keskkonnamuutujate ristkontroll |
| **`check-docs-counts-sync.mjs`**    | UUS: kontrollimine, et arvud (täiturid, strateegiad, OAuth, A2A-oskused) vastaksid dokumentatsioonile |
| **`check-deprecated-versions.mjs`** | UUS: aegunud versioonide/kuupäevade märgistamine dokumentatsioonis                                    |
| `check-supported-node-runtime.ts`   | Kontrollimine, kas praegune Node’i versioon on toetatud                                               |
| `check-pr-test-policy.mjs`          | Reegli „testid on nõutud” jõustamine tootmiskoodi muudatuste korral                                   |
| **`gen-provider-reference.ts`**     | UUS: faili `docs/reference/PROVIDER_REFERENCE.md` automaatne genereerimine kataloogist                |
| `i18n/generate-multilang.mjs`       | Kasutajaliidese stringide ja dokumentatsiooni tõlkimine Google Translate’i kaudu                      |
| `i18n_autotranslate.py`             | LLM-il põhinev dokumentatsiooni tõlketöövoog                                                          |
| `validate_translation.py`           | Tõlke valideerimine lokaadi kaupa                                                                     |
| `check_translations.py`             | Koodipoolne i18n-võtmete kontroll                                                                     |
| `run-playwright-tests.mjs`          | Playwrighti E2E-testide käivitaja                                                                     |
| `run-protocol-clients-tests.mjs`    | MCP/A2A E2E-testide käivitaja                                                                         |
| `run-ecosystem-tests.mjs`           | Ökosüsteemi (teenusepakkujate integratsiooni) testid                                                  |
| `test-report-summary.mjs`           | Testikatte kokkuvõtte genereerimine Markdowni vormingus                                               |
| `smoke-electron-packaged.mjs`       | Pakendatud Electroni koostu suitsutestimine                                                           |
| `native-binary-compat.mjs`          | Kontrollimine, et omasõltuvused (`better-sqlite3`) vastaksid Electroni Node’ile                       |
| `validate-pack-artifact.ts`         | Käsu `npm pack` väljundi valideerimine                                                                |
| `responses-ws-proxy.mjs`            | WebSocketi sild Codex Responses API jaoks                                                             |
| `v1-ws-bridge.mjs`                  | WebSocketi sild lõpp-punktile `/api/v1/ws`                                                            |
| `standalone-server-ws.mjs`          | Iseseisva WS-serveri käivitaja                                                                        |
| `system-info.mjs`                   | Süsteemi-/käituskeskkonna teabe printimine kasutajatoe jaoks                                          |
| `healthcheck.mjs`                   | Ühekordne tervisekontroll (kasutab Docker HEALTHCHECK)                                                |
| `uninstall.mjs`                     | Puhas desinstallimisskript                                                                            |

---

## `docs/` — Avalik dokumentatsioon (7 juurfaili + 17 alamkataloogi)

### Üldjuhendid

| Dokument                    | Eesmärk                                                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Kõrgtaseme arhitektuur, alamsüsteemide kaart, töölaua kasutajaliides                                            |
| `CODEBASE_DOCUMENTATION.md` | Tehniline teatmik: kataloogid, moodulid, kokkulepped                                                            |
| `FEATURES.md`               | Funktsioonide maatriks koos v3.8 olulisemate uuendustega                                                        |
| `USER_GUIDE.md`             | Lõppkasutaja käsiraamat (seadistamine, mudelid, kombinatsioonid, CLI-d, heli jne)                               |
| `API_REFERENCE.md`          | API otspunktide teatmik koos autentimismudeliga                                                                 |
| `openapi.yaml`              | OpenAPI 3.0 spetsifikatsioon (121 teed)                                                                         |
| `SETUP_GUIDE.md`            | Paigaldusmeetodid (npm, npx, Docker, Electron, Termux, lähtekood)                                               |
| `ENVIRONMENT.md`            | Kõik keskkonnamuutujad (~800 dokumenteeritud, `.env.example` ~3050 rida)                                        |
| `TROUBLESHOOTING.md`        | Levinud vead + v3.8.0 teadaolevad probleemid                                                                    |
| `RELEASE_CHECKLIST.md`      | Täielik väljalaskeprotsess (oskused, husky, conventional commits, juurutamine)                                  |
| `COVERAGE_PLAN.md`          | Kaetuse eesmärgid ja praegune seis                                                                              |
| `FREE_TIERS.md`             | Kureeritud tasuta pakettidega teenusepakkujad (48+ tasuta + 11 OAuth)                                           |
| `CLI-TOOLS.md`              | Välised CLI-integratsioonid + sisemine OmniRoute CLI                                                            |
| `I18N.md`                   | i18n-arhitektuur, keele lisamine, 42 lokaati                                                                    |
| `UNINSTALL.md`              | Puhta desinstallimise sammud                                                                                    |
| `PROVIDER_REFERENCE.md`     | **Automaatselt genereeritud** 355 teenusepakkuja kataloog (taasgenereerimine: `npm run gen:provider-reference`) |

### Alamsüsteemide süvaülevaated

| Dokument                                         | Eesmärk                                                                       |
| ------------------------------------------------ | ----------------------------------------------------------------------------- |
| `MCP-SERVER.md`                                  | MCP-server: 110 tööriista, 3 transporti, 33 õiguse ulatust, REST-otspunktid   |
| `A2A-SERVER.md`                                  | A2A v0.3: JSON-RPC, 6 oskust, REST-abifunktsioonid, agendikaart               |
| `AGENT_PROTOCOLS_GUIDE.md`                       | Ühtne juhend: A2A vs ACP vs pilveagendid                                      |
| `CLOUD_AGENT.md`                                 | Codex Cloudi / Devini / Julesi orkestreerimine                                |
| `SKILLS.md`                                      | Oskuste raamistik (sisseehitatud + turg + SkillsSH + liivakast)               |
| `RADAR.md`                                       | Radari tasuta mudelite kataloogi ülekate (`RADAR_ENABLED`, vaikimisi väljas)  |
| `MEMORY.md`                                      | Mälusüsteem (SQLite FTS5 + Qdrant)                                            |
| `EVALS.md`                                       | Hindamisraamistik (komplektid, käitused, hindamisjuhised)                     |
| `GUARDRAILS.md`                                  | Isikuandmete maskija, viiba süstimise tõkestus, nägemissild                   |
| `COMPLIANCE.md`                                  | Auditilogi, säilitamine, `noLog`-loobumisvõimalus                             |
| `WEBHOOKS.md`                                    | HMAC-allkirjastatud veebihaakide edastus                                      |
| `REASONING_REPLAY.md`                            | Hübriidne mälu-/SQLite-vahemälu `reasoning_content` jaoks                     |
| `AUTHZ_GUIDE.md`                                 | Autoriseerimiskonveier (`classify` → `policies` → `enforce`)                  |
| `RESILIENCE_GUIDE.md`                            | Kaitselüliti + ooteaeg + mudeli lukustamine                                   |
| `docs/security/STEALTH_GUIDE.md` (ainult git-is) | TLS-sõrmejäljestamine (JA3/JA4), Claude Code CCH, MITM-sertifikaat            |
| `AUTO-COMBO.md`                                  | Auto Combo mootor (16 teguriga hindamine, 6 režiimipaketti, virtuaalne tehas) |

### Tihendamine

| Dokument                        | Eesmärk                                  |
| ------------------------------- | ---------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Tihendusrežiimide ülevaade + tegevuskava |
| `COMPRESSION_ENGINES.md`        | Cavemani + RTK mootorid, registrileping  |
| `COMPRESSION_RULES_FORMAT.md`   | Cavemani reeglipaketi JSON-skeem         |
| `COMPRESSION_LANGUAGE_PACKS.md` | Keelepõhiste reeglipakettide loend       |
| `RTK_COMPRESSION.md`            | RTK deklaratiivne konveier (49 filtrit)  |

### Juurutamine

| Dokument                     | Eesmärk                                                                     |
| ---------------------------- | --------------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Dockeri järg, profiilid (base/cli/host/cliproxyapi), Redise kõrvalkonteiner |
| `VM_DEPLOYMENT_GUIDE.md`     | Üldine VM-i/VPS-i juurutamine (Ubuntu/Debian + nginx + systemd)             |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io juurutamine (praegu ainult hiina keeles)                             |
| `TERMUX_GUIDE.md`            | Graafilise liideseta Android Termuxi kaudu                                  |
| `PWA_GUIDE.md`               | Progressiivse veebirakenduse paigaldamine + teenusetöötaja                  |
| `ELECTRON_GUIDE.md`          | Töölauarakenduse järk + allkirjastamine + levitamine                        |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                      |
| `PROXY_GUIDE.md`             | 4-tasemeline väljaminev puhverserver + 1proxy turg                          |

### Alamkataloogid

| Alamkataloog          | Otstarve                                                                                                                                                                                                              |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Dokumentatsiooni lokaliseeritud tõlked (41 lokaati)                                                                                                                                                                   |
| `docs/screenshots/`   | Juhendite pildifailid                                                                                                                                                                                                 |
| `_tasks/superpowers/` | Superpowersi (`writing-plans`/`brainstorming`) plaanid/spetsifikatsioonid + uurimistöö — isoleeritud, eraldi versioonihaldusega hoidla, mida põhipuu gitignore eirab. Vt CLAUDE.md → „Planning & Research Artifacts“. |

---

## `tests/` — Testikomplektid

| Alamkataloog                         | Tüüp                                            | Käitaja                                            |
| ------------------------------------ | ----------------------------------------------- | -------------------------------------------------- |
| `tests/unit/`                        | Üksustestid (~4 800 faili, kiireimad)           | Node'i sisseehitatud testikäitaja                  |
| `tests/integration/`                 | Mitme mooduli + andmebaasi integratsioonitestid | Node'i sisseehitatud testikäitaja (paralleelsus 1) |
| `tests/e2e/`                         | Kasutajaliidese + töövoo E2E-testid             | Playwright                                         |
| `tests/e2e/protocol-clients.test.ts` | MCP + A2A pärisklientide E2E-testid             | Kohandatud protokollikliendid                      |
| `tests/e2e/ecosystem.test.ts`        | Teenusepakkujate integratsioon (kasutab võrku)  | Node'i sisseehitatud testikäitaja                  |

---

## `public/` — Staatilised ressursid

| Tee                 | Otstarve                                                             |
| ------------------- | -------------------------------------------------------------------- |
| `public/` (juur)    | Lemmikikoonid, robots.txt, manifest, teenusetöötaja, turunduspildid  |
| `public/providers/` | Teenusepakkujate logod PNG-/SVG-vormingus (kasutatakse juhtpaneelil) |

---

## `config/` — Staatilised konfiguratsioonid + kvaliteedivärava olek

Kaasapandud konfiguratsioonimallid ja hoidlasse talletatud kvaliteedivärava lähtetasemed
(teisaldati versioonis v3.8.26 hoidla juurkaustast siia, et juurkaust jääks kompaktseks).

| Tee                                           | Otstarve                                                                                           |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Lokaatide loend + metaandmed (42 lokaadi arvu kanooniline allikas)                                 |
| `config/i18n-schema.json`                     | JSON-skeem faili `i18n.json` valideerimiseks                                                       |
| `config/payloadRules.json`                    | Ülesvoolu andmekoormuse puhastamise reeglid                                                        |
| `config/quality/quality-baseline.json`        | Mitme mõõdiku järkjärgulise kvaliteediläve lähtetase (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Fikseeritud ESLinti keerukuse lähtetase (`check-complexity.mjs`)                                   |
| `config/quality/duplication-baseline.json`    | Fikseeritud jscpd dubleerimise lähtetase (`check-duplication.mjs`)                                 |
| `config/quality/file-size-baseline.json`      | Fikseeritud failipõhine suuruse lähtetase (`check-file-size.mjs`)                                  |
| `config/quality/test-discovery-baseline.json` | Fikseeritud sidumata testide lähtetase (`check-test-discovery.mjs`)                                |
| `config/quality/dependency-allowlist.json`    | Heakskiidetud sõltuvuste lubatud loend (`check-deps.mjs`)                                          |
| `config/quality/.license-allowlist.json`      | SPDX-litsentside lubatud loend (`check-licenses.mjs`)                                              |
| `config/quality/quality-metrics.json`         | Ajutiselt kogutud mõõdikud (genereerib `collect-metrics.mjs`; **gitignore'iga välistatud**)        |

---

## `.github/` — GitHubi integratsioon

| Tee                                | Otstarve                                                                |
| ---------------------------------- | ----------------------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actionsi CI/CD töövood (lintimine, testimine, katvus, väljalase) |
| `.github/ISSUE_TEMPLATE/`          | Vea- ja funktsioonitaotluste mallid                                     |
| `.github/pull_request_template.md` | PR-i mall                                                               |
| `.github/dependabot.yml`           | Sõltuvuste uuendamise konfiguratsioon                                   |

---

## `.husky/` — Giti haagid

| Fail         | Otstarve                                                                       |
| ------------ | ------------------------------------------------------------------------------ |
| `pre-commit` | Käivitab `lint-staged + check-docs-sync + check:any-budget:t11`                |
| `pre-push`   | Praegu keelatud (välja kommenteeritud). Käivitage `npm run test:unit` käsitsi. |
| `_/`         | Husky sisemised failid                                                         |

---

## `.claude/` — Claude Code'i kaldkriipsukäsud

| Fail                                                | Otstarve                                                             |
| --------------------------------------------------- | -------------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — versiooni tõstmine + automaatne muudatuste logi |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — täielik väljalaske töövoog                  |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Juurutamine VPS-i                                                    |
| `commands/capture-release-evidences-cc.md`          | Uute funktsioonide salvestamine brauseris WebP-vormingusse           |
| `commands/review-{prs,discussions}-cc.md`           | GitHubi PR-ide/arutelude sortimine                                   |
| `commands/{review-issues,implement-features}-cc.md` | Probleemidega seotud töövood                                         |
| `settings.local.json`                               | Projektipõhised Claude Code'i sätted                                 |

---

## `.agents/` — Üldised agentide töövood (Codex / Cursor / jne)

| Tee                      | Otstarve                                                |
| ------------------------ | ------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 töövoo definitsiooni (`.claude/commands/` peegeldus) |
| `skills/<name>/SKILL.md` | 9 oskuse definitsiooni koos Codexi täitmismärkustega    |

> **Märkus:** Töövood ja käsud on praegu baidihaaval identsed. Kui `.agents/` on mõeldud teistsuguse agendikäituskeskkonna (Codex) jaoks, peavad variandid sisuliselt erinema.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Väljaspool lähtepuud

Need allkriipsuga algavad kataloogid sisaldavad sisu, mida ei tarnita:

- **`_ideia/`** — disainimärkmed (edasilükatud / sobimatu / teostatav kategooria)
- **`_mono_repo/`** — ajaloolised alamprojektid (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — seotud OSS-projektide (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api jne) kirjutuskaitstud kloonid, mida kasutatakse arenduse ajal ristviitamiseks
- **`_tasks/`** — väljalaskepõhised ülesannete jälgimise failid (mitteametlikud)

Ei sisaldu `npm pack` väljundis. Vt `.npmignore`.

---

## Genereeritud / Giti poolt eiratavad

| Tee                    | Otstarve                       |
| ---------------------- | ------------------------------ |
| `node_modules/`        | npm-i sõltuvused               |
| `.next/`               | Next.js-i järgu väljund        |
| `coverage/`            | c8 koodikaetvuse aruanded      |
| `logs/`                | Käitusaegsed logid             |
| `package/`             | npm pack-i ettevalmistusala    |
| `.playwright-mcp/`     | Playwright MCP testiartefaktid |
| `.issues/`             | Kohalik probleemide vahemälu   |
| `tsconfig.tsbuildinfo` | TS-i inkrementaalne vahemälu   |

---

## Navigeerimisnõuanded

- **Uus kaastööline?** Loe `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Lisad teenusepakkujat?** Järgi jaotist `docs/architecture/ARCHITECTURE.md § Adding a New Provider` ja kontrolli lisaks dokumenti `docs/reference/PROVIDER_REFERENCE.md`.
- **Lisad marsruuti?** Vaata `docs/architecture/ARCHITECTURE.md § Adding a New API Route` ja `src/shared/validation/schemas.ts`.
- **Lisad MCP tööriista?** Vaata `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Lisad A2A oskuse?** Vaata `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Käivitad kohalikult?** Vaata `docs/guides/SETUP_GUIDE.md`.
- **Juurutad?** Vaata `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Avaldad versiooni?** Vaata `docs/ops/RELEASE_CHECKLIST.md` (ja Claude Code'i oskust `/generate-release-cc`).
