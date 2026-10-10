# 🐳 Docker Guide — OmniRoute (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Referință completă pentru implementarea cu Docker. Pentru o pornire rapidă, consultați [secțiunea Docker din README](../README.md#-docker).

## Cuprins

- [Pornire rapidă](#quick-run)
- [Cu fișier de mediu](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profiluri disponibile](#available-profiles)
- [Configurarea instrumentelor CLI de pe gazdă când OmniRoute rulează în Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Container auxiliar Redis](#redis-sidecar)
- [Compose pentru producție](#production-compose)
- [Etapele Dockerfile](#dockerfile-stages)
- [Variabile de mediu esențiale](#critical-environment-variables)
- [Docker Compose cu Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Tunel rapid Cloudflare](#cloudflare-quick-tunnel)
- [Etichete de imagine](#image-tags)
- [Disponibilitate: SQLite implicit acceptă o singură replică](#availability-default-sqlite-is-single-replica)
- [Erori regionale Gemini în Docker](#gemini-regional-errors-inside-docker)
- [Note importante](#important-notes)

---

## Pornire rapidă

> **Găzduire proprie cu o singură comandă?** Consultați
> [Ghidul de găzduire proprie](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (imagine publicată +
> Redis, numai pe interfața loopback, fără alegerea unui profil). Pornirea rapidă de mai jos reprezintă
> varianta cu un singur container pentru utilizatorii care rulează deja Redis în altă parte.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Cu fișier de mediu

```bash
# Copiați și editați mai întâi .env
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
# Profil de bază (fără instrumente CLI)
docker compose --profile base up -d

# Profil CLI (Claude Code, Codex, OpenClaw integrate)
docker compose --profile cli up -d

# Profil pentru gazdă (în principal pentru Linux; montează binarele CLI ale gazdei doar în citire)
docker compose --profile host up -d

# Profil web (Chromium/Playwright pentru furnizorii bazați pe sesiuni web)
docker compose --profile web up -d

# Combinați CLI + containerul auxiliar CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Profiluri disponibile

OmniRoute include profiluri Compose pentru principalele tipuri de implementare. Alegeți-l pe cel care corespunde mediului dumneavoastră.

| Profil            | Serviciu         | Când se utilizează                                                                                                                                    | Comandă                                      |
| ----------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (implicit) | `omniroute-base` | Server fără interfață grafică / mediu de execuție minimal, fără CLI-uri ale furnizorilor incluse                                                      | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Fluxuri de lucru agentice care apelează `omniroute providers/setup/doctor` și CLI-urile incluse (Codex, Claude Code, Droid, OpenClaw)                 | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Gazde Linux care doresc acces similar cu `network_mode` la CLI-urile gazdei prin montarea `~/.local/bin`, `~/.codex`, `~/.claude` etc. doar în citire | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Rulează containerul auxiliar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) pe portul `8317` pentru proxy-ul CLI din amonte              | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Furnizori bazați pe sesiuni web care necesită un browser: `gemini-web`, `claude-web`, `claude-turnstile` (compilează `runner-web`, Chromium inclus)   | `docker compose --profile web up -d`         |

> Pot fi combinate mai multe profiluri: `docker compose --profile cli --profile cliproxyapi up -d`.

## Configurarea instrumentelor CLI de pe gazdă când OmniRoute rulează în Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` și butonul
**Salvează configurația** din panoul de control scriu fișiere precum `~/.codex/*.config.toml`. Aceste căi
au semnificație doar pe sistemul pe care rulează efectiv CLI-ul. Dacă le rulați în
container, scrierea ajunge în directorul home propriu al containerului (`/home/node` —
imaginea rulează cu `USER node`), de unde niciun CLI de pe gazdă nu o va citi vreodată și unde aceasta este
eliminată în momentul în care containerul este recreat.

OmniRoute detectează acest lucru și refuză scrierea, oferind în schimb instrucțiuni,
în loc să raporteze un succes de care nu puteți beneficia: CLI-ul se încheie cu codul `2`, iar API-ul răspunde cu `422`
și `containerEphemeralTarget: true`.

### Recomandat: rulați CLI-ul pe gazdă și OmniRoute în Docker

Containerul furnizează API-ul; CLI-ul configurează instrumentele de pe gazdă.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # direcționați CLI-ul către container
omniroute setup-codex                      # scrie directorul ~/.codex real de pe gazdă
```

Aceasta este alegerea potrivită atunci când Codex, Claude Code, Cursor sau instrumente similare rulează pe
laptopul dvs. — configurația obișnuită.

### Alternativă: montați prin bind directoarele de configurare ale gazdei (profilul `host`)

Dacă doriți ca însuși containerul să scrie configurația de pe gazdă, montați
directoarele în container și configurați `CLI_CONFIG_HOME` către rădăcina montării. Profilul `host`
face deja acest lucru:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

O montare bind este ceea ce face calea sigură: OmniRoute citește
`/proc/self/mountinfo` și permite scrierile în căile montate (precum și în directoarele
ai căror copii sunt puncte de montare, exact ca structura `/host-home` de mai sus), refuzându-le
în continuare pe cele nemontate.

### Mecanism de excepție: configurați CLI-urile proprii ale containerului (utilizați cu moderație)

Când CLI-urile se află efectiv în interiorul containerului (profilul `cli`), scrierea
este intenționată. Transmiteți `--allow-container-write` oricărei comenzi `setup-*` sau setați
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` pentru server. Scrierea continuă
cu un avertisment că nu va supraviețui containerului.

> **Avertisment de securitate — profilul `cli` + montarea `docker.sock`.**
> Profilul `cli` montează prin bind `/var/run/docker.sock`, astfel încât mecanismul de
> actualizare automată din container să poată recrea stiva prin demonul de pe gazdă
> (`src/lib/system/autoUpdate.ts` verifică existența acelui socket și omite
> calea Docker atunci când acesta lipsește). Acel socket este **o limită de încredere cu privilegii root
> pe gazdă**: orice entitate care îl poate accesa controlează demonul Docker de pe gazdă ca
> root — poate crea, inspecta, opri și elimina orice container de pe gazdă.
> Implicații:
>
> 1. **Nu expuneți niciodată portul profilului `cli` în rețea.** Publicați-l
>    pe `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — un profil `cli` accesibil din LAN transformă orice RCE la nivelul panoului de control în
>    compromiterea completă a gazdei.
> 2. **Nu montați prin bind directoare suplimentare ale gazdei în profilul `cli`.**
>    Socketul Docker împreună cu orice montare suplimentară oferă containerului acces complet
>    de citire/scriere la sistemul de fișiere și la configurația gazdei. Dacă un instrument trebuie să
>    acceseze un proiect, rulați-l local cu binarul CLI — nu îl montați
>    în containerul `cli`.
>
> Dacă nu aveți nevoie de actualizare automată din container, nu activați profilul `cli`
> (`COMPOSE_PROFILES=core,redis` sau o variantă mai scurtă). Celelalte profiluri nu
> montează socketul Docker.
>
> Consultați `docs/security/MITM-TPROXY-DECRYPT.md` (git; necompilat în `/docs`) pentru modelul conex de amenințări
> privind MITM și `docs/security/SUPPLY_CHAIN.md` pentru lanțul de proveniență al binarelor
> `codex`/`claude-code`/`droid`/`openclaw`.

## Sidecar Redis

OmniRoute se bazează pe Redis pentru limitatorul de rată distribuit și memoria cache partajată. Serviciul `redis` este **întotdeauna definit** în `docker-compose.yml` (nu este condiționat de niciun profil) și pornește împreună cu orice alt profil.

| Detaliu                     | Valoare                                  |
| --------------------------- | ---------------------------------------- |
| Imagine                     | `redis:7-alpine`                         |
| Numele containerului        | `omniroute-redis`                        |
| Port intern                 | `6379`                                   |
| Port gazdă (suprascriere)   | `REDIS_PORT` (implicit `6379`)           |
| Adresă gazdă (suprascriere) | `REDIS_BIND_HOST` (implicit `127.0.0.1`) |
| Volum                       | `omniroute-redis-data` → `/data`         |
| Verificare de sănătate      | `redis-cli ping` (interval de 10s)       |

Variabile de mediu asociate:

- `REDIS_URL` — șirul de conexiune injectat în aplicație (`redis://redis:6379` în mod implicit).
- `REDIS_PORT` — maparea portului de pe gazdă pentru containerul Redis.
- `REDIS_BIND_HOST` — interfața gazdei pe care este publicat portul. Valoarea implicită este `127.0.0.1`.

> **De ce se folosește implicit interfața loopback:** sidecar-ul rulează fără `requirepass`, iar containerele
> aplicației îl accesează prin rețeaua Compose (`redis:6379`) — portul publicat există
> doar pentru instrumentele de pe gazdă (`redis-cli`, o instanță locală `npm run dev`). Publicarea pe
> `0.0.0.0` ar expune un Redis neautentificat fiecărei gazde din rețeaua LAN. Dacă setați
> `REDIS_BIND_HOST=0.0.0.0`, adăugați și `--requirepass` la `command:` al serviciului.

**Dezactivarea Redis** nu este recomandată (limitatorul de rată va trece la mecanismul alternativ din memorie). Dacă este necesar, eliminați/comentați blocul serviciului `redis:` din `docker-compose.yml` sau scalați-l la zero:

```bash
docker compose up -d --scale redis=0
```

## Compose pentru producție

Pentru un instantaneu de producție izolat, care rulează în paralel cu mediul de dezvoltare, utilizați `docker-compose.prod.yml`.

| Detaliu                        | Valoare                                                                                |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| Fișier                         | `docker-compose.prod.yml`                                                              |
| Port implicit pentru dashboard | `PROD_DASHBOARD_PORT=20130` (mapat la portul intern `${DASHBOARD_PORT:-20128}`)        |
| Port API implicit              | `PROD_API_PORT=20131`                                                                  |
| Imagine                        | `omniroute:prod` (construită din ținta `runner-cli`)                                   |
| Container Redis                | `omniroute-redis-prod` (`redis:8.6.2`, volum dedicat `redis-prod-data`)                |
| Volum de date                  | `omniroute-prod-data` (denumit, persistent între reconstruiri)                         |
| Verificări de sănătate         | `node healthcheck.mjs` + `redis-cli ping`, cu `depends_on` condiționat de starea Redis |

Mod de utilizare:

```bash
# Construiți și porniți stiva de producție
docker compose -f docker-compose.prod.yml up -d --build

# Urmăriți jurnalele în timp real
docker compose -f docker-compose.prod.yml logs -f

# Opriți și eliminați stiva (păstrați volumele)
docker compose -f docker-compose.prod.yml down
```

Stiva de producție rulează în paralel cu configurația Compose de dezvoltare (nume de containere, porturi și volume diferite), astfel încât puteți continua dezvoltarea locală în timp ce mediul de producție rămâne activ.

## Etapele Dockerfile

Depozitul include un Dockerfile în mai multe etape (`Dockerfile`). Sunt expuse patru etape; alegeți valoarea `target` potrivită cazului dvs. de utilizare.

| Etapă         | Imagine de bază       | Scop                                                                                                                                                                                                                                                                                                                          |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instalează dependențele (`npm ci --legacy-peer-deps`) și rulează `npm run build` (Turbopack în mod implicit — consultați mai jos Resursele din timpul construirii)                                                                                                                                                            |
| `runner-base` | `node:26-trixie-slim` | Mediu de execuție pentru producție cu rezultatul standalone Next.js. **Nu include CLI-uri ale furnizorilor.**                                                                                                                                                                                                                 |
| `runner-cli`  | `runner-base`         | Adaugă `git`, `docker.io`, `docker-compose` și CLI-urile globale: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Alegeți această variantă pentru fluxuri de lucru bazate pe agenți.**                                                                                                                   |
| `runner-web`  | `runner-base`         | Adaugă Playwright și un browser Chromium (`--with-deps`) pentru furnizorii de sesiuni web: `gemini-web`, `claude-web`, `claude-turnstile`. **Alegeți această variantă când utilizați acești furnizori** — imaginea simplă eșuează la momentul solicitării fără aceasta (consultați nota despre `-web` din Canale de lansare). |

Construiți manual o anumită țintă:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Resurse în timpul construirii

Trei argumente de construire controlează costul etapei `builder`. Acestea se aplică numai în timpul construirii —
`OMNIROUTE_MEMORY_MB` (mai jos) este un parametru separat pentru timpul de execuție.

| Argument de construire      | Valoare implicită | Efect                                                                                                              |
| --------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`               | `0` construiește cu webpack: consum maxim de memorie mai redus, dar mai lent. `1` activează Turbopack.             |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`            | Limita heap-ului V8 (`--max-old-space-size`) pentru procesul `next build` lansat.                                  |
| `OMNIROUTE_BUILD_WORKERS`   | `2`               | Furnizează valoarea pentru `CIRCLE_NODE_TOTAL`; Next derivă `workers = N - 1` pentru colectarea datelor paginilor. |

`OMNIROUTE_BUILD_WORKERS` este parametrul care trebuie mărit pe un sistem de construire puternic și cel care
trebuie suspectat atunci când o construire cu resurse limitate eșuează **după** `✓ Compiled successfully`. Fiecare
worker pentru datele paginilor este un proces separat, la fel ca procesul părinte `next build`;
o reproducere pe un VPS activ (problema #7518) a măsurat valoarea RSS maximă a fiecărui proces la
~4,5 GB, independent de opțiunea heap-ului `NODE_OPTIONS` (Turbopack compilează folosind
memorie nativă/Rust din afara heap-ului V8). Valoarea implicită `2` (→ 1 worker, 2
procese în total) este dimensionată pentru sistemele de rulare găzduite de GitHub, cu 16 GB/4 vCPU, pe care le
utilizează pipeline-ul de publicare. La `8` (→ 7 workeri), sistemul de rulare a rămas fără memorie, iar
buildkit a oprit etapa cu eroarea `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 workeri) tot nu a încăput după ce valoarea RSS per proces a fost măsurată
direct, în loc să fie dedusă. `tests/unit/docker-build-memory-budget.test.ts`
efectuează calculele folosind valoarea măsurată și eșuează dacă oricare dintre parametri
depășește capacitatea sistemului de rulare.

Turbopack compilează folosind memorie Rust nativă care se află **în afara** heap-ului V8, astfel încât
`OMNIROUTE_BUILD_MEMORY_MB` nu o limitează. Pe o gazdă cu o limită de memorie,
procesul de construire este încheiat prin SIGKILL de mecanismul OOM killer, fără niciun mesaj de eroare — pur și simplu
se oprește în timpul etapei `Creating an optimized production build`, ceea ce pare mai degrabă o blocare
decât o epuizare a memoriei. Acesta este motivul pentru care `Dockerfile` folosește implicit webpack
(`OMNIROUTE_USE_TURBOPACK=0`), spre deosebire de `npm run dev` / `npm run build`, unde
Turbopack este opțiunea implicită în cod: o comandă simplă `docker build .` fără argumente de construire (așa cum
rulează Railway și alte platforme cu implementare printr-un singur clic) nu trebuie să eșueze în tăcere pe un
sistem de construire cu memorie limitată. Imaginile publicate transmit deja explicit
`OMNIROUTE_USE_TURBOPACK=0` în `docker-publish.yml`. Pe un sistem de construire cu suficientă memorie RAM, activați
Turbopack pentru o construire mai rapidă:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` este activat, astfel încât `next build` rulează un proces părinte **și** un proces worker,
iar fiecare respectă separat `OMNIROUTE_BUILD_MEMORY_MB`. Configurați limita containerului
la o valoare puțin mai mare decât dublul acestei valori, nu doar peste valoarea sa simplă.

Măsurători pentru acest arbore (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Limita containerului | Rezultat                                       |
| --------- | -------------------- | ---------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB       | Oprit de OOM la ambele valori, fără mesaj      |
| webpack   | 8 GiB                | Procesul worker de construire a primit SIGKILL |
| webpack   | 12 GiB               | A reușit, cu un vârf de 11,1 GiB               |

### Valori implicite la rulare

Valori implicite exportate de `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Comportamentul memoriei în Docker:

- Imaginea setează `OMNIROUTE_MEMORY_MB=1024` și derivă din aceasta `NODE_OPTIONS=--max-old-space-size=1024`.
- Procesul efectiv al serverului este pornit de lansatorul independent, care citește `OMNIROUTE_MEMORY_MB` și adaugă `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node utilizează ultima valoare repetată pentru `--max-old-space-size`, astfel încât setarea `OMNIROUTE_MEMORY_MB` controlează limita efectivă a heap-ului în Docker.
- Deoarece imaginea setează întotdeauna această variabilă, valoarea de rezervă a lansatorului, calibrată în funcție de RAM, nu se aplică niciodată în Docker. Măriți-o explicit pentru sarcina de lucru (tabelul de mai jos). `2048` este în continuare prea puțin pentru `/v1/responses` al agenților de programare.

### RAM necesară în timpul execuției pentru agenții de programare

Valoarea implicită Docker de 1 GiB reprezintă un minim pentru panoul de control și conversații simple, nu o dimensiune adecvată pentru producție. Corpurile lungi ale solicitărilor `POST /v1/responses` (sute de mesaje, zeci de instrumente) păstrează în memorie mai multe grafuri în timpul comprimării. Două solicitări suprapuse de aproximativ 3 MiB / 750k tokenuri au provocat oprirea V8 la un spațiu pentru obiecte vechi de **12 GiB** (`FATAL ERROR: Reached heap limit`) și au atins, de asemenea, limita OOM a unui cgroup de 16 GiB. Consultați [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Configurați **`--memory` pentru cgroup peste dimensiunea heap-ului** — bufferele native, SQLite și datele intermediare de comprimare se află în afara V8.

| Sarcină de lucru                                | `OMNIROUTE_MEMORY_MB`                  | Container / cgroup          | Observații                                                                                                    |
| ----------------------------------------------- | -------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Panou de control, o conversație simplă          | `1024` (valoarea implicită a imaginii) | ≥2 GiB                      |                                                                                                               |
| Un agent de programare (Claude/Codex/Grok)      | `8192`                                 | ≥10 GiB                     | Sesiune individuală obișnuită pentru `/v1/responses`                                                          |
| Două solicitări lungi `/v1/responses` simultane | `10240`–`12288`                        | ≥12–16 GiB                  | Oprire V8 măsurată la un heap de aproximativ 12 GiB                                                           |
| Trei sau mai multe contexte lungi simultane     | nu utilizați un singur proces          | serializați / mai multă RAM | Limita implicită pentru solicitările cu consum mare este 1 în curs; mărirea acesteia fără RAM readuce eroarea |

`omniroute serve` pe sistemul fizic calibrează aproximativ 35% din RAM (limitat la intervalul `[512, 4096]`) atunci când `OMNIROUTE_MEMORY_MB` este **nesetată**. Docker setează întotdeauna valoarea `1024`, astfel încât această calibrare nu rulează niciodată în imaginea oficială.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Variabile de mediu critice

Pe lângă valorile implicite documentate în [ENVIRONMENT.md](../reference/ENVIRONMENT.md), următoarele variabile sunt cele mai importante atunci când aplicația rulează în Docker:

| Variabilă                     | Scop                                                                                                                                                                                                                                                                                       | Valoare implicită          |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Secret partajat pentru puntea WebSocket. **Obligatoriu în producție** — setați-l la un șir aleatoriu puternic.                                                                                                                                                                             | nesetat (trebuie furnizat) |
| `REDIS_URL`                   | Șir de conexiune pentru limitatorul de rată / backendul de cache                                                                                                                                                                                                                           | `redis://redis:6379`       |
| `REDIS_PORT`                  | Portul de pe gazdă pentru containerul Redis inclus                                                                                                                                                                                                                                         | `6379`                     |
| `REDIS_BIND_HOST`             | Interfața gazdei pe care este publicat portul Redis inclus (interfața loopback, cu excepția cazului în care adăugați AUTH)                                                                                                                                                                 | `127.0.0.1`                |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Calea de pe gazdă montată în profilul `cli` la `/workspace/omniroute` pentru fluxurile de lucru de autoactualizare                                                                                                                                                                         | `.` (directorul curent)    |
| `OMNIROUTE_MEMORY_MB`         | Limita heap-ului Node în timpul rulării pentru serverul Docker autonom; suprascrie valoarea implicită a imaginii menționată mai sus. Agenți de programare: `8192`+ (consultați [memoria RAM în timpul rulării](#runtime-ram-for-coding-agents)).                                           | `1024`                     |
| `DASHBOARD_PORT` / `API_PORT` | Suprascriu porturile expuse pentru panoul de control (20128) și API (20129)                                                                                                                                                                                                                | `20128` / `20129`          |
| `APP_BIND_HOST`               | Interfața gazdei pe care docker-compose publică porturile pentru panoul de control/API/WS live. Cu `REQUIRE_API_KEY=false` (valoarea implicită), `0.0.0.0` expune proxy-ul anonim `/v1` în rețeaua LAN — extindeți accesul numai cu `REQUIRE_API_KEY=true` sau cu un proxy invers în față. | `127.0.0.1`                |
| `CLIPROXY_BIND_HOST`          | Interfața gazdei pe care docker-compose publică serviciul secundar `cliproxyapi` — volumul său de date păstrează acreditările furnizorilor.                                                                                                                                                | `127.0.0.1`                |
| `OMNIROUTE_PLUGINS_DIR`       | Directorul pe care scanerul de pluginuri din timpul rulării îl citește și în care instalează. Setați-l atunci când pluginurile sunt montate prin bind: valoarea implicită urmează `HOME`, pe care o imagine nu îl exportă neapărat.                                                        | `~/.omniroute/plugins`     |
| `OMNIROUTE_BASE_PATH`         | Subcalea URL atunci când aplicația este publicată în spatele unui proxy invers (de exemplu, `/omniroute`)                                                                                                                                                                                  | _(gol = rădăcină)_         |
| `NEXT_PUBLIC_BASE_URL`        | Originea publică pentru browser, inclusiv subcalea (de exemplu, `https://host/omniroute`)                                                                                                                                                                                                  | nesetat                    |
| `PROD_DASHBOARD_PORT`         | Portul de pe gazdă pentru panoul de control din `docker-compose.prod.yml`                                                                                                                                                                                                                  | `20130`                    |
| `CLIPROXYAPI_PORT`            | Portul de pe gazdă pentru serviciul secundar `cliproxyapi`                                                                                                                                                                                                                                 | `8317`                     |

## Proxy invers pe o subcale (Traefik / nginx)

`basePath` din Next.js este compilat în pachetul autonom. OmniRoute înregistrează valoarea
încorporată într-un fișier santinelă din rădăcina aplicației (scris în timpul rulării
`npm run build`; citit de `scripts/docker/ensure-docker-base-path.mjs`) și o compară cu
`OMNIROUTE_BASE_PATH` la pornirea containerului. Când acestea diferă, iar imaginea a fost
construită pentru rădăcina domeniului, punctul de intrare rescrie manifestele autonome,
literalii `basePath`/`assetPrefix` încorporați (Next 16 generează URL-urile resurselor SSR
exclusiv din `assetPrefix` — utilitarul de corecție copiază subcalea în acesta), URL-urile
resurselor `/_next/static` încorporate (manifestele referințelor clientului, importurile
media, paginile de eroare preredate) și substitutul `process.env` din client înainte de
rularea `node dev/run-standalone.mjs`.

### Construirea cu Compose (recomandat)

Setați ambele variabile în `.env`, apoi reconstruiți, astfel încât imaginea și mediul de execuție să corespundă:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` transmite `OMNIROUTE_BASE_PATH` ca argument de construire Docker și ca
variabilă de mediu în timpul execuției.

### Imagine rădăcină preconstruită + subcale în timpul execuției

Imaginile publicate `diegosouzapw/omniroute:*` sunt construite pentru rădăcina domeniului. Puteți totuși
seta `OMNIROUTE_BASE_PATH` în timpul execuției; containerul corectează pachetul o singură dată la pornire.
Asociați-o cu originea publică corespunzătoare:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Configurați proxy-ul invers să redirecționeze calea externă **completă** (nu eliminați
prefixul). Traefik trebuie să direcționeze `PathPrefix(`/omniroute`)` către container fără
`StripPrefix`, astfel încât Next.js să primească `/omniroute/...` și să servească resursele din
`/omniroute/_next/...`.

Verificarea stării Docker sondează endpointul simplificat al ciclului de viață `/healthz`, prefixat
cu valoarea activă `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` rămâne disponibil pentru
diagnosticare manuală/prin panoul de control; pentru a redirecționa HEALTHCHECK-ul containerului către acesta (de exemplu,
pentru verificarea aprofundată a stării), setați `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Calea respectivă reprezintă o verificare **aprofundată** (baza de date + rezumatul monitorizării) — adecvată pentru
verificarea `HEALTHCHECK` rară a Docker, dacă optați din nou pentru aceasta, dar **nu** pentru intervalele
`livenessProbe` din Kubernetes.

Pentru orchestratoare (Kubernetes, Nomad etc.):

| Sondă                  | De preferat                                                              | De evitat                                                                             |
| ---------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| Stare de funcționare   | HTTP `GET /livez` sau TCP pe portul principal (`PORT`, implicit `20128`) | `/api/monitoring/health` ca verificare a stării de funcționare                        |
| Disponibilitate        | HTTP `GET /healthz`                                                      | Limite de timp stricte care consideră o buclă de evenimente ocupată ca fiind inactivă |
| Aprofundată / blackbox | `/api/monitoring/health`                                                 | —                                                                                     |

`/healthz` raportează ciclul de viață al procesului (`ok` / `starting` / `stopping`). `/livez`
indică doar că procesul este activ (200 ori de câte ori handlerul poate rula; acesta nu așteaptă
disponibilitatea). Ambele rulează totuși în aceeași buclă de evenimente Node ca procesarea solicitărilor, astfel încât
operațiunile asupra catalogului sau de comprimare care solicită intens procesorul le pot întârzia — ocupat ≠ inactiv. Preferați verificarea
TCP a stării de funcționare dacă sondele HTTP expiră. Ghid complet privind sondele:
[Ghid de monitorizare — recomandări pentru sondele Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose cu Caddy (HTTPS Auto-TLS)

OmniRoute poate fi expus în siguranță folosind furnizarea automată de certificate SSL oferită de Caddy. Asigurați-vă că înregistrarea DNS de tip A a domeniului indică spre adresa IP a serverului.

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
      # Originea vizibilă browserului pentru callback-urile OAuth, linkurile tabloului de bord și URL-urile publice generate.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL intern între servere pentru sarcini programate / cereri către sine.
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

Caddy setează anteturile standard de redirecționare pentru containerul upstream. OmniRoute utilizează
`NEXT_PUBLIC_BASE_URL` drept origine publică canonică pentru callback-urile OAuth și linkurile publice
generate; operațiunile de scriere autentificate din tabloul de bord utilizează cereri de aceeași origine și protecție CSRF
asociată sesiunii. Activați `OMNIROUTE_TRUST_PROXY` numai pentru implementări avansate în care doriți în mod intenționat
ca OmniRoute să determine originea publică din anteturile de redirecționare de încredere, în locul configurării
explicite.

## Tunel rapid Cloudflare

Suportul tabloului de bord pentru implementările Docker include un **tunel rapid Cloudflare** cu un singur clic în `Dashboard → Endpoints`. La prima activare, `cloudflared` este descărcat numai când este necesar, este pornit un tunel temporar către endpoint-ul `/v1` curent, iar URL-ul `https://*.trycloudflare.com/v1` generat este afișat direct sub URL-ul public obișnuit.

Panourile pentru tunelurile endpoint-urilor (Cloudflare, Tailscale, ngrok) pot fi afișate sau ascunse din `Settings → Appearance` fără a modifica starea tunelurilor active.

### Note despre tunel

- URL-urile tunelurilor rapide sunt temporare și se modifică după fiecare repornire.
- Tunelurile rapide nu sunt restaurate automat după repornirea OmniRoute sau a containerului. Reactivați-le din tabloul de bord atunci când este necesar.
- Instalarea gestionată acceptă în prezent Linux, macOS și Windows pe `x64` / `arm64`.
- Tunelurile rapide gestionate utilizează implicit transportul HTTP/2 pentru a evita avertismentele zgomotoase privind bufferul UDP QUIC în mediile de containere cu resurse limitate. Setați `CLOUDFLARED_PROTOCOL=quic` sau `auto` dacă doriți un alt tip de transport.
- Imaginile Docker includ certificatele CA rădăcină ale sistemului și le transmit către instanța `cloudflared` gestionată, evitând astfel erorile de încredere TLS atunci când tunelul se inițializează în interiorul containerului.
- Setați `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` dacă doriți ca OmniRoute să utilizeze un binar existent în loc să descarce unul.

## Etichetele imaginilor

| Imagine                  | Etichetă | Dimensiune | Descriere                                                                 |
| ------------------------ | -------- | ---------- | ------------------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB     | Cea mai recentă versiune SemVer stabilă **publicată** (nu `main` din git) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB     | Fixați această categorie de etichete pentru GitOps                        |

Manifest multi-platformă: `linux/amd64` + `linux/arm64` nativ (Apple Silicon, AWS Graviton, Raspberry Pi). Docker selectează automat arhitectura corespunzătoare; transmiteți `--platform linux/amd64` dacă trebuie să forțați emularea AMD64 pe gazde ARM.

### Canale de lansare

OmniRoute publică separat canale Docker pentru versiuni stabile, testarea ramurii active de lansare și compilările de dezvoltare.

| Canal                           | Sursă                                                 | Mutabilitate                    | Utilizare recomandată                                                                                                                  |
| ------------------------------- | ----------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Versiune semnată/cu număr de versiune                 | Imuabilă                        | Implementări de producție care fixează o anumită versiune                                                                              |
| `:latest` / `:latest-web`       | Cea mai recentă versiune SemVer stabilă **publicată** | Indicator stabil mutabil        | Urmează versiunile stabile **după** o sarcină de publicare SemVer — **nu** urmărește `main` sau commiturile nelansate din `release/v*` |
| `:next` / `:next-web`           | Ramura `release/v*` implicită curentă                 | Indicator preliminar mutabil    | Testarea remedierilor care au ajuns în ramura activă de lansare, dar care nu fac încă parte dintr-o versiune stabilă                   |
| `:main` / `:main-web`           | Ramura `main`                                         | Indicator de dezvoltare mutabil | Numai pentru dezvoltare și testarea integrării                                                                                         |

#### Furnizori de sesiuni web: imaginile `-web`

Fiecare canal de mai sus are și o etichetă `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), construită din etapa `runner-web` — aceeași imagine, dar cu Playwright și un browser Chromium. Imaginea obișnuită este livrată **fără** Chromium; `gemini-web`, `claude-web` și `claude-turnstile` au nevoie de acesta.

Eroarea este amânată, nu apare la pornire: acești furnizori își listează modelele și apar drept conectați în tabloul de bord, iar numai prima cerere eșuează cu

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Dacă utilizați acești furnizori, descărcați eticheta `-web` a canalului pe care îl utilizați deja — nimic altceva nu se schimbă. În cazul unei instalări npm/CLI (fără imagine Docker), componenta echivalentă care lipsește este binarul browserului: rulați `npx playwright install chromium` pe gazdă.

#### Utilizarea canalului preliminar

Canalul `next` este reconstruit la fiecare push în ramura implicită curentă `release/v*` și este publicat atât pentru AMD64, cât și pentru ARM64. Ramurile de mentenanță mai vechi nu îl pot suprascrie. Canalul oferă o imagine care poate fi descărcată pentru remedierile care au fost integrate în ramura activă de lansare înainte de crearea următorului tag stabil.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Pentru Docker Compose, suprascrieți tagul imaginii utilizat de profilul selectat, apoi descărcați imaginea și recreați serviciul:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Siguranță și revenire

`next` este un canal flotant de pre-lansare. Se poate modifica la orice push în ramura activă de lansare și **nu este acceptat pentru utilizare în producție**. Fixați digestul imaginii atunci când evaluați un anumit build:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Înainte de testare, creați o copie de siguranță a volumului de date OmniRoute sau a directorului de date montat prin bind mount. Pentru a reveni, restaurați versiunea stabilă sau digestul utilizat anterior și recreați containerul:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Un build al ramurii de lansare nu poate muta niciodată `latest`; numai o versiune semantică stabilă eligibilă poate actualiza indicatorul stabil. Imaginile `next` păstrează verificarea imaginii de lansare și pragul de blocare pentru vulnerabilități CRITICAL.

**`latest` nu garantează actualitatea față de git.** Remedierile integrate în `main` sau în ramura activă `release/v*` **nu** sunt incluse în `:latest` până când nu este publicată o imagine SemVer stabilă, iar jobul de publicare nu promovează `:latest` (același digest ca versiunea SemVer respectivă). Dacă `latest` pare neschimbat, deși GitHub afișează deja remedierea, descărcați `:next` pentru a testa ramura de lansare sau așteptați tagul SemVer.

| Ce doriți                                                                             | Utilizați                               |
| ------------------------------------------------------------------------------------- | --------------------------------------- |
| GitOps / producție care nu trebuie să devieze                                         | Fixați `:X.Y.Z` (sau digestul imaginii) |
| Să urmăriți versiunile stabile publicate și să acceptați recrearea la fiecare lansare | `:latest`                               |
| Să testați commiturile nelansate din `release/v*`                                     | `:next` (nu pentru producție)           |
| Să testați `main`                                                                     | `:main` (nu pentru producție)           |

## Disponibilitate: SQLite implicit are o singură replică

Configurația standard OmniRoute pentru Docker / Kubernetes este **un proces Node + un singur writer SQLite**. Disponibilitatea ridicată **nu este acceptată** pentru această topologie.

| Constrângere                                   | Consecință                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Un singur writer                               | **Nu** rulați mai multe replici folosind același fișier SQLite. Acest lucru corupe baza de date.                                                                                                                                                                                                                                                                          |
| Recreare / repornire / oprire prin HEALTHCHECK | **Întrerupere completă** pentru fluxurile SSE în curs, sesiunile din dashboard și starea din memorie. Fiecare client conectat este deconectat. Solicitările noi din intervalul fără endpoint-uri primesc de la reverse proxy **`502 Bad Gateway: Unknown error`**, nu JSON OmniRoute — clienții nu pot distinge această situație de o defecțiune a furnizorului (#11015). |
| Același event loop ca `/healthz`               | Un ciclu aglomerat de catalog sau compresie poate întârzia probele; un timeout scurt repornește apoi **singura** replică.                                                                                                                                                                                                                                                 |

**Matricea probelor** (consultați și [recomandările pentru probele Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probă                | Țintă                                                         | Nu utilizați                                                         |
| -------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------- |
| Liveness             | TCP pe `PORT` (implicit `20128`) sau HTTP permisiv `/healthz` | `/api/monitoring/health`                                             |
| Readiness            | HTTP `GET /healthz`                                           | Timeout-uri stricte care tratează un event loop ocupat ca fiind mort |
| Aprofundată / oameni | `/api/monitoring/health`                                      | Liveness automatizat prin kubelet                                    |

**Upgrade-uri:** așteptați-vă ca fiecare sesiune să fie întreruptă. Drenați clienții dacă puteți; nu există actualizare graduală cu configurația SQLite implicită. Compose `restart: unless-stopped` împreună cu Docker `HEALTHCHECK` va înlocui, de asemenea, singurul proces atunci când containerul este nesănătos — cu aceeași amploare a impactului.

Fragment Kubernetes pentru **o singură replică** (Recreate este obligatoriu; nu măriți `replicas` pentru un singur fișier SQLite):

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

Pauza `preStop` permite kube să elimine endpoint-urile Service înainte de SIGTERM, astfel încât traficul **nou** să nu mai ajungă la procesul în curs de oprire. SSE în curs pentru `/v1/responses` este drenat timp de până la `SHUTDOWN_TIMEOUT_MS` (implicit 30 s) prin lease-uri de admitere heavyweight (#11015). Solicitările noi care încă ajung la proces primesc `503` + `Retry-After: 5`. Intervalul Recreate fără endpoint-uri, până când instanța înlocuitoare este pregătită, rămâne o întrerupere completă — aceasta este topologia SQLite, nu o configurare greșită a probelor.

HA cu Postgres extern / mai mulți writeri **nu** este o opțiune standard documentată. Dacă aveți nevoie de HA, păstrați o singură replică sau rulați o topologie pe care proiectul a testat-o și a documentat-o separat. Lucrările pentru Postgres/MySQL se află în [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Până la livrarea acestora, singura modalitate acceptată de a multiplica capacitatea pentru solicitări **mari** către `/v1/responses` este utilizarea a N procese independente (secțiunea următoare), nu `replicas > 1` pe un singur volum.

## Scalare orizontală: N procese independente

Un proces Node reprezintă **un heap V8**. Două solicitări suprapuse `POST /v1/responses` ale agenților de programare, de aproximativ 3 MiB / aproximativ 750k tokenuri (RTK + Caveman), provoacă oprirea heapului la aproximativ 12 Gi (`FATAL ERROR: Reached heap limit`) și pot cauza OOM într-un cgroup de 16 Gi. Consultați [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Această măsurătoare este un avertisment privind **bugetul de memorie**, nu o limită maximă strictă a produsului de două solicitări `/v1/responses` lungi concurente. Admiterea conversațiilor solicitante este controlată printr-un buget de octeți la intrare derivat automat (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), dimensionat pe baza aceleiași limite V8/cgroup — suprascrierea acestuia cu o valoare mai mare (sau configurarea limitei vechi `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`, bazată pe numărul de solicitări) într-un proces deja dimensionat reintroduce oprirea. Conversațiile mici, `/healthz`, `/v1/models` și MCP **nu** sunt incluse în această limită.

### Un singur proces: mai mult de două solicitări `/v1/responses` lungi

Un proces **sănătos** (heap sub `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, implicit `0.75`) **poate** rula mai mult de două solicitări concurente lungi `POST /v1/responses` atunci când bugetul de octeți în curs de procesare la nivelul întregului proces (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) mai are capacitate disponibilă. Corpurile cu dimensiunea egală sau mai mare decât `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (implicit 256 KiB) obțin aceeași rezervare pentru sarcini solicitante ca solicitările cu structuri complexe și utilizează aceeași cale alternativă `tryAcquireHealthyHeadroom` din [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Zeci de clienți SSE concurenți de lungă durată (operatorii au adesea nevoie de 40–50) reprezintă o chestiune de **buget de memorie** — dimensionați heapul + sloturile principale/de rezervă + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — nu o limită strictă a produsului de „maximum 2”. Un heap aflat sub presiune continuă să respingă solicitări cu răspunsul reîncercabil `503`, astfel încât problema #7849 să nu reapară.

Pentru a **multiplica heapurile** (spații vechi V8 independente) **în prezent**:

| Procedați astfel                                                                                                                                                                                      | Nu procedați astfel                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Rulați **N containere/poduri**, fiecare cu propriul `DATA_DIR` / volum                                                                                                                                | Nu setați `replicas > 1` pentru un singur fișier SQLite                                   |
| Dimensionați solicitările solicitante în curs + rezerva sănătoasă pe baza heapului / bugetului de octeți în curs; 1–2 este valoarea implicită prudentă pentru #7849, nu o limită strictă a produsului | Nu alocați unui singur proces de 8× mai multă memorie RAM și o limită numerică nelimitată |
| Opțional: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` pentru **contoare de cote partajate**                                                                                                  | Nu tratați Redis drept SQLite partajat — nu este                                          |
| Duplicați secretele furnizorilor în fiecare instanță (sau acceptați panouri de control partiționate)                                                                                                  | Nu vă așteptați la un singur panou de control / jurnal de apeluri pentru toate instanțele |
| Amplasați în față orice echilibrator de încărcare; persistența pe baza cheii API sau a sesiunii este suficientă                                                                                       | Nu impuneți un middleware specific unui furnizor, care ține cont de dimensiune            |

Hardware: numărul de solicitări concurente lungi `/v1/responses` per instanță este o chestiune de **buget de memorie** (heap + octeți în curs / #10110). `N` directoare `DATA_DIR` independente multiplică în continuare heapurile: memoria RAM a gazdei trebuie să acopere `N × cgroup`, nu „un pod de 16 Gi cu N=8”. Nu utilizați niciodată `replicas > 1` pentru un singur fișier SQLite.

Schiță Compose (două heapuri, două volume — nu `deploy.replicas: 2`):

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

Densitatea în cadrul procesului (compresia în afara izolării HTTP) este urmărită în [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Un singur cluster logic bazat pe stare durabilă partajată este urmărit în [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Erori regionale Gemini în Docker

Google AI Studio / Gemini API poate returna HTTP 400 cu FAILED_PRECONDITION și
`User location is not supported for the API use.` O solicitare reușită pe gazdă
nu dovedește că acel container utilizează aceeași rută de ieșire. Ordinea DNS,
conectivitatea IPv4/IPv6, rutarea VPN și proxy-urile configurate pot fi diferite. Verificați
[regiunile acceptate de Google](https://ai.google.dev/gemini-api/docs/available-regions),
precum și ruta efectivă a conexiunii; această eroare, de una singură, nu indică o cheie API nevalidă.

### Preferați un proxy specific conexiunii

Utilizați [configurarea proxy per conexiune](../ops/PROXY_GUIDE.md#4-level-proxy-system)
din OmniRoute pentru conexiunea Gemini afectată, apoi repetați **Test Connection** și o solicitare mică
folosind același model. Astfel, modificarea rutării rămâne limitată la acea conexiune. Verificați
dacă proxy-ul este accesibil din container și dacă respectiva conexiune chiar îl selectează.
Schimbarea rutei nu garantează eligibilitatea regională în serviciul din amonte.

### Comparați rețeaua gazdei cu cea a containerului

Păstrați identice cheia, modelul și solicitarea atunci când comparați rezultatele autentificate; nu
inserați niciodată într-o sesizare credențiale, parole de proxy sau antete de autorizare complete.
Mai întâi, verificați ce familii de adrese oferă resolverul sistemului de operare, folosind aceeași comandă
pe gazdă și în interiorul containerului:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Înlocuiți `omniroute` cu serviciul pe care îl rulați (de exemplu, `omniroute-web`). Aceste
comenzi afișează familiile de adrese fără credențiale sau adrese IP. Valoarea `6` returnată
indică doar un rezultat DNS IPv6: aceasta **nu** dovedește existența unei rute IPv6 utilizabile sau accesul la API.
Acolo unde este instalat `curl`, comparați `curl -4 -I https://generativelanguage.googleapis.com`
cu `curl -6 -I https://generativelanguage.googleapis.com` în ambele medii.
Un răspuns HTTP dovedește conectivitatea pentru acea verificare, chiar dacă este o eroare
neautentificată; numai solicitarea autentificată către model testează eligibilitatea Gemini.

### Alternativă la nivelul gazdei: IPv6 funcțional și politica resolverului

Autorul sesizării [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) a restabilit
accesul în mediul său prin activarea IPv6 pentru containere și modificarea selecției adreselor
în glibc. Tratați aceasta ca pe o alternativă specifică mediului. Confirmați funcționarea IPv6
pe gazdă, ieșirea/rutarea containerului și regulile firewallului înainte de a ajusta preferințele resolverului.
O adresă ULA privată, de una singură, nu dovedește conectivitatea IPv6 publică.

Pentru serviciile deja atașate la rețeaua implicită Compose, acest fragment activează
IPv6 în rețeaua respectivă; păstrați restul serviciului, porturile, volumele și configurația:

```yaml
networks:
  default:
    enable_ipv6: true
```

Pentru o rețea denumită, activați opțiunea în rețeaua la care se conectează efectiv serviciul. Docker poate
aloca o subrețea ULA; selectați o subrețea explicită, care nu se suprapune, numai atunci când rețeaua
dumneavoastră o necesită. Consultați [rețelele IPv6 în Docker](https://docs.docker.com/engine/daemon/ipv6/)
și [opțiunile de rețea Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Într-o **imagine bazată pe glibc**, `/etc/gai.conf` poate modifica selecția adreselor. Dockerfile-ul
actual al depozitului utilizează Debian; imaginile personalizate bazate pe musl nu folosesc acest mecanism.
Ajustarea raportată schimbă eticheta ULA din `label fc00::/7 6` în
`label fc00::/7 1`. Porniți de la tabelul complet de politici al imaginii și păstrați celelalte
intrări ale acestuia: adăugarea unei intrări `label` sau `precedence` înlocuiește tabelul implicit,
așadar un fișier care conține doar linia modificată este insuficient. Documentația de
[configurare glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
descrie această semantică. Montați prin bind fișierul verificat, în mod doar în citire, la `/etc/gai.conf`
și recreați serviciul pentru a aplica modificarea.

Aceasta modifică selecția adreselor la nivelul sistemului de operare pentru **tot traficul de ieșire din acel container**.
Nu obligă fiecare aplicație să aleagă IPv6: ordinea DNS și selecția conexiunii în Node
contează, de asemenea. În special, `--dns-result-order=ipv4first` preferă IPv4 și
nu reprezintă o soluție pentru o problemă care afectează exclusiv IPv4. Consultați [ordonarea DNS în Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Retestați Gemini și ceilalți furnizori după orice modificare la nivelul gazdei. Pentru revenire,
eliminați montarea fișierului `gai.conf` personalizat, restaurați configurația anterioară a rețelei și
recreați serviciul/rețeaua afectată într-o fereastră de mentenanță. Recrearea unei rețele
poate întrerupe funcționarea altor containere atașate la aceasta; nu ștergeți volumul de date persistente.

## Note importante

- **Modul WAL SQLite:** Comanda `docker stop` trebuie lăsată să se finalizeze, astfel încât OmniRoute să poată face checkpoint pentru cele mai recente modificări în `storage.sqlite`. Fișierele Compose incluse configurează deja o perioadă de grație de 40s pentru oprire. Dacă rulați imaginea direct, păstrați `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Setați la `true` dacă backupurile de rutină/înainte de scriere sunt gestionate extern. Migrările bazelor de date existente necesită în continuare propriul snapshot de siguranță durabil și mecanismul de protecție pentru migrările în masă.
- **Persistența datelor:** Montați întotdeauna un volum la `/app/data` pentru a păstra baza de date, cheile și configurațiile între repornirile containerului.
- **Configurarea portului:** Suprascrieți variabila de mediu `PORT` pentru a schimba portul implicit `20128`.

## Consultați și

- [Ghid de implementare pe VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Configurare VM + nginx + Cloudflare
- [Ghid de implementare pe Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Implementare pe Fly.io
- [Configurarea mediului](../reference/ENVIRONMENT.md) — Referință completă pentru `.env`
