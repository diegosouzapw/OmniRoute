# Tunnels Guide (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **ჭეშმარიტების წყარო:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **ბოლოს განახლდა:** 2026-06-28 — v3.8.40

OmniRoute-ს შეუძლია თავისი ლოკალური სერვერი (`http://localhost:20128`) საჯარო
ინტერნეტში სამი გვირაბის ბეკენდის მეშვეობით გახადოს ხელმისაწვდომი. ეს სასარგებლოა:

- ღრუბლოვანი პროვაიდერების (Antigravity, Gemini, Cursor) OAuth უკუგამოძახებებისთვის,
  რომლებსაც საჯაროდ ხელმისაწვდომი გადამისამართების URL სჭირდებათ.
- თქვენი ლოკალური ინსტანციის თანაგუნდელებთან გასაზიარებლად, VM-ის განთავსების გარეშე.
- მობილური, დისტანციური ან სხვადასხვა ქსელს შორის ტესტირებისთვის.

სამივე ბეკენდი იმავე პროცესიდან იმართება — OmniRoute დაფიდან ან REST API-დან
შესაბამის ბინარულ ფაილს ან SDK-ს უშვებს/აჩერებს. უკუპროქსის ან systemd-ის
კონფიგურაცია საჭირო არ არის.

## ბეკენდების მოკლე მიმოხილვა

| ბეკენდი                     | მუდმივობა                                                         | ღირებულება                    | დაყენება                                            |
| --------------------------- | ----------------------------------------------------------------- | ----------------------------- | --------------------------------------------------- |
| **Cloudflare Quick Tunnel** | დროებითი (URL ყოველი ხელახალი გაშვებისას იცვლება)                 | უფასო                         | არ საჭიროებს — `cloudflared` ავტომატურად ყენდება    |
| **ngrok**                   | სტაბილურია ფასიანი გეგმის ან ფიქსირებული დომენის კონფიგურირებისას | უფასო დონე + ფასიანი          | საჭიროა ngrok-ის ანგარიში + authtoken               |
| **Tailscale Funnel**        | სტაბილურია თითოეული კვანძისთვის თქვენს tailnet-ში                 | უფასოა პირადი გამოყენებისთვის | საჭიროა Tailscale-ის დაყენება + შესვლა + Funnel ACL |

იმპლემენტაციები განთავსებულია `src/lib/cloudflaredTunnel.ts`-ში,
`src/lib/ngrokTunnel.ts`-სა და `src/lib/tailscaleTunnel.ts`-ში. სამივე აბრუნებს
ერთნაირი სტრუქტურის `status` ობიექტს `phase`, `running`, `publicUrl`, `apiUrl`,
`targetUrl` და `lastError` ველებით, რათა დაფამ ისინი ერთგვაროვნად გამოსახოს.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` `cloudflared`-ს შვილობილი პროცესის სახით უშვებს.
მას ორი რეჟიმის მხარდაჭერა აქვს, რომელთა შერჩევაც სახელდებული გვირაბის
კონფიგურაციის არსებობაზეა დამოკიდებული:

- **სწრაფი გვირაბი (ნაგულისხმევი).** უშვებს `cloudflared tunnel --url
http://localhost:<apiPort>`-ს და stdout-იდან მინიჭებულ `*.trycloudflare.com` URL-ს
  ამოიღებს. URL-ები დროებითია და ყოველი ხელახალი გაშვებისას იცვლება.
- **სახელდებული გვირაბი (არჩევითი).** როდესაც `CLOUDFLARED_CONFIG` მიუთითებს
  ლოკალურად მართულ cloudflared-ის `config.yml`-ზე, OmniRoute უშვებს `cloudflared tunnel --no-autoupdate
--config <path> run`-ს, რაც გაძლევთ **სტაბილურ, სახელდებულ ჰოსტის სახელს**. კონფიგურაცია
  განსაზღვრავს გვირაბის UUID-ს, `credentials-file`-სა და `ingress` მარშრუტიზაციას,
  ამიტომ `--url` არ გადაიცემა და Zero Trust-ის დაფის ტოკენი საჭირო არ არის.
  `run` ავტორიზაციის მონაცემებს კონფიგურაციაში მითითებული `credentials-file`-ის
  აბსოლუტური ბილიკიდან კითხულობს — `cert.pem` საჭირო არ არის (ის მხოლოდ გვირაბის
  სასიცოცხლო ციკლის მართვისთვის გამოიყენება).

ძირითადი ქცევები:

- **ავტომატური დაყენება.** პირველი გამოყენებისას OmniRoute უახლეს `cloudflared`
  ბინარულ ფაილს GitHub-ის ოფიციალური რელიზებიდან ჩამოტვირთავს (მართული ინსტალაცია
  `DATA_DIR/cloudflared/`-ში ინახება). გაშვებამდე ჩამოტვირთული რესურსის SHA256
  რელიზის მანიფესტთან მოწმდება.
- **პროცესის ზედამხედველობა.** cloudflared-ის PID და განსაზღვრული URL ინახება
  `quick-tunnel-state.json`-ში, რათა დაფამ გადატვირთვების შემდეგ სტატუსის აღდგენა შეძლოს.

### სახელდებული გვირაბის კონფიგურაცია (სტაბილური ჰოსტის სახელი)

1. cloudflared CLI-ის საშუალებით შექმენით ლოკალურად მართული გვირაბი (ერთჯერადად):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. შექმენით `~/.cloudflared/config.yml`, რომელიც თქვენს ჰოსტის სახელს OmniRoute-ის
   ლოკალურ API პორტზე (ნაგულისხმევად 20128) გადაამისამართებს:

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. მიუთითეთ OmniRoute-ს კონფიგურაცია და (ხელახლა) გაუშვით გვირაბი:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # არასავალდებულო — ჩაანაცვლებს ჰოსტის სახელს, რომელსაც OmniRoute აჩვენებს; წინააღმდეგ შემთხვევაში ის წაიკითხება
   # კონფიგურაციის პირველი ingress წესიდან:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   გვირაბი იმავე გზით ჩართეთ, როგორც სწრაფი გვირაბი (ქვემოთ მოცემული REST / დაფა / CLI).
   სახელდებული გვირაბი ამოსაღებ საჯარო URL-ს არ გამოსცემს, ამიტომ მზადყოფნა
   cloudflared-ის რეგისტრირებული edge კავშირიდან განისაზღვრება, ხოლო
   `publicUrl`/`apiUrl` მიიღება `CLOUDFLARED_HOSTNAME`-იდან (ან კონფიგურაციის
   პირველი ingress ჰოსტის სახელიდან).

### REST-ის მეშვეობით ჩართვა / გამორთვა

ბოლო წერტილი ცალკეული `start`/`stop` ბილიკების ნაცვლად
`{action: "enable" | "disable"}` სხეულს იყენებს. საჭიროა მართვის ავტორიზაცია
(ადმინისტრატორის სესია ან ადმინისტრატორის API გასაღები).

```bash
# ჩართვა
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# სტატუსი
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# გამორთვა
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

ან დაფის მეშვეობით: **პარამეტრები → გვირაბები → Cloudflare**.

### არასავალდებულო გარემოს ცვლადები

| ცვლადი                                               | დანიშნულება                                                                                                                                                                     |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | ბინარული ფაილის ბილიკის გადაფარვა. თუ დაყენებულია და მართებულია, OmniRoute ჩამოტვირთვის ნაცვლად მას იყენებს.                                                                    |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | სატრანსპორტო პროტოკოლი (ნაგულისხმევად `http2`; ასევე `quic`, `auto`).                                                                                                           |
| `CLOUDFLARED_CONFIG`                                 | ლოკალურად მართული cloudflared-ის `config.yml`-ის ბილიკი. დაყენებისას OmniRoute სწრაფი გვირაბის ნაცვლად **სახელდებულ/მუდმივ** გვირაბს (`tunnel --config <path> run`) უშვებს.     |
| `CLOUDFLARED_HOSTNAME`                               | გადაფარავს სახელდებული გვირაბის მიერ მოწოდებულ საჯარო ჰოსტის სახელს (მაგ., `ai.example.com`). თუ დაყენებული არ არის, იკითხება კონფიგურაციის პირველი `ingress` ჰოსტის სახელიდან. |

## 2. ngrok

`src/lib/ngrokTunnel.ts` იყენებს **`@ngrok/ngrok` SDK-ს** (პროცესის შიგნით, CLI ქვეპროცესის გარეშე). ნატიური მოდულის იმპორტი პირველი გაშვებისას გადავადებულად ხდება, რათა წინასწარ აგებული ბინარული ფაილების არმქონე პლატფორმებზე აპლიკაცია ჩატვირთვისას არ შეფერხდეს.

### წინაპირობები

1. დარეგისტრირდით <https://ngrok.com>-ზე.
2. დააკოპირეთ თქვენი authtoken ngrok-ის მართვის პანელიდან.
3. მიუთითეთ იგი ერთ-ერთი შემდეგი გზით:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, ან
   - მართვის პანელი: **Settings → Tunnels → ngrok**, ან
   - REST-ის სხეული (ერთჯერადად): `{"action":"enable","authToken":"<token>"}`.

თუ არცერთი არ არის კონფიგურირებული, სტატუსი აბრუნებს `phase: "needs_auth"`-ს.

### REST-ის მეშვეობით ჩართვა / გამორთვა

```bash
# ჩართვა (იყენებს NGROK_AUTHTOKEN-ს გარემოდან)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# ჩართვა უშუალოდ მითითებული ტოკენით
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# სტატუსი
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# გამორთვა
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

პასუხი შეიცავს მინიჭებულ `publicUrl`-ს (მაგ.
`https://abcd-1234.ngrok-free.app`). მორგებული დომენები, რეგიონები და პოლიტიკის წესები ngrok-ის მართვის პანელში უნდა დაკონფიგურირდეს — თავად OmniRoute SDK-ს მხოლოდ ლოკალური სამიზნის URL-ს გადასცემს.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` სისტემურ `tailscale` CLI-ს მართავს, რათა ლოკალური API პორტი **Funnel**-ის მეშვეობით გახადოს ხელმისაწვდომი (Tailscale-ის საჯარო ინტერნეტში გამოსასვლელი serve-ისთვის). იგი მხარს უჭერს სრულ სასიცოცხლო ციკლს: ინსტალაციას, შესვლას, დემონის გაშვებას, ჩართვასა და გამორთვას.

იმპლემენტაცია იძახებს `tailscale funnel --bg <port>`-ს (ფონური რეჟიმი). საჯარო URL-ს აქვს ფორმა `https://<machine>.<tailnet>.ts.net/`.

### წინაპირობები

1. დააინსტალირეთ Tailscale (ან მიეცით OmniRoute-ს ამის გაკეთების საშუალება — იხილეთ ქვემოთ მოცემული `install` საბოლოო წერტილი).
2. შედით სისტემაში (`tailscale login`-ით ან OmniRoute-ის `login` საბოლოო წერტილის მეშვეობით).
3. ჩართეთ Funnel თქვენი tailnet-ისთვის Tailscale-ის ადმინისტრაციულ კონსოლში:
   <https://login.tailscale.com/admin/settings/features>.

Linux-სა და macOS-ზე დემონის (`tailscaled`) სამართავად საჭიროა `sudo`. POST საბოლოო წერტილები იღებს არასავალდებულო `sudoPassword` ველს, რომელიც გამოძახების განმავლობაში გადაეცემა OmniRoute-ის MITM პაროლების კეშს (`getCachedPassword` / `setCachedPassword`). Windows იყენებს ნაგულისხმევად დაყენებულ სერვისს მისამართზე `C:\Program Files\Tailscale\tailscale.exe`.

### REST საბოლოო წერტილები

Tailscale-ს სხვა ბეკენდებთან შედარებით უფრო ფართო ინტერფეისი აქვს, რადგან ინსტალაცია, შესვლა, დემონი და გვირაბი ცალკეული კომპონენტებია.

| საბოლოო წერტილი                       | მეთოდი | დანიშნულება                                                                           |
| ------------------------------------- | ------ | ------------------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | გვირაბის აგრეგირებული სტატუსი (`phase`, `tunnelUrl`, `apiUrl` და ა.შ.)                |
| `/api/tunnels/tailscale/check`        | `GET`  | დაბალი დონის შემოწმება: დაინსტალირებულია? შესულია? დემონი გაშვებულია?                 |
| `/api/tunnels/tailscale/install`      | `POST` | Tailscale-ის ინსტალაცია (SSE-ით ნაკადად გადაცემული პროგრესის მოვლენები) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `tailscaled`-ის გაშვება Linux/macOS-ზე                                                |
| `/api/tunnels/tailscale/login`        | `POST` | შესვლის პროცესის დაწყება; აბრუნებს ბრაუზერში გასახსნელ `authUrl`-ს                    |
| `/api/tunnels/tailscale/enable`       | `POST` | API პორტისთვის Funnel-ის გაშვება                                                      |
| `/api/tunnels/tailscale/disable`      | `POST` | Funnel-ის გაჩერება                                                                    |

Tailscale-ის ყველა საბოლოო წერტილი მოითხოვს მართვის ავთენტიფიკაციას (იხილეთ `routeUtils.ts :: requireTailscaleAuth`).

ჩართვის მაგალითი:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

თუ Funnel ადმინისტრაციულ კონსოლში ჩართული არ არის, პასუხი შეიცავს `funnelNotEnabled: true`-ს და ბრაუზერში გასახსნელ `enableUrl`-ს.

### არასავალდებულო გარემოს ცვლადები

| ცვლადი          | დანიშნულება                                    |
| --------------- | ---------------------------------------------- |
| `TAILSCALE_BIN` | `tailscale` ბინარული ფაილის ბილიკის ჩანაცვლება |

## Endpoint-ების შეჯამება

| Endpoint                              | მეთოდი | Body                                | ავტორიზაცია |
| ------------------------------------- | ------ | ----------------------------------- | ----------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | მართვა      |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | მართვა      |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | მართვა      |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | მართვა      |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | მართვა      |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | მართვა      |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | მართვა      |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | მართვა      |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | მართვა      |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | მართვა      |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | მართვა      |

ცენტრალური `/api/settings/tunnels` endpoint არ არსებობს — თითოეული backend დამოუკიდებელია.

## OAuth callback-ის თავისებურებები

როდესაც OmniRoute-ს გვირაბის მეშვეობით ხელმისაწვდომს ხდით, დაფამ და OAuth-ის პროცესებმა callback URL-ები **საჯარო** hostname-ის საფუძველზე უნდა შექმნან და არა `localhost`-ის. წინააღმდეგ შემთხვევაში, OAuth provider მომხმარებელს გადაამისამართებს URL-ზე, რომელსაც მისი სერვერები ვერ უკავშირდებიან, და handshake ვერ შესრულდება.

დაფაზე ცვლილებების შეტანისა და პარამეტრების შენახვისთვის გვირაბის hostname-ის `NEXT_PUBLIC_BASE_URL`-ში ფიქსირება საჭირო არ არის. ავთენტიფიცირებული დაფა იმავე origin-ზე სახიფათო მოთხოვნებს session-თან მიბმული CSRF token-ით აგზავნის, ამიტომ ეფემერული Cloudflare Quick Tunnel-ის host-ების გამოყენება ჩვეულებრივი UI-ით მართვისთვის სისტემაში შესვლის შემდეგაც შესაძლებელია.

დააყენეთ:

```bash
NEXT_PUBLIC_BASE_URL=https://<თქვენი-გვირაბის-host>
```

და OAuth-ის დაწყებამდე გადატვირთეთ OmniRoute. ეფემერული Cloudflare Quick Tunnel-ებისთვის URL ყოველი გადატვირთვის შემდეგ იცვლება, ამიტომ საწარმოო გარემოში OAuth-ის გამოსაყენებლად უპირატესობა მიანიჭეთ ngrok-ს რეზერვირებული domain-ით ან Tailscale Funnel-ს.

## მდგომარეობა და მონიტორინგი

დაფა გვირაბის მდგომარეობას აჩვენებს განყოფილებაში **პარამეტრები → გვირაბები**:

- აქტიური backend-ები და მიმდინარე `phase` (`stopped`, `starting`, `running`, `needs_auth`, `error`).
- მიმდინარე საჯარო URL და მისგან მიღებული API URL (`<publicUrl>/v1`).
- ლოკალური სამიზნე URL, რომელზეც გვირაბი ტრაფიკს გადაამისამართებს.
- ბოლო შეცდომის შეტყობინება, თუ ასეთი არსებობს.

პროგრამული მონიტორინგისთვის პერიოდულად გამოითხოვეთ თითოეული backend-ის `GET` endpoint. ერთზე მეტი backend-ის ერთდროულად გაშვება ნებადართულია; OmniRoute თითოეულს დამოუკიდებლად აკონტროლებს.

## პრობლემების მოგვარება

### "cloudflared binary ვერ მოიძებნა"

OmniRoute პირველი გამოყენებისას ავტომატურ ინსტალაციას ცდილობს. თუ ინსტალაცია დაბლოკილია (შეზღუდული ქსელი, GitHub-ზე წვდომა არ არის), ჩამოტვირთეთ `cloudflared` ხელით მისამართიდან <https://github.com/cloudflare/cloudflared/releases> და დააყენეთ `CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: საჭიროა authtoken"

`phase: "needs_auth"` ნიშნავს, რომ authtoken ვერ მოიძებნა. დააყენეთ `NGROK_AUTHTOKEN` ფაილში `.env`, გამართეთ ის დაფის მეშვეობით, ან enable POST მოთხოვნის body-ში გადასცით `authToken`.

### "tailscale: funnel არ არის ჩართული"

როდესაც enable პასუხი შეიცავს `funnelNotEnabled: true`-ს, Funnel თქვენი tailnet-ისთვის გამორთულია. გახსენით დაბრუნებული `enableUrl` (ან ადმინისტრატორის კონსოლის ფუნქციის გვერდი) და ჩართეთ Funnel.

### გვირაბის URL-ის ცვლილებები OAuth-ს არღვევს

გამოიყენეთ ngrok რეზერვირებული domain-ით ან Tailscale Funnel (ორივე სტაბილურია თითოეული node-ისთვის). Cloudflare Quick Tunnel-ები თავისი ბუნებით ეფემერულია და ხანგრძლივად მოქმედი OAuth callback-ებისთვის რეკომენდებული არ არის.

### Linux/macOS-ზე Tailscale-ისთვის წვდომა აკრძალულია

`tailscaled`-ს root უფლებები სჭირდება. შესაბამის POST endpoint-ს გადასცით `sudoPassword`, ან daemon თავად გაუშვით (`sudo systemctl start tailscaled`).

## აგრეთვე იხილეთ

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — გამავალი პროქსი (1proxy, SOCKS5, HTTP)
  გამავალი ტრაფიკისთვის.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — გარემოს ცვლადების სრული სია,
  მათ შორის `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — სტაბილური საჯარო ჰოსტინგისთვის
  გვირაბის გამოყენების ალტერნატივები.
- წყარო: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
