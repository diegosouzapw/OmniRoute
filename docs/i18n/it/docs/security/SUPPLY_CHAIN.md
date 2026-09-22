# Supply-Chain Gates (Phase 8 · Block A) (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../security/SUPPLY_CHAIN.md) · 🇪🇹 [am](../../../am/docs/security/SUPPLY_CHAIN.md) · 🇸🇦 [ar](../../../ar/docs/security/SUPPLY_CHAIN.md) · 🇦🇿 [az](../../../az/docs/security/SUPPLY_CHAIN.md) · 🇧🇬 [bg](../../../bg/docs/security/SUPPLY_CHAIN.md) · 🇧🇩 [bn](../../../bn/docs/security/SUPPLY_CHAIN.md) · 🇧🇦 [bs](../../../bs/docs/security/SUPPLY_CHAIN.md) · 🇨🇿 [cs](../../../cs/docs/security/SUPPLY_CHAIN.md) · 🇩🇰 [da](../../../da/docs/security/SUPPLY_CHAIN.md) · 🇩🇪 [de](../../../de/docs/security/SUPPLY_CHAIN.md) · 🇬🇷 [el](../../../el/docs/security/SUPPLY_CHAIN.md) · 🇪🇸 [es](../../../es/docs/security/SUPPLY_CHAIN.md) · 🇪🇪 [et](../../../et/docs/security/SUPPLY_CHAIN.md) · 🇮🇷 [fa](../../../fa/docs/security/SUPPLY_CHAIN.md) · 🇫🇮 [fi](../../../fi/docs/security/SUPPLY_CHAIN.md) · 🇫🇷 [fr](../../../fr/docs/security/SUPPLY_CHAIN.md) · 🇮🇪 [ga](../../../ga/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [gu](../../../gu/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ha](../../../ha/docs/security/SUPPLY_CHAIN.md) · 🇮🇱 [he](../../../he/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [hi](../../../hi/docs/security/SUPPLY_CHAIN.md) · 🇭🇷 [hr](../../../hr/docs/security/SUPPLY_CHAIN.md) · 🇭🇺 [hu](../../../hu/docs/security/SUPPLY_CHAIN.md) · 🇦🇲 [hy](../../../hy/docs/security/SUPPLY_CHAIN.md) · 🇮🇩 [id](../../../id/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ig](../../../ig/docs/security/SUPPLY_CHAIN.md) · 🇯🇵 [ja](../../../ja/docs/security/SUPPLY_CHAIN.md) · 🇬🇪 [ka](../../../ka/docs/security/SUPPLY_CHAIN.md) · 🇰🇭 [km](../../../km/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [kn](../../../kn/docs/security/SUPPLY_CHAIN.md) · 🇰🇷 [ko](../../../ko/docs/security/SUPPLY_CHAIN.md) · 🇱🇹 [lt](../../../lt/docs/security/SUPPLY_CHAIN.md) · 🇱🇻 [lv](../../../lv/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ml](../../../ml/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [mr](../../../mr/docs/security/SUPPLY_CHAIN.md) · 🇲🇾 [ms](../../../ms/docs/security/SUPPLY_CHAIN.md) · 🇲🇹 [mt](../../../mt/docs/security/SUPPLY_CHAIN.md) · 🇲🇲 [my](../../../my/docs/security/SUPPLY_CHAIN.md) · 🇳🇵 [ne](../../../ne/docs/security/SUPPLY_CHAIN.md) · 🇳🇱 [nl](../../../nl/docs/security/SUPPLY_CHAIN.md) · 🇳🇴 [no](../../../no/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [or](../../../or/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [pa](../../../pa/docs/security/SUPPLY_CHAIN.md) · 🇵🇭 [phi](../../../phi/docs/security/SUPPLY_CHAIN.md) · 🇵🇱 [pl](../../../pl/docs/security/SUPPLY_CHAIN.md) · 🇵🇹 [pt](../../../pt/docs/security/SUPPLY_CHAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/SUPPLY_CHAIN.md) · 🇷🇴 [ro](../../../ro/docs/security/SUPPLY_CHAIN.md) · 🇷🇺 [ru](../../../ru/docs/security/SUPPLY_CHAIN.md) · 🇱🇰 [si](../../../si/docs/security/SUPPLY_CHAIN.md) · 🇸🇰 [sk](../../../sk/docs/security/SUPPLY_CHAIN.md) · 🇸🇮 [sl](../../../sl/docs/security/SUPPLY_CHAIN.md) · 🇷🇸 [sr](../../../sr/docs/security/SUPPLY_CHAIN.md) · 🇸🇪 [sv](../../../sv/docs/security/SUPPLY_CHAIN.md) · 🇰🇪 [sw](../../../sw/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ta](../../../ta/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [te](../../../te/docs/security/SUPPLY_CHAIN.md) · 🇹🇭 [th](../../../th/docs/security/SUPPLY_CHAIN.md) · 🇹🇷 [tr](../../../tr/docs/security/SUPPLY_CHAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/SUPPLY_CHAIN.md) · 🇵🇰 [ur](../../../ur/docs/security/SUPPLY_CHAIN.md) · 🇺🇿 [uz](../../../uz/docs/security/SUPPLY_CHAIN.md) · 🇻🇳 [vi](../../../vi/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [yo](../../../yo/docs/security/SUPPLY_CHAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/SUPPLY_CHAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/SUPPLY_CHAIN.md)

---

OmniRoute pubblica artefatti npm + Docker. Questi gate forniscono provenienza,
inventario (SBOM) e scansione delle CVE, interamente OSS, integrati nei workflow di rilascio.
Approccio **prima advisory** — inizialmente si limitano a segnalare, per poi diventare bloccanti dopo il 1°
rilascio verde.

| Gate                   | Strumento                                      | Dove                          | Blocca?                           | Output                                      |
| ---------------------- | ---------------------------------------------- | ----------------------------- | --------------------------------- | ------------------------------------------- |
| Provenienza SLSA (npm) | `npm --provenance` (OIDC)                      | `npm-publish.yml`             | solo se la pubblicazione fallisce | badge npmjs / `npm audit signatures`        |
| SBOM npm               | `@cyclonedx/cyclonedx-npm`                     | `npm-publish.yml`             | solo se la generazione fallisce   | Asset del rilascio + artefatto              |
| SBOM immagine          | `anchore/sbom-action` (syft)                   | `docker-publish.yml` (merge)  | advisory                          | Artefatto CycloneDX                         |
| CVE Trivy (SARIF)      | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | advisory                          | SARIF (HIGH+CRITICAL) → scheda Security     |
| Gate CRITICAL Trivy    | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | **bloccante**                     | `exit-code: '1'` per CRITICAL correggibili  |
| vulnCount osv          | `osv-scanner` (`check:vuln-ratchet --ratchet`) | `ci.yml` (`quality-extended`) | **bloccante**                     | limita `metrics.vulnCount` (direction:down) |
| OpenSSF Scorecard      | `ossf/scorecard-action`                        | `scorecard.yml` (cron)        | advisory                          | SARIF → Security + badge                    |

Il limite progressivo per le CVE dell'immagine utilizza **due passaggi** in `docker-publish.yml`: il passaggio SARIF
(`HIGH,CRITICAL`, `exit-code: 0`) mantiene visibili le vulnerabilità HIGH+CRITICAL nella scheda Security
senza bloccare; il passaggio _gate CRITICAL_ (`severity: CRITICAL`, `ignore-unfixed: true`,
`exit-code: 1`) fa fallire il rilascio in presenza di una CVE CRITICAL **per cui è disponibile una correzione**. `ignore-unfixed`
impedisce di bloccare il rilascio a causa di una CVE dell'immagine di base priva di una patch upstream.

## ⚠️ Variabilità delle CVE (gate osv/Trivy bloccanti)

osv e Trivy confrontano le dipendenze con database di CVE che **crescono continuamente**. Una PR
che **non modifica alcuna dipendenza** può diventare improvvisamente rossa perché è stata
divulgata una nuova CVE relativa a una dipendenza esistente (osv: `vulnCount` misurato > baseline; Trivy: una nuova
CRITICAL correggibile nell'immagine). **Questo è il comportamento operativo PREVISTO di un gate
CVE bloccante, non una regressione del prodotto.**

Quando osv o Trivy diventano rossi a causa di una CVE appena divulgata, il rimedio è:

1. **Aggiornare la dipendenza interessata** (opzione preferita) — eseguire l'upgrade alla versione corretta tramite `package.json`
   `overrides` (dipendenze transitive) oppure ricostruire l'immagine su una base corretta.
2. **Se non esiste una correzione upstream:**
   - **osv:** ridefinire la baseline di `metrics.vulnCount` in `config/quality/quality-baseline.json`
     (`npm run quality:ratchet -- --update` non copre i gate dedicati — modificare il valore
     manualmente, `direction:down`) aggiungendo una nota di giustificazione + una issue di monitoraggio.
   - **Trivy:** aggiungere una voce in `.trivyignore` (un CVE-ID per riga) con un commento
     di giustificazione + una issue di monitoraggio. `ignore-unfixed: true` copre già automaticamente le CVE
     prive di patch.

Entrambi i gate vengono **IGNORATI senza errori** (exit 0) quando lo strumento è assente o la misurazione
non riesce (osv-scanner non presente in PATH, osv.dev/rete non raggiungibile, JSON non valido): un errore
di **misurazione** non blocca mai; soltanto una regressione **misurata** blocca.

## Backlog: da advisory Scorecard a bloccante

Dopo il 1° rilascio verde con i report di Scorecard:

- Scorecard: limite progressivo del punteggio (blocca il punteggio misurato, che non può diminuire).

Completa i gate della Fase 7 (osv-scanner, gitleaks, actionlint+zizmor): zizmor
verifica i workflow stessi; Scorecard misura complessivamente la postura del repository.
