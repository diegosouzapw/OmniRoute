# Release-Green: keeping the queue and release branch green (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Matsalar da wannan ke warwarewa

**Cikakken matakin tantancewa** (`.github/workflows/ci.yml` — rabe-raben gwajin unit, vitest, ratchets,
`package-artifact`, SonarQube, E2E) yana gudana ne **kawai a kan PR na release** (PR → `main`). PRs da aka nufa zuwa
`release/**` suna karɓar **fast-gates** (`quality.yml`: gwaje-gwajen da TIA ya shafa + typecheck + lint)
kuma, idan akwai sauye-sauyen lamba, ana yin ginin production na **shawara**. Sakamakon haka: kurakuran da suke bayyana a release kaɗai na iya ci gaba
da taruwa a ɓoye a reshen release sannan su **fashe a matakai na kusan mintuna 40** a lokacin release,
ɗaya bayan ɗaya.

An samar da "release-green family" ne don **hango** waɗannan kurakurai tun da wuri — a tabbatar da kwatankwacin cikakken
matakin tantancewa **a gida / a wajen release**, a kowane lokaci, domin PR na release ya riga ya
zama kore tun a farkon gudanarwar CI ɗinsa.

> **Ƙa'idar da ba za a sassauta ba:** babu ɗaya daga cikin waɗannan da zai hana mai ba da gudummawa ci gaba. Ba ma ƙara wani
> gwajin da ake buƙata wanda zai sa PR ɗinsu ya gaza. **Drift** (`ratchets`) alhakin mai kula ne ya sake saita ma'auninsa a lokacin release —
> ba damuwar mai ba da gudummawa ba ce har abada. Babu wani ɓangare da zai **rufe** PR (satar yabo), ko kuma
> ya **sassauta** gwaji domin ya wuce.

## Iyalan (ɓangarori 4) — da yadda kowannensu ke gudana da kansa

| Ɓangare                                                                  | Mene ne                                                                                         | Lokacin gudanarwa                                                         | Faɗin aiki                     |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------ |
| **`/green-prs`** (Magani A)                                              | Binciken **jerin PRs da suke buɗe** da mai kula ke farawa lokacin da ake buƙata                 | **Da kansa, lokaci-lokaci** — musamman kuma **kafin** `/generate-release` | Dukkan jerin PR → `release/**` |
| **`/validate-release-green`** (Magani C — `npm run check:release-green`) | Injin tantancewa: yana kwaikwayon cikakken matakin tantancewa a kan reshe KO ɗan takarar haɗewa | Da kansa, a kowane lokaci                                                 | Takamaiman reshe ko merge-PR   |
| **`/babysit <PR#>`**                                                     | Yana jagorantar **CI kai-tsaye** na PR **ɗaya** har sai ya zama kore                            | Da kansa, ga kowane PR                                                    | PR guda ɗaya                   |
| **`nightly-release-green.yml`** (Magani D)                               | Tsarin aiki na dare mai sarrafa kansa; yana buɗe issue idan an sami HARD red                    | Ta atomatik (cron)                                                        | Reshen release mai aiki        |

**Taƙaitacciyar amsa ga "wannan na release ne kawai?":** **a'a.** An tsara `/green-prs` ne don
gudana **lokaci-lokaci, tsakanin releases**. Gudanar da shi da kansa shi ne yadda aka saba amfani da shi — release kawai
shi ne lokacin da gudanar da shi ke samar da ƙima mafi yawa.

## Gina na shawarwari daga PR zuwa fitarwa

`quality.yml` yanzu ya haɗa da `Build (advisory)` don PR na lamba waɗanda ba daftari ba ne da kuma rassan jerin gwano na Mergify.
Yana kwaikwayon tsarin gina na samarwa daga `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime`, da `npm run build` tare da `OMNIROUTE_USE_TURBOPACK=1`. Da gangan ba ya
ɗora kayan gina saboda babu wani aikin inganci na gaba da ke amfani da shi a wannan tsarin aiki.
Cire `continue-on-error` bayan mako guda na gudanarwar release-PR masu daidaito domin siginar ta zama
ƙofar PR-zuwa-fitarwa mai hana ci gaba idan an samu matsala.

## Mafita C — `npm run check:release-green` (injin)

Yana sake aiwatar da ingantawa mai daidai da fitarwa a kan working tree na yanzu, sannan ya rarraba kowace matsala:

- **HARD** (typecheck, kurakuran lint, unit, vitest, db-rules, public-creds, da
  `package-artifact` na zaɓi) → **ainihin lahani**; `exit 1`. Ana gyara shi a reshen tushe (TDD, Doka #18).
- **DRIFT** (**gargaɗin** eslint, cognitive-complexity, file-size) → karkacewar ratchet da ta taru a
  zagayen, **ba laifin mai ba da gudummawa ba ne**; ana bayar da rahotonsa kawai kuma **mai kula ne ke sake saita
  ma’auninsa lokacin fitarwa**. Drift **ba ya taɓa** sauya exit code — saboda haka ba ya taɓa hana kowa ci gaba.

```bash
npm run check:release-green                 # reshen yanzu (working tree)
node scripts/quality/validate-release-green.mjs --json   # fitarwa mai tsari
node scripts/quality/validate-release-green.mjs --quick  # yana tsallake unit+vitest (drift+typecheck+lint kawai)
node scripts/quality/validate-release-green.mjs --with-build  # ya haɗa da package-artifact (a hankali)
```

Yana gano matsaloli kuma yana bayar da **rahoto** kawai (babu gyaran atomatik). Tsarin haɗa ayyukan gyara-har-ya-zama-green yana cikin
`/green-prs` da `/review-prs`.

## Mafita A — `/green-prs` (binciken jerin gwano)

Tsari (taƙaitawa — duba ƙwarewar `green-prs` don cikakkun bayanai):

1. **Lissafa** jerin gwano na PR da suke buɗe idan aka kwatanta da reshen fitarwa mai aiki.
2. **Rarraba** kowane PR (mai yiwuwa / ya cancanci a ƙi / yana buƙatar marubuci) — waɗanda za a ƙi/ke buƙatar marubuci ana
   **bayar da rahotonsu ne, ba a rufe su ba** (marubucin ne zai yanke shawara).
3. Ga kowane PR mai yiwuwa, a cikin **keɓantaccen worktree** (Doka #19), kawo PR ɗin zuwa ƙarshen reshen fitarwa sannan a gudanar da
   `npm run check:release-green`:
   - **HARD** → gyara **a reshen mai ba da gudummawa** ta hanyar haɗin marubuta (yana kiyaye matsayin “Merged” na marubucin),
     sake gudanarwa har sai an kawar da dukkan HARD.
   - **DRIFT** → bar shi; za a sake saita ma’auninsa lokacin fitarwa.
4. **Bayar da rahoton** teburin PR × (hukunci, matsalolin HARD, an gyara?, DRIFT, release-green yanzu?).

Zai iya **shirya** jerin gwano ba tare da haɗawa ba; yana haɗawa ne kawai idan an nema kai tsaye — kuma ba ya taɓa rufe PR.

## Tsarin lokaci da aka ba da shawara

- Gudanar da **`/green-prs` lokaci-lokaci** (misali, kowane mako) kuma **koyaushe kafin
  `/generate-release`**.
- Ci gaba da amfani da **`nightly-release-green.yml`** (Mafita D) a matsayin sigina mai gudana: idan ya buɗe
  issue na matsalar HARD, lokaci ya yi na yin bincike.
- Yi amfani da **`/validate-release-green`** lokacin da ake buƙata don duba reshe ko takamaiman ɗan takarar haɗawa.
- Yi amfani da **`/babysit <PR#>`** idan takamaiman PR yana buƙatar a bi shi har ya zama green a kan CI mai gudana.

## Alaƙa da fitarwa

- `/generate-release` yana kiran ingantawa a **Mataki na 0 (binciken farko)**: yana sake saita ma’aunin DRIFT kuma yana gyara
  HARD kafin buɗe release PR.
- `/review-prs` yana amfani da ƙofar release-green a matakin yanke shawarar haɗawa (green-kafin-haɗawa).

Manufar dukkan sassan iri ɗaya ce: **release PR mai green a gudanarwar CI ta farko**, maimakon bin diddigin
matsaloli a matakai na mintuna 40 a ranar fitarwa.
