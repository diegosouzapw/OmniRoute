# Supply-Chain Gates (Phase 8 · Block A) (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../security/SUPPLY_CHAIN.md) · 🇪🇹 [am](../../../am/docs/security/SUPPLY_CHAIN.md) · 🇸🇦 [ar](../../../ar/docs/security/SUPPLY_CHAIN.md) · 🇦🇿 [az](../../../az/docs/security/SUPPLY_CHAIN.md) · 🇧🇬 [bg](../../../bg/docs/security/SUPPLY_CHAIN.md) · 🇧🇩 [bn](../../../bn/docs/security/SUPPLY_CHAIN.md) · 🇨🇿 [cs](../../../cs/docs/security/SUPPLY_CHAIN.md) · 🇩🇰 [da](../../../da/docs/security/SUPPLY_CHAIN.md) · 🇩🇪 [de](../../../de/docs/security/SUPPLY_CHAIN.md) · 🇬🇷 [el](../../../el/docs/security/SUPPLY_CHAIN.md) · 🇪🇸 [es](../../../es/docs/security/SUPPLY_CHAIN.md) · 🇪🇪 [et](../../../et/docs/security/SUPPLY_CHAIN.md) · 🇮🇷 [fa](../../../fa/docs/security/SUPPLY_CHAIN.md) · 🇫🇮 [fi](../../../fi/docs/security/SUPPLY_CHAIN.md) · 🇫🇷 [fr](../../../fr/docs/security/SUPPLY_CHAIN.md) · 🇮🇪 [ga](../../../ga/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [gu](../../../gu/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ha](../../../ha/docs/security/SUPPLY_CHAIN.md) · 🇮🇱 [he](../../../he/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [hi](../../../hi/docs/security/SUPPLY_CHAIN.md) · 🇭🇷 [hr](../../../hr/docs/security/SUPPLY_CHAIN.md) · 🇭🇺 [hu](../../../hu/docs/security/SUPPLY_CHAIN.md) · 🇦🇲 [hy](../../../hy/docs/security/SUPPLY_CHAIN.md) · 🇮🇩 [id](../../../id/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ig](../../../ig/docs/security/SUPPLY_CHAIN.md) · 🇮🇹 [it](../../../it/docs/security/SUPPLY_CHAIN.md) · 🇯🇵 [ja](../../../ja/docs/security/SUPPLY_CHAIN.md) · 🇬🇪 [ka](../../../ka/docs/security/SUPPLY_CHAIN.md) · 🇰🇭 [km](../../../km/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [kn](../../../kn/docs/security/SUPPLY_CHAIN.md) · 🇰🇷 [ko](../../../ko/docs/security/SUPPLY_CHAIN.md) · 🇱🇹 [lt](../../../lt/docs/security/SUPPLY_CHAIN.md) · 🇱🇻 [lv](../../../lv/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ml](../../../ml/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [mr](../../../mr/docs/security/SUPPLY_CHAIN.md) · 🇲🇾 [ms](../../../ms/docs/security/SUPPLY_CHAIN.md) · 🇲🇹 [mt](../../../mt/docs/security/SUPPLY_CHAIN.md) · 🇲🇲 [my](../../../my/docs/security/SUPPLY_CHAIN.md) · 🇳🇵 [ne](../../../ne/docs/security/SUPPLY_CHAIN.md) · 🇳🇱 [nl](../../../nl/docs/security/SUPPLY_CHAIN.md) · 🇳🇴 [no](../../../no/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [or](../../../or/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [pa](../../../pa/docs/security/SUPPLY_CHAIN.md) · 🇵🇭 [phi](../../../phi/docs/security/SUPPLY_CHAIN.md) · 🇵🇱 [pl](../../../pl/docs/security/SUPPLY_CHAIN.md) · 🇵🇹 [pt](../../../pt/docs/security/SUPPLY_CHAIN.md) · 🇷🇴 [ro](../../../ro/docs/security/SUPPLY_CHAIN.md) · 🇷🇺 [ru](../../../ru/docs/security/SUPPLY_CHAIN.md) · 🇱🇰 [si](../../../si/docs/security/SUPPLY_CHAIN.md) · 🇸🇰 [sk](../../../sk/docs/security/SUPPLY_CHAIN.md) · 🇸🇮 [sl](../../../sl/docs/security/SUPPLY_CHAIN.md) · 🇷🇸 [sr](../../../sr/docs/security/SUPPLY_CHAIN.md) · 🇸🇪 [sv](../../../sv/docs/security/SUPPLY_CHAIN.md) · 🇰🇪 [sw](../../../sw/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ta](../../../ta/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [te](../../../te/docs/security/SUPPLY_CHAIN.md) · 🇹🇭 [th](../../../th/docs/security/SUPPLY_CHAIN.md) · 🇹🇷 [tr](../../../tr/docs/security/SUPPLY_CHAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/SUPPLY_CHAIN.md) · 🇵🇰 [ur](../../../ur/docs/security/SUPPLY_CHAIN.md) · 🇺🇿 [uz](../../../uz/docs/security/SUPPLY_CHAIN.md) · 🇻🇳 [vi](../../../vi/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [yo](../../../yo/docs/security/SUPPLY_CHAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/SUPPLY_CHAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/SUPPLY_CHAIN.md)

---

O OmniRoute publica artefatos npm + Docker. Esses gates fornecem proveniência,
inventário (SBOM) e verificação de CVEs, todos OSS, integrados aos fluxos de trabalho de release.
Postura **primeiro consultiva** — eles geram relatórios agora e passam a ser bloqueantes após a 1ª
release verde.

| Gate                    | Ferramenta                                     | Onde                          | Bloqueia?                      | Saída                                       |
| ----------------------- | ---------------------------------------------- | ----------------------------- | ------------------------------ | ------------------------------------------- |
| Proveniência SLSA (npm) | `npm --provenance` (OIDC)                      | `npm-publish.yml`             | somente se a publicação falhar | selo npmjs / `npm audit signatures`         |
| SBOM npm                | `@cyclonedx/cyclonedx-npm`                     | `npm-publish.yml`             | somente se a geração falhar    | Ativo da release + artefato                 |
| SBOM da imagem          | `anchore/sbom-action` (syft)                   | `docker-publish.yml` (merge)  | consultivo                     | Artefato CycloneDX                          |
| CVE do Trivy (SARIF)    | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | consultivo                     | SARIF (HIGH+CRITICAL) → aba Security        |
| Gate CRITICAL do Trivy  | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | **bloqueante**                 | `exit-code: '1'` para CRITICAL corrigível   |
| vulnCount do osv        | `osv-scanner` (`check:vuln-ratchet --ratchet`) | `ci.yml` (`quality-extended`) | **bloqueante**                 | limita `metrics.vulnCount` (direction:down) |
| OpenSSF Scorecard       | `ossf/scorecard-action`                        | `scorecard.yml` (cron)        | consultivo                     | SARIF → Security + selo                     |

O limite de CVEs da imagem usa **duas etapas** em `docker-publish.yml`: a etapa SARIF
(`HIGH,CRITICAL`, `exit-code: 0`) mantém HIGH+CRITICAL visíveis na aba Security
sem bloquear; a etapa do _gate CRITICAL_ (`severity: CRITICAL`, `ignore-unfixed: true`,
`exit-code: 1`) faz a release falhar em caso de uma CVE CRITICAL **com correção disponível**. `ignore-unfixed`
evita bloquear a release devido a uma CVE da imagem base sem uma correção upstream.

## ⚠️ Variação de CVEs (gates bloqueantes do osv/Trivy)

O osv e o Trivy comparam dependências com bancos de dados de CVEs que **crescem continuamente**. Um PR
que **não altera nenhuma dependência** pode ficar vermelho repentinamente porque uma nova CVE foi
divulgada em uma dependência existente (osv: `vulnCount` medido > linha de base; Trivy: uma nova
CRITICAL corrigível na imagem). **Esse é o comportamento operacional ESPERADO de um gate
bloqueante de CVEs, não uma regressão do produto.**

Quando o osv ou o Trivy ficam vermelhos devido a uma CVE recém-divulgada, a solução é:

1. **Atualizar a dependência afetada** (preferencial) — atualize para a versão corrigida por meio de `package.json`
   `overrides` (dependências transitivas) ou reconstrua a imagem sobre uma base corrigida.
2. **Se não houver uma correção upstream:**
   - **osv:** redefina a linha de base de `metrics.vulnCount` em `config/quality/quality-baseline.json`
     (`npm run quality:ratchet -- --update` não abrange gates dedicados — edite o valor
     manualmente, `direction:down`) com uma nota de justificativa + issue de acompanhamento.
   - **Trivy:** adicione uma entrada em `.trivyignore` (um CVE-ID por linha) com um comentário
     de justificativa + issue de acompanhamento. `ignore-unfixed: true` já abrange automaticamente
     CVEs sem correções.

Ambos os gates **PULAM de forma segura** (exit 0) quando a ferramenta está ausente ou a medição
falha (osv-scanner não está no PATH, osv.dev/rede inacessível, JSON inválido) — uma falha de
**medição** nunca bloqueia; somente uma regressão **medida** bloqueia.

## Backlog: Scorecard consultivo → bloqueante

Após a 1ª release verde com relatórios do Scorecard:

- Scorecard: limite de pontuação (congela a pontuação medida; ela não pode diminuir).

Complementa os gates da Fase 7 (osv-scanner, gitleaks, actionlint+zizmor): o zizmor
audita os próprios fluxos de trabalho; o Scorecard mede a postura geral do repositório.
