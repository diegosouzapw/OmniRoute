# Tunnels Guide (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Sursa de referință:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Ultima actualizare:** 2026-06-28 — v3.8.40

OmniRoute își poate expune serverul local (`http://localhost:20128`) către internetul
public prin intermediul a trei backenduri de tunel. Acest lucru este util pentru:

- Callbackuri OAuth de la furnizorii cloud (Antigravity, Gemini, Cursor) care necesită un
  URL de redirecționare accesibil public.
- Partajarea instanței locale cu colegii de echipă fără a implementa o mașină virtuală.
- Testare de pe mobil, de la distanță sau între rețele.

Toate cele trei backenduri sunt gestionate în cadrul procesului — OmniRoute pornește/oprește
binarul sau SDK-ul subiacent din panoul de control sau prin API-ul REST. Nu este necesară
configurarea unui reverse proxy sau a systemd.

## Backenduri pe scurt

| Backend                     | Persistență                                                    | Cost                        | Configurare                                                |
| --------------------------- | -------------------------------------------------------------- | --------------------------- | ---------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Efemeră (URL-ul se schimbă la fiecare repornire)               | Gratuit                     | Niciuna — instalează automat `cloudflared`                 |
| **ngrok**                   | Stabilă când este configurat un plan plătit sau un domeniu fix | Nivel gratuit + contra cost | Necesită cont ngrok + authtoken                            |
| **Tailscale Funnel**        | Stabilă pentru fiecare nod din tailnetul dvs.                  | Gratuit pentru uz personal  | Necesită instalarea Tailscale + autentificare + ACL Funnel |

Implementările se află în `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` și `src/lib/tailscaleTunnel.ts`. Toate trei returnează un
obiect `status` cu aceeași structură și câmpurile `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl` și `lastError`, astfel încât panoul de control să le poată afișa uniform.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` rulează `cloudflared` ca proces copil. Acceptă
două moduri, selectate în funcție de furnizarea unei configurații pentru tunel denumit:

- **Tunel rapid (implicit).** Rulează `cloudflared tunnel --url
http://localhost:<apiPort>` și preia URL-ul `*.trycloudflare.com` alocat
  din stdout. URL-urile sunt efemere și se schimbă la fiecare repornire.
- **Tunel denumit (opțional).** Când `CLOUDFLARED_CONFIG` indică un
  `config.yml` cloudflared gestionat local, OmniRoute rulează `cloudflared tunnel --no-autoupdate
--config <path> run`, oferindu-vă un **nume de gazdă stabil și denumit**. Configurația
  furnizează UUID-ul tunelului, `credentials-file` și rutarea `ingress`, astfel încât
  nu este transmis niciun `--url` și nu este necesar niciun token pentru panoul de control Zero Trust. `run` citește
  acreditările din calea absolută `credentials-file` a configurației — nu este necesar niciun `cert.pem`
  (acesta este utilizat numai pentru gestionarea ciclului de viață al tunelului).

Comportamente esențiale:

- **Instalare automată.** La prima utilizare, OmniRoute descarcă cel mai recent binar
  `cloudflared` din versiunile oficiale GitHub (instalarea gestionată se află în
  `DATA_DIR/cloudflared/`). SHA256 al resursei descărcate este verificat în raport cu
  manifestul versiunii înainte de execuție.
- **Supervizarea procesului.** PID-ul cloudflared și URL-ul rezolvat sunt salvate în
  `quick-tunnel-state.json`, astfel încât panoul de control să poată relua afișarea stării după reîncărcări.

### Configurarea unui tunel denumit (nume de gazdă stabil)

1. Creați un tunel gestionat local cu CLI-ul cloudflared (o singură dată):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Creați un fișier `~/.cloudflared/config.yml` care să direcționeze numele de gazdă către portul
   API local al OmniRoute (implicit 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Indicați configurația către OmniRoute și (re)porniți tunelul:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # opțional — suprascrie numele de gazdă raportat de OmniRoute; în caz contrar, acesta este citit din
   # prima regulă ingress a configurației:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Activați tunelul în același mod ca pe un tunel rapid (REST / panou de control / CLI
   mai jos). Un tunel denumit nu emite niciun URL public care să poată fi extras, astfel încât starea de pregătire este detectată
   din conexiunea edge înregistrată de cloudflared, iar `publicUrl`/`apiUrl` sunt
   raportate din `CLOUDFLARED_HOSTNAME` (sau din primul nume de gazdă ingress al configurației).

### Activare / dezactivare prin REST

Endpointul utilizează un corp `{action: "enable" | "disable"}`, nu căi separate
`start`/`stop`. Este necesară autentificarea pentru administrare (sesiune de administrator sau cheie API de administrator).

```bash
# Activare
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Stare
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Dezactivare
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Sau prin panoul de control: **Setări → Tuneluri → Cloudflare**.

### Variabile de mediu opționale

| Variabilă                                            | Scop                                                                                                                                                                                     |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Suprascrie calea către fișierul binar. Dacă este setată și validă, OmniRoute o utilizează în loc să descarce fișierul.                                                                   |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Protocolul de transport (implicit `http2`; sunt disponibile și `quic`, `auto`).                                                                                                          |
| `CLOUDFLARED_CONFIG`                                 | Calea către un fișier cloudflared `config.yml` gestionat local. Când este setată, OmniRoute rulează un tunel **denumit/persistent** (`tunnel --config <path> run`) în locul unuia rapid. |
| `CLOUDFLARED_HOSTNAME`                               | Suprascrie numele de gazdă public raportat al tunelului denumit (de ex. `ai.example.com`). Dacă nu este setată, acesta este citit din primul nume de gazdă `ingress` din configurație.   |

## 2. ngrok

`src/lib/ngrokTunnel.ts` utilizează **SDK-ul `@ngrok/ngrok`** (în cadrul procesului, fără subproces CLI). Modulul nativ este importat la cerere, la prima pornire, astfel încât platformele fără fișiere binare precompilate să nu provoace blocarea aplicației la inițializare.

### Cerințe preliminare

1. Înregistrați-vă la <https://ngrok.com>.
2. Copiați-vă authtoken-ul din panoul de control ngrok.
3. Furnizați-l prin una dintre următoarele metode:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, sau
   - Panoul de control: **Settings → Tunnels → ngrok**, sau
   - Corpul cererii REST (pentru o singură utilizare): `{"action":"enable","authToken":"<token>"}`.

Dacă nu este configurată niciuna dintre acestea, starea returnează `phase: "needs_auth"`.

### Activarea / dezactivarea prin REST

```bash
# Activare (utilizează NGROK_AUTHTOKEN din mediul de execuție)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Activare cu token inclus direct
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Stare
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Dezactivare
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Răspunsul include `publicUrl` atribuit (de exemplu,
`https://abcd-1234.ngrok-free.app`). Domeniile personalizate, regiunile și regulile de politică trebuie configurate în panoul de control ngrok — OmniRoute transmite către SDK doar URL-ul țintei locale.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` orchestrează CLI-ul de sistem `tailscale` pentru a expune portul API local prin **Funnel** (ieșirea Tailscale către internetul public pentru serve). Acesta acceptă întregul ciclu de viață: instalare, autentificare, pornirea daemonului, activare și dezactivare.

Implementarea invocă `tailscale funnel --bg <port>` (modul de fundal). URL-ul public are forma `https://<machine>.<tailnet>.ts.net/`.

### Cerințe preliminare

1. Instalați Tailscale (sau permiteți-i aplicației OmniRoute să facă acest lucru — consultați endpoint-ul `install` de mai jos).
2. Autentificați-vă (`tailscale login` sau prin endpoint-ul `login` al OmniRoute).
3. Activați Funnel pentru rețeaua dvs. tailnet în consola de administrare Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

Pe Linux și macOS, daemonul (`tailscaled`) necesită `sudo` pentru a fi controlat. Endpoint-urile POST acceptă un câmp opțional `sudoPassword`, care este transmis cache-ului de parole MITM al OmniRoute (`getCachedPassword` / `setCachedPassword`) pe durata apelului. Windows utilizează instalarea implicită a serviciului din `C:\Program Files\Tailscale\tailscale.exe`.

### Endpoint-uri REST

Tailscale are o suprafață API mai extinsă decât celelalte backend-uri, deoarece instalarea, autentificarea, daemonul și tunelul sunt aspecte separate.

| Endpoint                              | Metodă | Scop                                                                                     |
| ------------------------------------- | ------ | ---------------------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Starea agregată a tunelului (`phase`, `tunnelUrl`, `apiUrl` etc.)                        |
| `/api/tunnels/tailscale/check`        | `GET`  | Verificare de nivel inferior: este instalat? autentificat? daemonul rulează?             |
| `/api/tunnels/tailscale/install`      | `POST` | Instalează Tailscale (evenimente de progres transmise prin SSE) — Linux/macOS            |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Pornește `tailscaled` pe Linux/macOS                                                     |
| `/api/tunnels/tailscale/login`        | `POST` | Începe fluxul de autentificare; returnează `authUrl` pentru a fi deschis într-un browser |
| `/api/tunnels/tailscale/enable`       | `POST` | Pornește Funnel pentru portul API                                                        |
| `/api/tunnels/tailscale/disable`      | `POST` | Oprește Funnel                                                                           |

Toate endpoint-urile Tailscale necesită autentificare de administrare (consultați `routeUtils.ts ::
requireTailscaleAuth`).

Exemplu de activare:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Dacă Funnel nu este activat în consola de administrare, răspunsul include `funnelNotEnabled: true` împreună cu un `enableUrl` care trebuie deschis într-un browser.

### Variabile de mediu opționale

| Variabilă       | Scop                                              |
| --------------- | ------------------------------------------------- |
| `TAILSCALE_BIN` | Suprascrie calea către fișierul binar `tailscale` |

## Rezumatul endpointurilor

| Endpoint                              | Metodă | Corp                                | Autentificare |
| ------------------------------------- | ------ | ----------------------------------- | ------------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | management    |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | management    |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | management    |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | management    |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | management    |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | management    |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | management    |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | management    |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | management    |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | management    |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | management    |

Nu există un endpoint central `/api/settings/tunnels` — fiecare backend este
independent.

## Considerații privind callbackurile OAuth

Atunci când expuneți OmniRoute printr-un tunel, tabloul de bord și fluxurile OAuth trebuie
să construiască URL-urile de callback folosind numele de gazdă **public**, nu `localhost`. În caz contrar,
furnizorul OAuth redirecționează utilizatorul către un URL pe care serverele sale nu îl pot accesa,
iar procesul de autentificare eșuează.

Modificările din tabloul de bord și salvarea setărilor nu necesită fixarea numelui de gazdă al tunelului în
`NEXT_PUBLIC_BASE_URL`. Tabloul de bord autentificat trimite cereri nesigure cu aceeași origine,
folosind un token CSRF asociat sesiunii, astfel încât gazdele efemere Cloudflare Quick Tunnel
pot fi utilizate în continuare pentru administrarea obișnuită prin interfața cu utilizatorul după autentificare.

Setați:

```bash
NEXT_PUBLIC_BASE_URL=https://<gazda-tunelului-dvs>
```

și reporniți OmniRoute înainte de a iniția OAuth. Pentru tunelurile efemere Cloudflare Quick
Tunnel, URL-ul se schimbă după fiecare repornire, așadar, pentru utilizarea OAuth în producție,
preferați ngrok cu un domeniu rezervat sau Tailscale Funnel.

## Stare și monitorizare

Tabloul de bord afișează starea tunelului în **Setări → Tuneluri**:

- Backendurile active și `phase` curentă (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- URL-ul public curent și URL-ul API derivat (`<publicUrl>/v1`).
- URL-ul țintă local către care redirecționează tunelul.
- Ultimul mesaj de eroare, dacă există.

Pentru monitorizare programatică, interogați periodic endpointurile `GET` pentru fiecare backend. Este permisă rularea
simultană a mai multor backenduri; OmniRoute va urmări fiecare backend
în mod independent.

## Depanare

### „Fișierul binar cloudflared nu a fost găsit”

OmniRoute încearcă instalarea automată la prima utilizare. Dacă instalarea este blocată
(rețea restricționată, fără acces la GitHub), descărcați manual `cloudflared` de la
<https://github.com/cloudflare/cloudflared/releases> și setați
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### „ngrok: este necesar un authtoken”

`phase: "needs_auth"` înseamnă că nu a fost găsit niciun authtoken. Setați `NGROK_AUTHTOKEN` în
`.env`, configurați-l prin intermediul tabloului de bord sau transmiteți `authToken` în corpul
cererii POST de activare.

### „tailscale: funnel nu este activat”

Atunci când răspunsul de activare include `funnelNotEnabled: true`, Funnel este dezactivat
pentru tailnetul dvs. Deschideți valoarea `enableUrl` returnată (sau pagina funcției din consola de administrare)
și activați Funnel.

### Modificările URL-ului tunelului întrerup OAuth

Utilizați ngrok cu un domeniu rezervat sau Tailscale Funnel (ambele sunt stabile pentru fiecare nod).
Tunelurile Cloudflare Quick Tunnel sunt efemere prin proiectare și nu sunt recomandate pentru
callbackuri OAuth de lungă durată.

### Permisiune refuzată pe Linux/macOS pentru Tailscale

`tailscaled` necesită privilegii root. Furnizați `sudoPassword` endpointului POST relevant
sau porniți dvs. daemonul (`sudo systemctl start tailscaled`).

## Vezi și

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxy de ieșire (1proxy, SOCKS5, HTTP) pentru
  traficul de ieșire.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — lista completă a variabilelor de mediu, inclusiv
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — alternative la tunelare pentru găzduire
  publică stabilă.
- Sursă: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
