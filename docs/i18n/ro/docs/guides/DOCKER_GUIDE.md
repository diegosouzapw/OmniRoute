# 🐳 Docker Guide — OmniRoute (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Referință completă pentru implementarea cu Docker. Pentru o pornire rapidă, consultați [secțiunea Docker din README](../README.md#-docker).

## Cuprins

- [Rulare rapidă](#quick-run)
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
- [Etichetele imaginilor](#image-tags)
- [Disponibilitate: configurația SQLite implicită acceptă o singură replică](#availability-default-sqlite-is-single-replica)
- [Note importante](#important-notes)

---

## Pornire rapidă

> **Auto-găzduire cu o singură comandă?** Consultați
> [Ghidul de auto-găzduire](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (imagine publicată +
> Redis, accesibil doar prin interfața loopback, fără alegerea unui profil). Secțiunea Pornire rapidă de mai jos descrie
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

# Profil gazdă (conceput în primul rând pentru Linux; montează binarele CLI ale gazdei doar în citire)
docker compose --profile host up -d

# Profil web (Chromium/Playwright pentru furnizorii de sesiuni web)
docker compose --profile web up -d

# Combină CLI + sidecar-ul CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Profiluri disponibile

OmniRoute include profiluri Compose pentru principalele tipuri de implementare. Alegeți-l pe cel care corespunde mediului dvs.

| Profil            | Serviciu         | Când se utilizează                                                                                                                                               | Comandă                                      |
| ----------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (implicit) | `omniroute-base` | Server fără interfață grafică / mediu de execuție minimal, fără CLI-uri ale furnizorilor incluse                                                                 | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Fluxuri de lucru bazate pe agenți care apelează `omniroute providers/setup/doctor` și CLI-urile incluse (Codex, Claude Code, Droid, OpenClaw)                    | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Gazde Linux care necesită acces similar cu `network_mode` la CLI-urile gazdei prin montarea în mod doar în citire a `~/.local/bin`, `~/.codex`, `~/.claude` etc. | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Rulează serviciul auxiliar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) pe portul `8317` pentru proxy-ul CLI din amonte                           | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Furnizori bazați pe sesiuni web care necesită un browser: `gemini-web`, `claude-web`, `claude-turnstile` (construiește `runner-web`, Chromium inclus)            | `docker compose --profile web up -d`         |

> Pot fi combinate mai multe profiluri: `docker compose --profile cli --profile cliproxyapi up -d`.

## Configurarea instrumentelor CLI de pe gazdă când OmniRoute rulează în Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` și butonul
**Salvează configurația** din panoul de control scriu fișiere precum `~/.codex/*.config.toml`. Aceste căi
au sens doar pe mașina pe care rulează efectiv CLI-ul. Dacă le rulați în interiorul
containerului, scrierea ajunge în directorul home propriu al containerului (`/home/node` —
imaginea rulează cu `USER node`), de unde niciun CLI de pe gazdă nu o va citi vreodată și unde este
eliminată în momentul în care containerul este recreat.

OmniRoute detectează această situație și refuză scrierea, oferind instrucțiuni în loc să
raporteze un succes pe care nu îl puteți utiliza: CLI-ul se încheie cu codul `2`, iar API-ul răspunde cu `422`
și `containerEphemeralTarget: true`.

### Recomandat: rulați CLI-ul pe gazdă, iar OmniRoute în Docker

Containerul furnizează API-ul; CLI-ul configurează instrumentele de pe gazdă.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # direcționați CLI-ul către container
omniroute setup-codex                      # scrie directorul ~/.codex real de pe gazdă
```

Aceasta este alegerea corectă atunci când Codex, Claude Code, Cursor sau instrumente similare rulează pe
laptopul dvs. — aceasta fiind configurația obișnuită.

### Alternativă: montați prin bind directoarele de configurare ale gazdei (profilul `host`)

Dacă doriți ca însuși containerul să scrie configurația de pe gazdă, montați
directoarele în container și direcționați `CLI_CONFIG_HOME` către rădăcina montării. Profilul `host`
face deja acest lucru:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

O montare bind este cea care face calea de încredere: OmniRoute citește
`/proc/self/mountinfo` și permite scrierile în căile montate (și în directoarele
ai căror copii sunt puncte de montare, exact ca în structura `/host-home` de mai sus), refuzându-le
în continuare pe cele nemontate.

### Soluție de rezervă: configurați CLI-urile proprii ale containerului (utilizați cu moderație)

Când CLI-urile se află într-adevăr în interiorul containerului (profilul `cli`), scrierea
este intenționată. Transmiteți `--allow-container-write` oricărei comenzi `setup-*` sau setați
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` pentru server. Scrierea continuă
cu un avertisment că nu va supraviețui containerului.

> **Avertisment de securitate — profilul `cli` + montarea `docker.sock`.**
> Profilul `cli` montează prin bind `/var/run/docker.sock`, astfel încât utilitarul de
> actualizare automată din container să poată recrea stiva folosind demonul gazdei
> (`src/lib/system/autoUpdate.ts` verifică existența acelui socket și omite
> calea Docker atunci când acesta lipsește). Acel socket reprezintă **o limită de încredere
> cu privilegii root pe gazdă**: orice entitate care îl poate accesa controlează demonul Docker al gazdei ca
> root — poate crea, inspecta, opri și elimina orice container de pe gazdă.
> Implicații:
>
> 1. **Nu expuneți niciodată portul profilului `cli` în rețea.** Publicați-l
>    pe `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — un profil `cli` accesibil din LAN transformă orice RCE la nivelul panoului de control în
>    compromiterea completă a gazdei.
> 2. **Nu montați prin bind directoare suplimentare ale gazdei în profilul `cli`.**
>    Socketul Docker împreună cu orice montare suplimentară oferă containerului acces complet
>    de citire/scriere la sistemul dvs. de fișiere și la configurația gazdei. Dacă un instrument trebuie să
>    acceseze un proiect, rulați-l local folosind binarul CLI — nu îl montați
>    în containerul `cli`.
>
> Dacă nu aveți nevoie de actualizarea automată din container, lăsați profilul `cli` dezactivat
> (`COMPOSE_PROFILES=core,redis` sau o variantă mai scurtă). Celelalte profiluri nu
> montează socketul Docker.
>
> Consultați `docs/security/MITM-TPROXY-DECRYPT.md` (git; neinclus în versiunea compilată din `/docs`) pentru modelul de amenințări asociat
> privind MITM și `docs/security/SUPPLY_CHAIN.md` pentru lanțul de proveniență al binarelor
> `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute se bazează pe Redis pentru limitatorul distribuit de rată și memoria cache partajată. Serviciul `redis` este definit **întotdeauna** în `docker-compose.yml` (nu este condiționat de niciun profil) și pornește împreună cu orice alt profil.

| Detaliu                     | Valoare                                  |
| --------------------------- | ---------------------------------------- |
| Imagine                     | `redis:7-alpine`                         |
| Numele containerului        | `omniroute-redis`                        |
| Port intern                 | `6379`                                   |
| Port gazdă (suprascriere)   | `REDIS_PORT` (implicit `6379`)           |
| Adresă gazdă (suprascriere) | `REDIS_BIND_HOST` (implicit `127.0.0.1`) |
| Volum                       | `omniroute-redis-data` → `/data`         |
| Verificare de stare         | `redis-cli ping` (interval de 10s)       |

Variabile de mediu asociate:

- `REDIS_URL` — șirul de conexiune injectat în aplicație (`redis://redis:6379` în mod implicit).
- `REDIS_PORT` — maparea portului de pe partea gazdei pentru containerul Redis.
- `REDIS_BIND_HOST` — interfața gazdei pe care este publicat portul. Valoarea implicită este `127.0.0.1`.

> **De ce este folosit implicit loopback:** sidecar-ul rulează fără `requirepass`, iar containerele
> aplicației îl accesează prin rețeaua compose (`redis:6379`) — portul publicat există
> doar pentru instrumentele de pe gazdă (`redis-cli`, un `npm run dev` local). Publicarea pe
> `0.0.0.0` ar expune un Redis neautentificat tuturor gazdelor din rețeaua LAN. Dacă setați
> `REDIS_BIND_HOST=0.0.0.0`, adăugați și `--requirepass` la `command:` al serviciului.

**Dezactivarea Redis** nu este recomandată (limitatorul de rată va trece la o soluție de rezervă în memorie). Dacă este necesar, eliminați/comentați blocul serviciului `redis:` din `docker-compose.yml` sau scalați-l la zero:

```bash
docker compose up -d --scale redis=0
```

## Compose pentru producție

Pentru un instantaneu izolat de producție care rulează în paralel cu mediul de dezvoltare, utilizați `docker-compose.prod.yml`.

| Detaliu                        | Valoare                                                                                |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| Fișier                         | `docker-compose.prod.yml`                                                              |
| Port implicit pentru dashboard | `PROD_DASHBOARD_PORT=20130` (mapat la portul intern `${DASHBOARD_PORT:-20128}`)        |
| Port API implicit              | `PROD_API_PORT=20131`                                                                  |
| Imagine                        | `omniroute:prod` (construită din ținta `runner-cli`)                                   |
| Container Redis                | `omniroute-redis-prod` (`redis:8.6.2`, volum dedicat `redis-prod-data`)                |
| Volum de date                  | `omniroute-prod-data` (denumit, păstrat între reconstruiri)                            |
| Verificări de stare            | `node healthcheck.mjs` + `redis-cli ping`, cu `depends_on` condiționat de starea Redis |

Mod de utilizare:

```bash
# Construiți și porniți stiva de producție
docker compose -f docker-compose.prod.yml up -d --build

# Urmăriți jurnalele în timp real
docker compose -f docker-compose.prod.yml logs -f

# Opriți și eliminați stiva (păstrați volumele)
docker compose -f docker-compose.prod.yml down
```

Stiva de producție rulează în paralel cu configurația compose de dezvoltare (nume de containere, porturi și volume diferite), astfel încât puteți continua dezvoltarea locală în timp ce producția rămâne activă.

## Etapele Dockerfile

Depozitul include un Dockerfile în mai multe etape (`Dockerfile`). Sunt expuse patru etape; alegeți `target` potrivit pentru cazul dvs. de utilizare.

| Etapă         | Imagine de bază       | Scop                                                                                                                                                                                                                                                                                                                                                 |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instalează dependențele (`npm ci --legacy-peer-deps`) și rulează `npm run build` (Turbopack în mod implicit — consultați mai jos Resurse la compilare)                                                                                                                                                                                               |
| `runner-base` | `node:26-trixie-slim` | Mediu de execuție pentru producție cu rezultatul standalone Next.js. **Nu include CLI-uri ale furnizorilor.**                                                                                                                                                                                                                                        |
| `runner-cli`  | `runner-base`         | Adaugă `git`, `docker.io`, `docker-compose` și CLI-urile globale: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Alegeți această variantă pentru fluxuri de lucru cu agenți.**                                                                                                                                                 |
| `runner-web`  | `runner-base`         | Adaugă Playwright și un browser Chromium (`--with-deps`) pentru furnizorii bazați pe sesiuni web: `gemini-web`, `claude-web`, `claude-turnstile`. **Alegeți această variantă atunci când utilizați furnizorii respectivi** — imaginea simplă eșuează la procesarea solicitărilor fără aceasta (consultați nota despre `-web` din Canale de lansare). |

Compilați manual o anumită țintă:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Resurse la compilare

Trei argumente de compilare controlează consumul etapei `builder`. Acestea se aplică numai în timpul compilării —
`OMNIROUTE_MEMORY_MB` (mai jos) este un parametru separat pentru execuție.

| Argument de compilare       | Valoare implicită | Efect                                                                                                                 |
| --------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`               | `0` compilează folosind webpack. Consum maxim de memorie mai redus, dar mai lent.                                     |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`            | Limita heap-ului V8 (`--max-old-space-size`) pentru procesul `next build` lansat.                                     |
| `OMNIROUTE_BUILD_WORKERS`   | `2`               | Furnizează valoarea pentru `CIRCLE_NODE_TOTAL`; Next determină `workers = N - 1` pentru colectarea datelor paginilor. |

`OMNIROUTE_BUILD_WORKERS` este parametrul care trebuie mărit pe un sistem de compilare puternic și primul care trebuie
verificat atunci când o compilare cu resurse limitate eșuează **după** `✓ Compiled successfully`. Fiecare
proces de lucru pentru datele paginilor este un proces separat, la fel ca procesul părinte `next build`;
o reproducere pe un VPS activ (problema #7518) a măsurat valoarea RSS maximă a fiecărui proces la
~4,5 GB, independent de opțiunea pentru heap `NODE_OPTIONS` (Turbopack compilează folosind
memorie nativă/Rust din afara heap-ului V8). Valoarea implicită `2` (→ 1 proces de lucru, 2
procese în total) este dimensionată pentru sistemele de execuție găzduite de GitHub cu 16 GB / 4 vCPU pe care le
utilizează conducta de publicare. Cu `8` (→ 7 procese de lucru), sistemul de execuție a rămas fără memorie, iar
buildkit a oprit etapa cu eroarea `ResourceExhausted: ... cannot allocate memory`;
nici `3` (→ 2 procese de lucru) nu a încăput după ce RSS-ul per proces a fost măsurat
direct, în loc să fie dedus. `tests/unit/docker-build-memory-budget.test.ts`
efectuează calculele folosind valoarea măsurată și eșuează dacă oricare dintre parametri
depășește capacitatea sistemului de execuție.

Turbopack compilează folosind memorie Rust nativă care se află **în afara** heap-ului V8, astfel încât
`OMNIROUTE_BUILD_MEMORY_MB` nu o limitează. Pe o gazdă cu o limită de memorie,
compilarea este apoi oprită prin SIGKILL de mecanismul OOM fără niciun mesaj de eroare — pur și simplu
se oprește în timpul etapei `Creating an optimized production build`, ceea ce pare mai degrabă
un blocaj decât o epuizare a memoriei. Dacă gazda de compilare are resurse limitate, schimbați bundlerul:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` este activat, astfel încât `next build` rulează un proces părinte **și** un proces de lucru,
iar fiecare respectă separat `OMNIROUTE_BUILD_MEMORY_MB`. Configurați limita containerului
la aproximativ de două ori această valoare, nu o singură dată.

Măsurători efectuate pe acest arbore (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Limita containerului | Rezultat                                 |
| --------- | -------------------- | ---------------------------------------- |
| Turbopack | 8 GiB / 16 GiB       | oprit de OOM în ambele cazuri, silențios |
| webpack   | 8 GiB                | procesul de compilare oprit prin SIGKILL |
| webpack   | 12 GiB               | reușit, cu un vârf de 11,1 GiB           |

### Valori implicite la execuție

Valori implicite exportate de `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Comportamentul memoriei în Docker:

- Imaginea setează `OMNIROUTE_MEMORY_MB=1024` și derivă din aceasta `NODE_OPTIONS=--max-old-space-size=1024`.
- Procesul efectiv al serverului este pornit de lansatorul independent, care citește `OMNIROUTE_MEMORY_MB` și adaugă `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node utilizează ultima valoare repetată pentru `--max-old-space-size`, astfel încât setarea `OMNIROUTE_MEMORY_MB` controlează limita efectivă a heap-ului în Docker.
- Deoarece imaginea o setează întotdeauna, valoarea de rezervă a lansatorului, calibrată în funcție de RAM, nu se aplică niciodată în Docker. Măriți-o explicit pentru volumul de lucru (tabelul de mai jos). `2048` este în continuare prea puțin pentru `/v1/responses` al agenților de programare.

### Memorie RAM la rulare pentru agenții de programare

Valoarea implicită Docker de 1 GiB reprezintă un nivel minim pentru panoul de control și conversații ușoare, nu o dimensiune pentru producție. Corpurile lungi ale solicitărilor `POST /v1/responses` (sute de mesaje, zeci de instrumente) păstrează în memorie mai multe grafuri în timpul compresiei. Două solicitări suprapuse de aproximativ 3 MiB / 750k tokenuri au provocat oprirea V8 cu un spațiu vechi de **12 GiB** (`FATAL ERROR: Reached heap limit`) și au atins, de asemenea, limita OOM a unui cgroup de 16 GiB. Consultați [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Dimensionați **valoarea cgroup `--memory` peste dimensiunea heap-ului** — bufferele native, SQLite și datele intermediare de compresie se află în afara V8.

| Volum de lucru                                  | `OMNIROUTE_MEMORY_MB`                  | Container / cgroup                  | Observații                                                                                                  |
| ----------------------------------------------- | -------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Panou de control, o conversație ușoară          | `1024` (valoarea implicită a imaginii) | ≥2 GiB                              |                                                                                                             |
| Un agent de programare (Claude/Codex/Grok)      | `8192`                                 | ≥10 GiB                             | Sesiune individuală tipică `/v1/responses`                                                                  |
| Două solicitări lungi `/v1/responses` simultane | `10240`–`12288`                        | ≥12–16 GiB                          | Oprire V8 măsurată la un heap de aproximativ 12 GiB                                                         |
| Trei sau mai multe contexte lungi simultane     | nu pe un singur proces                 | serializare / mai multă memorie RAM | Limita implicită pentru solicitările intensive este de 1 în curs; mărirea acesteia fără RAM readuce oprirea |

`omniroute serve` pe sistem fizic calibrează aproximativ 35% din RAM (limitat la `[512, 4096]`) atunci când `OMNIROUTE_MEMORY_MB` este **nesetat**. Docker setează întotdeauna `1024`, astfel încât această calibrare nu este executată niciodată în imaginea oficială.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Variabile de mediu critice

Pe lângă valorile implicite documentate în [ENVIRONMENT.md](../reference/ENVIRONMENT.md), următoarele variabile sunt cele mai importante atunci când aplicația rulează în Docker:

| Variabilă                     | Scop                                                                                                                                                                                                                                                                               | Valoare implicită          |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Secret partajat pentru puntea WebSocket. **Obligatoriu în producție** — setați-l la un șir aleatoriu puternic.                                                                                                                                                                     | nesetat (trebuie furnizat) |
| `REDIS_URL`                   | Șir de conexiune pentru limitatorul de rată / backendul de cache                                                                                                                                                                                                                   | `redis://redis:6379`       |
| `REDIS_PORT`                  | Portul de pe gazdă pentru containerul Redis inclus                                                                                                                                                                                                                                 | `6379`                     |
| `REDIS_BIND_HOST`             | Interfața gazdei pe care este publicat portul containerului Redis inclus (interfața loopback, cu excepția cazului în care adăugați AUTH)                                                                                                                                           | `127.0.0.1`                |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Calea de pe gazdă montată în profilul `cli` la `/workspace/omniroute` pentru fluxurile de lucru de autoactualizare                                                                                                                                                                 | `.` (directorul curent)    |
| `OMNIROUTE_MEMORY_MB`         | Limita heap-ului Node la rulare pentru serverul Docker autonom; suprascrie valoarea implicită a imaginii menționată mai sus. Agenți de programare: `8192`+ (consultați [memoria RAM la rulare](#runtime-ram-for-coding-agents)).                                                   | `1024`                     |
| `DASHBOARD_PORT` / `API_PORT` | Suprascriu porturile expuse pentru panoul de control (20128) și API (20129)                                                                                                                                                                                                        | `20128` / `20129`          |
| `APP_BIND_HOST`               | Interfața gazdei pe care docker-compose publică porturile pentru panoul de control/API/WS live. Cu `REQUIRE_API_KEY=false` (valoarea implicită), `0.0.0.0` expune proxy-ul anonim `/v1` în LAN — extindeți accesul numai cu `REQUIRE_API_KEY=true` sau cu un proxy invers în față. | `127.0.0.1`                |
| `CLIPROXY_BIND_HOST`          | Interfața gazdei pe care docker-compose publică sidecar-ul `cliproxyapi` — volumul său de date conține datele de autentificare ale furnizorilor.                                                                                                                                   | `127.0.0.1`                |
| `OMNIROUTE_PLUGINS_DIR`       | Directorul pe care scanerul de pluginuri al runtime-ului îl citește și în care instalează. Setați-l când pluginurile sunt montate prin bind mount: valoarea implicită urmează `HOME`, pe care o imagine nu îl exportă neapărat.                                                    | `~/.omniroute/plugins`     |
| `OMNIROUTE_BASE_PATH`         | Subcalea URL atunci când aplicația este publicată în spatele unui proxy invers (de exemplu, `/omniroute`)                                                                                                                                                                          | _(gol = rădăcină)_         |
| `NEXT_PUBLIC_BASE_URL`        | Originea publică din browser, inclusiv subcalea (de exemplu, `https://host/omniroute`)                                                                                                                                                                                             | nesetat                    |
| `PROD_DASHBOARD_PORT`         | Portul de pe gazdă pentru panoul de control din `docker-compose.prod.yml`                                                                                                                                                                                                          | `20130`                    |
| `CLIPROXYAPI_PORT`            | Portul de pe gazdă pentru sidecar-ul `cliproxyapi`                                                                                                                                                                                                                                 | `8317`                     |

## Proxy invers pe o subcale (Traefik / nginx)

`basePath` din Next.js este compilat în pachetul autonom. OmniRoute înregistrează valoarea
încorporată într-un fișier santinelă din rădăcina aplicației (scris în timpul executării
`npm run build`; citit de `scripts/docker/ensure-docker-base-path.mjs`) și o compară cu
`OMNIROUTE_BASE_PATH` la pornirea containerului. Atunci când valorile diferă, iar imaginea
a fost construită pentru rădăcina domeniului, punctul de intrare rescrie manifestele autonome,
literalii `basePath`/`assetPrefix` încorporați (Next 16 redă URL-urile resurselor SSR exclusiv
din `assetPrefix` — utilitarul de corecție copiază subcalea și în acesta), URL-urile resurselor
`/_next/static` încorporate (manifestele referințelor clientului, importurile media, paginile
de eroare prerandate) și substitutul `process.env` al clientului înainte de rularea
`node dev/run-standalone.mjs`.

### Construire cu Compose (recomandat)

Setați ambele variabile în `.env`, apoi reconstruiți, astfel încât imaginea și mediul de execuție să corespundă:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` transmite `OMNIROUTE_BASE_PATH` atât ca argument de construire Docker, cât și ca
variabilă de mediu în timpul execuției.

### Imagine preconstruită pentru rădăcină + subcale la execuție

Imaginile publicate `diegosouzapw/omniroute:*` sunt construite pentru rădăcina domeniului. Puteți totuși
seta `OMNIROUTE_BASE_PATH` în timpul execuției; containerul aplică o singură dată corecțiile asupra pachetului, la pornire.
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

Verificarea stării Docker sondează endpointul simplificat de ciclu de viață `/healthz`, prefixat
cu valoarea activă `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` rămâne disponibil pentru
diagnosticare manuală/prin panoul de control; pentru a redirecționa verificarea HEALTHCHECK a containerului către acesta (de exemplu,
pentru impunerea unei verificări aprofundate a stării), setați `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Această cale efectuează o verificare **aprofundată** (baza de date + rezumatul monitorizării) — adecvată pentru
verificarea `HEALTHCHECK` rară a Docker dacă optați din nou pentru aceasta, dar **nu** pentru intervalele
`livenessProbe` din Kubernetes.

Pentru orchestratoare (Kubernetes, Nomad etc.):

| Sondă                  | Preferabil                                                               | De evitat                                                                               |
| ---------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| Disponibilitate        | HTTP `GET /livez` sau TCP pe portul principal (`PORT`, implicit `20128`) | `/api/monitoring/health` ca verificare a disponibilității                               |
| Pregătire              | HTTP `GET /healthz`                                                      | Timpi-limită stricți care tratează o buclă de evenimente ocupată ca fiind nefuncțională |
| Aprofundată / blackbox | `/api/monitoring/health`                                                 | —                                                                                       |

`/healthz` raportează ciclul de viață al procesului (`ok` / `starting` / `stopping`). `/livez` indică
doar că procesul este activ (200 ori de câte ori handlerul poate rula; nu așteaptă
starea de pregătire). Ambele rulează în continuare pe aceeași buclă de evenimente Node ca procesarea cererilor, astfel încât
operațiunile intensive pe CPU pentru catalog sau compresie le pot întârzia — ocupat ≠ nefuncțional. Preferați verificarea
disponibilității prin TCP dacă sondele HTTP expiră. Ghid complet pentru sonde:
[Ghid de monitorizare — recomandări pentru sondele Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose cu Caddy (HTTPS Auto-TLS)

OmniRoute poate fi expus în siguranță folosind configurarea SSL automată oferită de Caddy. Asigurați-vă că înregistrarea DNS A a domeniului indică spre adresa IP a serverului.

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
      # Originea vizibilă pentru browser, utilizată pentru callback-urile OAuth, linkurile panoului de control și URL-urile publice generate.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL intern între servere, utilizat pentru sarcinile programate / solicitările către sine.
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

Caddy setează anteturile standard de redirecționare pentru containerul din amonte. OmniRoute utilizează
`NEXT_PUBLIC_BASE_URL` drept origine publică canonică pentru callback-urile OAuth și linkurile publice
generate; operațiunile de scriere autentificate din panoul de control utilizează solicitări de aceeași origine și protecție CSRF
asociată sesiunii. Activați `OMNIROUTE_TRUST_PROXY` numai pentru implementările avansate în care doriți în mod intenționat
ca OmniRoute să determine originea publică din anteturile de redirecționare de încredere, în locul unei configurații
explicite.

## Tunel rapid Cloudflare

Suportul panoului de control pentru implementările Docker include un **tunel rapid Cloudflare** cu un singur clic în `Dashboard → Endpoints`. La prima activare, `cloudflared` este descărcat numai atunci când este necesar, este pornit un tunel temporar către endpointul `/v1` curent, iar URL-ul `https://*.trycloudflare.com/v1` generat este afișat direct sub URL-ul public obișnuit.

Panourile pentru tunelurile endpointurilor (Cloudflare, Tailscale, ngrok) pot fi afișate sau ascunse din `Settings → Appearance` fără a modifica starea tunelurilor active.

### Note despre tuneluri

- URL-urile tunelurilor rapide sunt temporare și se modifică după fiecare repornire.
- Tunelurile rapide nu sunt restaurate automat după repornirea OmniRoute sau a containerului. Reactivați-le din panoul de control atunci când este necesar.
- Instalarea gestionată acceptă în prezent Linux, macOS și Windows pe `x64` / `arm64`.
- Tunelurile rapide gestionate folosesc implicit transportul HTTP/2 pentru a evita avertismentele zgomotoase privind memoria tampon UDP pentru QUIC în mediile de containere cu resurse limitate. Setați `CLOUDFLARED_PROTOCOL=quic` sau `auto` dacă doriți un alt tip de transport.
- Imaginile Docker includ certificatele CA rădăcină ale sistemului și le transmit către instanța `cloudflared` gestionată, ceea ce evită erorile de încredere TLS atunci când tunelul este inițializat în interiorul containerului.
- Setați `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` dacă doriți ca OmniRoute să utilizeze un binar existent în loc să descarce unul.

## Etichete de imagine

| Imagine                  | Etichetă | Dimensiune | Descriere                                                                    |
| ------------------------ | -------- | ---------- | ---------------------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB     | Cea mai recentă versiune SemVer stabilă **publicată** (nu ramura git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB     | Fixați această clasă de etichete pentru GitOps                               |

Manifest multi-platformă: suport nativ pentru `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker selectează automat arhitectura corespunzătoare; transmiteți `--platform linux/amd64` dacă trebuie să forțați emularea AMD64 pe gazde ARM.

### Canale de lansare

OmniRoute publică separat canale Docker pentru versiuni stabile, testarea ramurii active de lansare și compilări de dezvoltare.

| Canal                           | Sursă                                                 | Mutabilitate                     | Utilizare recomandată                                                                                                                       |
| ------------------------------- | ----------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Versiune semnată/cu număr de versiune                 | Imuabil                          | Implementări în producție care fixează o versiune exactă                                                                                    |
| `:latest` / `:latest-web`       | Cea mai recentă versiune SemVer stabilă **publicată** | Indicator stabil mutabil         | Urmărește versiunile stabile **după** o operațiune de publicare SemVer — **nu** urmărește `main` sau commiturile nelansate din `release/v*` |
| `:next` / `:next-web`           | Ramura implicită curentă `release/v*`                 | Indicator de pre-lansare mutabil | Testarea corecțiilor care au ajuns în ramura activă de lansare, dar nu sunt încă incluse într-o versiune stabilă                            |
| `:main` / `:main-web`           | Ramura `main`                                         | Indicator de dezvoltare mutabil  | Numai pentru dezvoltare și testare de integrare                                                                                             |

#### Furnizori de sesiuni web: imaginile `-web`

Fiecare canal de mai sus are și o etichetă `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), construită din etapa `runner-web` — aceeași imagine, plus Playwright și un browser Chromium. Imaginea obișnuită este livrată **fără** Chromium; `gemini-web`, `claude-web` și `claude-turnstile` au nevoie de acesta.

Eroarea este amânată, nu apare la pornire: acești furnizori își afișează modelele și apar drept conectați în panoul de control, iar numai prima solicitare eșuează cu

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Dacă utilizați acești furnizori, descărcați eticheta `-web` a canalului pe care îl utilizați deja — nimic altceva nu se schimbă. Pentru o instalare npm/CLI (fără imagine Docker), componenta echivalentă care lipsește este binarul browserului: rulați `npx playwright install chromium` pe gazdă.

#### Utilizarea canalului de pre-lansare

Canalul `next` este reconstruit la fiecare push către ramura implicită curentă `release/v*` și este publicat atât pentru AMD64, cât și pentru ARM64. Ramurile de mentenanță mai vechi nu îl pot suprascrie. Canalul oferă o imagine care poate fi descărcată pentru corecțiile care au fost îmbinate în ramura activă de lansare înainte de crearea următoarei etichete stabile.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Pentru Docker Compose, suprascrieți eticheta imaginii utilizată de profilul selectat, apoi descărcați imaginea și recreați serviciul:

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

`next` este un canal de pre-lansare dinamic. Se poate schimba la orice push către ramura activă de lansare și **nu este acceptat pentru utilizare în producție**. Fixați digestul imaginii atunci când evaluați o anumită compilare:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Înainte de testare, creați o copie de siguranță a volumului de date OmniRoute sau a directorului de date montat prin bind. Pentru a reveni, restaurați versiunea stabilă sau digestul utilizat anterior și recreați containerul:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

O compilare a ramurii de lansare nu poate muta niciodată `latest`; numai o versiune semantică stabilă eligibilă poate promova indicatorul stabil. Imaginile `next` păstrează inspecția imaginii de lansare și pragul de blocare pentru vulnerabilități CRITICAL.

**`latest` nu garantează actualitatea față de git.** Corecțiile îmbinate în `main` sau în ramura activă `release/v*` **nu** sunt incluse în `:latest` până când nu este publicată o imagine SemVer stabilă, iar operațiunea de publicare nu promovează `:latest` (același digest ca versiunea SemVer respectivă). Dacă `latest` pare nemodificat, deși GitHub afișează deja corecția, descărcați `:next` pentru a testa ramura de lansare sau așteptați eticheta SemVer.

| Doriți                                                                                | Utilizați                               |
| ------------------------------------------------------------------------------------- | --------------------------------------- |
| GitOps / producție care nu trebuie să devieze                                         | Fixați `:X.Y.Z` (sau digestul imaginii) |
| Să urmăriți versiunile stabile publicate și să acceptați recrearea la fiecare lansare | `:latest`                               |
| Să testați commiturile nelansate din `release/v*`                                     | `:next` (nu pentru producție)           |
| Să testați `main`                                                                     | `:main` (nu pentru producție)           |

## Disponibilitate: SQLite implicit acceptă o singură replică

Configurația standard Docker / Kubernetes pentru OmniRoute este **un proces Node + un singur proces de scriere SQLite**. Disponibilitatea ridicată **nu este acceptată** în această topologie.

| Constrângere                                       | Consecință                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Un singur proces de scriere                        | **Nu** rulați mai multe replici pe același fișier SQLite. Acest lucru corupe baza de date.                                                                                                                                                                                                                                                                                                                    |
| Recreare / repornire / oprire de către HEALTHCHECK | **Întrerupere completă** a conexiunilor SSE în curs, a sesiunilor din tabloul de bord și a stării din memorie. Toți clienții conectați sunt deconectați. Solicitările noi din intervalul în care nu există niciun endpoint primesc de la proxy-ul invers răspunsul **`502 Bad Gateway: Unknown error`**, nu JSON OmniRoute — clienții nu pot diferenția această situație de o eroare a furnizorului (#11015). |
| Aceeași buclă de evenimente ca `/healthz`          | Un ciclu solicitant de catalogare sau compresie poate întârzia verificările; un timeout scurt repornește apoi **singura** replică.                                                                                                                                                                                                                                                                            |

**Matricea verificărilor** (consultați și [Recomandări pentru verificările Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Verificare            | Țintă                                                         | Nu utilizați                                                                          |
| --------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Stare activă          | TCP pe `PORT` (implicit `20128`) sau HTTP permisiv `/healthz` | `/api/monitoring/health`                                                              |
| Disponibilitate       | HTTP `GET /healthz`                                           | Timeouturi stricte care tratează o buclă de evenimente ocupată ca fiind nefuncțională |
| Aprofundată / manuală | `/api/monitoring/health`                                      | Verificarea automată a stării active de către kubelet                                 |

**Upgrade-uri:** așteptați-vă ca fiecare sesiune să fie întreruptă. Drenați clienții dacă puteți; configurația SQLite implicită nu permite actualizări progresive. Combinația dintre `restart: unless-stopped` din Compose și `HEALTHCHECK` din Docker va înlocui, de asemenea, singurul proces atunci când containerul este Unhealthy — cu aceeași rază de impact.

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

Pauza `preStop` permite sistemului kube să elimine endpointurile serviciului înainte de SIGTERM, astfel încât traficul **nou** să nu mai ajungă la procesul care se închide. Conexiunile SSE `/v1/responses` în curs sunt drenate timp de până la `SHUTDOWN_TIMEOUT_MS` (implicit 30s) prin permisiuni de acces cu cost ridicat (#11015). Solicitările noi care ajung totuși la proces primesc `503` + `Retry-After: 5`. Intervalul Recreate fără endpointuri, până când înlocuitorul devine Ready, rămâne o întrerupere totală — aceasta este o caracteristică a topologiei SQLite, nu o configurare greșită a verificărilor.

HA cu Postgres extern / mai multe procese de scriere **nu** este o configurație standard documentată. Dacă aveți nevoie de HA, păstrați o singură replică sau rulați o topologie pe care proiectul a testat-o și documentat-o separat. Lucrările pentru Postgres/MySQL sunt urmărite în [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Până la finalizarea acestora, singura modalitate acceptată de a multiplica capacitatea pentru solicitări `/v1/responses` **mari** este utilizarea a N procese independente (secțiunea următoare), nu `replicas > 1` pe un singur volum.

## Scalare orizontală: N procese independente

Un proces Node înseamnă **un heap V8**. Două cereri suprapuse ale agentului de programare, de aproximativ 3 MiB / aproximativ 750k tokenuri, către `POST /v1/responses` (RTK + Caveman) opresc acel heap la aproximativ 12 Gi (`FATAL ERROR: Reached heap limit`) și pot provoca OOM într-un cgroup de 16 Gi. Consultați [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Această măsurătoare este un avertisment privind **bugetul de memorie**, nu o limită maximă strictă a produsului de două cereri lungi `/v1/responses` simultane. Admiterea conversațiilor cu consum ridicat de resurse este controlată de un buget de octeți pentru ingestie, derivat automat (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), dimensionat pornind de la aceeași limită V8/cgroup — suprascrierea sa cu o valoare mai mare (sau setarea limitei vechi `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`, bazată pe numărul de cereri) într-un proces deja dimensionat reintroduce oprirea. Conversațiile mici, `/healthz`, `/v1/models` și MCP **nu** sunt incluse în această limită.

### Un singur proces: mai mult de două cereri lungi `/v1/responses`

Un proces **sănătos** (heap sub `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, implicit `0.75`) **poate** rula mai mult de două cereri lungi simultane către `POST /v1/responses` atunci când bugetul de octeți în curs de procesare la nivelul întregului proces (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) încă are spațiu disponibil. Corpurile cu dimensiunea cel puțin egală cu `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (implicit 256 KiB) preiau aceeași concesiune pentru sarcini grele ca cererile cu structură complexă și folosesc aceeași cale alternativă `tryAcquireHealthyHeadroom` din [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Zeci de clienți SSE cu conexiuni lungi simultane (operatorii au adesea nevoie de 40–50) reprezintă o problemă de **buget de memorie** — dimensionați heap-ul + sloturile principale/de rezervă + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — nu o limită strictă a produsului de „maximum 2”. Un heap aflat sub presiune continuă să respingă cereri cu un răspuns `503` reîncercabil, astfel încât problema #7849 să nu reapară.

Pentru a **multiplica heap-urile** (spații V8 vechi independente) **astăzi**:

| Faceți                                                                                                                                                                                                 | Nu faceți                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Rulați **N containere/poduri**, fiecare cu propriul `DATA_DIR` / volum                                                                                                                                 | Setați `replicas > 1` pentru același fișier SQLite                                               |
| Dimensionați cererile grele în curs + rezerva pentru stare sănătoasă pe baza heap-ului / bugetului de octeți în curs; 1–2 este valoarea implicită prudentă din #7849, nu o limită strictă a produsului | Alocați unui singur proces de 8× mai mult RAM și o limită nelimitată a numărului de cereri       |
| Opțional: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` pentru **contoare de cotă partajate**                                                                                                   | Tratați Redis drept SQLite partajat — nu este                                                    |
| Duplicați secretele furnizorilor în fiecare instanță (sau acceptați panouri de control partiționate)                                                                                                   | Vă așteptați la un singur panou de control / un singur jurnal de apeluri pentru toate instanțele |
| Plasați orice echilibrator de sarcină în față; persistența pe baza cheii API sau a sesiunii este suficientă                                                                                            | Impuneți un middleware specific unui furnizor, care ține cont de dimensiune                      |

Hardware: numărul de cereri lungi simultane `/v1/responses` per instanță este o problemă de **buget de memorie** (heap + octeți în curs / #10110). `N` directoare `DATA_DIR` independente multiplică în continuare heap-urile: memoria RAM a gazdei trebuie să acopere `N × cgroup`, nu „un pod de 16 Gi cu N=8”. Nu utilizați niciodată `replicas > 1` pentru același fișier SQLite.

Schiță Compose (două heap-uri, două volume — nu `deploy.replicas: 2`):

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

Densitatea în cadrul procesului (compresia în afara izolatului HTTP) este tratată în [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Un singur cluster logic pe o stare persistentă partajată este tratat în [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Note importante

- **Modul WAL SQLite:** Comanda `docker stop` trebuie lăsată să se finalizeze, astfel încât OmniRoute să poată efectua checkpoint-ul celor mai recente modificări în `storage.sqlite`. Fișierele Compose incluse stabilesc deja o perioadă de grație de 40s pentru oprire. Dacă rulați imaginea direct, păstrați `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Setați la `true` dacă backupurile de rutină/dinaintea scrierii sunt gestionate extern. Migrările bazelor de date existente necesită în continuare propriul snapshot persistent de siguranță și mecanismul de protecție pentru migrările în masă.
- **Persistența datelor:** Montați întotdeauna un volum la `/app/data` pentru a păstra baza de date, cheile și configurațiile la repornirea containerelor.
- **Configurarea portului:** Suprascrieți variabila de mediu `PORT` pentru a schimba portul implicit `20128`.

## Consultați și

- [Ghid de implementare pe VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Configurare VM + nginx + Cloudflare
- [Ghid de implementare pe Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Implementare pe Fly.io
- [Configurarea mediului](../reference/ENVIRONMENT.md) — Referința completă pentru `.env`
