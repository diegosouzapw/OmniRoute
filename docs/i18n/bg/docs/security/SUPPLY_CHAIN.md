# Supply-Chain Gates (Phase 8 · Block A) (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../security/SUPPLY_CHAIN.md) · 🇪🇹 [am](../../../am/docs/security/SUPPLY_CHAIN.md) · 🇸🇦 [ar](../../../ar/docs/security/SUPPLY_CHAIN.md) · 🇦🇿 [az](../../../az/docs/security/SUPPLY_CHAIN.md) · 🇧🇩 [bn](../../../bn/docs/security/SUPPLY_CHAIN.md) · 🇨🇿 [cs](../../../cs/docs/security/SUPPLY_CHAIN.md) · 🇩🇰 [da](../../../da/docs/security/SUPPLY_CHAIN.md) · 🇩🇪 [de](../../../de/docs/security/SUPPLY_CHAIN.md) · 🇬🇷 [el](../../../el/docs/security/SUPPLY_CHAIN.md) · 🇪🇸 [es](../../../es/docs/security/SUPPLY_CHAIN.md) · 🇪🇪 [et](../../../et/docs/security/SUPPLY_CHAIN.md) · 🇮🇷 [fa](../../../fa/docs/security/SUPPLY_CHAIN.md) · 🇫🇮 [fi](../../../fi/docs/security/SUPPLY_CHAIN.md) · 🇫🇷 [fr](../../../fr/docs/security/SUPPLY_CHAIN.md) · 🇮🇪 [ga](../../../ga/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [gu](../../../gu/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ha](../../../ha/docs/security/SUPPLY_CHAIN.md) · 🇮🇱 [he](../../../he/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [hi](../../../hi/docs/security/SUPPLY_CHAIN.md) · 🇭🇷 [hr](../../../hr/docs/security/SUPPLY_CHAIN.md) · 🇭🇺 [hu](../../../hu/docs/security/SUPPLY_CHAIN.md) · 🇦🇲 [hy](../../../hy/docs/security/SUPPLY_CHAIN.md) · 🇮🇩 [id](../../../id/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ig](../../../ig/docs/security/SUPPLY_CHAIN.md) · 🇮🇹 [it](../../../it/docs/security/SUPPLY_CHAIN.md) · 🇯🇵 [ja](../../../ja/docs/security/SUPPLY_CHAIN.md) · 🇬🇪 [ka](../../../ka/docs/security/SUPPLY_CHAIN.md) · 🇰🇭 [km](../../../km/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [kn](../../../kn/docs/security/SUPPLY_CHAIN.md) · 🇰🇷 [ko](../../../ko/docs/security/SUPPLY_CHAIN.md) · 🇱🇹 [lt](../../../lt/docs/security/SUPPLY_CHAIN.md) · 🇱🇻 [lv](../../../lv/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ml](../../../ml/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [mr](../../../mr/docs/security/SUPPLY_CHAIN.md) · 🇲🇾 [ms](../../../ms/docs/security/SUPPLY_CHAIN.md) · 🇲🇹 [mt](../../../mt/docs/security/SUPPLY_CHAIN.md) · 🇲🇲 [my](../../../my/docs/security/SUPPLY_CHAIN.md) · 🇳🇵 [ne](../../../ne/docs/security/SUPPLY_CHAIN.md) · 🇳🇱 [nl](../../../nl/docs/security/SUPPLY_CHAIN.md) · 🇳🇴 [no](../../../no/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [or](../../../or/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [pa](../../../pa/docs/security/SUPPLY_CHAIN.md) · 🇵🇭 [phi](../../../phi/docs/security/SUPPLY_CHAIN.md) · 🇵🇱 [pl](../../../pl/docs/security/SUPPLY_CHAIN.md) · 🇵🇹 [pt](../../../pt/docs/security/SUPPLY_CHAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/SUPPLY_CHAIN.md) · 🇷🇴 [ro](../../../ro/docs/security/SUPPLY_CHAIN.md) · 🇷🇺 [ru](../../../ru/docs/security/SUPPLY_CHAIN.md) · 🇱🇰 [si](../../../si/docs/security/SUPPLY_CHAIN.md) · 🇸🇰 [sk](../../../sk/docs/security/SUPPLY_CHAIN.md) · 🇸🇮 [sl](../../../sl/docs/security/SUPPLY_CHAIN.md) · 🇷🇸 [sr](../../../sr/docs/security/SUPPLY_CHAIN.md) · 🇸🇪 [sv](../../../sv/docs/security/SUPPLY_CHAIN.md) · 🇰🇪 [sw](../../../sw/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ta](../../../ta/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [te](../../../te/docs/security/SUPPLY_CHAIN.md) · 🇹🇭 [th](../../../th/docs/security/SUPPLY_CHAIN.md) · 🇹🇷 [tr](../../../tr/docs/security/SUPPLY_CHAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/SUPPLY_CHAIN.md) · 🇵🇰 [ur](../../../ur/docs/security/SUPPLY_CHAIN.md) · 🇺🇿 [uz](../../../uz/docs/security/SUPPLY_CHAIN.md) · 🇻🇳 [vi](../../../vi/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [yo](../../../yo/docs/security/SUPPLY_CHAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/SUPPLY_CHAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/SUPPLY_CHAIN.md)

---

OmniRoute публикува npm + Docker артефакти. Тези контролни механизми осигуряват произход,
инвентаризация (SBOM) и сканиране за CVE, изцяло с отворен код и интегрирани в работните процеси за издаване.
Подход **първо като предупреждение** — засега те само докладват, а след първото
успешно издание ще бъдат повишени до блокиращи.

| Контролен механизъм    | Инструмент                                     | Къде                          | Блокира ли?                        | Резултат                                    |
| ---------------------- | ---------------------------------------------- | ----------------------------- | ---------------------------------- | ------------------------------------------- |
| SLSA произход (npm)    | `npm --provenance` (OIDC)                      | `npm-publish.yml`             | само ако публикуването е неуспешно | значка npmjs / `npm audit signatures`       |
| SBOM за npm            | `@cyclonedx/cyclonedx-npm`                     | `npm-publish.yml`             | само ако генерирането е неуспешно  | актив към изданието + артефакт              |
| SBOM за изображението  | `anchore/sbom-action` (syft)                   | `docker-publish.yml` (merge)  | предупреждение                     | CycloneDX артефакт                          |
| Trivy CVE (SARIF)      | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | предупреждение                     | SARIF (HIGH+CRITICAL) → раздел Security     |
| Trivy CRITICAL бариера | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | **блокиращ**                       | `exit-code: '1'` при поправима CRITICAL     |
| osv vulnCount          | `osv-scanner` (`check:vuln-ratchet --ratchet`) | `ci.yml` (`quality-extended`) | **блокиращ**                       | затяга `metrics.vulnCount` (direction:down) |
| OpenSSF Scorecard      | `ossf/scorecard-action`                        | `scorecard.yml` (cron)        | предупреждение                     | SARIF → Security + значка                   |

Механизмът за затягане на CVE изискванията за изображението използва **две стъпки** в `docker-publish.yml`: стъпката SARIF
(`HIGH,CRITICAL`, `exit-code: 0`) поддържа HIGH+CRITICAL видими в раздела Security,
без да блокира; стъпката _CRITICAL бариера_ (`severity: CRITICAL`, `ignore-unfixed: true`,
`exit-code: 1`) проваля изданието при CRITICAL CVE **с налична корекция**. `ignore-unfixed`
предотвратява блокирането на изданието заради CVE в базовото изображение, за която няма корекция от доставчика.

## ⚠️ Вариации при CVE (блокиращи osv/Trivy бариери)

osv и Trivy сравняват зависимостите с бази данни за CVE, които **непрекъснато нарастват**. PR,
който **не променя никакви зависимости**, може внезапно да стане червен, защото е била
разкрита нова CVE в съществуваща зависимост (osv: измерената стойност на `vulnCount` > базовата; Trivy: нова
поправима CRITICAL уязвимост в изображението). **Това е ОЧАКВАНО оперативно поведение на блокираща
CVE бариера, а не регресия на продукта.**

Когато osv или Trivy станат червени поради новоразкрита CVE, решението е:

1. **Актуализирайте засегнатата зависимост** (предпочитано) — надстройте до коригираната версия чрез `package.json`
   `overrides` (за транзитивни зависимости) или изградете изображението наново върху коригирана база.
2. **Ако няма корекция от доставчика:**
   - **osv:** задайте наново базовата стойност на `metrics.vulnCount` в `config/quality/quality-baseline.json`
     (`npm run quality:ratchet -- --update` не обхваща специализираните бариери — редактирайте стойността
     ръчно, `direction:down`) с бележка за обосновка + задача за проследяване.
   - **Trivy:** добавете запис в `.trivyignore` (по един CVE-ID на ред) с коментар
     за обосновка + задача за проследяване. `ignore-unfixed: true` вече автоматично обхваща CVE
     без корекции.

И двете бариери **коректно ПРОПУСКАТ** проверката (exit 0), когато инструментът липсва или измерването
е неуспешно (`osv-scanner` не е в PATH, osv.dev/мрежата е недостъпна, невалиден JSON) —
неуспешното **измерване** никога не блокира; блокира само **измерена** регресия.

## Списък със задачи: Scorecard от предупреждаващ → блокиращ

След първото успешно издание с докладване от Scorecard:

- Scorecard: затягане на оценката (фиксира измерената оценка; тя не може да намалява).

Допълва бариерите от Phase 7 (osv-scanner, gitleaks, actionlint+zizmor): zizmor
одитира самите работни процеси; Scorecard измерва цялостното състояние на хранилището.
