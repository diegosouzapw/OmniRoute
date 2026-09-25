# Kiro Setup Guide (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇧🇦 [bs](../../../bs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Tato příručka popisuje přidávání účtů Kiro (AI asistenta pro programování hostovaného v AWS) do OmniRoute
se zaměřením na souběžné používání více účtů bez konfliktů relací.

---

## Kontext: Proč může mezi účty Kiro docházet ke konfliktům

Backend Kiro používá registrace klientů AWS SSO OIDC ke sledování aktivních relací.
Zásadní omezení: **každá registrace klienta OIDC podporuje současně pouze jednu aktivní
relaci**. Když se druhé zařízení nebo uživatel ověří pomocí stejného
registrovaného klienta, backend zneplatní obnovovací token prvního účtu.

Jde o stejný mechanismus, který způsobuje problémy při spuštění `kiro-cli login` na
počítači, kde je již přihlášen jiný účet Kiro — nové přihlášení zruší platnost
tokenu prvního účtu.

---

## Jak tento problém řeší OmniRoute (v3.8.0+)

Od verze v3.8.0 volá OmniRoute při každém importu připojení Kiro funkci `registerClient()`
(AWS SSO OIDC). Každé připojení OmniRoute tak získá vlastní vyhrazenou registraci klienta
OIDC. Protože jsou jednotlivé registrace klientů nezávislé, obnovení nebo opětovné
ověření jednoho účtu neovlivní obnovovací token žádného jiného účtu.

Izolace se vztahuje na metody importu s obnovovacím tokenem, zatímco ověřování pomocí
API klíče se obnovovacím relacím OIDC zcela vyhýbá:

| Metoda importu                                        | Stav izolace                                                                                     |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Tok pomocí kódu zařízení AWS Builder ID / IDC         | Izolováno od zavedení toku pomocí kódu zařízení                                                  |
| **Import tokenu** (ruční vložení obnovovacího tokenu) | Izolováno od v3.8.0                                                                              |
| **Přihlášení přes Google / GitHub**                   | Izolováno od v3.8.0                                                                              |
| **Automatický import** (SQLite kiro-cli)              | Izolováno od v3.8.0 (cesta SQLite již byla izolovaná; nyní je izolovaná i záložní mezipaměť SSO) |
| **API klíč** (dlouhodobý klíč CodeWhisperer)          | Bez obnovovací relace; klíč je ověřen a uložen jako přihlašovací údaj typu bearer                |

---

## Poznámka k migraci připojení vytvořených před verzí v3.8.0

Připojení importovaná před verzí v3.8.0 nemají v `providerSpecificData` uloženou
vyhrazenou registraci klienta OIDC. Tato připojení nadále fungují, ale používají sdílený
koncový bod pro obnovení sociálního přihlášení, což znamená, že dvě taková připojení
si stále mohou navzájem zneplatňovat tokeny.

**Jak získat izolaci:** odstraňte staré připojení v části **Řídicí panel → Poskytovatelé**
a znovu je importujte pomocí libovolného podporovaného postupu importu. Všechna nově
vytvořená připojení automaticky získají vlastní registraci klienta.

---

## Přidání dvou účtů Kiro vedle sebe

### Předpoklady

- OmniRoute v3.8.0 nebo novější.
- Funkční účet Kiro (e-mail + heslo nebo přihlášení přes Google či GitHub).
- Volitelně druhý účet Kiro.

### Krok 1: Importujte první účet

1. Otevřete **Řídicí panel → Poskytovatelé → Přidat poskytovatele → Kiro**.
2. Vyberte jednu z následujících možností:
   - **Import tokenu** — vložte obnovovací token začínající na `aorAAAAAG`.
   - **API klíč** — vložte dlouhodobý API klíč Kiro / CodeWhisperer.
   - **Přihlášení přes Google / GitHub** — dokončete tok OAuth v prohlížeči.
   - **Automatický import** — klikněte na tlačítko; OmniRoute načte přihlašovací údaje
     z místní databáze kiro-cli nebo z `~/.aws/sso/cache`.
3. Připojení se uloží. Toky s obnovovacím tokenem automaticky zaregistrují vyhrazeného
   klienta OIDC. Toky s API klíčem ověří klíč pomocí AWS a neukládají obnovovací token.

### Krok 2: Importujte druhý účet

Zopakujte krok 1 pro druhý účet. Protože každý import vytvoří samostatnou registraci
klienta OIDC, jsou obě připojení plně izolována.

### Krok 3: Ověřte, že jsou obě připojení aktivní

1. **Řídicí panel → Poskytovatelé** — obě připojení Kiro by měla mít stav **Aktivní**.
2. **Řídicí panel → Stav** — obě připojení by měla úspěšně projít kontrolou stavu tokenu.

### Krok 4: Použijte kombinaci ke směrování mezi účty

Vytvořte kombinaci s oběma připojeními jako cíli pro vyvažování zátěže nebo přepnutí
na záložní připojení:

```
kiro/kiro-dev → kiro/kiro-pro
```

Konfiguraci kombinací naleznete v souboru [FEATURES.md](./FEATURES.md) a v dokumentaci ke směrování.

---

## Podnikoví uživatelé / uživatelé IDC

Pro účty AWS IAM Identity Center (IDC) použijte postup s **AWS Builder ID / kódem zařízení IDC**
v nabídce **Dashboard → Providers → Kiro → Device Code**. Postup s kódem zařízení byl
vždy zcela izolovaný. U těchto připojení není nutný opětovný import.

Podnikoví uživatelé, kteří pracují v jiném než výchozím regionu AWS, mohou při
importu prostřednictvím rozhraní Import Token API určit region:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Pokud je pole `region` vynecháno, použije se výchozí hodnota `us-east-1`.

---

## Postup importu klíče API

Ověřování pomocí klíče API je určeno pro dlouhodobě platné přihlašovací údaje typu bearer služby Kiro / AWS CodeWhisperer. Nepoužívá
obnovení OAuth, takže se vyhýbá zneplatnění sdílené relace OIDC.

### Ovládací panel

1. Otevřete **Dashboard -> Providers -> Kiro**.
2. Vyberte **API Key**.
3. Vložte klíč API a volitelně region AWS (výchozí je `us-east-1`).
4. OmniRoute klíč ověří a připojení uloží.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Interní kontrakt

Trasa API ověřuje klíč voláním `KiroService.validateApiKey()`, které
používá `ListAvailableProfiles` vůči koncovému bodu CodeWhisperer/Amazon Q odpovídajícímu regionu
a získá hodnotu `profileArn`.

Uložené připojení používá:

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

Za běhu odesílá `KiroExecutor.buildHeaders()` klíč jako
`Authorization: Bearer <key>` a přidává `tokentype: API_KEY`. Volání týkající se kvót/profilů
používají stejný identifikátor, takže AWS považuje hodnotu bearer za dlouhodobě platný klíč API, nikoli
za přístupový token OIDC nebo sociálního přihlášení.

---

## Vypršení platnosti klienta OIDC

Veřejní klienti AWS SSO OIDC obvykle vyprší po 90 dnech
(`clientSecretExpiresAt`). OmniRoute ukládá toto časové razítko do `providerSpecificData`
pro účely sledování. Pokud se připojení přestane po přibližně 90 dnech obnovovat, znovu
je importujte, abyste získali novou registraci klienta OIDC. Automatická opětovná registrace při
vypršení platnosti je evidována jako budoucí vylepšení.

Připojení pomocí klíče API nemají dobu platnosti klienta OIDC, protože se neobnovují
prostřednictvím AWS SSO OIDC.

---

## Řešení problémů

### Druhý účet se stále odhlašuje

- Zkontrolujte obě připojení v nabídce **Dashboard → Providers** a ověřte, že každé z nich má ve svém nezpracovaném
  JSON neprázdnou hodnotu `clientId` (zobrazuje se prostřednictvím informační ikony). Pokud u některého připojení
  `clientId` chybí, bylo importováno před verzí v3.8.0 — importujte je znovu.

### Import selže s chybou „Token validation failed“

- Ujistěte se, že obnovovací token začíná řetězcem `aorAAAAAG`.
- Ujistěte se, že OmniRoute může přistupovat k `https://oidc.us-east-1.amazonaws.com` (nebo k nakonfigurovanému
  regionu). Pokud používáte firemní proxy server, nastavte proxy server na úrovni poskytovatele v nabídce
  **Dashboard → Settings → Proxies**.

### Import klíče API selže

- Ověřte, že jde o klíč API služby Kiro / CodeWhisperer, nikoli o obnovovací token.
- Ověřte, že region AWS odpovídá klíči/účtu. Výchozí hodnota je `us-east-1`.
- Klíč musí umožňovat volání `ListAvailableProfiles`; jinak OmniRoute nemůže
  získat požadovanou hodnotu `profileArn`.

Informace o dalších problémech najdete v hlavním souboru [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
