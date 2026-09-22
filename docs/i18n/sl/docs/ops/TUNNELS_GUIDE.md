# Tunnels Guide (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Referenčni vir:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Zadnja posodobitev:** 2026-06-28 — v3.8.40

OmniRoute lahko svoj lokalni strežnik (`http://localhost:20128`) izpostavi javnemu
internetu prek treh zalednih sistemov za tunele. To je uporabno za:

- Povratne klice OAuth ponudnikov storitev v oblaku (Antigravity, Gemini, Cursor), ki potrebujejo
  javno dostopen URL za preusmeritev.
- Deljenje lokalnega primerka s sodelavci brez uvajanja navideznega računalnika.
- Mobilno, oddaljeno ali medomrežno preizkušanje.

Vsi trije zaledni sistemi se upravljajo znotraj procesa — OmniRoute zažene/ustavi osnovni
binarni program ali SDK prek nadzorne plošče ali API-ja REST. Nastavitev obratnega posredniškega strežnika ali systemd
ni potrebna.

## Pregled zalednih sistemov

| Zaledni sistem              | Obstojnost                                                  | Cena                         | Nastavitev                                             |
| --------------------------- | ----------------------------------------------------------- | ---------------------------- | ------------------------------------------------------ |
| **Cloudflare Quick Tunnel** | Začasna (URL se spremeni ob vsakem ponovnem zagonu)         | Brezplačno                   | Brez nastavitev — samodejno namesti `cloudflared`      |
| **ngrok**                   | Stabilna, če je nastavljen plačljiv paket ali fiksna domena | Brezplačna raven + plačljivo | Zahteva račun ngrok + authtoken                        |
| **Tailscale Funnel**        | Stabilna za posamezno vozlišče znotraj vašega tailneta      | Brezplačno za osebno uporabo | Zahteva namestitev Tailscale + prijavo + ACL za Funnel |

Implementacije so v `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` in `src/lib/tailscaleTunnel.ts`. Vse tri vrnejo
enako oblikovan objekt `status` s polji `phase`, `running`, `publicUrl`, `apiUrl`,
`targetUrl` in `lastError`, zato jih lahko nadzorna plošča prikazuje enotno.

## 1. Cloudflare Tunnel (hitri tunel + poimenovani tunel)

`src/lib/cloudflaredTunnel.ts` zažene `cloudflared` kot podrejeni proces. Podpira
dva načina, izbira pa je odvisna od tega, ali je podana konfiguracija poimenovanega tunela:

- **Hitri tunel (privzeto).** Zažene `cloudflared tunnel --url
http://localhost:<apiPort>` in iz standardnega izhoda razbere dodeljeni URL `*.trycloudflare.com`.
  URL-ji so začasni in se spremenijo ob vsakem ponovnem zagonu.
- **Poimenovani tunel (izbirno).** Ko `CLOUDFLARED_CONFIG` kaže na lokalno upravljano
  datoteko `config.yml` za cloudflared, OmniRoute zažene `cloudflared tunnel --no-autoupdate
--config <path> run`, kar vam zagotovi **stabilno, poimenovano ime gostitelja**. Konfiguracija
  določa UUID tunela, `credentials-file` in usmerjanje `ingress`, zato
  možnost `--url` ni podana in žeton nadzorne plošče Zero Trust ni potreben. `run` bere
  poverilnice z absolutne poti `credentials-file` v konfiguraciji — datoteka `cert.pem`
  ni potrebna (uporablja se samo za upravljanje življenjskega cikla tunela).

Ključne lastnosti:

- **Samodejna namestitev.** Ob prvi uporabi OmniRoute prenese najnovejši binarni program `cloudflared`
  iz uradnih izdaj na GitHubu (upravljana namestitev je shranjena v
  `DATA_DIR/cloudflared/`). Pred izvedbo preveri SHA256 prenesenega sredstva glede na
  manifest izdaje.
- **Nadzor procesa.** PID procesa cloudflared in razrešeni URL se shranita v
  `quick-tunnel-state.json`, da lahko nadzorna plošča po ponovnem nalaganju obnovi stanje.

### Nastavitev poimenovanega tunela (stabilno ime gostitelja)

1. Z vmesnikom ukazne vrstice cloudflared ustvarite lokalno upravljani tunel (enkratno):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Ustvarite datoteko `~/.cloudflared/config.yml`, ki vaše ime gostitelja usmerja na lokalna
   vrata API-ja OmniRoute (privzeto 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Nastavite OmniRoute tako, da uporablja konfiguracijo, in (ponovno) zaženite tunel:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # izbirno — preglasi ime gostitelja, ki ga sporoča OmniRoute; sicer se prebere iz
   # prvega pravila ingress v konfiguraciji:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Tunel omogočite na enak način kot hitri tunel (prek REST / nadzorne plošče / vmesnika ukazne vrstice
   spodaj). Poimenovani tunel ne izpiše javnega URL-ja, ki bi ga bilo mogoče razbrati, zato se pripravljenost zazna
   iz registrirane povezave cloudflared z robnim omrežjem, `publicUrl`/`apiUrl` pa se
   sporočita na podlagi `CLOUDFLARED_HOSTNAME` (ali prvega imena gostitelja ingress v konfiguraciji).

### Omogočanje/onemogočanje prek REST

Končna točka uporablja telo `{action: "enable" | "disable"}` in ne ločenih poti
`start`/`stop`. Zahtevano je skrbniško preverjanje pristnosti (skrbniška seja ali skrbniški ključ API).

```bash
# Omogoči
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Stanje
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Onemogoči
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Ali prek nadzorne plošče: **Nastavitve → Tuneli → Cloudflare**.

### Izbirne okoljske spremenljivke

| Spremenljivka                                        | Namen                                                                                                                                                                                   |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Preglasi pot do binarne datoteke. Če je nastavljena in veljavna, jo OmniRoute uporabi namesto prenosa.                                                                                  |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Transportni protokol (privzeto `http2`; podprta sta tudi `quic` in `auto`).                                                                                                             |
| `CLOUDFLARED_CONFIG`                                 | Pot do lokalno upravljane datoteke `config.yml` za cloudflared. Ko je nastavljena, OmniRoute namesto hitrega tunela zažene **poimenovani/trajni** tunel (`tunnel --config <path> run`). |
| `CLOUDFLARED_HOSTNAME`                               | Preglasi sporočeno javno ime gostitelja poimenovanega tunela (npr. `ai.example.com`). Če ni nastavljena, se ime prebere iz prvega imena gostitelja `ingress` v konfiguraciji.           |

## 2. ngrok

`src/lib/ngrokTunnel.ts` uporablja **SDK `@ngrok/ngrok`** (znotraj procesa, brez podprocesa CLI). Izvorni modul se uvozi odloženo ob prvem zagonu, tako da platforme brez vnaprej prevedenih binarnih datotek ne povzročijo napake aplikacije ob zagonu.

### Predpogoji

1. Registrirajte se na <https://ngrok.com>.
2. Kopirajte svoj žeton za preverjanje pristnosti z nadzorne plošče ngrok.
3. Posredujte ga na enega od naslednjih načinov:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, ali
   - nadzorna plošča: **Settings → Tunnels → ngrok**, ali
   - telo zahteve REST (enkratno): `{"action":"enable","authToken":"<token>"}`.

Če ni konfiguriran nobeden od teh načinov, stanje vrne `phase: "needs_auth"`.

### Omogočanje/onemogočanje prek REST

```bash
# Omogoči (uporabi NGROK_AUTHTOKEN iz okolja)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Omogoči z neposredno navedenim žetonom
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Stanje
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Onemogoči
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Odgovor vključuje dodeljeni `publicUrl` (npr. `https://abcd-1234.ngrok-free.app`). Domene po meri, regije in pravila politik je treba konfigurirati na nadzorni plošči ngrok — OmniRoute posreduje SDK-ju samo URL lokalnega cilja.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` upravlja sistemski CLI `tailscale`, da prek funkcije **Funnel** (Tailscalov izhod v javni internet za streženje) izpostavi vrata lokalnega API-ja. Podpira celoten življenjski cikel: namestitev, prijavo, zagon demona, omogočanje in onemogočanje.

Izvedba prikliče `tailscale funnel --bg <port>` (način v ozadju). Javni URL ima obliko `https://<machine>.<tailnet>.ts.net/`.

### Predpogoji

1. Namestite Tailscale (ali pustite, da to stori OmniRoute — glejte spodnjo končno točko `install`).
2. Prijavite se (`tailscale login` ali prek končne točke `login` v OmniRoute).
3. Omogočite Funnel za svoje omrežje tailnet v skrbniški konzoli Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

V sistemih Linux in macOS demon (`tailscaled`) za upravljanje zahteva `sudo`. Končne točke POST sprejmejo izbirno polje `sudoPassword`, ki se za čas trajanja klica posreduje predpomnilniku gesel MITM v OmniRoute (`getCachedPassword` / `setCachedPassword`). Windows uporablja privzeto namestitev storitve na naslovu `C:\Program Files\Tailscale\tailscale.exe`.

### Končne točke REST

Tailscale ima obsežnejši vmesnik kot druge zaledne storitve, ker so namestitev, prijava, demon in tunel ločene funkcije.

| Končna točka                          | Metoda | Namen                                                          |
| ------------------------------------- | ------ | -------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Združeno stanje tunela (`phase`, `tunnelUrl`, `apiUrl` itd.)   |
| `/api/tunnels/tailscale/check`        | `GET`  | Preverjanje nižje ravni: nameščen? prijavljen? demon deluje?   |
| `/api/tunnels/tailscale/install`      | `POST` | Namestitev Tailscale (dogodki napredka prek SSE) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Zagon `tailscaled` v sistemih Linux/macOS                      |
| `/api/tunnels/tailscale/login`        | `POST` | Začetek prijave; vrne `authUrl`, ki se odpre v brskalniku      |
| `/api/tunnels/tailscale/enable`       | `POST` | Zagon funkcije Funnel za vrata API-ja                          |
| `/api/tunnels/tailscale/disable`      | `POST` | Zaustavitev funkcije Funnel                                    |

Vse končne točke Tailscale zahtevajo skrbniško preverjanje pristnosti (glejte `routeUtils.ts :: requireTailscaleAuth`).

Primer omogočanja:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Če funkcija Funnel ni omogočena v skrbniški konzoli, odgovor vključuje `funnelNotEnabled: true` in `enableUrl`, ki ga lahko odprete v brskalniku.

### Izbirne okoljske spremenljivke

| Spremenljivka   | Namen                                        |
| --------------- | -------------------------------------------- |
| `TAILSCALE_BIN` | Preglasi pot do binarne datoteke `tailscale` |

## Povzetek končnih točk

| Končna točka                          | Metoda | Telo                                | Avtentikacija |
| ------------------------------------- | ------ | ----------------------------------- | ------------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | upravljavska  |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | upravljavska  |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | upravljavska  |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | upravljavska  |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | upravljavska  |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | upravljavska  |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | upravljavska  |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | upravljavska  |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | upravljavska  |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | upravljavska  |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | upravljavska  |

Osrednja končna točka `/api/settings/tunnels` ne obstaja — vsako zaledje je
neodvisno.

## Vidiki povratnih klicev OAuth

Ko OmniRoute izpostavite prek tunela, morajo nadzorna plošča in poteki OAuth
ustvariti URL-je za povratne klice z **javnim** imenom gostitelja, ne z
`localhost`. V nasprotnem primeru ponudnik OAuth uporabnika preusmeri nazaj na
URL, ki ga njegovi strežniki ne morejo doseči, zato rokovanje ne uspe.

Za urejanje na nadzorni plošči in shranjevanje nastavitev ni treba pripeti imena
gostitelja tunela v `NEXT_PUBLIC_BASE_URL`. Avtenticirana nadzorna plošča pošilja
nevarne zahteve istega izvora s sejno vezanim žetonom CSRF, zato lahko po prijavi
za običajno upravljanje uporabniškega vmesnika še vedno uporabljate kratkotrajne
gostitelje Cloudflare Quick Tunnel.

Nastavite:

```bash
NEXT_PUBLIC_BASE_URL=https://<vaš-gostitelj-tunela>
```

in pred začetkom postopka OAuth ponovno zaženite OmniRoute. Pri kratkotrajnih
tunelih Cloudflare Quick Tunnel se URL spremeni po vsakem ponovnem zagonu, zato
za produkcijsko uporabo OAuth raje izberite ngrok z rezervirano domeno ali
Tailscale Funnel.

## Stanje in spremljanje

Nadzorna plošča prikazuje stanje tunela v razdelku **Nastavitve → Tuneli**:

- Aktivna zaledja in trenutni `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Trenutni javni URL in izpeljani URL API-ja (`<publicUrl>/v1`).
- Lokalni ciljni URL, h kateremu tunel posreduje promet.
- Zadnje sporočilo o napaki, če obstaja.

Za programsko spremljanje redno preverjajte končne točke `GET` posameznih
zaledij. Hkratno izvajanje več zaledij je dovoljeno; OmniRoute bo vsakemu sledil
neodvisno.

## Odpravljanje težav

### »Binarne datoteke cloudflared ni mogoče najti«

OmniRoute jo ob prvi uporabi poskuša samodejno namestiti. Če je namestitev
blokirana (omejeno omrežje, ni dostopa do GitHuba), ročno prenesite
`cloudflared` s strani <https://github.com/cloudflare/cloudflared/releases> in
nastavite `CLOUDFLARED_BIN=/path/to/cloudflared`.

### »ngrok: zahtevan je authtoken«

`phase: "needs_auth"` pomeni, da žeton za avtentikacijo ni bil najden. Nastavite
`NGROK_AUTHTOKEN` v `.env`, konfigurirajte ga prek nadzorne plošče ali posredujte
`authToken` v telesu zahteve POST za omogočanje.

### »tailscale: funnel ni omogočen«

Ko odziv za omogočanje vključuje `funnelNotEnabled: true`, je Funnel za vaš
tailnet onemogočen. Odprite vrnjeni `enableUrl` (ali stran funkcije v skrbniški
konzoli) in vklopite Funnel.

### Spremembe URL-ja tunela prekinejo OAuth

Uporabite ngrok z rezervirano domeno ali Tailscale Funnel (oba zagotavljata
stabilen naslov za posamezno vozlišče). Tuneli Cloudflare Quick Tunnel so
zasnovani kot kratkotrajni in niso priporočeni za dolgotrajne povratne klice
OAuth.

### Zavrnjen dostop v sistemu Linux/macOS za Tailscale

`tailscaled` potrebuje korenske pravice. Posredujte `sudoPassword` ustrezni končni
točki POST ali pa demon zaženite sami (`sudo systemctl start tailscaled`).

## Glejte tudi

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — izhodni posredniški strežnik (1proxy, SOCKS5, HTTP) za
  odhodni promet.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — celoten seznam spremenljivk okolja, vključno z
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — alternative tuneliranju za stabilno
  javno gostovanje.
- Izvorna koda: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
