# Tunnels Guide (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Pirminis šaltinis:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Paskutinį kartą atnaujinta:** 2026-06-28 — v3.8.40

OmniRoute gali padaryti savo vietinį serverį (`http://localhost:20128`) pasiekiamą iš viešojo
interneto per tris tunelių realizacijas. Tai naudinga:

- OAuth atgaliniams iškvietimams iš debesijos paslaugų teikėjų (Antigravity, Gemini, Cursor), kuriems reikia
  viešai pasiekiamo peradresavimo URL.
- Norint bendrinti vietinį egzempliorių su komandos nariais nediegiant VM.
- Testuojant mobiliuosiuose įrenginiuose, nuotoliniu būdu arba skirtinguose tinkluose.

Visos trys realizacijos valdomos tame pačiame procese — OmniRoute paleidžia ir sustabdo atitinkamą
dvejetainį failą arba SDK iš valdymo skydelio ar per REST API. Atvirkštinio tarpinio serverio ar systemd konfigūruoti
nereikia.

## Trumpa realizacijų apžvalga

| Realizacija                 | Pastovumas                                                          | Kaina                            | Sąranka                                                            |
| --------------------------- | ------------------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------ |
| **Cloudflare Quick Tunnel** | Laikinas (URL keičiasi po kiekvieno paleidimo iš naujo)             | Nemokama                         | Nereikalinga — automatiškai įdiegia `cloudflared`                  |
| **ngrok**                   | Pastovus, kai sukonfigūruotas mokamas planas arba fiksuotas domenas | Nemokamas planas + mokami planai | Reikia ngrok paskyros ir autentifikavimo prieigos rakto            |
| **Tailscale Funnel**        | Pastovus kiekvienam jūsų tailnet mazgui                             | Nemokama asmeniniam naudojimui   | Reikia įdiegti Tailscale, prisijungti ir sukonfigūruoti Funnel ACL |

Realizacijos yra failuose `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` ir `src/lib/tailscaleTunnel.ts`. Visos trys grąžina vienodos
struktūros `status` objektą su laukais `phase`, `running`, `publicUrl`, `apiUrl`,
`targetUrl` ir `lastError`, todėl valdymo skydelis gali jas pateikti vienodai.

## 1. Cloudflare tunelis (spartusis tunelis + vardinis tunelis)

`src/lib/cloudflaredTunnel.ts` paleidžia `cloudflared` kaip antrinį procesą. Jis palaiko
du režimus, pasirenkamus pagal tai, ar pateikta vardinio tunelio konfigūracija:

- **Spartusis tunelis (numatytasis).** Vykdo `cloudflared tunnel --url
http://localhost:<apiPort>` ir iš standartinės išvesties išgauna priskirtą `*.trycloudflare.com` URL.
  URL yra laikini ir keičiasi po kiekvieno paleidimo iš naujo.
- **Vardinis tunelis (pasirenkamas).** Kai `CLOUDFLARED_CONFIG` nurodo vietoje valdomą
  cloudflared `config.yml`, OmniRoute vykdo `cloudflared tunnel --no-autoupdate
--config <path> run`, todėl gaunate **pastovų vardinį pagrindinio kompiuterio adresą**. Konfigūracijoje
  pateikiami tunelio UUID, `credentials-file` ir `ingress` maršruto parinkimo duomenys, todėl
  `--url` neperduodamas ir Zero Trust valdymo skydelio prieigos raktas nereikalingas. `run` nuskaito
  prisijungimo duomenis iš konfigūracijoje pateikto absoliutaus `credentials-file` kelio — `cert.pem`
  nereikalingas (jis naudojamas tik tunelio gyvavimo ciklui valdyti).

Pagrindinės veikimo ypatybės:

- **Automatinis diegimas.** Naudojant pirmą kartą, OmniRoute atsisiunčia naujausią `cloudflared`
  dvejetainį failą iš oficialių GitHub leidimų (valdomas diegimas saugomas kataloge
  `DATA_DIR/cloudflared/`). Prieš vykdant patikrinama atsisiųsto ištekliaus SHA256 kontrolinė suma pagal
  leidimo manifestą.
- **Proceso priežiūra.** cloudflared PID ir nustatytas URL išsaugomi faile
  `quick-tunnel-state.json`, kad valdymo skydelis galėtų atkurti būseną po puslapio įkėlimo iš naujo.

### Vardinio tunelio sąranka (pastovus pagrindinio kompiuterio adresas)

1. Sukurkite vietoje valdomą tunelį naudodami cloudflared CLI (vieną kartą):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Sukurkite `~/.cloudflared/config.yml`, nukreipiantį jūsų pagrindinio kompiuterio adresą į vietinį
   OmniRoute API prievadą (numatytasis — 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Nurodykite OmniRoute konfigūracijos failą ir (iš naujo) paleiskite tunelį:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # neprivaloma — pakeičia OmniRoute pateikiamą pagrindinio kompiuterio adresą; kitu atveju jis nuskaitomas iš
   # pirmosios konfigūracijos ingress taisyklės:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Įjunkite tunelį taip pat, kaip spartųjį tunelį (per REST / valdymo skydelį / toliau pateiktą CLI).
   Vardinis tunelis nepateikia viešojo URL, kurį būtų galima išgauti, todėl pasirengimas nustatomas
   pagal cloudflared užregistruotą ryšį su kraštiniu serveriu, o `publicUrl`/`apiUrl` pateikiami
   pagal `CLOUDFLARED_HOSTNAME` (arba pirmąjį konfigūracijos ingress pagrindinio kompiuterio adresą).

### Įjungimas / išjungimas per REST

Galinis taškas naudoja turinį `{action: "enable" | "disable"}`, o ne atskirus
`start`/`stop` kelius. Būtinas valdymo autentifikavimas (administratoriaus sesija arba administratoriaus API raktas).

```bash
# Įjungti
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Būsena
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Išjungti
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Arba valdymo skydelyje: **Settings → Tunnels → Cloudflare**.

### Neprivalomi aplinkos kintamieji

| Kintamasis                                           | Paskirtis                                                                                                                                                                                                |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Nepaisyti numatytojo dvejetainio failo kelio. Jei nustatytas ir galiojantis, „OmniRoute“ jį naudoja užuot atsisiuntusi.                                                                                  |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Transporto protokolas (numatytasis `http2`; taip pat `quic`, `auto`).                                                                                                                                    |
| `CLOUDFLARED_CONFIG`                                 | Kelias į vietoje valdomą „cloudflared“ failą `config.yml`. Kai nustatytas, „OmniRoute“ paleidžia **vardinį / nuolatinį** tunelį (`tunnel --config <path> run`), o ne spartųjį tunelį.                    |
| `CLOUDFLARED_HOSTNAME`                               | Nepaisyti vardinio tunelio nurodyto viešojo pagrindinio kompiuterio vardo (pvz., `ai.example.com`). Jei nenustatyta, jis nuskaitomas iš pirmojo `ingress` pagrindinio kompiuterio vardo konfigūracijoje. |

## 2. ngrok

`src/lib/ngrokTunnel.ts` naudoja **`@ngrok/ngrok` SDK** (vykdomą tame pačiame procese, be CLI poprocesio). Savasis modulis tingiai importuojamas pirmą kartą paleidžiant, todėl platformose, kurioms nėra iš anksto sukompiliuotų dvejetainių failų, programa paleidimo metu nenustoja veikti.

### Būtinosios sąlygos

1. Užsiregistruokite adresu <https://ngrok.com>.
2. Nukopijuokite savo autentifikavimo prieigos raktą iš ngrok valdymo skydelio.
3. Pateikite jį vienu iš šių būdų:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, arba
   - valdymo skydelyje: **Settings → Tunnels → ngrok**, arba
   - REST užklausos turinyje (vienkartiniam naudojimui): `{"action":"enable","authToken":"<token>"}`.

Jei nesukonfigūruotas nė vienas variantas, būsenoje grąžinama `phase: "needs_auth"`.

### Įjungimas / išjungimas per REST

```bash
# Įjungti (naudojamas NGROK_AUTHTOKEN iš aplinkos)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Įjungti, nurodant prieigos raktą tiesiogiai
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Būsena
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Išjungti
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Atsakyme pateikiamas priskirtas `publicUrl` (pvz.,
`https://abcd-1234.ngrok-free.app`). Pasirinktiniai domenai, regionai ir strategijos taisyklės turi būti konfigūruojami ngrok valdymo skydelyje — pati OmniRoute tik perduoda vietinio paskirties taško URL SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` koordinuoja sistemos `tailscale` CLI, kad vietinis API prievadas būtų pasiekiamas per **Funnel** (Tailscale viešojo interneto išvestį, skirtą „serve“ funkcijai). Palaikomas visas gyvavimo ciklas: diegimas, prisijungimas, tarnybos paleidimas, įjungimas ir išjungimas.

Realizacija iškviečia `tailscale funnel --bg <port>` (foninį režimą). Viešojo URL formatas yra `https://<machine>.<tailnet>.ts.net/`.

### Būtinosios sąlygos

1. Įdiekite Tailscale (arba leiskite tai padaryti OmniRoute — žr. toliau aprašytą `install` galinį tašką).
2. Prisijunkite (`tailscale login` arba naudodami OmniRoute `login` galinį tašką).
3. Įjunkite Funnel savo „tailnet“ tinkle, naudodami Tailscale administravimo konsolę:
   <https://login.tailscale.com/admin/settings/features>.

Linux ir macOS sistemose tarnybai (`tailscaled`) valdyti reikia `sudo`. POST galiniai taškai priima pasirinktinį lauką `sudoPassword`, kuris užklausos vykdymo laikotarpiu perduodamas OmniRoute MITM slaptažodžių podėliui (`getCachedPassword` / `setCachedPassword`). Windows naudojama numatytoji tarnybos diegimo vieta `C:\Program Files\Tailscale\tailscale.exe`.

### REST galiniai taškai

Tailscale turi daugiau galimybių nei kitos posistemės, nes diegimas, prisijungimas, tarnyba ir tunelis yra atskiri komponentai.

| Galinis taškas                        | Metodas | Paskirtis                                                                          |
| ------------------------------------- | ------- | ---------------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`   | Apibendrinta tunelio būsena (`phase`, `tunnelUrl`, `apiUrl` ir kt.)                |
| `/api/tunnels/tailscale/check`        | `GET`   | Žemesnio lygio patikra: ar įdiegta? ar prisijungta? ar tarnyba veikia?             |
| `/api/tunnels/tailscale/install`      | `POST`  | Įdiegti Tailscale (SSE srautu perduodami eigos įvykiai) — Linux/macOS              |
| `/api/tunnels/tailscale/start-daemon` | `POST`  | Paleisti `tailscaled` Linux/macOS sistemose                                        |
| `/api/tunnels/tailscale/login`        | `POST`  | Pradėti prisijungimo procesą; grąžinamas `authUrl`, kurį reikia atverti naršyklėje |
| `/api/tunnels/tailscale/enable`       | `POST`  | Paleisti API prievado Funnel                                                       |
| `/api/tunnels/tailscale/disable`      | `POST`  | Sustabdyti Funnel                                                                  |

Visiems Tailscale galiniams taškams būtinas valdymo autentifikavimas (žr. `routeUtils.ts ::
requireTailscaleAuth`).

Įjungimo pavyzdys:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Jei Funnel neįjungtas administravimo konsolėje, atsakyme pateikiama
`funnelNotEnabled: true` ir `enableUrl`, kurį reikia atverti naršyklėje.

### Pasirinktiniai aplinkos kintamieji

| Kintamasis      | Paskirtis                                     |
| --------------- | --------------------------------------------- |
| `TAILSCALE_BIN` | Perrašyti `tailscale` dvejetainio failo kelią |

## Galinių taškų suvestinė

| Galinis taškas                        | Metodas | Turinys                             | Autentifikavimas |
| ------------------------------------- | ------- | ----------------------------------- | ---------------- |
| `/api/tunnels/cloudflared`            | `GET`   | —                                   | valdymo          |
| `/api/tunnels/cloudflared`            | `POST`  | `{action: "enable" \| "disable"}`   | valdymo          |
| `/api/tunnels/ngrok`                  | `GET`   | —                                   | valdymo          |
| `/api/tunnels/ngrok`                  | `POST`  | `{action, authToken?}`              | valdymo          |
| `/api/tunnels/tailscale`              | `GET`   | —                                   | valdymo          |
| `/api/tunnels/tailscale/check`        | `GET`   | —                                   | valdymo          |
| `/api/tunnels/tailscale/install`      | `POST`  | `{sudoPassword?}` (SSE)             | valdymo          |
| `/api/tunnels/tailscale/start-daemon` | `POST`  | `{sudoPassword?}`                   | valdymo          |
| `/api/tunnels/tailscale/login`        | `POST`  | `{hostname?}`                       | valdymo          |
| `/api/tunnels/tailscale/enable`       | `POST`  | `{sudoPassword?, hostname?, port?}` | valdymo          |
| `/api/tunnels/tailscale/disable`      | `POST`  | `{sudoPassword?}`                   | valdymo          |

Centrinio `/api/settings/tunnels` galinio taško nėra — kiekviena posistemė yra
nepriklausoma.

## OAuth atgalinio iškvietimo aspektai

Kai OmniRoute pasiekiamas per tunelį, valdymo skydelis ir OAuth srautai turi
sudaryti atgalinio iškvietimo URL pagal **viešąjį** pagrindinio kompiuterio vardą, o ne `localhost`. Priešingu atveju
OAuth teikėjas nukreipia naudotoją atgal į URL, kurio jo serveriai negali pasiekti,
todėl apsikeitimas nepavyksta.

Redaguojant valdymo skydelyje ir išsaugant nustatymus tunelio pagrindinio kompiuterio vardo
nereikia fiksuoti `NEXT_PUBLIC_BASE_URL`. Autentifikuotas valdymo skydelis siunčia tos pačios kilmės nesaugiąsias
užklausas su sesija susietu CSRF prieigos raktu, todėl laikinuosius Cloudflare Quick Tunnel
pagrindinio kompiuterio vardus vis tiek galima naudoti įprastam naudotojo sąsajos valdymui prisijungus.

Nustatykite:

```bash
NEXT_PUBLIC_BASE_URL=https://<jūsų-tunelio-pagrindinio-kompiuterio-vardas>
```

ir prieš pradėdami OAuth iš naujo paleiskite OmniRoute. Laikinųjų Cloudflare Quick
Tunnel tunelių URL pasikeičia po kiekvieno paleidimo iš naujo, todėl produkcinėje aplinkoje naudojant OAuth
pirmenybę teikite ngrok su rezervuotu domenu arba Tailscale Funnel.

## Veikimo būklė ir stebėjimas

Valdymo skydelyje tunelio būsena rodoma skiltyje **Nustatymai → Tuneliai**:

- Aktyvi posistemė (arba posistemės) ir dabartinė `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Dabartinis viešasis URL ir iš jo sudarytas API URL (`<publicUrl>/v1`).
- Vietinio paskirties taško URL, į kurį tunelis persiunčia srautą.
- Paskutinis klaidos pranešimas, jei toks yra.

Norėdami stebėti programiškai, periodiškai siųskite užklausas į kiekvienos posistemės `GET` galinius taškus. Vienu metu galima
vykdyti daugiau nei vieną posistemę; OmniRoute kiekvieną jų stebės
atskirai.

## Trikčių šalinimas

### „cloudflared dvejetainis failas nerastas“

Pirmą kartą naudojant OmniRoute bando jį įdiegti automatiškai. Jei diegimas blokuojamas
(ribojamas tinklas, nėra prieigos prie GitHub), atsisiųskite `cloudflared` rankiniu būdu iš
<https://github.com/cloudflare/cloudflared/releases> ir nustatykite
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### „ngrok: reikalingas authtoken“

`phase: "needs_auth"` reiškia, kad authtoken nerastas. Nustatykite `NGROK_AUTHTOKEN`
`.env` faile, sukonfigūruokite jį valdymo skydelyje arba perduokite `authToken` įgalinimo POST
užklausos turinyje.

### „tailscale: funnel neįjungtas“

Kai įgalinimo atsakyme yra `funnelNotEnabled: true`, Funnel jūsų
tailnet tinkle yra išjungtas. Atidarykite grąžintą `enableUrl` (arba administratoriaus pulto funkcijos
puslapį) ir įjunkite Funnel.

### Tunelio URL pakeitimai sutrikdo OAuth

Naudokite ngrok su rezervuotu domenu arba Tailscale Funnel (abu kiekvienam mazgui yra stabilūs).
Cloudflare Quick Tunnel tuneliai pagal paskirtį yra laikini ir nerekomenduojami
ilgalaikiams OAuth atgaliniams iškvietimams.

### Prieiga uždrausta Linux/macOS sistemose naudojant Tailscale

`tailscaled` reikalingos root teisės. Atitinkamam POST galiniam taškui perduokite `sudoPassword`
arba paleiskite demoną patys (`sudo systemctl start tailscaled`).

## Taip pat žr.

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — išeinantis tarpinis serveris (1proxy, SOCKS5, HTTP), skirtas
  išeinančiam srautui.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — visas aplinkos kintamųjų sąrašas, įskaitant
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — tunelių alternatyvos stabiliam
  viešajam prieglobai.
- Šaltinis: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
