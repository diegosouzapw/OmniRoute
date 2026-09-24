# Kiro Setup Guide (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇧🇦 [bs](../../../bs/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Táto príručka opisuje pridávanie účtov Kiro (AI asistenta na programovanie hostovaného v AWS) do OmniRoute
so zameraním na súbežné používanie viacerých účtov bez konfliktov relácií.

---

## Kontext: Prečo môže dochádzať ku konfliktom účtov Kiro

Backend Kiro používa registrácie klientov AWS SSO OIDC na sledovanie aktívnych relácií.
Kľúčové obmedzenie: **každá registrácia klienta OIDC podporuje iba jednu aktívnu
reláciu naraz**. Keď sa druhé zariadenie alebo používateľ autentifikuje pomocou rovnakého
registrovaného klienta, backend zneplatní obnovovací token prvého účtu.

Ide o rovnaký mechanizmus, ktorý spôsobuje problémy pri spustení `kiro-cli login` na
počítači, na ktorom je už prihlásený iný účet Kiro — nové prihlásenie zruší platnosť
tokenu prvého účtu.

---

## Ako to rieši OmniRoute (v3.8.0+)

Od verzie v3.8.0 volá OmniRoute počas každého importu pripojenia Kiro funkciu
`registerClient()` (AWS SSO OIDC). Vďaka tomu získa každé pripojenie OmniRoute vlastnú
vyhradenú registráciu klienta OIDC. Keďže každá registrácia klienta je nezávislá, obnovenie
alebo opätovná autentifikácia jedného účtu neovplyvní obnovovací token žiadneho iného účtu.

Izolácia sa vzťahuje na metódy importu pomocou obnovovacieho tokenu, zatiaľ čo
autentifikácia pomocou kľúča API sa reláciám obnovenia OIDC úplne vyhýba:

| Metóda importu                                                | Stav izolácie                                                                                                             |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| AWS Builder ID / tok s kódom zariadenia IDC                   | Izolované od zavedenia toku s kódom zariadenia                                                                            |
| **Importovať token** (manuálne vloženie obnovovacieho tokenu) | Izolované od v3.8.0                                                                                                       |
| **Sociálne prihlásenie cez Google / GitHub**                  | Izolované od v3.8.0                                                                                                       |
| **Automatický import** (SQLite kiro-cli)                      | Izolované od v3.8.0 (cesta SQLite už bola izolovaná; záložný mechanizmus vyrovnávacej pamäte SSO je teraz tiež izolovaný) |
| **Kľúč API** (dlhodobý kľúč CodeWhisperer)                    | Bez relácie obnovenia; kľúč sa overí a uloží ako prihlasovací údaj typu bearer                                            |

---

## Poznámka k migrácii pripojení vytvorených pred v3.8.0

Pripojenia importované pred v3.8.0 nemajú vyhradenú registráciu klienta OIDC
uloženú v `providerSpecificData`. Tieto pripojenia naďalej fungujú, ale používajú zdieľaný
koncový bod obnovenia sociálnej autentifikácie, čo znamená, že dve takéto pripojenia si stále
môžu navzájom zneplatniť tokeny.

**Ak chcete získať izoláciu:** odstráňte staré pripojenie cez **Ovládací panel → Poskytovatelia**
a znova ho importujte pomocou ľubovoľného podporovaného spôsobu importu. Všetky novo vytvorené
pripojenia automaticky získajú vlastnú registráciu klienta.

---

## Pridanie dvoch účtov Kiro vedľa seba

### Predpoklady

- OmniRoute v3.8.0 alebo novšia verzia.
- Funkčný účet Kiro (e-mail + heslo alebo prihlásenie cez Google či GitHub).
- Voliteľne druhý účet Kiro.

### Krok 1: Importujte prvý účet

1. Otvorte **Ovládací panel → Poskytovatelia → Pridať poskytovateľa → Kiro**.
2. Vyberte jednu z možností:
   - **Importovať token** — vložte obnovovací token začínajúci reťazcom `aorAAAAAG`.
   - **Kľúč API** — vložte dlhodobý kľúč API Kiro / CodeWhisperer.
   - **Prihlásenie cez Google / GitHub** — dokončite tok OAuth v prehliadači.
   - **Automatický import** — kliknite na tlačidlo; OmniRoute načíta prihlasovacie údaje
     z lokálnej databázy kiro-cli alebo z `~/.aws/sso/cache`.
3. Pripojenie sa uloží. Toky s obnovovacím tokenom automaticky zaregistrujú vyhradeného
   klienta OIDC. Toky s kľúčom API overia kľúč pomocou AWS a neuložia obnovovací token.

### Krok 2: Importujte druhý účet

Zopakujte krok 1 pre druhý účet. Keďže každý import vytvorí samostatnú registráciu klienta
OIDC, obe pripojenia sú úplne izolované.

### Krok 3: Overte, že sú obe pripojenia aktívne

1. **Ovládací panel → Poskytovatelia** — obe pripojenia Kiro by mali zobrazovať stav **Aktívne**.
2. **Ovládací panel → Stav** — obe pripojenia by mali úspešne prejsť kontrolou stavu tokenu.

### Krok 4: Použite kombináciu na smerovanie medzi účtami

Vytvorte kombináciu s oboma pripojeniami ako cieľmi, aby ste medzi nimi mohli vyvažovať
zaťaženie alebo použiť jedno ako záložné:

```
kiro/kiro-dev → kiro/kiro-pro
```

Informácie o konfigurácii kombinácií nájdete v súbore [FEATURES.md](./FEATURES.md) a v dokumentácii smerovania.

---

## Používatelia Enterprise / IDC

Pre účty AWS IAM Identity Center (IDC) použite postup s **AWS Builder ID / kódom zariadenia IDC**
cez **Dashboard → Providers → Kiro → Device Code**. Postup s kódom zariadenia bol
vždy úplne izolovaný. Pre tieto pripojenia nie je potrebný opätovný import.

Používatelia Enterprise, ktorí pracujú v inom než predvolenom regióne AWS, môžu región zadať pri
importe prostredníctvom API Import Token:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Ak je pole `region` vynechané, predvolená hodnota je `us-east-1`.

---

## Postup importu API kľúča

Autentifikácia pomocou API kľúča je určená pre dlhodobo platné prihlasovacie údaje nosného tokenu Kiro / AWS CodeWhisperer. Nepoužíva
obnovovanie OAuth, takže sa vyhýba zneplatneniu zdieľanej relácie OIDC.

### Dashboard

1. Otvorte **Dashboard -> Providers -> Kiro**.
2. Vyberte **API Key**.
3. Vložte API kľúč a voliteľne región AWS (predvolene `us-east-1`).
4. OmniRoute overí kľúč a uloží pripojenie.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Interný kontrakt

Trasa API overí kľúč volaním `KiroService.validateApiKey()`, ktoré
používa `ListAvailableProfiles` voči koncovému bodu CodeWhisperer/Amazon Q zodpovedajúcemu regiónu
a získa `profileArn`.

Uložené pripojenie používa:

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

Počas vykonávania `KiroExecutor.buildHeaders()` odosiela kľúč ako
`Authorization: Bearer <key>` a pridáva `tokentype: API_KEY`. Volania týkajúce sa kvóty/profilu
používajú rovnakú značku, takže AWS považuje nosný token za dlhodobo platný API kľúč, a nie
za prístupový token OIDC alebo sociálneho prihlásenia.

---

## Vypršanie platnosti klienta OIDC

Platnosť verejných klientov AWS SSO OIDC zvyčajne vyprší po 90 dňoch
(`clientSecretExpiresAt`). OmniRoute ukladá túto časovú pečiatku v `providerSpecificData`
na účely pozorovateľnosti. Ak sa pripojenie po približne 90 dňoch prestane obnovovať, opätovne
ho importujte, aby ste získali novú registráciu klienta OIDC. Automatická opätovná registrácia po
vypršaní platnosti je evidovaná ako budúce vylepšenie.

Pripojeniam pomocou API kľúča nevyprší platnosť klienta OIDC, pretože sa neobnovujú
prostredníctvom AWS SSO OIDC.

---

## Riešenie problémov

### Druhý účet sa neustále odhlasuje

- Skontrolujte obe pripojenia v **Dashboard → Providers** a overte, že každé zobrazuje nenulovú hodnotu
  `clientId` vo svojom nespracovanom JSON (viditeľnom prostredníctvom informačnej ikony). Ak v niektorom pripojení
  chýba `clientId`, bolo importované pred v3.8.0 — importujte ho znova.

### Import zlyhá s hlásením „Token validation failed“

- Uistite sa, že obnovovací token začína na `aorAAAAAG`.
- Uistite sa, že OmniRoute môže pristupovať k `https://oidc.us-east-1.amazonaws.com` (alebo k nakonfigurovanému
  regiónu). Ak používate podnikový proxy server, nastavte proxy na úrovni poskytovateľa v
  **Dashboard → Settings → Proxies**.

### Import API kľúča zlyhá

- Overte, že kľúč je API kľúč Kiro / CodeWhisperer, nie obnovovací token.
- Overte, že región AWS zodpovedá kľúču/účtu. Predvolená hodnota je `us-east-1`.
- Kľúč musí umožňovať volanie `ListAvailableProfiles`; inak OmniRoute nedokáže
  získať požadovaný `profileArn`.

Ďalšie problémy nájdete v hlavnom súbore [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
