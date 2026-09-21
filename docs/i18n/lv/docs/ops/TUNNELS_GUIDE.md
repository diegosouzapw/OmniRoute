# Tunnels Guide (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Patiesības avots:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Pēdējoreiz atjaunināts:** 2026-06-28 — v3.8.40

OmniRoute var padarīt savu lokālo serveri (`http://localhost:20128`) pieejamu publiskajā
internetā, izmantojot trīs tuneļu aizmugursistēmas. Tas ir noderīgi:

- OAuth atzvaniem no mākoņpakalpojumu sniedzējiem (Antigravity, Gemini, Cursor), kuriem nepieciešams
  publiski sasniedzams novirzīšanas URL.
- Lokālās instances kopīgošanai ar komandas biedriem bez VM izvietošanas.
- Testēšanai mobilajās ierīcēs, attālināti vai starp dažādiem tīkliem.

Visas trīs aizmugursistēmas tiek pārvaldītas procesa ietvaros — OmniRoute palaiž/aptur pamatā esošo
bināro failu vai SDK no informācijas paneļa vai REST API. Reversā starpniekservera vai systemd konfigurēšana
nav nepieciešama.

## Aizmugursistēmu pārskats

| Aizmugursistēma             | Pastāvīgums                                                | Izmaksas                         | Iestatīšana                                                    |
| --------------------------- | ---------------------------------------------------------- | -------------------------------- | -------------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Īslaicīgs (URL mainās katrā restartēšanas reizē)           | Bez maksas                       | Nav nepieciešama — automātiski instalē `cloudflared`           |
| **ngrok**                   | Stabils, ja ir konfigurēts maksas plāns vai fiksēts domēns | Bezmaksas līmenis + maksas plāni | Nepieciešams ngrok konts un authtoken                          |
| **Tailscale Funnel**        | Stabils katram mezglam jūsu tailnet tīklā                  | Personīgai lietošanai bez maksas | Nepieciešama Tailscale instalēšana, pieteikšanās un Funnel ACL |

Implementācijas atrodas `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` un `src/lib/tailscaleTunnel.ts`. Visas trīs atgriež
vienādas struktūras `status` objektu ar laukiem `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl` un `lastError`, lai informācijas panelis tos varētu attēlot vienotā veidā.

## 1. Cloudflare tunelis (ātrais tunelis + nosauktais tunelis)

`src/lib/cloudflaredTunnel.ts` palaiž `cloudflared` kā bērnprocesu. Tas atbalsta
divus režīmus, kas tiek izvēlēti atkarībā no tā, vai ir norādīta nosauktā tuneļa konfigurācija:

- **Ātrais tunelis (noklusējums).** Palaiž `cloudflared tunnel --url
http://localhost:<apiPort>` un no standarta izvades iegūst piešķirto `*.trycloudflare.com` URL.
  URL ir īslaicīgi un mainās katrā restartēšanas reizē.
- **Nosauktais tunelis (pēc izvēles).** Ja `CLOUDFLARED_CONFIG` norāda uz lokāli pārvaldītu
  cloudflared `config.yml`, OmniRoute palaiž `cloudflared tunnel --no-autoupdate
--config <path> run`, nodrošinot **stabilu, nosauktu resursdatora nosaukumu**. Konfigurācija
  nodrošina tuneļa UUID, `credentials-file` un `ingress` maršrutēšanu, tāpēc
  `--url` netiek nodots un Zero Trust informācijas paneļa pilnvara nav nepieciešama. `run` nolasa
  akreditācijas datus no konfigurācijā norādītā absolūtā `credentials-file` ceļa — `cert.pem`
  nav nepieciešams (tas tiek izmantots tikai tuneļa dzīves cikla pārvaldībai).

Galvenās darbības īpatnības:

- **Automātiska instalēšana.** Pirmajā lietošanas reizē OmniRoute lejupielādē jaunāko `cloudflared`
  bināro failu no oficiālajiem GitHub laidieniem (pārvaldītā instalācija atrodas zem
  `DATA_DIR/cloudflared/`). Pirms izpildes lejupielādētā artefakta SHA256 tiek pārbaudīta pret
  laidiena manifestu.
- **Procesa uzraudzība.** cloudflared PID un atrisinātais URL tiek saglabāti failā
  `quick-tunnel-state.json`, lai informācijas panelis varētu atjaunot statusu pēc pārlādēšanas.

### Nosauktā tuneļa iestatīšana (stabils resursdatora nosaukums)

1. Izveidojiet lokāli pārvaldītu tuneli, izmantojot cloudflared CLI (vienreizēja darbība):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Izveidojiet `~/.cloudflared/config.yml`, kas maršrutē jūsu resursdatora nosaukumu uz OmniRoute lokālo
   API portu (pēc noklusējuma 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Norādiet OmniRoute konfigurācijas failu un (atkārtoti) palaidiet tuneli:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # neobligāti — pārraksta OmniRoute uzrādīto resursdatora nosaukumu; pretējā gadījumā tas tiek nolasīts no
   # konfigurācijas pirmās ingress kārtulas:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Iespējojiet tuneli tāpat kā ātro tuneli (REST / informācijas panelis / CLI
   tālāk). Nosauktais tunelis neizvada publisku URL, ko varētu izgūt, tāpēc gatavība tiek noteikta
   pēc cloudflared reģistrētā savienojuma ar perifērijas tīklu, un `publicUrl`/`apiUrl` tiek
   uzrādīti no `CLOUDFLARED_HOSTNAME` (vai konfigurācijas pirmā ingress resursdatora nosaukuma).

### Iespējošana/atspējošana, izmantojot REST

Galapunkts izmanto pamattekstu `{action: "enable" | "disable"}`, nevis atsevišķus
`start`/`stop` ceļus. Ir nepieciešama pārvaldības autentifikācija (administratora sesija vai administratora API atslēga).

```bash
# Iespējot
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Statuss
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Atspējot
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Vai informācijas panelī: **Iestatījumi → Tuneļi → Cloudflare**.

### Neobligātie vides mainīgie

| Mainīgais                                            | Mērķis                                                                                                                                                                                      |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Pārraksta binārā faila ceļu. Ja tas ir iestatīts un derīgs, OmniRoute izmanto to, nevis veic lejupielādi.                                                                                   |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Transporta protokols (pēc noklusējuma `http2`; pieejami arī `quic`, `auto`).                                                                                                                |
| `CLOUDFLARED_CONFIG`                                 | Ceļš uz lokāli pārvaldītu cloudflared `config.yml`. Ja tas ir iestatīts, OmniRoute ātrā tuneļa vietā palaiž **nosauktu/pastāvīgu** tuneli (`tunnel --config <path> run`).                   |
| `CLOUDFLARED_HOSTNAME`                               | Pārraksta nosauktā tuneļa publiski uzrādīto resursdatora nosaukumu (piem., `ai.example.com`). Ja nav iestatīts, tas tiek nolasīts no konfigurācijas pirmā `ingress` resursdatora nosaukuma. |

## 2. ngrok

`src/lib/ngrokTunnel.ts` izmanto **`@ngrok/ngrok` SDK** (procesā, bez CLI
apakšprocesa). Vietējais modulis tiek importēts atlikti pirmās palaišanas laikā,
lai platformās bez iepriekš kompilētiem binārajiem failiem lietotnes palaišana
neizraisītu kļūmi.

### Priekšnosacījumi

1. Reģistrējieties vietnē <https://ngrok.com>.
2. Nokopējiet savu autentifikācijas pilnvaru no ngrok informācijas paneļa.
3. Norādiet to kādā no šiem veidiem:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, vai
   - informācijas panelī: **Settings → Tunnels → ngrok**, vai
   - REST pamattekstā (vienreizēji): `{"action":"enable","authToken":"<token>"}`.

Ja nav konfigurēta neviena no iespējām, statuss atgriež `phase: "needs_auth"`.

### Iespējošana/atspējošana, izmantojot REST

```bash
# Iespējot (izmanto NGROK_AUTHTOKEN no vides)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Iespējot ar iekļautu pilnvaru
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Statuss
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Atspējot
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Atbildē ir iekļauts piešķirtais `publicUrl` (piemēram,
`https://abcd-1234.ngrok-free.app`). Pielāgoti domēni, reģioni un politiku
kārtulas ir jākonfigurē ngrok informācijas panelī — OmniRoute tikai pārsūta
lokālā mērķa URL uz SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` koordinē sistēmas `tailscale` CLI, lai lokālo API
portu padarītu pieejamu, izmantojot **Funnel** (Tailscale publiskā interneta
izejas mehānismu serve funkcijai). Tas atbalsta pilnu dzīves ciklu: instalēšanu,
pieteikšanos, dēmona palaišanu, iespējošanu un atspējošanu.

Implementācija izsauc `tailscale funnel --bg <port>` (fona režīmā). Publiskā URL
formāts ir `https://<machine>.<tailnet>.ts.net/`.

### Priekšnosacījumi

1. Instalējiet Tailscale (vai ļaujiet OmniRoute to izdarīt — skatiet tālāk
   aprakstīto `install` galapunktu).
2. Piesakieties (`tailscale login` vai izmantojot OmniRoute `login` galapunktu).
3. Iespējojiet Funnel savam tailnet Tailscale administrēšanas konsolē:
   <https://login.tailscale.com/admin/settings/features>.

Linux un macOS sistēmās dēmona (`tailscaled`) pārvaldībai ir nepieciešams
`sudo`. POST galapunkti pieņem neobligātu lauku `sudoPassword`, kas izsaukuma
laikā tiek pārsūtīts uz OmniRoute MITM paroļu kešatmiņu (`getCachedPassword` /
`setCachedPassword`). Windows izmanto noklusējuma pakalpojuma instalāciju:
`C:\Program Files\Tailscale\tailscale.exe`.

### REST galapunkti

Tailscale saskarne ir plašāka nekā citām aizmugursistēmām, jo instalēšana,
pieteikšanās, dēmons un tunelis ir atsevišķi pārvaldāmi elementi.

| Galapunkts                            | Metode | Nolūks                                                             |
| ------------------------------------- | ------ | ------------------------------------------------------------------ |
| `/api/tunnels/tailscale`              | `GET`  | Apkopots tuneļa statuss (`phase`, `tunnelUrl`, `apiUrl` utt.)      |
| `/api/tunnels/tailscale/check`        | `GET`  | Zemāka līmeņa pārbaude: instalēts? pieteicies? dēmons darbojas?    |
| `/api/tunnels/tailscale/install`      | `POST` | Instalēt Tailscale (SSE straumēti progresa notikumi) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Palaist `tailscaled` Linux/macOS sistēmā                           |
| `/api/tunnels/tailscale/login`        | `POST` | Sākt pieteikšanās procesu; atgriež `authUrl`, ko atvērt pārlūkā    |
| `/api/tunnels/tailscale/enable`       | `POST` | Palaist API porta Funnel                                           |
| `/api/tunnels/tailscale/disable`      | `POST` | Apturēt Funnel                                                     |

Visiem Tailscale galapunktiem ir nepieciešama pārvaldības autentifikācija
(skatiet `routeUtils.ts :: requireTailscaleAuth`).

Iespējošanas piemērs:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Ja Funnel nav iespējots administrēšanas konsolē, atbildē tiek iekļauts
`funnelNotEnabled: true`, kā arī `enableUrl`, kas jāatver pārlūkā.

### Neobligātie vides mainīgie

| Mainīgais       | Nolūks                                   |
| --------------- | ---------------------------------------- |
| `TAILSCALE_BIN` | Pārrakstīt `tailscale` binārā faila ceļu |

## Galapunktu kopsavilkums

| Galapunkts                            | Metode | Saturs                              | Autentifikācija |
| ------------------------------------- | ------ | ----------------------------------- | --------------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | pārvaldība      |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | pārvaldība      |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | pārvaldība      |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | pārvaldība      |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | pārvaldība      |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | pārvaldība      |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | pārvaldība      |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | pārvaldība      |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | pārvaldība      |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | pārvaldība      |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | pārvaldība      |

Nav centrāla `/api/settings/tunnels` galapunkta — katra aizmugursistēma ir
neatkarīga.

## OAuth atzvanīšanas apsvērumi

Kad OmniRoute tiek padarīts pieejams, izmantojot tuneli, informācijas panelim un OAuth plūsmām
atzvanīšanas vietrāži URL ir jāveido, izmantojot **publisko** resursdatora nosaukumu, nevis `localhost`. Pretējā gadījumā
OAuth nodrošinātājs novirza lietotāju atpakaļ uz vietrādi URL, kuru tā serveri nevar sasniegt,
un rokasspiediens neizdodas.

Informācijas paneļa labojumiem un iestatījumu saglabāšanai nav nepieciešams piesaistīt tuneļa resursdatora nosaukumu
mainīgajā `NEXT_PUBLIC_BASE_URL`. Autentificētais informācijas panelis sūta vienas izcelsmes nedrošos
pieprasījumus ar sesijai piesaistītu CSRF marķieri, tādēļ īslaicīgos Cloudflare Quick Tunnel
resursdatorus joprojām var izmantot parastai lietotāja saskarnes pārvaldībai pēc pieteikšanās.

Iestatiet:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

un pirms OAuth sākšanas restartējiet OmniRoute. Īslaicīgajiem Cloudflare Quick
Tunnels vietrādis URL mainās pēc katras restartēšanas, tādēļ OAuth izmantošanai produkcijas vidē dodiet priekšroku ngrok ar rezervētu
domēnu vai Tailscale Funnel.

## Darbspēja un pārraudzība

Informācijas panelī tuneļa stāvoklis ir redzams sadaļā **Iestatījumi → Tuneļi**:

- Aktīvā(-ās) aizmugursistēma(-as) un pašreizējais `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Pašreizējais publiskais vietrādis URL un no tā atvasinātais API vietrādis URL (`<publicUrl>/v1`).
- Lokālais mērķa vietrādis URL, uz kuru tunelis pārsūta savienojumu.
- Pēdējais kļūdas ziņojums, ja tāds ir.

Programmiskai pārraudzībai periodiski aptaujājiet katras aizmugursistēmas `GET` galapunktus. Vairāku
aizmugursistēmu vienlaicīga darbināšana ir atļauta; OmniRoute katru no tām izsekos
neatkarīgi.

## Problēmu novēršana

### "cloudflared binārais fails nav atrasts"

OmniRoute pirmajā lietošanas reizē mēģina to instalēt automātiski. Ja instalēšana ir bloķēta
(ierobežots tīkls, nav piekļuves GitHub), manuāli lejupielādējiet `cloudflared` no
<https://github.com/cloudflare/cloudflared/releases> un iestatiet
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: nepieciešams authtoken"

`phase: "needs_auth"` nozīmē, ka neviens authtoken netika atrasts. Iestatiet `NGROK_AUTHTOKEN` failā
`.env`, konfigurējiet to informācijas panelī vai nododiet `authToken` iespējošanas POST
pieprasījuma saturā.

### "tailscale: funnel nav iespējots"

Ja iespējošanas atbilde ietver `funnelNotEnabled: true`, Funnel jūsu
tailnet tīklā ir atspējots. Atveriet atgriezto `enableUrl` (vai administrēšanas konsoles funkcijas
lapu) un ieslēdziet Funnel.

### Tuneļa vietrāža URL izmaiņas pārtrauc OAuth darbību

Izmantojiet ngrok ar rezervētu domēnu vai Tailscale Funnel (abi ir stabili katram mezglam).
Cloudflare Quick Tunnels pēc konstrukcijas ir īslaicīgi un nav ieteicami
ilglaicīgām OAuth atzvanīšanām.

### Tailscale piekļuve liegta Linux/macOS vidē

`tailscaled` ir nepieciešamas root tiesības. Nododiet `sudoPassword` attiecīgajam POST galapunktam
vai palaidiet dēmonu pats (`sudo systemctl start tailscaled`).

## Skatiet arī

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — izejošais starpniekserveris (1proxy, SOCKS5, HTTP)
  izejošajai datplūsmai.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — pilns vides mainīgo saraksts, tostarp
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — tunelēšanas alternatīvas stabilai
  publiskai mitināšanai.
- Avots: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
