# Tunnels Guide (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Tõeallikas:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Viimati uuendatud:** 2026-06-28 — v3.8.40

OmniRoute saab teha oma kohaliku serveri (`http://localhost:20128`) avalikus
internetis kättesaadavaks kolme tunnelitaustsüsteemi kaudu. See on kasulik järgmistel juhtudel:

- Pilveteenuse pakkujate (Antigravity, Gemini, Cursor) OAuthi tagasikutsed, mis vajavad
  avalikult kättesaadavat ümbersuunamise URL-i.
- Kohaliku eksemplari jagamine meeskonnakaaslastega ilma virtuaalmasinat juurutamata.
- Mobiilne, kaug- või võrguülene testimine.

Kõiki kolme taustsüsteemi hallatakse protsessi sees — OmniRoute käivitab ja peatab aluseks
oleva binaarfaili või SDK juhtpaneeli või REST API kaudu. Pöördpuhverserveri ega systemd
seadistamine pole vajalik.

## Taustsüsteemide ülevaade

| Taustsüsteem                | Püsivus                                                          | Maksumus                     | Seadistamine                                                   |
| --------------------------- | ---------------------------------------------------------------- | ---------------------------- | -------------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Ajutine (URL muutub iga taaskäivituse korral)                    | Tasuta                       | Puudub — installib `cloudflared` automaatselt                  |
| **ngrok**                   | Püsiv, kui seadistatud on tasuline pakett või fikseeritud domeen | Tasuta pakett + tasuline     | Vajab ngroki kontot + authtoken'it                             |
| **Tailscale Funnel**        | Püsiv sõlmepõhiselt teie tailnet'is                              | Isiklikuks kasutuseks tasuta | Vajab Tailscale'i installimist + sisselogimist + Funneli ACL-i |

Teostused asuvad failides `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` ja `src/lib/tailscaleTunnel.ts`. Kõik kolm tagastavad
ühise struktuuriga `status`-objekti väljadega `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl` ja `lastError`, et juhtpaneel saaks neid ühtemoodi kuvada.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` käitab `cloudflared`-i alamprotsessina. See toetab
kahte režiimi, mille valik sõltub sellest, kas nimega tunneli konfiguratsioon on antud:

- **Kiirtunnel (vaikimisi).** Käitab käsku `cloudflared tunnel --url
http://localhost:<apiPort>` ja parsib standardsest väljundist määratud `*.trycloudflare.com` URL-i.
  URL-id on ajutised ja muutuvad iga taaskäivituse korral.
- **Nimega tunnel (valikuline).** Kui `CLOUDFLARED_CONFIG` osutab kohalikult hallatavale
  cloudflaredi failile `config.yml`, käitab OmniRoute käsku `cloudflared tunnel --no-autoupdate
--config <path> run`, mis annab teile **püsiva nimega hostinime**. Konfiguratsioon
  sisaldab tunneli UUID-d, `credentials-file`-i ja `ingress`-marsruutimist, mistõttu
  parameetrit `--url` ei edastata ning Zero Trusti juhtpaneeli luba pole vaja. `run` loeb
  mandaate konfiguratsioonis määratud `credentials-file`-i absoluutselt teelt — faili `cert.pem`
  pole vaja (seda kasutatakse ainult tunneli elutsükli haldamiseks).

Põhikäitumised:

- **Automaatne installimine.** Esmakordsel kasutamisel laadib OmniRoute alla uusima `cloudflared`-i
  binaarfaili ametlikest GitHubi väljalasetest (hallatud install asub kataloogis
  `DATA_DIR/cloudflared/`). Allalaaditud artefakti SHA256 kontrollitakse enne käivitamist
  väljalaske manifesti alusel.
- **Protsessi järelevalve.** Cloudflaredi PID ja tuvastatud URL talletatakse failis
  `quick-tunnel-state.json`, et juhtpaneel saaks pärast uuesti laadimist oleku taastada.

### Nimega tunneli seadistamine (püsiv hostinimi)

1. Looge cloudflaredi CLI abil kohalikult hallatav tunnel (ühekordselt):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Looge fail `~/.cloudflared/config.yml`, mis marsruudib teie hostinime OmniRoute'i kohalikku
   API porti (vaikimisi 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Suunake OmniRoute konfiguratsioonile ja (taas)käivitage tunnel:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # valikuline — alistab hostinime, mille OmniRoute esitab; vastasel juhul loetakse see
   # konfiguratsiooni esimesest ingress-reeglist:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Lubage tunnel samamoodi nagu kiirtunnel (REST-i / juhtpaneeli / alltoodud CLI
   kaudu). Nimega tunnel ei väljasta avalikku URL-i, mida saaks eraldada, seega tuvastatakse
   valmisolek cloudflaredi registreeritud servavõrguühenduse põhjal ning `publicUrl`/`apiUrl`
   esitatakse `CLOUDFLARED_HOSTNAME`-i (või konfiguratsiooni esimese ingress-hostinime) alusel.

### Lubamine / keelamine REST-i kaudu

Lõpp-punkt kasutab päringukeha `{action: "enable" | "disable"}`, mitte eraldi
`start`/`stop` teid. Vajalik on haldusautentimine (administraatori seanss või administraatori API võti).

```bash
# Luba
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Olek
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Keela
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Või juhtpaneeli kaudu: **Settings → Tunnels → Cloudflare**.

### Valikulised keskkonnamuutujad

| Muutuja                                              | Otstarve                                                                                                                                                                         |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Kahendfaili tee alistamine. Kui see on määratud ja kehtiv, kasutab OmniRoute seda allalaadimise asemel.                                                                          |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Transpordiprotokoll (vaikimisi `http2`; toetatud on ka `quic` ja `auto`).                                                                                                        |
| `CLOUDFLARED_CONFIG`                                 | Kohalikult hallatava cloudflaredi faili `config.yml` tee. Kui see on määratud, käivitab OmniRoute kiirtunneli asemel **nimelise/püsiva** tunneli (`tunnel --config <path> run`). |
| `CLOUDFLARED_HOSTNAME`                               | Alistab nimelise tunneli avaliku hostinime (nt `ai.example.com`). Kui see pole määratud, loetakse hostinimi konfiguratsiooni esimesest `ingress`-kirjest.                        |

## 2. ngrok

`src/lib/ngrokTunnel.ts` kasutab **`@ngrok/ngrok` SDK-d** (protsessisisene, ilma CLI
alamprotsessita). Omamoodul imporditakse laisalt esimesel käivitamisel, et
eelkompileeritud kahendfailideta platvormid ei põhjustaks rakenduse käivitamisel tõrget.

### Eeltingimused

1. Registreeruge aadressil <https://ngrok.com>.
2. Kopeerige oma autentimistõend ngroki juhtpaneelilt.
3. Sisestage see ühel järgmistest viisidest:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, või
   - juhtpaneel: **Settings → Tunnels → ngrok**, või
   - REST-päringu keha (ühekordne): `{"action":"enable","authToken":"<token>"}`.

Kui kumbagi pole seadistatud, tagastab olek `phase: "needs_auth"`.

### Lubamine/keelamine REST-i kaudu

```bash
# Luba (kasutab keskkonnast muutujat NGROK_AUTHTOKEN)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Luba päringusisese tõendiga
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Olek
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Keela
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Vastus sisaldab määratud `publicUrl`-i (nt
`https://abcd-1234.ngrok-free.app`). Kohandatud domeenid, piirkonnad ja reeglid
tuleb seadistada ngroki juhtpaneelil — OmniRoute edastab SDK-le ainult kohaliku
siht-URL-i.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` juhib süsteemi `tailscale` CLI-d, et avaldada
kohalik API-port **Funneli** kaudu (Tailscale'i avaliku interneti väljund serveerimiseks).
See toetab kogu elutsüklit: installimist, sisselogimist, deemoni käivitamist, lubamist ja keelamist.

Teostus käivitab käsu `tailscale funnel --bg <port>` (taustarežiim). Avaliku
URL-i kuju on `https://<machine>.<tailnet>.ts.net/`.

### Eeltingimused

1. Installige Tailscale (või laske OmniRoute'il seda teha — vt allpool olevat `install` lõpp-punkti).
2. Logige sisse (`tailscale login` või OmniRoute'i `login` lõpp-punkti kaudu).
3. Lubage Funnel oma tailneti jaoks Tailscale'i halduskonsoolis:
   <https://login.tailscale.com/admin/settings/features>.

Linuxis ja macOS-is vajab deemon (`tailscaled`) juhtimiseks käsku `sudo`.
POST-lõpp-punktid aktsepteerivad valikulist välja `sudoPassword`, mis edastatakse
väljakutse ajaks OmniRoute'i MITM-paroolivahemällu (`getCachedPassword` / `setCachedPassword`).
Windows kasutab vaikimisi teenuse installatsiooni asukohas
`C:\Program Files\Tailscale\tailscale.exe`.

### REST-lõpp-punktid

Tailscale'il on teistest taustsüsteemidest rohkem funktsioone, sest installimine,
sisselogimine, deemon ja tunnel on eraldiseisvad osad.

| Lõpp-punkt                            | Meetod | Otstarve                                                                     |
| ------------------------------------- | ------ | ---------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Koondatud tunneli olek (`phase`, `tunnelUrl`, `apiUrl` jne)                  |
| `/api/tunnels/tailscale/check`        | `GET`  | Madalama taseme kontroll: installitud? sisse logitud? deemon töötab?         |
| `/api/tunnels/tailscale/install`      | `POST` | Installi Tailscale (SSE kaudu voogedastatud edenemissündmused) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Käivita `tailscaled` Linuxis/macOS-is                                        |
| `/api/tunnels/tailscale/login`        | `POST` | Alusta sisselogimisvoogu; tagastab brauseris avatava `authUrl`-i             |
| `/api/tunnels/tailscale/enable`       | `POST` | Käivita API-pordi Funnel                                                     |
| `/api/tunnels/tailscale/disable`      | `POST` | Peata Funnel                                                                 |

Kõik Tailscale'i lõpp-punktid nõuavad halduse autentimist (vt `routeUtils.ts ::
requireTailscaleAuth`).

Lubamise näide:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Kui Funnel pole halduskonsoolis lubatud, sisaldab vastus välja
`funnelNotEnabled: true` ja brauseris avatavat `enableUrl`-i.

### Valikulised keskkonnamuutujad

| Muutuja         | Otstarve                                   |
| --------------- | ------------------------------------------ |
| `TAILSCALE_BIN` | Alistab `tailscale` kahendfaili asukohatee |

## Lõpp-punktide kokkuvõte

| Lõpp-punkt                            | Meetod | Keha                                | Autentimine |
| ------------------------------------- | ------ | ----------------------------------- | ----------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | haldus      |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | haldus      |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | haldus      |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | haldus      |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | haldus      |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | haldus      |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | haldus      |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | haldus      |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | haldus      |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | haldus      |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | haldus      |

Keskset `/api/settings/tunnels` lõpp-punkti ei ole — iga taustsüsteem on
sõltumatu.

## OAuthi tagasikutsega seotud kaalutlused

Kui avaldate OmniRoute’i tunneli kaudu, peavad juhtpaneel ja OAuthi vood
koostama tagasikutse URL-id **avaliku** hostinime, mitte `localhost`-i alusel. Vastasel juhul
suunab OAuthi pakkuja kasutaja tagasi URL-ile, millele tema serverid ligi ei pääse,
ja käepigistus nurjub.

Juhtpaneelil tehtavad muudatused ja seadete salvestamine ei nõua tunneli hostinime fikseerimist
muutujas `NEXT_PUBLIC_BASE_URL`. Autenditud juhtpaneel saadab sama päritoluga ebaturvalised
päringud koos seansiga seotud CSRF-loaga, seega saab ajutisi Cloudflare Quick Tunneli
hoste pärast sisselogimist endiselt tavapäraseks kasutajaliidese kaudu haldamiseks kasutada.

Määrake:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

ja taaskäivitage OmniRoute enne OAuthi käivitamist. Ajutiste Cloudflare Quick
Tunnelite URL muutub pärast iga taaskäivitust, seega eelistage tootmiskeskkonna OAuthi jaoks
reserveeritud domeeniga ngrokki või Tailscale Funnelit.

## Seisundikontroll ja seire

Juhtpaneel kuvab tunneli oleku jaotises **Seaded → Tunnelid**:

- Aktiivsed taustsüsteemid ja praegune `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Praegune avalik URL ja sellest tuletatud API URL (`<publicUrl>/v1`).
- Kohalik siht-URL, kuhu tunnel liikluse edastab.
- Viimane veateade, kui see on olemas.

Programmiliseks seireks küsitlege iga taustsüsteemi `GET`-lõpp-punkte. Rohkem kui ühe
taustsüsteemi samaaegne käitamine on lubatud; OmniRoute jälgib igaüht
eraldi.

## Tõrkeotsing

### „cloudflared binaarfaili ei leitud”

OmniRoute proovib esmakordsel kasutamisel automaatselt installida. Kui installimine on blokeeritud
(piiratud võrk, puudub juurdepääs GitHubile), laadige `cloudflared` käsitsi alla aadressilt
<https://github.com/cloudflare/cloudflared/releases> ja määrake
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### „ngrok: autentimistõend on nõutav”

`phase: "needs_auth"` tähendab, et autentimistõendit ei leitud. Määrake `NGROK_AUTHTOKEN` failis
`.env`, seadistage see juhtpaneeli kaudu või edastage `authToken` lubamise POST-päringu
kehas.

### „tailscale: Funnel pole lubatud”

Kui lubamise vastus sisaldab `funnelNotEnabled: true`, on Funnel teie
tailneti jaoks keelatud. Avage tagastatud `enableUrl` (või halduskonsooli funktsioonide
leht) ja lülitage Funnel sisse.

### Tunneli URL-i muutumine rikub OAuthi

Kasutage reserveeritud domeeniga ngrokki või Tailscale Funnelit (mõlemad on sõlmepõhiselt stabiilsed).
Cloudflare Quick Tunnelid on olemuselt ajutised ega ole soovitatavad
pikaajaliseks OAuthi tagasikutsete kasutamiseks.

### Tailscale’i kasutamisel Linuxis/macOS-is puudub luba

`tailscaled` vajab juurkasutaja õigusi. Edastage asjakohasele POST-lõpp-punktile `sudoPassword`
või käivitage deemon ise (`sudo systemctl start tailscaled`).

## Vaata ka

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — väljaminev puhverserver (1proxy, SOCKS5, HTTP)
  väljuva liikluse jaoks.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — keskkonnamuutujate täielik loend, sealhulgas
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — tunnelduse alternatiivid stabiilseks
  avalikuks majutuseks.
- Lähtekood: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
