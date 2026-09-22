# Management Authentication (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute har **fyra autentiseringsfamiljer** som kan auktorisera hanteringsrutter.
De är inte utbytbara. API-nycklar för inferens (`sk-…`) hanterar **inte**
servern om de inte uttryckligen har tilldelats omfånget `manage` eller `admin`.

Kanonisk implementation: `src/lib/api/requireManagementAuth.ts`.

| Autentiseringsuppgift           | Typiskt format                            | Skapas var                                                 | Avsedd användning            | Hanteringsbehörighet                                                                                                  |
| ------------------------------- | ----------------------------------------- | ---------------------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| JWT-session för kontrollpanelen | `auth_token`-cookie                       | Inloggning på kontrollpanelen                              | Webbläsargränssnitt          | Fullständig hantering via kontrollpanelen, med förbehåll för regler om CSRF, lokal åtkomst och alltid skyddade rutter |
| Maskin-ID-token för CLI         | intern/lokal                              | Initiering av CLI (`omniroute` på samma maskin)            | Lokalt CLI                   | Endast lokal hantering                                                                                                |
| Omfångsbegränsad åtkomsttoken   | `oma_live_…`                              | **Inställningar → Åtkomsttoken** eller `omniroute connect` | Fjärr-CLI och hanterings-API | Måste uppfylla ruttens obligatoriska omfång `read`, `write` eller `admin`                                             |
| API-nyckel för inferens         | `sk-…` (och andra prefix för API-nycklar) | **API-hanteraren/API-nycklar**                             | Inferens via `/v1/*`         | **Ingen** om inte nyckelns metadata inkluderar `manage` eller `admin`                                                 |

Autentiseringsuppgifter med `oma_` är avsedda för hantering/CLI. De är **inte** API-nycklar för inferens.

Om autentisering med inloggning/API-nyckel är inaktiverad för servern kan vissa hanteringsrutter
acceptera oautentiserade anrop. Rutter som endast är lokala och alltid skyddade tillämpar
fortfarande sina egna regler. Det är därför inte alltid obligatoriskt att uppvisa någon
av dessa autentiseringsuppgifter, och innehav av en sådan är inte alltid tillräckligt utan
det obligatoriska omfånget och rätt lokalitet för rutten.

Relaterat: [Fjärrläge](./REMOTE-MODE.md) (hur `oma_live_…` utfärdas för ett fjärr-CLI).

---

## Omfångsmatriser

Dessa två omfångsvokabulärer är **olika**. Blanda inte ihop dem.

### Omfång för åtkomsttoken (`oma_live_…`)

| Omfång  | Typiska åtgärder                                                               |
| ------- | ------------------------------------------------------------------------------ |
| `read`  | List-/statusanrop med GET som token har rätt att se                            |
| `write` | Ändringar (skapa/uppdatera/radera) under administratörsnivå                    |
| `admin` | Fullständigt fjärr-CLI/anslutningstoken (standard vid initiering med lösenord) |

En token med `read` kan inte anropa en `write`-rutt. Meddelandeformat vid körning:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Hanteringsomfång för API-nycklar

| Omfång   | Innebörd                                                                    |
| -------- | --------------------------------------------------------------------------- |
| (inget)  | Endast inferens. Hanteringsrutter returnerar 403.                           |
| `manage` | Hanterings-API (samma spärr som API-nyckelgrenen i `requireManagementAuth`) |
| `admin`  | Uppfyller även `hasManageScope` (behandlas som hanteringsbehörig)           |

Aktivera `manage` för nyckeln i gränssnittet API-nycklar/API-hanteraren. Återanvänd inte en
nyckel för chattklienter till automatisering om du inte avsiktligt har tilldelat detta omfång.

---

## Så skapar och återkallar du

### JWT-session för kontrollpanelen

1. Öppna `/login` och logga in med hanteringslösenordet (`INITIAL_PASSWORD` vid första starten).
2. Cookien `auth_token` är HttpOnly. Webbläsarens kontrollpanel använder den automatiskt.
3. Logga ut via `/api/auth/logout`. Det finns ingen långlivad hemlighet att kopiera.

### Maskin-ID-token för CLI

1. Kör `omniroute` på **samma värd** som servern (loopback).
2. CLI:t initierar en maskin-ID-token under `~/.omniroute/` (chmod 600).
3. Detta fungerar **inte** från en annan maskin. Använd en åtkomsttoken för fjärr-CLI.

### Omfångsbegränsad åtkomsttoken (`oma_live_…`)

1. Kontrollpanelen: **Inställningar → Åtkomsttoken** → skapa (namn + omfång). **Hemligheten visas en gång.**
2. Eller CLI: `omniroute connect <host>` (lösenord → token). Se [Fjärrläge](./REMOTE-MODE.md).
3. Rubrik: `Authorization: Bearer oma_live_…`
4. Återkalla från samma sida för åtkomsttoken (eller radera CLI-kontexten).
5. Servern lagrar endast en hash. Behandla klartexten som ett lösenord.

### API-nyckel med omfånget manage

1. Kontrollpanelen: **API-hanteraren/API-nycklar** → skapa eller redigera en nyckel → aktivera `manage` (eller `admin`).
2. Rubrik: `Authorization: Bearer sk-…` (nyckelns faktiska prefix).
3. Återkalla eller ta bort `manage` i samma gränssnitt.
4. Minsta möjliga behörighet för automatisering som inte är CLI:t: föredra en `read`-åtkomsttoken för jobb som endast använder GET; använd `manage` på en API-nyckel endast när anroparen även måste kommunicera med `/v1` och hanterings-API:t.

---

## Format för headers

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Placera inte autentiseringsuppgifter för administration i URL-sökvägen eller frågesträngen. Autentisering för administration får endast anges via headers/cookies.

---

## Exempel att kopiera och klistra in

Skrivskyddad (lista leverantörer). Använd en `read`-åtkomsttoken:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Ändring (skapa en leverantörsanslutning). Använd en `write`/`admin`-åtkomsttoken eller en API-nyckel med `manage`-behörighet:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inferens (inte administration). Vanlig API-nyckel, inget `manage` krävs:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Aktuella körningsfel (återge inte hemligheter)

| Situation                                           | Typisk status | Meddelande (rensat)                                                  |
| --------------------------------------------------- | ------------- | -------------------------------------------------------------------- |
| Inga autentiseringsuppgifter                        | 401           | `Authentication required`                                            |
| Ogiltig/utgången `oma_live_…`                       | 401           | `Invalid or expired access token`                                    |
| Giltig API-nyckel utan `manage`/`admin`             | 403           | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Ogiltig vanlig API-nyckel på en administrationsrutt | 403           | `Invalid management token`                                           |
| Åtkomsttokenens behörighet är för låg               | 403           | `Access token scope '<have>' is insufficient; '<need>' required.`    |

”Invalid management token” innebär att bearer-tokenen **inte** godkändes som en autentiseringsuppgift för administration. Det anger **inte** vilken typ du behöver utfärda. Använd tabellen ovan: inferensnycklar behöver `manage`-behörighet; fjärr-CLI behöver `oma_live_…`; dashboarden använder sessionscookien.

---

## Rekommenderat val enligt principen om minsta behörighet

| Anropare                                                   | Använd                                                        |
| ---------------------------------------------------------- | ------------------------------------------------------------- |
| Webbläsare                                                 | Dashboard-session                                             |
| CLI på servervärden                                        | Maskintoken                                                   |
| CLI på en bärbar dator som kommunicerar med en fjärrserver | `oma_live_…` från `omniroute connect`                         |
| CI/skript (endast administration)                          | `oma_live_…` med minsta möjliga behörighet som fungerar       |
| CI som måste anropa både `/v1` och `/api`                  | API-nyckel med `manage` **eller** två autentiseringsuppgifter |
