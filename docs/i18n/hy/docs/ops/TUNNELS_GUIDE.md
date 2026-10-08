# Tunnels Guide (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Ճշմարտության սկզբնաղբյուր՝** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Վերջին թարմացումը՝** 2026-06-28 — v3.8.40

OmniRoute-ը կարող է իր տեղային սերվերը (`http://localhost:20128`) հասանելի դարձնել հանրային
համացանցից՝ թունելների երեք բեքենդների միջոցով։ Սա օգտակար է հետևյալի համար՝

- Ամպային մատակարարներից (Antigravity, Gemini, Cursor) OAuth հետադարձ կանչեր, որոնց
  անհրաժեշտ է հանրայնորեն հասանելի վերահղման URL։
- Ձեր տեղային օրինակը թիմակիցների հետ համօգտագործելը՝ առանց VM տեղակայելու։
- Բջջային, հեռավար կամ տարբեր ցանցերի միջև փորձարկումներ։

Բոլոր երեք բեքենդները կառավարվում են նույն պրոցեսի ներսում․ OmniRoute-ը գործարկում/դադարեցնում է հիմքում ընկած
երկուական ֆայլը կամ SDK-ն կառավարման վահանակից կամ REST API-ից։ Հակադարձ պրոքսիի կամ systemd-ի կարգավորում
չի պահանջվում։

## Բեքենդների համառոտ ակնարկ

| Բեքենդ                      | Կայունություն                                                      | Արժեք                             | Կարգավորում                                            |
| --------------------------- | ------------------------------------------------------------------ | --------------------------------- | ------------------------------------------------------ |
| **Cloudflare Quick Tunnel** | Ժամանակավոր (URL-ը փոխվում է յուրաքանչյուր վերագործարկման ժամանակ) | Անվճար                            | Չի պահանջվում՝ ինքնաշխատ տեղադրում է `cloudflared`-ը   |
| **ngrok**                   | Կայուն է, երբ կարգավորված է վճարովի պլան կամ հաստատուն տիրույթ     | Անվճար մակարդակ + վճարովի         | Պահանջում է ngrok հաշիվ + authtoken                    |
| **Tailscale Funnel**        | Կայուն է յուրաքանչյուր հանգույցի համար ձեր tailnet-ի ներսում       | Անձնական օգտագործման համար անվճար | Պահանջում է Tailscale-ի տեղադրում + մուտք + Funnel ACL |

Իրականացումները գտնվում են `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` և `src/lib/tailscaleTunnel.ts` ֆայլերում։ Երեքն էլ վերադարձնում են
միատեսակ կառուցվածքով `status` օբյեկտ՝ `phase`, `running`, `publicUrl`, `apiUrl`,
`targetUrl` և `lastError` դաշտերով, որպեսզի կառավարման վահանակը կարողանա դրանք միատեսակ ցուցադրել։

## 1. Cloudflare թունել (արագ թունել + անվանակոչված թունել)

`src/lib/cloudflaredTunnel.ts`-ը գործարկում է `cloudflared`-ը որպես ենթապրոցես։ Այն աջակցում է
երկու ռեժիմի, որոնք ընտրվում են՝ կախված անվանակոչված թունելի կազմաձևի առկայությունից․

- **Արագ թունել (լռելյայն)։** Գործարկում է `cloudflared tunnel --url
http://localhost:<apiPort>` և stdout-ից վերլուծում է նշանակված `*.trycloudflare.com` URL-ը։
  URL-ները ժամանակավոր են և փոխվում են յուրաքանչյուր վերագործարկման ժամանակ։
- **Անվանակոչված թունել (ըստ ցանկության)։** Երբ `CLOUDFLARED_CONFIG`-ը մատնանշում է տեղայնորեն կառավարվող
  cloudflared `config.yml`, OmniRoute-ը գործարկում է `cloudflared tunnel --no-autoupdate
--config <path> run`, ինչը տրամադրում է **կայուն, անվանակոչված հոսթանուն**։ Կազմաձևը
  սահմանում է թունելի UUID-ը, `credentials-file`-ը և `ingress` երթուղավորումը, ուստի
  `--url` չի փոխանցվում, և Zero Trust կառավարման վահանակի տոկեն չի պահանջվում։ `run`-ը
  հավաստագրերը կարդում է կազմաձևի `credentials-file`-ի բացարձակ ուղուց․ `cert.pem`
  անհրաժեշտ չէ (այն օգտագործվում է միայն թունելի կենսացիկլի կառավարման համար)։

Հիմնական վարքագծերը՝

- **Ինքնաշխատ տեղադրում։** Առաջին օգտագործման ժամանակ OmniRoute-ը ներբեռնում է վերջին `cloudflared`
  երկուական ֆայլը GitHub-ի պաշտոնական թողարկումներից (կառավարվող տեղադրումը գտնվում է
  `DATA_DIR/cloudflared/`-ի ներքո)։ Ներբեռնված նյութի SHA256-ը կատարումից առաջ ստուգվում է
  թողարկման մանիֆեստի նկատմամբ։
- **Պրոցեսի վերահսկում։** cloudflared-ի PID-ը և որոշված URL-ը պահպանվում են
  `quick-tunnel-state.json`-ում, որպեսզի կառավարման վահանակը վերաբեռնումներից հետո կարողանա վերականգնել կարգավիճակը։

### Անվանակոչված թունելի կարգավորում (կայուն հոսթանուն)

1. Ստեղծեք տեղայնորեն կառավարվող թունել cloudflared CLI-ի միջոցով (մեկ անգամ)․

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Ստեղծեք `~/.cloudflared/config.yml`, որը ձեր հոսթանունը կուղղորդի դեպի OmniRoute-ի տեղային
   API պորտը (լռելյայն՝ 20128)․

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. OmniRoute-ին ուղղեք դեպի կազմաձևը և (վերա)գործարկեք թունելը․

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # ըստ ցանկության՝ վերասահմանում է OmniRoute-ի հաղորդած հոսթանունը, հակառակ դեպքում այն կարդացվում է
   # կազմաձևի առաջին ingress կանոնից․
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Միացրեք թունելը նույն կերպ, ինչպես արագ թունելը (REST / կառավարման վահանակ / CLI՝
   ստորև)։ Անվանակոչված թունելը չի արտածում հանրային URL, որը հնարավոր լինի քաղել, ուստի պատրաստ լինելը որոշվում է
   cloudflared-ի գրանցված եզրային միացումից, իսկ `publicUrl`/`apiUrl`-ը
   հաղորդվում են `CLOUDFLARED_HOSTNAME`-ից (կամ կազմաձևի առաջին ingress հոսթանունից)։

### Միացնել / անջատել REST-ի միջոցով

Վերջնակետն օգտագործում է `{action: "enable" | "disable"}` մարմին, այլ ոչ թե առանձին
`start`/`stop` ուղիներ։ Պահանջվում է կառավարման նույնականացում (ադմինիստրատորի աշխատաշրջան կամ ադմինիստրատորի API բանալի)։

```bash
# Միացնել
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Կարգավիճակ
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Անջատել
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Կամ կառավարման վահանակի միջոցով՝ **Կարգավորումներ → Թունելներ → Cloudflare**։

### Ըստ ցանկության միջավայրի փոփոխականներ

| Փոփոխական                                            | Նպատակ                                                                                                                                                                                            |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Վերասահմանում է երկուական ֆայլի ուղին։ Եթե սահմանված է և վավեր, OmniRoute-ն այն օգտագործում է ներբեռնելու փոխարեն։                                                                                |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Փոխադրման արձանագրություն (լռելյայն՝ `http2`, նաև՝ `quic`, `auto`)։                                                                                                                               |
| `CLOUDFLARED_CONFIG`                                 | Տեղային եղանակով կառավարվող cloudflared `config.yml`-ի ուղին։ Սահմանված լինելու դեպքում OmniRoute-ը արագ թունելի փոխարեն գործարկում է **անվանված/մշտական** թունել (`tunnel --config <path> run`)։ |
| `CLOUDFLARED_HOSTNAME`                               | Վերասահմանում է անվանված թունելի հաղորդվող հանրային հոսթանունը (օրինակ՝ `ai.example.com`)։ Եթե սահմանված չէ, այն ընթերցվում է կազմաձևման առաջին `ingress` հոսթանունից։                            |

## 2. ngrok

`src/lib/ngrokTunnel.ts`-ն օգտագործում է **`@ngrok/ngrok` SDK**-ն (գործընթացի ներսում՝ առանց CLI ենթագործընթացի)։ Բնիկ մոդուլը հետաձգված կերպով ներմուծվում է առաջին գործարկման ժամանակ, որպեսզի նախապես կառուցված երկուական ֆայլեր չունեցող հարթակներում հավելվածը մեկնարկի պահին չխափանվի։

### Նախապայմաններ

1. Գրանցվեք <https://ngrok.com> կայքում։
2. Պատճենեք ձեր authtoken-ը ngrok-ի կառավարման վահանակից։
3. Տրամադրեք այն հետևյալ եղանակներից որևէ մեկով՝
   - `.env`՝ `NGROK_AUTHTOKEN=<token>`, կամ
   - կառավարման վահանակ՝ **Settings → Tunnels → ngrok**, կամ
   - REST հարցման մարմին (մեկանգամյա)՝ `{"action":"enable","authToken":"<token>"}`։

Եթե ոչ մեկը կարգավորված չէ, կարգավիճակը վերադարձնում է `phase: "needs_auth"`։

### Միացում / անջատում REST-ի միջոցով

```bash
# Միացնել (օգտագործում է միջավայրի NGROK_AUTHTOKEN-ը)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Միացնել՝ նշելով թոքենը հարցման մեջ
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Կարգավիճակ
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Անջատել
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Պատասխանը ներառում է հատկացված `publicUrl`-ը (օրինակ՝
`https://abcd-1234.ngrok-free.app`)։ Հատուկ դոմենները, տարածաշրջանները և քաղաքականության կանոնները պետք է կարգավորվեն ngrok-ի կառավարման վահանակում․ OmniRoute-ն ինքնին միայն տեղային թիրախային URL-ն է փոխանցում SDK-ին։

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts`-ը կառավարում է համակարգային `tailscale` CLI-ն՝ տեղային API պորտը **Funnel**-ի միջոցով հասանելի դարձնելու համար (Tailscale-ի հանրային ինտերնետային ելքը serve-ի համար)։ Այն աջակցում է ամբողջ կենսացիկլին՝ տեղադրում, մուտք, դևոնի գործարկում, միացում և անջատում։

Իրականացումն աշխատեցնում է `tailscale funnel --bg <port>` հրամանը (ֆոնային ռեժիմով)։ Հանրային URL-ն ունի `https://<machine>.<tailnet>.ts.net/` ձևաչափը։

### Նախապայմաններ

1. Տեղադրեք Tailscale-ը (կամ թույլ տվեք OmniRoute-ին անել դա․ տե՛ս ստորև ներկայացված `install` վերջնակետը)։
2. Մուտք գործեք (`tailscale login`-ի կամ OmniRoute-ի `login` վերջնակետի միջոցով)։
3. Միացրեք Funnel-ը ձեր tailnet-ի համար Tailscale-ի կառավարման վահանակում՝
   <https://login.tailscale.com/admin/settings/features>։

Linux-ում և macOS-ում դևոնը (`tailscaled`) կառավարելու համար պահանջվում է `sudo`։ POST վերջնակետերն ընդունում են ոչ պարտադիր `sudoPassword` դաշտ, որը հարցման մշակման ընթացքում փոխանցվում է OmniRoute-ի MITM գաղտնաբառերի պահոցին (`getCachedPassword` / `setCachedPassword`)։ Windows-ն օգտագործում է ծառայության լռելյայն տեղադրումը՝
`C:\Program Files\Tailscale\tailscale.exe`։

### REST վերջնակետեր

Tailscale-ն ունի ավելի ընդարձակ միջերես, քան մյուս հետնամասերը, քանի որ տեղադրումը, մուտքը, դևոնը և թունելը առանձին բաղադրիչներ են։

| Վերջնակետ                             | Մեթոդ  | Նպատակ                                                                            |
| ------------------------------------- | ------ | --------------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Թունելի համախմբված կարգավիճակ (`phase`, `tunnelUrl`, `apiUrl` և այլն)             |
| `/api/tunnels/tailscale/check`        | `GET`  | Ցածր մակարդակի ստուգում՝ տեղադրվա՞ծ է, մուտք գործվա՞ծ է, դևոնն աշխատո՞ւմ է        |
| `/api/tunnels/tailscale/install`      | `POST` | Տեղադրել Tailscale-ը (SSE-ով հոսքային առաջընթացի իրադարձություններ) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Գործարկել `tailscaled`-ը Linux/macOS-ում                                          |
| `/api/tunnels/tailscale/login`        | `POST` | Սկսել մուտքի գործընթացը․ վերադարձնում է դիտարկիչում բացվող `authUrl`              |
| `/api/tunnels/tailscale/enable`       | `POST` | Գործարկել Funnel-ը API պորտի համար                                                |
| `/api/tunnels/tailscale/disable`      | `POST` | Կանգնեցնել Funnel-ը                                                               |

Tailscale-ի բոլոր վերջնակետերը պահանջում են կառավարման նույնականացում (տե՛ս `routeUtils.ts ::
requireTailscaleAuth`)։

Միացման օրինակ՝

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Եթե Funnel-ը միացված չէ կառավարման վահանակում, պատասխանը ներառում է
`funnelNotEnabled: true`, ինչպես նաև դիտարկիչում բացվող `enableUrl`։

### Միջավայրի ոչ պարտադիր փոփոխականներ

| Փոփոխական       | Նպատակ                                         |
| --------------- | ---------------------------------------------- |
| `TAILSCALE_BIN` | Վերասահմանել `tailscale` երկուական ֆայլի ուղին |

## Վերջնակետերի ամփոփում

| Վերջնակետ                             | Մեթոդ  | Մարմին                              | Նույնականացում |
| ------------------------------------- | ------ | ----------------------------------- | -------------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | կառավարում     |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | կառավարում     |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | կառավարում     |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | կառավարում     |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | կառավարում     |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | կառավարում     |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | կառավարում     |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | կառավարում     |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | կառավարում     |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | կառավարում     |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | կառավարում     |

Կենտրոնական `/api/settings/tunnels` վերջնակետ չկա. յուրաքանչյուր հետին համակարգ
անկախ է։

## OAuth-ի հետադարձ կանչի նկատառումներ

Երբ OmniRoute-ը հասանելի եք դարձնում թունելի միջոցով, կառավարման վահանակը և OAuth-ի հոսքերը պետք է
հետադարձ կանչի URL-ները կազմեն՝ օգտագործելով **հանրային** հոսթի անունը, այլ ոչ թե `localhost`-ը։ Հակառակ դեպքում
OAuth մատակարարն օգտատիրոջը վերահղում է այնպիսի URL-ի, որին իր սերվերները չեն կարող հասնել,
և համաձայնեցումը ձախողվում է։

Կառավարման վահանակում փոփոխություններ կատարելու և կարգավորումները պահպանելու համար անհրաժեշտ չէ թունելի հոսթի անունը
ամրագրել `NEXT_PUBLIC_BASE_URL`-ում։ Նույնականացված կառավարման վահանակը նույն սկզբնաղբյուրին ուղղված՝ փոփոխություններ կատարող
հարցումներն ուղարկում է աշխատաշրջանին կապակցված CSRF թոքենով, ուստի Cloudflare Quick Tunnel-ի ժամանակավոր
հոսթերը մուտք գործելուց հետո դեռ կարող են օգտագործվել միջերեսի սովորական կառավարման համար։

Սահմանեք՝

```bash
NEXT_PUBLIC_BASE_URL=https://<ձեր-թունելի-հոսթը>
```

և վերագործարկեք OmniRoute-ը՝ նախքան OAuth-ը սկսելը։ Cloudflare Quick Tunnel-ի ժամանակավոր
թունելների դեպքում URL-ը փոխվում է յուրաքանչյուր վերագործարկումից հետո, ուստի արտադրական միջավայրում OAuth-ն օգտագործելիս նախընտրեք
ամրագրված տիրույթով ngrok-ը կամ Tailscale Funnel-ը։

## Առողջական վիճակ և մոնիթորինգ

Կառավարման վահանակը թունելի վիճակը ցուցադրում է **Կարգավորումներ → Թունելներ** բաժնում՝

- Ակտիվ հետին համակարգը կամ համակարգերը և ընթացիկ `phase`-ը (`stopped`, `starting`, `running`,
  `needs_auth`, `error`)։
- Ընթացիկ հանրային URL-ը և դրանից ստացված API URL-ը (`<publicUrl>/v1`)։
- Լոկալ նպատակային URL-ը, որին թունելն ուղղորդում է հարցումները։
- Վերջին սխալի հաղորդագրությունը, եթե կա։

Ծրագրային մոնիթորինգի համար պարբերաբար հարցումներ ուղարկեք յուրաքանչյուր հետին համակարգի `GET` վերջնակետին։ Միաժամանակ մեկից ավելի
հետին համակարգի գործարկումը թույլատրված է. OmniRoute-ը յուրաքանչյուրին կհետևի
անկախորեն։

## Խնդիրների վերացում

### «cloudflared-ի երկուական ֆայլը չի գտնվել»

OmniRoute-ն առաջին օգտագործման ժամանակ փորձում է այն ավտոմատ տեղադրել։ Եթե տեղադրումն արգելափակված է
(սահմանափակ ցանց, GitHub-ի հասանելիության բացակայություն), ձեռքով ներբեռնեք `cloudflared`-ը
<https://github.com/cloudflare/cloudflared/releases> հասցեից և սահմանեք
`CLOUDFLARED_BIN=/path/to/cloudflared`։

### «ngrok. պահանջվում է authtoken»

`phase: "needs_auth"`-ը նշանակում է, որ authtoken չի գտնվել։ Սահմանեք `NGROK_AUTHTOKEN`-ը
`.env`-ում, կազմաձևեք այն կառավարման վահանակի միջոցով կամ փոխանցեք `authToken`-ը ակտիվացման POST
հարցման մարմնում։

### «tailscale. funnel-ը միացված չէ»

Երբ ակտիվացման պատասխանը պարունակում է `funnelNotEnabled: true`, Funnel-ն անջատված է
ձեր tailnet-ի համար։ Բացեք վերադարձված `enableUrl`-ը (կամ ադմինիստրատորի վահանակի հնարավորությունների
էջը) և միացրեք Funnel-ը։

### Թունելի URL-ի փոփոխությունները խափանում են OAuth-ը

Օգտագործեք ամրագրված տիրույթով ngrok-ը կամ Tailscale Funnel-ը (երկուսն էլ կայուն են յուրաքանչյուր հանգույցի համար)։
Cloudflare Quick Tunnel-ի թունելներն իրենց կառուցվածքով ժամանակավոր են և խորհուրդ չեն տրվում
երկարաժամկետ OAuth հետադարձ կանչերի համար։

### Linux/macOS-ում Tailscale-ի թույլտվության մերժում

`tailscaled`-ին անհրաժեշտ են root-ի իրավունքներ։ Համապատասխան POST վերջնակետին փոխանցեք `sudoPassword`-ը,
կամ ինքներդ գործարկեք դեյմոնը (`sudo systemctl start tailscaled`)։

## Տես նաև

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — ելքային պրոքսի (1proxy, SOCKS5, HTTP)՝
  ելքային տրաֆիկի համար։
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — միջավայրի փոփոխականների ամբողջական ցանկը՝ ներառյալ
  `NEXT_PUBLIC_BASE_URL`։
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — թունելավորման այլընտրանքներ՝ կայուն
  հանրային հոսթինգի համար։
- Աղբյուր՝ `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`։
