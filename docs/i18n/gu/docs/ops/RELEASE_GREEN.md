# Release-Green: keeping the queue and release branch green (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## આ કઈ સમસ્યાનું સમાધાન કરે છે

**સંપૂર્ણ ગેટ** (`.github/workflows/ci.yml` — યુનિટ શાર્ડ્સ, vitest, રેચેટ્સ,
`package-artifact`, SonarQube, E2E) **માત્ર રિલીઝ PR પર** (PR → `main`) ચાલે છે. `release/**`ને લક્ષ્ય કરતા PRને
**ફાસ્ટ-ગેટ્સ** (`quality.yml`: TIAથી પ્રભાવિત ટેસ્ટ્સ + ટાઇપચેક + લિન્ટ)
અને, કોડમાં ફેરફારો માટે, એક **સલાહરૂપ** પ્રોડક્શન બિલ્ડ મળે છે. પરિણામે: માત્ર રિલીઝમાં દેખાતી નિષ્ફળતાઓ રિલીઝ બ્રાન્ચ પર શાંતિથી
એકઠી થતી રહી શકે છે અને રિલીઝના સમયે **~40 મિનિટના સ્તરોમાં વિસ્ફોટ કરી શકે છે**,
એક સમયે એક.

"release-green family"નો હેતુ એ નિષ્ફળતાઓનો **અગાઉથી અંદાજ લગાવવાનો** છે — સંપૂર્ણ ગેટના સમકક્ષ ચકાસણી
કોઈપણ સમયે **સ્થાનિક રીતે / રિલીઝની બહાર** કરવી, જેથી રિલીઝ PR તેની પહેલી CI રનમાં જ
ગ્રીન હોય.

> **બિન-વાટાઘાટપાત્ર સિદ્ધાંત:** આમાંથી કંઈ પણ યોગદાનકર્તાને અવરોધતું નથી. અમે તેમના PRને નિષ્ફળ કરતું આવશ્યક
> ચેક ઉમેરતા નથી. **ડ્રિફ્ટ** (રેચેટ્સ) રિલીઝ વખતે મેન્ટેનરે ફરીથી બેઝલાઇન કરવા માટે છે —
> તે ક્યારેય યોગદાનકર્તાની ચિંતા નથી. કોઈ પણ ભાગ PRને **બંધ કરતો** નથી (શ્રેયની ચોરી) કે પાસ થવા માટે
> ટેસ્ટને **નબળો બનાવતો** નથી.

## આ પરિવાર (4 ભાગો) — અને દરેક કેવી રીતે સ્વતંત્ર રીતે ચાલે છે

| ભાગ                                                                    | તે શું છે                                                                           | ક્યારે ચલાવવું                                                               | વ્યાપ                           |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------- |
| **`/green-prs`** (ઉકેલ A)                                              | મેન્ટેનર દ્વારા **ખુલ્લા PRની કતારનું** માંગ પર સ્કેન                               | **સ્વતંત્ર રીતે, સમયાંતરે** — અને ખાસ કરીને `/generate-release`ની **પહેલાં** | સંપૂર્ણ PR કતાર → `release/**`  |
| **`/validate-release-green`** (ઉકેલ C — `npm run check:release-green`) | ચકાસણી એન્જિન: કોઈ બ્રાન્ચ અથવા મર્જ ઉમેદવાર સામે સંપૂર્ણ ગેટનું પુનરુત્પાદન કરે છે | સ્વતંત્ર રીતે, કોઈપણ સમયે                                                    | કોઈ ચોક્કસ બ્રાન્ચ અથવા મર્જ-PR |
| **`/babysit <PR#>`**                                                   | **એક** PRની **લાઇવ CI**ને ગ્રીન થવા સુધી સંચાલિત કરે છે                             | સ્વતંત્ર રીતે, દરેક PR દીઠ                                                   | એક જ PR                         |
| **`nightly-release-green.yml`** (ઉકેલ D)                               | સ્વચાલિત રાત્રિકાલીન વર્કફ્લો; HARD નિષ્ફળતા પર ઇશ્યૂ ખોલે છે                       | સ્વચાલિત (cron)                                                              | સક્રિય રિલીઝ બ્રાન્ચ            |

**"શું આ માત્ર રિલીઝ માટે જ છે?"નો ટૂંકો જવાબ:** **ના.** `/green-prs`ને
**રિલીઝ વચ્ચે, સમયાંતરે** ચલાવવા માટે ડિઝાઇન કરવામાં આવ્યું હતું. તેને સ્વતંત્ર રીતે ચલાવવું એ સામાન્ય ઉપયોગ છે — રિલીઝ તો માત્ર
એ ક્ષણ છે જ્યારે તેને ચલાવવાથી સૌથી વધુ મૂલ્ય મળે છે.

## PR-થી-રિલીઝ સલાહકારી બિલ્ડ

`quality.yml` હવે નોન-ડ્રાફ્ટ કોડ PRs અને Mergify ક્યૂ બ્રાન્ચો માટે `Build (advisory)`નો સમાવેશ કરે છે.
તે `ci.yml`ની પ્રોડક્શન બિલ્ડ રેસિપીનું અનુસરણ કરે છે: Node 24, `npm-ci-retry`,
`check:node-runtime`, અને `OMNIROUTE_USE_TURBOPACK=1` સાથે `npm run build`. તે ઇરાદાપૂર્વક
બિલ્ડ આર્ટિફેક્ટ અપલોડ કરતું નથી, કારણ કે આ વર્કફ્લોમાં કોઈપણ ડાઉનસ્ટ્રીમ ક્વૉલિટી જૉબ તેનો ઉપયોગ કરતું નથી.
સ્થિર release-PR રન્સના એક અઠવાડિયા પછી `continue-on-error` દૂર કરો, જેથી આ સિગ્નલ
બ્લૉકિંગ PR-થી-રિલીઝ ગેટ બની જાય.

## ઉકેલ C — `npm run check:release-green` (એન્જિન)

વર્તમાન વર્કિંગ ટ્રી સામે રિલીઝ-સમકક્ષ વેલિડેશનનું પુનરુત્પાદન કરે છે અને દરેક નિષ્ફળતાનું વર્ગીકરણ કરે છે:

- **HARD** (typecheck, lint ભૂલો, unit, vitest, db-rules, public-creds, વૈકલ્પિક
  `package-artifact`) → **વાસ્તવિક ખામી**; `exit 1`. સોર્સ બ્રાન્ચ પર સુધારવામાં આવે છે (TDD, નિયમ #18).
- **DRIFT** (eslint **ચેતવણીઓ**, cognitive-complexity, file-size) → સાઇકલ દરમિયાન એકત્ર થયેલું રૅચેટ ડ્રિફ્ટ,
  **યોગદાનકર્તાની ભૂલ નહીં**; તે માત્ર રિપોર્ટ કરવામાં આવે છે અને **રિલીઝ વખતે મેઇન્ટેનર દ્વારા
  ફરીથી બેઝલાઇન કરવામાં આવે છે**. ડ્રિફ્ટ **ક્યારેય** એક્ઝિટ કોડ બદલતું નથી — એટલે તે ક્યારેય કોઈને બ્લૉક કરતું નથી.

```bash
npm run check:release-green                 # વર્તમાન બ્રાન્ચ (વર્કિંગ ટ્રી)
node scripts/quality/validate-release-green.mjs --json   # સંરચિત આઉટપુટ
node scripts/quality/validate-release-green.mjs --quick  # unit+vitest છોડે છે (માત્ર drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # package-artifactનો સમાવેશ કરે છે (ધીમું)
```

માત્ર નિદાન કરે છે અને **રિપોર્ટ કરે છે** (કોઈ ઑટો-ફિક્સ નહીં). ફિક્સ-ટુ-ગ્રીન ઑર્કેસ્ટ્રેશન
`/green-prs` અને `/review-prs`માં છે.

## ઉકેલ A — `/green-prs` (ક્યૂ સ્કૅન)

પ્રક્રિયા (સારાંશ — વિગતો માટે `green-prs` સ્કિલ જુઓ):

1. સક્રિય રિલીઝ બ્રાન્ચ સામે ખુલ્લા PRsની ક્યૂની **ઇન્વેન્ટરી** બનાવો.
2. દરેક PRનું **ટ્રાયેજ** કરો (viable / reject-worthy / needs-author) — reject/needs-authorને
   **રિપોર્ટ કરવામાં આવે છે, બંધ કરવામાં આવતા નથી** (નિર્ણય લેખક લે છે).
3. દરેક યોગ્ય PR માટે, **અલગ worktree**માં (નિયમ #19), PRને રિલીઝ ટિપ સુધી લાવો અને
   `npm run check:release-green` ચલાવો:
   - **HARD** → સહ-લેખકત્વ દ્વારા **યોગદાનકર્તાની બ્રાન્ચ પર** સુધારો (લેખકનું "Merged" સ્ટેટસ જાળવે છે),
     બધા HARD દૂર ન થાય ત્યાં સુધી ફરીથી ચલાવો.
   - **DRIFT** → તેને એમ જ રહેવા દો; રિલીઝ વખતે તેને ફરીથી બેઝલાઇન કરવામાં આવશે.
4. PR × (ચુકાદો, HARD નિષ્ફળતાઓ, સુધાર્યું?, DRIFT, અત્યારે release-green?) કોષ્ટક **રિપોર્ટ** કરો.

મર્જ કર્યા વિના ક્યૂને **તૈયાર** કરી શકે છે; સ્પષ્ટપણે વિનંતી કરવામાં આવે ત્યારે જ મર્જ કરે છે — અને ક્યારેય PR બંધ કરતું નથી.

## ભલામણ કરેલ આવર્તન

- **`/green-prs` સમયાંતરે** ચલાવો (દા.ત., સાપ્તાહિક) અને **`/generate-release` પહેલાં હંમેશાં**
  ચલાવો.
- સતત સિગ્નલ તરીકે **`nightly-release-green.yml`** (ઉકેલ D) રાખો: જ્યારે તે
  HARD નિષ્ફળતાની issue ખોલે, ત્યારે સ્કૅન કરવાનો સમય થયો છે.
- કોઈ બ્રાન્ચ અથવા ચોક્કસ મર્જ ઉમેદવારને તપાસવા માટે જરૂર મુજબ **`/validate-release-green`**નો ઉપયોગ કરો.
- જ્યારે કોઈ ચોક્કસ PRને લાઇવ CI પર ગ્રીન બનાવવાની જરૂર હોય ત્યારે **`/babysit <PR#>`**નો ઉપયોગ કરો.

## રિલીઝ સાથેનો સંબંધ

- `/generate-release` **Phase 0 (pre-flight)**માં વેલિડેશન કૉલ કરે છે: રિલીઝ PR ખોલતા પહેલાં
  DRIFTને ફરીથી બેઝલાઇન કરે છે અને HARDને સુધારે છે.
- `/review-prs` મર્જના નિર્ણયના પગલામાં release-green ગેટનો ઉપયોગ કરે છે (green-before-merge).

બધા ભાગોનો હેતુ એક જ છે: રિલીઝના દિવસે 40-મિનિટના સ્તરોમાં નિષ્ફળતાઓનો સામનો કરવાને બદલે,
**પ્રથમ CI રન પર જ ગ્રીન રિલીઝ PR** મેળવવો.
