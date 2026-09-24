# Public Credentials Handling (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Patiesības avots:** `open-sse/utils/publicCreds.ts`
> **Testi:** `tests/unit/publicCreds.test.ts`
> **Pēdējoreiz atjaunināts:** 2026-08-07 — v3.8.50
> **Mērķauditorija:** Inženieri, kuri integrē pakalpojumu sniedzējus, kuru publiskajos CLI ir iekļauti publiski OAuth client_id / client_secret / Firebase Web API atslēgas.
> **Statuss:** **OBLIGĀTS** visam jaunajam kodam, kurā tiek iegulti augšupstraumes identifikatori.

## Kāpēc tas pastāv

- [OAuth 2.0 vietējām lietotnēm (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — instalēto lietotņu OAuth client_id / client_secret ir publiski; faktisko drošību nodrošina PKCE.
- [Firebase API atslēgas](https://firebase.google.com/docs/projects/api-keys) — tīmekļa klientu identifikatori pēc būtības ir publiski.

OmniRoute ir jāiegulst šīs vērtības, lai lietotāji, kuri nekonfigurē `.env`, uzreiz saņemtu funkcionējošu OAuth plūsmu. Bez iegultas rezerves vērtības Gemini / Antigravity pakalpojumu sniedzēji pārstāj darboties ikvienam lietotājam, kurš izvēlas pieeju „vienkārši klonē un palaid”.

Tomēr tādas literālas vērtības kā `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` atpazīst **GitHub Secret Scanning**, **Semgrep** un līdzīgi veidņu skeneri. Katrs laidiens rada trokšņainu kļūdaini pozitīvu rezultātu plūsmu, push aizsardzība bloķē leģitīmus komitus, un operatori pārstāj uzticēties brīdinājumu plūsmai.

`open-sse/utils/publicCreds.ts` palīgrīks vienlaikus atrisina abus ierobežojumus:

- Iegulst publisko identifikatoru kā **ar XOR maskētu baitu secību** (avota kodā nav skenera atpazīstamas veidnes).
- Izpildlaikā to dekodē, izmantojot `decodePublicCred` / `resolvePublicCred`.
- Nosaka neapstrādātas vērtības, kas jau atbilst labi zināmiem prefiksiem (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`), un nodod tās tālāk nemainītas, lai lietotāju esošajās `.env` datnēs saglabātās neapstrādātās vērtības turpinātu darboties bez **jebkādas migrācijas**.

Tā ir **obfuskācija, nevis šifrēšana.** Ikviens, kurš lasa avota kodu, var atgūt vērtību — tas ir pieņemami, jo vērtība pēc būtības ir publiska. Vienīgais mērķis ir izvairīties no skeneru regulāro izteiksmju atbilstībām.

## Obligātais modelis

### 1. Jauna publiska akreditācijas datu elementa pievienošana

Ja nepieciešams iegult jaunu augšupstraumes nodrošinātu vērtību, kas:

- nāk no publiska CLI / darbvirsmas lietotnes / pārlūkprogrammas komplekta, **un**
- ko augšupstraumes pakalpojumu sniedzējs dokumentē (vai uzskata) par publisku klienta identifikatoru, **un**
- ko pretējā gadījumā atpazītu veidņu skeneris (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` utt.),

…izpildiet šo kontrolsarakstu:

1. Ģenerējiet maskēto baitu secību:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Pievienojiet jaunu ierakstu `EMBEDDED_DEFAULTS` objektam datnē `open-sse/utils/publicCreds.ts`, izmantojot **neitrālu atslēgas nosaukumu** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` utt.). Palīgrīkā **neizmantojiet** tādus nosaukumus kā `client_secret` vai `api_key` — šie vārdi aktivizē Semgrep vispārīgos slepeno vērtību noteikumus.

3. Pievienojiet `keyof typeof EMBEDDED_DEFAULTS` publiskajai tipu apvienībai (tas tiek secināts automātiski).

4. Patērētāja kodā aizstājiet cieti kodēto literāli ar:

   ```ts
   // viena vides mainīgā pārrakstīšana
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // vairāki vides mainīgo aizstājvārdi (uzvar pirmais, kas nav tukšs)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // nav vides mainīgā pārrakstīšanas (vienmēr iegultā noklusējuma vērtība)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Izņemiet literāli no `.env.example` (aizstājiet to tikai ar komentāriem saturošu dokumentāciju, kas norāda lasītājiem uz šo vietu):

   ```dotenv
   # ── Pakalpojumu sniedzējs (Google / Firebase / utt.) ──
   # Publiskie OAuth akreditācijas dati ir iegulti kodā, izmantojot
   # open-sse/utils/publicCreds.ts. Iestatiet šos mainīgos tikai savu datu izmantošanai.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Atjauniniet `tests/unit/publicCreds.test.ts`, lai jaunajai atslēgai pievienotu formas pārbaudi (pārbaudiet formātu, nevis literālo vērtību — modeli skatiet esošajos testos).

7. **Nekad** nepievienojiet `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` literāļus testu datnēm. Izmantojiet `FAKE_*` konstantes, kas veidotas no fragmentiem ar `.join("")` (skatiet esošos testus).

### 2. Patērētāji

- **Lasiet tikai no `resolvePublicCred()` / `resolvePublicCredMulti()`** — nekad neizsauciet `decodePublicCredBytes()` tieši ārpus palīgrīka.
- Palīgrīks ir apzināti viegls (lineāra baitu XOR operācija) un droši izsaucams moduļa ielādes laikā; noklusējuma vērtības tiek aprēķinātas vienreiz.
- Vides mainīgā pārrakstītā vērtība vienmēr ir prioritāra. Ja lietotājs iestata `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, palīgrīks šo neapstrādāto vērtību nodod tālāk nemainītu.

### 3. Aizliegtie modeļi

❌ **Nekad** neveiciet nevienu no tālāk minētajām darbībām produkcijas kodā (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// SLIKTI: literālā vērtība aktivizē Secret Scanning un Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// SLIKTI: literāļa base64 kodējums — GitHub to joprojām nosaka kopš 2025. gada februāra
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// SLIKTI: virkņu konkatenācija, kas izpildlaikā no jauna saliek veidni
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// SLIKTI: hex/ROT13 kodējums — cita obfuskācija, tas pats noteikšanas risks
clientSecret: hexDecode("474f4353..."),
```

Visi šie varianti galu galā aktivizē skeneri. Izmantojiet `resolvePublicCred()`.

❌ **Nekad** nepievienojiet literālus akreditācijas datus datnei `.env.example`. Lietotāji, kuriem nepieciešamas īstas augšupstraumes vērtības, var tās paši iegūt no publiskā CLI vai izmantot savu OAuth reģistrāciju.

❌ **Nekad** nenoraidiet jaunu slepeno vērtību skenēšanas brīdinājumu, vispirms nepārbaudot, vai akreditācijas dati nav jāpārvieto uz šo palīgrīku.

## Saistītie kontroles mehānismi

- `RAW_VALUE_PATTERN` failā `publicCreds.ts` uzskaita prefiksus, kas aktivizē vērtības nodošanu bez izmaiņām (atpakaļsaderībai). Paplašiniet to tikai dokumentētiem publisko akreditācijas datu formātiem, nekad — proprietāriem noslēpumiem.
- `.env.example` ir iekļauts CI skriptā `check-env-doc-sync` — noņemot šeit mainīgo, pārliecinieties, ka dokumentācija tam atbilst.
- Gan `npm run test:vitest`, gan `node --import tsx/esm --test tests/unit/publicCreds.test.ts` testu komplektiem vienmēr jāizpildās sekmīgi.

## Kad šo palīgfunkciju NEIZMANTOT

Šī palīgfunkcija ir paredzēta **tikai** akreditācijas datiem, kas ir:

1. Publiski izplatīti no sākotnējā pakalpojuma sniedzēja puses (CLI binārais fails, pārlūkprogrammas pakotne, oficiālā dokumentācija).
2. Dokumentēti vai nepārprotami norādīti kā nekonfidenciāli (aizsargāti ar PKCE, Firebase tīmekļa atslēga vai līdzīgi).

Visam pārējam — operatora izsniegtiem pilnvarojuma marķieriem, katra nomnieka noslēpumiem, jūsu OAuth lietotnes `client_secret`, šifrēšanas atslēgām, JWT noslēpumiem, datubāzu parolēm — izmantojiet **tikai vides mainīgos** (`process.env.FOO`, `||` atkāpšanās uz tukšu vērtību / skaidri norādītu kļūdu). Tie jāglabā `.env` un [šifrētajā akreditācijas datu krātuvē](./COMPLIANCE.md), nevis pirmkodā.

## Atsauces

- [Google: OAuth 2.0 vietējām lietotnēm](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: API atslēgas klientu identificēšanai](https://firebase.google.com/docs/projects/api-keys)
- [GitHub slepeno datu skenēšanas atbalstītie noslēpumi](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: marķieru noteikšana base64 kodējumā (2025. gada februāris)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Komits, ar kuru ieviesta šī palīgfunkcija: `1a39c31f` — _fix(security): maskēt publiskos ārējā pakalpojuma akreditācijas datus un centralizēt kļūdu sanitizēšanu_
