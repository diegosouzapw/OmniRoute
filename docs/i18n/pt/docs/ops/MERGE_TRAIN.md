# Merge Queue & Manual Merge-Train Runbook (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Desde a v3.8.49 (WS3.2/WS3.4 do plano de qualidade/velocidade), o caminho de integração predefinido para PRs revistos em `release/vX.Y.Z` é a **fila de integração do Mergify** (`.mergify.yml`);
o **comboio de integrações manual** documentado abaixo é a ALTERNATIVA — utilizada durante incidentes, congelamentos de versão ou caso o plano Open Source do Mergify venha a mudar.

## Caminho predefinido: a fila do Mergify

1. O PR é revisto/aprovado pelas campanhas e aprovado pelo controlo ⭐ de pré-integração do proprietário (o relatório + a decisão por item — consulte `/merge-prs`, Passo 0.75).
2. O proprietário (ou a sessão que atua com base na decisão do proprietário) aplica a etiqueta **`queue`**. A etiqueta É a aprovação da integração; o Mergify limita-se a executá-la.
3. O Mergify agrupa até 10 PRs em fila, valida o lote através dos controlos rápidos e integra-os (squash). Um lote com falhas é **dividido automaticamente ao meio** — o PR responsável é isolado em ~log2(N) revalidações e removido da fila; os restantes prosseguem.
4. Após a integração, o workflow contínuo de validação da versão valida o novo topo após o push e abre um issue de atribuição caso a combinação tenha introduzido uma regressão (nunca efetua uma reversão automática).

Salvaguardas (refletem as Regras Rígidas #21/#22 de `CLAUDE.md`):

- **Congelamento de versão ativo** → NÃO etiquetar PRs destinados ao branch congelado; redirecioná-los primeiro para o `release/vX+1` ativo.
- **PR em curso de outra sessão** → nunca o etiquetar; apenas a sessão proprietária coloca o seu próprio trabalho em fila.
- Os diffs apenas de testes e os PRs com a etiqueta `hotfix` já executam CI reduzida (consulte `RELEASE_CHECKLIST.md` → Via Rápida de Hotfix); as condições da fila aceitam qualquer conjunto de verificações que tenha efetivamente sido executado (`#check-failure=0` + `#check-pending=0`).

## Alternativa: o comboio de integrações manual

Utilizado quando a fila está indisponível. Isto formaliza a prática que processou 33 PRs num só dia durante o ciclo da v3.8.47:

1. **Preparar o lote** (~10–30 PRs revistos+aprovados). Verificar colisões de `linked:` (mesmos `tap.testFiles`, mesmos blocos do CHANGELOG) e processá-las em série.
2. **Validar UMA VEZ**: numa worktree isolada a partir do topo da versão, integrar localmente todos os heads do lote e, em seguida, executar a suite equivalente à da versão (`npm run check:release-green`; adicionar `--with-build` antes de uma versão).
   `scripts/release/merge-train.sh <base> <PR#>…` automatiza os passos 1–2 (os PRs com conflitos são ejetados e o comboio prossegue). O modo completo executa `npm run test:unit` — o executor ajustado à máquina (`--test-concurrency=20`), **e não** os dois shards sequenciais de CI com 4 núcleos, que executavam a fase dominante a ~25% de uma máquina com 16 núcleos (corrigido em 2026-07-18). `--fast` (processamento de megacomboios no próprio dia, aprovado pelo proprietário em 2026-07-18) mantém todos os controlos estáticos + vitest, mas executa apenas os ficheiros node:test alterados pelos PRs incluídos; a suite COMPLETA tem ainda de ser executada pelo menos uma vez por dia no topo acumulado (um comboio sem `--fast`).
3. **Aprovado** → integrar os PRs sequencialmente (voltando a verificar `state,headRefOid` antes de cada um — um PR cujo head tenha sido alterado regressa à fila de revisão). Comprovar que o diff líquido de cada integração corresponde à alteração do próprio PR (sem reversões por resolução automática: auditar `git diff --stat` quanto a eliminações fora do âmbito).
4. **Com falhas** → dividir o lote ao meio (validar cada metade), em vez de voltar a validar os PRs um a um; devolver o PR responsável à fila de revisão, juntamente com as evidências.
5. **Nunca**: integrar no branch congelado durante um congelamento; utilizar `git stash` em qualquer lugar; voltar a executar indiscriminadamente a CI na esperança de que uma falha desapareça (regra: uma falha é informação).

## Níveis (por que motivo a fila é segura apenas com controlos rápidos)

- **Por PR** (controlos rápidos de quality.yml): testes afetados segundo a TIA + testes unitários completos em 4 shards + vitest + conjunto de lint + typecheck + integridade da documentação/changelog.
- **Por lote/topo** (validação contínua da versão): controlos RÍGIDOS `--quick` em cada push para o branch da versão; execuções completas com `--with-build --full-ci` 3×/dia.
- **Por versão** (ci.yml no PR da versão): a matriz completa, incluindo E2E ×9, artefacto de pacote + teste rápido de arranque do tarball, cobertura/limiares progressivos.

Nada é validado menos do que antes — a superfície pesada é simplesmente executada por lote/topo, em vez de por PR, eliminando assim as viagens de ida e volta O(N).
