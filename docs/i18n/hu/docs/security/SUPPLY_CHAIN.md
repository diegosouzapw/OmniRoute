# Supply-Chain Gates (Phase 8 · Block A) (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../security/SUPPLY_CHAIN.md) · 🇪🇹 [am](../../../am/docs/security/SUPPLY_CHAIN.md) · 🇸🇦 [ar](../../../ar/docs/security/SUPPLY_CHAIN.md) · 🇦🇿 [az](../../../az/docs/security/SUPPLY_CHAIN.md) · 🇧🇬 [bg](../../../bg/docs/security/SUPPLY_CHAIN.md) · 🇧🇩 [bn](../../../bn/docs/security/SUPPLY_CHAIN.md) · 🇨🇿 [cs](../../../cs/docs/security/SUPPLY_CHAIN.md) · 🇩🇰 [da](../../../da/docs/security/SUPPLY_CHAIN.md) · 🇩🇪 [de](../../../de/docs/security/SUPPLY_CHAIN.md) · 🇬🇷 [el](../../../el/docs/security/SUPPLY_CHAIN.md) · 🇪🇸 [es](../../../es/docs/security/SUPPLY_CHAIN.md) · 🇪🇪 [et](../../../et/docs/security/SUPPLY_CHAIN.md) · 🇮🇷 [fa](../../../fa/docs/security/SUPPLY_CHAIN.md) · 🇫🇮 [fi](../../../fi/docs/security/SUPPLY_CHAIN.md) · 🇫🇷 [fr](../../../fr/docs/security/SUPPLY_CHAIN.md) · 🇮🇪 [ga](../../../ga/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [gu](../../../gu/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ha](../../../ha/docs/security/SUPPLY_CHAIN.md) · 🇮🇱 [he](../../../he/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [hi](../../../hi/docs/security/SUPPLY_CHAIN.md) · 🇭🇷 [hr](../../../hr/docs/security/SUPPLY_CHAIN.md) · 🇦🇲 [hy](../../../hy/docs/security/SUPPLY_CHAIN.md) · 🇮🇩 [id](../../../id/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ig](../../../ig/docs/security/SUPPLY_CHAIN.md) · 🇮🇹 [it](../../../it/docs/security/SUPPLY_CHAIN.md) · 🇯🇵 [ja](../../../ja/docs/security/SUPPLY_CHAIN.md) · 🇬🇪 [ka](../../../ka/docs/security/SUPPLY_CHAIN.md) · 🇰🇭 [km](../../../km/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [kn](../../../kn/docs/security/SUPPLY_CHAIN.md) · 🇰🇷 [ko](../../../ko/docs/security/SUPPLY_CHAIN.md) · 🇱🇹 [lt](../../../lt/docs/security/SUPPLY_CHAIN.md) · 🇱🇻 [lv](../../../lv/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ml](../../../ml/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [mr](../../../mr/docs/security/SUPPLY_CHAIN.md) · 🇲🇾 [ms](../../../ms/docs/security/SUPPLY_CHAIN.md) · 🇲🇹 [mt](../../../mt/docs/security/SUPPLY_CHAIN.md) · 🇲🇲 [my](../../../my/docs/security/SUPPLY_CHAIN.md) · 🇳🇵 [ne](../../../ne/docs/security/SUPPLY_CHAIN.md) · 🇳🇱 [nl](../../../nl/docs/security/SUPPLY_CHAIN.md) · 🇳🇴 [no](../../../no/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [or](../../../or/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [pa](../../../pa/docs/security/SUPPLY_CHAIN.md) · 🇵🇭 [phi](../../../phi/docs/security/SUPPLY_CHAIN.md) · 🇵🇱 [pl](../../../pl/docs/security/SUPPLY_CHAIN.md) · 🇵🇹 [pt](../../../pt/docs/security/SUPPLY_CHAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/SUPPLY_CHAIN.md) · 🇷🇴 [ro](../../../ro/docs/security/SUPPLY_CHAIN.md) · 🇷🇺 [ru](../../../ru/docs/security/SUPPLY_CHAIN.md) · 🇱🇰 [si](../../../si/docs/security/SUPPLY_CHAIN.md) · 🇸🇰 [sk](../../../sk/docs/security/SUPPLY_CHAIN.md) · 🇸🇮 [sl](../../../sl/docs/security/SUPPLY_CHAIN.md) · 🇷🇸 [sr](../../../sr/docs/security/SUPPLY_CHAIN.md) · 🇸🇪 [sv](../../../sv/docs/security/SUPPLY_CHAIN.md) · 🇰🇪 [sw](../../../sw/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ta](../../../ta/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [te](../../../te/docs/security/SUPPLY_CHAIN.md) · 🇹🇭 [th](../../../th/docs/security/SUPPLY_CHAIN.md) · 🇹🇷 [tr](../../../tr/docs/security/SUPPLY_CHAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/SUPPLY_CHAIN.md) · 🇵🇰 [ur](../../../ur/docs/security/SUPPLY_CHAIN.md) · 🇺🇿 [uz](../../../uz/docs/security/SUPPLY_CHAIN.md) · 🇻🇳 [vi](../../../vi/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [yo](../../../yo/docs/security/SUPPLY_CHAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/SUPPLY_CHAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/SUPPLY_CHAIN.md)

---

Az OmniRoute npm- és Docker-összetevőket tesz közzé. Ezek az ellenőrzőkapuk biztosítják az eredetigazolást,
a leltárt (SBOM) és a CVE-vizsgálatot; mindegyik nyílt forráskódú, és integrálva van a kiadási munkafolyamatokba.
**Elsőként figyelmeztető** megközelítés — jelenleg csak jelentést készítenek, majd az 1.
sikeres kiadás után blokkolóvá válnak.

| Ellenőrzőkapu                | Eszköz                                         | Helye                            | Blokkol?                        | Kimenet                                                                 |
| ---------------------------- | ---------------------------------------------- | -------------------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| SLSA-eredetigazolás (npm)    | `npm --provenance` (OIDC)                      | `npm-publish.yml`                | csak ha a közzététel meghiúsul  | npmjs-jelvény / `npm audit signatures`                                  |
| npm SBOM                     | `@cyclonedx/cyclonedx-npm`                     | `npm-publish.yml`                | csak ha az előállítás meghiúsul | Kiadási melléklet + összetevő                                           |
| Lemezkép-SBOM                | `anchore/sbom-action` (syft)                   | `docker-publish.yml` (egyesítés) | figyelmeztető                   | CycloneDX-összetevő                                                     |
| Trivy CVE (SARIF)            | `aquasecurity/trivy-action`                    | `docker-publish.yml` (egyesítés) | figyelmeztető                   | SARIF (HIGH+CRITICAL) → Biztonság lap                                   |
| Trivy CRITICAL ellenőrzőkapu | `aquasecurity/trivy-action`                    | `docker-publish.yml` (egyesítés) | **blokkoló**                    | `exit-code: '1'` javítható CRITICAL esetén                              |
| osv vulnCount                | `osv-scanner` (`check:vuln-ratchet --ratchet`) | `ci.yml` (`quality-extended`)    | **blokkoló**                    | fokozatosan szigorítja a `metrics.vulnCount` értékét (`direction:down`) |
| OpenSSF Scorecard            | `ossf/scorecard-action`                        | `scorecard.yml` (cron)           | figyelmeztető                   | SARIF → Biztonság + jelvény                                             |

A lemezkép CVE-korlátja **két lépést** használ a `docker-publish.yml` fájlban: a SARIF-lépés
(`HIGH,CRITICAL`, `exit-code: 0`) a HIGH+CRITICAL találatokat blokkolás nélkül láthatóan
tartja a Biztonság lapon; a _CRITICAL ellenőrzőkapu_ lépése (`severity: CRITICAL`, `ignore-unfixed: true`,
`exit-code: 1`) meghiúsítja a kiadást, ha **elérhető javítással rendelkező** CRITICAL CVE található. Az `ignore-unfixed`
megakadályozza, hogy egy felsőbb szintű javítással nem rendelkező alaplemezkép-CVE blokkolja a kiadást.

## ⚠️ CVE-ingadozás (blokkoló osv/Trivy ellenőrzőkapuk)

Az osv és a Trivy a függőségeket **folyamatosan bővülő** CVE-adatbázisokkal veti össze. Egy olyan PR,
amely **nem módosít függőségeket**, hirtelen sikertelenné válhat, mert egy meglévő függőségben
új CVE-t tettek közzé (osv: a mért `vulnCount` > alapérték; Trivy: új,
javítható CRITICAL található a lemezképben). **Ez egy blokkoló CVE-ellenőrzőkapu ELVÁRT működési
viselkedése, nem pedig termékregresszió.**

Ha az osv vagy a Trivy egy újonnan közzétett CVE miatt jelez hibát, a megoldás:

1. **Frissítse az érintett függőséget** (előnyben részesített) — frissítsen a javított verzióra a `package.json`
   `overrides` mezőjén keresztül (tranzitív függőségek esetén), vagy építse újra a lemezképet egy javított alapra.
2. **Ha nincs felsőbb szintű javítás:**
   - **osv:** állítsa be újra a `metrics.vulnCount` alapértékét a `config/quality/quality-baseline.json`
     fájlban (az `npm run quality:ratchet -- --update` nem terjed ki a dedikált ellenőrzőkapukra — módosítsa kézzel
     az értéket, `direction:down`), indoklással és nyomon követési feladattal együtt.
   - **Trivy:** adjon hozzá egy bejegyzést a `.trivyignore` fájlhoz (soronként egy CVE-ID), indokló
     megjegyzéssel és nyomon követési feladattal együtt. Az `ignore-unfixed: true` már automatikusan
     kezeli a javítással nem rendelkező CVE-ket.

Mindkét ellenőrzőkapu **szabályosan KIHAGYJA** az ellenőrzést (exit 0), ha az eszköz hiányzik vagy a mérés
meghiúsul (az osv-scanner nincs a PATH-ban, az osv.dev/hálózat nem érhető el, érvénytelen JSON) — egy
**mérési** hiba soha nem blokkol, csak egy **mért** regresszió blokkol.

## Teendőlista: Scorecard figyelmeztető → blokkoló

Az 1. sikeres, Scorecard-jelentést tartalmazó kiadás után:

- Scorecard: pontszámkorlát (rögzíti a mért pontszámot; az nem csökkenhet).

Kiegészíti a 7. fázis ellenőrzőkapuit (osv-scanner, gitleaks, actionlint+zizmor): a zizmor
magukat a munkafolyamatokat auditálja; a Scorecard összesítve méri a tároló biztonsági állapotát.
