# TUNNELS_GUIDE (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

# Vodič za tunele

> **Izvor istine:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Posljednje ažurirano:** 2026-06-28 — v3.8.40

OmniRoute može izložiti svoj lokalni server (`http://localhost:20128`) javnom internetu putem tri pozadinska sistema za tuneliranje (tunnel backends). Ovo je korisno za:

- OAuth povratne pozive od cloud provajdera (Antigravity, Gemini, Cursor) kojima je potreban javno dostupan URL za preusmjeravanje.
- Dijeljenje vaše lokalne instance sa kolegama bez potrebe za raspoređivanjem (deploying) VM-a.
- Mobilno, udaljeno ili testiranje preko više mreža.

Sva tri pozadinska sistema se upravljaju unutar procesa — OmniRoute pokreće/zaustavlja osnovnu binarnu datoteku ili SDK sa kontrolne ploče ili putem REST API-ja. Nije potrebno podešavanje reverse-proxyja ili systemd-a.

## Pregled pozadinskih sistema

| Pozadinski sistem           | Postojanost                                                | Cijena                      | Podešavanje                                            |
| --------------------------- | ---------------------------------------------------------- | --------------------------- | ------------------------------------------------------ |
| **Cloudflare Quick Tunnel** | Prolazno (URL se mijenja pri svakom ponovnom pokretanju)   | Besplatno                   | Nula — automatski instalira `cloudflared`              |
| **ngrok**                   | Stabilno dok je konfigurisan plaćeni plan ili fiksni domen | Besplatni nivo + plaćeno    | Zahtijeva ngrok nalog + authtoken                      |
| **Tailscale Funnel**        | Stabilno po čvoru unutar vaše tailnet mreže                | Besplatno za ličnu upotrebu | Zahtijeva Tailscale instalaciju + prijavu + Funnel ACL |

Implementacije se nalaze u `src/lib/cloudflaredTunnel.ts`, `src/lib/ngrokTunnel.ts` i `src/lib/tailscaleTunnel.ts`. Sva tri vraćaju `status` objekat zajedničkog oblika sa poljima `phase`, `running`, `publicUrl`, `apiUrl`, `targetUrl` i `lastError`, tako da ih kontrolna ploča može uniformno prikazati.

## 1. Cloudflare tunel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` pokreće `cloudflared` kao podproces. Podržava dva režima, koji se biraju na osnovu toga da li je obezbijeđena konfiguracija za imenovani tunel (named-tunnel):

- **Quick tunnel (podrazumijevano).** Pokreće `cloudflared tunnel --url http://localhost:<apiPort>` i parsira dodijeljeni `*.trycloudflare.com` URL iz stdout-a. URL-ovi su prolazni i mijenjaju se pri svakom ponovnom pokretanju.
- **Named tunnel (opciono).** Kada `CLOUDFLARED_CONFIG` pokazuje na lokalno upravljanu cloudflared `config.yml` datoteku, OmniRoute pokreće `cloudflared tunnel --no-autoupdate --config <path> run`, dajući vam **stabilan, imenovan hostname**. Konfiguracija obezbjeđuje UUID tunela, `credentials-file` i `ingress` rutiranje, tako da se `--url` ne prosljeđuje i nije potreban token sa Zero Trust kontrolne ploče. `run` čita akreditive sa apsolutne putanje `credentials-file` u konfiguraciji — `cert.pem` nije potreban (on se koristi samo za upravljanje životnim ciklusom tunela).

Ključna ponašanja:

- **Automatska instalacija.** Pri prvoj upotrebi, OmniRoute preuzima najnoviju `cloudflared` binarnu datoteku sa zvaničnih GitHub izdanja (upravljana instalacija se nalazi pod `DATA_DIR/cloudflared/`). SHA256 preuzetog resursa se provjerava u odnosu na manifest izdanja prije izvršenja.
- **Nadzor procesa.** PID cloudflared-a i razriješeni URL se čuvaju u `quick-tunnel-state.json` tako da kontrolna ploča može nastaviti status nakon ponovnog učitavanja.

### Podešavanje imenovanog tunela (stabilan hostname)

1. Kreirajte lokalno upravljan tunel pomoću cloudflared CLI-ja (jednokratno):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Napišite `~/.cloudflared/config.yml` koji rutira vaš hostname na lokalni API port OmniRoute-a (podrazumijevano 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Usmjerite OmniRoute na konfiguraciju i (ponovo) pokrenite tunel:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # opciono — nadjačava hostname koji OmniRoute prijavljuje; u suprotnom se čita iz prvog ingress pravila konfiguracije:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Omogućite tunel na isti način kao i quick tunnel (REST / kontrolna ploča / CLI ispod). Imenovani tunel ne emituje javni URL za skrapiranje, pa se spremnost detektuje iz registrovane edge konekcije cloudflared-a, a `publicUrl`/`apiUrl` se prijavljuju iz `CLOUDFLARED_HOSTNAME` (ili prvog ingress hostname-a iz konfiguracije).

### Omogućavanje / onemogućavanje putem REST-a

Endpoint koristi `{action: "enable" | "disable"}` tijelo, a ne odvojene `start`/`stop` putanje. Potrebna je administrativna autorizacija (admin sesija ili admin API ključ).

```bash
# Omogući
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Status
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Onemogući
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Ili putem kontrolne ploče: **Settings → Tunnels → Cloudflare**.

### Opcione varijable okruženja

| Varijabla                                            | Svrha                                                                                                                                                                                      |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CLOUDFLARED_BIN`                                    | Nadjačava putanju do binarne datoteke. Ako je postavljena i ispravna, OmniRoute je koristi umjesto preuzimanja.                                                                            |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Transportni protokol (podrazumijevano `http2`; također `quic`, `auto`).                                                                                                                    |
| `CLOUDFLARED_CONFIG`                                 | Putanja do lokalno upravljane `config.yml` datoteke za cloudflared. Kada je postavljena, OmniRoute pokreće **imenovani/trajni** tunel (`tunnel --config <path> run`) umjesto brzog tunela. |
| `CLOUDFLARED_HOSTNAME`                               | Nadjačava prijavljeno javno ime hosta imenovanog tunela (npr. `ai.example.com`). Kada nije postavljeno, čita se iz prvog `ingress` imena hosta u konfiguraciji.                            |

## 2. ngrok

`src/lib/ngrokTunnel.ts` koristi **`@ngrok/ngrok` SDK** (in-process, bez CLI podprocesa). Izvorni modul se uvozi odloženo pri prvom pokretanju, tako da platforme bez unaprijed izgrađenih binarnih datoteka ne prekidaju rad aplikacije pri pokretanju.

### Preduslovi

1. Registrujte se na <https://ngrok.com>.
2. Kopirajte svoj authtoken sa ngrok kontrolne table.
3. Navedite ga putem:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, ili
   - Kontrolne table: **Settings → Tunnels → ngrok**, ili
   - REST tijela (jednokratno): `{"action":"enable","authToken":"<token>"}`.

Ako ništa od navedenog nije konfigurisano, status vraća `phase: "needs_auth"`.

### Omogućavanje / onemogućavanje putem REST-a

```bash
# Omogući (koristi NGROK_AUTHTOKEN iz env)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Omogući sa inline tokenom
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Status
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Onemogući
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Odgovor uključuje dodijeljeni `publicUrl` (npr. `https://abcd-1234.ngrok-free.app`). Prilagođeni domeni, regije i pravila politike moraju biti konfigurisani na ngrok kontrolnoj tabli — sam OmniRoute samo prosljeđuje lokalni ciljni URL do SDK-a.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` orkestrira sistemski `tailscale` CLI kako bi izložio lokalni API port putem **Funnel-a** (Tailscale-ov izlaz za javni internet za serve). Podržava puni životni ciklus: instalaciju, prijavu, pokretanje demona, omogućavanje, onemogućavanje.

Implementacija poziva `tailscale funnel --bg <port>` (pozadinski režim). Javni URL ima oblik `https://<machine>.<tailnet>.ts.net/`.

### Preduslovi

1. Instalirajte Tailscale (ili dozvolite OmniRoute-u da to uradi — pogledajte `install` krajnju tačku ispod).
2. Prijavite se (`tailscale login` ili putem OmniRoute-ove `login` krajnje tačke).
3. Omogućite Funnel za svoj tailnet u Tailscale administratorskoj konzoli:
   <https://login.tailscale.com/admin/settings/features>.

Na Linux-u i macOS-u, demon (`tailscaled`) zahtijeva `sudo` za kontrolu. POST krajnje tačke prihvataju opcionalno polje `sudoPassword` koje se prosljeđuje OmniRoute-ovom MITM kešu lozinki (`getCachedPassword` / `setCachedPassword`) tokom trajanja poziva. Windows koristi podrazumevanu instalaciju servisa na `C:\Program Files\Tailscale\tailscale.exe`.

### REST krajnje tačke

Tailscale ima bogatiju površinu od ostalih pozadinskih sistema jer su instalacija, prijava, demon i tunel odvojene brige.

| Krajnja tačka                         | Metoda | Svrha                                                                 |
| ------------------------------------- | ------ | --------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Agregirani status tunela (`phase`, `tunnelUrl`, `apiUrl`, itd.)       |
| `/api/tunnels/tailscale/check`        | `GET`  | Provjera nižeg nivoa: instalirano? prijavljeno? demon radi?           |
| `/api/tunnels/tailscale/install`      | `POST` | Instaliraj Tailscale (SSE-strimovani događaji napretka) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Pokreni `tailscaled` na Linux/macOS                                   |
| `/api/tunnels/tailscale/login`        | `POST` | Započni tok prijave; vraća `authUrl` za otvaranje u pretraživaču      |
| `/api/tunnels/tailscale/enable`       | `POST` | Pokreni Funnel za API port                                            |
| `/api/tunnels/tailscale/disable`      | `POST` | Zaustavi Funnel                                                       |

Sve Tailscale krajnje tačke zahtijevaju upravljačku autorizaciju (pogledajte `routeUtils.ts :: requireTailscaleAuth`).

Primjer omogućavanja:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Ako Funnel nije omogućen u administratorskoj konzoli, odgovor uključuje `funnelNotEnabled: true` plus `enableUrl` za otvaranje u pretraživaču.

### Opcione env varijable

| Varijabla       | Svrha                                         |
| --------------- | --------------------------------------------- |
| `TAILSCALE_BIN` | Nadjačaj putanju `tailscale` binarne datoteke |

## Pregled krajnjih tačaka

| Krajnja tačka                         | Metoda | Tijelo                              | Autorizacija |
| ------------------------------------- | ------ | ----------------------------------- | ------------ |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | management   |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | management   |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | management   |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | management   |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | management   |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | management   |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | management   |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | management   |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | management   |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | management   |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | management   |

Ne postoji centralna krajnja tačka `/api/settings/tunnels` — svaka pozadinska usluga (backend) je nezavisna.

## Razmatranja o OAuth povratnom pozivu (callback)

Kada izlažete OmniRoute kroz tunel, kontrolna tabla i OAuth tokovi moraju kreirati URL-ove povratnih poziva (callback URLs) prema **javnom** nazivu hosta, a ne prema `localhost`. U suprotnom, OAuth provajder preusmjerava korisnika nazad na URL kojem njegovi serveri ne mogu pristupiti, i rukovanje (handshake) ne uspijeva.

Izmjene na kontrolnoj tabli i čuvanje postavki ne zahtijevaju fiksiranje naziva hosta tunela u `NEXT_PUBLIC_BASE_URL`. Autentifikovana kontrolna tabla šalje nesigurne zahtjeve istog porijekla (same-origin) sa CSRF tokenom vezanim za sesiju, tako da se efemerni Cloudflare Quick Tunnel hostovi i dalje mogu koristiti za normalno upravljanje korisničkim interfejsom nakon prijave.

Postavite:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

i ponovo pokrenite OmniRoute prije pokretanja OAuth-a. Za efemerne Cloudflare Quick Tunnele URL se mijenja nakon svakog ponovnog pokretanja, stoga za produkcijsku upotrebu OAuth-a preferirajte ngrok sa rezervisanom domenom ili Tailscale Funnel.

## Zdravlje i nadzor

Kontrolna tabla prikazuje stanje tunela pod **Settings → Tunnels**:

- Aktivna pozadinska usluga (backend) i trenutna faza (`stopped`, `starting`, `running`, `needs_auth`, `error`).
- Trenutni javni URL i izvedeni API URL (`<publicUrl>/v1`).
- Lokalni ciljni URL na koji tunel prosljeđuje saobraćaj.
- Posljednja poruka o grešci, ako postoji.

Za programski nadzor, vršite upite (poll) na `GET` krajnje tačke za svaku pozadinsku uslugu. Dozvoljeno je pokretanje više od jedne pozadinske usluge istovremeno; OmniRoute će pratiti svaku nezavisno.

## Rješavanje problema

### "cloudflared binary not found"

OmniRoute pokušava automatski instalirati pri prvoj upotrebi. Ako je instalacija blokirana (ograničena mreža, nema pristupa GitHub-u), preuzmite `cloudflared` ručno sa <https://github.com/cloudflare/cloudflared/releases> i postavite `CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: authtoken required"

`phase: "needs_auth"` znači da `authtoken` nije pronađen. Postavite `NGROK_AUTHTOKEN` u `.env`, konfigurišite ga putem kontrolne table ili proslijedite `authToken` u tijelu `enable` POST zahtjeva.

### "tailscale: funnel not enabled"

Kada odgovor na `enable` zahtjev uključuje `funnelNotEnabled: true`, Funnel je onemogućen za vašu tailnet mrežu. Otvorite vraćeni `enableUrl` (ili stranicu sa funkcijama u administratorskoj konzoli) i uključite Funnel.

### Promjene URL-a tunela prekidaju OAuth

Koristite ngrok sa rezervisanom domenom ili Tailscale Funnel (oboje su stabilni po čvoru). Cloudflare Quick Tuneli su po dizajnu efemerni i ne preporučuju se za dugotrajne OAuth povratne pozive.

### Permission denied na Linux/macOS za Tailscale

`tailscaled` zahtijeva root privilegije. Navedite `sudoPassword` u relevantnoj `POST` krajnjoj tački ili sami pokrenite daemon (`sudo systemctl start tailscaled`).

## Vidi također

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — odlazni proxy (1proxy, SOCKS5, HTTP) za
  odlazni saobraćaj.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — potpuna lista env varijabli uključujući
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — alternative tuneliranju za stabilan
  javni hosting.
- Izvor: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
