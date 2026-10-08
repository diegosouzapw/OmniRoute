# Management Authentication (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

ઓમ્નીરૂટ પાસે **ચાર ક્રેડેન્શિયલ ફેમિલીઝ** છે જે મેનેજમેન્ટ રૂટ્સને અધિકૃત કરી શકે છે.
તેઓ એકબીજા સાથે બદલી શકાતા નથી. ઇન્ફરન્સ API કીઝ (`sk-…`) સર્વરને મેનેજ કરતી **નથી**
જ્યાં સુધી તેમને સ્પષ્ટપણે `manage` અથવા `admin` સ્કોપ આપવામાં ન આવે.

કેનોનિકલ અમલીકરણ: `src/lib/api/requireManagementAuth.ts`.

| ક્રેડેન્શિયલ        | સામાન્ય સ્વરૂપ                     | ક્યાં બનાવવામાં આવે છે                                | હેતુપૂર્વકનો ઉપયોગ           | મેનેજમેન્ટ ક્ષમતા                                                                |
| ------------------- | ---------------------------------- | ----------------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------- |
| ડેશબોર્ડ JWT સેશન   | `auth_token` કૂકી                  | ડેશબોર્ડ લોગિન                                        | બ્રાઉઝર UI                   | સંપૂર્ણ ડેશબોર્ડ મેનેજમેન્ટ, CSRF, લોકેલિટી અને હંમેશા-સુરક્ષિત-રૂટ નિયમોને આધીન |
| CLI મશીન-આઈડી ટોકન  | આંતરિક / સ્થાનિક                   | CLI બુટસ્ટ્રેપ (એ જ મશીન પર `omniroute`)              | સ્થાનિક CLI                  | ફક્ત સ્થાનિક મેનેજમેન્ટ                                                          |
| સ્કોપ્ડ એક્સેસ ટોકન | `oma_live_…`                       | **સેટિંગ્સ → એક્સેસ ટોકન્સ** અથવા `omniroute connect` | રીમોટ CLI અને મેનેજમેન્ટ API | રૂટના જરૂરી `read`, `write`, અથવા `admin` સ્કોપને સંતોષવા આવશ્યક છે              |
| ઇન્ફરન્સ API કી     | `sk-…` (અને અન્ય API-કી પ્રીફિક્સ) | **API મેનેજર / API કીઝ**                              | `/v1/*` ઇન્ફરન્સ             | **કોઈ નહીં** સિવાય કે કી મેટાડેટામાં `manage` અથવા `admin` શામેલ હોય             |

`oma_` ક્રેડેન્શિયલ્સ મેનેજમેન્ટ/CLI ક્રેડેન્શિયલ્સ છે. તેઓ ઇન્ફરન્સ API કીઝ **નથી**.

જો સર્વર માટે લોગિન/API-કી ઓથ અક્ષમ હોય, તો કેટલાક મેનેજમેન્ટ રૂટ્સ
અનઓથેન્ટિકેટેડ કોલ્સ સ્વીકારી શકે છે. ફક્ત સ્થાનિક અને હંમેશા-સુરક્ષિત રૂટ્સ હજુ પણ
તેમના પોતાના નિયમો લાગુ કરે છે. તેથી, આમાંના એક ક્રેડેન્શિયલ રજૂ કરવું સાર્વત્રિક રીતે
ફરજિયાત નથી, અને જરૂરી સ્કોપ અને રૂટ લોકેલિટી વિના એક ક્રેડેન્શિયલ હોવું સાર્વત્રિક રીતે પૂરતું નથી.

સંબંધિત: [રીમોટ મોડ](./REMOTE-MODE.md) (કેવી રીતે `oma_live_…` રીમોટ CLI માટે બનાવવામાં આવે છે).

---

## સ્કોપ મેટ્રિક્સ

API-કી મેનેજમેન્ટ સ્કોપ્સ અને એક્સેસ-ટોકન સ્કોપ્સ અલગ શબ્દભંડોળ છે.
MCP ટૂલ સ્કોપ્સ ત્રીજું શબ્દભંડોળ છે, જે નીચેના કોષ્ટકોમાંના કોઈપણ ફંક્શનને બદલે `scopeMatches` વડે તપાસવામાં આવે છે. બાજુમાં:
[ત્રણ સ્કોપ નેમસ્પેસ](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### એક્સેસ ટોકન સ્કોપ્સ (`oma_live_…`)

| Scope   | લાક્ષણિક કામગીરી                                                    |
| ------- | ------------------------------------------------------------------- |
| `read`  | સૂચિ/સ્થિતિ GETs જે ટોકન જોઈ શકે છે                                 |
| `write` | એડમિન નીચેના મ્યુટેશન્સ (બનાવો/અપડેટ કરો/કાઢી નાખો)                 |
| `admin` | સંપૂર્ણ રિમોટ CLI / કનેક્ટ ટોકન (પાસવર્ડ બુટસ્ટ્રેપ ડિફોલ્ટ્સ અહીં) |

`read` સાથેનો ટોકન `write` રૂટને કૉલ કરી શકતો નથી. રનટાઇમ મેસેજ આકાર:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-કી મેનેજમેન્ટ સ્કોપ્સ

| Scope    | અર્થ                                                                     |
| -------- | ------------------------------------------------------------------------ |
| (none)   | માત્ર અનુમાન. મેનેજમેન્ટ રૂટ્સ 403 પરત કરે છે.                           |
| `manage` | મેનેજમેન્ટ API (`requireManagementAuth` API-કી શાખા જેવું જ ગેટ)         |
| `admin`  | `hasManageScope` ને પણ સંતોષે છે (મેનેજમેન્ટ-સક્ષમ તરીકે ગણવામાં આવે છે) |

API Keys / API Manager UI માં કી પર `manage` સક્ષમ કરો. ઓટોમેશન માટે ચેટ ક્લાયંટ કીનો ફરીથી ઉપયોગ કરશો નહીં સિવાય કે તમે ઇરાદાપૂર્વક તે સ્કોપ આપ્યો હોય.

---

## કેવી રીતે બનાવવું અને રદ કરવું

### ડેશબોર્ડ JWT સેશન

1. `/login` ખોલો અને મેનેજમેન્ટ પાસવર્ડ વડે સાઇન ઇન કરો (પ્રથમ બૂટ વખતે `INITIAL_PASSWORD`).
2. `auth_token` કૂકી HttpOnly છે. બ્રાઉઝર ડેશબોર્ડ તેનો આપમેળે ઉપયોગ કરે છે.
3. `/api/auth/logout` મારફતે લૉગ આઉટ કરો. કૉપિ કરવા માટે કોઈ લાંબા-ગાળાનું સિક્રેટ નથી.

### CLI machine-id ટોકન

1. સર્વર હોય તે **એ જ હોસ્ટ** પર `omniroute` ચલાવો (લૂપબૅક).
2. CLI `~/.omniroute/` હેઠળ machine-id ટોકન બુટસ્ટ્રેપ કરે છે (chmod 600).
3. આ બીજા મશીન પરથી કામ કરતું **નથી**. રિમોટ CLI માટે ઍક્સેસ ટોકન વાપરો.

### સ્કોપ કરેલ ઍક્સેસ ટોકન (`oma_live_…`)

1. ડેશબોર્ડ: **સેટિંગ્સ → ઍક્સેસ ટોકન્સ** → બનાવો (નામ + સ્કોપ). **સિક્રેટ માત્ર એક જ વાર બતાવવામાં આવે છે.**
2. અથવા CLI: `omniroute connect <host>` (પાસવર્ડ → ટોકન). [રિમોટ મોડ](./REMOTE-MODE.md) જુઓ.
3. હેડર: `Authorization: Bearer oma_live_…`
4. એ જ ઍક્સેસ ટોકન્સ પેજ પરથી રદ કરો (અથવા CLI કોન્ટેક્સ્ટ કાઢી નાખો).
5. સર્વર ફક્ત હૅશ સંગ્રહે છે. પ્લેઇનટેક્સ્ટને પાસવર્ડની જેમ સુરક્ષિત રાખો.

### Manage-સ્કોપ કરેલ API કી

1. ડેશબોર્ડ: **API મેનેજર / API કીઝ** → કી બનાવો અથવા સંપાદિત કરો → `manage` (અથવા `admin`) સક્ષમ કરો.
2. હેડર: `Authorization: Bearer sk-…` (કીનો વાસ્તવિક પ્રીફિક્સ).
3. એ જ UIમાં કી રદ કરો અથવા `manage` દૂર કરો.
4. CLI ન હોય તેવા ઑટોમેશન માટે ન્યૂનતમ વિશેષાધિકાર: ફક્ત-GET જૉબ્સ માટે `read` ઍક્સેસ ટોકનને પ્રાધાન્ય આપો; API કી પર `manage`નો ઉપયોગ માત્ર ત્યારે જ કરો જ્યારે કૉલરે `/v1` અને મેનેજમેન્ટ બંને સાથે સંચાર કરવો જરૂરી હોય.

---

## હેડર ફોર્મેટ

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

મેનેજમેન્ટ ક્રેડેન્શિયલ્સને URL પાથ અથવા ક્વેરી સ્ટ્રિંગમાં મૂકશો નહીં. મેનેજમેન્ટ
ઑથેન્ટિકેશન માત્ર હેડર/કૂકી દ્વારા જ થાય છે.

---

## કૉપી-પેસ્ટ ઉદાહરણો

ફક્ત વાંચવા માટે (પ્રોવાઇડર્સની યાદી મેળવવી). `read` Access Token વાપરો:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

ફેરફાર કરવા માટે (પ્રોવાઇડર કનેક્શન બનાવવું). `write`/`admin` Access Token અથવા
manage-સ્કોપ ધરાવતી API key વાપરો:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

ઇન્ફરન્સ (મેનેજમેન્ટ નહીં). સામાન્ય API key, `manage` જરૂરી નથી:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## વર્તમાન રનટાઇમ ભૂલો (ગુપ્ત માહિતી ઇકો કરશો નહીં)

| પરિસ્થિતિ                               | લાક્ષણિક સ્થિતિ | સંદેશ (સેનિટાઇઝ્ડ)                                                   |
| --------------------------------------- | --------------- | -------------------------------------------------------------------- |
| કોઈ ઓળખપત્ર નથી                         | 401             | `Authentication required`                                            |
| અમાન્ય/સમાપ્ત થયેલ `oma_live_…`         | 401             | `Invalid or expired access token`                                    |
| `manage`/`admin` વિના માન્ય API કી      | 403             | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| મેનેજમેન્ટ રૂટ પર અમાન્ય સામાન્ય API કી | 403             | `Invalid management token`                                           |
| એક્સેસ ટોકન સ્કોપ ખૂબ ઓછો છે            | 403             | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"અમાન્ય મેનેજમેન્ટ ટોકન" નો અર્થ છે કે બેરરને મેનેજમેન્ટ ઓળખપત્ર તરીકે **સ્વીકારવામાં આવ્યો ન હતો**. તે તમને કયા પરિવારને મિન્ટ કરવો તે જણાવતું નથી. ઉપરના કોષ્ટકનો ઉપયોગ કરો: અનુમાન કીને `manage` સ્કોપની જરૂર છે; રિમોટ CLI ને `oma_live_…` ની જરૂર છે; ડેશબોર્ડ સેશન કૂકીનો ઉપયોગ કરે છે.

---

## ભલામણ કરેલ ઓછા-વિશેષાધિકારની પસંદગી

| કોલર                                               | ઉપયોગ                                           |
| :------------------------------------------------- | :---------------------------------------------- |
| બ્રાઉઝર                                            | ડેશબોર્ડ સત્ર                                   |
| સર્વર હોસ્ટ પર CLI                                 | મશીન ટોકન                                       |
| રિમોટ સર્વર સાથે વાત કરતું લેપટોપ પર CLI           | `omniroute connect` માંથી `oma_live_…`          |
| CI / સ્ક્રિપ્ટ્સ (માત્ર મેનેજમેન્ટ)                | કાર્ય કરતા નાનામાં નાના સ્કોપ સાથે `oma_live_…` |
| CI કે જેણે `/v1` અને `/api` બંનેને કૉલ કરવા જ જોઈએ | `manage` સાથે API કી **અથવા** બે ઓળખપત્રો       |
