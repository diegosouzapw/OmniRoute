# Supply-Chain Gates (Phase 8 · Block A) (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../security/SUPPLY_CHAIN.md) · 🇪🇹 [am](../../../am/docs/security/SUPPLY_CHAIN.md) · 🇸🇦 [ar](../../../ar/docs/security/SUPPLY_CHAIN.md) · 🇦🇿 [az](../../../az/docs/security/SUPPLY_CHAIN.md) · 🇧🇬 [bg](../../../bg/docs/security/SUPPLY_CHAIN.md) · 🇧🇩 [bn](../../../bn/docs/security/SUPPLY_CHAIN.md) · 🇧🇦 [bs](../../../bs/docs/security/SUPPLY_CHAIN.md) · 🇨🇿 [cs](../../../cs/docs/security/SUPPLY_CHAIN.md) · 🇩🇰 [da](../../../da/docs/security/SUPPLY_CHAIN.md) · 🇩🇪 [de](../../../de/docs/security/SUPPLY_CHAIN.md) · 🇬🇷 [el](../../../el/docs/security/SUPPLY_CHAIN.md) · 🇪🇸 [es](../../../es/docs/security/SUPPLY_CHAIN.md) · 🇪🇪 [et](../../../et/docs/security/SUPPLY_CHAIN.md) · 🇮🇷 [fa](../../../fa/docs/security/SUPPLY_CHAIN.md) · 🇫🇮 [fi](../../../fi/docs/security/SUPPLY_CHAIN.md) · 🇫🇷 [fr](../../../fr/docs/security/SUPPLY_CHAIN.md) · 🇮🇪 [ga](../../../ga/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [gu](../../../gu/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ha](../../../ha/docs/security/SUPPLY_CHAIN.md) · 🇮🇱 [he](../../../he/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [hi](../../../hi/docs/security/SUPPLY_CHAIN.md) · 🇭🇷 [hr](../../../hr/docs/security/SUPPLY_CHAIN.md) · 🇭🇺 [hu](../../../hu/docs/security/SUPPLY_CHAIN.md) · 🇦🇲 [hy](../../../hy/docs/security/SUPPLY_CHAIN.md) · 🇮🇩 [id](../../../id/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ig](../../../ig/docs/security/SUPPLY_CHAIN.md) · 🇯🇵 [ja](../../../ja/docs/security/SUPPLY_CHAIN.md) · 🇬🇪 [ka](../../../ka/docs/security/SUPPLY_CHAIN.md) · 🇰🇭 [km](../../../km/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [kn](../../../kn/docs/security/SUPPLY_CHAIN.md) · 🇰🇷 [ko](../../../ko/docs/security/SUPPLY_CHAIN.md) · 🇱🇹 [lt](../../../lt/docs/security/SUPPLY_CHAIN.md) · 🇱🇻 [lv](../../../lv/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ml](../../../ml/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [mr](../../../mr/docs/security/SUPPLY_CHAIN.md) · 🇲🇾 [ms](../../../ms/docs/security/SUPPLY_CHAIN.md) · 🇲🇹 [mt](../../../mt/docs/security/SUPPLY_CHAIN.md) · 🇲🇲 [my](../../../my/docs/security/SUPPLY_CHAIN.md) · 🇳🇵 [ne](../../../ne/docs/security/SUPPLY_CHAIN.md) · 🇳🇱 [nl](../../../nl/docs/security/SUPPLY_CHAIN.md) · 🇳🇴 [no](../../../no/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [or](../../../or/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [pa](../../../pa/docs/security/SUPPLY_CHAIN.md) · 🇵🇭 [phi](../../../phi/docs/security/SUPPLY_CHAIN.md) · 🇵🇱 [pl](../../../pl/docs/security/SUPPLY_CHAIN.md) · 🇵🇹 [pt](../../../pt/docs/security/SUPPLY_CHAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/SUPPLY_CHAIN.md) · 🇷🇴 [ro](../../../ro/docs/security/SUPPLY_CHAIN.md) · 🇷🇺 [ru](../../../ru/docs/security/SUPPLY_CHAIN.md) · 🇱🇰 [si](../../../si/docs/security/SUPPLY_CHAIN.md) · 🇸🇰 [sk](../../../sk/docs/security/SUPPLY_CHAIN.md) · 🇸🇮 [sl](../../../sl/docs/security/SUPPLY_CHAIN.md) · 🇷🇸 [sr](../../../sr/docs/security/SUPPLY_CHAIN.md) · 🇸🇪 [sv](../../../sv/docs/security/SUPPLY_CHAIN.md) · 🇰🇪 [sw](../../../sw/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ta](../../../ta/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [te](../../../te/docs/security/SUPPLY_CHAIN.md) · 🇹🇭 [th](../../../th/docs/security/SUPPLY_CHAIN.md) · 🇹🇷 [tr](../../../tr/docs/security/SUPPLY_CHAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/SUPPLY_CHAIN.md) · 🇵🇰 [ur](../../../ur/docs/security/SUPPLY_CHAIN.md) · 🇺🇿 [uz](../../../uz/docs/security/SUPPLY_CHAIN.md) · 🇻🇳 [vi](../../../vi/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [yo](../../../yo/docs/security/SUPPLY_CHAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/SUPPLY_CHAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/SUPPLY_CHAIN.md)

---

OmniRoute pubblica artefatti npm + Docker. Questi gate forniscono provenienza,
inventario (SBOM) e scansione CVE, tutto open source, integrati nei flussi di lavoro di rilascio.
**Approccio basato su avvisi** — segnalano subito, diventano bloccanti dopo la
prima release "verde".

| Gate                  | Tool                                           | Where                         | Blocca?                           | Output                                       |
| :-------------------- | :--------------------------------------------- | :---------------------------- | :-------------------------------- | :------------------------------------------- |
| SLSA provenance (npm) | `npm --provenance` (OIDC)                      | `npm-publish.yml`             | solo se la pubblicazione fallisce | badge npmjs / `npm audit signatures`         |
| SBOM npm              | `@cyclonedx/cyclonedx-npm`                     | `npm-publish.yml`             | solo se la generazione fallisce   | Asset di rilascio + artefatto                |
| SBOM image            | `anchore/sbom-action` (syft)                   | `docker-publish.yml` (merge)  | solo avviso                       | Artefatto CycloneDX                          |
| Trivy CVE (SARIF)     | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | solo avviso                       | SARIF (HIGH+CRITICAL) → Scheda Sicurezza     |
| Trivy CRITICAL gate   | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | **bloccante**                     | `exit-code: '1'` su CRITICAL risolvibile     |
| osv vulnCount         | `osv-scanner` (`check:vuln-ratchet --ratchet`) | `ci.yml` (`quality-extended`) | **bloccante**                     | ratcheta `metrics.vulnCount` (direzione:giù) |
| OpenSSF Scorecard     | `ossf/scorecard-action`                        | `scorecard.yml` (cron)        | solo avviso                       | SARIF → Sicurezza + badge                    |

Il ratchet CVE dell'immagine utilizza **due passaggi** in `docker-publish.yml`: il passaggio SARIF
(`HIGH,CRITICAL`, `exit-code: 0`) mantiene HIGH+CRITICAL visibili nella scheda Sicurezza
senza bloccare; il passaggio del _CRITICAL gate_ (`severity: CRITICAL`, `ignore-unfixed: true`,
`exit-code: 1`) fa fallire il rilascio in caso di CVE CRITICAL **con una correzione disponibile**. `ignore-unfixed`
impedisce di bloccare il rilascio per una CVE dell'immagine di base senza una patch a monte.

## ⚠️ Varianza CVE (gate bloccanti osv/Trivy)

osv e Trivy confrontano le dipendenze con database CVE che **crescono continuamente**. Una PR
che **non tocca alcuna dipendenza** può improvvisamente diventare rossa perché una nuova CVE è stata
divulgata in una dipendenza esistente (osv: `vulnCount` misurato > baseline; Trivy: una nuova
CRITICAL risolvibile nell'immagine). **Questo è il comportamento operativo PREVISTO di un gate CVE bloccante,
non una regressione del prodotto.**

Quando osv o Trivy diventano rossi a causa di una CVE appena divulgata, il rimedio è:

1.  **Aggiornare la dipendenza interessata** (preferito) — aggiornare alla versione patchata tramite `overrides` di `package.json`
    (dipendenze transitive) o ricostruire l'immagine su una base patchata.
2.  **Se non c'è una correzione a monte:**
    - **osv:** ri-baselinare `metrics.vulnCount` in `config/quality/quality-baseline.json`
      (`npm run quality:ratchet -- --update` non copre i gate dedicati — modificare il valore manualmente,
      `direction:down`) con una nota di giustificazione + issue di tracciamento.
    - **Trivy:** aggiungere una voce in `.trivyignore` (CVE-ID per riga) con un commento di giustificazione
      - issue di tracciamento. `ignore-unfixed: true` copre già automaticamente le CVE senza patch.

Entrambi i gate **SKIPPANO elegantemente** (exit 0) quando lo strumento è assente o la misurazione
fallisce (osv-scanner non nel PATH, osv.dev/rete irraggiungibile, JSON non valido) — un
fallimento della **misurazione** non blocca mai, solo una regressione **misurata** blocca.

## Rischi Accettati Noti

### extract-zip 2.0.1 — GHSA-7pqw-9j4j-h8q3 / GHSA-jmr9-qjv8-65gv (#14482)

`extract-zip@2.0.1` presenta due avvisi di attraversamento di symlink ad alta gravità non patchati.
Secondo il ramo "nessuna correzione a monte" del rimedio CVE Variance di cui sopra, questo è un
**rischio accettato**, non un aggiornamento:

- **Catena:** `promptfoo` (devDependency) → `@openai/codex-security` → `extract-zip@2.0.1`.
  Confermato tramite `package-lock.json` — esattamente un pacchetto nell'intero albero delle dipendenze
  (`@openai/codex-security`) dichiara `extract-zip`, ed esattamente un pacchetto
  (`promptfoo`) dichiara `@openai/codex-security`.
- **Non esiste alcuna release corretta in nessuna parte della catena.** `extract-zip@2.0.1` (pubblicato nel 2020) è la release finale del pacchetto — non è mantenuto. `@openai/codex-security`'s
  attuale npm-latest (`0.1.29`) continua a utilizzare `extract-zip@2.0.1`.
- **Non raggiungibile dalla produzione.** `promptfoo` è solo una devDependency (mai elencata
  sotto `dependencies`), e nessun file sotto `src/`, `open-sse/`, o `bin/` importa il
  pacchetto npm `extract-zip` — l'helper `extractZip()` di OmniRoute
  (`src/lib/versionManager/binaryManager.ts:93`) si affida a `unzip`/`tar` nativi
  ed è estraneo. `@openai/codex-security` include anche una propria protezione contro l'attraversamento di symlink
  oltre al callback `onEntry` di `extract-zip`.
- **Non** creare un alias per `extract-zip` tramite `package.json` `overrides` — l'unico sostituto
  diretto praticabile è Electron-org-internal e API-incompatibile con
  i controlli `onEntry`/`defaultDirMode`/`defaultFileMode` di `@openai/codex-security`;
  sovrascriverlo romperebbe silenziosamente i controlli di sicurezza di quel pacchetto.
- **Baseline:** il `vulnCount` osv misurato (3) è già ben al di sotto della baseline congelata
  `config/quality/quality-baseline.json` (27) — nessuna modifica a cricchetto necessaria.
- **Protezione dalla regressione:** `tests/unit/extract-zip-14482-exposure.test.ts` asserisce la
  catena e l'invariante di non importazione in produzione di cui sopra; fallisce la CI se uno dei due
  si rompe (ad esempio, una futura PR rende `extract-zip` raggiungibile dalla produzione).
- **Tracciamento:** issue #14482.

## Backlog: Avviso Scorecard → bloccante

Dopo la prima release "verde" con il reporting di Scorecard:

- Scorecard: blocco del punteggio (congela il punteggio misurato; non può diminuire).

Integra i gate della Fase 7 (osv-scanner, gitleaks, actionlint+zizmor): zizmor
verifica i workflow stessi; Scorecard misura la postura del repository in aggregato.
