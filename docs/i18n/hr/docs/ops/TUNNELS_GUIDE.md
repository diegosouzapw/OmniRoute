# Tunnels Guide (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Izvor istine:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Posljednje ažuriranje:** 2026-06-28 — v3.8.40

OmniRoute može izložiti svoj lokalni poslužitelj (`http://localhost:20128`) javnom
internetu putem triju pozadinskih sustava za tunele. To je korisno za:

- OAuth povratne pozive pružatelja usluga u oblaku (Antigravity, Gemini, Cursor) kojima je
  potreban javno dostupan URL za preusmjeravanje.
- Dijeljenje lokalne instance s članovima tima bez implementacije virtualnog stroja.
- Testiranje na mobilnim i udaljenim uređajima ili između različitih mreža.

Sva tri pozadinska sustava upravljaju se unutar procesa — OmniRoute pokreće/zaustavlja temeljni
binarni program ili SDK putem nadzorne ploče ili REST API-ja. Nije potrebno postavljanje
obrnutog proxyja ni systemd-a.

## Kratak pregled pozadinskih sustava

| Pozadinski sustav           | Trajnost                                                     | Cijena                       | Postavljanje                                            |
| --------------------------- | ------------------------------------------------------------ | ---------------------------- | ------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Privremeno (URL se mijenja pri svakom ponovnom pokretanju)   | Besplatno                    | Nije potrebno — automatski instalira `cloudflared`      |
| **ngrok**                   | Stabilno dok je konfiguriran plaćeni paket ili fiksna domena | Besplatna razina + plaćeno   | Zahtijeva ngrok račun + authtoken                       |
| **Tailscale Funnel**        | Stabilno po čvoru unutar vašeg tailneta                      | Besplatno za osobnu upotrebu | Zahtijeva instalaciju Tailscalea + prijavu + Funnel ACL |

Implementacije se nalaze u `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` i `src/lib/tailscaleTunnel.ts`. Sve tri vraćaju
objekt `status` zajedničkog oblika s poljima `phase`, `running`, `publicUrl`, `apiUrl`,
`targetUrl` i `lastError`, tako da ih nadzorna ploča može jednako prikazivati.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` pokreće `cloudflared` kao podređeni proces. Podržava
dva načina rada, odabrana ovisno o tome je li navedena konfiguracija imenovanog tunela:

- **Brzi tunel (zadano).** Pokreće `cloudflared tunnel --url
http://localhost:<apiPort>` i iz standardnog izlaza parsira dodijeljeni URL `*.trycloudflare.com`.
  URL-ovi su privremeni i mijenjaju se pri svakom ponovnom pokretanju.
- **Imenovani tunel (uključuje se po želji).** Kada `CLOUDFLARED_CONFIG` pokazuje na lokalno upravljanu
  cloudflared datoteku `config.yml`, OmniRoute pokreće `cloudflared tunnel --no-autoupdate
--config <path> run`, čime dobivate **stabilno, imenovano ime glavnog računala**. Konfiguracija
  sadrži UUID tunela, `credentials-file` i usmjeravanje `ingress`, pa se
  `--url` ne prosljeđuje i nije potreban token nadzorne ploče Zero Trust. `run` čita
  vjerodajnice iz apsolutne putanje `credentials-file` navedene u konfiguraciji — `cert.pem`
  nije potreban (upotrebljava se samo za upravljanje životnim ciklusom tunela).

Ključna ponašanja:

- **Automatska instalacija.** Pri prvoj upotrebi OmniRoute preuzima najnoviji binarni program `cloudflared`
  iz službenih GitHub izdanja (upravljana instalacija nalazi se u
  `DATA_DIR/cloudflared/`). SHA256 preuzete datoteke provjerava se prema
  manifestu izdanja prije izvršavanja.
- **Nadzor procesa.** PID procesa cloudflared i razriješeni URL spremaju se u
  `quick-tunnel-state.json` kako bi nadzorna ploča mogla nastaviti prikazivati status nakon ponovnog učitavanja.

### Postavljanje imenovanog tunela (stabilno ime glavnog računala)

1. Izradite lokalno upravljani tunel pomoću CLI-ja cloudflared (jednokratno):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Izradite `~/.cloudflared/config.yml` koji usmjerava vaše ime glavnog računala na lokalni
   API priključak OmniRoutea (zadano 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Usmjerite OmniRoute na konfiguraciju i (ponovno) pokrenite tunel:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # neobavezno — nadjačava ime glavnog računala koje OmniRoute prijavljuje; inače se čita iz
   # prvog pravila ingress u konfiguraciji:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Omogućite tunel na isti način kao i brzi tunel (putem REST-a / nadzorne ploče / CLI-ja
   u nastavku). Imenovani tunel ne ispisuje javni URL koji bi se mogao izdvojiti, pa se spremnost otkriva
   putem registrirane rubne veze cloudflareda, a `publicUrl`/`apiUrl` prijavljuju se
   iz `CLOUDFLARED_HOSTNAME` (ili prvog imena glavnog računala u konfiguraciji `ingress`).

### Omogućivanje / onemogućivanje putem REST-a

Krajnja točka upotrebljava tijelo `{action: "enable" | "disable"}`, a ne odvojene
putanje `start`/`stop`. Potrebna je administratorska autentifikacija (administratorska sesija ili administratorski API ključ).

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

Ili putem nadzorne ploče: **Postavke → Tuneli → Cloudflare**.

### Neobavezne varijable okruženja

| Varijabla                                            | Namjena                                                                                                                                                                                 |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Nadjačava putanju do izvršne datoteke. Ako je postavljena i valjana, OmniRoute je koristi umjesto preuzimanja.                                                                          |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Transportni protokol (zadano `http2`; također `quic`, `auto`).                                                                                                                          |
| `CLOUDFLARED_CONFIG`                                 | Putanja do lokalno upravljane cloudflared datoteke `config.yml`. Kada je postavljena, OmniRoute pokreće **imenovani/trajni** tunel (`tunnel --config <path> run`) umjesto brzog tunela. |
| `CLOUDFLARED_HOSTNAME`                               | Nadjačava prijavljeno javno ime glavnog računala imenovanog tunela (npr. `ai.example.com`). Ako nije postavljena, čita se iz prvog imena glavnog računala `ingress` u konfiguraciji.    |

## 2. ngrok

`src/lib/ngrokTunnel.ts` koristi **`@ngrok/ngrok` SDK** (unutar procesa, bez CLI
podprocesa). Nativni modul uvozi se odgođeno pri prvom pokretanju kako platforme
bez unaprijed izgrađenih binarnih datoteka ne bi uzrokovale rušenje aplikacije pri pokretanju.

### Preduvjeti

1. Registrirajte se na <https://ngrok.com>.
2. Kopirajte svoj token za autentikaciju s nadzorne ploče ngrok.
3. Navedite ga na jedan od sljedećih načina:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, ili
   - Nadzorna ploča: **Postavke → Tuneli → ngrok**, ili
   - Tijelo REST zahtjeva (jednokratno): `{"action":"enable","authToken":"<token>"}`.

Ako nijedna opcija nije konfigurirana, status vraća `phase: "needs_auth"`.

### Omogućavanje / onemogućavanje putem REST-a

```bash
# Omogućavanje (koristi NGROK_AUTHTOKEN iz okruženja)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Omogućavanje s umetnutim tokenom
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Status
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Onemogućavanje
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Odgovor uključuje dodijeljeni `publicUrl` (npr.
`https://abcd-1234.ngrok-free.app`). Prilagođene domene, regije i pravila
moraju se konfigurirati na nadzornoj ploči ngrok — sam OmniRoute samo prosljeđuje
lokalni ciljni URL SDK-u.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` upravlja sistemskim `tailscale` CLI-jem kako bi
izložio lokalni API port putem usluge **Funnel** (Tailscaleov izlaz na javni internet za posluživanje).
Podržava cijeli životni ciklus: instalaciju, prijavu, pokretanje daemona, omogućavanje i onemogućavanje.

Implementacija poziva `tailscale funnel --bg <port>` (pozadinski način rada). Javni
URL ima oblik `https://<machine>.<tailnet>.ts.net/`.

### Preduvjeti

1. Instalirajte Tailscale (ili dopustite OmniRouteu da to učini — pogledajte krajnju točku `install` u nastavku).
2. Prijavite se (`tailscale login` ili putem krajnje točke `login` sustava OmniRoute).
3. Omogućite Funnel za svoj tailnet u administratorskoj konzoli Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

Na Linuxu i macOS-u daemon (`tailscaled`) zahtijeva `sudo` za upravljanje.
Krajnje točke POST prihvaćaju neobavezno polje `sudoPassword`, koje se prosljeđuje
OmniRouteovoj predmemoriji MITM lozinki (`getCachedPassword` / `setCachedPassword`) tijekom
trajanja poziva. Windows koristi zadanu instalaciju usluge na
`C:\Program Files\Tailscale\tailscale.exe`.

### Krajnje točke REST-a

Tailscale ima bogatije sučelje od ostalih pozadinskih sustava jer su instalacija,
prijava, daemon i tunel zasebne komponente.

| Krajnja točka                         | Metoda | Svrha                                                                         |
| ------------------------------------- | ------ | ----------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Objedinjeni status tunela (`phase`, `tunnelUrl`, `apiUrl` itd.)               |
| `/api/tunnels/tailscale/check`        | `GET`  | Provjera niže razine: instaliran? prijavljen? daemon pokrenut?                |
| `/api/tunnels/tailscale/install`      | `POST` | Instalacija Tailscalea (događaji napretka strujani putem SSE-a) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Pokretanje `tailscaled` na Linuxu/macOS-u                                     |
| `/api/tunnels/tailscale/login`        | `POST` | Pokretanje postupka prijave; vraća `authUrl` za otvaranje u pregledniku       |
| `/api/tunnels/tailscale/enable`       | `POST` | Pokretanje Funnela za API port                                                |
| `/api/tunnels/tailscale/disable`      | `POST` | Zaustavljanje Funnela                                                         |

Sve krajnje točke Tailscalea zahtijevaju autentikaciju za upravljanje (pogledajte `routeUtils.ts ::
requireTailscaleAuth`).

Primjer omogućavanja:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Ako Funnel nije omogućen u administratorskoj konzoli, odgovor uključuje
`funnelNotEnabled: true` i `enableUrl` za otvaranje u pregledniku.

### Neobavezne varijable okruženja

| Varijabla       | Svrha                                             |
| --------------- | ------------------------------------------------- |
| `TAILSCALE_BIN` | Nadjačavanje putanje binarne datoteke `tailscale` |

## Sažetak krajnjih točaka

| Krajnja točka                         | Metoda | Tijelo                              | Autorizacija |
| ------------------------------------- | ------ | ----------------------------------- | ------------ |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | upravljanje  |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | upravljanje  |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | upravljanje  |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | upravljanje  |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | upravljanje  |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | upravljanje  |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | upravljanje  |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | upravljanje  |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | upravljanje  |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | upravljanje  |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | upravljanje  |

Ne postoji središnja krajnja točka `/api/settings/tunnels` — svaki je pozadinski sustav
neovisan.

## Napomene za OAuth povratni poziv

Kada OmniRoute učinite dostupnim putem tunela, nadzorna ploča i OAuth tokovi moraju
izrađivati URL-ove povratnog poziva koristeći **javni** naziv glavnog računala, a ne `localhost`. U suprotnom
pružatelj OAuth usluge preusmjerava korisnika natrag na URL kojem njegovi poslužitelji ne mogu pristupiti,
pa uspostavljanje veze ne uspijeva.

Za uređivanje nadzorne ploče i spremanje postavki nije potrebno fiksirati naziv glavnog računala tunela u
`NEXT_PUBLIC_BASE_URL`. Autentificirana nadzorna ploča šalje nesigurne zahtjeve istog izvora
s CSRF tokenom vezanim uz sesiju, pa se efemerna glavna računala Cloudflare Quick Tunnela
i dalje mogu upotrebljavati za uobičajeno upravljanje putem korisničkog sučelja nakon prijave.

Postavite:

```bash
NEXT_PUBLIC_BASE_URL=https://<vaše-glavno-računalo-tunela>
```

i ponovno pokrenite OmniRoute prije pokretanja OAuth postupka. Za efemerne Cloudflare Quick
Tunele URL se mijenja nakon svakog ponovnog pokretanja, stoga za upotrebu OAutha u produkciji odaberite ngrok s rezerviranom
domenom ili Tailscale Funnel.

## Stanje i nadzor

Nadzorna ploča prikazuje stanje tunela u odjeljku **Postavke → Tuneli**:

- Aktivni pozadinski sustavi i trenutačna vrijednost `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Trenutačni javni URL i izvedeni API URL (`<publicUrl>/v1`).
- Lokalni ciljni URL na koji tunel prosljeđuje promet.
- Posljednja poruka o pogrešci, ako postoji.

Za programski nadzor periodički provjeravajte `GET` krajnje točke pojedinačnih pozadinskih sustava. Istodobno pokretanje više
pozadinskih sustava dopušteno je; OmniRoute će svaki pratiti
neovisno.

## Rješavanje problema

### "Binarna datoteka cloudflared nije pronađena"

OmniRoute pokušava izvršiti automatsku instalaciju pri prvoj upotrebi. Ako je instalacija blokirana
(ograničena mreža, nema pristupa GitHubu), ručno preuzmite `cloudflared` s
<https://github.com/cloudflare/cloudflared/releases> i postavite
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: potreban je authtoken"

`phase: "needs_auth"` znači da authtoken nije pronađen. Postavite `NGROK_AUTHTOKEN` u
`.env`, konfigurirajte ga putem nadzorne ploče ili proslijedite `authToken` u tijelu POST zahtjeva
za omogućavanje.

### "tailscale: funnel nije omogućen"

Kada odgovor na omogućavanje sadrži `funnelNotEnabled: true`, Funnel je onemogućen
za vaš tailnet. Otvorite vraćeni `enableUrl` (ili stranicu značajke u administratorskoj konzoli)
i uključite Funnel.

### Promjene URL-a tunela prekidaju OAuth

Upotrebljavajte ngrok s rezerviranom domenom ili Tailscale Funnel (oba su stabilna za pojedini čvor).
Cloudflare Quick Tuneli po dizajnu su efemerni i ne preporučuju se za
dugotrajne OAuth povratne pozive.

### Odbijen pristup na sustavu Linux/macOS za Tailscale

`tailscaled` zahtijeva root ovlasti. Proslijedite `sudoPassword` odgovarajućoj POST krajnjoj točki
ili sami pokrenite servis (`sudo systemctl start tailscaled`).

## Vidi također

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — izlazni proxy (1proxy, SOCKS5, HTTP) za
  odlazni promet.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — potpuni popis varijabli okruženja, uključujući
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — alternative tuneliranju za stabilan
  javni hosting.
- Izvor: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
