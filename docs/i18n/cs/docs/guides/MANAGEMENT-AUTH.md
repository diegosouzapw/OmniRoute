# Management Authentication (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute má **čtyři skupiny přihlašovacích údajů**, které mohou autorizovat přístup k trasám pro správu.
Nejsou vzájemně zaměnitelné. Klíče inferenčního API (`sk-…`) server
**nespravují**, pokud jim nebyl výslovně udělen rozsah `manage` nebo `admin`.

Kanonická implementace: `src/lib/api/requireManagementAuth.ts`.

| Přihlašovací údaj           | Typická podoba                      | Kde se vytváří                                             | Zamýšlené použití             | Možnosti správy                                                                                            |
| --------------------------- | ----------------------------------- | ---------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Relace JWT řídicího panelu  | cookie `auth_token`                 | Přihlášení k řídicímu panelu                               | Webové uživatelské rozhraní   | Úplná správa prostřednictvím řídicího panelu s ohledem na pravidla CSRF, lokálnosti a vždy chráněných tras |
| Token ID zařízení pro CLI   | interní / místní                    | Prvotní nastavení CLI (`omniroute` na stejném počítači)    | Místní CLI                    | Pouze místní správa                                                                                        |
| Přístupový token s rozsahem | `oma_live_…`                        | **Nastavení → Přístupové tokeny** nebo `omniroute connect` | Vzdálené CLI a API pro správu | Musí splňovat požadovaný rozsah trasy `read`, `write` nebo `admin`                                         |
| Klíč inferenčního API       | `sk-…` (a další předpony klíčů API) | **Správce API / Klíče API**                                | Inference `/v1/*`             | **Žádné**, pokud metadata klíče neobsahují `manage` nebo `admin`                                           |

Přihlašovací údaje `oma_` jsou určeny pro správu/CLI. **Nejsou** klíči inferenčního API.

Pokud je na serveru zakázáno ověřování přihlášením/klíčem API, mohou některé trasy
pro správu přijímat neověřené požadavky. Pro trasy přístupné pouze místně a vždy
chráněné trasy nadále platí jejich vlastní pravidla. Předložení jednoho z těchto
přihlašovacích údajů proto není vždy povinné a jeho vlastnictví bez požadovaného
rozsahu a dodržení lokálnosti trasy není vždy dostačující.

Související informace: [Vzdálený režim](./REMOTE-MODE.md) (jak se vydává `oma_live_…` pro vzdálené CLI).

---

## Matice rozsahů

Tyto dva slovníky rozsahů jsou **odlišné**. Nekombinujte je.

### Rozsahy přístupových tokenů (`oma_live_…`)

| Rozsah  | Typické operace                                                                                                      |
| ------- | -------------------------------------------------------------------------------------------------------------------- |
| `read`  | Výpisy/stavy prostřednictvím požadavků GET, které smí token zobrazit                                                 |
| `write` | Změny (vytváření/aktualizace/odstraňování) pod úrovní správce                                                        |
| `admin` | Úplné vzdálené CLI / token pro připojení (prvotní nastavení pomocí hesla ve výchozím nastavení používá tento rozsah) |

Token s rozsahem `read` nemůže volat trasu s rozsahem `write`. Podoba zprávy za běhu:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Rozsahy správy klíčů API

| Rozsah   | Význam                                                                       |
| -------- | ---------------------------------------------------------------------------- |
| (žádný)  | Pouze inference. Trasy pro správu vracejí stav 403.                          |
| `manage` | API pro správu (stejná brána jako větev klíče API v `requireManagementAuth`) |
| `admin`  | Také vyhovuje kontrole `hasManageScope` (považuje se za způsobilý ke správě) |

Povolte klíči rozsah `manage` v uživatelském rozhraní Klíče API / Správce API. Klíč
chatovacího klienta pro automatizaci znovu nepoužívejte, pokud jste mu tento rozsah
neudělili záměrně.

---

## Jak vytvořit a odvolat přístup

### Relace JWT řídicího panelu

1. Otevřete `/login` a přihlaste se pomocí hesla pro správu (`INITIAL_PASSWORD` při prvním spuštění).
2. Cookie `auth_token` používá atribut HttpOnly. Řídicí panel v prohlížeči ji používá automaticky.
3. Odhlaste se prostřednictvím `/api/auth/logout`. Neexistuje žádný dlouhodobý tajný údaj, který by bylo možné zkopírovat.

### Token ID zařízení pro CLI

1. Spusťte `omniroute` na **stejném hostiteli** jako server (přes místní smyčku).
2. CLI vytvoří token ID zařízení v adresáři `~/.omniroute/` (chmod 600).
3. Z jiného počítače to **nefunguje**. Pro vzdálené CLI použijte přístupový token.

### Přístupový token s rozsahem (`oma_live_…`)

1. Řídicí panel: **Nastavení → Přístupové tokeny** → vytvořit (název + rozsah). **Tajný údaj se zobrazí pouze jednou.**
2. Nebo CLI: `omniroute connect <host>` (heslo → token). Viz [Vzdálený režim](./REMOTE-MODE.md).
3. Hlavička: `Authorization: Bearer oma_live_…`
4. Odvolejte jej na stejné stránce Přístupové tokeny (nebo odstraňte kontext CLI).
5. Server ukládá pouze hodnotu hash. S nezakódovanou hodnotou zacházejte jako s heslem.

### Klíč API s rozsahem pro správu

1. Řídicí panel: **Správce API / Klíče API** → vytvořte nebo upravte klíč → povolte `manage` (nebo `admin`).
2. Hlavička: `Authorization: Bearer sk-…` (skutečná předpona klíče).
3. Odvolejte klíč nebo odeberte rozsah `manage` ve stejném uživatelském rozhraní.
4. Pro automatizaci, která nepoužívá CLI, dodržujte princip nejnižších oprávnění: pro úlohy používající pouze požadavky GET upřednostněte přístupový token s rozsahem `read`; rozsah `manage` u klíče API použijte pouze tehdy, když volající musí komunikovat jak s `/v1`, tak s rozhraním pro správu.

---

## Formát hlavičky

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Nevkládejte přihlašovací údaje pro správu do cesty URL ani do řetězce dotazu. Ověřování pro správu
probíhá pouze prostřednictvím hlavičky nebo souboru cookie.

---

## Příklady ke zkopírování

Pouze pro čtení (výpis poskytovatelů). Použijte přístupový token s oprávněním `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Provádění změn (vytvoření připojení k poskytovateli). Použijte přístupový token s oprávněním `write`/`admin` nebo
klíč API s rozsahem `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inference (nikoli správa). Běžný klíč API, oprávnění `manage` není vyžadováno:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Aktuální chyby za běhu (nevypisujte tajné údaje)

| Situace                                        | Typický stav | Zpráva (bez citlivých údajů)                                         |
| ---------------------------------------------- | ------------ | -------------------------------------------------------------------- |
| Chybí přihlašovací údaje                       | 401          | `Authentication required`                                            |
| Neplatný/expirující `oma_live_…`               | 401          | `Invalid or expired access token`                                    |
| Platný klíč API bez oprávnění `manage`/`admin` | 403          | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Neplatný běžný klíč API na trase pro správu    | 403          | `Invalid management token`                                           |
| Nedostatečný rozsah přístupového tokenu        | 403          | `Access token scope '<have>' is insufficient; '<need>' required.`    |

„Invalid management token“ znamená, že token typu bearer **nebyl** přijat jako přihlašovací
údaj pro správu. Zpráva vám **neříká**, který typ přihlašovacího údaje máte vytvořit. Použijte tabulku výše:
inferenční klíče potřebují oprávnění `manage`; vzdálené CLI potřebuje `oma_live_…`; řídicí panel
používá soubor cookie relace.

---

## Doporučená volba s nejnižšími oprávněními

| Volající                                            | Použití                                                        |
| --------------------------------------------------- | -------------------------------------------------------------- |
| Prohlížeč                                           | Relace řídicího panelu                                         |
| CLI na hostiteli serveru                            | Token stroje                                                   |
| CLI na notebooku komunikující se vzdáleným serverem | `oma_live_…` z `omniroute connect`                             |
| CI / skripty (pouze správa)                         | `oma_live_…` s nejmenším funkčním rozsahem                     |
| CI, které musí volat `/v1` i `/api`                 | Klíč API s oprávněním `manage` **nebo** dva přihlašovací údaje |
