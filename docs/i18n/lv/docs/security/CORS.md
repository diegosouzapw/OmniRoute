# CORS Configuration & Security (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute kontrolē, kuras **pārlūkprogrammu izcelsmes** drīkst lasīt starpizcelsmju atbildes,
izmantojot vienu centralizētu atļauto izcelsmju sarakstu. Modelis **pēc noklusējuma visu liedz**:
neviena izcelsme nav atļauta, kamēr to nepievienojat. Šajā lapā ir dokumentēts, kā tiek
izvērtēts atļauto izcelsmju saraksts, ko `CORS_ALLOW_ALL=true` faktiski padara pieejamu
(un, kas ir īpaši svarīgi, ko tas **nepadara** pieejamu), kā droši konfigurēt izstrādes un
produkcijas vidi un kādu izpildlaika brīdinājumu informācijas panelis rāda, kad ir aktīva
aizstājējzīme.

**Patiesības avots:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Atļauto izcelsmju saraksts tiek piemērots vienreiz
starpprogrammatūrā (`src/server/authz/pipeline.ts`) — atsevišķu maršrutu apstrādātāji paši
neiestata `Access-Control-Allow-Origin`.

## Kā tiek izvērtēta izcelsme

Katram pieprasījumam starpprogrammatūra nosaka `Access-Control-Allow-Origin` vērtību
šādā secībā:

1. **`CORS_ALLOW_ALL=true`** (vai novecojusī opcija `CORS_ORIGIN=*`) → atgriež izsaucēja
   `Origin` vērtību (vai `*`, ja nav `Origin` galvenes), pievienojot `Vary: Origin`,
   lai kešatmiņas darbotos pareizi. Tas pats `applyCorsHeaders()` kontroles punkts arī
   pievieno `Vary: Accept-Encoding` katrai 2xx atbildei ar saturu marķiera autentificētajā
   `/v1*`/`/v1beta*` saskarnē (`relaxForTokenAuth`, RFC 9110 §12.5.5, problēma #6737),
   lai lejupējās/koplietotās kešatmiņas varētu pareizi atšķirt saspiestos un nesaspiestos
   variantus.
2. Pretējā gadījumā pieprasījuma `Origin` tiek normalizēta (pārveidota par mazajiem
   burtiem un noņemta beigu slīpsvītra) un salīdzināta ar **apvienoto atļauto izcelsmju
   sarakstu**:
   - vides mainīgais **`CORS_ALLOWED_ORIGINS`** — ar komatiem atdalīts saraksts, un
   - izpildlaika iestatījums **`corsOrigins`** (Informācijas panelis → Drošība → _CORS atļautās
     izcelsmes_), kas tiek ievadīts, izmantojot `setRuntimeAllowedOrigins()` no
     `src/lib/config/runtimeSettings.ts`.
3. Nav atbilstības → **`Access-Control-Allow-Origin` galvene netiek izvadīta**. Pārlūkprogramma
   bloķē starpizcelsmju lasīšanu. Šī ir paredzētā darbība, kas pēc noklusējuma visu liedz.

| Vides mainīgais        | Nozīme                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV formāta precīzu atļaujamo izcelsmju saraksts (ieteicams).                                           |
| `CORS_ALLOW_ALL`       | `true`/`1` → atgriezt jebkuru izcelsmi (aizstājējzīme). Tikai izstrādes videi.                          |
| `CORS_ORIGIN`          | Novecojis. `*` darbojas kā `CORS_ALLOW_ALL`; viena vērtība tiek pievienota atļauto izcelsmju sarakstam. |

## Apdraudējumu modelis — ko `CORS_ALLOW_ALL=true` patiesībā padara pieejamu

Vispārīgais OWASP brīdinājums („CORS aizstājējzīme = jebkura vietne var izsaukt jūsu API”)
ir jāuztver nopietni, taču OmniRoute apdraudējuma tvērums ir **šaurāks nekā vispārīgajā
gadījumā** viena konkrēta ieviešanas fakta dēļ:

> **Centrālais `applyCorsHeaders()` nekad neizvada
> `Access-Control-Allow-Credentials`.** Pārlūkprogramma nepadarīs pieejamu _ar akreditācijas
> datiem_ (sīkdatnes saturošu) starpizcelsmju atbildi, ja vien serveris nenosūtīs
> `Access-Control-Allow-Credentials: true`. OmniRoute koplietotais CORS ceļš to nekad
> nedara.

Ko tas nozīmē katrai saskarnei, pat ar `CORS_ALLOW_ALL=true`:

| Saskarne                                    | Autentifikācijas mehānisms   | CORS aizstājējzīmes ietekme                                                                                                                                                                                                                                   |
| ------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Informācijas panelis / PĀRVALDĪBAS `/api/*` | Sīkdatņu sesija              | Izcelsme tiek atgriezta, taču **bez `Allow-Credentials`** pārlūkprogramma **bloķē** lasīšanu ar akreditācijas datiem. Ļaunprātīga starpizcelsmju vietne **nevar lasīt** jūsu autentificētās informācijas paneļa atbildes, un sesijas sīkdatne netiek atklāta. |
| Klienta API `/v1/*`, `/v1beta/*`            | Bearer / `x-api-key` galvene | Jau ir atļaujoša **pēc būtības** (`relaxForTokenAuth`): pārlūkprogrammas nekad automātiski nepievieno `Authorization`/`x-api-key`, tāpēc uzbrucēja lapa nevar norādīt jūsu atslēgu. `CORS_ALLOW_ALL` to nepaplašina.                                          |
| Publiski, tikai lasāmi (`/api/health`, …)   | Nav                          | Nav sensitīvi; aizstājējzīme ir nekaitīga.                                                                                                                                                                                                                    |

Tādējādi `CORS_ALLOW_ALL=true` **atlikušais** apdraudējums aprobežojas ar: (a)
starpizcelsmju **lasīšanu** bez akreditācijas datiem tādiem datiem, kuri jau nav autentificēti,
un (b) atļauju CORS **pirmslidojuma pārbaudēm** izdoties pārvaldības maršrutos — kuriem
joprojām ir nepieciešama autentifikācija, ko starpizcelsmju lapa nevar nodrošināt. Tas
koplietotajā CORS ceļā **nav** sesijas nolaupīšanas vai akreditācijas datu zādzības vektors.

### Viens patiess izņēmums — `/api/v1/agents/`

Cloud-Agent maršruti (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) iestata
savas **CORS galvenes**
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) un **izvada**
`Access-Control-Allow-Origin: <origin>|*` kopā ar
`Access-Control-Allow-Credentials: true`. Šī ir vienīgā saskarne, kurā
izcelsmes atgriešana un akreditācijas dati pastāv vienlaikus, un tā ir **neatkarīga no
`CORS_ALLOW_ALL`**. Šie maršruti ir autentificēti pārvaldības līmenī
(`requireManagementAuth`); operatoriem, kuri padara informācijas paneli pieejamu ārpus
resursdatora, jāapzinās, ka šī ir vienīgā vieta, kur atbildes galvenes atļauj starpizcelsmju
lasīšanu ar akreditācijas datiem. Tās ierobežošana līdz precīzam atļauto izcelsmju
sarakstam tiek izsekota atsevišķi no šiem CORS norādījumiem.

## Produkcijas kontrolsaraksts

- **Nekad neiestatiet `CORS_ALLOW_ALL=true` produkcijas vidē.** Atstājiet to neiestatītu.
- Iestatiet **precīzu** izcelsmes vietu sarakstu — vai nu ar vides mainīgo, vai cilnes Security laukā:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Ja OmniRoute darbojas aiz reversā starpniekservera/tuneļa (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS **nav** vienīgais aizsardzības mehānisms — lokālās atgriezeniskās saites maršrutu
  aizsargs joprojām aizsargā maršrutus, kas spēj palaist procesus (skatiet
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Neviltojiet
  `X-Forwarded-For: 127.0.0.1`, lai „izlabotu” 403 kļūdu; tādējādi no jauna tiek radīta RCE ievainojamību klase, kuru
  maršrutu aizsargs novērš.
- Pārbaudiet izpildlaika stāvokli: informācijas panelī tiek rādīts **pastāvīgs dzintarkrāsas reklāmkarogs**
  sadaļā Dashboard → Security → Authorization Inventory, kad ir aktīvs
  `CORS_ALLOW_ALL=true`, un `/api/settings/authz-inventory` atgriež
  `cors: { allowAll, allowedOrigins }` aploksni, kuru pārraudzības rīki var regulāri aptaujāt.

## Ērtības izstrādes laikā — atļaujiet konkrētas lokālās izcelsmes vietas

Pat izstrādes vidē aizstājējzīme ir nepieciešama reti. Atļaujiet tikai tos izstrādes serverus, kurus izmantojat:

```bash
# Vite (5173) un Next.js (3000) izstrādes serveri, kas izsauc lokālu OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Izcelsmes vietas tiek salīdzinātas, neņemot vērā reģistru un ignorējot noslēdzošo slīpsvītru, tāpēc
`http://localhost:3000` un `http://localhost:3000/` ir līdzvērtīgas. To pašu CSV
izpildlaikā var iestatīt sadaļā **Dashboard → Security → CORS Allowed Origins** bez
restartēšanas.

## API atslēgas un sīkfailu sesijas

- **Bearer / `x-api-key` (`/v1/*` secinājumu saskarne):** pārlūkprogrammas nekad nepievieno
  tās automātiski. CORS šeit nav nozīmīga barjera — barjera ir API atslēga —,
  tāpēc šī saskarne ir apzināti konfigurēta pielaidīgi, lai pārlūkprogrammu un
  Electron klienti varētu lasīt atbildes, kurām tiem jau ir piekļuves tiesības.
- **Sīkfailu sesija (informācijas panelis):** aizsargāta gan ar pēc noklusējuma slēgtu piekļuvi, **gan**
  ar `Access-Control-Allow-Credentials` neesamību koplietotajā ceļā. Neiekļaujiet
  pārvaldības/informācijas paneļa izcelsmes vietas nevienā pielaidīgā konfigurācijā; tām jāpaliek ar precīzi
  slēgtu piekļuvi.

## Piemērs: reversais starpniekserveris OmniRoute priekšā

CORS ievērošanu nodrošina pats OmniRoute, tāpēc starpniekserverim parasti **nevajadzētu** pievienot vai
pārrakstīt `Access-Control-*` galvenes (dubultas galvenes traucē pārlūkprogrammu darbībai). Terminējiet TLS
un pārsūtiet pieprasījumus — ļaujiet OmniRoute atbildēt uz priekšpieprasījumiem:

```nginx
# nginx — pārsūtiet uz OmniRoute; NEIEVIETOJIET šeit Access-Control-*
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # NEIESTATIET X-Forwarded-For uz 127.0.0.1 — tas apiet lokālās atgriezeniskās saites maršrutu aizsargu.
}
```

Iestatiet atļautās pārlūkprogrammu izcelsmes vietas OmniRoute (`CORS_ALLOWED_ORIGINS` vai
cilnē Security), nevis starpniekserverī.

## Avota faili

| Aspekts                                                    | Fails                                                                |
| ---------------------------------------------------------- | -------------------------------------------------------------------- |
| Atļauto vietu saraksta noteikšana un `getCorsStatus()`     | `src/server/cors/origins.ts`                                         |
| Starpprogrammatūras lietošana (vienīgais patiesības avots) | `src/server/authz/pipeline.ts`                                       |
| Settings → izpildlaika izcelsmes vietu ievietošana         | `src/lib/config/runtimeSettings.ts`                                  |
| Izpildlaika statuss informācijas panelim                   | `src/app/api/settings/authz-inventory/route.ts`                      |
| Informācijas paneļa brīdinājuma reklāmkarogs               | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Lauks CORS Allowed Origins                                 | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent CORS katram maršrutam (izņēmums)               | `src/lib/cloudAgent/api.ts`                                          |

## Skatiet arī

- [Maršrutu aizsardzības līmeņi](./ROUTE_GUARD_TIERS.md) — atgriezeniskās cilpas ierobežojumu piemērošana
  maršrutiem, kas spēj palaist procesus (atsevišķs, papildinošs kontroles mehānisms).
- [Autorizācijas rokasgrāmata](../architecture/AUTHZ_GUIDE.md) — pilns autentifikācijas un autorizācijas konveijers.
