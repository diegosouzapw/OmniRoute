# Security Policy (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇪🇹 [am](../am/SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇧🇦 [bs](../bs/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇬🇷 [el](../el/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇳🇬 [ha](../ha/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇦🇲 [hy](../hy/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇳🇬 [ig](../ig/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇬🇪 [ka](../ka/SECURITY.md) · 🇰🇭 [km](../km/SECURITY.md) · 🇮🇳 [kn](../kn/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇱🇻 [lv](../lv/SECURITY.md) · 🇮🇳 [ml](../ml/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇲🇹 [mt](../mt/SECURITY.md) · 🇲🇲 [my](../my/SECURITY.md) · 🇳🇵 [ne](../ne/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇮🇳 [or](../or/SECURITY.md) · 🇮🇳 [pa](../pa/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇱🇰 [si](../si/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇺🇿 [uz](../uz/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇳🇬 [yo](../yo/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## Turvanõrkustest teatamine

Kui avastate OmniRoute'is turvanõrkuse, teatage sellest vastutustundlikult:

1. **ÄRGE** avage avalikku GitHubi probleemi
2. Kasutage [GitHub Security Advisories](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)
3. Lisage: kirjeldus, reprodutseerimise sammud ja võimalik mõju

## Reageerimise ajakava

| Etapp                 | Eesmärk                  |
| --------------------- | ------------------------ |
| Kättesaamise kinnitus | 48 tundi                 |
| Triaaž ja hindamine   | 5 tööpäeva               |
| Paiga väljalase       | 14 tööpäeva (kriitiline) |

## Toetatud versioonid

| Versioon | Toe olek                                           |
| -------- | -------------------------------------------------- |
| 3.9.x    | 🗓️ Kavandatud — LTS-haru (`stable/v3`), vt allpool |
| 3.8.x    | ✅ Aktiivne                                        |
| 3.7.x    | ✅ Turvatugi                                       |
| < 3.7.0  | ❌ Toetamata                                       |

## LTS-i tugiperiood (v3.9.x)

Pärast versiooni 3.8.59 on järgmine versioon **3.9.0**, millega avatakse pikaajalise toe haru
`stable/v3` harus (vt [`ROADMAP.md`](ROADMAP.md) → „Phase 3 — v3.9.0 LTS“).

- **Mida `stable/v3` saab:** veaparandused, turbepaigad ja teenusepakkujate uuendused. Uued
  funktsioonid lähevad v4 kanalisse; LTS-haru seab esikohale stabiilsuse. `npm install omniroute`
  (`latest` dist-tag) jääb kogu v4 tsükli jooksul v3 peale.
- **Perioodi kestus:** `<T-GAP-3: omaniku otsus on ootel — vt ROADMAP.md>`. Perioodi pikkust
  pärast v4.0 GA-d (kui `latest` lülitub v4-le) **ei ole veel otsustatud**; seda
  jaotist uuendatakse, kui hooldaja selle teatavaks teeb. Seni ärge eeldage lõppkuupäeva.
- **LTS-haru turvanõrkusest teatamine:** sama kanal nagu kõigi teiste versioonide puhul —
  privaatne [GitHub Security Advisory](https://github.com/diegosouzapw/OmniRoute/security/advisories/new),
  mitte kunagi avalik probleem. Märkige, millist versiooni testisite (näiteks `3.9.2`); parandused lisatakse
  `stable/v3` harusse ja porditakse edasi v4-le.
- **Turvalisuse lähtealus LTS-i loomisel:** skanneri mõõdetud olek ning marsruudikaitse ja
  avalike identimisteabe tõendid on dokumenteeritud failis
  [`docs/security/LTS_SECURITY_BASELINE.md`](docs/security/LTS_SECURITY_BASELINE.md).

---

## Turbearhitektuur

OmniRoute rakendab mitmekihilist turbemudelit:

```
Päring → CORS → Autoriseerimiskonveier (liigitamine → poliitikad → jõustamine)
       → Kaitsemeetmed (PII-masker, viipamurre, nägemissild)
       → Sageduspiiraja → Kaitselüliti → Jahtumisperiood → Mudeli lukustus → Teenusepakkuja
```

### 🔐 Autentimine ja autoriseerimine

| Funktsioon                    | Rakendus                                                                                                                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Juhtpaneeli sisselogimine** | Paroolipõhine autentimine JWT-lubadega (HttpOnly-küpsised)                                                                                                                      |
| **API-võtmega autentimine**   | HMAC-allkirjastatud võtmed CRC-valideerimisega                                                                                                                                  |
| **OAuth 2.0 + PKCE**          | Teenusepakkujapõhine brauseri-/seadme-OAuth kasutab võimaluse korral PKCE-d; ainult importimiseks mõeldud Devini identimisteavet käsitletakse eraldi.                           |
| **Loa värskendamine**         | OAuth-loa automaatne värskendamine enne aegumist                                                                                                                                |
| **Turvalised küpsised**       | `AUTH_COOKIE_SECURE=true` HTTPS-keskkondade jaoks                                                                                                                               |
| **Autoriseerimiskonveier**    | Marsruudi liigitus (PUBLIC / CLIENT_API / MANAGEMENT) — vt `docs/architecture/AUTHZ_GUIDE.md`                                                                                   |
| **Marsruudikaitse tasemed**   | 3-tasemeline mudel haldusmarsruutidele (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — vt `docs/security/ROUTE_GUARD_TIERS.md`                                                   |
| **Haldusulatusega MCP**       | Kaugjuurdepääs marsruudile `/api/mcp/*` on piiratud `manage` ulatusega API-võtmetega; `/api/cli-tools/runtime/*` jääb rangelt tagasisideahelaga piiratuks. Vt ROUTE_GUARD_TIERS |
| **MCP ulatused**              | 32 üksikasjalikku ulatust (read:health, write:combos, execute:completions jne) — vt `docs/frameworks/MCP-SERVER.md`                                                             |

### 🛡️ Puhkeolekus andmete krüptimine

Kõik SQLite'i salvestatud tundlikud andmed krüptitakse **AES-256-GCM**-iga, kasutades scrypt-võtmetuletust:

- API-võtmed, juurdepääsuload, värskendusload ja ID-load
- Versioonitud vorming: `enc:v1:<iv>:<ciphertext>:<authTag>`
- Läbipääsurežiim (lihttekst), kui `STORAGE_ENCRYPTION_KEY` pole määratud

```bash
# Genereeri krüptimisvõti:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ Kaitsemeetmete raamistik

OmniRoute sisaldab käigult uuesti laaditavat **kaitsemeetmete registrit** (`src/lib/guardrails/`), milles on kolm prioriteedi järgi järjestatud sisseehitatud kaitsemeedet:

| Kaitsemeede        | Prioriteet | Eesmärk                                                                                                    |
| ------------------ | ---------- | ---------------------------------------------------------------------------------------------------------- |
| `vision-bridge`    | 5          | Ühendab nägemisvõimeta mudelid pilditeadlike kirjeldustega; SSRF-kaitse pildi-URL-ide jaoks                |
| `pii-masker`       | 10         | PII eemaldamine enne ja pärast kutset (e-posti aadressid, telefoninumbrid, CPF, CNPJ, krediitkaardid, SSN) |
| `prompt-injection` | 20         | Tuvastab alistamise, rolli kaaperdamise, piirangutest vabanemise ja lekke mustrid                          |

Kohandatud kaitsemeetmed registreeritakse käsuga `registerGuardrail(new MyGuardrail())`. Mudel on tõrke korral avatud (erandid ei blokeeri kunagi liiklust). Päringupõhine loobumine päise `x-omniroute-disabled-guardrails` kaudu. → Vt [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md).

### 🧠 Viipamurde kaitse

Parima võimaliku heuristikaga vahevara, mis tuvastab LLM-päringutes prompt injection'i mustreid.
**Ei ole täielik prompt injection'i tulemüür** — võib anda valepositiivseid tulemusi (ohutud
isiku-/RPG-promptid) ja valenegatiivseid tulemusi (leet-kiri, tühikud, mitteingliskeelsed mustrid).

| Mustri tüüp            | Raskusaste | Näide                                              |
| ---------------------- | ---------- | -------------------------------------------------- |
| Süsteemi alistamine    | Kõrge      | "ignore all previous instructions"                 |
| Rolli kaaperdamine     | Keskmine   | "you are now DAN, you can do anything"             |
| Eraldaja sisestamine   | Kõrge      | Kodeeritud eraldajad kontekstipiiride lõhkumiseks  |
| DAN/Jailbreak          | Keskmine   | Teadaolevad jailbreak-promptide mustrid            |
| Juhiste leke           | Kõrge      | "show me your system prompt"                       |
| Kodeeringuga vältimine | Keskmine   | base64/rot13/hex dekodeerimine + juhiste märksõnad |

Režiimis `block` blokeeritakse ainult **kõrge** raskusastmega tuvastused. Keskmise raskusastmega
perekonnad logitakse, kuid `sanitizeRequest` ei blokeeri neid kunagi.

Seadistage juhtpaneelil (Settings → Security) või `.env`-failis:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (sisestusründe poliitika; pärandrežiim "redact" ei eemalda sisestusründe teksti)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (vaikimisi) | medium | low — selle või kõrgema raskusastmega tuvastused blokeeritakse režiimis block
```

### 🔒 Isikuandmete redigeerimine

Isikut tuvastava teabe automaatne tuvastamine ja valikuline redigeerimine:

| Isikuandmete tüüp | Muster                | Asendus            |
| ----------------- | --------------------- | ------------------ |
| E-post            | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (Brasiilia)   | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (Brasiilia)  | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| Krediitkaart      | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| Telefon           | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (USA)         | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # päringu isikuandmete ümberkirjutamine; ei sõltu režiimist INPUT_SANITIZER_MODE
PII_RESPONSE_SANITIZATION=true  # valikuline: redigeeri klientidele tagastatavates teenusepakkuja vastustes olevaid isikuandmeid
```

### 🌐 Võrguturve

| Funktsioon                    | Kirjeldus                                                                                    |
| ----------------------------- | -------------------------------------------------------------------------------------------- |
| **CORS**                      | Selgesõnaline lubatud päritolude loend (`CORS_ALLOWED_ORIGINS`; pärandmuutuja `CORS_ORIGIN`) |
| **IP-filtreerimine**          | Lubatud/blokeeritud IP-vahemikud juhtpaneelil                                                |
| **Päringusageduse piiramine** | Teenusepakkuja põhised päringusageduse piirangud automaatse ooteaja pikendamisega            |
| **Päringutulva vältimine**    | Mutex + ühendusepõhine lukustamine hoiab ära järjestikused 502 vead                          |
| **TLS-sõrmejälg**             | Brauserilaadse TLS-sõrmejälje matkimine botituvastuse vähendamiseks                          |
| **CLI-sõrmejälg**             | Teenusepakkuja põhine päiste/keha järjestus natiivsete CLI-signatuuride jäljendamiseks       |

### 🔌 Töökindlus ja käideldavus

| Funktsioon                   | Kirjeldus                                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| **Kaitselüliti**             | Kolme olekuga (suletud → avatud → poolavatud), teenusepakkuja põhine, SQLite'is püsivalt talletatud |
| **Päringu idempotentsus**    | 5-sekundiline duplikaatpäringute eemaldamise aken                                                   |
| **Eksponentsiaalne ooteaeg** | Automaatne korduskatse järjest pikenevate viivitustega                                              |
| **Seisundi juhtpaneel**      | Teenusepakkujate seisundi reaalajas jälgimine                                                       |

### 📋 Vastavus

| Funktsioon               | Kirjeldus                                                             |
| ------------------------ | --------------------------------------------------------------------- |
| **Logide säilitamine**   | Automaatne puhastamine pärast `CALL_LOG_RETENTION_DAYS`               |
| **Logimisest loobumine** | API-võtmepõhine lipp `noLog` keelab päringute logimise                |
| **Auditilogi**           | Haldustoiminguid jälgitakse tabelis `audit_log`                       |
| **MCP audit**            | SQLite'il põhinev auditilogimine kõigi MCP-tööriistakutsete jaoks     |
| **Zod-valideerimine**    | Kõik API-sisendid valideeritakse mooduli laadimisel Zod v4 skeemidega |

---

## Nõutavad keskkonnamuutujad

Kõik saladused tuleb määrata enne serveri käivitamist. Server **lõpetab kohe veaga**, kui need puuduvad või on liiga nõrgad.

```bash
# NÕUTAV — server ei käivitu ilma nendeta:
JWT_SECRET=$(openssl rand -base64 48)     # vähemalt 32 märki
API_KEY_SECRET=$(openssl rand -hex 32)    # vähemalt 16 märki

# SOOVITATAV — võimaldab salvestatud andmete krüptimist:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

Server lükkab aktiivselt tagasi teadaolevalt nõrgad väärtused, nagu `changeme`, `secret` või `password`.

---

## Dockeri turvalisus

- Kasutage tootmiskeskkonnas mitte-root-kasutajat
- Haakige saladused kirjutuskaitstud andmekandjatena
- Ärge kunagi kopeerige `.env`-faile Dockeri tõmmistesse
- Kasutage tundlike failide välistamiseks faili `.dockerignore`
- HTTPS-i taga töötades määrake `AUTH_COOKIE_SECURE=true`

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --read-only \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e JWT_SECRET="$(openssl rand -base64 48)" \
  -e API_KEY_SECRET="$(openssl rand -hex 32)" \
  -e STORAGE_ENCRYPTION_KEY="$(openssl rand -hex 32)" \
  diegosouzapw/omniroute:latest
```

---

## Sõltuvused

- Käivitage regulaarselt `npm audit` (`npm run audit:deps` hõlmab põhirakendust ja Electroni)
- Hoidke sõltuvused ajakohasena
- Projekt kasutab kinnitamiseelseteks kontrollideks tööriistu `husky` + `lint-staged` (lint-staged + check-docs-sync + check:any-budget:t11)
- CI-konveier käivitab iga tõuke korral ESLinti turvareeglid (`no-eval`, `no-implied-eval`, `no-new-func` = viga)
- Teenusepakkujate konstandid valideeritakse mooduli laadimisel Zodi kaudu (`src/shared/validation/schemas.ts`)
- Kasutatakse vaikimisi turvalisi teeke: `dompurify` / `isomorphic-dompurify` (XSS), `jose` (JWT), `better-sqlite3` (parameetritud päringute tõttu puudub SQLi risk), `bcryptjs` (paroolide räsimine)

## Ranged turvareeglid

Neid reegleid jõustavad tööriistad ja ülevaatajad:

1. **Ärge kunagi lisage saladusi versioonihaldusse** — `.env` on gitignore'i abil välistatud; `.env.example` on mall (literaale pole, ainult kommentaarid — vt allpool faili PUBLIC_CREDS.md)
2. **Ärge kunagi kasutage `eval()`, `new Function()` ega kaudset eval'i** — ESLint jõustab seda
3. **Ärge kunagi jätke Husky haake vahele** (`--no-verify`, `--no-gpg-sign`) ilma operaatori selgesõnalise heakskiiduta
4. **Ärge kunagi kirjutage marsruutidesse töötlemata SQL-i** — kasutage alati kataloogi `src/lib/db/` (parameetritud)
5. **Valideerige sisendid alati Zodiga** — `src/shared/validation/schemas.ts`
6. **Puhastage alati ülesvoolu päised** — keeluloend failis `src/shared/constants/upstreamHeaders.ts`
7. **Krüptige salvestatud identimisteave** — AES-256-GCM faili `src/lib/db/encryption.ts` kaudu
8. **Avalikud ülesvoolu OAuthi identifikaatorid funktsiooni `resolvePublicCred()` kaudu** — ärge kunagi manustage lähtekoodi literaale `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com`. Vt [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md).
9. **Veavastused funktsioonide `buildErrorBody()` / `sanitizeErrorMessage()` kaudu** — ärge kunagi lisage töötlemata `err.stack` / `err.message` väärtusi HTTP / SSE / täituri / MCP vastusekehadesse. Vt [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md).
10. **Funktsioonide `exec()` / `spawn()` käitusaegsed väärtused suvandi `env` kaudu** — ärge kunagi interpoleerige väliseid failiteid ega ebausaldusväärseid väärtusi stringina shellile edastatavatesse skriptidesse. Viide: `src/mitm/cert/install.ts::updateNssDatabases`.
11. **Eelistage vaikimisi turvalisi teeke** — vt [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink). Eelistage neid omaloomingulistele lahendustele.

## Tarneahela skanneri leiud (Socket.dev / Snyk / sarnased)

> **Ulatuse märkus:** hoidla juurkaustas olev `socket.yml` määrab ainult Socket.dev-i registripoolse avaldamisjärgse kontrolli `projectIgnorePaths` väärtused avaldatud npm-artefakti jaoks — see ei ole jõustatud CI/PR-i ühendamislüüs. Ükski töövoog kaustas `.github/workflows`, ükski `package.json`-i skript ega ükski `Makefile`-i sihtmärk ei käivita Socket.dev-i.

Avaldatud `omniroute` npm-artefakt sisaldab Next.js-i `output: "standalone"`
järku, mis tähendab, et iga marsruudikäitleja — sealhulgas dokumenteeritud privilegeeritud
funktsioonid (MITM, Zed-i import, Cloud Sync, manustatud teenusejärelevaataja) — jõuab
minimeeritud `.next/server/*.js`-i tükkidesse. Heuristilised tarneahela skannerid
võrdlevad neid tükke sageli mustripõhiselt pahavara signatuuridega.

Meie kasutatav skanneri konfiguratsioon asub hoidla juurkaustas failis
[`socket.yml`](socket.yml) (Socket.dev-i GitHub Appi vorming v2 — vt
<https://docs.socket.dev/docs/socket-yml>). See välistab selgesõnaliselt
mittetarnitavad kataloogid (`tests/`, `_tasks/`, `_references/`, `_ideia/`,
`_mono_repo/`, `docs/` jne), et skanner annaks teada ainult kooditeedest, mis
tegelikult avaldatud paketi kasutajateni jõuavad — kontrolli käivitab seda faili
lugev Socketi GitHub App, mitte selle hoidla töövoog.

Iga leiukategooria kohta haldame leidude kaupa hooldaja kinnitust:

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  leidude kaupa kaart: lähtefail ↔ märgistatud tükk ↔ käitumine ↔ versioonis v3.8.6
  rakendatud leevendus.
- Lähtekoodis olevad `SECURITY-AUDITOR-NOTE:` plokid iga märgistatud funktsiooni juures
  viitavad samale dokumendile.

Kasutajatele, kelle konveier ei võimalda hoiatust leevendada: ehitage käsuga
`OMNIROUTE_BUILD_PROFILE=minimal npm run build`. See asendab neli
tundlikku moodulit tühiasendustega, mis tagastavad käitusajal HTTP 503
`feature-disabled`, mistõttu privilegeeritud kooditeed puuduvad paketist füüsiliselt.
Avaldamisjuhised leiate failist
[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md).

## Viited

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — autoriseerimiskonveier
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — kaitsepiirete raamistik
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — auditilogi ja säilitamine
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — **kohustuslik** muster avalike ülesvooluteenuste mandaatide jaoks
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — **kohustuslik** muster veavastuste jaoks
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — hooldaja kinnitus tarneahela skanneri leidude kohta
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — kaitselüliti + jahtumisperiood + lukustus
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — TLS-i sõrmejäljestamine (õiguslik/eetiline teade)
- [`CLAUDE.md`](CLAUDE.md) — ranged reeglid TI-agentidele
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — kureeritud vaikimisi turvalised teegid
