# Release-Green: keeping the queue and release branch green (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Ang problemang nilulutas nito

Ang **full gate** (`.github/workflows/ci.yml` — mga unit shard, vitest, ratchet,
`package-artifact`, SonarQube, E2E) ay tumatakbo **lamang sa release PR** (PR → `main`). Ang mga PR na naka-target sa
`release/**` ay tumatanggap ng **fast-gates** (`quality.yml`: mga test na apektado ng TIA + typecheck + lint)
at, para sa mga pagbabago sa code, isang **advisory** na production build. Bunga nito: ang mga red na para lang sa release ay maaari pa ring
tahimik na maipon sa release branch at **sumabog nang patung-patong sa mga yugto na ~40 min** sa oras ng release,
nang paisa-isa.

Umiiral ang "release-green family" upang **maagang matukoy** ang mga red na iyon — i-validate ang katumbas ng full
gate **nang lokal / sa labas ng release**, anumang oras, upang maging green na ang release PR
sa unang CI run nito.

> **Prinsipyong hindi maaaring ikompromiso:** wala rito ang humaharang sa contributor. Hindi tayo nagdaragdag ng required
> check na magpapabagsak sa kanilang PR. Ang **drift** (mga ratchet) ay para sa maintainer na muling magtakda ng baseline sa oras ng release —
> hindi kailanman alalahanin ng contributor. Walang anumang bahagi ang **nagsasara** ng PR (pagnanakaw ng credit) o
> **nagpapahina** ng test para pumasa.

## Ang family (4 na bahagi) — at kung paano tumatakbo nang hiwalay ang bawat isa

| Bahagi                                                                     | Ano ito                                                                                  | Kailan patatakbuhin                                                                | Saklaw                                |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------- |
| **`/green-prs`** (Solution A)                                              | On-demand na pag-scan ng maintainer sa **queue ng mga bukas na PR**                      | **Nang hiwalay, pana-panahon** — at lalo na **bago** ang isang `/generate-release` | Buong PR queue → `release/**`         |
| **`/validate-release-green`** (Solution C — `npm run check:release-green`) | Validation engine: muling ginagawa ang full gate laban sa isang branch O merge candidate | Nang hiwalay, anumang oras                                                         | Isang partikular na branch o merge-PR |
| **`/babysit <PR#>`**                                                       | Ginagabayan ang **live CI** ng **isang** PR hanggang maging green                        | Nang hiwalay, bawat PR                                                             | Isang PR                              |
| **`nightly-release-green.yml`** (Solution D)                               | Awtomatikong nightly workflow; nagbubukas ng issue kapag HARD red                        | Awtomatiko (cron)                                                                  | Ang aktibong release branch           |

**Maikling sagot sa "para lang ba ito sa mga release?":** **hindi.** Idinisenyo ang `/green-prs` upang
tumakbo **pana-panahon, sa pagitan ng mga release**. Ang pagpapatakbo nito nang hiwalay ang karaniwang paraan — ang release ay ang sandali lamang
kung kailan naghahatid ng pinakamalaking pakinabang ang pagpapatakbo nito.

## Advisory build mula PR tungong release

Kasama na ngayon sa `quality.yml` ang `Build (advisory)` para sa mga non-draft na code PR at mga branch ng Mergify queue.
Ginagaya nito ang recipe ng production build mula sa `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime`, at `npm run build` gamit ang `OMNIROUTE_USE_TURBOPACK=1`. Sinadya nitong
hindi mag-upload ng build artifact dahil walang downstream quality job na gumagamit nito sa workflow na ito.
Alisin ang `continue-on-error` pagkatapos ng isang linggo ng matatag na mga release-PR run upang maging
blocking gate mula PR tungong release ang signal.

## Solusyon C — `npm run check:release-green` (ang engine)

Ginagaya ang validation na katumbas ng release laban sa kasalukuyang working tree at inuuri ang bawat red:

- **HARD** (typecheck, mga lint error, unit, vitest, db-rules, public-creds, opsyonal na
  `package-artifact`) → **tunay na depekto**; `exit 1`. Inaayos sa source branch (TDD, Rule #18).
- **DRIFT** (mga **warning** ng eslint, cognitive-complexity, file-size) → ratchet drift na naipon sa
  cycle, **hindi kasalanan ng contributor**; iniuulat lamang ito at **nire-rebaseline ng maintainer sa
  release**. **Hindi kailanman** binabago ng drift ang exit code — kaya hindi ito kailanman nakaka-block ng sinuman.

```bash
npm run check:release-green                 # kasalukuyang branch (working tree)
node scripts/quality/validate-release-green.mjs --json   # structured na output
node scripts/quality/validate-release-green.mjs --quick  # nilalaktawan ang unit+vitest (drift+typecheck+lint lamang)
node scripts/quality/validate-release-green.mjs --with-build  # kasama ang package-artifact (mabagal)
```

Nagsa-diagnose at **nag-uulat** lamang (walang auto-fix). Ang orchestration para ayusin hanggang maging green ay nasa
`/green-prs` at `/review-prs`.

## Solusyon A — `/green-prs` (ang pag-scan sa queue)

Pamamaraan (buod — tingnan ang `green-prs` skill para sa mga detalye):

1. **Ilista** ang queue ng mga bukas na PR laban sa aktibong release branch.
2. **I-triage** ang bawat PR (viable / reject-worthy / needs-author) — ang reject/needs-author ay
   **iniuulat, hindi isinasara** (ang author ang magpapasya).
3. Para sa bawat viable na PR, sa isang **nakahiwalay na worktree** (Rule #19), dalhin ang PR sa pinakabagong tip ng release at patakbuhin ang
   `npm run check:release-green`:
   - **HARD** → ayusin **sa branch ng contributor** sa pamamagitan ng co-authorship (pinapanatili ang status ng author na "Merged"),
     patakbuhin muli hanggang maalis ang lahat ng HARD.
   - **DRIFT** → iwanan ito; ire-rebaseline ito sa release.
4. **Mag-ulat** ng talahanayang PR × (verdict, mga HARD red, naayos?, DRIFT, release-green na ba ngayon?).

Kayang **ihanda** ang queue nang hindi nagme-merge; nagme-merge lamang kapag tahasang hiniling — at hindi kailanman nagsasara ng PR.

## Inirerekomendang dalas

- Patakbuhin ang **`/green-prs` nang pana-panahon** (hal., lingguhan) at **palagi bago ang
  `/generate-release`**.
- Panatilihin ang **`nightly-release-green.yml`** (Solusyon D) bilang tuloy-tuloy na signal: kapag nagbukas ito ng
  HARD red issue, oras na para sa isang pag-scan.
- Gamitin ang **`/validate-release-green`** nang ad hoc upang suriin ang isang branch o partikular na merge candidate.
- Gamitin ang **`/babysit <PR#>`** kapag kailangang tulungang maging green ang isang partikular na PR sa aktuwal na CI.

## Kaugnayan sa release

- Tinatawag ng `/generate-release` ang validation sa **Phase 0 (pre-flight)**: nire-rebaseline ang DRIFT at inaayos ang
  HARD bago buksan ang release PR.
- Ginagamit ng `/review-prs` ang release-green gate sa hakbang ng pagpapasya sa merge (green-before-merge).

Iisa ang layunin ng lahat ng bahaging ito: **isang green na release PR sa unang CI run**, sa halip na sunod-sunod na
harapin ang mga red sa 40 minutong mga layer sa araw ng release.
