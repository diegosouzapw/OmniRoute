# Release-Green: keeping the queue and release branch green (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Ìṣòro tí èyí ń yanjú

**Ẹnu-ọ̀nà àyẹ̀wò kíkún** (`.github/workflows/ci.yml` — àwọn unit shards, vitest, ratchets,
`package-artifact`, SonarQube, E2E) máa ń ṣiṣẹ́ **lórí PR ìtújáde nìkan** (PR → `main`). Àwọn PR tí wọ́n ń tọ́ka sí
`release/**` máa ń gba àwọn **ẹnu-ọ̀nà àyẹ̀wò yíyára** (`quality.yml`: àwọn ìdánwò tí TIA ní ipa lórí wọn + typecheck + lint)
àti, fún àwọn ìyípadà kóòdù, build production **ìmọ̀ràn** kan. Àbájáde rẹ̀ ni pé: àwọn àṣìṣe pupa tó jẹ mọ́ ìtújáde nìkan ṣì lè
máa kójọ ní ìdákẹ́jẹ̀ẹ́ lórí ẹ̀ka ìtújáde, kí wọ́n sì **bú jáde ní ìpele tó tó ~40 min** ní àkókò ìtújáde,
ọ̀kọ̀ọ̀kan lẹ́ẹ̀kan.

“Ìdílé release-green” wà láti **fojúsọ́nà** àwọn àṣìṣe pupa wọ̀nyẹn — láti fìdí ohun tó dọ́gba pẹ̀lú ẹnu-ọ̀nà àyẹ̀wò kíkún múlẹ̀
**ní àdúgbò / lẹ́yìn òde ìtújáde**, nígbàkigbà, kí PR ìtújáde lè ti jẹ́
aláwọ̀ ewé látìgbà ìṣiṣẹ́ CI àkọ́kọ́ rẹ̀.

> **Ìlànà tí kò ṣeé yí padà:** kò sí èyíkéyìí nínú èyí tó máa dí olùkópa lọ́wọ́. A kò fi àyẹ̀wò ọ̀ranyàn kan
> kún un tí yóò mú kí PR wọn kùnà. **Ìyapa** náà (ratchets) jẹ́ fún olùtọ́jú láti tún baseline ṣe ní àkókò ìtújáde —
> kì í ṣe ọ̀ràn olùkópa láé. Kò sí apá kankan tó **ń ti** PR kan pa (jíjí ẹ̀tọ́ iṣẹ́) tàbí
> tó **ń sọ ìdánwò di aláìlágbára** kí ó lè kọjá.

## Ìdílé náà (àwọn apá 4) — àti bí ọ̀kọ̀ọ̀kan ṣe ń ṣiṣẹ́ lọ́tọ̀

| Apá                                                                      | Ohun tí ó jẹ́                                                                  | Ìgbà tí a ó ṣiṣẹ́ rẹ̀                                                   | Ìwọ̀n                           |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------ |
| **`/green-prs`** (Ojútùú A)                                              | Àyẹ̀wò tí olùtọ́jú ń bẹ̀rẹ̀ bí ó ṣe nílò lórí **ìlà àwọn PR tí ó ṣí sílẹ̀**        | **Lọ́tọ̀, lẹ́ẹ̀kọ̀ọ̀kan** — àti ní pàtàkì **ṣáájú** `/generate-release` kan | Gbogbo ìlà PR → `release/**`   |
| **`/validate-release-green`** (Ojútùú C — `npm run check:release-green`) | Ẹ́ńjìnnì ìfìdímúlẹ̀: ó tún ẹnu-ọ̀nà àyẹ̀wò kíkún ṣe sí ẹ̀ka KAN TÀBÍ olùdíje merge | Lọ́tọ̀, nígbàkigbà                                                      | Ẹ̀ka pàtó kan tàbí merge-PR kan |
| **`/babysit <PR#>`**                                                     | Ó ń darí **CI tó ń ṣiṣẹ́ lọ́wọ́lọ́wọ́** ti PR **kan** títí yóò fi di aláwọ̀ ewé     | Lọ́tọ̀, fún PR kọ̀ọ̀kan                                                   | PR kan ṣoṣo                    |
| **`nightly-release-green.yml`** (Ojútùú D)                               | Workflow aládàáṣe alẹ́ gbogbo; ó ń ṣí issue nígbà àṣìṣe pupa HARD              | Aládàáṣe (cron)                                                       | Ẹ̀ka ìtújáde tó ń ṣiṣẹ́          |

**Ìdáhùn kúkúrú sí “ṣé fún àwọn ìtújáde nìkan ni èyí?”:** **rárá.** A ṣe àgbékalẹ̀ `/green-prs` láti
ṣiṣẹ́ **lẹ́ẹ̀kọ̀ọ̀kan, láàárín àwọn ìtújáde**. Ṣíṣe é lọ́tọ̀ ni ìlò déédéé — ìtújáde kàn jẹ́
àsìkò tí ṣíṣe é máa ń mú iye tó pọ̀ jù lọ wá.

## Ìkọ́lé ìmọ̀ràn láti PR sí ìtújáde

`quality.yml` ti ní `Build (advisory)` báyìí fún àwọn PR kóòdù tí kì í ṣe àkọ̀wé àti àwọn ẹ̀ka ìlà Mergify.
Ó ń ṣe bí ìlànà ìkọ́lé ìmújáde láti `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime`, àti `npm run build` pẹ̀lú `OMNIROUTE_USE_TURBOPACK=1`. Ó mọ̀ọ́mọ̀
kò ṣe àgbésókè àbájáde ìkọ́lé nítorí kò sí iṣẹ́ àyẹ̀wò tó tẹ̀ lé e tó ń lo ọ́ nínú ìṣàn-iṣẹ́ yìí.
Yọ `continue-on-error` kúrò lẹ́yìn ọ̀sẹ̀ kan tí àwọn ìṣiṣẹ́ PR ìtújáde bá dúró ṣinṣin, kí àmì náà lè di
ẹnu-ọ̀nà láti PR sí ìtújáde tó ń dí ìtẹ̀síwájú dúró.

## Ojútùú C — `npm run check:release-green` (ẹ́ńjìnnì náà)

Ó tún ń ṣe ìfọwọ́sí tó dọ́gba pẹ̀lú ti ìtújáde lórí igi iṣẹ́ lọ́wọ́lọ́wọ́, ó sì ń pín ọ̀kọ̀ọ̀kan àbájáde pupa sí ẹ̀ka:

- **HARD** (àyẹ̀wò irú, àwọn àṣìṣe lint, unit, vitest, db-rules, public-creds, `package-artifact`
  àṣàyàn) → **àbùkù gidi**; `exit 1`. A ń ṣàtúnṣe rẹ̀ lórí ẹ̀ka orísun (TDD, Òfin #18).
- **DRIFT** (àwọn **ìkìlọ̀** eslint, cognitive-complexity, file-size) → ìyapa ratchet tó ti kójọ nínú
  àyíká náà, **kì í ṣe ẹ̀bi olùkópa**; a kàn ń ṣe ìròyìn rẹ̀, **olùtọ́jú sì máa ń ṣètò ìpìlẹ̀ rẹ̀ tuntun nígbà
  ìtújáde**. Drift **kì í yí kóòdù àjáde padà láé** — nítorí náà, kò lè dí ẹnikẹ́ni lọ́wọ́ láé.

```bash
npm run check:release-green                 # ẹ̀ka lọ́wọ́lọ́wọ́ (igi iṣẹ́)
node scripts/quality/validate-release-green.mjs --json   # àbájáde tó ní ìṣètò
node scripts/quality/validate-release-green.mjs --quick  # ó fo unit+vitest (drift+typecheck+lint nìkan)
node scripts/quality/validate-release-green.mjs --with-build  # ó ní package-artifact nínú (ó lọ́ra)
```

Ó ń ṣe àwárí ìṣòro, ó sì ń **ṣe ìròyìn** nìkan (kò sí àtúnṣe aládàáṣe). Ìṣètò àtúnṣe sí àwọ̀ ewé wà nínú
`/green-prs` àti `/review-prs`.

## Ojútùú A — `/green-prs` (àyẹ̀wò ìlà náà)

Ìlànà (àkótán — wo iṣẹ́-ìmọ̀ `green-prs` fún kúlẹ̀kúlẹ̀):

1. Ṣe **àkọsílẹ̀** ìlà àwọn PR tó ṣí sí ẹ̀ka ìtújáde tó ń ṣiṣẹ́.
2. Ṣe **ìṣàyẹ̀wò àkọ́kọ́** PR kọ̀ọ̀kan (ó ṣeé lò / ó yẹ fún ìkọ̀sílẹ̀ / ó nílò olùkọ̀wé) — àwọn tó yẹ fún ìkọ̀sílẹ̀/tó nílò olùkọ̀wé ni a
   **ń ṣe ìròyìn wọn, a kò ní tì wọ́n** (olùkọ̀wé ni yóò pinnu).
3. Fún PR kọ̀ọ̀kan tó ṣeé lò, nínú **worktree tó yà sọ́tọ̀** (Òfin #19), mú PR náà dé orí ìtújáde, kí o sì ṣiṣẹ́
   `npm run check:release-green`:
   - **HARD** → ṣe àtúnṣe **lórí ẹ̀ka olùkópa** nípasẹ̀ àjọ-onkọ̀wé (èyí ń pa ipò "Merged" olùkọ̀wé mọ́),
     tún un ṣiṣẹ́ títí gbogbo HARD yóò fi parẹ́.
   - **DRIFT** → fi sílẹ̀; a ó ṣètò ìpìlẹ̀ rẹ̀ tuntun nígbà ìtújáde.
4. **Ṣe ìròyìn** tábìlì PR × (ìdájọ́, àwọn pupa HARD, a ti ṣàtúnṣe?, DRIFT, ó jẹ́ release-green báyìí?).

Ó lè **múra** ìlà náà láì ṣe ìdapọ̀; ó máa ń ṣe ìdapọ̀ nígbà tí a bá béèrè rẹ̀ ní kedere nìkan — kò sì ní ti PR kan láé.

## Àkókò ìṣiṣẹ́ tí a dámọ̀ràn

- Ṣiṣẹ́ **`/green-prs` lẹ́ẹ̀kọ̀ọ̀kan** (fún àpẹẹrẹ, lọ́sọ̀ọ̀sẹ̀) àti **ní gbogbo ìgbà ṣáájú
  `/generate-release`**.
- Jẹ́ kí **`nightly-release-green.yml`** (Ojútùú D) dúró gẹ́gẹ́ bí àmì tí kò dáwọ́ dúró: nígbà tó bá ṣí ìṣòro
  pupa HARD kan, àsìkò ti tó láti ṣe àyẹ̀wò.
- Lo **`/validate-release-green`** bí ó ṣe yẹ láti yẹ ẹ̀ka kan tàbí olùdíje ìdapọ̀ pàtó kan wò.
- Lo **`/babysit <PR#>`** nígbà tí PR pàtó kan nílò kí a darí rẹ̀ sí àwọ̀ ewé lórí CI tó ń ṣiṣẹ́ lọ́wọ́.

## Ìbáṣepọ̀ rẹ̀ pẹ̀lú ìtújáde

- `/generate-release` ń pe ìfọwọ́sí ní **Ìpele 0 (àyẹ̀wò ṣáájú ìbẹ̀rẹ̀)**: ó ń ṣètò ìpìlẹ̀ DRIFT tuntun, ó sì ń ṣàtúnṣe
  HARD ṣáájú ṣíṣí PR ìtújáde.
- `/review-prs` ń lo ẹnu-ọ̀nà release-green ní ìgbésẹ̀ ìpinnu ìdapọ̀ (àwọ̀-ewé-ṣáájú-ìdapọ̀).

Ète gbogbo àwọn apá náà jẹ́ ọ̀kan náà: **PR ìtújáde aláwọ̀ ewé ní ìṣiṣẹ́ CI àkọ́kọ́**, dípò fífi
àwọn àbájáde pupa onípele ìṣẹ́jú 40 kọ̀ọ̀kan ṣe lọ́jọ́ ìtújáde.
