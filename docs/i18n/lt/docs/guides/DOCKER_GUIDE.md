# 🐳 Docker Guide — OmniRoute (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Išsami „Docker“ diegimo dokumentacija. Norėdami greitai pradėti, žr. [README „Docker“ skyrių](../README.md#-docker).

## Turinys

- [Greitas paleidimas](#quick-run)
- [Naudojant aplinkos failą](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Galimi profiliai](#available-profiles)
- [Pagrindinio kompiuterio CLI įrankių konfigūravimas, kai „OmniRoute“ veikia „Docker“ aplinkoje](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [„Redis“ pagalbinis konteineris](#redis-sidecar)
- [Produkcinės aplinkos „Compose“ konfigūracija](#production-compose)
- [Dockerfile etapai](#dockerfile-stages)
- [Svarbiausi aplinkos kintamieji](#critical-environment-variables)
- [Docker Compose su „Caddy“ (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [„Cloudflare Quick Tunnel“](#cloudflare-quick-tunnel)
- [Atvaizdų žymos](#image-tags)
- [Pasiekiamumas: numatytoji SQLite konfigūracija palaiko vieną repliką](#availability-default-sqlite-is-single-replica)
- [Svarbios pastabos](#important-notes)

---

## Greitasis paleidimas

> **Savarankiškas talpinimas viena komanda?** Žr.
> [savarankiško talpinimo vadovą](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (publikuotas atvaizdas +
> Redis, pasiekiamas tik per loopback sąsają, be profilio pasirinkimo). Toliau pateiktas greitasis paleidimas yra
> vieno konteinerio būdas naudotojams, kurie Redis jau naudoja kitur.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Naudojant aplinkos failą

```bash
# Pirmiausia nukopijuokite ir paredaguokite .env
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# Bazinis profilis (be CLI įrankių)
docker compose --profile base up -d

# CLI profilis (integruoti Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# Pagrindinio kompiuterio profilis (pirmiausia skirtas Linux; pagrindinio kompiuterio CLI vykdomieji failai prijungiami tik skaityti)
docker compose --profile host up -d

# Žiniatinklio profilis (Chromium/Playwright žiniatinklio seansų teikėjams)
docker compose --profile web up -d

# CLI ir CLIProxyAPI pagalbinio konteinerio derinys
docker compose --profile cli --profile cliproxyapi up -d
```

## Galimi profiliai

„OmniRoute“ pateikiamas su „Compose“ profiliais, skirtais pagrindiniams diegimo variantams. Pasirinkite jūsų aplinką atitinkantį profilį.

| Profilis             | Paslauga         | Kada naudoti                                                                                                                                                                                          | Komanda                                      |
| -------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (numatytasis) | `omniroute-base` | Serveris be grafinės sąsajos / minimali vykdymo aplinka, be įtrauktų paslaugų teikėjų CLI                                                                                                             | `docker compose --profile base up -d`        |
| `cli`                | `omniroute-cli`  | Agentinės darbo eigos, kurios iškviečia `omniroute providers/setup/doctor` ir įtrauktas CLI („Codex“, „Claude Code“, „Droid“, „OpenClaw“)                                                             | `docker compose --profile cli up -d`         |
| `host`               | `omniroute-host` | „Linux“ pagrindiniai kompiuteriai, kuriems reikia į `network_mode` panašios prieigos prie pagrindinio kompiuterio CLI, prijungiant `~/.local/bin`, `~/.codex`, `~/.claude` ir kt. tik skaitymo režimu | `docker compose --profile host up -d`        |
| `cliproxyapi`        | `cliproxyapi`    | Paleiskite [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) pagalbinį konteinerį per prievadą `8317`, skirtą išorinių CLI užklausoms perduoti                                              | `docker compose --profile cliproxyapi up -d` |
| `web`                | `omniroute-web`  | Žiniatinklio seansų paslaugų teikėjai, kuriems reikia naršyklės: `gemini-web`, `claude-web`, `claude-turnstile` (sukuriamas `runner-web`, įtrauktas „Chromium“)                                       | `docker compose --profile web up -d`         |

> Galima derinti kelis profilius: `docker compose --profile cli --profile cliproxyapi up -d`.

## Pagrindinio kompiuterio CLI įrankių konfigūravimas, kai „OmniRoute“ veikia „Docker“ aplinkoje

`omniroute setup-codex`, `setup-claude`, `config set <tool>` ir valdymo skydo mygtukas
**Išsaugoti konfigūraciją** įrašo tokius failus kaip `~/.codex/*.config.toml`. Šie keliai
turi prasmę tik tame kompiuteryje, kuriame iš tikrųjų veikia CLI. Paleidus šias
komandas konteineryje, failai įrašomi į paties konteinerio namų katalogą (`/home/node` —
atvaizdas veikia kaip `USER node`), iš kurio pagrindinio kompiuterio CLI jų niekada
neskaitys ir kuris pašalinamas iš karto, kai konteineris sukuriamas iš naujo.

„OmniRoute“ tai aptinka ir, užuot pranešusi apie sėkmingą, bet nepanaudojamą įrašymą,
jo atsisako bei pateikia instrukcijas: CLI baigia darbą su kodu `2`, o API atsako `422`
ir pateikia `containerEphemeralTarget: true`.

### Rekomenduojama: CLI paleiskite pagrindiniame kompiuteryje, o „OmniRoute“ — „Docker“ aplinkoje

Konteineris teikia API, o CLI konfigūruoja jūsų pagrindinio kompiuterio įrankius.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # nukreipkite CLI į konteinerį
omniroute setup-codex                      # įrašo tikrąjį ~/.codex jūsų pagrindiniame kompiuteryje
```

Tai tinkamas pasirinkimas, kai „Codex“, „Claude Code“, „Cursor“ ar panašūs įrankiai
veikia jūsų nešiojamajame kompiuteryje — o tai yra įprasta konfigūracija.

### Alternatyva: prijunkite pagrindinio kompiuterio konfigūracijos katalogus (`host` profilis)

Jei norite, kad pats konteineris įrašytų jūsų pagrindinio kompiuterio konfigūraciją,
prijunkite katalogus ir nustatykite `CLI_CONFIG_HOME` į prijungimo šakninį katalogą.
`host` profilyje tai jau padaryta:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Patikimumą keliui suteikia susietasis prijungimas: „OmniRoute“ skaito
`/proc/self/mountinfo` ir leidžia rašyti į prijungtus kelius (taip pat į katalogus,
kurių antriniai katalogai yra prijungimo taškai — būtent tokia yra anksčiau parodyta
`/host-home` struktūra), tačiau vis tiek atsisako rašyti į neprijungtus kelius.

### Atsarginė galimybė: konfigūruokite paties konteinerio CLI (naudokite saikingai)

Kai CLI iš tiesų yra konteineryje (`cli` profilyje), įrašymas yra tyčinis.
Bet kuriai `setup-*` komandai perduokite `--allow-container-write` arba serveriui
nustatykite `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. Įrašymas bus atliktas
pateikiant įspėjimą, kad duomenys neišliks pašalinus konteinerį.

> **Saugumo įspėjimas — `cli` profilis ir `docker.sock` prijungimas.**
> `cli` profilis susietuoju būdu prijungia `/var/run/docker.sock`, kad konteineryje
> veikianti automatinio naujinimo priemonė galėtų iš naujo sukurti rinkinį per
> pagrindinio kompiuterio demoną (`src/lib/system/autoUpdate.ts` tikrina, ar šis
> lizdas yra, ir praleidžia „Docker“ kelią, kai jo nėra). Šis lizdas yra
> **pagrindinio kompiuterio root lygmens pasitikėjimo riba**: viskas, kas gali jį
> pasiekti, valdo pagrindinio kompiuterio „Docker“ demoną kaip root — gali kurti,
> tikrinti, stabdyti ir šalinti bet kurį pagrindinio kompiuterio konteinerį.
> Pasekmės:
>
> 1. **Niekada neatverkite `cli` profilio prievado tinklui.** Publikuokite
>    jį per `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — vietiniame tinkle pasiekiamas `cli` profilis bet kokį valdymo skydo lygmens
>    nuotolinį kodo vykdymą (RCE) paverčia visišku pagrindinio kompiuterio perėmimu.
> 2. **Neprijunkite jokių papildomų pagrindinio kompiuterio katalogų prie `cli` profilio.**
>    „Docker“ lizdas kartu su bet kuriuo papildomu prijungimu suteikia konteineriui
>    visišką jūsų failų sistemos ir pagrindinio kompiuterio konfigūracijos skaitymo
>    bei rašymo prieigą. Jei įrankiui reikia pasiekti projektą, paleiskite jį vietoje
>    naudodami CLI dvejetainį failą — neprijunkite projekto prie `cli` konteinerio.
>
> Jei automatinio naujinimo konteineryje nereikia, neįjunkite `cli` profilio
> (`COMPOSE_PROFILES=core,redis` arba trumpesnės reikšmės). Kiti profiliai
> „Docker“ lizdo neprijungia.
>
> Susijusį MITM grėsmių modelį žr. `docs/security/MITM-TPROXY-DECRYPT.md` („git“ faile;
> jis nekompiliuojamas į `/docs`), o `codex`/`claude-code`/`droid`/`openclaw`
> dvejetainių failų kilmės grandinę — `docs/security/SUPPLY_CHAIN.md`.

## „Redis“ pagalbinis konteineris

„OmniRoute“ naudoja „Redis“ paskirstytajam užklausų dažnio ribotuvui ir bendrai podėlio atminčiai. `redis` paslauga yra **visada apibrėžta** faile `docker-compose.yml` (jai netaikomas joks profilio apribojimas) ir paleidžiama kartu su bet kuriuo kitu profiliu.

| Informacija                                            | Reikšmė                                              |
| ------------------------------------------------------ | ---------------------------------------------------- |
| Atvaizdas                                              | `redis:7-alpine`                                     |
| Konteinerio pavadinimas                                | `omniroute-redis`                                    |
| Vidinis prievadas                                      | `6379`                                               |
| Pagrindinio kompiuterio prievadas (perrašomas)         | `REDIS_PORT` (numatytoji reikšmė – `6379`)           |
| Pagrindinio kompiuterio susiejimo adresas (perrašomas) | `REDIS_BIND_HOST` (numatytoji reikšmė – `127.0.0.1`) |
| Tomas                                                  | `omniroute-redis-data` → `/data`                     |
| Būklės patikra                                         | `redis-cli ping` (10 sek. intervalas)                |

Susiję aplinkos kintamieji:

- `REDIS_URL` — į programą įterpiama prisijungimo eilutė (numatytoji reikšmė – `redis://redis:6379`).
- `REDIS_PORT` — pagrindinio kompiuterio prievadas, susiejamas su „Redis“ konteineriu.
- `REDIS_BIND_HOST` — pagrindinio kompiuterio sąsaja, kurioje publikuojamas prievadas. Numatytoji reikšmė – `127.0.0.1`.

> **Kodėl pagal numatytąsias nuostatas naudojama grįžtamojo ryšio sąsaja:** pagalbinis konteineris veikia be `requirepass`, o programos
> konteineriai jį pasiekia per „Compose“ tinklą (`redis:6379`) — publikuojamas prievadas
> skirtas tik pagrindinio kompiuterio įrankiams (`redis-cli`, vietinei `npm run dev` komandai). Publikavus jį adresu
> `0.0.0.0`, autentifikavimo nereikalaujanti „Redis“ paslauga būtų pasiekiama kiekvienam jūsų LAN kompiuteriui. Jei nustatote
> `REDIS_BIND_HOST=0.0.0.0`, į paslaugos `command:` taip pat pridėkite `--requirepass`.

**Išjungti „Redis“** nerekomenduojama (užklausų dažnio ribotuvas pereis prie atsarginio veikimo atmintyje). Jei tai būtina, pašalinkite arba užkomentuokite `redis:` paslaugos bloką faile `docker-compose.yml`, arba sumažinkite jos egzempliorių skaičių iki nulio:

```bash
docker compose up -d --scale redis=0
```

## Produkcinė „Compose“ aplinka

Norėdami kartu su kūrimo aplinka paleisti izoliuotą produkcinę momentinę kopiją, naudokite `docker-compose.prod.yml`.

| Informacija                            | Reikšmė                                                                                |
| -------------------------------------- | -------------------------------------------------------------------------------------- |
| Failas                                 | `docker-compose.prod.yml`                                                              |
| Numatytasis valdymo skydelio prievadas | `PROD_DASHBOARD_PORT=20130` (susietas su vidiniu `${DASHBOARD_PORT:-20128}`)           |
| Numatytasis API prievadas              | `PROD_API_PORT=20131`                                                                  |
| Atvaizdas                              | `omniroute:prod` (sukurtas iš `runner-cli` etapo)                                      |
| „Redis“ konteineris                    | `omniroute-redis-prod` (`redis:8.6.2`, atskiras `redis-prod-data` tomas)               |
| Duomenų tomas                          | `omniroute-prod-data` (vardinis, išlaikomas tarp pakartotinių kūrimų)                  |
| Būklės patikros                        | `node healthcheck.mjs` + `redis-cli ping`, o `depends_on` priklauso nuo „Redis“ būklės |

Naudojimas:

```bash
# Sukurkite ir paleiskite produkcinį rinkinį
docker compose -f docker-compose.prod.yml up -d --build

# Stebėkite žurnalus realiuoju laiku
docker compose -f docker-compose.prod.yml logs -f

# Sustabdykite ir pašalinkite aplinką (išsaugokite tomus)
docker compose -f docker-compose.prod.yml down
```

Produkcinis rinkinys veikia lygiagrečiai su kūrimo „Compose“ aplinka (naudojami skirtingi konteinerių pavadinimai, prievadai ir tomai), todėl galite tęsti vietinį kūrimą, kol produkcinė aplinka lieka paleista.

## Dockerfile etapai

Saugykloje pateikiamas kelių etapų Dockerfile (`Dockerfile`). Galimi keturi etapai; pasirinkite jūsų naudojimo atvejui tinkamą `target`.

| Etapas        | Bazinis atvaizdas     | Paskirtis                                                                                                                                                                                                                                                                                                  |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Įdiegia priklausomybes (`npm ci --legacy-peer-deps`) ir paleidžia `npm run build` (pagal numatytuosius nustatymus naudojamas Turbopack — žr. toliau pateiktą skiltį „Kompiliavimo ištekliai“)                                                                                                              |
| `runner-base` | `node:26-trixie-slim` | Produkcinė vykdymo aplinka su autonomine Next.js išvestimi. **Teikėjų CLI neįtrauktos.**                                                                                                                                                                                                                   |
| `runner-cli`  | `runner-base`         | Prideda `git`, `docker.io`, `docker-compose` ir visuotines CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Rinkitės šį etapą agentinėms darbo eigoms.**                                                                                                                          |
| `runner-web`  | `runner-base`         | Prideda Playwright ir Chromium naršyklę (`--with-deps`), skirtą žiniatinklio seansų teikėjams: `gemini-web`, `claude-web`, `claude-turnstile`. **Rinkitės šį etapą, kai naudojate šiuos teikėjus** — be jo įprastas atvaizdas užklausos metu neveiks (žr. pastabą apie `-web` skiltyje „Leidimų kanalai“). |

Norėdami rankiniu būdu sukurti konkretų tikslą:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Kompiliavimo ištekliai

Trys kompiliavimo argumentai valdo `builder` etapo išteklių sąnaudas. Jie taikomi tik kompiliuojant —
`OMNIROUTE_MEMORY_MB` (toliau) yra atskiras vykdymo aplinkos parametras.

| Kompiliavimo argumentas     | Numatytoji reikšmė | Poveikis                                                                                               |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `1`                | Nustačius `0`, kompiliuojama naudojant webpack. Mažesnis didžiausias atminties naudojimas, bet lėčiau. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`             | V8 krūvos riba (`--max-old-space-size`) paleistam `next build` procesui.                               |
| `OMNIROUTE_BUILD_WORKERS`   | `2`                | Perduodama į `CIRCLE_NODE_TOTAL`; Next nustato `workers = N - 1` puslapių duomenims rinkti.            |

`OMNIROUTE_BUILD_WORKERS` yra parametras, kurį reikia didinti galingame kompiliavimo serveryje ir
kurį reikėtų įtarti, kai ribotų išteklių aplinkoje kompiliavimas nutrūksta **po** `✓ Compiled successfully`. Kiekvienas
puslapių duomenų darbinis procesas yra atskiras procesas, kaip ir pats pagrindinis `next build`;
atkuriant problemą veikiančiame VPS (problema #7518), nustatyta, kad kiekvieno proceso didžiausias RSS siekė
~4.5 GB, nepriklausomai nuo `NODE_OPTIONS` krūvos parametro (Turbopack kompiliuoja
naudodamas savąją / Rust atmintį už V8 krūvos ribų). Numatytoji reikšmė `2` (→ 1 darbinis procesas, iš viso 2
procesai) pritaikyta 16 GB / 4 vCPU GitHub prieglobos vykdyklėms, kurias
naudoja publikavimo konvejeris. Nustačius `8` (→ 7 darbiniai procesai), toje vykdyklėje pritrūko atminties ir
buildkit nutraukė veiksmą su klaida `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 darbiniai procesai) vis tiek netilpo, kai vieno proceso RSS buvo išmatuotas
tiesiogiai, o ne apskaičiuotas. `tests/unit/docker-build-memory-budget.test.ts`
atlieka skaičiavimus pagal išmatuotą reikšmę ir nepavyksta, jei kuris nors parametras
viršija vykdyklės galimybes.

Turbopack kompiliuoja naudodamas savąją Rust atmintį, esančią **už** V8 krūvos ribų, todėl
`OMNIROUTE_BUILD_MEMORY_MB` jos neriboja. Pagrindiniame kompiuteryje su atminties apribojimu
OOM nutraukimo mechanizmas siunčia kompiliavimo procesui SIGKILL be jokio klaidos teksto — jis tiesiog
sustoja vykdant `Creating an optimized production build`, todėl tai labiau primena užstrigimą,
o ne atminties trūkumą. Jei kompiliavimo pagrindinio kompiuterio ištekliai riboti, pakeiskite pakavimo priemonę:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` yra įjungtas, todėl `next build` paleidžia pagrindinį **ir** darbinį
procesą, o kiekvienas jų atskirai paiso `OMNIROUTE_BUILD_MEMORY_MB`. Nustatykite konteinerio
ribą maždaug dvigubai didesnę už šią reikšmę, o ne lygią jai.

Išmatuota šiame medyje (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Pakavimo priemonė | Konteinerio riba | Rezultatas                                        |
| ----------------- | ---------------- | ------------------------------------------------- |
| Turbopack         | 8 GiB / 16 GiB   | Abiem atvejais tyliai nutraukta dėl OOM           |
| webpack           | 8 GiB            | Darbinis kompiliavimo procesas nutrauktas SIGKILL |
| webpack           | 12 GiB           | Pavyko, didžiausias naudojimas siekė 11.1 GiB     |

### Vykdymo aplinkos numatytosios reikšmės

`runner-base` eksportuojamos numatytosios reikšmės: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Atminties veikimas Docker aplinkoje:

- Atvaizdas nustato `OMNIROUTE_MEMORY_MB=1024` ir pagal jį išveda `NODE_OPTIONS=--max-old-space-size=1024`.
- Faktinį serverio procesą paleidžia autonominė paleidyklė, kuri nuskaito `OMNIROUTE_MEMORY_MB` ir prideda `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node naudoja paskutinę pasikartojančią `--max-old-space-size` reikšmę, todėl `OMNIROUTE_MEMORY_MB` nustato faktinį Docker kaupo limitą.
- Kadangi atvaizdas visada jį nustato, paleidyklės atsarginė reikšmė, apskaičiuojama pagal RAM kiekį, Docker aplinkoje niekada netaikoma. Aiškiai padidinkite ją pagal darbo krūvį (žr. lentelę toliau). `2048` vis tiek yra per mažai programavimo agento `/v1/responses` užklausoms.

### Vykdymo aplinkos RAM programavimo agentams

Numatytasis 1 GiB Docker limitas yra minimalus dydis valdymo skydeliui ir nesudėtingiems pokalbiams, o ne gamybinei aplinkai. Apdorojant ilgas `POST /v1/responses` užklausas (šimtai pranešimų, dešimtys įrankių), glaudinimo metu atmintyje laikomos kelios duomenų struktūros. Dvi persidengiančios ~3 MiB / ~750k žetonų užklausos nutraukė V8 veikimą esant **12 GiB** senosios kartos kaupui (`FATAL ERROR: Reached heap limit`) ir taip pat pasiekė 16 GiB cgroup OOM limitą. Žr. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Nustatykite **cgroup `--memory` didesnį už kaupą** — savieji buferiai, SQLite ir tarpiniai glaudinimo duomenys laikomi už V8 ribų.

| Darbo krūvis                                     | `OMNIROUTE_MEMORY_MB`                | Konteineris / cgroup                        | Pastabos                                                                                                                                    |
| ------------------------------------------------ | ------------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Valdymo skydelis, vienas nesudėtingas pokalbis   | `1024` (numatytoji atvaizdo reikšmė) | ≥2 GiB                                      |                                                                                                                                             |
| Vienas programavimo agentas (Claude/Codex/Grok)  | `8192`                               | ≥10 GiB                                     | Įprasta vieno seanso `/v1/responses` užklausa                                                                                               |
| Dvi lygiagrečios ilgos `/v1/responses` užklausos | `10240`–`12288`                      | ≥12–16 GiB                                  | Išmatuotas V8 veikimo nutraukimas esant ~12 GiB kaupui                                                                                      |
| Trys ar daugiau lygiagrečių ilgų kontekstų       | nenaudokite viename procese          | vykdykite nuosekliai / skirkite daugiau RAM | Pagal numatytuosius nustatymus vienu metu apdorojama 1 didelė užklausa; padidinus šį skaičių be papildomos RAM, veikimas vėl bus nutrauktas |

`omniroute serve` fizinėje sistemoje nustato ~35% RAM (apribojant intervalu `[512, 4096]`), kai `OMNIROUTE_MEMORY_MB` yra **nenustatytas**. Docker visada nustato `1024`, todėl oficialiame atvaizde šis kalibravimas niekada nevykdomas.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritiniai aplinkos kintamieji

Be numatytųjų reikšmių, aprašytų faile [ENVIRONMENT.md](../reference/ENVIRONMENT.md), vykdant su Docker svarbiausi yra šie kintamieji:

| Kintamasis                    | Paskirtis                                                                                                                                                                                                                                                                                                                                                    | Numatytoji reikšmė                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket tilto bendrasis slaptasis raktas. **Būtinas produkcinėje aplinkoje** — nustatykite kaip sudėtingą atsitiktinę eilutę.                                                                                                                                                                                                                              | nenustatyta (būtina pateikti)        |
| `REDIS_URL`                   | Ryšio eilutė, skirta užklausų dažnio ribotuvo / podėlio posistemei                                                                                                                                                                                                                                                                                           | `redis://redis:6379`                 |
| `REDIS_PORT`                  | Pagrindinio kompiuterio prievadas, skirtas kartu pateikiamam Redis konteineriui                                                                                                                                                                                                                                                                              | `6379`                               |
| `REDIS_BIND_HOST`             | Pagrindinio kompiuterio sąsaja, kurioje publikuojamas kartu pateikiamo Redis prievadas (grįžtamojo ryšio sąsaja, nebent pridėtumėte AUTH)                                                                                                                                                                                                                    | `127.0.0.1`                          |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Pagrindinio kompiuterio kelias, prijungiamas prie `cli` profilio kaip `/workspace/omniroute` ir naudojamas savaiminio atnaujinimo darbo eigoms                                                                                                                                                                                                               | `.` (dabartinis katalogas)           |
| `OMNIROUTE_MEMORY_MB`         | Vykdymo metu taikoma Node kaupo atminties riba atskiram Docker serveriui; pakeičia anksčiau nurodytą numatytąją atvaizdo reikšmę. Programavimo agentams: `8192`+ (žr. [vykdymo aplinkos RAM](#runtime-ram-for-coding-agents)).                                                                                                                               | `1024`                               |
| `DASHBOARD_PORT` / `API_PORT` | Pakeičia atvertus valdymo skydelio (20128) ir API (20129) prievadus                                                                                                                                                                                                                                                                                          | `20128` / `20129`                    |
| `APP_BIND_HOST`               | Pagrindinio kompiuterio sąsaja, kurioje docker-compose publikuoja valdymo skydelio / API / tiesioginio WS ryšio prievadus. Kai `REQUIRE_API_KEY=false` (numatytoji reikšmė), `0.0.0.0` atveria anoniminį `/v1` tarpinį serverį vietiniam tinklui — išplėskite prieigą tik nustatę `REQUIRE_API_KEY=true` arba naudodami išorinį atvirkštinį tarpinį serverį. | `127.0.0.1`                          |
| `CLIPROXY_BIND_HOST`          | Pagrindinio kompiuterio sąsaja, kurioje docker-compose publikuoja pagalbinį `cliproxyapi` konteinerį — jo duomenų tome saugomi paslaugų teikėjų prisijungimo duomenys.                                                                                                                                                                                       | `127.0.0.1`                          |
| `OMNIROUTE_PLUGINS_DIR`       | Katalogas, kurį nuskaito vykdymo aplinkos papildinių skaitytuvas ir kuriame diegiami papildiniai. Nustatykite jį, kai papildiniai prijungiami kaip bind tipo tomai: numatytoji reikšmė priklauso nuo `HOME`, kurio atvaizdas nebūtinai eksportuoja.                                                                                                          | `~/.omniroute/plugins`               |
| `OMNIROUTE_BASE_PATH`         | URL antrinis kelias, kai programa publikuojama už atvirkštinio tarpinio serverio (pvz., `/omniroute`)                                                                                                                                                                                                                                                        | _(tuščia reikšmė = šakninis kelias)_ |
| `NEXT_PUBLIC_BASE_URL`        | Viešoji naršyklės kilmės vieta, įskaitant antrinį kelią (pvz., `https://host/omniroute`)                                                                                                                                                                                                                                                                     | nenustatyta                          |
| `PROD_DASHBOARD_PORT`         | Pagrindinio kompiuterio valdymo skydelio prievadas, skirtas `docker-compose.prod.yml`                                                                                                                                                                                                                                                                        | `20130`                              |
| `CLIPROXYAPI_PORT`            | Pagrindinio kompiuterio prievadas, skirtas pagalbiniam `cliproxyapi` konteineriui                                                                                                                                                                                                                                                                            | `8317`                               |

## Atvirkštinis tarpinis serveris poaplankyje (Traefik / nginx)

Next.js `basePath` įkompiliuojamas į autonominį paketą. OmniRoute įrašo įkompiliuotą
reikšmę programos šakniniame aplanke esančiame kontroliniame faile (įrašoma vykdant `npm run build`;
nuskaitoma naudojant `scripts/docker/ensure-docker-base-path.mjs`) ir paleidžiant
konteinerį palygina ją su `OMNIROUTE_BASE_PATH`. Kai šios reikšmės skiriasi, o atvaizdas
buvo sukurtas domeno šakniniam keliui, įėjimo taškas perrašo autonominio paketo manifestus,
įterptus `basePath`/`assetPrefix` literalus (Next 16 generuoja SSR išteklių URL naudodamas
tik `assetPrefix` — pataisymo priemonė į jį taip pat įrašo poaplankį), įkompiliuotus
`/_next/static` išteklių URL (kliento nuorodų manifestuose, medijos importuose, iš anksto sugeneruotuose
klaidų puslapiuose) ir kliento `process.env` pakaitalą prieš paleidžiant
`node dev/run-standalone.mjs`.

### Kūrimas naudojant Compose (rekomenduojama)

Nustatykite abu kintamuosius faile `.env`, tada sukurkite iš naujo, kad atvaizdo ir vykdymo aplinkos
reikšmės sutaptų:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` perduoda `OMNIROUTE_BASE_PATH` kaip Docker kūrimo argumentą ir kaip
vykdymo aplinkos kintamąjį.

### Iš anksto sukurtas šakninio kelio atvaizdas + vykdymo aplinkos poaplankis

Paskelbti `diegosouzapw/omniroute:*` atvaizdai yra sukurti domeno šakniniam keliui. Vis tiek galite
nustatyti `OMNIROUTE_BASE_PATH` vykdymo metu; paleidžiamas konteineris vieną kartą pataisys paketą.
Kartu nurodykite atitinkamą viešąjį šaltinį:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Sukonfigūruokite atvirkštinį tarpinį serverį taip, kad jis persiųstų **visą** išorinį kelią
(nepašalinkite prefikso). Traefik turi nukreipti `PathPrefix(`/omniroute`)` į konteinerį
nenaudodamas `StripPrefix`, kad Next.js gautų `/omniroute/...` ir pateiktų išteklius iš
`/omniroute/_next/...`.

Docker būklės patikra tikrina lengvąjį `/healthz` gyvavimo ciklo galinį tašką, prieš jį
pridėdama aktyvų `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` išlieka pasiekiamas
žmonėms ir diagnostikos skydeliams; norėdami konteinerio HEALTHCHECK vėl nukreipti į jį
(pavyzdžiui, išsamiai būklės kontrolei), nustatykite
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Šis kelias atlieka **išsamią** patikrą (DB + stebėsenos suvestinė) — ji tinkama retai
vykdomai Docker `HEALTHCHECK`, jei nuspręsite ją vėl įjungti, tačiau **netinka**
Kubernetes `livenessProbe` intervalams.

Orkestravimo sistemoms (Kubernetes, Nomad ir kt.):

| Patikra          | Rekomenduojama                                                                  | Venkite                                                                     |
| ---------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Gyvybingumo      | HTTP `GET /livez` arba TCP pagrindiniame prievade (`PORT`, numatytasis `20128`) | `/api/monitoring/health` kaip gyvybingumo patikros                          |
| Parengties       | HTTP `GET /healthz`                                                             | Trumpų skirtųjų laikų, kai užimta įvykių kilpa laikoma neveikiančiu procesu |
| Išsami / išorinė | `/api/monitoring/health`                                                        | —                                                                           |

`/healthz` pateikia proceso gyvavimo ciklo būseną (`ok` / `starting` / `stopping`). `/livez`
tik patvirtina, kad procesas veikia (200, kai tik gali būti vykdoma apdorojimo funkcija;
parengties nelaukiama). Abu galiniai taškai vis tiek vykdomi toje pačioje Node įvykių
kilpoje kaip ir užklausų apdorojimas, todėl CPU intensyvus katalogo ar glaudinimo darbas
gali juos uždelsti — užimtas ≠ neveikiantis. Jei baigiasi HTTP patikrų skirtasis laikas,
pirmenybę teikite TCP gyvybingumo patikrai. Išsamios patikrų rekomendacijos:
[Stebėsenos vadovas — Kubernetes patikrų rekomendacijos](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose su Caddy (automatinis HTTPS TLS)

OmniRoute galima saugiai paskelbti naudojant Caddy automatinį SSL parengimą. Įsitikinkite, kad jūsų domeno DNS A įrašas nukreiptas į jūsų serverio IP adresą.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Naršyklei skirta pradinė vieta, naudojama OAuth atgaliniams iškvietimams, valdymo skydelio nuorodoms ir sugeneruotiems viešiesiems URL.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Vidinis URL, skirtas ryšiui tarp serverių vykdant suplanuotas užduotis ir užklausas į save.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy nustato standartines persiuntimo antraštes aukštesniojo lygmens konteineriui. OmniRoute naudoja
`NEXT_PUBLIC_BASE_URL` kaip kanoninę viešąją pradinę vietą OAuth atgaliniams iškvietimams ir generuojamoms viešosioms
nuorodoms; autentifikuoti valdymo skydelio rašymo veiksmai naudoja tos pačios kilmės užklausas ir su seansu susietą CSRF
apsaugą. Įjunkite `OMNIROUTE_TRUST_PROXY` tik sudėtingesnėse diegimo konfigūracijose, kuriose sąmoningai
norite, kad OmniRoute nustatytų viešąją pradinę vietą pagal patikimas persiųstas antraštes, o ne aiškią
konfigūraciją.

## Cloudflare greitasis tunelis

Docker diegimams skirtame valdymo skydelyje, skiltyje `Dashboard → Endpoints`, galima vienu spustelėjimu įjungti **Cloudflare greitąjį tunelį**. Pirmą kartą įjungus, `cloudflared` atsisiunčiamas tik tada, kai jo prireikia, paleidžiamas laikinas tunelis į dabartinį `/v1` galinį tašką, o sugeneruotas `https://*.trycloudflare.com/v1` URL rodomas tiesiai po įprastu viešuoju URL.

Galinių taškų tunelių skydelius (Cloudflare, Tailscale, ngrok) galima rodyti arba slėpti per `Settings → Appearance`, nekeičiant aktyvaus tunelio būsenos.

### Pastabos apie tunelius

- Greitųjų tunelių URL yra laikini ir pasikeičia po kiekvieno paleidimo iš naujo.
- Greitieji tuneliai nėra automatiškai atkuriami iš naujo paleidus OmniRoute arba konteinerį. Prireikus juos vėl įjunkite valdymo skydelyje.
- Valdomas diegimas šiuo metu palaikomas Linux, macOS ir Windows sistemose su `x64` / `arm64`.
- Valdomuose greituosiuose tuneliuose pagal numatytuosius nustatymus naudojamas HTTP/2 perdavimo protokolas, kad ribotų išteklių konteinerių aplinkose būtų išvengta triukšmingų QUIC UDP buferio įspėjimų. Jei norite naudoti kitą perdavimo protokolą, nustatykite `CLOUDFLARED_PROTOCOL=quic` arba `auto`.
- Docker atvaizduose yra sistemos šakniniai CA sertifikatai, kurie perduodami valdomam `cloudflared`, todėl išvengiama TLS pasitikėjimo klaidų, kai tunelis inicijuojamas konteinerio viduje.
- Nustatykite `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, jei norite, kad OmniRoute naudotų esamą vykdomąjį failą, užuot jį atsisiuntęs.

## Atvaizdų žymos

| Atvaizdas                | Žyma     | Dydis  | Aprašymas                                                |
| ------------------------ | -------- | ------ | -------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Aukščiausia **paskelbta** stabili SemVer (ne git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps naudokite fiksuotą šios klasės žymą               |

Kelių platformų manifestas: savieji `linux/amd64` + `linux/arm64` atvaizdai („Apple Silicon“, „AWS Graviton“, „Raspberry Pi“). Docker automatiškai parenka tinkamą architektūrą; jei ARM pagrindiniuose kompiuteriuose reikia priverstinai naudoti AMD64 emuliaciją, nurodykite `--platform linux/amd64`.

### Leidimų kanalai

OmniRoute skelbia atskirus Docker kanalus stabiliems leidimams, aktyvios leidimo šakos testavimui ir kūrimo versijoms.

| Kanalas                         | Šaltinis                                 | Kintamumas                          | Rekomenduojamas naudojimas                                                                                              |
| ------------------------------- | ---------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Pasirašytas / versijuotas leidimas       | Nekintamas                          | Produkciniai diegimai, kuriuose fiksuojamas konkretus leidimas                                                          |
| `:latest` / `:latest-web`       | Aukščiausia **paskelbta** stabili SemVer | Kintama stabilios versijos rodyklė  | Seka stabilius leidimus **po** SemVer paskelbimo užduoties — **neseka** `main` ar dar neišleistų `release/v*` pakeitimų |
| `:next` / `:next-web`           | Dabartinė numatytoji `release/v*` šaka   | Kintama išankstinio leidimo rodyklė | Pataisų, kurios jau įtrauktos į aktyvią leidimo šaką, bet dar nepateko į stabilų leidimą, testavimas                    |
| `:main` / `:main-web`           | `main` šaka                              | Kintama kūrimo versijos rodyklė     | Tik kūrimo ir integravimo testavimui                                                                                    |

#### Žiniatinklio seansų teikėjai: `-web` atvaizdai

Kiekvienas anksčiau nurodytas kanalas taip pat turi `-web` žymą (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), sukurtą iš `runner-web` etapo — tai tas pats atvaizdas, papildytas Playwright ir Chromium naršykle. Įprastas atvaizdas pateikiamas **be** Chromium; jos reikia `gemini-web`, `claude-web` ir `claude-turnstile`.

Klaida įvyksta ne paleidimo metu, o vėliau: šie teikėjai pateikia savo modelių sąrašus ir valdymo skydelyje rodomi kaip prisijungę, tačiau pirmoji užklausa nepavyksta ir pateikia:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Jei naudojate šiuos teikėjus, atsisiųskite jau naudojamo kanalo `-web` žymą — daugiau niekas nesikeičia. Diegiant per npm / CLI (be Docker atvaizdo), trūkstamas komponentas yra naršyklės dvejetainis failas: pagrindiniame kompiuteryje paleiskite `npx playwright install chromium`.

#### Išankstinio leidimo kanalo naudojimas

`next` kanalas iš naujo sukuriamas po kiekvieno pakeitimų išsiuntimo į dabartinę numatytąją `release/v*` šaką ir skelbiamas tiek AMD64, tiek ARM64 architektūroms. Senesnės priežiūros šakos negali jo perrašyti. Šis kanalas suteikia atsisiunčiamą atvaizdą pataisoms, kurios prieš sukuriant kitą stabilią žymą buvo sujungtos su aktyvia leidimo šaka.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Naudodami Docker Compose, pakeiskite pasirinkto profilio naudojamą atvaizdo žymą, tada atsisiųskite atvaizdą ir iš naujo sukurkite paslaugą:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Saugumas ir ankstesnės versijos atkūrimas

`next` yra kintamas išankstinio leidimo kanalas. Jis gali pasikeisti po bet kokio pakeitimų išsiuntimo į aktyvią leidimo šaką ir **nėra palaikomas produkciniam naudojimui**. Vertindami konkrečią versiją, užfiksuokite atvaizdo maišą:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Prieš testuodami sukurkite atsarginę OmniRoute duomenų tomo arba susieto duomenų katalogo kopiją. Norėdami grįžti prie ankstesnės versijos, atkurkite anksčiau naudotą stabilią versiją arba maišą ir iš naujo sukurkite konteinerį:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Leidimo šakos versija niekada negali pakeisti `latest`; stabilios versijos rodyklę gali atnaujinti tik tinkama stabili semantinė versija. `next` atvaizdams taikoma leidimo atvaizdo patikra ir blokuojanti KRITINIŲ pažeidžiamumų patikra.

**`latest` negarantuoja git naujausios būsenos.** Į `main` arba aktyvią `release/v*` šaką sujungtos pataisos **nepatenka** į `:latest`, kol nepaskelbiamas stabilus SemVer atvaizdas ir paskelbimo užduotis neatnaujina `:latest` (tas pats maišas kaip ir tos SemVer versijos). Jei atrodo, kad `latest` neatnaujinamas, nors GitHub jau rodo pataisą, atsisiųskite `:next`, kad išbandytumėte leidimo šaką, arba palaukite SemVer žymos.

| Ko norite                                                                                       | Ką naudoti                                |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------- |
| GitOps / produkcinės aplinkos, kuri neturi savaime keistis                                      | Fiksuokite `:X.Y.Z` (arba atvaizdo maišą) |
| Sekti paskelbtus stabilius leidimus ir po kiekvieno leidimo sutikti iš naujo sukurti konteinerį | `:latest`                                 |
| Testuoti dar neišleistus `release/v*` pakeitimus                                                | `:next` (ne produkcinei aplinkai)         |
| Testuoti `main`                                                                                 | `:main` (ne produkcinei aplinkai)         |

## Pasiekiamumas: numatytoji SQLite konfigūracija turi vieną repliką

Standartinę Docker / Kubernetes „OmniRoute“ konfigūraciją sudaro **vienas Node procesas ir vienas SQLite rašymo procesas**. Toks topologijos variantas **nepalaiko** didelio pasiekiamumo.

| Apribojimas                                                | Pasekmė                                                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vienas rašymo procesas                                     | **Nepaleiskite** kelių replikų, naudojančių tą patį SQLite failą. Taip sugadinama DB.                                                                                                                                                                                                                                                                 |
| Perkūrimas / paleidimas iš naujo / HEALTHCHECK nutraukimas | **Visiškai nutrūksta** vykdomi SSE srautai, skydelio seansai ir atmintyje laikoma būsena. Atjungiami visi prisijungę klientai. Naujos užklausos laikotarpiu, kai nėra galinių taškų, iš atvirkštinio tarpinio serverio gauna **`502 Bad Gateway: Unknown error`**, o ne „OmniRoute“ JSON — klientai negali to atskirti nuo teikėjo trikties (#11015). |
| Tas pats įvykių ciklas kaip `/healthz`                     | Užimtas katalogo arba glaudinimo ciklas gali uždelsti patikras; trumpas skirtasis laikas tuomet iš naujo paleidžia **vienintelę** repliką.                                                                                                                                                                                                            |

**Patikrų matrica** (taip pat žr. [Kubernetes patikrų rekomendacijas](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Patikra             | Tikslas                                                                            | Nenaudokite                                                         |
| ------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Gyvybingumo         | TCP per `PORT` (numatytoji reikšmė `20128`) arba negriežta HTTP `/healthz` patikra | `/api/monitoring/health`                                            |
| Parengties          | HTTP `GET /healthz`                                                                | Trumpų skirtųjų laikų, kurie užimtą įvykių ciklą laiko neveikiančiu |
| Išsamioji / žmonėms | `/api/monitoring/health`                                                           | Automatinėms kubelet gyvybingumo patikroms                          |

**Atnaujinimai:** tikėkitės, kad kiekvienas seansas nutrūks. Jei galite, palaipsniui atjunkite klientus; naudojant numatytąją SQLite konfigūraciją slenkamasis atnaujinimas negalimas. Compose `restart: unless-stopped` kartu su Docker `HEALTHCHECK` taip pat pakeis vienintelį procesą, kai konteinerio būsena taps „Unhealthy“ — poveikio mastas bus toks pats.

Kubernetes ištrauka, skirta **vienai replikai** (Recreate yra privalomas; nedidinkite `replicas`, kai naudojamas vienas SQLite failas):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

`preStop` delsa leidžia kube pašalinti Service galinius taškus prieš SIGTERM, kad **naujas** srautas nebebūtų siunčiamas į išjungiamą procesą. Vykdomi `/v1/responses` SSE srautai užbaigiami per laikotarpį iki `SHUTDOWN_TIMEOUT_MS` (numatytoji reikšmė – 30 s), naudojant išplėstinius priėmimo leidimus (#11015). Naujos užklausos, kurios vis tiek pasiekia procesą, gauna `503` ir `Retry-After: 5`. Recreate laikotarpis be galinių taškų, trunkantis, kol pakaitinis procesas tampa parengtas, vis tiek reiškia visišką prastovą — tai SQLite topologijos ypatybė, o ne netinkama patikrų konfigūracija.

Išorinė Postgres / kelių rašymo procesų HA konfigūracija **nėra** dokumentuotas standartinis sprendimas. Jei jums reikia HA, naudokite vieną repliką arba topologiją, kurią projektas atskirai išbandė ir dokumentavo. Postgres/MySQL darbai vykdomi [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Kol tai neįgyvendinta, vienintelis palaikomas būdas padidinti **didelių** `/v1/responses` užklausų apdorojimo pajėgumą yra N nepriklausomų procesų (žr. kitą skyrių), o ne `replicas > 1`, naudojant vieną tomą.

## Horizontalusis mastelio didinimas: N nepriklausomų procesų

Vienas Node procesas yra **viena V8 krūva**. Dvi persidengiančios ~3 MiB / ~750k žetonų programavimo agento `POST /v1/responses` užklausos (RTK + Caveman) nutraukia tos krūvos veikimą ties ~12 Gi (`FATAL ERROR: Reached heap limit`) ir gali išeikvoti 16 Gi cgroup atmintį. Žr. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Šis matavimas yra įspėjimas apie **atminties biudžetą**, o ne griežtas produkto apribojimas iki dviejų vienalaikių ilgų `/v1/responses` užklausų. Didelės apimties pokalbių priėmimą riboja automatiškai apskaičiuojamas gaunamų baitų biudžetas (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), nustatomas pagal tą pačią V8/cgroup ribą — padidinus jo reikšmę (arba nustačius senąjį `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` užklausų skaičiaus limitą) jau sukonfigūruotame procese vėl kyla nutraukimo pavojus. Mažos pokalbių užklausos, `/healthz`, `/v1/models` ir MCP į šį limitą **neįtraukiami**.

### Vienas procesas: daugiau nei dvi ilgos `/v1/responses` užklausos

**Tinkamos būklės** procesas (krūvos panaudojimas mažesnis už `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, numatytoji reikšmė `0.75`) **gali** vykdyti daugiau nei dvi vienalaikes ilgas `POST /v1/responses` užklausas, jei viso proceso vykdomų užklausų baitų biudžete (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) dar yra vietos. Užklausų turiniai, kurių dydis yra ne mažesnis nei `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (numatytoji reikšmė – 256 KiB), gauna tokį patį sunkiasvorės užklausos leidimą kaip ir sudėtingos struktūros užklausos bei naudoja tą patį [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` išimties mechanizmą (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Dešimtys vienalaikių ilgų SSE klientų (operatoriams dažnai reikia 40–50) yra **atminties biudžeto** klausimas — reikia tinkamai parinkti krūvos dydį, pagrindinių ir rezervinių vietų skaičių bei `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — o ne griežtas produkto „daugiausia 2“ apribojimas. Patirdama spaudimą krūva vis tiek atmeta užklausas su pakartotinai bandyti leidžiančiu `503`, kad nepasikartotų #7849.

Norėdami **padauginti krūvas** (nepriklausomas V8 senosios kartos atminties sritis) **šiandien**:

| Darykite                                                                                                                                                                                          | Nedarykite                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Paleiskite **N konteinerių / podų**, kiekvieną su **atskiru** `DATA_DIR` / tomu                                                                                                                   | Nenustatykite `replicas > 1`, kai naudojamas vienas SQLite failas                    |
| Sunkių vykdomų užklausų ir sveikos būklės rezervo dydį parinkite pagal krūvos / vykdomų užklausų baitų biudžetą; 1–2 yra konservatyvi #7849 numatytoji reikšmė, o ne griežtas produkto maksimumas | Neskirkite vienam procesui 8× daugiau RAM ir neriboto užklausų skaičiaus limito      |
| Pasirinktinai: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`, jei reikia **bendrų kvotų skaitiklių**                                                                                       | Nelaikykite Redis bendra SQLite saugykla — taip nėra                                 |
| Nukopijuokite teikėjų slaptuosius duomenis į kiekvieną egzempliorių (arba susitaikykite su atskiromis suvestinėmis)                                                                               | Nesitikėkite vienos suvestinės / vieno iškvietimų žurnalo visiems egzemplioriams     |
| Priekyje naudokite bet kokį apkrovos balansavimo įrenginį; pakanka susiejimo pagal API raktą arba seansą                                                                                          | Nereikalaukite konkrečiam tiekėjui skirto, į dydį atsižvelgiančio tarpinio sluoksnio |

Aparatinė įranga: vieno egzemplioriaus vienalaikių ilgų `/v1/responses` užklausų skaičius yra **atminties biudžeto** klausimas (krūva + vykdomų užklausų baitai / #10110). `N` nepriklausomų `DATA_DIR` vis tiek padaugina krūvas: pagrindinio kompiuterio RAM turi pakakti `N × cgroup`, o ne „vienam 16 Gi podui su N=8“. Niekada nenaudokite `replicas > 1` su vienu SQLite failu.

Compose pavyzdys (dvi krūvos, du tomai — ne `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

Tankesnis vykdymas viename procese (suspaudimą iškeliant iš HTTP izoliato) aprašytas [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Vienas loginis klasteris, naudojantis bendrą patvariąją būseną, aprašytas [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Svarbios pastabos

- **SQLite WAL režimas:** komandai `docker stop` reikia leisti užbaigti darbą, kad OmniRoute galėtų įrašyti naujausius pakeitimus iš kontrolinio taško atgal į `storage.sqlite`. Pridėtuose Compose failuose jau nustatytas 40 s išjungimo atidėjimo laikotarpis. Jei atvaizdą paleidžiate tiesiogiai, palikite `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Nustatykite į `true`, jei įprastos ir prieš įrašymą kuriamos atsarginės kopijos valdomos išoriškai. Esamos duomenų bazės perkėlimams vis tiek reikalinga atskira patvari saugos momentinė kopija ir masinio perkėlimo apsauga.
- **Duomenų išsaugojimas:** Visada prijunkite tomą prie `/app/data`, kad duomenų bazė, raktai ir konfigūracijos išliktų iš naujo paleidus konteinerį.
- **Prievado konfigūracija:** Pakeiskite aplinkos kintamąjį `PORT`, kad pakeistumėte numatytąjį `20128` prievadą.

## Taip pat žr.

- [VM diegimo vadovas](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare sąranka
- [Fly.io diegimo vadovas](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Diegimas į Fly.io
- [Aplinkos konfigūracija](../reference/ENVIRONMENT.md) — Išsamus `.env` žinynas
