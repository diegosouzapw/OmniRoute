# Management Authentication (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute heeft **vier credentialfamilies** die toegang tot beheerroutes kunnen verlenen.
Ze zijn niet onderling uitwisselbaar. Inferentie-API-sleutels (`sk-…`) beheren de
server **niet**, tenzij hieraan expliciet de scope `manage` of `admin` is toegekend.

Canonieke implementatie: `src/lib/api/requireManagementAuth.ts`.

| Credential             | Gebruikelijke vorm                     | Waar aangemaakt                                     | Beoogd gebruik            | Beheermogelijkheden                                                                                                 |
| ---------------------- | -------------------------------------- | --------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Dashboard-JWT-sessie   | `auth_token`-cookie                    | Aanmelding bij het dashboard                        | Browser-UI                | Volledig beheer via het dashboard, met inachtneming van CSRF-, lokaliteits- en regels voor altijd beveiligde routes |
| CLI-machine-id-token   | intern / lokaal                        | CLI-bootstrap (`omniroute` op dezelfde machine)     | Lokale CLI                | Alleen lokaal beheer                                                                                                |
| Access Token met scope | `oma_live_…`                           | **Settings → Access Tokens** of `omniroute connect` | Externe CLI en beheer-API | Moet voldoen aan de voor de route vereiste scope `read`, `write` of `admin`                                         |
| Inferentie-API-sleutel | `sk-…` (en andere API-sleutelprefixen) | **API Manager / API Keys**                          | `/v1/*`-inferentie        | **Geen**, tenzij de metadata van de sleutel `manage` of `admin` bevat                                               |

`oma_`-credentials zijn credentials voor beheer/de CLI. Het zijn **geen** inferentie-API-sleutels.

Als aanmelding/API-sleutelauthenticatie voor de server is uitgeschakeld, kunnen sommige beheerroutes
niet-geverifieerde aanroepen accepteren. Voor uitsluitend lokale en altijd beveiligde routes
blijven de eigen regels van toepassing. Het aanbieden van een van deze credentials is daarom niet
altijd verplicht, en het bezitten ervan is zonder de vereiste scope en routelokaliteit niet
altijd voldoende.

Gerelateerd: [Externe modus](./REMOTE-MODE.md) (hoe `oma_live_…` voor een externe CLI wordt aangemaakt).

---

## Scopematrices

Deze twee scopevocabularies zijn **verschillend**. Gebruik ze niet door elkaar.

### Access Token-scopes (`oma_live_…`)

| Scope   | Gebruikelijke bewerkingen                                                                      |
| ------- | ---------------------------------------------------------------------------------------------- |
| `read`  | Lijst-/status-GET-aanvragen die het token mag bekijken                                         |
| `write` | Mutaties (aanmaken/bijwerken/verwijderen) onder beheerdersniveau                               |
| `admin` | Volledig token voor externe CLI / verbinding (bootstrap via wachtwoord gebruikt dit standaard) |

Een token met `read` kan geen `write`-route aanroepen. Vorm van het runtimebericht:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Beheerscopes voor API-sleutels

| Scope    | Betekenis                                                                                |
| -------- | ---------------------------------------------------------------------------------------- |
| (geen)   | Alleen inferentie. Beheerroutes retourneren 403.                                         |
| `manage` | Beheer-API (dezelfde toegangscontrole als de API-sleuteltak van `requireManagementAuth`) |
| `admin`  | Voldoet ook aan `hasManageScope` (wordt behandeld als geschikt voor beheer)              |

Schakel `manage` voor de sleutel in via de UI van API Keys / API Manager. Gebruik een
sleutel van een chatclient niet opnieuw voor automatisering, tenzij u die scope bewust hebt toegekend.

---

## Aanmaken en intrekken

### Dashboard-JWT-sessie

1. Open `/login` en meld u aan met het beheerwachtwoord (`INITIAL_PASSWORD` bij de eerste start).
2. De cookie `auth_token` is HttpOnly. Het browserdashboard gebruikt deze automatisch.
3. Meld u af via `/api/auth/logout`. Er is geen langlevend geheim om te kopiëren.

### CLI-machine-id-token

1. Voer `omniroute` uit op **dezelfde host** als de server (loopback).
2. De CLI maakt via bootstrap een machine-id-token aan onder `~/.omniroute/` (chmod 600).
3. Dit werkt **niet** vanaf een andere machine. Gebruik een Access Token voor een externe CLI.

### Access Token met scope (`oma_live_…`)

1. Dashboard: **Settings → Access Tokens** → aanmaken (naam + scope). **Het geheim wordt slechts eenmaal weergegeven.**
2. Of via de CLI: `omniroute connect <host>` (wachtwoord → token). Zie [Externe modus](./REMOTE-MODE.md).
3. Header: `Authorization: Bearer oma_live_…`
4. Trek het token in via dezelfde Access Tokens-pagina (of verwijder de CLI-context).
5. De server slaat alleen een hash op. Behandel de platte tekst als een wachtwoord.

### API-sleutel met beheerscope

1. Dashboard: **API Manager / API Keys** → maak een sleutel aan of bewerk er een → schakel `manage` (of `admin`) in.
2. Header: `Authorization: Bearer sk-…` (het daadwerkelijke prefix van de sleutel).
3. Trek de sleutel in of verwijder `manage` via dezelfde UI.
4. Minimaal noodzakelijke rechten voor automatisering buiten de CLI: gebruik bij voorkeur een `read` Access Token voor taken die alleen GET-aanvragen uitvoeren; gebruik `manage` op een API-sleutel alleen wanneer de aanroeper zowel `/v1` als beheer moet gebruiken.

---

## Headerindeling

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Plaats beheerreferenties niet in het URL-pad of de querystring. Beheerauthenticatie
verloopt uitsluitend via een header/cookie.

---

## Voorbeelden om te kopiëren en plakken

Alleen-lezen (providers weergeven). Gebruik een `read`-toegangstoken:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Wijzigen (een providerverbinding maken). Gebruik een `write`/`admin`-toegangstoken of een
API-sleutel met `manage`-scope:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inferentie (geen beheer). Gewone API-sleutel, geen `manage` vereist:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Huidige runtimefouten (toon geen geheimen)

| Situatie                                        | Gebruikelijke status | Bericht (geanonimiseerd)                                             |
| ----------------------------------------------- | -------------------- | -------------------------------------------------------------------- |
| Geen referentie                                 | 401                  | `Authentication required`                                            |
| Ongeldige/verlopen `oma_live_…`                 | 401                  | `Invalid or expired access token`                                    |
| Geldige API-sleutel zonder `manage`/`admin`     | 403                  | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Ongeldige gewone API-sleutel op een beheerroute | 403                  | `Invalid management token`                                           |
| Scope van toegangstoken te beperkt              | 403                  | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" betekent dat de bearer **niet** als beheerreferentie
is geaccepteerd. Het vertelt u **niet** welk type u moet aanmaken. Gebruik de bovenstaande tabel:
inferentiesleutels hebben de `manage`-scope nodig; de externe CLI heeft `oma_live_…` nodig; het dashboard
gebruikt de sessiecookie.

---

## Aanbevolen keuze volgens het principe van minimale rechten

| Aanroeper                                                 | Gebruik                                          |
| --------------------------------------------------------- | ------------------------------------------------ |
| Browser                                                   | Dashboardsessie                                  |
| CLI op de serverhost                                      | Machinetoken                                     |
| CLI op een laptop die met een externe server communiceert | `oma_live_…` van `omniroute connect`             |
| CI / scripts (alleen beheer)                              | `oma_live_…` met de kleinste scope die werkt     |
| CI die zowel `/v1` als `/api` moet aanroepen              | API-sleutel met `manage` **of** twee referenties |
