# Supply-Chain Gates (Phase 8 · Block A) (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../security/SUPPLY_CHAIN.md) · 🇪🇹 [am](../../../am/docs/security/SUPPLY_CHAIN.md) · 🇸🇦 [ar](../../../ar/docs/security/SUPPLY_CHAIN.md) · 🇦🇿 [az](../../../az/docs/security/SUPPLY_CHAIN.md) · 🇧🇬 [bg](../../../bg/docs/security/SUPPLY_CHAIN.md) · 🇧🇩 [bn](../../../bn/docs/security/SUPPLY_CHAIN.md) · 🇨🇿 [cs](../../../cs/docs/security/SUPPLY_CHAIN.md) · 🇩🇰 [da](../../../da/docs/security/SUPPLY_CHAIN.md) · 🇩🇪 [de](../../../de/docs/security/SUPPLY_CHAIN.md) · 🇬🇷 [el](../../../el/docs/security/SUPPLY_CHAIN.md) · 🇪🇸 [es](../../../es/docs/security/SUPPLY_CHAIN.md) · 🇪🇪 [et](../../../et/docs/security/SUPPLY_CHAIN.md) · 🇮🇷 [fa](../../../fa/docs/security/SUPPLY_CHAIN.md) · 🇫🇮 [fi](../../../fi/docs/security/SUPPLY_CHAIN.md) · 🇫🇷 [fr](../../../fr/docs/security/SUPPLY_CHAIN.md) · 🇮🇪 [ga](../../../ga/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [gu](../../../gu/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ha](../../../ha/docs/security/SUPPLY_CHAIN.md) · 🇮🇱 [he](../../../he/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [hi](../../../hi/docs/security/SUPPLY_CHAIN.md) · 🇭🇷 [hr](../../../hr/docs/security/SUPPLY_CHAIN.md) · 🇭🇺 [hu](../../../hu/docs/security/SUPPLY_CHAIN.md) · 🇦🇲 [hy](../../../hy/docs/security/SUPPLY_CHAIN.md) · 🇮🇩 [id](../../../id/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ig](../../../ig/docs/security/SUPPLY_CHAIN.md) · 🇮🇹 [it](../../../it/docs/security/SUPPLY_CHAIN.md) · 🇯🇵 [ja](../../../ja/docs/security/SUPPLY_CHAIN.md) · 🇬🇪 [ka](../../../ka/docs/security/SUPPLY_CHAIN.md) · 🇰🇭 [km](../../../km/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [kn](../../../kn/docs/security/SUPPLY_CHAIN.md) · 🇰🇷 [ko](../../../ko/docs/security/SUPPLY_CHAIN.md) · 🇱🇹 [lt](../../../lt/docs/security/SUPPLY_CHAIN.md) · 🇱🇻 [lv](../../../lv/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ml](../../../ml/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [mr](../../../mr/docs/security/SUPPLY_CHAIN.md) · 🇲🇾 [ms](../../../ms/docs/security/SUPPLY_CHAIN.md) · 🇲🇹 [mt](../../../mt/docs/security/SUPPLY_CHAIN.md) · 🇲🇲 [my](../../../my/docs/security/SUPPLY_CHAIN.md) · 🇳🇵 [ne](../../../ne/docs/security/SUPPLY_CHAIN.md) · 🇳🇱 [nl](../../../nl/docs/security/SUPPLY_CHAIN.md) · 🇳🇴 [no](../../../no/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [or](../../../or/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [pa](../../../pa/docs/security/SUPPLY_CHAIN.md) · 🇵🇱 [pl](../../../pl/docs/security/SUPPLY_CHAIN.md) · 🇵🇹 [pt](../../../pt/docs/security/SUPPLY_CHAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/SUPPLY_CHAIN.md) · 🇷🇴 [ro](../../../ro/docs/security/SUPPLY_CHAIN.md) · 🇷🇺 [ru](../../../ru/docs/security/SUPPLY_CHAIN.md) · 🇱🇰 [si](../../../si/docs/security/SUPPLY_CHAIN.md) · 🇸🇰 [sk](../../../sk/docs/security/SUPPLY_CHAIN.md) · 🇸🇮 [sl](../../../sl/docs/security/SUPPLY_CHAIN.md) · 🇷🇸 [sr](../../../sr/docs/security/SUPPLY_CHAIN.md) · 🇸🇪 [sv](../../../sv/docs/security/SUPPLY_CHAIN.md) · 🇰🇪 [sw](../../../sw/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ta](../../../ta/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [te](../../../te/docs/security/SUPPLY_CHAIN.md) · 🇹🇭 [th](../../../th/docs/security/SUPPLY_CHAIN.md) · 🇹🇷 [tr](../../../tr/docs/security/SUPPLY_CHAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/SUPPLY_CHAIN.md) · 🇵🇰 [ur](../../../ur/docs/security/SUPPLY_CHAIN.md) · 🇺🇿 [uz](../../../uz/docs/security/SUPPLY_CHAIN.md) · 🇻🇳 [vi](../../../vi/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [yo](../../../yo/docs/security/SUPPLY_CHAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/SUPPLY_CHAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/SUPPLY_CHAIN.md)

---

Naglalathala ang OmniRoute ng mga artifact na npm + Docker. Nagbibigay ang mga gate na ito ng provenance,
imbentaryo (SBOM), at pag-scan ng CVE, pawang OSS, na isinama sa mga release workflow.
**Advisory muna** ang postura — nag-uulat muna ang mga ito ngayon, at gagawing blocking pagkatapos ng unang
green release.

| Gate                  | Tool                                           | Saan                          | Nangba-block?                     | Output                                                            |
| --------------------- | ---------------------------------------------- | ----------------------------- | --------------------------------- | ----------------------------------------------------------------- |
| SLSA provenance (npm) | `npm --provenance` (OIDC)                      | `npm-publish.yml`             | kapag nabigo lang ang pag-publish | badge sa npmjs / `npm audit signatures`                           |
| SBOM npm              | `@cyclonedx/cyclonedx-npm`                     | `npm-publish.yml`             | kapag nabigo lang ang pagbuo      | Release asset + artifact                                          |
| SBOM image            | `anchore/sbom-action` (syft)                   | `docker-publish.yml` (merge)  | advisory                          | CycloneDX artifact                                                |
| Trivy CVE (SARIF)     | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | advisory                          | SARIF (HIGH+CRITICAL) → tab na Security                           |
| Trivy CRITICAL gate   | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | **blocking**                      | `exit-code: '1'` sa naaayos na CRITICAL                           |
| osv vulnCount         | `osv-scanner` (`check:vuln-ratchet --ratchet`) | `ci.yml` (`quality-extended`) | **blocking**                      | nililimitahan ng ratchet ang `metrics.vulnCount` (direction:down) |
| OpenSSF Scorecard     | `ossf/scorecard-action`                        | `scorecard.yml` (cron)        | advisory                          | SARIF → Security + badge                                          |

Gumagamit ang image CVE ratchet ng **dalawang hakbang** sa `docker-publish.yml`: pinananatiling
nakikita ng hakbang na SARIF (`HIGH,CRITICAL`, `exit-code: 0`) ang HIGH+CRITICAL sa tab na Security
nang hindi nangba-block; ibinabagsak ng hakbang na _CRITICAL gate_ (`severity: CRITICAL`, `ignore-unfixed: true`,
`exit-code: 1`) ang release kapag may CRITICAL CVE **na may available na fix**. Pinipigilan ng `ignore-unfixed`
na ma-block ang release dahil sa isang base-image CVE na walang upstream patch.

## ⚠️ Pagkakaiba-iba ng CVE (mga blocking na osv/Trivy gate)

Inihahambing ng osv at Trivy ang mga dependency sa mga CVE database na **patuloy na lumalaki**. Ang isang PR
na **walang binabagong dependency** ay maaaring biglang maging pula dahil may bagong CVE na
inihayag sa isang umiiral na dependency (osv: ang nasukat na `vulnCount` > baseline; Trivy: isang bagong
naaayos na CRITICAL sa image). **INAASAHAN itong operasyonal na gawi ng isang blocking
CVE gate, at hindi ito product regression.**

Kapag naging pula ang osv o Trivy dahil sa isang bagong inihayag na CVE, ang lunas ay:

1. **I-bump ang apektadong dependency** (mas mainam) — mag-upgrade sa patched na bersyon sa pamamagitan ng `package.json`
   `overrides` (mga transitive dependency) o muling buuin ang image gamit ang patched na base.
2. **Kung walang upstream fix:**
   - **osv:** muling itakda ang baseline ng `metrics.vulnCount` sa `config/quality/quality-baseline.json`
     (hindi saklaw ng `npm run quality:ratchet -- --update` ang mga nakalaang gate — manu-manong baguhin ang value,
     `direction:down`) na may tala ng katwiran + tracking issue.
   - **Trivy:** magdagdag ng entry sa `.trivyignore` (isang CVE-ID bawat linya) na may comment
     ng katwiran + tracking issue. Awtomatikong sinasaklaw na ng `ignore-unfixed: true` ang mga CVE na walang
     patch.

Ang parehong gate ay **maayos na NAG-SKIP** (exit 0) kapag wala ang tool o nabigo ang pagsukat
(wala sa PATH ang osv-scanner, hindi maabot ang osv.dev/network, invalid na JSON) — hindi kailanman
nangba-block ang kabiguan sa **pagsukat**; isang **nasukat** na regression lamang ang nangba-block.

## Backlog: Scorecard advisory → blocking

Pagkatapos ng unang green release na may pag-uulat ng Scorecard:

- Scorecard: score ratchet (pinananatili ang nasukat na score; hindi ito maaaring bumaba).

Kinukumpleto nito ang mga Phase 7 gate (osv-scanner, gitleaks, actionlint+zizmor): sinusuri ng zizmor
ang mismong mga workflow; sinusukat naman ng Scorecard ang pangkalahatang postura ng repo.
