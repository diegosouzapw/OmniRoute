# Supply-Chain Gates (Phase 8 · Block A) (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../security/SUPPLY_CHAIN.md) · 🇪🇹 [am](../../../am/docs/security/SUPPLY_CHAIN.md) · 🇸🇦 [ar](../../../ar/docs/security/SUPPLY_CHAIN.md) · 🇦🇿 [az](../../../az/docs/security/SUPPLY_CHAIN.md) · 🇧🇬 [bg](../../../bg/docs/security/SUPPLY_CHAIN.md) · 🇧🇩 [bn](../../../bn/docs/security/SUPPLY_CHAIN.md) · 🇨🇿 [cs](../../../cs/docs/security/SUPPLY_CHAIN.md) · 🇩🇰 [da](../../../da/docs/security/SUPPLY_CHAIN.md) · 🇩🇪 [de](../../../de/docs/security/SUPPLY_CHAIN.md) · 🇬🇷 [el](../../../el/docs/security/SUPPLY_CHAIN.md) · 🇪🇸 [es](../../../es/docs/security/SUPPLY_CHAIN.md) · 🇪🇪 [et](../../../et/docs/security/SUPPLY_CHAIN.md) · 🇮🇷 [fa](../../../fa/docs/security/SUPPLY_CHAIN.md) · 🇫🇮 [fi](../../../fi/docs/security/SUPPLY_CHAIN.md) · 🇮🇪 [ga](../../../ga/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [gu](../../../gu/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ha](../../../ha/docs/security/SUPPLY_CHAIN.md) · 🇮🇱 [he](../../../he/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [hi](../../../hi/docs/security/SUPPLY_CHAIN.md) · 🇭🇷 [hr](../../../hr/docs/security/SUPPLY_CHAIN.md) · 🇭🇺 [hu](../../../hu/docs/security/SUPPLY_CHAIN.md) · 🇦🇲 [hy](../../../hy/docs/security/SUPPLY_CHAIN.md) · 🇮🇩 [id](../../../id/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ig](../../../ig/docs/security/SUPPLY_CHAIN.md) · 🇮🇹 [it](../../../it/docs/security/SUPPLY_CHAIN.md) · 🇯🇵 [ja](../../../ja/docs/security/SUPPLY_CHAIN.md) · 🇬🇪 [ka](../../../ka/docs/security/SUPPLY_CHAIN.md) · 🇰🇭 [km](../../../km/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [kn](../../../kn/docs/security/SUPPLY_CHAIN.md) · 🇰🇷 [ko](../../../ko/docs/security/SUPPLY_CHAIN.md) · 🇱🇹 [lt](../../../lt/docs/security/SUPPLY_CHAIN.md) · 🇱🇻 [lv](../../../lv/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ml](../../../ml/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [mr](../../../mr/docs/security/SUPPLY_CHAIN.md) · 🇲🇾 [ms](../../../ms/docs/security/SUPPLY_CHAIN.md) · 🇲🇹 [mt](../../../mt/docs/security/SUPPLY_CHAIN.md) · 🇲🇲 [my](../../../my/docs/security/SUPPLY_CHAIN.md) · 🇳🇵 [ne](../../../ne/docs/security/SUPPLY_CHAIN.md) · 🇳🇱 [nl](../../../nl/docs/security/SUPPLY_CHAIN.md) · 🇳🇴 [no](../../../no/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [or](../../../or/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [pa](../../../pa/docs/security/SUPPLY_CHAIN.md) · 🇵🇭 [phi](../../../phi/docs/security/SUPPLY_CHAIN.md) · 🇵🇱 [pl](../../../pl/docs/security/SUPPLY_CHAIN.md) · 🇵🇹 [pt](../../../pt/docs/security/SUPPLY_CHAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/SUPPLY_CHAIN.md) · 🇷🇴 [ro](../../../ro/docs/security/SUPPLY_CHAIN.md) · 🇷🇺 [ru](../../../ru/docs/security/SUPPLY_CHAIN.md) · 🇱🇰 [si](../../../si/docs/security/SUPPLY_CHAIN.md) · 🇸🇰 [sk](../../../sk/docs/security/SUPPLY_CHAIN.md) · 🇸🇮 [sl](../../../sl/docs/security/SUPPLY_CHAIN.md) · 🇷🇸 [sr](../../../sr/docs/security/SUPPLY_CHAIN.md) · 🇸🇪 [sv](../../../sv/docs/security/SUPPLY_CHAIN.md) · 🇰🇪 [sw](../../../sw/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ta](../../../ta/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [te](../../../te/docs/security/SUPPLY_CHAIN.md) · 🇹🇭 [th](../../../th/docs/security/SUPPLY_CHAIN.md) · 🇹🇷 [tr](../../../tr/docs/security/SUPPLY_CHAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/SUPPLY_CHAIN.md) · 🇵🇰 [ur](../../../ur/docs/security/SUPPLY_CHAIN.md) · 🇺🇿 [uz](../../../uz/docs/security/SUPPLY_CHAIN.md) · 🇻🇳 [vi](../../../vi/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [yo](../../../yo/docs/security/SUPPLY_CHAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/SUPPLY_CHAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/SUPPLY_CHAIN.md)

---

OmniRoute publie des artefacts npm + Docker. Ces contrôles fournissent la provenance,
l’inventaire (SBOM) et l’analyse des CVE, entièrement en OSS, intégrés aux workflows de publication.
Posture **orientée avis** — ils produisent actuellement des rapports et deviendront bloquants après la 1re
publication réussie.

| Contrôle                | Outil                                          | Emplacement                   | Bloquant ?                         | Sortie                                                   |
| ----------------------- | ---------------------------------------------- | ----------------------------- | ---------------------------------- | -------------------------------------------------------- |
| Provenance SLSA (npm)   | `npm --provenance` (OIDC)                      | `npm-publish.yml`             | seulement si la publication échoue | badge npmjs / `npm audit signatures`                     |
| SBOM npm                | `@cyclonedx/cyclonedx-npm`                     | `npm-publish.yml`             | seulement si la génération échoue  | Ressource de publication + artefact                      |
| SBOM de l’image         | `anchore/sbom-action` (syft)                   | `docker-publish.yml` (fusion) | indicatif                          | Artefact CycloneDX                                       |
| CVE Trivy (SARIF)       | `aquasecurity/trivy-action`                    | `docker-publish.yml` (fusion) | indicatif                          | SARIF (HIGH+CRITICAL) → onglet Security                  |
| Contrôle Trivy CRITICAL | `aquasecurity/trivy-action`                    | `docker-publish.yml` (fusion) | **bloquant**                       | `exit-code: '1'` pour les CRITICAL corrigibles           |
| vulnCount osv           | `osv-scanner` (`check:vuln-ratchet --ratchet`) | `ci.yml` (`quality-extended`) | **bloquant**                       | applique un seuil à `metrics.vulnCount` (direction:down) |
| OpenSSF Scorecard       | `ossf/scorecard-action`                        | `scorecard.yml` (cron)        | indicatif                          | SARIF → Security + badge                                 |

Le seuil CVE de l’image utilise **deux étapes** dans `docker-publish.yml` : l’étape SARIF
(`HIGH,CRITICAL`, `exit-code: 0`) maintient les vulnérabilités HIGH+CRITICAL visibles dans l’onglet Security
sans être bloquante ; l’étape de _contrôle CRITICAL_ (`severity: CRITICAL`, `ignore-unfixed: true`,
`exit-code: 1`) fait échouer la publication en cas de CVE CRITICAL **pour laquelle un correctif est disponible**. `ignore-unfixed`
évite de bloquer la publication à cause d’une CVE de l’image de base sans correctif en amont.

## ⚠️ Variabilité des CVE (contrôles bloquants osv/Trivy)

osv et Trivy comparent les dépendances à des bases de données de CVE qui **s’enrichissent en permanence**. Une PR
qui **ne modifie aucune dépendance** peut soudainement passer au rouge parce qu’une nouvelle CVE a été
divulguée dans une dépendance existante (osv : `vulnCount` mesuré > référence ; Trivy : nouvelle
vulnérabilité CRITICAL corrigible dans l’image). **Il s’agit du comportement opérationnel ATTENDU d’un contrôle
CVE bloquant, et non d’une régression du produit.**

Lorsque osv ou Trivy passent au rouge à cause d’une CVE nouvellement divulguée, la solution est la suivante :

1. **Mettre à niveau la dépendance concernée** (méthode privilégiée) — passer à la version corrigée via `package.json`
   `overrides` (dépendances transitives) ou reconstruire l’image à partir d’une base corrigée.
2. **S’il n’existe aucun correctif en amont :**
   - **osv :** redéfinir la référence `metrics.vulnCount` dans `config/quality/quality-baseline.json`
     (`npm run quality:ratchet -- --update` ne couvre pas les contrôles dédiés — modifier la valeur
     manuellement, `direction:down`) avec une note justificative + un ticket de suivi.
   - **Trivy :** ajouter une entrée dans `.trivyignore` (un identifiant de CVE par ligne) avec un commentaire
     justificatif + un ticket de suivi. `ignore-unfixed: true` couvre déjà automatiquement les CVE sans
     correctif.

Les deux contrôles sont **IGNORÉS proprement** (code de sortie 0) lorsque l’outil est absent ou que la mesure
échoue (`osv-scanner` absent de PATH, osv.dev/réseau inaccessible, JSON non valide) — un échec de
**mesure** n’est jamais bloquant ; seule une régression **mesurée** l’est.

## Backlog : Scorecard indicatif → bloquant

Après la 1re publication réussie avec un rapport Scorecard :

- Scorecard : seuil sur le score (fige le score mesuré, qui ne peut plus diminuer).

Complète les contrôles de la phase 7 (osv-scanner, gitleaks, actionlint+zizmor) : zizmor
audite les workflows eux-mêmes ; Scorecard mesure la posture globale du dépôt.
