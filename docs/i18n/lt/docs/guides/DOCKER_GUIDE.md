# 🐳 Docker Guide — OmniRoute (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Išsami „Docker“ diegimo informacija. Norėdami greitai pradėti, žr. [README „Docker“ skyrių](../README.md#-docker).

## Turinys

- [Greitas paleidimas](#quick-run)
- [Su aplinkos failu](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Galimi profiliai](#available-profiles)
- [Pagrindinio kompiuterio CLI įrankių konfigūravimas, kai „OmniRoute“ veikia „Docker“ konteineryje](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Papildomas „Redis“ konteineris](#redis-sidecar)
- [Gamybinės aplinkos „Compose“ konfigūracija](#production-compose)
- [Dockerfile etapai](#dockerfile-stages)
- [Kritiniai aplinkos kintamieji](#critical-environment-variables)
- [Docker Compose su „Caddy“ (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [„Cloudflare“ greitasis tunelis](#cloudflare-quick-tunnel)
- [Atvaizdų žymos](#image-tags)
- [Pasiekiamumas: numatytoji SQLite konfigūracija palaiko tik vieną repliką](#availability-default-sqlite-is-single-replica)
- [„Gemini“ regioninės klaidos „Docker“ konteineryje](#gemini-regional-errors-inside-docker)
- [Svarbios pastabos](#important-notes)

---

## Greitas paleidimas

> **Savarankiškas diegimas viena komanda?** Žr.
> [Savarankiško diegimo vadovą](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (paskelbtas atvaizdas +
> „Redis“, prieiga tik per grįžtamąją sąsają, nereikia rinktis profilio). Toliau pateiktas greitasis paleidimas yra
> vieno konteinerio būdas naudotojams, kurie jau naudoja „Redis“ kitur.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Su aplinkos failu

```bash
# Pirmiausia nukopijuokite ir redaguokite .env
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

# CLI profilis (integruoti Claude Code, Codex ir OpenClaw)
docker compose --profile cli up -d

# Pagrindinio kompiuterio profilis (pirmiausia skirtas Linux; prijungia pagrindinio kompiuterio CLI vykdomuosius failus tik skaitymo režimu)
docker compose --profile host up -d

# Žiniatinklio profilis (Chromium/Playwright žiniatinklio seansų teikėjams)
docker compose --profile web up -d

# CLI ir papildomo CLIProxyAPI konteinerio derinys
docker compose --profile cli --profile cliproxyapi up -d
```

## Galimi profiliai

„OmniRoute“ pateikiamas su „Compose“ profiliais, skirtais pagrindiniams diegimo variantams. Pasirinkite jūsų aplinką atitinkantį profilį.

| Profilis             | Paslauga         | Kada naudoti                                                                                                                                                                                        | Komanda                                      |
| -------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (numatytasis) | `omniroute-base` | Serveris be grafinės sąsajos / minimali vykdymo aplinka, be įtrauktų teikėjų CLI                                                                                                                    | `docker compose --profile base up -d`        |
| `cli`                | `omniroute-cli`  | Agentinės darbo eigos, iškviečiančios `omniroute providers/setup/doctor`, ir įtraukti CLI (Codex, Claude Code, Droid, OpenClaw)                                                                     | `docker compose --profile cli up -d`         |
| `host`               | `omniroute-host` | Linux pagrindiniai kompiuteriai, kuriems reikia į `network_mode` panašios prieigos prie pagrindinio kompiuterio CLI, prijungiant `~/.local/bin`, `~/.codex`, `~/.claude` ir kt. tik skaitymo režimu | `docker compose --profile host up -d`        |
| `cliproxyapi`        | `cliproxyapi`    | Paleiskite papildomą [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) konteinerį per prievadą `8317`, skirtą aukštesniojo lygmens CLI tarpiniam serveriui                                | `docker compose --profile cliproxyapi up -d` |
| `web`                | `omniroute-web`  | Žiniatinklio seansų teikėjai, kuriems reikia naršyklės: `gemini-web`, `claude-web`, `claude-turnstile` (sukuria `runner-web`, „Chromium“ įtraukta)                                                  | `docker compose --profile web up -d`         |

> Galima derinti kelis profilius: `docker compose --profile cli --profile cliproxyapi up -d`.

## Pagrindinio kompiuterio CLI įrankių konfigūravimas, kai OmniRoute veikia Docker aplinkoje

`omniroute setup-codex`, `setup-claude`, `config set <tool>` ir valdymo skydelio
mygtukas **Išsaugoti konfigūraciją** įrašo tokius failus kaip `~/.codex/*.config.toml`. Šie keliai
turi prasmę tik tame kompiuteryje, kuriame iš tikrųjų veikia CLI. Paleidus šias
komandas konteineryje, failai įrašomi į paties konteinerio namų katalogą (`/home/node` —
atvaizdas veikia kaip `USER node`), iš kurio pagrindinio kompiuterio CLI jų niekada neskaitys ir kuriame jie
bus pašalinti vos tik iš naujo sukūrus konteinerį.

OmniRoute tai aptinka ir, užuot pranešęs apie sėkmingą, bet nepanaudojamą įrašymą,
jo atsisako bei pateikia instrukcijas: CLI baigia darbą su kodu `2`, o API atsako `422`
su `containerEphemeralTarget: true`.

### Rekomenduojama: paleiskite CLI pagrindiniame kompiuteryje, o OmniRoute — Docker aplinkoje

Konteineris teikia API; CLI konfigūruoja jūsų pagrindinio kompiuterio įrankius.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # nukreipkite CLI į konteinerį
omniroute setup-codex                      # įrašo tikrąjį ~/.codex jūsų pagrindiniame kompiuteryje
```

Tai tinkamas pasirinkimas, kai Codex, Claude Code, Cursor ar panašūs įrankiai veikia jūsų
nešiojamajame kompiuteryje — tai yra įprasta sąranka.

### Alternatyva: prijunkite pagrindinio kompiuterio konfigūracijos katalogus kaip susietuosius prijungimus (`host` profilis)

Jei norite, kad pats konteineris rašytų į jūsų pagrindinio kompiuterio konfigūraciją, prijunkite
katalogus ir nustatykite `CLI_CONFIG_HOME` į prijungimo šakninį katalogą. `host` profilis
jau tai atlieka:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Susietasis prijungimas užtikrina kelio patikimumą: OmniRoute skaito
`/proc/self/mountinfo` ir leidžia rašyti į prijungtus kelius (taip pat į katalogus,
kurių antriniai katalogai yra prijungimo taškai — būtent tokia yra pirmiau pateikta `/host-home` struktūra), tačiau
toliau atsisako rašyti į neprijungtus kelius.

### Avarinė išimtis: konfigūruokite paties konteinerio CLI (naudokite taupiai)

Kai CLI iš tiesų yra konteinerio viduje (`cli` profilis), toks įrašymas
yra tyčinis. Bet kuriai `setup-*` komandai perduokite `--allow-container-write` arba serveryje nustatykite
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. Įrašymas bus atliktas
pateikus įspėjimą, kad duomenys neišliks atkūrus konteinerį.

> **Saugumo įspėjimas — `cli` profilis ir `docker.sock` prijungimas.**
> `cli` profilis kaip susietąjį prijungimą prijungia `/var/run/docker.sock`, kad konteineryje veikianti
> automatinio naujinimo priemonė galėtų iš naujo sukurti rinkinį naudodama pagrindinio kompiuterio demoną
> (`src/lib/system/autoUpdate.ts` tikrina šio lizdo buvimą ir praleidžia
> Docker kelią, kai jo nėra). Šis lizdas yra **pagrindinio kompiuterio root lygio pasitikėjimo
> riba**: viskas, kas gali jį pasiekti, valdo pagrindinio kompiuterio Docker demoną kaip
> root — gali kurti, tikrinti, stabdyti ir šalinti bet kurį pagrindinio kompiuterio konteinerį.
> Pasekmės:
>
> 1. **Niekada neatverkite `cli` profilio prievado tinklui.** Publikuokite
>    jį adresu `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN tinkle pasiekiamas `cli` profilis bet kokį valdymo skydelio lygmens RCE paverčia
>    visišku pagrindinio kompiuterio perėmimu.
> 2. **Neprijunkite jokių papildomų pagrindinio kompiuterio katalogų prie `cli` profilio.**
>    Docker lizdas kartu su bet kokiu papildomu prijungimu suteikia konteineriui visišką
>    jūsų failų sistemos ir pagrindinio kompiuterio konfigūracijos skaitymo bei rašymo prieigą. Jei įrankiui reikia
>    matyti projektą, paleiskite jį lokaliai naudodami CLI dvejetainį failą — neprijunkite jo
>    prie `cli` konteinerio.
>
> Jei automatinis naujinimas konteineryje nereikalingas, neįjunkite `cli` profilio
> (`COMPOSE_PROFILES=core,redis` arba trumpesnio varianto). Kiti profiliai
> neprijungia Docker lizdo.
>
> Susijusį MITM grėsmių modelį žr. `docs/security/MITM-TPROXY-DECRYPT.md` (git; nekompiliuojamas į `/docs`),
> o `codex`/`claude-code`/`droid`/`openclaw` dvejetainių failų kilmės grandinę —
> `docs/security/SUPPLY_CHAIN.md`.

## Redis pagalbinis konteineris

OmniRoute naudoja Redis paskirstytojo užklausų dažnio ribotuvo ir bendrinamos talpyklos veikimui užtikrinti. `redis` paslauga yra **visada apibrėžta** faile `docker-compose.yml` (jai netaikomas joks profilio apribojimas) ir paleidžiama kartu su bet kuriuo kitu profiliu.

| Informacija                                           | Reikšmė                                              |
| ----------------------------------------------------- | ---------------------------------------------------- |
| Atvaizdas                                             | `redis:7-alpine`                                     |
| Konteinerio pavadinimas                               | `omniroute-redis`                                    |
| Vidinis prievadas                                     | `6379`                                               |
| Pagrindinio kompiuterio prievadas (keičiamas)         | `REDIS_PORT` (numatytoji reikšmė – `6379`)           |
| Pagrindinio kompiuterio susiejimo adresas (keičiamas) | `REDIS_BIND_HOST` (numatytoji reikšmė – `127.0.0.1`) |
| Tomas                                                 | `omniroute-redis-data` → `/data`                     |
| Veikimo patikra                                       | `redis-cli ping` (10 s intervalas)                   |

Susiję aplinkos kintamieji:

- `REDIS_URL` — į programą įterpiama ryšio eilutė (numatytoji reikšmė – `redis://redis:6379`).
- `REDIS_PORT` — pagrindinio kompiuterio pusės prievado susiejimas su Redis konteineriu.
- `REDIS_BIND_HOST` — pagrindinio kompiuterio sąsaja, kurioje publikuojamas prievadas. Numatytoji reikšmė – `127.0.0.1`.

> **Kodėl pagal numatytuosius nustatymus naudojama grįžtamojo ryšio sąsaja:** pagalbinis konteineris veikia be `requirepass`, o programos
> konteineriai jį pasiekia per compose tinklą (`redis:6379`) — publikuotas prievadas
> skirtas tik pagrindinio kompiuterio įrankiams (`redis-cli`, vietiniam `npm run dev`). Publikavus jį adresu
> `0.0.0.0`, autentifikavimo nereikalaujantis Redis būtų pasiekiamas kiekvienam jūsų LAN kompiuteriui. Jei nustatote
> `REDIS_BIND_HOST=0.0.0.0`, į paslaugos `command:` taip pat pridėkite `--requirepass`.

**Išjungti Redis** nerekomenduojama (užklausų dažnio ribotuvas pereis prie mažiau funkcionalaus atmintyje veikiančio atsarginio mechanizmo). Jei tai būtina, pašalinkite arba užkomentuokite `redis:` paslaugos bloką faile `docker-compose.yml`, arba sumažinkite jos egzempliorių skaičių iki nulio:

```bash
docker compose up -d --scale redis=0
```

## Produkcinė Compose konfigūracija

Norėdami lygiagrečiai su kūrimo aplinka paleisti izoliuotą produkcinės aplinkos momentinę kopiją, naudokite `docker-compose.prod.yml`.

| Informacija                            | Reikšmė                                                                              |
| -------------------------------------- | ------------------------------------------------------------------------------------ |
| Failas                                 | `docker-compose.prod.yml`                                                            |
| Numatytasis valdymo skydelio prievadas | `PROD_DASHBOARD_PORT=20130` (susietas su vidiniu `${DASHBOARD_PORT:-20128}`)         |
| Numatytasis API prievadas              | `PROD_API_PORT=20131`                                                                |
| Atvaizdas                              | `omniroute:prod` (sukurtas iš `runner-cli` tarpinio kūrimo etapo)                    |
| Redis konteineris                      | `omniroute-redis-prod` (`redis:8.6.2`, atskiras `redis-prod-data` tomas)             |
| Duomenų tomas                          | `omniroute-prod-data` (vardinis, išlaikomas tarp pakartotinių kūrimų)                |
| Veikimo patikros                       | `node healthcheck.mjs` + `redis-cli ping`, o `depends_on` priklauso nuo Redis būklės |

Kaip naudoti:

```bash
# Sukurti ir paleisti produkcinį rinkinį
docker compose -f docker-compose.prod.yml up -d --build

# Nuolat rodyti žurnalus
docker compose -f docker-compose.prod.yml logs -f

# Sustabdyti ir pašalinti (išsaugant tomus)
docker compose -f docker-compose.prod.yml down
```

Produkcinis rinkinys veikia lygiagrečiai su kūrimo compose aplinka (naudojami skirtingi konteinerių pavadinimai, prievadai ir tomai), todėl galite toliau vykdyti vietinį kūrimą, kol produkcinė aplinka lieka paleista.

## Dockerfile etapai

Saugykloje pateikiamas kelių etapų Dockerfile (`Dockerfile`). Galimi keturi etapai; pasirinkite jūsų naudojimo atvejui tinkamą `target`.

| Etapas        | Bazinis atvaizdas     | Paskirtis                                                                                                                                                                                                                                                                                                       |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Įdiegia priklausomybes (`npm ci --legacy-peer-deps`) ir paleidžia `npm run build` (pagal numatytąją nuostatą naudojamas Turbopack — žr. toliau pateiktą skiltį „Kompiliavimo ištekliai“)                                                                                                                        |
| `runner-base` | `node:26-trixie-slim` | Produkcinė vykdymo aplinka su autonomine Next.js išvestimi. **Teikėjų CLI neįtrauktos.**                                                                                                                                                                                                                        |
| `runner-cli`  | `runner-base`         | Prideda `git`, `docker.io`, `docker-compose` ir visuotines CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Rinkitės šį etapą agentinėms darbo eigoms.**                                                                                                                               |
| `runner-web`  | `runner-base`         | Prideda Playwright ir Chromium naršyklę (`--with-deps`), skirtą žiniatinklio sesijų teikėjams: `gemini-web`, `claude-web`, `claude-turnstile`. **Rinkitės šį etapą, kai naudojate šiuos teikėjus** — be jo įprastas atvaizdas pateikiant užklausą neveiks (žr. pastabą apie `-web` skiltyje „Leidimų kanalai“). |

Konkrečiam tiksliniam etapui sukompiliuoti rankiniu būdu:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Kompiliavimo ištekliai

Trys kompiliavimo argumentai valdo `builder` etapo išteklių sąnaudas. Jie taikomi tik kompiliavimo metu —
`OMNIROUTE_MEMORY_MB` (toliau) yra atskiras vykdymo aplinkos nustatymas.

| Kompiliavimo argumentas     | Numatytoji reikšmė | Poveikis                                                                                                    |
| --------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`                | `0` kompiliuoja naudojant webpack: mažesnė didžiausia atminties sąnauda, bet lėčiau. `1` įjungia Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`             | V8 krūvos riba (`--max-old-space-size`) paleidžiamam `next build`.                                          |
| `OMNIROUTE_BUILD_WORKERS`   | `2`                | Nustato `CIRCLE_NODE_TOTAL`; Next apskaičiuoja `workers = N - 1` puslapių duomenims rinkti.                 |

`OMNIROUTE_BUILD_WORKERS` reikėtų didinti galingame kompiliavimo serveryje ir pirmiausia
tikrinti, kai ribotų išteklių aplinkoje kompiliavimas nutrūksta **po** pranešimo `✓ Compiled successfully`. Kiekvienas
puslapių duomenų darbinis procesas yra atskiras, kaip ir pats pagrindinis `next build` procesas;
bandymas veikiančiame VPS serveryje (problema #7518) parodė, kad kiekvieno proceso didžiausias RSS siekė
~4,5 GB, nepriklausomai nuo `NODE_OPTIONS` krūvos parametro (Turbopack kompiliuoja
naudodamas savąją / Rust atmintį už V8 krūvos ribų). Numatytoji reikšmė `2` (→ 1 darbinis procesas, iš viso 2
procesai) pritaikyta 16 GB / 4 vCPU GitHub teikiamiems vykdytojams, kuriuos
naudoja publikavimo konvejeris. Nustačius `8` (→ 7 darbiniai procesai), tam vykdytojui pritrūko atminties ir
buildkit nutraukė veiksmą pateikdamas `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 darbiniai procesai) vis dar netilpo, kai kiekvieno proceso RSS buvo išmatuotas
tiesiogiai, o ne nustatytas netiesiogiai. `tests/unit/docker-build-memory-budget.test.ts`
atlieka skaičiavimus pagal išmatuotą reikšmę ir pateikia klaidą, jei kuris nors nustatymas
viršija vykdytojo galimybes.

Turbopack kompiliuoja naudodamas savąją Rust atmintį, esančią **už** V8 krūvos ribų, todėl
`OMNIROUTE_BUILD_MEMORY_MB` jos neriboja. Pagrindiniame kompiuteryje su nustatyta atminties riba
OOM nutraukiklis kompiliavimo procesui išsiunčia SIGKILL be jokio klaidos teksto — jis tiesiog
sustoja vykdant `Creating an optimized production build`, todėl tai labiau primena užstrigimą,
o ne atminties trūkumą. Dėl šios priežasties `Dockerfile` pagal numatytąją nuostatą naudoja webpack
(`OMNIROUTE_USE_TURBOPACK=0`), kitaip nei `npm run dev` / `npm run build`, kur
Turbopack yra numatytasis kode: paprastas `docker build .` be kompiliavimo argumentų (tokį
paleidžia Railway ir kitos vieno spustelėjimo prieglobos paslaugos) negali tyliai nutrūkti
kompiliavimo aplinkoje su apribota atmintimi. Publikuojamiems atvaizdams faile `docker-publish.yml`
jau aiškiai perduodamas `OMNIROUTE_USE_TURBOPACK=0`. Jei kompiliavimo serveryje yra daug RAM,
įjunkite Turbopack, kad kompiliavimas būtų spartesnis:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` yra įjungtas, todėl `next build` paleidžia pagrindinį **ir** darbinį
procesą, o kiekvienas jų atskirai paiso `OMNIROUTE_BUILD_MEMORY_MB`. Konteinerio
atminties ribą nustatykite maždaug dvigubai didesnę už šią reikšmę, o ne jai lygią.

Išmatuota šiame medyje (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Pakavimo įrankis | Konteinerio riba | Rezultatas                                        |
| ---------------- | ---------------- | ------------------------------------------------- |
| Turbopack        | 8 GiB / 16 GiB   | Abiem atvejais tyliai nutraukta dėl OOM           |
| webpack          | 8 GiB            | Darbiniam kompiliavimo procesui išsiųstas SIGKILL |
| webpack          | 12 GiB           | Pavyko, didžiausia sąnauda siekė 11,1 GiB         |

### Vykdymo aplinkos numatytosios reikšmės

`runner-base` eksportuojamos numatytosios reikšmės: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Atminties veikimas Docker aplinkoje:

- Atvaizde nustatoma `OMNIROUTE_MEMORY_MB=1024`, o iš jos išvedama `NODE_OPTIONS=--max-old-space-size=1024`.
- Faktinį serverio procesą paleidžia autonominė paleidyklė, kuri nuskaito `OMNIROUTE_MEMORY_MB` ir prideda `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node naudoja paskutinę pasikartojančią `--max-old-space-size` reikšmę, todėl `OMNIROUTE_MEMORY_MB` nustato faktinį Docker krūvos atminties limitą.
- Kadangi atvaizde ši reikšmė visada nustatoma, paleidyklės atsarginė parinktis, apskaičiuojama pagal RAM kiekį, naudojant Docker niekada netaikoma. Aiškiai padidinkite ją pagal darbo krūvį (žr. lentelę toliau). `2048` vis tiek yra per mažai kodavimo agentų `/v1/responses` užklausoms.

### Vykdymo aplinkos RAM kodavimo agentams

Numatytoji 1 GiB Docker reikšmė yra minimali riba valdymo skydeliui ir nesudėtingiems pokalbiams, o ne produkcinės aplinkos dydis. Ilgi `POST /v1/responses` turiniai (šimtai pranešimų, dešimtys įrankių) glaudinimo metu atmintyje išlaiko kelis grafus. Dėl dviejų persidengiančių ~3 MiB / ~750k žetonų užklausų V8 veikimas nutrūko esant **12 GiB** senosios kartos atminčiai (`FATAL ERROR: Reached heap limit`), taip pat buvo pasiektas 16 GiB cgroup OOM limitas. Žr. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Nustatykite **cgroup `--memory` didesnę nei krūvos atmintis** — vietiniai buferiai, SQLite ir tarpiniai glaudinimo duomenys saugomi už V8 ribų.

| Darbo krūvis                                    | `OMNIROUTE_MEMORY_MB`                | Konteineris / cgroup                        | Pastabos                                                                                                                                       |
| ----------------------------------------------- | ------------------------------------ | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Valdymo skydelis, vienas nesudėtingas pokalbis  | `1024` (numatytoji atvaizdo reikšmė) | ≥2 GiB                                      |                                                                                                                                                |
| Vienas kodavimo agentas (Claude/Codex/Grok)     | `8192`                               | ≥10 GiB                                     | Tipinė vieno seanso `/v1/responses` užklausa                                                                                                   |
| Dvi vienalaikės ilgos `/v1/responses` užklausos | `10240`–`12288`                      | ≥12–16 GiB                                  | Užfiksuotas V8 veikimo nutrūkimas esant ~12 GiB krūvos atminčiai                                                                               |
| Trys ar daugiau vienalaikių ilgų kontekstų      | nenaudokite viename procese          | vykdykite nuosekliai / skirkite daugiau RAM | Pagal numatytuosius nustatymus vienu metu leidžiama 1 intensyvi vykdoma užklausa; padidinus šį skaičių be papildomos RAM, veikimas vėl nutrūks |

`omniroute serve`, vykdoma tiesiogiai operacinėje sistemoje, apskaičiuoja ~35% RAM (apribojant iki `[512, 4096]`), kai `OMNIROUTE_MEMORY_MB` yra **nenustatyta**. Docker visada nustato `1024`, todėl oficialiame atvaizde šis apskaičiavimas niekada nevykdomas.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritiniai aplinkos kintamieji

Be numatytųjų reikšmių, aprašytų [ENVIRONMENT.md](../reference/ENVIRONMENT.md), naudojant Docker svarbiausi yra šie kintamieji:

| Kintamasis                    | Paskirtis                                                                                                                                                                                                                                                                                                                                         | Numatytoji reikšmė                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Bendra WebSocket tilto paslaptis. **Būtina gamybinėje aplinkoje** — nustatykite sudėtingą atsitiktinę eilutę.                                                                                                                                                                                                                                     | nenustatyta (būtina pateikti)        |
| `REDIS_URL`                   | Prisijungimo eilutė, skirta užklausų dažnio ribotuvo / podėlio vidinei sistemai                                                                                                                                                                                                                                                                   | `redis://redis:6379`                 |
| `REDIS_PORT`                  | Pagrindinio kompiuterio prievadas, skirtas įtrauktam Redis konteineriui                                                                                                                                                                                                                                                                           | `6379`                               |
| `REDIS_BIND_HOST`             | Pagrindinio kompiuterio sąsaja, kurioje publikuojamas įtraukto Redis konteinerio prievadas (grįžtamojo ryšio sąsaja, nebent pridėsite AUTH)                                                                                                                                                                                                       | `127.0.0.1`                          |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Pagrindinio kompiuterio kelias, prijungiamas prie `cli` profilio kaip `/workspace/omniroute`, skirtas savaiminio atnaujinimo darbo eigoms                                                                                                                                                                                                         | `.` (dabartinis katalogas)           |
| `OMNIROUTE_MEMORY_MB`         | Vykdymo metu taikoma Node kaupui skirta riba Docker autonominiame serveryje; pakeičia pirmiau nurodytą numatytąją atvaizdo reikšmę. Programavimo agentams: `8192`+ (žr. [vykdymo aplinkos RAM](#runtime-ram-for-coding-agents)).                                                                                                                  | `1024`                               |
| `DASHBOARD_PORT` / `API_PORT` | Pakeičia išorinius prievadus, skirtus valdymo skydeliui (20128) ir API (20129)                                                                                                                                                                                                                                                                    | `20128` / `20129`                    |
| `APP_BIND_HOST`               | Pagrindinio kompiuterio sąsaja, kurioje docker-compose publikuoja valdymo skydelio / API / tiesioginio WS prievadus. Kai `REQUIRE_API_KEY=false` (numatytoji reikšmė), `0.0.0.0` atveria anoniminį `/v1` tarpinį serverį LAN tinklui — išplėskite prieigą tik nustatę `REQUIRE_API_KEY=true` arba priešais naudodami atvirkštinį tarpinį serverį. | `127.0.0.1`                          |
| `CLIPROXY_BIND_HOST`          | Pagrindinio kompiuterio sąsaja, kurioje docker-compose publikuoja `cliproxyapi` pagalbinį konteinerį — jo duomenų tome saugomi teikėjo prisijungimo duomenys.                                                                                                                                                                                     | `127.0.0.1`                          |
| `OMNIROUTE_PLUGINS_DIR`       | Katalogas, kurį vykdymo aplinkos papildinių skaitytuvas nuskaito ir į kurį diegia papildinius. Nustatykite jį, kai papildiniai prijungiami susiejant katalogus: numatytoji reikšmė priklauso nuo `HOME`, kurio atvaizdas neprivalo eksportuoti.                                                                                                   | `~/.omniroute/plugins`               |
| `OMNIROUTE_BASE_PATH`         | URL pokelis, kai programa publikuojama už atvirkštinio tarpinio serverio (pvz., `/omniroute`)                                                                                                                                                                                                                                                     | _(tuščia reikšmė = šakninis kelias)_ |
| `NEXT_PUBLIC_BASE_URL`        | Viešoji naršyklės šaltinio kilmė, įskaitant pokelį (pvz., `https://host/omniroute`)                                                                                                                                                                                                                                                               | nenustatyta                          |
| `PROD_DASHBOARD_PORT`         | Pagrindinio kompiuterio valdymo skydelio prievadas, skirtas `docker-compose.prod.yml`                                                                                                                                                                                                                                                             | `20130`                              |
| `CLIPROXYAPI_PORT`            | Pagrindinio kompiuterio prievadas, skirtas `cliproxyapi` pagalbiniam konteineriui                                                                                                                                                                                                                                                                 | `8317`                               |

## Atvirkštinis tarpinis serveris pokelyje (Traefik / nginx)

Next.js `basePath` sukompiliuojamas į autonominį paketą. OmniRoute įrašo nustatytą
reikšmę kontroliniame faile programos šakniniame kataloge (įrašoma vykdant `npm run build`;
nuskaitoma naudojant `scripts/docker/ensure-docker-base-path.mjs`) ir, paleidžiant
konteinerį, palygina ją su `OMNIROUTE_BASE_PATH`. Kai reikšmės skiriasi, o atvaizdas
buvo sukurtas domeno šakniniam keliui, pradinis procesas perrašo autonominius manifestus,
įterptinius `basePath`/`assetPrefix` literalus (Next 16 generuoja SSR išteklių URL
naudodamas tik `assetPrefix` — pataisymo priemonė į jį taip pat įrašo pokelį), nustatytus
`/_next/static` išteklių URL (kliento nuorodų manifestuose, medijos importuose, iš anksto
sugeneruotuose klaidų puslapiuose) ir kliento `process.env` pakaitalą prieš paleidžiant
`node dev/run-standalone.mjs`.

### Kūrimas naudojant Compose (rekomenduojama)

Nustatykite abu kintamuosius faile `.env`, tada sukurkite atvaizdą iš naujo, kad jo ir
vykdymo aplinkos reikšmės sutaptų:

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

### Iš anksto sukurtas šakninio kelio atvaizdas + vykdymo aplinkos pokelis

Publikuojami `diegosouzapw/omniroute:*` atvaizdai yra sukurti domeno šakniniam keliui.
Vis tiek galite nustatyti `OMNIROUTE_BASE_PATH` vykdymo metu; paleidžiamas konteineris
vieną kartą pataisys paketą. Kartu nurodykite atitinkančią viešąją kilmę:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Sukonfigūruokite atvirkštinį tarpinį serverį taip, kad jis persiųstų **visą** išorinį
kelią (nepašalinkite priešdėlio). Traefik turi nukreipti `PathPrefix(`/omniroute`)` į
konteinerį be `StripPrefix`, kad Next.js gautų `/omniroute/...` ir pateiktų išteklius iš
`/omniroute/_next/...`.

Docker būklės patikra tikrina lengvasvorį gyvavimo ciklo galinį tašką `/healthz`, prieš
kurį pridedama aktyvi `OMNIROUTE_BASE_PATH` reikšmė. `/api/monitoring/health` lieka
pasiekiamas žmonėms ir diagnostikos skydeliams; norėdami, kad konteinerio HEALTHCHECK
vėl tikrintų šį adresą (pavyzdžiui, išsamiai būklės kontrolei), nustatykite
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Šis kelias atlieka **išsamią**
patikrą (DB + stebėsenos suvestinė) — ji tinka retai vykdomai Docker `HEALTHCHECK`,
jei nuspręsite ją vėl įjungti, tačiau **netinka** Kubernetes `livenessProbe`
intervalams.

Orkestravimo sistemoms (Kubernetes, Nomad ir kt.):

| Patikra          | Rekomenduojama                                                                  | Vengtina                                                                    |
| ---------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Gyvybingumo      | HTTP `GET /livez` arba TCP pagrindiniame prievade (`PORT`, numatytasis `20128`) | Naudoti `/api/monitoring/health` gyvybingumui tikrinti                      |
| Parengties       | HTTP `GET /healthz`                                                             | Trumpi skirtieji laikai, dėl kurių užimta įvykių kilpa laikoma neveikiančia |
| Išsami / išorinė | `/api/monitoring/health`                                                        | —                                                                           |

`/healthz` praneša apie proceso gyvavimo ciklą (`ok` / `starting` / `stopping`).
`/livez` tik patvirtina, kad procesas veikia (grąžinama 200, kai tik gali būti įvykdyta
apdorojimo funkcija; parengties nelaukiama). Abu vis tiek veikia toje pačioje Node
įvykių kilpoje kaip ir užklausų apdorojimas, todėl intensyviai CPU naudojantys katalogo
ar glaudinimo darbai gali juos užlaikyti — užimtas ≠ neveikiantis. Jei baigiasi HTTP
patikrų skirtasis laikas, gyvybingumą geriau tikrinti per TCP. Išsamios patikrų gairės:
[Stebėsenos vadovas — Kubernetes patikrų rekomendacijos](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose su Caddy (automatinis HTTPS TLS)

OmniRoute galima saugiai viešai pasiekti naudojant Caddy automatinį SSL parengimą. Įsitikinkite, kad jūsų domeno DNS A įrašas nukreiptas į jūsų serverio IP adresą.

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
      # Naršyklei skirta pradinė svetainė, naudojama OAuth atgaliniams iškvietimams, valdymo skydelio nuorodoms ir sugeneruotiems viešiesiems URL.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Vidinis serverių tarpusavio URL, skirtas suplanuotoms užduotims ir užklausoms į save.
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
`NEXT_PUBLIC_BASE_URL` kaip kanoninę viešąją pradinę svetainę OAuth atgaliniams iškvietimams ir sugeneruotoms viešosioms
nuorodoms; autentifikuotoms valdymo skydelio rašymo operacijoms naudojamos tos pačios kilmės užklausos ir su seansu susieta CSRF
apsauga. `OMNIROUTE_TRUST_PROXY` įjunkite tik sudėtingesniuose diegimuose, kuriuose sąmoningai
norite, kad OmniRoute nustatytų viešąją pradinę svetainę pagal patikimas persiųstas antraštes, o ne pagal aiškią
konfigūraciją.

## Cloudflare spartusis tunelis

Docker diegimų valdymo skydelyje, puslapyje `Dashboard → Endpoints`, palaikomas vienu spustelėjimu įjungiamas **Cloudflare spartusis tunelis**. Pirmą kartą įjungus `cloudflared` atsisiunčiamas tik tada, kai jo reikia, paleidžiamas laikinas tunelis į dabartinį `/v1` galinį tašką, o sugeneruotas `https://*.trycloudflare.com/v1` URL rodomas tiesiai po įprastu viešuoju URL.

Galinių taškų tunelių skydelius (Cloudflare, Tailscale, ngrok) galima rodyti arba slėpti skiltyje `Settings → Appearance`, nekeičiant aktyvaus tunelio būsenos.

### Pastabos apie tunelį

- Sparčiųjų tunelių URL yra laikini ir pasikeičia po kiekvieno paleidimo iš naujo.
- Po OmniRoute arba konteinerio paleidimo iš naujo spartieji tuneliai automatiškai neatkuriami. Kai reikia, iš naujo įjunkite juos valdymo skydelyje.
- Valdomas diegimas šiuo metu palaikomas Linux, macOS ir Windows sistemose su `x64` / `arm64`.
- Valdomi spartieji tuneliai pagal numatytuosius nustatymus naudoja HTTP/2 perdavimo protokolą, kad ribotų išteklių konteinerių aplinkose būtų išvengta triukšmingų QUIC UDP buferio įspėjimų. Jei norite naudoti kitą perdavimo protokolą, nustatykite `CLOUDFLARED_PROTOCOL=quic` arba `auto`.
- Docker atvaizduose yra sistemos šakniniai CA sertifikatai, kurie perduodami valdomam `cloudflared`, taip išvengiant TLS pasitikėjimo klaidų, kai tunelis inicijuojamas konteineryje.
- Jei norite, kad OmniRoute naudotų esamą vykdomąjį failą, užuot jį atsisiuntusi, nustatykite `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`.

## Atvaizdų žymos

| Atvaizdas                | Žyma     | Dydis  | Aprašas                                                        |
| ------------------------ | -------- | ------ | -------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Naujausia **paskelbta** stabili SemVer versija (ne git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps atveju prisekite šios klasės žymą                       |

Kelių platformų manifestas: vietiniai `linux/amd64` ir `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automatiškai parenka tinkamą architektūrą; jei ARM pagrindiniuose kompiuteriuose reikia priverstinai naudoti AMD64 emuliaciją, perduokite `--platform linux/amd64`.

### Leidimų kanalai

OmniRoute skelbia atskirus Docker kanalus stabiliems leidimams, aktyvios leidimo šakos testavimui ir kūrimo versijoms.

| Kanalas                         | Šaltinis                               | Kintamumas                          | Rekomenduojamas naudojimas                                                                                          |
| ------------------------------- | -------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Pasirašytas / versijuotas leidimas     | Nekintamas                          | Produkciniai diegimai, kuriuose prisegamas konkretus leidimas                                                       |
| `:latest` / `:latest-web`       | Naujausia **paskelbta** stabili SemVer | Kintama stabilios versijos nuoroda  | Seka stabilius leidimus **po** SemVer paskelbimo užduoties — **neseka** `main` ar neišleistų `release/v*` pakeitimų |
| `:next` / `:next-web`           | Dabartinė numatytoji `release/v*` šaka | Kintama išankstinio leidimo nuoroda | Pataisų, jau įtrauktų į aktyvią leidimo šaką, bet dar nepatekusių į stabilų leidimą, testavimas                     |
| `:main` / `:main-web`           | `main` šaka                            | Kintama kūrimo versijos nuoroda     | Tik kūrimo ir integravimo testavimui                                                                                |

#### Žiniatinklio seansų teikėjai: `-web` atvaizdai

Kiekvienas pirmiau nurodytas kanalas taip pat turi `-web` žymą (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), sukurtą iš `runner-web` etapo — tai tas pats atvaizdas, papildytas Playwright ir Chromium naršykle. Įprastas atvaizdas pateikiamas **be** Chromium; jos reikia `gemini-web`, `claude-web` ir `claude-turnstile`.

Klaida įvyksta ne paleidimo metu, o vėliau: šie teikėjai pateikia savo modelių sąrašus ir valdymo skydelyje rodomi kaip prijungti, o tik pirmoji užklausa baigiasi klaida

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Jei naudojate šiuos teikėjus, atsisiųskite šiuo metu naudojamo kanalo `-web` žymą — daugiau niekas nesikeičia. Diegiant per npm / CLI (be Docker atvaizdo), trūkstamas lygiavertis komponentas yra naršyklės vykdomasis failas: pagrindiniame kompiuteryje paleiskite `npx playwright install chromium`.

#### Išankstinio leidimo kanalo naudojimas

`next` kanalas iš naujo sukuriamas po kiekvieno pakeitimų išsiuntimo į dabartinę numatytąją `release/v*` šaką ir publikuojamas tiek AMD64, tiek ARM64 architektūroms. Senesnės priežiūros šakos negali jo perrašyti. Šis kanalas suteikia atsisiunčiamą atvaizdą su pataisymais, kurie buvo sulieti į aktyvią leidimo šaką prieš sukuriant kitą stabilią žymą.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Naudodami „Docker Compose“, pakeiskite pasirinkto profilio naudojamą atvaizdo žymą, tada atsisiųskite atvaizdą ir iš naujo sukurkite paslaugą:

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

`next` yra kintantis išankstinio leidimo kanalas. Jis gali pasikeisti po kiekvieno pakeitimų išsiuntimo į aktyvią leidimo šaką ir **nėra palaikomas naudoti gamybinėje aplinkoje**. Vertindami konkretų rinkinį, užfiksuokite atvaizdo maišos reikšmę:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Prieš testuodami sukurkite atsarginę „OmniRoute“ duomenų tomo arba susieto duomenų katalogo kopiją. Norėdami grįžti prie ankstesnės versijos, atkurkite anksčiau naudotą stabilią versiją arba maišos reikšmę ir iš naujo sukurkite konteinerį:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Leidimo šakos rinkinys niekada negali pakeisti `latest`; stabilią nuorodą gali atnaujinti tik tinkama stabili semantinė versija. `next` atvaizdams taikoma leidimo atvaizdo patikra ir blokuojanti KRITINIO pažeidžiamumo patikra.

**`latest` negarantuoja „git“ aktualumo.** Į `main` arba aktyvią `release/v*` šaką sulietų pataisymų **nėra** `:latest`, kol nepublikuojamas stabilios SemVer versijos atvaizdas ir publikavimo užduotis neatnaujina `:latest` (ta pati maišos reikšmė kaip tos SemVer versijos). Jei atrodo, kad `latest` neatsinaujina, nors „GitHub“ pataisą jau rodo, atsisiųskite `:next`, kad išbandytumėte leidimo šaką, arba palaukite SemVer žymos.

| Ko norite                                                                                          | Ką naudoti                                  |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| „GitOps“ / gamybinė aplinka, kuri neturi netikėtai keistis                                         | Užfiksuokite `:X.Y.Z` (arba atvaizdo maišą) |
| Naudoti publikuotas stabilias versijas ir sutikti iš naujo sukurti konteinerį po kiekvieno leidimo | `:latest`                                   |
| Testuoti dar neišleistus `release/v*` pakeitimus                                                   | `:next` (ne gamybinei aplinkai)             |
| Testuoti `main`                                                                                    | `:main` (ne gamybinei aplinkai)             |

## Pasiekiamumas: numatytasis SQLite palaiko vieną repliką

Standartinė Docker / Kubernetes OmniRoute konfigūracija yra **vienas Node procesas + vienas SQLite rašantysis procesas**. Tokioje topologijoje didelis pasiekiamumas **nepalaikomas**.

| Apribojimas                                                | Pasekmė                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vienas rašantysis procesas                                 | **Neleiskite** kelioms replikoms naudoti to paties SQLite failo. Tai sugadina DB.                                                                                                                                                                                                                                                                                    |
| Perkūrimas / paleidimas iš naujo / HEALTHCHECK nutraukimas | **Visiškas vykdomų SSE srautų, valdymo skydelio seansų ir atmintyje laikomos būsenos veikimo sutrikimas**. Visi prijungti klientai atjungiami. Naujos užklausos laikotarpiu, kai nėra galinių taškų, iš atvirkštinio tarpinio serverio gauna **`502 Bad Gateway: Unknown error`**, o ne OmniRoute JSON — klientai negali to atskirti nuo teikėjo sutrikimo (#11015). |
| Ta pati įvykių kilpa kaip `/healthz`                       | Užimtas katalogo arba glaudinimo ciklas gali uždelsti patikras; dėl trumpo skirtojo laiko tada iš naujo paleidžiama **vienintelė** replika.                                                                                                                                                                                                                          |

**Patikrų matrica** (taip pat žr. [Kubernetes patikrų rekomendacijas](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Patikra          | Tikslas                                                                            | Nenaudokite                                                         |
| ---------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Gyvybingumo      | TCP per `PORT` (numatytoji reikšmė `20128`) arba negriežta HTTP `/healthz` patikra | `/api/monitoring/health`                                            |
| Parengties       | HTTP `GET /healthz`                                                                | Trumpų skirtųjų laikų, kai užimta įvykių kilpa laikoma neveikiančia |
| Išsami / žmonėms | `/api/monitoring/health`                                                           | Automatinei kubelet gyvybingumo patikrai                            |

**Atnaujinimai:** tikėkitės, kad visi seansai bus nutraukti. Jei galite, užbaikite klientų aptarnavimą; naudojant numatytąjį SQLite laipsniškas atnaujinimas negalimas. Compose `restart: unless-stopped` kartu su Docker `HEALTHCHECK` taip pat pakeis vienintelį procesą, kai konteinerio būsena taps Unhealthy — poveikio mastas bus toks pats.

Kubernetes fragmentas, skirtas **vienai replikai** (Recreate yra privalomas; nedidinkite `replicas`, kai naudojamas vienas SQLite failas):

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

`preStop` pauzė leidžia kube pašalinti Service galinius taškus prieš SIGTERM, kad **naujas** srautas nebebūtų siunčiamas į stabdomą procesą. Vykdomi `/v1/responses` SSE srautai užbaigiami per laikotarpį iki `SHUTDOWN_TIMEOUT_MS` (numatytoji reikšmė – 30 s), naudojant sunkiasvores priėmimo nuomas (#11015). Naujos užklausos, kurios vis tiek pasiekia procesą, gauna `503` + `Retry-After: 5`. Recreate tarpas be galinių taškų, trunkantis, kol pakaitinis procesas tampa Ready, vis tiek reiškia visišką veikimo sutrikimą — tai SQLite topologijos savybė, o ne netinkama patikrų konfigūracija.

Išorinis Postgres / kelių rašančiųjų procesų HA **nėra** dokumentuotas standartinis naudojimo būdas. Jei jums reikia HA, naudokite vieną repliką arba atskirai projekto išbandytą ir dokumentuotą topologiją. Postgres/MySQL darbai vykdomi [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Kol tai nebus išleista, vienintelis palaikomas būdas padidinti **didelių** `/v1/responses` užklausų apdorojimo pajėgumą yra N nepriklausomų procesų (žr. kitą skyrių), o ne `replicas > 1` viename tome.

## Horizontalusis mastelio plėtimas: N nepriklausomų procesų

Vienas Node procesas yra **viena V8 krūva**. Dvi persidengiančios ~3 MiB / ~750 tūkst. žetonų programavimo agento `POST /v1/responses` užklausos (RTK + Caveman) nutraukia tos krūvos veikimą ties ~12 Gi (`FATAL ERROR: Reached heap limit`) ir gali išnaudoti visą 16 Gi cgroup atmintį. Žr. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Šis matavimas yra įspėjimas apie **atminties biudžetą**, o ne griežta produkto riba, leidžianti daugiausia dvi lygiagrečias ilgas `/v1/responses` užklausas. Didelio svorio pokalbių priėmimą riboja automatiškai nustatomas gaunamų baitų biudžetas (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), apskaičiuotas pagal tą pačią V8/cgroup ribą — padidinus jį rankiniu būdu (arba nustačius senąją `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` užklausų skaičiaus ribą) jau sukonfigūruotame procese, procesas vėl bus nutraukiamas. Mažiems pokalbiams, `/healthz`, `/v1/models` ir MCP ši riba **netaikoma**.

### Vienas procesas: daugiau nei dvi ilgos `/v1/responses`

**Tvarkingai veikiančiame** procese (krūvos užimtumas mažesnis už `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, numatytoji reikšmė `0.75`) **gali** būti vykdomos daugiau nei dvi lygiagrečios ilgos `POST /v1/responses` užklausos, jei viso proceso vykdomų užklausų baitų biudžete (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) dar yra vietos. Užklausų kūnai, kurių dydis siekia arba viršija `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (numatytoji reikšmė – 256 KiB), gauna tokį patį didelio svorio leidimą kaip ir sudėtingos struktūros užklausos bei naudoja tą patį [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` rezervą (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Dešimtys lygiagrečių ilgai veikiančių SSE klientų (operatoriams dažnai reikia 40–50) yra **atminties biudžeto** klausimas — reikia atitinkamai parinkti krūvos dydį, pagrindinių / rezervo vietų skaičių ir `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — o ne griežta produkto riba „daugiausia 2“. Apkrauta krūva vis tiek atmeta užklausas su pakartotinai bandyti leidžiančiu `503`, kad nepasikartotų #7849.

Norėdami **padauginti krūvas** (nepriklausomas V8 senosios kartos atminties sritis) **šiandien**:

| Darykite                                                                                                                                                                                            | Nedarykite                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Paleiskite **N konteinerių / podų**, kiekvieną su **nuosavu** `DATA_DIR` / tomu                                                                                                                     | Nenustatykite `replicas > 1` vienam SQLite failui                                                   |
| Didelio svorio vykdomų užklausų ir sveikos būsenos rezervo dydį parinkite pagal krūvos / vykdomų užklausų baitų biudžetą; 1–2 yra konservatyvi numatytoji #7849 reikšmė, o ne griežta produkto riba | Neskirkite vienam procesui 8× daugiau RAM ir neriboto užklausų skaičiaus                            |
| Pasirinktinai: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` **bendriems kvotų skaitikliams**                                                                                                | Nelaikykite Redis bendrinama SQLite — taip nėra                                                     |
| Nukopijuokite teikėjų paslaptis į kiekvieną egzempliorių (arba susitaikykite su atskiromis suvestinėmis)                                                                                            | Nesitikėkite vienos suvestinės / vieno iškvietimų žurnalo visuose egzemplioriuose                   |
| Priekyje naudokite bet kokį apkrovos balansavimo įrenginį; pakanka susiejimo pagal API raktą arba seansą                                                                                            | Nereikalaukite konkrečiam tiekėjui skirto, dydį įvertinančio tarpinės programinės įrangos sluoksnio |

Aparatinė įranga: lygiagrečių ilgų `/v1/responses` užklausų skaičius kiekviename egzemplioriuje yra **atminties biudžeto** klausimas (krūva + vykdomų užklausų baitai / #10110). `N` nepriklausomų `DATA_DIR` vis tiek padaugina krūvas: pagrindinio kompiuterio RAM turi pakakti `N × cgroup`, o ne „vienam 16 Gi podui su N=8“. Niekada nenaudokite `replicas > 1` vienam SQLite failui.

Compose eskizas (dvi krūvos, du tomai — ne `deploy.replicas: 2`):

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

Tankio didinimas proceso viduje (suspaudimą pašalinant iš HTTP izoliato) aprašytas [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Vienas loginis klasteris, naudojantis bendrinamą ilgalaikę būseną, aprašytas [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Gemini regioninės klaidos Docker aplinkoje

Google AI Studio / Gemini API gali grąžinti HTTP 400 klaidą su FAILED_PRECONDITION ir
`User location is not supported for the API use.` Sėkminga užklausa pagrindiniame
kompiuteryje neįrodo, kad konteineris naudoja tą patį išeinančio ryšio maršrutą. DNS
eiliškumas, IPv4/IPv6 ryšys, VPN maršrutizavimas ir sukonfigūruoti tarpiniai serveriai
gali skirtis. Patikrinkite [Google palaikomus regionus](https://ai.google.dev/gemini-api/docs/available-regions)
ir faktinį ryšio maršrutą; vien ši klaida nereiškia, kad API raktas netinkamas.

### Pirmenybę teikite konkrečiam ryšiui skirtam tarpiniam serveriui

Paveiktam Gemini ryšiui naudokite OmniRoute
[kiekvienam ryšiui skirtą tarpinio serverio konfigūraciją](../ops/PROXY_GUIDE.md#4-level-proxy-system),
tada pakartokite **Tikrinti ryšį** ir nedidelę užklausą su tuo pačiu modeliu. Taip
maršruto pakeitimas bus taikomas tik tam ryšiui. Patikrinkite, ar tarpinis serveris
pasiekiamas iš konteinerio ir ar ryšys iš tiesų jį pasirenka. Maršruto pakeitimas
negarantuoja, kad aukštesnio lygio paslauga bus pasiekiama iš konkretaus regiono.

### Palyginkite pagrindinio kompiuterio ir konteinerio tinklą

Lygindami autentifikuotų užklausų rezultatus naudokite tą patį raktą, modelį ir
užklausą; niekada į problemos aprašą neįklijuokite prisijungimo duomenų, tarpinio
serverio slaptažodžių ar visų autorizacijos antraščių. Pirmiausia patikrinkite, kurias
adresų šeimas pateikia OS vardų nustatymo priemonė, naudodami tą pačią komandą
pagrindiniame kompiuteryje ir konteinerio viduje:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Pakeiskite `omniroute` savo naudojamos paslaugos pavadinimu (pavyzdžiui,
`omniroute-web`). Šios komandos išveda adresų šeimas, neatskleisdamos prisijungimo
duomenų ar IP adresų. Grąžinta reikšmė `6` tik parodo IPv6 DNS rezultatą: ji
**neįrodo**, kad yra veikiantis IPv6 maršrutas ar prieiga prie API. Jei įdiegtas
`curl`, abiejose aplinkose palyginkite
`curl -4 -I https://generativelanguage.googleapis.com` su
`curl -6 -I https://generativelanguage.googleapis.com`. HTTP atsakymas patvirtina
ryšį atliekant šį patikrinimą, net jei tai neautentifikuotos užklausos klaida; Gemini
prieinamumą patikrina tik autentifikuota modelio užklausa.

### Pagrindinio kompiuterio lygmens alternatyva: veikiantis IPv6 ir vardų nustatymo politika

Pranešimo [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) autorius savo
aplinkoje atkūrė prieigą įjungęs konteinerio IPv6 ir pakeitęs glibc adresų pasirinkimą.
Laikykite tai konkrečiai aplinkai skirta alternatyva. Prieš keisdami vardų nustatymo
nuostatas patvirtinkite, kad veikia pagrindinio kompiuterio IPv6, konteinerio išeinantis
ryšys ir maršrutizavimas bei užkardos taisyklės. Vien privatus ULA adresas nepatvirtina
viešojo IPv6 ryšio.

Paslaugoms, kurios jau prijungtos prie numatytojo Compose tinklo, šis fragmentas įjungia
IPv6 tame tinkle; išlaikykite likusią paslaugos, prievadų, tomų ir kitą konfigūraciją:

```yaml
networks:
  default:
    enable_ipv6: true
```

Jei naudojamas vardinis tinklas, įjunkite IPv6 tinkle, prie kurio paslauga iš tikrųjų
prisijungia. Docker gali paskirti ULA potinklį; aiškiai nurodytą, su kitais
nepersidengiantį potinklį rinkitės tik tada, kai jo reikia jūsų tinklui. Žr.
[Docker IPv6 tinklo dokumentaciją](https://docs.docker.com/engine/daemon/ipv6/) ir
[Compose tinklo parinktis](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

**glibc pagrįstame atvaizde** `/etc/gai.conf` gali pakeisti adresų pasirinkimą.
Dabartinis saugyklos Dockerfile naudoja Debian; pasirinktiniai musl pagrįsti atvaizdai
šio mechanizmo nenaudoja. Aprašytas pakeitimas pakeičia ULA žymą iš
`label fc00::/7 6` į `label fc00::/7 1`. Pradėkite nuo visos atvaizdo politikos
lentelės ir išsaugokite kitus jos įrašus: pridėjus `label` arba `precedence` įrašą,
ši numatytoji lentelė pakeičiama, todėl failo, kuriame yra tik pakeista eilutė,
nepakanka. [glibc konfigūracijos žinyne](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
aprašyta ši elgsena. Prijunkite peržiūrėtą failą prie `/etc/gai.conf` tik skaitymo
režimu ir iš naujo sukurkite paslaugą, kad pakeitimas būtų pritaikytas.

Tai pakeičia OS adresų pasirinkimą **visam iš konteinerio išeinančiam srautui**.
Šis pakeitimas nepriverčia kiekvienos programos rinktis IPv6: taip pat svarbūs Node
DNS eiliškumas ir ryšio pasirinkimas. Visų pirma,
`--dns-result-order=ipv4first` teikia pirmenybę IPv4 ir nepadeda išspręsti tik su IPv4
susijusios trikties. Žr. [Node DNS eiliškumą](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Po bet kokio pagrindinio kompiuterio lygmens pakeitimo iš naujo išbandykite Gemini ir
kitus savo paslaugų teikėjus. Norėdami pakeitimą atšaukti, pašalinkite pasirinktinio
`gai.conf` prijungimą, atkurkite ankstesnę tinklo konfigūraciją ir per techninės
priežiūros laikotarpį iš naujo sukurkite paveiktą paslaugą ar tinklą. Tinklo sukūrimas
iš naujo gali sutrikdyti kitų prie jo prijungtų konteinerių darbą; neištrinkite
nuolatinio duomenų tomo.

## Svarbios pastabos

- **SQLite WAL režimas:** reikia leisti komandai `docker stop` užbaigti darbą, kad „OmniRoute“ galėtų įrašyti naujausius pakeitimus iš kontrolinio taško atgal į `storage.sqlite`. Pridedamuose „Compose“ failuose jau nustatytas 40 s sustabdymo atidėjimo laikotarpis. Jei atvaizdą paleidžiate tiesiogiai, palikite `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** nustatykite į `true`, jei įprastos / prieš įrašymą atliekamos atsarginės kopijos valdomos išoriškai. Esamos duomenų bazės perkėlimams vis tiek reikalinga atskira patikima saugos momentinė kopija ir masinio perkėlimo apsauga.
- **Duomenų išsaugojimas:** visada prijunkite tomą prie `/app/data`, kad duomenų bazė, raktai ir konfigūracijos išliktų iš naujo paleidus konteinerį.
- **Prievado konfigūracija:** pakeiskite aplinkos kintamojo `PORT` reikšmę, jei norite pakeisti numatytąjį prievadą `20128`.

## Taip pat žr.

- [VM diegimo vadovas](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare sąranka
- [Fly.io diegimo vadovas](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — diegimas į Fly.io
- [Aplinkos konfigūracija](../reference/ENVIRONMENT.md) — išsamus `.env` žinynas
