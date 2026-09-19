# Merge Queue & Manual Merge-Train Runbook (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Tun daga v3.8.49 (WS3.2/WS3.4 na shirin inganci/gudu), tsohuwar hanyar haɗa
PRs da aka bita zuwa `release/vX.Y.Z` ita ce **layin jiran haɗawa na Mergify** (`.mergify.yml`);
**jirgin-haɗawa na hannu** da aka bayyana a ƙasa MADADIN GAGGAWA ne — ana amfani da shi yayin aukuwar matsaloli,
daskarar da fitarwa, ko kuma idan shirin Mergify Open Source ya taɓa canzawa.

## Tsohuwar hanya: layin jiran Mergify

1. Kamfen-kamfen sun bita/sanya PR kore, sannan ƙofar ⭐ kafin haɗawa ta mai shi
   ta amince da shi (rahoton + shawarar kowane abu — duba `/merge-prs` Mataki na 0.75).
2. Mai shi (ko zaman da ke aiki bisa shawarar mai shi) yana sanya alamar **`queue`**.
   Alamar ITA CE amincewar haɗawa; Mergify aiwatarwa kawai yake yi.
3. Mergify yana haɗa har zuwa PRs 10 da ke jira cikin rukuni, yana tantance rukunin bisa fast-gates,
   sannan ya haɗa su (squash). Ana **raba rukuni ja kai tsaye gida biyu** — ana ware PR
   mai haddasa matsalar cikin kusan sake-tantancewa log2(N), a cire shi daga layin jira; sauran su ci gaba.
4. Bayan haɗawa, tsarin aiki na ci gaba na release-green yana tantance sabon tip lokacin push
   kuma yana buɗe issue na danganta alhaki idan haɗin ya samu koma baya (ba ya taɓa yin auto-revert).

Matakan kariya (sun yi daidai da `CLAUDE.md` Hard Rules #21/#22):

- **An buɗe daskarar da fitarwa** → KAR a sanya wa PRs da ke nufin frozen branch alama; da farko a sake
  nufar da su zuwa `release/vX+1` mai aiki.
- **PR na wani zaman da har yanzu ake aiki a kansa** → kar a taɓa sanya masa alama; zaman da ya mallake shi kaɗai
  ne ke sanya aikinsa cikin layin jira.
- Diffs na gwaje-gwaje kawai da PRs masu alamar `hotfix` sun riga sun gudanar da rageccen CI (duba
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); sharuɗɗan layin jira suna karɓar duk wani
  saitin bincike da aka gudanar a zahiri (`#check-failure=0` + `#check-pending=0`).

## Madadin gaggawa: jirgin-haɗawa na hannu

Ana amfani da shi lokacin da layin jiran ba ya samuwa. Wannan yana tsara aikin da ya kammala PRs 33
cikin rana ɗaya yayin zagayen v3.8.47:

1. **Tattara rukunin** (kimanin PRs 10–30 da aka bita+amince da su). Bincika karo na `linked:`
   (`tap.testFiles` iri ɗaya, hunks na CHANGELOG iri ɗaya), sannan a jera waɗannan ɗaya bayan ɗaya.
2. **Tantance SAU ƊAYA**: a cikin keɓantaccen worktree daga release tip, haɗa dukkan
   heads na rukunin a cikin gida, sannan gudanar da suite mai daidai da na fitarwa
   (`npm run check:release-green`, ƙara `--with-build` kafin fitarwa).
   `scripts/release/merge-train.sh <base> <PR#>…` yana sarrafa matakai na 1–2 kai tsaye (PRs masu karo
   suna fita, jirgin ya ci gaba). Full mode yana gudanar da `npm run test:unit` — runner da aka
   daidaita wa na'urar (`--test-concurrency=20`), **ba** shards biyu na CI masu cores 4 da ke gudana
   ɗaya bayan ɗaya ba, waɗanda suka sa babban matakin ya yi amfani da kusan 25% na na'ura mai cores 16 (an gyara
   2026-07-18). `--fast` (kammala mega-train a cikin rana, mai shi ya amince 2026-07-18)
   yana riƙe kowace static gate + vitest amma yana gudanar da fayilolin node:test da PRs
   da aka ɗora suka canza kawai; har yanzu dole ne a gudanar da FULL suite aƙalla sau ɗaya a rana a kan
   accumulated tip (jirgi ɗaya ba tare da `--fast` ba).
3. **Kore** → haɗa PRs ɗaya bayan ɗaya (ana sake duba `state,headRefOid` kafin kowane ɗaya —
   PR da head ɗinsa ya motsa yana komawa layin bita). Tabbatar da cewa net diff na kowane merge
   canjin PR ɗin kansa ne (babu auto-resolve reverts: bincika `git diff --stat` don
   gogewar da ba ta cikin iyakar aikin).
4. **Ja** → raba rukunin gida biyu-biyu (a tantance kowace rabi) maimakon sake tantancewa
   ɗaya bayan ɗaya; mayar da PR mai haddasa matsalar zuwa layin bita tare da shaidar.
5. **Kada a taɓa**: yin merge zuwa frozen branch yayin freeze; amfani da `git stash` a ko'ina;
   sake gudanar da CI baki ɗaya da fatan ja zai ɓace (ƙa'ida: ja bayanai ne).

## Matakan gudanarwa (dalilin da ya sa layin jiran ke da aminci da fast-gates kawai)

- **Ga kowane PR** (quality.yml fast-gates): gwaje-gwajen da TIA ya shafa + cikakken unit mai shards 4 +
  vitest + tarin lint + typecheck + ingancin docs/changelog.
- **Ga kowane rukuni/tip** (ci gaba da release-green): ƙofofin HARD na `--quick` a kowane push zuwa
  release branch; cikakken binciken `--with-build --full-ci` sau 3 a rana.
- **Ga kowace fitarwa** (ci.yml a release PR): cikakken matrix har da E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets.

Babu abin da ake tantancewa ƙasa da yadda ake yi a da — ana gudanar da sassa masu nauyi ne kawai ga kowane rukuni/tip
maimakon ga kowane PR, wanda shi ne ke kawar da zagayen O(N).
