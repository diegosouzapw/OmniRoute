# Management Authentication (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute నిర్వహణ రూట్లకు అధికారం ఇవ్వగల **నాలుగు క్రెడెన్షియల్ కుటుంబాలను** కలిగి ఉంది.
వాటిని పరస్పరం మార్చి ఉపయోగించలేరు. ఇన్ఫరెన్స్ API కీలు (`sk-…`) స్పష్టంగా
`manage` లేదా `admin` స్కోప్ను మంజూరు చేసి ఉంటే తప్ప సర్వర్ను నిర్వహించలేవు.

ప్రామాణిక అమలు: `src/lib/api/requireManagementAuth.ts`.

| క్రెడెన్షియల్            | సాధారణ రూపం                            | సృష్టించే స్థలం                                       | ఉద్దేశించిన వినియోగం         | నిర్వహణ సామర్థ్యం                                                                      |
| ------------------------ | -------------------------------------- | ----------------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------- |
| డ్యాష్బోర్డ్ JWT సెషన్   | `auth_token` కుకీ                      | డ్యాష్బోర్డ్ లాగిన్                                   | బ్రౌజర్ UI                   | CSRF, స్థానికత మరియు ఎల్లప్పుడూ-రక్షిత-రూట్ నియమాలకు లోబడి పూర్తి డ్యాష్బోర్డ్ నిర్వహణ |
| CLI మెషిన్-id టోకెన్     | అంతర్గతం / స్థానికం                    | CLI బూట్స్ట్రాప్ (అదే మెషిన్లో `omniroute`)           | స్థానిక CLI                  | స్థానిక నిర్వహణ మాత్రమే                                                                |
| స్కోప్డ్ యాక్సెస్ టోకెన్ | `oma_live_…`                           | **Settings → Access Tokens** లేదా `omniroute connect` | రిమోట్ CLI మరియు నిర్వహణ API | రూట్కు అవసరమైన `read`, `write` లేదా `admin` స్కోప్ను తప్పనిసరిగా సంతృప్తి పరచాలి       |
| ఇన్ఫరెన్స్ API కీ        | `sk-…` (మరియు ఇతర API-కీ ప్రిఫిక్స్లు) | **API Manager / API Keys**                            | `/v1/*` ఇన్ఫరెన్స్           | కీ మెటాడేటాలో `manage` లేదా `admin` ఉంటే తప్ప **ఏదీ లేదు**                             |

`oma_` క్రెడెన్షియల్లు నిర్వహణ/CLI క్రెడెన్షియల్లు. అవి ఇన్ఫరెన్స్ API కీలు **కావు**.

సర్వర్ కోసం లాగిన్/API-కీ ప్రామాణీకరణ నిలిపివేయబడితే, కొన్ని నిర్వహణ రూట్లు
ప్రామాణీకరించని కాల్లను అంగీకరించవచ్చు. స్థానికంగా-మాత్రమే మరియు ఎల్లప్పుడూ-రక్షిత రూట్లు ఇప్పటికీ
వాటి స్వంత నియమాలను వర్తింపజేస్తాయి. కాబట్టి ఈ క్రెడెన్షియల్లలో ఒకదాన్ని సమర్పించడం అన్ని సందర్భాల్లో
తప్పనిసరి కాదు; అలాగే అవసరమైన స్కోప్ మరియు రూట్ స్థానికత లేకుండా దాన్ని కలిగి ఉండటం అన్ని సందర్భాల్లో
సరిపోదు.

సంబంధితది: [రిమోట్ మోడ్](./REMOTE-MODE.md) (రిమోట్ CLI కోసం `oma_live_…` ఎలా సృష్టించబడుతుందో).

---

## స్కోప్ మ్యాట్రిక్స్లు

ఈ రెండు స్కోప్ పదజాలాలు **వేర్వేరు**. వాటిని కలపవద్దు.

### యాక్సెస్ టోకెన్ స్కోప్లు (`oma_live_…`)

| స్కోప్  | సాధారణ ఆపరేషన్లు                                                           |
| ------- | -------------------------------------------------------------------------- |
| `read`  | టోకెన్ చూడటానికి అనుమతించబడిన జాబితా/స్థితి GETలు                          |
| `write` | అడ్మిన్ స్థాయి కంటే దిగువన ఉన్న మార్పులు (సృష్టించడం/నవీకరించడం/తొలగించడం) |
| `admin` | పూర్తి రిమోట్ CLI / కనెక్ట్ టోకెన్ (పాస్వర్డ్ బూట్స్ట్రాప్కు ఇది డిఫాల్ట్) |

`read` ఉన్న టోకెన్ `write` రూట్ను కాల్ చేయలేదు. రన్టైమ్ సందేశ రూపం:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-కీ నిర్వహణ స్కోప్లు

| స్కోప్     | అర్థం                                                                                     |
| ---------- | ----------------------------------------------------------------------------------------- |
| (ఏదీ లేదు) | ఇన్ఫరెన్స్ మాత్రమే. నిర్వహణ రూట్లు 403ను తిరిగి ఇస్తాయి.                                  |
| `manage`   | నిర్వహణ API (`requireManagementAuth` API-కీ బ్రాంచ్కు సమానమైన గేట్)                       |
| `admin`    | `hasManageScope`ను కూడా సంతృప్తి పరుస్తుంది (నిర్వహణ-సామర్థ్యం ఉన్నదిగా పరిగణించబడుతుంది) |

API Keys / API Manager UIలో కీపై `manage`ను ప్రారంభించండి. మీరు ఉద్దేశపూర్వకంగా
ఆ స్కోప్ను మంజూరు చేసి ఉంటే తప్ప ఆటోమేషన్ కోసం చాట్ క్లయింట్ కీని మళ్లీ ఉపయోగించవద్దు.

---

## సృష్టించడం మరియు రద్దు చేయడం ఎలా

### డ్యాష్బోర్డ్ JWT సెషన్

1. `/login`ను తెరిచి, నిర్వహణ పాస్వర్డ్తో సైన్ ఇన్ చేయండి (మొదటి బూట్లో `INITIAL_PASSWORD`).
2. `auth_token` కుకీ HttpOnlyగా ఉంటుంది. బ్రౌజర్ డ్యాష్బోర్డ్ దాన్ని స్వయంచాలకంగా ఉపయోగిస్తుంది.
3. `/api/auth/logout` ద్వారా లాగ్ అవుట్ చేయండి. కాపీ చేయడానికి దీర్ఘకాలిక సీక్రెట్ ఏదీ లేదు.

### CLI మెషిన్-id టోకెన్

1. సర్వర్ ఉన్న **అదే హోస్ట్లో** `omniroute`ను అమలు చేయండి (లూప్బ్యాక్).
2. CLI, `~/.omniroute/` కింద ఒక మెషిన్-id టోకెన్ను బూట్స్ట్రాప్ చేస్తుంది (chmod 600).
3. ఇది మరొక మెషిన్ నుండి పని **చేయదు**. రిమోట్ CLI కోసం యాక్సెస్ టోకెన్ను ఉపయోగించండి.

### స్కోప్డ్ యాక్సెస్ టోకెన్ (`oma_live_…`)

1. డ్యాష్బోర్డ్: **Settings → Access Tokens** → సృష్టించండి (పేరు + స్కోప్). **సీక్రెట్ ఒక్కసారి మాత్రమే చూపబడుతుంది.**
2. లేదా CLI: `omniroute connect <host>` (పాస్వర్డ్ → టోకెన్). [రిమోట్ మోడ్](./REMOTE-MODE.md) చూడండి.
3. హెడర్: `Authorization: Bearer oma_live_…`
4. అదే Access Tokens పేజీ నుండి రద్దు చేయండి (లేదా CLI కాంటెక్స్ట్ను తొలగించండి).
5. సర్వర్ ఒక హ్యాష్ను మాత్రమే నిల్వ చేస్తుంది. ప్లెయిన్టెక్స్ట్ను పాస్వర్డ్లా పరిగణించండి.

### `manage` స్కోప్ ఉన్న API కీ

1. డ్యాష్బోర్డ్: **API Manager / API Keys** → కీని సృష్టించండి లేదా సవరించండి → `manage`ను (లేదా `admin`) ప్రారంభించండి.
2. హెడర్: `Authorization: Bearer sk-…` (కీ యొక్క వాస్తవ ప్రిఫిక్స్).
3. అదే UIలో రద్దు చేయండి లేదా `manage`ను తొలగించండి.
4. CLI కాని ఆటోమేషన్ కోసం కనిష్ఠ అధికారాన్ని పాటించండి: GET-మాత్రమే జాబ్లకు `read` యాక్సెస్ టోకెన్కు ప్రాధాన్యత ఇవ్వండి; కాలర్ `/v1` మరియు నిర్వహణ రెండింటితోనూ కమ్యూనికేట్ చేయాల్సి వచ్చినప్పుడు మాత్రమే API కీపై `manage`ను ఉపయోగించండి.

---

## హెడర్ ఫార్మాట్

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

మేనేజ్మెంట్ క్రెడెన్షియల్స్ను URL పాత్లో లేదా క్వెరీ స్ట్రింగ్లో ఉంచవద్దు. మేనేజ్మెంట్
ఆథెంటికేషన్ హెడర్/కుకీ ద్వారా మాత్రమే చేయాలి.

---

## కాపీ-పేస్ట్ ఉదాహరణలు

రీడ్-ఓన్లీ (ప్రొవైడర్ల జాబితాను పొందడం). `read` యాక్సెస్ టోకెన్ను ఉపయోగించండి:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

మార్పులు చేయడం (ప్రొవైడర్ కనెక్షన్ను సృష్టించడం). `write`/`admin` యాక్సెస్ టోకెన్ లేదా
`manage` స్కోప్ ఉన్న API కీని ఉపయోగించండి:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

ఇన్ఫరెన్స్ (మేనేజ్మెంట్ కాదు). సాధారణ API కీ; `manage` అవసరం లేదు:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## ప్రస్తుత రన్టైమ్ ఎర్రర్లు (సీక్రెట్లను తిరిగి ప్రదర్శించవద్దు)

| పరిస్థితి                                     | సాధారణ స్టేటస్ | సందేశం (సున్నిత సమాచారం తొలగించబడింది)                               |
| --------------------------------------------- | -------------- | -------------------------------------------------------------------- |
| క్రెడెన్షియల్ లేదు                            | 401            | `Authentication required`                                            |
| చెల్లని/గడువు ముగిసిన `oma_live_…`            | 401            | `Invalid or expired access token`                                    |
| `manage`/`admin` లేని చెల్లుబాటు అయ్యే API కీ | 403            | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| మేనేజ్మెంట్ రూట్లో చెల్లని సాధారణ API కీ      | 403            | `Invalid management token`                                           |
| యాక్సెస్ టోకెన్ స్కోప్ సరిపోదు                | 403            | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" అంటే బేరర్ను మేనేజ్మెంట్ క్రెడెన్షియల్గా
**ఆమోదించలేదు** అని అర్థం. ఏ రకమైన క్రెడెన్షియల్ను సృష్టించాలో ఇది **తెలియజేయదు**. పై పట్టికను ఉపయోగించండి:
ఇన్ఫరెన్స్ కీలకు `manage` స్కోప్ అవసరం; రిమోట్ CLIకి `oma_live_…` అవసరం; డాష్బోర్డ్
సెషన్ కుకీని ఉపయోగిస్తుంది.

---

## సిఫార్సు చేయబడిన కనిష్ఠ-అధికార ఎంపిక

| కాలర్                                               | ఉపయోగించవలసినది                                     |
| --------------------------------------------------- | --------------------------------------------------- |
| బ్రౌజర్                                             | డాష్బోర్డ్ సెషన్                                    |
| సర్వర్ హోస్ట్లోని CLI                               | మెషీన్ టోకెన్                                       |
| రిమోట్ సర్వర్తో కమ్యూనికేట్ చేసే ల్యాప్టాప్లోని CLI | `omniroute connect` నుండి `oma_live_…`              |
| CI / స్క్రిప్ట్లు (మేనేజ్మెంట్ కోసం మాత్రమే)        | పనిచేయడానికి అవసరమైన అత్యల్ప స్కోప్తో `oma_live_…`  |
| `/v1` మరియు `/api` రెండింటినీ కాల్ చేయాల్సిన CI     | `manage` ఉన్న API కీ **లేదా** రెండు క్రెడెన్షియల్స్ |
